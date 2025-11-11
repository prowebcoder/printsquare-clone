// components/PageBuilder/editors/HeadingEditor.js
const HeadingEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Heading Text</label>
        <input
          type="text"
          value={component.content?.text || ''}
          onChange={(e) => onUpdate(component.id, { text: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Heading text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Heading Level</label>
        <select
          value={component.content?.level || 'h2'}
          onChange={(e) => onUpdate(component.id, { level: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
        </select>
      </div>
    </div>
  );
};

export default HeadingEditor;