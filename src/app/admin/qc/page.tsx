import { hasPermission } from '@/lib/rbac';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';
import QCActionButtons from './QCActionButtons';
import { getUserByIdentifier, listOrdersForQc } from '@/lib/db';

export default async function QCDashboard() {
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

  if (!user || !hasPermission(user.role, 'QC')) {
    redirect('/admin/dashboard');
  }

  // QC Officer mostly cares about things that have finished printing/finishing
  const ordersResult = await listOrdersForQc();
  const orders = ordersResult.data.orders;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gray-900 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold max-w-5xl mx-auto w-full">Quality Control Dashboard</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {orders.map((order: any) => (
              <li key={order.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link href={`/admin/orders/${order.id}`} className="text-lg font-bold text-blue-600 hover:underline">
                      Order #{order.orderNumber}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{order.user?.name || order.user?.phone}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'QC_REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded border border-gray-100 mb-4">
                  {order.orderItems_on_order?.map((item: any, i: number) => (
                    <div key={item.id} className="mb-2 last:mb-0 text-sm">
                      <span className="font-bold text-gray-900">{item.service?.name}</span> (Qty: {item.quantity})
                    </div>
                  ))}
                </div>

                {order.status !== 'QC_REJECTED' && (
                  <QCActionButtons orderId={order.id} userId={user.id} />
                )}
              </li>
            ))}
            {orders.length === 0 && (
              <li className="px-6 py-12 text-center text-gray-500">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>No orders pending quality control.</p>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
