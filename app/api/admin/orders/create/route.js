// app/api/admin/orders/create/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    await dbConnect();
    
    const orderData = await request.json();
    
    console.log('📝 Creating order in database:', orderData);

    // Validate required fields
    if (!orderData.orderId || !orderData.customerEmail || !orderData.customerName) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'Order ID, customer email, and customer name are required'
        },
        { status: 400 }
      );
    }

    // Create new order in database
    const order = new Order({
      orderId: orderData.orderId,
      customerId: orderData.customerId,
      customerEmail: orderData.customerEmail,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone || '',
      customerAddress: orderData.customerAddress || {},
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      subtotal: orderData.subtotal || 0,
      taxAmount: orderData.taxAmount || 0,
      shippingAmount: orderData.shippingAmount || 0,
      total: orderData.total || 0,
      paymentMethod: orderData.paymentMethod || 'wire_transfer',
      paymentStatus: orderData.paymentStatus || 'pending',
      status: orderData.status || 'pending',
      notes: orderData.notes || '',
      requiresAction: true
    });

    const savedOrder = await order.save();
    
    console.log('✅ Order saved to database:', savedOrder._id);

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderId: savedOrder.orderId,
      order: savedOrder
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    
    // Check for duplicate order ID
    if (error.code === 11000 || error.message.includes('duplicate')) {
      return NextResponse.json(
        { 
          error: 'Duplicate order ID',
          message: 'An order with this ID already exists'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to save order to database',
        message: error.message,
        details: error.errors || {}
      },
      { status: 500 }
    );
  }
}