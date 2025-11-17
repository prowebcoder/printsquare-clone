// components/admin/Sidebar.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
  FormInput,
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/dashboard/users', icon: Users },
    { name: 'Pages', href: '/admin/dashboard/pages', icon: FileText },
    { name: 'Media', href: '/admin/dashboard/media', icon: Image },
    { name: 'Content', href: '/admin/dashboard/content', icon: Image },
    { name: 'Forms', href: '/admin/dashboard/forms', icon: FormInput },
  ];

  return (
    <div
      className={`h-screen backdrop-blur-xl bg-white/70 border-r shadow-lg flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* TOP SECTION */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-br from-white/50 to-gray-100/50">
        {!collapsed && (
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Admin Panel
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-gray-100 transition-all"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* MENU ITEMS */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center rounded-2xl px-4 py-3 transition-all duration-200
                ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <item.icon
                size={22}
                className={`
                  flex-shrink-0 transition-all
                  ${collapsed ? 'mx-auto' : 'mr-4'}
                  ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
                `}
              />

              {!collapsed && (
                <span className={`text-sm font-medium tracking-wide`}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER SETTINGS BUTTON */}
      <div className="p-4 border-t bg-gradient-to-br from-white/60 to-gray-100/60">
        <Link
          href="/admin/dashboard/settings"
          className={`
            flex items-center px-4 py-3 rounded-2xl transition-all
            text-gray-700 hover:bg-gray-100 shadow-sm
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <Settings
            size={22}
            className={`
              ${collapsed ? '' : 'mr-4'}
              text-gray-500 group-hover:text-gray-700
            `}
          />
          {!collapsed && <span className="font-medium text-sm">Settings</span>}
        </Link>
      </div>
    </div>
  );
}