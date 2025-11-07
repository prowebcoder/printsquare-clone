import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/mongodb';
import FormConfiguration from '../../../../../../models/FormConfiguration';
import { isAuthenticated } from '../../../../../../lib/auth';

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

export async function POST(request, { params }) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { formId } = await params; // Add await here
    
    await dbConnect();
    const formData = await request.json();
    
    const formConfig = await FormConfiguration.findOneAndUpdate(
      { formId },
      formData,
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, formConfig });
  } catch (error) {
    console.error('Error saving form configuration:', error);
    return NextResponse.json(
      { error: 'Failed to save form configuration' },
      { status: 500 }
    );
  }
}