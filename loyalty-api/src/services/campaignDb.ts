import mysql from 'mysql2/promise'

// Shared database pool
let pool: mysql.Pool | null = null

// Initialize database connection
const getPool = (): mysql.Pool => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'loyalty_campaigns',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }
    return pool
}

// Get user fb id from email
export const getUserFbID = async (email: string): Promise<string | null> => {
    try {
        const dbPool = getPool()
        const [rows] = await dbPool.execute(
            'SELECT facebook_user_id FROM email_facebook_mapping WHERE email = ?',
            [email]
        )
        // Select the first one from query result
        return (Array.isArray(rows) && rows.length > 0) ? (rows[0] as any).facebook_user_id : null;
    } catch (error) {
        console.error('Error fetching active campaigns:', error)
        throw error
    }
}

// Get new posts from database
export const getNewPosts = async (posts: any[]): Promise<any[]> => {
    try {
        const dbPool = getPool()

        if (posts.length === 0) {
            return []
        }

        // Extract post IDs from the posts array
        const postIds = posts.map(post => post.postId)

        // Query to find posts that are not in posts_loyalty_points table
        const placeholders = postIds.map(() => '?').join(',')
        const [rows] = await dbPool.execute(
            `SELECT post_id FROM posts_loyalty_points WHERE post_id IN (${placeholders})`,
            postIds
        )

        // Get the post IDs that are already in the database
        const existingPostIds = (rows as any[]).map(row => row.post_id)

        // Filter out posts that are already in the database
        const newPosts = posts.filter(post => !existingPostIds.includes(post.postId))

        return newPosts
    } catch (error) {
        console.error('Error filtering new posts:', error)
        throw error
    }
}

// Close database connection
export const closeDbConnection = async (): Promise<void> => {
    if (pool) {
        await pool.end()
        pool = null
    }
}

export const getPointsForPosts = async (posts: any[]): Promise<any[]> => {
    return posts.map(post => post.points)
}