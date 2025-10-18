"use client";
import React from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button onClick={toggleMenu} className="text-2xl text-gray-700">
          <FiX />
        </button>
      </div>

      <nav className="flex flex-col px-6 py-6 space-y-4">
        {/* Main Menu Links */}
        <Link href="/" className="text-gray-800 font-medium hover:text-blue-600">
          Home
        </Link>
        <Link href="/about" className="text-gray-800 font-medium hover:text-blue-600">
          About
        </Link>
        <Link href="/services" className="text-gray-800 font-medium hover:text-blue-600">
          Services
        </Link>
        <Link href="/contact" className="text-gray-800 font-medium hover:text-blue-600">
          Contact
        </Link>

        {/* Announcement Bar Content for Mobile */}
        <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
          <div className="text-gray-700 text-sm space-y-1">
            <div>© support@printsquarenet</div>
            <div>(415)-694-4593</div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Link
              href="/sign-up"
              className="text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 font-medium shadow-sm"
            >
              Join Us
            </Link>
            <Link
              href="/login"
              className="text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 font-medium shadow-sm"
            >
              Login
            </Link>
            <Link
              href="/request-sample"
              className="text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium shadow-sm"
            >
              Requesting Sample
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
