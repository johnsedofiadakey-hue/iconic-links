import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import QCActionButtons from './QCActionButtons';
import { listOrdersForQc } from '@/lib/db';
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants';

export default async function QCDashboard() {
  const user = await requireAdminAuth(ROLE_PERMISSIONS.QC as unknown as string[]);

  const ordersResult = await listOrdersForQc();
  const orders = ordersResult.data.orders;

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Quality Control</h1>
          <p className="text-sm text-gray-500">Review completed print jobs</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-interactive">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Link href={`/admin/orders/${order.id}`} className="text-base font-bold text-blue-600 hover:underline">
                      Order #{order.orderNumber}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">{order.user?.name || order.user?.phone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
                  {order.orderItems_on_order?.map((item: any) => (
                    <div key={item.id} className="mb-1.5 last:mb-0 text-sm">
                      <span className="font-semibold text-gray-900">{item.service?.name}</span>
                      <span className="text-gray-400 ml-2">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {order.status !== 'QC_REJECTED' && (
                  <QCActionButtons orderId={order.id} userId={user.id} />
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-200 mb-3" />
              <h3 className="font-bold text-gray-900">All Clear</h3>
              <p className="text-gray-500 text-sm mt-1">No orders pending quality control.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
