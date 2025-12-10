import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import FormConfiguration from '@/models/FormConfiguration';

export async function GET(request) {
  try {
    await dbConnect();
    
    const config = await FormConfiguration.findOne({ name: 'print-quote' }).lean();
    
    if (!config) {
      const defaultConfig = {
        name: 'print-quote',
        type: 'predefined',
        description: 'Perfect binding book printing quote calculator',
        config: getPrintQuoteDefaultConfig(),
        status: 'published'
      };
      
      await FormConfiguration.create(defaultConfig);
      return NextResponse.json(defaultConfig.config);
    }
    
    return NextResponse.json(config.config || {});
  } catch (error) {
    console.error('Error fetching print-quote config:', error);
    return NextResponse.json(getPrintQuoteDefaultConfig());
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const result = await FormConfiguration.findOneAndUpdate(
      { name: 'print-quote' },
      { 
        $set: {
          name: 'print-quote',
          type: 'predefined',
          description: 'Perfect binding book printing quote calculator',
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
      message: 'Perfect binding configuration updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving print-quote config:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update perfect binding form configuration',
      details: error.message
    }, { status: 500 });
  }
}

function getPrintQuoteDefaultConfig() {
  return {
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
}