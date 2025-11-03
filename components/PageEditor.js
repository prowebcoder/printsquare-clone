// components/PageEditor.js
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PageEditor() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const isNew = searchParams.get('new') === 'true';
  
  const [page, setPage] = useState({
    name: '',
    slug: '',
    title: '',
    description: '',
    sections: [],
    metadata: {
      title: '',
      description: '',
      keywords: ''
    }
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && slug) {
      fetchPage();
    }
  }, [slug, isNew]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/admin/pages/${slug}`);
      const data = await response.json();
      setPage(data);
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/pages' : `/api/admin/pages/${slug}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
      });

      if (!response.ok) throw new Error('Failed to save page');
      
      const savedPage = await response.json();
      alert('Page saved successfully!');
      
      if (isNew) {
        window.location.href = `/dashboard/content/editor?slug=${savedPage.slug}`;
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSection = (type) => {
    const newSection = {
      type,
      data: {},
      images: [],
      order: page.sections.length
    };
    setPage(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const handleSectionChange = (index, field, value) => {
    setPage(prev => {
      const updatedSections = [...prev.sections];
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updatedSections[index].data[parent] = {
          ...updatedSections[index].data[parent],
          [child]: value
        };
      } else {
        updatedSections[index].data[field] = value;
      }
      return { ...prev, sections: updatedSections };
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          {isNew ? 'Create New Page' : `Edit: ${page.name}`}
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Page'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Page Name"
                value={page.name}
                onChange={(e) => setPage(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Slug"
                value={page.slug}
                onChange={(e) => setPage(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={page.title}
                onChange={(e) => setPage(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Description"
                value={page.description}
                onChange={(e) => setPage(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
              />
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Page Sections</h3>
              <div className="space-x-2">
                <button
                  onClick={() => handleAddSection('hero')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Hero
                </button>
                <button
                  onClick={() => handleAddSection('content')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Add Content
                </button>
              </div>
            </div>

            {page.sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2">Section: {section.type}</h4>
                {/* Dynamic fields based on section type */}
                {section.type === 'hero' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Headline"
                      value={section.data.headline || ''}
                      onChange={(e) => handleSectionChange(index, 'headline', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                    <input
                      type="text"
                      placeholder="Subheadline"
                      value={section.data.subheadline || ''}
                      onChange={(e) => handleSectionChange(index, 'subheadline', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                  </div>
                )}
                {/* Add more section types as needed */}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meta Title"
                value={page.metadata.title}
                onChange={(e) => setPage(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, title: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                placeholder="Meta Description"
                value={page.metadata.description}
                onChange={(e) => setPage(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, description: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"
              />
              <input
                type="text"
                placeholder="Keywords"
                value={page.metadata.keywords}
                onChange={(e) => setPage(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, keywords: e.target.value }
                }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Status</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={page.isActive}
                onChange={(e) => setPage(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded"
              />
              <span>Active</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}