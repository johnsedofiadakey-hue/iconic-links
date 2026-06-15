'use client';

import { useState } from 'react';
import { uploadProof } from '@/app/actions/proofs';
import { createDelivery } from '@/app/actions/delivery';
import { UploadCloud, Loader2, QrCode, Truck } from 'lucide-react';
import { uploadFile } from '@/lib/firebase/storage';
import { toast } from 'sonner';

export default function OrderActionsPanel({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);

    try {
      const url = await uploadFile(file, `orders/proofs/${order.id}`, setUploadProgress);
      const res = await uploadProof(order.id, url);
      
      if (res.success) {
        toast.success('Proof uploaded and sent to customer!');
      } else {
        toast.error(res.error);
      }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateJobTicket = () => {
    window.open(`/admin/orders/${order.id}/ticket`, '_blank');
  };

  const handleScheduleDelivery = async () => {
    if (!deliveryAddress) return toast.error('Please enter a delivery address');
    setLoading(true);
    const res = await createDelivery(order.id, deliveryAddress);
    setLoading(false);
    if (res.success) {
      toast.success('Delivery scheduled successfully. Check the Delivery Dispatch dashboard.');
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Proof Uploading Section */}
      {['PREFLIGHT', 'DESIGN_IN_PROGRESS', 'AWAITING_PAYMENT'].includes(order.status) && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Upload Artwork Proof</h3>
          <p className="text-xs text-gray-500 mb-3">Upload a watermarked PDF or Image for customer approval.</p>
          
          <input 
            type="file" 
            id="proof-upload"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.tiff"
            onChange={handleUploadProof}
            disabled={loading}
          />
          <label 
            htmlFor="proof-upload"
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50`}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Uploading {uploadProgress.toFixed(0)}%</> : <><UploadCloud className="w-4 h-4 mr-2" /> Select & Send Proof</>}
          </label>
        </div>
      )}

      {/* Delivery Scheduling Section */}
      {order.status === 'READY_FOR_PICKUP' && !order.delivery && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Schedule Delivery</h3>
          <p className="text-xs text-gray-500 mb-3">Convert this pickup order to a delivery dispatch.</p>
          <textarea 
            placeholder="Enter Delivery Address and Instructions" 
            className="w-full text-sm p-2 border rounded mb-2 bg-white"
            rows={2}
            value={deliveryAddress}
            onChange={e => setDeliveryAddress(e.target.value)}
          />
          <button 
            onClick={handleScheduleDelivery}
            disabled={loading || !deliveryAddress}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Truck className="w-4 h-4 mr-2" /> Schedule Dispatch</>}
          </button>
        </div>
      )}

      {/* Production & Job Ticket Section */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
         <h3 className="text-sm font-bold text-gray-900 mb-2">Production</h3>
         <button 
           onClick={handleGenerateJobTicket}
           className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition"
         >
           <QrCode className="w-4 h-4 mr-2" /> Generate Job Ticket
         </button>
      </div>

    </div>
  );
}
