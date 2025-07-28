import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import pointsRoutes from './routes/points'
import rewardsRoutes from './routes/rewards'
import socialMediaRoutes from './routes/socialMedia'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({
    status: 'OK',
    message: 'EcoDrizzle Loyalty API is running',
    timestamp: new Date().toISOString()
  })
})

// // API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/points', pointsRoutes)
app.use('/api/rewards', rewardsRoutes)
app.use('/api/social-media', socialMediaRoutes)

// Error handling middleware
app.use((err: any, _: express.Request, res: express.Response, __: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  })
})

app.listen(PORT, () => {
  console.log(`🚀 EcoDrizzle Loyalty API server running on port ${PORT}`)
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})