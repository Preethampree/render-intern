# Schedula API - Render Deployment Guide

## Prerequisites

- GitHub repository with your code
- Render account (free tier available)
- Google OAuth credentials (if using Google authentication)

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

✅ All code is already prepared and ready for deployment!

### 2. Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 3. Deploy the Database

1. In your Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Choose "Free" plan
4. Name it: `schedula-db`
5. Click "Create Database"
6. Wait for the database to be created
7. Copy the "External Database URL" - you'll need this later

### 4. Deploy the Web Service

1. In your Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Choose the repository: `Schedula-API-Artisans`
5. Configure the service:
   - **Name**: `schedula-api-artisans`
   - **Environment**: `Node`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: `Free`

### 5. Configure Environment Variables

In the "Environment" tab of your web service, add these variables:

**Required Variables:**

- `NODE_ENV`: `production`
- `RENDER`: `true`
- `DATABASE_URL`: (Copy from your database's "External Database URL")
- `SESSION_SECRET`: (Generate a random string)
- `JWT_SECRET`: (Generate a random string)

**Optional Variables:**

- `GOOGLE_CLIENT_ID`: (Your Google OAuth Client ID)
- `GOOGLE_CLIENT_SECRET`: (Your Google OAuth Client Secret)
- `FRONTEND_URL`: (Your frontend URL for CORS)

### 6. Deploy

1. Click "Create Web Service"
2. Wait for the deployment to complete (5-10 minutes)
3. Your API will be available at: `https://schedula-api-artisans.onrender.com`

### 7. Test Your Deployment

1. Visit: `https://your-app-name.onrender.com/api/hello`
2. You should see a response from your API
3. Check the logs in Render dashboard for any errors

## API Endpoints

Your API will be available at: `https://your-app-name.onrender.com/api/`

- Health Check: `GET /api/hello`
- Authentication: `POST /api/auth/*`
- Doctor endpoints: `GET/POST /api/doctor/*`
- Patient endpoints: `GET/POST /api/patient/*`

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Database connection fails**: Verify `DATABASE_URL` is correct
3. **CORS errors**: Update `FRONTEND_URL` environment variable
4. **Session errors**: Ensure `SESSION_SECRET` is set

### Checking Logs:

1. Go to your web service in Render dashboard
2. Click on "Logs" tab
3. Look for error messages

## Environment Variables Reference

| Variable               | Required | Description                  | Example                                |
| ---------------------- | -------- | ---------------------------- | -------------------------------------- |
| `NODE_ENV`             | Yes      | Environment mode             | `production`                           |
| `RENDER`               | Yes      | Render platform flag         | `true`                                 |
| `DATABASE_URL`         | Yes      | PostgreSQL connection string | `postgresql://...`                     |
| `SESSION_SECRET`       | Yes      | Session encryption secret    | `random-string-here`                   |
| `JWT_SECRET`           | Yes      | JWT token secret             | `another-random-string`                |
| `GOOGLE_CLIENT_ID`     | No       | Google OAuth Client ID       | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | No       | Google OAuth Client Secret   | `your-secret`                          |
| `FRONTEND_URL`         | No       | Frontend URL for CORS        | `https://your-frontend.com`            |

## Free Tier Limitations

- **Web Service**: 750 hours/month (enough for continuous operation)
- **Database**: 1GB storage, 1GB RAM
- **Sleep**: Web service sleeps after 15 minutes of inactivity
- **Cold Start**: First request after sleep takes ~30 seconds

## Upgrading

To remove limitations:

1. Upgrade to paid plans in Render dashboard
2. Consider using a dedicated PostgreSQL provider for production
3. Set up monitoring and logging

## Support

If you encounter issues:

1. Check the Render logs
2. Verify all environment variables are set
3. Test locally with the same environment variables
4. Check the Render documentation: [render.com/docs](https://render.com/docs)
