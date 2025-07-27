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

## API Integration

The application connects directly to the backend API for all data:

### Configuration

Set the API URL in your environment variables:

```bash
# .env
VITE_API_URL=http://localhost:3001/api
VITE_DEBUG=true
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3001/api` |
| `VITE_DEBUG` | Enable API request logging | `true` |
| `VITE_API_TIMEOUT` | Request timeout in milliseconds | `10000` |
| `VITE_APP_NAME` | Application name | `EcoDrizzle Loyalty Program` |
| `VITE_ENABLE_SOCIAL_MEDIA` | Enable social media features | `true` |
| `VITE_ENABLE_REWARDS` | Enable rewards features | `true` |

### API Endpoints

The app expects the following API endpoints:

- `POST /auth/login` - User authentication
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile  
- `GET /points/balance` - Get points balance
- `GET /points/transactions` - Get transaction history
- `GET /rewards` - Get rewards catalog
- `POST /rewards/:id/redeem` - Redeem reward
- `GET /social-media/posts` - Get social media posts
- `POST /social-media/claim` - Claim social media points

### Backend Dependency

The frontend application requires the backend API to be running for all functionality. The backend provides mock data for demonstration purposes.

## Deployment

The application is ready for deployment to static hosting services like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Environment-specific Deployments

For different environments, update the `.env` file:

**Production:**
```bash
VITE_API_URL=https://api.ecodrizzle.com/api
VITE_DEBUG=false
```

**Staging:**
```bash
VITE_API_URL=https://staging-api.ecodrizzle.com/api
VITE_DEBUG=true
```
