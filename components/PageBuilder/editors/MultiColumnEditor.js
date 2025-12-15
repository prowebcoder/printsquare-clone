// components/PageBuilder/editors/MultiColumnEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2, Plus, ArrowRight, Download, ExternalLink, Star, FileArchive } from 'lucide-react';

const MultiColumnEditor = ({ component, onUpdate }) => {
  const [uploadingColumns, setUploadingColumns] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState({});
  const fileInputRefs = useRef({});
  const zipFileInputRefs = useRef({});

  // Icon options
  const iconOptions = [
    { value: '', label: 'No Icon' },
    { value: 'arrow', label: 'Arrow Right', icon: ArrowRight },
    { value: 'download', label: 'Download', icon: Download },
    { value: 'external', label: 'External Link', icon: ExternalLink },
    { value: 'star', label: 'Star', icon: Star },
    { value: 'file', label: 'File', icon: FileArchive },
  ];

  const handleColumnImageUpload = async (index, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

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
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = '';
      }
    }
  };

  // New function to handle ZIP file upload
  // In the MultiColumnEditor.js, update the upload handler
const handleZipFileUpload = async (index, file) => {
  if (!file) return;

  const isZip = file.type === 'application/zip' || 
               file.type === 'application/x-zip-compressed' ||
               file.name.endsWith('.zip');

  if (!isZip) {
    alert('Please select a ZIP file');
    return;
  }

  if (file.size > 50 * 1024 * 1024) {
    alert('ZIP file size must be less than 50MB');
    return;
  }

  setUploadingFiles(prev => ({ ...prev, [index]: true }));

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      const newColumns = [...(component.content?.columns || [])];
      newColumns[index] = { 
        ...newColumns[index], 
        buttonFile: result.imageUrl, // This will be /api/upload?file=filename.zip
        fileSize: result.fileSize,
        fileName: result.filename,
        buttonType: 'file'
      };
      onUpdate(component.id, { columns: newColumns });
    } else {
      alert('Upload failed: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('Upload failed. Please try again.');
  } finally {
    setUploadingFiles(prev => ({ ...prev, [index]: false }));
    if (zipFileInputRefs.current[index]) {
      zipFileInputRefs.current[index].value = '';
    }
  }
};

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleColumnImageUrlChange = (index, value) => {
    const newColumns = [...(component.content?.columns || [])];
    newColumns[index] = { ...newColumns[index], image: value };
    onUpdate(component.id, { columns: newColumns });
  };

  const handleColumnChange = (index, field, value) => {
    const newColumns = [...(component.content?.columns || [])];
    newColumns[index] = { ...newColumns[index], [field]: value };
    
    // If changing from file to link, clear file-related fields
    if (field === 'buttonType' && value === 'link') {
      newColumns[index].buttonFile = '';
      newColumns[index].fileSize = '';
      newColumns[index].fileName = '';
      newColumns[index].fileDescription = '';
    }
    
    onUpdate(component.id, { columns: newColumns });
  };

  const addColumn = () => {
    const newColumns = [...(component.content?.columns || []), {
      image: '',
      heading: 'New Column',
      text: 'Column description text...',
      buttonText: 'Learn More',
      buttonLink: '#',
      buttonType: 'link', // Default to link
      buttonIcon: '',
      buttonStyle: 'primary',
      buttonColor: '#3b82f6', // blue-600
      buttonTextColor: '#ffffff', // white
      buttonFile: '', // For file uploads
      fileSize: '',
      fileName: '',
      fileDescription: ''
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

  // Default color presets
  const colorPresets = {
    primary: '#3b82f6', // blue-600
    secondary: '#6b7280', // gray-500
    success: '#10b981', // emerald-500
    danger: '#ef4444', // red-500
    warning: '#f59e0b', // amber-500
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
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
              <textarea
                value={column.text || ''}
                onChange={(e) => handleColumnChange(index, 'text', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Column description text"
              />
            </div>

            {/* Button Settings */}
            <div className="space-y-4 border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Settings</label>
              
              {/* Button Type Selection */}
              <div className="mb-3">
                <label className="block text-xs text-gray-500 mb-1">Button Type</label>
                <select
                  value={column.buttonType || 'link'}
                  onChange={(e) => handleColumnChange(index, 'buttonType', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="link">Link (URL)</option>
                  <option value="file">File Download (ZIP)</option>
                </select>
              </div>

              {/* Link Configuration */}
              {column.buttonType === 'link' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={column.buttonText || ''}
                      onChange={(e) => handleColumnChange(index, 'buttonText', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Learn more"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={column.buttonLink || ''}
                      onChange={(e) => handleColumnChange(index, 'buttonLink', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="https://example.com or /page"
                    />
                  </div>
                </div>
              )}

              {/* File Download Configuration */}
              {column.buttonType === 'file' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Button Text (for download)</label>
                    <input
                      type="text"
                      value={column.buttonText || 'Download'}
                      onChange={(e) => handleColumnChange(index, 'buttonText', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Download Now"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ZIP File Upload</label>
                    <div className="mb-2">
                      <input
                        type="file"
                        ref={el => zipFileInputRefs.current[index] = el}
                        onChange={(e) => handleZipFileUpload(index, e.target.files[0])}
                        accept=".zip,application/zip,application/x-zip-compressed"
                        className="hidden"
                        id={`zip-upload-${component.id}-${index}`}
                      />
                      <label
                        htmlFor={`zip-upload-${component.id}-${index}`}
                        className={`cursor-pointer bg-purple-600 text-white px-3 py-2 rounded text-sm inline-block ${
                          uploadingFiles[index] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                        }`}
                      >
                        {uploadingFiles[index] ? 'Uploading ZIP...' : 'Upload ZIP File'}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports .ZIP files (Max 50MB)
                      </p>
                    </div>

                    {column.buttonFile && (
                      <div className="p-3 bg-gray-50 rounded border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileArchive size={20} className="text-purple-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 truncate">
                              {column.fileName || 'uploaded-file.zip'}
                            </p>
                            {column.fileSize && (
                              <p className="text-xs text-gray-500">
                                Size: {column.fileSize}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleColumnChange(index, 'buttonFile', '')}
                            className="text-red-500 hover:text-red-700"
                            title="Remove file"
                          >
                            ×
                          </button>
                        </div>
                        <input
                          type="text"
                          value={column.buttonFile || ''}
                          onChange={(e) => handleColumnChange(index, 'buttonFile', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                          placeholder="Or enter file URL"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">File Description (Optional)</label>
                    <input
                      type="text"
                      value={column.fileDescription || ''}
                      onChange={(e) => handleColumnChange(index, 'fileDescription', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="e.g., Includes templates, guides, and resources"
                    />
                  </div>
                </div>
              )}

              {/* Button Style & Icon (Common for both types) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Button Style</label>
                  <select
                    value={column.buttonStyle || 'primary'}
                    onChange={(e) => handleColumnChange(index, 'buttonStyle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Button Icon</label>
                  <select
                    value={column.buttonIcon || ''}
                    onChange={(e) => handleColumnChange(index, 'buttonIcon', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color Customization */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Button Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={column.buttonColor || '#3b82f6'}
                      onChange={(e) => handleColumnChange(index, 'buttonColor', e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={column.buttonColor || '#3b82f6'}
                      onChange={(e) => handleColumnChange(index, 'buttonColor', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                  {/* Color Presets */}
                  <div className="flex gap-1 mt-2">
                    {Object.entries(colorPresets).map(([name, color]) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleColumnChange(index, 'buttonColor', color)}
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={name.charAt(0).toUpperCase() + name.slice(1)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={column.buttonTextColor || '#ffffff'}
                      onChange={(e) => handleColumnChange(index, 'buttonTextColor', e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={column.buttonTextColor || '#ffffff'}
                      onChange={(e) => handleColumnChange(index, 'buttonTextColor', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              {/* Button Preview */}
              {column.buttonText && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <label className="block text-xs text-gray-500 mb-2">Button Preview:</label>
                  <div className="flex justify-center">
                    <div
                      className={`
                        inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors duration-200 cursor-default
                        ${column.buttonStyle === 'primary' ? 'shadow-sm' : ''}
                        ${column.buttonStyle === 'outline' ? 'border-2 bg-transparent' : ''}
                        ${column.buttonStyle === 'ghost' ? 'bg-transparent hover:bg-gray-100' : ''}
                      `}
                      style={{
                        backgroundColor: column.buttonStyle !== 'outline' && column.buttonStyle !== 'ghost' ? column.buttonColor : undefined,
                        color: column.buttonTextColor,
                        borderColor: column.buttonStyle === 'outline' ? column.buttonColor : undefined,
                      }}
                    >
                      {column.buttonText}
                      {column.buttonIcon && (() => {
                        const IconComponent = iconOptions.find(opt => opt.value === column.buttonIcon)?.icon;
                        return IconComponent ? <IconComponent size={16} /> : null;
                      })()}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Leave button text empty to hide the button
              </p>
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