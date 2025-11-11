// components/PageBuilder/editors/TextEditor.js
const TextEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Content</label>
      <textarea
        value={component.content?.content || ''}
        onChange={(e) => onUpdate(component.id, { content: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Enter your text..."
      />
    </div>
  );
};

export default TextEditor;