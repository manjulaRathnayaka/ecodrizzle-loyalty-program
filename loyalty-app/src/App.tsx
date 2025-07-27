import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './contexts/AuthContext'
import { theme } from './styles/theme'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Rewards from './pages/Rewards'
import SocialMedia from './pages/SocialMedia'
import Profile from './pages/Profile'
import EarnPoints from './pages/EarnPoints'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import GlobalStyles from './styles/GlobalStyles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/social-media" element={<SocialMedia />} />
                    <Route path="/earn-points" element={<EarnPoints />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
