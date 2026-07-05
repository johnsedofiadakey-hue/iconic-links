import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import DeliveryActionButtons from './DeliveryActionButtons';
import { Truck } from 'lucide-react';
import { listActiveDeliveries, listUsersByRole } from '@/lib/db';
import { DELIVERY_STATUS } from '@/lib/constants';

export default async function DeliveryDashboard() {
  await requireAdminAuth(ROLE_PERMISSIONS.DELIVERY as unknown as string[]);

  const deliveriesResult = await listActiveDeliveries();
  const deliveries = deliveriesResult.data.deliveries;

  const driversResult = await listUsersByRole({ role: 'DELIVERY_DRIVER' });
  const drivers = driversResult.data.users;

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Delivery Dispatch</h1>
          <p className="text-sm text-gray-500">Assign drivers and monitor shipments</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="space-y-4">
          {deliveries.map((delivery: any) => (
            <div key={delivery.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm card-interactive">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Order #{delivery.order.orderNumber}</h3>
                  <p className="text-sm text-gray-500 mt-1"><strong>Customer:</strong> {delivery.order.user?.name || delivery.order.user?.phone}</p>
                  <p className="text-sm text-gray-500 mt-0.5"><strong>Address:</strong> {delivery.address}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                  delivery.status === DELIVERY_STATUS.PENDING ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {delivery.status}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50">
                <DeliveryActionButtons delivery={delivery} drivers={drivers} />
              </div>
            </div>
          ))}
          {deliveries.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Truck className="mx-auto h-12 w-12 text-gray-300 mb-3 animate-pulse" />
              <h3 className="font-bold text-gray-900">All Shipments Dispatched</h3>
              <p className="text-gray-500 text-sm mt-1">No active deliveries pending dispatch.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
