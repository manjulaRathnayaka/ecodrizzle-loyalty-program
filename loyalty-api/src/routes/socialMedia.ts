import express from 'express'
import { ApiResponse, SocialMediaPost } from '../types'

const router = express.Router()

interface SocialMediaAccount {
  id: string
  userId: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
  handle: string
  displayName: string
  profileImageUrl: string
  verified: boolean
  connectedDate: string
  lastSyncDate: string
  isActive: boolean
  permissions: string[]
}

const mockPosts: SocialMediaPost[] = [
  {
    id: '1',
    userId: '1',
    platform: 'facebook',
    postUrl: 'https://facebook.com/post/123',
    postId: 'fb_123',
    content: 'Just tried the amazing new EcoDrizzle products! Love the sustainable packaging and great quality. #EcoDrizzle #Sustainable',
    engagement: {
      likes: 45,
      shares: 12,
      comments: 8,
      views: 230,
    },
    postDate: '2024-01-20T10:30:00Z',
    status: 'approved',
    pointsEarned: 150,
    pointsClaimed: false,
    createdAt: '2024-01-20T10:35:00Z',
    updatedAt: '2024-01-20T12:00:00Z',
  },
]

const mockAccount: SocialMediaAccount = {
  id: '1',
  userId: '1',
  platform: 'facebook',
  handle: '@alexjohnson',
  displayName: 'Alex Johnson',
  profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  verified: false,
  connectedDate: '2023-12-01T00:00:00Z',
  lastSyncDate: '2024-01-20T12:00:00Z',
  isActive: true,
  permissions: ['read_posts', 'read_engagement'],
}

// Get social media accounts
router.get('/accounts', (req, res) => {
  const response: ApiResponse<SocialMediaAccount[]> = {
    success: true,
    message: 'Social media accounts retrieved successfully',
    data: [mockAccount],
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

// Get social media posts
router.get('/posts', (req, res) => {
  const response: ApiResponse<SocialMediaPost[]> = {
    success: true,
    message: 'Social media posts retrieved successfully',
    data: mockPosts,
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

// Claim social media points
router.post('/claim', (req, res) => {
  const { userId, email } = req.body
  
  const unclaimedPosts = mockPosts.filter(
    post => post.status === 'approved' && !post.pointsClaimed
  )
  
  const totalPoints = unclaimedPosts.reduce((sum, post) => sum + post.pointsEarned, 0)
  
  // Mark posts as claimed
  unclaimedPosts.forEach(post => {
    post.pointsClaimed = true
    post.updatedAt = new Date().toISOString()
  })
  
  const response: ApiResponse<{ pointsEarned: number }> = {
    success: true,
    message: 'Points claimed successfully',
    data: { pointsEarned: totalPoints },
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

export default router