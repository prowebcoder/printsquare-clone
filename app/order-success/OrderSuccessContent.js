'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiCopy, FiMail, FiPrinter, FiDownload } from 'react-icons/fi';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const orderId = searchParams.get('orderId');
  const type = searchParams.get('type');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.orders && data.orders.length > 0) {
          setOrder(data.orders[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied to clipboard!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const printInvoice = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <FiCheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {type === 'wire_transfer' ? 'Wire Transfer Order Created!' : 'Payment Successful!'}
            </h1>
            <p className="text-xl text-gray-600">
              {type === 'wire_transfer' 
                ? 'Your wire transfer order has been created successfully. Please complete the payment to proceed.'
                : 'Thank you for your order! Your payment has been received.'}
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={copyOrderId}
                    className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <FiCopy className="w-5 h-5 mr-2" />
                    Copy Order ID
                  </button>
                  <button
                    onClick={printInvoice}
                    className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiPrinter className="w-5 h-5 mr-2" />
                    Print Invoice
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-mono font-bold text-gray-900">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {type === 'wire_transfer' ? 'Wire Transfer' : 'PayPal'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status:</span>
                      <span className={`font-medium ${type === 'wire_transfer' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {type === 'wire_transfer' ? 'Pending' : 'Paid'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    {order && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium text-gray-900">{order.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium text-gray-900">{order.customerEmail}</span>
                        </div>
                        {order.customerPhone && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium text-gray-900">{order.customerPhone}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                {order && order.items && order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(item.total)}</p>
                  </div>
                ))}

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(order?.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(order?.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(order?.shippingAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t text-lg font-bold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-blue-600">{formatCurrency(order?.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wire Transfer Instructions (only for wire transfer) */}
          {type === 'wire_transfer' && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Wire Transfer Instructions</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Please complete your payment by wire transfer using the following bank details:
                </p>
                <div className="bg-white rounded-xl p-6 border border-yellow-100">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Bank Name:</span>
                      <span className="font-bold text-gray-900">[Your Bank Name]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Account Name:</span>
                      <span className="font-bold text-gray-900">[Your Company Name]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Account Number:</span>
                      <span className="font-mono font-bold text-gray-900">[Your Account Number]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Routing Number:</span>
                      <span className="font-mono font-bold text-gray-900">[Your Routing Number]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">SWIFT Code:</span>
                      <span className="font-mono font-bold text-gray-900">[Your SWIFT Code]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Amount:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(order?.total)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-blue-800 font-medium mb-2">Important:</p>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Include your Order ID <strong>{orderId}</strong> in the payment reference</li>
                    <li>Payment processing may take 2-3 business days</li>
                    <li>Your order will be processed once payment is confirmed</li>
                    <li>You will receive an email confirmation when payment is received</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/customer/account"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FiDownload className="w-5 h-5 mr-2" />
              View Order in Account
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Email Confirmation */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4">
              <FiMail className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600">
              A confirmation email has been sent to <strong>{order?.customerEmail}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Check your spam folder if you don't see it within a few minutes
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}