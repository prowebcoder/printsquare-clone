import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Page from '@/models/Page';

export async function POST(req) {
  try {
    await dbConnect();
    
    const formData = await req.formData();
    const file = formData.get('image');
    const pageSlug = formData.get('pageSlug');
    const sectionId = formData.get('sectionId');
    const imageKey = formData.get('imageKey');
    const altText = formData.get('altText') || '';

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' }, 
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `${imageKey}_${timestamp}${extension}`;
    
    // Determine upload path based on page
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', pageSlug);
    const publicPath = path.join('/uploads', pageSlug, filename);

    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
      console.log('Directory creation skipped:', error.message);
    }

    // Save file to public folder
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Update database with image reference
    const page = await Page.findOne({ slug: pageSlug });
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' }, 
        { status: 404 }
      );
    }

    // Find or create section
    let section = page.sections.find(s => s.sectionId === sectionId);
    if (!section) {
      section = { sectionId, content: {}, images: [] };
      page.sections.push(section);
    }

    // Remove existing image with same key
    section.images = section.images.filter(img => img.key !== imageKey);
    
    // Add new image
    section.images.push({
      key: imageKey,
      url: publicPath,
      alt: altText,
      uploadDate: new Date()
    });

    page.lastUpdated = new Date();
    await page.save();

    return NextResponse.json({ 
      success: true, 
      imageUrl: publicPath,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}