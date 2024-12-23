export interface UserContextType {
  user: { email: string; name: string } | null
  loading: boolean
  error: string | null
}
