// app/api/wire-transfer/create-order/route.js
export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Wire transfer order request received:', body);

    // Log what fields we received
    console.log('Received fields:', {
      orderId: body.orderId,
      customerId: body.customerId,
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      itemsCount: body.items?.length,
      totalAmount: body.totalAmount
    });

    // Make validation more flexible for development
    if (!body.orderId) {
      console.log('Missing orderId, generating one...');
      body.orderId = `WT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    if (!body.customerEmail) {
      return Response.json(
        { error: 'Customer email is required' },
        { status: 400 }
      );
    }

    // Generate a customer ID if not provided
    if (!body.customerId) {
      body.customerId = `cust_${body.customerEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    }

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    // Create a simple order object
    const orderData = {
      orderId: body.orderId,
      customerId: body.customerId,
      customerEmail: body.customerEmail,
      customerName: body.customerName || body.customerEmail,
      items: body.items,
      totalAmount: body.totalAmount || 0,
      subtotal: body.subtotal || body.totalAmount || 0,
      taxAmount: body.taxAmount || 0,
      shippingAmount: body.shippingAmount || 0,
      total: body.total || body.totalAmount || 0,
      paymentMethod: 'wire_transfer',
      status: 'pending',
      requiresAction: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days expiry
    };

    console.log('Wire transfer order created:', orderData);

    // For now, just return success - in production you would save to database
    return Response.json({
      success: true,
      message: 'Wire transfer order created successfully',
      orderId: orderData.orderId,
      orderData: orderData,
      paymentInstructions: {
        bankName: process.env.BANK_NAME || 'Your Bank Name',
        accountName: process.env.BANK_ACCOUNT_NAME || 'Your Company Name',
        accountNumber: process.env.BANK_ACCOUNT_NUMBER || '1234 5678 9012 3456',
        routingNumber: process.env.BANK_ROUTING_NUMBER || '021000021',
        swiftCode: process.env.BANK_SWIFT_CODE || 'BOFAUS3N',
        reference: `ORDER-${orderData.orderId}`,
        amount: orderData.total,
        currency: 'USD',
        notes: 'Please use the order ID as payment reference'
      },
      nextSteps: [
        'Complete wire transfer within 7 days',
        'Email transfer receipt to accounts@yourcompany.com',
        'Production begins upon payment confirmation'
      ]
    });

  } catch (error) {
    console.error('Wire transfer create order error:', error);
    return Response.json(
      { 
        error: 'Failed to create wire transfer order',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}