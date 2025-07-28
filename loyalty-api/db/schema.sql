-- EcoDrizzle Loyalty Program - Essential Tables Only

-- ================================================================
-- Email to Facebook ID Mapping Table
-- ================================================================
CREATE TABLE email_facebook_mapping (
    email VARCHAR(255) PRIMARY KEY,
    facebook_user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_facebook_user_id (facebook_user_id)
);

-- ================================================================
-- Posts Loyalty Points Table
-- ================================================================
CREATE TABLE posts_loyalty_points (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL,
    facebook_user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    post_data JSON NOT NULL, -- Full post in JSON format
    points_earned INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_post (facebook_user_id, post_id),
    INDEX idx_email (email),
    INDEX idx_facebook_user_id (facebook_user_id),
    INDEX idx_post_id (post_id)
);