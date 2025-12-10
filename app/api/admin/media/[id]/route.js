import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
import Media from '@/models/Media';
import { dbConnect } from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    console.log('🗑️ Deleting media with ID:', id);

    const media = await Media.findById(id);
    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Delete file from filesystem
    const filePath = path.join(process.cwd(), 'public', media.url);
    try {
      await unlink(filePath);
      console.log('✅ File deleted from filesystem:', filePath);
    } catch (fsError) {
      console.warn('⚠️ Could not delete file from filesystem:', fsError.message);
      // Continue with database deletion even if file doesn't exist
    }

    // Delete record from database
    await Media.findByIdAndDelete(id);
    console.log('✅ Media record deleted from database');

    return NextResponse.json({ 
      success: true, 
      message: 'File deleted successfully' 
    });

  } catch (error) {
    console.error('❌ Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error.message }, 
      { status: 500 }
    );
  }
}