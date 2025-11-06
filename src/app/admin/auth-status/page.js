"use client";
import { useState, useEffect } from 'react';

export default function AuthStatus() {
  const [status, setStatus] = useState('Checking...');
  const [cookies, setCookies] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    checkStatus();
    updateCookies();
  }, []);

  const checkStatus = async () => {
    try {
      setStatus('Checking auth...');
      
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      setApiResponse(JSON.stringify(data, null, 2));
      
      if (response.ok) {
        setStatus('✅ Authenticated');
      } else {
        setStatus(`❌ Not authenticated: ${data.error}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  const updateCookies = () => {
    setCookies(document.cookie || 'No cookies found');
  };

  const testLogin = async () => {
    try {
      setStatus('Logging in...');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@printseoul.com',
          password: 'admin123'
        }),
      });

      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
      
      if (response.ok) {
        setStatus('✅ Login successful!');
        setTimeout(() => {
          checkStatus();
          updateCookies();
        }, 1000);
      } else {
        setStatus(`❌ Login failed: ${data.error}`);
      }
    } catch (error) {
      setStatus(`❌ Login error: ${error.message}`);
    }
  };

  const clearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.trim().split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    updateCookies();
    setStatus('Cookies cleared');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Authentication Status</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className={`p-4 rounded ${
            status.includes('✅') ? 'bg-green-100 text-green-800' : 
            status.includes('❌') ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={checkStatus}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Check Auth Status
            </button>
            
            <button
              onClick={testLogin}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Test Login
            </button>
            
            <button
              onClick={clearCookies}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Clear All Cookies
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
            {cookies}
          </pre>
          <button
            onClick={updateCookies}
            className="mt-2 bg-gray-600 text-white py-1 px-3 rounded text-sm hover:bg-gray-700"
          >
            Refresh Cookies
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">API Response</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-60">
          {apiResponse || 'No response yet'}
        </pre>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting Steps:</h3>
        <ol className="list-decimal list-inside text-yellow-700 space-y-1 text-sm">
          <li>Click "Test Login" to attempt authentication</li>
          <li>Check if cookies appear after login</li>
          <li>Click "Check Auth Status" to verify authentication</li>
          <li>If cookies don't appear, try in incognito mode</li>
          <li>Check browser console for any errors</li>
        </ol>
      </div>
    </div>
  );
}