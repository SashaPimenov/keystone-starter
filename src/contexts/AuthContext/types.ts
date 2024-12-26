interface User {
  id: string
  email: string
  name: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  authLoading: boolean
  logout: () => Promise<void>
  logoutLoading: boolean
}

interface UserProviderProps {
  children: React.ReactNode
}
