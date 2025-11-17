import { NextResponse } from 'next/server';

// Simple storage - will reset when server restarts
let formConfigStorage = {};

export async function GET() {
  try {
    console.log('✅ Public API: GET request received');
    console.log('📦 Current config keys:', Object.keys(formConfigStorage));
    return NextResponse.json(formConfigStorage);
  } catch (error) {
    console.error('❌ Error in public API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📝 Form submission received:', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: body 
    });
  } catch (error) {
    console.error('❌ Error submitting form:', error);
    return NextResponse.json({ 
      error: 'Failed to submit form',
      details: error.message 
    }, { status: 500 });
  }
}