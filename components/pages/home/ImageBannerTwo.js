"use client";
import Image from "next/image";

export default function ImageBannerTwo() {
  return (
    <section className="relative bg-gradient-to-r from-[#008281] via-[#32a8b9] to-[#0da5da] py-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] w-[28rem] h-[28rem] bg-[#ffffff1a] rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12 relative z-10">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left text-white" data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Special Order <span className="text-yellow-300">Available</span>
          </h2>

          <p className="text-lg mb-4 leading-relaxed text-white/90">
            Would you like to make a special book other than the quote we provide?  
            Don’t worry — we’ve got you covered.
          </p>

          <p className="text-lg mb-4 leading-relaxed text-white/90">
            Describe the book you want using the{" "}
            <span className="font-semibold text-yellow-300">Custom Quote</span>.
            Our printing experts at Print Seoul will bring your idea to life.
          </p>

          <p className="text-lg mb-8 leading-relaxed text-white/90">
            Want to create your own special edition book?
          </p>

          <button className="relative overflow-hidden bg-white text-[#2e6e97] font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-300 group">
            <span className="relative z-10">Go to Custom Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#e0efff] to-[#bde0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
            <Image
              src="/homepage/main-sec06-1.png"
              alt="High-quality paper"
              width={650}
              height={400}
              className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20 text-white"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.71,22,98.14,29.08,146.72,17.39C230.75,49,284,8.22,339.33,1.36,389-4.62,437.7,14,487.11,25.31c55,12.75,112.09,14.11,167.73,3.77,49-9.08,95.83-27.35,146.46-35.74,48.53-8.06,99.46-6.66,145.83,9.11,41.35,14,78.24,38.86,120.45,49.86C1122.42,66.33,1161.74,67,1200,63.52V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
} 