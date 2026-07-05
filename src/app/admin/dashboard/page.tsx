import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ROLES } from '@/lib/rbac';
import { getUserByIdentifier, listRecentOrders } from '@/lib/db';
import { 
  Printer, 
  Monitor, 
  Maximize, 
  Image as ImageIcon, 
  Scissors, 
  PenTool,
  Clock,
  Settings,
  Truck,
  CheckCircle,
  AlertTriangle,
  FileSearch,
  PackageCheck
} from 'lucide-react';

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

  // Only allow staff roles to access admin dashboard
  const staffRoles = [ROLES.SUPER_ADMIN, ROLES.MANAGER, ROLES.CUSTOMER_SERVICE, ROLES.PRODUCTION_WORKER, ROLES.QC_OFFICER, ROLES.DELIVERY_DRIVER];
  if (!user || !staffRoles.includes(user.role as any)) redirect('/admin/login');

  const ordersResult = await listRecentOrders();
  const allOrders = ordersResult.data.orders || [];

  // Group orders by workflow stages
  const prepressStatuses = ['AWAITING_QUOTATION', 'AWAITING_PAYMENT', 'PREFLIGHT', 'DESIGN_IN_PROGRESS', 'AWAITING_APPROVAL'];
  const productionStatuses = ['PRINTING', 'FINISHING'];
  const qcStatuses = ['QC_REJECTED'];
  const dispatchStatuses = ['READY_FOR_PICKUP', 'OUT_FOR_DELIVERY'];

  const prepressOrders = allOrders.filter((o: any) => prepressStatuses.includes(o.status));
  const productionOrders = allOrders.filter((o: any) => productionStatuses.includes(o.status));
  const qcOrders = allOrders.filter((o: any) => qcStatuses.includes(o.status));
  const dispatchOrders = allOrders.filter((o: any) => dispatchStatuses.includes(o.status));

  // Helper component for order cards
  const OrderCard = ({ order }: { order: any }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{order.orderNumber}</span>
          <h4 className="font-semibold text-gray-900 mt-0.5 line-clamp-1">{order.orderItems_on_order[0]?.service?.name || 'Custom Print Job'}</h4>
        </div>
        <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
          {order.status.replace(/_/g, ' ')}
        </span>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div className="text-sm text-gray-600">
          <p>{order.user?.phone || order.user?.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">Qty: {order.orderItems_on_order[0]?.quantity || 1}</p>
        </div>
        <p className="font-bold text-gray-900 text-sm">GHS {order.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-12">
      <header className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Production Engine</h1>
          <p className="text-sm text-gray-500 font-medium">Overview & Active Workflows</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/services" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition">
            Services Catalog
          </Link>
          <Link href="/admin/qr-generator" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm">
            Scan QR
          </Link>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 pt-8">
        {/* Production Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-indigo-100 hover:shadow-md transition">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <FileSearch className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Prepress & Design</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{prepressOrders.length}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-amber-100 hover:shadow-md transition">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
              <Settings className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">In Production</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{productionOrders.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-red-100 hover:shadow-md transition">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">QC Holds</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{qcOrders.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-emerald-100 hover:shadow-md transition">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ready / Dispatch</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{dispatchOrders.length}</h3>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Production Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition text-center group">
              <Monitor className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-800 text-sm">Digital Printing</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition text-center group">
              <Maximize className="w-8 h-8 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-800 text-sm">Large Format</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition text-center group">
              <Scissors className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-800 text-sm">Print & Cut</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition text-center group">
              <ImageIcon className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-800 text-sm">Picture Framing</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition text-center group">
              <PenTool className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-gray-800 text-sm">Graphic Design</span>
            </div>
          </div>
        </div>

        {/* Workflow Board */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-400" />
            Active Job Workflows
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Column 1 */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-gray-700 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  Prepress / Setup
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{prepressOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {prepressOrders.length > 0 ? (
                  prepressOrders.map((order: any) => <OrderCard key={order.id} order={order} />)
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-10">No jobs in prepress.</p>
                )}
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-gray-700 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                  In Production
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{productionOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {productionOrders.length > 0 ? (
                  productionOrders.map((order: any) => <OrderCard key={order.id} order={order} />)
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-10">No jobs currently printing.</p>
                )}
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-gray-700 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  QC Holds
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{qcOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {qcOrders.length > 0 ? (
                  qcOrders.map((order: any) => <OrderCard key={order.id} order={order} />)
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-10">No QC issues.</p>
                )}
              </div>
            </div>

            {/* Column 4 */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-gray-700 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  Dispatch
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{dispatchOrders.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {dispatchOrders.length > 0 ? (
                  dispatchOrders.map((order: any) => <OrderCard key={order.id} order={order} />)
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-10">No jobs ready for dispatch.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Global styles for custom scrollbar to keep it clean */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
        }
      `}} />
    </div>
  );
}
