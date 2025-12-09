// app/api/test-stripe/route.js
import stripe from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test Stripe connection by listing charges (or customers)
    const charges = await stripe.charges.list({ limit: 1 });
    
    return NextResponse.json({
      success: true,
      message: 'Stripe connection successful',
      testKey: process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...',
      chargesCount: charges.data.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Check your Stripe secret key in .env.local'
    }, { status: 500 });
  }
}