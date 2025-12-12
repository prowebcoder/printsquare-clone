// app/checkout/success/page.js
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import Link from 'next/link';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { cartItems, cartTotal, completeCheckout } = useCart();
  const { customer } = useCustomerAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId && customer && cartItems.length > 0 && !isSaved) {
      saveOrder();
    }
  }, [orderId, customer, cartItems]);

  const saveOrder = async () => {
    setIsSaving(true);
    try {
      const orderData = {
        orderId: orderId,
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        items: cartItems.map(item => ({
          productName: item.productName,
          type: item.type,
          configuration: item.configuration,
          summary: item.summary,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        })),
        subtotal: cartTotal,
        tax: cartTotal * 0.08,
        shipping: cartTotal > 500 ? 0 : 25, // Example shipping calculation
        total: cartTotal + (cartTotal * 0.08) + (cartTotal > 500 ? 0 : 25),
        paymentTransactionId: orderId,
        paymentMethod: 'PayPal'
      };

      await completeCheckout(orderData);
      setIsSaved(true);
    } catch (err) {
      setError('Failed to save order. Please contact support.');
      console.error('Error saving order:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
              <p className="text-green-100 text-lg">Thank you for your purchase</p>
              {orderId && (
                <div className="mt-6 inline-block bg-white/20 px-4 py-2 rounded-lg">
                  <p className="text-white font-mono text-sm">Order ID: {orderId}</p>
                </div>
              )}
            </div>

            {/* Order Details */}
            <div className="p-8">
              {isSaving ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Saving your order details...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Oops!</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <p className="text-sm text-gray-500">Your payment was successful but we couldn't save the order details.</p>
                  <p className="text-sm text-gray-500">Please contact support with your order ID.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b">
                          <div>
                            <h4 className="font-medium text-gray-900">{item.productName}</h4>
                            <p className="text-sm text-gray-500">{item.quantity} × ${item.price.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${item.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">What's Next?</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                        <p className="text-xs text-gray-500">Within 24 hours</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Production</p>
                        <p className="text-xs text-gray-500">10-15 business days</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="text-xs text-gray-500">3-5 business days</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/account?tab=orders"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      View Order History
                    </Link>
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}