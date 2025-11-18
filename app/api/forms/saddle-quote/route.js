// app/api/forms/saddle-quote/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FormConfiguration from '@/models/FormConfiguration';

export async function GET() {
  try {
    await dbConnect();
    
    const config = await FormConfiguration.findOne({ name: 'saddle-quote' }).lean();
    
    if (!config || !config.config) {
      return NextResponse.json({});
    }
    
    return NextResponse.json(config.config);
  } catch (error) {
    console.error('Error in public saddle-quote API:', error);
    return NextResponse.json({});
  }
}