import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import { format, subDays, startOfDay, endOfDay, getHours, getDay } from 'date-fns';
import SalesChart from './SalesChart';
import WasteChart from './WasteChart';
import { TrendingUp, Trash2, Users, Lightbulb } from 'lucide-react';

export default async function IntelligenceDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/admin/login');

  let user;
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    user = await prisma.user.findFirst({ where: { email: decodedClaims.email } });
  } catch {
    redirect('/admin/login');
  }

  if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'MANAGER')) {
    redirect('/admin/dashboard');
  }

  // 1. Sales Data (Last 30 days)
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentOrders = await prisma.order.findMany({
    where: { 
      createdAt: { gte: thirtyDaysAgo },
      status: { notIn: ['CANCELLED', 'AWAITING_PAYMENT', 'AWAITING_QUOTATION'] }
    },
    select: { createdAt: true, totalAmount: true }
  });

  // Group by day for the chart
  const salesByDay = recentOrders.reduce((acc: any, order) => {
    const dateStr = format(order.createdAt, 'MMM dd');
    if (!acc[dateStr]) acc[dateStr] = 0;
    acc[dateStr] += order.totalAmount;
    return acc;
  }, {});
  const salesData = Object.keys(salesByDay).map(date => ({ date, revenue: salesByDay[date] }));

  // 2. Waste Data (Top wasted materials)
  const consumptions = await prisma.materialConsumption.findMany({
    where: { wastage: { gt: 0 } },
    include: { inventoryItem: true }
  });
  const wasteByMaterial = consumptions.reduce((acc: any, c) => {
    const name = c.inventoryItem.name;
    if (!acc[name]) acc[name] = 0;
    acc[name] += c.wastage;
    return acc;
  }, {});
  const wasteData = Object.keys(wasteByMaterial)
    .map(name => ({ name, wastage: wasteByMaterial[name] }))
    .sort((a, b) => b.wastage - a.wastage)
    .slice(0, 5); // Top 5

  // 3. Customer Segmentation (Top Spenders)
  const topSpenders = await prisma.order.groupBy({
    by: ['userId'],
    _sum: { totalAmount: true },
    having: { totalAmount: { _sum: { gt: 0 } } },
    orderBy: { _sum: { totalAmount: 'desc' } },
    take: 5
  });

  const topUsers = await Promise.all(topSpenders.map(async (ts) => {
    const u = await prisma.user.findUnique({ where: { id: ts.userId }, select: { name: true, phone: true } });
    return { name: u?.name || u?.phone, spend: ts._sum.totalAmount || 0 };
  }));

  // 4. Predictive Insights (Quiet Periods)
  // Simple heuristic: Count orders by hour of the week over the last 30 days
  const hourCounts = new Array(24).fill(0);
  recentOrders.forEach(order => {
    hourCounts[getHours(order.createdAt)]++;
  });
  
  // Find the quietest hour during typical business hours (9 AM - 5 PM)
  let quietestHour = 9;
  let minCount = Infinity;
  for (let i = 9; i <= 17; i++) {
    if (hourCounts[i] < minCount) {
      minCount = hourCounts[i];
      quietestHour = i;
    }
  }
  const quietInsight = `Based on the last 30 days, the quietest hour of the day is ${quietestHour}:00. Consider running machine maintenance or scheduling lunch breaks during this time.`;
  
  // 5. Worker Performance
  const completedOrders = await prisma.order.findMany({
    where: { status: 'COMPLETED' },
    include: { consumptions: true } // who did the work
  });
  
  const workerStats: Record<string, { name: string, jobs: number }> = {};
  for (const order of completedOrders) {
    if (order.consumptions.length > 0) {
      const workerId = order.consumptions[0].workerId;
      if (workerId) {
        if (!workerStats[workerId]) {
          const w = await prisma.user.findUnique({ where: { id: workerId }, select: { name: true, email: true } });
          workerStats[workerId] = { name: w?.name || w?.email || 'Unknown', jobs: 0 };
        }
        workerStats[workerId].jobs++;
      }
    }
  }
  const topWorkers = Object.values(workerStats).sort((a, b) => b.jobs - a.jobs).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-indigo-900 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold max-w-5xl mx-auto w-full">Intelligence & Scale</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Sales Chart */}
        <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" />
            <h2 className="font-bold text-lg text-gray-900">30-Day Revenue Trend</h2>
          </div>
          <div className="h-72 w-full">
            <SalesChart data={salesData} />
          </div>
        </div>

        {/* Waste Analysis */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <Trash2 className="w-5 h-5 text-red-600 mr-2" />
            <h2 className="font-bold text-lg text-gray-900">Top Wasted Materials</h2>
          </div>
          {wasteData.length > 0 ? (
            <div className="h-64 w-full">
               <WasteChart data={wasteData} />
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic flex h-48 items-center justify-center">No wastage recorded yet.</p>
          )}
        </div>

        {/* Top Customers */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            <h2 className="font-bold text-lg text-gray-900">VIP Customers</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {topUsers.map((u, i) => (
              <li key={i} className="py-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">{u.name}</span>
                <span className="text-sm font-bold text-green-600">GHS {u.spend.toFixed(2)}</span>
              </li>
            ))}
            {topUsers.length === 0 && <li className="text-sm text-gray-500 italic py-2">No customer data yet.</li>}
          </ul>
        </div>

        {/* Top Workers */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="font-bold text-lg text-gray-900">Top Workers</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {topWorkers.map((w, i) => (
              <li key={i} className="py-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">{w.name}</span>
                <span className="text-sm font-bold text-blue-600">{w.jobs} jobs</span>
              </li>
            ))}
            {topWorkers.length === 0 && <li className="text-sm text-gray-500 italic py-2">No worker data yet.</li>}
          </ul>
        </div>

        {/* AI Insights */}
        <div className="lg:col-span-3 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg shadow border border-indigo-100">
          <div className="flex items-center mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="font-bold text-lg text-indigo-900">Predictive Insight</h2>
          </div>
          <p className="text-sm text-indigo-800 leading-relaxed">
            {quietInsight}
          </p>
        </div>

      </main>
    </div>
  );
}
