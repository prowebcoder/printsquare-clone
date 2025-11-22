// app/[...slug]/components/renderers/basic/TextRenderer.js
export default function TextRenderer({ component, index }) {
  const content = component.content || {};
  
  // If no content, don't render anything
  if (!content.content) {
    return null;
  }

  // Build class names dynamically
  const textClasses = [
    content.textSize || 'text-base',
    content.fontWeight || 'font-normal',
    content.alignment || 'text-left',
    content.lineHeight || 'leading-normal',
    content.width || 'max-w-none',
    content.padding || 'p-6',
    content.margin || 'my-4',
    'mx-auto w-full'
  ].filter(Boolean).join(' ');

  return (
    <div 
      key={component.id || index}
      className={textClasses}
      style={{ 
        color: content.textColor || '#374151',
        backgroundColor: content.backgroundColor || 'transparent'
      }}
    >
      {content.content.split('\n').map((line, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {line}
        </p>
      ))}
    </div>
  );
}