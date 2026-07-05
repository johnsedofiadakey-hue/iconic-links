'use client';

import { useState } from 'react';
import OrderConfigurator from './[serviceId]/OrderConfigurator';
import { Package, ChevronDown } from 'lucide-react';

type Service = {
  id: string;
  name: string;
  pricingType: string;
  basePrice?: number | null;
};

type Category = {
  id: string;
  name: string;
  services_on_category: Service[];
};

export default function OrderFlow({ categories }: { categories: Category[] }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const selectedService = selectedCategory?.services_on_category?.find((s) => s.id === selectedServiceId);

  return (
    <div className="space-y-8">
      {/* Selection Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Package className="w-5 h-5 mr-2 text-blue-600" />
          Select Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setSelectedServiceId(''); // Reset service when category changes
                }}
                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl appearance-none border bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              >
                <option value="" disabled>Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Service Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specific Service</label>
            <div className="relative">
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                disabled={!selectedCategory || !selectedCategory.services_on_category?.length}
                className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl appearance-none border bg-gray-50 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  {!selectedCategory 
                    ? 'First select a category' 
                    : selectedCategory.services_on_category?.length === 0 
                      ? 'No services available' 
                      : 'Select a service...'}
                </option>
                {selectedCategory?.services_on_category?.map((service) => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configurator Section */}
      {selectedService && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <OrderConfigurator service={selectedService} />
        </div>
      )}
    </div>
  );
}
