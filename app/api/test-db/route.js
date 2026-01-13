// app/api/test-db/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  try {
    await dbConnect();
    
    // Try to create a test order
    const testOrder = {
      orderId: 'TEST-' + Date.now(),
      customerId: 'test-customer',
      customerEmail: 'test@example.com',
      customerName: 'Test Customer',
      items: [
        {
          productName: 'Test Product',
          type: 'test',
          price: 10,
          quantity: 1,
          total: 10,
          summary: { test: 'test' }
        }
      ],
      total: 10,
      paymentMethod: 'wire_transfer',
      paymentStatus: 'pending',
      status: 'pending'
    };

    const order = await Order.create(testOrder);
    
    // Delete test order
    await Order.deleteOne({ _id: order._id });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      orderCreated: true,
      orderDeleted: true
    });
  } catch (err) {
    console.error('Test DB Error:', err);
    return NextResponse.json(
      { 
        success: false, 
        error: err.message,
        details: err.errors
      },
      { status: 500 }
    );
  }
}