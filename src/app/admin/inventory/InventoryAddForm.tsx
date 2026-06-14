'use client';

import { useState } from 'react';
import { addInventoryItem } from '@/app/actions/inventory';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function InventoryAddForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [unitType, setUnitType] = useState('Units');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await addInventoryItem(name, unitType, Number(quantity));
    setLoading(false);

    if (res.success) {
      setName('');
      setQuantity('');
      toast.success('Material added successfully.');
    } else {
      toast.error(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Material Name</label>
        <input 
          required
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. 300gsm A3 Paper"
          className="w-full text-sm p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measurement</label>
        <select 
          value={unitType}
          onChange={e => setUnitType(e.target.value)}
          className="w-full text-sm p-2 border rounded-md bg-white"
        >
          <option value="Units">Units (Items)</option>
          <option value="Sheets">Sheets</option>
          <option value="Meters">Meters</option>
          <option value="Rolls">Rolls</option>
          <option value="Liters">Liters (Ink)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
        <input 
          required
          type="number" 
          min="0"
          step="0.01"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="e.g. 500"
          className="w-full text-sm p-2 border rounded-md"
        />
      </div>
      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Material'}
      </button>
    </form>
  );
}
