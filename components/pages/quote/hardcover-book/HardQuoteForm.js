// components/pages/quote/hardcover/HardQuoteForm.js
'use client';
import { useState, useCallback, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// ===== DEFAULT CONFIG =====
const HARDQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Hardcover Book Printing Quote",
    description: "Configure your perfect hardcover book with our professional printing services. Get instant pricing and add to cart in minutes.",
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
    { value: 'SQUARE', label: 'Square Spine', desc: 'Standard square spine' },
    { value: 'ROUNDED', label: 'Rounded Spine', desc: 'Premium rounded spine' },
  ],
  paperOptions: {
    cover: [
      { value: 'MATTE', label: 'Matte', description: 'Matte finish, professional look' },
      { value: 'GLOSS', label: 'Gloss', description: 'Glossy finish, vibrant colors' },
      { value: 'UNCOATED', label: 'Uncoated', description: 'Natural paper feel' },
      { value: 'PAPERCLOTH_GLOSS', label: 'Papercloth Gloss', description: 'Premium papercloth with gloss finish' }
    ],
    inside: [
      { value: 'MATTE', label: 'Matte', description: 'Matte finish, reduces glare' },
      { value: 'GLOSS', label: 'Gloss', description: 'Glossy finish, vibrant printing' },
      { value: 'UNCOATED', label: 'Uncoated', description: 'Natural, uncoated paper' }
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
  ],
  headbandColors: [
    { value: 'RD30', label: 'Red', color: '#ff0000' },
    { value: 'BL30', label: 'Blue', color: '#0000ff' },
    { value: 'GN30', label: 'Green', color: '#00ff00' },
    { value: 'BK30', label: 'Black', color: '#000000' },
    { value: 'GY30', label: 'Gray', color: '#808080' }
  ],
  bookmarkOptions: [
    { value: '', label: 'None' },
    { value: 'Y', label: 'Add: same color as headband' }
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
  pageCounts: [36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160],
  weightOptions: ['80', '100', '120', '150', '200'],
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
  },
  spineWidth: '0.178"',
  pricing: {
    baseSetupCost: 300,
    costPerPage: 0.08,
    customSizeMultiplier: 1.3,
    standardSizeMultiplier: 1.2,
    hardcoverBaseCost: 150,
    dustCoverBaseCost: 100,
    dustCoverPerCopy: 0.25,
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
  }
};

// ===== SIZE CONVERSION DATA =====
const SIZE_CONVERSIONS = {
  INCH: {
    '5.5x8.5': '5.5" x 8.5" (Half Letter)',
    '6x9': '6" x 9"',
    '7x10': '7" x 10"',
    '8.5x11-letter': '8.5" x 11" (Letter)',
    '8.5x11-standard': '8.5" x 11"',
    '9x12': '9" x 12"',
    'custom': 'Custom Size'
  },
  MM: {
    '5.5x8.5': '140 x 216 mm (Half Letter)',
    '6x9': '152 x 229 mm',
    '7x10': '178 x 254 mm',
    '8.5x11-letter': '216 x 279 mm (Letter)',
    '8.5x11-standard': '216 x 279 mm',
    '9x12': '229 x 305 mm',
    'custom': 'Custom Size'
  }
};

