import { isAuth } from './isAuth'

export const isAdmin = ({ session }: any) => {
  isAuth({ session })
  return !!session?.data.isAdmin
}
