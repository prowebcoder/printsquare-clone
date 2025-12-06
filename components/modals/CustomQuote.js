// components/modals/CustomQuote.js
"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useRouter } from 'next/navigation';

// Helper function for form validation
const validateFormData = (formData) => {
  const errors = [];

  if (!formData.project_name.trim()) {
    errors.push("Project name is required");
  }

  if (!formData.binding) {
    errors.push("Please select a binding type");
  }

  if (!formData.custom_width || !formData.custom_height) {
    errors.push("Please specify finished size dimensions");
  }

  if (!formData.page_in) {
    errors.push("Page count is required");
  }

  if (!formData.quantity) {
    errors.push("Quantity is required");
  }

  if (!formData.country) {
    errors.push("Please select a country");
  }

  if (!formData.zipcode) {
    errors.push("Zip code is required for shipping estimate");
  }

  if (formData.quote_desc.length < 10) {
    errors.push("Please provide a more detailed project description (minimum 10 characters)");
  }

  return errors;
};

const CustomQuote = ({ isOpen, onClose }) => {
  const { customer } = useCustomerAuth();
  const router = useRouter();
  
  // Form state
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

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

    // Validate form
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      alert(`Please fix the following errors:\n\n• ${validationErrors.join('\n• ')}`);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const submissionData = {
        ...formData,
        customer_id: customer.id,
        customer_name: customer.name,
        customer_email: customer.email,
        timestamp: new Date().toISOString()
      };

      // Send email via API
      const response = await fetch('/api/send-quote/custom-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Custom quote request submitted successfully! Our team will contact you within 1-2 business days.' 
        });
        
        // Show success message and reset form after delay
        setTimeout(() => {
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
        }, 3000);
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.message || 'Failed to submit request. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting custom quote:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setSubmitting(false);
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
                  required
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
                    required
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
                      required
                    />
                    <input
                      type="text"
                      name="custom_height"
                      value={formData.custom_height}
                      onChange={handleChange}
                      maxLength={7}
                      placeholder="Height"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                      required
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
                    required
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
                    required
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
                    required
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
                    required
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
                  placeholder="Please describe your project (minimum 10 characters)"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  required
                  minLength={10}
                />
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`mb-4 p-3 rounded-md text-sm ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  <div className="flex items-center">
                    {submitStatus.type === 'success' ? (
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-sm bg-[#E21B36] text-white rounded-md hover:bg-[#c8152d] focus:outline-none focus:ring-1 focus:ring-[#E21B36] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Quote Request'
                  )}
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