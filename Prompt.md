# Loyalty Points Web App Generation Prompt
I need to generate a loyalty web app for a demo. This app will allow users to login and see the current loyalty points.

## Project Overview
Create a loyalty points management web application built with TypeScript and React with the following components:

### Core Features
1. **User Authentication & Profile Management**
   - Will be done by a third party IDP so for this you only need to show profile view and login status in the top navigation
   - Display user avatar and name in header
   - Simple login/logout functionality for demo purposes

2. **Loyalty Points System**
   - Display current points balance prominently on dashboard
   - There should be a button to claim social media points

3. **Rewards & Redemptions**
   - This section should show options to redeem points 
   - Generate a static list no need to hook up to a backend
   - Display available rewards with points required
   - Simple redemption flow for demo purposes

4. **Social Media Points Feature**
   - Allow users to claim points for social media posts they made about the brand
   - UI should display a summary of their social media posts and the points accumulated from each post
   - Include a "Claim" button in the UI; when clicked, it should send the user ID and email to the backend to process the claim
   - After claiming, redirect the user to the main points page and animate the increase in their points balance

### Technical Requirements

#### Frontend (Web App)
- **Framework**: React with TypeScript and Vite
- **UI/UX**: Modern, responsive web design with:
  - Clean dashboard showing points balance
  - Easy navigation between features
  - Dark/light theme support
  - Accessibility features (WCAG 2.1 compliant)
- **State Management**: React Context API
- **Navigation**: React Router with tab-based navigation
- **Styling**: CSS-in-JS (styled-components)
- **Responsive Design**: Mobile-first approach with desktop optimization
- **API Layer** extract all the API calls to a seperate source file

#### Backend API (Optional for Demo)
- **Framework**: Node.js with Express or Python with FastAPI
- **Database**: PostgreSQL or MongoDB for user data and transactions
- **Authentication**: JWT-based authentication
- **API Endpoints**:
  - User management (CRUD operations)
  - Points management (earn, spend, transfer)
  - Rewards catalog and redemption
  - Transaction history
  - Analytics and reporting
- **Note**: For demo purposes, use static data and mock API responses

#### Key Screens/Components

1. **Dashboard Screen**
   - Large points balance display with animations
   - Quick actions (earn points, redeem rewards)
   - Recent activity summary with static demo data
   - Button to claim Social Media points

2. **Rewards Screen**
   - Grid/list view of available rewards
   - Filtering by category, points required
   - Reward details modal with redemption flow
   - Redemption confirmation with success/error states

4. **Profile Screen**
   - User information display
   - Settings and preferences
   - Achievement badges (static demo data)
   - Account statistics and loyalty tier

5. **Earn Points Screen**
   - Available earning opportunities
   - Referral system display
   - Special promotions and campaigns
   - Progress tracking for ongoing challenges

6. **Social Media Points Screen**
   - Connected social media accounts overview
   - List view of social media posts with engagement metrics
   - Post status filtering (Pending, Approved, Rejected, Claimed)
   - Points calculation breakdown for each post

### Integration Requirements (Demo Focus)

#### Authentication Integration
- Mock authentication flow for demo purposes
- Keep configurations for third-party IDP integration with OAuth Authorization code
- Display user profile information
- Handle login/logout states

#### Static Data & Mock APIs
- Generate realistic mock data for points, transactions, and rewards
- Create mock API responses for all endpoints
- Implement loading states and error handling
- Simulate network delays for realistic demo experience

### Security & Performance (Demo)
- Basic input validation and sanitization
- Responsive design optimization
- Fast loading times for demo experience
- Error boundary implementation
- Accessibility compliance

### Data Models

#### User
- ID, email, password (hashed)
- Personal information (name, phone, address)
- Points balance and tier level
- Preferences and settings
- Created/updated timestamps

#### Transaction
- ID, user ID, type (earn/spend)
- Points amount, description
- Source (purchase, referral, reward, etc.)
- Timestamp, status

#### Reward
- ID, name, description
- Points required, category
- Availability, expiration
- Redemption instructions

#### UserReward
- ID, user ID, reward ID
- Redemption date, status
- Points spent

#### SocialMediaPost
- ID, user ID, platform (Facebook)
- Post URL, post ID, post content preview
- Engagement metrics (likes, shares, comments, views)
- Post date, platform-specific metadata
- Status (Pending Review, Approved, Rejected, Claimed)
- Points earned, points claimed
- Review notes (for rejected posts)
- Created/updated timestamps

#### SocialMediaAccount
- ID, user ID, platform
- Account handle, display name
- Profile image URL, verification status
- Connected date, last sync date
- Is active, permissions granted

### Development Guidelines
- Follow clean code principles and TypeScript best practices
- Implement comprehensive error handling with error boundaries
- Add console logging for debugging demo functionality
- Use TypeScript for type safety and better development experience
- Implement responsive design with mobile-first approach
- Follow accessibility guidelines (WCAG 2.1)
- Use modern React patterns (hooks, functional components)
- Keep the code clean and simple

### Deployment & DevOps (Demo)
- Simple build process with npm/yarn
- Static hosting ready (Netlify, Vercel, GitHub Pages)
- Environment variables for configuration
- Basic README with setup instructions
- Demo deployment instructions

### Additional Features to Consider (Demo)
- API documentation with Swagger/OpenAPI
- Dark/light theme toggle

### Demo Requirements Summary
- **Technology Stack**: React + TypeScript web application
- **Authentication**: Mock third-party IDP integration with OAuth Authorization code
- **Data**: Static mock data for all features
- **UI/UX**: Modern, responsive design with animations
- **Deployment**: Static hosting ready
- **Focus**: Functional demo with realistic user experience

Please generate a complete, demo-ready React TypeScript web application based on these requirements, ensuring all components work together seamlessly and provide an engaging user experience for showcasing loyalty points functionality.
Please create the web app in loyalty-app and backend api in loyalty-api directories.
