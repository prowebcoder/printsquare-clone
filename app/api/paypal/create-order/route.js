// app/api/paypal/create-order/route.js
export async function POST(request) {
  try {
    const { cartItems } = await request.json();

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      return Response.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // For testing without PayPal API credentials
    // In production, you would call PayPal API here
    
    // Create order object (this would be sent to PayPal API)
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total.toFixed(2)
              }
            }
          },
          items: cartItems.map(item => ({
            name: item.productName || `${item.type.replace('-', ' ').toUpperCase()} Book`,
            description: `${item.summary?.size || ''} • ${item.summary?.pages || ''} pages • ${item.summary?.binding || ''}`,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2)
            }
          })),
          shipping: {
            options: [
              {
                id: 'SHIP_123',
                label: 'Standard Shipping',
                type: 'SHIPPING',
                selected: true,
                amount: {
                  currency_code: 'USD',
                  value: '0.00'
                }
              }
            ]
          }
        }
      ],
      application_context: {
        brand_name: 'Your Printing Company',
        landing_page: 'BILLING',
        shipping_preference: 'SET_PROVIDED_ADDRESS',
        user_action: 'PAY_NOW',
        return_url: `${request.headers.get('origin')}/checkout/success`,
        cancel_url: `${request.headers.get('origin')}/cart`
      }
    };

    console.log('PayPal Order Data:', order);

    // In a real implementation, you would:
    // 1. Get access token from PayPal
    // 2. Create order via PayPal API
    // 3. Return order ID
    
    // For now, return a mock order ID for testing
    return Response.json({
      orderID: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderData: order
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return Response.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}