import React, { type ReactNode } from 'react'
import styled from 'styled-components'
import Navigation from './Navigation'
import Header from './Header'

interface LayoutProps {
  children: ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 0;
    padding-left: 16rem;
  }
`

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Navigation />
      <Main>
        <Content>
          {children}
        </Content>
      </Main>
    </LayoutContainer>
  )
}

export default Layout