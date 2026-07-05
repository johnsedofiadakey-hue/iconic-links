'use client';

import { useState } from 'react';
import OrderConfigurator from './[serviceId]/OrderConfigurator';
import { Package, ChevronDown, ChevronRight, Zap, FileText } from 'lucide-react';

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

  const stepNumber = !selectedCategoryId ? 1 : !selectedServiceId ? 2 : 3;

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center gap-3 text-sm font-medium">
        {['Category', 'Service', 'Configure'].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${i + 1 <= stepNumber ? 'text-blue-600' : 'text-gray-300'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                ${i + 1 < stepNumber ? 'bg-blue-600 border-blue-600 text-white' : i + 1 === stepNumber ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400'}`}>
                {i + 1 < stepNumber ? '✓' : i + 1}
              </div>
              <span className="hidden sm:block">{label}</span>
            </div>
            {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Selection Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
          <Package className="w-5 h-5 text-blue-600" />
          Select Service
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setSelectedServiceId('');
                }}
                className="block w-full pl-4 pr-10 py-3.5 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl appearance-none bg-gray-50 hover:bg-gray-100 transition cursor-pointer font-medium text-gray-900"
              >
                <option value="" disabled>Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Service Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Specific Service</label>
            <div className="relative">
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                disabled={!selectedCategory || !selectedCategory.services_on_category?.length}
                className="block w-full pl-4 pr-10 py-3.5 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl appearance-none bg-gray-50 hover:bg-gray-100 transition cursor-pointer font-medium text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Info Badge */}
        {selectedService && (
          <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3 animate-scale-in">
            {selectedService.pricingType === 'INSTANT' ? (
              <>
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600"><Zap className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-bold text-blue-900">Instant Pricing</p>
                  <p className="text-xs text-blue-700">
                    {selectedService.basePrice ? `From GHS ${selectedService.basePrice.toFixed(2)} per unit` : 'Price calculated at checkout'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600"><FileText className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-bold text-purple-900">Custom Quote</p>
                  <p className="text-xs text-purple-700">Submit your specs and we&apos;ll send you a personalized quote</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Configurator Section */}
      {selectedService && (
        <div className="animate-slide-up">
          <OrderConfigurator service={selectedService} />
        </div>
      )}
    </div>
  );
}
