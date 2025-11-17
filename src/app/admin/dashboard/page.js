'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();

    setPages([
      { id: 'home', name: 'Home Page', description: 'Customize sections & homepage content' },
      { id: 'about', name: 'About Page', description: 'Edit brand story & team details' },
      { id: 'contact', name: 'Contact Page', description: 'Manage contact info & forms' },
      { id: 'portfolio', name: 'Portfolio', description: 'Add, edit & organize portfolio items' },
    ]);
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/content/home');
      if (!response.ok) throw new Error('Not authenticated');
      setLoading(false);
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* BEAUTIFUL HEADER */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome, Admin 👋
          </h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                       text-white font-medium shadow-md hover:shadow-lg 
                       hover:scale-105 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP TITLE */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Manage Your Pages</h2>
          <p className="text-gray-500 mt-1">Select a page to update content</p>
        </div>

        {/* ULTRA-PREMIUM CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/admin/pages/${page.id}`}
              className="
                group relative overflow-hidden p-8 rounded-3xl bg-white shadow-lg
                hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300
                border border-gray-100
              "
            >
              {/* Soft glowing gradient background */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50
                transition-opacity duration-300
              " />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                  {page.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  {page.description}
                </p>

                {/* Arrow animation */}
                <div className="
                  mt-5 text-indigo-600 font-medium opacity-0 group-hover:opacity-100 
                  transform group-hover:translate-x-2 transition-all duration-300
                ">
                  Manage →
                </div>
              </div>
            </Link>
          ))}

        </div>
      </main>
    </div>
  );
}
