#!/bin/bash

echo "🚀 Starting deployment..."

echo "📦 Building application..."
npm run build

echo "📁 Copying static files for standalone..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

echo "🔄 Restarting PM2..."
pm2 restart gomanic-landing-br

echo "✅ Deploy completed!"
echo "📋 Recent logs:"
pm2 logs gomanic-landing-br --lines 10
