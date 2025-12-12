// app/api/orders/create/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const {
      orderId,
      customerId,
      customerName,
      customerEmail,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentTransactionId
    } = body;

    // Validate required fields
    if (!orderId || !customerId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if order already exists
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return NextResponse.json(
        { error: 'Order already exists' },
        { status: 400 }
      );
    }

    // Create new order
    const order = new Order({
      orderId,
      customerId,
      customerName,
      customerEmail,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentTransactionId,
      paymentStatus: 'paid',
      status: 'processing'
    });

    await order.save();

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}