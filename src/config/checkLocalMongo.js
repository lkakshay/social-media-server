const { exec } = require('child_process');
const os = require('os');

console.log('Checking if MongoDB is running locally...');

// Check if MongoDB is running as a service
const platform = os.platform();
let command = '';

if (platform === 'win32') {
  // Windows
  command = 'sc query MongoDB';
} else if (platform === 'darwin') {
  // macOS
  command = 'ps aux | grep -v grep | grep mongod';
} else {
  // Linux
  command = 'systemctl status mongodb';
}

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error checking MongoDB service: ${error.message}`);
    console.log('\nMongoDB does not appear to be running as a service.');
    console.log('\nTo install MongoDB on Windows:');
    console.log('1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community');
    console.log('2. Run the installer and follow the instructions');
    console.log('3. Make sure "Install MongoDB as a Service" is checked');
    console.log('\nAfter installation, MongoDB should run automatically as a Windows service.');
    return;
  }
  
  console.log(`✅ MongoDB service is running!`);
  console.log(stdout);
  
  console.log('\nTo connect to your local MongoDB:');
  console.log('1. Make sure your .env file has: MONGO_URI=mongodb://localhost:27017/social-media');
  console.log('2. Start your server with: npm run dev');
}); 