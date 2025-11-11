// components/PageBuilder/editors/FreeSampleEditor.js
const FreeSampleEditor = ({ component, onUpdate }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Title"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={component.content?.buttonText || ''}
            onChange={(e) => onUpdate(component.id, { buttonText: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Button text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={component.content?.buttonLink || ''}
            onChange={(e) => onUpdate(component.id, { buttonLink: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Button link"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="text"
          value={component.content?.email || ''}
          onChange={(e) => onUpdate(component.id, { email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Email address"
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
      {[1, 2, 3].map((num) => (
        <div key={num}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description {num}</label>
          <textarea
            value={component.content?.[`description${num}`] || ''}
            onChange={(e) => onUpdate(component.id, { [`description${num}`]: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={2}
            placeholder={`Description ${num}`}
          />
        </div>
      ))}
    </div>
  );
};

export default FreeSampleEditor;