//components/pages/home/ImagesWithText.js
"use client";
import Image from "next/image";

export default function ImagesWithText() {
  return (
    <section className="relative bg-gradient-to-br from-[#f5f1ed] via-[#e7dfd7] to-[#f5f1ed] py-20 overflow-hidden">
      {/* Decorative background blur circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#2e6e97]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-24">

        {/* === Top Section === */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-14">
          {/* Left Images */}
          <div className="flex flex-col gap-6 md:w-1/2">
            {["/homepage/main-sec08-1.jpg", "/homepage/main-sec08-2.jpg"].map(
              (src, index) => (
                <div
                  key={index}
                  className="relative w-full h-64 md:h-72 overflow-hidden rounded-2xl shadow-lg group"
                >
                  <Image
                    src={src}
                    alt={`Delivery option ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )
            )}
          </div>

          {/* Right Text */}
          <div className="md:w-1/2 text-[#1a1a1a]">
            <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-6">
              We provide <br />
              <span className="text-[#2e6e97]">
                specialized delivery services
              </span>{" "}
              <br />
              for a fast & safe process.
            </h2>

            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Printsquare offers flexible delivery options. For urgent orders,
              choose <strong>Air Express</strong>. For bulk or cost-saving
              shipping, select <strong>Ocean Freight</strong>.
            </p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              You can choose the shipping method and quantity to suit your
              needs, with live tracking updates throughout the delivery process.
            </p>

            <ul className="border-t border-gray-400 divide-y divide-gray-300 text-base text-gray-700">
              <li className="py-3">Air & Ocean shipping available</li>
              <li className="py-3">Partial shipment options</li>
              <li className="py-3">Direct mailing service</li>
              <li className="py-3">Dedicated issue handling support</li>
            </ul>
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14">
          {/* Left Text */}
          <div className="md:w-1/2 text-[#1a1a1a]">
            <h2 className="text-3xl lg:text-4xl font-bold leading-snug mb-6">
              Printsquare assists you <br />
              <span className="text-[#2e6e97]">every step of the way.</span>
            </h2>

            <p className="text-base text-gray-700 leading-relaxed mb-4">
              From order to delivery, Printsquare ensures a seamless experience.
              Our print experts provide <strong>file proofing</strong> and
              continuous <strong>status updates</strong> for your peace of mind.
            </p>

            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Our support team is always available to resolve any issues such as
              delivery loss or product damage, promptly and professionally.
            </p>

            <ul className="border-t border-gray-400 divide-y divide-gray-300 text-base text-gray-700">
              <li className="py-3">Layout guides & tutorials</li>
              <li className="py-3">File proofing service</li>
              <li className="py-3">Delivery tracking notifications</li>
              <li className="py-3">Product issue resolution</li>
              <li className="py-3">Dedicated delivery issue support</li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 relative group">
            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="/homepage/main-sec09-1.jpg"
                alt="Customer support team"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
