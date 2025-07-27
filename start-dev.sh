#!/bin/bash

# EcoDrizzle Loyalty Program - Development Server Startup Script

echo "🚀 Starting EcoDrizzle Loyalty Program Development Environment"
echo "============================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use. Please stop the process using that port and try again."
        return 1
    fi
    return 0
}

# Check if ports are available
echo "🔍 Checking port availability..."
if ! check_port 3001; then
    echo "Backend API port 3001 is in use"
    exit 1
fi

if ! check_port 5173; then
    echo "Frontend port 5173 is in use"
    exit 1
fi

echo "✅ Ports 3001 and 5173 are available"
echo ""

# Install dependencies for backend
echo "📦 Installing backend dependencies..."
cd loyalty-api
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "Backend dependencies already installed"
fi

# Install dependencies for frontend
echo "📦 Installing frontend dependencies..."
cd ../loyalty-app
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "Frontend dependencies already installed"
fi

echo ""
echo "🚀 Starting development servers..."
echo ""

# Start backend in background
echo "🖥️  Starting backend API on http://localhost:3001"
cd ../loyalty-api
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "🌐 Starting frontend on http://localhost:5173"
cd ../loyalty-app
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🚀 BOTH SERVICES ARE NOW RUNNING:"
echo "📱 Frontend: http://localhost:5173"
echo "🔌 Backend API: http://localhost:3001"
echo "🩺 API Health: http://localhost:3001/health"
echo ""
echo "⚠️  IMPORTANT: Both services must run together for the demo!"
echo "   The frontend requires the backend API for all data."
echo ""
echo "🔐 Demo Login Credentials:"
echo "   Email: demo@example.com"
echo "   Password: demo123"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Development servers stopped"
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait