import express from 'express'
import { ApiResponse, Reward } from '../types'

const router = express.Router()

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
]

// Get all rewards
router.get('/', (req, res) => {
  const response: ApiResponse<Reward[]> = {
    success: true,
    message: 'Rewards retrieved successfully',
    data: mockRewards,
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

// Redeem a reward
router.post('/:id/redeem', (req, res) => {
  const rewardId = req.params.id
  const reward = mockRewards.find(r => r.id === rewardId)
  
  if (!reward) {
    return res.status(404).json({
      success: false,
      message: 'Reward not found',
      timestamp: new Date().toISOString()
    })
  }
  
  const response: ApiResponse<{ message: string }> = {
    success: true,
    message: 'Reward redeemed successfully',
    data: { message: reward.redemptionInstructions },
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

export default router