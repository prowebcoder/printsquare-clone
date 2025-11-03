
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContentManagement() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      } else {
        console.error('Failed to fetch pages');
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPage = (page) => {
    router.push(`/dashboard/content/editor?slug=${page.slug}`);
  };

  const handleCreatePage = () => {
    router.push('/dashboard/content/editor?new=true');
  };

  const deletePage = async (pageId, pageSlug) => {
    if (!confirm(`Are you sure you want to delete page "${pageSlug}"?`)) return;
    
    try {
      const response = await fetch(`/api/admin/content/${pageSlug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPages(pages.filter(p => p._id !== pageId));
        alert('Page deleted successfully');
      } else {
        alert('Error deleting page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error deleting page');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Content Management
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all website pages and content
          </p>
        </div>
        <button
          onClick={handleCreatePage}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          + Create New Page
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.length > 0 ? (
          pages.map((page) => (
            <div
              key={page._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {page.title || page.slug}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {page.description || `Content for ${page.slug}`}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    page.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {page.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPage(page)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePage(page._id, page.slug)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No pages found.</p>
            <button
              onClick={handleCreatePage}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Create Your First Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}