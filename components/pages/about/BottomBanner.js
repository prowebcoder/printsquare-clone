//components/pages/about/BottomBanner.js
import Image from "next/image";

export default function BottomBanner() {
  return (
    <section className="bg-gradient-to-r from-[#E21B36] via-[#FF4B2B] to-[#E21B36] pt-16 pb-0 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started
          </h2>
          <p className="text-base mb-4 leading-relaxed">
            Create a free Print Seoul account today to self-publish your book and have your book 
            printed for you, a friend, or readers all over the world.
          </p>

          <button className="bg-white text-[#E21B36] font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300">
            Create A Free Account
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/homepage/bottom-banner.png"
            alt="Get Started with Print Seoul"
            width={650}
            height={400}
            className="object-contain"
          />
        </div>
      </div>

      {/* Decorative Blur Circle */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
