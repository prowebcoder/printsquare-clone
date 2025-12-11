// components/admin/HardQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// Enhanced default configuration for hardcover binding
const HARDQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Hardcover Book Printing Quote",
    description: "Configure your professional hardcover book with our instant quoting system. Perfect for premium publications, yearbooks, and special editions.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  sizes: [
    { value: '5.5x8.5', label: '5.5" x 8.5"', display: '5.5" x 8.5"' },
    { value: '6x9', label: '6" x 9"', display: '6" x 9"' },
    { value: '7x10', label: '7" x 10"', display: '7" x 10"' },
    { value: '8.5x11-letter', label: '8.5" x 11" (Letter)', display: '8.5" x 11"' },
    { value: '8.5x11-standard', label: '8.5" x 11"', display: '8.5" x 11"' },
    { value: '9x12', label: '9" x 12"', display: '9" x 12"' },
    { value: 'A6', label: 'A6 (4.13" x 5.83")', display: 'A6 (105 x 148 mm)' },
    { value: 'A5', label: 'A5 (5.83" x 8.27")', display: 'A5 (148 x 210 mm)' },
    { value: 'A4', label: 'A4 (8.27" x 11.69")', display: 'A4 (210 x 297 mm)' },
    { value: 'B6', label: 'B6 (5.04" x 7.17")', display: 'B6 (128 x 182 mm)' },
    { value: 'B5', label: 'B5 (7.17" x 10.12")', display: 'B5 (182 x 257 mm)' },
    { value: 'B4', label: 'B4 (10.12" x 14.33")', display: 'B4 (257 x 364 mm)' },
    { value: 'custom', label: 'Custom Size', display: 'Custom Size' }
  ],
  bindingEdges: [
    { 
      value: 'SQUARE', 
      label: 'Square Spine', 
      desc: 'Standard square spine for hardcover books',
      image: '/assets/images/hardcover/square-spine.png'
    },
    { 
      value: 'ROUNDED', 
      label: 'Rounded Spine', 
      desc: 'Premium rounded spine for better durability',
      image: '/assets/images/hardcover/rounded-spine.png'
    },
  ],
  headbandColors: [
    { value: 'RD30', label: 'Red', color: '#ff0000', price: 0 },
    { value: 'BL30', label: 'Blue', color: '#0000ff', price: 0 },
    { value: 'GN30', label: 'Green', color: '#00ff00', price: 0 },
    { value: 'BK30', label: 'Black', color: '#000000', price: 0 },
    { value: 'GY30', label: 'Gray', color: '#808080', price: 0 },
    { value: 'BR30', label: 'Brown', color: '#8B4513', price: 0 },
    { value: 'PU30', label: 'Purple', color: '#800080', price: 0 }
  ],
  bookmarkOptions: [
    { value: 'NONE', label: 'None', price: 0 },
    { value: 'SAME', label: 'Same color as headband', price: 15 },
    { value: 'CONTRAST', label: 'Contrast color', price: 20 }
  ],
  paperOptions: {
    cover: [
      { 
        value: 'MATTE', 
        label: 'Matte', 
        description: 'Matte finish, professional look',
        price: 0 
      },
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        description: 'Glossy finish, vibrant colors',
        price: 25 
      },
      { 
        value: 'UNCOATED', 
        label: 'Uncoated', 
        description: 'Natural paper feel',
        price: 0 
      },
      { 
        value: 'PAPERCLOTH_GLOSS', 
        label: 'Papercloth Gloss', 
        description: 'Premium papercloth with gloss finish',
        price: 75 
      },
      { 
        value: 'PAPERCLOTH_MATTE', 
        label: 'Papercloth Matte', 
        description: 'Premium papercloth with matte finish',
        price: 70 
      },
      { 
        value: 'LINEN', 
        label: 'Linen', 
        description: 'Premium linen cover material',
        price: 120 
      },
      { 
        value: 'LEATHERETTE', 
        label: 'Leatherette', 
        description: 'Synthetic leather finish',
        price: 150 
      }
    ],
    inside: [
      { value: 'MATTE', label: 'Matte', description: 'Matte finish, reduces glare', price: 0 },
      { value: 'GLOSS', label: 'Gloss', description: 'Glossy finish, vibrant printing', price: 25 },
      { value: 'UNCOATED', label: 'Uncoated', description: 'Natural, uncoated paper', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', description: 'Premium heavy-weight paper', price: 35 },
      { value: 'COLORED', label: 'Colored', description: 'Colored interior paper', price: 40 }
    ],
    dustCover: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'GLOSS', label: 'Gloss', price: 25 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 35 },
      { value: 'UNCOATED_W', label: 'Uncoated White', price: 0 }
    ]
  },
  printColors: [
    { value: 'NOCOLOR', label: 'No Print', price: 0 },
    { value: 'CMYK', label: 'Full color', price: 0 },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', price: 75 },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', price: 150 },
    { value: 'BW', label: 'Black only', price: -100 },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color', price: -25 },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color', price: 50 }
  ],
  coverFinishes: [
    { value: 'NONE', label: 'None', price: 0 },
    { value: 'MATTE', label: 'Matte Lamination', price: 50 },
    { value: 'GLOSS', label: 'Gloss Lamination', price: 50 },
    { value: 'SPOT_UV', label: 'Spot UV', price: 75 },
    { value: 'FOIL_STAMPING', label: 'Foil Stamping', price: 100 },
    { value: 'EMBOSSING', label: 'Embossing', price: 80 },
    { value: 'DEBOSSING', label: 'Debossing', price: 80 }
  ],
  additionalOptions: {
    proof: [
      { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0 },
      { value: 'DIGITAL', label: 'Digital Proof', price: 50 },
      { value: 'HARDCOPY', label: 'Hard Copy Proof', price: 100 },
    ],
    holePunch: [
      { value: '6', label: '0.236" (6mm) drill - Most commonly used size for wall calendar', price: 15 },
      { value: '8', label: '0.315" (8mm) drill - Most selected for binder holes', price: 20 },
      { value: '9.5', label: '0.374" (9.5mm) drill - Used for binders and etc.', price: 25 },
    ],
    slipcase: [
      { value: 'NONE', label: 'None', price: 0 },
      { value: 'CASE', label: 'Slipcase only', price: 80 },
      { value: 'CASEPRINT', label: 'Slipcase + printing', price: 150 },
    ],
    shrinkWrap: [
      { value: '1', label: '1 copy/wrapping', price: 0.15 },
      { value: '2', label: '2 copy/wrapping', price: 0.12 },
      { value: '3', label: '3 copy/wrapping', price: 0.10 },
      { value: '5', label: '5 copy/wrapping', price: 0.08 },
    ],
    directMail: [
      { value: 'ALL', label: 'DM all quantity', price: 0.75 },
      { value: 'PORTION', label: 'DM a portion of the quantity', price: 0.50 },
    ],
    cornerProtectors: [
      { value: 'NONE', label: 'None', price: 0 },
      { value: 'STANDARD', label: 'Standard Corner Protectors', price: 0.10 },
      { value: 'PREMIUM', label: 'Premium Corner Protectors', price: 0.20 },
    ]
  },
  positions: [
    { value: 'FRONT', label: 'Before page 1' },
    { value: 'BACK', label: 'After last page' },
    { value: 'SELECT', label: 'Front of page no.' },
  ],
  pageCounts: [36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 200, 208, 216, 224, 232, 240, 248, 256],
  weightOptions: ['80', '100', '120', '150', '200', '250', '300'],
  quantities: [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000, 2500, 3000, 4000, 5000],
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
  },
  spineWidth: {
    base: '0.178"',
    rounded: '0.200"'
  },
  pricing: {
    baseSetupCost: 300,
    costPerPage: 0.08,
    customSizeMultiplier: 1.3,
    standardSizeMultiplier: 1.2,
    hardcoverBaseCost: 150,
    roundedSpinePremium: 75,
    dustCoverBaseCost: 100,
    dustCoverPerCopy: 0.25,
    cornerProtectorBase: 25,
    cornerProtectorPerCopy: 0.05
  },
  maxSubscriptionCards: 5,
  maxDustCovers: 1
};

// Paper weight conversion data for hardcover specific weights
const PAPER_WEIGHT_CONVERSIONS = {
  '80': { 
    gsm: '80 gsm',
    us: '54# text',
    pt: '2.5 pt',
    kg: '69 kg'
  },
  '100': { 
    gsm: '100 gsm',
    us: '68# text',
    pt: '3.2 pt',
    kg: '86 kg'
  },
  '120': { 
    gsm: '120 gsm',
    us: '80# text',
    pt: '3.8 pt',
    kg: '103 kg'
  },
  '150': { 
    gsm: '150 gsm',
    us: '100# text',
    pt: '4.8 pt',
    kg: '129 kg'
  },
  '200': { 
    gsm: '200 gsm',
    us: '74# cover',
    pt: '7.1 pt',
    kg: '172 kg'
  },
  '250': { 
    gsm: '250 gsm',
    us: '92# cover',
    pt: '9.1 pt',
    kg: '215 kg'
  },
  '300': { 
    gsm: '300 gsm',
    us: '110# cover',
    pt: '11.3 pt',
    kg: '258 kg'
  }
};

export default function HardQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(HARDQUOTE_DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    paper: true,
    binding: true,
    additional: true,
    pricing: true
  });

  // Initialize with saved config or defaults
  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved hardcover config:', formConfig);
      setConfig(formConfig);
    } else {
      console.log('📥 Loading default hardcover config');
      setConfig(HARDQUOTE_DEFAULT_CONFIG);
    }
  }, [formConfig]);

  // Helper function to update nested properties
  const updateNestedConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
      return newConfig;
    });
  };

  // Helper function to update array items in nested paths
  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return prev;
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (Array.isArray(current[arrayKey]) && current[arrayKey][index]) {
        current[arrayKey][index] = { ...current[arrayKey][index], [field]: value };
      }
      
      return newConfig;
    });
  };

  // Add item to array
  const addArrayItem = (path, newItem) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (!Array.isArray(current[arrayKey])) {
        current[arrayKey] = [];
      }
      
      current[arrayKey] = [...current[arrayKey], newItem];
      return newConfig;
    });
  };

  // Remove item from array
  const removeArrayItem = (path, index) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return prev;
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey] = current[arrayKey].filter((_, i) => i !== index);
      }
      
      return newConfig;
    });
  };

  // Handle saving configuration
  const handleSave = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      console.log('💾 Saving hardcover config:', config);
      await onSave(config);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Render editable array with multiple fields
  const renderEditableArray = (title, path, fields, isNested = false) => {
    const getArray = () => {
      const keys = path.split('.');
      let current = config;
      for (let i = 0; i < keys.length; i++) {
        if (!current[keys[i]]) return [];
        current = current[keys[i]];
      }
      return Array.isArray(current) ? current : [];
    };

    const array = getArray();

    return (
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => {
              const newItem = fields.reduce((acc, field) => {
                if (field === 'price') {
                  acc[field] = 0;
                } else if (field === 'description') {
                  acc[field] = '';
                } else if (field === 'label') {
                  acc[field] = 'New Item';
                } else if (field === 'value') {
                  acc[field] = `NEW_${Date.now()}`;
                } else if (field === 'desc') {
                  acc[field] = '';
                } else if (field === 'color') {
                  acc[field] = '#000000';
                } else if (field === 'display') {
                  acc[field] = '';
                } else if (field === 'image') {
                  acc[field] = '';
                } else {
                  acc[field] = '';
                }
                return acc;
              }, {});
              addArrayItem(path, newItem);
            }}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add New
          </button>
        </div>
        
        <div className="space-y-3">
          {array.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {fields.map(field => (
                  <div key={field} className={`${field === 'description' || field === 'desc' ? 'col-span-2' : ''}`}>
                    <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                      {field === 'gsm' ? 'Weight (gsm)' : field}
                    </label>
                    {field === 'color' ? (
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={item[field] || '#000000'}
                          onChange={(e) => {
                            updateArrayItem(path, index, field, e.target.value);
                          }}
                          className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={item[field] || ''}
                          onChange={(e) => {
                            updateArrayItem(path, index, field, e.target.value);
                          }}
                          className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Hex color code"
                        />
                      </div>
                    ) : (
                      <input
                        type={field === 'price' ? 'number' : 'text'}
                        value={item[field] || ''}
                        onChange={(e) => {
                          const value = field === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
                          updateArrayItem(path, index, field, value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Enter ${field}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render simple string array
  const renderSimpleArray = (title, path, placeholder = "Enter value") => {
    const getArray = () => {
      const keys = path.split('.');
      let current = config;
      for (let i = 0; i < keys.length; i++) {
        if (!current[keys[i]]) return [];
        current = current[keys[i]];
      }
      return Array.isArray(current) ? current : [];
    };

    const array = getArray();

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => addArrayItem(path, '')}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add New
          </button>
        </div>
        
        <div className="space-y-2">
          {array.map((item, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type={path.includes('pageCounts') || path.includes('quantities') ? 'number' : 'text'}
                value={item}
                onChange={(e) => {
                  const newArray = [...array];
                  newArray[index] = path.includes('pageCounts') || path.includes('quantities') 
                    ? parseInt(e.target.value) || 0 
                    : e.target.value;
                  updateNestedConfig(path, newArray);
                }}
                className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={placeholder}
              />
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render paper options section
  const renderPaperOptions = (type) => {
    const paperTypes = {
      'cover': { title: 'Cover Paper Materials', path: 'paperOptions.cover', fields: ['value', 'label', 'description', 'price'] },
      'inside': { title: 'Inside Paper', path: 'paperOptions.inside', fields: ['value', 'label', 'description', 'price'] },
      'dustCover': { title: 'Dust Cover Paper', path: 'paperOptions.dustCover', fields: ['value', 'label', 'price'] }
    };

    const { title, path, fields } = paperTypes[type];
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {renderEditableArray(title, path, fields)}
      </div>
    );
  };

  // Render additional options section
  const renderAdditionalOptions = (type) => {
    const optionTypes = {
      'proof': { title: 'Proof Options', path: 'additionalOptions.proof', fields: ['value', 'label', 'price'] },
      'holePunch': { title: 'Hole Punch Options', path: 'additionalOptions.holePunch', fields: ['value', 'label', 'price'] },
      'slipcase': { title: 'Slipcase Options', path: 'additionalOptions.slipcase', fields: ['value', 'label', 'price'] },
      'shrinkWrap': { title: 'Shrink Wrap Options', path: 'additionalOptions.shrinkWrap', fields: ['value', 'label', 'price'] },
      'directMail': { title: 'Direct Mail Options', path: 'additionalOptions.directMail', fields: ['value', 'label', 'price'] },
      'cornerProtectors': { title: 'Corner Protector Options', path: 'additionalOptions.cornerProtectors', fields: ['value', 'label', 'price'] }
    };

    const { title, path, fields } = optionTypes[type];
    
    return (
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => {
              const newItem = fields.reduce((acc, field) => {
                if (field === 'price') {
                  acc[field] = 0;
                } else if (field === 'label') {
                  acc[field] = 'New Item';
                } else if (field === 'value') {
                  acc[field] = `NEW_${Date.now()}`;
                } else {
                  acc[field] = '';
                }
                return acc;
              }, {});
              addArrayItem(path, newItem);
            }}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add New
          </button>
        </div>
        
        <div className="space-y-3">
          {(() => {
            const keys = path.split('.');
            let current = config;
            for (let i = 0; i < keys.length; i++) {
              current = current?.[keys[i]];
            }
            return Array.isArray(current) ? current : [];
          })().map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                {fields.map(field => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === 'price' ? 'number' : 'text'}
                      value={item[field] || ''}
                      onChange={(e) => {
                        const value = field === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
                        updateArrayItem(path, index, field, value);
                      }}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Hardcover Quote Form Editor</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
              >
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 overflow-x-auto pb-2">
            {[
              'general', 'binding', 'headband', 'sizes', 'paper-cover', 'paper-inside', 
              'paper-dustcover', 'colors', 'finishes', 'additional', 'positions', 
              'page-counts', 'weights', 'quantities', 'pricing', 'dust-cover', 'limits'
            ].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {preview ? (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Hardcover form preview would be rendered here</p>
              <p className="text-sm text-gray-400 mt-2">
                The actual form component would be rendered using the current configuration
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-3">Form Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'general', label: 'General Settings' },
                    { id: 'binding', label: 'Binding Options' },
                    { id: 'headband', label: 'Headband & Bookmark' },
                    { id: 'sizes', label: 'Sizes & Dimensions' },
                    { id: 'paper-cover', label: 'Cover Materials' },
                    { id: 'paper-inside', label: 'Inside Paper' },
                    { id: 'paper-dustcover', label: 'Dust Cover Paper' },
                    { id: 'colors', label: 'Color Options' },
                    { id: 'finishes', label: 'Cover Finishes' },
                    { id: 'additional', label: 'Additional Services' },
                    { id: 'positions', label: 'Card Positions' },
                    { id: 'page-counts', label: 'Page Count Options' },
                    { id: 'weights', label: 'Weight Options' },
                    { id: 'quantities', label: 'Quantity Options' },
                    { id: 'pricing', label: 'Pricing Settings' },
                    { id: 'dust-cover', label: 'Dust Cover Pricing' },
                    { id: 'limits', label: 'Limits & Maximums' },
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === section.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Editor Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 space-y-6">
                  {/* General Settings */}
                  {activeTab === 'general' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Form Title
                          </label>
                          <input
                            type="text"
                            value={config.general?.title || ''}
                            onChange={(e) => updateNestedConfig('general.title', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Form Description
                          </label>
                          <textarea
                            value={config.general?.description || ''}
                            onChange={(e) => updateNestedConfig('general.description', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Submit Button Text
                            </label>
                            <input
                              type="text"
                              value={config.general?.submitButtonText || ''}
                              onChange={(e) => updateNestedConfig('general.submitButtonText', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Shipping Button Text
                            </label>
                            <input
                              type="text"
                              value={config.general?.shippingButtonText || ''}
                              onChange={(e) => updateNestedConfig('general.shippingButtonText', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Binding Options */}
                  {activeTab === 'binding' && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Binding Options</h3>
                        <button
                          onClick={() => toggleSection('binding')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          {expandedSections.binding ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                      
                      {expandedSections.binding && (
                        <>
                          {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc', 'image'])}
                          
                          <div className="mt-6">
                            <h4 className="font-medium text-gray-700 mb-3">Spine Width Settings</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Base Spine Width
                                </label>
                                <input
                                  type="text"
                                  value={config.spineWidth?.base || ''}
                                  onChange={(e) => updateNestedConfig('spineWidth.base', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                  placeholder="e.g., 0.178&quot;"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Rounded Spine Width
                                </label>
                                <input
                                  type="text"
                                  value={config.spineWidth?.rounded || ''}
                                  onChange={(e) => updateNestedConfig('spineWidth.rounded', e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                  placeholder="e.g., 0.200&quot;"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Headband & Bookmark Options */}
                  {activeTab === 'headband' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Headband & Bookmark Options</h3>
                      
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Headband Colors</h4>
                          {renderEditableArray('Headband Colors', 'headbandColors', ['value', 'label', 'color', 'price'])}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Bookmark Options</h4>
                          {renderEditableArray('Bookmark Options', 'bookmarkOptions', ['value', 'label', 'price'])}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Sizes & Dimensions */}
                  {activeTab === 'sizes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Sizes & Dimensions</h3>
                      {renderEditableArray('Available Sizes', 'sizes', ['value', 'label', 'display'])}
                      
                      <div className="space-y-4 mt-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions (INCH)
                          </label>
                          <input
                            type="text"
                            value={config.customSizeInstructions?.INCH || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.INCH', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions (MM)
                          </label>
                          <input
                            type="text"
                            value={config.customSizeInstructions?.MM || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.MM', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Paper Options */}
                  {activeTab === 'paper-cover' && renderPaperOptions('cover')}
                  {activeTab === 'paper-inside' && renderPaperOptions('inside')}
                  {activeTab === 'paper-dustcover' && renderPaperOptions('dustCover')}

                  {/* Color Options */}
                  {activeTab === 'colors' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Print Color Options</h3>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price'])}
                    </>
                  )}

                  {/* Cover Finishes */}
                  {activeTab === 'finishes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Finish Options</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price'])}
                    </>
                  )}

                  {/* Additional Services */}
                  {activeTab === 'additional' && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Additional Services</h3>
                        <button
                          onClick={() => toggleSection('additional')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          {expandedSections.additional ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                      
                      {expandedSections.additional && (
                        <div className="space-y-8">
                          {renderAdditionalOptions('proof')}
                          {renderAdditionalOptions('holePunch')}
                          {renderAdditionalOptions('slipcase')}
                          {renderAdditionalOptions('shrinkWrap')}
                          {renderAdditionalOptions('directMail')}
                          {renderAdditionalOptions('cornerProtectors')}
                        </div>
                      )}
                    </>
                  )}

                  {/* Card Positions */}
                  {activeTab === 'positions' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Card Positions</h3>
                      {renderEditableArray('Card Positions', 'positions', ['value', 'label'])}
                    </>
                  )}

                  {/* Page Count Options */}
                  {activeTab === 'page-counts' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Page Count Options</h3>
                      {renderSimpleArray('Page Counts', 'pageCounts', 'Enter page count')}
                    </>
                  )}

                  {/* Weight Options */}
                  {activeTab === 'weights' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Weight Options (gsm values)</h3>
                      {renderSimpleArray('Weight Options (gsm)', 'weightOptions', 'Enter weight in gsm (e.g., 80, 100, 120)')}
                      
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Weight Conversion Reference</h4>
                        <div className="text-sm text-blue-800">
                          <p className="mb-2">The weight options use these conversion values:</p>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-blue-200">
                              <thead>
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-blue-900">GSM</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-blue-900">US Weight</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-blue-900">Caliper (pt)</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-blue-900">Japan Weight</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-blue-100">
                                {Object.entries(PAPER_WEIGHT_CONVERSIONS).map(([gsm, conversions]) => (
                                  <tr key={gsm}>
                                    <td className="px-3 py-2 text-sm">{conversions.gsm}</td>
                                    <td className="px-3 py-2 text-sm">{conversions.us}</td>
                                    <td className="px-3 py-2 text-sm">{conversions.pt}</td>
                                    <td className="px-3 py-2 text-sm">{conversions.kg}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p className="mt-2 text-xs">Note: Users can select different paper units (GSM, US, PT, KG) in the form, and these conversions will be displayed automatically.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Quantity Options */}
                  {activeTab === 'quantities' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Quantity Options</h3>
                      {renderSimpleArray('Available Quantities', 'quantities', 'Enter quantity')}
                    </>
                  )}

                  {/* Pricing Settings */}
                  {activeTab === 'pricing' && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Pricing Settings</h3>
                        <button
                          onClick={() => toggleSection('pricing')}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          {expandedSections.pricing ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                      
                      {expandedSections.pricing && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Base Setup Cost ($)
                              </label>
                              <input
                                type="number"
                                value={config.pricing?.baseSetupCost || 0}
                                onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cost Per Page ($)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={config.pricing?.costPerPage || 0}
                                onChange={(e) => updateNestedConfig('pricing.costPerPage', parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Custom Size Multiplier
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.pricing?.customSizeMultiplier || 1}
                                onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Standard Size Multiplier
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.pricing?.standardSizeMultiplier || 1}
                                onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="border-t pt-6">
                            <h4 className="font-medium text-gray-700 mb-4">Hardcover Specific Pricing</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Hardcover Base Cost ($)
                                </label>
                                <input
                                  type="number"
                                  value={config.pricing?.hardcoverBaseCost || 0}
                                  onChange={(e) => updateNestedConfig('pricing.hardcoverBaseCost', parseFloat(e.target.value) || 0)}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Rounded Spine Premium ($)
                                </label>
                                <input
                                  type="number"
                                  value={config.pricing?.roundedSpinePremium || 0}
                                  onChange={(e) => updateNestedConfig('pricing.roundedSpinePremium', parseFloat(e.target.value) || 0)}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Dust Cover Pricing */}
                  {activeTab === 'dust-cover' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Dust Cover Pricing</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Base Cost ($)
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.dustCoverBaseCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.dustCoverBaseCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cost Per Copy ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.dustCoverPerCopy || 0}
                            onChange={(e) => updateNestedConfig('pricing.dustCoverPerCopy', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Corner Protector Base Cost ($)
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.cornerProtectorBase || 0}
                            onChange={(e) => updateNestedConfig('pricing.cornerProtectorBase', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Corner Protector Per Copy ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.cornerProtectorPerCopy || 0}
                            onChange={(e) => updateNestedConfig('pricing.cornerProtectorPerCopy', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Limits & Maximums */}
                  {activeTab === 'limits' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Limits & Maximums</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Maximum Items</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Subscription Cards
                              </label>
                              <input
                                type="number"
                                value={config.maxSubscriptionCards || 5}
                                onChange={(e) => updateNestedConfig('maxSubscriptionCards', parseInt(e.target.value) || 5)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Dust Covers
                              </label>
                              <input
                                type="number"
                                value={config.maxDustCovers || 1}
                                onChange={(e) => updateNestedConfig('maxDustCovers', parseInt(e.target.value) || 1)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Minimum Requirements</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Page Count
                              </label>
                              <input
                                type="number"
                                value={config.minPageCount || 36}
                                onChange={(e) => updateNestedConfig('minPageCount', parseInt(e.target.value) || 36)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Quantity
                              </label>
                              <input
                                type="number"
                                value={config.minQuantity || 50}
                                onChange={(e) => updateNestedConfig('minQuantity', parseInt(e.target.value) || 50)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}