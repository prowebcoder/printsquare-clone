// components/admin/PrintQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, DollarSign, Edit2, Check, X, Image as ImageIcon, Upload, Copy, MoveVertical, GripVertical } from 'lucide-react';

const PRINTQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Perfect Binding Book Printing Quote",
    description: "Configure your perfect bound book with our professional printing services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping",
    disclaimer: "Prices are estimates and final cost may vary based on specifications"
  },
  
  // From form: bindingEdges with images
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
  
  // From form: paperOptions
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
        label: 'Hi Uncoated',
        description: 'Matte and very much used',
        price: 0
      },
      {
        value: 'MONTBLANC_EW',
        label: 'Hi Premium',
        description: 'Used for high-end magazines and catalogs',
        price: 150
      },
      {
        value: 'NEWPLUS_W',
        label: 'Hi New Plus',
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
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 50 },
      { value: 'UNCOATED', label: 'Hi Uncoated', price: 0 },
      { value: 'MONTBLANC_EW', label: 'Hi Premium', price: 75 },
      { value: 'NEWPLUS_W', label: 'Hi New Plus', price: 20 },
      { value: 'TEXTBOOK', label: 'Textbook', price: 30 },
      { value: 'COLORED', label: 'Colored', price: 40 },
      { value: 'TRANSLUCENT', label: 'Translucent', price: 80 },
    ],
    subscription: [
      { value: 'MATTE', label: 'Matte', price: 0 },
      { value: 'HI-QMATTE', label: 'Hi-Q Matte', price: 25 },
      { value: 'UNCOATED_W', label: 'Uncoated', price: 0 },
      { value: 'MONTBLANC_EW', label: 'Premium', price: 50 },
    ]
  },
  
  // From form: printColors with images
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
    },
  ],
  
  // From form: cover finishes and folds
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
  
  // From form: additional options
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
  
  // From form: positions
  positions: [
    { value: 'FRONT', label: 'Before page 1' },
    { value: 'BACK', label: 'After page 96' },
    { value: 'SELECT', label: 'Front of page no.' },
  ],
  
  // From form: page counts and quantities
  pageCounts: Array.from({ length: (880 - 24) / 2 + 1 }, (_, i) => 24 + i * 2),
  quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  
  // From form: custom size instructions
  customSizeInstructions: {
    INCH: "📏 Minimum: 4\" × 4\" | Maximum: 11.8\" × 14.3\"",
    MM: "📏 Minimum: 102 × 102 mm | Maximum: 300 × 363 mm"
  },
  
  // From form: spine width
  spineWidth: '0.178"',
  
  // From form: pricing configuration
  pricing: {
    baseSetupCost: 200,
    costPerPage: 0.05,
    customSizeMultiplier: 1.2,
    standardSizeMultiplier: 1.1,
    dustCoverBaseCost: 100,
    dustCoverPerCopy: 0.25,
    subscriptionCardBaseCost: 25,
    subscriptionCardPerCopy: 0.02
  },
  
  // From form: paper weight options
  paperWeightOptions: {
    cover: {
      GLOSS: [
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '67# cover', label: '67# cover (180 gsm)' },
        { value: '74# cover', label: '74# cover (200 gsm)' },
        { value: '92# cover', label: '92# cover (250 gsm)' },
        { value: '110# cover', label: '110# cover (300 gsm)' }
      ],
      MATTE: [
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '67# cover', label: '67# cover (180 gsm)' },
        { value: '74# cover', label: '74# cover (200 gsm)' },
        { value: '92# cover', label: '92# cover (250 gsm)' },
        { value: '110# cover', label: '110# cover (300 gsm)' }
      ],
      'HI-PLUS': [
        { value: '60# text', label: '60# text (90 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' }
      ],
      'HI-QMATTE': [
        { value: '89# text', label: '89# text (135 gsm)' },
        { value: '109# text', label: '109# text (165 gsm)' }
      ],
      UNCOATED_W: [
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '67# cover', label: '67# cover (180 gsm)' },
        { value: '81# cover', label: '81# cover (220 gsm)' },
        { value: '96# cover', label: '96# cover (260 gsm)' }
      ],
      MONTBLANC_EW: [
        { value: '60# text', label: '60# text (90 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '88# text', label: '88# text (130 gsm)' },
        { value: '108# text', label: '108# text (160 gsm)' },
        { value: '70# cover', label: '70# cover (190 gsm)' },
        { value: '78# cover', label: '78# cover (210 gsm)' },
        { value: '89# cover', label: '89# cover (240 gsm)' }
      ],
      NEWPLUS_W: [
        { value: '47# text', label: '47# text (70 gsm)' },
        { value: '54# text', label: '54# text (80 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' }
      ],
      TEXTBOOK: [
        { value: '51# text', label: '51# text (75 gsm)' }
      ],
      TRANSLUCENT: [
        { value: '54# text', label: '54# text (80 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '88# text', label: '88# text (130 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '63# cover', label: '63# cover (170 gsm)' },
        { value: '74# cover', label: '74# cover (200 gsm)' },
        { value: '81# cover', label: '81# cover (220 gsm)' }
      ]
    },
    inside: {
      GLOSS: [
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '67# cover', label: '67# cover (180 gsm)' },
        { value: '74# cover', label: '74# cover (200 gsm)' },
        { value: '92# cover', label: '92# cover (250 gsm)' }
      ],
      MATTE: [
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '67# cover', label: '67# cover (180 gsm)' },
        { value: '74# cover', label: '74# cover (200 gsm)' },
        { value: '92# cover', label: '92# cover (250 gsm)' }
      ],
      'HI-PLUS': [
        { value: '60# text', label: '60# text (90 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' }
      ],
      'HI-QMATTE': [
        { value: '89# text', label: '89# text (135 gsm)' },
        { value: '109# text', label: '109# text (165 gsm)' }
      ],
      UNCOATED: [
        { value: '47# text', label: '47# text (70 gsm)' },
        { value: '54# text', label: '54# text (80 gsm)' },
        { value: '60# text', label: '60# text (90 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '80# text', label: '80# text (120 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '67# cover', label: '67# cover (180 gsm)' },
        { value: '81# cover', label: '81# cover (220 gsm)' }
      ],
      MONTBLANC_EW: [
        { value: '60# text', label: '60# text (90 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '88# text', label: '88# text (130 gsm)' },
        { value: '108# text', label: '108# text (160 gsm)' },
        { value: '70# cover', label: '70# cover (190 gsm)' },
        { value: '78# cover', label: '78# cover (210 gsm)' }
      ],
      NEWPLUS_W: [
        { value: '47# text', label: '47# text (70 gsm)' },
        { value: '54# text', label: '54# text (80 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' }
      ],
      TEXTBOOK: [
        { value: '51# text', label: '51# text (75 gsm)' }
      ],
      TRANSLUCENT: [
        { value: '54# text', label: '54# text (80 gsm)' },
        { value: '68# text', label: '68# text (100 gsm)' },
        { value: '88# text', label: '88# text (130 gsm)' },
        { value: '100# text', label: '100# text (150 gsm)' },
        { value: '63# cover', label: '63# cover (170 gsm)' },
        { value: '74# cover', label: '74# cover (200 gsm)' },
        { value: '81# cover', label: '81# cover (220 gsm)' }
      ],
      COLORED: [
        { value: 'A-BE01', label: 'A-BE01', image: '/forms/A-BE01.png' },
        { value: 'A-BE10', label: 'A-BE10', image: '/forms/A-BE10.png' },
        { value: 'A-BE15', label: 'A-BE15', image: '/forms/A-BE15.png' },
        { value: 'A-BE30', label: 'A-BE30', image: '/forms/A-BE30.png' },
        { value: 'A-BE42', label: 'A-BE42', image: '/forms/A-BE42.png' },
        { value: 'A-BE50', label: 'A-BE50', image: '/forms/A-BE50.png' },
        { value: 'A-BE51', label: 'A-BE51', image: '/forms/A-BE51.png' },
        { value: 'A-BE75', label: 'A-BE75', image: '/forms/A-BE75.png' },
        { value: 'A-BE83', label: 'A-BE83', image: '/forms/A-BE83.png' },
        { value: 'A-BE85', label: 'A-BE85', image: '/forms/A-BE85.png' },
        { value: 'B-BE16', label: 'B-BE16', image: '/forms/B-BE16.png' },
        { value: 'B-BE17', label: 'B-BE17', image: '/forms/B-BE17.png' },
        { value: 'B-BE24', label: 'B-BE24', image: '/forms/B-BE24.png' },
        { value: 'B-BE80', label: 'B-BE80', image: '/forms/B-BE80.png' },
        { value: 'B-BE81', label: 'B-BE81', image: '/forms/B-BE81.png' },
        { value: 'C-BE36', label: 'C-BE36', image: '/forms/C-BE36.png' },
        { value: 'C-BE54', label: 'C-BE54', image: '/forms/C-BE54.png' },
        { value: 'C-BE66', label: 'C-BE66', image: '/forms/C-BE66.png' },
        { value: 'C-BE73', label: 'C-BE73', image: '/forms/C-BE73.png' },
        { value: 'D-BE18', label: 'D-BE18', image: '/forms/D-BE18.png' },
        { value: 'D-BE32', label: 'D-BE32', image: '/forms/D-BE32.png' },
        { value: 'D-BE35', label: 'D-BE35', image: '/forms/D-BE35.png' },
        { value: 'D-BE69', label: 'D-BE69', image: '/forms/D-BE69.png' },
        { value: 'D-BE76', label: 'D-BE76', image: '/forms/D-BE76.png' },
        { value: 'E-BE05', label: 'E-BE05', image: '/forms/E-BE05.png' }
      ]
    }
  },
  
  // From form: paper weight conversions
  paperWeightConversions: {
    '60# text': { gsm: '90 gsm', us: '60# text', pt: '2.5 pt', kg: '77 kg' },
    '68# text': { gsm: '100 gsm', us: '68# text', pt: '3.2 pt', kg: '86 kg' },
    '80# text': { gsm: '120 gsm', us: '80# text', pt: '3.8 pt', kg: '103 kg' },
    '88# text': { gsm: '130 gsm', us: '88# text', pt: '4.2 pt', kg: '112 kg' },
    '100# text': { gsm: '150 gsm', us: '100# text', pt: '4.8 pt', kg: '129 kg' },
    '108# text': { gsm: '160 gsm', us: '108# text', pt: '5.1 pt', kg: '138 kg' },
    '109# text': { gsm: '165 gsm', us: '109# text', pt: '5.3 pt', kg: '142 kg' },
    '67# cover': { gsm: '180 gsm', us: '67# cover', pt: '5.9 pt', kg: '155 kg' },
    '70# cover': { gsm: '190 gsm', us: '70# cover', pt: '6.2 pt', kg: '163 kg' },
    '74# cover': { gsm: '200 gsm', us: '74# cover', pt: '7.1 pt', kg: '172 kg' },
    '78# cover': { gsm: '210 gsm', us: '78# cover', pt: '7.5 pt', kg: '181 kg' },
    '81# cover': { gsm: '220 gsm', us: '81# cover', pt: '8.0 pt', kg: '189 kg' },
    '89# cover': { gsm: '240 gsm', us: '89# cover', pt: '8.7 pt', kg: '206 kg' },
    '92# cover': { gsm: '250 gsm', us: '92# cover', pt: '9.1 pt', kg: '215 kg' },
    '96# cover': { gsm: '260 gsm', us: '96# cover', pt: '9.5 pt', kg: '224 kg' },
    '110# cover': { gsm: '300 gsm', us: '110# cover', pt: '11.3 pt', kg: '258 kg' },
    '47# text': { gsm: '70 gsm', us: '47# text', pt: '2.0 pt', kg: '60 kg' },
    '51# text': { gsm: '75 gsm', us: '51# text', pt: '2.2 pt', kg: '65 kg' },
    '54# text': { gsm: '80 gsm', us: '54# text', pt: '2.3 pt', kg: '69 kg' },
    '63# cover': { gsm: '170 gsm', us: '63# cover', pt: '5.5 pt', kg: '146 kg' },
    '89# text': { gsm: '135 gsm', us: '89# text', pt: '4.3 pt', kg: '116 kg' }
  },
  
  // From form: size conversions
  sizeConversions: {
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
  },
  
  // Form available sizes
  availableSizes: ['5.5 x 8.5', '7.5 x 10', '8.5 x 11', '9 x 12', 'A6', 'A5', 'A4', 'B6', 'B5', 'B4', 'Custom Size'],
  
  // Form page edit options
  pageEditOptions: {
    editTypes: ['PAPER', 'FOLD', 'ADDON'],
    addonTypes: ['FOIL', 'UV', 'EMUV', 'EMBOSS', 'DIECUT'],
    addonSizes: ['SMALL', 'MEDIUM', 'LARGE', 'FULL']
  },
  
  // Max subscription cards
  maxSubscriptionCards: 10
};

