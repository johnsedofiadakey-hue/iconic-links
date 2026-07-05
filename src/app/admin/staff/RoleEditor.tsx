'use client';

import { useState } from 'react';
import { updateUserRoleAction } from '@/app/actions/users';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function RoleEditor({ userId, currentRole }: { userId: string, currentRole: string }) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const roles = [
    'CUSTOMER',
    'PRODUCTION_WORKER',
    'QC_OFFICER',
    'DELIVERY_DRIVER',
    'CUSTOMER_SERVICE',
    'MANAGER',
    'SUPER_ADMIN'
  ];

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    setLoading(true);

    const result = await updateUserRoleAction(userId, newRole);
    
    if (result.success) {
      toast.success(`Role updated to ${newRole}`);
    } else {
      toast.error(result.error);
      setRole(currentRole); // revert
    }
    
    setLoading(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={role}
        onChange={handleRoleChange}
        disabled={loading}
        className="text-sm p-2 border rounded-md bg-white disabled:opacity-50 min-w-[180px]"
      >
        {roles.map(r => (
          <option key={r} value={r}>{r.replace('_', ' ')}</option>
        ))}
      </select>
      {loading && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
    </div>
  );
}
