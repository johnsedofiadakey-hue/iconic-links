'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Section Error:', error);
  }, [error]);

  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h2 className="mb-4 text-xl font-bold text-red-600">Admin Section Error</h2>
      <p className="mb-8 text-gray-600 max-w-md">
        An error occurred while loading this admin view.
      </p>
      <button onClick={() => reset()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Retry
      </button>
    </div>
  );
}
