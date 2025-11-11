// components/PageBuilder/editors/StyleEditor.js
const StyleEditor = ({ styles, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...styles,
      [field]: value
    });
  };

  const fontSizeOptions = [
    { value: 'xs', label: 'Extra Small (0.75rem)' },
    { value: 'sm', label: 'Small (0.875rem)' },
    { value: 'base', label: 'Base (1rem)' },
    { value: 'lg', label: 'Large (1.125rem)' },
    { value: 'xl', label: 'Extra Large (1.25rem)' },
    { value: '2xl', label: '2X Large (1.5rem)' },
    { value: '3xl', label: '3X Large (1.875rem)' },
    { value: '4xl', label: '4X Large (2.25rem)' },
  ];

  const paddingOptions = [
    { value: 'none', label: 'None (0)' },
    { value: 'small', label: 'Small (0.5rem)' },
    { value: 'medium', label: 'Medium (1rem)' },
    { value: 'large', label: 'Large (1.5rem)' },
    { value: 'xlarge', label: 'Extra Large (2rem)' },
  ];

  const borderRadiusOptions = [
    { value: 'none', label: 'None (0)' },
    { value: 'sm', label: 'Small (0.125rem)' },
    { value: 'md', label: 'Medium (0.375rem)' },
    { value: 'lg', label: 'Large (0.5rem)' },
    { value: 'xl', label: 'Extra Large (0.75rem)' },
    { value: 'full', label: 'Full (9999px)' },
  ];

  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="font-medium text-gray-700 mb-3">Styling</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={styles?.backgroundColor || '#ffffff'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={styles?.backgroundColor || '#ffffff'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#ffffff or rgba(255,255,255,1)"
            />
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={styles?.textColor || '#000000'}
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={styles?.textColor || '#000000'}
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#000000 or rgba(0,0,0,1)"
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <select
            value={styles?.fontSize || 'base'}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            {fontSizeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Text Alignment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Alignment
          </label>
          <select
            value={styles?.textAlign || 'left'}
            onChange={(e) => handleChange('textAlign', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>

        {/* Padding */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <select
            value={styles?.padding || 'medium'}
            onChange={(e) => handleChange('padding', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            {paddingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Border Radius */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Radius
          </label>
          <select
            value={styles?.borderRadius || 'none'}
            onChange={(e) => handleChange('borderRadius', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
          >
            {borderRadiusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom CSS Classes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom CSS Classes
          </label>
          <input
            type="text"
            value={styles?.customClasses || ''}
            onChange={(e) => handleChange('customClasses', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="custom-class1 custom-class2"
          />
          <p className="text-xs text-gray-500 mt-1">Add additional Tailwind CSS classes separated by spaces</p>
        </div>

        {/* Border Settings */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={styles?.borderColor || '#d1d5db'}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={styles?.borderColor || '#d1d5db'}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#d1d5db"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border Width
            </label>
            <select
              value={styles?.borderWidth || '0'}
              onChange={(e) => handleChange('borderWidth', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="0">None</option>
              <option value="1">1px</option>
              <option value="2">2px</option>
              <option value="4">4px</option>
              <option value="8">8px</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shadow
            </label>
            <select
              value={styles?.shadow || 'none'}
              onChange={(e) => handleChange('shadow', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleEditor;