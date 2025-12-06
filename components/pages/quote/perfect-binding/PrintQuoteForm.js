// components/pages/quote/perfect-binding/PrintQuoteForm.js
import React, { useState, useCallback, useEffect } from 'react';

// ===== ENHANCED DEFAULT CONFIG =====
const PRINTQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Perfect Binding Book Printing Quote",
    description: "Configure your perfect bound book with our professional printing services. Get instant pricing and add to cart in minutes.",
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
      {
        value: 'GLOSS',
        label: 'Gloss',
        description: 'Brilliant-gloss, very affordable so highly used',
        price: 0
      },
      {
        value: 'MATTE',
        label: 'Matte',
        description: 'Highly used like Gloss',
        price: 0
      },
      {
        value: 'HI-PLUS',
        label: 'Hi-Plus',
        description: 'Thicker than Matte. Good printability',
        price: 50
      },
      {
        value: 'HI-QMATTE',
        label: 'Hi-Q Matte',
        description: 'Thicker than Matte, Premium grade',
        price: 100
      },
      {
        value: 'UNCOATED_W',
        label: 'Uncoated',
        description: 'Matte and very much used',
        price: 0
      },
      {
        value: 'MONTBLANC_EW',
        label: 'Premium',
        description: 'Used for high-end magazines and catalogs',
        price: 150
      },
      {
        value: 'NEWPLUS_W',
        label: 'New Plus',
        description: 'Affordable and suitable for mass printing',
        price: 0
      },
      {
        value: 'TEXTBOOK',
        label: 'Textbook',
        description: 'For educational book',
        price: 0
      },
      {
        value: 'TRANSLUCENT',
        label: 'Translucent',
        description: 'Translucent paper',
        price: 0
      },
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
  weightOptions: ['100', '120', '150', '250', '300'],
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
  },
  spineWidth: '0.178"',
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

