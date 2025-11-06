"use client";
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log('🔐 Not authenticated, redirecting to login...');
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-700 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 py-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Content Management
            </p>
          </div>
          
          <div className="px-3">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-1"
            >
              <span>📊</span>
              <span className="ml-3">Dashboard</span>
            </Link>
            
            <Link 
              href="/admin/content/home" 
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-1"
            >
              <span>🏠</span>
              <span className="ml-3">Home Page</span>
            </Link>
            
            <Link 
              href="/admin/content/about" 
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-1"
            >
              <span>ℹ️</span>
              <span className="ml-3">About Page</span>
            </Link>
            
            <Link 
              href="/admin/content/portfolio" 
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-1"
            >
              <span>🖼️</span>
              <span className="ml-3">Portfolio</span>
            </Link>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <span>🚪</span>
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}