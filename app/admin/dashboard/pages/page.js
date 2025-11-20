// printsquare-clone/app/admin/dashboard/pages/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, Eye, FileText, Copy, RefreshCw, AlertCircle } from 'lucide-react';

export default function PagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [duplicating, setDuplicating] = useState(null);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const fetchPages = async (showDebug = false) => {
    try {
      setError('');
      setLoading(true);
      if (showDebug) setDebugInfo('🔄 Fetching pages...');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('🔄 Fetching pages from API...');
      const res = await fetch('/api/admin/pages', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
      });
      
      console.log('📡 Pages response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('✅ Pages data received:', data);
        setPages(data);
        if (showDebug) setDebugInfo(`✅ Loaded ${data.length} pages`);
      } else {
        const errorText = await res.text();
        console.error('❌ Pages fetch error:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `Status: ${res.status}` };
        }
        setError(errorData.error || `Server error: ${res.status}`);
        if (showDebug) setDebugInfo(`❌ Error: ${errorData.error || res.status}`);
      }
    } catch (error) {
      console.error('❌ Network error fetching pages:', error);
      setError(`Network error: ${error.message}`);
      if (showDebug) setDebugInfo(`❌ Network error: ${error.message}`);
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
        setDebugInfo('✅ Page deleted successfully');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete page');
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert(`Error deleting page: ${error.message}`);
      setDebugInfo(`❌ Delete failed: ${error.message}`);
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
        setDebugInfo('✅ Page duplicated');
        fetchPages(true); // Refresh the list
      } else {
        throw new Error(data.error || 'Failed to duplicate page');
      }
    } catch (error) {
      console.error('Error duplicating page:', error);
      alert(`Error duplicating page: ${error.message}`);
      setDebugInfo(`❌ Duplicate failed: ${error.message}`);
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
      <div className="flex items-center justify-center h-64 flex-col space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="text-gray-600">Loading pages...</span>
        {debugInfo && <span className="text-sm text-gray-500">{debugInfo}</span>}
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
          {debugInfo && (
            <div className="text-sm text-blue-600 mt-2 flex items-center space-x-2">
              <RefreshCw size={14} className="animate-spin" />
              <span>{debugInfo}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchPages(true)}
            disabled={loading}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/dashboard/pages/new"
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm"
          >
            <Plus size={20} />
            <span>Add New Page</span>
          </Link>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-3">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-medium">Error:</strong>
            <div className="mt-1 text-sm">{error}</div>
            <div className="mt-2 text-xs opacity-75">
              Check browser console (F12) and server terminal for detailed logs
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-indigo-600">{pages.length}</div>
          <div className="text-sm text-gray-600">Total Pages</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-green-600">
            {pages.filter(p => p.published).length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-yellow-600">
            {pages.filter(p => !p.published).length}
          </div>
          <div className="text-sm text-gray-600">Drafts</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-600">
            {pages.reduce((total, page) => total + (page.components?.length || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Components</div>
        </div>
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
            <p className="text-gray-500 text-lg mb-2">
              {searchTerm ? 'No pages found' : 'No pages created yet'}
            </p>
            <p className="text-gray-400 mb-4">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first page'
              }
            </p>
            {!searchTerm && (
              <Link
                href="/admin/dashboard/pages/new"
                className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={20} />
                <span>Create Your First Page</span>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
          <strong>Debug Info:</strong> Found {pages.length} total pages, {filteredPages.length} after filtering
        </div>
      )}
    </div>
  );
}