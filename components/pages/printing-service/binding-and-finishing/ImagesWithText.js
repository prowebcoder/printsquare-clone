//components/pages/printing-service/binding-and-finishing/ImagesWithText.js
"use client";
import Image from "next/image";
import React from "react";

export default function ImagesWithText() {
  return (
    <section className="w-full bg-white text-gray-800">
      {/* 1️⃣ Section: Finishing Options Overview */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-04-1.jpg"
            alt="Finishing Options"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            We offer various finishings and specialty printings.
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            We have a wide range of advanced finishing equipment, including
            state-of-the-art saddle stitchers and perfect binders, to ensure
            flawless presentation.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 text-base">
            <li>• Saddle stitched binding</li>
            <li>• Perfect binding</li>
            <li>• PUR perfect binding</li>
            <li>• Metallics, fluorescents, PMS colors</li>
            <li>• Lamination with multiple film types</li>
            <li>• Hot foil stamping (silver, gold, blue, red…)</li>
            <li>• Hole punching (6mm–9.5mm)</li>
            <li>• Multiple folding options</li>
            <li>• UV inks and coatings</li>
            <li>• Spiral binding</li>
            <li>• Embossing & die cutting</li>
            <li>• Shrink wrapping</li>
          </ul>
        </div>
      </div>

      <hr className="border-t border-gray-200 max-w-6xl mx-auto" />

      {/* 2️⃣ Section: Saddle Stitching */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-05-1.png"
            alt="Saddle Stitching"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900">
            Saddle Stitching
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Saddle-stitching is ideal for self-cover projects, lighter paper
            weights, or small page counts. Pages are stapled through the spine’s
            centerfold, creating a clean, professional finish for catalogs and
            thin magazines.
          </p>
          <Image
            src="/printing-service/sub1-05-1-1.png"
            alt="Saddle Stitch Detail"
            width={500}
            height={300}
            className="rounded-xl shadow"
          />
        </div>
      </div>

      {/* 3️⃣ Section: Perfect Binding */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <div>
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              Perfect Binding
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Perfect binding glues all pages to the spine of a trimmed cover,
              resulting in a smooth, professional look. It’s the best choice for
              thick magazines, premium catalogs, and publications requiring a
              luxurious feel.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-05-2.png"
            alt="Perfect Binding"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
      </div>

      {/* 4️⃣ Section: PUR Perfect Binding */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-05-3.png"
            alt="PUR Perfect Binding"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900">
            PUR Perfect Binding
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            PUR adhesive provides the strongest and most flexible bond
            available. Publications bound with PUR open flat and maintain
            durability even after frequent use — ideal for thick, long-lasting
            magazines.
          </p>
        </div>
      </div>

      {/* 5️⃣ Section: Spiral Binding */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <div>
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              Spiral Binding
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Spiral binding uses a continuous wire coil looped through evenly
              punched holes. It allows pages to lay flat or fold back completely,
              making it ideal for manuals, cookbooks, notebooks, and calendars.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-05-4.png"
            alt="Spiral Binding"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
      </div>

      <hr className="border-t border-gray-200 max-w-6xl mx-auto" />

      {/* 6️⃣ Section: Print Coating Overview */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-05-5.png"
            alt="Print Coating"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900">
            Print Coating
          </h3>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Coatings protect printed pages from moisture, wear, and scratches,
            while enhancing visual appeal. We offer overprint varnish, aqueous
            coating, lamination, and UV coating — each available in matte, satin,
            or gloss finishes.
          </p>
        </div>
      </div>

      {/* 7️⃣ Section: Foil, Emboss, Die Cutting */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-20 px-6">
        <div className="w-full md:w-1/2">
          <div>
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              Foil Stamping
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Add elegance with non-tarnishing metallic foil finishes such as
              gold, silver, or pearl. Available in various textures and patterns
              for premium branding.
            </p>

            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Embossing
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Embossing raises design elements for a tactile, three-dimensional
              effect. Often paired with foil stamping for a luxurious finish.
            </p>

            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Die Cutting
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Custom die-cut shapes elevate your design with precision and
              creativity — perfect for unique packaging, invitations, or
              brochures.
            </p>

            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Pantone Color
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Pantone (PMS) colors and specialty inks allow exact brand color
              matching and custom effects like metallics, fluorescents, and
              opaque tones.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/printing-service/sub1-05-6.png"
            alt="Foil Stamping & Embossing"
            width={600}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
