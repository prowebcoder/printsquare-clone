import Image from "next/image";

export default function BottomBanner() {
  return (
    <section className="bg-[#00968e] pt-16 pb-0 px-6 md:px-12">
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

          <button className="bg-white text-[#ae998a] font-semibold py-2 px-6 rounded-sm hover:bg-gray-100 transition-all">
            Create A Free Account
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/homepage/bottom-banner.png"
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
