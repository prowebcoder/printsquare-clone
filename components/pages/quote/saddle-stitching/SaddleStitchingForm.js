import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCcw, ShoppingCart, Truck, XCircle, Plus, ChevronDown, CheckCircle, Maximize2 } from 'lucide-react';

// ===== DEFAULT CONSTANTS (Fallback) =====
const DEFAULT_FORM_CONFIG = {
  general: {
    title: "Saddle Stitching Quote Calculator",
    description: "Configure your booklet with professional saddle stitching. Get instant pricing and add your custom job to the cart.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  bindingTypes: [
    { value: 'SADDLE', label: 'Saddle Stitching' },
    { value: 'PERFECT', label: 'Perfect Binding' },
    { value: 'HARDCOVER', label: 'Hardcover Book' },
    { value: 'WIRE', label: 'Wire Binding' },
  ],
  // Page counts are typically much lower for saddle stitching (must be multiples of 4)
  pageCounts: Array.from({ length: (96 - 8) / 4 + 1 }, (_, i) => 8 + i * 4), 
  sizes: ['5.5 x 8.5', '8.5 x 11', '11 x 17', 'Custom Size'],
  bindingEdges: [
    { value: 'LEFT', label: 'Left Side (Booklet)', desc: 'Binding on the left edge' },
    { value: 'TOP', label: 'Top Side (Calendar)', desc: 'Binding on the top edge' },
  ],
  paperOptions: {
    // Simplified for saddle stitch, often just one type for cover/inside
    cover: [
      { value: '80LB_GLOSS', label: '80lb Gloss Text', price: 0 },
      { value: '100LB_GLOSS', label: '100lb Gloss Text', price: 20 },
      { value: '100LB_COVER', label: '100lb Gloss Cover', price: 50 },
    ],
    inside: [
      { value: '80LB_GLOSS', label: '80lb Gloss Text', price: 0 },
      { value: '100LB_GLOSS', label: '100lb Gloss Text', price: 15 },
    ],
    subscription: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'UNCOATED', label: 'Uncoated', price: 10 },
    ]
  },
  printColors: [
    { value: 'CMYK', label: 'Full color (4/4)', price: 0 },
    { value: 'BW', label: 'Black only (1/1)', price: -100 },
    { value: 'CMYK_BW', label: '4/4 Cover, 1/1 Inside', price: -50 },
  ],
  coverFinishes: [
    { value: 'NONE', label: 'None', price: 0 },
    { value: 'UV_GLOSS', label: 'UV Gloss Coating', price: 40 },
    { value: 'SPOT_UV', label: 'Spot UV Varnish', price: 120 },
  ],
  coverFolds: [ // Not typical for saddle stitch, but included for structure consistency
    { value: 'NONE', label: 'No fold', price: 0 },
  ],
  additionalOptions: {
    proof: [
      { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0 },
      { value: 'DIGITAL', label: 'Digital Proof', price: 50 },
    ],
    holePunch: [
      { value: '2', label: '2 Holes', price: 10 },
      { value: '3', label: '3 Holes', price: 15 },
    ],
    shrinkWrap: [
      { value: '10', label: '10 copy/bundle', price: 0.05 },
      { value: '25', label: '25 copy/bundle', price: 0.03 },
      { value: '50', label: '50 copy/bundle', price: 0.02 },
    ],
  },
  positions: [
    { value: 'FRONT', label: 'Before page 1' },
    { value: 'BACK', label: 'After last page' },
  ],
  weightOptions: ['80', '100', '120'],
  quantities: [100, 250, 500, 1000, 2500, 5000, 10000],
  customSizeInstructions: "📐 Minimum: 4\" × 4\" | Maximum: 12\" × 12\"",
  spineWidth: 'N/A (No Spine)',
  pricing: {
    baseSetupCost: 150,
    costPerPage: 0.03,
    customSizeMultiplier: 1.1,
    standardSizeMultiplier: 1.05
  }
};

// ===== UTILITY FUNCTIONS (Kept from template) =====
const getPricingData = (basePrice = 1800) => {
  const quantities = [100, 250, 500, 1000, 2500, 5000];
  return quantities.map((qty, index) => {
    // Simulating tiered pricing and better economies of scale
    const scaleFactor = 1 - (index * 0.07); 
    const finalPrice = Math.round(basePrice * scaleFactor);
    return {
      quantity: qty,
      price: `$${finalPrice.toLocaleString()}`,
      pricePerCopy: `$${(finalPrice / qty).toFixed(2)}`,
      time: index < 2 ? '3 business days' : '5 business days'
    }
  });
};

