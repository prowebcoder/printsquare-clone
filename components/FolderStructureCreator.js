// components/FolderStructureCreator.js
'use client';

import { useState } from 'react';

export default function FolderStructureCreator() {
  const [folderPath, setFolderPath] = useState('');
  const [outputFile, setOutputFile] = useState('folder-structure.txt');
  const [structure, setStructure] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generateStructure = async () => {
    if (!folderPath.trim()) {
      setError('Please enter a folder path');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setStructure('');

    try {
      const response = await fetch('/api/folder-structure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderPath: folderPath.trim(),
          outputFile,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate structure');
      }

      setStructure(data.structure);
      setSuccess(`Folder structure saved to: ${data.outputFile}`);
      
      // Auto-scroll to structure
      setTimeout(() => {
        const structureElement = document.getElementById('structure-output');
        if (structureElement) {
          structureElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadStructure = () => {
    if (!structure) return;
    
    const blob = new Blob([structure], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outputFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setFolderPath('');
    setOutputFile('folder-structure.txt');
    setStructure('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">
        📁 Folder Structure Creator
      </h1>
      <p className="text-gray-600 mb-6">
        Generate clean folder structures for your projects, excluding common development files.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📂 Folder Path (Absolute Path):
          </label>
          <input
            type="text"
            value={folderPath}
            onChange={(e) => setFolderPath(e.target.value)}
            placeholder="e.g., C:\Users\YourName\projects\my-app  OR  /home/user/projects/my-app"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the complete path to your project folder
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💾 Output File Name:
          </label>
          <input
            type="text"
            value={outputFile}
            onChange={(e) => setOutputFile(e.target.value)}
            placeholder="folder-structure.txt"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ {success}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={generateStructure}
            disabled={loading || !folderPath.trim()}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '🔄 Generating...' : '🚀 Generate Folder Structure'}
          </button>
          
          {structure && (
            <button
              onClick={downloadStructure}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              📥 Download
            </button>
          )}
          
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {structure && (
        <div id="structure-output" className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700">
              📊 Generated Structure:
            </h2>
            <div className="text-sm text-gray-500">
              {structure.split('\n').filter(line => line.trim()).length} items
            </div>
          </div>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap border border-gray-200 max-h-96 overflow-y-auto">
            {structure}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Usage Tips:</h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
          <li>Use absolute paths for best results</li>
          <li>Automatically ignores: node_modules, .git, .next, dist, .env files, etc.</li>
          <li>Structure is saved to your project root directory</li>
          <li>Directories are listed before files, both in alphabetical order</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded-md">
        <h4 className="font-semibold text-yellow-800 mb-1">📝 Example Paths:</h4>
        <div className="text-yellow-700 text-xs font-mono">
          <div>Windows: C:\Users\YourName\projects\my-nextjs-app</div>
          <div>Mac/Linux: /Users/yourname/projects/my-nextjs-app</div>
        </div>
      </div>
    </div>
  );
}