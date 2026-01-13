// app/cart/page.js
'use client';
import { useCart } from '@/context/CartContext';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiRefreshCw, FiChevronRight, FiPackage, FiShield, FiTruck, FiCreditCard, FiLogIn } from 'react-icons/fi';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isCartLoaded, startCheckout } = useCart();
  const { customer, isLoading: authLoading } = useCustomerAuth();
  const router = useRouter();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isWireTransferCheckingOut, setIsWireTransferCheckingOut] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showWireTransferDetails, setShowWireTransferDetails] = useState(false);
  const [wireTransferOrderId, setWireTransferOrderId] = useState(null);
  const [wireTransferDetails, setWireTransferDetails] = useState(null);

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

  // Enhanced: PayPal Checkout with Login Check
  const handlePayPalCheckout = async () => {
    // Check if user is logged in
    if (!customer) {
      setShowLoginPrompt(true);
      return;
    }

    setIsCheckingOut(true);
    
    try {
      // Calculate total
      const total = cartTotal;
      
      // Create item description
      let itemName = '';
      if (cartItems.length === 1) {
        itemName = cartItems[0].productName || `${cartItems[0].type.replace('-', ' ').toUpperCase()} Book`;
      } else {
        itemName = `${cartItems.length} Printing Items`;
      }
      
      // Get PayPal email from environment variable
      const paypalEmail = process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL;
      
      if (!paypalEmail) {
        alert('Please contact admin to set up PayPal email for checkout.');
        setIsCheckingOut(false);
        return;
      }
      
      // Generate unique order ID for this checkout session
      const orderId = startCheckout();
      
      // Create PayPal hosted checkout URL with custom data
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&amount=${total.toFixed(2)}&item_name=${encodeURIComponent(itemName)}&currency_code=USD&return=${encodeURIComponent(window.location.origin + `/checkout/success?order_id=${orderId}`)}&cancel_return=${encodeURIComponent(window.location.origin + '/cart')}&custom=${encodeURIComponent(orderId)}`;
      
      console.log('Redirecting to PayPal:', paypalUrl);
      
      // DO NOT clear cart here - only redirect to PayPal
      window.location.href = paypalUrl;
      
    } catch (error) {
      console.error('PayPal checkout error:', error);
      alert(`Checkout failed: ${error.message}`);
      setIsCheckingOut(false);
    }
  };
// Helper function to clean cart items
const cleanCartItems = (items) => {
  return items.map(item => {
    // Create a clean copy of the item
    const cleanItem = {
      productName: item.productName || 'Printing Product',
      type: item.type || 'perfect-binding',
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      total: Number(item.total) || 0,
      summary: item.summary || {},
    };
    
    // Handle configuration object - ensure it's not a string
    if (typeof item.configuration === 'string') {
      try {
        cleanItem.configuration = JSON.parse(item.configuration);
      } catch (e) {
        console.warn('Could not parse configuration string:', e);
        cleanItem.configuration = {};
      }
    } else if (item.configuration && typeof item.configuration === 'object') {
      // Deep clone to avoid reference issues
      cleanItem.configuration = JSON.parse(JSON.stringify(item.configuration));
    } else {
      cleanItem.configuration = {};
    }
    
    return cleanItem;
  });
};
  // Wire Transfer Checkout
const handleWireTransferCheckout = async () => {
  if (!customer) {
    alert('Please login to proceed with wire transfer');
    router.push('/customer/login?redirect=/cart');
    return;
  }

  setIsWireTransferCheckingOut(true);
  
  try {
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Prepare cart items properly - SIMPLIFY THIS FIRST
    const cleanItems = cartItems.map(item => {
      return {
        productName: item.productName || 'Printing Product',
        type: item.type || 'printing',
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        total: Number(item.total) || 0,
        summary: item.summary || {},
        configuration: item.configuration || {}
      };
    });

    // Calculate totals
    const subtotal = cartTotal;
    const taxAmount = subtotal * 0.08;
    const shippingAmount = 0;
    const total = subtotal + taxAmount + shippingAmount;

    // Prepare SIMPLE order data for testing
    const orderData = {
      orderId: orderId,
      customerId: customer._id || customer.id || 'customer-' + Date.now(),
      customerEmail: customer.email || '',
      customerName: customer.name || 'Customer',
      customerPhone: customer.phone || '',
      customerAddress: customer.address || {},
      items: cleanItems,
      subtotal: subtotal,
      taxAmount: taxAmount,
      shippingAmount: shippingAmount,
      total: total,
      totalAmount: total,
      paymentMethod: 'wire_transfer'
    };

    console.log('📤 Sending simplified order data:', orderData);

    // Use the simple API route first for testing
    const response = await fetch('/api/orders/simple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    console.log('📥 API Response:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Order created successfully:', result);
      // Clear cart and redirect
      clearCart();
      router.push(`/order-success?orderId=${orderId}&type=wire_transfer`);
    } else {
      console.error('❌ Order creation failed with details:', result.details);
      throw new Error(result.message || result.error || 'Failed to create order');
    }
  } catch (error) {
    console.error('❌ Wire transfer checkout error:', error);
    alert(`Order creation failed: ${error.message}. Please check console for details.`);
  } finally {
    setIsWireTransferCheckingOut(false);
  }
};





  // Handle login redirect
  const handleLoginRedirect = () => {
    router.push('/customer/login?redirect=/cart');
  };

  // Copy order ID to clipboard
  const copyOrderIdToClipboard = () => {
    if (wireTransferOrderId) {
      navigator.clipboard.writeText(wireTransferOrderId);
      alert('Order ID copied to clipboard!');
    }
  };

  // Show loading state
  if (!isCartLoaded || !isClient || authLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center mb-8 animate-pulse">
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue-200 animate-spin-slow"></div>
                  <FiRefreshCw className="w-12 h-12 text-indigo-500 animate-spin" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                Loading Your Cart
              </h1>
              <p className="text-lg text-gray-500 max-w-md text-center">We're preparing your printing items...</p>
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center shadow-lg">
                  <FiShoppingBag className="w-16 h-16 text-indigo-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">0</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-md text-center">
                Looks like you haven't added any printing products yet. Let's create something amazing!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/perfect-binding"
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Explore Printing Services</span>
                  <FiChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-16">
          {/* Header with breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <FiChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">Shopping Cart</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                  Your Cart
                </h1>
                <p className="text-gray-500 mt-2">Review items and proceed to secure checkout</p>
              </div>
              <div className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
                  <FiPackage className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="text-lg font-bold text-gray-900">{cartItems.length}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Login Status Banner */}
          {!customer && (
            <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <FiLogIn className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Login Required for Checkout</h3>
                  <p className="text-sm text-gray-600">Please login or create an account to proceed with checkout and save your order details.</p>
                </div>
                <button
                  onClick={handleLoginRedirect}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          )}
          
          {/* User Info Banner (if logged in) */}
          {customer && (
            <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Welcome, {customer.name}!</h3>
                  <p className="text-sm text-gray-600">Your order will be linked to your account and saved in your order history.</p>
                </div>
                <div className="text-sm text-gray-600">
                  Order will ship to: <span className="font-medium">{customer.email}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Cart Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                      <FiShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Your Printing Items</h2>
                      <p className="text-gray-300">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} added</p>
                    </div>
                  </div>
                  <button
                    onClick={clearCart}
                    className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 cursor-pointer group"
                  >
                    <FiTrash2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Clear All
                  </button>
                </div>
              </div>
              
              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image Placeholder */}
                        <div className="w-full md:w-32 h-48 md:h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-2">
                              <FiPackage className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-xs font-medium text-gray-700 bg-white/80 px-2 py-1 rounded">
                              {item.type.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {item.productName}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                  {item.summary?.binding}
                                </span>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                                  {item.summary?.size}
                                </span>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                                  {item.summary?.pages} pages
                                </span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-2xl font-bold text-gray-900">{formatCurrency(item.total)}</p>
                              <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
                            </div>
                          </div>
                          
                          {/* Specifications */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500">Cover</p>
                              <p className="font-medium text-gray-900">{item.summary?.cover}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500">Print Color</p>
                              <p className="font-medium text-gray-900">{item.summary?.printColor}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500">Quantity</p>
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900">{item.quantity}</p>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded cursor-pointer transition-colors disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                  >
                                    <FiMinus className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded cursor-pointer transition-colors"
                                  >
                                    <FiPlus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500">Added</p>
                              <p className="font-medium text-gray-900">
                                {new Date(item.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          
                          {/* Configuration Details */}
                          <details className="mt-6 group/details">
                            <summary className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
                                  <FiCreditCard className="w-4 h-4 text-gray-600" />
                                </div>
                                <span className="font-medium text-gray-900">View Configuration Details</span>
                              </div>
                              <svg className="w-5 h-5 text-gray-500 transition-transform group-open/details:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                              <pre className="text-xs text-gray-600 overflow-auto max-h-60 font-mono">
                                {JSON.stringify(item.configuration, null, 2)}
                              </pre>
                            </div>
                          </details>
                          
                          {/* Action Buttons */}
                          <div className="flex justify-end mt-6 pt-6 border-t">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer group/delete"
                            >
                              <FiTrash2 className="w-5 h-5 mr-2 group-hover/delete:scale-110 transition-transform" />
                              Remove Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/perfect-binding"
                  className="group inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  <FiShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
                
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <FiCreditCard className="w-5 h-5 text-white" />
                  </div>
                  Order Summary
                </h2>
                
                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-lg font-semibold text-gray-900">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium text-gray-900">{formatCurrency(cartTotal * 0.08)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b pb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-sm text-gray-500">Calculated at checkout</span>
                  </div>
                  
                  {/* Total */}
                  <div className="pt-4">
                    <div className="flex justify-between items-center py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                          {formatCurrency(cartTotal + cartTotal * 0.08)}
                        </p>
                        <p className="text-xs text-gray-500">Including estimated tax</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Login Notice for Checkout */}
                {!customer ? (
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <FiLogIn className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Login Required</p>
                          <p className="text-sm text-gray-600 mt-1">Please login to proceed with secure checkout.</p>
                          <button
                            onClick={handleLoginRedirect}
                            className="mt-3 w-full py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                          >
                            Login / Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      Login ensures your order history is saved and you receive updates.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* PayPal Checkout Button */}
                    <button
                      onClick={handlePayPalCheckout}
                      disabled={isCheckingOut || cartItems.length === 0}
                      className="group relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-lg cursor-pointer mb-4"
                    >
                      {isCheckingOut ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Processing Payment...
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-center">
                            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none">
                              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Pay with PayPal
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                          <div className="text-sm font-normal mt-2 opacity-90">
                            Secure checkout via PayPal
                          </div>
                        </>
                      )}
                    </button>

                    {/* OR separator */}
                    <div className="relative flex items-center justify-center my-4">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Wire Transfer Checkout Button */}
                    <button
                      onClick={handleWireTransferCheckout}
                      disabled={isWireTransferCheckingOut || cartItems.length === 0}
                      className="group relative w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-lg cursor-pointer"
                    >
                      {isWireTransferCheckingOut ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Processing Wire Transfer...
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-center">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Pay by Wire Transfer
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                          <div className="text-sm font-normal mt-2 opacity-90">
                            Bank transfer payment
                          </div>
                          {customer && (
                            <div className="text-xs mt-1 opacity-75">
                              Order will be linked to: {customer.email}
                            </div>
                          )}
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
              
              {/* Features Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Why Choose Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FiShield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Secure Payment</p>
                      <p className="text-sm text-gray-500">Your payment information is protected</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FiTruck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Free Shipping</p>
                      <p className="text-sm text-gray-500">On orders over $500</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <FiPackage className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Fast Production</p>
                      <p className="text-sm text-gray-500">10-15 business days turnaround</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Save Cart Notice */}
              <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-transparent rounded-bl-full"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Your Cart is Auto-saved
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your items are saved in your browser. Close this page and return anytime to complete your order.
                  </p>
                  {customer && (
                    <p className="text-xs text-indigo-600 mt-2 font-medium">
                      ✓ Logged in as {customer.name} - Your cart will be synced to your account.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}