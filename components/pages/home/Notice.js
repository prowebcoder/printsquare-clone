//components/pages/home/Notice.js
"use client";
import Link from "next/link";
import { Megaphone } from "lucide-react";

const Notice = () => {
  const notices = [
    {
      title: "[Update] Notice on Delivery and Tariffs",
      desc: "At Print Seoul, all shipments are handled on a door-to-door basis unless customers specifically request a different delivery option. This ensures that your order will arrive directly at the ...",
      date: "09.24.2025",
    },
    {
      title: "[Update] Print Seoul's Homepage has been RE-DESIGNED!",
      desc: "Dear Client, Print Seoul has re-formed the homepage to make it more convenient for clients to place an order and easier to understand the advantages of PrintSquare. We pr...",
      date: "08.23.2023",
    },
  ];

  return (
    <section className="bg-[#FAFAFA] py-20 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3">
            <Megaphone className="w-8 h-8 text-[#E21B36]" />
            Latest Notices
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Notice Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {notices.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-transparent hover:bg-gradient-to-r hover:from-[#FFE3E5] hover:to-[#FFF0E5] transition duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {item.desc}
              </p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link
            href="#"
            className="inline-block bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition duration-300"
          >
            View All Notices
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Notice;
