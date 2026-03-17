'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Package, Users, Bell, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/products', icon: Package, label: 'Products' },
  { href: '/customers', icon: Users, label: 'Customers' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <aside className={`bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col fixed md:relative z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Admin</h1>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              <Link href={item.href} legacyBehavior>
                <a className={`flex items-center p-3 rounded-lg transition-colors ${pathname === item.href ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                  <item.icon size={20} className="mr-4" />
                  <span>{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
         {/* User profile section can be added here */}
      </div>
    </aside>
  );

  const Header = () => (
    <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." className="bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800 relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            {user && (
              <span className="hidden sm:inline font-semibold text-gray-700">{user.displayName || 'Admin User'}</span>
            )}
            <ChevronDown size={16} className="text-gray-500" />
          </div>
           <button onClick={logout} className="ml-4 text-sm text-gray-500 hover:text-gray-700">Logout</button>
        </div>
    </header>
  );

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
