import { hasPermission } from '@/lib/rbac';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import InventoryAddForm from './InventoryAddForm';
import { getUserByIdentifier, listInventoryItems } from '@/lib/db';

export default async function AdminInventoryPage() {
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

  if (!user || !hasPermission(user.role, 'INVENTORY')) {
    redirect('/admin/dashboard');
  }

  const itemsResult = await listInventoryItems();
  const items = itemsResult.data.inventoryItems;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gray-900 text-white p-6 shadow-md">
        <h1 className="text-xl font-bold max-w-5xl mx-auto">Inventory Management</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-4">Add New Material</h2>
            <InventoryAddForm />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unitType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-bold ${item.quantity <= 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {item.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">No inventory items found.</td>
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
