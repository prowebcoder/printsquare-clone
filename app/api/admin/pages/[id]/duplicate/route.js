import { NextResponse } from 'next/server';
import Page from '@/models/Page';
import dbConnect from '@/lib/db';

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    // Find the original page
    const originalPage = await Page.findById(id);
    if (!originalPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Create a duplicate
    const duplicatePage = new Page({
      title: `${originalPage.title} (Copy)`,
      slug: `${originalPage.slug}-copy-${Date.now()}`,
      components: originalPage.components ? JSON.parse(JSON.stringify(originalPage.components)) : [],
      metaTitle: originalPage.metaTitle,
      metaDescription: originalPage.metaDescription,
      published: false, // Keep duplicate as draft
    });

    await duplicatePage.save();

    return NextResponse.json({
      success: true,
      message: 'Page duplicated successfully',
      page: duplicatePage
    });

  } catch (error) {
    console.error('Duplicate page error:', error);
    return NextResponse.json(
      { error: 'Failed to duplicate page', details: error.message },
      { status: 500 }
    );
  }
}