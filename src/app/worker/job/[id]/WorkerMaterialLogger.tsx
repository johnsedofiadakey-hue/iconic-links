'use client';

import { useState } from 'react';
import { logConsumption } from '@/app/actions/inventory';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function WorkerMaterialLogger({ orderId, inventoryItems, workerId }: { orderId: string, inventoryItems: any[], workerId: string }) {
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState('');
  const [used, setUsed] = useState('');
  const [wastage, setWastage] = useState('0');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId || !used) return;

    setLoading(true);
    const res = await logConsumption(orderId, itemId, Number(used), Number(wastage), workerId);
    setLoading(false);

    if (res.success) {
      toast.success('Material usage logged successfully.');
      setItemId('');
      setUsed('');
      setWastage('0');
    } else {
      toast.error(res.error);
    }
  };

  if (inventoryItems.length === 0) return <p className="text-sm text-gray-500 italic">No inventory items available.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Select Material</label>
        <select 
          required 
          value={itemId} 
          onChange={e => setItemId(e.target.value)}
          className="w-full text-sm p-2 border rounded bg-white"
        >
          <option value="" disabled>-- Select Material --</option>
          {inventoryItems.map(item => (
            <option key={item.id} value={item.id}>{item.name} ({item.unitType})</option>
          ))}
        </select>
      </div>

      <div className="flex space-x-3">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Qty Used</label>
          <input 
            required 
            type="number" 
            min="0"
            step="0.01"
            value={used}
            onChange={e => setUsed(e.target.value)}
            className="w-full text-sm p-2 border rounded"
            placeholder="e.g. 5"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Wastage</label>
          <input 
            required 
            type="number" 
            min="0"
            step="0.01"
            value={wastage}
            onChange={e => setWastage(e.target.value)}
            className="w-full text-sm p-2 border rounded"
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={loading || !itemId || !used}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-1" /> Log Materials</>}
      </button>
    </form>
  );
}
