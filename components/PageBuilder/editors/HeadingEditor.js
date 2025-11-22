// components/PageBuilder/editors/HeadingEditor.js
"use client";

const HeadingEditor = ({ component, onUpdate }) => {
  const content = component.content || {};

  const handleUpdate = (field, value) => {
    onUpdate(component.id, { 
      ...content,
      [field]: value 
    });
  };

  const headingSizes = {
    'text-2xl': 'Small (2xl)',
    'text-3xl': 'Medium (3xl)',
    'text-4xl': 'Large (4xl)',
    'text-5xl': 'Extra Large (5xl)',
    'text-6xl': 'XXL (6xl)'
  };

  const alignments = {
    'text-left': 'Left',
    'text-center': 'Center',
    'text-right': 'Right'
  };

  return (
    <div className="space-y-4 p-3">
      {/* Heading Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Heading Text</label>
        <input
          type="text"
          value={content.text || ''}
          onChange={(e) => handleUpdate('text', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter heading text"
        />
      </div>

      {/* Heading Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Heading Level</label>
        <select
          value={content.level || 'h2'}
          onChange={(e) => handleUpdate('level', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="h1">H1 (Most Important)</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6 (Least Important)</option>
        </select>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
        <select
          value={content.fontSize || 'text-4xl'}
          onChange={(e) => handleUpdate('fontSize', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {Object.entries(headingSizes).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={content.textColor || '#1F2937'}
            onChange={(e) => handleUpdate('textColor', e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={content.textColor || '#1F2937'}
              onChange={(e) => handleUpdate('textColor', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="#1F2937"
            />
          </div>
        </div>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(alignments).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => handleUpdate('alignment', value)}
              className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                content.alignment === value 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
        <select
          value={content.fontWeight || 'font-bold'}
          onChange={(e) => handleUpdate('fontWeight', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="font-normal">Normal</option>
          <option value="font-medium">Medium</option>
          <option value="font-semibold">Semi Bold</option>
          <option value="font-bold">Bold</option>
          <option value="font-extrabold">Extra Bold</option>
        </select>
      </div>

      {/* Line Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Line Height</label>
        <select
          value={content.lineHeight || 'leading-normal'}
          onChange={(e) => handleUpdate('lineHeight', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="leading-tight">Tight</option>
          <option value="leading-snug">Snug</option>
          <option value="leading-normal">Normal</option>
          <option value="leading-relaxed">Relaxed</option>
          <option value="leading-loose">Loose</option>
        </select>
      </div>

      {/* Margin Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Spacing</label>
        <select
          value={content.margin || 'my-6'}
          onChange={(e) => handleUpdate('margin', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="my-2">Small</option>
          <option value="my-4">Medium</option>
          <option value="my-6">Large</option>
          <option value="my-8">Extra Large</option>
          <option value="my-12">XXL</option>
        </select>
      </div>

      {/* Background Color (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color (Optional)</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={content.backgroundColor || '#FFFFFF'}
            onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={content.backgroundColor || '#FFFFFF'}
              onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
          <button
            type="button"
            onClick={() => handleUpdate('backgroundColor', '')}
            className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
        <select
          value={content.padding || 'p-6'}
          onChange={(e) => handleUpdate('padding', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="p-2">Small</option>
          <option value="p-4">Medium</option>
          <option value="p-6">Large</option>
          <option value="p-8">Extra Large</option>
        </select>
      </div>

      {/* Preview */}
      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div 
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-20 flex items-center justify-center"
          style={{ 
            backgroundColor: content.backgroundColor || 'transparent'
          }}
        >
          {content.text ? (
            <div 
              className={`${content.fontSize || 'text-4xl'} ${content.fontWeight || 'font-bold'} ${content.alignment || 'text-center'} ${content.lineHeight || 'leading-normal'} ${content.padding || 'p-6'}`}
              style={{ color: content.textColor || '#1F2937' }}
            >
              {content.text}
            </div>
          ) : (
            <p className="text-gray-400 italic">Preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadingEditor;