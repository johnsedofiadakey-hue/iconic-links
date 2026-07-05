import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import InventoryAddForm from './InventoryAddForm';
import { listInventoryItems } from '@/lib/db';
import { Package, AlertTriangle } from 'lucide-react';

export default async function AdminInventoryPage() {
  await requireAdminAuth(ROLE_PERMISSIONS.INVENTORY as unknown as string[]);

  const itemsResult = await listInventoryItems();
  const items = itemsResult.data.inventoryItems;

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">Track materials and stock levels</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4 text-gray-900">Add Material</h2>
            <InventoryAddForm />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <h2 className="font-bold text-gray-900 text-sm">Stock Levels</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{item.unitType}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-bold ${item.quantity <= 10 ? 'text-red-600' : item.quantity <= 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {item.quantity <= 10 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-lg">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : item.quantity <= 50 ? (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg">Moderate</span>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">In Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-gray-400 text-sm">No inventory items.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
