// app/api/admin/media/route.js
import dbConnect from '@/lib/db';
import Media from '@/models/Media';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await dbConnect();
    
    const media = await Media.find({}).sort({ createdAt: -1 });
    
    return new Response(JSON.stringify(media), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Media fetch error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      // Directory already exists
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save file
    await writeFile(filePath, buffer);

    // Create media record in database
    const media = new Media({
      filename: fileName,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      url: `/uploads/${fileName}`,
      uploadedBy: 'admin' // You can get this from auth later
    });

    await media.save();

    return new Response(JSON.stringify({
      success: true,
      media: {
        _id: media._id,
        filename: media.filename,
        originalName: media.originalName,
        url: media.url,
        size: media.size,
        mimetype: media.mimetype
      }
    }), {
      status: 200,
    });
  } catch (error) {
    console.error('Media upload error:', error);
    return new Response(JSON.stringify({ 
      message: 'Internal server error',
      error: error.message 
    }), {
      status: 500,
    });
  }
}