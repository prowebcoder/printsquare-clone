// app/api/orders/simple/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req) {
  try {
    await dbConnect();
    console.log('✅ Database connected');
    
    const data = await req.json();
    console.log('📥 Received order data:', JSON.stringify(data, null, 2));

    // Generate order ID if not provided
    if (!data.orderId) {
      data.orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    // Set payment status based on method
    const paymentStatus = data.paymentMethod === 'wire_transfer' ? 'pending' : 'pending';
    const status = 'pending';

    // Create the order with minimal required fields first
    const orderData = {
      orderId: data.orderId,
      customerId: data.customerId || 'guest-' + Date.now(),
      customerEmail: data.customerEmail || 'no-email@example.com',
      customerName: data.customerName || 'Guest Customer',
      customerPhone: data.customerPhone || '',
      customerAddress: data.customerAddress || {},
      items: Array.isArray(data.items) ? data.items : [],
      totalAmount: Number(data.totalAmount) || 0,
      subtotal: Number(data.subtotal) || 0,
      taxAmount: Number(data.taxAmount) || 0,
      shippingAmount: Number(data.shippingAmount) || 0,
      total: Number(data.total) || 0,
      paymentMethod: data.paymentMethod || 'wire_transfer',
      paymentStatus: paymentStatus,
      status: status,
      requiresAction: data.paymentMethod === 'wire_transfer'
    };

    console.log('📝 Creating order with data:', orderData);

    // Create order
    const order = await Order.create(orderData);
    
    console.log('✅ Order created successfully:', order._id);

    return NextResponse.json({ 
      success: true, 
      order: order,
      orderId: order.orderId,
      message: 'Order created successfully'
    });
  } catch (err) {
    console.error('❌ ORDER API ERROR DETAILS:', err);
    console.error('❌ Error name:', err.name);
    console.error('❌ Error message:', err.message);
    console.error('❌ Error code:', err.code);
    console.error('❌ Error stack:', err.stack);
    
    if (err.name === 'ValidationError') {
      const errors = {};
      for (let field in err.errors) {
        errors[field] = {
          message: err.errors[field].message,
          value: err.errors[field].value,
          kind: err.errors[field].kind
        };
      }
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: errors,
          message: 'Please check all required fields are provided'
        },
        { status: 400 }
      );
    }
    
    if (err.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Duplicate order ID',
          message: 'An order with this ID already exists. Please try again.' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: err.message,
        message: 'Failed to create order. Please try again.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ 
      success: true, 
      orders: orders,
      count: orders.length
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}