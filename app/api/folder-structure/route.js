// src/app/api/folder-structure/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { folderPath, outputFile = 'folder-structure.txt' } = await request.json();

    if (!folderPath) {
      return NextResponse.json(
        { error: 'Folder path is required' },
        { status: 400 }
      );
    }

    // Security check - prevent directory traversal
    if (folderPath.includes('..')) {
      return NextResponse.json(
        { error: 'Invalid folder path' },
        { status: 400 }
      );
    }

    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      return NextResponse.json(
        { error: 'Folder does not exist. Please provide absolute path.' },
        { status: 404 }
      );
    }

    const structure = generateFolderStructure(folderPath, folderPath);
    
    // Save to file in the current directory
    const outputPath = path.join(process.cwd(), outputFile);
    fs.writeFileSync(outputPath, structure);

    return NextResponse.json({
      message: 'Folder structure generated successfully',
      structure: structure,
      outputFile: outputPath
    });

  } catch (error) {
    console.error('Error generating folder structure:', error);
    return NextResponse.json(
      { error: 'Failed to generate folder structure: ' + error.message },
      { status: 500 }
    );
  }
}

function generateFolderStructure(currentPath, rootPath, prefix = '', isLast = true) {
  const itemName = path.basename(currentPath);
  let structure = '';
  
  // Extended list of ignored patterns
  const ignoredPatterns = [
    'node_modules', '.git', '.next', 'dist', 'build',
    '.DS_Store', 'Thumbs.db', '.env', '.env.local',
    '.vscode', '.idea', 'coverage', '.nyc_output'
  ];

  // Skip ignored files/folders
  if (ignoredPatterns.some(pattern => 
    itemName === pattern || itemName.startsWith('.') && pattern.startsWith('.')
  )) {
    return '';
  }

  // Add current folder/file to structure
  const isRoot = currentPath === rootPath;
  if (!isRoot) {
    structure += prefix + (isLast ? '└── ' : '├── ') + itemName + '\n';
  }

  try {
    const stats = fs.statSync(currentPath);
    
    if (stats.isDirectory()) {
      if (!isRoot) {
        prefix += isLast ? '    ' : '│   ';
      }

      let items;
      try {
        items = fs.readdirSync(currentPath)
          .filter(item => {
            // Filter out ignored patterns
            return !ignoredPatterns.some(pattern => 
              item === pattern || item.startsWith('.') && pattern.startsWith('.')
            );
          })
          .map(item => path.join(currentPath, item))
          .sort((a, b) => {
            const aIsDir = fs.statSync(a).isDirectory();
            const bIsDir = fs.statSync(b).isDirectory();
            // Directories first, then files, both alphabetically
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
          });
      } catch (readError) {
        // If we can't read the directory, skip it
        return structure;
      }

      items.forEach((item, index) => {
        const isLastItem = index === items.length - 1;
        structure += generateFolderStructure(item, rootPath, prefix, isLastItem);
      });
    }
  } catch (error) {
    // Skip files/folders that can't be accessed
    console.warn(`Skipping ${currentPath}:`, error.message);
  }

  return structure;
}