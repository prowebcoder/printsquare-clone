// app/[...slug]/components/renderers/basic/HeadingRenderer.js
export default function HeadingRenderer({ component, index }) {
  const content = component.content || {};
  const HeadingTag = content.level || 'h2';
  return (
    <HeadingTag 
      key={component.id || index}
      className="my-6 p-6 text-center text-3xl font-bold text-gray-900"
    >
      {content.text || 'Heading Text'}
    </HeadingTag>
  );
}