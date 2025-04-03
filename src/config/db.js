const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('Connection string:', process.env.MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//<username>:<password>@'));
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.error('Please check:');
    console.error('1. Your IP address is whitelisted in MongoDB Atlas');
    console.error('2. Your connection string is correct');
    console.error('3. Your MongoDB Atlas cluster is running');
    console.error('4. Your network connection is stable');
    process.exit(1);
  }
};

module.exports = connectDB; 