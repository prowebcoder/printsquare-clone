// components/PageBuilder/editors/MethodEditor.js
const MethodEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Main title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Title</label>
        <input
          type="text"
          value={component.content?.highlightedTitle || ''}
          onChange={(e) => onUpdate(component.id, { highlightedTitle: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Highlighted title part"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={component.content?.description || ''}
          onChange={(e) => onUpdate(component.id, { description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Section description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          value={component.content?.image || ''}
          onChange={(e) => onUpdate(component.id, { image: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Image URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
        <input
          type="text"
          value={component.content?.imageAlt || ''}
          onChange={(e) => onUpdate(component.id, { imageAlt: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Image alt text"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h4 className="font-medium mb-3">Method 1</h4>
          <div className="space-y-2">
            <input
              type="text"
              value={component.content?.method1?.title || ''}
              onChange={(e) => onUpdate(component.id, { 
                method1: { ...component.content?.method1, title: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Method 1 title"
            />
            <textarea
              value={component.content?.method1?.description || ''}
              onChange={(e) => onUpdate(component.id, { 
                method1: { ...component.content?.method1, description: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Method 1 description"
            />
          </div>
        </div>
        <div className="border p-4 rounded-lg">
          <h4 className="font-medium mb-3">Method 2</h4>
          <div className="space-y-2">
            <input
              type="text"
              value={component.content?.method2?.title || ''}
              onChange={(e) => onUpdate(component.id, { 
                method2: { ...component.content?.method2, title: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Method 2 title"
            />
            <textarea
              value={component.content?.method2?.description || ''}
              onChange={(e) => onUpdate(component.id, { 
                method2: { ...component.content?.method2, description: e.target.value }
              })}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              placeholder="Method 2 description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodEditor;