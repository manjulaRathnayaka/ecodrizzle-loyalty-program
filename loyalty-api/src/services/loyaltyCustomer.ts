import axios from 'axios'

interface LoyaltyCustomer {
    id: string
    email: string
    name: string
    points_balance: number
    tier: string
    join_date: string
    is_active: boolean
}

interface PointsTransaction {
    id: string
    customer_id: string
    type: 'earn' | 'spend'
    amount: number
    description: string
    source: string
    created_at: string
}

// Shared API client
let apiClient: any = null

// Initialize API client
const getApiClient = () => {
    if (!apiClient) {
        apiClient = axios.create({
            baseURL: process.env.LOYALTY_API_URL || 'http://localhost:3002/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LOYALTY_API_TOKEN || ''}`
            }
        })
    }
    return apiClient
}

// Get customer by ID
export const getCustomerById = async (customerId: string): Promise<LoyaltyCustomer | null> => {
    try {
        const client = getApiClient()
        const response = await client.get(`/customers/${customerId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching customer:', error)
        return null
    }
}

// Get customer by email
export const getCustomerByEmail = async (email: string): Promise<LoyaltyCustomer | null> => {
    try {
        const client = getApiClient()
        const response = await client.get(`/customers/email/${email}`)
        return response.data
    } catch (error) {
        console.error('Error fetching customer by email:', error)
        return null
    }
}

// Add points to customer
export const addPoints = async (customerId: string, points: number, description: string, source: string): Promise<boolean> => {
    try {
        const client = getApiClient()
        const response = await client.post(`/customers/${customerId}/points`, {
            amount: points,
            description,
            source
        })
        return response.status === 200
    } catch (error) {
        console.error('Error adding points:', error)
        return false
    }
}

// Get customer's points balance
export const getPointsBalance = async (customerId: string): Promise<number> => {
    try {
        const customer = await getCustomerById(customerId)
        return customer?.points_balance || 0
    } catch (error) {
        console.error('Error getting points balance:', error)
        return 0
    }
}

// Get customer's transaction history
export const getTransactionHistory = async (customerId: string, limit: number = 10): Promise<PointsTransaction[]> => {
    try {
        const client = getApiClient()
        const response = await client.get(`/customers/${customerId}/transactions`, {
            params: { limit }
        })
        return response.data || []
    } catch (error) {
        console.error('Error fetching transaction history:', error)
        return []
    }
}

// Create new customer
export const createCustomer = async (email: string, name: string): Promise<LoyaltyCustomer | null> => {
    try {
        const client = getApiClient()
        const response = await client.post('/customers', {
            email,
            name
        })
        return response.data
    } catch (error) {
        console.error('Error creating customer:', error)
        return null
    }
} 