# Next Steps: Deploy to GitHub & Vercel

## Step 1: Create GitHub Repository
1. Go to GitHub.com
2. Click "New" (top left)
3. Name: `old-town-tatu`
4. Create repository

## Step 2: Add Remote & Push
Copy these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/old-town-tatu.git
git branch -M main
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username.

## Step 3: Add Logo File
1. Go to your GitHub repo
2. Click "Add file" → "Upload files"
3. Drag `tony-wulfman-logo.png` into GitHub
4. Navigate to `public/` folder first
5. Upload there
6. Commit

## Step 4: Deploy to Vercel
1. Go to Vercel.com
2. Click "Add New" → "Project"
3. Select your `old-town-tatu` repository
4. Click "Deploy"
5. Wait for build to complete

## Step 5: Add Environment Variables
1. In Vercel dashboard, go to Settings
2. Click "Environment Variables"
3. Add:
   - Key: GMAIL_USER
   - Value: tonywulfman.art@gmail.com
   - Key: GMAIL_PASSWORD
   - Value: <your 16-character Gmail app password>
4. Click "Save"
5. Go to Deployments and click "Redeploy"

## Step 6: Test
1. Visit your Vercel URL
2. Fill out appointment form
3. Check emails (client + Tony)

## Done! 🎉
Your site is live!
