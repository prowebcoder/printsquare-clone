"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000); // popup after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative bg-[#e8dfd5] text-[#3b2f2f] w-[90%] max-w-md rounded-2xl shadow-2xl p-8">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-[#3b2f2f] hover:text-black"
        >
          ✕
        </button>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/homepage/logo.png"
            alt="Popup Illustration"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold mb-3">
          Let’s choose <span className="text-[#2a1810] font-bold">Print Seoul</span> <br />
          as your new printing partner!
        </h2>

        <div className="border-t border-[#b89c85] my-4"></div>

        {/* Description */}
        <p className="text-center text-sm leading-relaxed mb-4">
          Want to print your project for the first time? <br />
          Looking for a reliable printing partner in Korea? <br /><br />
          <b>Print Seoul</b> provides premium quality printing, professional finishing, and
          customized packaging — all at affordable prices.
        </p>

        <p className="text-center text-sm leading-relaxed mb-6">
          Join us now and enjoy a <b>10% discount</b> on your first order!
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#2a1810] text-white px-8 py-2 rounded-full hover:bg-[#3b2317] transition"
          >
            JOIN US
          </button>
        </div>

        {/* Checkbox */}
        <div className="flex items-center justify-center mt-4 text-xs">
          <input type="checkbox" id="popup-disable" className="mr-2" />
          <label htmlFor="popup-disable">
            Don’t show this popup again for a week.
          </label>
        </div>
      </div>
    </div>
  );
};

export default Popup;
