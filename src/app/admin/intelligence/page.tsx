import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import { format, subDays, getHours } from 'date-fns';
import SalesChart from './SalesChart';
import WasteChart from './WasteChart';
import { TrendingUp, Trash2, Users, Lightbulb } from 'lucide-react';
import { listAllOrdersForIntelligence, listWastedConsumptions } from '@/lib/db';

export default async function IntelligenceDashboard() {
  await requireAdminAuth(ROLE_PERMISSIONS.INTELLIGENCE as unknown as string[]);

  // Fetch data
  const [ordersRes, wasteRes] = await Promise.all([
    listAllOrdersForIntelligence(),
    listWastedConsumptions()
  ]);

  const allOrders = ordersRes.data.orders;
  const consumptions = wasteRes.data.materialConsumptions;

  // 1. Sales Data
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentOrders = allOrders.filter((o: any) =>
    new Date(o.createdAt) >= thirtyDaysAgo &&
    !['CANCELLED', 'AWAITING_PAYMENT', 'AWAITING_QUOTATION'].includes(o.status)
  );

  const salesByDay = recentOrders.reduce((acc: any, order: any) => {
    const dateStr = format(new Date(order.createdAt), 'MMM dd');
    if (!acc[dateStr]) acc[dateStr] = 0;
    acc[dateStr] += order.totalAmount;
    return acc;
  }, {});
  const salesData = Object.keys(salesByDay).map(date => ({ date, revenue: salesByDay[date] }));

  // 2. Waste Data
  const wasteByMaterial = consumptions.reduce((acc: any, c: any) => {
    const name = c.inventoryItem?.name || 'Unknown';
    if (!acc[name]) acc[name] = 0;
    acc[name] += c.wastage;
    return acc;
  }, {});
  const wasteData = Object.keys(wasteByMaterial)
    .map(name => ({ name, wastage: wasteByMaterial[name] }))
    .sort((a, b) => b.wastage - a.wastage)
    .slice(0, 5);

  // 3. Customer Spends
  const spendByUser = allOrders.reduce((acc: any, order: any) => {
    if (!order.user) return acc;
    const uid = order.user.id;
    if (!acc[uid]) acc[uid] = { name: order.user.name || order.user.phone || order.user.email, spend: 0 };
    acc[uid].spend += order.totalAmount;
    return acc;
  }, {});

  const topUsers = Object.values(spendByUser)
    .sort((a: any, b: any) => b.spend - a.spend)
    .slice(0, 5) as { name: string, spend: number }[];

  // 4. Predictive Insights
  const hourCounts = new Array(24).fill(0);
  recentOrders.forEach((order: any) => {
    hourCounts[getHours(new Date(order.createdAt))]++;
  });

  let quietestHour = 9;
  let minCount = Infinity;
  for (let i = 9; i <= 17; i++) {
    if (hourCounts[i] < minCount) {
      minCount = hourCounts[i];
      quietestHour = i;
    }
  }
  const quietInsight = `Based on the last 30 days, the quietest hour of the day is ${quietestHour}:00. Consider running machine maintenance or scheduling lunch breaks during this window.`;

  // 5. Worker Performance
  const completedOrders = allOrders.filter((o: any) => o.status === 'COMPLETED');

  const workerStats: Record<string, { name: string, jobs: number }> = {};
  for (const order of completedOrders) {
    if (order.materialConsumptions_on_order && order.materialConsumptions_on_order.length > 0) {
      const workerId = order.materialConsumptions_on_order[0]?.workerId;
      if (workerId) {
        if (!workerStats[workerId]) {
          workerStats[workerId] = { name: `Worker ${workerId.slice(0, 4)}`, jobs: 0 };
        }
        workerStats[workerId].jobs++;
      }
    }
  }
  const topWorkers = Object.values(workerStats).sort((a, b) => b.jobs - a.jobs).slice(0, 5);

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12 animate-fade-in">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Intelligence</h1>
          <p className="text-sm text-gray-500">Analytics, yields, and predictions</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-interactive">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-base text-gray-900">30-Day Revenue Trend</h2>
          </div>
          <div className="h-72 w-full">
            <SalesChart data={salesData} />
          </div>
        </div>

        {/* Waste Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-interactive">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-5 h-5 text-red-650" />
            <h2 className="font-bold text-base text-gray-900">Top Wasted Materials</h2>
          </div>
          {wasteData.length > 0 ? (
            <div className="h-64 w-full">
              <WasteChart data={wasteData} />
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic flex h-48 items-center justify-center">No wastage recorded.</p>
          )}
        </div>

        {/* Top Customers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-interactive">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-base text-gray-900">VIP Customers</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {topUsers.map((u, i) => (
              <li key={i} className="py-3 flex justify-between items-center text-sm">
                <span className="font-medium text-gray-800">{u.name}</span>
                <span className="font-bold text-emerald-600">GHS {u.spend.toFixed(2)}</span>
              </li>
            ))}
            {topUsers.length === 0 && <li className="text-sm text-gray-400 italic py-2">No data yet.</li>}
          </ul>
        </div>

        {/* Top Workers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-interactive">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-650" />
            <h2 className="font-bold text-base text-gray-900">Top Workers</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {topWorkers.map((w, i) => (
              <li key={i} className="py-3 flex justify-between items-center text-sm">
                <span className="font-medium text-gray-800">{w.name}</span>
                <span className="font-bold text-blue-600">{w.jobs} jobs</span>
              </li>
            ))}
            {topWorkers.length === 0 && <li className="text-sm text-gray-400 italic py-2">No data yet.</li>}
          </ul>
        </div>

        {/* AI Insight */}
        <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-base text-blue-900">Predictive Insight</h2>
          </div>
          <p className="text-sm text-blue-800 leading-relaxed font-medium">
            {quietInsight}
          </p>
        </div>
      </main>
    </div>
  );
}
