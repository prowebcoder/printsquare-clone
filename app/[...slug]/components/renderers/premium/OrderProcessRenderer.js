// app/[...slug]/components/renderers/premium/OrderProcessRenderer.js
import AppImage from "../../AppImage";

export default function OrderProcessRenderer({ component, index }) {
  const content = component.content || {};
  console.log(`🎨 Rendering OrderProcess:`, content);
  
  return (
    <section
      key={component.id || index}
      className="bg-[#F8F9FB] py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative blurred background circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1633] mb-3">
            <span className="bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] bg-clip-text text-transparent">
              {content.title?.split(" ")[0] || "Order"}
            </span>{" "}
            {content.title?.split(" ").slice(1).join(" ") || "Process"}
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] mx-auto rounded-full mb-4"></div>
          <p className="mt-4 text-[#2E3850] max-w-2xl mx-auto text-lg md:text-base">
            {content.description ||
              "Follow our simple 8-step process to get your printing done efficiently and hassle-free."}
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          {/* Connecting gradient line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-2">
            <div className="w-full h-2 bg-gradient-to-r from-[#E21B36] to-[#FF4B2B] rounded-full"></div>
          </div>

          {(content.steps || []).map((step, stepIndex) => (
            <div
              key={stepIndex}
              className="flex flex-col items-center text-center relative group transform transition duration-300 hover:scale-105 z-10"
            >
              {/* Step number circle */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E21B36] to-[#FF4B2B] text-white font-bold text-xl flex items-center justify-center shadow-2xl mb-4 z-10">
                {step.id || stepIndex + 1}
              </div>

              {/* Step image */}
              <div className="w-36 h-24 relative mb-3 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <AppImage
                  src={step.image}
                  alt={step.title}
                  width={144}
                  height={96}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Step text */}
              <h3 className="font-semibold text-[#0B1633] text-base md:text-sm mb-1">
                {step.title}
              </h3>
              <p className="text-[#2E3850] text-xs md:text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}