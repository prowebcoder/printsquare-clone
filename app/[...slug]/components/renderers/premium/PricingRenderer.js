// app/[...slug]/components/renderers/premium/PricingRenderer.js
import AppImage from "../../AppImage";

export default function PricingRenderer({ component, index }) {
  const content = component.content || {};
  
  // Check if there's any content to show
  const hasContent = content.title || 
                    content.highlightedTitle || 
                    content.description1 || 
                    content.description2 || 
                    content.sampleTitle ||
                    content.specifications?.length > 0 ||
                    content.tables?.length > 0;

  // If no content, don't render anything
  if (!hasContent) {
    return null;
  }

  // Determine background style
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'solid':
        return { backgroundColor: content.backgroundColor || '#111827' };
      case 'gradient':
        return { 
          background: `linear-gradient(to bottom, ${content.gradientFrom || '#111827'}, ${content.gradientTo || '#000000'})` 
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <section
      key={component.id || index}
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Background Glow Elements - Only show if not using gradient background */}
      {content.backgroundType !== 'gradient' && (
        <>
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#E21B36]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF4B2B]/10 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Title - Only show if title or highlightedTitle exists */}
        {(content.title || content.highlightedTitle) && (
          <div className="text-center mb-16">
            <h2 
              className={`font-extrabold mb-8 leading-tight ${content.titleSize || 'text-4xl md:text-5xl'}`}
              style={{ color: content.titleColor || '#FFFFFF' }}
            >
              {content.title || 'Affordable Printing'}{' '}
              {content.highlightedTitle && (
                <span style={{ color: content.highlightedColor || '#E21B36' }}>
                  {content.highlightedTitle}
                </span>
              )}
            </h2>
          </div>
        )}

        {/* Description - Only show if exists */}
        {(content.description1 || content.description2) && (
          <div className="space-y-6 text-lg mb-16 max-w-3xl mx-auto leading-relaxed text-center">
            {content.description1 && (
              <p style={{ color: content.titleColor || '#FFFFFF' }}>{content.description1}</p>
            )}
            {content.description2 && (
              <p style={{ color: content.titleColor || '#FFFFFF' }}>{content.description2}</p>
            )}
          </div>
        )}

        {/* Sample Specification Box - Only show if sampleTitle exists */}
        {content.sampleTitle && (
          <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-3xl p-10 max-w-lg mx-auto shadow-2xl relative mb-16">
            <div 
              className="absolute top-0 left-0 w-full h-1 rounded-t-3xl"
              style={{
                background: `linear-gradient(to right, ${content.stepGradientFrom || '#E21B36'}, ${content.stepGradientTo || '#FF4B2B'})`
              }}
            />
            <h3 className="text-2xl font-bold mb-8 text-white tracking-wide text-center">
              {content.sampleTitle}
            </h3>

            {/* Specifications - Only show if they exist */}
            {content.specifications && content.specifications.length > 0 && (
              <div className="space-y-5 text-left">
                {content.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-700 pb-3"
                  >
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pricing Tables - Only show if tables exist */}
        {content.tables && content.tables.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {content.tables.map((table, tableIndex) => (
              <div key={tableIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Table Header */}
                <div 
                  className="p-4 text-center"
                  style={{
                    backgroundColor: table.headerBgColor || '#E21B36',
                    color: table.headerTextColor || '#FFFFFF'
                  }}
                >
                  <h3 className="font-bold text-lg">{table.title}</h3>
                </div>
                
                {/* Table Body */}
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th 
                          className="text-left p-2 font-semibold"
                          style={{ color: table.bodyTextColor || '#0B1633' }}
                        >
                          Quantity
                        </th>
                        <th 
                          className="text-left p-2 font-semibold"
                          style={{ color: table.bodyTextColor || '#0B1633' }}
                        >
                          Price
                        </th>
                        <th 
                          className="text-left p-2 font-semibold"
                          style={{ color: table.bodyTextColor || '#0B1633' }}
                        >
                          Price/Copy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b last:border-b-0">
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex}
                              className="p-2"
                              style={{ color: table.bodyTextColor || '#0B1633' }}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Notes - Only show if they exist */}
        <div className="text-center space-y-4">
          {content.footerNote && (
            <p className="text-gray-400 text-sm italic max-w-2xl mx-auto">
              {content.footerNote}
            </p>
          )}
          
          {content.currencyNote && (
            <p className="text-gray-500 text-sm font-semibold">
              {content.currencyNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}