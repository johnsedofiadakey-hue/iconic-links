import { getCategories, createCategory, createService } from '@/app/actions/catalog';
import { PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const categories = await getCategories();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Service Catalog Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Category Form */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <form action={createCategory as any} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g. Digital Printing" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Category
            </button>
          </form>
        </div>

        {/* Create Service Form */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
          <form action={createService as any} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Name</label>
              <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g. Business Cards" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="categoryId" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pricing Type</label>
              <select name="pricingType" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="INSTANT">Instant Pricing</option>
                <option value="QUOTE_REQUIRED">Quotation Required</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Base Price (GHS) - Optional</label>
              <input type="number" step="0.01" name="basePrice" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="0.00" />
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Service
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Current Catalog</h2>
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">{category.name}</h3>
              {category.services_on_category?.length === 0 ? (
                <p className="text-sm text-gray-500">No services in this category yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {category.services_on_category?.map((service: any) => (
                    <li key={service.id} className="py-3 flex justify-between items-center">
                      <span className="font-medium text-gray-800">{service.name}</span>
                      <div className="flex space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${service.pricingType === 'INSTANT' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                          {service.pricingType}
                        </span>
                        {service.basePrice && <span className="font-semibold">GHS {service.basePrice.toFixed(2)}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
