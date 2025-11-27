'use client';
import { useState, useCallback, useEffect } from 'react';

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
  sizes: [
    { value: '5.5x8.5', label: '5.5" x 8.5" (Half Letter)' },
    { value: '6x9', label: '6" x 9"' },
    { value: '7x10', label: '7" x 10"' },
    { value: '8.5x11-letter', label: '8.5" x 11" (Letter)' },
    { value: '8.5x11-standard', label: '8.5" x 11"' },
    { value: '9x12', label: '9" x 12"' },
    { value: 'custom', label: 'Custom Size' }
  ],
  bindingEdges: [
    { value: 'SQUARE', label: 'Square Spine', desc: 'Standard square spine' },
    { value: 'ROUNDED', label: 'Rounded Spine', desc: 'Premium rounded spine' },
  ],
  paperOptions: {
    cover: [
      { value: 'MATTE', label: 'Matte', gsm: ['120', '150', '200'] },
      { value: 'GLOSS', label: 'Gloss', gsm: ['120', '150', '200'] },
      { value: 'UNCOATED', label: 'Uncoated', gsm: ['120', '150'] },
      { value: 'PAPERCLOTH_GLOSS', label: 'Papercloth Gloss', gsm: [] }
    ],
    inside: [
      { value: 'MATTE', label: 'Matte', gsm: ['80', '100', '120'] },
      { value: 'GLOSS', label: 'Gloss', gsm: ['80', '100', '120'] },
      { value: 'UNCOATED', label: 'Uncoated', gsm: ['80', '100'] }
    ]
  },
  printColors: [
    { value: 'NOCOLOR', label: 'No Print', description: 'No Print' },
    { value: 'CMYK', label: 'Full color', description: 'Full color' },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', description: 'Full color + 1 Spot color' },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', description: 'Full color + 2 Spot color' },
    { value: 'BW', label: 'Black only', description: 'Black only' },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color', description: 'Black + 1 Spot color' },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color', description: 'Black + 2 Spot color' }
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
      { value: 'ONLINE', label: 'E-Proof(PDF proof, free)', price: 0 },
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
  pageCounts: [36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160],
  weightOptions: ['80', '100', '120', '150', '200'],
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  customSizeInstructions: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
  spineWidth: '0.178"',
  pricing: {
    baseSetupCost: 300,
    costPerPage: 0.08,
    customSizeMultiplier: 1.3,
    standardSizeMultiplier: 1.2,
    hardcoverBaseCost: 150
  }
};

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

