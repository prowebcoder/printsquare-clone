//components/pages/quote/saddle-stitching/SaddleStitchingForm.js
import React, { useState } from 'react';

// --- Static Data (Expanded based on live site) ---
const sizeOptions = ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', '8.5 x 5.5', '10 x 7.5', '11 x 8.5', 'Custom Size'];
const bindingEdgeOptions = [
  { value: 'LEFT', label: 'Left Side', desc: 'Binding on the left, most common', image: '/asset/images/quote/edge01.png' },
  { value: 'RIGHT', label: 'Right Side', desc: 'First inside page starts from the right', image: '/asset/images/quote/edge02.png' },
  { value: 'TOP', label: 'Top Side', desc: 'Binding on the top, a.k.a calendar binding', image: '/asset/images/quote/edge03.png' },
];
const coverPaperOptions = [
  { value: 'MATTE', label: 'Matte' },
  { value: 'GLOSS', label: 'Gloss' },
  { value: 'HI-PLUS', label: 'Hi-Plus' },
  { value: 'HI-Q MATTE', label: 'Hi-Q Matte' },
  { value: 'PREMIUM', label: 'Premium' },
];
const insidePaperOptions = [
  { value: 'GLOSS', label: 'Gloss' },
  { value: 'MATTE', label: 'Matte' },
  { value: 'HI-PLUS', label: 'Hi-Plus' },
  { value: 'UNCOATED', label: 'Uncoated' },
  { value: 'TEXTBOOK', label: 'Textbook' },
  { value: 'COLORED', label: 'Colored' },
];
const printColorOptions = [
  { value: 'CMYK', label: 'Full color' },
  { value: 'CMYK_1S', label: 'Full color + 1 Spot color' },
  { value: 'CMYK_2S', label: 'Full color + 2 Spot color' },
  { value: 'BW', label: 'Black only' },
  { value: 'BW_1S', label: 'Black + 1 Spot color' },
  { value: 'BW_2S', label: 'Black + 2 Spot color' },
];
const coverFoldOptions = [
  { value: 'NONE', label: 'No fold' },
  { value: 'FRONT', label: 'Front cover fold' },
  { value: 'BACK', label: 'Back cover fold' },
  { value: 'BOTH', label: 'Both cover folds' },
];
const holePunchOptions = [
  { value: '6', label: '0.236" (6mm) drill' },
  { value: '8', label: '0.315" (8mm) drill' },
  { value: '9.5', label: '0.374" (9.5mm) drill' },
];
const slipcaseOptions = [
  { value: 'NONE', label: 'None' },
  { value: 'ONLY', label: 'Slipcase only' },
  { value: 'PRINT', label: 'Slipcase + printing' },
];
const shrinkWrapOptions = [
  { value: '1', label: '1 copy/wrapping' },
  { value: '2', label: '2 copy/wrapping' },
  { value: '3', label: '3 copy/wrapping' },
];
// Generate page count options from 24 to 880, in multiples of 2
const pageCountOptions = Array.from({ length: (880 - 24) / 2 + 1 }, (_, i) => 24 + i * 2);


// --- Form Sub-Components (Unchanged) ---
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

