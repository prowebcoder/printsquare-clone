// components/PageBuilder/editors/NoticeEditor.js
import { Trash2 } from 'lucide-react';

const NoticeEditor = ({ component, onUpdate }) => {
  const handleNoticeChange = (index, field, value) => {
    const newNotices = [...(component.content?.notices || [])];
    newNotices[index] = { ...newNotices[index], [field]: value };
    onUpdate(component.id, { notices: newNotices });
  };

  const addNotice = () => {
    const newNotices = [...(component.content?.notices || []), {
      title: 'New Notice',
      desc: 'Notice description...',
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '.')
    }];
    onUpdate(component.id, { notices: newNotices });
  };

  const removeNotice = (index) => {
    const newNotices = (component.content?.notices || []).filter((_, i) => i !== index);
    onUpdate(component.id, { notices: newNotices });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Section title"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Notices</label>
        {component.content?.notices?.map((notice, index) => (
          <div key={index} className="border p-4 rounded-lg mb-3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Notice {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeNotice(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <input
              type="text"
              value={notice.title}
              onChange={(e) => handleNoticeChange(index, 'title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Notice title"
            />
            <textarea
              value={notice.desc}
              onChange={(e) => handleNoticeChange(index, 'desc', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              rows={2}
              placeholder="Notice description"
            />
            <input
              type="text"
              value={notice.date}
              onChange={(e) => handleNoticeChange(index, 'date', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Date (e.g., 09.24.2025)"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addNotice}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Notice
        </button>
      </div>
    </div>
  );
};

export default NoticeEditor;