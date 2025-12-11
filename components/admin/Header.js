// components/admin/Header.js
'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export default function Header({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, <span className="font-medium text-gray-700">{user?.name}</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          
          {/* User Info */}
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border hover:shadow-sm transition-all">
            <User size={20} className="text-gray-600" />
            <span className="text-gray-700 font-medium">
              {user?.name}
            </span>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md uppercase tracking-wide">
              {user?.role}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-sm transition-all"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>

        </div>
      </div>
    </header>
  );
}
