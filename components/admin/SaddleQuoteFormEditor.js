// components/admin/SaddleQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, DollarSign, Image as ImageIcon, Upload, Copy, GripVertical, Download, Settings, Layers } from 'lucide-react';

const SADDLEQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Saddle Stitching Quote",
    description: "Configure your saddle stitched book with our professional printing services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping",
    disclaimer: "Prices are estimates and final cost may vary based on specifications"
  },
  
  // Saddle stitching specific options
  bindingTypes: [
    { 
      value: 'SADDLE', 
      label: 'Saddle Stitch', 
      desc: 'Staples through the spine, ideal for booklets',
      image: '/forms/saddle-stitch.png',
      price: 0
    },
    { 
      value: 'PERFECT', 
      label: 'Perfect Binding', 
      desc: 'Glued spine, for thicker books',
      image: '/forms/perfect-bind.png',
      price: 50
    },
    { 
      value: 'WIRE_O', 
      label: 'Wire-O Binding', 
      desc: 'Double-loop wire binding',
      image: '/forms/wire-o.png',
      price: 75
    },
  ],
  
  // Saddle stitch specific sizes (typically smaller)
  sizes: [
    { value: '5.5x8.5', label: '5.5 x 8.5"', price: 0 },
    { value: '8.5x11', label: '8.5 x 11"', price: 25 },
    { value: '8.5x14', label: '8.5 x 14"', price: 50 },
    { value: '11x17', label: '11 x 17"', price: 75 },
    { value: 'custom', label: 'Custom Size', price: 100 }
  ],
  
  // Saddle stitch paper options (usually different weights)
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
        value: 'UNCOATED', 
        label: 'Uncoated', 
        description: 'Matte and very much used',
        price: 0,
        weightOptions: [
          { value: '100', label: '100 gsm', price: 0 },
          { value: '120', label: '120 gsm', price: 5 },
          { value: '150', label: '150 gsm', price: 15 },
          { value: '180', label: '180 gsm', price: 25 }
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
        value: 'UNCOATED', 
        label: 'Uncoated', 
        price: 0,
        weightOptions: [
          { value: '80', label: '80 gsm', price: 0 },
          { value: '100', label: '100 gsm', price: 5 },
          { value: '120', label: '120 gsm', price: 10 },
          { value: '150', label: '150 gsm', price: 20 }
        ]
      }
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
    }
  ],
  
  coverFinishes: [
    { value: 'MATTE', label: 'Matte lamination', price: 50, description: 'Non-reflective finish' },
    { value: 'GLOSS', label: 'Gloss lamination', price: 50, description: 'Shiny protective finish' },
    { value: 'NONE', label: 'None', price: 0, description: 'No additional finish' },
    { value: 'SPOTUV', label: 'Spot UV', price: 100, description: 'Glossy spot coating' },
  ],
  
  foldingOptions: [
    { value: 'HALF', label: 'Half Fold', price: 0, description: 'Single fold down the middle' },
    { value: 'TRIFOLD', label: 'Tri-Fold', price: 25, description: 'Two folds creating three panels' },
    { value: 'Z_FOLD', label: 'Z-Fold', price: 30, description: 'Accordion style fold' },
    { value: 'GATEFOLD', label: 'Gatefold', price: 50, description: 'Double fold opening' },
    { value: 'FRENCH_FOLD', label: 'French Fold', price: 75, description: 'Sheet folded twice' },
  ],
  
  // Saddle stitch specific additional options
  additionalOptions: {
    holePunch: [
      { value: '6', label: '0.236" (6mm) drill', price: 15, description: 'Standard 6mm hole punch' },
      { value: '8', label: '0.315" (8mm) drill', price: 20, description: '8mm hole punch' },
      { value: '9.5', label: '0.374" (9.5mm) drill', price: 25, description: '9.5mm hole punch for binders' },
    ],
    perforation: [
      { value: 'NONE', label: 'None', price: 0, description: 'No perforation' },
      { value: 'STRAIGHT', label: 'Straight Perforation', price: 20, description: 'Straight line perforation' },
      { value: 'MICRO', label: 'Micro-Perforation', price: 30, description: 'Micro-perforation for easy tear' },
      { value: 'CUSTOM', label: 'Custom Perforation', price: 50, description: 'Custom perforation pattern' },
    ],
    numbering: [
      { value: 'NONE', label: 'None', price: 0, description: 'No numbering' },
      { value: 'CONSECUTIVE', label: 'Consecutive numbering', price: 0.10, description: 'Sequential page numbering' },
      { value: 'PERFORATED', label: 'Perforated numbering', price: 0.15, description: 'Numbering with perforation' },
    ],
    cornerRounding: [
      { value: 'NONE', label: 'None', price: 0, description: 'Square corners' },
      { value: 'SMALL', label: 'Small radius', price: 15, description: '1/4" corner rounding' },
      { value: 'MEDIUM', label: 'Medium radius', price: 20, description: '1/2" corner rounding' },
      { value: 'LARGE', label: 'Large radius', price: 25, description: '3/4" corner rounding' },
    ],
    shrinkWrap: [
      { value: '1', label: '1 copy/wrapping', price: 0.15, description: 'Individual wrapping' },
      { value: '2', label: '2 copy/wrapping', price: 0.12, description: 'Two copies per wrap' },
      { value: '3', label: '3 copy/wrapping', price: 0.10, description: 'Three copies per wrap' },
      { value: '5', label: '5 copy/wrapping', price: 0.08, description: 'Five copies per wrap' },
    ]
  },
  
  // Saddle stitch specific positions
  positions: [
    { value: 'FRONT', label: 'Front cover', description: 'Inside front cover' },
    { value: 'BACK', label: 'Back cover', description: 'Inside back cover' },
    { value: 'CENTER', label: 'Center spread', description: 'Center pages' },
    { value: 'INSERT', label: 'Insert page', description: 'Loose insert' },
  ],
  
  // Saddle stitch typically has lower page counts
  pageCounts: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96],
  
  // Standard quantities
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 17\" × 22\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 432 × 559 mm"
  },
  
  // Saddle stitch specific pricing
  pricing: {
    baseSetupCost: 150,
    costPerPage: 0.03,
    customSizeMultiplier: 1.3,
    standardSizeMultiplier: 1.15,
    minimumPages: 4,
    maximumPages: 96,
    rushFeePercentage: 30,
    volumeDiscounts: [
      { quantity: 500, discount: 5 },
      { quantity: 1000, discount: 10 },
      { quantity: 2000, discount: 15 },
      { quantity: 5000, discount: 20 }
    ],
    saddleStitchSetup: 75,
    additionalStitchCost: 0.02
  },
  
  // Saddle stitch weight options
  weightOptions: [
    { value: '80', label: '80 gsm / 60# text', price: 0 },
    { value: '100', label: '100 gsm / 68# text', price: 10 },
    { value: '120', label: '120 gsm / 80# text', price: 20 },
    { value: '150', label: '150 gsm / 100# text', price: 30 },
    { value: '200', label: '200 gsm / 74# cover', price: 50 },
  ],
  
  // Paper weight conversions for saddle stitch
  paperWeightConversions: {
    '80': { gsm: '80 gsm', us: '60# text', pt: '2.3 pt', kg: '69 kg' },
    '100': { gsm: '100 gsm', us: '68# text', pt: '3.2 pt', kg: '86 kg' },
    '120': { gsm: '120 gsm', us: '80# text', pt: '3.8 pt', kg: '103 kg' },
    '150': { gsm: '150 gsm', us: '100# text', pt: '4.8 pt', kg: '129 kg' },
    '200': { gsm: '200 gsm', us: '74# cover', pt: '7.1 pt', kg: '172 kg' }
  },
  
  // Size conversions for saddle stitch
  sizeConversions: {
    INCH: {
      '5.5x8.5': '5.5" x 8.5"',
      '8.5x11': '8.5" x 11"',
      '8.5x14': '8.5" x 14"',
      '11x17': '11" x 17"',
      'custom': 'Custom Size'
    },
    MM: {
      '5.5x8.5': '140 x 216 mm',
      '8.5x11': '216 x 279 mm',
      '8.5x14': '216 x 356 mm',
      '11x17': '279 x 432 mm',
      'custom': 'Custom Size'
    }
  },
  
  // Available sizes for saddle stitch
  availableSizes: ['5.5x8.5', '8.5x11', '8.5x14', '11x17', 'custom'],
  
  // Saddle stitch specific shipping options
  shippingOptions: {
    domestic: [
      { service: 'GROUND', price: 12, days: '5-7 business days' },
      { service: 'EXPEDITED', price: 20, days: '3-4 business days' },
      { service: 'EXPRESS', price: 35, days: '1-2 business days' },
    ],
    international: [
      { service: 'ECONOMY', price: 30, days: '10-14 business days' },
      { service: 'PRIORITY', price: 50, days: '5-7 business days' },
      { service: 'EXPRESS', price: 85, days: '2-3 business days' },
    ]
  },
  
  // Max inserts for saddle stitch
  maxInserts: 5,
  
  // Saddle stitch finishing options
  finishingOptions: {
    trimming: [
      { value: 'STANDARD', label: 'Standard Trim', price: 0, description: 'Standard edge trimming' },
      { value: 'BLEED', label: 'Full Bleed Trim', price: 25, description: 'Full bleed edge trimming' },
      { value: 'ROUGH', label: 'Rough Cut', price: -10, description: 'Unfinished edges' }
    ],
    scoring: [
      { value: 'NONE', label: 'No Scoring', price: 0, description: 'No score lines' },
      { value: 'SINGLE', label: 'Single Score', price: 15, description: 'Single score line' },
      { value: 'MULTIPLE', label: 'Multiple Scores', price: 30, description: 'Multiple score lines' }
    ]
  }
};

