// components/modals/CustomQuote.js
"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useRouter } from 'next/navigation';

const CustomQuote = ({ isOpen, onClose }) => {
  const { customer } = useCustomerAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    project_name: "",
    binding: "",
    custom_width: "",
    custom_height: "",
    page_in: "",
    quantity: "",
    country: "",
    zipcode: "",
    quote_desc: ""
  });

  // Redirect to login if not logged in
  useEffect(() => {
    if (isOpen && !customer) {
      alert("You need to login to request a custom quote.");
      onClose();
      router.push('/customer/login');
    }
  }, [isOpen, customer, onClose, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Allow only numbers for numeric fields
    if (name === "custom_width" || name === "custom_height" || 
        name === "page_in" || name === "quantity") {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customer) {
      alert("Please login to submit a custom quote request.");
      onClose();
      router.push('/customer/login');
      return;
    }

    try {
      const submissionData = {
        ...formData,
        customer_id: customer.id,
        customer_name: customer.name,
        customer_email: customer.email,
        timestamp: new Date().toISOString()
      };

      // TODO: Implement API call
      console.log('Custom quote data:', submissionData);
      
      alert('Custom quote request submitted successfully! Our team will contact you soon.');
      onClose();
      
      setFormData({
        project_name: "",
        binding: "",
        custom_width: "",
        custom_height: "",
        page_in: "",
        quantity: "",
        country: "",
        zipcode: "",
        quote_desc: ""
      });
    } catch (error) {
      console.error('Error submitting custom quote:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  const countries = ["USA", "Canada", "Australia", "South Korea", "Japan", "United Kingdom"];
  const bindings = [
    { value: "", label: "▒ Binding ▒" },
    { value: "PERFECT", label: "Perfect Binding" },
    { value: "SADDLE", label: "Saddle Stitching" },
    { value: "HARDCOVER", label: "Hardcover Book" },
    { value: "WIRE", label: "Wire Binding" }
  ];

  if (!isOpen) return null;

  if (!customer) {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        
        <div className="flex min-h-full items-center justify-center p-2">
          <div className="relative bg-white rounded-lg shadow-xl max-w-[400px] w-full mx-auto">
            <div className="absolute top-3 right-3">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={onClose}
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Login Required
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                You need to login to request a custom quote.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onClose();
                    router.push('/customer/login');
                  }}
                  className="px-4 py-2 text-sm bg-[#E21B36] text-white rounded-md hover:bg-[#c8152d]"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-2">
        <div className="relative bg-white rounded-lg shadow-xl max-w-[600px] w-full mx-auto">
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <FiX className="h-5 w-5" />
          </button>

          {/* Modal Content */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Custom Quote
            </h2>
            
            <p className="text-sm text-gray-600 mb-4">
              Request a custom quote if you can&apos;t obtain a quote online.
            </p>
            
            <form onSubmit={handleSubmit}>
              {/* Row 1: Project Name */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="Project Name (Title)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                />
              </div>

              {/* Row 2: Binding & Size */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Binding</label>
                  <select
                    name="binding"
                    value={formData.binding}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  >
                    {bindings.map((binding, index) => (
                      <option key={index} value={binding.value}>{binding.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Finished Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="custom_width"
                      value={formData.custom_width}
                      onChange={handleChange}
                      maxLength={7}
                      placeholder="Width"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="custom_height"
                      value={formData.custom_height}
                      onChange={handleChange}
                      maxLength={7}
                      placeholder="Height"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Page Count & Quantity */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Page Count</label>
                  <input
                    type="text"
                    name="page_in"
                    value={formData.page_in}
                    onChange={handleChange}
                    maxLength={7}
                    placeholder="Page Count"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    maxLength={7}
                    placeholder="Quantity"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 4: Country & ZipCode */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="ZipCode"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 5: Project Description */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">Project Content</label>
                <textarea
                  name="quote_desc"
                  value={formData.quote_desc}
                  onChange={handleChange}
                  placeholder="Please describe your project"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#E21B36] text-white rounded-md hover:bg-[#c8152d] focus:outline-none focus:ring-1 focus:ring-[#E21B36]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomQuote;