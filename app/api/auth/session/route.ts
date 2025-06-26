import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('user_id')?.value;
    const csrfToken = cookieStore.get('csrf_token')?.value;
    
    if (!userId) {
      return NextResponse.json({ user: null });
    }
    
    // Find the user
    const userResults = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
    
    if (userResults.length === 0) {
      // Clear invalid cookies
      cookieStore.delete('user_id');
      cookieStore.delete('csrf_token');
      return NextResponse.json({ user: null });
    }
    
    return NextResponse.json({
      user: userResults[0],
      csrfToken,
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}