// Draggable array item component
const DraggableItem = ({ children, index, onDragStart, onDragOver, onDrop, isDragging }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={(e) => onDragOver(e, index)}
    onDrop={(e) => onDrop(e, index)}
    className={`relative ${isDragging ? 'opacity-50' : 'opacity-100'} transition-opacity`}
  >
    <div className="absolute left-0 top-0 bottom-0 flex items-center cursor-move">
      <GripVertical size={16} className="text-gray-400" />
    </div>
    <div className="ml-6">
      {children}
    </div>
  </div>
);

export default function SaddleQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(SADDLEQUOTE_DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [imageUploading, setImageUploading] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [jsonEditors, setJsonEditors] = useState({
    paperWeightConversions: JSON.stringify(SADDLEQUOTE_DEFAULT_CONFIG.paperWeightConversions, null, 2),
    sizeConversions: JSON.stringify(SADDLEQUOTE_DEFAULT_CONFIG.sizeConversions, null, 2)
  });
  const [jsonErrors, setJsonErrors] = useState({});

  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved config:', formConfig);
      setConfig(formConfig);
      
      // Update JSON editors with loaded config
      setJsonEditors({
        paperWeightConversions: JSON.stringify(formConfig.paperWeightConversions || SADDLEQUOTE_DEFAULT_CONFIG.paperWeightConversions, null, 2),
        sizeConversions: JSON.stringify(formConfig.sizeConversions || SADDLEQUOTE_DEFAULT_CONFIG.sizeConversions, null, 2)
      });
    } else {
      console.log('📥 Loading default config');
      setConfig(SADDLEQUOTE_DEFAULT_CONFIG);
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

  const moveArrayItem = (path, fromIndex, toIndex) => {
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
        const array = [...current[arrayKey]];
        const [movedItem] = array.splice(fromIndex, 1);
        array.splice(toIndex, 0, movedItem);
        current[arrayKey] = array;
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

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (path, index) => {
    if (draggedItem !== null && draggedItem !== index) {
      moveArrayItem(path, draggedItem, index);
    }
    setDraggedItem(null);
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
        // In a real app, upload to server and get URL
        const imageUrl = URL.createObjectURL(file);
        updateArrayItem(path, index, field, imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setImageUploading(prev => ({ ...prev, [uploadKey]: false }));
      }
    };
    
    input.click();
  };

  const handleJsonEditorChange = (field, value) => {
    setJsonEditors(prev => ({ ...prev, [field]: value }));
    
    try {
      const parsed = JSON.parse(value);
      setJsonErrors(prev => ({ ...prev, [field]: null }));
      
      // Update the config with parsed JSON
      if (field === 'paperWeightConversions') {
        updateNestedConfig('paperWeightConversions', parsed);
      } else if (field === 'sizeConversions') {
        updateNestedConfig('sizeConversions', parsed);
      }
    } catch (error) {
      setJsonErrors(prev => ({ ...prev, [field]: error.message }));
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

  const renderEditableArray = (title, path, fields, hasImages = false, draggable = false) => {
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
              {draggable ? (
                <DraggableItem
                  index={index}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(path, index)}
                  isDragging={draggedItem === index}
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
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
                        {item.price !== undefined && (
                          <span className={`ml-2 text-sm ${item.price > 0 ? 'text-green-600' : item.price < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                            ${item.price}
                          </span>
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
                </DraggableItem>
              ) : (
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
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
                      {item.price !== undefined && (
                        <span className={`ml-2 text-sm ${item.price > 0 ? 'text-green-600' : item.price < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          ${item.price}
                        </span>
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
              )}
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                              onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                              placeholder="0.00"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
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

  const renderPaperOptionsWithWeights = (type) => {
    const paperOptions = config.paperOptions?.[type] || [];
    const title = type.charAt(0).toUpperCase() + type.slice(1) + ' Paper Options';
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        
        <div className="space-y-6">
          {paperOptions.map((paper, paperIndex) => (
            <div key={paperIndex} className="border border-gray-300 rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
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
                    onClick={() => removeArrayItem(`paperOptions.${type}`, paperIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove paper"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paper Value
                    </label>
                    <input
                      type="text"
                      value={paper.value || ''}
                      onChange={(e) => updateArrayItem(`paperOptions.${type}`, paperIndex, 'value', e.target.value)}
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
                      onChange={(e) => updateArrayItem(`paperOptions.${type}`, paperIndex, 'label', e.target.value)}
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
                        onChange={(e) => updateArrayItem(`paperOptions.${type}`, paperIndex, 'price', e.target.value)}
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
                      onChange={(e) => updateArrayItem(`paperOptions.${type}`, paperIndex, 'description', e.target.value)}
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Paper description"
                    />
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-gray-200">
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
                </div>
              </div>
            </div>
          ))}
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
              
              addArrayItem(`paperOptions.${type}`, newPaper);
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

  const renderAdditionalOptions = (category) => {
    const options = config.additionalOptions?.[category] || [];
    const titles = {
      holePunch: 'Hole Punch Options',
      perforation: 'Perforation Options',
      numbering: 'Numbering Options',
      cornerRounding: 'Corner Rounding Options',
      shrinkWrap: 'Shrink Wrap Options'
    };
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">{titles[category]}</h4>
        {renderEditableArray('', `additionalOptions.${category}`, ['value', 'label', 'price', 'description'], false, true)}
      </div>
    );
  };

  const renderFinishingOptions = (category) => {
    const options = config.finishingOptions?.[category] || [];
    const titles = {
      trimming: 'Trimming Options',
      scoring: 'Scoring Options'
    };
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">{titles[category]}</h4>
        {renderEditableArray('', `finishingOptions.${category}`, ['value', 'label', 'price', 'description'])}
      </div>
    );
  };

  const renderJsonEditor = (title, field, description) => {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </div>
        
        <div className="relative">
          <textarea
            value={jsonEditors[field]}
            onChange={(e) => handleJsonEditorChange(field, e.target.value)}
            rows={20}
            className={`w-full font-mono text-sm p-4 border rounded-lg transition-colors ${
              jsonErrors[field] ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'
            }`}
            spellCheck="false"
          />
          {jsonErrors[field] && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                <span className="font-semibold">JSON Error:</span> {jsonErrors[field]}
              </p>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Edit the JSON structure directly. Make sure to maintain valid JSON format.
            </div>
            <button
              onClick={() => {
                try {
                  const parsed = JSON.parse(jsonEditors[field]);
                  const pretty = JSON.stringify(parsed, null, 2);
                  handleJsonEditorChange(field, pretty);
                } catch (error) {
                  // Ignore if already invalid
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Format JSON
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-200">Saddle Stitch Configuration Preview</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">General Settings</h4>
              <p className="text-sm text-gray-600">{config.general?.title}</p>
              <p className="text-xs text-gray-500 mt-1">{config.general?.description}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Binding Options</h4>
              <p className="text-sm text-gray-600">{config.bindingTypes?.length || 0} binding types</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Available Options Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">Paper Types</p>
                <p className="text-blue-700">Cover: {config.paperOptions?.cover?.length || 0}</p>
                <p className="text-blue-700">Inside: {config.paperOptions?.inside?.length || 0}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-900">Print Colors</p>
                <p className="text-green-700">{config.printColors?.length || 0} options</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">Folding Options</p>
                <p className="text-purple-700">{config.foldingOptions?.length || 0} options</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Pricing Configuration</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Base Setup: ${config.pricing?.baseSetupCost || 0}</p>
              <p>Cost Per Page: ${config.pricing?.costPerPage || 0}</p>
              <p>Minimum Pages: {config.pricing?.minimumPages || 0}</p>
              <p>Maximum Pages: {config.pricing?.maximumPages || 0}</p>
            </div>
          </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Saddle Stitch Form Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Configure pricing and options for saddle stitch book printing</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Back to Editor' : 'Preview'}
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
              'general', 'binding', 'sizes', 'paper-cover', 'paper-inside',
              'colors', 'finishes', 'folding', 'additional', 'finishing',
              'positions', 'page-counts', 'quantities', 'pricing', 'shipping',
              'weights', 'weight-conversions', 'size-conversions'
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
          renderPreview()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-5 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Configuration Sections</h3>
                <nav className="space-y-1">
                  {[
                    { id: 'general', label: 'General Settings', icon: '⚙️' },
                    { id: 'binding', label: 'Binding Types', icon: '📖' },
                    { id: 'sizes', label: 'Sizes & Dimensions', icon: '📐' },
                    { id: 'paper-cover', label: 'Cover Paper', icon: '🟫' },
                    { id: 'paper-inside', label: 'Inside Paper', icon: '📄' },
                    { id: 'colors', label: 'Color Options', icon: '🎨' },
                    { id: 'finishes', label: 'Cover Finishes', icon: '✨' },
                    { id: 'folding', label: 'Folding Options', icon: '📐' },
                    { id: 'additional', label: 'Additional Services', icon: '➕' },
                    { id: 'finishing', label: 'Finishing Options', icon: '✂️' },
                    { id: 'positions', label: 'Insert Positions', icon: '📍' },
                    { id: 'page-counts', label: 'Page Counts', icon: '📊' },
                    { id: 'quantities', label: 'Quantities', icon: '📦' },
                    { id: 'pricing', label: 'Pricing Settings', icon: '💰' },
                    { id: 'shipping', label: 'Shipping Options', icon: '🚚' },
                    { id: 'weights', label: 'Global Weights', icon: '⚖️' },
                    { id: 'weight-conversions', label: 'Weight Conversions', icon: '🔄' },
                    { id: 'size-conversions', label: 'Size Conversions', icon: '📏' },
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
                      <span className="font-semibold">💡 Tip:</span> Drag and drop items to reorder them in lists.
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
                          <textarea
                            value={config.customSizeInstructions?.INCH || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.INCH', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions (MM)
                          </label>
                          <textarea
                            value={config.customSizeInstructions?.MM || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.MM', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Insert Pages
                          </label>
                          <input
                            type="number"
                            value={config.maxInserts || 5}
                            onChange={(e) => updateNestedConfig('maxInserts', parseInt(e.target.value) || 5)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                          <p className="text-xs text-gray-500 mt-1">Maximum number of insert pages allowed</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'binding' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Binding Types</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">💡 Note:</span> Binding options support images for better visualization.
                        </p>
                      </div>
                      {renderEditableArray('Binding Types', 'bindingTypes', ['value', 'label', 'desc', 'price', 'image'], true, true)}
                    </div>
                  )}

                  {activeTab === 'sizes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Sizes & Dimensions</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Standard Sizes (comma separated)
                        </label>
                        <input
                          type="text"
                          value={config.availableSizes?.join(', ') || ''}
                          onChange={(e) => updateNestedConfig('availableSizes', e.target.value.split(',').map(s => s.trim()))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="5.5x8.5, 8.5x11, 8.5x14, ..."
                        />
                      </div>
                      {renderEditableArray('Size Options', 'sizes', ['value', 'label', 'price'], false, true)}
                    </div>
                  )}

                  {activeTab === 'paper-cover' && renderPaperOptionsWithWeights('cover')}
                  {activeTab === 'paper-inside' && renderPaperOptionsWithWeights('inside')}

                  {activeTab === 'colors' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Print Color Options</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">💡 Note:</span> Color options support images. Drag and drop to reorder.
                        </p>
                      </div>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price', 'description', 'image'], true, true)}
                    </div>
                  )}

                  {activeTab === 'finishes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Finishes</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price', 'description'], false, true)}
                    </div>
                  )}

                  {activeTab === 'folding' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Folding Options</h3>
                      {renderEditableArray('Folding Options', 'foldingOptions', ['value', 'label', 'price', 'description'], false, true)}
                    </div>
                  )}

                  {activeTab === 'additional' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Additional Services</h3>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Note:</span> Configure additional services specific to saddle stitch printing.
                        </p>
                      </div>

                      <div className="space-y-8">
                        {['holePunch', 'perforation', 'numbering', 'cornerRounding', 'shrinkWrap'].map(category => (
                          <div key={category}>
                            {renderAdditionalOptions(category)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'finishing' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Finishing Options</h3>
                      
                      <div className="space-y-8">
                        {['trimming', 'scoring'].map(category => (
                          <div key={category}>
                            {renderFinishingOptions(category)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'positions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Insert Positions</h3>
                      {renderEditableArray('Insert Positions', 'positions', ['value', 'label', 'description'])}
                    </div>
                  )}

                  {activeTab === 'page-counts' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Page Count Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> Saddle stitch typically has lower page counts (4-96 pages).
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Counts (comma separated)
                        </label>
                        <input
                          type="text"
                          value={config.pageCounts?.join(', ') || ''}
                          onChange={(e) => updateNestedConfig('pageCounts', e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="4, 8, 12, 16, 20, ..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'quantities' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Quantity Options</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Quantities (comma separated)
                        </label>
                        <input
                          type="text"
                          value={config.quantities?.join(', ') || ''}
                          onChange={(e) => updateNestedConfig('quantities', e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="100, 200, 300, 400, 500, ..."
                        />
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
                              onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
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
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.customSizeMultiplier || 1.3}
                            onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1.3)}
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
                            value={config.pricing?.standardSizeMultiplier || 1.15}
                            onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1.15)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Pages
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.minimumPages || 4}
                            onChange={(e) => updateNestedConfig('pricing.minimumPages', parseInt(e.target.value) || 4)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum Pages
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.maximumPages || 96}
                            onChange={(e) => updateNestedConfig('pricing.maximumPages', parseInt(e.target.value) || 96)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rush Fee Percentage (%)
                          </label>
                          <input
                            type="number"
                            step="1"
                            value={config.pricing?.rushFeePercentage || 30}
                            onChange={(e) => updateNestedConfig('pricing.rushFeePercentage', parseFloat(e.target.value) || 30)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Saddle Stitch Setup Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.saddleStitchSetup || 0}
                              onChange={(e) => updateNestedConfig('pricing.saddleStitchSetup', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
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

                  {activeTab === 'weights' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Global Weight Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> These are global weight options for quick reference.
                        </p>
                      </div>
                      {renderEditableArray('Global Weight Options', 'weightOptions', ['value', 'label', 'price'])}
                    </div>
                  )}

                  {activeTab === 'weight-conversions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Paper Weight Conversions</h3>
                      {renderJsonEditor(
                        'Weight Conversion Table',
                        'paperWeightConversions',
                        'Mapping of weight values to their equivalents in different measurement systems.'
                      )}
                    </div>
                  )}

                  {activeTab === 'size-conversions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Size Conversions</h3>
                      {renderJsonEditor(
                        'Size Conversion Tables',
                        'sizeConversions',
                        'Size display strings for both inch and millimeter measurement systems.'
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    if (confirm('Reset to default configuration? This will discard all changes.')) {
                      setConfig(SADDLEQUOTE_DEFAULT_CONFIG);
                    }
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Reset to Default
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
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