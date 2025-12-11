// app/api/admin/forms/saddle-quote/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import FormConfiguration from '@/models/FormConfiguration';

export async function GET(request) {
  try {
    await dbConnect();
    
    const config = await FormConfiguration.findOne({ name: 'saddle-quote' }).lean();
    
    if (!config) {
      const defaultConfig = {
        name: 'saddle-quote',
        type: 'predefined',
        description: 'Saddle stitching quote calculator',
        config: getSaddleQuoteDefaultConfig(),
        status: 'published'
      };
      
      await FormConfiguration.create(defaultConfig);
      return NextResponse.json(defaultConfig.config);
    }
    
    return NextResponse.json(config.config || {});
  } catch (error) {
    console.error('Error fetching saddle-quote config:', error);
    return NextResponse.json(getSaddleQuoteDefaultConfig());
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const result = await FormConfiguration.findOneAndUpdate(
      { name: 'saddle-quote' },
      { 
        $set: {
          name: 'saddle-quote',
          type: 'predefined',
          description: 'Saddle stitching quote calculator',
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
      message: 'Saddle stitching configuration updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving saddle-quote config:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update saddle stitching form configuration',
      details: error.message
    }, { status: 500 });
  }
}

function getSaddleQuoteDefaultConfig() {
  return {
    general: {
      title: "Saddle Stitching Quote",
      description: "Configure your saddle stitched booklet with our professional printing services.",
      submitButtonText: "Add to Cart",
      shippingButtonText: "Calculate Shipping"
    },
    bindingTypes: [
      { value: 'PERFECT', label: 'Perfect Binding', link: '/perfect-binding' },
      { value: 'SADDLE', label: 'Saddle Stitching', link: '/saddle-stitching' },
      { value: 'HARDCOVER', label: 'Hardcover Book', link: '/hardcover-book' },
      { value: 'WIRE', label: 'Wire Binding', link: '/wire-binding' },
    ],
    sizes: ['5.5 x 8.5', '8.5 x 11', '11 x 17', 'Custom Size'],
    bindingEdges: [
      { value: 'LEFT', label: 'Left Side', desc: 'Binding on the left, most common' },
      { value: 'TOP', label: 'Top Side', desc: 'Binding on the top, a.k.a calendar binding' },
    ],
    paperOptions: {
      cover: [
        { value: 'MATTE', label: 'Matte', price: 0 },
        { value: 'GLOSS', label: 'Gloss', price: 0 },
        { value: 'HI-PLUS', label: 'Hi-Plus', price: 30 },
      ],
      inside: [
        { value: 'GLOSS', label: 'Gloss', price: 0 },
        { value: 'MATTE', label: 'Matte', price: 0 },
        { value: 'HI-PLUS', label: 'Hi-Plus', price: 20 },
        { value: 'UNCOATED', label: 'Uncoated', price: 0 },
      ]
    },
    printColors: [
      { value: 'CMYK', label: 'Full color', price: 0 },
      { value: 'BW', label: 'Black only', price: -50 },
    ],
    coverFinishes: [
      { value: 'MATTE', label: 'Matte lamination', price: 30 },
      { value: 'GLOSS', label: 'Gloss lamination', price: 30 },
      { value: 'NONE', label: 'None', price: 0 },
    ],
    additionalOptions: {
      proof: [
        { value: 'ONLINE', label: 'E-Proof (PDF proof, free)', price: 0 },
        { value: 'DIGITAL', label: 'Digital Proof', price: 30 },
      ],
      holePunch: [
        { value: '6', label: '0.236" (6mm) drill', price: 10 },
        { value: '8', label: '0.315" (8mm) drill', price: 15 },
      ],
      shrinkWrap: [
        { value: '1', label: '1 copy/wrapping', price: 0.10 },
        { value: '2', label: '2 copy/wrapping', price: 0.08 },
      ]
    },
    pageCounts: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64],
    weightOptions: ['80', '100', '120', '150'],
    quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    customSizeInstructions: "📏 Minimum: 3\" × 3\" | Maximum: 11\" × 17\"",
    pricing: {
      baseSetupCost: 100,
      costPerPage: 0.03,
      customSizeMultiplier: 1.1,
      standardSizeMultiplier: 1.0
    }
  };
}