// app/api/checkout/route.js
import stripe from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, total, customerEmail, customerName, shippingAddress } = body;

    // Format line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productName,
          description: `Size: ${item.summary?.size}, Pages: ${item.summary?.pages}, Type: ${item.type}`,
          metadata: {
            productType: item.type,
            configuration: JSON.stringify(item.configuration),
            summary: JSON.stringify(item.summary)
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Calculate total amount in cents
    const totalAmount = Math.round(total * 100);
    
    // Add tax if needed (8%)
    const taxAmount = Math.round(total * 0.08 * 100);
    const finalAmount = totalAmount + taxAmount;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      customer_email: customerEmail,
      metadata: {
        customerName: customerName || '',
        shippingAddress: shippingAddress || '',
        itemsCount: items.length.toString(),
        totalAmount: total.toString()
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 10,
              },
              maximum: {
                unit: 'business_day',
                value: 15,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500, // $15.00
              currency: 'usd',
            },
            display_name: 'Express shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
      payment_intent_data: {
        description: `Printing order - ${items.length} item(s)`,
        metadata: {
          order_type: 'printing',
          items: JSON.stringify(items.map(item => ({
            name: item.productName,
            type: item.type,
            quantity: item.quantity,
            price: item.price
          })))
        }
      }
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}