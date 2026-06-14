'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Link as LinkIcon } from 'lucide-react';

export default function QRCodeGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000');

  useEffect(() => {
    // If running in browser, set base URL to current origin
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const downloadQR = () => {
    const svg = document.getElementById('catalog-qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'icon-links-catalog-qr.png';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Walk-in QR Code Generator</h1>
      
      <div className="bg-white p-8 rounded-lg shadow border border-gray-200 flex flex-col items-center">
        <p className="text-gray-600 text-center mb-8 max-w-lg">
          Print this QR code and place it at the front desk. Customers can scan it with their smartphone camera to instantly access the service catalog without downloading any app.
        </p>

        <div className="p-4 bg-white border-4 border-gray-900 rounded-2xl mb-8">
          <QRCodeSVG 
            id="catalog-qr-code"
            value={baseUrl} 
            size={256}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/icon-links-logo.png", // Optional: Assuming a logo exists in public
              x: undefined,
              y: undefined,
              height: 48,
              width: 48,
              excavate: true,
            }}
          />
        </div>

        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">QR Code Target URL</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10 border px-3"
              />
            </div>
          </div>

          <button
            onClick={downloadQR}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="mr-2 h-5 w-5" />
            Download QR Code (PNG)
          </button>
        </div>
      </div>
    </div>
  );
}
