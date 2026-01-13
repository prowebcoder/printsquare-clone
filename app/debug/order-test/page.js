// app/debug/order-test/page.js
'use client';
import { useState } from 'react';

export default function OrderTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testOrder = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test database connection
      const dbTest = await fetch('/api/test-db');
      const dbResult = await dbTest.json();
      console.log('DB Test:', dbResult);

      if (!dbResult.success) {
        throw new Error('Database connection failed: ' + dbResult.error);
      }

      // Test order creation
      const orderData = {
        orderId: `TEST-${Date.now()}`,
        customerId: 'test-customer-id',
        customerEmail: 'test@example.com',
        customerName: 'Test Customer',
        customerPhone: '1234567890',
        customerAddress: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'USA'
        },
        items: [
          {
            productName: 'Test Book',
            type: 'perfect-binding',
            price: 25.99,
            quantity: 2,
            total: 51.98,
            summary: {
              binding: 'Perfect Binding',
              size: '8.5 x 11',
              pages: '100',
              cover: 'Glossy',
              printColor: 'Full Color'
            },
            configuration: {
              paperType: 'Premium',
              coverType: 'Softcover'
            }
          }
        ],
        subtotal: 51.98,
        taxAmount: 4.16,
        shippingAmount: 5.00,
        total: 61.14,
        totalAmount: 61.14,
        paymentMethod: 'wire_transfer',
        notes: 'Test order from debug page'
      };

      console.log('Sending test order:', orderData);

      const response = await fetch('/api/orders/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('Order creation result:', result);

      if (response.ok && result.success) {
        setResult(result);
        alert('✅ Test order created successfully!');
      } else {
        throw new Error(result.message || result.error || 'Failed to create order');
      }
    } catch (err) {
      console.error('Test failed:', err);
      setError(err.message);
      alert(`❌ Test failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Creation Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Test Order Creation</h2>
          <p className="mb-4">This will test the database connection and order creation.</p>
          
          <button
            onClick={testOrder}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Run Test'}
          </button>
        </div>

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-green-800 mb-2">✅ Success!</h3>
            <pre className="bg-white p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">❌ Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Troubleshooting Steps:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Click "Run Test" to test database connection</li>
            <li>Check browser console for detailed logs</li>
            <li>Check MongoDB is running locally on port 27017</li>
            <li>Verify .env.local has MONGODB_URI</li>
            <li>Check if MongoDB collection 'orders' exists</li>
          </ol>
        </div>
      </div>
    </div>
  );
}