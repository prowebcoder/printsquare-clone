// components/pages/quote/perfect-binding/PrintQuoteForm.js
import React, { useState, useCallback, useEffect } from 'react';

// --- Static Data (Matching your structure) ---
const bindingTypeOptions = [
  { value: 'PERFECT', label: 'Perfect Binding' },
  { value: 'SADDLE', label: 'Saddle Stitching' },
  { value: 'HARDCOVER', label: 'Hardcover Book' },
  { value: 'WIRE', label: 'Wire Binding' },
];

const sizeOptions = ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', '8.5 x 5.5', '10 x 7.5', '11 x 8.5', 'Custom Size'];

const bindingEdgeOptions = [
  { value: 'LEFT', label: 'Left Side', desc: 'Binding on the left, most common' },
  { value: 'RIGHT', label: 'Right Side', desc: 'First inside page starts from the right' },
  { value: 'TOP', label: 'Top Side', desc: 'Binding on the top, a.k.a calendar binding' },
];

const coverPaperOptions = [
  { value: 'MATTE', label: 'Matte', price: 0 },
  { value: 'GLOSS', label: 'Gloss', price: 0 },
  { value: 'HI-PLUS', label: 'Hi-Plus', price: 50 },
  { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 100 },
  { value: 'PREMIUM', label: 'Premium', price: 150 },
];

const insidePaperOptions = [
  { value: 'GLOSS', label: 'Gloss', price: 0 },
  { value: 'MATTE', label: 'Matte', price: 0 },
  { value: 'HI-PLUS', label: 'Hi-Plus', price: 25 },
  { value: 'UNCOATED', label: 'Uncoated', price: 0 },
  { value: 'TEXTBOOK', label: 'Textbook', price: 30 },
  { value: 'COLORED', label: 'Colored', price: 40 },
];

