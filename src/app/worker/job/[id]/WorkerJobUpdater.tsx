'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/app/actions/worker';
import { Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function WorkerJobUpdater({ order, userId }: { order: any, userId: string }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: string) => {
    setLoading(true);
    const res = await updateOrderStatus(order.id, newStatus, userId);
    setLoading(false);
    if (!res.success) toast.error(res.error);
  };

  const getNextStages = () => {
    switch (order.status) {
      case 'AWAITING_APPROVAL':
        return []; // Only customer can approve
      case 'PRINTING':
        return [
          { status: 'FINISHING', label: 'Move to Finishing', color: 'bg-indigo-600 hover:bg-indigo-700' },
          { status: 'QC_REJECTED', label: 'Report Print Error (QC)', color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'FINISHING':
        return [
          { status: 'READY_FOR_PICKUP', label: 'Ready for Pickup', color: 'bg-green-600 hover:bg-green-700' },
          { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', color: 'bg-blue-600 hover:bg-blue-700' },
          { status: 'QC_REJECTED', label: 'Report Finishing Error', color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'QC_REJECTED':
        return [
          { status: 'PRINTING', label: 'Restart Printing', color: 'bg-orange-600 hover:bg-orange-700' }
        ];
      case 'READY_FOR_PICKUP':
        return [
          { status: 'COMPLETED', label: 'Mark as Completed (Handed over)', color: 'bg-green-800 hover:bg-green-900' }
        ];
      default:
        // Generic next stages if not mapped
        return [
          { status: 'PRINTING', label: 'Start Printing', color: 'bg-blue-600 hover:bg-blue-700' }
        ];
    }
  };

  const buttons = getNextStages();

  if (buttons.length === 0) {
    return <p className="text-sm text-gray-500 italic">Waiting for customer approval or external action.</p>;
  }

  return (
    <div className="space-y-3">
      {buttons.map(btn => (
        <button
          key={btn.status}
          onClick={() => handleUpdate(btn.status)}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-sm font-bold text-white shadow flex justify-between items-center transition ${btn.color} disabled:opacity-50`}
        >
          {btn.label}
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      ))}
    </div>
  );
}
