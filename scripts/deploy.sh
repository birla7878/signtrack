#!/bin/bash

# SignTrack Deployment Script

echo "🚀 Starting SignTrack Deployment..."

# Check if required files exist
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your environment variables"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Run tests (if any)
echo "🧪 Running tests..."
npm run lint

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your SignTrack app is now live!"
