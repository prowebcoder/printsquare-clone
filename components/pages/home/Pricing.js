//components/pages/home/Pricing.js
"use client";

export default function Pricing() {
  return (
    <section className="bg-gradient-to-b from-[#faf8f5] to-[#f2ede7] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,#0B1633,transparent_70%)]" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {/* Left Section */}
        <div data-aos="fade-right" className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Affordable Printing <span className="text-[#0B1633]">Prices</span>
          </h2>
          <p className="text-gray-700 mb-3 text-lg">
            At Print Seoul, we bring your ideas to life with top-quality book
            printing powered by cutting-edge technology and fair pricing.
          </p>
          <p className="text-gray-700 mb-6 text-lg">
            Experience premium materials, sharp detail, and a flawless finish
            perfect for professionals, authors, and brands.
          </p>
        </div>

        {/* Right Section - Sample Specification */}
        <div
          data-aos="fade-left"
          className="flex flex-col justify-center items-end"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border-r-8 border-[#0B1633] max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#0B1633] mb-5">
              Sample Specification
            </h3>
            <ul className="space-y-3 text-gray-700">
              {[
                { label: "Size", value: `8.5&quot; × 11&quot;` },
                { label: "Binding", value: "Perfect Binding" },
                { label: "Cover", value: "250gsm Gloss, Full Color" },
                { label: "Inside Pages", value: "110gsm Gloss, Full Color" },
                { label: "Page Count", value: "100" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-[#0B1633] rounded-full flex-shrink-0"></span>
                  <strong>{item.label}:</strong> {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="max-w-7xl mx-auto mt-20 relative z-10">
        <p className="text-right text-sm text-gray-600 mb-3">
          <span className="italic">Standard currency:</span> USD
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Company A */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className="bg-[#FF4B2B] text-white font-semibold text-center py-3 uppercase tracking-wide">
              Company &quot;A&quot;
            </div>
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead className="bg-[#f9f8f7] text-gray-800">
                <tr>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Price/Copy</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {[
                  ["1,000 copies", "$8,201", "$8.2"],
                  ["5,000 copies", "$39,645", "$7.93"],
                  ["10,000 copies", "$75,000", "$7.5"],
                  ["50,000 copies", "$360,000", "$7.2"],
                  ["100,000 copies", "$710,000", "$7.1"],
                ].map(([q, p, pc], i) => (
                  <tr
                    key={i}
                    className="bg-[#fafafa] hover:bg-[#f2f7fa] transition rounded-lg shadow-sm"
                  >
                    <td className="p-3 rounded-l-lg">{q}</td>
                    <td className="p-3">{p}</td>
                    <td className="p-3 rounded-r-lg">{pc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Print Seoul - Featured */}
          <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border-2 border-[#0B1633] scale-105 transform transition-all hover:scale-110 hover:shadow-2xl">
            <div className="bg-[#0B1633] text-white font-bold text-center py-3 uppercase tracking-wide">
              Print Seoul
            </div>
            <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold text-gray-800 px-3 py-1 rounded-full shadow">
              Best Value
            </div>
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead className="bg-[#e9f3fa] text-[#0B1633] font-semibold">
                <tr>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Price/Copy</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {[
                  ["1,000 copies", "$3,050", "$3.05"],
                  ["5,000 copies", "$7,220", "$1.44"],
                  ["10,000 copies", "$12,460", "$1.25"],
                  ["50,000 copies", "$58,730", "$1.17"],
                  ["100,000 copies", "$116,010", "$1.16"],
                ].map(([q, p, pc], i) => (
                  <tr
                    key={i}
                    className="bg-[#fafdff] hover:bg-[#eaf6ff] transition rounded-lg shadow-sm"
                  >
                    <td className="p-3 rounded-l-lg">{q}</td>
                    <td className="p-3 font-semibold text-[#0B1633]">{p}</td>
                    <td className="p-3 rounded-r-lg">{pc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Company D */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className="bg-[#FF4B2B] text-white font-semibold text-center py-3 uppercase tracking-wide">
              Company &quot;D&quot;
            </div>
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead className="bg-[#f9f8f7] text-gray-800">
                <tr>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Price/Copy</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {[
                  ["1,000 copies", "$6,061", "$6.06"],
                  ["5,000 copies", "$30,303", "$6.06"],
                  ["10,000 copies", "$57,000", "$5.7"],
                  ["50,000 copies", "$285,000", "$5.7"],
                  ["100,000 copies", "$570,000", "$5.7"],
                ].map(([q, p, pc], i) => (
                  <tr
                    key={i}
                    className="bg-[#fafafa] hover:bg-[#f2f7fa] transition rounded-lg shadow-sm"
                  >
                    <td className="p-3 rounded-l-lg">{q}</td>
                    <td className="p-3">{p}</td>
                    <td className="p-3 rounded-r-lg">{pc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-600 mt-6 italic text-center md:text-left">
          * For bulk orders, we recommend Ocean shipping / Split delivery to
          enjoy lower delivery costs.
        </p>
      </div>
    </section>
  );
}
