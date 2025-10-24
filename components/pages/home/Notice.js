"use client";
import Link from "next/link";
import { Megaphone } from "lucide-react"; // optional icon

const Notice = () => {
  const notices = [
    {
      title: "[Update] Notice on Delivery and Tariffs",
      desc: "At Print Seoul, all shipments are handled on a door-to-door basis unless customers specifically request a different delivery option. This ensures that your order will arrive directly at the ...",
      date: "09.24.2025",
    },
    {
      title: "[Update] Print Seoul's Homepage has been RE-DESIGNED!",
      desc: "Dear Client, Print Seoul has re-formed the homepage to make it more convenient for clients to place an order and easier to understand the advantages of PrintSquare. We pr...",
      date: "08.23.2023",
    },
  ];

  return (
    <section className="bg-[#26898c] py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide flex items-center justify-center gap-3">
            <Megaphone className="w-8 h-8 text-white" />
            Latest Notices
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Notice Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {notices.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#13a59a]/40 rounded-2xl p-6 hover:bg-[#9a8375]/50 transition duration-300 shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-100 mb-3 leading-relaxed">
                {item.desc}
              </p>
              <p className="text-xs text-gray-300">{item.date}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link
            href="#"
            className="inline-block border border-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-[#7b695b] transition duration-300"
          >
            View All Notices
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Notice;
