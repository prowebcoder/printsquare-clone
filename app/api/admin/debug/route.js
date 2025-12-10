import { NextResponse } from 'next/server';
import Page from '@/models/Page';
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    
    // Test creating a page to see validation errors
    const testPage = new Page({
      title: 'Test Page',
      slug: 'test-slug',
      metaTitle: 'Test Meta Title',
      metaDescription: 'Test Meta Description',
      components: [],
      published: false,
      isHomepage: false
    });
    
    // Try to validate without saving
    const validationError = testPage.validateSync();
    
    if (validationError) {
      const errors = {};
      for (const field in validationError.errors) {
        errors[field] = validationError.errors[field].message;
      }
      
      return NextResponse.json({
        validationError: errors,
        modelSchema: Page.schema.obj
      });
    }
    
    return NextResponse.json({
      message: 'Page model validation successful',
      testData: {
        title: testPage.title,
        slug: testPage.slug,
        isHomepage: testPage.isHomepage
      }
    });
    
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}