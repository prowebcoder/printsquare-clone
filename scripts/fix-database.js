// scripts/fix-database.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://dhiman639:roAvGjcDJ4LeVFYo@cluster0.0ykzr5f.mongodb.net/printseoul';

async function fixDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get the formconfigurations collection
    const db = mongoose.connection.db;
    const collection = db.collection('formconfigurations');
    
    // List all indexes
    console.log('📋 Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(' -', index.name, ':', index.key);
    });

    // Check if formId index exists and drop it
    const formIdIndex = indexes.find(index => index.name === 'formId_1');
    if (formIdIndex) {
      console.log('🗑️ Removing old formId index...');
      await collection.dropIndex('formId_1');
      console.log('✅ formId index removed');
    }

    // Create proper indexes
    console.log('🔧 Creating proper indexes...');
    await collection.createIndex({ name: 1 }, { unique: true });
    console.log('✅ name index created');

    // List indexes again
    console.log('📋 Updated indexes:');
    const updatedIndexes = await collection.indexes();
    updatedIndexes.forEach(index => {
      console.log(' -', index.name, ':', index.key);
    });

    await mongoose.connection.close();
    console.log('🎉 Database fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing database:', error);
    process.exit(1);
  }
}

fixDatabase();