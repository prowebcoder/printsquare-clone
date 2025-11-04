// app/api/admin/images/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';


export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');
    
    let query = {};
    if (page) query.page = page;
    if (section) query.section = section;
    
    const images = await Image.find(query).sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const formData = await request.formData();
    const file = formData.get('file');
    const page = formData.get('page') || 'global';
    const section = formData.get('section') || '';
    const alt = formData.get('alt') || '';
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}.${extension}`;
    const path = `public/uploads/${filename}`;
    
    // In a real implementation, you'd upload to cloud storage or write to filesystem
    // For now, we'll simulate by storing metadata
    const image = new Image({
      filename,
      originalName: file.name,
      path,
      url: `/uploads/${filename}`,
      size: file.size,
      mimetype: file.type,
      alt,
      page,
      section
    });
    
    await image.save();
    
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}