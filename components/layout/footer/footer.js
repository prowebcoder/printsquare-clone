"use client";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/homepage/logo.png"
            alt="PrintSquare Logo"
            width={300}
            height={80}
            className="mb-2"
          />
          <div className="flex gap-3 text-sm mb-2">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-white">PRIVACY POLICY</Link>
            <span>|</span>
            <Link href="/terms-conditions" className="hover:text-white">TERMS & CONDITIONS</Link>
          </div>
          <p className="text-xs">
            COPYRIGHT © 2020 PRINTSeoul. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center flex-wrap gap-3">
          <Image src="/footer/main-footer-1.png" alt="Payment 1" width={40} height={40} />
          <Image src="/footer/main-footer-2.png" alt="Payment 2" width={40} height={40} />
          <Image src="/footer/main-footer-3.png" alt="Payment 3" width={40} height={40} />
          <Image src="/footer/main-footer-4.png" alt="Payment 4" width={40} height={40} />
          <Image src="/footer/main-footer-5.png" alt="Payment 5" width={40} height={40} />
        </div>
      </div>
    </footer>
  );
}
