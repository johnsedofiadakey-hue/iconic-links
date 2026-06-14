'use client';

import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Camera, X } from 'lucide-react';

export default function WorkerScannerPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleScan = (text: string) => {
    if (text.includes('/worker/job/')) {
      // It's a valid internal URL from the ticket
      router.push(text);
    } else {
      setError('Invalid Job Ticket QR Code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <Camera className="w-5 h-5 mr-2 text-blue-400" />
          <h1 className="font-bold">Scan Job Ticket</h1>
        </div>
        <button onClick={() => router.push('/admin/dashboard')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
          <X className="w-4 h-4" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm aspect-square bg-black rounded-lg overflow-hidden border-2 border-gray-700 shadow-2xl relative">
          <Scanner 
            onScan={(results) => {
              if (results && results.length > 0) handleScan(results[0].rawValue);
            }}
            onError={(err) => setError(err?.message || 'Camera error')}
          />
          <div className="absolute inset-0 pointer-events-none border-[40px] border-black/50" />
          <div className="absolute inset-x-12 inset-y-12 border-2 border-blue-500 rounded pointer-events-none" />
        </div>

        {error && (
          <div className="mt-6 bg-red-900/50 text-red-200 px-4 py-2 rounded text-sm border border-red-800">
            {error}
          </div>
        )}
        
        <p className="mt-8 text-center text-sm text-gray-400 max-w-xs">
          Point your camera at the QR Code on the physical job ticket to pull up production details.
        </p>
      </main>
    </div>
  );
}
