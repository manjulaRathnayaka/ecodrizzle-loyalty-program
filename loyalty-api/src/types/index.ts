export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  pointsBalance: number
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  joinDate: string
  preferences: {
    notifications: boolean
    theme: 'light' | 'dark'
    language: string
  }
}

export interface Transaction {
  id: string
  userId: string
  type: 'earn' | 'spend'
  amount: number
  description: string
  source: 'purchase' | 'referral' | 'reward' | 'social_media' | 'bonus'
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

export interface Reward {
  id: string
  name: string
  description: string
  pointsRequired: number
  category: 'gift_cards' | 'discounts' | 'experiences' | 'merchandise'
  imageUrl: string
  availability: number
  expirationDate?: string
  redemptionInstructions: string
  featured: boolean
}

export interface SocialMediaPost {
  id: string
  userId: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
  postUrl: string
  postId: string
  content: string
  engagement: {
    likes: number
    shares: number
    comments: number
    views: number
  }
  postDate: string
  status: 'pending' | 'approved' | 'rejected' | 'claimed'
  pointsEarned: number
  pointsClaimed: boolean
  reviewNotes?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  timestamp: string
}