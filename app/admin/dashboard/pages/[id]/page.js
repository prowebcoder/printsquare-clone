'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageBuilder from '@/components/PageBuilder/PageBuilder';
import { Save, ArrowLeft, Eye } from 'lucide-react';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const [page, setPage] = useState(null);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🔍 Fetching page with ID:', params.id);
        
        const res = await fetch(`/api/admin/pages/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log('✅ Page data received:', data);
          setPage(data);
          setComponents(data.components || []);
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'Failed to fetch page');
          console.error('❌ Fetch error:', errorData);
        }
      } catch (error) {
        console.error('❌ Error fetching page:', error);
        setError('Error fetching page: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchPage();
    }
  }, [params.id]);

  const handleSave = async () => {
    if (!page) return;

    setSaving(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      
      console.log('💾 Saving page with data:', {
        title: page.title,
        slug: page.slug,
        componentsCount: components.length,
        components: components
      });

      const res = await fetch(`/api/admin/pages/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          components: components,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          published: page.published
        }),
      });

      const data = await res.json();
      console.log('📡 Save response:', data);

      if (res.ok && data.success) {
        alert('Page updated successfully!');
        router.push('/admin/dashboard/pages');
      } else {
        const errorMessage = data.details 
          ? `${data.error}: ${data.details}`
          : data.error || 'Error saving page';
        setError(errorMessage);
        console.error('❌ Save failed:', data);
      }
    } catch (error) {
      console.error('❌ Network error saving page:', error);
      setError(`Network error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updatePageField = (field, value) => {
    setPage(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Loading page...</span>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Page not found</p>
        <button
          onClick={() => router.push('/admin/dashboard/pages')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Back to Pages
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Page</h1>
            <p className="text-gray-600 mt-1">{page.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {page.published && (
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Eye size={18} />
              <span>View Live</span>
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => updatePageField('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter page title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={page.slug}
                  onChange={(e) => updatePageField('slug', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="page-slug"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  This will be the URL of your page: /{page.slug}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Builder</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <PageBuilder 
                onComponentsChange={setComponents} 
                initialComponents={components}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">SEO Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={page.metaTitle || ''}
                  onChange={(e) => updatePageField('metaTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Meta title for SEO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={page.metaDescription || ''}
                  onChange={(e) => updatePageField('metaDescription', e.target.value)}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Meta description for SEO"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Publish</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={page.published}
                  onChange={(e) => updatePageField('published', e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>

              <div className="text-sm text-gray-500">
                {page.published 
                  ? 'Page is visible to the public' 
                  : 'Page is saved as draft'
                }
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p><strong>Created:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
                <p className="mt-1"><strong>Last Updated:</strong> {new Date(page.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}