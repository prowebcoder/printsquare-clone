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
    if (page) fetchContent();
  }, [page]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`/api/admin/content/${page}`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      setContent(data.content || {});
    } catch (error) {
      setError('❌ Failed to load page content: ' + error.message);
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
        body: JSON.stringify({ sectionId, page, ...updates })
      });

      if (!response.ok) throw new Error('Save failed');

      await fetchContent();
    } catch (error) {
      alert('Failed to save changes: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const addNewSection = () => {
    const sectionId = prompt('Enter section ID (e.g. “hero”, “about-content”)');
    if (!sectionId) return;

    updateSection(sectionId, {
      sectionId,
      page,
      content: {
        title: 'New Section Title',
        description: 'Add your content here...'
      },
      images: []
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-xl font-medium text-gray-700 animate-pulse">
          Loading {page} page…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 capitalize">
              Edit {page} Page
            </h1>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          <div className="flex gap-3">
            <button
              onClick={addNewSection}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow hover:opacity-90 transition"
            >
              + Add Section
            </button>

            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-gray-800 text-white shadow hover:bg-gray-900 transition"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Section List */}
        <div className="space-y-8">
          {Object.keys(content).length ? (
            Object.values(content).map((section) => (
              <SectionEditor
                key={section.sectionId}
                section={section}
                onSave={updateSection}
                saving={saving}
              />
            ))
          ) : (
            <div className="p-10 bg-white/60 rounded-2xl shadow text-center backdrop-blur">
              <p className="text-gray-600 mb-3">
                No sections found for this page.
              </p>
              <button
                onClick={addNewSection}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700"
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

/* -------------------------------------------------------
   Section Editor
------------------------------------------------------- */

function SectionEditor({ section, onSave, saving }) {
  const [formData, setFormData] = useState(section.content || {});
  const [sectionId, setSectionId] = useState(section.sectionId);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addField = () => {
    const field = prompt('Enter field name:');
    if (!field) return;

    setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  const removeField = (key) => {
    const updated = { ...formData };
    delete updated[key];
    setFormData(updated);
  };

  const handleSave = () => {
    onSave(sectionId, {
      sectionId,
      content: formData,
      images: section.images || []
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      {/* Section ID */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Section ID
        </label>
        <input
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Dynamic Fields */}
      <div className="space-y-5 mb-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex gap-3 items-start">
            <div className="flex-1">
              <label className="text-sm text-gray-700 font-semibold">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>

              {value.length < 120 ? (
                <input
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <textarea
                  rows={4}
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="mt-1 w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              )}
            </div>

            <button
              onClick={() => removeField(key)}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={addField}
          className="px-4 py-2.5 rounded-xl bg-gray-700 text-white shadow hover:bg-gray-800 transition"
        >
          + Add Field
        </button>

        <button
          disabled={saving}
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {saving ? 'Saving…' : 'Save Section'}
        </button>
      </div>
    </div>
  );
}
