#!/bin/bash

# Build frontend
echo "Building frontend..."
npm run build

# Setup server dependencies
echo "Setting up server..."
cd server
npm install
npx prisma generate

echo "Build completed!"