import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import { hasPermission } from '@/lib/rbac';
import { getUserByIdentifier, listAllUsers } from '@/lib/db';
import RoleEditor from './RoleEditor';
import { Users } from 'lucide-react';

export default async function StaffManagementPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/admin/login');

  let adminUser;
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const identifier = decodedClaims.email || decodedClaims.phone_number;
    if (identifier) {
      const userResult = await getUserByIdentifier({ identifier });
      if (userResult.data.users.length > 0) {
        adminUser = userResult.data.users[0];
      }
    }
  } catch {
    redirect('/admin/login');
  }

  // Only users with ORGANIZATIONS access (like SUPER_ADMIN) can manage staff
  if (!adminUser || !hasPermission(adminUser.role, 'ORGANIZATIONS')) {
    redirect('/admin/dashboard');
  }

  const usersResult = await listAllUsers();
  const allUsers = usersResult.data.users;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gray-900 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold max-w-5xl mx-auto w-full">Staff Management</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Users className="mr-2 w-5 h-5 text-gray-500" />
              User Role Assignments
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Elevate standard customers to staff members (e.g. Production Worker, QC Officer).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allUsers.map((u: any) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{u.name || 'Unnamed User'}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1">{u.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{u.email || u.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RoleEditor userId={u.id} currentRole={u.role || 'CUSTOMER'} />
                    </td>
                  </tr>
                ))}
                {allUsers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500 italic">
                      No users found.
                    </td>
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
