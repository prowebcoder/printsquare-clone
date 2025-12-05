// components/admin/SaddleQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, RefreshCw } from 'lucide-react';

// Default configuration for saddle stitching (updated to match your form)
const DEFAULT_FORM_CONFIG = {
  general: {
    title: "Saddle Stitching Book Printing Quote",
    description: "Configure your perfect saddle stitched book with our professional printing services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  bindingTypes: [
    { value: 'PERFECT', label: 'Perfect Binding', link: '/perfect-binding' },
    { value: 'SADDLE', label: 'Saddle Stitching', link: '/saddle-stitching' },
    { value: 'HARDCOVER', label: 'Hardcover Book', link: '/hardcover-book' },
    { value: 'WIRE', label: 'Wire Binding', link: '/wire-binding' },
  ],
  bindingEdges: [
    { value: 'LEFT', label: 'Left Side', desc: 'Binding on the left, most common' },
    { value: 'RIGHT', label: 'Right Side', desc: 'First inside page starts from the right' },
    { value: 'TOP', label: 'Top Side', desc: 'Binding on the top, a.k.a calendar binding' },
  ],
  paperOptions: {
    cover: [
      { value: 'MATTE', label: 'Matte', description: 'Highly used like Gloss', price: 0 },
      { value: 'GLOSS', label: 'Gloss', description: 'Brilliant-gloss, very affordable so highly used', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', description: 'Thicker than Matte. Good printability', price: 50 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', description: 'Thicker than Matte, Premium grade', price: 100 },
      { value: 'PREMIUM', label: 'Premium', description: 'Used for high-end magazines and catalogs', price: 150 },
    ],
    inside: [
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', price: 25 },
      { value: 'UNCOATED', label: 'Uncoated', price: 0 },
      { value: 'TEXTBOOK', label: 'Textbook', price: 30 },
      { value: 'COLORED', label: 'Colored', price: 40 },
    ],
    subscription: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 25 },
      { value: 'UNCOATED_W', label: 'Uncoated', price: 0 },
      { value: 'MONTBLANC_EW', label: 'Premium', price: 50 },
    ]
  },
  printColors: [
    { value: 'CMYK', label: 'Full color', price: 0 },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', price: 75 },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', price: 150 },
    { value: 'BW', label: 'Black only', price: -100 },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color', price: -25 },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color', price: 50 },
  ],
  coverFinishes: [
    { value: 'MATTE', label: 'Matte lamination', price: 50 },
    { value: 'GLOSS', label: 'Gloss lamination', price: 50 },
    { value: 'NONE', label: 'None', price: 0 },
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
      { value: '6', label: '0.236" (6mm) drill', price: 15 },
      { value: '8', label: '0.315" (8mm) drill', price: 20 },
      { value: '9.5', label: '0.374" (9.5mm) drill', price: 25 },
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
    { value: 'BACK', label: 'After page 96' },
    { value: 'SELECT', label: 'Front of page no.' },
  ],
  pageCounts: Array.from({ length: (880 - 24) / 2 + 1 }, (_, i) => 24 + i * 2),
  weightOptions: ['100', '120', '150', '180', '200', '250', '300'],
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
  },
  spineWidth: '0.178"',
  maxSubscriptionCards: 10,
  pricing: {
    baseSetupCost: 200,
    costPerPage: 0.05,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1,
    dustCoverBaseCost: 100,
    dustCoverPerCopy: 0.25,
    subscriptionCardBaseCost: 25,
    subscriptionCardPerCopy: 0.02
  }
};

