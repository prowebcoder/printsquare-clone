// localStorage-based authentication for development
const JWT_SECRET = process.env.JWT_SECRET || '08001c2e49654a2db0df3b4d1384c6b4';

// Simple user store
const devUsers = [
  {
    id: '1',
    email: 'admin@printseoul.com',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin'
  }
];

// Store token in localStorage
export function setAuthToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

export async function localAuthLogin(email, password) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = devUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { error: 'Invalid credentials' };
  }

  // Create token
  const token = btoa(JSON.stringify({
    userId: user.id,
    email: user.email,
    role: user.role,
    expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  }));

  setAuthToken(token);

  return { 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    }, 
    token 
  };
}

export async function localAuthCheck(token = null) {
  const authToken = token || getAuthToken();
  
  if (!authToken) {
    return { error: 'No token found' };
  }

  try {
    const decoded = JSON.parse(atob(authToken));
    
    // Check if token is expired
    if (decoded.expires < Date.now()) {
      removeAuthToken();
      return { error: 'Token expired' };
    }
    
    const user = devUsers.find(u => u.id === decoded.userId);
    if (!user) {
      removeAuthToken();
      return { error: 'User not found' };
    }
    
    return { 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    };
  } catch (error) {
    removeAuthToken();
    return { error: 'Invalid token' };
  }
}