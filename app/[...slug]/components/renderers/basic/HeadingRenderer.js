// app/[...slug]/components/renderers/basic/HeadingRenderer.js
export default function HeadingRenderer({ component, index }) {
  const content = component.content || {};

  if (!content.text) return null;

  const HeadingTag = content.level || 'h2';

  // Build class names dynamically + add fixed classes
  const headingClasses = [
    content.fontSize || 'text-4xl',
    content.fontWeight || 'font-bold',
    content.alignment || 'text-center',
    content.lineHeight || 'leading-normal',
    content.margin || 'my-6',
    content.padding || 'p-6',

    // --- ADD THESE ---
    "font-extrabold",
    "leading-tight"
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <HeadingTag
      key={component.id || index}
      className={headingClasses}
      style={{
        color: content.textColor || '#1F2937',
        backgroundColor: content.backgroundColor || 'transparent'
      }}
    >
      {content.text}
    </HeadingTag>
  );
}
