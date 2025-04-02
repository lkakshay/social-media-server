# Deployment Guide

This guide will help you deploy your social media server with MongoDB Atlas.

## 1. Set Up MongoDB Atlas

Follow the instructions in the README.md file to create a MongoDB Atlas account and set up your database.

## 2. Update Environment Variables

Make sure your `.env` file contains the correct MongoDB Atlas connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```

Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your actual MongoDB Atlas credentials.

## 3. Test Your Connection

Before deploying, test your MongoDB Atlas connection:

```bash
npm run test-db
```

If successful, you should see a message confirming the connection.

## 4. Deploy to a Hosting Service

### Option 1: Deploy to Heroku

1. Create a Heroku account at [https://signup.heroku.com/](https://signup.heroku.com/)
2. Install the Heroku CLI
3. Run the following commands:

```bash
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-app-name

# Add MongoDB Atlas as a buildpack
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nodejs

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_atlas_connection_string
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy your code
git push heroku main
```

### Option 2: Deploy to Render

1. Create a Render account at [https://render.com/](https://render.com/)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables for `MONGO_URI` and `JWT_SECRET`

### Option 3: Deploy to Railway

1. Create a Railway account at [https://railway.app/](https://railway.app/)
2. Connect your GitHub repository
3. Create a new project
4. Add environment variables for `MONGO_URI` and `JWT_SECRET`

## 5. Verify Deployment

After deployment, test your API endpoints to ensure everything is working correctly:

```bash
# Test the API
curl https://your-deployed-url/api/auth/register -X POST -H "Content-Type: application/json" -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## 6. Set Up Continuous Deployment (Optional)

For continuous deployment, you can set up GitHub Actions:

1. Create a `.github/workflows` directory in your repository
2. Add a deployment workflow file
3. Configure the workflow to deploy to your chosen hosting service

## 7. Monitoring and Maintenance

- Set up monitoring for your MongoDB Atlas cluster
- Regularly backup your database
- Keep your dependencies updated
- Monitor your application logs for errors 