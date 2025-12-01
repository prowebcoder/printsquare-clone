// components/PageBuilder/editors/premium/TextBoxEditor.js
"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Copy,
  Eye,
  EyeOff,
  Palette,
  Type,
  Image as ImageIcon,
  Layout
} from 'lucide-react';

// Icon options for selection
const iconOptions = [
  { value: 'printer', label: 'Printer' },
  { value: 'star', label: 'Star' },
  { value: 'award', label: 'Award' },
  { value: 'checkCircle', label: 'Check Circle' },
  { value: 'shield', label: 'Shield' },
  { value: 'trophy', label: 'Trophy' },
  { value: 'heart', label: 'Heart' },
  { value: 'zap', label: 'Zap' },
  { value: 'target', label: 'Target' },
  { value: 'users', label: 'Users' },
  { value: 'clock', label: 'Clock' },
  { value: 'trendingUp', label: 'Trending Up' }
];

const TextBoxEditor = ({ component, onUpdate }) => {
  const [expandedSection, setExpandedSection] = useState('general');

  // Initialize content
  const content = component.content || {};

  // Add new highlight
  const addHighlight = () => {
    const newHighlights = [...(content.highlights || [])];
    newHighlights.push({
      text: `Highlight ${newHighlights.length + 1}`,
      bgColor: '#FFE8E8',
      textColor: '#E21B36',
      borderColor: '#F5C2C2',
      bgType: 'solid'
    });
    onUpdate(component.id, { highlights: newHighlights });
  };

  // Delete highlight
  const deleteHighlight = (index) => {
    const newHighlights = (content.highlights || []).filter((_, i) => i !== index);
    onUpdate(component.id, { highlights: newHighlights });
  };

  // Move highlight up/down
  const moveHighlight = (index, direction) => {
    const newHighlights = [...(content.highlights || [])];
    if (direction === 'up' && index > 0) {
      [newHighlights[index], newHighlights[index - 1]] = [newHighlights[index - 1], newHighlights[index]];
    } else if (direction === 'down' && index < newHighlights.length - 1) {
      [newHighlights[index], newHighlights[index + 1]] = [newHighlights[index + 1], newHighlights[index]];
    }
    onUpdate(component.id, { highlights: newHighlights });
  };

  // Update highlight
  const updateHighlight = (index, field, value) => {
    const newHighlights = [...(content.highlights || [])];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    onUpdate(component.id, { highlights: newHighlights });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      {/* Section Title */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Text Box Settings</h3>
        <p className="text-sm text-gray-600 mt-1">Configure your professional text box with highlights</p>
      </div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setExpandedSection('general')}
          className={`px-3 py-1 rounded text-sm ${expandedSection === 'general' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          General
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('background')}
          className={`px-3 py-1 rounded text-sm ${expandedSection === 'background' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Palette className="inline w-3 h-3 mr-1" />
          Background
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('container')}
          className={`px-3 py-1 rounded text-sm ${expandedSection === 'container' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Layout className="inline w-3 h-3 mr-1" />
          Container
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('icon')}
          className={`px-3 py-1 rounded text-sm ${expandedSection === 'icon' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <ImageIcon className="inline w-3 h-3 mr-1" />
          Icon
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('text')}
          className={`px-3 py-1 rounded text-sm ${expandedSection === 'text' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          <Type className="inline w-3 h-3 mr-1" />
          Text
        </button>
        <button
          type="button"
          onClick={() => setExpandedSection('highlights')}
          className={`px-3 py-1 rounded text-sm ${expandedSection === 'highlights' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
        >
          Highlights
        </button>
      </div>

      {/* General Settings */}
      {expandedSection === 'general' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Icon</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showIcon"
                  checked={content.showIcon !== false}
                  onChange={(e) => onUpdate(component.id, { showIcon: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showIcon" className="ml-2 text-sm text-gray-600">
                  Display icon at the top
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Decorative Elements</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showDecorativeElements"
                  checked={content.showDecorativeElements !== false}
                  onChange={(e) => onUpdate(component.id, { showDecorativeElements: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showDecorativeElements" className="ml-2 text-sm text-gray-600">
                  Show background decorative elements
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Container Max Width</label>
            <select
              value={content.containerMaxWidth || 'max-w-5xl'}
              onChange={(e) => onUpdate(component.id, { containerMaxWidth: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="max-w-3xl">Small (3xl)</option>
              <option value="max-w-4xl">Medium (4xl)</option>
              <option value="max-w-5xl">Large (5xl)</option>
              <option value="max-w-6xl">Extra Large (6xl)</option>
              <option value="max-w-7xl">Full (7xl)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Padding</label>
              <select
                value={content.paddingY || 'py-20'}
                onChange={(e) => onUpdate(component.id, { paddingY: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="py-10">Small (2.5rem)</option>
                <option value="py-16">Medium (4rem)</option>
                <option value="py-20">Large (5rem)</option>
                <option value="py-24">Extra Large (6rem)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horizontal Padding</label>
              <select
                value={content.paddingX || 'px-6 sm:px-10'}
                onChange={(e) => onUpdate(component.id, { paddingX: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="px-4 sm:px-6">Small</option>
                <option value="px-6 sm:px-10">Medium</option>
                <option value="px-8 sm:px-12">Large</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Background Settings */}
      {expandedSection === 'background' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
            <select
              value={content.backgroundType || 'solid'}
              onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
              <option value="none">None (Transparent)</option>
            </select>
          </div>

          {content.backgroundType === 'solid' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={content.backgroundColor || '#F8F9FB'}
                  onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.backgroundColor || '#F8F9FB'}
                  onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#F8F9FB"
                />
              </div>
            </div>
          )}

          {content.backgroundType === 'gradient' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.gradientFrom || '#F8F9FB'}
                    onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.gradientFrom || '#F8F9FB'}
                    onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#F8F9FB"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.gradientTo || '#FFFFFF'}
                    onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.gradientTo || '#FFFFFF'}
                    onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Decorative Elements</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Decorative Type</label>
                <select
                  value={content.decorativeType || 'gradient'}
                  onChange={(e) => onUpdate(component.id, { decorativeType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="solid">Solid Color</option>
                  <option value="gradient">Gradient</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(content.decorativeOpacity || 20) * 100}
                  onChange={(e) => onUpdate(component.id, { decorativeOpacity: e.target.value / 100 })}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 text-right">
                  {Math.round((content.decorativeOpacity || 0.2) * 100)}%
                </div>
              </div>
            </div>

            {content.decorativeType === 'solid' && (
              <div className="mt-3">
                <label className="block text-xs text-gray-600 mb-1">Decorative Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.decorativeColor || '#E21B36'}
                    onChange={(e) => onUpdate(component.id, { decorativeColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.decorativeColor || '#E21B36'}
                    onChange={(e) => onUpdate(component.id, { decorativeColor: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#E21B36"
                  />
                </div>
              </div>
            )}

            {content.decorativeType === 'gradient' && (
              <div className="space-y-3 mt-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.decorativeGradientFrom || '#E21B36'}
                      onChange={(e) => onUpdate(component.id, { decorativeGradientFrom: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.decorativeGradientFrom || '#E21B36'}
                      onChange={(e) => onUpdate(component.id, { decorativeGradientFrom: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#E21B36"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.decorativeGradientTo || '#FF4B2B'}
                      onChange={(e) => onUpdate(component.id, { decorativeGradientTo: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.decorativeGradientTo || '#FF4B2B'}
                      onChange={(e) => onUpdate(component.id, { decorativeGradientTo: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#FF4B2B"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Container Settings */}
      {expandedSection === 'container' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={content.containerBgColor || '#FFFFFF'}
                  onChange={(e) => onUpdate(component.id, { containerBgColor: e.target.value })}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.containerBgColor || '#FFFFFF'}
                  onChange={(e) => onUpdate(component.id, { containerBgColor: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={content.containerBorderColor || '#EAEAEA'}
                  onChange={(e) => onUpdate(component.id, { containerBorderColor: e.target.value })}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.containerBorderColor || '#EAEAEA'}
                  onChange={(e) => onUpdate(component.id, { containerBorderColor: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#EAEAEA"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
              <select
                value={content.containerBorderRadius || '1.5rem'}
                onChange={(e) => onUpdate(component.id, { containerBorderRadius: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="0.5rem">Small (0.5rem)</option>
                <option value="1rem">Medium (1rem)</option>
                <option value="1.5rem">Large (1.5rem)</option>
                <option value="2rem">Extra Large (2rem)</option>
                <option value="2.5rem">XXL (2.5rem)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Width</label>
              <select
                value={content.containerBorderWidth || '1px'}
                onChange={(e) => onUpdate(component.id, { containerBorderWidth: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="0px">None</option>
                <option value="1px">Thin (1px)</option>
                <option value="2px">Medium (2px)</option>
                <option value="3px">Thick (3px)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shadow</label>
            <select
              value={content.containerShadow || '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}
              onChange={(e) => onUpdate(component.id, { containerShadow: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="none">None</option>
              <option value="0 1px 3px rgba(0, 0, 0, 0.1)">Small</option>
              <option value="0 4px 6px rgba(0, 0, 0, 0.1)">Medium</option>
              <option value="0 10px 15px rgba(0, 0, 0, 0.1)">Large</option>
              <option value="0 25px 50px -12px rgba(0, 0, 0, 0.25)">Extra Large</option>
              <option value="0 35px 60px -15px rgba(0, 0, 0, 0.3)">XXL</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Container Padding</label>
              <select
                value={content.containerPadding || 'p-10 sm:p-14'}
                onChange={(e) => onUpdate(component.id, { containerPadding: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="p-6 sm:p-8">Small</option>
                <option value="p-8 sm:p-10">Medium</option>
                <option value="p-10 sm:p-14">Large</option>
                <option value="p-12 sm:p-16">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Icon Settings */}
      {expandedSection === 'icon' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <select
                value={content.icon || 'printer'}
                onChange={(e) => onUpdate(component.id, { icon: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                {iconOptions.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Size</label>
              <select
                value={content.iconSize || '2rem'}
                onChange={(e) => onUpdate(component.id, { iconSize: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="1.5rem">Small (1.5rem)</option>
                <option value="2rem">Medium (2rem)</option>
                <option value="2.5rem">Large (2.5rem)</option>
                <option value="3rem">Extra Large (3rem)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Background Type</label>
            <select
              value={content.iconBgType || 'gradient'}
              onChange={(e) => onUpdate(component.id, { iconBgType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
            </select>
          </div>

          {content.iconBgType === 'solid' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={content.iconSolidColor || '#E21B36'}
                  onChange={(e) => onUpdate(component.id, { iconSolidColor: e.target.value })}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={content.iconSolidColor || '#E21B36'}
                  onChange={(e) => onUpdate(component.id, { iconSolidColor: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#E21B36"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.iconGradientFrom || '#E21B36'}
                    onChange={(e) => onUpdate(component.id, { iconGradientFrom: e.target.value })}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.iconGradientFrom || '#E21B36'}
                    onChange={(e) => onUpdate(component.id, { iconGradientFrom: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#E21B36"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.iconGradientTo || '#FF4B2B'}
                    onChange={(e) => onUpdate(component.id, { iconGradientTo: e.target.value })}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.iconGradientTo || '#FF4B2B'}
                    onChange={(e) => onUpdate(component.id, { iconGradientTo: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#FF4B2B"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon Border Radius</label>
            <select
              value={content.iconBorderRadius || '9999px'}
              onChange={(e) => onUpdate(component.id, { iconBorderRadius: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="0.25rem">Small (0.25rem)</option>
              <option value="0.5rem">Medium (0.5rem)</option>
              <option value="0.75rem">Large (0.75rem)</option>
              <option value="9999px">Full Rounded</option>
            </select>
          </div>
        </div>
      )}

      {/* Text Settings */}
      {expandedSection === 'text' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => onUpdate(component.id, { title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Professional Printing Excellence"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Title Style</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="titleGradient"
                    checked={content.titleGradient || true}
                    onChange={(e) => onUpdate(component.id, { titleGradient: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="titleGradient" className="text-sm text-gray-600">
                    Use gradient text
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Title Size</label>
                <select
                  value={content.titleSize || 'text-4xl sm:text-5xl'}
                  onChange={(e) => onUpdate(component.id, { titleSize: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="text-3xl sm:text-4xl">Medium</option>
                  <option value="text-4xl sm:text-5xl">Large</option>
                  <option value="text-5xl sm:text-6xl">Extra Large</option>
                </select>
              </div>
            </div>

            {content.titleGradient ? (
              <div className="space-y-3 mt-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.titleGradientFrom || '#E21B36'}
                      onChange={(e) => onUpdate(component.id, { titleGradientFrom: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.titleGradientFrom || '#E21B36'}
                      onChange={(e) => onUpdate(component.id, { titleGradientFrom: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#E21B36"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.titleGradientTo || '#FF4B2B'}
                      onChange={(e) => onUpdate(component.id, { titleGradientTo: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.titleGradientTo || '#FF4B2B'}
                      onChange={(e) => onUpdate(component.id, { titleGradientTo: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#FF4B2B"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <label className="block text-xs text-gray-600 mb-1">Title Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.titleColor || '#1F2937'}
                    onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.titleColor || '#1F2937'}
                    onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#1F2937"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={content.description || ''}
              onChange={(e) => onUpdate(component.id, { description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              rows="4"
              placeholder="Over the years, Print Seoul has earned the trust of magazine publishers, designers, and printing brokers..."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Description Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={content.descriptionColor || '#4B5563'}
                    onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={content.descriptionColor || '#4B5563'}
                    onChange={(e) => onUpdate(component.id, { descriptionColor: e.target.value })}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#4B5563"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Description Size</label>
                <select
                  value={content.descriptionSize || 'text-base sm:text-lg'}
                  onChange={(e) => onUpdate(component.id, { descriptionSize: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="text-sm sm:text-base">Small</option>
                  <option value="text-base sm:text-lg">Medium</option>
                  <option value="text-lg sm:text-xl">Large</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Highlight</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Brand Highlight Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={content.brandHighlightColor || '#1F2937'}
                      onChange={(e) => onUpdate(component.id, { brandHighlightColor: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={content.brandHighlightColor || '#1F2937'}
                      onChange={(e) => onUpdate(component.id, { brandHighlightColor: e.target.value })}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#1F2937"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Brand Highlight Weight</label>
                  <select
                    value={content.brandHighlightWeight || '600'}
                    onChange={(e) => onUpdate(component.id, { brandHighlightWeight: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="400">Normal</option>
                    <option value="500">Medium</option>
                    <option value="600">Semi Bold</option>
                    <option value="700">Bold</option>
                    <option value="800">Extra Bold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Highlights Settings */}
      {expandedSection === 'highlights' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show Highlight Icons</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showHighlightIcons"
                  checked={content.showHighlightIcons !== false}
                  onChange={(e) => onUpdate(component.id, { showHighlightIcons: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="showHighlightIcons" className="ml-2 text-sm text-gray-600">
                  Display icons in highlights
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Icon</label>
              <select
                value={content.highlightIcon || 'star'}
                onChange={(e) => onUpdate(component.id, { highlightIcon: e.target.value })}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <select
                value={content.highlightsLayout || 'horizontal'}
                onChange={(e) => onUpdate(component.id, { highlightsLayout: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Size</label>
              <select
                value={content.highlightTextSize || 'text-sm'}
                onChange={(e) => onUpdate(component.id, { highlightTextSize: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="text-xs">Extra Small</option>
                <option value="text-sm">Small</option>
                <option value="text-base">Medium</option>
                <option value="text-lg">Large</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Default BG Color</label>
              <input
                type="color"
                value={content.highlightBgColor || '#FFE8E8'}
                onChange={(e) => onUpdate(component.id, { highlightBgColor: e.target.value })}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 mb-1">Default Text Color</label>
              <input
                type="color"
                value={content.highlightTextColor || '#E21B36'}
                onChange={(e) => onUpdate(component.id, { highlightTextColor: e.target.value })}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Default Border Color</label>
              <input
                type="color"
                value={content.highlightBorderColor || '#F5C2C2'}
                onChange={(e) => onUpdate(component.id, { highlightBorderColor: e.target.value })}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Border Radius</label>
              <select
                value={content.highlightBorderRadius || '9999px'}
                onChange={(e) => onUpdate(component.id, { highlightBorderRadius: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-xs"
              >
                <option value="0.25rem">Small</option>
                <option value="0.5rem">Medium</option>
                <option value="0.75rem">Large</option>
                <option value="9999px">Full Rounded</option>
              </select>
            </div>
          </div>

          {/* Highlights List */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Highlights</label>
              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Highlight
              </button>
            </div>

            <div className="space-y-3">
              {content.highlights?.map((highlight, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        Highlight {index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveHighlight(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                        >
                          <MoveUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveHighlight(index, 'down')}
                          disabled={index === (content.highlights?.length || 0) - 1}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                        >
                          <MoveDown size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => deleteHighlight(index)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Text</label>
                      <input
                        type="text"
                        value={highlight.text || ''}
                        onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Trusted Quality"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Background Type</label>
                        <select
                          value={highlight.bgType || 'solid'}
                          onChange={(e) => updateHighlight(index, 'bgType', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-xs"
                        >
                          <option value="solid">Solid</option>
                          <option value="gradient">Gradient</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={highlight.textColor || '#E21B36'}
                            onChange={(e) => updateHighlight(index, 'textColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={highlight.textColor || '#E21B36'}
                            onChange={(e) => updateHighlight(index, 'textColor', e.target.value)}
                            className="flex-1 p-1 border border-gray-300 rounded text-xs"
                            placeholder="#E21B36"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Icon Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={highlight.iconColor || highlight.textColor || '#E21B36'}
                            onChange={(e) => updateHighlight(index, 'iconColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {highlight.bgType === 'gradient' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Gradient From</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="color"
                              value={highlight.gradientFrom || '#FFE8E8'}
                              onChange={(e) => updateHighlight(index, 'gradientFrom', e.target.value)}
                              className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={highlight.gradientFrom || '#FFE8E8'}
                              onChange={(e) => updateHighlight(index, 'gradientFrom', e.target.value)}
                              className="flex-1 p-1 border border-gray-300 rounded text-xs"
                              placeholder="#FFE8E8"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Gradient To</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="color"
                              value={highlight.gradientTo || '#FFD1D1'}
                              onChange={(e) => updateHighlight(index, 'gradientTo', e.target.value)}
                              className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={highlight.gradientTo || '#FFD1D1'}
                              onChange={(e) => updateHighlight(index, 'gradientTo', e.target.value)}
                              className="flex-1 p-1 border border-gray-300 rounded text-xs"
                              placeholder="#FFD1D1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {highlight.bgType === 'solid' && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="color"
                            value={highlight.bgColor || '#FFE8E8'}
                            onChange={(e) => updateHighlight(index, 'bgColor', e.target.value)}
                            className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={highlight.bgColor || '#FFE8E8'}
                            onChange={(e) => updateHighlight(index, 'bgColor', e.target.value)}
                            className="flex-1 p-1 border border-gray-300 rounded text-xs"
                            placeholder="#FFE8E8"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {(!content.highlights || content.highlights.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No highlights added yet.</p>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Click here to add your first highlight
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextBoxEditor;