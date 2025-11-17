import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Debug API is working',
    timestamp: new Date().toISOString()
  });
}