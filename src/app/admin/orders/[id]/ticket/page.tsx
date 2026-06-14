import QRCode from 'react-qr-code';
import { notFound } from 'next/navigation';
import { getOrderWithDetails } from '@/lib/db';

export default async function JobTicketPage({ params }: { params: { id: string } }) {
  const orderResult = await getOrderWithDetails({ id: params.id });
  const order = orderResult.data.order;

  if (!order) return notFound();

  // The URL the worker will scan
  const workerAppUrl = `${process.env.NEXT_PUBLIC_APP_URL}/worker/job/${order.id}`;

  return (
    <div className="bg-white min-h-screen text-black p-8 font-mono">
      <div className="max-w-2xl mx-auto border-2 border-black p-8">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">ICON LINKS</h1>
            <p className="text-sm mt-1 uppercase">Production Job Ticket</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{order.orderNumber}</p>
            <p className="text-sm uppercase">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Customer Name</p>
            <p className="font-bold text-lg">{order.user?.name || 'Walk-in Customer'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Contact</p>
            <p className="font-bold text-lg">{order.user?.phone || order.user?.email}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="border-t-2 border-b-2 border-black py-6 mb-6">
          <p className="text-xs text-gray-500 uppercase mb-4">Job Specifications</p>
          {order.orderItems_on_order?.map((item: any, i: number) => (
            <div key={item.id} className="mb-4 last:mb-0">
              <div className="flex justify-between font-bold text-xl mb-1">
                <span>{i+1}. {item.service?.name}</span>
                <span>QTY: {item.quantity}</span>
              </div>
              {item.specs && (
                <div className="bg-gray-100 p-3 mt-2 text-sm">
                  {Object.entries(item.specs).map(([k, v]) => (
                    <div key={k}><span className="font-bold capitalize">{k}:</span> {v as string}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* QR Code Section */}
        <div className="flex justify-between items-center mt-8">
          <div className="w-1/2 pr-8">
            <h3 className="font-bold text-lg uppercase mb-2">Instructions for Staff</h3>
            <p className="text-sm">Scan the QR code with your mobile device to open the Worker App. From there, you can start the timer, log materials used, report QC issues, and update the production status.</p>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="border-4 border-black p-4">
              <QRCode value={workerAppUrl} size={150} />
            </div>
          </div>
        </div>

      </div>

      {/* Auto Print Script */}
      <script dangerouslySetInnerHTML={{ __html: 'window.print();' }} />
    </div>
  );
}
