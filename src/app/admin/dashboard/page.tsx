import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserByIdentifier, listRecentOrders } from '@/lib/db';

export default async function AdminDashboard() {
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
  } catch (error) {
    redirect('/admin/login');
  }

  if (!user || user.role === 'CUSTOMER') redirect('/admin/login');

  const ordersResult = await listRecentOrders();
  const orders = ordersResult.data.orders;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white p-6 shadow-md flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Staff Dashboard</h1>
        <div className="flex space-x-6 text-sm font-medium">
          <Link href="/admin/services" className="text-gray-300 hover:text-white transition">Services Catalog</Link>
          <Link href="/admin/qr-generator" className="text-gray-300 hover:text-white transition">QR Generator</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {orders.map((order: any) => (
              <li key={order.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {order.orderNumber} - {order.user?.phone || order.user?.email}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        order.status === 'AWAITING_PAYMENT' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {order.orderItems_on_order[0]?.service?.name} (Qty: {order.orderItems_on_order[0]?.quantity})
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Amount: <span className="font-bold text-gray-900">GHS {order.totalAmount.toFixed(2)}</span></p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {orders.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No orders have been placed yet.
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
