// components/admin/PrintQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, DollarSign, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';

const PRINTQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Perfect Binding Book Printing Quote",
    description: "Configure your perfect bound book with our professional printing services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping",
    disclaimer: "Prices are estimates and final cost may vary based on specifications"
  },
  sizes: [
    { value: '5.5x8.5', label: '5.5 x 8.5"', price: 0 },
    { value: '7.5x10', label: '7.5 x 10"', price: 25 },
    { value: '8.5x11', label: '8.5 x 11"', price: 50 },
    { value: '9x12', label: '9 x 12"', price: 75 },
    { value: 'custom', label: 'Custom Size', price: 100 }
  ],
  bindingEdges: [
    { 
      value: 'LEFT', 
      label: 'Left Side', 
      desc: 'Binding on the left, most common', 
      price: 0,
      image: '/forms/edge01.png'
    },
    { 
      value: 'RIGHT', 
      label: 'Right Side', 
      desc: 'First inside page starts from the right', 
      price: 50,
      image: '/forms/edge02.png'
    },
    { 
      value: 'TOP', 
      label: 'Top Side', 
      desc: 'Binding on the top, a.k.a calendar binding', 
      price: 75,
      image: '/forms/edge03.png'
    },
  ],
  paperOptions: {
    cover: [
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        description: 'Brilliant-gloss, very affordable so highly used',
        price: 0,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 0 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 },
          { value: '200', label: '200 gsm', price: 40 },
          { value: '250', label: '250 gsm', price: 60 }
        ]
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        description: 'Highly used like Gloss',
        price: 0,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 0 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 },
          { value: '200', label: '200 gsm', price: 40 },
          { value: '250', label: '250 gsm', price: 60 },
          { value: '300', label: '300 gsm', price: 80 }
        ]
      },
      { 
        value: 'HI-PLUS', 
        label: 'Hi-Plus', 
        description: 'Thicker than Matte. Good printability',
        price: 50,
        weightOptions: [
          { value: '150', label: '150 gsm', price: 20 },
          { value: '180', label: '180 gsm', price: 30 },
          { value: '200', label: '200 gsm', price: 40 },
          { value: '250', label: '250 gsm', price: 60 },
          { value: '300', label: '300 gsm', price: 80 }
        ]
      },
      { 
        value: 'HI-QMATTE', 
        label: 'Hi-Q Matte', 
        description: 'Thicker than Matte, Premium grade',
        price: 100,
        weightOptions: [
          { value: '150', label: '150 gsm', price: 30 },
          { value: '180', label: '180 gsm', price: 40 },
          { value: '200', label: '200 gsm', price: 50 },
          { value: '250', label: '250 gsm', price: 70 },
          { value: '300', label: '300 gsm', price: 90 }
        ]
      },
      { 
        value: 'UNCOATED_W', 
        label: 'Uncoated', 
        description: 'Matte and very much used',
        price: 0,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 0 },
          { value: '120', label: '120 gsm', price: 5 },
          { value: '150', label: '150 gsm', price: 15 },
          { value: '180', label: '180 gsm', price: 25 }
        ]
      },
      { 
        value: 'MONTBLANC_EW', 
        label: 'Premium', 
        description: 'Used for high-end magazines and catalogs',
        price: 150,
        weightOptions: [
          { value: '150', label: '150 gsm', price: 40 },
          { value: '180', label: '180 gsm', price: 50 },
          { value: '200', label: '200 gsm', price: 60 },
          { value: '250', label: '250 gsm', price: 80 },
          { value: '300', label: '300 gsm', price: 100 }
        ]
      }
    ],
    inside: [
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        price: 0,
        weightOptions: [
          { value: '80', label: '80 gsm', price: 0 },
          { value: '100', label: '100 gsm', price: 5 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 }
        ]
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        price: 0,
        weightOptions: [
          { value: '80', label: '80 gsm', price: 0 },
          { value: '100', label: '100 gsm', price: 5 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 }
        ]
      },
      { 
        value: 'HI-PLUS', 
        label: 'Hi-Plus', 
        price: 25,
        weightOptions: [
          { value: '120', label: '120 gsm', price: 15 },
          { value: '150', label: '150 gsm', price: 25 },
          { value: '180', label: '180 gsm', price: 35 }
        ]
      },
      { 
        value: 'UNCOATED', 
        label: 'Uncoated', 
        price: 0,
        weightOptions: [
          { value: '80', label: '80 gsm', price: 0 },
          { value: '100', label: '100 gsm', price: 5 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 }
        ]
      },
      { 
        value: 'TEXTBOOK', 
        label: 'Textbook', 
        price: 30,
        weightOptions: [
          { value: '80', label: '80 gsm', price: 10 },
          { value: '100', label: '100 gsm', price: 15 },
          { value: '120', label: '120 gsm', price: 20 },
          { value: '150', label: '150 gsm', price: 30 },
          { value: '180', label: '180 gsm', price: 40 }
        ]
      },
      { 
        value: 'COLORED', 
        label: 'Colored', 
        price: 40,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 20 },
          { value: '120', label: '120 gsm', price: 25 },
          { value: '150', label: '150 gsm', price: 35 }
        ]
      },
    ],
    subscription: [
      { 
        value: 'MATTE', 
        label: 'Matte', 
        price: 0,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 5 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 }
        ]
      },
      { 
        value: 'HI-QMATTE', 
        label: 'Hi-Q Matte', 
        price: 25,
        weightOptions: [
          { value: '150', label: '150 gsm', price: 25 },
          { value: '180', label: '180 gsm', price: 35 },
          { value: '200', label: '200 gsm', price: 45 }
        ]
      },
      { 
        value: 'UNCOATED_W', 
        label: 'Uncoated', 
        price: 0,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 5 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 }
        ]
      },
      { 
        value: 'MONTBLANC_EW', 
        label: 'Premium', 
        price: 50,
        weightOptions: [
          { value: '150', label: '150 gsm', price: 30 },
          { value: '180', label: '180 gsm', price: 40 },
          { value: '200', label: '200 gsm', price: 50 }
        ]
      },
    ]
  },
  printColors: [
    { 
      value: 'CMYK', 
      label: 'Full color', 
      price: 0, 
      description: 'Standard 4-color process',
      image: '/forms/d1.png'
    },
    { 
      value: 'CMYK_PMS1', 
      label: 'Full color + 1 Spot color', 
      price: 75, 
      description: '4-color + 1 Pantone spot color',
      image: '/forms/d2.png'
    },
    { 
      value: 'CMYK_PMS2', 
      label: 'Full color + 2 Spot color', 
      price: 150, 
      description: '4-color + 2 Pantone spot colors',
      image: '/forms/d3.png'
    },
    { 
      value: 'BW', 
      label: 'Black only', 
      price: -100, 
      description: 'Single color black printing',
      image: '/forms/d4.png'
    },
    { 
      value: 'BW_PMS1', 
      label: 'Black + 1 Spot color', 
      price: -25, 
      description: 'Black + 1 Pantone spot color',
      image: '/forms/d5.png'
    },
    { 
      value: 'BW_PMS2', 
      label: 'Black + 2 Spot color', 
      price: 50, 
      description: 'Black + 2 Pantone spot colors',
      image: '/forms/d6.png'
    },
  ],
  coverFinishes: [
    { value: 'MATTE', label: 'Matte lamination', price: 50, description: 'Non-reflective finish' },
    { value: 'GLOSS', label: 'Gloss lamination', price: 50, description: 'Shiny protective finish' },
    { value: 'NONE', label: 'None', price: 0, description: 'No additional finish' },
    { value: 'SOFTTOUCH', label: 'Soft Touch', price: 75, description: 'Velvet-like soft finish' },
    { value: 'SPOTUV', label: 'Spot UV', price: 100, description: 'Glossy spot coating' },
  ],
  coverFolds: [
    { value: 'NONE', label: 'No fold', price: 0, description: 'Standard flat cover' },
    { value: 'FRONT', label: 'Front cover fold', price: 25, description: 'Fold on front cover only' },
    { value: 'BACK', label: 'Back cover fold', price: 25, description: 'Fold on back cover only' },
    { value: 'BOTH', label: 'Both cover folds', price: 40, description: 'Folds on both covers' },
    { value: 'GATEFOLD', label: 'Gatefold', price: 75, description: 'Double fold opening' },
  ],
  additionalOptions: {
    proof: [
      { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0, description: 'Digital PDF proof via email' },
      { value: 'DIGITAL', label: 'Digital Proof', price: 50, description: 'Physical digital print proof' },
      { value: 'HARDPROOF', label: 'Hard Proof', price: 150, description: 'High-quality color proof' },
    ],
    holePunch: [
      { value: '6', label: '0.236" (6mm) drill', price: 15, description: 'Standard 6mm hole punch' },
      { value: '8', label: '0.315" (8mm) drill', price: 20, description: '8mm hole punch' },
      { value: '9.5', label: '0.374" (9.5mm) drill', price: 25, description: '9.5mm hole punch for binders' },
      { value: 'CUSTOM', label: 'Custom drill size', price: 50, description: 'Custom hole punch size' },
    ],
    slipcase: [
      { value: 'NONE', label: 'None', price: 0, description: 'No slipcase' },
      { value: 'CASE', label: 'Slipcase only', price: 80, description: 'Plain slipcase without printing' },
      { value: 'CASEPRINT', label: 'Slipcase + printing', price: 150, description: 'Printed slipcase' },
      { value: 'BOXBIND', label: 'Box binding', price: 200, description: 'Premium box binding' },
    ],
    shrinkWrap: [
      { value: '1', label: '1 copy/wrapping', price: 0.15, description: 'Individual wrapping' },
      { value: '2', label: '2 copy/wrapping', price: 0.12, description: 'Two copies per wrap' },
      { value: '3', label: '3 copy/wrapping', price: 0.10, description: 'Three copies per wrap' },
      { value: '5', label: '5 copy/wrapping', price: 0.08, description: 'Five copies per wrap' },
    ],
    directMail: [
      { value: 'ALL', label: 'DM all quantity', price: 0.75, description: 'Direct mail all copies' },
      { value: 'PORTION', label: 'DM a portion of the quantity', price: 0.50, description: 'Direct mail partial quantity' },
      { value: 'PREMIUM', label: 'Premium DM service', price: 1.25, description: 'Priority direct mail' },
    ],
    numbering: [
      { value: 'NONE', label: 'None', price: 0, description: 'No numbering' },
      { value: 'CONSECUTIVE', label: 'Consecutive numbering', price: 0.10, description: 'Sequential page numbering' },
      { value: 'PERFORATED', label: 'Perforated numbering', price: 0.15, description: 'Numbering with perforation' },
    ]
  },
  positions: [
    { value: 'FRONT', label: 'Before page 1', description: 'Insert before first page' },
    { value: 'BACK', label: 'After last page', description: 'Insert after last page' },
    { value: 'SELECT', label: 'Front of page no.', description: 'Insert at specific page' },
    { value: 'CENTER', label: 'Center spread', description: 'Insert at center spread' },
  ],
  pageCounts: Array.from({ length: (880 - 24) / 2 + 1 }, (_, i) => 24 + i * 2),
  weightOptions: [
    { value: '100', label: '100 gsm / 68# text', price: 0 },
    { value: '120', label: '120 gsm / 80# text', price: 10 },
    { value: '150', label: '150 gsm / 100# text', price: 20 },
    { value: '180', label: '180 gsm / 65# cover', price: 30 },
    { value: '200', label: '200 gsm / 74# cover', price: 40 },
    { value: '250', label: '250 gsm / 92# cover', price: 50 },
    { value: '300', label: '300 gsm / 110# cover', price: 60 },
  ],
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
  spineWidth: '0.178"',
  pricing: {
    baseSetupCost: 200,
    costPerPage: 0.05,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1,
    dustCoverBaseCost: 100,
    dustCoverPerCopy: 0.25,
    subscriptionCardBaseCost: 25,
    subscriptionCardPerCopy: 0.02,
    rushFeePercentage: 25,
    volumeDiscounts: [
      { quantity: 500, discount: 5 },
      { quantity: 1000, discount: 10 },
      { quantity: 2000, discount: 15 },
      { quantity: 5000, discount: 20 }
    ]
  },
  maxSubscriptionCards: 10,
  shippingOptions: {
    domestic: [
      { service: 'GROUND', price: 15, days: '5-7 business days' },
      { service: 'EXPEDITED', price: 25, days: '3-4 business days' },
      { service: 'EXPRESS', price: 40, days: '1-2 business days' },
    ],
    international: [
      { service: 'ECONOMY', price: 35, days: '10-14 business days' },
      { service: 'PRIORITY', price: 60, days: '5-7 business days' },
      { service: 'EXPRESS', price: 100, days: '2-3 business days' },
    ]
  }
};

