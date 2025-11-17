// app/admin/dashboard/forms/debug/page.js - UPDATED
'use client';
import { useEffect, useState } from 'react';

export default function FormsDebug() {
  const [debugInfo, setDebugInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveTest, setSaveTest] = useState({});

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Test admin API
      let adminRes, adminData;
      try {
        adminRes = await fetch('/api/admin/forms/print-quote', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const text = await adminRes.text();
        try {
          adminData = JSON.parse(text);
        } catch (e) {
          adminData = { error: 'Not JSON', html: text.substring(0, 200) + '...' };
        }
      } catch (error) {
        adminData = { error: error.message };
      }

      // Test public API
      let publicRes, publicData;
      try {
        publicRes = await fetch('/api/forms/print-quote');
        const text = await publicRes.text();
        try {
          publicData = JSON.parse(text);
        } catch (e) {
          publicData = { error: 'Not JSON', html: text.substring(0, 200) + '...' };
        }
      } catch (error) {
        publicData = { error: error.message };
      }

      setDebugInfo({
        adminApi: {
          url: '/api/admin/forms/print-quote',
          status: adminRes?.status,
          ok: adminRes?.ok,
          data: adminData
        },
        publicApi: {
          url: '/api/forms/print-quote', 
          status: publicRes?.status,
          ok: publicRes?.ok,
          data: publicData
        },
        token: token ? `Present (${token.substring(0, 20)}...)` : 'Missing'
      });
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const testConfig = {
        general: {
          title: "Test Configuration",
          description: "This is a test configuration",
          submitButtonText: "Test Save",
          shippingButtonText: "Test Shipping"
        },
        bindingTypes: [
          { value: 'TEST', label: 'Test Binding' }
        ]
      };

      console.log('Saving test config:', testConfig);

      const res = await fetch('/api/admin/forms/print-quote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(testConfig),
      });

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { error: 'Not JSON', html: text.substring(0, 200) + '...' };
      }

      setSaveTest({
        status: res.status,
        ok: res.ok,
        data: data
      });

      console.log('Save test response:', { status: res.status, ok: res.ok, data });

    } catch (error) {
      setSaveTest({
        error: error.message
      });
      console.error('Save test error:', error);
    }
  };

  if (loading) {
    return <div>Loading debug information...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Forms Debug Information</h1>
      
      <div className="mb-6">
        <button 
          onClick={testSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
        >
          Test Save Configuration
        </button>
        <button 
          onClick={testConnection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh APIs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">API Status</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Save Test Results</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(saveTest, null, 2)}
          </pre>
        </div>
      </div>

      {saveTest.data && saveTest.ok && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-green-800 font-semibold">Save Test Successful!</h3>
          <p className="text-green-700 text-sm">
            The configuration was saved successfully. Now try saving from the form editor.
          </p>
        </div>
      )}

      {saveTest.data && !saveTest.ok && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold">Save Test Failed</h3>
          <p className="text-red-700 text-sm">
            Check the console for detailed error information.
          </p>
        </div>
      )}
    </div>
  );
}