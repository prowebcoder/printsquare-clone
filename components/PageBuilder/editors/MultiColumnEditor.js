// components/PageBuilder/editors/MultiColumnEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2, Plus } from 'lucide-react';

const MultiColumnEditor = ({ component, onUpdate }) => {
  const [uploadingColumns, setUploadingColumns] = useState({});
  const fileInputRefs = useRef({});

  const handleColumnImageUpload = async (index, file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Set uploading state for this specific column
    setUploadingColumns(prev => ({ ...prev, [index]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update the specific column with the new image URL
        const newColumns = [...(component.content?.columns || [])];
        newColumns[index] = { 
          ...newColumns[index], 
          image: result.imageUrl 
        };
        onUpdate(component.id, { columns: newColumns });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingColumns(prev => ({ ...prev, [index]: false }));
      // Reset file input
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = '';
      }
    }
  };

  const handleColumnImageUrlChange = (index, value) => {
    const newColumns = [...(component.content?.columns || [])];
    newColumns[index] = { ...newColumns[index], image: value };
    onUpdate(component.id, { columns: newColumns });
  };

  const handleColumnChange = (index, field, value) => {
    const newColumns = [...(component.content?.columns || [])];
    newColumns[index] = { ...newColumns[index], [field]: value };
    onUpdate(component.id, { columns: newColumns });
  };

  const addColumn = () => {
    const newColumns = [...(component.content?.columns || []), {
      image: '',
      heading: 'New Column',
      text: 'Column description text...'
    }];
    onUpdate(component.id, { columns: newColumns });
  };

  const removeColumn = (index) => {
    const newColumns = (component.content?.columns || []).filter((_, i) => i !== index);
    onUpdate(component.id, { columns: newColumns });
  };

  const handleLayoutChange = (field, value) => {
    onUpdate(component.id, { 
      [field]: value 
    });
  };

  return (
    <div className="space-y-6">
      {/* Layout Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Layout Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Columns per Row (Desktop)
            </label>
            <select
              value={component.content?.columnsPerRowDesktop || 3}
              onChange={(e) => handleLayoutChange('columnsPerRowDesktop', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
              <option value={5}>5 Columns</option>
              <option value={6}>6 Columns</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Columns per Row (Mobile)
            </label>
            <select
              value={component.content?.columnsPerRowMobile || 1}
              onChange={(e) => handleLayoutChange('columnsPerRowMobile', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Configure how many columns display per row on different screen sizes.
        </p>
      </div>

      {/* Columns Management */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Columns</label>
          <button
            type="button"
            onClick={addColumn}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Add Column
          </button>
        </div>

        {component.content?.columns?.map((column, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Column {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeColumn(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete column"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Column Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              
              {/* Upload Button */}
              <div className="mb-2">
                <input
                  type="file"
                  ref={el => fileInputRefs.current[index] = el}
                  onChange={(e) => handleColumnImageUpload(index, e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                  id={`column-image-upload-${component.id}-${index}`}
                />
                <label
                  htmlFor={`column-image-upload-${component.id}-${index}`}
                  className={`cursor-pointer bg-blue-600 text-white px-3 py-2 rounded text-sm inline-block ${
                    uploadingColumns[index] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {uploadingColumns[index] ? 'Uploading...' : 'Upload Image'}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>

              {/* Image Preview and URL Input */}
              <div className="space-y-2">
                {column.image && (
                  <div className="relative border rounded p-2 bg-gray-50">
                    <p className="text-xs text-gray-600 mb-1">Image Preview:</p>
                    <div className="relative h-24 w-full border rounded overflow-hidden">
                      <img 
                        src={column.image} 
                        alt="Column preview" 
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => handleColumnChange(index, 'image', '')}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      Current: {column.image}
                    </p>
                  </div>
                )}
                
                {/* URL Input as fallback */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Or enter image URL:</label>
                  <input
                    type="text"
                    value={column.image || ''}
                    onChange={(e) => handleColumnImageUrlChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Column Heading */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
              <input
                type="text"
                value={column.heading || ''}
                onChange={(e) => handleColumnChange(index, 'heading', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Column heading"
              />
            </div>

            {/* Column Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
              <textarea
                value={column.text || ''}
                onChange={(e) => handleColumnChange(index, 'text', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Column description text"
              />
            </div>
          </div>
        ))}

        {(!component.content?.columns || component.content.columns.length === 0) && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-3">No columns added yet</p>
            <button
              type="button"
              onClick={addColumn}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Column
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiColumnEditor;