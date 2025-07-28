import axios from 'axios'
import { facebook } from '../config'

// Initialize axios client for Facebook Graph API
const facebookApi = axios.create({
    baseURL: 'https://graph.facebook.com/v19.0',
    timeout: 10000,
})

// Add page token to all requests
facebookApi.interceptors.request.use((config) => {
    if (config.params) {
        (config.params as any).access_token = facebook.pageToken
    } else {
        config.params = { access_token: facebook.pageToken }
    }
    return config
})

// Get user's posts from Facebook page
export const getUsersPostEligibleForPoints = async (pageId: string, userId: string) => {
    try {
        const response = await facebookApi.get(`/${pageId}/tagged`, {
            params: {
                access_token: facebook.pageToken,
            },
        })
        return extractPostAndUserIds(response, userId);
    } catch (error) {
        console.error('Error fetching Facebook tagged posts:', error)
        throw error
    }
}

// Extract post ID and user ID from Facebook response
export const extractPostAndUserIds = (
    response: any,
    userId: string
): Array<ExtractedPostData | undefined> => {
    const posts = response.data || []
    const extractedData = posts.map((post: any) => {
        const postIdParts = post.id.split('_')
        if (postIdParts[1] === userId) { // check if the post is tagged to the user
            return {
                postId: post.id,
                userId: postIdParts[1],
                message: post.message,
                taggedTime: post.tagged_time
            }
        }
    })
    return extractedData
}

// Get post metadata from facebook graph api
export const getPostMetadata = async (posts: any[]) => {
    const postMetadata = await facebookApi.get(`/${posts[0].postId}`, {
        params: {
            access_token: facebook.pageToken,
        },
    })
}

export const getUsersPost = async (pageId: string, userId: string) => {

}


// Define an interface for the extracted post data
export interface ExtractedPostData {
    postId: string;
    userId: string;
    message: string;
    taggedTime: any;
}