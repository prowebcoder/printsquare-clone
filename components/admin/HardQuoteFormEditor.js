// components/admin/HardQuoteFormEditor.js
'use client';
import { useState, useEffect } from 'react';
import { Save, Eye, Plus, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Settings, Package, Palette, Ruler, Layers, FileText, Droplets, Shield, Truck } from 'lucide-react';

// Enhanced default configuration for hardcover binding with images
const HARDQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Hardcover Book Printing Quote",
    description: "Configure your professional hardcover book with our instant quoting system. Perfect for premium publications, yearbooks, and special editions.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  
  bindingEdges: [
    { 
      value: 'SQUARE', 
      label: 'Square Spine', 
      desc: 'Standard square spine for hardcover books',
      image: '/forms/hard/book_option01.png'
    },
    { 
      value: 'ROUNDED', 
      label: 'Rounded Spine', 
      desc: 'Premium rounded spine for better durability',
      image: '/forms/hard/book_option02.png'
    },
  ],
  
  headbandColors: [
    { value: 'RD3', label: 'RD3', image: '/forms/hard/RD3.png' },
    { value: 'RD4', label: 'RD4', image: '/forms/hard/RD4.png' },
    { value: 'RD7', label: 'RD7', image: '/forms/hard/RD7.png' },
    { value: 'RD8', label: 'RD8', image: '/forms/hard/RD8.png' },
    { value: 'RD9', label: 'RD9', image: '/forms/hard/RD9.png' },
    { value: 'RD10', label: 'RD10', image: '/forms/hard/RD10.png' },
    { value: 'RD12', label: 'RD12', image: '/forms/hard/RD12.png' },
    { value: 'RD13', label: 'RD13', image: '/forms/hard/RD13.png' },
    { value: 'RD14', label: 'RD14', image: '/forms/hard/RD14.png' },
    { value: 'RD15', label: 'RD15', image: '/forms/hard/RD15.png' },
    { value: 'RD16', label: 'RD16', image: '/forms/hard/RD16.png' },
    { value: 'RD17', label: 'RD17', image: '/forms/hard/RD17.png' },
    { value: 'RD18', label: 'RD18', image: '/forms/hard/RD18.png' },
    { value: 'RD19', label: 'RD19', image: '/forms/hard/RD19.png' },
    { value: 'RD22', label: 'RD22', image: '/forms/hard/RD22.png' },
    { value: 'RD25', label: 'RD25', image: '/forms/hard/RD25.png' },
    { value: 'RD26', label: 'RD26', image: '/forms/hard/RD26.png' },
    { value: 'RD28', label: 'RD28', image: '/forms/hard/RD28.png' },
    { value: 'RD30', label: 'RD30', image: '/forms/hard/RD30.png' }
  ],
  
  paperOptions: {
    cover: [
      { 
        value: 'MATTE', 
        label: 'Matte', 
        description: 'Matte finish, professional look',
        price: 0
      },
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        description: 'Glossy finish, vibrant colors',
        price: 25
      },
      { 
        value: 'COLORED', 
        label: 'Colored', 
        description: 'Colored paper options',
        price: 40
      },
      { 
        value: 'LEATHACK91', 
        label: 'Leathack 91', 
        description: 'Premium leather texture',
        price: 120
      },
      { 
        value: 'LEATHACK205', 
        label: 'Leathack 205', 
        description: 'Enhanced leather finish',
        price: 150
      },
      { 
        value: 'LEATHACK210', 
        label: 'Leathack 210', 
        description: 'Premium leather texture',
        price: 180
      },
      { 
        value: 'TANT', 
        label: 'Tant', 
        description: 'Textured paper option',
        price: 100
      },
      { 
        value: 'COLORED_KEN', 
        label: 'Colored - KEN', 
        description: 'KEN colored options',
        price: 50
      },
      { 
        value: 'COLORED_KEV', 
        label: 'Colored - KEV', 
        description: 'KEV colored options',
        price: 60
      },
      { 
        value: 'CLOTH', 
        label: 'Cloth', 
        description: 'Cloth cover material',
        price: 80
      },
      { 
        value: 'CLOTH_GLOSS', 
        label: 'Cloth + Gloss', 
        description: 'Cloth with gloss finish',
        price: 100
      },
      { 
        value: 'CLOTH_MATTE', 
        label: 'Cloth + Matte', 
        description: 'Cloth with matte finish',
        price: 90
      }
    ],
    inside: [
      { 
        value: 'GLOSS', 
        label: 'Gloss', 
        price: 0,
        description: 'Glossy finish, vibrant printing'
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        price: 0,
        description: 'Matte finish, reduces glare'
      },
      { 
        value: 'HI-PLUS', 
        label: 'Hi-Plus', 
        price: 25,
        description: 'Premium heavy-weight paper'
      },
      { 
        value: 'HI-QMATTE', 
        label: 'Hi-Q Matte', 
        price: 50,
        description: 'High quality matte finish'
      },
      { 
        value: 'HIUNCOATED', 
        label: 'Hi Uncoated', 
        price: 0,
        description: 'Uncoated heavy paper'
      },
      { 
        value: 'HIPREMIUM', 
        label: 'Hi Premium', 
        price: 75,
        description: 'Premium grade paper'
      },
      { 
        value: 'HINEWPLUS', 
        label: 'Hi New Plus', 
        price: 20,
        description: 'New premium paper'
      },
      { 
        value: 'TEXTBOOK', 
        label: 'Textbook', 
        price: 30,
        description: 'Textbook grade paper'
      },
      { 
        value: 'TRANSLUCENT', 
        label: 'Translucent', 
        price: 80,
        description: 'Translucent paper option'
      },
      { 
        value: 'COLORED', 
        label: 'Colored', 
        price: 40,
        description: 'Colored interior paper'
      }
    ]
  },
  
  // Cover paper weight options - UPDATED TO MATCH FORM STRUCTURE
  coverPaperWeightOptions: {
    'GLOSS': [
      { value: '100# text', label: '100# text' }
    ],
    'MATTE': [
      { value: '80# text', label: '80# text' }
    ],
    'COLORED': [
      { value: 'A-BE01', label: 'A-BE01', image: '/forms/hard/A-BE01.png' },
      { value: 'A-BE10', label: 'A-BE10', image: '/forms/hard/A-BE10.png' },
      { value: 'A-BE15', label: 'A-BE15', image: '/forms/hard/A-BE15.png' },
      { value: 'A-BE30', label: 'A-BE30', image: '/forms/hard/A-BE30.png' },
      { value: 'A-BE42', label: 'A-BE42', image: '/forms/hard/A-BE42.png' },
      { value: 'A-BE50', label: 'A-BE50', image: '/forms/hard/A-BE50.png' },
      { value: 'A-BE51', label: 'A-BE51', image: '/forms/hard/A-BE51.png' },
      { value: 'A-BE75', label: 'A-BE75', image: '/forms/hard/A-BE75.png' },
      { value: 'A-BE83', label: 'A-BE83', image: '/forms/hard/A-BE83.png' },
      { value: 'A-BE85', label: 'A-BE85', image: '/forms/hard/A-BE85.png' },
      { value: 'B-BE16', label: 'B-BE16', image: '/forms/hard/B-BE16.png' },
      { value: 'B-BE17', label: 'B-BE17', image: '/forms/hard/B-BE17.png' },
      { value: 'B-BE24', label: 'B-BE24', image: '/forms/hard/B-BE24.png' },
      { value: 'B-BE80', label: 'B-BE80', image: '/forms/hard/B-BE80.png' },
      { value: 'B-BE81', label: 'B-BE81', image: '/forms/hard/B-BE81.png' },
      { value: 'C-BE36', label: 'C-BE36', image: '/forms/hard/C-BE36.png' },
      { value: 'C-BE54', label: 'C-BE54', image: '/forms/hard/C-BE54.png' },
      { value: 'C-BE66', label: 'C-BE66', image: '/forms/hard/C-BE66.png' },
      { value: 'C-BE73', label: 'C-BE73', image: '/forms/hard/C-BE73.png' },
      { value: 'D-BE18', label: 'D-BE18', image: '/forms/hard/D-BE18.png' },
      { value: 'D-BE32', label: 'D-BE32', image: '/forms/hard/D-BE32.png' },
      { value: 'D-BE35', label: 'D-BE35', image: '/forms/hard/D-BE35.png' },
      { value: 'D-BE69', label: 'D-BE69', image: '/forms/hard/D-BE69.png' },
      { value: 'D-BE76', label: 'D-BE76', image: '/forms/hard/D-BE76.png' },
      { value: 'E-BE05', label: 'E-BE05', image: '/forms/hard/E-BE05.png' }
    ],
    'LEATHACK91': [
      { value: 'A-L912', label: 'A-L912', image: '/forms/hard/A-L912.png' },
      { value: 'A-L913', label: 'A-L913', image: '/forms/hard/A-L913.png' },
      { value: 'A-L914', label: 'A-L914', image: '/forms/hard/A-L914.png' },
      { value: 'A-L915', label: 'A-L915', image: '/forms/hard/A-L915.png' },
      { value: 'A-L916', label: 'A-L916', image: '/forms/hard/A-L916.png' },
      { value: 'A-L917', label: 'A-L917', image: '/forms/hard/A-L917.png' },
      { value: 'C-L918', label: 'C-L918', image: '/forms/hard/C-L918.png' },
      { value: 'D-L910', label: 'D-L910', image: '/forms/hard/D-L910.png' },
      { value: 'D-L919', label: 'D-L919', image: '/forms/hard/D-L919.png' }
    ],
    'LEATHACK205': [
      { value: 'A-L2051', label: 'A-L2051', image: '/forms/hard/A-L2051.png' },
      { value: 'A-L2052', label: 'A-L2052', image: '/forms/hard/A-L2052.png' },
      { value: 'C-L2051', label: 'C-L2051', image: '/forms/hard/C-L2051.png' },
      { value: 'D-L2052', label: 'D-L2052', image: '/forms/hard/D-L2052.png' },
      { value: 'D-L2053', label: 'D-L2053', image: '/forms/hard/D-L2053.png' },
      { value: 'D-L2054', label: 'D-L2054', image: '/forms/hard/D-L2054.png' }
    ],
    'LEATHACK210': [
      { value: 'A-L2101', label: 'A-L2101', image: '/forms/hard/A-L2101.png' },
      { value: 'B-L2102', label: 'B-L2102', image: '/forms/hard/B-L2102.png' },
      { value: 'B-L2103', label: 'B-L2103', image: '/forms/hard/B-L2103.png' },
      { value: 'D-L2104', label: 'D-L2104', image: '/forms/hard/D-L2104.png' }
    ],
    'TANT': [
      { value: 'A-T01', label: 'A-T01', image: '/forms/hard/A-T01.png' },
      { value: 'A-T02', label: 'A-T02', image: '/forms/hard/A-T02.png' },
      { value: 'A-T03', label: 'A-T03', image: '/forms/hard/A-T03.png' },
      { value: 'A-T04', label: 'A-T04', image: '/forms/hard/A-T04.png' },
      { value: 'A-T05', label: 'A-T05', image: '/forms/hard/A-T05.png' },
      { value: 'B-T06', label: 'B-T06', image: '/forms/hard/B-T06.png' },
      { value: 'C-T07', label: 'C-T07', image: '/forms/hard/C-T07.png' },
      { value: 'C-T08', label: 'C-T08', image: '/forms/hard/C-T08.png' },
      { value: 'D-T09', label: 'D-T09', image: '/forms/hard/D-T09.png' }
    ],
    'COLORED_KEN': [
      { value: 'KEN101', label: 'KEN101', image: '/forms/hard/KEN101.png' },
      { value: 'KEN102', label: 'KEN102', image: '/forms/hard/KEN102.png' },
      { value: 'KEN103', label: 'KEN103', image: '/forms/hard/KEN103.png' },
      { value: 'KEN104', label: 'KEN104', image: '/forms/hard/KEN104.png' },
      { value: 'KEN105', label: 'KEN105', image: '/forms/hard/KEN105.png' },
      { value: 'KEN106', label: 'KEN106', image: '/forms/hard/KEN106.png' },
      { value: 'KEN107', label: 'KEN107', image: '/forms/hard/KEN107.png' },
      { value: 'KEN108', label: 'KEN108', image: '/forms/hard/KEN108.png' },
      { value: 'KEN109', label: 'KEN109', image: '/forms/hard/KEN109.png' },
      { value: 'KEN110', label: 'KEN110', image: '/forms/hard/KEN110.png' },
      { value: 'KEN111', label: 'KEN111', image: '/forms/hard/KEN111.png' },
      { value: 'KEN112', label: 'KEN112', image: '/forms/hard/KEN112.png' },
      { value: 'KEN113', label: 'KEN113', image: '/forms/hard/KEN113.png' },
      { value: 'KEN114', label: 'KEN114', image: '/forms/hard/KEN114.png' },
      { value: 'KEN115', label: 'KEN115', image: '/forms/hard/KEN115.png' },
      { value: 'KEN116', label: 'KEN116', image: '/forms/hard/KEN116.png' },
      { value: 'KEN117', label: 'KEN117', image: '/forms/hard/KEN117.png' },
      { value: 'KEN118', label: 'KEN118', image: '/forms/hard/KEN118.png' },
      { value: 'KEN119', label: 'KEN119', image: '/forms/hard/KEN119.png' },
      { value: 'KEN120', label: 'KEN120', image: '/forms/hard/KEN120.png' },
      { value: 'KEN121', label: 'KEN121', image: '/forms/hard/KEN121.png' },
      { value: 'KEN122', label: 'KEN122', image: '/forms/hard/KEN122.png' },
      { value: 'KEN123', label: 'KEN123', image: '/forms/hard/KEN123.png' },
      { value: 'KEN124', label: 'KEN124', image: '/forms/hard/KEN124.png' },
      { value: 'KEN218', label: 'KEN218', image: '/forms/hard/KEN218.png' }
    ],
    'COLORED_KEV': [
      { value: 'KEVV01', label: 'KEVV01', image: '/forms/hard/KEVV01.png' },
      { value: 'KEVV02', label: 'KEVV02', image: '/forms/hard/KEVV02.png' },
      { value: 'KEVV04', label: 'KEVV04', image: '/forms/hard/KEVV04.png' },
      { value: 'KEVV07', label: 'KEVV07', image: '/forms/hard/KEVV07.png' },
      { value: 'KEVV08', label: 'KEVV08', image: '/forms/hard/KEVV08.png' },
      { value: 'KEVV09', label: 'KEVV09', image: '/forms/hard/KEVV09.png' },
      { value: 'KEVV10', label: 'KEVV10', image: '/forms/hard/KEVV10.png' },
      { value: 'KEVV11', label: 'KEVV11', image: '/forms/hard/KEVV11.png' },
      { value: 'KEVV13', label: 'KEVV13', image: '/forms/hard/KEVV13.png' },
      { value: 'KEVV14', label: 'KEVV14', image: '/forms/hard/KEVV14.png' },
      { value: 'KEVV15', label: 'KEVV15', image: '/forms/hard/KEVV15.png' },
      { value: 'KEVV16', label: 'KEVV16', image: '/forms/hard/KEVV16.png' },
      { value: 'KEVV18', label: 'KEVV18', image: '/forms/hard/KEVV18.png' },
      { value: 'KEVV19', label: 'KEVV19', image: '/forms/hard/KEVV19.png' },
      { value: 'KEVV33', label: 'KEVV33', image: '/forms/hard/KEVV33.png' },
      { value: 'KEVV61', label: 'KEVV61', image: '/forms/hard/KEVV61.png' },
      { value: 'KEVV62', label: 'KEVV62', image: '/forms/hard/KEVV62.png' },
      { value: 'KEVV63', label: 'KEVV63', image: '/forms/hard/KEVV63.png' }
    ],
    'CLOTH': [
      { value: 'RD3', label: 'RD3', image: '/forms/hard/RD3.png' },
      { value: 'RD4', label: 'RD4', image: '/forms/hard/RD4.png' },
      { value: 'RD7', label: 'RD7', image: '/forms/hard/RD7.png' },
      { value: 'RD8', label: 'RD8', image: '/forms/hard/RD8.png' },
      { value: 'RD9', label: 'RD9', image: '/forms/hard/RD9.png' },
      { value: 'RD10', label: 'RD10', image: '/forms/hard/RD10.png' },
      { value: 'RD12', label: 'RD12', image: '/forms/hard/RD12.png' },
      { value: 'RD13', label: 'RD13', image: '/forms/hard/RD13.png' },
      { value: 'RD14', label: 'RD14', image: '/forms/hard/RD14.png' },
      { value: 'RD15', label: 'RD15', image: '/forms/hard/RD15.png' },
      { value: 'RD16', label: 'RD16', image: '/forms/hard/RD16.png' },
      { value: 'RD17', label: 'RD17', image: '/forms/hard/RD17.png' },
      { value: 'RD18', label: 'RD18', image: '/forms/hard/RD18.png' },
      { value: 'RD19', label: 'RD19', image: '/forms/hard/RD19.png' },
      { value: 'RD22', label: 'RD22', image: '/forms/hard/RD22.png' },
      { value: 'RD25', label: 'RD25', image: '/forms/hard/RD25.png' },
      { value: 'RD26', label: 'RD26', image: '/forms/hard/RD26.png' },
      { value: 'RD28', label: 'RD28', image: '/forms/hard/RD28.png' },
      { value: 'RD30', label: 'RD30', image: '/forms/hard/RD30.png' }
    ],
    'CLOTH_GLOSS': [
      { value: 'RD3', label: 'RD3', image: '/forms/hard/RD3.png' },
      { value: 'RD4', label: 'RD4', image: '/forms/hard/RD4.png' },
      { value: 'RD7', label: 'RD7', image: '/forms/hard/RD7.png' },
      { value: 'RD8', label: 'RD8', image: '/forms/hard/RD8.png' },
      { value: 'RD9', label: 'RD9', image: '/forms/hard/RD9.png' },
      { value: 'RD10', label: 'RD10', image: '/forms/hard/RD10.png' },
      { value: 'RD12', label: 'RD12', image: '/forms/hard/RD12.png' },
      { value: 'RD13', label: 'RD13', image: '/forms/hard/RD13.png' },
      { value: 'RD14', label: 'RD14', image: '/forms/hard/RD14.png' },
      { value: 'RD15', label: 'RD15', image: '/forms/hard/RD15.png' },
      { value: 'RD16', label: 'RD16', image: '/forms/hard/RD16.png' },
      { value: 'RD17', label: 'RD17', image: '/forms/hard/RD17.png' },
      { value: 'RD18', label: 'RD18', image: '/forms/hard/RD18.png' },
      { value: 'RD19', label: 'RD19', image: '/forms/hard/RD19.png' },
      { value: 'RD22', label: 'RD22', image: '/forms/hard/RD22.png' },
      { value: 'RD25', label: 'RD25', image: '/forms/hard/RD25.png' },
      { value: 'RD26', label: 'RD26', image: '/forms/hard/RD26.png' },
      { value: 'RD28', label: 'RD28', image: '/forms/hard/RD28.png' },
      { value: 'RD30', label: 'RD30', image: '/forms/hard/RD30.png' }
    ],
    'CLOTH_MATTE': [
      { value: 'RD3', label: 'RD3', image: '/forms/hard/RD3.png' },
      { value: 'RD4', label: 'RD4', image: '/forms/hard/RD4.png' },
      { value: 'RD7', label: 'RD7', image: '/forms/hard/RD7.png' },
      { value: 'RD8', label: 'RD8', image: '/forms/hard/RD8.png' },
      { value: 'RD9', label: 'RD9', image: '/forms/hard/RD9.png' },
      { value: 'RD10', label: 'RD10', image: '/forms/hard/RD10.png' },
      { value: 'RD12', label: 'RD12', image: '/forms/hard/RD12.png' },
      { value: 'RD13', label: 'RD13', image: '/forms/hard/RD13.png' },
      { value: 'RD14', label: 'RD14', image: '/forms/hard/RD14.png' },
      { value: 'RD15', label: 'RD15', image: '/forms/hard/RD15.png' },
      { value: 'RD16', label: 'RD16', image: '/forms/hard/RD16.png' },
      { value: 'RD17', label: 'RD17', image: '/forms/hard/RD17.png' },
      { value: 'RD18', label: 'RD18', image: '/forms/hard/RD18.png' },
      { value: 'RD19', label: 'RD19', image: '/forms/hard/RD19.png' },
      { value: 'RD22', label: 'RD22', image: '/forms/hard/RD22.png' },
      { value: 'RD25', label: 'RD25', image: '/forms/hard/RD25.png' },
      { value: 'RD26', label: 'RD26', image: '/forms/hard/RD26.png' },
      { value: 'RD28', label: 'RD28', image: '/forms/hard/RD28.png' },
      { value: 'RD30', label: 'RD30', image: '/forms/hard/RD30.png' }
    ]
  },
  
  // Inside paper weight options - UPDATED TO MATCH FORM STRUCTURE
  insidePaperWeightOptions: {
    'GLOSS': [
      { value: '68# text', label: '68# text' },
      { value: '80# text', label: '80# text' },
      { value: '100# text', label: '100# text' },
      { value: '67# cover', label: '67# cover' },
      { value: '74# cover', label: '74# cover' },
      { value: '92# cover', label: '92# cover' }
    ],
    'MATTE': [
      { value: '68# text', label: '68# text' },
      { value: '80# text', label: '80# text' },
      { value: '100# text', label: '100# text' },
      { value: '67# cover', label: '67# cover' },
      { value: '74# cover', label: '74# cover' },
      { value: '92# cover', label: '92# cover' }
    ],
    'HI-PLUS': [
      { value: '60# text', label: '60# text' },
      { value: '68# text', label: '68# text' },
      { value: '80# text', label: '80# text' }
    ],
    'HI-QMATTE': [
      { value: '89# text', label: '89# text' },
      { value: '109# text', label: '109# text' }
    ],
    'HIUNCOATED': [
      { value: '47# text', label: '47# text' },
      { value: '54# text', label: '54# text' },
      { value: '60# text', label: '60# text' },
      { value: '68# text', label: '68# text' },
      { value: '80# text', label: '80# text' },
      { value: '100# text', label: '100# text' },
      { value: '67# cover', label: '67# cover' },
      { value: '81# cover', label: '81# cover' }
    ],
    'HIPREMIUM': [
      { value: '60# text', label: '60# text' },
      { value: '68# text', label: '68# text' },
      { value: '88# text', label: '88# text' },
      { value: '108# text', label: '108# text' },
      { value: '70# cover', label: '70# cover' },
      { value: '78# cover', label: '78# cover' }
    ],
    'HINEWPLUS': [
      { value: '47# text', label: '47# text' },
      { value: '54# text', label: '54# text' },
      { value: '68# text', label: '68# text' }
    ],
    'TEXTBOOK': [
      { value: '51# text', label: '51# text' }
    ],
    'TRANSLUCENT': [
      { value: '54# text', label: '54# text' },
      { value: '68# text', label: '68# text' },
      { value: '88# text', label: '88# text' },
      { value: '100# text', label: '100# text' },
      { value: '63# cover', label: '63# cover' },
      { value: '74# cover', label: '74# cover' },
      { value: '81# cover', label: '81# cover' }
    ],
    'COLORED': [
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
  },
  
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
    { value: 'MATTE', label: 'Matte Lamination', price: 50 },
    { value: 'GLOSS', label: 'Gloss Lamination', price: 50 },
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

export default function HardQuoteFormEditor({ formConfig, onSave }) {
  const [config, setConfig] = useState(HARDQUOTE_DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState('general');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  // Initialize with saved config or defaults
  useEffect(() => {
    if (formConfig && Object.keys(formConfig).length > 0) {
      console.log('📥 Loading saved hardcover config:', formConfig);
      setConfig(formConfig);
    } else {
      console.log('📥 Loading default hardcover config');
      setConfig(HARDQUOTE_DEFAULT_CONFIG);
    }
  }, [formConfig]);

  // Helper function to update nested properties
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

  // Helper function to update array items in nested paths
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
        current[arrayKey][index] = { ...current[arrayKey][index], [field]: value };
      }
      
      return newConfig;
    });
  };

  // Add item to array
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

  // Remove item from array
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

  // Handle saving configuration
  const handleSave = async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      console.log('💾 Saving hardcover config:', config);
      await onSave(config);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  // Render editable array with multiple fields
  const renderEditableArray = (title, path, fields, isNested = false) => {
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
                  acc[field] = '/forms/placeholder.png';
                } else {
                  acc[field] = '';
                }
                return acc;
              }, {});
              addArrayItem(path, newItem);
            }}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add New
          </button>
        </div>
        
        <div className="space-y-3">
          {array.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {fields.map(field => (
                  <div key={field} className={`${field === 'description' || field === 'desc' || field === 'image' ? 'col-span-2' : ''}`}>
                    <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                      {field}
                    </label>
                    {field === 'image' ? (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={item[field] || ''}
                          onChange={(e) => updateArrayItem(path, index, field, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Image URL (e.g., /forms/hard/example.png)"
                        />
                        {item[field] && (
                          <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden border border-gray-300">
                            <img 
                              src={item[field]} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => e.target.src = '/forms/placeholder.png'}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field === 'price' ? 'number' : 'text'}
                        value={item[field] || ''}
                        onChange={(e) => {
                          const value = field === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
                          updateArrayItem(path, index, field, value);
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Enter ${field}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render simple string array
  const renderSimpleArray = (title, path, placeholder = "Enter value") => {
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
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => addArrayItem(path, '')}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add New
          </button>
        </div>
        
        <div className="space-y-2">
          {array.map((item, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type={path.includes('pageCounts') || path.includes('quantities') ? 'number' : 'text'}
                value={item}
                onChange={(e) => {
                  const newArray = [...array];
                  newArray[index] = path.includes('pageCounts') || path.includes('quantities') 
                    ? parseInt(e.target.value) || 0 
                    : e.target.value;
                  updateNestedConfig(path, newArray);
                }}
                className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={placeholder}
              />
              <button
                onClick={() => removeArrayItem(path, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render nested paper weight options (for coverPaperWeightOptions and insidePaperWeightOptions)
  const renderNestedPaperWeightOptions = (title, path) => {
    const getObject = () => {
      const keys = path.split('.');
      let current = config;
      for (let i = 0; i < keys.length; i++) {
        if (!current[keys[i]]) return {};
        current = current[keys[i]];
      }
      return current;
    };

    const nestedObject = getObject();
    const keys = Object.keys(nestedObject);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-700">{title}</h4>
          <button
            onClick={() => {
              const newKey = `NEW_TYPE_${Date.now()}`;
              setConfig(prev => {
                const newConfig = JSON.parse(JSON.stringify(prev));
                const keys = path.split('.');
                let current = newConfig;
                for (let i = 0; i < keys.length; i++) {
                  if (!current[keys[i]]) current[keys[i]] = {};
                  current = current[keys[i]];
                }
                current[newKey] = [];
                return newConfig;
              });
            }}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            Add Paper Type
          </button>
        </div>
        
        <div className="space-y-6">
          {keys.map((key) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => {
                      const newKey = e.target.value.toUpperCase();
                      setConfig(prev => {
                        const newConfig = JSON.parse(JSON.stringify(prev));
                        const keys = path.split('.');
                        let current = newConfig;
                        for (let i = 0; i < keys.length; i++) {
                          current = current[keys[i]];
                        }
                        
                        // Create new key and delete old one
                        current[newKey] = current[key];
                        delete current[key];
                        
                        return newConfig;
                      });
                    }}
                    className="p-2 border border-gray-300 rounded text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span className="text-gray-500">→</span>
                  <span className="text-sm text-gray-700">
                    {nestedObject[key]?.length || 0} options
                  </span>
                </div>
                <button
                  onClick={() => {
                    setConfig(prev => {
                      const newConfig = JSON.parse(JSON.stringify(prev));
                      const keys = path.split('.');
                      let current = newConfig;
                      for (let i = 0; i < keys.length; i++) {
                        current = current[keys[i]];
                      }
                      delete current[key];
                      return newConfig;
                    });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              {/* Options for this paper type */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium text-gray-600">Options</h5>
                  <button
                    onClick={() => {
                      setConfig(prev => {
                        const newConfig = JSON.parse(JSON.stringify(prev));
                        const keys = path.split('.');
                        let current = newConfig;
                        for (let i = 0; i < keys.length; i++) {
                          current = current[keys[i]];
                        }
                        current[key].push({
                          value: `OPTION_${Date.now()}`,
                          label: 'New Option',
                          image: ''
                        });
                        return newConfig;
                      });
                    }}
                    className="flex items-center px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={12} className="mr-1" />
                    Add Option
                  </button>
                </div>
                
                <div className="space-y-2">
                  {nestedObject[key]?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-3 p-3 border border-gray-200 rounded bg-gray-50">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                          <input
                            type="text"
                            value={option.value}
                            onChange={(e) => {
                              setConfig(prev => {
                                const newConfig = JSON.parse(JSON.stringify(prev));
                                const keys = path.split('.');
                                let current = newConfig;
                                for (let i = 0; i < keys.length; i++) {
                                  current = current[keys[i]];
                                }
                                current[key][optionIndex].value = e.target.value;
                                return newConfig;
                              });
                            }}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                          <input
                            type="text"
                            value={option.label}
                            onChange={(e) => {
                              setConfig(prev => {
                                const newConfig = JSON.parse(JSON.stringify(prev));
                                const keys = path.split('.');
                                let current = newConfig;
                                for (let i = 0; i < keys.length; i++) {
                                  current = current[keys[i]];
                                }
                                current[key][optionIndex].label = e.target.value;
                                return newConfig;
                              });
                            }}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={option.image || ''}
                            onChange={(e) => {
                              setConfig(prev => {
                                const newConfig = JSON.parse(JSON.stringify(prev));
                                const keys = path.split('.');
                                let current = newConfig;
                                for (let i = 0; i < keys.length; i++) {
                                  current = current[keys[i]];
                                }
                                current[key][optionIndex].image = e.target.value;
                                return newConfig;
                              });
                            }}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setConfig(prev => {
                            const newConfig = JSON.parse(JSON.stringify(prev));
                            const keys = path.split('.');
                            let current = newConfig;
                            for (let i = 0; i < keys.length; i++) {
                              current = current[keys[i]];
                            }
                            current[key] = current[key].filter((_, i) => i !== optionIndex);
                            return newConfig;
                          });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render additional options section
  const renderAdditionalOptions = (type) => {
    const optionTypes = {
      'proof': { title: 'Proof Options', path: 'additionalOptions.proof', fields: ['value', 'label', 'price'] },
      'holePunch': { title: 'Hole Punch Options', path: 'additionalOptions.holePunch', fields: ['value', 'label', 'price'] },
      'slipcase': { title: 'Slipcase Options', path: 'additionalOptions.slipcase', fields: ['value', 'label', 'price'] },
      'shrinkWrap': { title: 'Shrink Wrap Options', path: 'additionalOptions.shrinkWrap', fields: ['value', 'label', 'price'] },
      'directMail': { title: 'Direct Mail Options', path: 'additionalOptions.directMail', fields: ['value', 'label', 'price'] }
    };

    const { title, path, fields } = optionTypes[type];
    
    return (
      <div className="space-y-4 mb-6">
        <h5 className="text-sm font-medium text-gray-700">{title}</h5>
        {renderEditableArray(title, path, fields)}
      </div>
    );
  };

  // Render paper options section
  const renderPaperOptions = (type) => {
    const paperTypes = {
      'cover': { title: 'Cover Paper Materials', path: 'paperOptions.cover', fields: ['value', 'label', 'description', 'price'] },
      'inside': { title: 'Inside Paper', path: 'paperOptions.inside', fields: ['value', 'label', 'description', 'price'] }
    };

    const { title, path, fields } = paperTypes[type];
    
    return (
      <div className="space-y-6">
        <h4 className="font-medium text-gray-700">{title}</h4>
        {renderEditableArray(title, path, fields)}
      </div>
    );
  };

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
                <input
                  type="text"
                  value={config.general?.title || ''}
                  onChange={(e) => updateNestedConfig('general.title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Form Description</label>
                <textarea
                  value={config.general?.description || ''}
                  onChange={(e) => updateNestedConfig('general.description', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
                  <input
                    type="text"
                    value={config.general?.submitButtonText || ''}
                    onChange={(e) => updateNestedConfig('general.submitButtonText', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Button Text</label>
                  <input
                    type="text"
                    value={config.general?.shippingButtonText || ''}
                    onChange={(e) => updateNestedConfig('general.shippingButtonText', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'binding':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Binding Options</h3>
            {renderEditableArray('Binding Edges', 'bindingEdges', ['value', 'label', 'desc', 'image'])}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Spine Width</label>
              <input
                type="text"
                value={config.spineWidth || ''}
                onChange={(e) => updateNestedConfig('spineWidth', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="e.g., 0.178&quot;"
              />
            </div>
          </>
        );

      case 'headband':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Headband Colors</h3>
            {renderEditableArray('Headband Colors', 'headbandColors', ['value', 'label', 'image'])}
          </>
        );

      case 'paper-cover':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Paper Materials</h3>
            {renderPaperOptions('cover')}
          </>
        );

      case 'paper-inside':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inside Paper Materials</h3>
            {renderPaperOptions('inside')}
          </>
        );

      case 'cover-paper-weights':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Paper Weight Options</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure paper weight/color options for each cover paper type
            </p>
            {renderNestedPaperWeightOptions('Cover Paper Weight Options', 'coverPaperWeightOptions')}
          </>
        );

      case 'inside-paper-weights':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Inside Paper Weight Options</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure paper weight options for interior pages based on paper type
            </p>
            {renderNestedPaperWeightOptions('Inside Paper Weight Options', 'insidePaperWeightOptions')}
          </>
        );

      case 'print-colors':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Print Color Options</h3>
            {renderEditableArray('Print Colors', 'printColors', ['value', 'label', 'price', 'image'])}
          </>
        );

      case 'cover-finishes':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Finish Options</h3>
            {renderEditableArray('Cover Finishes', 'coverFinishes', ['value', 'label', 'price'])}
          </>
        );

      case 'bookmark':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bookmark Options</h3>
            {renderEditableArray('Bookmark Options', 'bookmarkOptions', ['value', 'label'])}
          </>
        );

      case 'additional':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h3>
            <div className="space-y-6">
              {renderAdditionalOptions('proof')}
              {renderAdditionalOptions('holePunch')}
              {renderAdditionalOptions('slipcase')}
              {renderAdditionalOptions('shrinkWrap')}
              {renderAdditionalOptions('directMail')}
            </div>
          </>
        );

      case 'positions':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Positions</h3>
            {renderEditableArray('Card Positions', 'positions', ['value', 'label'])}
          </>
        );

      case 'page-counts':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Count Options</h3>
            {renderSimpleArray('Page Counts', 'pageCounts', 'Enter page count (must be divisible by 4)')}
          </>
        );

      case 'weights':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paper Weight Options</h3>
            {renderSimpleArray('Weight Options (gsm)', 'weightOptions', 'Enter weight in gsm')}
          </>
        );

      case 'quantities':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity Options</h3>
            {renderSimpleArray('Available Quantities', 'quantities', 'Enter quantity')}
          </>
        );

      case 'custom-size':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Size Instructions</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (INCH)</label>
                <input
                  type="text"
                  value={config.customSizeInstructions?.INCH || ''}
                  onChange={(e) => updateNestedConfig('customSizeInstructions.INCH', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions (MM)</label>
                <input
                  type="text"
                  value={config.customSizeInstructions?.MM || ''}
                  onChange={(e) => updateNestedConfig('customSizeInstructions.MM', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </>
        );

      case 'pricing':
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Setup Cost ($)</label>
                <input
                  type="number"
                  value={config.pricing?.baseSetupCost || 0}
                  onChange={(e) => updateNestedConfig('pricing.baseSetupCost', parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cost Per Page ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={config.pricing?.costPerPage || 0}
                  onChange={(e) => updateNestedConfig('pricing.costPerPage', parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Size Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.pricing?.customSizeMultiplier || 1}
                  onChange={(e) => updateNestedConfig('pricing.customSizeMultiplier', parseFloat(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Standard Size Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.pricing?.standardSizeMultiplier || 1}
                  onChange={(e) => updateNestedConfig('pricing.standardSizeMultiplier', parseFloat(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hardcover Base Cost ($)</label>
                <input
                  type="number"
                  value={config.pricing?.hardcoverBaseCost || 0}
                  onChange={(e) => updateNestedConfig('pricing.hardcoverBaseCost', parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dust Cover Base Cost ($)</label>
                <input
                  type="number"
                  value={config.pricing?.dustCoverBaseCost || 0}
                  onChange={(e) => updateNestedConfig('pricing.dustCoverBaseCost', parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dust Cover Per Copy Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={config.pricing?.dustCoverPerCopy || 0}
                  onChange={(e) => updateNestedConfig('pricing.dustCoverPerCopy', parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hardcover Quote Form Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Configure all options for hardcover book printing</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
              >
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 overflow-x-auto pb-2">
            {[
              { id: 'general', label: 'General', icon: <Settings size={14} /> },
              { id: 'binding', label: 'Binding', icon: <Package size={14} /> },
              { id: 'headband', label: 'Headband', icon: <Palette size={14} /> },
              { id: 'paper-cover', label: 'Cover Paper', icon: <FileText size={14} /> },
              { id: 'paper-inside', label: 'Inside Paper', icon: <FileText size={14} /> },
              { id: 'cover-paper-weights', label: 'Cover Weights', icon: <ImageIcon size={14} /> },
              { id: 'inside-paper-weights', label: 'Inside Weights', icon: <Layers size={14} /> },
              { id: 'print-colors', label: 'Print Colors', icon: <Droplets size={14} /> },
              { id: 'cover-finishes', label: 'Finishes', icon: <Shield size={14} /> },
              { id: 'bookmark', label: 'Bookmark', icon: <FileText size={14} /> },
              { id: 'additional', label: 'Services', icon: <Package size={14} /> },
              { id: 'positions', label: 'Positions', icon: <Layers size={14} /> },
              { id: 'page-counts', label: 'Page Counts', icon: <FileText size={14} /> },
              { id: 'weights', label: 'Weights', icon: <Package size={14} /> },
              { id: 'quantities', label: 'Quantities', icon: <Package size={14} /> },
              { id: 'custom-size', label: 'Custom Size', icon: <Ruler size={14} /> },
              { id: 'pricing', label: 'Pricing', icon: <Truck size={14} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {preview ? (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Hardcover form preview would be rendered here</p>
              <p className="text-sm text-gray-400 mt-2">
                The actual form component would be rendered using the current configuration
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                <h4 className="font-medium text-gray-900 mb-2">Current Configuration Summary:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cover Paper Types: {Object.keys(config.coverPaperWeightOptions || {}).length} types</li>
                  <li>• Headband Colors: {config.headbandColors?.length || 0} colors</li>
                  <li>• Print Colors: {config.printColors?.length || 0} options</li>
                  <li>• Page Counts: {config.pageCounts?.length || 0} options</li>
                  <li>• Quantities: {config.quantities?.length || 0} options</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
                <h3 className="font-semibold text-gray-900 mb-3">Form Sections</h3>
                <nav className="space-y-2">
                  {[
                    { id: 'general', label: 'General Settings', icon: <Settings size={14} /> },
                    { id: 'binding', label: 'Binding Options', icon: <Package size={14} /> },
                    { id: 'headband', label: 'Headband Colors', icon: <Palette size={14} /> },
                    { id: 'paper-cover', label: 'Cover Paper', icon: <FileText size={14} /> },
                    { id: 'paper-inside', label: 'Inside Paper', icon: <FileText size={14} /> },
                    { id: 'cover-paper-weights', label: 'Cover Paper Weights', icon: <ImageIcon size={14} /> },
                    { id: 'inside-paper-weights', label: 'Inside Paper Weights', icon: <Layers size={14} /> },
                    { id: 'print-colors', label: 'Print Colors', icon: <Droplets size={14} /> },
                    { id: 'cover-finishes', label: 'Cover Finishes', icon: <Shield size={14} /> },
                    { id: 'bookmark', label: 'Bookmark Options', icon: <FileText size={14} /> },
                    { id: 'additional', label: 'Additional Services', icon: <Package size={14} /> },
                    { id: 'positions', label: 'Card Positions', icon: <Layers size={14} /> },
                    { id: 'page-counts', label: 'Page Count Options', icon: <FileText size={14} /> },
                    { id: 'weights', label: 'Weight Options', icon: <Package size={14} /> },
                    { id: 'quantities', label: 'Quantity Options', icon: <Package size={14} /> },
                    { id: 'custom-size', label: 'Custom Size Instructions', icon: <Ruler size={14} /> },
                    { id: 'pricing', label: 'Pricing Settings', icon: <Truck size={14} /> },
                  ].map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === section.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.icon}
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <p className="font-medium mb-1">Configuration Stats:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Total Options:</span>
                        <span className="font-medium">
                          {(config.headbandColors?.length || 0) + 
                           (config.printColors?.length || 0) + 
                           (config.pageCounts?.length || 0) + 
                           (config.quantities?.length || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cover Types:</span>
                        <span className="font-medium">{Object.keys(config.coverPaperWeightOptions || {}).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Paper Options:</span>
                        <span className="font-medium">
                          {(config.paperOptions?.cover?.length || 0) + 
                           (config.paperOptions?.inside?.length || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Form Configuration</h4>
                  <p className="text-xs text-blue-700">
                    All form options can be edited in their respective tabs. Changes are saved when you click "Save Changes".
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-900 mb-1">Image URLs</h4>
                  <p className="text-xs text-green-700">
                    Image paths should be relative (e.g., /forms/hard/RD3.png). Ensure images exist at these paths.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-purple-900 mb-1">Default Values</h4>
                  <p className="text-xs text-purple-700">
                    To reset to defaults, refresh the page without saving. Use "Preview" to test the form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}