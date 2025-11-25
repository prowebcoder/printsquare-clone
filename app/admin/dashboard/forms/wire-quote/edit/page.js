//app/admin/dashboard/forms/wire-quote/edit/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WireQuoteFormEditor from '@/components/admin/WireQuoteFormEditor';

export default function WireQuoteFormEdit() {
  const [formConfig, setFormConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFormConfig();
  }, []);

  const fetchFormConfig = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/forms/wire-quote', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const config = await res.json();
        setFormConfig(config);
      } else {
        // Use empty config - the editor will use defaults
        setFormConfig({});
      }
    } catch (error) {
      console.error('Error fetching form config:', error);
      setFormConfig({});
    } finally {
      setLoading(false);
    }
  };

  const saveFormConfig = async (config) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/forms/wire-quote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('Form configuration saved successfully!');
        // Update local state
        setFormConfig(config);
      } else {
        alert(`Error saving configuration: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving form config:', error);
      alert('Error saving configuration');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <WireQuoteFormEditor 
        formConfig={formConfig} 
        onSave={saveFormConfig}
      />
    </div>
  );
}