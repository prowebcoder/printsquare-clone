// GET method for testing API
export const dynamic = "force-dynamic";
export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'Checkout API is working. Use POST to simulate checkout.',
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// POST method to simulate checkout without Stripe
export async function POST(request) {
  try {
    const { cartItems } = await request.json();

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Simulated checkout success
    return new Response(
      JSON.stringify({
        message: 'Checkout simulated successfully.',
        totalAmount,
        redirectUrl: '/checkout/success'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({
        error: 'Checkout failed',
        message: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
