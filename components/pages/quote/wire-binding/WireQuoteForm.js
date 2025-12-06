// components/pages/quote/wire-binding/WireQuoteForm.js
'use client';
import { useState, useCallback, useEffect } from 'react';

// ===== WIRE BINDING CONFIG =====
const WIREQUOTE_DEFAULT_CONFIG = {
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
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'HI-QMYSTIC', label: 'Hi-Q Mystic', price: 25 },
      { value: 'UNCOATED_W', label: 'Uncoated White', price: 0 }
    ],
    inside: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', price: 20 },
      { value: 'UNCOATED_W', label: 'Uncoated White', price: 0 }
    ]
  },
  printColors: [
    { value: 'CMYK', label: 'Full color', price: 0 },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', price: 75 },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', price: 150 },
    { value: 'BW', label: 'Black only', price: -100 },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color', price: -25 },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color', price: 50 }
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
  weightOptions: ['80', '100', '120', '150', '200', '250', '300'],
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

// ===== PAPER WEIGHT CONVERSION DATA =====
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

// ===== SIZE CONVERSION DATA =====
const SIZE_CONVERSIONS = {
  INCH: {
    '8.5x11-letter': '8.5" x 11" (Letter)',
    '8.5x11-standard': '8.5" x 11"',
    '5.5x8.5': '5.5" x 8.5" (Half Letter)',
    '6x9': '6" x 9"',
    '7x10': '7" x 10"',
    '9x12': '9" x 12"',
    'A6': '4.13" x 5.83"',
    'A5': '5.83" x 8.27"',
    'A4': '8.27" x 11.69"',
    'B6': '5.04" x 7.17"',
    'B5': '7.17" x 10.12"',
    'B4': '10.12" x 14.33"',
    'custom': 'Custom Size'
  },
  MM: {
    '8.5x11-letter': '216 x 279 mm (Letter)',
    '8.5x11-standard': '216 x 279 mm',
    '5.5x8.5': '140 x 216 mm (Half Letter)',
    '6x9': '152 x 229 mm',
    '7x10': '178 x 254 mm',
    '9x12': '229 x 305 mm',
    'A6': '105 x 148 mm',
    'A5': '148 x 210 mm',
    'A4': '210 x 297 mm',
    'B6': '128 x 182 mm',
    'B5': '182 x 257 mm',
    'B4': '257 x 364 mm',
    'custom': 'Custom Size'
  }
};

