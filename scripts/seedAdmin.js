require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

async function seedAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // Define User schema
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      role: String,
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const existingAdmin = await User.findOne({ email: 'admin@printseoul.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await User.create({
        email: 'admin@printseoul.com',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
      });
      
      console.log('✅ Admin user created successfully');
      console.log('Email: admin@printseoul.com');
      console.log('Password: admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedAdmin();