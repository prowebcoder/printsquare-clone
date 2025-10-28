"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
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
      { label: "Custom Quote", href: "/custom-quote" },
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
                  {menuData[menuItem].map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.href}
                        onClick={toggleMenu}
                        className="block text-gray-600 hover:text-[#E21B36] text-sm py-1 transition"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* Footer Section */}
        <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
          <div className="text-gray-700 text-sm space-y-1">
            <div>support@printsquarenet</div>
            <div>(415)-694-4593</div>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <Link
              href="/sign-up"
              onClick={toggleMenu}
              className="text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition"
            >
              Join Us
            </Link>
            <Link
              href="/login"
              onClick={toggleMenu}
              className="text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition"
            >
              Login
            </Link>
            <Link
              href="/request-sample"
              onClick={toggleMenu}
              className="text-center bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition"
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
