#!/bin/bash

# Run npm install in the root directory
echo "Installing root dependencies..."
npm install
echo "Root dependencies installed."

# Navigate to the frontend directory
cd frontend || exit
echo "Switched to frontend directory."

# Copy .env.example to .env
cp .env.example .env
echo ".env file created in frontend."

# Install npm dependencies
npm install
echo "Frontend dependencies installed."

# Navigate back to the root directory
cd ..

# Navigate to the backend directory
cd backend || exit
echo "Switched to backend directory."

# Copy .env.example to .env
cp .env.example .env
echo ".env file created in backend."

# Install npm dependencies
npm install
echo "Backend dependencies installed."

echo "Setup completed successfully."