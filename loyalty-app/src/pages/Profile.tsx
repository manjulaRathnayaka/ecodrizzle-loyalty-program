import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { apiClient } from '../api/apiClient'

const ProfileContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  max-width: 800px;
`

const ProfileHeader = styled.div`
  background: ${({ theme }) => theme.colors.gradient.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: white;
`

const Avatar = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 4px solid rgba(255, 255, 255, 0.2);
`

const UserName = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const UserTier = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: inline-block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const InfoItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const InfoLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const InfoValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`

const PreferencesForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 3rem;
  height: 1.5rem;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  position: relative;
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: white;
    top: 0.125rem;
    left: 0.125rem;
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:checked::before {
    transform: translateX(1.5rem);
  }
`

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SaveButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  align-self: flex-start;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const Badge = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const BadgeIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const BadgeName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.error}dd;
  }
`

const achievements = [
  { icon: '🏆', name: 'First Post', description: 'Made your first social media post' },
  { icon: '💯', name: '100 Points', description: 'Earned your first 100 points' },
  { icon: '⭐', name: 'Gold Member', description: 'Reached Gold tier status' },
  { icon: '🎯', name: 'Point Collector', description: 'Earned 1000+ points' },
  { icon: '📱', name: 'Social Star', description: 'Connected social media account' },
  { icon: '🛒', name: 'Shopper', description: 'Redeemed your first reward' },
]

const Profile: React.FC = () => {
  const { user, updateUser, logout } = useAuth()
  const [saving, setSaving] = useState(false)
  const [preferences, setPreferences] = useState(user?.preferences || {
    notifications: true,
    theme: 'light' as 'light' | 'dark',
    language: 'en',
  })

  if (!user) {
    return (
      <ProfileContainer>
        <p>Please log in to view your profile.</p>
      </ProfileContainer>
    )
  }

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await apiClient.updateUserProfile({ preferences })
      updateUser({ preferences })
    } catch (error) {
      console.error('Failed to update preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        {user.avatar && <Avatar src={user.avatar} alt={user.name} />}
        <UserName>{user.name}</UserName>
        <UserTier>{user.tier} Member</UserTier>
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <StatValue>{user.pointsBalance.toLocaleString()}</StatValue>
          <StatLabel>Total Points</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{user.tier}</StatValue>
          <StatLabel>Current Tier</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>
            {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
          </StatValue>
          <StatLabel>Days Active</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>Account Information</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Email Address</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Member Since</InfoLabel>
            <InfoValue>{formatDate(user.joinDate)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Loyalty Tier</InfoLabel>
            <InfoValue>{user.tier} Member</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Current Points</InfoLabel>
            <InfoValue>{user.pointsBalance.toLocaleString()} points</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Section>

      <Section>
        <SectionTitle>Preferences</SectionTitle>
        <PreferencesForm onSubmit={handleSavePreferences}>
          <FormGroup>
            <Toggle>
              <Label>Email Notifications</Label>
              <ToggleSwitch
                checked={preferences.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
              />
            </Toggle>
          </FormGroup>

          <FormGroup>
            <Label>Theme</Label>
            <Select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Language</Label>
            <Select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </Select>
          </FormGroup>

          <SaveButton type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </SaveButton>
        </PreferencesForm>
      </Section>

      <Section>
        <SectionTitle>Achievement Badges</SectionTitle>
        <BadgesGrid>
          {achievements.map((achievement, index) => (
            <Badge key={index}>
              <BadgeIcon>{achievement.icon}</BadgeIcon>
              <BadgeName>{achievement.name}</BadgeName>
            </Badge>
          ))}
        </BadgesGrid>
      </Section>

      <Section>
        <SectionTitle>Account Actions</SectionTitle>
        <LogoutButton onClick={logout}>
          Sign Out
        </LogoutButton>
      </Section>
    </ProfileContainer>
  )
}

export default Profile