'use client';

import { useState } from 'react';
import { linkUserToOrganization } from '@/app/actions/organizations';
import { Loader2, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function UserLinker({ organizations, users }: { organizations: any[], users: any[] }) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [orgId, setOrgId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await linkUserToOrganization(userId, orgId);
    setLoading(false);

    if (res.success) {
      setUserId('');
      setOrgId('');
      toast.success('User successfully linked to organization.');
    } else {
      toast.error(res.error);
    }
  };

  if (organizations.length === 0 || users.length === 0) {
    return <p className="text-sm text-gray-500 italic">Create an organization and ensure customers exist before linking.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
        <select 
          required
          value={userId}
          onChange={e => setUserId(e.target.value)}
          className="w-full text-sm p-2 border rounded-md bg-white"
        >
          <option value="" disabled>-- Select Customer --</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name || u.phone || u.email}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
        <select 
          required
          value={orgId}
          onChange={e => setOrgId(e.target.value)}
          className="w-full text-sm p-2 border rounded-md bg-white"
        >
          <option value="" disabled>-- Select Organization --</option>
          {organizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <button 
        type="submit"
        disabled={loading || !userId || !orgId}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LinkIcon className="w-4 h-4 mr-2"/> Link to Account</>}
      </button>
    </form>
  );
}
