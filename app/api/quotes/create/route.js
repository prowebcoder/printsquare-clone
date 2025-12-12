// app/api/quotes/create/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomQuote from '@/models/CustomQuote';

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const {
      quoteId,
      customer_id,
      customer_name,
      customer_email,
      project_name,
      binding,
      custom_width,
      custom_height,
      page_in,
      quantity,
      country,
      zipcode,
      quote_desc
    } = body;

    // Validate required fields
    if (!quoteId || !customer_id || !project_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if quote already exists
    const existingQuote = await CustomQuote.findOne({ quoteId });
    if (existingQuote) {
      return NextResponse.json(
        { error: 'Quote already exists' },
        { status: 400 }
      );
    }

    // Create new quote
    const quote = new CustomQuote({
      quoteId,
      customerId: customer_id,
      customerName: customer_name,
      customerEmail: customer_email,
      projectName: project_name,
      binding,
      dimensions: {
        width: custom_width,
        height: custom_height
      },
      pageCount: page_in,
      quantity,
      country,
      zipCode: zipcode,
      description: quote_desc,
      status: 'pending'
    });

    await quote.save();

    return NextResponse.json({
      success: true,
      quoteId: quote.quoteId,
      message: 'Custom quote request saved successfully'
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote request' },
      { status: 500 }
    );
  }
}