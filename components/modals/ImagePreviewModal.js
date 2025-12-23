// components/common/ImagePreviewModal.js
'use client';

const ImagePreviewModal = ({ isOpen, imageUrl, onClose, title = "Image Preview" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>
        <div className="p-8 flex items-center justify-center bg-gray-100 min-h-[60vh]">
          <img 
            src={imageUrl} 
            alt="Preview"
            className="max-w-full max-h-[70vh] object-contain"
            onError={(e) => {
              e.target.src = '/images/placeholder-color-large.png';
              e.target.alt = 'Image not available';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;