import express from 'express'
import { ApiResponse, Transaction } from '../types'

const router = express.Router()

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
]

// Get points balance
router.get('/balance', (req, res) => {
  const response: ApiResponse<{ balance: number }> = {
    success: true,
    message: 'Points balance retrieved successfully',
    data: { balance: 2450 },
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

// Get transaction history
router.get('/transactions', (req, res) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const start = (page - 1) * limit
  
  const paginatedTransactions = mockTransactions.slice(start, start + limit)
  
  const response: ApiResponse<Transaction[]> = {
    success: true,
    message: 'Transactions retrieved successfully',
    data: paginatedTransactions,
    timestamp: new Date().toISOString()
  }
  res.json(response)
})

export default router