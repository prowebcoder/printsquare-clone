// components/pages/quote/perfect-binding/PageEditModal.js
'use client';
import React, { useState, useEffect } from 'react';

// ===== SUB-MODAL COMPONENTS =====

// Paper Edit Sub-Modal Component
const PaperEditModal = ({ 
  isOpen, onClose, onSave, currentConfig, 
  paperChange, setPaperChange,
  colorChange, setColorChange,
  sizeChange, setSizeChange,
  selectedPaper, setSelectedPaper,
  selectedPaperWeight, setSelectedPaperWeight,
  selectedColor, setSelectedColor,
  customWidth, setCustomWidth,
  customHeight, setCustomHeight
}) => {
  if (!isOpen) return null;

  const paperOptions = [
    { value: 'GLOSS', label: 'Gloss', description: 'Brilliant-gloss, very affordable so highly used' },
    { value: 'MATTE', label: 'Matte', description: 'Highly used like Gloss' },
    { value: 'HI-PLUS', label: 'Hi-Plus', description: 'Thicker than Matte. Good printability' },
    { value: 'HI-QMATTE', label: 'Hi-Q Matte', description: 'Thicker than Matte, Premium grade' },
    { value: 'UNCOATED_W', label: 'Uncoated', description: 'Matte and very much used' },
  ];

  const colorOptions = [
    { value: 'CMYK', label: 'Full color' },
    { value: 'CMYK_PMS1', label: 'Full color + 1 Spot color' },
    { value: 'CMYK_PMS2', label: 'Full color + 2 Spot color' },
    { value: 'BW', label: 'Black only' },
    { value: 'BW_PMS1', label: 'Black + 1 Spot color' },
    { value: 'BW_PMS2', label: 'Black + 2 Spot color' },
  ];

  const weightOptions = [
    { value: '100', label: '100 gsm / 68# text' },
    { value: '120', label: '120 gsm / 80# text' },
    { value: '150', label: '150 gsm / 100# text' },
    { value: '250', label: '250 gsm / 92# cover' },
    { value: '300', label: '300 gsm / 110# cover' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Paper, Print Color, Size</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6 p-4 border-b border-gray-200">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paperChange}
                  onChange={(e) => setPaperChange(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="font-semibold text-gray-800">Paper Change</span>
              </label>
              
              {paperChange && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paper Type</label>
                    <select
                      value={selectedPaper}
                      onChange={(e) => setSelectedPaper(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option value="">Choose paper type</option>
                      {paperOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paper Weight</label>
                    <select
                      value={selectedPaperWeight}
                      onChange={(e) => setSelectedPaperWeight(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option value="">Choose weight</option>
                      {weightOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6 p-4 border-b border-gray-200">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={colorChange}
                  onChange={(e) => setColorChange(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="font-semibold text-gray-800">Print Color Change</span>
              </label>
              
              {colorChange && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Print Color</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  >
                    <option value="">Choose color</option>
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sizeChange}
                  onChange={(e) => setSizeChange(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="font-semibold text-gray-800">Size Change</span>
              </label>
              
              {sizeChange && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                      <input
                        type="text"
                        placeholder="Width, inches"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                      <input
                        type="text"
                        placeholder="Height, inches"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    📏 Minimum: 4" × 4" | Maximum: 11.8" × 14.3"
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Help & Information</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">
                  Select the changes you want to apply to the selected pages.
                  You can change paper type, print color, and/or size independently.
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Note:</span> Changes will only apply to the pages you selected in the main view.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onSave}
            disabled={!paperChange && !colorChange && !sizeChange}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            APPLY CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

// Fold Edit Sub-Modal Component
const FoldEditModal = ({ 
  isOpen, onClose, onSave,
  foldType, setFoldType,
  foldWidth, setFoldWidth
}) => {
  if (!isOpen) return null;

  const foldOptions = [
    { value: '2FOLD', label: 'Half Fold', description: 'Simple center fold' },
    { value: 'NFOLD', label: 'Z Fold', description: 'Accordion-style fold' },
    { value: 'ROLL', label: 'Roll Fold', description: 'Multiple parallel folds' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Add Folds</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fold Type</label>
                <div className="grid grid-cols-3 gap-4">
                  {foldOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFoldType(option.value)}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                        foldType === option.value 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1">📄</div>
                      <span className="font-medium text-gray-900">{option.label}</span>
                      <span className="text-xs text-gray-500 mt-1">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fold Width <span className="text-gray-500">(inches)</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter fold width"
                  value={foldWidth}
                  onChange={(e) => setFoldWidth(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <p className="text-sm text-gray-500 mt-2">
                  * The selected page will fold to the inside
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Fold Information</h4>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <span className="font-semibold">Important:</span> Folds are applied to individual pages.
                  Make sure your design accounts for the fold area.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Select the fold type and specify the width. The fold will be applied to all selected pages.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onSave}
            disabled={!foldType || !foldWidth}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ADD FOLD
          </button>
        </div>
      </div>
    </div>
  );
};

// Addon Edit Sub-Modal Component
const AddonEditModal = ({ 
  isOpen, onClose, onSave,
  addonType, setAddonType,
  addonSize, setAddonSize
}) => {
  if (!isOpen) return null;

  const addonOptions = [
    { value: 'FOIL', label: 'Foil Stamping', description: 'Metallic foil application' },
    { value: 'UV', label: 'UV Coating', description: 'Glossy spot coating' },
    { value: 'EMUV', label: 'Embossed-UV', description: 'Embossing with UV coating' },
    { value: 'EMBOSS', label: 'Embossing', description: 'Raised texture design' },
    { value: 'DIECUT', label: 'Die-cut', description: 'Custom shape cutting' },
  ];

  const sizeOptions = [
    { value: '1/2', label: '1/2' },
    { value: '1/4', label: '1/4' },
    { value: 'FULL', label: 'Full page' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Add Post-Press Work</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add-on Type</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {addonOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAddonType(option.value)}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                        addonType === option.value 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1">
                        {option.value === 'FOIL' && '✨'}
                        {option.value === 'UV' && '🌟'}
                        {option.value === 'EMUV' && '💎'}
                        {option.value === 'EMBOSS' && '🔼'}
                        {option.value === 'DIECUT' && '✂️'}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                      <span className="text-xs text-gray-500 mt-1 text-center">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="grid grid-cols-2 gap-4">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAddonSize(option.value)}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        addonSize === option.value 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
  <h4 className="font-semibold text-gray-900 mb-4">
    Add-on Information
  </h4>
  <div className="space-y-4">
    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-xs text-blue-800">
        <span className="font-semibold">Note:</span> Add-ons are special finishing techniques applied after printing.
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-600">
        Select the type of add-on and the size area it should cover on the selected pages.
      </p>
    </div>

    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-xs text-green-800">
        <span className="font-semibold">Tip:</span> Use add-ons to enhance specific areas like logos, titles, or decorative elements.
      </p>
    </div>
	{/* Image */}
  <div className="mb-4">
    <img
      src="/forms/img_page_eng.jpg"
      alt="Add-on information guide"
      className="w-full max-w-md mx-auto rounded-lg border border-gray-200"
    />
    <h3>Page size</h3>
<p className="text-sm">Cost varies depending on the size of add-on. Please choose the right size that can cover the net area of add-on.</p>
  </div>
  </div>
</div>

        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onSave}
            disabled={!addonType || !addonSize}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ADD POST-PRESS WORK
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN PAGE EDIT MODAL COMPONENT =====
const PageEditModal = ({ 
  isOpen, 
  onClose, 
  pageCount, 
  currentConfig,
  onSaveChanges 
}) => {
  const [editType, setEditType] = useState('PAPER');
  const [selectedPages, setSelectedPages] = useState([]);
  const [editsHistory, setEditsHistory] = useState([]);
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [showFoldModal, setShowFoldModal] = useState(false);
  const [showAddonModal, setShowAddonModal] = useState(false);
  
  // Paper modal state
  const [paperChange, setPaperChange] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [sizeChange, setSizeChange] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedPaperWeight, setSelectedPaperWeight] = useState('');
  const [selectedColor, setSelectedColor] = useState('CMYK');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  // Fold modal state
  const [foldType, setFoldType] = useState('');
  const [foldWidth, setFoldWidth] = useState('');

  // Addon modal state
  const [addonType, setAddonType] = useState('');
  const [addonSize, setAddonSize] = useState('');

  // Reset when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedPages([]);
      setEditsHistory([]);
    }
  }, [isOpen]);

  // Generate pages array
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (pageNum) => {
    setSelectedPages(prev => 
      prev.includes(pageNum) 
        ? prev.filter(p => p !== pageNum)
        : [...prev, pageNum]
    );
  };

  const handleEditTypeSelect = (type) => {
    setEditType(type);
  };

  const handleChangeClick = () => {
    if (selectedPages.length === 0) return;
    
    switch(editType) {
      case 'PAPER':
        setShowPaperModal(true);
        break;
      case 'FOLD':
        setShowFoldModal(true);
        break;
      case 'ADDON':
        setShowAddonModal(true);
        break;
      default:
        break;
    }
  };

  const handlePaperModalSave = () => {
    const newEdit = {
      id: Date.now(),
      type: 'PAPER',
      pages: [...selectedPages],
      data: {
        paperChange,
        colorChange,
        sizeChange,
        paper: selectedPaper,
        weight: selectedPaperWeight,
        color: selectedColor,
        width: customWidth,
        height: customHeight
      }
    };
    
    setEditsHistory([...editsHistory, newEdit]);
    setShowPaperModal(false);
    setSelectedPages([]);
    
    // Reset paper modal state
    setPaperChange(false);
    setColorChange(false);
    setSizeChange(false);
    setSelectedPaper('');
    setSelectedPaperWeight('');
    setSelectedColor('CMYK');
    setCustomWidth('');
    setCustomHeight('');
  };

  const handleFoldModalSave = () => {
    const newEdit = {
      id: Date.now(),
      type: 'FOLD',
      pages: [...selectedPages],
      data: {
        foldType,
        foldWidth
      }
    };
    
    setEditsHistory([...editsHistory, newEdit]);
    setShowFoldModal(false);
    setSelectedPages([]);
    
    // Reset fold modal state
    setFoldType('');
    setFoldWidth('');
  };

  const handleAddonModalSave = () => {
    const newEdit = {
      id: Date.now(),
      type: 'ADDON',
      pages: [...selectedPages],
      data: {
        addonType,
        addonSize
      }
    };
    
    setEditsHistory([...editsHistory, newEdit]);
    setShowAddonModal(false);
    setSelectedPages([]);
    
    // Reset addon modal state
    setAddonType('');
    setAddonSize('');
  };

  const removeEdit = (editId) => {
    setEditsHistory(editsHistory.filter(edit => edit.id !== editId));
  };

  const handleSaveAll = () => {
    onSaveChanges(editsHistory);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <span className="text-4xl">×</span>
            </button>
          </div>

          <div className="p-0">
            <h2 className="text-3xl font-bold text-center mb-2">Edit Page Layout</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Controls */}
              <div className="lg:w-2/3">
                {/* Step 1: Select Change Type */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">STEP 1. Select the change</h3>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => handleEditTypeSelect('PAPER')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        editType === 'PAPER' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Paper, Print color, Size
                    </button>
                    <button
                      onClick={() => handleEditTypeSelect('FOLD')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        editType === 'FOLD' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Add Fold
                    </button>
                    <button
                      onClick={() => handleEditTypeSelect('ADDON')}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        editType === 'ADDON' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Add-on
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Pages */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">STEP 2. Click the pages you want to change</h3>
                  
                  {/* Addon Legend */}
                  <div className="flex flex-wrap gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span>Foil Stamping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>UV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span>Embossed-UV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Embossing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Die-cut</span>
                    </div>
                  </div>

                  {/* Page Grid */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2 max-h-96 overflow-y-auto p-2">
                      {pages.map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageClick(pageNum)}
                          className={`h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-all ${
                            selectedPages.includes(pageNum)
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                        >
                          <span className={`text-sm ${selectedPages.includes(pageNum) ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                            {pageNum}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Pages Info */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    {selectedPages.length > 0 ? (
                      <div>
                        <p className="text-sm font-medium mb-1">
                          Selected pages: <span className="text-indigo-600">{selectedPages.length} pages</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          {selectedPages.sort((a, b) => a - b).join(', ')}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Click pages above to select them for editing</p>
                    )}
                  </div>
                </div>

                {/* Change Button */}
                {selectedPages.length > 0 && (
                  <button
                    onClick={handleChangeClick}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Apply {editType === 'PAPER' ? 'Paper/Print/Size Changes' : 
                          editType === 'FOLD' ? 'Fold Changes' : 
                          'Add-on Changes'} to Selected Pages
                  </button>
                )}

                {/* Instructions */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="font-semibold text-blue-800 mb-2">Important Notes:</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• The minimum available page count is 8 pages</li>
                    <li>• Please arrange the paper materials you want to add in as one section as possible</li>
                    <li>• If your placement is more segmented, please contact us</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Edit History */}
              <div className="lg:w-1/3">
                <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg">
                  <div className="p-4 bg-gray-800">
                    <h3 className="font-semibold">Edit Details</h3>
                  </div>
                  <div className="p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    {editsHistory.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No edits yet. Select pages and apply changes.</p>
                    ) : (
                      <div className="space-y-3">
                        {editsHistory.map((edit) => (
                          <div 
                            key={edit.id} 
                            className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm text-black capitalize bg-gray-100 px-2 py-1 rounded">
                                {edit.type}
                              </span>
                              <button
                                onClick={() => removeEdit(edit.id)}
                                className="text-gray-400 hover:text-red-500 text-lg"
                                aria-label="Remove edit"
                              >
                                ×
                              </button>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              Pages: <span className="font-medium">{edit.pages.join(', ')}</span>
                            </p>
                            <div className="text-xs text-gray-500">
                              {edit.type === 'PAPER' && (
                                <div className="space-y-1">
                                  {edit.data.paperChange && <div>• Paper: {edit.data.paper}</div>}
                                  {edit.data.colorChange && <div>• Color: {edit.data.color}</div>}
                                  {edit.data.sizeChange && <div>• Size: {edit.data.width}" × {edit.data.height}"</div>}
                                </div>
                              )}
                              {edit.type === 'FOLD' && (
                                <div className="space-y-1">
                                  <div>• Type: {edit.data.foldType}</div>
                                  <div>• Width: {edit.data.foldWidth}"</div>
                                </div>
                              )}
                              {edit.type === 'ADDON' && (
                                <div className="space-y-1">
                                  <div>• Type: {edit.data.addonType}</div>
                                  <div>• Size: {edit.data.addonSize}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {editsHistory.length > 0 && (
                    <div className="p-3 bg-gray-100 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        {editsHistory.length} edit{editsHistory.length !== 1 ? 's' : ''} applied
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-12 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAll}
                disabled={editsHistory.length === 0}
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Save Changes ({editsHistory.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Paper Edit Sub-Modal */}
      {showPaperModal && (
        <PaperEditModal
          isOpen={showPaperModal}
          onClose={() => setShowPaperModal(false)}
          onSave={handlePaperModalSave}
          paperChange={paperChange}
          setPaperChange={setPaperChange}
          colorChange={colorChange}
          setColorChange={setColorChange}
          sizeChange={sizeChange}
          setSizeChange={setSizeChange}
          selectedPaper={selectedPaper}
          setSelectedPaper={setSelectedPaper}
          selectedPaperWeight={selectedPaperWeight}
          setSelectedPaperWeight={setSelectedPaperWeight}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          customWidth={customWidth}
          setCustomWidth={setCustomWidth}
          customHeight={customHeight}
          setCustomHeight={setCustomHeight}
        />
      )}

      {/* Fold Edit Sub-Modal */}
      {showFoldModal && (
        <FoldEditModal
          isOpen={showFoldModal}
          onClose={() => setShowFoldModal(false)}
          onSave={handleFoldModalSave}
          foldType={foldType}
          setFoldType={setFoldType}
          foldWidth={foldWidth}
          setFoldWidth={setFoldWidth}
        />
      )}

      {/* Addon Edit Sub-Modal */}
      {showAddonModal && (
        <AddonEditModal
          isOpen={showAddonModal}
          onClose={() => setShowAddonModal(false)}
          onSave={handleAddonModalSave}
          addonType={addonType}
          setAddonType={setAddonType}
          addonSize={addonSize}
          setAddonSize={setAddonSize}
        />
      )}
    </div>
  );
};

export default PageEditModal;