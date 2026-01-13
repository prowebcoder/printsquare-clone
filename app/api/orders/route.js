// app/api/orders/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    console.log('📥 Received order data:', data);
    
    // Generate order ID if not provided
    if (!data.orderId) {
      data.orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    // Set payment status based on method
    let paymentStatus = 'pending';
    let status = 'pending';
    
    if (data.paymentMethod === 'paypal') {
      paymentStatus = 'pending'; // PayPal will update this when payment completes
    }
    
    // Ensure items is an array
    let items = data.items || [];
    if (typeof items === 'string') {
      try {
        items = JSON.parse(items);
      } catch (e) {
        console.warn('Could not parse items string:', e);
        items = [];
      }
    }
    
    if (!Array.isArray(items)) {
      items = [];
    }

    // Create the order
    const order = await Order.create({
      orderId: data.orderId,
      customerId: data.customerId || 'guest',
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      customerPhone: data.customerPhone || '',
      customerAddress: data.customerAddress || {},
      items: items.map(item => ({
        productName: item.productName || 'Printing Product',
        type: item.type || 'perfect-binding',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        total: Number(item.total) || (Number(item.price) || 0) * (Number(item.quantity) || 1),
        summary: item.summary || {},
        configuration: item.configuration || {}
      })),
      totalAmount: Number(data.totalAmount) || 0,
      subtotal: Number(data.subtotal) || 0,
      taxAmount: Number(data.taxAmount) || 0,
      shippingAmount: Number(data.shippingAmount) || 0,
      total: Number(data.total) || 0,
      paymentMethod: data.paymentMethod || 'wire_transfer',
      paymentStatus: paymentStatus,
      status: status,
      notes: data.notes || '',
      requiresAction: data.paymentMethod === 'wire_transfer'
    });

    console.log('✅ Order created successfully:', order.orderId);

    return NextResponse.json({ 
      success: true, 
      order: {
        _id: order._id.toString(),
        orderId: order.orderId,
        customerId: order.customerId,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status
      },
      orderId: order.orderId,
      message: 'Order created successfully'
    });
  } catch (err) {
    console.error('❌ ORDER API ERROR:', err);
    
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
    
    if (err.name === 'ValidationError') {
      const errors = {};
      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const customerId = searchParams.get('customerId');
    
    let query = {};
    
    if (orderId) {
      query.orderId = orderId;
    }
    
    if (customerId) {
      query.customerId = customerId;
    }
    
    const orders = await Order.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      orders: orders.map(order => ({
        _id: order._id.toString(),
        orderId: order.orderId,
        customerId: order.customerId,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        items: order.items,
        subtotal: order.subtotal,
        taxAmount: order.taxAmount,
        shippingAmount: order.shippingAmount,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        notes: order.notes,
        requiresAction: order.requiresAction,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }))
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}