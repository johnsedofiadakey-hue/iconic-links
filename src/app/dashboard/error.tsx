'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center p-6 text-center bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Dashboard Error</h2>
      <p className="mb-6 text-gray-500">
        We ran into an issue loading your dashboard data.
      </p>
      <button onClick={() => reset()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Refresh Dashboard
      </button>
    </div>
  );
}
