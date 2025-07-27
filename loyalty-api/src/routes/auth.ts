import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ApiResponse, User } from '../types'

const router = express.Router()

// Mock user data (in production, this would come from a database)
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  pointsBalance: 2450,
  tier: 'Gold',
  joinDate: '2023-01-15',
  preferences: {
    notifications: true,
    theme: 'light',
    language: 'en',
  },
}

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        timestamp: new Date().toISOString()
      })
    }

    // Demo authentication - in production, verify against database
    if (email === 'demo@example.com' && password === 'demo123') {
      const token = jwt.sign(
        { userId: mockUser.id, email: mockUser.email },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '7d' }
      )

      const response: ApiResponse<{ user: User; token: string }> = {
        success: true,
        message: 'Login successful',
        data: { user: mockUser, token },
        timestamp: new Date().toISOString()
      }

      res.json(response)
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      timestamp: new Date().toISOString()
    })
  }
})

// Register endpoint (demo)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
        timestamp: new Date().toISOString()
      })
    }

    // Demo registration - in production, save to database
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      pointsBalance: 100, // Welcome bonus
      tier: 'Bronze',
      joinDate: new Date().toISOString(),
      preferences: {
        notifications: true,
        theme: 'light',
        language: 'en',
      },
    }

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '7d' }
    )

    const response: ApiResponse<{ user: User; token: string }> = {
      success: true,
      message: 'Registration successful',
      data: { user: newUser, token },
      timestamp: new Date().toISOString()
    }

    res.status(201).json(response)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      timestamp: new Date().toISOString()
    })
  }
})

// Verify token endpoint
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
        timestamp: new Date().toISOString()
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret') as any

    const response: ApiResponse<{ user: User }> = {
      success: true,
      message: 'Token verified',
      data: { user: mockUser },
      timestamp: new Date().toISOString()
    }

    res.json(response)
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      timestamp: new Date().toISOString()
    })
  }
})

export default router