export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import FormConfiguration from '@/models/FormConfiguration';

export async function GET() {
  try {
    await dbConnect();
    
    const config = await FormConfiguration.findOne({ name: 'wire-quote' }).lean();
    
    if (!config || !config.config) {
      return NextResponse.json({});
    }
    
    return NextResponse.json(config.config);
  } catch (error) {
    console.error('Error in public wire-quote API:', error);
    return NextResponse.json({});
  }
}