const HardQuoteForm = () => {
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
  
  const [quantity, setQuantity] = useState(200);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(1);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '6' });
  const [slipcase, setSlipcase] = useState('');
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '1' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });
  const [isDustCoverEnabled, setIsDustCoverEnabled] = useState(false);

  const isCustomSize = selectedSize === 'custom';
  const [pricingData, setPricingData] = useState(getPricingData());

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
  const SIZES = formConfig?.sizes || HARDQUOTE_DEFAULT_CONFIG.sizes;
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

  useEffect(() => {
    console.log('🔍 DEBUG - Current Hardcover Configuration:', {
      title: generalSettings.title,
      description: generalSettings.description,
      hasCustomConfig: formConfig !== HARDQUOTE_DEFAULT_CONFIG,
      configSource: formConfig === HARDQUOTE_DEFAULT_CONFIG ? 'DEFAULT' : 'API'
    });
  }, [formConfig, generalSettings]);

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

  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.08;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 300;
    const hardcoverBaseCost = formConfig?.pricing?.hardcoverBaseCost || 150;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.3;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.2;
    
    let basePrintCost = baseSetupCost + hardcoverBaseCost + (pageCount * baseCostPerPage * quantity);
    
    if (isCustomSize) basePrintCost *= customSizeMultiplier;
    else if (selectedSize !== '6x9') basePrintCost *= standardSizeMultiplier;
    
    const coverPaperCost = 0;
    const insidePaperCost = 0;
    const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
    const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
    const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
    const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
    const dustCoverCost = isDustCoverEnabled ? 100 + (quantity * 0.25) : 0;
    const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.shrinkWrap, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    const directMailUnitCost = directMailing.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.directMail, directMailing.type) : 0;
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;

    const materialCost = coverPaperCost + insidePaperCost;
    const colorCost = coverColorCost + insideColorCost;
    const additionalServicesCost = proofCost + holePunchCost + dustCoverCost + slipcaseCost + shrinkWrapCost + directMailCost;

    const totalAmount = basePrintCost + materialCost + colorCost + additionalServicesCost;

    return {
      basePrinting: basePrintCost,
      materials: materialCost,
      color: colorCost,
      proof: proofCost,
      holePunching: holePunchCost,
      dustCover: dustCoverCost,
      slipcase: slipcaseCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      total: totalAmount,
    };
  }, [pageCount, quantity, selectedSize, isCustomSize, coverColor, insideColor, proof, holePunching, isDustCoverEnabled, slipcase, shrinkWrapping, directMailing, formConfig]);

  const prices = calculatePricing();

  useEffect(() => {
    const newBasePrice = 1500 + (pageCount * 4) + (quantity * 1.2);
    setPricingData(getPricingData(newBasePrice));
  }, [pageCount, quantity]);

  const handleAddToCart = () => {
    const formData = {
      sizeUnit, paperUnit, selectedSize,
      customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
      spineType, spineWidth,
      headband: { color: headbandColor, bookmark },
      cover: { paper: coverPaper, weight: coverWeight, color: coverColor },
      inside: { pageCount, paper: insidePaper, weight: insideWeight, color: insideColor },
      quantity,
      options: { proof, holePunching, slipcase, shrinkWrapping, directMailing, dustCover: isDustCoverEnabled },
      totalAmount: prices.total.toFixed(2),
    };
    
    console.log("Hardcover Form Data Submitted:", formData);
    alert(`Hardcover book added to cart! Total Price: ${formatCurrency(prices.total)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-8 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading hardcover form configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700">
              {formConfig === HARDQUOTE_DEFAULT_CONFIG ? 'Using default hardcover configuration' : 'Using live configuration from editor'}
            </span>
            <button 
              onClick={refreshConfig}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
            >
              🔄 Refresh Config
            </button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {generalSettings.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {generalSettings.description}
          </p>
        </div>

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
              ]}
              selected={paperUnit}
              onChange={(e) => setPaperUnit(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Size & Dimensions
                </h3>
                <SelectDropdown
                  label="Select Standard Size"
                  options={SIZES}
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
                    {customSizeInstructions}
                  </p>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <SelectDropdown 
                  label="Paper Type" 
                  options={PAPER_OPTIONS.cover} 
                  selected={coverPaper} 
                  onChange={(e) => setCoverPaper(e.target.value)} 
                />
                <SelectDropdown 
                  label="Paper Weight" 
                  options={(PAPER_OPTIONS.cover.find(p => p.value === coverPaper)?.gsm || []).map(w => ({ value: w, label: `${w} gsm` }))} 
                  selected={coverWeight} 
                  onChange={(e) => setCoverWeight(e.target.value)} 
                  disabled={!coverPaper}
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

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
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
                />
                <SelectDropdown 
                  label="Paper Weight" 
                  options={(PAPER_OPTIONS.inside.find(p => p.value === insidePaper)?.gsm || []).map(w => ({ value: w, label: `${w} gsm` }))} 
                  selected={insideWeight} 
                  onChange={(e) => setInsideWeight(e.target.value)} 
                  disabled={!insidePaper}
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
                <p className="text-sm text-yellow-800 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please select only the inside page count. Cover pages are calculated separately.
                </p>
              </div>
            </div>
          </div>

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

export default HardQuoteForm;