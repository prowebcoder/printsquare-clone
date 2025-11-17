// app/admin/dashboard/forms/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, FileText } from 'lucide-react';

export default function FormsList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/admin/forms', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
      setError(`Failed to load forms: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Predefined forms that match your existing form
  const predefinedForms = [
    {
      _id: 'print-quote',
      name: 'Print Quote Form',
      description: 'Book printing quote calculator with pricing options',
      type: 'predefined',
      status: 'published',
      fieldsCount: 'Multiple Sections',
      submissions: 0
    }
  ];

  const allForms = [...predefinedForms, ...forms];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Form Management</h1>
        
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Forms</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchForms}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Form Management</h1>
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allForms.map((form) => (
          <div key={form._id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{form.name}</h3>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  form.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {form.status}
                </span>
                {form.type === 'predefined' && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    System
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{form.description}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>Fields: {form.fieldsCount || form.fields?.length || 'N/A'}</span>
              <span>Submissions: {form.submissions || 0}</span>
            </div>

            <div className="flex space-x-2">
              <Link
                href={form.type === 'predefined' 
                  ? `/admin/dashboard/forms/${form._id}/edit` 
                  : `/admin/dashboard/forms/${form._id}`
                }
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Edit size={16} className="mr-1" />
                {form.type === 'predefined' ? 'Configure' : 'Edit'}
              </Link>
            </div>
          </div>
        ))}

        {allForms.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first form</p>
            <Link
              href="/admin/dashboard/forms/new"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Create Form
            </Link>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">About Form Management</h3>
        <p className="text-blue-700 text-sm">
          • <strong>Print Quote Form</strong> is a predefined form that matches your existing printing quote calculator<br/>
          • You can edit all options, labels, prices, and add/remove items from dropdowns<br/>
          • Create custom forms for other purposes using the "Create Custom Form" button
        </p>
      </div>
    </div>
  );
}