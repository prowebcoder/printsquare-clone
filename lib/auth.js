// lib/auth.js
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

export function verifyCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function isAuthenticated(request) {
  // Check for admin-auth cookie
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return false;
  
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      return [name, value];
    })
  );
  
  return cookies['admin-auth'] === 'true';
}