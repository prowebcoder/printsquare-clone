"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const QuickGuides = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#fdfcf8] to-[#f5f2ee] py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-10 right-10 w-56 h-56 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-6 lg:px-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2 relative group">
          <div className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]">
            <Image
              src="/homepage/main-quick-1.jpg"
              alt="Quick Guide"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#2e6e97]/20 rounded-full blur-2xl"></div>
        </div>

        {/* Right Text & Cards */}
        <div className="w-full md:w-1/2 text-[#1a1a1a]">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight">
            Quick <span className="text-[#2e6e97]">Guides</span>
          </h2>

          <div className="space-y-6">
            {[
              { title: "Tips For Page Layout", href: "#" },
              { title: "Bleed & Trimming Line", href: "#" },
              { title: "Paper Selection", href: "#" },
              { title: "Download Print-Ready Sample File", href: "#" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex justify-between items-center p-5 bg-gradient-to-r from-white to-[#f0f4f8] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#2e6e97]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#2e6e97] font-extrabold text-xl">{`0${idx + 1}`}</span>
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-[#2e6e97]">
                    {item.title}
                  </span>
                </div>
                <ArrowRight
                  size={22}
                  className="text-gray-400 group-hover:text-[#2e6e97] transition-transform duration-300 group-hover:translate-x-3"
                />
              </Link>
            ))}
          </div>

          <p className="mt-10 text-gray-700 text-sm md:text-base leading-relaxed max-w-lg">
            Learn essential printing tips, layout guidelines, and professional insights to help you prepare your perfect print-ready files efficiently and accurately.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickGuides;
