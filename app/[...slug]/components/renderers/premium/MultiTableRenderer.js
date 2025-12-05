// app/[...slug]/components/renderers/premium/MultiTableRenderer.js
export default function MultiTableRenderer({ component, index }) {
  const content = component.content || {};
  const tables = content.tables || [];
  const tablesPerRowDesktop = content.tablesPerRowDesktop || 1;
  const tablesPerRowMobile = content.tablesPerRowMobile || 1;

  console.log(`🎨 Rendering MultiTable:`, content);

  // Grid classes based on configuration
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  return (
    <section key={component.id || index} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid ${gridClasses[tablesPerRowMobile]} ${gridClasses[tablesPerRowDesktop]} gap-8`}>
          {tables.map((table, tableIndex) => (
            <div 
              key={tableIndex}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              {/* Table Title */}
              {table.title && (
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-extrabold leading-tight text-gray-900 text-center">
                    {table.title}
                  </h3>
                </div>
              )}

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  {/* Table Headers */}
                  {table.headers && table.headers.length > 0 && (
                    <thead>
                      <tr className="bg-gray-100">
                        {table.headers.map((header, headerIndex) => (
                          <th 
                            key={headerIndex}
                            className="px-6 py-4 text-left text-sm font-extrabold leading-tight text-gray-900 border-b border-gray-200"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  
                  {/* Table Body */}
                  <tbody>
                    {table.rows?.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex}
                        className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        {row.map((cell, cellIndex) => (
                          <td 
                            key={cellIndex}
                            className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {(!table.rows || table.rows.length === 0) && (
                <div className="px-6 py-8 text-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}