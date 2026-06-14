import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import OrderConfigurator from './OrderConfigurator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function OrderPage({ params }: { params: { serviceId: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.serviceId },
    include: { category: true }
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
        <Link href="/" className="p-2 -ml-2 text-gray-600 hover:text-blue-600">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2 text-gray-900">Configure Order</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            {service.category.name}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{service.name}</h2>
          <p className="text-gray-500 mt-2">
            {service.pricingType === 'INSTANT' 
              ? 'Configure your order to get an instant price.' 
              : 'Provide your requirements and upload files to get a custom quotation.'}
          </p>
        </div>

        <OrderConfigurator service={service} />
      </main>
    </div>
  );
}
