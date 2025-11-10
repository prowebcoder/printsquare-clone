// app/admin/dashboard/content/page.js
'use client';
import { useState } from 'react';
import ContentEditor from '@/components/admin/ContentEditor';

export default function ContentPage() {
  const [selectedPage, setSelectedPage] = useState('home');

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'contact', label: 'Contact Page' },
    // Add more pages as needed
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Page:</label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {pages.map(page => (
              <option key={page.value} value={page.value}>
                {page.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ContentEditor pageSlug={selectedPage} />
    </div>
  );
}