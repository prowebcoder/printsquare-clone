// app/api/admin/orders/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req) {
  try {
    await dbConnect();
    let data = await req.json();

    console.log('📝 Creating order with data:', JSON.stringify(data, null, 2));

    // Generate order ID if not provided
    if (!data.orderId) {
      data.orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    // Ensure items is an array (not a string)
    let items = data.items;
    if (typeof items === 'string') {
      try {
        // Try to parse if it's a JSON string
        items = JSON.parse(items);
      } catch (e) {
        console.error('Failed to parse items string:', e);
        // If parsing fails, create a default item
        items = [{
          productName: 'Unknown Product',
          type: 'perfect-binding',
          price: 0,
          quantity: 1,
          total: 0,
          summary: {}
        }];
      }
    }

    // Ensure items is an array
    if (!Array.isArray(items)) {
      items = [];
    }

    // Set payment status based on method
    const paymentStatus = data.paymentMethod === 'wire_transfer' ? 'pending' : 'paid';
    
    // Set status to 'pending' (not 'created')
    const status = 'pending';

    // Clean the order data
    const orderData = {
      orderId: data.orderId,
      customerId: data.customerId || 'guest',
      customerEmail: data.customerEmail || '',
      customerName: data.customerName || '',
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
    };

    console.log('✅ Cleaned order data for saving:', orderData);

    const order = await Order.create(orderData);
    
    console.log('✅ Order created successfully:', order._id);

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
    
    // Handle duplicate order ID
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
    
    // Handle validation errors
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