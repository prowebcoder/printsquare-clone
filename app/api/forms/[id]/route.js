import dbConnect from '@/lib/db';
import Form from '@/models/Form';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Form.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Form deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}
