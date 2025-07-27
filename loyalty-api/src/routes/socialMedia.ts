import express from 'express'
import { ApiResponse, SocialMediaPost } from '../types'

const router = express.Router()

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