"use client";
import React from "react";
import { Wrench, Printer, Layers, Settings } from "lucide-react";

export default function EquipmentList() {
  const equipmentData = [
    {
      title: "Prepress",
      icon: <Wrench className="w-6 h-6 text-cyan-500" />,
      items: [
        "ElecRoc (PDF Workflow)",
        "CTF Tanto 6120",
        "CTP PlateRite 8800Z",
        "Canon iPF8000",
      ],
    },
    {
      title: "Sheet-Fed Press",
      icon: <Printer className="w-6 h-6 text-blue-500" />,
      items: [
        "Komori LS440SP",
        "Komori LS540",
        "Komori LS440",
        "Komori LS240SP",
      ],
    },
    {
      title: "Web-Fed Press",
      icon: <Layers className="w-6 h-6 text-orange-500" />,
      items: [
        "Komori System 38S (50,000 IPH) – 2 Set",
        "Komori System 35S (48,000 IPH) – 2 Set",
      ],
    },
    {
      title: "Finishing",
      icon: <Settings className="w-6 h-6 text-emerald-500" />,
      items: [
        "Stacker Bundler – 6 Set",
        "Muller Martini Bolero Perfect Binding Line – 2 Set",
        "Tener Saddle Stitcher – 2 Set",
        "Heidelberg Stahl Folder KH66 – 3 Set",
        "Polar 115 Paper Cutter – 2 Set",
        "Fuji-Ace Robot Palletizer – 3 Set",
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Our Equipment & Technology
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            We’re powered by precision — from prepress to finishing — equipped with
            cutting-edge machines that ensure top-tier quality and consistency.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipmentData.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 p-8 border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                {section.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm sm:text-base border-l-2 border-gray-200 pl-3 hover:border-cyan-400 hover:text-cyan-600 transition-all duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
