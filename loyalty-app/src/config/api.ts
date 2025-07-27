// API Configuration
export const apiConfig = {
  // Default to localhost for development, can be overridden by environment variable
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // Request timeout in milliseconds
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  
  // Log API calls in development
  debug: import.meta.env.VITE_DEBUG !== 'false' && import.meta.env.DEV,
}

// Environment-specific configurations
export const environments = {
  development: {
    baseUrl: 'http://localhost:3001/api',
    debug: true,
  },
  
  production: {
    baseUrl: 'https://api.ecodrizzle.com/api',
    debug: false,
  },
  
  staging: {
    baseUrl: 'https://staging-api.ecodrizzle.com/api',
    debug: true,
  },
}

// Get configuration based on environment
export const getApiConfig = () => {
  const env = import.meta.env.MODE || 'development'
  
  // Override with environment-specific config if available
  const envConfig = environments[env as keyof typeof environments]
  
  return {
    ...apiConfig,
    ...envConfig,
    // Always allow environment variable override
    baseUrl: import.meta.env.VITE_API_URL || envConfig?.baseUrl || apiConfig.baseUrl,
  }
}