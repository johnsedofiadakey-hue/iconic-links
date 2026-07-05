import Link from 'next/link';
import { requireAdminAuth } from '@/lib/auth';
import { listRecentOrders } from '@/lib/db';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants';
import {
  Printer,
  Monitor,
  Maximize,
  Image as ImageIcon,
  Scissors,
  PenTool,
  Clock,
  Settings,
  FileSearch,
  PackageCheck,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default async function AdminDashboard() {
  const user = await requireAdminAuth();

  const ordersResult = await listRecentOrders();
  const allOrders = ordersResult.data.orders || [];

  // Group by workflow stages
  const prepressStatuses = ['AWAITING_QUOTATION', 'AWAITING_PAYMENT', 'PREFLIGHT', 'DESIGN_IN_PROGRESS', 'AWAITING_APPROVAL'];
  const productionStatuses = ['PRINTING', 'FINISHING'];
  const qcStatuses = ['QC_REJECTED'];
  const dispatchStatuses = ['READY_FOR_PICKUP', 'OUT_FOR_DELIVERY'];

  const prepressOrders = allOrders.filter((o: any) => prepressStatuses.includes(o.status));
  const productionOrders = allOrders.filter((o: any) => productionStatuses.includes(o.status));
  const qcOrders = allOrders.filter((o: any) => qcStatuses.includes(o.status));
  const dispatchOrders = allOrders.filter((o: any) => dispatchStatuses.includes(o.status));

  // Revenue today
  const today = new Date().toDateString();
  const todaysRevenue = allOrders
    .filter((o: any) => new Date(o.createdAt).toDateString() === today)
    .reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

  const columns = [
    { title: 'Prepress', orders: prepressOrders, color: 'bg-indigo-500', icon: FileSearch },
    { title: 'Production', orders: productionOrders, color: 'bg-amber-500', icon: Settings },
    { title: 'QC Holds', orders: qcOrders, color: 'bg-red-500', icon: AlertTriangle },
    { title: 'Dispatch', orders: dispatchOrders, color: 'bg-emerald-500', icon: PackageCheck },
  ];

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12">
      {/* Header */}
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="ml-10 md:ml-0">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Production Engine</h1>
            <p className="text-sm text-gray-500 font-medium">Overview & Active Workflows</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link href="/admin/services" className="hidden sm:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition">
              Catalog
            </Link>
            <Link href="/admin/qr-generator" className="btn-primary px-3 sm:px-4 py-2 rounded-xl text-sm inline-flex items-center gap-1.5">
              Scan QR
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {/* Revenue Card */}
          <div className="col-span-2 lg:col-span-1 gradient-brand text-white rounded-2xl p-5 shadow-lg relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
            <TrendingUp className="w-5 h-5 text-blue-300 mb-2" />
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Today&apos;s Revenue</p>
            <h3 className="text-2xl sm:text-3xl font-black mt-1">GHS {todaysRevenue.toFixed(0)}</h3>
          </div>

          {columns.map((col, i) => (
            <div
              key={col.title}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 card-interactive animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${col.color}/10 flex items-center justify-center`}>
                  <col.icon className={`w-5 h-5 ${col.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{col.title}</p>
                  <h3 className="text-2xl font-black text-gray-900">{col.orders.length}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Departments Grid */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Departments</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { icon: Monitor, label: 'Digital', color: 'text-blue-500' },
              { icon: Maximize, label: 'Large Format', color: 'text-indigo-500' },
              { icon: Scissors, label: 'Print & Cut', color: 'text-amber-500' },
              { icon: ImageIcon, label: 'Framing', color: 'text-emerald-500' },
              { icon: PenTool, label: 'Design', color: 'text-purple-500' },
            ].map((dept) => (
              <div key={dept.label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition text-center group">
                <dept.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${dept.color} mb-2 group-hover:scale-110 transition-transform`} />
                <span className="font-semibold text-gray-800 text-xs sm:text-sm">{dept.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Board */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            Active Job Workflows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {columns.map((col) => (
              <div key={col.title} className="bg-gray-50 rounded-2xl p-3 sm:p-4 border border-gray-200 flex flex-col h-auto md:h-[550px]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="font-bold text-gray-700 flex items-center text-sm">
                    <span className={`w-2 h-2 rounded-full ${col.color} mr-2`} />
                    {col.title}
                  </h3>
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {col.orders.length}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar">
                  {col.orders.length > 0 ? (
                    col.orders.map((order: any) => (
                      <Link
                        key={order.id}
                        href={`/admin/orders/${order.id}`}
                        className="block bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{order.orderNumber}</span>
                            <h4 className="font-semibold text-gray-900 text-sm mt-0.5 truncate group-hover:text-blue-600 transition">
                              {order.orderItems_on_order[0]?.service?.name || 'Print Job'}
                            </h4>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div className="text-xs text-gray-500 truncate">
                            {order.user?.phone || order.user?.email}
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                            {STATUS_LABELS[order.status] || order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 text-center mt-8">Empty</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
