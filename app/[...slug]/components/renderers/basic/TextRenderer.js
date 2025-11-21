// app/[...slug]/components/renderers/basic/TextRenderer.js
export default function TextRenderer({ component, index }) {
  const content = component.content || {};
  return (
    <div 
      key={component.id || index}
      className="prose max-w-none mx-auto p-6"
      dangerouslySetInnerHTML={{ 
        __html: (content.content || 'Enter your text here...').replace(/\n/g, '<br>') 
      }}
    />
  );
}