'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const page = params.page;
  
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSections();
  }, [page]);

  const fetchSections = async () => {
    try {
      const response = await fetch(`/api/admin/content/${page}`);
      const data = await response.json();
      setSections(data.sections || []);
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (sectionId, updates) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/content/${page}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          ...updates
        }),
      });
      // Refresh sections
      await fetchSections();
    } catch (error) {
      console.error('Failed to update section:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">
            Editing {page} Page
          </h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <SectionEditor
              key={section.sectionId}
              section={section}
              onSave={updateSection}
              saving={saving}
            />
          ))}
          
          {sections.length === 0 && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">No sections found for this page.</p>
              <p className="text-sm text-gray-500 mt-2">
                Sections will appear here once content is saved.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionEditor({ section, onSave, saving }) {
  const [formData, setFormData] = useState(section.content || {});

  const handleSave = () => {
    onSave(section.sectionId, {
      content: formData,
      images: section.images || []
    });
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 capitalize">
        {section.sectionId.replace(/-/g, ' ')} Section
      </h3>
      
      <div className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
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
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}