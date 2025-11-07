'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const page = params.page;
  
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (page) {
      fetchContent();
    }
  }, [page]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching content for page:', page); // Debug log
      
      const response = await fetch(`/api/admin/content/${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched content:', data); // Debug log
      
      setContent(data.content || {});
    } catch (error) {
      console.error('Failed to fetch content:', error);
      setError('Failed to load content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (sectionId, updates) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/content/${page}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          page,
          ...updates
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      const result = await response.json();
      console.log('Save result:', result); // Debug log
      
      await fetchContent();
    } catch (error) {
      console.error('Failed to update section:', error);
      alert('Failed to save changes: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const addNewSection = () => {
    const sectionId = prompt('Enter section ID (e.g., "hero", "about-content"):');
    if (sectionId) {
      const newSection = {
        sectionId,
        page,
        content: {
          title: 'New Section Title',
          description: 'Add your content here...'
        },
        images: []
      };
      
      // Immediately save the new section
      updateSection(sectionId, newSection);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading page content for {page}...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold capitalize">
              Editing {page} Page
            </h1>
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={addNewSection}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Section
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.keys(content).length > 0 ? (
            Object.values(content).map((section) => (
              <SectionEditor
                key={section.sectionId}
                section={section}
                onSave={updateSection}
                saving={saving}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600 mb-4">No sections found for the {page} page.</p>
              <p className="text-sm text-gray-500 mb-4">
                Click the button below to create your first section.
              </p>
              <button
                onClick={addNewSection}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Create First Section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionEditor({ section, onSave, saving }) {
  const [formData, setFormData] = useState(section.content || {});
  const [sectionId, setSectionId] = useState(section.sectionId);

  const handleSave = () => {
    onSave(sectionId, {
      content: formData,
      sectionId: sectionId,
      images: section.images || []
    });
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addField = () => {
    const fieldName = prompt('Enter field name (e.g., "title", "description"):');
    if (fieldName) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const removeField = (key) => {
    const newFormData = { ...formData };
    delete newFormData[key];
    setFormData(newFormData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section ID
          </label>
          <input
            type="text"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-4 mb-4">
        {Object.entries(formData).length > 0 ? (
          Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex gap-2 items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                {typeof value === 'string' && value.length < 100 ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <textarea
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
              <button
                onClick={() => removeField(key)}
                className="mt-6 text-red-600 hover:text-red-800 px-2"
                title="Remove field"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No fields yet. Add some fields to this section.</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={addField}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Add Field
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Section'}
        </button>
      </div>
    </div>
  );
}