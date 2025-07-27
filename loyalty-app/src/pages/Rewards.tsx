import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { apiClient } from '../api/apiClient'
import type { Reward } from '../types'

const RewardsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const PointsDisplay = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.gradient.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const FilterSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primaryDark : theme.colors.primary};
    color: white;
  }
`

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`

const RewardCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const RewardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const RewardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const RewardHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const RewardName = styled.h3`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const FeaturedBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-left: ${({ theme }) => theme.spacing.sm};
`

const RewardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`

const RewardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PointsRequired = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const RedeemButton = styled.button<{ disabled: boolean }>`
  background: ${({ disabled, theme }) => 
    disabled ? theme.colors.border : theme.colors.primary};
  color: ${({ disabled, theme }) => 
    disabled ? theme.colors.text.secondary : 'white'};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const AvailabilityText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.lg};
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 500px;
  width: 100%;
  text-align: center;
`

const ModalTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.success};
`

const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const categories = [
  { id: 'all', label: 'All Rewards' },
  { id: 'gift_cards', label: 'Gift Cards' },
  { id: 'discounts', label: 'Discounts' },
  { id: 'merchandise', label: 'Merchandise' },
  { id: 'experiences', label: 'Experiences' },
]

const Rewards: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null)
  const [redeeming, setRedeeming] = useState<string | null>(null)

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const data = await apiClient.getRewards()
        setRewards(data)
      } catch (error) {
        console.error('Failed to load rewards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRewards()
  }, [])

  const filteredRewards = rewards.filter(reward => 
    activeCategory === 'all' || reward.category === activeCategory
  )

  const handleRedeem = async (reward: Reward) => {
    if (!user || user.pointsBalance < reward.pointsRequired) {
      return
    }

    setRedeeming(reward.id)
    try {
      await apiClient.redeemReward(reward.id)
      updateUser({ pointsBalance: user.pointsBalance - reward.pointsRequired })
      setRedeemedReward(reward)
      setShowModal(true)
    } catch (error) {
      console.error('Redemption failed:', error)
    } finally {
      setRedeeming(null)
    }
  }

  if (loading) {
    return (
      <RewardsContainer>
        <LoadingContainer>
          <p>Loading rewards...</p>
        </LoadingContainer>
      </RewardsContainer>
    )
  }

  return (
    <RewardsContainer>
      <Header>
        <Title>Rewards Catalog</Title>
        <PointsDisplay>
          💰 {user?.pointsBalance.toLocaleString() || 0} Points Available
        </PointsDisplay>
      </Header>

      <FilterSection>
        {categories.map(category => (
          <FilterButton
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </FilterButton>
        ))}
      </FilterSection>

      <RewardsGrid>
        {filteredRewards.map(reward => {
          const canAfford = user ? user.pointsBalance >= reward.pointsRequired : false
          const isRedeeming = redeeming === reward.id

          return (
            <RewardCard key={reward.id}>
              <RewardImage src={reward.imageUrl} alt={reward.name} />
              <RewardContent>
                <RewardHeader>
                  <RewardName>{reward.name}</RewardName>
                  {reward.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                </RewardHeader>
                
                <RewardDescription>{reward.description}</RewardDescription>
                
                <RewardFooter>
                  <div>
                    <PointsRequired>
                      {reward.pointsRequired.toLocaleString()} pts
                    </PointsRequired>
                    <AvailabilityText>
                      {reward.availability} available
                    </AvailabilityText>
                  </div>
                  
                  <RedeemButton
                    disabled={!canAfford || isRedeeming}
                    onClick={() => handleRedeem(reward)}
                  >
                    {isRedeeming ? 'Redeeming...' : 
                     !canAfford ? 'Insufficient Points' : 'Redeem'}
                  </RedeemButton>
                </RewardFooter>
              </RewardContent>
            </RewardCard>
          )
        })}
      </RewardsGrid>

      <Modal show={showModal}>
        <ModalContent>
          <ModalTitle>🎉 Reward Redeemed Successfully!</ModalTitle>
          <p>
            You've successfully redeemed <strong>{redeemedReward?.name}</strong>
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            {redeemedReward?.redemptionInstructions}
          </p>
          <ModalActions>
            <RedeemButton 
              disabled={false}
              onClick={() => setShowModal(false)}
            >
              Close
            </RedeemButton>
          </ModalActions>
        </ModalContent>
      </Modal>
    </RewardsContainer>
  )
}

export default Rewards