// app/api/debug-config/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    const db = mongoose.connection.db;
    const configs = await db.collection('formconfigurations').find({}).toArray();
    
    await mongoose.connection.close();
    
    return NextResponse.json({
      success: true,
      totalConfigs: configs.length,
      configs: configs.map(c => ({
        name: c.name,
        title: c.config?.general?.title,
        hasConfig: !!c.config
      }))
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}