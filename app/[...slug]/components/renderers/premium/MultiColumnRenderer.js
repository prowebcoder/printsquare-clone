// app/[...slug]/components/renderers/premium/MultiColumnRenderer.js
import Link from 'next/link';
import { ArrowRight, Download, ExternalLink, Star, FileArchive } from 'lucide-react';

export default function MultiColumnRenderer({ component, index }) {
  const content = component.content || {};
  const columns = content.columns || [];
  const columnsPerRowDesktop = content.columnsPerRowDesktop || 3;
  const columnsPerRowMobile = content.columnsPerRowMobile || 1;
  const columnGap = content.columnGap || '8'; // Default to gap-8
  
  console.log(`🎨 Rendering MultiColumn:`, content);

  const iconMap = {
    arrow: ArrowRight,
    download: Download,
    external: ExternalLink,
    star: Star,
    file: FileArchive,
  };

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6'
  };

  // Map gap values to Tailwind classes
  const gapClasses = {
    '0': 'gap-0',
    '2': 'gap-2',
    '4': 'gap-4',
    '6': 'gap-6',
    '8': 'gap-8'
  };

  // Map text alignment to Tailwind classes
  const textAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Function to get download URL
  const getDownloadUrl = (fileUrl) => {
    if (!fileUrl) return '';
    
    if (fileUrl.includes('/api/upload?file=')) {
      return fileUrl;
    }
    
    if (fileUrl.includes('/uploads/')) {
      const filename = fileUrl.split('/uploads/')[1];
      return `/api/upload?file=${filename}`;
    }
    
    return fileUrl;
  };

  // Function to extract filename from URL
  const getFileNameFromUrl = (url) => {
    if (!url) return 'download.zip';
    
    if (url.includes('?file=')) {
      const fileParam = url.split('?file=')[1];
      return decodeURIComponent(fileParam.split('&')[0]);
    }
    
    const parts = url.split('/');
    return decodeURIComponent(parts[parts.length - 1]);
  };

  return (
    <section key={component.id || index} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid ${gridClasses[columnsPerRowMobile]} ${gridClasses[columnsPerRowDesktop]} ${gapClasses[columnGap]}`}>
          {columns.map((column, columnIndex) => {
            const IconComponent = column.buttonIcon ? iconMap[column.buttonIcon] : null;
            const downloadUrl = column.buttonFile ? getDownloadUrl(column.buttonFile) : '';
            const fileName = column.buttonFile ? getFileNameFromUrl(column.buttonFile) : '';
            const textAlignment = textAlignmentClasses[column.textAlignment || 'center'];
            
            return (
              <div 
                key={columnIndex}
                className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* Image */}
                {column.image && (
                  <div className="mb-6 w-full">
                    <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={column.image}
                        alt={column.heading || 'Column image'}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`${textAlignment} flex-1 flex flex-col w-full`}>
                  {/* Heading */}
                  {column.heading && (
                    <h3 className="text-xl font-extrabold leading-tight text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {column.heading}
                    </h3>
                  )}
                  
                  {/* Text */}
                  {column.text && (
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {column.text}
                    </p>
                  )}

                  {/* Button */}
                  {column.buttonText && column.buttonText.trim() !== '' && (
                    <div className="mt-auto pt-4">
                      {column.buttonType === 'file' && downloadUrl ? (
                        // File download link
                        <div className={textAlignment === 'text-left' ? '' : textAlignment === 'text-right' ? 'flex justify-end' : 'flex justify-center'}>
                          <a
                            href={downloadUrl}
                            download={fileName}
                            className={`
                              inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200
                              ${column.buttonStyle === 'primary' ? 'shadow-lg hover:shadow-xl' : ''}
                              ${column.buttonStyle === 'secondary' ? 'shadow-sm hover:shadow-md' : ''}
                              ${column.buttonStyle === 'outline' ? 'border-2 bg-transparent hover:bg-opacity-10' : ''}
                              ${column.buttonStyle === 'ghost' ? 'bg-transparent hover:bg-gray-100' : ''}
                            `}
                            style={{
                              ...(column.buttonStyle === 'primary' && {
                                backgroundColor: column.buttonColor || '#3b82f6',
                                color: column.buttonTextColor || '#ffffff',
                              }),
                              ...(column.buttonStyle === 'secondary' && {
                                backgroundColor: column.buttonColor || '#6b7280',
                                color: column.buttonTextColor || '#ffffff',
                              }),
                              ...(column.buttonStyle === 'outline' && {
                                borderColor: column.buttonColor || '#3b82f6',
                                color: column.buttonColor || '#3b82f6',
                                backgroundColor: 'transparent',
                              }),
                              ...(column.buttonStyle === 'ghost' && {
                                color: column.buttonColor || '#3b82f6',
                                backgroundColor: 'transparent',
                              }),
                            }}
                          >
                            {column.buttonText}
                            {IconComponent && <IconComponent size={16} />}
                          </a>
                        </div>
                      ) : (
                        // Regular link button
                        <div className={textAlignment === 'text-left' ? '' : textAlignment === 'text-right' ? 'flex justify-end' : 'flex justify-center'}>
                          <Link
                            href={column.buttonLink || '#'}
                            target={column.buttonLink?.startsWith('http') ? '_blank' : '_self'}
                            rel={column.buttonLink?.startsWith('http') ? 'noopener noreferrer' : ''}
                            className={`
                              inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200
                              ${column.buttonStyle === 'primary' ? 'shadow-lg hover:shadow-xl' : ''}
                              ${column.buttonStyle === 'secondary' ? 'shadow-sm hover:shadow-md' : ''}
                              ${column.buttonStyle === 'outline' ? 'border-2 bg-transparent hover:bg-opacity-10' : ''}
                              ${column.buttonStyle === 'ghost' ? 'bg-transparent hover:bg-gray-100' : ''}
                            `}
                            style={{
                              ...(column.buttonStyle === 'primary' && {
                                backgroundColor: column.buttonColor || '#3b82f6',
                                color: column.buttonTextColor || '#ffffff',
                              }),
                              ...(column.buttonStyle === 'secondary' && {
                                backgroundColor: column.buttonColor || '#6b7280',
                                color: column.buttonTextColor || '#ffffff',
                              }),
                              ...(column.buttonStyle === 'outline' && {
                                borderColor: column.buttonColor || '#3b82f6',
                                color: column.buttonColor || '#3b82f6',
                                backgroundColor: 'transparent',
                              }),
                              ...(column.buttonStyle === 'ghost' && {
                                color: column.buttonColor || '#3b82f6',
                                backgroundColor: 'transparent',
                              }),
                            }}
                          >
                            {column.buttonText}
                            {IconComponent && <IconComponent size={16} />}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}