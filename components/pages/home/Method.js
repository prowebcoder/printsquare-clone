"use client";
import Image from "next/image";
import React from "react";

const Method = () => {
  return (
    <section className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-[#E21B36]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0B1633]">
            Selectable{" "}
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              Proof Method
            </span>
          </h2>
          <p className="text-[#2E3850] max-w-2xl mx-auto text-lg">
            Choose from two professional proofing methods that ensure accuracy
            and efficiency for every project.
          </p>
        </div>

        {/* Proof Methods */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* E-Proof */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#E21B36] transition-all duration-300 border border-[#D6D9E0]">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                01
              </span>
              <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#E21B36] transition-colors">
                E-Proof
              </h3>
            </div>
            <p className="text-[#2E3850] leading-relaxed text-base">
              Proceed with proofing through a digital proof file. It’s{" "}
              <span className="font-medium text-[#E21B36]">free</span>, fast,
              and perfect for quick approvals.
            </p>
          </div>

          {/* Digital-Proof */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-[#FF4B2B] transition-all duration-300 border border-[#D6D9E0]">
            <div className="flex items-center mb-5">
              <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-bold px-4 py-2 rounded-full mr-3 text-sm">
                02
              </span>
              <h3 className="text-2xl font-semibold text-[#0B1633] group-hover:text-[#FF4B2B] transition-colors">
                Digital-Proof
              </h3>
            </div>
            <p className="text-[#2E3850] leading-relaxed text-base">
              Get a printed version of your uploaded file for review. You’ll see
              the actual proof quality — though it requires extra{" "}
              <span className="font-medium text-[#FF4B2B]">time and cost</span>.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/homepage/main-sec05-1.jpg"
            alt="Selectable Proof Method"
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1633]/40 to-transparent rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Method;
