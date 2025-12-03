// components/layout/header/MobileMenu.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

const MobileMenu = ({ isOpen, toggleMenu, customer, onLogout, onRequestSample, onOpenCustomQuote }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleCustomQuote = () => {
    onOpenCustomQuote();
    toggleMenu(); // Close mobile menu when opening modal
  };

  const menuData = {
    "About Us": [
      { label: "About Us", href: "/about-us" },
      { label: "Tour Our Facilities", href: "/tour-our-facilities" },
    ],
    "Quote": [
      { label: "Perfect Binding", href: "/perfect-binding" },
      { label: "Saddle Stitching", href: "/saddle-stitching" },
      { label: "Hardcover Book", href: "/hardcover-book" },
      { label: "Wire Binding", href: "/wire-binding" },
      { 
        label: "Custom Quote", 
        onClick: handleCustomQuote,
        isButton: true // Flag to indicate this should be a button, not a link
      },
    ],
    "Printing Service": [
      { label: "Printing", href: "/printing" },
      { label: "Sheet-Fed Press", href: "/sheet-fed-press" },
      { label: "Web-Fed Press", href: "/web-fed-press" },
      { label: "Binding & Finishing", href: "/binding-and-finishing" },
    ],
    "Tutorials": [
      { label: "Quick Guide for Art Files", href: "#" },
      { label: "Page Layout", href: "#" },
      { label: "Bleed & Trimming", href: "#" },
      { label: "Print-ready PDF files", href: "#" },
      { label: "Paper Size & Weight", href: "#" },
      { label: "Paper Weight Converter", href: "#" },
      { label: "Add-on", href: "#" },
    ],
    "Help": [
      { label: "Notice", href: "/notice" },
      { label: "Faq's", href: "/faqs" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  };

  const handleRequestSample = () => {
    onRequestSample();
    toggleMenu(); // Close mobile menu when opening modal
  };

  return (
    <div
      className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button onClick={toggleMenu} className="text-2xl text-gray-700">
          <FiX />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-6 overflow-y-auto max-h-[80vh]">
        {/* Home Link */}
        <Link
          href="/"
          onClick={toggleMenu}
          className="block text-gray-800 font-medium py-2 hover:text-[#E21B36]"
        >
          Home
        </Link>

        {/* Dropdown Sections */}
        {Object.keys(menuData).map((menuItem) => {
          const isOpenMenu = openMenus[menuItem];
          return (
            <div key={menuItem} className="border-b border-gray-200 py-2">
              <button
                onClick={() => toggleSubMenu(menuItem)}
                className={`w-full flex justify-between items-center text-left py-2 px-3 rounded-md font-medium transition-colors duration-300 ${
                  isOpenMenu
                    ? "bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white"
                    : "text-gray-800"
                }`}
              >
                {menuItem}
                {isOpenMenu ? (
                  <FiMinus className="text-black" />
                ) : (
                  <FiPlus className="text-black" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpenMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="ml-3 mt-2 space-y-2">
                  {menuData[menuItem].map((subItem, index) => (
                    <li key={`${subItem.label}-${index}`}>
                      {subItem.isButton ? (
                        <button
                          onClick={subItem.onClick}
                          className="block w-full text-left text-gray-600 hover:text-[#E21B36] text-sm py-1 transition"
                        >
                          {subItem.label}
                        </button>
                      ) : (
                        <Link
                          href={subItem.href}
                          onClick={toggleMenu}
                          className="block text-gray-600 hover:text-[#E21B36] text-sm py-1 transition"
                        >
                          {subItem.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Customer Authentication Section */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          {customer ? (
            // Show when customer is logged in
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="text-gray-700 text-sm space-y-1">
                <div className="font-medium text-[#E21B36]">Welcome, {customer.name}</div>
                <div className="text-gray-500">You are now logged in</div>
              </div>

              {/* Customer Links */}
              <div className="flex flex-col gap-3 mt-3">
                <Link
                  href="/customer/account"
                  onClick={toggleMenu}
                  className="text-center border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 font-medium transition"
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition"
                >
                  Logout
                </button>
                <button
                  onClick={handleRequestSample}
                  className="text-center bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition"
                >
                  Request Sample
                </button>
              </div>
            </div>
          ) : (
            // Show when customer is not logged in
            <>
              {/* Contact Info */}
              <div className="text-gray-700 text-sm space-y-1">
                <div>contact@printseoul.com</div>
                <div>(415)-694-4593</div>
              </div>

              {/* Authentication Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/customer/join"
                  onClick={toggleMenu}
                  className="text-center border border-[#E21B36] text-[#E21B36] px-4 py-2 rounded-lg hover:bg-[#E21B36] hover:text-white font-medium transition"
                >
                  Join Us
                </Link>
                <Link
                  href="/customer/login"
                  onClick={toggleMenu}
                  className="text-center border border-[#E21B36] text-[#E21B36] px-4 py-2 rounded-lg hover:bg-[#E21B36] hover:text-white font-medium transition"
                >
                  Login
                </Link>
                <button
                  onClick={handleRequestSample}
                  className="text-center bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition"
                >
                  Request Sample
                </button>
              </div>
            </>
          )}

          {/* Portfolio Button (Always visible) */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/portfolio"
              onClick={toggleMenu}
              className="block text-center bg-[#E21B36] text-white px-4 py-2 rounded-lg hover:bg-[#c8152d] font-medium transition"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;