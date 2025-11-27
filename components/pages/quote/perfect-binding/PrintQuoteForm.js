// components/pages/quote/perfect-binding/PrintQuoteForm.js
import React, { useState, useCallback, useEffect } from 'react';

// ===== PERFECT-BINDING-SPECIFIC DEFAULT CONFIG =====
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
  sizes: ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', 'Custom Size'],
  bindingEdges: [
    { value: 'LEFT', label: 'Left Side', desc: 'Binding on the left, most common' },
    { value: 'RIGHT', label: 'Right Side', desc: 'First inside page starts from the right' },
    { value: 'TOP', label: 'Top Side', desc: 'Binding on the top, a.k.a calendar binding' },
  ],
  paperOptions: {
    cover: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'GLOSS', label: 'Gloss', price: 0 },
      { value: 'HI-PLUS', label: 'Hi-Plus', price: 50 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 100 },
      { value: 'PREMIUM', label: 'Premium', price: 150 },
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
  customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
  spineWidth: '0.178"',
  pricing: {
    baseSetupCost: 200,
    costPerPage: 0.05,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1
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

const SelectDropdown = ({ label, options, selected, onChange, className = "", disabled = false }) => {
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

const SubscriptionCard = ({ card, index, onUpdate, onRemove, pageCount, positions }) => {
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
        <h4 className="text-lg font-bold text-gray-800">Subscription Card {index + 1}</h4>
        <button 
          onClick={() => onRemove(index)}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove subscription card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Size</label>
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
              <p className="text-xs text-gray-500 mt-1">Enter dimensions in inches</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Position</label>
          <div className="grid grid-cols-2 gap-4">
            <SelectDropdown
              options={positions && positions.map(opt => ({
                ...opt,
                label: opt.value === 'BACK' ? `After page ${pageCount}` : opt.label
              }))}
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Paper</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SelectDropdown
              options={[{ value: '', label: 'Paper Type' }]}
              selected={card.paper}
              onChange={(e) => handleChange('paper', e.target.value)}
            />
            <SelectDropdown
              options={[{ value: '', label: 'Paper Type' }]}
              selected={card.subname}
              onChange={(e) => handleChange('subname', e.target.value)}
            />
            <SelectDropdown
              options={[{ value: '', label: 'Color' }]}
              selected={card.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
            <SelectDropdown
              options={[{ value: '', label: 'GSM' }]}
              selected={card.gsm}
              onChange={(e) => handleChange('gsm', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Print Color</label>
          <SelectDropdown
            options={[{ value: 'CMYK', label: 'Full Color' }]}
            selected={card.printColor}
            onChange={(e) => handleChange('printColor', e.target.value)}
          />
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
  const [paperUnit, setPaperUnit] = useState('US');
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
  const [isDustCoverEnabled, setIsDustCoverEnabled] = useState(false);

  // Inside Page State
  const [pageCount, setPageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [insideWeight, setInsideWeight] = useState('100');
  const [insideColor, setInsideColor] = useState('CMYK');
  
  // Subscription Cards State
  const [subscriptionCards, setSubscriptionCards] = useState([]);

  // Quantity & Options State
  const [quantity, setQuantity] = useState(200);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(1);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '6' });
  const [slipcase, setSlipcase] = useState('NONE');
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '1' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });

  // Derived State
  const isCustomSize = selectedSize === 'Custom Size';
  const [pricingData, setPricingData] = useState(getPricingData());

  // ===== FIXED: Fetch form configuration =====
  const fetchFormConfig = async () => {
    try {
      console.log('🔄 Fetching perfect binding form configuration from API...');
      const res = await fetch('/api/forms/print-quote'); // Print quote endpoint
      
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
  const SIZES = formConfig?.sizes || PRINTQUOTE_DEFAULT_CONFIG.sizes;
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

  useEffect(() => {
    console.log('🔍 DEBUG - Current Configuration:', {
      title: generalSettings.title,
      description: generalSettings.description,
      hasCustomConfig: formConfig !== PRINTQUOTE_DEFAULT_CONFIG,
      configSource: formConfig === PRINTQUOTE_DEFAULT_CONFIG ? 'DEFAULT' : 'API'
    });
  }, [formConfig, generalSettings]);

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

  // Subscription Card Management
  const addSubscriptionCard = () => {
    if (subscriptionCards.length < 10) {
      const newCard = {
        id: Date.now(),
        width: '', height: '', position: '', selectedPage: '',
        paper: '', subname: '', color: '', gsm: '', printColor: 'CMYK'
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

  // Price Calculation
  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.05;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 200;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.2;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.1;
    
    let basePrintCost = baseSetupCost + (pageCount * baseCostPerPage * quantity);
    
    if (isCustomSize) basePrintCost *= customSizeMultiplier;
    else if (selectedSize !== '8.5 x 11') basePrintCost *= standardSizeMultiplier;
    
    const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
    const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
    const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
    const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
    const coverFinishCost = getOptionPrice(COVER_FINISHES, coverFinish);
    const coverFoldCost = getOptionPrice(COVER_FOLDS, coverFold);
    const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
    const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
    const dustCoverCost = isDustCoverEnabled ? 100 + (quantity * 0.25) : 0;
    const subscriptionCardCost = subscriptionCards.length * (25 + (quantity * 0.02));
    const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.shrinkWrap, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    const directMailUnitCost = directMailing.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.directMail, directMailing.type) : 0;
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;

    const materialCost = coverPaperCost + insidePaperCost;
    const colorCost = coverColorCost + insideColorCost;
    const coverCost = coverFinishCost + coverFoldCost;
    const additionalServicesCost = proofCost + holePunchCost + dustCoverCost + subscriptionCardCost + 
                                 slipcaseCost + shrinkWrapCost + directMailCost;

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
      total: totalAmount,
    };
  }, [pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper, 
      coverColor, insideColor, coverFinish, coverFold, proof, holePunching,
      isDustCoverEnabled, subscriptionCards.length, slipcase, shrinkWrapping, directMailing, formConfig]);

  const prices = calculatePricing();

  useEffect(() => {
    const newBasePrice = 1000 + (pageCount * 3) + (quantity * 0.8);
    setPricingData(getPricingData(newBasePrice));
  }, [pageCount, quantity]);

  const handleAddToCart = () => {
    const formData = {
      bindingType, sizeUnit, paperUnit, selectedSize,
      customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
      bindingEdge, spineWidth,
      cover: { paper: coverPaper, weight: coverWeight, color: coverColor, finish: coverFinish, 
               fold: coverFold, foldWidth, dustCover: isDustCoverEnabled },
      inside: { pageCount, paper: insidePaper, weight: insideWeight, color: insideColor, subscriptionCards },
      quantity,
      options: { proof, holePunching, slipcase, shrinkWrapping, directMailing },
      totalAmount: prices.total.toFixed(2),
    };
    
    console.log("Form Data Submitted:", formData);
    alert(`Order added to cart! Total Price: ${formatCurrency(prices.total)}`);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Configuration Status */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">
              {formConfig === PRINTQUOTE_DEFAULT_CONFIG ? 'Using default configuration' : 'Using live configuration from editor'}
            </span>
            <button 
              onClick={refreshConfig}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
            >
              🔄 Refresh Config
            </button>
          </div>
        </div>

        {/* Header Section */}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Measurement Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                { value: 'JAPAN', label: 'Japan Weight (kg)' },
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
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Size & Dimensions
                </h3>
                <SelectDropdown
                  label="Select Standard Size"
                  options={SIZES.map(s => ({ value: s, label: s }))}
                  selected={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    if (e.target.value !== 'Custom Size') {
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
                    {customSizeInstructions}
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
                <SelectDropdown 
                  label="Paper Weight" 
                  options={WEIGHT_OPTIONS.map(w => ({ value: w, label: `${w} gsm` }))} 
                  selected={coverWeight} 
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
                      placeholder="Enter fold width"
                      value={foldWidth}
                      onChange={handleNumberInput(setFoldWidth)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  + Additional Add-ons
                </button>
                <button 
                  onClick={() => setIsDustCoverEnabled(!isDustCoverEnabled)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isDustCoverEnabled 
                      ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isDustCoverEnabled ? '✓ Dust Cover Added' : '+ Add Dust Cover'}
                </button>
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
                <button 
                  onClick={addSubscriptionCard}
                  disabled={subscriptionCards.length >= 10}
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
                />
                <SelectDropdown 
                  label="Paper Weight" 
                  options={WEIGHT_OPTIONS.map(w => ({ value: w, label: `${w} gsm` }))} 
                  selected={insideWeight} 
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
                <p className="text-sm text-yellow-800 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please select only the inside page count. Cover pages are calculated separately.
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

            {/* Pricing Table */}
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
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-sm">
                  {generalSettings.shippingButtonText}
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-sm"
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

export default PrintQuoteForm;