// ===== PAPER WEIGHT CONVERSION DATA =====
const PAPER_WEIGHT_CONVERSIONS = {
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
  '180': { 
    gsm: '180 gsm',
    us: '67# cover',
    pt: '5.9 pt',
    kg: '155 kg'
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

// ===== SIZE CONVERSION DATA =====
const SIZE_CONVERSIONS = {
  INCH: {
    '5.5 x 8.5': '5.5" x 8.5"',
    '7.5 x 10': '7.5" x 10"',
    '8.5 x 11': '8.5" x 11"',
    '9 x 12': '9" x 12"',
    'A6': '4.13" x 5.83"',
    'A5': '5.83" x 8.27"',
    'A4': '8.27" x 11.69"',
    'B6': '5.04" x 7.17"',
    'B5': '7.17" x 10.12"',
    'B4': '10.12" x 14.33"',
    'Custom Size': 'Custom Size'
  },
  MM: {
    '5.5 x 8.5': '140 x 216 mm',
    '7.5 x 10': '191 x 254 mm',
    '8.5 x 11': '216 x 279 mm',
    '9 x 12': '229 x 305 mm',
    'A6': '105 x 148 mm',
    'A5': '148 x 210 mm',
    'A4': '210 x 297 mm',
    'B6': '128 x 182 mm',
    'B5': '182 x 257 mm',
    'B4': '257 x 364 mm',
    'Custom Size': 'Custom Size'
  }
};

// ===== UTILITY FUNCTIONS =====
const getPricingData = (basePrice = 2340) => {
  const quantities = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  return quantities.map((qty, index) => ({
    quantity: qty,
    price: `$${Math.round(basePrice * (1 + index * 0.05)).toLocaleString()}`,
    pricePerCopy: `$${(Math.round(basePrice * (1 + index * 0.05)) / qty).toFixed(2)}`,
    time: '5 business days'
  }));
};

const getOptionPrice = (options, selectedValue) => {
  if (!options || !Array.isArray(options)) return 0;
  const option = options.find(opt => opt.value === selectedValue);
  return option ? (option.price || 0) : 0;
};

const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

// ===== SHIPPING MODAL COMPONENT =====
const ShippingModal = ({ isOpen, onClose, formData }) => {
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('US');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingCost, setShippingCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
  ];

  const shippingMethods = [
    { value: 'standard', label: 'Standard Shipping', estimatedDays: '7-14 business days', baseCost: 25 },
    { value: 'express', label: 'Express Shipping', estimatedDays: '3-5 business days', baseCost: 45 },
    { value: 'priority', label: 'Priority Shipping', estimatedDays: '1-3 business days', baseCost: 75 },
    { value: 'overnight', label: 'Overnight Shipping', estimatedDays: '1 business day', baseCost: 120 },
  ];

  const calculateShipping = () => {
    if (!zipCode.trim()) {
      setError('Please enter a valid ZIP/Postal Code');
      return;
    }

    setLoading(true);
    setError('');
    
    // Mock shipping calculation based on quantity and weight
    setTimeout(() => {
      const baseWeight = (formData.quantity * 0.2) + (formData.pageCount * 0.01); // Simplified weight calculation
      let calculatedCost = 0;
      
      switch(shippingMethod) {
        case 'standard':
          calculatedCost = 25 + (baseWeight * 0.5);
          break;
        case 'express':
          calculatedCost = 45 + (baseWeight * 0.8);
          break;
        case 'priority':
          calculatedCost = 75 + (baseWeight * 1.2);
          break;
        case 'overnight':
          calculatedCost = 120 + (baseWeight * 2.0);
          break;
        default:
          calculatedCost = 25 + (baseWeight * 0.5);
      }
      
      // Add international premium
      if (country !== 'US') {
        calculatedCost *= 1.5;
      }
      
      setShippingCost({
        cost: calculatedCost.toFixed(2),
        estimatedDays: shippingMethods.find(m => m.value === shippingMethod)?.estimatedDays,
        method: shippingMethods.find(m => m.value === shippingMethod)?.label
      });
      setLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Calculate Shipping</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Quantity:</div>
              <div className="font-medium">{formData.quantity} books</div>
              <div className="text-gray-600">Pages:</div>
              <div className="font-medium">{formData.pageCount} pages</div>
              <div className="text-gray-600">Size:</div>
              <div className="font-medium">{formData.selectedSize}</div>
              <div className="text-gray-600">Weight:</div>
              <div className="font-medium">~{(formData.quantity * 0.2 + formData.pageCount * 0.01).toFixed(1)} kg</div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your ZIP/Postal Code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Method
              </label>
              <div className="space-y-2">
                {shippingMethods.map((method) => (
                  <label 
                    key={method.value}
                    className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      shippingMethod === method.value 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.value}
                        checked={shippingMethod === method.value}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="form-radio text-indigo-600 h-4 w-4"
                      />
                      <div className="ml-3">
                        <span className="font-medium text-gray-900">{method.label}</span>
                        <p className="text-sm text-gray-600">{method.estimatedDays}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-indigo-600">${method.baseCost}+</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateShipping}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : (
              'Calculate Shipping Cost'
            )}
          </button>

          {/* Shipping Result */}
          {shippingCost && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-green-900 mb-2">Shipping Cost Calculated</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping Method:</span>
                  <span className="font-medium">{shippingCost.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Estimated Delivery:</span>
                  <span className="font-medium">{shippingCost.estimatedDays}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-green-200">
                  <span className="text-lg font-bold text-gray-900">Shipping Cost:</span>
                  <span className="text-xl font-bold text-green-600">${shippingCost.cost}</span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  This is an estimated shipping cost. Final cost may vary based on exact dimensions and weight.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {shippingCost && (
              <button
                onClick={() => {
                  // Add shipping to order
                  alert(`Shipping added: $${shippingCost.cost} for ${shippingCost.method}`);
                  onClose();
                }}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add Shipping to Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== PAPER WEIGHT SELECTOR COMPONENT =====
const PaperWeightSelector = ({ paperUnit, weightValue, onChange, label = "" }) => {
  const getWeightOptions = () => {
    return Object.keys(PAPER_WEIGHT_CONVERSIONS).map(key => {
      const conversion = PAPER_WEIGHT_CONVERSIONS[key];
      let labelText = '';
      
      switch(paperUnit) {
        case 'GSM':
          labelText = conversion.gsm;
          break;
        case 'US':
          labelText = conversion.us;
          break;
        case 'PT':
          labelText = conversion.pt;
          break;
        case 'KG':
          labelText = conversion.kg;
          break;
        default:
          labelText = conversion.gsm;
      }
      
      return {
        value: key,
        label: labelText
      };
    });
  };

  return (
    <div>
      {label && <p className="text-sm font-semibold mb-2 text-gray-700 opacity-0">{label}</p>}
      <select
        value={weightValue}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
      >
        {getWeightOptions().map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ===== REUSABLE COMPONENTS =====
const RadioGroup = ({ label, name, options, selected, onChange, className = "" }) => (
  <div className={`flex items-center space-x-4 ${className}`}>
    <p className="text-sm font-semibold text-gray-700 min-w-20">{label}:</p>
    <div className="flex flex-wrap gap-4">
      {options && options.map((option) => (
        <label key={option.value} className="inline-flex items-center cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={onChange}
            className="form-radio text-indigo-600 h-4 w-4 border-gray-300 focus:ring-indigo-500 transition"
          />
          <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const SelectDropdown = ({ label, options, selected, onChange, className = "", disabled = false, showDescription = false }) => {
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (value && typeof value === 'object' && value.value) return value.value;
    return '';
  };

  const stringValue = getStringValue(selected);
  const selectedOption = options?.find(opt => opt.value === stringValue);

  return (
    <div className={className}>
      {label && <p className="text-sm font-semibold mb-2 text-gray-700">{label}</p>}
      <select
        value={stringValue}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {options && options.map((option, index) => {
          let value, labelText;
          
          if (typeof option === 'string') {
            value = option;
            labelText = option;
          } else if (typeof option === 'object') {
            value = option.value || option;
            labelText = option.label || option.value || option;
          } else {
            value = option;
            labelText = option;
          }

          value = String(value);
          labelText = String(labelText);

          return (
            <option key={`${value}-${index}`} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
      {showDescription && selectedOption?.description && (
        <p className="text-xs text-gray-500 mt-1">{selectedOption.description}</p>
      )}
    </div>
  );
};

const ToggleOption = ({ label, enabled, onToggle, children, className = "" }) => (
  <div className={`border-2 rounded-xl p-4 transition-all duration-200 ${className} ${
    enabled ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 bg-white'
  }`}>
    <label className="flex items-center space-x-3 mb-3 cursor-pointer">
      <input 
        type="checkbox" 
        checked={enabled}
        onChange={onToggle}
        className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition"
      />
      <span className="font-semibold text-gray-800 text-sm">{label}</span>
    </label>
    {enabled && children}
  </div>
);

// ===== DUST COVER COMPONENT =====
const DustCoverSettings = ({ dustCover, onUpdate, onRemove, paperUnit }) => {
  const handleChange = (field, value) => {
    onUpdate({ ...dustCover, [field]: value });
  };

  const handleNumberInput = (field, value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleChange(field, value);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-200 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">📄</span>
          Dust Cover Settings
        </h4>
        <button 
          onClick={onRemove}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove dust cover"
        >
          <span className="text-xl">×</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Size</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Flap width, inches"
                value={dustCover.width}
                onChange={(e) => handleNumberInput('width', e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Height, inches"
                value={dustCover.height}
                onChange={(e) => handleNumberInput('height', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Additional protective cover that wraps around the book
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Paper Settings</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SelectDropdown
              options={PRINTQUOTE_DEFAULT_CONFIG.paperOptions.cover}
              selected={dustCover.paper}
              onChange={(e) => handleChange('paper', e.target.value)}
              className="w-full"
              showDescription={true}
            />
            <PaperWeightSelector
              paperUnit={paperUnit}
              weightValue={dustCover.gsm}
              onChange={(e) => handleChange('gsm', e.target.value)}
            />
            <SelectDropdown
              options={PRINTQUOTE_DEFAULT_CONFIG.printColors}
              selected={dustCover.printColor}
              onChange={(e) => handleChange('printColor', e.target.value)}
              className="w-full"
            />
            <SelectDropdown
              options={PRINTQUOTE_DEFAULT_CONFIG.coverFinishes}
              selected={dustCover.finish}
              onChange={(e) => handleChange('finish', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== SUBSCRIPTION CARD COMPONENT =====
const SubscriptionCard = ({ card, index, onUpdate, onRemove, pageCount, positions, paperUnit }) => {
  const handleChange = (field, value) => {
    onUpdate(index, { ...card, [field]: value });
  };

  const handleNumberInput = (field, value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleChange(field, value);
    }
  };

  const positionOptions = positions.map(opt => ({
    ...opt,
    label: opt.value === 'BACK' ? `After page ${pageCount}` : opt.label
  }));

  return (
    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-200 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-gray-800">Subscription Card {index + 1}</h4>
        <button 
          onClick={() => onRemove(index)}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove subscription card"
        >
          <span className="text-xl">×</span>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Size</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Width, inches"
                value={card.width}
                onChange={(e) => handleNumberInput('width', e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Height, inches"
                value={card.height}
                onChange={(e) => handleNumberInput('height', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Insert card dimensions (usually smaller than page size)
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Position</label>
          <div className="grid grid-cols-2 gap-4">
            <SelectDropdown
              options={positionOptions}
              selected={card.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="w-full"
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Page number"
              value={card.selectedPage}
              onChange={(e) => handleNumberInput('selectedPage', e.target.value)}
              disabled={card.position !== 'SELECT'}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Paper Settings</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SelectDropdown
              options={PRINTQUOTE_DEFAULT_CONFIG.paperOptions.subscription}
              selected={card.paper}
              onChange={(e) => handleChange('paper', e.target.value)}
              className="w-full"
            />
            <PaperWeightSelector
              paperUnit={paperUnit}
              weightValue={card.gsm}
              onChange={(e) => handleChange('gsm', e.target.value)}
            />
            <SelectDropdown
              options={PRINTQUOTE_DEFAULT_CONFIG.printColors}
              selected={card.printColor}
              onChange={(e) => handleChange('printColor', e.target.value)}
              className="w-full"
            />
            <SelectDropdown
              options={PRINTQUOTE_DEFAULT_CONFIG.coverFinishes.filter(opt => opt.value !== 'NONE')}
              selected={card.finish}
              onChange={(e) => handleChange('finish', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== ADD-ON MODAL COMPONENT =====
const AddOnModal = ({ isOpen, onClose, onSelectAddOn }) => {
  const [selectedAddOn, setSelectedAddOn] = useState('');
  
  const addOnOptions = [
    { id: 'FOIL_STAMPING', label: 'Foil Stamping', description: 'Add metallic foil stamping to cover', price: 50 },
    { id: 'EMBOSSING', label: 'Embossing', description: 'Raised texture design on cover', price: 40 },
    { id: 'DEBOSSING', label: 'Debossing', description: 'Indented texture design on cover', price: 40 },
    { id: 'SPOT_UV', label: 'Spot UV', description: 'Glossy coating on specific areas', price: 30 },
    { id: 'DIE_CUTTING', label: 'Die Cutting', description: 'Custom shape cutting', price: 60 },
    { id: 'PERFORATION', label: 'Perforation', description: 'Easy tear-off sections', price: 25 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Add Additional Features</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <span className="text-2xl">×</span>
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          {addOnOptions.map((option) => (
            <div 
              key={option.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedAddOn === option.id 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedAddOn(option.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{option.label}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-indigo-600">${option.price}</span>
                  {selectedAddOn === option.id ? (
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (selectedAddOn) {
                const selected = addOnOptions.find(opt => opt.id === selectedAddOn);
                onSelectAddOn(selected);
                onClose();
              }
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!selectedAddOn}
          >
            Add Feature
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
const PrintQuoteForm = () => {
  // Configuration state
  const [formConfig, setFormConfig] = useState(PRINTQUOTE_DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [configVersion, setConfigVersion] = useState(0);

  // Form State Management
  const [bindingType, setBindingType] = useState('PERFECT');
  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('GSM');
  const [selectedSize, setSelectedSize] = useState('8.5 x 11');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [bindingEdge, setBindingEdge] = useState('LEFT');
  
  // Cover State
  const [coverPaper, setCoverPaper] = useState('MATTE');
  const [coverWeight, setCoverWeight] = useState('250');
  const [coverColor, setCoverColor] = useState('CMYK');
  const [coverFinish, setCoverFinish] = useState('MATTE');
  const [coverFold, setCoverFold] = useState('NONE');
  const [foldWidth, setFoldWidth] = useState('');
  
  // Dust Cover State
  const [dustCover, setDustCover] = useState(null);
  
  // Inside Page State
  const [pageCount, setPageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [insideWeight, setInsideWeight] = useState('100');
  const [insideColor, setInsideColor] = useState('CMYK');
  
  // Subscription Cards State
  const [subscriptionCards, setSubscriptionCards] = useState([]);
  
  // Add-ons State
  const [addOns, setAddOns] = useState([]);
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  
  // Shipping Modal State
  const [showShippingModal, setShowShippingModal] = useState(false);

  // Quantity & Options State
  const [quantity, setQuantity] = useState(200);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(1);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '6' });
  const [slipcase, setSlipcase] = useState('NONE');
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '1' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });

// Email submission states 
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Derived State
  const isCustomSize = selectedSize === 'Custom Size';
  const [pricingData, setPricingData] = useState(getPricingData());

  // Available sizes based on unit
  const availableSizes = sizeUnit === 'INCH' 
    ? ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', 'A6', 'A5', 'A4', 'B6', 'B5', 'B4', 'Custom Size']
    : ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', 'A6', 'A5', 'A4', 'B6', 'B5', 'B4', 'Custom Size'];

  // Get display label for size
  const getSizeDisplayLabel = (size) => {
    return SIZE_CONVERSIONS[sizeUnit]?.[size] || size;
  };

  // Fetch form configuration
  const fetchFormConfig = async () => {
    try {
      console.log('🔄 Fetching perfect binding form configuration from API...');
      const res = await fetch('/api/forms/print-quote');
      
      if (res.ok) {
        const apiConfig = await res.json();
        console.log('📥 Perfect binding API Response received');
        
        if (apiConfig && Object.keys(apiConfig).length > 0) {
          console.log('✅ Using perfect binding API configuration');
          
          const mergedConfig = {
            ...PRINTQUOTE_DEFAULT_CONFIG,
            ...apiConfig,
            general: {
              ...PRINTQUOTE_DEFAULT_CONFIG.general,
              ...apiConfig.general
            },
            paperOptions: {
              ...PRINTQUOTE_DEFAULT_CONFIG.paperOptions,
              ...apiConfig.paperOptions
            },
            additionalOptions: {
              ...PRINTQUOTE_DEFAULT_CONFIG.additionalOptions,
              ...apiConfig.additionalOptions
            },
            pricing: {
              ...PRINTQUOTE_DEFAULT_CONFIG.pricing,
              ...apiConfig.pricing
            }
          };
          
          setFormConfig(mergedConfig);
        } else {
          console.log('⚠️ API returned empty, using perfect binding defaults');
          setFormConfig(PRINTQUOTE_DEFAULT_CONFIG);
        }
      } else {
        console.log('❌ API error, using perfect binding defaults');
        setFormConfig(PRINTQUOTE_DEFAULT_CONFIG);
      }
    } catch (error) {
      console.error('❌ Error fetching perfect binding form configuration:', error);
      setFormConfig(PRINTQUOTE_DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormConfig();
  }, [configVersion]);

  // Configuration constants
  const BINDING_TYPES = formConfig?.bindingTypes || PRINTQUOTE_DEFAULT_CONFIG.bindingTypes;
  const BINDING_EDGES = formConfig?.bindingEdges || PRINTQUOTE_DEFAULT_CONFIG.bindingEdges;
  const PAPER_OPTIONS = formConfig?.paperOptions || PRINTQUOTE_DEFAULT_CONFIG.paperOptions;
  const PRINT_COLORS = formConfig?.printColors || PRINTQUOTE_DEFAULT_CONFIG.printColors;
  const COVER_FINISHES = formConfig?.coverFinishes || PRINTQUOTE_DEFAULT_CONFIG.coverFinishes;
  const COVER_FOLDS = formConfig?.coverFolds || PRINTQUOTE_DEFAULT_CONFIG.coverFolds;
  const ADDITIONAL_OPTIONS = formConfig?.additionalOptions || PRINTQUOTE_DEFAULT_CONFIG.additionalOptions;
  const POSITIONS = formConfig?.positions || PRINTQUOTE_DEFAULT_CONFIG.positions;
  const PAGE_COUNTS = formConfig?.pageCounts || PRINTQUOTE_DEFAULT_CONFIG.pageCounts;
  const WEIGHT_OPTIONS = formConfig?.weightOptions || PRINTQUOTE_DEFAULT_CONFIG.weightOptions;
  const QUANTITIES = formConfig?.quantities || PRINTQUOTE_DEFAULT_CONFIG.quantities;

  const generalSettings = formConfig?.general || PRINTQUOTE_DEFAULT_CONFIG.general;
  const customSizeInstructions = formConfig?.customSizeInstructions || PRINTQUOTE_DEFAULT_CONFIG.customSizeInstructions;
  const spineWidth = formConfig?.spineWidth || PRINTQUOTE_DEFAULT_CONFIG.spineWidth;

  const refreshConfig = () => {
    console.log('🔄 Manually refreshing configuration...');
    setConfigVersion(prev => prev + 1);
  };

  // Handlers
  const handleNumberInput = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleQuantityInput = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? 0 : parseInt(value);
      setQuantity(numValue);
      
      let closestIndex = 0;
      let minDiff = Infinity;
      
      pricingData.forEach((item, index) => {
        const diff = Math.abs(item.quantity - numValue);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });
      
      setSelectedQuantityIndex(closestIndex);
    }
  };

  const handleQuantitySelect = (index) => {
    setSelectedQuantityIndex(index);
    setQuantity(pricingData[index].quantity);
  };

  // Dust Cover Management
  const addDustCover = () => {
    setDustCover({
      width: '',
      height: '',
      paper: 'GLOSS',
      gsm: '150',
      printColor: 'CMYK',
      finish: 'MATTE'
    });
  };

  const updateDustCover = (updatedDustCover) => {
    setDustCover(updatedDustCover);
  };

  const removeDustCover = () => {
    setDustCover(null);
  };

  // Subscription Card Management
  const addSubscriptionCard = () => {
    const maxCards = formConfig?.maxSubscriptionCards || 10;
    if (subscriptionCards.length < maxCards) {
      const newCard = {
        id: Date.now(),
        width: '', height: '', position: 'FRONT', selectedPage: '',
        paper: 'MATTE', gsm: '100', printColor: 'CMYK', finish: 'NONE'
      };
      setSubscriptionCards([...subscriptionCards, newCard]);
    }
  };

  const updateSubscriptionCard = (index, updatedCard) => {
    const updatedCards = [...subscriptionCards];
    updatedCards[index] = updatedCard;
    setSubscriptionCards(updatedCards);
  };

  const removeSubscriptionCard = (index) => {
    setSubscriptionCards(subscriptionCards.filter((_, i) => i !== index));
  };

  // Add-ons Management
  const handleAddOnSelect = (addOn) => {
    setAddOns([...addOns, { ...addOn, id: Date.now() }]);
  };

  const removeAddOn = (id) => {
    setAddOns(addOns.filter(addOn => addOn.id !== id));
  };

  // Price Calculation - FIXED
  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.05;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 200;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.2;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.1;
    const dustCoverBaseCost = formConfig?.pricing?.dustCoverBaseCost || 100;
    const dustCoverPerCopy = formConfig?.pricing?.dustCoverPerCopy || 0.25;
    const subscriptionCardBaseCost = formConfig?.pricing?.subscriptionCardBaseCost || 25;
    const subscriptionCardPerCopy = formConfig?.pricing?.subscriptionCardPerCopy || 0.02;
    
    // Base printing cost: setup + (pages × cost per page × quantity)
    let basePrintCost = baseSetupCost + (pageCount * baseCostPerPage * quantity);
    
    // Apply size multipliers
    if (isCustomSize) {
      basePrintCost *= customSizeMultiplier;
    } else if (selectedSize !== '8.5 x 11' && selectedSize !== 'A4') {
      // Apply standard size multiplier for non-standard sizes
      basePrintCost *= standardSizeMultiplier;
    }
    
    // Get option costs
    const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
    const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
    const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
    const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
    const coverFinishCost = getOptionPrice(COVER_FINISHES, coverFinish);
    const coverFoldCost = getOptionPrice(COVER_FOLDS, coverFold);
    const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
    const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
    const dustCoverCost = dustCover ? dustCoverBaseCost + (quantity * dustCoverPerCopy) : 0;
    const subscriptionCardCost = subscriptionCards.length > 0 ? 
      (subscriptionCardBaseCost * subscriptionCards.length) + (quantity * subscriptionCardPerCopy * subscriptionCards.length) : 0;
    const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.shrinkWrap, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    const directMailUnitCost = directMailing.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.directMail, directMailing.type) : 0;
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;
    const addOnsCost = addOns.reduce((total, addOn) => total + addOn.price, 0);

    // Categorize costs
    const materialCost = coverPaperCost + insidePaperCost;
    const colorCost = coverColorCost + insideColorCost;
    const coverCost = coverFinishCost + coverFoldCost;
    const additionalServicesCost = proofCost + holePunchCost + dustCoverCost + subscriptionCardCost + 
                                 slipcaseCost + shrinkWrapCost + directMailCost + addOnsCost;

    const totalAmount = basePrintCost + materialCost + colorCost + coverCost + additionalServicesCost;

    return {
      basePrinting: basePrintCost,
      materials: materialCost,
      color: colorCost,
      cover: coverCost,
      proof: proofCost,
      holePunching: holePunchCost,
      dustCover: dustCoverCost,
      subscriptionCards: subscriptionCardCost,
      slipcase: slipcaseCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      addOns: addOnsCost,
      total: totalAmount,
    };
  }, [
    pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper, 
    coverColor, insideColor, coverFinish, coverFold, proof, holePunching,
    dustCover, subscriptionCards.length, slipcase, shrinkWrapping, directMailing, addOns, formConfig
  ]);

  const prices = calculatePricing();

  // Update pricing data when configuration changes
  useEffect(() => {
    const calculatePriceForQuantity = (qty) => {
      const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.05;
      const baseSetupCost = formConfig?.pricing?.baseSetupCost || 200;
      const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.2;
      const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.1;
      
      let basePrintCost = baseSetupCost + (pageCount * baseCostPerPage * qty);
      
      if (isCustomSize) {
        basePrintCost *= customSizeMultiplier;
      } else if (selectedSize !== '8.5 x 11' && selectedSize !== 'A4') {
        basePrintCost *= standardSizeMultiplier;
      }
      
      // Add all other costs (simplified for pricing table)
      const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
      const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
      const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
      const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
      const coverFinishCost = getOptionPrice(COVER_FINISHES, coverFinish);
      const coverFoldCost = getOptionPrice(COVER_FOLDS, coverFold);
      const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
      const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
      const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
      
      const additionalCosts = coverPaperCost + insidePaperCost + coverColorCost + insideColorCost + 
                            coverFinishCost + coverFoldCost + proofCost + holePunchCost + slipcaseCost;
      
      const total = basePrintCost + additionalCosts;
      
      return {
        quantity: qty,
        price: `$${Math.round(total).toLocaleString()}`,
        pricePerCopy: `$${(total / qty).toFixed(2)}`,
        time: '5 business days'
      };
    };

    const quantities = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const newPricingData = quantities.map(qty => calculatePriceForQuantity(qty));
    setPricingData(newPricingData);
  }, [pageCount, selectedSize, isCustomSize, coverPaper, insidePaper, coverColor, insideColor, coverFinish, coverFold, proof, holePunching, slipcase, formConfig]);

  const handleAddToCart = async () => {
  const formData = {
    bindingType,
    sizeUnit,
    paperUnit,
    selectedSize,
    customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
    bindingEdge,
    spineWidth: formConfig.spineWidth || '0.178"',
    cover: { 
      paper: coverPaper, 
      weight: coverWeight, 
      color: coverColor, 
      finish: coverFinish, 
      fold: coverFold, 
      foldWidth,
      dustCover: dustCover 
    },
    inside: { 
      pageCount, 
      paper: insidePaper, 
      weight: insideWeight, 
      color: insideColor, 
      subscriptionCards 
    },
    quantity,
    options: { 
      proof, 
      holePunching, 
      slipcase, 
      shrinkWrapping, 
      directMailing,
      addOns
    },
    totalAmount: prices.total.toFixed(2),
  };
  
  console.log("Perfect Binding Form Data Submitted:", formData);
  
  setSubmitting(true);
  setSubmitStatus(null);
  
  try {
    // Send email to your address
    const emailResponse = await fetch('/api/send-quote/print-quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const emailResult = await emailResponse.json();
    
    if (emailResponse.ok) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Perfect binding quote sent successfully! We\'ll contact you soon.' 
      });
      alert(`Perfect binding quote sent! Total Price: ${formatCurrency(prices.total)}`);
    } else {
      setSubmitStatus({ 
        type: 'error', 
        message: emailResult.message || 'Failed to send quote request.' 
      });
      alert('Failed to send quote request. Please try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    setSubmitStatus({ 
      type: 'error', 
      message: 'An error occurred. Please try again.' 
    });
    alert('Error submitting quote. Please try again.');
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading form configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <AddOnModal 
        isOpen={showAddOnModal}
        onClose={() => setShowAddOnModal(false)}
        onSelectAddOn={handleAddOnSelect}
      />
      
      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        formData={{ quantity, pageCount, selectedSize }}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {generalSettings.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {generalSettings.description}
          </p>
        </div>

        {/* Binding Type Selection */}
        {/* <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {BINDING_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => window.location.href = type.link || '#'}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  bindingType === type.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Unit Selection */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Measurement Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <RadioGroup
              label="Size Unit"
              name="size_type_sel"
              options={[{ value: 'INCH', label: 'Inch' }, { value: 'MM', label: 'Millimeter' }]}
              selected={sizeUnit}
              onChange={(e) => setSizeUnit(e.target.value)}
            />
            <RadioGroup
              label="Paper Unit"
              name="weight_type_sel"
              options={[
                { value: 'GSM', label: 'Grammage (gsm)' },
                { value: 'US', label: 'US Weight (lb)' },
                { value: 'PT', label: 'Caliper (point)' },
                { value: 'KG', label: 'Japan Weight (kg)' },
              ]}
              selected={paperUnit}
              onChange={(e) => setPaperUnit(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left & Middle Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Size & Binding Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Size Selection */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📐</span>
                  Size & Dimensions
                </h3>
                <SelectDropdown
                  label="Select Standard Size"
                  options={availableSizes.map(s => ({ 
                    value: s, 
                    label: getSizeDisplayLabel(s)
                  }))}
                  selected={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    if (e.target.value !== 'Custom Size') {
                      setCustomWidth('');
                      setCustomHeight('');
                    }
                  }}
                />
                {isCustomSize && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <input
                        type="text"
                        value={customWidth}
                        onChange={handleNumberInput(setCustomWidth)}
                        placeholder={`Width (${sizeUnit === 'INCH' ? 'inches' : 'mm'})`}
                        className="p-3 border border-indigo-500 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                      <input
                        type="text"
                        value={customHeight}
                        onChange={handleNumberInput(setCustomHeight)}
                        placeholder={`Height (${sizeUnit === 'INCH' ? 'inches' : 'mm'})`}
                        className="p-3 border border-indigo-500 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      {customSizeInstructions[sizeUnit] || customSizeInstructions.INCH}
                    </p>
                  </>
                )}
              </div>

              {/* Binding Edge */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📖</span>
                  Binding Details
                </h3>
                <SelectDropdown
                  label="Binding Edge"
                  options={BINDING_EDGES}
                  selected={bindingEdge}
                  onChange={(e) => setBindingEdge(e.target.value)}
                />
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Spine Width:</span> {spineWidth}
                  </p>
                </div>
              </div>
            </div>

            {/* Cover Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">📔</span>
                  Cover Specifications
                </h3>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
                    View Portfolio
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
                    Paper Samples
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SelectDropdown 
                  label="Paper Type" 
                  options={PAPER_OPTIONS.cover} 
                  selected={coverPaper} 
                  onChange={(e) => setCoverPaper(e.target.value)}
                  showDescription={true}
                />
                <PaperWeightSelector
                  paperUnit={paperUnit}
                  label='Weight'
                  weightValue={coverWeight}
                  onChange={(e) => setCoverWeight(e.target.value)}
                />
                <SelectDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS} 
                  selected={coverColor} 
                  onChange={(e) => setCoverColor(e.target.value)} 
                />
                <SelectDropdown 
                  label="Cover Finish" 
                  options={COVER_FINISHES} 
                  selected={coverFinish} 
                  onChange={(e) => setCoverFinish(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <SelectDropdown 
                  label="Cover Fold" 
                  options={COVER_FOLDS} 
                  selected={coverFold} 
                  onChange={(e) => setCoverFold(e.target.value)} 
                />
                {coverFold !== 'NONE' && (
                  <div>
                    <label className="text-sm font-semibold mb-2 text-gray-700">Fold Width</label>
                    <input
                      type="text"
                      placeholder="Enter fold width in inches"
                      value={foldWidth}
                      onChange={handleNumberInput(setFoldWidth)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                )}
              </div>

              {/* Add-ons Display */}
              {addOns.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Selected Add-ons</h4>
                  <div className="flex flex-wrap gap-2">
                    {addOns.map((addOn) => (
                      <div key={addOn.id} className="flex items-center bg-green-50 text-green-800 px-3 py-2 rounded-lg">
                        <span className="font-medium">{addOn.label}</span>
                        <span className="ml-2 font-semibold">${addOn.price}</span>
                        <button 
                          onClick={() => removeAddOn(addOn.id)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <span>×</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowAddOnModal(true)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  + Additional Add-ons
                </button>
                {!dustCover ? (
                  <button 
                    onClick={addDustCover}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    + Add Dust Cover
                  </button>
                ) : (
                  <button 
                    onClick={removeDustCover}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    ✓ Dust Cover Added
                  </button>
                )}
              </div>

              {/* Dust Cover Settings */}
              {dustCover && (
                <DustCoverSettings 
                  dustCover={dustCover}
                  onUpdate={updateDustCover}
                  onRemove={removeDustCover}
                  paperUnit={paperUnit}
                />
              )}
            </div>

            {/* Inside Page Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">📄</span>
                  Inside Pages
                </h3>
                <button 
                  onClick={addSubscriptionCard}
                  disabled={subscriptionCards.length >= (formConfig?.maxSubscriptionCards || 10)}
                  className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  + Add Subscription Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SelectDropdown
                  label="Page Count"
                  options={PAGE_COUNTS.map(c => ({ value: c, label: `${c} pages` }))}
                  selected={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                />
                <SelectDropdown 
                  label="Paper Type" 
                  options={PAPER_OPTIONS.inside} 
                  selected={insidePaper} 
                  onChange={(e) => setInsidePaper(e.target.value)} 
                  showDescription={false}
                />
                <PaperWeightSelector
                  label="Paper Weight" 
                  paperUnit={paperUnit}
                  weightValue={insideWeight}
                  onChange={(e) => setInsideWeight(e.target.value)}
                />
                <SelectDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS} 
                  selected={insideColor} 
                  onChange={(e) => setInsideColor(e.target.value)} 
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Note:</span> Please select only inside page count. Cover pages are calculated separately.
                </p>
              </div>

              {/* Subscription Cards */}
              {subscriptionCards.map((card, index) => (
                <SubscriptionCard
                  key={card.id}
                  card={card}
                  index={index}
                  onUpdate={updateSubscriptionCard}
                  onRemove={removeSubscriptionCard}
                  pageCount={pageCount}
                  positions={POSITIONS}
                  paperUnit={paperUnit}
                />
              ))}

              <div className="flex flex-wrap gap-4 mt-6">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Edit Page Layout
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  View Paper Gallery
                </button>
                <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Download Guide
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Options */}
          <div className="space-y-8">
            
            {/* Quantity Input */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🔢</span>
                Quantity
              </h3>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityInput}
                className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg font-semibold text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter quantity"
              />
            </div>

            {/* Pricing Table */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Volume Pricing</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800 space-y-1">
                  <p className="flex items-center">
                    <span className="mr-2">⏰</span>
                    Production time excludes weekends and holidays
                  </p>
                  <p>• Printing occurs on weekdays only</p>
                  <p>• Process starts after final proof approval and payment</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Per Copy</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pricingData.map((item, index) => (
                      <tr 
                        key={index}
                        className={`cursor-pointer transition-all ${
                          selectedQuantityIndex === index 
                            ? 'bg-indigo-50 border-l-4 border-l-indigo-500' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleQuantitySelect(index)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-indigo-600 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                          {item.pricePerCopy}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                          {item.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                Additional Services
              </h3>
              
              <div className="space-y-6">
                <SelectDropdown 
                  label="Proof Type" 
                  options={ADDITIONAL_OPTIONS.proof} 
                  selected={proof} 
                  onChange={(e) => setProof(e.target.value)} 
                />

                <ToggleOption
                  label="Hole Punching"
                  enabled={holePunching.enabled}
                  onToggle={(e) => setHolePunching(prev => ({ ...prev, enabled: e.target.checked }))}
                >
                  <SelectDropdown 
                    options={ADDITIONAL_OPTIONS.holePunch} 
                    selected={holePunching.type} 
                    onChange={(e) => setHolePunching(prev => ({ ...prev, type: e.target.value }))} 
                  />
                </ToggleOption>

                <SelectDropdown 
                  label="Slipcase" 
                  options={ADDITIONAL_OPTIONS.slipcase} 
                  selected={slipcase} 
                  onChange={(e) => setSlipcase(e.target.value)} 
                />

                <ToggleOption
                  label="Shrink Wrapping"
                  enabled={shrinkWrapping.enabled}
                  onToggle={(e) => setShrinkWrapping(prev => ({ ...prev, enabled: e.target.checked }))}
                >
                  <SelectDropdown 
                    options={ADDITIONAL_OPTIONS.shrinkWrap} 
                    selected={shrinkWrapping.type} 
                    onChange={(e) => setShrinkWrapping(prev => ({ ...prev, type: e.target.value }))} 
                  />
                </ToggleOption>

                <ToggleOption
                  label="Direct Mailing"
                  enabled={directMailing.enabled}
                  onToggle={(e) => setDirectMailing(prev => ({ ...prev, enabled: e.target.checked }))}
                >
                  <SelectDropdown 
                    options={ADDITIONAL_OPTIONS.directMail} 
                    selected={directMailing.type} 
                    onChange={(e) => setDirectMailing(prev => ({ ...prev, type: e.target.value }))} 
                  />
                </ToggleOption>
              </div>

              {/* Price Breakdown */}
              <div className="mt-8 border-t pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h4>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Base Printing', value: prices.basePrinting },
                    { label: 'Premium Materials', value: prices.materials, show: prices.materials > 0 },
                    { label: 'Color Options', value: prices.color, show: prices.color > 0 },
                    { label: 'Cover Finishes', value: prices.cover, show: prices.cover > 0 },
                    { label: 'Digital Proof', value: prices.proof, show: prices.proof > 0 },
                    { label: 'Hole Punching', value: prices.holePunching, show: prices.holePunching > 0 },
                    { label: 'Dust Cover', value: prices.dustCover, show: prices.dustCover > 0 },
                    { label: `Subscription Cards (${subscriptionCards.length})`, value: prices.subscriptionCards, show: prices.subscriptionCards > 0 },
                    { label: `Add-ons (${addOns.length})`, value: prices.addOns, show: prices.addOns > 0 },
                    { label: 'Slipcase', value: prices.slipcase, show: prices.slipcase > 0 },
                    { label: 'Shrink Wrapping', value: prices.shrinkWrapping, show: prices.shrinkWrapping > 0 },
                    { label: 'Direct Mailing', value: prices.directMailing, show: prices.directMailing > 0 },
                  ].map((item, index) => 
                    item.show !== false && (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    )
                  )}
                  
                  <div className="flex justify-between items-center pt-4 mt-3 border-t border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-indigo-600">{formatCurrency(prices.total)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
<div className="flex flex-col sm:flex-row gap-4 mt-8">
  <button 
    onClick={() => setShowShippingModal(true)}
    disabled={submitting}
    className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {generalSettings.shippingButtonText}
  </button>
  <button 
    onClick={handleAddToCart}
    disabled={submitting}
    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
  >
    {submitting ? (
      <>
        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Quote...
      </>
    ) : (
      generalSettings.submitButtonText
    )}
  </button>
</div>

{/* Status Message */}
{submitStatus && (
  <div className={`mt-4 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
    <div className="flex items-center">
      {submitStatus.type === 'success' ? (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      <span>{submitStatus.message}</span>
    </div>
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQuoteForm;