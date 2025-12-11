// app/api/admin/forms/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import FormConfiguration from '@/models/FormConfiguration';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get all forms (both predefined and custom)
    const forms = await FormConfiguration.find({})
      .select('name type description status submissions createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    // Return empty array instead of error
    return NextResponse.json([]);
  }
}