const SelectDropdown = ({ label, options, selected, onChange }) => (
  <div>
    <p className="text-sm font-semibold mb-1">{label}</p>
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


// --- Main Component ---
const SaddleStitchingForm = () => {
  // --- STATE MANAGEMENT ---
  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('US');
  const [selectedSize, setSelectedSize] = useState('8.5 x 11'); // Default to a common size
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [bindingEdge, setBindingEdge] = useState('LEFT');
  
  // Cover State
  const [coverPaper, setCoverPaper] = useState('MATTE');
  const [coverFoldType, setCoverFoldType] = useState('NONE'); // New state
  const [isDustCoverEnabled, setIsDustCoverEnabled] = useState(false); // New state

  // Inside Page State
  const [insidePageCount, setInsidePageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [subscriptionCardCount, setSubscriptionCardCount] = useState(0); // New state

  // Quantity & Options State
  const [quantity, setQuantity] = useState(200);
  const [proofType, setProofType] = useState('ONLINE'); // ONLINE is free
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '8' });
  const [slipcaseOption, setSlipcaseOption] = useState('NONE'); // New state
  const [shrinkWrapOption, setShrinkWrapOption] = useState('1'); // New state
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });


  // --- DERIVED VALUES & LOGIC ---
  const isCustomSize = selectedSize === 'Custom Size';

  // --- MOCK PRICE CALCULATION LOGIC ---
  const calculatePricing = () => {
    // Base cost is highly dependent on PageCount, Size, and Quantity. We'll simulate a range.
    let basePrintCost = 500 + (insidePageCount * 5) + (quantity * 2);
    if (selectedSize !== '8.5 x 11') basePrintCost *= 1.1; // Larger/smaller sizes cost more
    
    // Cost of add-ons
    const proofCost = proofType === 'DIGITAL' ? 50 : 0;
    const holePunchCost = holePunching.enabled ? 15 : 0;
    const dustCoverCost = isDustCoverEnabled ? 100 : 0;
    const subscriptionCardCost = subscriptionCardCount * 25;
    const coverFoldCost = coverFoldType === 'NONE' ? 0 : (coverFoldType === 'BOTH' ? 40 : 20);
    const slipcaseCost = slipcaseOption === 'PRINT' ? 150 : (slipcaseOption === 'ONLY' ? 80 : 0);
    const shrinkWrapCost = quantity * 0.1; // Small cost per unit for wrapping
    const directMailCost = directMailing.enabled ? quantity * 0.50 : 0;

    const totalAmount = basePrintCost + proofCost + holePunchCost + dustCoverCost + subscriptionCardCost + coverFoldCost + slipcaseCost + shrinkWrapCost + directMailCost;

    return {
      printing: basePrintCost,
      proof: proofCost,
      holePunching: holePunchCost,
      dustCover: dustCoverCost,
      subscriptionCards: subscriptionCardCost,
      coverFold: coverFoldCost,
      slipcase: slipcaseCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      total: totalAmount,
    };
  };

  const prices = calculatePricing();


  // --- HANDLERS ---
  const handleHolePunchToggle = (e) => {
    setHolePunching(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleDirectMailToggle = (e) => {
    setDirectMailing(prev => ({ ...prev, enabled: e.target.checked }));
  };

  const handleAddToCart = () => {
    const formData = {
      // Collect all state variables for submission
      sizeUnit, paperUnit, selectedSize,
      customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
      bindingEdge,
      cover: { paper: coverPaper, fold: coverFoldType, dustCover: isDustCoverEnabled },
      inside: { pageCount: insidePageCount, paper: insidePaper, subCards: subscriptionCardCount },
      quantity,
      options: { proofType, holePunching, slipcaseOption, shrinkWrapOption, directMailing },
      totalAmount: prices.total.toFixed(2),
    };
    
    console.log("Form Data Submitted:", formData);
    alert(`Order details logged to console. Total Price: $${prices.total.toFixed(2)}`);
  };

  // --- RENDER ---
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Saddle Stiching Configuration</h1>

      {/* --- Unit Selectors --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white shadow-md rounded-lg mb-6">
        <RadioGroup
          label="Size Unit"
          name="size_type_sel"
          options={[{ value: 'INCH', label: 'inch' }, { value: 'MM', label: 'mm' }]}
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
            { value: 'JAPAN', label: 'Japan Weight, kg' }, // Added
          ]}
          selected={paperUnit}
          onChange={(e) => setPaperUnit(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- LEFT COLUMN: Configuration Options --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Size & Binding Edge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Size */}
            <div className="bg-white p-4 rounded-lg shadow-md border">
              <p className="text-lg font-bold mb-3 text-indigo-700">Size</p>
              <SelectDropdown
                label="Select Size"
                options={sizeOptions.map(s => ({ value: s, label: s }))}
                selected={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                  if (e.target.value !== 'Custom Size') { setCustomWidth(''); setCustomHeight(''); }
                }}
              />
              <div className="flex space-x-4 mt-3">
                <input
                  type="text"
                  value={isCustomSize ? customWidth : ''}
                  onChange={(e) => isCustomSize && setCustomWidth(e.target.value)}
                  placeholder={`Width, ${sizeUnit === 'INCH' ? '"' : 'mm'}`}
                  className={`w-1/2 p-2 border rounded-md text-sm transition-colors ${isCustomSize ? 'bg-white border-indigo-500' : 'bg-gray-100 border-gray-300'}`}
                  readOnly={!isCustomSize}
                />
                <input
                  type="text"
                  value={isCustomSize ? customHeight : ''}
                  onChange={(e) => isCustomSize && setCustomHeight(e.target.value)}
                  placeholder={`Height, ${sizeUnit === 'INCH' ? '"' : 'mm'}`}
                  className={`w-1/2 p-2 border rounded-md text-sm transition-colors ${isCustomSize ? 'bg-white border-indigo-500' : 'bg-gray-100 border-gray-300'}`}
                  readOnly={!isCustomSize}
                />
              </div>
              {isCustomSize && (
                <p className="text-xs text-gray-500 mt-2">
                  Min: 4x4inch, Max: 11.8x14.8inch
                </p>
              )}
            </div>

            {/* Binding Edge */}
            <div className="bg-white p-4 rounded-lg shadow-md border">
              <p className="text-lg font-bold mb-3 text-indigo-700">Binding Edge</p>
              <div className="flex space-x-2">
                {bindingEdgeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBindingEdge(opt.value)}
                    className={`flex-1 p-2 border rounded-lg transition-all ${
                      bindingEdge === opt.value
                        ? 'border-indigo-500 bg-indigo-50 shadow-inner'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="h-10 w-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded-md">
                        {opt.label} Img
                      </div>
                      <p className="text-xs font-semibold mt-1">{opt.label}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Spine Width: <span className="font-semibold text-gray-700">0.191 {sizeUnit === 'INCH' ? '"' : 'mm'}</span>
              </p>
            </div>
          </div>

          {/* Cover Section */}
          <div className="bg-white p-4 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <p className="text-xl font-bold text-indigo-700">Cover</p>
              <div className="text-sm space-x-3">
                <a href="#" className="text-indigo-500 hover:underline">Portfolio</a>
                <a href="#" className="text-indigo-500 hover:underline">Paper Image</a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SelectDropdown 
                label="Paper" 
                options={coverPaperOptions} 
                selected={coverPaper} 
                onChange={(e) => setCoverPaper(e.target.value)} 
              />
              <SelectDropdown label="Subname" options={['Choose']} selected="Choose" onChange={() => {}} />
              <SelectDropdown label="Color" options={['Choose']} selected="Choose" onChange={() => {}} />
              <SelectDropdown label="GSM" options={['250 (92# cover)', '300 (110# cover)']} selected="250 (92# cover)" onChange={() => {}} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <SelectDropdown label="Print Color" options={printColorOptions} selected="CMYK" onChange={() => {}} />
                <SelectDropdown label="Cover Finish" options={[{ value: 'MATTE', label: 'Matte lamination' }, { value: 'GLOSS', label: 'Gloss lamination' }]} selected="MATTE" onChange={() => {}} />
                <SelectDropdown 
                  label="Cover Fold" 
                  options={coverFoldOptions} 
                  selected={coverFoldType} 
                  onChange={(e) => setCoverFoldType(e.target.value)} 
                />
                {coverFoldType !== 'NONE' && (
                  <input
                    type="text"
                    placeholder="Fold Width"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm mt-6"
                  />
                )}
            </div>

            <div className="flex space-x-4 mt-6">
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition">+ Add-on</button>
                <button 
                  onClick={() => setIsDustCoverEnabled(!isDustCoverEnabled)}
                  className={`px-4 py-2 rounded-md font-semibold transition ${isDustCoverEnabled ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  {isDustCoverEnabled ? '✓ Dust Cover Added' : '+ Dust Cover'}
                </button>
            </div>
            {isDustCoverEnabled && (
                <div className="mt-4 p-3 border border-indigo-200 rounded-md bg-indigo-50">
                    <p className="font-semibold text-sm mb-2">Dust Cover Settings</p>
                    <div className="grid grid-cols-2 gap-3">
                        <SelectDropdown label="Paper" options={insidePaperOptions} selected="GLOSS" onChange={() => {}} />
                        <SelectDropdown label="Finish" options={[{ value: 'GLOSS', label: 'Gloss lamination' }, { value: 'NONE', label: 'None' }]} selected="GLOSS" onChange={() => {}} />
                    </div>
                </div>
            )}
          </div>

          {/* Inside Page Section */}
          <div className="bg-white p-4 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <p className="text-xl font-bold text-indigo-700">Inside Page</p>
              <button 
                onClick={() => setSubscriptionCardCount(c => Math.min(10, c + 1))}
                className="text-sm text-indigo-500 hover:underline cursor-pointer font-semibold"
              >
                + Subscription Card
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SelectDropdown
                label="Page Count"
                options={pageCountOptions.map(c => ({ value: c, label: c.toString() }))}
                selected={insidePageCount}
                onChange={(e) => setInsidePageCount(Number(e.target.value))}
              />
              <SelectDropdown 
                label="Paper" 
                options={insidePaperOptions} 
                selected={insidePaper} 
                onChange={(e) => setInsidePaper(e.target.value)} 
              />
              <SelectDropdown label="GSM" options={['100 (68# text)', '120 (80# text)']} selected="100 (68# text)" onChange={() => {}} />
              <SelectDropdown label="Print Color" options={printColorOptions} selected="CMYK" onChange={() => {}} />
            </div>

            <p className="text-xs text-red-500 mt-4">* Please select only inside page count. (Cover is separate)</p>
            {subscriptionCardCount > 0 && (
                <div className="p-3 bg-gray-100 rounded-md mt-4">
                    <p className="text-sm font-semibold mb-2">{subscriptionCardCount} Subscription Cards Added</p>
                    <button 
                      onClick={() => setSubscriptionCardCount(c => Math.max(0, c - 1))}
                      className="text-xs text-red-500 hover:underline"
                    >
                      - Remove last Card
                    </button>
                </div>
            )}
            

            <div className="flex space-x-4 mt-4">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-600 transition">Edit Pages</button>
                <a href="#" target="_blank" className="px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-800 transition">View Paper Images</a>
                <a href="#" target="_blank" className="px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-gray-800 transition">Download Layout Guide</a>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Quantity, Pricing & Options --- */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Quantity */}
          <div className="bg-white p-4 rounded-lg shadow-md border">
            <p className="text-lg font-bold mb-2 text-indigo-700">Quantity</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              placeholder="Enter Quantity"
              min="1"
            />
          </div>

          {/* Pricing Table */}
          <div className="bg-white p-4 rounded-lg shadow-md border">
            <div className="text-sm text-gray-500 mb-4 space-y-1">
              <p>* Production time does not include Weekends and Holidays.</p>
              <p>* Printing process starts after the confirmation of final proof and payment.</p>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prod. Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <tr>
                  <td className="px-3 py-2 whitespace-nowrap">{quantity}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-green-600 font-bold">${prices.printing.toFixed(2)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">5 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Options / Add-ons (FULLY FUNCTIONAL) */}
          <div className="bg-white p-4 rounded-lg shadow-md border space-y-4">
            <p className="text-xl font-bold text-indigo-700 border-b pb-2 mb-3">Additional Options</p>
            
            {/* Proof */}
            <SelectDropdown 
                label="Proof" 
                options={[{ value: 'ONLINE', label: 'E-Proof (PDF proof, free)' }, { value: 'DIGITAL', label: 'Digital Proof (9 days, +$50)' }]} 
                selected={proofType} 
                onChange={(e) => setProofType(e.target.value)} 
            />

            {/* Hole Punching */}
            <div className={`border p-3 rounded-md transition-colors ${holePunching.enabled ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'}`}>
              <label className="flex items-center space-x-3 mb-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={holePunching.enabled}
                  onChange={handleHolePunchToggle}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded" 
                />
                <span className="font-semibold text-gray-700">Hole Punching</span>
              </label>
              <SelectDropdown 
                label="" 
                options={holePunchOptions} 
                selected={holePunching.type} 
                onChange={(e) => setHolePunching(prev => ({ ...prev, type: e.target.value }))} 
              />
            </div>

            {/* Slipcase */}
            <SelectDropdown 
                label="Slipcase" 
                options={slipcaseOptions} 
                selected={slipcaseOption} 
                onChange={(e) => setSlipcaseOption(e.target.value)} 
            />

            {/* Shrink Wrapping */}
            <SelectDropdown 
                label="Shrink Wrapping" 
                options={shrinkWrapOptions} 
                selected={shrinkWrapOption} 
                onChange={(e) => setShrinkWrapOption(e.target.value)} 
            />
            
            {/* Direct Mailing */}
            <div className={`border p-3 rounded-md transition-colors ${directMailing.enabled ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'}`}>
              <label className="flex items-center space-x-3 mb-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={directMailing.enabled}
                  onChange={handleDirectMailToggle}
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded" 
                />
                <span className="font-semibold text-gray-700">Direct Mailing</span>
              </label>
              <SelectDropdown 
                label="" 
                options={[{ value: 'ALL', label: 'DM all quantity' }, { value: 'PORTION', label: 'DM a portion of the quantity' }]} 
                selected={directMailing.type} 
                onChange={(e) => setDirectMailing(prev => ({ ...prev, type: e.target.value }))} 
              />
            </div>

            {/* Price Breakdown Table (DYNAMICALLY CALCULATED) */}
            <table className="min-w-full divide-y divide-gray-200 mt-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <tr><td className="px-3 py-2">Printing</td><td className="px-3 py-2 text-right">${prices.printing.toFixed(2)}</td></tr>
                {prices.proof > 0 && <tr><td className="px-3 py-2">Proof (Digital)</td><td className="px-3 py-2 text-right">${prices.proof.toFixed(2)}</td></tr>}
                {prices.coverFold > 0 && <tr><td className="px-3 py-2">Cover Fold ({coverFoldType})</td><td className="px-3 py-2 text-right">${prices.coverFold.toFixed(2)}</td></tr>}
                {prices.dustCover > 0 && <tr><td className="px-3 py-2">Dust Cover</td><td className="px-3 py-2 text-right">${prices.dustCover.toFixed(2)}</td></tr>}
                {prices.subscriptionCards > 0 && <tr><td className="px-3 py-2">Sub. Cards ({subscriptionCardCount}x)</td><td className="px-3 py-2 text-right">${prices.subscriptionCards.toFixed(2)}</td></tr>}
                {prices.holePunching > 0 && <tr><td className="px-3 py-2">Hole Punching</td><td className="px-3 py-2 text-right">${prices.holePunching.toFixed(2)}</td></tr>}
                {prices.slipcase > 0 && <tr><td className="px-3 py-2">Slipcase ({slipcaseOption})</td><td className="px-3 py-2 text-right">${prices.slipcase.toFixed(2)}</td></tr>}
                {prices.shrinkWrapping > 0 && <tr><td className="px-3 py-2">Shrink Wrapping ({shrinkWrapOption} copy/wrap)</td><td className="px-3 py-2 text-right">${prices.shrinkWrapping.toFixed(2)}</td></tr>}
                {prices.directMailing > 0 && <tr><td className="px-3 py-2">Direct Mailing</td><td className="px-3 py-2 text-right">${prices.directMailing.toFixed(2)}</td></tr>}

                <tr className="font-bold bg-indigo-50 border-t-2 border-indigo-200">
                  <td className="px-3 py-2">Amount</td>
                  <td className="px-3 py-2 text-right text-lg text-indigo-600">${prices.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button 
                type="button" 
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md font-semibold hover:bg-gray-700 transition"
              >
                Check Shipping Cost
              </button>
              <button 
                type="button" 
                onClick={handleAddToCart}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
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

export default SaddleStitchingForm;