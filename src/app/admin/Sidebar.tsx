'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Settings, 
  Truck, 
  CheckCircle,
  Building2,
  LineChart
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { name: 'Inventory', href: '/admin/inventory', icon: Package },
  { name: 'Quality Control', href: '/admin/qc', icon: CheckCircle },
  { name: 'Delivery Dispatch', href: '/admin/delivery', icon: Truck },
  { name: 'Corporate Accounts', href: '/admin/organizations', icon: Building2 },
  { name: 'Intelligence', href: '/admin/intelligence', icon: LineChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Don't show sidebar on the login page
  if (pathname === '/admin/login') return null;

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex h-full shadow-xl">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-black tracking-tight text-white flex items-center">
          <span className="text-blue-500 mr-2">ICON</span> LINKS
        </h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Production Engine</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-200' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-400 font-medium">Logged in as</p>
          <p className="text-sm text-white font-bold truncate">Administrator</p>
          <form action="/api/admin/logout" method="POST" className="mt-3">
            <button type="submit" className="text-xs text-red-400 hover:text-red-300 font-medium transition">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
