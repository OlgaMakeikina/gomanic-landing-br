#!/bin/bash

echo "🚀 Starting deployment..."

echo "📦 Building application..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart gomanic-landing-br

echo "✅ Deploy completed!"
echo "📋 Recent logs:"
pm2 logs gomanic-landing-br --lines 10
