// app/api/admin/forms/print-quote/route.js
import { NextResponse } from 'next/server';

// Simple in-memory storage for testing
let formConfigStorage = {};

// Simple token verification (replace with your actual auth logic)
function verifyToken(token) {
  // For development, accept any token or no token
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // For production, implement proper token verification
  return token === 'your-secret-token'; // Replace with actual verification
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('GET /api/admin/forms/print-quote - Config keys:', Object.keys(formConfigStorage));
    return NextResponse.json(formConfigStorage);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch form configuration' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    formConfigStorage = body;
    
    console.log('PUT /api/admin/forms/print-quote - Saved config');
    console.log('Config structure:', {
      general: body.general ? 'Exists' : 'Missing',
      bindingTypes: body.bindingTypes?.length || 0,
      sizes: body.sizes?.length || 0,
      // Add more fields as needed
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Configuration updated successfully', 
      config: formConfigStorage 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update form configuration',
      details: error.message
    }, { status: 500 });
  }
}