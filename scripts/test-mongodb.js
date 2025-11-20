// printsquare-clone/scripts/test-mongodb.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function testMongoDB() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');

    // Test if we can create a collection and insert a document
    const TestModel = mongoose.model('Test', new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    }));

    const testDoc = new TestModel({ name: 'test' });
    await testDoc.save();
    console.log('✅ Test document saved');

    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up');

    await mongoose.connection.close();
    console.log('✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testMongoDB();