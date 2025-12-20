// app/admin/dashboard/forms/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, FileText, Search, Filter, Users, BarChart3, Settings, Eye, Copy, Trash2, RefreshCw, AlertCircle, Download } from 'lucide-react';

export default function FormsList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [debugInfo, setDebugInfo] = useState('');

  // Predefined forms that match your existing form
  const predefinedForms = [
    {
      _id: 'print-quote',
      name: 'Perfect Binding Quote Form',
      description: 'Book printing quote calculator with pricing options',
      type: 'predefined',
      status: 'published',
      fieldsCount: 'Multiple Sections',
      submissions: 24,
      lastSubmission: '2024-01-15',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      _id: 'saddle-quote',
      name: 'Saddle Stiching Quote Form',
      description: 'Saddle stitching quote calculator with pricing options',
      type: 'predefined',
      status: 'published',
      fieldsCount: 'Multiple Sections',
      submissions: 18,
      lastSubmission: '2024-01-14',
      color: 'from-purple-500 to-pink-500'
    },
    {
      _id: 'wire-quote',
      name: 'Wire Binding Quote Form',
      description: 'Book printing quote calculator with pricing options',
      type: 'predefined',
      status: 'published',
      fieldsCount: 'Multiple Sections',
      submissions: 24,
      lastSubmission: '2024-01-15',
      color: 'from-green-500 to-emerald-500'
    },
    {
      _id: 'hard-quote',
      name: 'Hardcover Quote Form',
      description: 'Saddle stitching quote calculator with pricing options',
      type: 'predefined',
      status: 'published',
      fieldsCount: 'Multiple Sections',
      submissions: 18,
      lastSubmission: '2024-01-14',
      color: 'from-red-500 to-red-300'
    }
  ];

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async (showDebug = false) => {
    try {
      setError('');
      setLoading(true);
      if (showDebug) setDebugInfo('🔄 Fetching forms...');
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      console.log('🔄 Fetching forms from API...');
      const res = await fetch('/api/admin/forms', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
      });

      console.log('📡 Forms response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('✅ Forms data received:', data);
      
      // Combine predefined forms with API forms
      setForms([...predefinedForms, ...data]);
      if (showDebug) setDebugInfo(`✅ Loaded ${data.length + predefinedForms.length} forms`);
    } catch (error) {
      console.error('❌ Error fetching forms:', error);
      setError(`Failed to load forms: ${error.message}`);
      if (showDebug) setDebugInfo(`❌ Error: ${error.message}`);
      
      // Fallback to just predefined forms if API fails
      setForms(predefinedForms);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId) => {
    if (!confirm('Are you sure you want to delete this form? This action cannot be undone.')) return;

    try {
      // For predefined forms, just remove from local state
      if (formId === 'print-quote' || formId === 'saddle-quote') {
        setForms(prev => prev.filter(form => form._id !== formId));
        setDebugInfo('✅ Form removed from view');
        return;
      }

      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setForms(prev => prev.filter(form => form._id !== formId));
        setDebugInfo('✅ Form deleted successfully');
      } else {
        throw new Error('Failed to delete form');
      }
    } catch (error) {
      console.error('Error deleting form:', error);
      alert(`Error deleting form: ${error.message}`);
      setDebugInfo(`❌ Delete failed: ${error.message}`);
    }
  };

  const handleDuplicate = async (formId) => {
    try {
      setDebugInfo('🔄 Duplicating form...');
      
      // For predefined forms, create a copy
      const originalForm = forms.find(form => form._id === formId);
      if (originalForm) {
        const duplicatedForm = {
          ...originalForm,
          _id: `${formId}-copy-${Date.now()}`,
          name: `${originalForm.name} (Copy)`,
          submissions: 0,
          type: 'custom'
        };
        
        setForms(prev => [duplicatedForm, ...prev]);
        setDebugInfo('✅ Form duplicated successfully');
        alert('Form duplicated successfully!');
      }
    } catch (error) {
      console.error('Error duplicating form:', error);
      alert(`Error duplicating form: ${error.message}`);
      setDebugInfo(`❌ Duplicate failed: ${error.message}`);
    }
  };

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || form.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      archived: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeStyles = {
      predefined: 'bg-blue-100 text-blue-800 border-blue-200',
      custom: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${typeStyles[type] || 'bg-gray-100 text-gray-800'}`}>
        {type === 'predefined' ? 'System' : 'Custom'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="text-gray-600">Loading forms...</span>
        {debugInfo && <span className="text-sm text-gray-500">{debugInfo}</span>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Form Management</h1>
          <p className="text-gray-600 mt-1">Manage and configure your website forms</p>
          {debugInfo && (
            <div className="text-sm text-blue-600 mt-2 flex items-center space-x-2">
              <RefreshCw size={14} className="animate-spin" />
              <span>{debugInfo}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchForms(true)}
            disabled={loading}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/dashboard/forms/new"
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm"
          >
            <Plus size={20} />
            <span>Create Form</span>
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
              Check browser console (F12) for detailed logs
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-indigo-600">{forms.length}</div>
          <div className="text-sm text-gray-600">Total Forms</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-green-600">
            {forms.filter(f => f.status === 'published').length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-600">
            {forms.reduce((total, form) => total + (form.submissions || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Submissions</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-purple-600">
            {forms.filter(f => f.type === 'predefined').length}
          </div>
          <div className="text-sm text-gray-600">System Forms</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search forms by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <div key={form._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            {/* Form Header */}
            <div className={`p-6 bg-gradient-to-r ${form.color || 'from-gray-500 to-gray-700'} text-white rounded-t-xl`}>
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText size={20} />
                </div>
                <div className="flex space-x-2">
                  {getStatusBadge(form.status)}
                  {getTypeBadge(form.type)}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{form.name}</h3>
              <p className="text-white/80 text-sm">{form.description}</p>
            </div>

            {/* Form Details */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <BarChart3 size={14} />
                    <span className="font-medium">Submissions</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{form.submissions || 0}</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Settings size={14} />
                    <span className="font-medium">Fields</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{form.fieldsCount || 'Multiple'}</div>
                </div>
              </div>

              {form.lastSubmission && (
                <div className="text-xs text-gray-500 mb-4">
                  Last submission: {new Date(form.lastSubmission).toLocaleDateString()}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  href={`/admin/dashboard/forms/${form._id}/edit`}
                  className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center group-hover:scale-105 transition-transform"
                >
                  <Edit size={16} className="mr-1" />
                  Configure
                </Link>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleDuplicate(form._id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Duplicate Form"
                  >
                    <Copy size={16} />
                  </button>
                  
                  {form.type === 'custom' && (
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Form"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <div className="flex justify-between items-center text-xs">
                <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                  <Eye size={12} />
                  <span>Preview</span>
                </button>
                
                <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                  <Download size={12} />
                  <span>Export</span>
                </button>
                
                <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                  <BarChart3 size={12} />
                  <span>Analytics</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredForms.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
          <div className="text-gray-300 mb-4">
            <FileText size={64} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No forms found' : 'No forms created yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter' 
              : 'Get started by creating your first form'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Link
              href="/admin/dashboard/forms/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              <Plus size={20} />
              <span>Create Your First Form</span>
            </Link>
          )}
        </div>
      )}

      {/* Information Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <Info size={20} className="mr-2" />
          About Form Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
          <div>
            <p className="font-medium mb-2">System Forms</p>
            <ul className="space-y-1">
              <li>• <strong>Print Quote Form</strong> - Book printing calculator</li>
              <li>• <strong>Saddle Stitching Form</strong> - Saddle stitching calculator</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">Features</p>
            <ul className="space-y-1">
              <li>• Edit all options, labels, and prices</li>
              <li>• Add/remove items from dropdowns</li>
              <li>• Configure validation rules</li>
              <li>• View submission analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
          <strong>Debug Info:</strong> Found {forms.length} total forms, {filteredForms.length} after filtering
        </div>
      )}
    </div>
  );
}

// Add the missing Info icon component
const Info = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);