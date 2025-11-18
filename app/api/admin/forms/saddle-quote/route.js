// app/api/admin/forms/print-quote/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Define schema inline to avoid model conflicts
const formConfigSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['predefined', 'custom'], default: 'custom' },
  description: String,
  config: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  submissions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Get or create model
let FormConfiguration;
try {
  FormConfiguration = mongoose.model('FormConfiguration');
} catch {
  FormConfiguration = mongoose.model('FormConfiguration', formConfigSchema);
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  
  await mongoose.connect(MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}

export async function GET(request) {
  try {
    await connectDB();
    
    const config = await FormConfiguration.findOne({ name: 'print-quote' }).lean();
    
    if (!config) {
      return NextResponse.json({});
    }
    
    return NextResponse.json(config.config || {});
  } catch (error) {
    console.error('Error fetching print-quote config:', error);
    return NextResponse.json({});
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const result = await FormConfiguration.updateOne(
      { name: 'print-quote' },
      { 
        $set: {
          name: 'print-quote',
          type: 'predefined',
          description: 'Book printing quote calculator with pricing options',
          config: body,
          status: 'published',
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    
    console.log('Update result:', result);
    
    return NextResponse.json({ 
      success: true,
      message: 'Configuration updated successfully'
    });
  } catch (error) {
    console.error('Error saving print-quote config:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update form configuration',
      details: error.message
    }, { status: 500 });
  }
}