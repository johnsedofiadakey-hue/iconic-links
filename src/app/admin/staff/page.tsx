import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import { listAllUsers } from '@/lib/db';
import RoleEditor from './RoleEditor';
import { Users } from 'lucide-react';

export default async function StaffManagementPage() {
  // Only users with ORGANIZATIONS access (like SUPER_ADMIN) can manage staff
  await requireAdminAuth(ROLE_PERMISSIONS.ORGANIZATIONS as unknown as string[]);

  const usersResult = await listAllUsers();
  const allUsers = usersResult.data.users;

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12 animate-fade-in">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-500">Manage user roles and permissions</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              User Role Assignments
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Elevate customers to team roles (e.g., Production Worker, Delivery Driver, QC Officer)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/30">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allUsers.map((u: any) => (
                  <tr key={u.id} className="hover:bg-gray-50/30 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{u.name || 'Unnamed User'}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{u.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-semibold">{u.email || u.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RoleEditor userId={u.id} currentRole={u.role || 'CUSTOMER'} />
                    </td>
                  </tr>
                ))}
                {allUsers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400 text-sm">No users found.</td>
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
