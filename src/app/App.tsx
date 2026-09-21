import React, { useState } from 'react'
import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './routes'
import { Login } from '@/features/auth'
import { authService } from '@/features/auth/services/authService'

export function App() {
  const [auth, setAuth] = useState<boolean>(() => authService.isAuthenticated())

  const handleLogin = () => setAuth(true)

  const handleLogout = () => {
    authService.logout()
    setAuth(false)
  }

  return (
    <AppProviders>
      {auth ? (
        <AppRouter onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </AppProviders>
  )
}

export default App
