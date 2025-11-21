const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-customer-jwt-secret';
const JWT_EXPIRES_IN = '7d';

// Generate JWT token for customer
export function generateCustomerToken(customer) {
  return jwt.sign(
    { 
      id: customer._id, 
      email: customer.email,
      type: 'customer'
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Verify JWT token
export function verifyCustomerToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

// Compare password
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}