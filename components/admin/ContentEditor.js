// components/admin/ContentEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Edit, Save, X, Image, Type, Video } from 'lucide-react';

export default function ContentEditor({ pageSlug = 'home' }) {
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [pageSlug]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/admin/content?page=${pageSlug}`);
      const data = await response.json();
      if (response.ok) {
        setSections(data.sections || []);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (section) => {
    setEditingSection(section.sectionId);
    setEditData(section.content || {});
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditData({});
  };

  const saveContent = async (sectionId) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/content?page=${pageSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionId,
          updates: editData
        }),
      });

      if (response.ok) {
        await fetchContent(); // Refresh data
        setEditingSection(null);
        alert('Content updated successfully!');
      } else {
        alert('Failed to update content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSectionIcon = (sectionId) => {
    const icons = {
      hero: <Image size={20} className="text-blue-500" />,
      text: <Type size={20} className="text-green-500" />,
      heading: <Type size={20} className="text-purple-500" />,
      video: <Video size={20} className="text-red-500" />,
    };
    return icons[sectionId] || <Type size={20} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Content Editor - {pageSlug} Page
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Edit the content of your page sections
        </p>
      </div>

      <div className="p-6 space-y-6">
        {sections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No sections found for this page.
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.sectionId} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getSectionIcon(section.sectionId)}
                  <div>
                    <h3 className="font-semibold text-gray-800 capitalize">
                      {section.sectionId} Section
                    </h3>
                    <p className="text-sm text-gray-500">
                      Order: {section.order}
                    </p>
                  </div>
                </div>
                
                {editingSection === section.sectionId ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveContent(section.sectionId)}
                      disabled={saving}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                    >
                      <Save size={16} />
                      <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(section)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {editingSection === section.sectionId ? (
                <div className="space-y-4 p-4 bg-gray-50 rounded">
                  {/* Dynamic form based on section type */}
                  {section.sectionId === 'hero' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => updateField('title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={editData.subtitle || ''}
                          onChange={(e) => updateField('subtitle', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  {section.sectionId === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        value={editData.content || ''}
                        onChange={(e) => updateField('content', e.target.value)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {section.sectionId === 'heading' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Heading Text
                      </label>
                      <input
                        type="text"
                        value={editData.text || ''}
                        onChange={(e) => updateField('text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Add more section types as needed */}
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  {/* Preview current content */}
                  {section.sectionId === 'hero' && (
                    <div>
                      <p><strong>Title:</strong> {section.content?.title || 'Not set'}</p>
                      <p><strong>Subtitle:</strong> {section.content?.subtitle || 'Not set'}</p>
                    </div>
                  )}
                  {section.sectionId === 'text' && (
                    <p><strong>Content:</strong> {section.content?.content ? `${section.content.content.substring(0, 100)}...` : 'Not set'}</p>
                  )}
                  {section.sectionId === 'heading' && (
                    <p><strong>Heading:</strong> {section.content?.text || 'Not set'}</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}