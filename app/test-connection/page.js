// app/test-connection/page.js
'use client';
import { useState } from 'react';

export default function TestConnection() {
  const [result, setResult] = useState(null);

  const testConnection = async () => {
    try {
      // Test 1: Check editor save
      const saveRes = await fetch('/api/admin/forms/print-quote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          general: {
            title: "TEST - Connection Working!",
            description: "This is a test configuration",
            submitButtonText: "TEST - Add to Cart",
            shippingButtonText: "TEST - Calculate Shipping"
          }
        })
      });

      const saveResult = await saveRes.json();
      
      // Test 2: Check public API
      const getRes = await fetch('/api/forms/print-quote');
      const getResult = await getRes.json();

      setResult({
        save: saveResult,
        get: getResult,
        status: saveRes.ok && getRes.ok ? 'SUCCESS' : 'FAILED'
      });

    } catch (error) {
      setResult({
        error: error.message,
        status: 'ERROR'
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Connection Test</h1>
      <button 
        onClick={testConnection}
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold mb-4"
      >
        Test Editor ↔ Form Connection
      </button>

      {result && (
        <div className={`p-4 rounded-lg ${
          result.status === 'SUCCESS' ? 'bg-green-100 border border-green-300' : 
          result.status === 'ERROR' ? 'bg-red-100 border border-red-300' : 
          'bg-yellow-100 border border-yellow-300'
        }`}>
          <h2 className="text-lg font-semibold mb-2">Result: {result.status}</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}