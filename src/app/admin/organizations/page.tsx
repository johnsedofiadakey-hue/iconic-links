import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import OrgAddForm from './OrgAddForm';
import UserLinker from './UserLinker';
import { Building2 } from 'lucide-react';

export default async function OrganizationsDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/admin/login');

  let adminUser;
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    adminUser = await prisma.user.findFirst({ where: { email: decodedClaims.email } });
  } catch {
    redirect('/admin/login');
  }

  if (!adminUser || adminUser.role === 'CUSTOMER') redirect('/admin/dashboard');

  const organizations = await prisma.organization.findMany({
    include: { users: true },
    orderBy: { name: 'asc' }
  });

  const allUsers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gray-900 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold max-w-5xl mx-auto w-full">Corporate Accounts</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="font-bold text-lg mb-4">New Corporate Account</h2>
            <OrgAddForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="font-bold text-lg mb-4">Link Customer</h2>
            <p className="text-xs text-gray-500 mb-4">Link an existing customer to a corporate account for consolidated billing.</p>
            <UserLinker organizations={organizations} users={allUsers} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {organizations.map(org => (
                <li key={org.id} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{org.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                      {org.users.length} Linked Users
                    </span>
                  </div>
                  
                  {org.users.length > 0 ? (
                    <div className="bg-gray-50 rounded border border-gray-100 p-3">
                      <ul className="space-y-2">
                        {org.users.map(u => (
                          <li key={u.id} className="text-sm flex justify-between">
                            <span className="font-medium text-gray-800">{u.name || 'Unnamed'}</span>
                            <span className="text-gray-500">{u.phone || u.email}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No users linked yet.</p>
                  )}
                </li>
              ))}
              {organizations.length === 0 && (
                <li className="px-6 py-12 text-center text-gray-500">
                  <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p>No corporate accounts registered.</p>
                </li>
              )}
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}
