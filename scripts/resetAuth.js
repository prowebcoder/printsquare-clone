require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

async function resetAuth() {
  try {
    console.log('🔄 Resetting authentication...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    
    // Define User schema
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      role: String,
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Delete existing admin user
    await User.deleteOne({ email: 'admin@printseoul.com' });
    console.log('✅ Removed existing admin user');

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await User.create({
      email: 'admin@printseoul.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
    });
    
    console.log('✅ Created new admin user');
    console.log('📧 Email: admin@printseoul.com');
    console.log('🔑 Password: admin123');
    
    await mongoose.disconnect();
    console.log('✅ Reset complete');
    
  } catch (error) {
    console.error('❌ Reset error:', error);
    process.exit(1);
  }
}

resetAuth();