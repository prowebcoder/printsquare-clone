import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FormConfiguration from '@/models/FormConfiguration';

export async function GET(request) {
  try {
    await dbConnect();
    
    const config = await FormConfiguration.findOne({ name: 'hard-quote' }).lean();
    
    if (!config) {
      const defaultConfig = {
        name: 'hard-quote',
        type: 'predefined',
        description: 'Hardcover book printing quote calculator',
        config: getHardQuoteDefaultConfig(),
        status: 'published'
      };
      
      await FormConfiguration.create(defaultConfig);
      return NextResponse.json(defaultConfig.config);
    }
    
    return NextResponse.json(config.config || {});
  } catch (error) {
    console.error('Error fetching hard-quote config:', error);
    return NextResponse.json(getHardQuoteDefaultConfig());
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const result = await FormConfiguration.findOneAndUpdate(
      { name: 'hard-quote' },
      { 
        $set: {
          name: 'hard-quote',
          type: 'predefined',
          description: 'Hardcover book printing quote calculator',
          config: body,
          status: 'published',
          updatedAt: new Date()
        }
      },
      { 
        upsert: true,
        new: true,
        runValidators: true 
      }
    );
    
    return NextResponse.json({ 
      success: true,
      message: 'Hardcover quote configuration updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving hard-quote config:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update hardcover form configuration',
      details: error.message
    }, { status: 500 });
  }
}

function getHardQuoteDefaultConfig() {
  return {
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
}