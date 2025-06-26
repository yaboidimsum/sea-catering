import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  verifyPassword,
  sanitizeInput,
  generateCSRFToken,
} from "@/lib/auth/utils";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Development test accounts
    if (process.env.NODE_ENV === "development") {
      // Test admin account
      if (email === "admin@test.com" && password === "Admin123!") {
        const csrfToken = generateCSRFToken();
        const cookieStore = cookies();
        
        cookieStore.set("user_id", "admin-test-id", { 
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        
        cookieStore.set("csrf_token", csrfToken, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        
        return NextResponse.json({
          user: {
            id: "admin-test-id",
            name: "Admin User",
            email: "admin@test.com",
            role: "admin"
          },
          csrfToken,
          message: 'Login successful'
        });
      }
      
      // Test regular user account
      if (email === "user@test.com" && password === "User123!") {
        const csrfToken = generateCSRFToken();
        const cookieStore = cookies();
        
        cookieStore.set("user_id", "user-test-id", { 
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        
        cookieStore.set("csrf_token", csrfToken, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
        
        return NextResponse.json({
          user: {
            id: "user-test-id",
            name: "Regular User",
            email: "user@test.com",
            role: "user"
          },
          csrfToken,
          message: 'Login successful'
        });
      }
    }
    
    // Continue with normal authentication flow
    // Sanitize input
    const sanitizedEmail = sanitizeInput(email);

    // Find the user
    const userResults = await db
      .select()
      .from(users)
      .where(eq(users.email, sanitizedEmail));

    if (userResults.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = userResults[0];

    // Verify the password
    if (!verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a CSRF token
    const csrfToken = generateCSRFToken();

    // Set cookies
    const cookieStore = cookies();
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    cookieStore.set("csrf_token", csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Return the user without the password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      csrfToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
