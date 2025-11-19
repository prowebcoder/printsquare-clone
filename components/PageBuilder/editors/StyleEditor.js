// components/PageBuilder/editors/StyleEditor.js
import { useState } from 'react';

const StyleEditor = ({ styles, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('layout');

  const updateStyle = (key, value) => {
    onUpdate({ [key]: value });
  };

  const tabs = [
    { id: 'layout', name: 'Layout' },
    { id: 'typography', name: 'Typography' },
    { id: 'background', name: 'Background' },
    { id: 'spacing', name: 'Spacing' }
  ];

  return (
    <div className="border rounded-lg">
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Container Width
              </label>
              <select
                value={styles?.containerWidth || 'full'}
                onChange={(e) => updateStyle('containerWidth', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="full">Full Width</option>
                <option value="xl">Extra Large</option>
                <option value="lg">Large</option>
                <option value="md">Medium</option>
                <option value="sm">Small</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Alignment
              </label>
              <select
                value={styles?.contentAlignment || 'left'}
                onChange={(e) => updateStyle('contentAlignment', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Size
                </label>
                <select
                  value={styles?.headingSize || 'h2'}
                  onChange={(e) => updateStyle('headingSize', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="h1">H1 - Large</option>
                  <option value="h2">H2 - Medium</option>
                  <option value="h3">H3 - Small</option>
                  <option value="h4">H4 - Extra Small</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Alignment
                </label>
                <select
                  value={styles?.headingAlignment || 'center'}
                  onChange={(e) => updateStyle('headingAlignment', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={styles?.headingColor || '#000000'}
                  onChange={(e) => updateStyle('headingColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={styles?.headingColor || '#000000'}
                  onChange={(e) => updateStyle('headingColor', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Use Gradient Text
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={styles?.useGradient || false}
                  onChange={(e) => updateStyle('useGradient', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Enable gradient text</span>
              </div>
            </div>

            {styles?.useGradient && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gradient Colors
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="color"
                    value={styles?.gradientStart || '#E21B36'}
                    onChange={(e) => updateStyle('gradientStart', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded"
                  />
                  <input
                    type="color"
                    value={styles?.gradientEnd || '#FF4B2B'}
                    onChange={(e) => updateStyle('gradientEnd', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Type
              </label>
              <select
                value={styles?.backgroundType || 'color'}
                onChange={(e) => updateStyle('backgroundType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="color">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
              </select>
            </div>

            {styles?.backgroundType === 'color' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles?.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={styles?.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            )}

            {styles?.backgroundType === 'gradient' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gradient Colors
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={styles?.gradientStart || '#E21B36'}
                      onChange={(e) => updateStyle('gradientStart', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={styles?.gradientStart || '#E21B36'}
                      onChange={(e) => updateStyle('gradientStart', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#E21B36"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={styles?.gradientEnd || '#FF4B2B'}
                      onChange={(e) => updateStyle('gradientEnd', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={styles?.gradientEnd || '#FF4B2B'}
                      onChange={(e) => updateStyle('gradientEnd', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="#FF4B2B"
                    />
                  </div>
                </div>
              </div>
            )}

            {styles?.backgroundType === 'image' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    value={styles?.backgroundImage || ''}
                    onChange={(e) => updateStyle('backgroundImage', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overlay Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={styles?.overlayColor || 'rgba(0,0,0,0.3)'}
                      onChange={(e) => updateStyle('overlayColor', e.target.value)}
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={styles?.overlayColor || 'rgba(0,0,0,0.3)'}
                      onChange={(e) => updateStyle('overlayColor', e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="rgba(0,0,0,0.3)"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'spacing' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Padding Top/Bottom
                </label>
                <select
                  value={styles?.padding || 'medium'}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Margin Top/Bottom
                </label>
                <select
                  value={styles?.margin || 'none'}
                  onChange={(e) => updateStyle('margin', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="none">None</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius
              </label>
              <select
                value={styles?.borderRadius || 'none'}
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="full">Full Rounded</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleEditor;