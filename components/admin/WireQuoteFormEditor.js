'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, DollarSign, Image as ImageIcon } from 'lucide-react';

const WIREQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Wire Binding Printing Quote",
    description: "Configure your professional wire-bound documents with our instant quoting system. Perfect for reports, manuals, and presentations.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  sizes: [
    { value: '8.5x11-letter', label: '8.5" x 11" (Letter)' },
    { value: '8.5x11-standard', label: '8.5" x 11"' },
    { value: '5.5x8.5', label: '5.5" x 8.5" (Half Letter)' },
    { value: '6x9', label: '6" x 9"' },
    { value: '7x10', label: '7" x 10"' },
    { value: '9x12', label: '9" x 12"' },
    { value: 'custom', label: 'Custom Size' }
  ],
  bindingEdges: [
    { 
      value: 'LEFT', 
      label: 'Left Side', 
      desc: 'Binding on the left, most common',
      image: '/forms/edge01.png'
    },
    { 
      value: 'RIGHT', 
      label: 'Right Side', 
      desc: 'First inside page starts from the right',
      image: '/forms/edge02.png'
    },
    { 
      value: 'TOP', 
      label: 'Top Side', 
      desc: 'Binding on the top, a.k.a calendar binding',
      image: '/forms/edge03.png'
    },
  ],
  wireColors: [
    { value: 'BLACK', label: 'Black', color: '#000000', image: '/asset/images/quote/color_paper/wire_black.png' },
    { value: 'WHITE', label: 'White', color: '#ffffff', image: '/asset/images/quote/color_paper/wire_white.png' },
    { value: 'SILVER', label: 'Silver', color: '#c0c0c0', image: '/asset/images/quote/color_paper/wire_silver.png' },
    { value: 'GOLD', label: 'Gold', color: '#ffd700', image: '/asset/images/quote/color_paper/wire_gold.png' },
    { value: 'TBD', label: 'To be determined', color: '#cccccc' }
  ],
  paperOptions: {
    cover: [
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        description: 'Brilliant-gloss, very affordable so highly used',
        price: 0,
        weightOptions: [
          { value: '74# cover', label: '74# cover (200 gsm)', price: 0 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 10 },
          { value: '110# cover', label: '110# cover (300 gsm)', price: 20 }
        ]
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        description: 'Highly used like Gloss',
        price: 0,
        weightOptions: [
          { value: '74# cover', label: '74# cover (200 gsm)', price: 0 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 10 },
          { value: '110# cover', label: '110# cover (300 gsm)', price: 20 }
        ]
      },
      { 
        value: 'UNCOATED', 
        label: 'Uncoated', 
        description: 'Matte and very much used',
        price: 0,
        weightOptions: [
          { value: '67# cover', label: '67# cover (180 gsm)', price: 0 },
          { value: '81# cover', label: '81# cover (220 gsm)', price: 10 },
          { value: '96# cover', label: '96# cover (260 gsm)', price: 20 }
        ]
      }
    ],
    inside: [
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        price: 0,
        weightOptions: [
          { value: '68# text', label: '68# text (100 gsm)', price: 0 },
          { value: '80# text', label: '80# text (120 gsm)', price: 5 },
          { value: '100# text', label: '100# text (150 gsm)', price: 10 }
        ]
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        price: 0,
        weightOptions: [
          { value: '68# text', label: '68# text (100 gsm)', price: 0 },
          { value: '80# text', label: '80# text (120 gsm)', price: 5 },
          { value: '100# text', label: '100# text (150 gsm)', price: 10 }
        ]
      },
      { 
        value: 'HI-PLUS', 
        label: 'Hi-Plus', 
        price: 20,
        weightOptions: [
          { value: '60# text', label: '60# text (90 gsm)', price: 10 },
          { value: '68# text', label: '68# text (100 gsm)', price: 15 },
          { value: '80# text', label: '80# text (120 gsm)', price: 20 }
        ]
      }
    ]
  },
  printColors: [
    { 
      value: 'CMYK', 
      label: 'Full color', 
      price: 0,
      description: 'Full color',
      image: '/forms/d1.png'
    },
    { 
      value: 'CMYK_PMS1', 
      label: 'Full color + 1 Spot color', 
      price: 75,
      description: 'Full color + 1 Spot color',
      image: '/forms/d2.png'
    },
    { 
      value: 'CMYK_PMS2', 
      label: 'Full color + 2 Spot color', 
      price: 150,
      description: 'Full color + 2 Spot color',
      image: '/forms/d3.png'
    },
    { 
      value: 'BW', 
      label: 'Black only', 
      price: -100,
      description: 'Black only',
      image: '/forms/d4.png'
    },
    { 
      value: 'BW_PMS1', 
      label: 'Black + 1 Spot color', 
      price: -25,
      description: 'Black + 1 Spot color',
      image: '/forms/d5.png'
    },
    { 
      value: 'BW_PMS2', 
      label: 'Black + 2 Spot color', 
      price: 50,
      description: 'Black + 2 Spot color',
      image: '/forms/d6.png'
    }
  ],
  coverFinishes: [
    { value: 'NONE', label: 'None', price: 0 },
    { value: 'MATTE', label: 'Matte Lamination', price: 40 },
    { value: 'GLOSS', label: 'Gloss Lamination', price: 40 },
  ],
  coverFolds: [
    { value: 'NONE', label: 'No fold', price: 0 },
    { value: 'FRONT', label: 'Front cover fold', price: 25 },
    { value: 'BACK', label: 'Back cover fold', price: 25 },
    { value: 'BOTH', label: 'Both cover folds', price: 40 },
  ],
  additionalOptions: {
    proof: [
      { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0 },
      { value: 'DIGITAL', label: 'Digital Proof', price: 50 },
    ],
    holePunch: [
      { value: '6', label: '0.236"(6mm) drill - Most commonly used size for wall calendar', price: 15 },
      { value: '8', label: '0.315"(8mm) drill - Most selected for binder holes', price: 20 },
      { value: '9.5', label: '0.374"(9.5mm) drill - Used for binders and etc.', price: 25 },
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
    ],
    directMail: [
      { value: 'ALL', label: 'DM all quantity', price: 0.75 },
      { value: 'PORTION', label: 'DM a portion of the quantity', price: 0.50 },
    ]
  },
  positions: [
    { value: 'FRONT', label: 'Before page 1' },
    { value: 'BACK', label: 'After last page' },
    { value: 'SELECT', label: 'Front of page no.' },
  ],
  pageCounts: [24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160],
  quantities: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000],
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
  },
  pricing: {
    baseSetupCost: 150,
    costPerPage: 0.06,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1,
    wireBindingBaseCost: 50
  }
};

export default function WireQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(WIREQUOTE_DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedPaper, setExpandedPaper] = useState({});

  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved wire binding config:', formConfig);
      setConfig(formConfig);
    } else {
      console.log('📥 Loading default wire binding config');
      setConfig(WIREQUOTE_DEFAULT_CONFIG);
    }
  }, [formConfig]);

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
      if (lastKey === 'price' || lastKey === 'baseSetupCost' || lastKey === 'costPerPage' || 
          lastKey === 'customSizeMultiplier' || lastKey === 'standardSizeMultiplier' || 
          lastKey === 'wireBindingBaseCost') {
        current[lastKey] = parseFloat(value) || 0;
      } else {
        current[lastKey] = value;
      }
      return newConfig;
    });
  };

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
        if (field === 'price') {
          current[arrayKey][index] = { 
            ...current[arrayKey][index], 
            [field]: parseFloat(value) || 0 
          };
        } else {
          current[arrayKey][index] = { 
            ...current[arrayKey][index], 
            [field]: value 
          };
        }
      }
      
      return newConfig;
    });
  };

  const updatePaperWeightOption = (paperType, paperIndex, weightIndex, field, value) => {
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const paperItem = newConfig.paperOptions[paperType][paperIndex];
      
      if (!paperItem.weightOptions) {
        paperItem.weightOptions = [];
      }
      
      if (!paperItem.weightOptions[weightIndex]) {
        paperItem.weightOptions[weightIndex] = { value: '', label: '', price: 0 };
      }
      
      if (field === 'price') {
        paperItem.weightOptions[weightIndex][field] = parseFloat(value) || 0;
      } else {
        paperItem.weightOptions[weightIndex][field] = value;
      }
      
      return newConfig;
    });
  };

  const addWeightOption = (paperType, paperIndex) => {
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const paperItem = newConfig.paperOptions[paperType][paperIndex];
      
      if (!paperItem.weightOptions) {
        paperItem.weightOptions = [];
      }
      
      paperItem.weightOptions.push({
        value: '',
        label: '',
        price: 0
      });
      
      return newConfig;
    });
  };

  const removeWeightOption = (paperType, paperIndex, weightIndex) => {
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      const paperItem = newConfig.paperOptions[paperType][paperIndex];
      
      if (paperItem.weightOptions && paperItem.weightOptions[weightIndex]) {
        paperItem.weightOptions = paperItem.weightOptions.filter((_, idx) => idx !== weightIndex);
      }
      
      return newConfig;
    });
  };

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

  const togglePaperExpansion = (paperType, paperIndex) => {
    const key = `${paperType}-${paperIndex}`;
    setExpandedPaper(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      console.log('💾 Saving wire binding config:', config);
      await onSave(config);
    } catch (error) {
      console.error('Error saving wire binding config:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  const renderEditableArray = (title, path, fields, hasImages = false) => {
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
                } else if (field === 'description' || field === 'desc') {
                  acc[field] = '';
                } else if (field === 'label') {
                  acc[field] = 'New Item';
                } else if (field === 'value') {
                  acc[field] = `NEW_${Date.now()}`;
                } else if (field === 'image') {
                  acc[field] = '';
                } else if (field === 'color') {
                  acc[field] = '#000000';
                } else {
                  acc[field] = '';
                }
                return acc;
              }, {});
              addArrayItem(path, newItem);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} className="mr-2" />
            Add New Item
          </button>
        </div>
        
        <div className="space-y-4">
          {array.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  {item.image && (
                    <div className="mr-3 w-10 h-10 rounded overflow-hidden border border-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.label || 'Preview'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    {item.label && (
                      <span className="font-medium text-gray-900">{item.label}</span>
                    )}
                    {item.value && (
                      <code className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {item.value}
                      </code>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="p-6">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${hasImages ? '5' : '4'} gap-4`}>
                  {fields.map(field => (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {field === 'price' ? (
                          <div className="flex items-center">
                            <DollarSign size={14} className="mr-1" />
                            {field}
                          </div>
                        ) : field === 'image' ? (
                          <div className="flex items-center">
                            <ImageIcon size={14} className="mr-1" />
                            {field}
                          </div>
                        ) : field}
                      </label>
                      {field === 'price' ? (
                        <div className="relative">
                          <input
                            type="number"
                            step="0.01"
                            value={item[field] || 0}
                            onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            placeholder="0.00"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </div>
                        </div>
                      ) : field === 'image' ? (
                        <input
                          type="text"
                          value={item[field] || ''}
                          onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="/forms/image.png"
                        />
                      ) : field === 'color' ? (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={item[field] || ''}
                            onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="#000000"
                          />
                          <div 
                            className="w-10 h-10 rounded border border-gray-300"
                            style={{ backgroundColor: item[field] || '#fff' }}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={item[field] || ''}
                          onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder={`Enter ${field}`}
                        />
                      )}
                      {field === 'description' && item.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {field === 'desc' && item.desc && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPaperOptionsWithWeights = (type) => {
    const paperTypes = {
      'cover': { title: 'Cover Paper', path: 'paperOptions.cover' },
      'inside': { title: 'Inside Paper', path: 'paperOptions.inside' }
    };

    const { title, path } = paperTypes[type];
    const paperOptions = config.paperOptions?.[type] || [];

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">{title} Options</h3>
        
        <div className="space-y-6">
          {paperOptions.map((paper, paperIndex) => {
            const expansionKey = `${type}-${paperIndex}`;
            const isExpanded = expandedPaper[expansionKey];
            
            return (
              <div key={paperIndex} className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => togglePaperExpansion(type, paperIndex)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? '▼' : '▶'}
                      </button>
                      <div>
                        <h4 className="font-semibold text-gray-900">{paper.label || 'Unnamed Paper'}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <code className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {paper.value || 'No value'}
                          </code>
                          <span className="text-sm text-gray-600">Base Price: ${paper.price || 0}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeArrayItem(path, paperIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove paper"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className={`${isExpanded ? 'block' : 'hidden'}`}>
                  <div className="p-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Paper Value
                        </label>
                        <input
                          type="text"
                          value={paper.value || ''}
                          onChange={(e) => updateArrayItem(path, paperIndex, 'value', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., GLOSS"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Paper Label
                        </label>
                        <input
                          type="text"
                          value={paper.label || ''}
                          onChange={(e) => updateArrayItem(path, paperIndex, 'label', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., Gloss"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Base Price ($)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.01"
                            value={paper.price || 0}
                            onChange={(e) => updateArrayItem(path, paperIndex, 'price', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {type === 'cover' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={paper.description || ''}
                          onChange={(e) => updateArrayItem(path, paperIndex, 'description', e.target.value)}
                          rows={2}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Paper description"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-semibold text-gray-900">Available Weight Options</h5>
                      <button
                        onClick={() => addWeightOption(type, paperIndex)}
                        className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        <Plus size={14} className="mr-1" />
                        Add Weight
                      </button>
                    </div>
                    
                    {paper.weightOptions && paper.weightOptions.length > 0 ? (
                      <div className="space-y-4">
                        {paper.weightOptions.map((weight, weightIndex) => (
                          <div key={weightIndex} className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                  Weight Value
                                </label>
                                <input
                                  type="text"
                                  value={weight.value || ''}
                                  onChange={(e) => updatePaperWeightOption(type, paperIndex, weightIndex, 'value', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder="e.g., 74# cover"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                  Weight Label
                                </label>
                                <input
                                  type="text"
                                  value={weight.label || ''}
                                  onChange={(e) => updatePaperWeightOption(type, paperIndex, weightIndex, 'label', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder="e.g., 74# cover (200 gsm)"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                  Additional Price ($)
                                </label>
                                <div className="relative">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={weight.price || 0}
                                    onChange={(e) => updatePaperWeightOption(type, paperIndex, weightIndex, 'price', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-8"
                                  />
                                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                    $
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => removeWeightOption(type, paperIndex, weightIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Remove weight option"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 mb-2">No weight options configured</p>
                        <p className="text-sm text-gray-400">Add weight options to allow selection for this paper type</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              const newPaper = {
                value: `NEW_${Date.now()}`,
                label: 'New Paper',
                price: 0,
                weightOptions: []
              };
              
              if (type === 'cover') {
                newPaper.description = '';
              }
              
              addArrayItem(path, newPaper);
            }}
            className="flex items-center justify-center w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
          >
            <Plus size={20} className="mr-2 text-gray-400 group-hover:text-indigo-600" />
            <span className="font-medium text-gray-600 group-hover:text-indigo-700">Add New Paper Option</span>
          </button>
        </div>
      </div>
    );
  };

  const renderAdditionalOptions = (type, title) => {
    const options = config.additionalOptions?.[type] || [];
    const path = `additionalOptions.${type}`;

    return (
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 capitalize">{title}</h4>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                  <input
                    type="text"
                    value={option.value || ''}
                    onChange={(e) => updateArrayItem(path, index, 'value', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Enter value"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                  <input
                    type="text"
                    value={option.label || ''}
                    onChange={(e) => updateArrayItem(path, index, 'label', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Enter label"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Price ($)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={option.price || 0}
                      onChange={(e) => updateArrayItem(path, index, 'price', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm pl-8"
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      $
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded self-start"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addArrayItem(path, { value: '', label: '', price: 0 })}
          className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          <Plus size={14} className="mr-1" />
          Add Option
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Wire Binding Quote Form Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Configure all settings for the wire binding quote form</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium shadow-sm"
              >
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>

          <div className="flex space-x-8 overflow-x-auto pb-2">
            {[
              'general', 'sizes', 'binding', 'wire-colors', 'paper-cover', 'paper-inside',
              'colors', 'finishes', 'cover-folds', 'additional',
              'page-counts', 'quantities', 'pricing'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {preview ? (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-200">Form Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye size={24} className="text-indigo-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Wire Binding Form Preview</h4>
                <p className="text-gray-600 mb-6">
                  The actual form component would be rendered here using the current configuration.
                  All pricing and options are configured in the editor.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Form Title</p>
                    <p className="text-sm text-gray-600 mt-1">{config.general?.title}</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Paper Options</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Cover: {config.paperOptions?.cover?.length || 0} types
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-5 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Configuration Sections</h3>
                <nav className="space-y-1">
                  {[
                    { id: 'general', label: 'General Settings', icon: '⚙️' },
                    { id: 'sizes', label: 'Sizes & Dimensions', icon: '📐' },
                    { id: 'binding', label: 'Binding Options', icon: '📖' },
                    { id: 'wire-colors', label: 'Wire Colors', icon: '🎨' },
                    { id: 'paper-cover', label: 'Cover Paper', icon: '🟫' },
                    { id: 'paper-inside', label: 'Inside Paper', icon: '📄' },
                    { id: 'colors', label: 'Color Options', icon: '🎨' },
                    { id: 'finishes', label: 'Cover Finishes', icon: '✨' },
                    { id: 'cover-folds', label: 'Cover Folds', icon: '📐' },
                    { id: 'additional', label: 'Additional Services', icon: '➕' },
                    { id: 'page-counts', label: 'Page Count Options', icon: '📊' },
                    { id: 'quantities', label: 'Quantity Options', icon: '📦' },
                    { id: 'pricing', label: 'Pricing Settings', icon: '💰' },
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeTab === section.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium border border-indigo-100'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3">{section.icon}</span>
                      <span className="text-sm">{section.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">💡 Tip:</span> Configure paper weight options under Cover Paper and Inside Paper sections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-8 space-y-8">
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">General Settings</h3>
                      <div className="space-y-6">
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
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions (INCH)
                          </label>
                          <input
                            type="text"
                            value={config.customSizeInstructions?.INCH || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.INCH', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder='e.g., 📏 Minimum: 4" × 4" | Maximum: 11.8" × 14.3"'
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
                            placeholder='e.g., 📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm'
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sizes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Sizes & Dimensions</h3>
                      {renderEditableArray('Standard Sizes', 'sizes', ['value', 'label'])}
                    </div>
                  )}

                  {activeTab === 'binding' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Binding Options</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">💡 Note:</span> Binding Edge options support images. Recommended image paths: 
                          /forms/edge01.png (Left Side), /forms/edge02.png (Right Side), /forms/edge03.png (Top Side)
                        </p>
                      </div>
                      {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc', 'image'], true)}
                    </div>
                  )}

                  {activeTab === 'wire-colors' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Wire Color Options</h3>
                      {renderEditableArray('Wire Colors', 'wireColors', ['value', 'label', 'color', 'image'], true)}
                    </div>
                  )}

                  {activeTab === 'paper-cover' && renderPaperOptionsWithWeights('cover')}
                  {activeTab === 'paper-inside' && renderPaperOptionsWithWeights('inside')}

                  {activeTab === 'colors' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Color Options</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">💡 Note:</span> Print Color options support images. Recommended image paths:
                          /forms/d1.png (Full color), /forms/d2.png (Full color + 1 Spot color), /forms/d3.png (Full color + 2 Spot color),
                          /forms/d4.png (Black only), /forms/d5.png (Black + 1 Spot color), /forms/d6.png (Black + 2 Spot color)
                        </p>
                      </div>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price', 'description', 'image'], true)}
                    </div>
                  )}

                  {activeTab === 'finishes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Finish Options</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price'])}
                    </div>
                  )}

                  {activeTab === 'cover-folds' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Fold Options</h3>
                      {renderEditableArray('Cover Folds', 'coverFolds', ['value', 'label', 'price'])}
                    </div>
                  )}

                  {activeTab === 'additional' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Additional Services</h3>
                      <div className="space-y-8">
                        {renderAdditionalOptions('proof', 'Proof Types')}
                        {renderAdditionalOptions('holePunch', 'Hole Punch Options')}
                        {renderAdditionalOptions('slipcase', 'Slipcase Options')}
                        {renderAdditionalOptions('shrinkWrap', 'Shrink Wrap Options')}
                        {renderAdditionalOptions('directMail', 'Direct Mail Options')}
                      </div>
                    </div>
                  )}

                  {activeTab === 'page-counts' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Page Count Options</h3>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">Configure the available page counts for the form</p>
                        <button
                          onClick={() => addArrayItem('pageCounts', '')}
                          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          <Plus size={16} className="mr-2" />
                          Add Page Count
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {config.pageCounts?.map((count, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={count}
                              onChange={(e) => {
                                const newArray = [...config.pageCounts];
                                newArray[index] = parseInt(e.target.value) || 0;
                                updateNestedConfig('pageCounts', newArray);
                              }}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Page count"
                            />
                            <button
                              onClick={() => removeArrayItem('pageCounts', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'quantities' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Quantity Options</h3>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">Configure the available quantities for the form</p>
                        <button
                          onClick={() => addArrayItem('quantities', '')}
                          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          <Plus size={16} className="mr-2" />
                          Add Quantity
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {config.quantities?.map((qty, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={qty}
                              onChange={(e) => {
                                const newArray = [...config.quantities];
                                newArray[index] = parseInt(e.target.value) || 0;
                                updateNestedConfig('quantities', newArray);
                              }}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Quantity"
                            />
                            <button
                              onClick={() => removeArrayItem('quantities', index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'pricing' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Pricing Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Base Setup Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.baseSetupCost || 0}
                              onChange={(e) => updateNestedConfig('pricing.baseSetupCost', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Fixed setup cost for all orders</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cost Per Page ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.001"
                              value={config.pricing?.costPerPage || 0}
                              onChange={(e) => updateNestedConfig('pricing.costPerPage', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Cost per page (multiplied by quantity)</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.customSizeMultiplier || 1.0}
                            onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <p className="text-xs text-gray-500 mt-1">Multiplier for custom sizes (e.g., 1.2 = 20% extra)</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Standard Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.standardSizeMultiplier || 1.0}
                            onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <p className="text-xs text-gray-500 mt-1">Multiplier for non-standard sizes</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Wire Binding Base Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.wireBindingBaseCost || 0}
                              onChange={(e) => updateNestedConfig('pricing.wireBindingBaseCost', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Base cost for wire binding setup</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving Configuration...' : 'Save All Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}