export default function PrintQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(PRINTQUOTE_DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingWeight, setEditingWeight] = useState(null);
  const [expandedPaper, setExpandedPaper] = useState({});
  const [imageUploading, setImageUploading] = useState({});

  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved config:', formConfig);
      setConfig(formConfig);
    } else {
      console.log('📥 Loading default config');
      setConfig(PRINTQUOTE_DEFAULT_CONFIG);
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
      current[lastKey] = value;
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
        current[arrayKey][index] = { 
          ...current[arrayKey][index], 
          [field]: field === 'price' ? parseFloat(value) || 0 : value 
        };
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
      
      paperItem.weightOptions[weightIndex][field] = field === 'price' ? parseFloat(value) || 0 : value;
      
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

  const handleImageUpload = async (path, index, field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const uploadKey = `${path}-${index}-${field}`;
      setImageUploading(prev => ({ ...prev, [uploadKey]: true }));
      
      try {
        const imageUrl = URL.createObjectURL(file);
        updateArrayItem(path, index, field, imageUrl);
        console.log('Image uploaded (local):', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setImageUploading(prev => ({ ...prev, [uploadKey]: false }));
      }
    };
    
    input.click();
  };

  const handleSave = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      console.log('💾 Saving config:', config);
      await onSave(config);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  const togglePaperExpansion = (paperType, paperIndex) => {
    const key = `${paperType}-${paperIndex}`;
    setExpandedPaper(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderPaperOptionsWithWeights = (type) => {
    const paperTypes = {
      'cover': { title: 'Cover Paper', path: 'paperOptions.cover' },
      'inside': { title: 'Inside Paper', path: 'paperOptions.inside' },
      'subscription': { title: 'Subscription Paper', path: 'paperOptions.subscription' }
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
                                  Weight Value (gsm)
                                </label>
                                <input
                                  type="text"
                                  value={weight.value || ''}
                                  onChange={(e) => updatePaperWeightOption(type, paperIndex, weightIndex, 'value', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder="e.g., 100"
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
                                  placeholder="e.g., 100 gsm"
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
                    
                    <div className="mt-4 text-sm text-gray-500">
                      <p><span className="font-medium">Note:</span> Weight options allow users to select different paper weights for this paper type. The price shown will be: Base Price + Weight Price.</p>
                    </div>
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

  const renderEditableArray = (title, path, fields, isNested = false, hasImages = false) => {
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
    const hasImageField = fields.includes('image') || hasImages;
    const gridCols = hasImageField ? 'lg:grid-cols-5' : 'lg:grid-cols-4';

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
                } else if (field === 'service') {
                  acc[field] = 'NEW_SERVICE';
                } else if (field === 'days') {
                  acc[field] = '3-5 business days';
                } else if (field === 'quantity' || field === 'discount') {
                  acc[field] = 0;
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
                <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4`}>
                  {fields.map(field => {
                    if (field === 'image') {
                      return (
                        <div key={field} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 capitalize">
                            <div className="flex items-center">
                              <ImageIcon size={14} className="mr-1" />
                              {field}
                            </div>
                          </label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item[field] || ''}
                                onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                                placeholder="/forms/image.png"
                              />
                              <button
                                type="button"
                                onClick={() => handleImageUpload(path, index, field)}
                                disabled={imageUploading[`${path}-${index}-${field}`]}
                                className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                              >
                                {imageUploading[`${path}-${index}-${field}`] ? 'Uploading...' : 'Upload'}
                              </button>
                            </div>
                            {item[field] && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                <div className="w-20 h-20 rounded overflow-hidden border border-gray-300">
                                  <img 
                                    src={item[field]} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = '/images/placeholder-color.png';
                                      e.target.alt = 'Image not available';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field === 'price' ? (
                            <div className="flex items-center">
                              <DollarSign size={14} className="mr-1" />
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
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                updateArrayItem(path, index, field, value);
                              }}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                              placeholder="0.00"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        ) : (
                          <input
                            type={field === 'quantity' || field === 'discount' ? 'number' : 'text'}
                            value={item[field] || ''}
                            onChange={(e) => {
                              const value = field === 'quantity' || field === 'discount' 
                                ? parseInt(e.target.value) || 0 
                                : e.target.value;
                              updateArrayItem(path, index, field, value);
                            }}
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
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Print Quote Form Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Configure pricing and options for perfect binding book printing</p>
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
              'general', 'sizes', 'binding', 'colors', 'paper-cover', 'paper-inside', 
              'paper-subscription', 'finishes', 'folds', 'additional',
              'positions', 'page-counts', 'weights', 'quantities', 'pricing', 
              'shipping', 'volume-discounts'
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
                <h4 className="text-lg font-medium text-gray-900 mb-2">Form Preview</h4>
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
                    { id: 'colors', label: 'Color Options', icon: '🎨' },
                    { id: 'paper-cover', label: 'Cover Paper', icon: '🟫' },
                    { id: 'paper-inside', label: 'Inside Paper', icon: '📄' },
                    { id: 'paper-subscription', label: 'Subscription Paper', icon: '💳' },
                    { id: 'finishes', label: 'Cover Finishes', icon: '✨' },
                    { id: 'folds', label: 'Cover Folds', icon: '📐' },
                    { id: 'additional', label: 'Additional Services', icon: '➕' },
                    { id: 'positions', label: 'Card Positions', icon: '📍' },
                    { id: 'page-counts', label: 'Page Count Options', icon: '📊' },
                    { id: 'weights', label: 'Global Weight Options', icon: '⚖️' },
                    { id: 'quantities', label: 'Quantity Options', icon: '📦' },
                    { id: 'pricing', label: 'Pricing Settings', icon: '💰' },
                    { id: 'shipping', label: 'Shipping Options', icon: '🚚' },
                    { id: 'volume-discounts', label: 'Volume Discounts', icon: '📈' },
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
                      <span className="font-semibold">💡 Tip:</span> Binding Edge and Print Color options support images for better visualization.
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
                            Disclaimer/Note
                          </label>
                          <textarea
                            value={config.general?.disclaimer || ''}
                            onChange={(e) => updateNestedConfig('general.disclaimer', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="Add any disclaimer or note for users"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Spine Width Display
                          </label>
                          <input
                            type="text"
                            value={config.spineWidth || ''}
                            onChange={(e) => updateNestedConfig('spineWidth', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="e.g., 0.178&quot;"
                          />
                          <p className="text-xs text-gray-500 mt-2">This will be displayed in the Binding Details section</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions
                          </label>
                          <textarea
                            value={config.customSizeInstructions || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="Instructions for custom size input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sizes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Sizes & Dimensions</h3>
                      {renderEditableArray('Standard Sizes', 'sizes', ['value', 'label', 'price'])}
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
                      {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc', 'price', 'image'], false, true)}
                    </div>
                  )}

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
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price', 'description', 'image'], false, true)}
                    </div>
                  )}

                  {activeTab === 'paper-cover' && renderPaperOptionsWithWeights('cover')}
                  {activeTab === 'paper-inside' && renderPaperOptionsWithWeights('inside')}
                  {activeTab === 'paper-subscription' && renderPaperOptionsWithWeights('subscription')}

                  {activeTab === 'finishes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Finishes</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price', 'description'])}
                    </div>
                  )}

                  {activeTab === 'folds' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Folds</h3>
                      {renderEditableArray('Cover Folds', 'coverFolds', ['value', 'label', 'price', 'description'])}
                    </div>
                  )}

                  {activeTab === 'additional' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Additional Services</h3>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Note:</span> Configure additional services for proofing, hole punching, slipcases, shrink wrapping, direct mailing, and numbering.
                        </p>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Proof Types</h4>
                          {renderEditableArray('', 'additionalOptions.proof', ['value', 'label', 'price', 'description'])}
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Hole Punch Options</h4>
                          {renderEditableArray('', 'additionalOptions.holePunch', ['value', 'label', 'price', 'description'])}
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Slipcase Options</h4>
                          {renderEditableArray('', 'additionalOptions.slipcase', ['value', 'label', 'price', 'description'])}
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Shrink Wrap Options</h4>
                          {renderEditableArray('', 'additionalOptions.shrinkWrap', ['value', 'label', 'price', 'description'])}
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Direct Mail Options</h4>
                          {renderEditableArray('', 'additionalOptions.directMail', ['value', 'label', 'price', 'description'])}
                        </div>

                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Numbering Options</h4>
                          {renderEditableArray('', 'additionalOptions.numbering', ['value', 'label', 'price', 'description'])}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'positions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Card Positions</h3>
                      {renderEditableArray('Insertion Positions', 'positions', ['value', 'label', 'description'])}
                    </div>
                  )}

                  {activeTab === 'page-counts' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Page Count Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> Page counts are auto-generated from 24 to 880 in increments of 2. This is calculated automatically based on your settings below.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Pages
                          </label>
                          <input
                            type="number"
                            value={24}
                            disabled
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                          />
                          <p className="text-xs text-gray-500 mt-1">Fixed at 24 pages minimum</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum Pages
                          </label>
                          <input
                            type="number"
                            value={880}
                            disabled
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                          />
                          <p className="text-xs text-gray-500 mt-1">Fixed at 880 pages maximum</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Increment
                          </label>
                          <input
                            type="number"
                            value={2}
                            disabled
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                          />
                          <p className="text-xs text-gray-500 mt-1">Fixed at 2-page increments</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'weights' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Global Weight Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> These are global weight options. 
                          Individual paper types can use these as references or override with their own weight options.
                        </p>
                      </div>
                      {renderEditableArray('Global Weight Options', 'weightOptions', ['value', 'label', 'price'])}
                    </div>
                  )}

                  {activeTab === 'quantities' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Quantity Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> These quantities will appear in the pricing table. You can add or remove quantities as needed.
                        </p>
                      </div>
                      {renderEditableArray('Available Quantities', 'quantities', ['value'])}
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
                              onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
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
                              onChange={(e) => updateNestedConfig('pricing.costPerPage', parseFloat(e.target.value) || 0)}
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
                            onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1.0)}
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
                            onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1.0)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <p className="text-xs text-gray-500 mt-1">Multiplier for non-standard sizes</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dust Cover Base Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.dustCoverBaseCost || 0}
                              onChange={(e) => updateNestedConfig('pricing.dustCoverBaseCost', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dust Cover Per Copy ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.001"
                              value={config.pricing?.dustCoverPerCopy || 0}
                              onChange={(e) => updateNestedConfig('pricing.dustCoverPerCopy', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rush Fee Percentage (%)
                          </label>
                          <input
                            type="number"
                            step="1"
                            value={config.pricing?.rushFeePercentage || 0}
                            onChange={(e) => updateNestedConfig('pricing.rushFeePercentage', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <p className="text-xs text-gray-500 mt-1">Percentage added for rush orders</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Subscription Cards
                          </label>
                          <input
                            type="number"
                            value={config.maxSubscriptionCards || 10}
                            onChange={(e) => updateNestedConfig('maxSubscriptionCards', parseInt(e.target.value) || 10)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <p className="text-xs text-gray-500 mt-1">Maximum number of subscription cards allowed</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Shipping Options</h3>
                      
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Domestic Shipping</h4>
                          {renderEditableArray('', 'shippingOptions.domestic', ['service', 'price', 'days'])}
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">International Shipping</h4>
                          {renderEditableArray('', 'shippingOptions.international', ['service', 'price', 'days'])}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'volume-discounts' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Volume Discounts</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> Configure automatic discounts based on order quantity.
                        </p>
                      </div>
                      {renderEditableArray('Volume Discounts', 'pricing.volumeDiscounts', ['quantity', 'discount'])}
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