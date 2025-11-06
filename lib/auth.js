// Simple session-based authentication
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

export function verifyCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// Simple session check (in a real app, use proper sessions)
export function isAuthenticated(request) {
  // Check cookie or header for authentication
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_TOKEN || 'admin-token'}`;
}