// Draggable array item component
const DraggableItem = ({ children, index, onDragStart, onDragOver, onDrop, isDragging }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, index)}
    onDragOver={(e) => onDragOver(e, index)}
    onDrop={(e) => onDrop(e, index)}
    className={`relative ${isDragging ? 'opacity-50' : 'opacity-100'} transition-opacity`}
  >
    <div className="absolute left-0 top-0 bottom-0 flex items-center cursor-move">
      <GripVertical size={16} className="text-gray-400" />
    </div>
    <div className="ml-6">
      {children}
    </div>
  </div>
);

export default function PrintQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(PRINTQUOTE_DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [imageUploading, setImageUploading] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [jsonEditors, setJsonEditors] = useState({
    paperWeightConversions: JSON.stringify(PRINTQUOTE_DEFAULT_CONFIG.paperWeightConversions, null, 2),
    paperWeightOptions: JSON.stringify(PRINTQUOTE_DEFAULT_CONFIG.paperWeightOptions, null, 2),
    sizeConversions: JSON.stringify(PRINTQUOTE_DEFAULT_CONFIG.sizeConversions, null, 2)
  });
  const [jsonErrors, setJsonErrors] = useState({});

  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved config:', formConfig);
      setConfig(formConfig);
      
      // Update JSON editors with loaded config
      setJsonEditors({
        paperWeightConversions: JSON.stringify(formConfig.paperWeightConversions || PRINTQUOTE_DEFAULT_CONFIG.paperWeightConversions, null, 2),
        paperWeightOptions: JSON.stringify(formConfig.paperWeightOptions || PRINTQUOTE_DEFAULT_CONFIG.paperWeightOptions, null, 2),
        sizeConversions: JSON.stringify(formConfig.sizeConversions || PRINTQUOTE_DEFAULT_CONFIG.sizeConversions, null, 2)
      });
    } else {
      console.log('📥 Loading default config');
      setConfig(PRINTQUOTE_DEFAULT_CONFIG);
    }
  }, [formConfig]);

  const updateNestedConfig = (path, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
      return newConfig;
    });
  };

  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return prev;
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (Array.isArray(current[arrayKey]) && current[arrayKey][index]) {
        if (field === 'price') {
          current[arrayKey][index] = { 
            ...current[arrayKey][index], 
            [field]: parseFloat(value) || 0 
          };
        } else {
          current[arrayKey][index] = { 
            ...current[arrayKey][index], 
            [field]: value 
          };
        }
      }
      
      return newConfig;
    });
  };

  const addArrayItem = (path, newItem) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (!Array.isArray(current[arrayKey])) {
        current[arrayKey] = [];
      }
      
      current[arrayKey] = [...current[arrayKey], newItem];
      return newConfig;
    });
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return prev;
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey] = current[arrayKey].filter((_, i) => i !== index);
      }
      
      return newConfig;
    });
  };

  const moveArrayItem = (path, fromIndex, toIndex) => {
    const keys = path.split('.');
    setConfig(prev => {
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return prev;
        current = current[keys[i]];
      }
      
      const arrayKey = keys[keys.length - 1];
      if (Array.isArray(current[arrayKey])) {
        const array = [...current[arrayKey]];
        const [movedItem] = array.splice(fromIndex, 1);
        array.splice(toIndex, 0, movedItem);
        current[arrayKey] = array;
      }
      
      return newConfig;
    });
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (path, index) => {
    if (draggedItem !== null && draggedItem !== index) {
      moveArrayItem(path, draggedItem, index);
    }
    setDraggedItem(null);
  };

  const handleImageUpload = async (path, index, field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const uploadKey = `${path}-${index}-${field}`;
      setImageUploading(prev => ({ ...prev, [uploadKey]: true }));
      
      try {
        // In a real app, upload to server and get URL
        // For now, create a local URL
        const imageUrl = URL.createObjectURL(file);
        updateArrayItem(path, index, field, imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setImageUploading(prev => ({ ...prev, [uploadKey]: false }));
      }
    };
    
    input.click();
  };

  const handleJsonEditorChange = (field, value) => {
    setJsonEditors(prev => ({ ...prev, [field]: value }));
    
    try {
      const parsed = JSON.parse(value);
      setJsonErrors(prev => ({ ...prev, [field]: null }));
      
      // Update the config with parsed JSON
      if (field === 'paperWeightConversions') {
        updateNestedConfig('paperWeightConversions', parsed);
      } else if (field === 'paperWeightOptions') {
        updateNestedConfig('paperWeightOptions', parsed);
      } else if (field === 'sizeConversions') {
        updateNestedConfig('sizeConversions', parsed);
      }
    } catch (error) {
      setJsonErrors(prev => ({ ...prev, [field]: error.message }));
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      console.log('💾 Saving config:', config);
      await onSave(config);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  const renderEditableArray = (title, path, fields, hasImages = false, draggable = false) => {
    const getArray = () => {
      const keys = path.split('.');
      let current = config;
      for (let i = 0; i < keys.length; i++) {
        if (!current[keys[i]]) return [];
        current = current[keys[i]];
      }
      return Array.isArray(current) ? current : [];
    };

    const array = getArray();

    return (
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => {
              const newItem = fields.reduce((acc, field) => {
                if (field === 'price') {
                  acc[field] = 0;
                } else if (field === 'description' || field === 'desc') {
                  acc[field] = '';
                } else if (field === 'label') {
                  acc[field] = 'New Item';
                } else if (field === 'value') {
                  acc[field] = `NEW_${Date.now()}`;
                } else if (field === 'image') {
                  acc[field] = '';
                } else {
                  acc[field] = '';
                }
                return acc;
              }, {});
              addArrayItem(path, newItem);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} className="mr-2" />
            Add New Item
          </button>
        </div>
        
        <div className="space-y-4">
          {array.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              {draggable ? (
                <DraggableItem
                  index={index}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(path, index)}
                  isDragging={draggedItem === index}
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      {item.image && (
                        <div className="mr-3 w-10 h-10 rounded overflow-hidden border border-gray-200">
                          <img 
                            src={item.image} 
                            alt={item.label || 'Preview'} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        {item.label && (
                          <span className="font-medium text-gray-900">{item.label}</span>
                        )}
                        {item.value && (
                          <code className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {item.value}
                          </code>
                        )}
                        {item.price !== undefined && (
                          <span className={`ml-2 text-sm ${item.price > 0 ? 'text-green-600' : item.price < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                            ${item.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeArrayItem(path, index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </DraggableItem>
              ) : (
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    {item.image && (
                      <div className="mr-3 w-10 h-10 rounded overflow-hidden border border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.label || 'Preview'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      {item.label && (
                        <span className="font-medium text-gray-900">{item.label}</span>
                      )}
                      {item.value && (
                        <code className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {item.value}
                        </code>
                      )}
                      {item.price !== undefined && (
                        <span className={`ml-2 text-sm ${item.price > 0 ? 'text-green-600' : item.price < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          ${item.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeArrayItem(path, index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {fields.map(field => {
                    if (field === 'image') {
                      return (
                        <div key={field} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 capitalize">
                            <div className="flex items-center">
                              <ImageIcon size={14} className="mr-1" />
                              {field}
                            </div>
                          </label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item[field] || ''}
                                onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                                placeholder="/forms/image.png"
                              />
                              <button
                                type="button"
                                onClick={() => handleImageUpload(path, index, field)}
                                disabled={imageUploading[`${path}-${index}-${field}`]}
                                className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                              >
                                {imageUploading[`${path}-${index}-${field}`] ? 'Uploading...' : 'Upload'}
                              </button>
                            </div>
                            {item[field] && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                <div className="w-20 h-20 rounded overflow-hidden border border-gray-300">
                                  <img 
                                    src={item[field]} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = '/images/placeholder-color.png';
                                      e.target.alt = 'Image not available';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field === 'price' ? (
                            <div className="flex items-center">
                              <DollarSign size={14} className="mr-1" />
                              {field}
                            </div>
                          ) : field}
                        </label>
                        {field === 'price' ? (
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={item[field] || 0}
                              onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                              placeholder="0.00"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={item[field] || ''}
                            onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder={`Enter ${field}`}
                          />
                        )}
                        {field === 'description' && item.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        {field === 'desc' && item.desc && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPaperOptions = (type) => {
    const paperOptions = config.paperOptions?.[type] || [];
    const title = type.charAt(0).toUpperCase() + type.slice(1) + ' Paper Options';
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        {renderEditableArray(`${title}`, `paperOptions.${type}`, ['value', 'label', 'price', 'description'], false, true)}
      </div>
    );
  };

  const renderAdditionalOptions = (category) => {
    const options = config.additionalOptions?.[category] || [];
    const titles = {
      proof: 'Proof Options',
      holePunch: 'Hole Punch Options',
      slipcase: 'Slipcase Options',
      shrinkWrap: 'Shrink Wrap Options',
      directMail: 'Direct Mail Options'
    };
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">{titles[category]}</h4>
        {renderEditableArray('', `additionalOptions.${category}`, ['value', 'label', 'price', 'description'])}
      </div>
    );
  };

  const renderJsonEditor = (title, field, description) => {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </div>
        
        <div className="relative">
          <textarea
            value={jsonEditors[field]}
            onChange={(e) => handleJsonEditorChange(field, e.target.value)}
            rows={20}
            className={`w-full font-mono text-sm p-4 border rounded-lg transition-colors ${
              jsonErrors[field] ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'
            }`}
            spellCheck="false"
          />
          {jsonErrors[field] && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                <span className="font-semibold">JSON Error:</span> {jsonErrors[field]}
              </p>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Edit the JSON structure directly. Make sure to maintain valid JSON format.
            </div>
            <button
              onClick={() => {
                try {
                  const parsed = JSON.parse(jsonEditors[field]);
                  const pretty = JSON.stringify(parsed, null, 2);
                  handleJsonEditorChange(field, pretty);
                } catch (error) {
                  // Ignore if already invalid
                }
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Format JSON
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-gray-200">Configuration Preview</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">General Settings</h4>
              <p className="text-sm text-gray-600">{config.general?.title}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Paper Options Count</h4>
              <div className="flex space-x-4 text-sm">
                <span className="text-gray-600">Cover: {config.paperOptions?.cover?.length || 0}</span>
                <span className="text-gray-600">Inside: {config.paperOptions?.inside?.length || 0}</span>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Available Options Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">Binding Edges</p>
                <p className="text-blue-700">{config.bindingEdges?.length || 0} options</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-900">Print Colors</p>
                <p className="text-green-700">{config.printColors?.length || 0} options</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">Cover Finishes</p>
                <p className="text-purple-700">{config.coverFinishes?.length || 0} options</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Pricing Configuration</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Base Setup: ${config.pricing?.baseSetupCost || 0}</p>
              <p>Cost Per Page: ${config.pricing?.costPerPage || 0}</p>
              <p>Custom Size Multiplier: {config.pricing?.customSizeMultiplier || 1}x</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Perfect Binding Form Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Edit every option in the perfect binding book printing form</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Back to Editor' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium shadow-sm"
              >
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>
          </div>

          <div className="flex space-x-8 overflow-x-auto pb-2">
            {[
              'general', 'sizes', 'binding', 'colors', 'paper-cover', 'paper-inside',
              'paper-subscription', 'finishes', 'folds', 'additional', 'positions',
              'page-counts', 'quantities', 'pricing', 'weights-options', 'weights-conversions',
              'size-conversions'
            ].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {preview ? (
          renderPreview()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-5 sticky top-8">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Configuration Sections</h3>
                <nav className="space-y-1">
                  {[
                    { id: 'general', label: 'General Settings', icon: '⚙️' },
                    { id: 'sizes', label: 'Sizes & Dimensions', icon: '📐' },
                    { id: 'binding', label: 'Binding Edges', icon: '📖' },
                    { id: 'colors', label: 'Color Options', icon: '🎨' },
                    { id: 'paper-cover', label: 'Cover Paper', icon: '🟫' },
                    { id: 'paper-inside', label: 'Inside Paper', icon: '📄' },
                    { id: 'paper-subscription', label: 'Subscription Paper', icon: '💳' },
                    { id: 'finishes', label: 'Cover Finishes', icon: '✨' },
                    { id: 'folds', label: 'Cover Folds', icon: '📐' },
                    { id: 'additional', label: 'Additional Services', icon: '➕' },
                    { id: 'positions', label: 'Card Positions', icon: '📍' },
                    { id: 'page-counts', label: 'Page Counts', icon: '📊' },
                    { id: 'quantities', label: 'Quantities', icon: '📦' },
                    { id: 'pricing', label: 'Pricing Settings', icon: '💰' },
                    { id: 'weights-options', label: 'Paper Weight Options', icon: '⚖️' },
                    { id: 'weights-conversions', label: 'Weight Conversions', icon: '🔄' },
                    { id: 'size-conversions', label: 'Size Conversions', icon: '📏' },
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeTab === section.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium border border-indigo-100'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3">{section.icon}</span>
                      <span className="text-sm">{section.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">💡 Tip:</span> Drag and drop items to reorder them in the list.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-8 space-y-8">
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">General Settings</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Form Title
                          </label>
                          <input
                            type="text"
                            value={config.general?.title || ''}
                            onChange={(e) => updateNestedConfig('general.title', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Form Description
                          </label>
                          <textarea
                            value={config.general?.description || ''}
                            onChange={(e) => updateNestedConfig('general.description', e.target.value)}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Submit Button Text
                            </label>
                            <input
                              type="text"
                              value={config.general?.submitButtonText || ''}
                              onChange={(e) => updateNestedConfig('general.submitButtonText', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Shipping Button Text
                            </label>
                            <input
                              type="text"
                              value={config.general?.shippingButtonText || ''}
                              onChange={(e) => updateNestedConfig('general.shippingButtonText', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions (INCH)
                          </label>
                          <textarea
                            value={config.customSizeInstructions?.INCH || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.INCH', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Instructions (MM)
                          </label>
                          <textarea
                            value={config.customSizeInstructions?.MM || ''}
                            onChange={(e) => updateNestedConfig('customSizeInstructions.MM', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Spine Width Display
                          </label>
                          <input
                            type="text"
                            value={config.spineWidth || ''}
                            onChange={(e) => updateNestedConfig('spineWidth', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder='e.g., 0.178"'
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sizes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Sizes & Dimensions</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Standard Sizes (comma separated)
                        </label>
                        <input
                          type="text"
                          value={config.availableSizes?.join(', ') || ''}
                          onChange={(e) => updateNestedConfig('availableSizes', e.target.value.split(',').map(s => s.trim()))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="5.5 x 8.5, 7.5 x 10, 8.5 x 11, ..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'binding' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Binding Edges</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">💡 Note:</span> Binding Edge options support images. Drag and drop to reorder items.
                        </p>
                      </div>
                      {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc', 'image'], true, true)}
                    </div>
                  )}

                  {activeTab === 'colors' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Print Color Options</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">💡 Note:</span> Print Color options support images. Drag and drop to reorder items.
                        </p>
                      </div>
                      {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price', 'image'], true, true)}
                    </div>
                  )}

                  {activeTab === 'paper-cover' && renderPaperOptions('cover')}
                  {activeTab === 'paper-inside' && renderPaperOptions('inside')}
                  {activeTab === 'paper-subscription' && renderPaperOptions('subscription')}

                  {activeTab === 'finishes' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Finishes</h3>
                      {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price'])}
                    </div>
                  )}

                  {activeTab === 'folds' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Cover Folds</h3>
                      {renderEditableArray('Cover Folds', 'coverFolds', ['value', 'label', 'price'])}
                    </div>
                  )}

                  {activeTab === 'additional' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Additional Services</h3>
                      
                      <div className="space-y-8">
                        {['proof', 'holePunch', 'slipcase', 'shrinkWrap', 'directMail'].map(category => (
                          <div key={category}>
                            {renderAdditionalOptions(category)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'positions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Card Positions</h3>
                      {renderEditableArray('Insertion Positions', 'positions', ['value', 'label'])}
                    </div>
                  )}

                  {activeTab === 'page-counts' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Page Count Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> Page counts are auto-generated from 24 to 880 in increments of 2.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'quantities' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Quantity Options</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Quantities (comma separated)
                        </label>
                        <input
                          type="text"
                          value={config.quantities?.join(', ') || ''}
                          onChange={(e) => updateNestedConfig('quantities', e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="100, 200, 300, 400, 500, ..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'pricing' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Pricing Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Base Setup Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.baseSetupCost || 0}
                              onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cost Per Page ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.001"
                              value={config.pricing?.costPerPage || 0}
                              onChange={(e) => updateNestedConfig('pricing.costPerPage', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.customSizeMultiplier || 1.2}
                            onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1.2)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Standard Size Multiplier
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={config.pricing?.standardSizeMultiplier || 1.1}
                            onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1.1)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dust Cover Base Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.dustCoverBaseCost || 0}
                              onChange={(e) => updateNestedConfig('pricing.dustCoverBaseCost', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dust Cover Per Copy ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.001"
                              value={config.pricing?.dustCoverPerCopy || 0}
                              onChange={(e) => updateNestedConfig('pricing.dustCoverPerCopy', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subscription Card Base Cost ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={config.pricing?.subscriptionCardBaseCost || 0}
                              onChange={(e) => updateNestedConfig('pricing.subscriptionCardBaseCost', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subscription Card Per Copy ($)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.001"
                              value={config.pricing?.subscriptionCardPerCopy || 0}
                              onChange={(e) => updateNestedConfig('pricing.subscriptionCardPerCopy', parseFloat(e.target.value) || 0)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors pl-10"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              $
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'weights-options' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Paper Weight Options</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                          <span className="font-semibold">Note:</span> This is a complex nested structure. Edit the JSON below to modify paper weight options for different paper types.
                        </p>
                      </div>
                      {renderJsonEditor(
                        'Paper Weight Options',
                        'paperWeightOptions',
                        'Nested structure containing weight options for cover and inside papers. Each paper type has an array of available weight options.'
                      )}
                    </div>
                  )}

                  {activeTab === 'weights-conversions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Paper Weight Conversions</h3>
                      {renderJsonEditor(
                        'Weight Conversion Table',
                        'paperWeightConversions',
                        'Mapping of weight values to their equivalents in different measurement systems (gsm, US lb, points, kg).'
                      )}
                    </div>
                  )}

                  {activeTab === 'size-conversions' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Size Conversions</h3>
                      {renderJsonEditor(
                        'Size Conversion Tables',
                        'sizeConversions',
                        'Size display strings for both inch and millimeter measurement systems.'
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    if (confirm('Reset to default configuration? This will discard all changes.')) {
                      setConfig(PRINTQUOTE_DEFAULT_CONFIG);
                    }
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Reset to Default
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {saving ? 'Saving Configuration...' : 'Save All Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}