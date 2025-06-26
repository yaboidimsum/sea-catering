import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Clear the authentication cookies
  cookieStore.delete('user_id');
  cookieStore.delete('csrf_token');
  
  return NextResponse.json({ message: 'Logged out successfully' });
}