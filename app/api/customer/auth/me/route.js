export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Customer from '@/models/Customer';
import { verifyCustomerToken } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    
    const token = request.cookies.get('customerToken')?.value;
    
    if (!token) {
      return NextResponse.json({ customer: null }, { status: 200 });
    }

    const decoded = verifyCustomerToken(token);
    if (!decoded) {
      return NextResponse.json({ customer: null }, { status: 200 });
    }

    const customer = await Customer.findById(decoded.id).select('-password');
    if (!customer) {
      return NextResponse.json({ customer: null }, { status: 200 });
    }

    return NextResponse.json({
      customer: {
        id: customer._id,
        email: customer.email,
        name: customer.name,
        recommender: customer.recommender
      }
    });

  } catch (error) {
    console.error('Get customer error:', error);
    return NextResponse.json({ customer: null }, { status: 200 });
  }
}