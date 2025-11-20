import { NextResponse } from 'next/server';
import Media from '@/models/Media';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🔗 Debug: Testing database connection...');
    
    // Test connection
    await dbConnect();
    console.log('✅ Debug: Database connected');
    
    // Test Media model
    const mediaCount = await Media.countDocuments();
    console.log(`✅ Debug: Media collection has ${mediaCount} documents`);
    
    // Try to create a test record
    const testMedia = new Media({
      originalName: 'debug-test.jpg',
      filename: `debug-test-${Date.now()}.jpg`,
      mimetype: 'image/jpeg',
      size: 1024,
      url: '/uploads/debug-test.jpg'
    });
    
    const savedTest = await testMedia.save();
    console.log('✅ Debug: Test record created:', savedTest._id);
    
    // Clean up
    await Media.deleteOne({ _id: savedTest._id });
    console.log('✅ Debug: Test record cleaned up');
    
    return NextResponse.json({
      success: true,
      message: `Database connection successful. Media collection has ${mediaCount} documents.`,
      mediaCount
    });
    
  } catch (error) {
    console.error('❌ Debug: Database test failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Database test failed', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}