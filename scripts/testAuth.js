require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

console.log('🔐 Testing JWT Configuration...');
console.log('JWT Secret:', JWT_SECRET ? 'Set' : 'Not set');

// Test token creation and verification
const testPayload = { userId: 'test123', email: 'test@example.com' };

try {
  const token = jwt.sign(testPayload, JWT_SECRET, { expiresIn: '7d' });
  console.log('✅ Token created successfully');
  console.log('Token:', token);
  
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('✅ Token verified successfully');
  console.log('Decoded:', decoded);
} catch (error) {
  console.error('❌ JWT Error:', error.message);
}