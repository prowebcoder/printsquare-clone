// printsquare-clone/app/api/admin/media/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Media from '@/models/Media';
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    console.log('📂 GET Media: Connecting to database...');
    await dbConnect();
    
    const media = await Media.find({}).sort({ createdAt: -1 });
    console.log(`✅ GET Media: Found ${media.length} items`);
    
    return NextResponse.json(media);
  } catch (error) {
    console.error('❌ GET Media Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log('🚀 POST Media: Starting upload process...');
  
  try {
    // Connect to database FIRST
    console.log('🔗 Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected');

    // Parse form data
    const formData = await request.formData();
    const files = formData.getAll('files');
    
    console.log('📤 Files in request:', files.length);
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files selected' }, 
        { status: 400 }
      );
    }

    // Filter valid files
    const validFiles = files.filter(file => 
      file && 
      typeof file !== 'string' && 
      file.size > 0
    );

    console.log(`📄 Valid files: ${validFiles.length}`);

    if (validFiles.length === 0) {
      return NextResponse.json(
        { error: 'No valid files found' }, 
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    console.log('📁 Upload directory:', uploadsDir);
    
    try {
      await mkdir(uploadsDir, { recursive: true });
      console.log('✅ Upload directory ready');
    } catch (dirError) {
      console.error('❌ Directory error:', dirError);
      return NextResponse.json(
        { error: 'Could not create upload directory' }, 
        { status: 500 }
      );
    }

    const uploadedFiles = [];

    for (const file of validFiles) {
      try {
        console.log(`\n🔄 Processing: ${file.name}`);
        
        // Read file data
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate unique filename
        const originalName = file.name;
        const fileExtension = path.extname(originalName) || '.bin';
        const uniqueName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(uploadsDir, uniqueName);
        const publicUrl = `/uploads/${uniqueName}`;

        console.log('💾 Saving file to disk...');
        
        // Write file to disk
        await writeFile(filePath, buffer);
        console.log('✅ File saved to disk');

        console.log('💾 Creating media record...');
        
        // Create and save media record
        const mediaData = {
          originalName,
          filename: uniqueName,
          mimetype: file.type || 'application/octet-stream',
          size: file.size,
          url: publicUrl,
        };

        console.log('Media data to save:', mediaData);

        const mediaRecord = new Media(mediaData);
        const savedMedia = await mediaRecord.save();
        
        console.log('✅ Media record saved with ID:', savedMedia._id);
        uploadedFiles.push(savedMedia);

      } catch (fileError) {
        console.error(`❌ Error processing ${file.name}:`, fileError);
        // Continue with next file
      }
    }

    console.log(`\n📊 Upload complete: ${uploadedFiles.length} successful`);

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: 'All files failed to upload. Check server logs.' }, 
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      files: uploadedFiles 
    });

  } catch (error) {
    console.error('❌ Upload process failed:', error);
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error.message
      }, 
      { status: 500 }
    );
  }
}