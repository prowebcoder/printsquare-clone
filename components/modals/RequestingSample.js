// components/modals/RequestingSample.js
"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useCustomerAuth } from '@/hooks/useCustomerAuth';

const RequestingSample = ({ isOpen, onClose }) => {
  const { customer } = useCustomerAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    zipcode: "",
    address: "",
    binding: "",
    size: "",
    custom_width: "",
    custom_height: "",
    paper: "",
    memo: ""
  });

  // Prefill form with customer data if logged in
  useEffect(() => {
    if (customer) {
      setFormData(prev => ({
        ...prev,
        name: customer.name || "",
        email: customer.email || "",
      }));
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        ...formData,
        final_size: formData.size === "custom" 
          ? `${formData.custom_width} x ${formData.custom_height}`
          : formData.size
      };

      // TODO: Implement API call
      console.log('Sample request data:', submissionData);
      
      alert('Sample request submitted successfully!');
      onClose();
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        country: "",
        zipcode: "",
        address: "",
        binding: "",
        size: "",
        custom_width: "",
        custom_height: "",
        paper: "",
        memo: ""
      });
    } catch (error) {
      console.error('Error submitting sample request:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  const countries = ["USA", "Canada", "Australia", "South Korea", "Japan", "United Kingdom"];
  const bindings = [
    { value: "", label: "▒ Binding ▒" },
    { value: "PERFECT", label: "Perfect Binding" },
    { value: "SADDLE", label: "Saddle Stiching" },
    { value: "HARDCOVER", label: "Hardcover Book" },
    { value: "WIRE", label: "Wire Binding" }
  ];
  const sizes = [
    { value: "", label: "Size" },
    { value: "5.5 x 8.5", label: "5.5 x 8.5" },
    { value: "7.5 x 10", label: "7.5 x 10" },
    { value: "8.5 x 11", label: "8.5 x 11" },
    { value: "9 x 12", label: "9 x 12" },
    { value: "custom", label: "Custom Size" }
  ];
  const papers = [
    { value: "", label: "Paper" },
    { value: "MATTE", label: "MATTE" },
    { value: "GLOSS", label: "GLOSS" },
    { value: "UNCOATED", label: "UNCOATED" },
    { value: "LEATHACK", label: "LEATHACK" }
  ];

  if (!isOpen) return null;

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
              Sample Request
            </h2>
            
            <p className="text-sm text-gray-600 mb-4">
              Please fill out the exact information for sample delivery.
            </p>
            
            <form onSubmit={handleSubmit}>
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={50}
                    placeholder="Name"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={30}
                    placeholder="Phone number"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                />
              </div>

              {/* Row 3: Country & ZipCode */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
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
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 4: Address */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="Address"
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                />
              </div>

              {/* Row 5: Binding & Size */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Binding</label>
                  <select
                    name="binding"
                    value={formData.binding}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  >
                    {bindings.map((binding, index) => (
                      <option key={index} value={binding.value}>{binding.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Size (Inch)</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                  >
                    {sizes.map((size, index) => (
                      <option key={index} value={size.value}>{size.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 6: Custom Size (if selected) */}
              {formData.size === "custom" && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Width (Inch)</label>
                    <input
                      type="text"
                      name="custom_width"
                      value={formData.custom_width}
                      onChange={handleChange}
                      maxLength={7}
                      placeholder="Width"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">Height (Inch)</label>
                    <input
                      type="text"
                      name="custom_height"
                      value={formData.custom_height}
                      onChange={handleChange}
                      maxLength={7}
                      placeholder="Height"
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Row 7: Paper */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Paper</label>
                <select
                  name="paper"
                  value={formData.paper}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E21B36] focus:border-transparent"
                >
                  {papers.map((paper, index) => (
                    <option key={index} value={paper.value}>{paper.label}</option>
                  ))}
                </select>
              </div>

              {/* Row 8: Additional Request */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">Additional Request</label>
                <textarea
                  name="memo"
                  value={formData.memo}
                  onChange={handleChange}
                  placeholder="Additional Request"
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

export default RequestingSample;