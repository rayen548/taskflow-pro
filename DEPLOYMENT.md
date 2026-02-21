# Deployment Guide

## Deploy Backend to Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account and select `taskflow-pro` repository
4. Configure:
   - **Name**: taskflow-pro-api
   - **Root Directory**: backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Wait for deployment (3-5 minutes)
7. Copy your backend URL (e.g., `https://taskflow-pro-api.onrender.com`)

## Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository `rayen548/taskflow-pro`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Environment Variables**:
     - Name: `VITE_API_URL`
     - Value: Your Render backend URL (from step 7 above)
5. Click "Deploy"
6. Wait for deployment (2-3 minutes)
7. Your app will be live at `https://your-app.vercel.app`

## Alternative: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `taskflow-pro`
5. Add variables:
   - `PORT`: 8000
6. Railway will auto-detect and deploy

## Alternative: Deploy Frontend to Netlify

1. Go to [Netlify.com](https://netlify.com)
2. Click "Add new site" → "Import from Git"
3. Connect GitHub and select your repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL
6. Deploy

## After Deployment

Update your backend CORS settings in `backend/main.py` to include your frontend URL:
```python
allow_origins=["https://your-frontend-url.vercel.app"]
```

Then commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Your app will be live and accessible worldwide! 🚀
