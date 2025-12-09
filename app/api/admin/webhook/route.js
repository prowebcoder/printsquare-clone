// app/api/webhook/route.js
import stripe from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Handle successful payment
      await handleSuccessfulPayment(session);
      break;
    
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent.id);
      break;
    
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.log('PaymentIntent failed:', failedPaymentIntent.id);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session) {
  try {
    // Get line items from session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    
    // Create order in your database
    const orderData = {
      stripeSessionId: session.id,
      customerEmail: session.customer_email,
      customerName: session.metadata.customerName || '',
      shippingAddress: session.shipping_details || null,
      amountTotal: session.amount_total / 100,
      amountSubtotal: session.amount_subtotal / 100,
      shippingCost: session.shipping_cost?.amount_total ? session.shipping_cost.amount_total / 100 : 0,
      currency: session.currency,
      paymentStatus: session.payment_status,
      status: 'paid',
      items: lineItems.data.map(item => ({
        productName: item.description,
        quantity: item.quantity,
        price: item.price.unit_amount / 100,
        total: item.amount_total / 100
      })),
      metadata: session.metadata,
      createdAt: new Date().toISOString()
    };

    // Save order to database (you need to implement this)
    // await saveOrderToDatabase(orderData);
    
    // Save to localStorage for demo
    const existingOrders = JSON.parse(localStorage.getItem('printingOrders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('printingOrders', JSON.stringify(existingOrders));

    console.log('Order saved successfully:', orderData);

  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}