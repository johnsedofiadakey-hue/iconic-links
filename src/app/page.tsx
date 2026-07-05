import Link from 'next/link';
import { getCategories } from '@/app/actions/catalog';
import { ChevronRight, Printer, Maximize, Scissors, Image as ImageIcon, PenTool, Monitor, User, Star, Zap, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CATEGORY_ICONS: Record<string, any> = {
  'Digital Printing': Monitor,
  'Large Format': Maximize,
  'Print & Cut': Scissors,
  'Picture Framing': ImageIcon,
  'Graphic Design': PenTool,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Digital Printing': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  'Large Format': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
  'Print & Cut': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  'Picture Framing': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  'Graphic Design': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
};

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[var(--brand-surface)]">
      {/* Hero Section */}
      <header className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Nav */}
          <nav className="flex justify-between items-center py-5">
            <div className="flex items-center">
              <img src="/logo.png" alt="Iconic Links Logo" className="h-14 w-auto object-contain animate-scale-in" />
            </div>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-sm font-semibold transition-all duration-200"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          </nav>

          {/* Hero Content */}
          <div className="py-16 sm:py-24 text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-semibold text-blue-200 mb-6">
              <Zap className="w-3.5 h-3.5" />
              Ghana&apos;s Trusted Printing Press
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Premium Print &<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Design Services
              </span>
            </h2>
            <p className="mt-6 text-lg text-blue-100/80 max-w-xl mx-auto leading-relaxed">
              Digital printing, large format, picture framing, print & cut, and graphic design — all under one roof.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="btn-primary px-8 py-3.5 text-base rounded-xl inline-flex items-center justify-center gap-2"
              >
                Start Your Order
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="#services"
                className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all text-base text-center"
              >
                Browse Services
              </a>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z" fill="var(--brand-surface)" />
          </svg>
        </div>
      </header>

      {/* Trust Signals */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          {[
            { icon: Star, label: 'Premium Quality', value: '5-Star Rated' },
            { icon: Zap, label: 'Fast Turnaround', value: 'Same-Day Available' },
            { icon: Shield, label: 'Trusted', value: '1000+ Orders' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <item.icon className="w-5 h-5 text-blue-500 mb-2" />
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
              <span className="text-xs text-gray-500 mt-0.5">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <main id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12 animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Services</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">Choose a department to explore our printing and design capabilities</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => {
            const colors = CATEGORY_COLORS[category.name] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100' };
            const Icon = CATEGORY_ICONS[category.name] || Printer;

            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl card-interactive overflow-hidden animate-slide-up"
                style={{ animationDelay: `${0.1 * (idx + 1)}s`, opacity: 0 }}
              >
                {/* Category Header */}
                <div className={`p-6 ${colors.bg} border-b ${colors.border}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-white shadow-sm ${colors.text}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {category.services_on_category?.length || 0} service{category.services_on_category?.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <ul className="divide-y divide-gray-50">
                  {category.services_on_category?.map((service: any) => (
                    <li key={service.id}>
                      <Link
                        href={`/order/${service.id}`}
                        className="flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{service.name}</p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            {service.pricingType === 'INSTANT' && service.basePrice
                              ? `From GHS ${service.basePrice.toFixed(2)}`
                              : 'Get a custom quote'}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                  {category.services_on_category?.length === 0 && (
                    <li className="p-4 text-sm text-gray-400 italic text-center">Coming soon</li>
                  )}
                </ul>
              </div>
            );
          })}
          {categories.length === 0 && (
            <div className="col-span-full text-center py-16">
              <Printer className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Our service catalog is being set up. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} ICONIC LINKS. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/login" className="hover:text-gray-700 transition">Client Portal</Link>
            <Link href="/admin/login" className="hover:text-gray-700 transition">Staff Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
