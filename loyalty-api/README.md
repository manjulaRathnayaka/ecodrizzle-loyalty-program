# EcoDrizzle Loyalty Program - Backend API

A Node.js Express API server for the EcoDrizzle loyalty program with authentication, points management, rewards, and social media integration.

## Features

- 🔐 **Authentication**: JWT-based auth with mock user data
- 👤 **User Management**: Profile management and preferences
- 💰 **Points System**: Track points balance and transactions
- 🎁 **Rewards Management**: Catalog and redemption endpoints
- 📱 **Social Media**: Posts tracking and points claiming
- 🚀 **RESTful API**: Clean, documented endpoints
- 🔒 **CORS Support**: Cross-origin resource sharing
- 📝 **TypeScript**: Type-safe development

## Technology Stack

- **Node.js** with TypeScript
- **Express.js** web framework
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the loyalty-api directory:
```bash
cd loyalty-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Points
- `GET /api/points/balance` - Get points balance
- `GET /api/points/transactions` - Get transaction history

### Rewards
- `GET /api/rewards` - Get all rewards
- `POST /api/rewards/:id/redeem` - Redeem a reward

### Social Media
- `GET /api/social-media/posts` - Get social media posts
- `POST /api/social-media/claim` - Claim social media points

## Demo Authentication

Use these credentials for testing:
- **Email**: demo@example.com
- **Password**: demo123

## Environment Variables

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-jwt-secret-key-here
```

## Project Structure

```
src/
├── routes/             # API route handlers
├── types/              # TypeScript type definitions
├── middleware/         # Express middleware
├── utils/              # Utility functions
└── server.ts           # Main server file
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (not implemented)

## API Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

Errors are returned in the same format:

```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- Custom frontend URL via `FRONTEND_URL` environment variable

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Mock Data

This demo API uses mock data for:
- User profiles
- Points and transactions
- Rewards catalog
- Social media posts

In production, this would be replaced with a real database.

## Deployment

The API can be deployed to:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Any Node.js hosting service

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Real social media API integration
- Email notifications
- Admin dashboard
- Analytics and reporting
- Rate limiting
- API documentation with Swagger