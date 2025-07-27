import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 40;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 0;
    bottom: unset;
    width: 16rem;
    height: 100vh;
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`

const NavList = styled.ul`
  display: flex;
  list-style: none;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: 6rem;
  }
`

const NavItem = styled.li`
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`

const NavLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.fast};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}08;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}04;
  }
`

const NavIcon = styled.span`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    font-size: 1rem;
  }
`

const NavText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/rewards', label: 'Rewards', icon: '🎁' },
  { path: '/social-media', label: 'Social Media', icon: '📱' },
  { path: '/earn-points', label: 'Earn Points', icon: '💰' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

const Navigation: React.FC = () => {
  return (
    <NavContainer>
      <NavList>
        {navigationItems.map((item) => (
          <NavItem key={item.path}>
            <NavLinkStyled
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <NavIcon>{item.icon}</NavIcon>
              <NavText>{item.label}</NavText>
            </NavLinkStyled>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  )
}

export default Navigation