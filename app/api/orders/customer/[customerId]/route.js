// app/api/orders/customer/[customerId]/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { customerId } = params;

    // Fetch orders for this customer
    const orders = await Order.find({ 
      $or: [
        { customerId: customerId },
        { 'customer._id': customerId }
      ]
    })
    .sort({ createdAt: -1 })
    .lean();

    // Transform orders for frontend
    const formattedOrders = orders.map(order => ({
      _id: order._id.toString(),
      orderId: order.orderId,
      customerId: order.customerId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone || '',
      customerAddress: order.customerAddress || {},
      items: order.items || [],
      subtotal: order.subtotal || 0,
      taxAmount: order.taxAmount || 0,
      shippingAmount: order.shippingAmount || 0,
      total: order.total || 0,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      status: order.status || 'pending',
      notes: order.notes || '',
      requiresAction: order.requiresAction || false,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders
    });

  } catch (error) {
    console.error('❌ Error fetching customer orders:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch customer orders',
        message: error.message
      },
      { status: 500 }
    );
  }
}