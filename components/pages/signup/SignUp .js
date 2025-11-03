//components/pages/signup/SignUp .js
"use client";
import React, { useState } from "react";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    authCode: "",
    password: "",
    confirmPassword: "",
    name: "",
    recommender: "",
  });

  // ✅ Remove TS types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleGetAuthCode = () => {
    console.log("Requesting auth code for:", formData.email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Sign up
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create your PrintSquare account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ID (Email) Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                ID (Email)
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <input
                  type="text"
                  name="authCode"
                  value={formData.authCode}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Authentication code"
                  required
                />
                <button
                  type="button"
                  onClick={handleGetAuthCode}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
                >
                  Get Authentication Code
                </button>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Password */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Password</h3>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password (0–20 chars)"
                maxLength={20}
                required
              />
            </div>

            <hr className="border-gray-300" />

            {/* Confirm Password */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Confirm Password
              </h3>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                maxLength={20}
                required
              />
            </div>

            <hr className="border-gray-300" />

            {/* Name */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Name</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <hr className="border-gray-300" />

            {/* Recommender */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Recommender (Optional)
              </h3>
              <input
                type="email"
                name="recommender"
                value={formData.recommender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Recommender's email address"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition font-medium text-lg"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