const getOptionPrice = (options, selectedValue) => {
  if (!options || !Array.isArray(options)) return 0;
  const option = options.find(opt => opt.value === selectedValue);
  return option ? (option.price || 0) : 0;
};

const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

// ===== REUSABLE COMPONENTS (Kept from template) =====
const RadioGroup = ({ label, name, options, selected, onChange, className = "" }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 ${className}`}>
    <p className="text-sm font-semibold text-gray-700 min-w-28">{label}:</p>
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

const SelectDropdown = ({ label, options, selected, onChange, className = "", disabled = false }) => {
  // Convert selected value to string safely
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (value && typeof value === 'object' && value.value) return value.value;
    return '';
  };

  const stringValue = getStringValue(selected);

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

          if (typeof option === 'string' || typeof option === 'number') {
            value = String(option);
            labelText = String(option);
          } else if (typeof option === 'object') {
            value = option.value || option;
            labelText = option.label || option.value || option;
          } else {
            value = String(option);
            labelText = String(option);
          }

          return (
            <option key={`${value}-${index}`} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
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

const SubscriptionCard = ({ card, index, onUpdate, onRemove, pageCount, positions, paperOptions, printColors }) => {
  const handleChange = (field, value) => {
    onUpdate(index, { ...card, [field]: value });
  };

  const handleNumberInput = (field, value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleChange(field, value);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-gray-800">Insert Card {index + 1}</h4>
        <button 
          onClick={() => onRemove(index)}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove subscription card"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Size (in inches)</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Width"
                value={card.width}
                onChange={(e) => handleNumberInput('width', e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Height"
                value={card.height}
                onChange={(e) => handleNumberInput('height', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Position</label>
          <div className="grid grid-cols-2 gap-4">
            <SelectDropdown
              options={positions}
              selected={card.position}
              onChange={(e) => handleChange('position', e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-100"
              placeholder="Page number"
              value={card.selectedPage}
              onChange={(e) => handleNumberInput('selectedPage', e.target.value)}
              disabled={card.position !== 'SELECT'}
            />
          </div>
        </div>

        {/* Paper & Print */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Paper & Print</label>
          <div className="grid grid-cols-2 gap-4">
             <SelectDropdown
              options={paperOptions.subscription || []}
              selected={card.paper}
              onChange={(e) => handleChange('paper', e.target.value)}
              label="Paper Type"
            />
             <SelectDropdown
              options={printColors || []}
              selected={card.printColor}
              onChange={(e) => handleChange('printColor', e.target.value)}
              label="Print Color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN COMPONENT =====
export default function SaddleStitchingForm() {
  // Configuration state
  const [formConfig, setFormConfig] = useState(DEFAULT_FORM_CONFIG);
  const [loading, setLoading] = useState(true);
  const [configVersion, setConfigVersion] = useState(0);

  // Form State Management
  const [bindingType, setBindingType] = useState('SADDLE'); // <-- Default to SADDLE
  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('GSM'); // Changed default to GSM
  const [selectedSize, setSelectedSize] = useState('8.5 x 11');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [bindingEdge, setBindingEdge] = useState('LEFT');

  // Cover State
  const [coverPaper, setCoverPaper] = useState('100LB_COVER');
  const [coverWeight, setCoverWeight] = useState('100');
  const [coverColor, setCoverColor] = useState('CMYK');
  const [coverFinish, setCoverFinish] = useState('NONE');
  const [coverFold, setCoverFold] = useState('NONE'); // Kept for structure
  const [foldWidth, setFoldWidth] = useState(''); // Kept for structure

  // Inside Page State
  const [pageCount, setPageCount] = useState(32); // Lower page count default
  const [insidePaper, setInsidePaper] = useState('80LB_GLOSS');
  const [insideWeight, setInsideWeight] = useState('80');
  const [insideColor, setInsideColor] = useState('CMYK');

  // Insert Cards State
  const [subscriptionCards, setSubscriptionCards] = useState([]); // Re-using for inserts

  // Quantity & Options State
  const [quantity, setQuantity] = useState(500);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(2);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '2' });
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '10' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });

  // Derived State
  const isCustomSize = selectedSize === 'Custom Size';
  const [pricingData, setPricingData] = useState(getPricingData());

  // ===== Fetch form configuration (Mocked) =====
  const fetchFormConfig = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      // MOCK API: Assume for this run, the API returns some custom data for the title
      const apiConfig = { 
        general: { title: "Saddle Stitch Pro Quote", description: "This is a custom description loaded from the API!" },
        quantities: [50, 100, 200, 500, 1000]
      };
      
      if (apiConfig && Object.keys(apiConfig).length > 0) {
        const mergedConfig = {
          ...DEFAULT_FORM_CONFIG,
          ...apiConfig,
          general: {
            ...DEFAULT_FORM_CONFIG.general,
            ...apiConfig.general
          },
          paperOptions: {
            ...DEFAULT_FORM_CONFIG.paperOptions,
            ...apiConfig.paperOptions
          },
          additionalOptions: {
            ...DEFAULT_FORM_CONFIG.additionalOptions,
            ...apiConfig.additionalOptions
          },
          pricing: {
            ...DEFAULT_FORM_CONFIG.pricing,
            ...apiConfig.pricing
          }
        };
        setFormConfig(mergedConfig);
      } else {
        setFormConfig(DEFAULT_FORM_CONFIG);
      }
    } catch (error) {
      console.error('Error fetching form configuration:', error);
      setFormConfig(DEFAULT_FORM_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormConfig();
  }, [configVersion]);

  // Configuration constants
  const BINDING_TYPES = formConfig?.bindingTypes || DEFAULT_FORM_CONFIG.bindingTypes;
  const SIZES = formConfig?.sizes || DEFAULT_FORM_CONFIG.sizes;
  const BINDING_EDGES = formConfig?.bindingEdges || DEFAULT_FORM_CONFIG.bindingEdges;
  const PAPER_OPTIONS = formConfig?.paperOptions || DEFAULT_FORM_CONFIG.paperOptions;
  const PRINT_COLORS = formConfig?.printColors || DEFAULT_FORM_CONFIG.printColors;
  const COVER_FINISHES = formConfig?.coverFinishes || DEFAULT_FORM_CONFIG.coverFinishes;
  const COVER_FOLDS = formConfig?.coverFolds || DEFAULT_FORM_CONFIG.coverFolds;
  const ADDITIONAL_OPTIONS = formConfig?.additionalOptions || DEFAULT_FORM_CONFIG.additionalOptions;
  const POSITIONS = formConfig?.positions || DEFAULT_FORM_CONFIG.positions;
  const PAGE_COUNTS = formConfig?.pageCounts || DEFAULT_FORM_CONFIG.pageCounts;
  const WEIGHT_OPTIONS = formConfig?.weightOptions || DEFAULT_FORM_CONFIG.weightOptions;
  const QUANTITIES = formConfig?.quantities || DEFAULT_FORM_CONFIG.quantities;

  const generalSettings = formConfig?.general || DEFAULT_FORM_CONFIG.general;
  const customSizeInstructions = formConfig?.customSizeInstructions || DEFAULT_FORM_CONFIG.customSizeInstructions;
  const spineWidth = formConfig?.spineWidth || DEFAULT_FORM_CONFIG.spineWidth;

  const refreshConfig = () => {
    console.log('🔄 Manually refreshing configuration...');
    setLoading(true); // Show loading spinner again
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
      
      // Find the closest quantity index for visual highlighting
      QUANTITIES.forEach((qty, index) => {
        const diff = Math.abs(qty - numValue);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });
      
      setSelectedQuantityIndex(closestIndex);
    }
  };

  const handleQuantitySelect = (qty) => {
    setQuantity(qty);
    const index = QUANTITIES.indexOf(qty);
    setSelectedQuantityIndex(index);
  };

  // Insert Card Management (re-using SubscriptionCard for generic inserts)
  const addSubscriptionCard = () => {
    if (subscriptionCards.length < 5) { // Limiting to 5 for simplicity
      const newCard = {
        id: Date.now(),
        width: '', height: '', position: 'FRONT', selectedPage: '',
        paper: PAPER_OPTIONS.subscription[0]?.value || '', 
        printColor: PRINT_COLORS[0]?.value || 'CMYK'
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

  // Price Calculation (MOCKED/SIMPLIFIED)
  const calculatePricing = useCallback(() => {
    const { baseSetupCost, costPerPage, customSizeMultiplier, standardSizeMultiplier } = formConfig.pricing;
      
    // Base cost calculation
    let basePrintCost = baseSetupCost + (pageCount * costPerPage * quantity);
    
    if (isCustomSize) basePrintCost *= customSizeMultiplier;
    else if (selectedSize !== '8.5 x 11') basePrintCost *= standardSizeMultiplier;
    
    // Feature costs (based on index lookup price field)
    const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
    const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
    const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
    const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
    const coverFinishCost = getOptionPrice(COVER_FINISHES, coverFinish);
    const coverFoldCost = getOptionPrice(COVER_FOLDS, coverFold);
    const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
    
    const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.shrinkWrap, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    const directMailUnitCost = directMailing.enabled ? 0.50 : 0; // Simple mock for direct mail
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;

    // Cost for inserted cards/pages
    const subscriptionCardCost = subscriptionCards.length * (50 + (quantity * 0.05)); 

    const materialCost = coverPaperCost + insidePaperCost;
    const colorCost = coverColorCost + insideColorCost;
    const coverCost = coverFinishCost + coverFoldCost;
    const additionalServicesCost = proofCost + holePunchCost + subscriptionCardCost + 
                                   shrinkWrapCost + directMailCost;

    const totalAmount = basePrintCost + materialCost + colorCost + coverCost + additionalServicesCost;

    return {
      basePrinting: basePrintCost,
      materials: materialCost,
      color: colorCost,
      cover: coverCost,
      proof: proofCost,
      holePunching: holePunchCost,
      subscriptionCards: subscriptionCardCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      total: totalAmount,
    };
  }, [pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper,
      coverColor, insideColor, coverFinish, coverFold, proof, holePunching,
      subscriptionCards.length, shrinkWrapping, directMailing, formConfig]);

  const prices = calculatePricing();

  // Update pricing table data based on current configuration
  useEffect(() => {
    // Generate a new base price for the table
    const newBasePrice = 800 + (pageCount * 2) + (quantity * 0.5);
    setPricingData(getPricingData(newBasePrice));
  }, [pageCount, quantity]);
  
  // Set quantity to the value of the highlighted index on initial load/config change
  useEffect(() => {
    if (!loading && QUANTITIES.length > selectedQuantityIndex) {
      setQuantity(QUANTITIES[selectedQuantityIndex]);
    }
  }, [loading, selectedQuantityIndex, QUANTITIES]);


  const handleAddToCart = () => {
    const formData = {
      bindingType, sizeUnit, paperUnit, selectedSize,
      customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
      bindingEdge, 
      cover: { paper: coverPaper, weight: coverWeight, color: coverColor, finish: coverFinish, fold: coverFold, foldWidth },
      inside: { pageCount, paper: insidePaper, weight: insideWeight, color: insideColor, inserts: subscriptionCards },
      quantity,
      options: { proof, holePunching, shrinkWrapping, directMailing },
      totalAmount: prices.total.toFixed(2),
    };
    
    console.log("Form Data Submitted:", formData);
    // Note: Replaced alert() with a console log and visual feedback in a real app
    alert(`Order submitted! Total Price: ${formatCurrency(prices.total)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-8 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading form configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Configuration Status */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center shadow-inner">
          <span className="text-sm text-blue-700 font-medium flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            {formConfig === DEFAULT_FORM_CONFIG ? 'Using default configuration (Mock API)' : 'Using live configuration (Mock API)'}
          </span>
          <button 
            onClick={refreshConfig}
            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center"
          >
            <RefreshCcw className="w-3 h-3 mr-1" /> Refresh Config
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {generalSettings.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {generalSettings.description}
          </p>
        </div>

       {/* Binding Type Selection */}
         {/*<div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Select Binding Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BINDING_TYPES.map((option) => (
              <button
                key={option.value}
                onClick={() => setBindingType(option.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 font-semibold text-sm ${
                  bindingType === option.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md scale-105'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>*/}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left & Middle Columns (Options) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Size & Binding Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              {/* Size Selection */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-indigo-700 flex items-center">
                  <Maximize2 className="w-5 h-5 mr-2" /> Size & Orientation
                </h3>
                <SelectDropdown
                  label="Select Size"
                  options={SIZES}
                  selected={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="mb-4"
                />
                
                {isCustomSize && (
                  <div className="p-4 bg-yellow-50 rounded-lg space-y-3">
                    <p className="text-sm font-medium text-yellow-800 mb-2">Custom Dimensions (Inches)</p>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Width"
                        value={customWidth}
                        onChange={handleNumberInput(setCustomWidth)}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Height"
                        value={customHeight}
                        onChange={handleNumberInput(setCustomHeight)}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <p className="text-xs text-yellow-700">{customSizeInstructions}</p>
                  </div>
                )}
              </div>
              
              {/* Binding Edge Selection */}
              <div className="pt-8 md:pt-0">
                <SelectDropdown
                  label="Binding Edge"
                  options={BINDING_EDGES}
                  selected={bindingEdge}
                  onChange={(e) => setBindingEdge(e.target.value)}
                />
                 <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 font-medium">
                      {BINDING_EDGES.find(e => e.value === bindingEdge)?.desc || 'Select binding edge.'}
                    </p>
                    <p className="text-xs text-gray-600 mt-2 italic">
                        Spine Width: {spineWidth}
                    </p>
                 </div>
              </div>
            </div>

            {/* Cover & Inside Pages Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-indigo-700">Page Specifications</h3>
              <div className="space-y-6">
                
                {/* 1. Page Count */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <p className="text-sm font-semibold text-gray-700 min-w-28">Total Pages:</p>
                  <div className="flex-1">
                    <SelectDropdown
                      options={PAGE_COUNTS}
                      selected={pageCount}
                      onChange={(e) => setPageCount(Number(e.target.value))}
                    />
                    <p className="text-xs text-red-500 mt-1">Must be a multiple of 4 for Saddle Stitching.</p>
                  </div>
                </div>

                {/* 2. Cover Paper & Print */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                  <SelectDropdown
                    label="Cover Paper Type"
                    options={PAPER_OPTIONS.cover}
                    selected={coverPaper}
                    onChange={(e) => setCoverPaper(e.target.value)}
                  />
                  <SelectDropdown
                    label="Cover Print Color"
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
                  <SelectDropdown
                    label="Cover Weight (Mock)"
                    options={WEIGHT_OPTIONS}
                    selected={coverWeight}
                    onChange={(e) => setCoverWeight(e.target.value)}
                  />
                </div>

                {/* 3. Inside Pages Paper & Print */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                  <SelectDropdown
                    label="Inside Paper Type"
                    options={PAPER_OPTIONS.inside}
                    selected={insidePaper}
                    onChange={(e) => setInsidePaper(e.target.value)}
                  />
                  <SelectDropdown
                    label="Inside Print Color"
                    options={PRINT_COLORS.filter(c => c.value === 'CMYK' || c.value === 'BW')}
                    selected={insideColor}
                    onChange={(e) => setInsideColor(e.target.value)}
                  />
                  <SelectDropdown
                    label="Inside Weight (Mock)"
                    options={WEIGHT_OPTIONS}
                    selected={insideWeight}
                    onChange={(e) => setInsideWeight(e.target.value)}
                  />
                </div>

              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-indigo-700">Finishing & Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <SelectDropdown
                  label="Proof Type"
                  options={ADDITIONAL_OPTIONS.proof}
                  selected={proof}
                  onChange={(e) => setProof(e.target.value)}
                />
                
                <ToggleOption
                  label="Hole Punching"
                  enabled={holePunching.enabled}
                  onToggle={() => setHolePunching({ ...holePunching, enabled: !holePunching.enabled })}
                >
                  <SelectDropdown
                    options={ADDITIONAL_OPTIONS.holePunch}
                    selected={holePunching.type}
                    onChange={(e) => setHolePunching({ ...holePunching, type: e.target.value })}
                  />
                </ToggleOption>

                <ToggleOption
                  label="Shrink Wrapping"
                  enabled={shrinkWrapping.enabled}
                  onToggle={() => setShrinkWrapping({ ...shrinkWrapping, enabled: !shrinkWrapping.enabled })}
                >
                  <SelectDropdown
                    options={ADDITIONAL_OPTIONS.shrinkWrap}
                    selected={shrinkWrapping.type}
                    onChange={(e) => setShrinkWrapping({ ...shrinkWrapping, type: e.target.value })}
                  />
                </ToggleOption>

                <ToggleOption
                  label="Direct Mailing Service"
                  enabled={directMailing.enabled}
                  onToggle={() => setDirectMailing({ ...directMailing, enabled: !directMailing.enabled })}
                >
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600">Cost: {formatCurrency(0.50)} per copy (Mock)</p>
                  </div>
                </ToggleOption>

              </div>
            </div>

            {/* Insert Cards Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">
                Inserted Cards/Flyers ({subscriptionCards.length})
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Add separate printed materials to be inserted into your booklet.
              </p>
              
              {subscriptionCards.map((card, index) => (
                <SubscriptionCard
                  key={card.id}
                  card={card}
                  index={index}
                  onUpdate={updateSubscriptionCard}
                  onRemove={removeSubscriptionCard}
                  pageCount={pageCount}
                  positions={POSITIONS}
                  paperOptions={PAPER_OPTIONS}
                  printColors={PRINT_COLORS}
                />
              ))}

              <button
                onClick={addSubscriptionCard}
                disabled={subscriptionCards.length >= 5}
                className="mt-4 w-full flex items-center justify-center p-3 border-2 border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Insert Card
              </button>
            </div>
            
          </div>

          {/* Right Column (Summary & Pricing) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Quantity Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-8 border-t-4 border-green-600">
              <h3 className="text-xl font-bold mb-4 text-green-700">Quantity Selection</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Custom Quantity
                </label>
                <input
                  type="text"
                  placeholder="Enter quantity"
                  value={quantity > 0 ? quantity.toString() : ''}
                  onChange={handleQuantityInput}
                  className="w-full p-3 border-2 border-green-300 rounded-lg text-lg text-center font-bold focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              <div className="h-0.5 bg-gray-100 my-4"></div>

              <div className="grid grid-cols-3 gap-2">
                {QUANTITIES.map((qty, index) => (
                  <button
                    key={qty}
                    onClick={() => handleQuantitySelect(qty)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                      quantity === qty
                        ? 'bg-green-600 text-white shadow-lg ring-4 ring-green-300 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    {qty.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-[20rem] border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Price Breakdown</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Base Printing ({pageCount} pages)</span>
                  <span className="font-medium">{formatCurrency(prices.basePrinting)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paper & Materials</span>
                  <span className="font-medium">{formatCurrency(prices.materials)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Color & Finishing</span>
                  <span className="font-medium">{formatCurrency(prices.color + prices.cover)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Options & Services</span>
                  <span className="font-medium">{formatCurrency(prices.proof + prices.holePunching + prices.shrinkWrapping)}</span>
                </div>
                {prices.subscriptionCards > 0 && (
                  <div className="flex justify-between text-indigo-500">
                    <span>Inserts ({subscriptionCards.length})</span>
                    <span className="font-medium">{formatCurrency(prices.subscriptionCards)}</span>
                  </div>
                )}
                {prices.directMailing > 0 && (
                  <div className="flex justify-between text-indigo-500">
                    <span>Direct Mailing</span>
                    <span className="font-medium">{formatCurrency(prices.directMailing)}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total Estimated Price:</span>
                <span className="text-green-600">{formatCurrency(prices.total)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center p-4 bg-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors transform hover:scale-[1.01]"
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                {generalSettings.submitButtonText}
              </button>
              <button
                className="w-full flex items-center justify-center p-4 bg-gray-100 text-gray-700 text-lg font-bold rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                <Truck className="w-6 h-6 mr-3" />
                {generalSettings.shippingButtonText}
              </button>
            </div>

            {/* Pricing Table (For comparison) */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-700">Quantity Price Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Copy</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pricingData.map((item, index) => (
                      <tr 
                        key={item.quantity}
                        className={quantity === item.quantity ? 'bg-green-50 font-semibold' : 'hover:bg-gray-50'}
                      >
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity.toLocaleString()}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">{item.price}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-green-600">{item.pricePerCopy}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}