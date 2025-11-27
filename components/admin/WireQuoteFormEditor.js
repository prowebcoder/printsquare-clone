'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2 } from 'lucide-react';

const DEFAULT_FORM_CONFIG = {
  general: {
    title: "Wire Binding Printing Quote",
    description: "Configure your professional wire-bound documents with our instant quoting system. Perfect for reports, manuals, and presentations.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  bindingTypes: [
    { value: 'PERFECT', label: 'Perfect Binding', link: '/perfect-binding' },
    { value: 'SADDLE', label: 'Saddle Stitching', link: '/saddle-stitching' },
    { value: 'HARDCOVER', label: 'Hardcover Book', link: '/hardcover-book' },
    { value: 'WIRE', label: 'Wire Binding', link: '/wire-binding' },
  ],
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
      image: '/asset/images/quote/edge01.png'
    },
    { 
      value: 'RIGHT', 
      label: 'Right Side', 
      desc: 'First inside page starts from the right',
      image: '/asset/images/quote/edge02.png'
    },
    { 
      value: 'TOP', 
      label: 'Top Side', 
      desc: 'Binding on the top, a.k.a calendar binding',
      image: '/asset/images/quote/edge03.png'
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
      { value: 'MATTE', label: 'Matte', gsm: ['200', '250', '300'] },
      { value: 'GLOSS', label: 'Gloss', gsm: ['200', '250', '300'] },
      { value: 'HI-QMYSTIC', label: 'Hi-Q Mystic', gsm: ['200', '250'] },
      { value: 'UNCOATED_W', label: 'Uncoated White', gsm: ['200', '250'] }
    ],
    inside: [
      { value: 'MATTE', label: 'Matte', gsm: ['80', '100', '120'] },
      { value: 'GLOSS', label: 'Gloss', gsm: ['80', '100', '120'] },
      { value: 'HI-PLUS', label: 'Hi-Plus', gsm: ['80', '100'] },
      { value: 'UNCOATED_W', label: 'Uncoated White', gsm: ['80', '100'] }
    ]
  },
  printColors: [
    { value: 'CMYK', label: 'Full color', description: 'Full color' },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', description: 'Full color + 1 Spot color' },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', description: 'Full color + 2 Spot color' },
    { value: 'BW', label: 'Black only', description: 'Black only' },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color', description: 'Black + 1 Spot color' },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color', description: 'Black + 2 Spot color' }
  ],
  coverFinishes: [
    { value: 'NONE', label: 'None', price: 0 },
    { value: 'MATTE', label: 'Matte Lamination', price: 40 },
    { value: 'GLOSS', label: 'Gloss Lamination', price: 40 },
  ],
  coverFolds: [
    { value: '', label: 'No fold' },
    { value: 'FRONT', label: 'Front cover fold' },
    { value: 'BACK', label: 'Back cover fold' },
    { value: 'BOTH', label: 'Both cover folds' },
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
  weightOptions: ['80', '100', '120', '150', '200', '250', '300'],
  quantities: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000],
  customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
  pricing: {
    baseSetupCost: 200,
    costPerPage: 0.06,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1,
    wireBindingBaseCost: 80
  }
};

export default function WireQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved wire binding config:', formConfig);
      setConfig(formConfig);
    } else {
      console.log('📥 Loading default wire binding config');
      setConfig(DEFAULT_FORM_CONFIG);
    }
  }, [formConfig]);

  const updateNestedConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const array = current[keys[keys.length - 1]];
      if (array && array[index]) {
        array[index] = { ...array[index], [field]: value };
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
      if (!current[arrayKey]) current[arrayKey] = [];
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
      if (current[arrayKey] && Array.isArray(current[arrayKey])) {
        current[arrayKey] = current[arrayKey].filter((_, i) => i !== index);
      }
      return newConfig;
    });
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

  const renderEditableArray = (title, path, fields) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">{title}</h4>
        <button
          onClick={() => addArrayItem(path, fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}))}
          className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          <Plus size={14} className="mr-1" />
          Add New
        </button>
      </div>
      <div className="space-y-3">
        {(() => {
          const keys = path.split('.');
          let current = config;
          for (const key of keys) {
            current = current?.[key];
          }
          return current?.map((item, index) => (
            <div key={index} className="flex space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                {fields.map(field => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === 'price' || field === 'gsm' ? 'text' : 'text'}
                      value={item[field] || ''}
                      onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded self-start"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ));
        })()}
      </div>
    </div>
  );

  const renderPaperOptions = (type) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700 capitalize">{type} Paper Options</h4>
      {config.paperOptions?.[type]?.map((paper, index) => (
        <div key={index} className="flex space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
              <input
                type="text"
                value={paper.value || ''}
                onChange={(e) => updateArrayItem(`paperOptions.${type}`, index, 'value', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="e.g., MATTE"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
              <input
                type="text"
                value={paper.label || ''}
                onChange={(e) => updateArrayItem(`paperOptions.${type}`, index, 'label', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="e.g., Matte"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">GSM Options (comma separated)</label>
              <input
                type="text"
                value={paper.gsm?.join(', ') || ''}
                onChange={(e) => updateArrayItem(`paperOptions.${type}`, index, 'gsm', e.target.value.split(',').map(s => s.trim()))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="e.g., 200, 250, 300"
              />
            </div>
          </div>
          <button
            onClick={() => removeArrayItem(`paperOptions.${type}`, index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded self-start"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem(`paperOptions.${type}`, { value: '', label: '', gsm: [] })}
        className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
      >
        <Plus size={14} className="mr-1" />
        Add Paper Type
      </button>
    </div>
  );

  const renderAdditionalOptions = (type) => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700 capitalize">{type.replace(/([A-Z])/g, ' $1')}</h4>
      {renderEditableArray('', `additionalOptions.${type}`, ['value', 'label', 'price'])}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Wire Binding Quote Form Editor</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="flex space-x-8 overflow-x-auto">
            {[
              'general', 'binding', 'wire-colors', 'sizes', 'paper-cover', 'paper-inside', 
              'colors', 'finishes', 'cover-folds', 'additional',
              'page-counts', 'quantities', 'pricing'
            ].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
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
            <h3 className="text-lg font-semibold mb-4">Wire Binding Form Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Wire binding form preview would be rendered here</p>
              <p className="text-sm text-gray-400 mt-2">
                Configuration changes will be reflected in the actual wire binding form
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-3">Form Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'general', label: 'General Settings' },
                    { id: 'binding', label: 'Binding Options' },
                    { id: 'wire-colors', label: 'Wire Colors' },
                    { id: 'sizes', label: 'Size Options' },
                    { id: 'paper-cover', label: 'Cover Paper' },
                    { id: 'paper-inside', label: 'Inside Paper' },
                    { id: 'colors', label: 'Color Options' },
                    { id: 'finishes', label: 'Cover Finishes' },
                    { id: 'cover-folds', label: 'Cover Fold Options' },
                    { id: 'additional', label: 'Additional Services' },
                    { id: 'page-counts', label: 'Page Count Options' },
                    { id: 'quantities', label: 'Quantity Options' },
                    { id: 'pricing', label: 'Pricing Settings' },
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === section.id
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 space-y-6">
                  {activeTab === 'general' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Form Title
                        </label>
                        <input
                          type="text"
                          value={config.general?.title || ''}
                          onChange={(e) => updateNestedConfig('general.title', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
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
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Submit Button Text
                          </label>
                          <input
                            type="text"
                            value={config.general?.submitButtonText || ''}
                            onChange={(e) => updateNestedConfig('general.submitButtonText', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
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
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'binding' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Binding Options</h3>
                      {renderEditableArray('Binding Types', 'bindingTypes', ['value', 'label', 'link'])}
                      {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc', 'image'])}
                    </>
                  )}

                  {activeTab === 'wire-colors' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Wire Color Options</h3>
                      {renderEditableArray('Wire Colors', 'wireColors', ['value', 'label', 'color', 'image'])}
                    </>
                  )}

                  {activeTab === 'sizes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Size Options</h3>
                      {renderEditableArray('Available Sizes', 'sizes', ['value', 'label'])}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Size Instructions
                        </label>
                        <input
                          type="text"
                          value={config.customSizeInstructions || ''}
                          onChange={(e) => updateNestedConfig('customSizeInstructions', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'paper-cover' && renderPaperOptions('cover')}
                  {activeTab === 'paper-inside' && renderPaperOptions('inside')}

                  {activeTab === 'colors' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Color Options</h3>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'description'])}
                    </>
                  )}

                  {activeTab === 'finishes' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Finish Options</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price'])}
                    </>
                  )}

                  {activeTab === 'cover-folds' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Fold Options</h3>
                      {renderEditableArray('Cover Folds', 'coverFolds', ['value', 'label'])}
                    </>
                  )}

                  {activeTab === 'additional' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Additional Services</h3>
                      <div className="space-y-6">
                        {renderAdditionalOptions('proof')}
                        {renderAdditionalOptions('holePunch')}
                        {renderAdditionalOptions('slipcase')}
                        {renderAdditionalOptions('shrinkWrap')}
                        {renderAdditionalOptions('directMail')}
                      </div>
                    </>
                  )}

                  {activeTab === 'page-counts' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Page Count Options</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Page Counts</h4>
                          <button
                            onClick={() => addArrayItem('pageCounts', '')}
                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Page Count
                          </button>
                        </div>
                        <div className="space-y-2">
                          {config.pageCounts?.map((count, index) => (
                            <div key={index} className="flex space-x-2">
                              <input
                                type="number"
                                value={count}
                                onChange={(e) => {
                                  const newArray = [...config.pageCounts];
                                  newArray[index] = parseInt(e.target.value) || 0;
                                  updateNestedConfig('pageCounts', newArray);
                                }}
                                className="w-32 p-2 border border-gray-300 rounded text-sm"
                                placeholder="Page count"
                              />
                              <button
                                onClick={() => removeArrayItem('pageCounts', index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-3">Weight Options</h4>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Available GSM weights</span>
                          <button
                            onClick={() => addArrayItem('weightOptions', '')}
                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Weight
                          </button>
                        </div>
                        <div className="space-y-2">
                          {config.weightOptions?.map((weight, index) => (
                            <div key={index} className="flex space-x-2">
                              <input
                                type="text"
                                value={weight}
                                onChange={(e) => {
                                  const newArray = [...config.weightOptions];
                                  newArray[index] = e.target.value;
                                  updateNestedConfig('weightOptions', newArray);
                                }}
                                className="w-32 p-2 border border-gray-300 rounded text-sm"
                                placeholder="e.g., 120"
                              />
                              <button
                                onClick={() => removeArrayItem('weightOptions', index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'quantities' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Quantity Options</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-700">Available Quantities</h4>
                          <button
                            onClick={() => addArrayItem('quantities', '')}
                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Quantity
                          </button>
                        </div>
                        <div className="space-y-2">
                          {config.quantities?.map((qty, index) => (
                            <div key={index} className="flex space-x-2">
                              <input
                                type="number"
                                value={qty}
                                onChange={(e) => {
                                  const newArray = [...config.quantities];
                                  newArray[index] = parseInt(e.target.value) || 0;
                                  updateNestedConfig('quantities', newArray);
                                }}
                                className="w-32 p-2 border border-gray-300 rounded text-sm"
                                placeholder="Quantity"
                              />
                              <button
                                onClick={() => removeArrayItem('quantities', index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'pricing' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Pricing Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Base Setup Cost ($)
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.baseSetupCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
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
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Wire Binding Base Cost ($)
                          </label>
                          <input
                            type="number"
                            value={config.pricing?.wireBindingBaseCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.wireBindingBaseCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
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
                            className="w-full p-3 border border-gray-300 rounded-lg"
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
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
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