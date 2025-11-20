'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, Eye, FileText, Copy } from 'lucide-react';

export default function PagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [duplicating, setDuplicating] = useState(null);

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

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (pageId) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setPages((prev) => prev.filter((page) => page._id !== pageId));
      } else {
        alert('Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error deleting page');
    }
  };

  const handleDuplicate = async (pageId) => {
    setDuplicating(pageId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/pages/${pageId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Page duplicated successfully!');
        fetchPages(); // Refresh the list
      } else {
        alert(data.error || 'Failed to duplicate page');
      }
    } catch (error) {
      console.error('Error duplicating page:', error);
      alert('Error duplicating page');
    } finally {
      setDuplicating(null);
    }
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Loading pages...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pages</h1>
          <p className="text-gray-600 mt-1">Manage your website pages and content</p>
        </div>

        <Link
          href="/admin/dashboard/pages/new"
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm"
        >
          <Plus size={20} />
          <span>Add New Page</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b bg-gray-50">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search pages by title or slug..."
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
                <tr key={page._id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{page.title}</div>
                        {page.metaTitle && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {page.metaTitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">/{page.slug}</code>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.published
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}
                    >
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{new Date(page.updatedAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(page.updatedAt).toLocaleTimeString()}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDuplicate(page._id)}
                        disabled={duplicating === page._id}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Duplicate Page"
                      >
                        {duplicating === page._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>

                      <Link
                        href={`/admin/dashboard/pages/${page._id}`}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Page"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(page._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 size={16} />
                      </button>

                      {page.published && (
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="View Live Page"
                        >
                          <Eye size={16} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-300 mb-4">
              <FileText size={64} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No pages found</p>
            <p className="text-gray-400">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first page'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}