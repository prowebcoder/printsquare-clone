import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FormConfiguration from '@/models/FormConfiguration';

export async function GET(request, { params }) {
  try {
    const { formId } = await params; // Add await here
    
    await dbConnect();
    
    const formConfig = await FormConfiguration.findOne({ formId });
    
    if (!formConfig) {
      return NextResponse.json(
        { error: 'Form configuration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ formConfig });
  } catch (error) {
    console.error('Error fetching form configuration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form configuration' },
      { status: 500 }
    );
  }
}