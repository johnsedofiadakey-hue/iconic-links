'use client';

import { useState } from 'react';
import { assignDriver, markDelivered } from '@/app/actions/delivery';
import { Loader2, UserPlus, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function DeliveryActionButtons({ delivery, drivers }: { delivery: any, drivers: any[] }) {
  const [loading, setLoading] = useState(false);
  const [driverId, setDriverId] = useState('');

  const handleAssign = async () => {
    if (!driverId) return;
    setLoading(true);
    const res = await assignDriver(delivery.id, driverId);
    setLoading(false);
    if (!res.success) toast.error(res.error);
  };

  const handleMarkDelivered = async () => {
    setLoading(true);
    const res = await markDelivered(delivery.id);
    setLoading(false);
    if (!res.success) toast.error(res.error);
  };

  if (delivery.status === 'PENDING') {
    return (
      <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md border border-gray-100">
        <select 
          className="text-sm border p-2 rounded flex-1 bg-white"
          value={driverId}
          onChange={e => setDriverId(e.target.value)}
        >
          <option value="">-- Assign a Driver --</option>
          {drivers.map(d => <option key={d.id} value={d.id}>{d.name || d.email}</option>)}
        </select>
        <button 
          onClick={handleAssign}
          disabled={loading || !driverId}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50 flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UserPlus className="w-4 h-4 mr-2" /> Dispatch</>}
        </button>
      </div>
    );
  }

  if (delivery.status === 'DISPATCHED') {
    return (
      <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md border border-blue-100">
        <p className="text-sm text-blue-800 font-medium">
          Assigned to: {delivery.driver?.name || delivery.driver?.email || 'Driver'}
        </p>
        <button 
          onClick={handleMarkDelivered}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50 flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Mark Delivered</>}
        </button>
      </div>
    );
  }

  return null;
}