export default function SaddleQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(DEFAULT_FORM_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('cover');

  // Initialize with saved config or defaults
  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      setConfig(formConfig);
    }
  }, [formConfig]);

  const updateNestedConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
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
      await onSave(config);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  const renderEditableArray = (title, path, fields, descriptionField = false) => {
    const getNestedArray = (obj, path) => {
      const keys = path.split('.');
      let current = obj;
      for (const key of keys) {
        if (current && current[key] !== undefined) {
          current = current[key];
        } else {
          return [];
        }
      }
      return Array.isArray(current) ? current : [];
    };

    const currentArray = getNestedArray(config, path);
    const itemTemplate = fields.reduce((acc, field) => ({
      ...acc,
      [field]: field === 'price' ? 0 : field === 'link' ? '' : ''
    }), {});

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => addArrayItem(path, itemTemplate)}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            <Plus size={14} className="mr-1" />
            Add New
          </button>
        </div>
        <div className="space-y-3">
          {currentArray.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium text-gray-500">Item #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {fields.map(field => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === 'price' ? 'number' : 'text'}
                      value={item[field] === undefined ? '' : item[field]}
                      onChange={(e) => updateArrayItem(path, index, field,
                        field === 'price' ? parseFloat(e.target.value) || 0 : e.target.value
                      )}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
                {descriptionField && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Description
                    </label>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => updateArrayItem(path, index, 'description', e.target.value)}
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Enter description"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSimpleArray = (title, path, placeholder = "Enter value") => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">{title}</h4>
        <button
          onClick={() => addArrayItem(path, '')}
          className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          <Plus size={14} className="mr-1" />
          Add New
        </button>
      </div>
      <div className="space-y-2">
        {config[path]?.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type={path === 'pageCounts' || path === 'quantities' || path === 'weightOptions' ? 'number' : 'text'}
              value={item}
              onChange={(e) => {
                const newArray = [...config[path]];
                newArray[index] = path === 'pageCounts' || path === 'quantities' || path === 'weightOptions' 
                  ? parseInt(e.target.value) || e.target.value 
                  : e.target.value;
                updateNestedConfig(path, newArray);
              }}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder={placeholder}
            />
            <button
              onClick={() => removeArrayItem(path, index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdditionalOptions = () => {
    const options = [
      { key: 'proof', label: 'Proof Options', path: 'additionalOptions.proof' },
      { key: 'holePunch', label: 'Hole Punch Options', path: 'additionalOptions.holePunch' },
      { key: 'slipcase', label: 'Slipcase Options', path: 'additionalOptions.slipcase' },
      { key: 'shrinkWrap', label: 'Shrink Wrap Options', path: 'additionalOptions.shrinkWrap' },
      { key: 'directMail', label: 'Direct Mail Options', path: 'additionalOptions.directMail' },
    ];

    return (
      <div className="space-y-6">
        {options.map((option) => (
          <div key={option.key} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3">{option.label}</h4>
            {renderEditableArray('', option.path, ['value', 'label', 'price'])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Saddle Stitching Quote Form Editor</h1>
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
                className={`flex items-center px-4 py-2 text-white rounded-lg ${saving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 overflow-x-auto">
            {[
              'general', 'binding', 'paper', 'colors', 'cover-finishing',
              'additional', 'positions', 'page-counts', 'weight', 'quantities',
              'custom-size', 'pricing', 'other'
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
            <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Saddle Stitching Form preview would be rendered here</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-3">Form Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'general', label: 'General Settings' },
                    { id: 'binding', label: 'Binding Types & Edges' },
                    { id: 'paper', label: 'Paper Options' },
                    { id: 'colors', label: 'Print Colors' },
                    { id: 'cover-finishing', label: 'Cover Finishing' },
                    { id: 'additional', label: 'Additional Options' },
                    { id: 'positions', label: 'Card Positions' },
                    { id: 'page-counts', label: 'Page Counts' },
                    { id: 'weight', label: 'Weight Options' },
                    { id: 'quantities', label: 'Quantity Options' },
                    { id: 'custom-size', label: 'Custom Size Instructions' },
                    { id: 'pricing', label: 'Pricing Settings' },
                    { id: 'other', label: 'Other Settings' },
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

            {/* Editor Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 space-y-6">
                  {/* General Tab */}
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Saddle Stitching Quote"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Configure your perfect booklet..."
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Add to Cart"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Calculate Shipping"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Binding Tab */}
                  {activeTab === 'binding' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Binding Settings</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Binding Types</h4>
                          {renderEditableArray('', 'bindingTypes', ['value', 'label', 'link'])}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Binding Edges</h4>
                          {renderEditableArray('', 'bindingEdges', ['value', 'label', 'desc'])}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Paper Options Tab */}
                  {activeTab === 'paper' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Paper Options</h3>
                      <div className="mb-4">
                        <div className="flex space-x-2 mb-4">
                          {['cover', 'inside', 'subscription'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setActiveSubTab(type)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                                activeSubTab === type
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {type} Paper
                            </button>
                          ))}
                        </div>
                        {activeSubTab === 'cover' && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-3">Cover Paper Options</h4>
                            {renderEditableArray('', 'paperOptions.cover', ['value', 'label', 'price'], true)}
                          </div>
                        )}
                        {activeSubTab === 'inside' && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-3">Inside Paper Options</h4>
                            {renderEditableArray('', 'paperOptions.inside', ['value', 'label', 'price'])}
                          </div>
                        )}
                        {activeSubTab === 'subscription' && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-3">Subscription Card Paper Options</h4>
                            {renderEditableArray('', 'paperOptions.subscription', ['value', 'label', 'price'])}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Colors Tab */}
                  {activeTab === 'colors' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Print Color Options</h3>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price'])}
                    </>
                  )}

                  {/* Cover Finishing Tab */}
                  {activeTab === 'cover-finishing' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Cover Finishing Options</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Cover Finishes</h4>
                          {renderEditableArray('', 'coverFinishes', ['value', 'label', 'price'])}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Cover Folds</h4>
                          {renderEditableArray('', 'coverFolds', ['value', 'label', 'price'])}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Additional Options Tab */}
                  {activeTab === 'additional' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Additional Options</h3>
                      {renderAdditionalOptions()}
                    </>
                  )}

                  {/* Positions Tab */}
                  {activeTab === 'positions' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Subscription Card Positions</h3>
                      {renderEditableArray('Available Positions', 'positions', ['value', 'label'])}
                    </>
                  )}

                  {/* Page Counts Tab */}
                  {activeTab === 'page-counts' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Page Counts</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Saddle stitching requires page counts to be multiples of 4 (e.g., 24, 28, 32... up to 880).
                      </p>
                      {renderSimpleArray('Available Page Counts', 'pageCounts', 'Enter page count (e.g., 24, 96, 880)')}
                    </>
                  )}

                  {/* Weight Options Tab */}
                  {activeTab === 'weight' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Paper Weight Options</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        These values correspond to the keys in PAPER_WEIGHT_CONVERSIONS.
                      </p>
                      {renderSimpleArray('Available Weight Options', 'weightOptions', 'Enter weight value (e.g., 100, 120, 150)')}
                    </>
                  )}

                  {/* Quantities Tab */}
                  {activeTab === 'quantities' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Quantity Options</h3>
                      {renderSimpleArray('Available Quantities', 'quantities', 'Enter quantity (e.g., 100, 500, 1000)')}
                    </>
                  )}

                  {/* Custom Size Instructions Tab */}
                  {activeTab === 'custom-size' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Custom Size Instructions</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inch Unit Instructions
                          </label>
                          <input
                            type="text"
                            value={config.customSizeInstructions?.INCH || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.INCH', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder='📏 Minimum: 4" × 4" | Maximum: 11.8" × 14.3"'
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Millimeter Unit Instructions
                          </label>
                          <input
                            type="text"
                            value={config.customSizeInstructions?.MM || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.MM', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Pricing Tab */}
                  {activeTab === 'pricing' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Pricing Settings</h3>
                      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Base Setup Cost ($)</label>
                          <input
                            type="number"
                            value={config.pricing?.baseSetupCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cost Per Page ($)</label>
                          <input
                            type="number"
                            step="0.001"
                            value={config.pricing?.costPerPage || 0}
                            onChange={(e) => updateNestedConfig('pricing.costPerPage', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="0.05"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Custom Size Multiplier</label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.customSizeMultiplier || 1.0}
                            onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1.0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="1.2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Standard Size Multiplier</label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.standardSizeMultiplier || 1.0}
                            onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1.0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="1.1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Dust Cover Base Cost ($)</label>
                          <input
                            type="number"
                            value={config.pricing?.dustCoverBaseCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.dustCoverBaseCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Dust Cover Per Copy ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.dustCoverPerCopy || 0}
                            onChange={(e) => updateNestedConfig('pricing.dustCoverPerCopy', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="0.25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Card Base Cost ($)</label>
                          <input
                            type="number"
                            value={config.pricing?.subscriptionCardBaseCost || 0}
                            onChange={(e) => updateNestedConfig('pricing.subscriptionCardBaseCost', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Card Per Copy ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={config.pricing?.subscriptionCardPerCopy || 0}
                            onChange={(e) => updateNestedConfig('pricing.subscriptionCardPerCopy', parseFloat(e.target.value) || 0)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="0.02"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Other Settings Tab */}
                  {activeTab === 'other' && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900">Other Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Spine Width
                          </label>
                          <input
                            type="text"
                            value={config.spineWidth || ''}
                            onChange={(e) => updateNestedConfig('spineWidth', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder='0.178"'
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Subscription Cards
                          </label>
                          <input
                            type="number"
                            value={config.maxSubscriptionCards || 10}
                            onChange={(e) => updateNestedConfig('maxSubscriptionCards', parseInt(e.target.value) || 10)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="10"
                          />
                          <p className="text-xs text-gray-500 mt-1">Maximum number of subscription cards allowed per order</p>
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