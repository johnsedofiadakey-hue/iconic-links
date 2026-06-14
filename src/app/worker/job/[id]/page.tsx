import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import WorkerJobUpdater from './WorkerJobUpdater';
import WorkerMaterialLogger from './WorkerMaterialLogger';

export default async function WorkerJobPage({ params }: { params: { id: string } }) {
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

  // Ensure they have staff access
  if (!user || user.role === 'CUSTOMER') redirect('/admin/login');

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { service: true } },
      user: true,
    }
  });

  const inventoryItems = await prisma.inventoryItem.findMany({
    orderBy: { name: 'asc' }
  });

  if (!order) return <div className="p-8 text-center">Order not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="bg-gray-900 text-white p-4 shadow flex justify-between items-center">
        <h1 className="font-bold text-lg">Order #{order.orderNumber}</h1>
        <span className="bg-blue-600 px-2 py-1 rounded text-xs font-bold uppercase">{order.status}</span>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Job Details Card */}
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-900">
          <h2 className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Job Specifications</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={item.id} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <p className="font-bold text-gray-900">{i+1}. {item.service.name}</p>
                <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                {item.specs && (
                  <div className="mt-1 bg-gray-50 p-2 rounded text-xs text-gray-600 font-mono">
                    {Object.entries(item.specs).map(([k, v]) => (
                      <div key={k}><span className="font-bold text-gray-800">{k}:</span> {v as string}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h2 className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Customer</h2>
          <p className="font-medium text-gray-900">{order.user.name || order.user.phone}</p>
        </div>

        {/* Material Logger */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h2 className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-4">Log Material Usage</h2>
          <WorkerMaterialLogger orderId={order.id} inventoryItems={inventoryItems} workerId={user.id} />
        </div>

        {/* Update Status Actions */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h2 className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-4">Update Production Stage</h2>
          <WorkerJobUpdater order={order} userId={user.id} />
        </div>
      </main>
    </div>
  );
}
