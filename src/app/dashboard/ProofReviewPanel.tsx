'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Loader2, Eye } from 'lucide-react';
import { approveProof, rejectProof } from '@/app/actions/proofs';
import { toast } from 'sonner';

export default function ProofReviewPanel({ proof, userId }: { proof: any, userId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [comments, setComments] = useState('');

  const handleApprove = async () => {
    setLoading(true);
    const res = await approveProof(proof.id, userId);
    setLoading(false);
    if (res.success) {
      toast.success('Proof approved. Your order has moved to printing.');
      router.refresh();
    } else {
      toast.error(res.error || 'Failed to approve proof.');
    }
  };

  const handleReject = async () => {
    if (!comments) {
      toast.error("Please provide comments explaining why the proof is rejected.");
      return;
    }
    setLoading(true);
    const res = await rejectProof(proof.id, comments);
    setLoading(false);
    setRejecting(false);
    if (res.success) {
      toast.success('Feedback submitted. The design team has been notified.');
      router.refresh();
    } else {
      toast.error(res.error || 'Failed to submit feedback.');
    }
  };

  if (proof.status !== 'PENDING') return null;

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-blue-900">Artwork Proof Ready (v{proof.version})</h4>
          <p className="text-sm text-blue-800 mt-1">Please review the artwork before we proceed to production.</p>
        </div>
        <a 
          href={proof.fileUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center text-sm bg-white border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-50 transition text-blue-700 font-medium"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Proof
        </a>
      </div>

      {!rejecting ? (
        <div className="flex space-x-3">
          <button 
            onClick={handleApprove}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Approve & Print</>}
          </button>
          <button 
            onClick={() => setRejecting(true)}
            disabled={loading}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-md text-sm font-medium flex justify-center items-center transition"
          >
            <X className="w-4 h-4 mr-2" /> Request Changes
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea 
            className="w-full text-sm p-2 border border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            rows={2} 
            placeholder="Explain what needs to be changed..."
            value={comments}
            onChange={e => setComments(e.target.value)}
          />
          <div className="flex space-x-3">
            <button 
              onClick={handleReject}
              disabled={loading || !comments}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium flex justify-center items-center transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Changes'}
            </button>
            <button 
              onClick={() => setRejecting(false)}
              disabled={loading}
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-md text-sm font-medium flex justify-center items-center transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
