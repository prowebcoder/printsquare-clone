export const dynamic = "force-dynamic";
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

    // Return mock session data (Stripe removed)
    const fakeSessionData = {
      id: sessionId,
      payment_status: "paid",
      customer_details: {
        email: "customer@example.com",
        name: "Mock Customer",
      },
      line_items: [
        {
          quantity: 1,
          description: "Mock Product",
          price: {
            unit_amount: 1000,
            currency: "usd",
          }
        }
      ],
      amount_total: 1000,
      currency: "usd",
      mock: true
    };

    return NextResponse.json(fakeSessionData);

  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
