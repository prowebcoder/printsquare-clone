// components/layout/header/header-menu.js
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [openMenus, setOpenMenus] = useState({});

  const menuData = {
    "About Us": {
      items: [
        { label: "About Us", href: "/about-us" },
        { label: "Tour Our Facilities", href: "/tour-our-facilities" },
      ],
    },
    "Quote": {
      items: [
        { label: "Perfect Binding", href: "/perfect-binding" },
        { label: "Saddle Stitching", href: "/saddle-stitching" },
        { label: "Hardcover Book", href: "/hardcover-book" },
        { label: "Wire Binding", href: "/wire-binding" },
        { label: "Custom Quote", href: "/custom-quote" },
      ],
    },
    "Printing Service": {
      items: [
        { label: "Printing", href: "/printing" },
        { label: "Sheet-Fed Press", href: "/sheet-fed-press" },
        { label: "Web-Fed Press", href: "/web-fed-press" },
        { label: "Binding & Finishing", href: "/binding-and-finishing" },
      ],
    },
    "Tutorials": {
      items: [
        { label: "Quick Guide for Art Files", href: "/quick-guide-for-art-files" },
        { label: "Page Layout", href: "/page-layout" },
        { label: "Bleed & Trimming", href: "/bleed-and-trimming" },
        { label: "Print-ready PDF files", href: "/print-ready-pdf-files" },
        { label: "Paper Size & Weight", href: "/paper-size-and-weight" },
        { label: "Paper Weight Converter", href: "/paper-weight-converter" },
        { label: "Add-on", href: "/add-on" },
      ],
    },
    "Help": {
      items: [
        { label: "Notice", href: "/notice" },
        { label: "Faq's", href: "/faqs" },
        { label: "Contact Us", href: "/contact-us" },
      ],
    },
  };

  const toggleMobileMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 font-medium text-white">
        {Object.keys(menuData).map((menuItem) => (
          <li
            key={menuItem}
            className="relative"
            onMouseEnter={() => setActiveMenu(menuItem)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="hover:text-red-500 transition-colors duration-200 py-2 block cursor-pointer">
              {menuItem}
            </span>

            {/* Dropdown */}
            {activeMenu === menuItem && (
              <div className="absolute left-0 top-full mt-0 bg-[#121A2C] shadow-xl rounded-lg border border-[#2E3850] min-w-64 z-50">
                <div className="p-4">
                  <div className="text-xs font-semibold text-[#D6D9E0] uppercase tracking-wider mb-2">
                    {menuItem}
                  </div>
                  <ul className="space-y-1">
                    {menuData[menuItem].items.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-white hover:bg-gradient-to-r hover:from-[#E21B36] hover:to-[#FF4B2B] hover:text-white rounded-md transition-all duration-200"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <ul className="space-y-2 py-2">
          {Object.keys(menuData).map((menuItem) => (
            <li key={menuItem} className="border-b border-[#2E3850]">
              <button
                onClick={() => toggleMobileMenu(menuItem)}
                className="w-full flex justify-between items-center px-4 py-3 text-white font-medium focus:outline-none"
              >
                {menuItem}
                {openMenus[menuItem] ? (
                  <FiMinus className="text-white" />
                ) : (
                  <FiPlus className="text-white" />
                )}
              </button>

              {openMenus[menuItem] && (
                <ul className="bg-[#121A2C] rounded-md ml-2 mr-2 mb-2">
                  {menuData[menuItem].items.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-gradient-to-r hover:from-[#E21B36] hover:to-[#FF4B2B] hover:text-white rounded-md transition-all duration-200"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MainMenu;
