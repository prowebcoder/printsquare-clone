// components/PageBuilder/editors/NoticeEditor.js
"use client";

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
    <div className="space-y-4 p-3">
      {/* Background Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
        <select
          value={component.content?.backgroundType || 'solid'}
          onChange={(e) => onUpdate(component.id, { backgroundType: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        >
          <option value="solid">Solid Color</option>
          <option value="gradient">Gradient</option>
          <option value="none">None (Transparent)</option>
        </select>

        {component.content?.backgroundType === 'solid' && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.backgroundColor || '#FAFAFA'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.backgroundColor || '#FAFAFA'}
              onChange={(e) => onUpdate(component.id, { backgroundColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FAFAFA"
            />
          </div>
        )}

        {component.content?.backgroundType === 'gradient' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">From:</span>
              <input
                type="color"
                value={component.content?.gradientFrom || '#FAFAFA'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientFrom || '#FAFAFA'}
                onChange={(e) => onUpdate(component.id, { gradientFrom: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FAFAFA"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-16">To:</span>
              <input
                type="color"
                value={component.content?.gradientTo || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.gradientTo || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { gradientTo: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        )}
      </div>

      {/* Title Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={component.content?.title || ''}
          onChange={(e) => onUpdate(component.id, { title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Section title"
        />
        
        <div className="mt-2">
          <label className="block text-xs text-gray-600 mb-1">Title Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.titleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.titleColor || '#0B1633'}
              onChange={(e) => onUpdate(component.id, { titleColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#0B1633"
            />
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-2 gap-3">
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

      {/* Button Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Background Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.buttonBgColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.buttonBgColor || '#E21B36'}
              onChange={(e) => onUpdate(component.id, { buttonBgColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#E21B36"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={component.content?.buttonTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { buttonTextColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={component.content?.buttonTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate(component.id, { buttonTextColor: e.target.value })}
              className="flex-1 p-2 border border-gray-300 rounded text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>

      {/* Notice Box Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notice Box Colors</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Box Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.noticeBoxBgColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { noticeBoxBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.noticeBoxBgColor || '#FFFFFF'}
                onChange={(e) => onUpdate(component.id, { noticeBoxBgColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Hover Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.noticeBoxHoverBgColor || '#FFE3E5'}
                onChange={(e) => onUpdate(component.id, { noticeBoxHoverBgColor: e.target.value })}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.noticeBoxHoverBgColor || '#FFE3E5'}
                onChange={(e) => onUpdate(component.id, { noticeBoxHoverBgColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#FFE3E5"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.noticeTitleColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { noticeTitleColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.noticeTitleColor || '#0B1633'}
                onChange={(e) => onUpdate(component.id, { noticeTitleColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#0B1633"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Desc Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.noticeDescColor || '#6B7280'}
                onChange={(e) => onUpdate(component.id, { noticeDescColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.noticeDescColor || '#6B7280'}
                onChange={(e) => onUpdate(component.id, { noticeDescColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#6B7280"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Date Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={component.content?.noticeDateColor || '#9CA3AF'}
                onChange={(e) => onUpdate(component.id, { noticeDateColor: e.target.value })}
                className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={component.content?.noticeDateColor || '#9CA3AF'}
                onChange={(e) => onUpdate(component.id, { noticeDateColor: e.target.value })}
                className="flex-1 p-1 border border-gray-300 rounded text-xs"
                placeholder="#9CA3AF"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notices */}
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