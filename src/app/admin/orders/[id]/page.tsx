import { requireAdminAuth } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft, User, Package, Shield, ExternalLink } from 'lucide-react';
import OrderActionsPanel from './OrderActionsPanel';
import { getOrderWithDetails } from '@/lib/db';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants';

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  await requireAdminAuth();

  const orderResult = await getOrderWithDetails({ id: params.id });
  const order = orderResult.data.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-[var(--brand-surface)] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-150 shadow-sm max-w-sm text-center">
          <p className="text-gray-900 font-bold text-lg">Order not found</p>
          <Link href="/admin/dashboard" className="btn-primary mt-4 px-4 py-2 text-sm inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12 animate-fade-in">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/admin/dashboard" className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500 ml-10 md:ml-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order Detail</span>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Order #{order.orderNumber}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              Customer Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 font-medium">Name</p>
                <p className="text-gray-950 font-bold mt-0.5">{order.user?.name || 'Walk-in Customer'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Phone</p>
                <p className="text-gray-950 font-semibold mt-0.5">{order.user?.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2 border-t border-gray-50 pt-3">
                <p className="text-gray-400 font-medium">Email</p>
                <p className="text-gray-950 font-semibold mt-0.5">{order.user?.email || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-500" />
              Order Items
            </h2>
            <ul className="divide-y divide-gray-100">
              {order.orderItems_on_order?.map((item: any) => (
                <li key={item.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.service?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Quantity: {item.quantity}</p>
                    {item.specs && (
                      <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs font-mono text-gray-600 max-w-full overflow-x-auto">
                        <span className="font-bold block text-[10px] uppercase text-gray-400 tracking-wider mb-1.5">Specifications</span>
                        {Object.entries(item.specs).map(([key, val]: any) => (
                          <div key={key} className="flex justify-between py-0.5 border-b border-gray-100/50 last:border-0">
                            <span className="text-gray-500 font-semibold mr-4">{key}:</span>
                            <span className="text-gray-800 font-bold">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-gray-900 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    GHS {item.price.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Actions & Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              Status & Actions
            </h2>
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100/50 flex justify-between items-center">
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Status</span>
                <span className="text-sm font-bold text-gray-900 mt-0.5 block">{STATUS_LABELS[order.status] || order.status}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                {order.status}
              </span>
            </div>

            <OrderActionsPanel order={order} />
          </div>
        </div>
      </main>
    </div>
  );
}
