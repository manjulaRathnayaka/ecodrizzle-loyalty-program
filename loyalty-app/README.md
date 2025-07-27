# EcoDrizzle Loyalty Program - Frontend

A modern React TypeScript web application for managing loyalty points, rewards, and social media engagement.

## Features

- 🔐 **Authentication**: Mock authentication system with user profiles
- 📊 **Dashboard**: Points balance, quick actions, and recent activity
- 🎁 **Rewards Catalog**: Browse and redeem rewards with points
- 📱 **Social Media Integration**: Claim points for social media posts
- 👤 **User Profile**: Manage account settings and preferences
- 💰 **Earn Points**: Discover ways to earn more loyalty points
- 🎨 **Modern UI**: Responsive design with styled-components
- 🌓 **Theme Support**: Light/dark theme configuration

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Styled Components** for styling
- **Context API** for state management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the loyalty-app directory:
```bash
cd loyalty-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Demo Login

Use these credentials to test the application:
- **Email**: demo@example.com
- **Password**: demo123

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── pages/              # Main application pages
├── styles/             # Theme and global styles
├── types/              # TypeScript type definitions
├── api/                # API layer and mock data
└── App.tsx             # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Overview

### Dashboard
- View current points balance
- Quick actions for common tasks
- Recent transaction history

### Rewards
- Browse available rewards by category
- Filter rewards by type
- Redeem rewards with points
- View redemption instructions

### Social Media Points
- View connected social media accounts
- Browse social media posts and engagement
- Claim points for approved posts
- Filter posts by status

### Profile
- View user information
- Update preferences
- Achievement badges
- Account management

## Deployment

The application is ready for deployment to static hosting services like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
