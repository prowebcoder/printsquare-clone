// app/admin/dashboard/media/page.js
'use client';
import { useEffect, useState } from 'react';
import { Search, Upload, Image, File, Download, Trash2 } from 'lucide-react';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/media', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/media', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      // Refresh media list
      fetchMedia();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (mediaId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMedia(media.filter(item => item._id !== mediaId));
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Error deleting file');
    }
  };

  const filteredMedia = media.filter(item =>
    item.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (mimetype) => {
    if (mimetype.startsWith('image/')) {
      return <Image className="text-blue-500" size={24} />;
    }
    return <File className="text-gray-500" size={24} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Media Library</h1>
        <div>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Upload size={20} />
            <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="p-6">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <Image size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No media files found</p>
              <p className="text-gray-400 mt-2">
                {searchTerm ? 'Try adjusting your search' : 'Upload your first file'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {item.mimetype.startsWith('image/') ? (
                      <img
                        src={item.url}
                        alt={item.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(item.mimetype)
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate mb-1">
                      {item.originalName}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {formatFileSize(item.size)}
                    </p>
                    <div className="flex justify-between items-center">
                      <a
                        href={item.url}
                        download
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Download size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}