// scripts/fixAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

async function fixAdmin() {
  try {
    console.log('🔧 Fixing admin user...');
    await mongoose.connect(MONGODB_URI);
    
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Delete existing users to start fresh
    await User.deleteMany({});
    console.log('✅ Cleared existing users');

    // Create proper admin user with hashed password
    const hashedPassword = await bcrypt.hash('neha@1234', 12);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@printsquare.com',
      password: hashedPassword,
      role: 'admin',
    });
    
    console.log('✅ Created new admin user');
    console.log('📧 Email: admin@printsquare.com');
    console.log('🔑 Password: neha@1234');
    
    await mongoose.disconnect();
    console.log('✅ Fix complete');
    
  } catch (error) {
    console.error('❌ Fix error:', error);
    process.exit(1);
  }
}

fixAdmin();