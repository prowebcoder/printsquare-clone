"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainMenu from "./header-menu";
import MobileMenu from "./MobileMenu";
import { FiMenu, FiX } from "react-icons/fi"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? "shadow-md bg-white" : ""}`}>
        
        {/* Desktop Announcement Bar */}
        <div className="hidden md:block bg-[#f1f5f9] text-gray-700 text-xs py-2 px-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span>© support@printsquarenet</span>
              <span>•</span>
              <span>(415)-694-4593</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/sign-up" className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 text-xs font-medium shadow-sm">
                Join Us
              </Link>
              <Link href="/login" className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 text-xs font-medium shadow-sm">
                Login
              </Link>
              <Link href="/request-sample" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs font-medium shadow-sm">
                Requesting Sample
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className={`w-full transition-all duration-300 ${isSticky ? "py-2 bg-white" : "py-4 bg-white"}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/homepage/logo.png" alt="PrintStar" width={300} height={80} className="h-auto w-48 md:w-60 lg:w-72" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <MainMenu />
            </div>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/portfolio" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                Portfolio
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden text-gray-700 text-2xl focus:outline-none">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </header>
      </div>

      {/* Spacer */}
      <div className="h-[130px] sm:h-[120px] md:h-[110px]"></div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;
