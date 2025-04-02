# Social Media Server

A Node.js backend for a social media application with MongoDB Atlas integration.

## Setup MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)

2. Create a new cluster:
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. Set up database access:
   - In the left sidebar, click "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these securely)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. Set up network access:
   - In the left sidebar, click "Network Access"
   - Click "Add IP Address"
   - For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add your specific IP addresses
   - Click "Confirm"

5. Get your connection string:
   - In the cluster view, click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database>` with your values
   - Update the `.env` file with this connection string

## Installation

```bash
# Install dependencies
npm install

# Start the server
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
``` 