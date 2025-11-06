'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    fetch('/api/admin/content/home')
      .then(res => {
        if (!res.ok) {
          router.push('/admin/login');
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin/login');
      });

    // Define available pages
    setPages([
      { id: 'home', name: 'Home Page', description: 'Manage homepage content and sections' },
      { id: 'about', name: 'About Page', description: 'Manage about us content' },
      { id: 'contact', name: 'Contact Page', description: 'Manage contact information' },
      { id: 'portfolio', name: 'Portfolio', description: 'Manage portfolio items' },
    ]);
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/admin/pages/${page.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {page.name}
              </h3>
              <p className="text-gray-600">{page.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}