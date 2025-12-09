// app/checkout/success/page.js
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiPackage, FiMail, FiCalendar } from 'react-icons/fi';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (sessionId) {
      // In a real app, you would fetch order details from your backend
      // For demo, we'll generate a random order number
      setOrderNumber(`ORD-${Date.now().toString().slice(-8)}`);
      
      // Get cart items from localStorage
      const savedOrders = JSON.parse(localStorage.getItem('printingOrders') || '[]');
      const latestOrder = savedOrders[savedOrders.length - 1];
      
      if (latestOrder) {
        setOrderDetails(latestOrder);
      }
      
      // Clear cart after successful checkout
      localStorage.removeItem('printingCart');
      
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FiCheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-lg text-gray-600">
                Thank you for your order. We're processing it now.
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="font-medium text-gray-900">{orderNumber}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                {orderDetails && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-medium text-gray-900">
                        ${(orderDetails.amountTotal || 0).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium text-gray-900">Credit Card</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900">What Happens Next?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiMail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                    <p className="text-sm text-gray-600">
                      You'll receive an email confirmation shortly with your order details.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiPackage className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Production</h3>
                    <p className="text-sm text-gray-600">
                      Our team will start preparing your printing order within 1 business day.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FiCalendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Timeline</h3>
                    <p className="text-sm text-gray-600">
                      Production typically takes 10-15 business days. You'll receive tracking information once shipped.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                If you have any questions about your order, our customer support team is here to help.
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> support@printseoul.com</p>
                <p><span className="font-medium">Phone:</span> (415)-694-4593</p>
                <p><span className="font-medium">Hours:</span> Mon-Fri, 9AM-6PM PST</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white text-center rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </Link>
              
              <button
                onClick={() => window.print()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 text-center rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}