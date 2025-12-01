// printsquare-clone/app/admin/dashboard/content/page.js
'use client';
import { useState, useEffect } from 'react';
import ContentEditor from '@/components/admin/ContentEditor';
import { FileText, Layout, Edit, Eye, Save, RefreshCw, Search, Filter } from 'lucide-react';

export default function ContentPage() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const staticPages = [
    { value: 'home', label: 'Home Page', description: 'Main landing page content', icon: Layout },
    { value: 'about', label: 'About Page', description: 'Company information and story', icon: FileText },
    { value: 'tour-our-facilities', label: 'Facilities Page', description: 'Company information and story', icon: FileText },
    { value: 'printing', label: 'Printing Page', description: 'Company information and services', icon: FileText },
    { value: 'sheet-fed-press', label: 'Sheet Fed Press Page', description: 'Company information and services', icon: FileText },
    { value: 'web-fed-press', label: 'Web Fed Press Page', description: 'Company information and services', icon: FileText },
    { value: 'binding-and-finishing', label: 'Binding and Finishing Page', description: 'Company information and services', icon: FileText },
    { value: 'quick-guide-for-art-files', label: 'Quick Guide for Art Files', description: 'Company information and tutorials', icon: FileText },
    { value: 'contact-us', label: 'Contact Page', description: 'Contact information and form', icon: Edit },
    { value: 'privacy-policy', label: 'Privacy Policy', description: 'Privacy policy content', icon: Eye },
    { value: 'terms-conditions', label: 'Terms & Conditions', description: 'Terms of service content', icon: FileText },
  ];

  useEffect(() => {
    // Simulate loading dynamic pages from API
    const fetchPages = async () => {
      try {
        // In a real app, you would fetch from your API
        setTimeout(() => {
          setPages(staticPages);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setLastSaved(new Date());
      // Show success message
      alert('Content saved successfully!');
    }, 1500);
  };

  const filteredPages = pages.filter(page =>
    page.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPageData = pages.find(page => page.value === selectedPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="text-gray-600">Loading content editor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-600 mt-1">Edit and manage your website content</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all shadow-sm"
          >
            <RefreshCw size={20} />
            <span>Refresh</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save size={20} />
            )}
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-indigo-600">{pages.length}</div>
          <div className="text-sm text-gray-600">Total Pages</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-600">Sections</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-purple-600">24</div>
          <div className="text-sm text-gray-600">Content Blocks</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selection Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Filter size={20} className="mr-2 text-indigo-600" />
              Page Selection
            </h3>
            
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Pages List */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-800">Available Pages</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filteredPages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>No pages found</p>
                </div>
              ) : (
                filteredPages.map((page) => {
                  const IconComponent = page.icon;
                  return (
                    <button
                      key={page.value}
                      onClick={() => setSelectedPage(page.value)}
                      className={`w-full text-left p-4 border-b border-gray-100 transition-all duration-200 ${
                        selectedPage === page.value
                          ? 'bg-indigo-50 border-indigo-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedPage === page.value
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <IconComponent size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-sm ${
                            selectedPage === page.value ? 'text-indigo-800' : 'text-gray-800'
                          }`}>
                            {page.label}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {page.description}
                          </p>
                        </div>
                        {selectedPage === page.value && (
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-4 text-white">
            <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                Create New Page
              </button>
              <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                Manage SEO Settings
              </button>
              <button className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                View Site Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Content Editor Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Editor Header */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  {selectedPageData && (
                    <>
                      <selectedPageData.icon size={24} className="mr-3 text-indigo-600" />
                      {selectedPageData.label}
                    </>
                  )}
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedPageData?.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {lastSaved && (
                  <div className="text-sm text-gray-500">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </div>
                )}
                
                <a
                  href={`/${selectedPage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Eye size={18} />
                  <span>View Live</span>
                </a>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="border-b bg-gray-50 px-6 py-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Edit size={18} className="mr-2 text-indigo-600" />
                Content Editor
              </h3>
            </div>
            
            <div className="p-6">
              <ContentEditor pageSlug={selectedPage} />
            </div>
          </div>

          {/* Additional Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter meta title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter meta description..."
                  />
                </div>
                <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Update SEO
                </button>
              </div>
            </div>

            {/* Page Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Published</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show in navigation</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow comments</span>
                  </label>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>

          {/* Recent Changes */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Changes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Save size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Home page hero updated</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Saved</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Edit size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">About page content modified</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Progress Indicator */}
      {saving && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Saving changes...</span>
          </div>
        </div>
      )}
    </div>
  );
}