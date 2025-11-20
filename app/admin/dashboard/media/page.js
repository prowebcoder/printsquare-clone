// printsquare-clone/app/admin/dashboard/media/page.js
'use client';
import { useEffect, useState, useCallback } from 'react';
import { Search, Upload, Image, File, Video, Download, Trash2, Copy, Filter, AlertCircle, RefreshCw, Database, FolderSync } from 'lucide-react';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const fetchMedia = useCallback(async (showDebug = false) => {
    try {
      setError('');
      setLoading(true);
      if (showDebug) setDebugInfo('🔄 Fetching media...');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('🔄 Starting media fetch...');
      const res = await fetch('/api/admin/media', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        },
      });
      
      console.log('📡 Fetch response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('✅ Media fetch successful:', data.length, 'items');
        setMedia(data);
        if (showDebug) setDebugInfo(`✅ Loaded ${data.length} media files`);
      } else {
        const errorText = await res.text();
        console.error('❌ Fetch error response:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `Status: ${res.status}` };
        }
        setError(errorData.error || `Server error: ${res.status}`);
        if (showDebug) setDebugInfo(`❌ Error: ${errorData.error || res.status}`);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setError(`Network error: ${error.message}`);
      if (showDebug) setDebugInfo(`❌ Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const testDatabaseConnection = async () => {
    try {
      setDebugInfo('🔗 Testing database connection...');
      const token = localStorage.getItem('token');
      
      const res = await fetch('/api/admin/debug-db', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const result = await res.json();
      console.log('🔗 DB Test result:', result);
      
      if (result.success) {
        setDebugInfo(`✅ ${result.message}`);
      } else {
        setDebugInfo(`❌ DB Error: ${result.error}`);
      }
    } catch (error) {
      console.error('DB test error:', error);
      setDebugInfo(`❌ DB Test failed: ${error.message}`);
    }
  };

  const syncMediaFiles = async () => {
    try {
      setSyncing(true);
      setError('');
      setDebugInfo('🔄 Syncing media files from uploads folder...');
      
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/media/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      console.log('🔄 Sync result:', result);

      if (res.ok) {
        setDebugInfo(`✅ ${result.message}`);
        alert(`Media sync completed!\nAdded: ${result.results.added}, Skipped: ${result.results.skipped}, Errors: ${result.results.errors}`);
        await fetchMedia(true); // Refresh the media list
      } else {
        throw new Error(result.error || 'Sync failed');
      }
    } catch (error) {
      console.error('Sync error:', error);
      setError(`Sync failed: ${error.message}`);
      setDebugInfo(`❌ Sync failed: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError('');
    setDebugInfo('🔄 Starting upload...');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in again');
      }

      const formData = new FormData();
      files.forEach(file => {
        console.log('📤 Adding file:', file.name, file.size, file.type);
        formData.append('files', file);
      });

      console.log('🚀 Sending upload request...');
      setDebugInfo('📤 Uploading files...');

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('📬 Upload response status:', res.status);
      const result = await res.json();
      console.log('📬 Upload response:', result);

      if (res.ok) {
        setDebugInfo(`✅ ${result.message}`);
        alert(result.message || 'Upload successful!');
        await fetchMedia(true);
      } else {
        const errorMsg = result.error || result.details || `Upload failed (${res.status})`;
        setDebugInfo(`❌ ${errorMsg}`);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('❌ Upload process error:', error);
      setError(`Upload failed: ${error.message}`);
      setDebugInfo(`❌ Upload failed: ${error.message}`);
      alert(`Upload error: ${error.message}`);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDelete = async (mediaId, filename) => {
    if (!confirm('Are you sure you want to delete this file? This will remove it from both the database and the uploads folder.')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/media/${mediaId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.ok) {
        setMedia(prev => prev.filter(item => item._id !== mediaId));
        alert('File deleted successfully!');
        setDebugInfo('✅ File deleted');
      } else {
        throw new Error(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Delete error: ${error.message}`);
      setDebugInfo(`❌ Delete failed: ${error.message}`);
    }
  };

  const copyUrlToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    });
  };

  const getFileIcon = (mimetype) => {
    if (mimetype.startsWith('image/')) {
      return <Image className="text-blue-500" size={20} />;
    } else if (mimetype.startsWith('video/')) {
      return <Video className="text-purple-500" size={20} />;
    } else if (mimetype === 'application/pdf') {
      return <File className="text-red-500" size={20} />;
    }
    return <File className="text-gray-500" size={20} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (mimetype) => {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype === 'application/pdf') return 'pdf';
    return 'other';
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || getFileType(item.mimetype) === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 flex-col space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="text-gray-600">Loading media library...</span>
        {debugInfo && <span className="text-sm text-gray-500">{debugInfo}</span>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage your images, videos, and documents</p>
          {debugInfo && (
            <div className="text-sm text-blue-600 mt-2 flex items-center space-x-2">
              <RefreshCw size={14} className="animate-spin" />
              <span>{debugInfo}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={testDatabaseConnection}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all shadow-sm"
          >
            <Database size={20} />
            <span>Test DB</span>
          </button>

          <button
            onClick={syncMediaFiles}
            disabled={syncing}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all shadow-sm disabled:opacity-50"
          >
            <FolderSync size={20} className={syncing ? 'animate-spin' : ''} />
            <span>{syncing ? 'Syncing...' : 'Sync Files'}</span>
          </button>
          
          <button
            onClick={() => fetchMedia(true)}
            disabled={loading}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
            accept="image/*,video/*,.pdf"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Upload size={20} />
            <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
          </label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-3">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-medium">Error:</strong>
            <div className="mt-1 text-sm">{error}</div>
            <div className="mt-2 text-xs opacity-75">
              Check browser console (F12) and server terminal for detailed logs
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-indigo-600">{media.length}</div>
          <div className="text-sm text-gray-600">Database Files</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-green-600">
            {media.filter(m => m.mimetype.startsWith('image/')).length}
          </div>
          <div className="text-sm text-gray-600">Images</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-purple-600">
            {media.filter(m => m.mimetype.startsWith('video/')).length}
          </div>
          <div className="text-sm text-gray-600">Videos</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-red-600">
            {media.filter(m => m.mimetype === 'application/pdf').length}
          </div>
          <div className="text-sm text-gray-600">PDFs</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search media by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Files</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="pdf">PDFs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {filteredMedia.length === 0 ? (
          <div className="text-center py-16">
            <Image size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No media files found</p>
            <p className="text-gray-400 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter' 
                : 'Upload your first file to get started'
              }
            </p>
            <button
              onClick={syncMediaFiles}
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all mx-auto"
            >
              <FolderSync size={20} />
              <span>Sync Existing Files</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
            {filteredMedia.map((item) => (
              <div
                key={item._id}
                className="group border-2 border-gray-100 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all duration-300 bg-white"
              >
                {/* File Preview */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  {item.mimetype.startsWith('image/') ? (
                    <img
                      src={item.url}
                      alt={item.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : item.mimetype.startsWith('video/') ? (
                    <div className="text-center p-4">
                      <Video size={48} className="text-purple-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Video File</p>
                    </div>
                  ) : item.mimetype === 'application/pdf' ? (
                    <div className="text-center p-4">
                      <File size={48} className="text-red-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">PDF Document</p>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <File size={48} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">File</p>
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                    <a
                      href={item.url}
                      download
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      title="Download"
                    >
                      <Download size={16} className="text-gray-700" />
                    </a>
                    <button
                      onClick={() => copyUrlToClipboard(item.url)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      <Copy size={16} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.filename)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* File Info */}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate mb-1" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatFileSize(item.size)}</span>
                    <div className="flex items-center space-x-1">
                      {getFileIcon(item.mimetype)}
                      <span className="capitalize">{getFileType(item.mimetype)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload/Sync Progress */}
      {(uploading || syncing) && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>{uploading ? 'Uploading files...' : 'Syncing files...'}</span>
          </div>
        </div>
      )}
    </div>
  );
}