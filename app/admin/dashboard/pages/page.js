// app/admin/dashboard/pages/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';

export default function PagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/pages', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setPages(pages.filter((page) => page._id !== pageId));
      } else {
        alert('Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error deleting page');
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pages</h1>

        <Link
          href="/admin/dashboard/pages/new"
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Page</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Title', 'Slug', 'Status', 'Last Updated', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">/{page.slug}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium space-x-3 flex items-center">
                    <Link
                      href={`/admin/dashboard/pages/${page._id}`}
                      className="text-indigo-600 hover:text-indigo-900 transition"
                      title="Edit Page"
                    >
                      <Edit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(page._id)}
                      className="text-red-600 hover:text-red-900 transition"
                      title="Delete Page"
                    >
                      <Trash2 size={18} />
                    </button>

                    {page.published && (
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-900 transition"
                        title="View Page"
                      >
                        <Eye size={18} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">No pages found</p>
            <p className="text-gray-400 mt-2">
              {searchTerm
                ? 'Try adjusting your search'
                : 'Get started by creating a new page'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
