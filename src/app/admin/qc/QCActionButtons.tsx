'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/app/actions/worker';
import { Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function QCActionButtons({ orderId, userId }: { orderId: string, userId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (status: string) => {
    setLoading(true);
    const res = await updateOrderStatus(orderId, status, userId);
    setLoading(false);
    if (!res.success) toast.error(res.error);
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => handleAction('READY_FOR_PICKUP')}
        disabled={loading}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Pass QC</>}
      </button>
      <button 
        onClick={() => handleAction('QC_REJECTED')}
        disabled={loading}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><X className="w-4 h-4 mr-2" /> Reject & Reprint</>}
      </button>
    </div>
  );
}
