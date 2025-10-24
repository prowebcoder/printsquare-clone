"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const QuickGuides = () => {
  return (
    <section className="relative bg-[#F8F9FB] py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-10 right-10 w-56 h-56 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

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
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#E21B36]/20 rounded-full blur-2xl"></div>
        </div>

        {/* Right Text & Cards */}
        <div className="w-full md:w-1/2 text-[#0B1633]">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight">
            Quick <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">Guides</span>
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
                className="group flex justify-between items-center p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#2E3850] hover:border-[#E21B36]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#E21B36] font-extrabold text-xl">{`0${idx + 1}`}</span>
                  <span className="font-semibold text-[#0B1633] text-lg group-hover:text-[#E21B36]">
                    {item.title}
                  </span>
                </div>
                <ArrowRight
                  size={22}
                  className="text-[#2E3850] group-hover:text-[#E21B36] transition-transform duration-300 group-hover:translate-x-3"
                />
              </Link>
            ))}
          </div>

          <p className="mt-10 text-[#2E3850] text-sm md:text-base leading-relaxed max-w-lg">
            Learn essential printing tips, layout guidelines, and professional insights to help you prepare your perfect print-ready files efficiently and accurately.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickGuides;
