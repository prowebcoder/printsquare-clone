import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FormConfiguration from '@/models/FormConfiguration';

export async function GET(request) {
  try {
    await dbConnect();
    
    const config = await FormConfiguration.findOne({ name: 'wire-quote' }).lean();
    
    if (!config) {
      const defaultConfig = {
        name: 'wire-quote',
        type: 'predefined',
        description: 'Wire binding quote calculator',
        config: getWireQuoteDefaultConfig(),
        status: 'published'
      };
      
      await FormConfiguration.create(defaultConfig);
      return NextResponse.json(defaultConfig.config);
    }
    
    return NextResponse.json(config.config || {});
  } catch (error) {
    console.error('Error fetching wire-quote config:', error);
    return NextResponse.json(getWireQuoteDefaultConfig());
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const result = await FormConfiguration.findOneAndUpdate(
      { name: 'wire-quote' },
      { 
        $set: {
          name: 'wire-quote',
          type: 'predefined',
          description: 'Wire binding quote calculator',
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
      message: 'Wire binding configuration updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving wire-quote config:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update wire binding form configuration',
      details: error.message
    }, { status: 500 });
  }
}

function getWireQuoteDefaultConfig() {
  return {
    general: {
      title: "Wire Binding Quote",
      description: "Configure your wire bound document with our professional printing services.",
      submitButtonText: "Add to Cart",
      shippingButtonText: "Calculate Shipping"
    },
    bindingTypes: [
      { value: 'PERFECT', label: 'Perfect Binding', link: '/perfect-binding' },
      { value: 'SADDLE', label: 'Saddle Stitching', link: '/saddle-stitching' },
      { value: 'HARDCOVER', label: 'Hardcover Book', link: '/hardcover-book' },
      { value: 'WIRE', label: 'Wire Binding', link: '/wire-binding' },
    ],
    sizes: ['8.5 x 11', '9 x 12', '11 x 17', 'Custom Size'],
    bindingOptions: [
      { value: 'WIRE_19', label: '19-loop Wire', price: 0 },
      { value: 'WIRE_21', label: '21-loop Wire', price: 10 },
      { value: 'WIRE_23', label: '23-loop Wire', price: 15 },
    ],
    paperOptions: {
      cover: [
        { value: 'MATTE', label: 'Matte', price: 0 },
        { value: 'GLOSS', label: 'Gloss', price: 0 },
        { value: 'CLEAR', label: 'Clear Plastic', price: 25 },
      ],
      inside: [
        { value: 'GLOSS', label: 'Gloss', price: 0 },
        { value: 'MATTE', label: 'Matte', price: 0 },
        { value: 'UNCOATED', label: 'Uncoated', price: 0 },
      ]
    },
    printColors: [
      { value: 'CMYK', label: 'Full color', price: 0 },
      { value: 'BW', label: 'Black only', price: -40 },
    ],
    coverFinishes: [
      { value: 'MATTE', label: 'Matte lamination', price: 25 },
      { value: 'GLOSS', label: 'Gloss lamination', price: 25 },
      { value: 'NONE', label: 'None', price: 0 },
    ],
    additionalOptions: {
      proof: [
        { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0 },
        { value: 'DIGITAL', label: 'Digital Proof', price: 25 },
      ],
      holePunch: [
        { value: 'STANDARD', label: 'Standard punching', price: 0 },
        { value: 'SPECIAL', label: 'Special pattern', price: 20 },
      ]
    },
    pageCounts: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
    weightOptions: ['80', '100', '120', '150'],
    quantities: [25, 50, 100, 200, 300, 400, 500],
    customSizeInstructions: "📏 Minimum: 5\" × 8\" | Maximum: 11\" × 17\"",
    pricing: {
      baseSetupCost: 75,
      costPerPage: 0.02,
      customSizeMultiplier: 1.15,
      standardSizeMultiplier: 1.0
    }
  };
}