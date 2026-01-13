// app/api/admin/orders/status/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { orderId } = params;
    const { paymentStatus } = await request.json();

    if (!paymentStatus) {
      return NextResponse.json(
        { error: 'Payment status is required' },
        { status: 400 }
      );
    }

    // Find by _id or orderId
    const order = await Order.findOne({ 
      $or: [
        { _id: orderId },
        { orderId: orderId }
      ]
    });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update payment status
    order.paymentStatus = paymentStatus;
    
    // If wire transfer is marked as paid, also update order status to processing
    if (paymentStatus === 'paid' && order.paymentMethod === 'wire_transfer') {
      order.status = 'processing';
    }
    
    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully',
      order: {
        _id: order._id,
        orderId: order.orderId,
        paymentStatus: order.paymentStatus,
        status: order.status,
        paymentMethod: order.paymentMethod
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update order status',
        details: error.message 
      },
      { status: 500 }
    );
  }
}