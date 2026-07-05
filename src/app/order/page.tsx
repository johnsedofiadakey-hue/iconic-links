import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import { getCategories } from '@/app/actions/catalog';
import OrderFlow from './OrderFlow';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function NewOrderPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/login');

  try {
    await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    redirect('/login');
  }

  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-6 shadow-sm border-b flex items-center sticky top-0 z-10">
        <Link href="/dashboard" className="mr-4 p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Order</h1>
          <p className="text-gray-500 text-sm">Select a category and service to begin</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        <OrderFlow categories={categories} />
      </main>
    </div>
  );
}
