// components/pages/quote/hardcover/HardQuoteForm.js
'use client';
import { useState, useCallback, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageEditModal from './PageEditModal';
import ImagePreviewModal from '@/components/modals/ImagePreviewModal';

// ===== ENHANCED DEFAULT CONFIG WITH IMAGES =====
const HARDQUOTE_DEFAULT_CONFIG = {
  general: {
    title: "Hardcover Book Printing Quote",
    description: "Configure your perfect hardcover book with our professional printing services. Get instant pricing and add to cart in minutes.",
    submitButtonText: "Add to Cart",
    shippingButtonText: "Calculate Shipping"
  },
  
  bindingEdges: [
    { 
      value: 'SQUARE', 
      label: 'Square Spine', 
      desc: 'Standard square spine',
      image: '/forms/hard/book_option01.png'
    },
    { 
      value: 'ROUNDED', 
      label: 'Rounded Spine', 
      desc: 'Premium rounded spine',
      image: '/forms/hard/book_option02.png'
    },
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
        description: 'Glossy finish, vibrant printing',
        price: 0
      },
      { 
        value: 'MATTE', 
        label: 'Matte', 
        description: 'Matte finish, reduces glare',
        price: 0
      },
      { 
        value: 'HI-PLUS', 
        label: 'Hi-Plus', 
        description: 'Premium heavy-weight paper',
        price: 25
      },
      { 
        value: 'HI-QMATTE', 
        label: 'Hi-Q Matte', 
        description: 'High quality matte finish',
        price: 50
      },
      { 
        value: 'HIUNCOATED', 
        label: 'Hi Uncoated', 
        description: 'Uncoated heavy paper',
        price: 0
      },
      { 
        value: 'HIPREMIUM', 
        label: 'Hi Premium', 
        description: 'Premium grade paper',
        price: 75
      },
      { 
        value: 'HINEWPLUS', 
        label: 'Hi New Plus', 
        description: 'New premium paper',
        price: 20
      },
      { 
        value: 'TEXTBOOK', 
        label: 'Textbook', 
        description: 'Textbook grade paper',
        price: 30
      },
      { 
        value: 'TRANSLUCENT', 
        label: 'Translucent', 
        description: 'Translucent paper option',
        price: 80
      },
      { 
        value: 'COLORED', 
        label: 'Colored', 
        description: 'Colored interior paper',
        price: 40
      }
    ]
  },
  
  // COVER PAPER WEIGHT OPTIONS
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
  
  // INSIDE PAPER WEIGHT OPTIONS
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
    
    setTimeout(() => {
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
      
      if (country !== 'US') {
        calculatedCost *= 1.8;
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
              <div className="font-medium">{formData.quantity} hardcover books</div>
              <div className="text-gray-600">Pages:</div>
              <div className="font-medium">{formData.pageCount} pages</div>
              <div className="text-gray-600">Size:</div>
              <div className="font-medium">{formData.selectedSize}</div>
              <div className="text-gray-600">Weight:</div>
              <div className="font-medium">~{(formData.quantity * 0.3 + formData.pageCount * 0.015).toFixed(1)} kg</div>
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
                  Note: Hardcover books require special packaging and handling.
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
  showPrice = false,
  onImageClick = null
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
            {showDescription && selectedOption?.description && (
              <span className="text-xs text-gray-500 block mt-1">
                {selectedOption.description}
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
                      {option.description && (
                        <p className="text-xs text-gray-500 mt-1">{option.description}</p>
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

// ===== GROUPED IMAGE DROPDOWN =====
const GroupedImageDropdown = ({ 
  label, 
  groups, 
  selected, 
  onChange, 
  className = "", 
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  let selectedOption = null;
  let selectedGroupLabel = '';
  
  for (const group of groups) {
    const option = group.options.find(opt => opt.value === selected);
    if (option) {
      selectedOption = option;
      selectedGroupLabel = group.label;
      break;
    }
  }

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
            {selectedGroupLabel && (
              <span className="text-xs text-gray-500 block mt-1">
                {selectedGroupLabel}
              </span>
            )}
          </div>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="py-1">
            {groups.map((group) => (
              <div key={group.label} className="border-b border-gray-100 last:border-b-0">
                <div className="px-4 py-2 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    {group.label}
                  </p>
                </div>
                <div className="py-1">
                  {group.options.map((option) => (
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
                        <p className="text-sm font-medium text-gray-900">{option.label}</p>
                        {option.desc && (
                          <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
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

// ===== PAPER WEIGHT SELECTOR =====
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
      {label && <p className="text-sm font-semibold mb-2 text-gray-700">{label}</p>}
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
  const { addToCart } = useCart();
  const router = useRouter();

  const [formConfig, setFormConfig] = useState(HARDQUOTE_DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [configVersion, setConfigVersion] = useState(0);

  const [sizeUnit, setSizeUnit] = useState('INCH');
  const [paperUnit, setPaperUnit] = useState('US');
  const [selectedSize, setSelectedSize] = useState('6x9');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [spineType, setSpineType] = useState('SQUARE');
  
  const [headbandColor, setHeadbandColor] = useState('');
  const [bookmark, setBookmark] = useState('');
  
  const [coverPaper, setCoverPaper] = useState('MATTE');
  const [coverWeight, setCoverWeight] = useState('');
  const [coverColor, setCoverColor] = useState('CMYK');
  const [coverPaperOption, setCoverPaperOption] = useState('');
  
  const [pageCount, setPageCount] = useState(96);
  const [insidePaper, setInsidePaper] = useState('MATTE');
  const [insideWeight, setInsideWeight] = useState('');
  const [insideColor, setInsideColor] = useState('CMYK');
  const [insidePaperOption, setInsidePaperOption] = useState('');
  
  const [dustCover, setDustCover] = useState(null);
  const [pageEdits, setPageEdits] = useState([]);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showPageEditModal, setShowPageEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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

  // Get cover paper weight options based on selected type
  const getCoverPaperOptions = () => {
    const paperType = coverPaper.toUpperCase();
    return formConfig.coverPaperWeightOptions?.[paperType] || [];
  };

  // Get inside paper weight options based on selected type
  const getInsidePaperOptions = () => {
    const paperType = insidePaper.toUpperCase();
    return formConfig.insidePaperWeightOptions?.[paperType] || [];
  };

  // Handle cover paper type change
  const handleCoverPaperChange = (e) => {
    setCoverPaper(e.target.value);
    setCoverPaperOption('');
  };

  // Handle inside paper type change
  const handleInsidePaperChange = (e) => {
    setInsidePaper(e.target.value);
    setInsidePaperOption('');
  };

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

  // Calculate page edits cost
  const pageEditsCost = calculatePageEditsCost(pageEdits, PAPER_OPTIONS, PRINT_COLORS);

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

  // Page Edits Management
  const handlePageEditsSave = (edits) => {
    console.log('Page edits saved:', edits);
    setPageEdits(edits);
    alert(`${edits.length} page edit${edits.length !== 1 ? 's' : ''} saved successfully!`);
  };

  // Price Calculation
  const calculatePricing = useCallback(() => {
    const baseCostPerPage = formConfig?.pricing?.costPerPage || 0.08;
    const baseSetupCost = formConfig?.pricing?.baseSetupCost || 300;
    const hardcoverBaseCost = formConfig?.pricing?.hardcoverBaseCost || 150;
    const customSizeMultiplier = formConfig?.pricing?.customSizeMultiplier || 1.3;
    const standardSizeMultiplier = formConfig?.pricing?.standardSizeMultiplier || 1.2;
    const dustCoverBaseCost = formConfig?.pricing?.dustCoverBaseCost || 100;
    const dustCoverPerCopy = formConfig?.pricing?.dustCoverPerCopy || 0.25;
    
    let basePrintCost = baseSetupCost + hardcoverBaseCost + (pageCount * baseCostPerPage * quantity);
    
    if (isCustomSize) {
      basePrintCost *= customSizeMultiplier;
    } else if (selectedSize !== '6x9') {
      basePrintCost *= standardSizeMultiplier;
    }
    
    const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
    const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
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
    const pageEditsCost = calculatePageEditsCost(pageEdits, PAPER_OPTIONS, PRINT_COLORS);

    const colorCost = coverColorCost + insideColorCost;
    const paperCost = coverPaperCost + insidePaperCost;
    const additionalServicesCost = proofCost + holePunchCost + dustCoverCost + slipcaseCost + shrinkWrapCost + directMailCost + pageEditsCost;

    const totalAmount = basePrintCost + paperCost + colorCost + additionalServicesCost;

    return {
      basePrinting: basePrintCost,
      paper: paperCost,
      color: colorCost,
      proof: proofCost,
      holePunching: holePunchCost,
      dustCover: dustCoverCost,
      slipcase: slipcaseCost,
      shrinkWrapping: shrinkWrapCost,
      directMailing: directMailCost,
      pageEdits: pageEditsCost,
      total: totalAmount,
    };
  }, [
    pageCount, quantity, selectedSize, isCustomSize, coverPaper, insidePaper, coverColor, insideColor, 
    proof, holePunching, dustCover, slipcase, shrinkWrapping, directMailing, pageEdits, formConfig
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
      
      const coverPaperCost = getOptionPrice(PAPER_OPTIONS.cover, coverPaper);
      const insidePaperCost = getOptionPrice(PAPER_OPTIONS.inside, insidePaper);
      const coverColorCost = getOptionPrice(PRINT_COLORS, coverColor);
      const insideColorCost = getOptionPrice(PRINT_COLORS, insideColor);
      const proofCost = getOptionPrice(ADDITIONAL_OPTIONS.proof, proof);
      const slipcaseCost = getOptionPrice(ADDITIONAL_OPTIONS.slipcase, slipcase);
      const pageEditsCost = calculatePageEditsCost(pageEdits, PAPER_OPTIONS, PRINT_COLORS);
      
      const additionalCosts = coverPaperCost + insidePaperCost + coverColorCost + insideColorCost + proofCost + slipcaseCost + pageEditsCost;
      
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
  }, [pageCount, selectedSize, isCustomSize, coverPaper, insidePaper, coverColor, insideColor, proof, slipcase, pageEdits, formConfig]);

  // Handle Add to Cart function
  const handleAddToCart = () => {
    const formData = {
      sizeUnit, 
      paperUnit, 
      selectedSize,
      customSize: isCustomSize ? { width: customWidth, height: customHeight } : null,
      spineType, 
      spineWidth,
      headband: { color: headbandColor, bookmark },
      cover: { 
        paper: coverPaper, 
        weight: coverWeight, 
        color: coverColor,
        paperOption: coverPaperOption 
      },
      inside: { 
        pageCount, 
        paper: insidePaper, 
        weight: insideWeight, 
        color: insideColor,
        paperOption: insidePaperOption,
        pageEdits
      },
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
        quantity: quantity,
        pageEditsCount: pageEdits.length
      }
    };
    
    addToCart(cartItem);
    router.push('/cart');
  };

  // Handle image preview
  const handleImagePreview = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
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
      <ImagePreviewModal
        isOpen={showImageModal}
        imageUrl={selectedImage}
        onClose={() => setShowImageModal(false)}
      />
      
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
                
                {/* Spine Type with Image Dropdown */}
                <ImageDropdown
                  label="Spine Type"
                  options={BINDING_EDGES}
                  selected={spineType}
                  onChange={(e) => setSpineType(e.target.value)}
                  showDescription={true}
                  className="mb-4"
                />
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Spine Width:</span> {spineWidth}
                  </p>
                </div>

                {/* Headband Color with Image Dropdown */}
                <div className="mt-4">
                  <ImageDropdown
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
                {/* Cover Paper Type with Price */}
                <ImageDropdown 
                  label="Paper Type" 
                  options={PAPER_OPTIONS.cover} 
                  selected={coverPaper} 
                  onChange={handleCoverPaperChange}
                  showDescription={true}
                  showPrice={true}
                />
                
                {/* Cover Paper Option - Conditional based on selected type */}
                {getCoverPaperOptions().length > 0 ? (
                  <ImageDropdown
                    label={coverPaper === 'GLOSS' || coverPaper === 'MATTE' ? 'Weight' : 'Color/Type'}
                    options={getCoverPaperOptions()}
                    selected={coverPaperOption}
                    onChange={(e) => setCoverPaperOption(e.target.value)}
                  />
                ) : (
                  <PaperWeightSelector
                    paperUnit={paperUnit}
                    label='Weight'
                    weightValue={coverWeight}
                    onChange={(e) => setCoverWeight(e.target.value)}
                    options={WEIGHT_OPTIONS}
                  />
                )}
                
                {/* Print Color with Image Dropdown */}
                <ImageDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS} 
                  selected={coverColor} 
                  onChange={(e) => setCoverColor(e.target.value)}
                  showPrice={true}
                />
              </div>

              {/* Cover Paper Option Preview */}
              {coverPaperOption && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700">Selected {coverPaper === 'GLOSS' || coverPaper === 'MATTE' ? 'Weight' : 'Color'}:</p>
                    <button
                      onClick={() => {
                        const selectedOption = getCoverPaperOptions().find(opt => opt.value === coverPaperOption);
                        if (selectedOption?.image) {
                          handleImagePreview(selectedOption.image);
                        }
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Full Image
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getCoverPaperOptions().find(opt => opt.value === coverPaperOption)?.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-300">
                        <img 
                          src={getCoverPaperOptions().find(opt => opt.value === coverPaperOption)?.image} 
                          alt={coverPaperOption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{coverPaperOption}</p>
                      <p className="text-sm text-gray-600">{coverPaper}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button className="px-6 cursor-pointer py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  + Additional Add-ons
                </button>
                {!dustCover ? (
                  <button 
                    onClick={addDustCover}
                    className="px-6 cursor-pointer py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                <SelectDropdown
                  label="Page Count"
                  options={PAGE_COUNTS.map(c => ({ value: c, label: `${c} pages` }))}
                  selected={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                />
                
                {/* Inside Paper Type with Price */}
                <ImageDropdown 
                  label="Paper Type" 
                  options={PAPER_OPTIONS.inside} 
                  selected={insidePaper} 
                  onChange={handleInsidePaperChange}
                  showDescription={true}
                  showPrice={true}
                />
                
                {/* Inside Paper Weight/Option - Conditional */}
                {getInsidePaperOptions().length > 0 ? (
                  <ImageDropdown
                    label={insidePaper === 'COLORED' ? 'Paper Color' : 'Paper Weight'}
                    options={getInsidePaperOptions()}
                    selected={insidePaperOption}
                    onChange={(e) => setInsidePaperOption(e.target.value)}
                  />
                ) : (
                  <PaperWeightSelector
                    paperUnit={paperUnit}
                    label='Weight'
                    weightValue={insideWeight}
                    onChange={(e) => setInsideWeight(e.target.value)}
                    options={WEIGHT_OPTIONS}
                  />
                )}
              </div>

              {/* Inside Paper Option Preview */}
              {insidePaperOption && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700">Selected {insidePaper === 'COLORED' ? 'Paper Color' : 'Paper Weight'}:</p>
                    <button
                      onClick={() => {
                        const selectedOption = getInsidePaperOptions().find(opt => opt.value === insidePaperOption);
                        if (selectedOption?.image) {
                          handleImagePreview(selectedOption.image);
                        }
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Full Image
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getInsidePaperOptions().find(opt => opt.value === insidePaperOption)?.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-300">
                        <img 
                          src={getInsidePaperOptions().find(opt => opt.value === insidePaperOption)?.image} 
                          alt={insidePaperOption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{insidePaperOption}</p>
                      <p className="text-sm text-gray-600">{insidePaper === 'COLORED' ? 'Colored Paper' : insidePaper}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <ImageDropdown 
                  label="Print Color" 
                  options={PRINT_COLORS.filter(opt => opt.value !== 'NOCOLOR')} 
                  selected={insideColor} 
                  onChange={(e) => setInsideColor(e.target.value)}
                  showPrice={true}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
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
                <Link href="/api/upload?file=Hardcover_Book_Layout_Guide-1765781169239.zip">
                  <button className="px-6 cursor-pointer py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Download Guide
                  </button>
                </Link>
              </div>

              {/* Page Edits Summary */}
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
                    { label: 'Paper Options', value: prices.paper, show: prices.paper > 0 },
                    { label: 'Color Options', value: prices.color, show: prices.color > 0 },
                    { label: 'Digital Proof', value: prices.proof, show: prices.proof > 0 },
                    { label: 'Hole Punching', value: prices.holePunching, show: prices.holePunching > 0 },
                    { label: 'Dust Cover', value: prices.dustCover, show: prices.dustCover > 0 },
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

                {/* Page Edits Detailed Breakdown */}
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

              {/* Action Buttons */}
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

export default HardQuoteForm;