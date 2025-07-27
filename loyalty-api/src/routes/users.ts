import express from 'express'
import { ApiResponse, User } from '../types'

const router = express.Router()

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

// Get current user profile
router.get('/profile', (req, res) => {
  const response: ApiResponse<User> = {
    success: true,
    message: 'User profile retrieved successfully',
    data: mockUser,
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

// Update user profile
router.put('/profile', (req, res) => {
  const updates = req.body
  Object.assign(mockUser, updates)
  
  const response: ApiResponse<User> = {
    success: true,
    message: 'Profile updated successfully',
    data: mockUser,
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

export default router