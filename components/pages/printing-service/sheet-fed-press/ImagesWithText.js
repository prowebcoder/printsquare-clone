"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ImagesWithText() {
  const sections = [
    {
      id: 1,
      image: "/printing-service/sub1-02-1.png",
      title: "A Very High Quality",
      text: `With a sheet-fed press, individual sheets of paper are fed one at a time.
      The process is relatively slow but facilitates accurate adjustments, since it allows
      a print technician to run a few preliminary sheets to fine-tune the registration,
      color and other quality factors. It also allows for a wider variety of paper types
      to be used than a web press can accommodate.
      Sheet-fed presses are great for short- to medium-run printing, and the end result
      is typically a very high-quality product.`,
      reverse: false,
    },
    {
      id: 2,
      image: "/printing-service/sub1-02-2.png",
      title: "Extensive Lineup",
      text: `Using our extensive lineup of custom sheet-fed, roll-to-sheet and
      variable insert presses, we can produce a wide array of imaginative
      and unique pieces that fit your marketing and budget goals, but
      don't necessarily fit the product profile or run-length capabilities
      of most printers.`,
      reverse: true,
    },
    {
      id: 3,
      image: "/printing-service/sub1-02-3.png",
      title: "A Variety Of Print Works",
      text: `As a one-stop shop, you can use our custom presses to print everything from
      niche catalogs, brochures, annual reports and direct mail pieces to very specific job
      components for your catalog or magazine, including customized inserts, covers,
      coatings.`,
      reverse: false,
    },
    {
      id: 4,
      image: "/printing-service/sub1-02-4.png",
      title: "Seamless Service",
      text: `Consider the conveniences: a tighter schedule, no shipping or freight
      cost between facilities, and seamless service from customer support
      through printing, finishing and delivery.`,
      reverse: true,
    },
  ];

  return (
    <section className="bg-white py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-24">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
