import { createHash, randomBytes } from 'crypto';

// Function to hash a password with salt
export function hashPassword(password: string): string {
  // Generate a random salt
  const salt = randomBytes(16).toString('hex');
  
  // Hash the password with the salt
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  
  // Return the salt and hash combined
  return `${salt}:${hash}`;
}

// Function to verify a password against a hash
export function verifyPassword(password: string, hashedPassword: string): boolean {
  // Split the stored hash into salt and hash
  const [salt, storedHash] = hashedPassword.split(':');
  
  // Hash the provided password with the same salt
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  
  // Compare the hashes
  return storedHash === hash;
}

// Function to validate password strength
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter." };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter." };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number." };
  }
  
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character." };
  }
  
  return { valid: true };
}

// Generate a CSRF token
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}