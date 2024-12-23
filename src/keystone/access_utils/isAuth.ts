export const isAuth = ({ session }: any) => {
  if (!session?.itemId) {
    throw new Error('Необходимо пройти авторизацию')
  } else {
    return true
  }
}
