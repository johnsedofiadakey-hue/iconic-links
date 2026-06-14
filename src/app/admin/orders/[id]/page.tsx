import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import OrderActionsPanel from './OrderActionsPanel';
import { getUserByIdentifier, getOrderWithDetails } from '@/lib/db';

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/admin/login');

  let user;
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const identifier = decodedClaims.email || decodedClaims.phone_number;
    if (identifier) {
      const userResult = await getUserByIdentifier({ identifier });
      if (userResult.data.users.length > 0) {
        user = userResult.data.users[0];
      }
    }
  } catch {
    redirect('/admin/login');
  }

  if (!user || user.role === 'CUSTOMER') redirect('/admin/login');

  const orderResult = await getOrderWithDetails({ id: params.id });
  const order = orderResult.data.order;

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gray-900 text-white p-6 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center">
          <Link href="/admin/dashboard" className="mr-4 text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Order #{order.orderNumber}</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Details</h2>
            <p className="text-sm text-gray-600"><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> {order.user?.phone}</p>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
            <ul className="divide-y divide-gray-200">
              {order.orderItems_on_order?.map((item: any) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.service?.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    {item.specs && <pre className="text-xs text-gray-400 mt-1">{JSON.stringify(item.specs, null, 2)}</pre>}
                  </div>
                  <div className="font-bold text-gray-900">GHS {item.price.toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Status & Actions</h2>
            <div className="mb-6">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Current Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
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
