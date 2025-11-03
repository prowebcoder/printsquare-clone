// components/layout/header/RequestingSample.js
"use client";

import React, { useState } from "react"; // ✅ FIX: import React and useState

const RequestingSample = ({ setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    binding: "",
    size: "",
    paper: "",
    additionalRequest: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsOpen(false); // close modal after submit
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Request a Sample
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="binding"
              placeholder="Binding Type"
              value={formData.binding}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={formData.size}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <input
            type="text"
            name="paper"
            placeholder="Paper Type"
            value={formData.paper}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <textarea
            name="additionalRequest"
            placeholder="Additional Requests"
            value={formData.additionalRequest}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestingSample;
