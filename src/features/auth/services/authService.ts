import { DEMO_CREDENTIALS } from '@/lib'

const AUTH_KEY = 'sih-auth'

export const authService = {
  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true'
  },
  login(user: string, pass: string): boolean {
    const valid = DEMO_CREDENTIALS.some(
      c => c.user.toLowerCase() === user.trim().toLowerCase() && c.pass === pass
    )
    if (valid) {
      localStorage.setItem(AUTH_KEY, 'true')
      return true
    }
    return false
  },
  logout(): void {
    localStorage.removeItem(AUTH_KEY)
  }
}
