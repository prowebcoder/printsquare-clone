import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'customer_details'],
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}