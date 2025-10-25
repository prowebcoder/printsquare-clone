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
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isSticky ? "shadow-md" : ""
        }`}
      >
        {/* Desktop Announcement Bar */}
        <div className="hidden md:block bg-[#151134] text-white text-xs py-2 px-4 border-b border-[#2a2660]">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span>contact@printseoul.com</span>
              <span>•</span>
              <span>(415)-694-4593</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/sign-up"
                className="border border-[#E21B36] text-white px-3 py-1 rounded hover:bg-[#E21B36] text-xs font-medium shadow-sm transition"
              >
                Join Us
              </Link>
              <Link
                href="/login"
                className="border border-[#E21B36] text-white px-3 py-1 rounded hover:bg-[#E21B36] text-xs font-medium shadow-sm transition"
              >
                Login
              </Link>
              <Link
                href="/request-sample"
                className="bg-[#E21B36] text-white px-3 py-1 rounded hover:bg-[#c8152d] text-xs font-medium shadow-sm transition"
              >
                Request Sample
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header
          className={`w-full transition-all duration-300 ${
            isSticky ? "py-2 bg-[#151134]" : "py-4 bg-[#151134]"
          } text-white`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/homepage/logo.jpg"
                alt="PrintStar"
                width={180}
                height={60}
                className="h-auto w-36 md:w-44 lg:w-52"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <MainMenu className="text-white" />
            </div>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/portfolio"
                className="bg-[#E21B36] text-white px-4 py-2 rounded-lg hover:bg-[#c8152d] transition text-sm font-medium"
              >
                Portfolio
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white text-2xl focus:outline-none"
            >
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
