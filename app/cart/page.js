// app/cart/page.js
'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiRefreshCw } from 'react-icons/fi';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isCartLoaded } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set client state to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
    // Collect customer info (you might want to add a form for this)
    const customerEmail = 'customer@example.com'; // Get from user input
    const customerName = 'Customer Name'; // Get from user input
    
    // Call your checkout API
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        total: cartTotal,
        customerEmail: customerEmail,
        customerName: customerName,
      }),
    });

    const data = await response.json();

    if (response.ok && data.url) {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Checkout failed');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Checkout failed. Please try again.');
  } finally {
    setIsCheckingOut(false);
  }
};

  // Show loading state
  if (!isCartLoaded || !isClient) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                <FiRefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 md:mt-16 mb-4">Loading Your Cart</h1>
              <p className="text-lg text-gray-600">Please wait while we load your cart items...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                <FiShoppingBag className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 md:mt-16 mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Add some printing products to your cart to get started with your order.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/quote/perfect-binding"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                  Perfect Binding
                </Link>
                <Link
                  href="/quote/hardcover"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                  Hardcover Books
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  View All Printing Services
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 md:mt-16">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {cartItems.length} Item{cartItems.length > 1 ? 's' : ''} in Cart
                    </h2>
                    <button
                      onClick={clearCart}
                      className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {item.productName}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.summary?.size} • {item.summary?.pages} pages • {item.summary?.binding}
                              </p>
                            </div>
                            <p className="text-lg font-bold text-indigo-600">
                              {formatCurrency(item.total)}
                            </p>
                          </div>
                          
                          {/* Item Summary */}
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="space-y-1">
                              <p><span className="font-medium">Cover:</span> {item.summary?.cover}</p>
                              <p><span className="font-medium">Print Color:</span> {item.summary?.printColor}</p>
                              <p><span className="font-medium">Type:</span> {item.type.replace('-', ' ').toUpperCase()}</p>
                            </div>
                            <div className="space-y-1">
                              <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                              <p><span className="font-medium">Price Each:</span> {formatCurrency(item.price)}</p>
                              <p><span className="font-medium">Added:</span> {new Date(item.addedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          {/* Configuration Details */}
                          <details className="mt-4">
                            <summary className="text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center transition-colors">
                              <span>View Configuration Details</span>
                              <svg className="w-4 h-4 ml-1 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                              <pre className="text-xs text-gray-600 overflow-auto max-h-60">
                                {JSON.stringify(item.configuration, null, 2)}
                              </pre>
                            </div>
                          </details>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center justify-between sm:justify-end sm:flex-col sm:items-end">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x min-w-12 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  href="/quote"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(cartTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium">{formatCurrency(cartTotal * 0.08)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-sm text-gray-500">Calculated at checkout</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-indigo-600">
                        {formatCurrency(cartTotal + cartTotal * 0.08)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including estimated tax</p>
                  </div>
                </div>

                
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="mt-8 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    or{' '}
                    <Link href="/quote" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                      Continue Shopping
                    </Link>
                  </p>
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Shipping Information</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Free shipping on orders over $500
                  </p>
                  <p className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Production time: 10-15 business days
                  </p>
                  <p className="flex items-start">
                    <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Secure SSL encrypted checkout
                  </p>
                </div>
              </div>
              
              {/* Save Cart Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your Cart is Saved
                </h3>
                <p className="text-sm text-gray-600">
                  Your cart items are automatically saved in your browser. You can close this page and return later to complete your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}