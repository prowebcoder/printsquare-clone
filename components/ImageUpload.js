// components/ImageUpload.js
"use client";

import React, { useState } from 'react';

export default function ImageUpload({ onUploadComplete, page = 'global', section = '' }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('page', page);
    formData.append('section', section);
    formData.append('alt', file.name);

    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const uploadedImage = await response.json();
      onUploadComplete(uploadedImage);
      
      // Simulate progress for demo
      for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => setProgress(i), i * 20);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      {uploading ? (
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600">Uploading... {progress}%</p>
        </div>
      ) : (
        <div>
          <input
            type="file"
            id="image-upload"
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Upload Image
          </label>
          <p className="text-gray-500 text-sm mt-2">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}