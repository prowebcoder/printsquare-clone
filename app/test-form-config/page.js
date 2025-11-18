// app/test-form-config/page.js
'use client';
import { useEffect, useState } from 'react';

export default function TestFormConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/forms/print-quote');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Form Configuration Test</h1>
      
      <div className="mb-4">
        <button 
          onClick={fetchConfig}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh Config
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Current Configuration</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Configuration Details</h2>
          {config && (
            <div className="space-y-2">
              <p><strong>Title:</strong> {config.general?.title || 'Not set'}</p>
              <p><strong>Description:</strong> {config.general?.description || 'Not set'}</p>
              <p><strong>Submit Button:</strong> {config.general?.submitButtonText || 'Not set'}</p>
              <p><strong>Binding Types:</strong> {config.bindingTypes?.length || 0}</p>
              <p><strong>Sizes:</strong> {config.sizes?.length || 0}</p>
              <p><strong>Paper Options:</strong> {Object.keys(config.paperOptions || {}).length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}