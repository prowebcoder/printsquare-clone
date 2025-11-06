"use client";
import { useState, useEffect } from 'react';

export default function CookieTest() {
  const [cookies, setCookies] = useState('');
  const [apiResult, setApiResult] = useState('');

  useEffect(() => {
    updateCookies();
  }, []);

  const updateCookies = () => {
    setCookies(document.cookie || 'No cookies found');
  };

  const testAuthCheck = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include'
      });
      const data = await response.json();
      setApiResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResult('Error: ' + error.message);
    }
  };

  const setTestCookie = () => {
    document.cookie = 'testcookie=hello; path=/; max-age=3600';
    updateCookies();
  };

  const clearAllCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.trim().split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    updateCookies();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cookie Test Page</h1>
      
      <div className="space-y-4 mb-6">
        <button 
          onClick={testAuthCheck}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Test Auth Check
        </button>
        
        <button 
          onClick={setTestCookie}
          className="bg-green-500 text-white px-4 py-2 rounded mr-4"
        >
          Set Test Cookie
        </button>
        
        <button 
          onClick={clearAllCookies}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear All Cookies
        </button>

        <button 
          onClick={updateCookies}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
        >
          Refresh Cookies
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Current Cookies</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {cookies || 'No cookies'}
          </pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">API Result</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {apiResult || 'No result yet'}
          </pre>
        </div>
      </div>
    </div>
  );
}