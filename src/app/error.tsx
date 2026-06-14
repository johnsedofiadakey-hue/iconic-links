'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="mb-8 text-gray-600 max-w-md">
        We encountered an unexpected error. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Try again
        </button>
        <button onClick={() => window.location.href = '/'} className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">
          Return Home
        </button>
      </div>
    </div>
  );
}
