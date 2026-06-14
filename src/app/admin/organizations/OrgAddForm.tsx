'use client';

import { useState } from 'react';
import { createOrganization } from '@/app/actions/organizations';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OrgAddForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createOrganization(name);
    setLoading(false);

    if (res.success) {
      setName('');
      toast.success('Corporate account created.');
    } else {
      toast.error(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
        <input 
          required
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Acme Corp"
          className="w-full text-sm p-2 border rounded-md"
        />
      </div>
      <button 
        type="submit"
        disabled={loading || !name}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
      </button>
    </form>
  );
}
