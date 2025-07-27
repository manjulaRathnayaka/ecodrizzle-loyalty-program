import type { User, Transaction, Reward, SocialMediaPost, SocialMediaAccount } from '../types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'earn',
    amount: 150,
    description: 'Social media post about our new product',
    source: 'social_media',
    timestamp: '2024-01-20T10:30:00Z',
    status: 'completed',
  },
  {
    id: '2',
    userId: '1',
    type: 'spend',
    amount: 500,
    description: 'Redeemed $5 gift card',
    source: 'reward',
    timestamp: '2024-01-18T14:15:00Z',
    status: 'completed',
  },
  {
    id: '3',
    userId: '1',
    type: 'earn',
    amount: 100,
    description: 'Friend referral bonus',
    source: 'referral',
    timestamp: '2024-01-15T09:00:00Z',
    status: 'completed',
  },
]

const mockRewards: Reward[] = [
  {
    id: '1',
    name: '$5 Amazon Gift Card',
    description: 'Digital gift card delivered instantly to your email',
    pointsRequired: 500,
    category: 'gift_cards',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop',
    availability: 100,
    redemptionInstructions: 'Gift card code will be sent to your email within 5 minutes',
    featured: true,
  },
  {
    id: '2',
    name: '20% Off Next Purchase',
    description: 'Save 20% on your next order with this discount code',
    pointsRequired: 250,
    category: 'discounts',
    imageUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=200&fit=crop',
    availability: 200,
    redemptionInstructions: 'Use code at checkout for 20% off your entire order',
    featured: false,
  },
  {
    id: '3',
    name: 'Premium Coffee Mug',
    description: 'High-quality ceramic mug with our logo',
    pointsRequired: 750,
    category: 'merchandise',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=200&fit=crop',
    availability: 50,
    redemptionInstructions: 'Item will be shipped to your address within 3-5 business days',
    featured: true,
  },
  {
    id: '4',
    name: 'VIP Event Access',
    description: 'Exclusive access to our annual customer appreciation event',
    pointsRequired: 1500,
    category: 'experiences',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    availability: 25,
    expirationDate: '2024-12-31',
    redemptionInstructions: 'Event details and tickets will be sent 2 weeks before the event',
    featured: true,
  },
]

const mockSocialMediaPosts: SocialMediaPost[] = [
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
  {
    id: '2',
    userId: '1',
    platform: 'facebook',
    postUrl: 'https://facebook.com/post/456',
    postId: 'fb_456',
    content: 'EcoDrizzle delivery was super fast! Impressed with the customer service. Definitely ordering again soon.',
    engagement: {
      likes: 32,
      shares: 6,
      comments: 4,
      views: 180,
    },
    postDate: '2024-01-18T15:20:00Z',
    status: 'approved',
    pointsEarned: 120,
    pointsClaimed: true,
    createdAt: '2024-01-18T15:25:00Z',
    updatedAt: '2024-01-19T09:15:00Z',
  },
  {
    id: '3',
    userId: '1',
    platform: 'facebook',
    postUrl: 'https://facebook.com/post/789',
    postId: 'fb_789',
    content: 'Check out this unboxing of my EcoDrizzle order! The packaging is so thoughtful and eco-friendly.',
    engagement: {
      likes: 67,
      shares: 18,
      comments: 15,
      views: 420,
    },
    postDate: '2024-01-15T14:45:00Z',
    status: 'pending',
    pointsEarned: 0,
    pointsClaimed: false,
    createdAt: '2024-01-15T14:50:00Z',
    updatedAt: '2024-01-15T14:50:00Z',
  },
]

const mockSocialMediaAccount: SocialMediaAccount = {
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

export const mockApi = {
  // Auth
  async login(email: string, password: string) {
    await delay(1000)
    if (email === 'demo@example.com' && password === 'demo123') {
      return {
        user: mockUser,
        token: 'mock-jwt-token',
      }
    }
    throw new Error('Invalid credentials')
  },

  async getCurrentUser(): Promise<User> {
    await delay(500)
    return mockUser
  },

  // Points and Transactions
  async getPointsBalance(): Promise<number> {
    await delay(300)
    return mockUser.pointsBalance
  },

  async getTransactions(page = 1, limit = 10): Promise<Transaction[]> {
    await delay(500)
    const start = (page - 1) * limit
    return mockTransactions.slice(start, start + limit)
  },

  // Rewards
  async getRewards(): Promise<Reward[]> {
    await delay(600)
    return mockRewards
  },

  async redeemReward(rewardId: string): Promise<{ success: boolean; message: string }> {
    await delay(1000)
    const reward = mockRewards.find(r => r.id === rewardId)
    if (!reward) {
      throw new Error('Reward not found')
    }
    if (mockUser.pointsBalance < reward.pointsRequired) {
      throw new Error('Insufficient points')
    }
    
    mockUser.pointsBalance -= reward.pointsRequired
    return {
      success: true,
      message: 'Reward redeemed successfully!',
    }
  },

  // Social Media
  async getSocialMediaPosts(): Promise<SocialMediaPost[]> {
    await delay(700)
    return mockSocialMediaPosts
  },

  async getSocialMediaAccounts(): Promise<SocialMediaAccount[]> {
    await delay(400)
    return [mockSocialMediaAccount]
  },

  async claimSocialMediaPoints(_userId: string, _email: string): Promise<{ success: boolean; pointsEarned: number }> {
    await delay(1500)
    const unclaimedPosts = mockSocialMediaPosts.filter(
      post => post.status === 'approved' && !post.pointsClaimed
    )
    
    const totalPoints = unclaimedPosts.reduce((sum, post) => sum + post.pointsEarned, 0)
    
    unclaimedPosts.forEach(post => {
      post.pointsClaimed = true
      post.updatedAt = new Date().toISOString()
    })
    
    mockUser.pointsBalance += totalPoints
    
    return {
      success: true,
      pointsEarned: totalPoints,
    }
  },

  // User Profile
  async updateUserProfile(userData: Partial<User>): Promise<User> {
    await delay(800)
    Object.assign(mockUser, userData)
    return mockUser
  },
}