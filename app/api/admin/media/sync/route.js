// printsquare-clone/app/api/admin/media/sync/route.js
import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import Media from '@/models/Media';
import dbConnect from "@/lib/mongodb";

export async function POST() {
  try {
    console.log('🔄 Starting media sync...');
    await dbConnect();

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    console.log('📁 Scanning directory:', uploadsDir);

    let files;
    try {
      files = await readdir(uploadsDir);
      console.log(`📄 Found ${files.length} files in uploads folder`);
    } catch (error) {
      console.error('❌ Error reading uploads directory:', error);
      return NextResponse.json(
        { error: 'Uploads directory not found or inaccessible' },
        { status: 500 }
      );
    }

    const syncResults = {
      totalFiles: files.length,
      added: 0,
      skipped: 0,
      errors: 0
    };

    for (const filename of files) {
      try {
        // Skip directories
        const filePath = path.join(uploadsDir, filename);
        const fileStats = await stat(filePath);
        if (!fileStats.isFile()) {
          console.log(`⏭️ Skipping directory: ${filename}`);
          syncResults.skipped++;
          continue;
        }

        // Check if file already exists in database
        const existingMedia = await Media.findOne({ filename });
        if (existingMedia) {
          console.log(`✅ Already in database: ${filename}`);
          syncResults.skipped++;
          continue;
        }

        // Determine MIME type based on file extension
        const ext = path.extname(filename).toLowerCase();
        let mimetype = 'application/octet-stream';
        
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
          mimetype = `image/${ext === '.jpg' ? 'jpeg' : ext.slice(1)}`;
        } else if (['.mp4', '.webm', '.ogg'].includes(ext)) {
          mimetype = `video/${ext.slice(1)}`;
        } else if (ext === '.pdf') {
          mimetype = 'application/pdf';
        }

        // Create new media record
        const mediaRecord = new Media({
          originalName: filename,
          filename: filename,
          mimetype: mimetype,
          size: fileStats.size,
          url: `/uploads/${filename}`,
        });

        await mediaRecord.save();
        console.log(`✅ Added to database: ${filename}`);
        syncResults.added++;

      } catch (fileError) {
        console.error(`❌ Error processing ${filename}:`, fileError);
        syncResults.errors++;
      }
    }

    console.log('📊 Sync completed:', syncResults);

    return NextResponse.json({
      success: true,
      message: `Media sync completed. Added: ${syncResults.added}, Skipped: ${syncResults.skipped}, Errors: ${syncResults.errors}`,
      results: syncResults
    });

  } catch (error) {
    console.error('❌ Sync process failed:', error);
    return NextResponse.json(
      { 
        error: 'Media sync failed', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}