// ===== UTILITY FUNCTIONS =====
const getPricingData = (basePrice = 1200) => {
  const quantities = [200, 300, 400, 500, 600, 700, 800, 900, 1000];
  return quantities.map((qty, index) => ({
    quantity: qty,
    price: `$${Math.round(basePrice * (1 + index * 0.04)).toLocaleString()}`,
    pricePerCopy: `$${(Math.round(basePrice * (1 + index * 0.04)) / qty).toFixed(2)}`,
    time: '10-12 business days'
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
      const baseWeight = (formData.quantity * 0.15) + (formData.pageCount * 0.008); // Simplified weight calculation
      let calculatedCost = 0;
      
      switch(shippingMethod) {
        case 'standard':
          calculatedCost = 25 + (baseWeight * 0.4);
          break;
        case 'express':
          calculatedCost = 45 + (baseWeight * 0.7);
          break;
        case 'priority':
          calculatedCost = 75 + (baseWeight * 1.0);
          break;
        case 'overnight':
          calculatedCost = 120 + (baseWeight * 1.8);
          break;
        default:
          calculatedCost = 25 + (baseWeight * 0.4);
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
              <div className="font-medium">{formData.quantity} copies</div>
              <div className="text-gray-600">Pages:</div>
              <div className="font-medium">{formData.pageCount} pages</div>
              <div className="text-gray-600">Size:</div>
              <div className="font-medium">{formData.selectedSize}</div>
              <div className="text-gray-600">Weight:</div>
              <div className="font-medium">~{(formData.quantity * 0.15 + formData.pageCount * 0.008).toFixed(1)} kg</div>
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
const PaperWeightSelector = ({ paperUnit, weightValue, onChange, label = "", availableWeights = null }) => {
  const getWeightOptions = () => {
    let weightKeys = availableWeights || Object.keys(PAPER_WEIGHT_CONVERSIONS);
    
    return weightKeys.map(key => {
      const conversion = PAPER_WEIGHT_CONVERSIONS[key];
      if (!conversion) return null;
      
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
    }).filter(Boolean);
  };

  const options = getWeightOptions();
  
  // If current weight value is not in available options, select the first available
  useEffect(() => {
    if (options.length > 0 && !options.find(opt => opt.value === weightValue)) {
      onChange({ target: { value: options[0].value } });
    }
  }, [options, weightValue, onChange]);

  return (
    <div>
      {label && <p className="text-sm font-semibold mb-2 text-gray-700 opacity-0">{label}</p>}
      <select
        value={weightValue}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
        disabled={options.length === 0}
      >
        {options.map((option, index) => (
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
        <option value="">Choose...</option>
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

const BindingEdgeSelector = ({ label, options, selected, onChange, className = "" }) => (
  <div className={className}>
    {label && <p className="text-sm font-semibold mb-3 text-gray-700">{label}</p>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options && options.map((option) => (
        <div
          key={option.value}
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selected === option.value
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500 ring-opacity-20'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onChange({ target: { value: option.value } })}
        >
          <div className="flex items-center space-x-3">
            {option.image && (
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">Edge</span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{option.label}</p>
              <p className="text-xs text-gray-600 mt-1">{option.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ===== MAIN COMPONENT =====
const WireQuoteForm = () => {
  const [formConfig, setFormConfig] = useState(WIREQUOTE_DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [configVersion, setConfigVersion] = useState(0);

  // Form State Management
  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('GSM');
  const [selectedSize, setSelectedSize] = useState('8.5x11-standard');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [bindingEdge, setBindingEdge] = useState('LEFT');
  const [wireColor, setWireColor] = useState('BLACK');
  
  // Cover State
  const [coverPaper, setCoverPaper] = useState('MATTE');
  const [coverWeight, setCoverWeight] = useState('300');
  const [coverColor, setCoverColor] = useState('CMYK');
  const [coverFinish, setCoverFinish] = useState('NONE');
  const [coverFold, setCoverFold] = useState('NONE');
  const [foldWidth, setFoldWidth] = useState('');
  
  // Inside Page State
  const [pageCount, setPageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [insideWeight, setInsideWeight] = useState('100');
  const [insideColor, setInsideColor] = useState('CMYK');
  
  // Quantity & Options State
  const [quantity, setQuantity] = useState(200);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(0);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '6' });
  const [slipcase, setSlipcase] = useState('NONE');
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '1' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });
  
  // Shipping Modal State
  const [showShippingModal, setShowShippingModal] = useState(false);

// Email submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Derived State
  const isCustomSize = selectedSize === 'custom';
  const [pricingData, setPricingData] = useState(getPricingData());



  // Available sizes based on unit
  const availableSizes = [
    '8.5x11-letter', '8.5x11-standard', '5.5x8.5', '6x9', '7x10', '9x12',
    'A6', 'A5', 'A4', 'B6', 'B5', 'B4', 'custom'
  ];

  // Get display label for size
  const getSizeDisplayLabel = (size) => {
    return SIZE_CONVERSIONS[sizeUnit]?.[size] || size;
  };

  // Fetch form configuration
  const fetchFormConfig = async () => {
    try {
      console.log('🔄 Fetching wire binding form configuration from API...');
      const res = await fetch('/api/admin/forms/wire-quote');
      
      if (res.ok) {
        const apiConfig = await res.json();
        console.log('📥 Wire Binding API Response received');
        
        if (apiConfig && Object.keys(apiConfig).length > 0) {
          console.log('✅ Using wire binding API configuration');
          
          const mergedConfig = {
            ...WIREQUOTE_DEFAULT_CONFIG,
            ...apiConfig,
            general: {
              ...WIREQUOTE_DEFAULT_CONFIG.general,
              ...apiConfig.general
            },
            paperOptions: {
              ...WIREQUOTE_DEFAULT_CONFIG.paperOptions,
              ...apiConfig.paperOptions
            },
            additionalOptions: {
              ...WIREQUOTE_DEFAULT_CONFIG.additionalOptions,
              ...apiConfig.additionalOptions
            },
            pricing: {
              ...WIREQUOTE_DEFAULT_CONFIG.pricing,
              ...apiConfig.pricing
            }
          };
          
          setFormConfig(mergedConfig);
        } else {
          console.log('⚠️ API returned empty, using wire binding defaults');
          setFormConfig(WIREQUOTE_DEFAULT_CONFIG);
        }
      } else {
        console.log('❌ API error, using wire binding defaults');
        setFormConfig(WIREQUOTE_DEFAULT_CONFIG);
      }
    } catch (error) {
      console.error('❌ Error fetching wire binding form configuration:', error);
      setFormConfig(WIREQUOTE_DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormConfig();
  }, [configVersion]);

  // Configuration constants
  const BINDING_TYPES = formConfig?.bindingTypes || WIREQUOTE_DEFAULT_CONFIG.bindingTypes;
  const BINDING_EDGES = formConfig?.bindingEdges || WIREQUOTE_DEFAULT_CONFIG.bindingEdges;
  const WIRE_COLORS = formConfig?.wireColors || WIREQUOTE_DEFAULT_CONFIG.wireColors;
  const PAPER_OPTIONS = formConfig?.paperOptions || WIREQUOTE_DEFAULT_CONFIG.paperOptions;
  const PRINT_COLORS = formConfig?.printColors || WIREQUOTE_DEFAULT_CONFIG.printColors;
  const COVER_FINISHES = formConfig?.coverFinishes || WIREQUOTE_DEFAULT_CONFIG.coverFinishes;
  const COVER_FOLDS = formConfig?.coverFolds || WIREQUOTE_DEFAULT_CONFIG.coverFolds;
  const ADDITIONAL_OPTIONS = formConfig?.additionalOptions || WIREQUOTE_DEFAULT_CONFIG.additionalOptions;
  const PAGE_COUNTS = formConfig?.pageCounts || WIREQUOTE_DEFAULT_CONFIG.pageCounts;
  const WEIGHT_OPTIONS = formConfig?.weightOptions || WIREQUOTE_DEFAULT_CONFIG.weightOptions;
  const QUANTITIES = formConfig?.quantities || WIREQUOTE_DEFAULT_CONFIG.quantities;

  const generalSettings = formConfig?.general || WIREQUOTE_DEFAULT_CONFIG.general;
  const customSizeInstructions = formConfig?.customSizeInstructions || WIREQUOTE_DEFAULT_CONFIG.customSizeInstructions;

  const refreshConfig = () => {
    console.log('🔄 Manually refreshing wire binding configuration...');
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

  // Price Calculation - FIXED
  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.06;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 150;
    const wireBindingBaseCost = formConfig?.pricing?.wireBindingBaseCost || 50;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.2;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.1;
    
    // Base printing cost: setup + wire binding + (pages × cost per page × quantity)
    let basePrintCost = baseSetupCost + wireBindingBaseCost + (pageCount * baseCostPerPage * quantity);
    
    // Apply size multipliers
    if (isCustomSize) {
      basePrintCost *= customSizeMultiplier;
    } else if (selectedSize !== '8.5x11-standard' && selectedSize !== 'A4') {
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
    const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.shrinkWrap, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    const directMailUnitCost = directMailing.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.directMail, directMailing.type) : 0;
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;

    // Categorize costs
    const materialCost = coverPaperCost + insidePaperCost;
    const colorCost = coverColorCost + insideColorCost + coverFinishCost + coverFoldCost;
    const additionalServicesCost = proofCost + holePunchCost + slipcaseCost + shrinkWrapCost + directMailCost;

    const totalAmount = basePrintCost + materialCost + colorCost + additionalServicesCost;

    return {
      basePrinting: basePrintCost,
      materials: materialCost,
      color: colorCost,
      proof: proofCost,
      holePunching: holePunchCost,
      slipcase: slipcaseCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      total: totalAmount,
    };
  }, [
    pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper, 
    coverColor, insideColor, coverFinish, coverFold, proof, holePunching,
    slipcase, shrinkWrapping, directMailing, formConfig
  ]);

  const prices = calculatePricing();

  // Update pricing data when configuration changes
  useEffect(() => {
    const calculatePriceForQuantity = (qty) => {
      const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.06;
      const baseSetupCost = formConfig?.pricing?.baseSetupCost || 150;
      const wireBindingBaseCost = formConfig?.pricing?.wireBindingBaseCost || 50;
      const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.2;
      const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.1;
      
      let basePrintCost = baseSetupCost + wireBindingBaseCost + (pageCount * baseCostPerPage * qty);
      
      if (isCustomSize) {
        basePrintCost *= customSizeMultiplier;
      } else if (selectedSize !== '8.5x11-standard' && selectedSize !== 'A4') {
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
        time: '10-12 business days'
      };
    };

    const quantities = [200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const newPricingData = quantities.map(qty => calculatePriceForQuantity(qty));
    setPricingData(newPricingData);
  }, [pageCount, selectedSize, isCustomSize, coverPaper, insidePaper, coverColor, insideColor, coverFinish, coverFold, proof, holePunching, slipcase, formConfig]);

  const handleAddToCart = async () => {
  const formData = {
    sizeUnit,
    paperUnit,
    selectedSize,
    customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
    bindingEdge,
    wireColor,
    cover: { 
      paper: coverPaper, 
      weight: coverWeight, 
      color: coverColor, 
      finish: coverFinish, 
      fold: coverFold, 
      foldWidth 
    },
    inside: { 
      pageCount, 
      paper: insidePaper, 
      weight: insideWeight, 
      color: insideColor 
    },
    quantity,
    options: { 
      proof, 
      holePunching, 
      slipcase, 
      shrinkWrapping, 
      directMailing
    },
    totalAmount: prices.total.toFixed(2),
  };
  
  console.log("Wire Binding Form Data Submitted:", formData);
  
  setSubmitting(true);
  setSubmitStatus(null);
  
  try {
    // Send email to your address
    const emailResponse = await fetch('/api/send-quote/wire-quote', {
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
        message: 'Wire binding quote sent successfully! We\'ll contact you soon.' 
      });
      alert(`Wire binding quote sent! Total Price: ${formatCurrency(prices.total)}`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-8 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading wire binding form configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        formData={{ quantity, pageCount, selectedSize: getSizeDisplayLabel(selectedSize) }}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {generalSettings.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {generalSettings.description}
          </p>
        </div>

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
          <div className="lg:col-span-2 space-y-8">
            
            {/* Size & Binding Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Size Selection */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
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
                    if (e.target.value !== 'custom') {
                      setCustomWidth('');
                      setCustomHeight('');
                    }
                  }}
                />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <input
                    type="text"
                    value={isCustomSize ? customWidth : ''}
                    onChange={handleNumberInput(setCustomWidth)}
                    placeholder={`Width (${sizeUnit === 'INCH' ? 'inches' : 'mm'})`}
                    className={`p-3 border rounded-lg text-sm transition-all ${
                      isCustomSize 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500 ring-opacity-20' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                    readOnly={!isCustomSize}
                  />
                  <input
                    type="text"
                    value={isCustomSize ? customHeight : ''}
                    onChange={handleNumberInput(setCustomHeight)}
                    placeholder={`Height (${sizeUnit === 'INCH' ? 'inches' : 'mm'})`}
                    className={`p-3 border rounded-lg text-sm transition-all ${
                      isCustomSize 
                        ? 'bg-white border-indigo-500 ring-2 ring-indigo-500 ring-opacity-20' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                    readOnly={!isCustomSize}
                  />
                </div>
                {isCustomSize && (
                  <p className="text-xs text-gray-500 mt-3">
                    {customSizeInstructions[sizeUnit] || customSizeInstructions.INCH}
                  </p>
                )}
              </div>

              {/* Binding Edge */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Binding Details
                </h3>
                
                <BindingEdgeSelector
                  label="Binding Edge"
                  options={BINDING_EDGES}
                  selected={bindingEdge}
                  onChange={(e) => setBindingEdge(e.target.value)}
                />

                <div className="mt-4">
                  <SelectDropdown
                    label="Wire Color"
                    options={WIRE_COLORS}
                    selected={wireColor}
                    onChange={(e) => setWireColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Cover Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
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
                />
                <PaperWeightSelector
                  paperUnit={paperUnit}
                  label="Paper Weight"
                  weightValue={coverWeight}
                  onChange={(e) => setCoverWeight(e.target.value)}
                  availableWeights={['200', '250', '300']}
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
                
                <div>
                  <label className="text-sm font-semibold mb-2 text-gray-700">Fold Width</label>
                  <input
                    type="text"
                    value={coverFold !== 'NONE' ? foldWidth : ''}
                    onChange={handleNumberInput(setFoldWidth)}
                    placeholder="Enter fold width"
                    className={`w-full p-3 border rounded-lg text-sm transition-all ${
                      coverFold !== 'NONE'
                        ? 'bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' 
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                    readOnly={coverFold === 'NONE'}
                  />
                </div>
              </div>
            </div>

            {/* Inside Page Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Inside Pages
                </h3>
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
                />
                <PaperWeightSelector
                  paperUnit={paperUnit}
                  label="Paper Weight"
                  weightValue={insideWeight}
                  onChange={(e) => setInsideWeight(e.target.value)}
                  availableWeights={['80', '100', '120']}
                />
                <SelectDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS} 
                  selected={insideColor} 
                  onChange={(e) => setInsideColor(e.target.value)} 
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please select only the inside page count. Cover pages are calculated separately.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Options */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
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

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Volume Pricing</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800 space-y-1">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
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
                    { label: 'Digital Proof', value: prices.proof, show: prices.proof > 0 },
                    { label: 'Hole Punching', value: prices.holePunching, show: prices.holePunching > 0 },
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

export default WireQuoteForm;