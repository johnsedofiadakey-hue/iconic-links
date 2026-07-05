'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Package,
  Truck,
  CheckCircle,
  Building2,
  LineChart,
  Users,
  QrCode,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { name: 'Inventory', href: '/admin/inventory', icon: Package },
  { name: 'Quality Control', href: '/admin/qc', icon: CheckCircle },
  { name: 'Delivery', href: '/admin/delivery', icon: Truck },
  { name: 'Corporate', href: '/admin/organizations', icon: Building2 },
  { name: 'Staff', href: '/admin/staff', icon: Users },
  { name: 'Intelligence', href: '/admin/intelligence', icon: LineChart },
  { name: 'QR Generator', href: '/admin/qr-generator', icon: QrCode },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === '/admin/login') return null;

  const NavContent = () => (
    <>
      {/* Brand */}
      <div className="p-5 border-b border-gray-850 flex flex-col items-center">
        <img src="/logo.png" alt="Iconic Links Logo" className="h-11 w-auto object-contain mb-1.5" />
        <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">Production Engine</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/90 text-white shadow-md shadow-blue-600/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] mr-3 ${isActive ? 'text-blue-200' : 'text-gray-500'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800/50">
        <div className="bg-gray-800/50 rounded-xl p-3">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Logged in as</p>
          <p className="text-sm text-white font-bold truncate mt-0.5">Administrator</p>
          <form action="/api/admin/logout" method="POST" className="mt-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-gray-900 text-white shadow-lg"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-y-0 left-0 w-72 bg-gray-950 z-50 flex flex-col transform transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <NavContent />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gray-950 text-white flex-col h-full shadow-2xl">
        <NavContent />
      </div>
    </>
  );
}
