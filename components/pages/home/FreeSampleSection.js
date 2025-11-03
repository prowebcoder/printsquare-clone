//components/pages/home/FreeSampleSection.js
"use client";
import Image from "next/image";

export default function FreeSampleSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eaf4ff]">
      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2 order-2 lg:order-1 relative group">
          <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src="/homepage/main-sec07-1.jpg"
              alt="Book sample showcase"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-[#2e6e97]/20 rounded-full blur-2xl"></div>
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Free <span className="text-[#e21b36]">Sample Service</span>
          </h2>

          <div className="space-y-5 text-gray-600 text-lg mb-10">
            <p>
              Curious about the <strong>paper texture</strong> or{" "}
              <strong>print quality</strong> before ordering? Experience it
              yourself with our free sample service.
            </p>

            <p>
              Just share your preferred book type, paper, and contact details —
              and we’ll send you a <strong>sample book</strong> to help you make
              the best choice.
            </p>

            <p>
              Build your trust with Print Seoul — where quality meets precision.
            </p>
          </div>

          {/* Button */}
          <a
            href="mailto:support@printsquare.net"
            className="inline-block bg-[#e21b36] hover:bg-[#068180] text-white font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            Request a Free Sample
          </a>

          {/* Email Info */}
          <div className="mt-6 text-gray-700 text-sm">
            <span className="mr-2">Or email us directly at</span>
            <a
              href="mailto:support@printseoul.net"
              className="text-[#2e6e97] hover:underline font-medium"
            >
              support@printseoul.net
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
