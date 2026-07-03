'use client';

import { useState } from 'react';
import { uploadFile } from '@/lib/firebase/storage';
import { UploadCloud, File as FileIcon, X, Loader2 } from 'lucide-react';
import { createOrder } from '@/app/actions/orders';
import { toast } from 'sonner';

type OrderConfiguratorProps = {
  service: any;
};

export default function OrderConfigurator({ service }: OrderConfiguratorProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const isInstant = service.pricingType === 'INSTANT';
  const estimatedPrice = isInstant ? (service.basePrice || 0) * quantity : null;

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        toast.error('File is too large. Maximum size is 100MB.');
        e.target.value = '';
        return;
      }

      setFiles([...files, file]);

      setIsUploading(true);
      setUploadProgress(0);
      try {
        const url = await uploadFile(file, `orders/customer_artwork`, setUploadProgress);
        setFileUrls([...fileUrls, url]);
      } catch (error: any) {
        toast.error(`Upload failed: ${error.message}`);
        // Remove the file from the array if upload failed
        setFiles(files.filter(f => f.name !== file.name));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFileUrls(fileUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isUploading) {
        toast.error("Please wait for files to finish uploading.");
        setIsSubmitting(false);
        return;
      }
      
      // Submit the order to the backend, appending fileUrls to specs
      const response = await createOrder({
        serviceId: service.id,
        quantity,
        specs: { notes, artworkUrls: fileUrls },
        isInstant,
        basePrice: service.basePrice,
      });

      if (!response.success || !response.order) {
        throw new Error(response.error || 'Failed to create order');
      }

      // If INSTANT, initialize Paystack checkout
      if (isInstant) {
        const paystackRes = await fetch('/api/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: response.order.id,
            amount: response.order.totalAmount
          })
        });

        const paystackData = await paystackRes.json();
        
        if (paystackData.authorizationUrl) {
          window.location.href = paystackData.authorizationUrl;
        } else {
          throw new Error('Failed to initialize payment gateway');
        }
      } else {
        // If QUOTE_REQUIRED, redirect to dashboard
        window.location.href = '/dashboard';
      }
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred submitting your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      
      {/* Configuration Section */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Specifications</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input 
            type="number" 
            min="1" 
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full sm:w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea 
            rows={3} 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Please ensure the colors are vibrant. Paper should be 300gsm."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2 text-sm"
          />
        </div>
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Artwork & Files</h3>
        
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition">
          <div className="space-y-1 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>{isUploading ? `Uploading ${uploadProgress.toFixed(0)}%...` : 'Upload files'}</span>
                <input id="file-upload" name="file-upload" type="file" accept=".pdf,.jpg,.jpeg,.png,.tiff" className="sr-only" onChange={handleFileChange} disabled={isUploading} />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">PDF, PNG, JPG, AI up to 100MB</p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 bg-gray-50">
                <div className="flex items-center overflow-hidden">
                  <FileIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mr-2" />
                  <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                </div>
                <button type="button" onClick={() => removeFile(idx)} className="p-1 text-gray-400 hover:text-red-500 rounded-full" disabled={isUploading}>
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summary and Submit */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600 font-medium">Estimated Total</span>
          {isInstant ? (
            <span className="text-2xl font-bold text-gray-900">GHS {estimatedPrice?.toFixed(2)}</span>
          ) : (
            <span className="text-lg font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Custom Quote</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white ${
            isInstant ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : isInstant ? (
            'Proceed to Payment'
          ) : (
            'Request Quotation'
          )}
        </button>
      </div>
    </form>
  );
}
