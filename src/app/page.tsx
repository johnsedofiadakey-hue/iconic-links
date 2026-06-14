import Link from 'next/link';
import { getCategories } from '@/app/actions/catalog';
import { ChevronRight, Printer, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-blue-600 text-white p-6 shadow-md rounded-b-3xl mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">ICON LINKS</h1>
          <p className="text-blue-100">Premium Print & Design Services</p>
        </div>
        <Link href="/login" className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition">
          <User className="w-6 h-6 text-white" />
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Our Services</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex items-center space-x-3">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <Printer className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {category.services_on_category?.map((service: any) => (
                  <li key={service.id}>
                    <Link href={`/order/${service.id}`} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium text-gray-800">{service.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {service.pricingType === 'INSTANT' && service.basePrice 
                            ? `From GHS ${service.basePrice.toFixed(2)}` 
                            : 'Get a custom quote'}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </li>
                ))}
                {category.services_on_category?.length === 0 && (
                  <li className="p-4 text-sm text-gray-400 italic">No services available yet.</li>
                )}
              </ul>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No services have been added to the catalog yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
