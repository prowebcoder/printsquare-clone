// components/pages/quote/wire-binding/WireQuoteForm.js
'use client';
import { useState, useCallback, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageEditModal from './PageEditModal';

// ===== WIRE BINDING CONFIG =====
const WIREQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Wire Binding Printing Quote",
    description: "Configure your professional wire-bound documents with our instant quoting system. Perfect for reports, manuals, and presentations.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  bindingEdges: [
    { 
      value: 'LEFT', 
      label: 'Left Side', 
      desc: 'Binding on the left, most common',
      image: '/forms/edge01.png'
    },
    { 
      value: 'RIGHT', 
      label: 'Right Side', 
      desc: 'First inside page starts from the right',
      image: '/forms/edge02.png'
    },
    { 
      value: 'TOP', 
      label: 'Top Side', 
      desc: 'Binding on the top, a.k.a calendar binding',
      image: '/forms/edge03.png'
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
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        description: 'Brilliant-gloss, very affordable so highly used',
        price: 0,
        weightOptions: [
          { value: '74# cover', label: '74# cover (200 gsm)', price: 0 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 10 },
          { value: '110# cover', label: '110# cover (300 gsm)', price: 20 }
        ]
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        description: 'Highly used like Gloss',
        price: 0,
        weightOptions: [
          { value: '74# cover', label: '74# cover (200 gsm)', price: 0 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 10 },
          { value: '110# cover', label: '110# cover (300 gsm)', price: 20 }
        ]
      },
      { 
        value: 'UNCOATED', 
        label: 'Uncoated', 
        description: 'Matte and very much used',
        price: 0,
        weightOptions: [
          { value: '67# cover', label: '67# cover (180 gsm)', price: 0 },
          { value: '81# cover', label: '81# cover (220 gsm)', price: 10 },
          { value: '96# cover', label: '96# cover (260 gsm)', price: 20 }
        ]
      },
      { 
        value: 'PREMIUM', 
        label: 'Premium', 
        description: 'Used for high-end magazines and catalogs',
        price: 50,
        weightOptions: [
          { value: '70# cover', label: '70# cover (190 gsm)', price: 20 },
          { value: '78# cover', label: '78# cover (210 gsm)', price: 30 },
          { value: '89# cover', label: '89# cover (240 gsm)', price: 40 }
        ]
      },
      { 
        value: 'MERMAID', 
        label: 'Mermaid', 
        description: 'Specialty paper with unique texture',
        price: 75,
        weightOptions: [
          { value: '74# cover', label: '74# cover (200 gsm)', price: 25 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 35 },
          { value: '110# cover', label: '110# cover (300 gsm)', price: 45 },
          { value: '129# cover', label: '129# cover (350 gsm)', price: 55 }
        ]
      },
      { 
        value: 'HI-QMYSTIC', 
        label: 'Hi-Q Mystic', 
        description: 'Premium glossy with special coating',
        price: 25,
        weightOptions: [
          { value: '74# cover', label: '74# cover (200 gsm)', price: 15 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 25 },
          { value: '110# cover', label: '110# cover (300 gsm)', price: 35 }
        ]
      }
    ],
    inside: [
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        price: 0,
        weightOptions: [
          { value: '68# text', label: '68# text (100 gsm)', price: 0 },
          { value: '80# text', label: '80# text (120 gsm)', price: 5 },
          { value: '100# text', label: '100# text (150 gsm)', price: 10 },
          { value: '67# cover', label: '67# cover (180 gsm)', price: 20 },
          { value: '74# cover', label: '74# cover (200 gsm)', price: 25 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 35 }
        ]
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        price: 0,
        weightOptions: [
          { value: '68# text', label: '68# text (100 gsm)', price: 0 },
          { value: '80# text', label: '80# text (120 gsm)', price: 5 },
          { value: '100# text', label: '100# text (150 gsm)', price: 10 },
          { value: '67# cover', label: '67# cover (180 gsm)', price: 20 },
          { value: '74# cover', label: '74# cover (200 gsm)', price: 25 },
          { value: '92# cover', label: '92# cover (250 gsm)', price: 35 }
        ]
      },
      { 
        value: 'HI-PLUS', 
        label: 'Hi-Plus', 
        price: 20,
        weightOptions: [
          { value: '60# text', label: '60# text (90 gsm)', price: 10 },
          { value: '68# text', label: '68# text (100 gsm)', price: 15 },
          { value: '80# text', label: '80# text (120 gsm)', price: 20 }
        ]
      },
      { 
        value: 'HI-Q MATTE', 
        label: 'Hi-Q Matte', 
        price: 35,
        weightOptions: [
          { value: '89# text', label: '89# text (135 gsm)', price: 20 },
          { value: '109# text', label: '109# text (165 gsm)', price: 25 }
        ]
      },
      { 
        value: 'HI UNCOATED', 
        label: 'Hi Uncoated', 
        price: 0,
        weightOptions: [
          { value: '47# text', label: '47# text (70 gsm)', price: 0 },
          { value: '54# text', label: '54# text (80 gsm)', price: 5 },
          { value: '60# text', label: '60# text (90 gsm)', price: 10 },
          { value: '68# text', label: '68# text (100 gsm)', price: 15 },
          { value: '80# text', label: '80# text (120 gsm)', price: 20 },
          { value: '100# text', label: '100# text (150 gsm)', price: 25 },
          { value: '67# cover', label: '67# cover (180 gsm)', price: 30 },
          { value: '81# cover', label: '81# cover (220 gsm)', price: 35 }
        ]
      },
      { 
        value: 'HI PREMIUM', 
        label: 'Hi Premium', 
        price: 45,
        weightOptions: [
          { value: '60# text', label: '60# text (90 gsm)', price: 20 },
          { value: '68# text', label: '68# text (100 gsm)', price: 25 },
          { value: '88# text', label: '88# text (130 gsm)', price: 30 },
          { value: '108# text', label: '108# text (160 gsm)', price: 35 },
          { value: '70# cover', label: '70# cover (190 gsm)', price: 40 },
          { value: '78# cover', label: '78# cover (210 gsm)', price: 45 }
        ]
      },
      { 
        value: 'HI NEW PLUS', 
        label: 'Hi New Plus', 
        price: 15,
        weightOptions: [
          { value: '47# text', label: '47# text (70 gsm)', price: 5 },
          { value: '54# text', label: '54# text (80 gsm)', price: 10 },
          { value: '68# text', label: '68# text (100 gsm)', price: 15 }
        ]
      },
      { 
        value: 'TEXTBOOK', 
        label: 'Textbook', 
        price: 30,
        weightOptions: [
          { value: '51# text', label: '51# text (75 gsm)', price: 15 }
        ]
      },
      { 
        value: 'TRANSLUCENT', 
        label: 'Translucent', 
        price: 80,
        weightOptions: [
          { value: '54# text', label: '54# text (80 gsm)', price: 25 },
          { value: '68# text', label: '68# text (100 gsm)', price: 30 },
          { value: '88# text', label: '88# text (130 gsm)', price: 35 },
          { value: '100# text', label: '100# text (150 gsm)', price: 40 },
          { value: '63# cover', label: '63# cover (170 gsm)', price: 45 },
          { value: '74# cover', label: '74# cover (200 gsm)', price: 50 },
          { value: '81# cover', label: '81# cover (220 gsm)', price: 55 }
        ]
      },
      { 
        value: 'COLORED', 
        label: 'Colored', 
        price: 40,
        weightOptions: [
          { value: 'A-BE01', label: 'A-BE01', image: '/forms/A-BE01.png', price: 0 },
          { value: 'A-BE10', label: 'A-BE10', image: '/forms/A-BE10.png', price: 0 },
          { value: 'A-BE15', label: 'A-BE15', image: '/forms/A-BE15.png', price: 0 },
          { value: 'A-BE30', label: 'A-BE30', image: '/forms/A-BE30.png', price: 0 },
          { value: 'A-BE42', label: 'A-BE42', image: '/forms/A-BE42.png', price: 0 },
          { value: 'A-BE50', label: 'A-BE50', image: '/forms/A-BE50.png', price: 0 },
          { value: 'A-BE51', label: 'A-BE51', image: '/forms/A-BE51.png', price: 0 },
          { value: 'A-BE75', label: 'A-BE75', image: '/forms/A-BE75.png', price: 0 },
          { value: 'A-BE83', label: 'A-BE83', image: '/forms/A-BE83.png', price: 0 },
          { value: 'A-BE85', label: 'A-BE85', image: '/forms/A-BE85.png', price: 0 },
          { value: 'B-BE16', label: 'B-BE16', image: '/forms/B-BE16.png', price: 0 },
          { value: 'B-BE17', label: 'B-BE17', image: '/forms/B-BE17.png', price: 0 },
          { value: 'B-BE24', label: 'B-BE24', image: '/forms/B-BE24.png', price: 0 },
          { value: 'B-BE80', label: 'B-BE80', image: '/forms/B-BE80.png', price: 0 },
          { value: 'B-BE81', label: 'B-BE81', image: '/forms/B-BE81.png', price: 0 },
          { value: 'C-BE36', label: 'C-BE36', image: '/forms/C-BE36.png', price: 0 },
          { value: 'C-BE54', label: 'C-BE54', image: '/forms/C-BE54.png', price: 0 },
          { value: 'C-BE66', label: 'C-BE66', image: '/forms/C-BE66.png', price: 0 },
          { value: 'C-BE73', label: 'C-BE73', image: '/forms/C-BE73.png', price: 0 },
          { value: 'D-BE18', label: 'D-BE18', image: '/forms/D-BE18.png', price: 0 },
          { value: 'D-BE32', label: 'D-BE32', image: '/forms/D-BE32.png', price: 0 },
          { value: 'D-BE35', label: 'D-BE35', image: '/forms/D-BE35.png', price: 0 },
          { value: 'D-BE69', label: 'D-BE69', image: '/forms/D-BE69.png', price: 0 },
          { value: 'D-BE76', label: 'D-BE76', image: '/forms/D-BE76.png', price: 0 },
          { value: 'E-BE05', label: 'E-BE05', image: '/forms/E-BE05.png', price: 0 }
        ]
      }
    ]
  },
  // UPDATED: Added images to print colors
  printColors: [
    { 
      value: 'CMYK', 
      label: 'Full color', 
      price: 0,
      image: '/forms/d1.png'
    },
    { 
      value: 'CMYK_PMS1', 
      label: 'Full color + 1 Spot color', 
      price: 75,
      image: '/forms/d2.png'
    },
    { 
      value: 'CMYK_PMS2', 
      label: 'Full color + 2 Spot color', 
      price: 150,
      image: '/forms/d3.png'
    },
    { 
      value: 'BW', 
      label: 'Black only', 
      price: -100,
      image: '/forms/d4.png'
    },
    { 
      value: 'BW_PMS1', 
      label: 'Black + 1 Spot color', 
      price: -25,
      image: '/forms/d5.png'
    },
    { 
      value: 'BW_PMS2', 
      label: 'Black + 2 Spot color', 
      price: 50,
      image: '/forms/d6.png'
    }
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
  '47# text': { 
    gsm: '70 gsm',
    us: '47# text',
    pt: '2.0 pt',
    kg: '60 kg'
  },
  '51# text': { 
    gsm: '75 gsm',
    us: '51# text',
    pt: '2.2 pt',
    kg: '65 kg'
  },
  '54# text': { 
    gsm: '80 gsm',
    us: '54# text',
    pt: '2.3 pt',
    kg: '69 kg'
  },
  '60# text': { 
    gsm: '90 gsm',
    us: '60# text',
    pt: '2.5 pt',
    kg: '77 kg'
  },
  '68# text': { 
    gsm: '100 gsm',
    us: '68# text',
    pt: '3.2 pt',
    kg: '86 kg'
  },
  '74# cover': { 
    gsm: '200 gsm',
    us: '74# cover',
    pt: '7.1 pt',
    kg: '172 kg'
  },
  '80# text': { 
    gsm: '120 gsm',
    us: '80# text',
    pt: '3.8 pt',
    kg: '103 kg'
  },
  '88# text': { 
    gsm: '130 gsm',
    us: '88# text',
    pt: '4.2 pt',
    kg: '112 kg'
  },
  '89# text': { 
    gsm: '135 gsm',
    us: '89# text',
    pt: '4.3 pt',
    kg: '116 kg'
  },
  '92# cover': { 
    gsm: '250 gsm',
    us: '92# cover',
    pt: '9.1 pt',
    kg: '215 kg'
  },
  '96# cover': { 
    gsm: '260 gsm',
    us: '96# cover',
    pt: '9.5 pt',
    kg: '224 kg'
  },
  '100# text': { 
    gsm: '150 gsm',
    us: '100# text',
    pt: '4.8 pt',
    kg: '129 kg'
  },
  '108# text': { 
    gsm: '160 gsm',
    us: '108# text',
    pt: '5.1 pt',
    kg: '138 kg'
  },
  '109# text': { 
    gsm: '165 gsm',
    us: '109# text',
    pt: '5.3 pt',
    kg: '142 kg'
  },
  '110# cover': { 
    gsm: '300 gsm',
    us: '110# cover',
    pt: '11.3 pt',
    kg: '258 kg'
  },
  '129# cover': { 
    gsm: '350 gsm',
    us: '129# cover',
    pt: '13.5 pt',
    kg: '301 kg'
  },
  '63# cover': { 
    gsm: '170 gsm',
    us: '63# cover',
    pt: '5.5 pt',
    kg: '146 kg'
  },
  '67# cover': { 
    gsm: '180 gsm',
    us: '67# cover',
    pt: '5.9 pt',
    kg: '155 kg'
  },
  '70# cover': { 
    gsm: '190 gsm',
    us: '70# cover',
    pt: '6.2 pt',
    kg: '163 kg'
  },
  '78# cover': { 
    gsm: '210 gsm',
    us: '78# cover',
    pt: '7.5 pt',
    kg: '181 kg'
  },
  '81# cover': { 
    gsm: '220 gsm',
    us: '81# cover',
    pt: '8.0 pt',
    kg: '189 kg'
  },
  '89# cover': { 
    gsm: '240 gsm',
    us: '89# cover',
    pt: '8.7 pt',
    kg: '206 kg'
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

const getWeightOptionPrice = (paperType, weightValue) => {
  if (!paperType || !weightValue) return 0;
  const paperOption = WIREQUOTE_DEFAULT_CONFIG.paperOptions.cover.concat(WIREQUOTE_DEFAULT_CONFIG.paperOptions.inside)
    .find(opt => opt.value === paperType);
  if (!paperOption || !paperOption.weightOptions) return 0;
  const weightOption = paperOption.weightOptions.find(opt => opt.value === weightValue);
  return weightOption ? (weightOption.price || 0) : 0;
};

const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

// ===== PAGE EDITS COST CALCULATION =====
const calculatePageEditsCost = (edits, PAPER_OPTIONS, PRINT_COLORS) => {
  if (!edits || edits.length === 0) return 0;
  
  let totalCost = 0;
  
  edits.forEach(edit => {
    let editCost = 0;
    
    switch(edit.type) {
      case 'PAPER':
        if (edit.data.paperChange) {
          const paperOption = PAPER_OPTIONS.inside.find(opt => opt.value === edit.data.paper);
          editCost += (paperOption?.price || 0) * edit.pages.length;
        }
        
        if (edit.data.colorChange) {
          const colorOption = PRINT_COLORS.find(opt => opt.value === edit.data.color);
          editCost += (colorOption?.price || 0) * edit.pages.length;
        }
        
        if (edit.data.sizeChange) {
          editCost += 25 * edit.pages.length;
        }
        break;
        
      case 'FOLD':
        editCost = 15 * edit.pages.length;
        break;
        
      case 'ADDON':
        const addonPrices = {
          'FOIL': 20,
          'UV': 15,
          'EMUV': 30,
          'EMBOSS': 25,
          'DIECUT': 35,
        };
        
        editCost = (addonPrices[edit.data.addonType] || 0) * edit.pages.length;
        
        const sizeMultipliers = {
          'SMALL': 0.5,
          'MEDIUM': 1,
          'LARGE': 1.5,
          'FULL': 2,
        };
        
        editCost *= (sizeMultipliers[edit.data.addonSize] || 1);
        break;
    }
    
    totalCost += editCost;
  });
  
  return totalCost;
};

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
    
    setTimeout(() => {
      const baseWeight = (formData.quantity * 0.15) + (formData.pageCount * 0.008);
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

// ===== IMAGE DROPDOWN COMPONENT =====
const ImageDropdown = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  className = "", 
  disabled = false,
  showDescription = false,
  showPrice = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options?.find(opt => opt.value === selected);

  return (
    <div className={`relative ${className}`}>
      {label && <p className="text-sm font-semibold mb-2 text-gray-700">{label}</p>}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm text-left hover:border-gray-400 transition-all ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'
        } ${isOpen ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}`}
      >
        <div className="flex items-center space-x-3">
          {selectedOption?.image && (
            <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
              <img 
                src={selectedOption.image} 
                alt={selectedOption.label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/placeholder-color.png';
                  e.target.alt = 'Image not available';
                }}
              />
            </div>
          )}
          <div>
            <span className="text-sm font-medium text-gray-900 block">
              {selectedOption?.label || 'Select an option'}
            </span>
            {showDescription && selectedOption?.desc && (
              <span className="text-xs text-gray-500 block mt-1">
                {selectedOption.desc}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {showPrice && selectedOption?.price !== undefined && (
            <span className={`text-sm font-semibold ${
              selectedOption.price > 0 ? 'text-green-600' : 
              selectedOption.price < 0 ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {selectedOption.price > 0 ? `+$${selectedOption.price}` : 
               selectedOption.price < 0 ? `-$${Math.abs(selectedOption.price)}` : 
               'No extra charge'}
            </span>
          )}
          <svg 
            className={`w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <div className="py-1">
            {options?.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange({ target: { value: option.value } });
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  selected === option.value ? 'bg-indigo-50' : ''
                }`}
              >
                {option.image && (
                  <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={option.image} 
                      alt={option.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-color.png';
                        e.target.alt = 'Image not available';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{option.label}</p>
                      {option.desc && (
                        <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                      )}
                    </div>
                    {showPrice && option.price !== undefined && (
                      <span className={`text-sm font-semibold ml-2 ${
                        option.price > 0 ? 'text-green-600' : 
                        option.price < 0 ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {option.price > 0 ? `+$${option.price}` : 
                         option.price < 0 ? `-$${Math.abs(option.price)}` : 
                         'No extra charge'}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

// ===== PAPER WEIGHT SELECTOR WITH IMAGE SUPPORT =====
const PaperWeightSelector = ({ 
  paperType, 
  paperUnit, 
  weightValue, 
  onChange, 
  label = "", 
  isCover = true,
  showImages = false,
  className = ""
}) => {
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const getWeightOptions = () => {
    const paperOptions = WIREQUOTE_DEFAULT_CONFIG.paperOptions[isCover ? 'cover' : 'inside'];
    const paperOption = paperOptions.find(opt => opt.value === paperType);
    
    if (!paperOption || !paperOption.weightOptions) {
      return [];
    }
    
    if (paperType === 'COLORED' && showImages) {
      return paperOption.weightOptions.map(option => ({
        ...option,
        label: option.label
      }));
    }
    
    return paperOption.weightOptions.map(option => {
      const conversion = PAPER_WEIGHT_CONVERSIONS[option.value];
      if (!conversion) return option;
      
      let labelText = option.label;
      switch(paperUnit) {
        case 'GSM':
          labelText = `${option.value} (${conversion.gsm})`;
          break;
        case 'US':
          labelText = `${option.value}`;
          break;
        case 'PT':
          labelText = `${option.value} (${conversion.pt})`;
          break;
        case 'KG':
          labelText = `${option.value} (${conversion.kg})`;
          break;
        default:
          labelText = option.label;
      }
      
      return {
        ...option,
        label: labelText
      };
    });
  };

  const weightOptions = getWeightOptions();
  const selectedOption = weightOptions.find(opt => opt.value === weightValue);
  const isColoredPaper = paperType === 'COLORED' && showImages;

  const handleImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setShowImagePreview(true);
  };

  if (isColoredPaper) {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>}
        <ImageDropdown
          options={weightOptions}
          selected={weightValue}
          onChange={onChange}
          className="w-full"
        />
        
        {weightValue && selectedOption?.image && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Color Preview:</p>
              <button
                type="button"
                onClick={() => handleImagePreview(selectedOption.image)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View Full Size
              </button>
            </div>
            <div className="relative h-32 w-full bg-white border border-gray-300 rounded-md overflow-hidden">
              <img 
                src={selectedOption.image} 
                alt={selectedOption.label}
                className="object-contain w-full h-full"
                onError={(e) => {
                  e.target.src = '/images/placeholder-color.png';
                  e.target.alt = 'Color preview not available';
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <p className="text-sm font-semibold mb-2 text-gray-700">{label}</p>}
      <select
        value={weightValue}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
        disabled={weightOptions.length === 0}
      >
        {weightOptions.length === 0 ? (
          <option value="">No weight options available for this paper type</option>
        ) : (
          <>
            <option value="">Select weight</option>
            {weightOptions.map((option, index) => (
              <option key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
      {selectedOption && (
        <p className="text-xs text-gray-500 mt-1">
          Available weights may vary based on paper type selection
        </p>
      )}
    </div>
  );
};

// ===== IMAGE PREVIEW MODAL =====
const ImagePreviewModal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Color Preview</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>
        <div className="p-8 flex items-center justify-center bg-gray-100 min-h-[60vh]">
          <img 
            src={imageUrl} 
            alt="Color preview"
            className="max-w-full max-h-[70vh] object-contain"
            onError={(e) => {
              e.target.src = '/images/placeholder-color-large.png';
              e.target.alt = 'Color preview not available';
            }}
          />
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
                <img 
                  src={option.image} 
                  alt={option.label}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-color.png';
                    e.target.alt = 'Image not available';
                  }}
                />
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
  const { addToCart } = useCart();
  const router = useRouter();

  const [formConfig, setFormConfig] = useState(WIREQUOTE_DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [configVersion, setConfigVersion] = useState(0);

  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('US');
  const [selectedSize, setSelectedSize] = useState('8.5x11-standard');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [bindingEdge, setBindingEdge] = useState('LEFT');
  const [wireColor, setWireColor] = useState('BLACK');
  
  const [coverPaper, setCoverPaper] = useState('MATTE');
  const [coverWeight, setCoverWeight] = useState('');
  const [coverColor, setCoverColor] = useState('CMYK');
  const [coverFinish, setCoverFinish] = useState('NONE');
  const [coverFold, setCoverFold] = useState('NONE');
  const [foldWidth, setFoldWidth] = useState('');
  
  const [pageCount, setPageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [insideWeight, setInsideWeight] = useState('');
  const [insideColor, setInsideColor] = useState('CMYK');
  
  const [pageEdits, setPageEdits] = useState([]);
  const [quantity, setQuantity] = useState(200);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(0);
  const [proof, setProof] = useState('ONLINE');
  const [holePunching, setHolePunching] = useState({ enabled: false, type: '6' });
  const [slipcase, setSlipcase] = useState('NONE');
  const [shrinkWrapping, setShrinkWrapping] = useState({ enabled: false, type: '1' });
  const [directMailing, setDirectMailing] = useState({ enabled: false, type: 'ALL' });
  
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showPageEditModal, setShowPageEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const isCustomSize = selectedSize === 'custom';
  const [pricingData, setPricingData] = useState(getPricingData());

  const availableSizes = [
    '8.5x11-letter', '8.5x11-standard', '5.5x8.5', '6x9', '7x10', '9x12',
    'A6', 'A5', 'A4', 'B6', 'B5', 'B4', 'custom'
  ];

  const getSizeDisplayLabel = (size) => {
    return SIZE_CONVERSIONS[sizeUnit]?.[size] || size;
  };

  useEffect(() => {
    const coverWeights = formConfig.paperOptions.cover.find(opt => opt.value === coverPaper)?.weightOptions;
    if (coverWeights && coverWeights.length > 0 && !coverWeight) {
      setCoverWeight(coverWeights[0].value);
    }
    
    const insideWeights = formConfig.paperOptions.inside.find(opt => opt.value === insidePaper)?.weightOptions;
    if (insideWeights && insideWeights.length > 0 && !insideWeight) {
      setInsideWeight(insideWeights[0].value);
    }
  }, [coverPaper, insidePaper, coverWeight, insideWeight, formConfig]);

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
              cover: [...WIREQUOTE_DEFAULT_CONFIG.paperOptions.cover],
              inside: [...WIREQUOTE_DEFAULT_CONFIG.paperOptions.inside],
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

  const BINDING_EDGES = formConfig?.bindingEdges || WIREQUOTE_DEFAULT_CONFIG.bindingEdges;
  const WIRE_COLORS = formConfig?.wireColors || WIREQUOTE_DEFAULT_CONFIG.wireColors;
  const PAPER_OPTIONS = formConfig?.paperOptions || WIREQUOTE_DEFAULT_CONFIG.paperOptions;
  const PRINT_COLORS = formConfig?.printColors || WIREQUOTE_DEFAULT_CONFIG.printColors;
  const COVER_FINISHES = formConfig?.coverFinishes || WIREQUOTE_DEFAULT_CONFIG.coverFinishes;
  const COVER_FOLDS = formConfig?.coverFolds || WIREQUOTE_DEFAULT_CONFIG.coverFolds;
  const ADDITIONAL_OPTIONS = formConfig?.additionalOptions || WIREQUOTE_DEFAULT_CONFIG.additionalOptions;
  const PAGE_COUNTS = formConfig?.pageCounts || WIREQUOTE_DEFAULT_CONFIG.pageCounts;
  const QUANTITIES = formConfig?.quantities || WIREQUOTE_DEFAULT_CONFIG.quantities;

  const generalSettings = formConfig?.general || WIREQUOTE_DEFAULT_CONFIG.general;
  const customSizeInstructions = formConfig?.customSizeInstructions || WIREQUOTE_DEFAULT_CONFIG.customSizeInstructions;

  const refreshConfig = () => {
    console.log('🔄 Manually refreshing wire binding configuration...');
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

  const handlePageEditsSave = (edits) => {
    console.log('Page edits saved:', edits);
    setPageEdits(edits);
    alert(`${edits.length} page edit${edits.length !== 1 ? 's' : ''} saved successfully!`);
  };

  const pageEditsCost = calculatePageEditsCost(pageEdits, PAPER_OPTIONS.inside, PRINT_COLORS);

  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.06;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 150;
    const wireBindingBaseCost = formConfig?.pricing?.wireBindingBaseCost || 50;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.2;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.1;
    
    let basePrintCost = baseSetupCost + wireBindingBaseCost + (pageCount * baseCostPerPage * quantity);
    
    if (isCustomSize) {
      basePrintCost *= customSizeMultiplier;
    } else if (selectedSize !== '8.5x11-standard' && selectedSize !== 'A4') {
      basePrintCost *= standardSizeMultiplier;
    }
    
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
    const pageEditsCost = calculatePageEditsCost(pageEdits, PAPER_OPTIONS.inside, PRINT_COLORS);
    const coverWeightCost = getWeightOptionPrice(coverPaper, coverWeight);
    const insideWeightCost = getWeightOptionPrice(insidePaper, insideWeight);

    const materialCost = coverPaperCost + insidePaperCost + coverWeightCost + insideWeightCost;
    const colorCost = coverColorCost + insideColorCost + coverFinishCost + coverFoldCost;
    const additionalServicesCost = proofCost + holePunchCost + slipcaseCost + shrinkWrapCost + directMailCost + pageEditsCost;

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
      pageEdits: pageEditsCost,
      coverWeight: coverWeightCost,
      insideWeight: insideWeightCost,
      total: totalAmount,
    };
  }, [
    pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper, 
    coverColor, insideColor, coverFinish, coverFold, proof, holePunching,
    slipcase, shrinkWrapping, directMailing, pageEdits, coverWeight, insideWeight, formConfig
  ]);

  const prices = calculatePricing();

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
      
      const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
      const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
      const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
      const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
      const coverFinishCost = getOptionPrice(COVER_FINISHES, coverFinish);
      const coverFoldCost = getOptionPrice(COVER_FOLDS, coverFold);
      const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
      const holePunchCost = holePunching.enabled ? getOptionPrice(ADDITIONAL_OPTIONS.holePunch, holePunching.type) : 0;
      const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
      const pageEditsCost = calculatePageEditsCost(pageEdits, PAPER_OPTIONS.inside, PRINT_COLORS);
      const coverWeightCost = getWeightOptionPrice(coverPaper, coverWeight);
      const insideWeightCost = getWeightOptionPrice(insidePaper, insideWeight);
      
      const additionalCosts = coverPaperCost + insidePaperCost + coverColorCost + insideColorCost + 
                            coverFinishCost + coverFoldCost + proofCost + holePunchCost + slipcaseCost + 
                            pageEditsCost + coverWeightCost + insideWeightCost;
      
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
  }, [pageCount, selectedSize, isCustomSize, coverPaper, insidePaper, coverColor, insideColor, coverFinish, coverFold, proof, holePunching, slipcase, pageEdits, coverWeight, insideWeight, formConfig]);

  const handleAddToCart = () => {
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
        color: insideColor,
        pageEdits
      },
      quantity,
      options: { 
        proof, 
        holePunching, 
        slipcase, 
        shrinkWrapping, 
        directMailing
      },
      totalAmount: prices.total,
    };
    
    const cartItem = {
      type: 'wire-binding',
      productName: `Wire Binding - ${selectedSize}`,
      quantity: quantity,
      price: prices.total / quantity,
      total: prices.total,
      configuration: formData,
      summary: {
        size: getSizeDisplayLabel(selectedSize),
        pages: pageCount,
        binding: bindingEdge,
        wireColor: wireColor,
        cover: coverPaper,
        printColor: coverColor,
        quantity: quantity,
        pageEditsCount: pageEdits.length
      }
    };
    
    addToCart(cartItem);
    router.push('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading wire binding form configuration...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <PageEditModal
        isOpen={showPageEditModal}
        onClose={() => setShowPageEditModal(false)}
        onSaveChanges={handlePageEditsSave}
        pageCount={pageCount}
        currentConfig={{
          paper: insidePaper,
          weight: insideWeight,
          color: insideColor,
          size: selectedSize,
          customSize: isCustomSize ? { width: customWidth, height: customHeight } : null
        }}
      />
      
      <ShippingModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        formData={{ quantity, pageCount, selectedSize: getSizeDisplayLabel(selectedSize) }}
      />
      
      <ImagePreviewModal
        isOpen={showImageModal}
        imageUrl={selectedImage}
        onClose={() => setShowImageModal(false)}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📖</span>
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

            {/* UPDATED: Cover Specifications with ImageDropdown for Print Color */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">📔</span>
                  Cover Specifications
                </h3>
                <div className="flex space-x-4 mt-2 sm:mt-0">
  <Link
    href="/portfolio"
    target="_blank"
    rel="noopener noreferrer"
    className="italic text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
  >
    View Portfolio
  </Link>

  <Link
    href="/papers"
    target="_blank"
    rel="noopener noreferrer"
    className="italic text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
  >
    Paper Samples
  </Link>
</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                <SelectDropdown 
                  label="Paper Type" 
                  options={PAPER_OPTIONS.cover} 
                  selected={coverPaper} 
                  onChange={(e) => setCoverPaper(e.target.value)}
                  showDescription={true}
                />
                <PaperWeightSelector
                  paperType={coverPaper}
                  paperUnit={paperUnit}
                  label="Paper Weight"
                  weightValue={coverWeight}
                  onChange={(e) => setCoverWeight(e.target.value)}
                  isCover={true}
                />
                {/* UPDATED: Changed to ImageDropdown for cover print color */}
                <ImageDropdown
                  label="Print Color"
                  options={PRINT_COLORS}
                  selected={coverColor}
                  onChange={(e) => setCoverColor(e.target.value)}
                  className="w-full"
                  showPrice={true}
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

            {/* UPDATED: Inside Pages with ImageDropdown for Print Color */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">📄</span>
                  Inside Pages
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
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
                  paperType={insidePaper}
                  paperUnit={paperUnit}
                  label="Paper Weight"
                  weightValue={insideWeight}
                  onChange={(e) => setInsideWeight(e.target.value)}
                  isCover={false}
                  showImages={insidePaper === 'COLORED'}
                />
                {/* UPDATED: Changed to ImageDropdown for inside print color */}
                <ImageDropdown
                  label="Print Color"
                  options={PRINT_COLORS}
                  selected={insideColor}
                  onChange={(e) => setInsideColor(e.target.value)}
                  className="w-full"
                  showPrice={true}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Note:</span> Please select only the inside page count. Cover pages are calculated separately.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <button 
                  onClick={() => setShowPageEditModal(true)}
                  className="px-6 cursor-pointer py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
                >
                  Edit Page Layout
                  {pageEdits.length > 0 && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {pageEdits.length} edit{pageEdits.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </button>
                <Link href="/papers" target="_blank" rel="noopener noreferrer">
                  <button className="px-6 cursor-pointer py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    View Paper Gallery
                  </button>
                </Link>
                <Link href="/api/upload?file=Wire_Binding_Layout_Guide-1765781194329.zip">
                  <button className="px-6 cursor-pointer py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Download Guide
                  </button>
                </Link>
              </div>

              {pageEdits.length > 0 && (
                <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <h4 className="text-lg font-semibold text-indigo-900 mb-2">Page Layout Edits Summary</h4>
                  <div className="space-y-2">
                    {pageEdits.map((edit, index) => (
                      <div key={edit.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                          {edit.type === 'PAPER' && '📄 Paper/Print/Size changes'}
                          {edit.type === 'FOLD' && '📏 Fold additions'}
                          {edit.type === 'ADDON' && `✨ ${edit.data.addonType} addon`}
                          <span className="text-gray-500 ml-2">
                            (pages: {edit.pages.join(', ')})
                          </span>
                        </span>
                        <span className="font-medium text-indigo-700">
                          +{formatCurrency(15 * edit.pages.length)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-indigo-200 mt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Page Edits Cost:</span>
                        <span className="text-indigo-900">+{formatCurrency(pageEditsCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

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
                  <p>• Wire binding production is faster than hardcover</p>
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
                    { label: 'Premium Materials', value: prices.materials, show: prices.materials > 0 },
                    { label: 'Cover Weight', value: prices.coverWeight, show: prices.coverWeight > 0 },
                    { label: 'Inside Paper Weight', value: prices.insideWeight, show: prices.insideWeight > 0 },
                    { label: 'Color Options', value: prices.color, show: prices.color > 0 },
                    { label: 'Digital Proof', value: prices.proof, show: prices.proof > 0 },
                    { label: 'Hole Punching', value: prices.holePunching, show: prices.holePunching > 0 },
                    { label: 'Slipcase', value: prices.slipcase, show: prices.slipcase > 0 },
                    { label: 'Shrink Wrapping', value: prices.shrinkWrapping, show: prices.shrinkWrapping > 0 },
                    { label: 'Direct Mailing', value: prices.directMailing, show: prices.directMailing > 0 },
                    { 
                      label: `Page Layout Edits (${pageEdits.length} change${pageEdits.length !== 1 ? 's' : ''})`, 
                      value: prices.pageEdits, 
                      show: pageEdits.length > 0 
                    },
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

                {pageEdits.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="font-semibold text-gray-800 mb-3">Page Layout Edits Details:</h5>
                    <div className="space-y-2 text-xs">
                      {pageEdits.map((edit, index) => (
                        <div key={edit.id} className="flex justify-between items-center text-gray-600">
                          <span>
                            {edit.type === 'PAPER' && '📄 Paper/Print/Size changes'}
                            {edit.type === 'FOLD' && '📏 Fold additions'}
                            {edit.type === 'ADDON' && `✨ ${edit.data.addonType} addon`}
                            <span className="text-gray-400 ml-2">
                              (pages: {edit.pages.join(', ')})
                            </span>
                          </span>
                          <span className="font-medium">
                            +{formatCurrency(15 * edit.pages.length)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-8">
                <button 
                  onClick={() => setShowShippingModal(true)}
                  className="flex-1 cursor-pointer px-2 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-sm"
                >
                  {generalSettings.shippingButtonText}
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 cursor-pointer px-2 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-sm flex items-center justify-center"
                >
                  {generalSettings.submitButtonText}
                  {pageEdits.length > 0 && (
                    <span className="ml-2 bg-white text-green-600 text-xs px-2 py-1 rounded-full">
                      {pageEdits.length} edit{pageEdits.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WireQuoteForm;