// ===== UTILITY FUNCTIONS =====
const getPricingData = (basePrice = 2340) => {
  const quantities = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  return quantities.map((qty, index) => ({
    quantity: qty,
    price: `$${Math.round(basePrice * (1 + index * 0.05)).toLocaleString()}`,
    pricePerCopy: `$${(Math.round(basePrice * (1 + index * 0.05)) / qty).toFixed(2)}`,
    time: '15-18 business days'
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
    { value: 'standard', label: 'Standard Shipping', estimatedDays: '10-14 business days', baseCost: 35 },
    { value: 'express', label: 'Express Shipping', estimatedDays: '5-7 business days', baseCost: 65 },
    { value: 'priority', label: 'Priority Shipping', estimatedDays: '3-5 business days', baseCost: 95 },
    { value: 'overnight', label: 'Overnight Shipping', estimatedDays: '1-2 business days', baseCost: 150 },
  ];

  const calculateShipping = () => {
    if (!zipCode.trim()) {
      setError('Please enter a valid ZIP/Postal Code');
      return;
    }

    setLoading(true);
    setError('');
    
    // Mock shipping calculation for hardcover books
    setTimeout(() => {
      // Hardcover books are heavier than perfect bound
      const baseWeight = (formData.quantity * 0.3) + (formData.pageCount * 0.015);
      let calculatedCost = 0;
      
      switch(shippingMethod) {
        case 'standard':
          calculatedCost = 35 + (baseWeight * 0.7);
          break;
        case 'express':
          calculatedCost = 65 + (baseWeight * 1.0);
          break;
        case 'priority':
          calculatedCost = 95 + (baseWeight * 1.5);
          break;
        case 'overnight':
          calculatedCost = 150 + (baseWeight * 2.5);
          break;
        default:
          calculatedCost = 35 + (baseWeight * 0.7);
      }
      
      // Add international premium
      if (country !== 'US') {
        calculatedCost *= 1.8; // Hardcover books cost more to ship internationally
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
              <div className="font-medium">{formData.quantity} hardcover books</div>
              <div className="text-gray-600">Pages:</div>
              <div className="font-medium">{formData.pageCount} pages</div>
              <div className="text-gray-600">Size:</div>
              <div className="font-medium">{formData.selectedSize}</div>
              <div className="text-gray-600">Weight:</div>
              <div className="font-medium">~{(formData.quantity * 0.3 + formData.pageCount * 0.015).toFixed(1)} kg</div>
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
                  Note: Hardcover books require special packaging and handling.
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
const PaperWeightSelector = ({ paperUnit, weightValue, onChange, label = "", options = [] }) => {
  const getWeightOptions = () => {
    if (options && options.length > 0) {
      return options.map(weight => {
        const conversion = PAPER_WEIGHT_CONVERSIONS[weight] || { gsm: `${weight} gsm`, us: `${weight} gsm`, pt: `${weight} gsm`, kg: `${weight} gsm` };
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
          value: weight,
          label: labelText
        };
      });
    }
    
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
                Protective cover that wraps around the hardcover book
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Paper Settings</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={dustCover.paper}
              onChange={(e) => handleChange('paper', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
            >
              <option value="MATTE">Matte</option>
              <option value="GLOSS">Gloss</option>
              <option value="UNCOATED">Uncoated</option>
              <option value="PAPERCLOTH_GLOSS">Papercloth Gloss</option>
            </select>
            <PaperWeightSelector
              paperUnit={paperUnit}
              weightValue={dustCover.gsm}
              onChange={(e) => handleChange('gsm', e.target.value)}
              options={['100', '120', '150', '200']}
            />
            <select
              value={dustCover.printColor}
              onChange={(e) => handleChange('printColor', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
            >
              <option value="NOCOLOR">No Print</option>
              <option value="CMYK">Full color</option>
              <option value="BW">Black only</option>
            </select>
            <select
              value={dustCover.finish}
              onChange={(e) => handleChange('finish', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
            >
              <option value="NONE">None</option>
              <option value="MATTE">Matte Lamination</option>
              <option value="GLOSS">Gloss Lamination</option>
            </select>
          </div>
        </div>
      </div>
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
  const selectedOption = options?.find(opt => {
    if (typeof opt === 'string') return opt === stringValue;
    if (typeof opt === 'object') return opt.value === stringValue || opt.label === stringValue;
    return false;
  });

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
            value = option.value || option.label || option;
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

// ===== MAIN COMPONENT =====
const HardQuoteForm = () => {
  // Import cart context and router
  const { addToCart } = useCart();
  const router = useRouter();

  // Move ALL hooks inside the component
  const [formConfig, setFormConfig] = useState(HARDQUOTE_DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [configVersion, setConfigVersion] = useState(0);

  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('GSM');
  const [selectedSize, setSelectedSize] = useState('6x9');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [spineType, setSpineType] = useState('SQUARE');
  
  const [headbandColor, setHeadbandColor] = useState('');
  const [bookmark, setBookmark] = useState('');
  
  const [coverPaper, setCoverPaper] = useState('MATTE');
  const [coverWeight, setCoverWeight] = useState('150');
  const [coverColor, setCoverColor] = useState('CMYK');
  
  const [pageCount, setPageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [insideWeight, setInsideWeight] = useState('100');
  const [insideColor, setInsideColor] = useState('CMYK');
  
  // Dust Cover State
  const [dustCover, setDustCover] = useState(null);
  
  // Shipping Modal State
  const [showShippingModal, setShowShippingModal] = useState(false);

  const [quantity, setQuantity] = useState(200);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(1);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '6' });
  const [slipcase, setSlipcase] = useState('');
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '1' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });

  const isCustomSize = selectedSize === 'custom';
  const [pricingData, setPricingData] = useState(getPricingData());

  // Available sizes based on unit
  const availableSizes = [
    { value: '5.5x8.5', label: SIZE_CONVERSIONS[sizeUnit]?.['5.5x8.5'] || '5.5" x 8.5"' },
    { value: '6x9', label: SIZE_CONVERSIONS[sizeUnit]?.['6x9'] || '6" x 9"' },
    { value: '7x10', label: SIZE_CONVERSIONS[sizeUnit]?.['7x10'] || '7" x 10"' },
    { value: '8.5x11-letter', label: SIZE_CONVERSIONS[sizeUnit]?.['8.5x11-letter'] || '8.5" x 11" (Letter)' },
    { value: '8.5x11-standard', label: SIZE_CONVERSIONS[sizeUnit]?.['8.5x11-standard'] || '8.5" x 11"' },
    { value: '9x12', label: SIZE_CONVERSIONS[sizeUnit]?.['9x12'] || '9" x 12"' },
    { value: 'custom', label: 'Custom Size' }
  ];

  const fetchFormConfig = async () => {
    try {
      console.log('🔄 Fetching hardcover form configuration from API...');
      const res = await fetch('/api/admin/forms/hard-quote');
      
      if (res.ok) {
        const apiConfig = await res.json();
        console.log('📥 Hardcover API Response received');
        
        if (apiConfig && Object.keys(apiConfig).length > 0) {
          console.log('✅ Using hardcover API configuration');
          
          const mergedConfig = {
            ...HARDQUOTE_DEFAULT_CONFIG,
            ...apiConfig,
            general: {
              ...HARDQUOTE_DEFAULT_CONFIG.general,
              ...apiConfig.general
            },
            paperOptions: {
              ...HARDQUOTE_DEFAULT_CONFIG.paperOptions,
              ...apiConfig.paperOptions
            },
            additionalOptions: {
              ...HARDQUOTE_DEFAULT_CONFIG.additionalOptions,
              ...apiConfig.additionalOptions
            },
            pricing: {
              ...HARDQUOTE_DEFAULT_CONFIG.pricing,
              ...apiConfig.pricing
            }
          };
          
          setFormConfig(mergedConfig);
        } else {
          console.log('⚠️ API returned empty, using hardcover defaults');
          setFormConfig(HARDQUOTE_DEFAULT_CONFIG);
        }
      } else {
        console.log('❌ API error, using hardcover defaults');
        setFormConfig(HARDQUOTE_DEFAULT_CONFIG);
      }
    } catch (error) {
      console.error('❌ Error fetching hardcover form configuration:', error);
      setFormConfig(HARDQUOTE_DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormConfig();
  }, [configVersion]);

  const BINDING_TYPES = formConfig?.bindingTypes || HARDQUOTE_DEFAULT_CONFIG.bindingTypes;
  const BINDING_EDGES = formConfig?.bindingEdges || HARDQUOTE_DEFAULT_CONFIG.bindingEdges;
  const PAPER_OPTIONS = formConfig?.paperOptions || HARDQUOTE_DEFAULT_CONFIG.paperOptions;
  const PRINT_COLORS = formConfig?.printColors || HARDQUOTE_DEFAULT_CONFIG.printColors;
  const HEADBAND_COLORS = formConfig?.headbandColors || HARDQUOTE_DEFAULT_CONFIG.headbandColors;
  const BOOKMARK_OPTIONS = formConfig?.bookmarkOptions || HARDQUOTE_DEFAULT_CONFIG.bookmarkOptions;
  const ADDITIONAL_OPTIONS = formConfig?.additionalOptions || HARDQUOTE_DEFAULT_CONFIG.additionalOptions;
  const PAGE_COUNTS = formConfig?.pageCounts || HARDQUOTE_DEFAULT_CONFIG.pageCounts;
  const WEIGHT_OPTIONS = formConfig?.weightOptions || HARDQUOTE_DEFAULT_CONFIG.weightOptions;
  const QUANTITIES = formConfig?.quantities || HARDQUOTE_DEFAULT_CONFIG.quantities;

  const generalSettings = formConfig?.general || HARDQUOTE_DEFAULT_CONFIG.general;
  const customSizeInstructions = formConfig?.customSizeInstructions || HARDQUOTE_DEFAULT_CONFIG.customSizeInstructions;
  const spineWidth = formConfig?.spineWidth || HARDQUOTE_DEFAULT_CONFIG.spineWidth;

  const refreshConfig = () => {
    console.log('🔄 Manually refreshing hardcover configuration...');
    setConfigVersion(prev => prev + 1);
  };

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
      paper: 'MATTE',
      gsm: '150',
      printColor: 'CMYK',
      finish: 'NONE'
    });
  };

  const updateDustCover = (updatedDustCover) => {
    setDustCover(updatedDustCover);
  };

  const removeDustCover = () => {
    setDustCover(null);
  };

  // Price Calculation - FIXED
  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.08;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 300;
    const hardcoverBaseCost = formConfig?.pricing?.hardcoverBaseCost || 150;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.3;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.2;
    const dustCoverBaseCost = formConfig?.pricing?.dustCoverBaseCost || 100;
    const dustCoverPerCopy = formConfig?.pricing?.dustCoverPerCopy || 0.25;
    
    // Base printing cost: setup + hardcover base + (pages × cost per page × quantity)
    let basePrintCost = baseSetupCost + hardcoverBaseCost + (pageCount * baseCostPerPage * quantity);
    
    // Apply size multipliers
    if (isCustomSize) {
      basePrintCost *= customSizeMultiplier;
    } else if (selectedSize !== '6x9') {
      basePrintCost *= standardSizeMultiplier;
    }
    
    // Get option costs
    const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
    const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
    const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
    const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
    const dustCoverCost = dustCover ? dustCoverBaseCost + (quantity * dustCoverPerCopy) : 0;
    const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.shrinkWrap, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    const directMailUnitCost = directMailing.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.directMail, directMailing.type) : 0;
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;

    // Categorize costs
    const colorCost = coverColorCost + insideColorCost;
    const additionalServicesCost = proofCost + holePunchCost + dustCoverCost + slipcaseCost + shrinkWrapCost + directMailCost;

    const totalAmount = basePrintCost + colorCost + additionalServicesCost;

    return {
      basePrinting: basePrintCost,
      color: colorCost,
      proof: proofCost,
      holePunching: holePunchCost,
      dustCover: dustCoverCost,
      slipcase: slipcaseCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      total: totalAmount,
    };
  }, [
    pageCount, quantity, selectedSize, isCustomSize, coverColor, insideColor, 
    proof, holePunching, dustCover, slipcase, shrinkWrapping, directMailing, formConfig
  ]);

  const prices = calculatePricing();

  // Update pricing data when configuration changes
  useEffect(() => {
    const calculatePriceForQuantity = (qty) => {
      const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.08;
      const baseSetupCost = formConfig?.pricing?.baseSetupCost || 300;
      const hardcoverBaseCost = formConfig?.pricing?.hardcoverBaseCost || 150;
      const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.3;
      const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.2;
      
      let basePrintCost = baseSetupCost + hardcoverBaseCost + (pageCount * baseCostPerPage * qty);
      
      if (isCustomSize) {
        basePrintCost *= customSizeMultiplier;
      } else if (selectedSize !== '6x9') {
        basePrintCost *= standardSizeMultiplier;
      }
      
      // Add other costs (simplified for pricing table)
      const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
      const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
      const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
      const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
      
      const additionalCosts = coverColorCost + insideColorCost + proofCost + slipcaseCost;
      
      const total = basePrintCost + additionalCosts;
      
      return {
        quantity: qty,
        price: `$${Math.round(total).toLocaleString()}`,
        pricePerCopy: `$${(total / qty).toFixed(2)}`,
        time: '15-18 business days'
      };
    };

    const quantities = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const newPricingData = quantities.map(qty => calculatePriceForQuantity(qty));
    setPricingData(newPricingData);
  }, [pageCount, selectedSize, isCustomSize, coverColor, insideColor, proof, slipcase, formConfig]);

  // NEW: Handle Add to Cart function
  const handleAddToCart = () => {
  const formData = {
    sizeUnit, 
    paperUnit, 
    selectedSize,
    customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
    spineType, 
    spineWidth,
    headband: { color: headbandColor, bookmark },
    cover: { paper: coverPaper, weight: coverWeight, color: coverColor },
    inside: { pageCount, paper: insidePaper, weight: insideWeight, color: insideColor },
    dustCover,
    quantity,
    options: { proof, holePunching, slipcase, shrinkWrapping, directMailing },
    totalAmount: prices.total,
  };
  
  const cartItem = {
    type: 'hardcover',
    productName: `Hardcover Book - ${selectedSize}`,
    quantity: quantity,
    price: prices.total / quantity,
    total: prices.total,
    configuration: formData,
    summary: {
      size: availableSizes.find(s => s.value === selectedSize)?.label || selectedSize,
      pages: pageCount,
      binding: spineType,
      cover: coverPaper,
      printColor: coverColor,
      quantity: quantity
    }
  };
    
    // Add to cart
    addToCart(cartItem);
    
    // Redirect to cart page
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading hardcover form configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        formData={{ quantity, pageCount, selectedSize: availableSizes.find(s => s.value === selectedSize)?.label || selectedSize }}
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
                  <span className="mr-2">📐</span>
                  Size & Dimensions
                </h3>
                <SelectDropdown
                  label="Select Standard Size"
                  options={availableSizes}
                  selected={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    if (e.target.value !== 'custom') {
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

              {/* Binding Details */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📖</span>
                  Binding Details
                </h3>
                <SelectDropdown
                  label="Spine Type"
                  options={BINDING_EDGES}
                  selected={spineType}
                  onChange={(e) => setSpineType(e.target.value)}
                />
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Spine Width:</span> {spineWidth}
                  </p>
                </div>

                <div className="mt-4">
                  <SelectDropdown
                    label="Headband Color"
                    options={HEADBAND_COLORS}
                    selected={headbandColor}
                    onChange={(e) => setHeadbandColor(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <SelectDropdown
                    label="Bookmark"
                    options={BOOKMARK_OPTIONS}
                    selected={bookmark}
                    onChange={(e) => setBookmark(e.target.value)}
                  />
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                  options={WEIGHT_OPTIONS}
                />
                <SelectDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS} 
                  selected={coverColor} 
                  onChange={(e) => setCoverColor(e.target.value)} 
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                  showDescription={true}
                />
                <PaperWeightSelector
                  label="Paper Weight" 
                  paperUnit={paperUnit}
                  weightValue={insideWeight}
                  onChange={(e) => setInsideWeight(e.target.value)}
                  options={WEIGHT_OPTIONS}
                />
              </div>

              <div className="mb-6">
                <SelectDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS.filter(opt => opt.value !== 'NOCOLOR')} 
                  selected={insideColor} 
                  onChange={(e) => setInsideColor(e.target.value)} 
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Note:</span> Please select only the inside page count. Cover pages are calculated separately.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Options */}
          <div className="space-y-8">
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

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Volume Pricing</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800 space-y-1">
                  <p className="flex items-center">
                    <span className="mr-2">⏰</span>
                    Production time excludes weekends and holidays
                  </p>
                  <p>• Hardcover production takes longer than perfect binding</p>
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
                    { label: 'Color Options', value: prices.color, show: prices.color > 0 },
                    { label: 'Digital Proof', value: prices.proof, show: prices.proof > 0 },
                    { label: 'Hole Punching', value: prices.holePunching, show: prices.holePunching > 0 },
                    { label: 'Dust Cover', value: prices.dustCover, show: prices.dustCover > 0 },
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

              {/* Action Buttons - UPDATED FOR CART */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button 
                  onClick={() => setShowShippingModal(true)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-sm"
                >
                  {generalSettings.shippingButtonText}
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-sm flex items-center justify-center"
                >
                  {generalSettings.submitButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardQuoteForm;