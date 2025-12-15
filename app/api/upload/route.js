// app/api/upload/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { writeFile, mkdir, readFile, stat } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Handle POST for uploads
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Generate unique filename while preserving original name
    const timestamp = Date.now();
    const originalName = file.name;
    const originalNameWithoutExt = path.basename(originalName, path.extname(originalName));
    const extension = path.extname(originalName);
    const filename = `${originalNameWithoutExt}-${timestamp}${extension}`;
    const filepath = path.join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, buffer);

    // Return the public URL
    const imageUrl = `/api/upload?file=${filename}`; // Use API route for serving

    // Get file size
    const stats = await stat(filepath);
    const fileSize = formatFileSize(stats.size);

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      filename: originalName,
      fileSize: fileSize
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// Handle GET for serving/downloading files
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'File not specified' }, { status: 400 });
    }

    // Security: Prevent directory traversal
    const safeFileName = path.basename(file);
    const filepath = path.join(process.cwd(), 'public/uploads', safeFileName);
    
    // Check if file exists
    if (!existsSync(filepath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read file
    const fileBuffer = await readFile(filepath);
    const fileExtension = path.extname(file).toLowerCase();
    
    // Set content type based on file extension
    const contentTypes = {
      '.zip': 'application/zip',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.json': 'application/json',
      '.csv': 'text/csv',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt': 'application/vnd.ms-powerpoint',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    };

    const contentType = contentTypes[fileExtension] || 'application/octet-stream';
    
    // Create response with proper headers for download
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', contentType);
    response.headers.set('Content-Disposition', `attachment; filename="${safeFileName}"`);
    response.headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // For ZIP files, also set these headers
    if (fileExtension === '.zip') {
      response.headers.set('Content-Encoding', 'identity');
    }

    return response;

  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Error serving file' }, { status: 500 });
  }
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}