import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  z-index: 50;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 16rem;
  }
`

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const UserAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  object-fit: cover;
`

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const LoginButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const Header: React.FC = () => {
  const { user, isAuthenticated, login } = useAuth()

  const handleLogin = async () => {
    try {
      await login('demo@example.com', 'demo123')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <HeaderContainer>
      <Logo>EcoDrizzle Rewards</Logo>
      
      <UserSection>
        {isAuthenticated && user ? (
          <>
            {user.avatar && <UserAvatar src={user.avatar} alt={user.name} />}
            <UserName>{user.name}</UserName>
          </>
        ) : (
          <LoginButton onClick={handleLogin}>
            Login (Demo)
          </LoginButton>
        )}
      </UserSection>
    </HeaderContainer>
  )
}

export default Header