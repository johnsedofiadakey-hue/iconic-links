import { requireAdminAuth } from '@/lib/auth';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import { getCategories, createCategory, createService } from '@/app/actions/catalog';
import { PlusCircle, Package } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  await requireAdminAuth(ROLE_PERMISSIONS.SERVICES as unknown as string[]);
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] pb-12">
      <header className="glass sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 ml-10 md:ml-0">
          <h1 className="text-xl font-bold text-gray-900">Service Catalog</h1>
          <p className="text-sm text-gray-500">Manage categories and services</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Add Category */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-interactive">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Category</h2>
            <form action={createCategory as any} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
                <input type="text" name="name" required className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50" placeholder="e.g. Digital Printing" />
              </div>
              <button type="submit" className="w-full btn-primary py-3 text-sm inline-flex justify-center items-center gap-2 rounded-xl">
                <PlusCircle className="h-4 w-4" /> Add Category
              </button>
            </form>
          </div>

          {/* Add Service */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-interactive">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Add Service</h2>
            <form action={createService as any} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Name</label>
                <input type="text" name="name" required className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50" placeholder="e.g. Business Cards" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select name="categoryId" required className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50">
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pricing Type</label>
                <select name="pricingType" required className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50">
                  <option value="INSTANT">Instant Pricing</option>
                  <option value="QUOTE_REQUIRED">Quote Required</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Base Price (GHS)</label>
                <input type="number" step="0.01" name="basePrice" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50" placeholder="0.00" />
              </div>
              <button type="submit" className="w-full py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl inline-flex justify-center items-center gap-2 transition shadow-sm">
                <PlusCircle className="h-4 w-4" /> Add Service
              </button>
            </form>
          </div>
        </div>

        {/* Current Catalog */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">Current Catalog</h2>
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {category.services_on_category?.length || 0} services
                </span>
              </div>
              {category.services_on_category?.length === 0 ? (
                <p className="text-sm text-gray-400 italic p-5">No services in this category.</p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {category.services_on_category?.map((service: any) => (
                    <li key={service.id} className="px-5 py-3.5 flex justify-between items-center hover:bg-gray-50/50 transition">
                      <span className="font-medium text-gray-800 text-sm">{service.name}</span>
                      <div className="flex items-center gap-3 text-sm">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${service.pricingType === 'INSTANT' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                          {service.pricingType === 'INSTANT' ? 'Instant' : 'Quote'}
                        </span>
                        {service.basePrice && <span className="font-bold text-gray-700">GHS {service.basePrice.toFixed(2)}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
