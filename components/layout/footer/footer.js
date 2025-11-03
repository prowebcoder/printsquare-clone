// components/layout/footer/footer.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#151134] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/homepage/logo.jpg"
            alt="PrintSquare Logo"
            width={200}
            height={60}
            className="mb-3"
          />
          <div className="flex gap-3 text-sm mb-2">
            <Link
              href="/"
              className="hover:text-[#E21B36] transition-colors duration-200"
            >
              HOME
            </Link>
            <span>|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-[#E21B36] transition-colors duration-200"
            >
              PRIVACY POLICY
            </Link>
            <span>|</span>
            <Link
              href="/terms-conditions"
              className="hover:text-[#E21B36] transition-colors duration-200"
            >
              TERMS & CONDITIONS
            </Link>
          </div>
          <p className="text-xs opacity-80">
            COPYRIGHT © 2020 PRINTSEOUL. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center flex-wrap gap-4 payment-icons">
          <Image
            src="/footer/main-footer-1.png"
            alt="Payment 1"
            width={60}
            height={60}
          />
          <Image
            src="/footer/main-footer-2.png"
            alt="Payment 2"
            width={60}
            height={60}
          />
          <Image
            src="/footer/main-footer-3.png"
            alt="Payment 3"
            width={60}
            height={60}
          />
          <Image
            src="/footer/main-footer-4.png"
            alt="Payment 4"
            width={60}
            height={60}
          />
          <Image
            src="/footer/main-footer-5.png"
            alt="Payment 5"
            width={60}
            height={60}
          />
        </div>
      </div>
    </footer>
  );
}
