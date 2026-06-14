import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import DeliveryActionButtons from './DeliveryActionButtons';
import { Truck } from 'lucide-react';

export default async function DeliveryDashboard() {
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

  if (!user || user.role === 'CUSTOMER') redirect('/admin/dashboard');

  const deliveries = await prisma.delivery.findMany({
    where: { status: { not: 'DELIVERED' } },
    include: { order: { include: { user: true } }, driver: true },
    orderBy: { createdAt: 'desc' }
  });

  const drivers = await prisma.user.findMany({
    where: { role: 'DELIVERY_DRIVER' }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gray-900 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold max-w-5xl mx-auto w-full">Delivery Dispatch</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {deliveries.map(delivery => (
              <li key={delivery.id} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Order #{delivery.order.orderNumber}</h3>
                    <p className="text-sm text-gray-600 mt-1"><strong>Customer:</strong> {delivery.order.user.name || delivery.order.user.phone}</p>
                    <p className="text-sm text-gray-600 mt-1"><strong>Address:</strong> {delivery.address}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    delivery.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {delivery.status}
                  </span>
                </div>

                <div className="mt-4">
                  <DeliveryActionButtons delivery={delivery} drivers={drivers} />
                </div>
              </li>
            ))}
            {deliveries.length === 0 && (
              <li className="px-6 py-12 text-center text-gray-500">
                <Truck className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>No active deliveries.</p>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
