import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, FileText } from 'lucide-react';
import ProofReviewPanel from '../ProofReviewPanel';
import PayNowButton from '../PayNowButton';
import { getUserByIdentifier, getOrderWithDetails } from '@/lib/db';

export default async function CustomerOrderDetail({ params }: { params: { orderId: string } }) {
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

  const orderResult = await getOrderWithDetails({ id: params.orderId });
  const order = orderResult.data.order;

  const belongsToUser = Boolean(
    (order?.user?.phone && order.user.phone === user.phone) ||
    (order?.user?.email && order.user.email === user.email)
  );

  if (!order || !belongsToUser) {
    redirect('/dashboard');
  }

  const pendingProof = order.proofs_on_order?.find((p: any) => p.status === 'PENDING');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <Link href="/dashboard" className="p-2 -ml-2 text-gray-600 hover:text-blue-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2 text-gray-900">Order {order.orderNumber}</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {order.status.replace('_', ' ')}
            </span>
            <span className="font-bold text-gray-900">GHS {order.totalAmount.toFixed(2)}</span>
          </div>

          {order.status === 'AWAITING_PAYMENT' && (
            <PayNowButton orderId={order.id} amount={order.totalAmount} />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Items</h2>
          <ul className="divide-y divide-gray-100">
            {order.orderItems_on_order?.map((item: any) => (
              <li key={item.id} className="py-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">{item.service?.name}</span>
                  <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                </div>
                {item.specs?.notes && (
                  <p className="text-sm text-gray-500 mt-1">{item.specs.notes}</p>
                )}
                {Array.isArray(item.specs?.artworkUrls) && item.specs.artworkUrls.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {item.specs.artworkUrls.map((url: string, i: number) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-xs text-blue-600 hover:text-blue-700"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1" /> Uploaded file {i + 1}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {pendingProof && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <ProofReviewPanel proof={pendingProof} userId={user.id} />
          </div>
        )}
      </main>
    </div>
  );
}
