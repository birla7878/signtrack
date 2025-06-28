#!/bin/bash

echo "🚀 SignTrack Quick Deploy"
echo "========================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Run this from your project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub"
    echo "2. Connect to Vercel"
    echo "3. Deploy!"
    echo ""
    echo "Or run: npx vercel"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi
