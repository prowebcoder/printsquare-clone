'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/header/header';
import Footer from '@/components/layout/footer/footer';
import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    // Simple effect to show success after a delay
    const timer = setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                <svg className="animate-spin w-10 h-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Completing Your Order</h1>
              <p className="text-lg text-gray-600">Please wait while we finalize your payment...</p>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <FiCheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your order. Your payment has been processed successfully.
            </p>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
              {sessionId && (
                <div className="text-left">
                  <p className="mb-2"><span className="font-medium">Order ID:</span> {sessionId.substring(0, 12)}...</p>
                  <p className="mb-2"><span className="font-medium">Status:</span> <span className="text-green-600 font-semibold">Completed</span></p>
                  <p className="mb-2"><span className="font-medium">Confirmation:</span> Sent to your email</p>
                  <p className="text-sm text-gray-500 mt-4">
                    A receipt has been emailed to you. Please check your inbox.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <FiHome className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <FiShoppingBag className="w-5 h-5 mr-2" />
                Order More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}