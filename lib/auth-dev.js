// Simple development authentication that doesn't require MongoDB
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '08001c2e49654a2db0df3b4d1384c6b4';

// Simple in-memory user store for development
const devUsers = [
  {
    id: '1',
    email: 'admin@printseoul.com',
    password: 'admin123', // In production, this would be hashed
    name: 'Administrator',
    role: 'admin'
  }
];

export async function devAuthLogin(email, password) {
  // Find user
  const user = devUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { error: 'Invalid credentials' };
  }

  // Create token
  const token = jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

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

export async function devAuthCheck(token) {
  if (!token) {
    return { error: 'No token provided' };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = devUsers.find(u => u.id === decoded.userId);
    
    if (!user) {
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
    return { error: 'Invalid token' };
  }
}