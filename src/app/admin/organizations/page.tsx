import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import OrgAddForm from './OrgAddForm';
import UserLinker from './UserLinker';
import { Building2 } from 'lucide-react';
import { listOrganizationsWithUsers, listUsersByRole } from '@/lib/db';

export default async function OrganizationsDashboard() {
  await requireAdminAuth(ROLE_PERMISSIONS.ORGANIZATIONS as unknown as string[]);

  const orgResult = await listOrganizationsWithUsers();
  const organizations = orgResult.data.organizations;

  const usersResult = await listUsersByRole({ role: 'CUSTOMER' });
  const allUsers = usersResult.data.users;

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12 animate-fade-in">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Corporate Accounts</h1>
          <p className="text-sm text-gray-500">Manage client organizations and shared billing</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4 text-gray-900">New Account</h2>
            <OrgAddForm />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg mb-4 text-gray-900">Link Customer</h2>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Link a customer to an organization for consolidated invoice billing.</p>
            <UserLinker organizations={organizations} users={allUsers} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <h2 className="font-bold text-gray-900 text-sm">Corporate Client Profiles</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {organizations.map((org: any) => (
                <li key={org.id} className="p-6 hover:bg-gray-50/20 transition">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-bold text-gray-905">{org.name}</h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg">
                      {org.users_on_organization?.length || 0} Members
                    </span>
                  </div>

                  {org.users_on_organization && org.users_on_organization.length > 0 ? (
                    <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100/50">
                      <ul className="space-y-2">
                        {org.users_on_organization.map((u: any) => (
                          <li key={u.id} className="text-xs flex justify-between">
                            <span className="font-semibold text-gray-700">{u.name || 'Unnamed Member'}</span>
                            <span className="text-gray-400 font-mono">{u.phone || u.email}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">No users linked to this account yet.</p>
                  )}
                </li>
              ))}
              {organizations.length === 0 && (
                <li className="px-6 py-16 text-center text-gray-400">
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
