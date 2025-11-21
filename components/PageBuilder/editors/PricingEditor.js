// components/PageBuilder/editors/PricingEditor.js
"use client";

import { useState, useRef } from 'react';
import { Trash2, Plus } from 'lucide-react';

const PricingEditor = ({ component, onUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
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

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update component with the new image URL
        onUpdate(component.id, { image: result.imageUrl });
      } else {
        alert('Upload failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Background Options
  const handleBackgroundChange = (field, value) => {
    onUpdate(component.id, { [field]: value });
  };

  // Title Colors
  const handleTitleColorChange = (field, value) => {
    onUpdate(component.id, { [field]: value });
  };

  // Step Circle Colors
  const handleStepColorChange = (field, value) => {
    onUpdate(component.id, { [field]: value });
  };

  // Table Management
  const addTable = () => {
    const newTables = [...(component.content?.tables || []), {
      id: `table-${Date.now()}`,
      title: 'New Company',
      headers: ['Quantity', 'Price', 'Price/Copy'],
      rows: [
        ['1,000 copies', '$0', '$0.00'],
        ['5,000 copies', '$0', '$0.00']
      ],
      headerBgColor: '#E21B36',
      headerTextColor: '#FFFFFF',
      bodyTextColor: '#0B1633'
    }];
    onUpdate(component.id, { tables: newTables });
  };

  const updateTable = (tableIndex, field, value) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex] = { ...newTables[tableIndex], [field]: value };
    onUpdate(component.id, { tables: newTables });
  };

  const updateTableRow = (tableIndex, rowIndex, colIndex, value) => {
    const newTables = [...(component.content?.tables || [])];
    const newRows = [...newTables[tableIndex].rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    newTables[tableIndex].rows = newRows;
    onUpdate(component.id, { tables: newTables });
  };

  const addTableRow = (tableIndex) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex].rows.push(['', '', '']);
    onUpdate(component.id, { tables: newTables });
  };

  const removeTableRow = (tableIndex, rowIndex) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex].rows = newTables[tableIndex].rows.filter((_, i) => i !== rowIndex);
    onUpdate(component.id, { tables: newTables });
  };

  const removeTable = (tableIndex) => {
    const newTables = (component.content?.tables || []).filter((_, i) => i !== tableIndex);
    onUpdate(component.id, { tables: newTables });
  };

  // Specifications Management
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...(component.content?.specifications || [])];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    onUpdate(component.id, { specifications: newSpecs });
  };

  const addSpec = () => {
    const newSpecs = [...(component.content?.specifications || []), {
      label: 'New Specification',
      value: 'Value'
    }];
    onUpdate(component.id, { specifications: newSpecs });
  };

  const removeSpec = (index) => {
    const newSpecs = (component.content?.specifications || []).filter((_, i) => i !== index);
    onUpdate(component.id, { specifications: newSpecs });
  };

  return (
    <div className="space-y-4 p-3">
      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={component.content?.backgroundType || 'gradient'}
          onChange={(e) => handleBackgroundChange('backgroundType', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="none">None (Transparent)</option>
        </select>

        {component.content?.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.backgroundColor || '#111827'}
              onChange={(e) => handleBackgroundChange('backgroundColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#111827'}
              onChange={(e) => handleBackgroundChange('backgroundColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#111827"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#111827'}
                onChange={(e) => handleBackgroundChange('gradientFrom', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#111827'}
                onChange={(e) => handleBackgroundChange('gradientFrom', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#111827"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#000000'}
                onChange={(e) => handleBackgroundChange('gradientTo', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#000000'}
                onChange={(e) => handleBackgroundChange('gradientTo', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
      </div>

      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Main title"
        />
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.titleColor || '#FFFFFF'}
                onChange={(e) => handleTitleColorChange('titleColor', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.titleColor || '#FFFFFF'}
                onChange={(e) => handleTitleColorChange('titleColor', e.target.value)}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Size</label>
            <select
              value={component.content?.titleSize || 'text-4xl md:text-5xl'}
              onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-xs"
            >
              <option value="text-3xl md:text-4xl">Small</option>
              <option value="text-4xl md:text-5xl">Medium</option>
              <option value="text-5xl md:text-6xl">Large</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Title</label>
        <input
          type="text"
          value={component.content?.highlightedTitle || ''}
          onChange={(e) => onUpdate(component.id, { highlightedTitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Highlighted title part"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Highlighted Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.highlightedColor || '#E21B36'}
              onChange={(e) => handleTitleColorChange('highlightedColor', e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.highlightedColor || '#E21B36'}
              onChange={(e) => handleTitleColorChange('highlightedColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#E21B36"
            />
          </div>
        </div>
      </div>

      {/* Step Circle Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Colors</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.stepGradientFrom || '#E21B36'}
                onChange={(e) => handleStepColorChange('stepGradientFrom', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.stepGradientFrom || '#E21B36'}
                onChange={(e) => handleStepColorChange('stepGradientFrom', e.target.value)}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#E21B36"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.stepGradientTo || '#FF4B2B'}
                onChange={(e) => handleStepColorChange('stepGradientTo', e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.stepGradientTo || '#FF4B2B'}
                onChange={(e) => handleStepColorChange('stepGradientTo', e.target.value)}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FF4B2B"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description 1</label>
        <textarea
          value={component.content?.description1 || ''}
          onChange={(e) => onUpdate(component.id, { description1: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={2}
          placeholder="First description"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description 2</label>
        <textarea
          value={component.content?.description2 || ''}
          onChange={(e) => onUpdate(component.id, { description2: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={2}
          placeholder="Second description"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sample Title</label>
        <input
          type="text"
          value={component.content?.sampleTitle || ''}
          onChange={(e) => onUpdate(component.id, { sampleTitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Sample specification title"
        />
      </div>
      
      {/* Specifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
        {component.content?.specifications?.map((spec, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={spec.label}
              onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Label"
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Value"
            />
            <button
              type="button"
              onClick={() => removeSpec(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpec}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Specification
        </button>
      </div>

      {/* Pricing Tables */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Pricing Tables</label>
          <button
            type="button"
            onClick={addTable}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center gap-1"
          >
            <Plus size={16} /> Add Table
          </button>
        </div>
        
        {component.content?.tables?.map((table, tableIndex) => (
          <div key={table.id} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Table: {table.title}</h4>
              <button
                type="button"
                onClick={() => removeTable(tableIndex)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Table Title */}
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Table Title</label>
              <input
                type="text"
                value={table.title}
                onChange={(e) => updateTable(tableIndex, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Company Name"
              />
            </div>

            {/* Table Colors */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Header BG</label>
                <input
                  type="color"
                  value={table.headerBgColor || '#E21B36'}
                  onChange={(e) => updateTable(tableIndex, 'headerBgColor', e.target.value)}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Header Text</label>
                <input
                  type="color"
                  value={table.headerTextColor || '#FFFFFF'}
                  onChange={(e) => updateTable(tableIndex, 'headerTextColor', e.target.value)}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Body Text</label>
                <input
                  type="color"
                  value={table.bodyTextColor || '#0B1633'}
                  onChange={(e) => updateTable(tableIndex, 'bodyTextColor', e.target.value)}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              <label className="block text-xs text-gray-600 mb-1">Table Data</label>
              {table.rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 items-center">
                  {row.map((cell, colIndex) => (
                    <input
                      key={colIndex}
                      type="text"
                      value={cell}
                      onChange={(e) => updateTableRow(tableIndex, rowIndex, colIndex, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder={`Column ${colIndex + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => removeTableRow(tableIndex, rowIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTableRow(tableIndex)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                + Add Row
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Currency Note</label>
        <input
          type="text"
          value={component.content?.currencyNote || ''}
          onChange={(e) => onUpdate(component.id, { currencyNote: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Currency note text"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Footer Note</label>
        <input
          type="text"
          value={component.content?.footerNote || ''}
          onChange={(e) => onUpdate(component.id, { footerNote: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Footer note text"
        />
      </div>
    </div>
  );
};

export default PricingEditor;