import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

interface FacebookConfig {
    pageToken: string
    pageId: string
}

interface Config {
    facebook: FacebookConfig
}

// Configuration object for Facebook
export const config: Config = {
    facebook: {
        pageToken: process.env.FB_PAGE_TOKEN || '',
        pageId: process.env.FB_PAGE_ID || '704633709403601',
    }
}

// Export individual config sections for convenience
export const { facebook } = config

export default config 