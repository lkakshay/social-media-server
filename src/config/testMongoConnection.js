require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//<username>:<password>@'));
    
    // Set a timeout for the connection attempt
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000);
    });
    
    // Try to connect with a timeout
    const connectionPromise = mongoose.connect(process.env.MONGO_URI);
    const conn = await Promise.race([connectionPromise, timeoutPromise]);
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Test creating a simple document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    await TestModel.create({ name: 'test' });
    console.log('✅ Successfully created a test document');
    
    // Clean up
    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Successfully deleted the test document');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error('Please check:');
    console.error('1. Your IP address is whitelisted in MongoDB Atlas');
    console.error('2. Your connection string is correct');
    console.error('3. Your MongoDB Atlas cluster is running');
    console.error('4. Your network connection is stable');
    process.exit(1);
  }
};

testConnection(); 