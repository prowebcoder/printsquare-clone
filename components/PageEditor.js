"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PageEditor = ({ pageSlug, sectionId }) => {
  const [pageData, setPageData] = useState(null);
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (pageSlug && pageSlug !== 'null') {
      fetchPageData();
    } else {
      setLoading(false);
    }
  }, [pageSlug, sectionId]);

  const fetchPageData = async () => {
    if (!pageSlug || pageSlug === 'null') {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/content/${pageSlug}`);
      if (response.ok) {
        const data = await response.json();
        setPageData(data);
        
        // Find the specific section
        const sectionData = data.sections?.find(s => s.sectionId === sectionId);
        setSection(sectionData || { 
          sectionId, 
          content: {}, 
          images: [] 
        });
      } else {
        // If page doesn't exist, create a default section
        setSection({ 
          sectionId, 
          content: {}, 
          images: [] 
        });
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
      // Create default section on error
      setSection({ 
        sectionId, 
        content: {}, 
        images: [] 
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = (key, value) => {
    setSection(prev => ({
      ...prev,
      content: {
        ...prev?.content,
        [key]: value
      }
    }));
  };

  const updateImage = async (imageKey, file) => {
    if (!file || !pageSlug || pageSlug === 'null') return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('pageSlug', pageSlug);
    formData.append('sectionId', sectionId);
    formData.append('imageKey', imageKey);

    try {
      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        await fetchPageData(); // Refresh data
        alert('Image uploaded successfully!');
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const saveSection = async () => {
    if (!pageSlug || pageSlug === 'null') {
      alert('Invalid page slug');
      return;
    }

    if (!section) {
      alert('No section data to save');
      return;
    }

    setSaving(true);
    try {
      // Check if page exists first
      const checkResponse = await fetch(`/api/admin/content/${pageSlug}`);
      let currentPageData;

      if (checkResponse.ok) {
        // Page exists, update it
        currentPageData = await checkResponse.json();
        
        // Find the section index
        const sections = [...currentPageData.sections];
        const sectionIndex = sections.findIndex(s => s.sectionId === sectionId);
        
        if (sectionIndex >= 0) {
          sections[sectionIndex] = section;
        } else {
          sections.push(section);
        }

        const response = await fetch(`/api/admin/content/${pageSlug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...currentPageData,
            sections,
            lastUpdated: new Date()
          }),
        });

        if (response.ok) {
          alert('Section saved successfully!');
        } else {
          alert('Error saving section');
        }
      } else {
        // Page doesn't exist, create it
        const newPageData = {
          slug: pageSlug,
          title: pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1),
          description: `Content for ${pageSlug}`,
          sections: [section],
          isActive: true
        };

        const response = await fetch('/api/admin/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPageData),
        });

        if (response.ok) {
          alert('Page created and section saved successfully!');
          await fetchPageData(); // Refresh data
        } else {
          alert('Error creating page');
        }
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving section');
    } finally {
      setSaving(false);
    }
  };

  const addNewField = () => {
    const fieldNameInput = document.getElementById('newFieldName');
    const fieldName = fieldNameInput?.value?.trim();
    
    if (fieldName && section && !section.content[fieldName]) {
      updateContent(fieldName, '');
      fieldNameInput.value = '';
    } else if (!fieldName) {
      alert('Please enter a field name');
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pageSlug || pageSlug === 'null') {
    return (
      <div className="p-4 text-center text-red-600">
        Invalid page slug. Please check the URL.
      </div>
    );
  }

  if (!section) {
    return (
      <div className="p-4 text-center text-yellow-600">
        No section data available. Try creating a new section.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Editing: {pageSlug} - {sectionId}
        </h2>
        <button
          onClick={saveSection}
          disabled={saving}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Section'}
        </button>
      </div>

      {/* Dynamic Content Editor */}
      <div className="space-y-6">
        {section.content && Object.keys(section.content).length > 0 ? (
          Object.entries(section.content).map(([key, value]) => (
            <div key={key} className="border rounded-lg p-4">
              <label className="block text-sm font-medium mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              {typeof value === 'string' && value.length < 200 ? (
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => updateContent(key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <textarea
                  value={value || ''}
                  onChange={(e) => updateContent(key, e.target.value)}
                  className="w-full p-2 border rounded h-32"
                />
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4 border rounded-lg">
            No content fields yet. Add a new field below.
          </div>
        )}

        {/* Image Management */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.images && section.images.length > 0 ? (
              section.images.map((image) => (
                <div key={image.key} className="border rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">
                      {image.key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => updateImage(image.key, e.target.files[0])}
                      className="text-sm"
                      disabled={uploading}
                    />
                  </div>
                  {image.url && (
                    <div className="relative h-40 bg-gray-100 rounded">
                      <Image
                        src={image.url}
                        alt={image.alt || ''}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 p-4">
                No images uploaded yet.
              </div>
            )}
          </div>
        </div>

        {/* Add New Content Field */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Add New Field</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Field name (e.g., title, description)"
              className="flex-1 p-2 border rounded"
              id="newFieldName"
              onKeyPress={(e) => {
                if (e.key === 'Enter') addNewField();
              }}
            />
            <button
              onClick={addNewField}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;