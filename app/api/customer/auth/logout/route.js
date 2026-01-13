//` app/api/customer/auth/logout/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';

export async function POST() {
  // Since we're using JWT tokens stored on the client side,
  // logout just involves the client removing the token.
  // We could implement token blacklisting here if needed.
  
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
}