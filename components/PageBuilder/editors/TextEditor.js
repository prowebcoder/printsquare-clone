// components/PageBuilder/editors/TextEditor.js
"use client";

const TextEditor = ({ component, onUpdate }) => {
  const content = component.content || {};

  const handleUpdate = (field, value) => {
    onUpdate(component.id, { 
      ...content,
      [field]: value 
    });
  };

  const textSizes = {
    'text-sm': 'Small',
    'text-base': 'Base',
    'text-lg': 'Large',
    'text-xl': 'Extra Large',
    'text-2xl': '2X Large'
  };

  const alignments = {
    'text-left': 'Left',
    'text-center': 'Center', 
    'text-right': 'Right',
    'text-justify': 'Justify'
  };

  const widths = {
    'max-w-none': 'Full Width',
    'max-w-screen-md': 'Medium (Container)',
    'max-w-prose': 'Narrow (Readable)',
    'max-w-sm': 'Extra Narrow'
  };

  const lineHeights = {
    'leading-tight': 'Tight',
    'leading-snug': 'Snug',
    'leading-normal': 'Normal',
    'leading-relaxed': 'Relaxed',
    'leading-loose': 'Loose'
  };

  const fontWeights = {
    'font-normal': 'Normal',
    'font-medium': 'Medium',
    'font-semibold': 'Semi Bold',
    'font-bold': 'Bold'
  };

  return (
    <div className="space-y-4 p-3">
      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={content.content || ''}
          onChange={(e) => handleUpdate('content', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="Enter your text..."
        />
      </div>

      {/* Text Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Size</label>
        <select
          value={content.textSize || 'text-base'}
          onChange={(e) => handleUpdate('textSize', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {Object.entries(textSizes).map(([value, label]) => (
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
            value={content.textColor || '#374151'}
            onChange={(e) => handleUpdate('textColor', e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={content.textColor || '#374151'}
              onChange={(e) => handleUpdate('textColor', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="#374151"
            />
          </div>
        </div>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
        <div className="grid grid-cols-4 gap-2">
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

      {/* Width Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Width</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(widths).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => handleUpdate('width', value)}
              className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                content.width === value 
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
          value={content.fontWeight || 'font-normal'}
          onChange={(e) => handleUpdate('fontWeight', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {Object.entries(fontWeights).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
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
          {Object.entries(lineHeights).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Background Color */}
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

      {/* Margin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Spacing</label>
        <select
          value={content.margin || 'my-4'}
          onChange={(e) => handleUpdate('margin', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="my-2">Small</option>
          <option value="my-4">Medium</option>
          <option value="my-6">Large</option>
          <option value="my-8">Extra Large</option>
        </select>
      </div>

      {/* Live Preview */}
      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Live Preview</label>
        <div 
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-32 flex items-center justify-center"
          style={{ 
            backgroundColor: content.backgroundColor || 'transparent'
          }}
        >
          {content.content ? (
            <div 
              className={`
                ${content.textSize || 'text-base'}
                ${content.fontWeight || 'font-normal'}
                ${content.alignment || 'text-left'}
                ${content.lineHeight || 'leading-normal'}
                ${content.width || 'max-w-none'}
                ${content.padding || 'p-6'}
                w-full
              `}
              style={{ color: content.textColor || '#374151' }}
            >
              {content.content.split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {line || <br />}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">Enter text to see preview</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;