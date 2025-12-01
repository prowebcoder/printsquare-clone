//// components/PageBuilder/editors/ServiceBoxEditor.js
"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronUp, 
  ChevronDown,
  MoveUp,
  MoveDown,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

// Icon options for selection
const iconOptions = [
  { value: 'wrench', label: 'Wrench (Tools)' },
  { value: 'printer', label: 'Printer' },
  { value: 'layers', label: 'Layers' },
  { value: 'settings', label: 'Settings' },
  { value: 'package', label: 'Package' },
  { value: 'shield', label: 'Shield (Security)' },
  { value: 'zap', label: 'Zap (Energy)' },
  { value: 'cpu', label: 'CPU (Technology)' },
  { value: 'hardDrive', label: 'Hard Drive' },
  { value: 'tool', label: 'Tool' },
  { value: 'filter', label: 'Filter' },
  { value: 'thermometer', label: 'Thermometer' },
  { value: 'box', label: 'Box' },
  { value: 'cogs', label: 'Cogs (Mechanical)' }
];

const ServiceBoxEditor = ({ component, onUpdate }) => {
  const [expandedBox, setExpandedBox] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Initialize content
  const content = component.content || {};

  // Add new box
  const addBox = () => {
    const newBoxes = [...(content.boxes || [])];
    newBoxes.push({
      title: `Service ${newBoxes.length + 1}`,
      icon: 'wrench',
      items: ['Item 1', 'Item 2', 'Item 3'],
      boxBgType: 'solid',
      boxSolidColor: '#121A2C',
      boxGradientFrom: '#121A2C',
      boxGradientTo: '#1a2239',
      borderColor: '#2E3850',
      titleColor: '#FFFFFF',
      iconColor: '#E21B36',
      iconBgColor: 'rgba(226, 27, 54, 0.1)'
    });
    onUpdate(component.id, { boxes: newBoxes });
    setExpandedBox(newBoxes.length - 1);
  };

  // Delete box
  const deleteBox = (index) => {
    const newBoxes = (content.boxes || []).filter((_, i) => i !== index);
    onUpdate(component.id, { boxes: newBoxes });
    if (expandedBox === index) setExpandedBox(null);
  };

  // Duplicate box
  const duplicateBox = (index) => {
    const newBoxes = [...(content.boxes || [])];
    const boxToDuplicate = { ...newBoxes[index] };
    newBoxes.splice(index + 1, 0, boxToDuplicate);
    onUpdate(component.id, { boxes: newBoxes });
  };

  // Move box up/down
  const moveBox = (index, direction) => {
    const newBoxes = [...(content.boxes || [])];
    if (direction === 'up' && index > 0) {
      [newBoxes[index], newBoxes[index - 1]] = [newBoxes[index - 1], newBoxes[index]];
    } else if (direction === 'down' && index < newBoxes.length - 1) {
      [newBoxes[index], newBoxes[index + 1]] = [newBoxes[index + 1], newBoxes[index]];
    }
    onUpdate(component.id, { boxes: newBoxes });
    if (expandedBox === index) {
      setExpandedBox(direction === 'up' ? index - 1 : direction === 'down' ? index + 1 : index);
    }
  };

  // Update box property
  const updateBox = (index, field, value) => {
    const newBoxes = [...(content.boxes || [])];
    newBoxes[index] = { ...newBoxes[index], [field]: value };
    onUpdate(component.id, { boxes: newBoxes });
  };

  // Update item in box
  const updateBoxItem = (boxIndex, itemIndex, value) => {
    const newBoxes = [...(content.boxes || [])];
    const items = [...(newBoxes[boxIndex].items || [])];
    items[itemIndex] = value;
    newBoxes[boxIndex] = { ...newBoxes[boxIndex], items };
    onUpdate(component.id, { boxes: newBoxes });
  };

  // Add item to box
  const addBoxItem = (boxIndex) => {
    const newBoxes = [...(content.boxes || [])];
    const items = [...(newBoxes[boxIndex].items || []), 'New Item'];
    newBoxes[boxIndex] = { ...newBoxes[boxIndex], items };
    onUpdate(component.id, { boxes: newBoxes });
  };

  // Delete item from box
  const deleteBoxItem = (boxIndex, itemIndex) => {
    const newBoxes = [...(content.boxes || [])];
    const items = (newBoxes[boxIndex].items || []).filter((_, i) => i !== itemIndex);
    newBoxes[boxIndex] = { ...newBoxes[boxIndex], items };
    onUpdate(component.id, { boxes: newBoxes });
  };

  // Handle drag start
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    const newBoxes = [...(content.boxes || [])];
    const draggedItem = newBoxes[draggedIndex];
    newBoxes.splice(draggedIndex, 1);
    newBoxes.splice(dropIndex, 0, draggedItem);
    
    onUpdate(component.id, { boxes: newBoxes });
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      {/* Section Title */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Service Boxes Settings</h3>
        <p className="text-sm text-gray-600 mt-1">Configure your equipment and service listing</p>
      </div>

      {/* Section Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Background Settings */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Section Background</label>
          <select
            value={content.backgroundType || 'solid'}
            onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="solid">Solid Color</option>
            <option value="gradient">Gradient</option>
            <option value="none">None (Transparent)</option>
          </select>

          {content.backgroundType === 'solid' && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={content.backgroundColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={content.backgroundColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#0B1633"
              />
            </div>
          )}

          {content.backgroundType === 'gradient' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-12">From:</span>
                <input
                  type="color"
                  value={content.gradientFrom || '#0B1633'}
                  onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.gradientFrom || '#0B1633'}
                  onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#0B1633"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-12">To:</span>
                <input
                  type="color"
                  value={content.gradientTo || '#1a2239'}
                  onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.gradientTo || '#1a2239'}
                  onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#1a2239"
                />
              </div>
            </div>
          )}
        </div>

        {/* Layout Settings */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Layout Settings</label>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Boxes Per Row</label>
            <select
              value={content.boxesPerRow || 4}
              onChange={(e) => onUpdate(component.id, { boxesPerRow: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value={2}>2 Boxes</option>
              <option value={3}>3 Boxes</option>
              <option value={4}>4 Boxes</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="decorativeElements"
                checked={content.showDecorativeElements || true}
                onChange={(e) => onUpdate(component.id, { showDecorativeElements: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="decorativeElements" className="text-sm text-gray-600">
                Show decorative elements
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="itemHoverEffect"
                checked={content.itemHoverEffect || true}
                onChange={(e) => onUpdate(component.id, { itemHoverEffect: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="itemHoverEffect" className="text-sm text-gray-600">
                Item hover effect
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Header Content */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Header Content</label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => onUpdate(component.id, { title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Our Equipment & Technology"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-600">Color:</span>
              <input
                type="color"
                value={content.titleColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
              <select
                value={content.titleSize || 'text-4xl sm:text-5xl'}
                onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
              >
                <option value="text-3xl sm:text-4xl">Medium</option>
                <option value="text-4xl sm:text-5xl">Large</option>
                <option value="text-5xl sm:text-6xl">Extra Large</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Description</label>
            <textarea
              value={content.description || ''}
              onChange={(e) => onUpdate(component.id, { description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              rows="2"
              placeholder="We're powered by precision — from prepress to finishing — equipped with cutting-edge machines..."
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-600">Color:</span>
              <input
                type="color"
                value={content.descriptionColor || '#D6D9E0'}
                onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
              <select
                value={content.descriptionSize || 'text-base sm:text-lg'}
                onChange={(e) => onUpdate(component.id, { descriptionSize: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
              >
                <option value="text-sm sm:text-base">Small</option>
                <option value="text-base sm:text-lg">Medium</option>
                <option value="text-lg sm:text-xl">Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Default Styling */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Default Styling</label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Icon Color 1</label>
            <input
              type="color"
              value={content.iconColor1 || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { iconColor1: e.target.value })}
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1">Icon Color 2</label>
            <input
              type="color"
              value={content.iconColor2 || '#FF4B2B'}
              onChange={(e) => onUpdate(component.id, { iconColor2: e.target.value })}
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Item Border Color</label>
            <input
              type="color"
              value={content.itemBorderColor || '#2E3850'}
              onChange={(e) => onUpdate(component.id, { itemBorderColor: e.target.value })}
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Item Hover Color</label>
            <input
              type="color"
              value={content.itemHoverBorderColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { itemHoverBorderColor: e.target.value })}
              className="w-full h-8 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Box Border Radius</label>
            <select
              value={content.boxBorderRadius || '1rem'}
              onChange={(e) => onUpdate(component.id, { boxBorderRadius: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="0.5rem">Small (0.5rem)</option>
              <option value="1rem">Medium (1rem)</option>
              <option value="1.5rem">Large (1.5rem)</option>
              <option value="2rem">Extra Large (2rem)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Icon Border Radius</label>
            <select
              value={content.iconBorderRadius || '0.5rem'}
              onChange={(e) => onUpdate(component.id, { iconBorderRadius: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="0.25rem">Small (0.25rem)</option>
              <option value="0.5rem">Medium (0.5rem)</option>
              <option value="0.75rem">Large (0.75rem)</option>
              <option value="9999px">Full Rounded</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Icon Size</label>
            <select
              value={content.iconSize || 'w-6 h-6'}
              onChange={(e) => onUpdate(component.id, { iconSize: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="w-4 h-4">Small</option>
              <option value="w-6 h-6">Medium</option>
              <option value="w-8 h-8">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Boxes Management */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Service Boxes</label>
          <button
            type="button"
            onClick={addBox}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Box
          </button>
        </div>

        <div className="space-y-3">
          {content.boxes?.map((box, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden ${draggedIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Box Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedBox(expandedBox === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="text-gray-400 cursor-move" />
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{ backgroundColor: box.iconBgColor || 'rgba(226, 27, 54, 0.1)' }}
                    >
                      <span className="text-xs">{box.title?.charAt(0) || 'B'}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{box.title || `Box ${index + 1}`}</h4>
                      <p className="text-xs text-gray-500">
                        {box.items?.length || 0} items • {box.icon || 'wrench'} icon
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBox(index, 'up');
                      }}
                      disabled={index === 0}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBox(index, 'down');
                      }}
                      disabled={index === (content.boxes?.length || 0) - 1}
                      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateBox(index);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600"
                  >
                    <Copy size={16} />
                  </button>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBox(index);
                    }}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Box Content (Collapsible) */}
              {expandedBox === index && (
                <div className="p-4 border-t bg-gray-50 space-y-4">
                  {/* Basic Box Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Box Title</label>
                      <input
                        type="text"
                        value={box.title || ''}
                        onChange={(e) => updateBox(index, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Enter box title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Icon</label>
                      <select
                        value={box.icon || 'wrench'}
                        onChange={(e) => updateBox(index, 'icon', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Box Styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background Type</label>
                      <select
                        value={box.boxBgType || 'solid'}
                        onChange={(e) => updateBox(index, 'boxBgType', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="solid">Solid Color</option>
                        <option value="gradient">Gradient</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={box.titleColor || '#FFFFFF'}
                          onChange={(e) => updateBox(index, 'titleColor', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={box.titleColor || '#FFFFFF'}
                          onChange={(e) => updateBox(index, 'titleColor', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded text-sm"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>

                  {box.boxBgType === 'solid' ? (
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={box.boxSolidColor || '#121A2C'}
                          onChange={(e) => updateBox(index, 'boxSolidColor', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={box.boxSolidColor || '#121A2C'}
                          onChange={(e) => updateBox(index, 'boxSolidColor', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded text-sm"
                          placeholder="#121A2C"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={box.boxGradientFrom || '#121A2C'}
                            onChange={(e) => updateBox(index, 'boxGradientFrom', e.target.value)}
                            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={box.boxGradientFrom || '#121A2C'}
                            onChange={(e) => updateBox(index, 'boxGradientFrom', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded text-sm"
                            placeholder="#121A2C"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={box.boxGradientTo || '#1a2239'}
                            onChange={(e) => updateBox(index, 'boxGradientTo', e.target.value)}
                            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={box.boxGradientTo || '#1a2239'}
                            onChange={(e) => updateBox(index, 'boxGradientTo', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded text-sm"
                            placeholder="#1a2239"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Icon Styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={box.iconColor || '#E21B36'}
                          onChange={(e) => updateBox(index, 'iconColor', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={box.iconColor || '#E21B36'}
                          onChange={(e) => updateBox(index, 'iconColor', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded text-sm"
                          placeholder="#E21B36"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Icon Background</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={box.iconBgColor || 'rgba(226, 27, 54, 0.1)'}
                          onChange={(e) => updateBox(index, 'iconBgColor', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={box.iconBgColor || 'rgba(226, 27, 54, 0.1)'}
                          onChange={(e) => updateBox(index, 'iconBgColor', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded text-sm"
                          placeholder="rgba(226, 27, 54, 0.1)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Items List</label>
                      <button
                        type="button"
                        onClick={() => addBoxItem(index)}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        + Add Item
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {box.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => updateBoxItem(index, itemIndex, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded text-sm"
                            placeholder="Enter item text"
                          />
                          <button
                            type="button"
                            onClick={() => deleteBoxItem(index, itemIndex)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      
                      {(!box.items || box.items.length === 0) && (
                        <div className="text-center py-4 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded">
  No items added. Click &quot;Add Item&quot; to add items.
</div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action (Optional) */}
                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={box.ctaText || ''}
                          onChange={(e) => updateBox(index, 'ctaText', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="Learn More"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={box.ctaLink || ''}
                          onChange={(e) => updateBox(index, 'ctaLink', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Boxes Message */}
        {(!content.boxes || content.boxes.length === 0) && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No service boxes added yet.</p>
            <button
              type="button"
              onClick={addBox}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Click here to add your first box
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceBoxEditor;