# Deployment Guide for SMARTIOT

## Backend Setup

1. **Environment Variables**
   - Create a new `.env` file in the `server` directory with the following variables:
     ```
     PORT=10000
     NODE_ENV=production
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-specific-password
     ADMIN_EMAIL=admin@example.com
     FRONTEND_URL=https://your-render-frontend-url.onrender.com
     SESSION_SECRET=your-session-secret
     ```
   - For Gmail, you'll need to generate an App Password if you have 2FA enabled.

2. **Dependencies**
   - Ensure all dependencies are installed:
     ```bash
     cd server
     npm install
     ```

3. **Running the Server**
   - Start the server in production mode:
     ```bash
     npm start
     ```

## Frontend Setup

1. **Configuration**
   - Update `src/config.js` with your Render backend URL:
     ```javascript
     const API_BASE_URL = isProduction 
       ? 'https://your-render-backend-url.onrender.com/api'
       : '/api';
     ```

2. **Building for Production**
   - Build the frontend:
     ```bash
     npm run build
     ```

## Render Deployment

### Backend
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the build command: `cd server && npm install`
4. Set the start command: `npm start`
5. Add all environment variables from your `.env` file

### Frontend
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set the build command: `npm install && npm run build`
4. Set the publish directory: `dist`
5. Add environment variables if needed

## Troubleshooting

1. **CORS Issues**
   - Ensure `FRONTEND_URL` is correctly set in your backend environment variables
   - Check the browser's console for CORS errors

2. **Email Not Sending**
   - Verify your email credentials
   - Check the server logs for any email sending errors
   - Make sure your email provider allows less secure apps or use an App Password

3. **API Endpoints Not Found**
   - Ensure the backend URL in `src/config.js` is correct
   - Check that the backend server is running and accessible
