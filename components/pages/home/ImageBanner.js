import Image from "next/image";

export default function ImageBanner() {
  return (
    <section className="bg-[#0B1633] pt-16 pb-0 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect Paper Match!
          </h2>
          <p className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
            Print Seoul gives you 19 high-quality paper choices,
            each designed to make your book stand out with style and substance.
          </p>
          <p className="text-base mb-4 leading-relaxed text-[#D6D9E0]">
            Bring your imagination to life and design a book that truly reflects your style.
          </p>
          <p className="text-base mb-6 leading-relaxed text-[#D6D9E0]">
            Explore Our Premium Paper Collection
          </p>

          <button className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] text-white font-semibold py-2 px-6 rounded-sm hover:opacity-90 transition-all duration-300">
            Click Me!
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/homepage/paper.png"
            alt="High-quality paper"
            width={650}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
