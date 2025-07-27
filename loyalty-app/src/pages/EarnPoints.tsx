import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'

const EarnPointsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const OpportunityCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const CardTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`

const PointsValue = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ActionButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const ReferralSection = styled.div`
  background: ${({ theme }) => theme.colors.gradient.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  color: white;
`

const ReferralTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ReferralCode = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: 2px;
`

const ShareButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`

const ShareButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const ChallengesSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ChallengesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ChallengeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const ChallengeInfo = styled.div`
  flex: 1;
`

const ChallengeName = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ChallengeDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressBar = styled.div`
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 0.5rem;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressFill = styled.div<{ progress: number }>`
  background: ${({ theme }) => theme.colors.gradient.primary};
  height: 100%;
  width: ${({ progress }) => progress}%;
  transition: ${({ theme }) => theme.transitions.default};
`

const ProgressText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ChallengeReward = styled.div`
  text-align: right;
`

const RewardPoints = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const RewardLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const opportunities = [
  {
    icon: '📱',
    title: 'Social Media Posts',
    description: 'Share your EcoDrizzle experience on social media and earn points for each approved post.',
    points: '50-200 points per post',
    action: 'Start Posting',
    route: '/social-media'
  },
  {
    icon: '🛒',
    title: 'Make Purchases',
    description: 'Earn points on every purchase. The more you shop, the more you earn!',
    points: '1 point per $1 spent',
    action: 'Shop Now',
    route: null
  },
  {
    icon: '👥',
    title: 'Refer Friends',
    description: 'Invite friends to join EcoDrizzle and earn bonus points when they make their first purchase.',
    points: '500 points per referral',
    action: 'Refer Now',
    route: null
  },
  {
    icon: '📝',
    title: 'Write Reviews',
    description: 'Share your product reviews and help other customers make informed decisions.',
    points: '25 points per review',
    action: 'Write Review',
    route: null
  },
  {
    icon: '📧',
    title: 'Newsletter Signup',
    description: 'Stay updated with our latest products and offers while earning points.',
    points: '100 points',
    action: 'Subscribe',
    route: null
  },
  {
    icon: '🎂',
    title: 'Birthday Bonus',
    description: 'Celebrate your special day with us and receive birthday bonus points.',
    points: '250 points annually',
    action: 'Update Profile',
    route: '/profile'
  }
]

const challenges = [
  {
    name: 'Social Media Champion',
    description: 'Post about EcoDrizzle on 5 different occasions this month',
    progress: 60,
    current: 3,
    target: 5,
    reward: 500
  },
  {
    name: 'Shopping Spree',
    description: 'Make 3 purchases totaling $150 or more',
    progress: 33,
    current: 1,
    target: 3,
    reward: 300
  },
  {
    name: 'Review Master',
    description: 'Write detailed reviews for 10 products',
    progress: 80,
    current: 8,
    target: 10,
    reward: 250
  }
]

const EarnPoints: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleOpportunityClick = (route: string | null) => {
    if (route) {
      navigate(route)
    } else {
      // For demo purposes, show alert for external actions
      alert('This would redirect to the external action (purchase, review, etc.)')
    }
  }

  const handleShare = (platform: string) => {
    const referralCode = user ? `FRIEND-${user.id.toUpperCase()}` : 'FRIEND-DEMO'
    const message = `Join me on EcoDrizzle! Use my referral code ${referralCode} to get started.`
    
    // For demo purposes, just copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
      alert(`Referral message copied to clipboard for ${platform}!`)
    })
  }

  return (
    <EarnPointsContainer>
      <Header>
        <Title>Earn More Points</Title>
        <Subtitle>
          Discover all the ways to earn points and boost your loyalty rewards. 
          The more you engage, the more you earn!
        </Subtitle>
      </Header>

      <OpportunitiesGrid>
        {opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={index}
            onClick={() => handleOpportunityClick(opportunity.route)}
          >
            <CardIcon>{opportunity.icon}</CardIcon>
            <CardTitle>{opportunity.title}</CardTitle>
            <CardDescription>{opportunity.description}</CardDescription>
            <PointsValue>{opportunity.points}</PointsValue>
            <ActionButton>{opportunity.action}</ActionButton>
          </OpportunityCard>
        ))}
      </OpportunitiesGrid>

      <ReferralSection>
        <ReferralTitle>Refer Friends & Earn</ReferralTitle>
        <p>Share your unique referral code and earn 500 points for each friend who joins!</p>
        <ReferralCode>
          FRIEND-{user ? user.id.toUpperCase() : 'DEMO'}
        </ReferralCode>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('Email')}>
            📧 Email
          </ShareButton>
          <ShareButton onClick={() => handleShare('WhatsApp')}>
            💬 WhatsApp
          </ShareButton>
          <ShareButton onClick={() => handleShare('Facebook')}>
            📘 Facebook
          </ShareButton>
          <ShareButton onClick={() => handleShare('Twitter')}>
            🐦 Twitter
          </ShareButton>
        </ShareButtons>
      </ReferralSection>

      <ChallengesSection>
        <SectionTitle>Monthly Challenges</SectionTitle>
        <ChallengesList>
          {challenges.map((challenge, index) => (
            <ChallengeItem key={index}>
              <ChallengeInfo>
                <ChallengeName>{challenge.name}</ChallengeName>
                <ChallengeDescription>{challenge.description}</ChallengeDescription>
                <ProgressBar>
                  <ProgressFill progress={challenge.progress} />
                </ProgressBar>
                <ProgressText>
                  {challenge.current} of {challenge.target} completed
                </ProgressText>
              </ChallengeInfo>
              <ChallengeReward>
                <RewardPoints>+{challenge.reward}</RewardPoints>
                <RewardLabel>points</RewardLabel>
              </ChallengeReward>
            </ChallengeItem>
          ))}
        </ChallengesList>
      </ChallengesSection>
    </EarnPointsContainer>
  )
}

export default EarnPoints