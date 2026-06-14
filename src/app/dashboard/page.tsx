import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import Link from 'next/link';
import { Package, Clock } from 'lucide-react';
import { redirect } from 'next/navigation';
import ProofReviewPanel from './ProofReviewPanel';
import { getUserByIdentifier, listOrdersByUserWithDetails } from '@/lib/db';

export default async function CustomerDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/login');

  let user;
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const identifier = decodedClaims.phone_number || decodedClaims.email;
    if (identifier) {
      const userResult = await getUserByIdentifier({ identifier });
      if (userResult.data.users.length > 0) {
        user = userResult.data.users[0];
      }
    }
  } catch (error) {
    redirect('/login');
  }

  if (!user) redirect('/login');

  const ordersResult = await listOrdersByUserWithDetails({ userId: user.id });
  const orders = ordersResult.data.orders;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-6 shadow-sm border-b flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 text-sm">{user.phone}</p>
        </div>
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          New Order
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mt-1">When you place an order, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-500 tracking-wider">ORDER {order.orderNumber}</span>
                    <h3 className="font-bold text-lg text-gray-900 mt-1">
                      {order.orderItems_on_order?.[0]?.service?.name} {order.orderItems_on_order?.length > 1 && `+ ${order.orderItems_on_order.length - 1} more`}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    order.status === 'AWAITING_PAYMENT' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="font-bold text-gray-900">
                    GHS {order.totalAmount.toFixed(2)}
                  </div>
                </div>

                {/* Show Proof Review if Awaiting Approval */}
                {order.status === 'AWAITING_APPROVAL' && order.proofs_on_order && order.proofs_on_order[0] && (
                  <ProofReviewPanel proof={order.proofs_on_order[0]} userId={user.id} />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