const printColorOptions = [
  { value: 'CMYK', label: 'Full color', price: 0 },
  { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color', price: 75 },
  { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color', price: 150 },
  { value: 'BW', label: 'Black only', price: -100 },
  { value: 'BW_PMS1', label: 'Black + 1 Spot color', price: -25 },
  { value: 'BW_PMS2', label: 'Black + 2 Spot color', price: 50 },
];

const coverFinishOptions = [
  { value: 'MATTE', label: 'Matte lamination', price: 50 },
  { value: 'GLOSS', label: 'Gloss lamination', price: 50 },
  { value: 'NONE', label: 'None', price: 0 },
];

const coverFoldOptions = [
  { value: 'NONE', label: 'No fold', price: 0 },
  { value: 'FRONT', label: 'Front cover fold', price: 25 },
  { value: 'BACK', label: 'Back cover fold', price: 25 },
  { value: 'BOTH', label: 'Both cover folds', price: 40 },
];

const proofOptions = [
  { value: 'ONLINE', label: 'E-Proof(PDF proof, free)', price: 0 },
  { value: 'DIGITAL', label: 'Digital Proof', price: 50 },
];

const holePunchOptions = [
  { value: '6', label: '0.236" (6mm) drill', price: 15 },
  { value: '8', label: '0.315" (8mm) drill', price: 20 },
  { value: '9.5', label: '0.374" (9.5mm) drill', price: 25 },
];

const slipcaseOptions = [
  { value: 'NONE', label: 'None', price: 0 },
  { value: 'CASE', label: 'Slipcase only', price: 80 },
  { value: 'CASEPRINT', label: 'Slipcase + printing', price: 150 },
];

const shrinkWrapOptions = [
  { value: '1', label: '1 copy/wrapping', price: 0.15 },
  { value: '2', label: '2 copy/wrapping', price: 0.12 },
  { value: '3', label: '3 copy/wrapping', price: 0.10 },
];

const directMailOptions = [
  { value: 'ALL', label: 'DM all quantity', price: 0.75 },
  { value: 'PORTION', label: 'DM a portion of the quantity', price: 0.50 },
];

// Subscription Card Options
const positionOptions = [
  { value: 'FRONT', label: 'Before page 1' },
  { value: 'BACK', label: 'After page 96' },
  { value: 'SELECT', label: 'Front of page no.' },
];

const subscriptionPaperOptions = [
  { value: 'MATTE', label: 'Matte', price: 0 },
  { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 25 },
  { value: 'UNCOATED_W', label: 'Uncoated', price: 0 },
  { value: 'MONTBLANC_EW', label: 'Premium', price: 50 },
];

// Generate page count options from 24 to 880, in multiples of 2
const pageCountOptions = Array.from({ length: (880 - 24) / 2 + 1 }, (_, i) => 24 + i * 2);

// --- Pricing Data (Dynamic based on quantity) ---
const getPricingData = (basePrice = 2340) => {
  const quantities = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  return quantities.map((qty, index) => {
    const price = Math.round(basePrice * (1 + index * 0.05)); // Progressive pricing
    const pricePerCopy = (price / qty).toFixed(2);
    return {
      quantity: qty,
      price: `$${price.toLocaleString()}`,
      pricePerCopy: `$${pricePerCopy}`,
      time: '5 business day'
    };
  });
};

// --- Form Sub-Components ---
const RadioGroup = ({ label, name, options, selected, onChange }) => (
  <div className="flex items-center space-x-4">
    <p className="text-sm font-semibold text-gray-700">{label}:</p>
    {options.map((option) => (
      <label key={option.value} className="inline-flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selected === option.value}
          onChange={onChange}
          className="form-radio text-indigo-600 h-4 w-4"
        />
        <span className="ml-2 text-sm text-gray-600">{option.label}</span>
      </label>
    ))}
  </div>
);

const SelectDropdown = ({ label, options, selected, onChange, className = "" }) => (
  <div className={className}>
    {label && <p className="text-sm font-semibold mb-1 text-gray-700">{label}</p>}
    <select
      value={selected}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);

// Helper function to get option price
const getOptionPrice = (options, selectedValue) => {
  const option = options.find(opt => opt.value === selectedValue);
  return option ? option.price : 0;
};

// Subscription Card Component
const SubscriptionCard = ({ card, index, onUpdate, onRemove, pageCount }) => {
  const handleChange = (field, value) => {
    onUpdate(index, { ...card, [field]: value });
  };

  const handleNumberInput = (field, value) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleChange(field, value);
    }
  };

  return (
    <div className="box-div bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
      <div className="title-top flex justify-between items-center mb-6">
        <p className="font-p1 text-lg font-bold text-gray-800">Subscription Card {index + 1}</p>
        <button 
          className="btn btn-dark bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900 transition"
          onClick={() => onRemove(index)}
        >
          <i className="fa fa-times" aria-hidden="true">x</i>
        </button>
      </div>

      {/* Size Section */}
      <div className="botright-div1 mb-6">
        <p className="font-p2 text-sm font-semibold text-gray-700 mb-3">Size</p>
        <div className="botleft-div2 flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              className="form-control w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Width, &quot;"
              value={card.width}
              onChange={(e) => handleNumberInput('width', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="form-control w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Height, &quot;"
              value={card.height}
              onChange={(e) => handleNumberInput('height', e.target.value)}
            />
            <span className="tool-tip text-xs text-gray-500 mt-1 block">Subscription card size tooltip</span>
          </div>
        </div>
      </div>

      {/* Position Section */}
      <div className="botright-div1 mb-6">
        <p className="font-p2 text-sm font-semibold text-gray-700 mb-3">Position</p>
        <div className="botleft-div2 flex space-x-4">
          <div className="flex-1">
            <SelectDropdown
              label=""
              options={positionOptions.map(opt => ({
                ...opt,
                label: opt.value === 'BACK' ? `After page ${pageCount}` : opt.label
              }))}
              selected={card.position}
              onChange={(e) => handleChange('position', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="form-control w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Input page"
              value={card.selectedPage}
              onChange={(e) => handleNumberInput('selectedPage', e.target.value)}
              readOnly={card.position !== 'SELECT'}
            />
          </div>
        </div>
      </div>

      {/* Paper Section */}
      <div className="botright-div1 mb-6">
        <p className="font-p2 text-sm font-semibold text-gray-700 mb-3">Paper</p>
        <div className="botleft-div2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <SelectDropdown
            label=""
            options={subscriptionPaperOptions}
            selected={card.paper}
            onChange={(e) => handleChange('paper', e.target.value)}
          />
          <SelectDropdown
            label=""
            options={[{ value: '', label: 'Choose' }]}
            selected={card.subname}
            onChange={(e) => handleChange('subname', e.target.value)}
          />
          <SelectDropdown
            label=""
            options={[{ value: '', label: 'Choose' }]}
            selected={card.color}
            onChange={(e) => handleChange('color', e.target.value)}
          />
          <SelectDropdown
            label=""
            options={[{ value: '', label: 'Choose' }]}
            selected={card.gsm}
            onChange={(e) => handleChange('gsm', e.target.value)}
          />
        </div>
      </div>

      {/* Print Color Section */}
      <div className="botright-div1">
        <p className="font-p2 text-sm font-semibold text-gray-700 mb-3">Print Color</p>
        <div className="botleft-div2">
          <SelectDropdown
            label=""
            options={printColorOptions}
            selected={card.printColor}
            onChange={(e) => handleChange('printColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const PrintQuoteForm = () => {
  // --- STATE MANAGEMENT ---
  const [bindingType, setBindingType] = useState('PERFECT');
  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('US');
  const [selectedSize, setSelectedSize] = useState('8.5 x 11');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [bindingEdge, setBindingEdge] = useState('LEFT');
  const [spineWidth, setSpineWidth] = useState('0.178"');

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

  // Derived state
  const isCustomSize = selectedSize === 'Custom Size';
  
  // Pricing data
  const [pricingData, setPricingData] = useState(getPricingData());

  // Handle number input for custom dimensions
  const handleNumberInput = (setter) => (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  // Handle quantity input
  const handleQuantityInput = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? 0 : parseInt(value);
      setQuantity(numValue);
      
      // Find closest match in pricing table
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

  // Subscription Card Management
  const addSubscriptionCard = () => {
    if (subscriptionCards.length < 10) {
      const newCard = {
        id: Date.now(),
        width: '',
        height: '',
        position: '',
        selectedPage: '',
        paper: '',
        subname: '',
        color: '',
        gsm: '',
        printColor: 'CMYK'
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
    const updatedCards = subscriptionCards.filter((_, i) => i !== index);
    setSubscriptionCards(updatedCards);
  };

  // --- COMPREHENSIVE PRICE CALCULATION ---
  const calculatePricing = useCallback(() => {
    // Base printing cost based on quantity and page count
    const baseCostPerPage = 0.05; // $0.05 per page
    const baseSetupCost = 200; // Base setup cost
    
    let basePrintCost = baseSetupCost + (pageCount * baseCostPerPage * quantity);
    
    // Size impact - custom sizes cost more
    if (isCustomSize) {
      basePrintCost *= 1.2;
    } else if (selectedSize !== '8.5 x 11') {
      basePrintCost *= 1.1;
    }
    
    // Paper quality impact
    const coverPaperCost = getOptionPrice(coverPaperOptions, coverPaper);
    const insidePaperCost = getOptionPrice(insidePaperOptions, insidePaper);
    
    // Print color impact
    const coverColorCost = getOptionPrice(printColorOptions, coverColor);
    const insideColorCost = getOptionPrice(printColorOptions, insideColor);
    
    // Cover finish and fold
    const coverFinishCost = getOptionPrice(coverFinishOptions, coverFinish);
    const coverFoldCost = getOptionPrice(coverFoldOptions, coverFold);
    
    // Additional services with proper pricing
    const proofCost = getOptionPrice(proofOptions, proof);
    const holePunchCost = holePunching.enabled ? getOptionPrice(holePunchOptions, holePunching.type) : 0;
    const dustCoverCost = isDustCoverEnabled ? 100 + (quantity * 0.25) : 0;
    
    // Subscription cards cost
    const subscriptionCardBaseCost = 25; // Base cost per card
    const subscriptionCardCost = subscriptionCards.length * (subscriptionCardBaseCost + (quantity * 0.02));
    
    // Slipcase cost
    const slipcaseCost = getOptionPrice(slipcaseOptions, slipcase);
    
    // Shrink wrapping cost
    const shrinkWrapUnitCost = shrinkWrapping.enabled ? getOptionPrice(shrinkWrapOptions, shrinkWrapping.type) : 0;
    const shrinkWrapCost = shrinkWrapping.enabled ? quantity * shrinkWrapUnitCost : 0;
    
    // Direct mailing cost
    const directMailUnitCost = directMailing.enabled ? getOptionPrice(directMailOptions, directMailing.type) : 0;
    const directMailCost = directMailing.enabled ? quantity * directMailUnitCost : 0;

    // Calculate totals
    const materialCost = coverPaperCost + insidePaperCost;
    const colorCost = coverColorCost + insideColorCost;
    const coverCost = coverFinishCost + coverFoldCost;
    const additionalServicesCost = proofCost + holePunchCost + dustCoverCost + subscriptionCardCost + slipcaseCost + shrinkWrapCost + directMailCost;

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
  }, [
    pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper, 
    coverColor, insideColor, coverFinish, coverFold, proof, holePunching,
    isDustCoverEnabled, subscriptionCards.length, slipcase, shrinkWrapping, directMailing
  ]);

  const prices = calculatePricing();

  // Update pricing when key parameters change
  useEffect(() => {
    const newBasePrice = 1000 + (pageCount * 3) + (quantity * 0.8);
    setPricingData(getPricingData(newBasePrice));
  }, [pageCount, quantity]);

  const handleQuantitySelect = (index) => {
    setSelectedQuantityIndex(index);
    setQuantity(pricingData[index].quantity);
  };

  // Toggle handlers
  const handleHolePunchToggle = (e) => {
    setHolePunching(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleShrinkWrapToggle = (e) => {
    setShrinkWrapping(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleDirectMailToggle = (e) => {
    setDirectMailing(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleAddToCart = () => {
    const formData = {
      bindingType,
      sizeUnit,
      paperUnit,
      selectedSize,
      customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
      bindingEdge,
      spineWidth,
      cover: { 
        paper: coverPaper, 
        weight: coverWeight,
        color: coverColor,
        finish: coverFinish, 
        fold: coverFold,
        foldWidth,
        dustCover: isDustCoverEnabled 
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
        directMailing 
      },
      totalAmount: prices.total.toFixed(2),
    };
    
    console.log("Form Data Submitted:", formData);
    alert(`Order added to cart! Total Price: $${prices.total.toFixed(2)}`);
  };

  // Current selected price
  const currentPrice = pricingData[selectedQuantityIndex]?.price || '$2,340';
  const currentPricePerCopy = pricingData[selectedQuantityIndex]?.pricePerCopy || '$11.70';

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 font-sans">
      {/* Binding Type Selection */}
      <div className="first-btn mb-8">
        <div className="flex space-x-4">
          {bindingTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn btn-lg px-6 py-3 rounded-lg font-semibold transition ${
                bindingType === option.value 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setBindingType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Selection */}
      <div className="instantq1-radio mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded-lg">
          <RadioGroup
            label="Size Unit"
            name="size_type_sel"
            options={[
              { value: 'INCH', label: 'inch' }, 
              { value: 'MM', label: 'mm' }
            ]}
            selected={sizeUnit}
            onChange={(e) => setSizeUnit(e.target.value)}
          />
          <RadioGroup
            label="Paper Unit"
            name="weight_type_sel"
            options={[
              { value: 'GSM', label: 'Grammage, gsm' },
              { value: 'US', label: 'US Weight, pound' },
              { value: 'PT', label: 'Caliper, point' },
              { value: 'JAPAN', label: 'Japan Weight, kg' },
            ]}
            selected={paperUnit}
            onChange={(e) => setPaperUnit(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT & MIDDLE COLUMNS: Configuration Options */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Size & Binding Edge Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Size Selection */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Size</h3>
              <SelectDropdown
                label="Select Size"
                options={sizeOptions.map(s => ({ value: s, label: s }))}
                selected={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                  if (e.target.value !== 'Custom Size') {
                    setCustomWidth('');
                    setCustomHeight('');
                  }
                }}
              />
              <div className="flex space-x-3 mt-4">
                <input
                  type="text"
                  value={isCustomSize ? customWidth : ''}
                  onChange={handleNumberInput(setCustomWidth)}
                  placeholder={`Width, ${sizeUnit === 'INCH' ? '"' : 'mm'}`}
                  className={`flex-1 p-3 border rounded-lg text-sm transition-colors ${
                    isCustomSize 
                      ? 'bg-white border-indigo-500 ring-1 ring-indigo-500' 
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                  readOnly={!isCustomSize}
                />
                <input
                  type="text"
                  value={isCustomSize ? customHeight : ''}
                  onChange={handleNumberInput(setCustomHeight)}
                  placeholder={`Height, ${sizeUnit === 'INCH' ? '"' : 'mm'}`}
                  className={`flex-1 p-3 border rounded-lg text-sm transition-colors ${
                    isCustomSize 
                      ? 'bg-white border-indigo-500 ring-1 ring-indigo-500' 
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                  readOnly={!isCustomSize}
                />
              </div>
              {isCustomSize && (
                <p className="text-xs text-gray-500 mt-3">
                  Min: 4&quot;x4&quot;, Max: 11.8&quot;x14.3&quot;
                </p>
              )}
            </div>

            {/* Binding Edge - Updated to Dropdown */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Binding Edge</h3>
              <SelectDropdown
                label="Select Binding Edge"
                options={bindingEdgeOptions}
                selected={bindingEdge}
                onChange={(e) => setBindingEdge(e.target.value)}
              />
              <p className="text-sm text-gray-700 mt-4">
                Spine Width: <span className="font-semibold text-indigo-600">{spineWidth}</span>
              </p>
            </div>
          </div>

          {/* Cover Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Cover</h3>
              <div className="text-sm space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Portfolio</a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Paper Image</a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SelectDropdown 
                label="Paper" 
                options={coverPaperOptions} 
                selected={coverPaper} 
                onChange={(e) => setCoverPaper(e.target.value)} 
              />
              <SelectDropdown 
                label="Weight" 
                options={[
                  { value: '100', label: '68# text' },
                  { value: '120', label: '80# text' },
                  { value: '150', label: '100# text' },
                  { value: '250', label: '92# cover' },
                  { value: '300', label: '110# cover' }
                ]} 
                selected={coverWeight} 
                onChange={(e) => setCoverWeight(e.target.value)} 
              />
              <SelectDropdown 
                label="Print Color" 
                options={printColorOptions} 
                selected={coverColor} 
                onChange={(e) => setCoverColor(e.target.value)} 
              />
              <SelectDropdown 
                label="Cover Finish" 
                options={coverFinishOptions} 
                selected={coverFinish} 
                onChange={(e) => setCoverFinish(e.target.value)} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <SelectDropdown 
                label="Cover Fold" 
                options={coverFoldOptions} 
                selected={coverFold} 
                onChange={(e) => setCoverFold(e.target.value)} 
              />
              {coverFold !== 'NONE' && (
                <div>
                  <p className="text-sm font-semibold mb-1 text-gray-700">Fold Width</p>
                  <input
                    type="text"
                    placeholder="Fold width"
                    value={foldWidth}
                    onChange={handleNumberInput(setFoldWidth)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-8">
              <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition">
                + Add-on
              </button>
              <button 
                onClick={() => setIsDustCoverEnabled(!isDustCoverEnabled)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  isDustCoverEnabled 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {isDustCoverEnabled ? '✓ Dust Cover Added' : '+ Dust Cover'}
              </button>
            </div>
          </div>

          {/* Inside Page Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Inside Page</h3>
              <button 
                onClick={addSubscriptionCard}
                className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                disabled={subscriptionCards.length >= 10}
              >
                + Subscription Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SelectDropdown
                label="Page Count"
                options={pageCountOptions.map(c => ({ value: c, label: c.toString() }))}
                selected={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
              />
              <SelectDropdown 
                label="Paper" 
                options={insidePaperOptions} 
                selected={insidePaper} 
                onChange={(e) => setInsidePaper(e.target.value)} 
              />
              <SelectDropdown 
                label="Weight" 
                options={[
                  { value: '100', label: '68# text' },
                  { value: '120', label: '80# text' },
                  { value: '150', label: '100# text' }
                ]} 
                selected={insideWeight} 
                onChange={(e) => setInsideWeight(e.target.value)} 
              />
              <SelectDropdown 
                label="Print Color" 
                options={printColorOptions} 
                selected={insideColor} 
                onChange={(e) => setInsideColor(e.target.value)} 
              />
            </div>

            <p className="text-xs text-red-500 mt-4">
              * Please select only inside page count. (Cover is separate)
            </p>

            {/* Render Subscription Cards */}
            {subscriptionCards.map((card, index) => (
              <SubscriptionCard
                key={card.id}
                card={card}
                index={index}
                onUpdate={updateSubscriptionCard}
                onRemove={removeSubscriptionCard}
                pageCount={pageCount}
              />
            ))}

            <div className="flex space-x-4 mt-6">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                Edit Pages
              </button>
              <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                View Paper Images
              </button>
              <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                Download Layout Guide
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quantity, Pricing & Options */}
        <div className="space-y-8">
          
          {/* Quantity Input */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quantity</h3>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityInput}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg font-semibold"
              placeholder="Enter Quantity"
            />
          </div>

          {/* Pricing Table */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="text-sm text-gray-600 mb-6 space-y-2">
              <p>* Production time does not include Weekends and Holidays.</p>
              <p>* Printing only takes place during weekdays.</p>
              <p>* Printing process starts after the confirmation of final proof and payment.</p>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price/Copy</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Production Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingData.map((item, index) => (
                    <tr 
                      key={index}
                      className={`cursor-pointer transition ${
                        selectedQuantityIndex === index 
                          ? 'bg-indigo-50 hover:bg-indigo-100' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleQuantitySelect(index)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.quantity} copies</td>
                      <td className="px-4 py-3 text-sm font-semibold text-indigo-600">{item.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.pricePerCopy}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Additional Options</h3>
            
            <div className="space-y-6">
              {/* Proof */}
              <SelectDropdown 
                label="Proof" 
                options={proofOptions} 
                selected={proof} 
                onChange={(e) => setProof(e.target.value)} 
              />

              {/* Hole Punching */}
              <div className={`border-2 rounded-lg p-4 transition ${
                holePunching.enabled ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
              }`}>
                <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={holePunching.enabled}
                    onChange={handleHolePunchToggle}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="font-semibold text-gray-800">Hole Punching</span>
                </label>
                <SelectDropdown 
                  options={holePunchOptions} 
                  selected={holePunching.type} 
                  onChange={(e) => setHolePunching(prev => ({ ...prev, type: e.target.value }))} 
                />
              </div>

              {/* Slipcase */}
              <SelectDropdown 
                label="Slipcase" 
                options={slipcaseOptions} 
                selected={slipcase} 
                onChange={(e) => setSlipcase(e.target.value)} 
              />

              {/* Shrink Wrapping */}
              <div className={`border-2 rounded-lg p-4 transition ${
                shrinkWrapping.enabled ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
              }`}>
                <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={shrinkWrapping.enabled}
                    onChange={handleShrinkWrapToggle}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="font-semibold text-gray-800">Shrink Wrapping</span>
                </label>
                <SelectDropdown 
                  options={shrinkWrapOptions} 
                  selected={shrinkWrapping.type} 
                  onChange={(e) => setShrinkWrapping(prev => ({ ...prev, type: e.target.value }))} 
                />
              </div>

              {/* Direct Mailing */}
              <div className={`border-2 rounded-lg p-4 transition ${
                directMailing.enabled ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
              }`}>
                <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={directMailing.enabled}
                    onChange={handleDirectMailToggle}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="font-semibold text-gray-800">Direct Mailing</span>
                </label>
                <SelectDropdown 
                  options={directMailOptions} 
                  selected={directMailing.type} 
                  onChange={(e) => setDirectMailing(prev => ({ ...prev, type: e.target.value }))} 
                />
              </div>
            </div>

            {/* Detailed Price Breakdown */}
            <div className="mt-8 border-t pt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Printing</span>
                  <span className="font-semibold">${prices.basePrinting.toFixed(2)}</span>
                </div>
                
                {prices.materials > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Premium Materials</span>
                    <span className="font-semibold">${prices.materials.toFixed(2)}</span>
                  </div>
                )}
                
                {prices.color > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Color Options</span>
                    <span className="font-semibold">${prices.color.toFixed(2)}</span>
                  </div>
                )}
                
                {prices.cover > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Cover Finishes</span>
                    <span className="font-semibold">${prices.cover.toFixed(2)}</span>
                  </div>
                )}
                
                {prices.proof > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Proof (Digital)</span>
                    <span className="font-semibold">${prices.proof.toFixed(2)}</span>
                  </div>
                )}
                
                {prices.holePunching > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Hole Punching</span>
                    <span className="font-semibold">${prices.holePunching.toFixed(2)}</span>
                  </div>
                )}
                
                {prices.dustCover > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Dust Cover</span>
                    <span className="font-semibold">${prices.dustCover.toFixed(2)}</span>
                  </div>
                )}
                
                {prices.subscriptionCards > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subscription Cards ({subscriptionCards.length})</span>
                    <span className="font-semibold">${prices.subscriptionCards.toFixed(2)}</span>
                  </div>
                )}

                {prices.slipcase > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Slipcase</span>
                    <span className="font-semibold">${prices.slipcase.toFixed(2)}</span>
                  </div>
                )}

                {prices.shrinkWrapping > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Shrink Wrapping</span>
                    <span className="font-semibold">${prices.shrinkWrapping.toFixed(2)}</span>
                  </div>
                )}

                {prices.directMailing > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Direct Mailing</span>
                    <span className="font-semibold">${prices.directMailing.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-xl font-bold text-indigo-600">${prices.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition">
                Check Shipping Cost
              </button>
              <button 
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQuoteForm;




