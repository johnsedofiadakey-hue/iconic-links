import Link from 'next/link';
import { Package, Clock, Plus, ChevronRight, LogOut } from 'lucide-react';
import { requireAuth } from '@/lib/auth';
import { listOrdersByUserWithDetails } from '@/lib/db';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants';
import ProofReviewPanel from './ProofReviewPanel';
import PayNowButton from './PayNowButton';

export default async function CustomerDashboard() {
  const user = await requireAuth('/login');

  const ordersResult = await listOrdersByUserWithDetails({ userId: user.id });
  const orders = ordersResult.data.orders;

  const activeOrders = orders.filter((o: any) => !['COMPLETED', 'CANCELLED'].includes(o.status));
  const completedOrders = orders.filter((o: any) => ['COMPLETED', 'CANCELLED'].includes(o.status));

  return (
    <div className="min-h-screen bg-[var(--brand-surface)]">
      {/* Header */}
      <header className="glass sticky top-0 z-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Iconic Links Logo" className="h-9 w-auto object-contain" />
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <h1 className="text-sm font-bold text-gray-900">My Orders</h1>
              <p className="text-[11px] text-gray-500 font-medium">{user.phone || user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/order"
              className="btn-primary px-4 py-2.5 text-sm inline-flex items-center gap-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              New Order
            </Link>
            <form action="/api/auth/session" method="DELETE">
              <button
                type="submit"
                className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">Place your first print order and track it right here.</p>
            <Link
              href="/order"
              className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2 rounded-xl mt-6"
            >
              <Plus className="w-4 h-4" />
              Place Your First Order
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="status-dot bg-blue-500" />
                  Active Orders ({activeOrders.length})
                </h2>
                <div className="space-y-4">
                  {activeOrders.map((order: any, idx: number) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-interactive animate-slide-up"
                      style={{ animationDelay: `${idx * 0.05}s`, opacity: 0 }}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <Link href={`/dashboard/${order.id}`} className="group flex-1">
                            <span className="text-xs font-bold text-gray-400 tracking-wider">ORDER {order.orderNumber}</span>
                            <h3 className="font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition flex items-center gap-1">
                              {order.orderItems_on_order?.[0]?.service?.name}
                              {order.orderItems_on_order?.length > 1 && (
                                <span className="text-xs font-normal text-gray-400">
                                  + {order.orderItems_on_order.length - 1} more
                                </span>
                              )}
                              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </h3>
                          </Link>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                            {STATUS_LABELS[order.status] || order.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center text-gray-400">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="font-bold text-gray-900">
                            {order.totalAmount > 0 ? `GHS ${order.totalAmount.toFixed(2)}` : 'Pending Quote'}
                          </div>
                        </div>
                      </div>

                      {/* Inline Actions */}
                      {order.status === 'AWAITING_PAYMENT' && (
                        <div className="px-5 pb-4">
                          <PayNowButton orderId={order.id} amount={order.totalAmount} />
                        </div>
                      )}

                      {order.status === 'AWAITING_APPROVAL' && order.proofs_on_order?.[0] && (
                        <div className="px-5 pb-4">
                          <ProofReviewPanel proof={order.proofs_on_order[0]} userId={user.id} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="status-dot bg-green-500" />
                  Completed ({completedOrders.length})
                </h2>
                <div className="space-y-3">
                  {completedOrders.map((order: any) => (
                    <Link
                      key={order.id}
                      href={`/dashboard/${order.id}`}
                      className="block bg-white rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-400 font-bold">{order.orderNumber}</span>
                          <p className="text-sm font-medium text-gray-700 mt-0.5">
                            {order.orderItems_on_order?.[0]?.service?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                            {STATUS_LABELS[order.status] || order.status}
                          </span>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Mobile FAB */}
      <Link
        href="/order"
        className="fixed bottom-6 right-6 w-14 h-14 btn-primary rounded-full flex items-center justify-center shadow-xl lg:hidden z-30"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
