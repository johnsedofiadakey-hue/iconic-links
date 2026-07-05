import { getCategories } from '@/app/actions/catalog';
import { requireAuth } from '@/lib/auth';
import OrderFlow from './OrderFlow';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewOrderPage() {
  await requireAuth('/login');
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-20">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">New Order</h1>
            <p className="text-gray-500 text-sm">Select a category and service to begin</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <OrderFlow categories={categories} />
      </main>
    </div>
  );
}
