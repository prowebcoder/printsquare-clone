// components/layout/header/header.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MainMenu from "./header-menu";
import MobileMenu from "./MobileMenu";
import { FiMenu, FiX } from "react-icons/fi";
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import RequestingSample from "@/components/modals/RequestingSample";
import CustomQuote from '@/components/modals/CustomQuote';
import CartIcon from "../common/CartIcon";
import CartSidebar from "../common/CartSidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [isSticky, setIsSticky] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false); // Modal state
  const { customer, logout, loading } = useCustomerAuth();
  const [isCustomQuoteModalOpen, setIsCustomQuoteModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openSampleModal = () => setIsSampleModalOpen(true);
  const closeSampleModal = () => setIsSampleModalOpen(false);
  const openCustomQuoteModal = () => setIsCustomQuoteModalOpen(true);
  const closeCustomQuoteModal = () => setIsCustomQuoteModalOpen(false);
  
  const handleLogout = async () => {
    await logout();
  };

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
              {customer ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm">Welcome, {customer.name}</span>
                  <Link
                    href="/customer/account"
                    className="border border-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs font-medium shadow-sm transition"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="border cursor-pointer border-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600 text-xs font-medium shadow-sm transition"
                  >
                    Logout
                  </button>
                  <button
                    onClick={openSampleModal}
                    className="bg-[#E21B36] cursor-pointer text-white px-3 py-1 rounded hover:bg-[#c8152d] text-xs font-medium shadow-sm transition"
                  >
                    Request Sample
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/customer/join"
                    className="border border-[#E21B36] text-white px-3 py-1 rounded hover:bg-[#E21B36] text-xs font-medium shadow-sm transition"
                  >
                    Join Us
                  </Link>
                  <Link
                    href="/customer/login"
                    className="border border-[#E21B36] text-white px-3 py-1 rounded hover:bg-[#E21B36] text-xs font-medium shadow-sm transition"
                  >
                    Login
                  </Link>
                  <button
                    onClick={openSampleModal}
                    className="bg-[#E21B36] text-white px-3 py-1 rounded hover:bg-[#c8152d] text-xs font-medium shadow-sm transition"
                  >
                    Request Sample
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header
          className={`w-full transition-all duration-300 ${
            isSticky ? "py-2 bg-[#151134]" : "py-4 px-4 bg-[#151134]"
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
              <MainMenu className="text-white" onOpenCustomQuote={openCustomQuoteModal} />
            </div>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center space-x-4">
  {customer && (
    <div className="flex items-center space-x-3 mr-4">
      <span className="text-sm text-gray-300">Hi, {customer.name}</span>
      <div className="w-px h-4 bg-gray-400"></div>
    </div>
  )}
  <CartIcon />
  <Link
    href="/portfolio"
    className="bg-[#E21B36] text-white px-4 py-2 rounded-lg hover:bg-[#c8152d] transition-colors text-sm font-medium flex items-center justify-center"
    style={{ minHeight: '40px' }} // Add explicit height
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
      <div className="h-[104px] sm:h-[120px] md:h-[110px]"></div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen} 
        toggleMenu={toggleMenu} 
        customer={customer}
        onLogout={handleLogout}
        onRequestSample={openSampleModal}
        onOpenCustomQuote={openCustomQuoteModal} 
      />

      {/* Sample Request Modal */}
      <RequestingSample 
        isOpen={isSampleModalOpen}
        onClose={closeSampleModal}
      />
      
      {/* Custom Quote Modal */}
      <CustomQuote 
        isOpen={isCustomQuoteModalOpen}
        onClose={closeCustomQuoteModal}
      />
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
};

export default Header;