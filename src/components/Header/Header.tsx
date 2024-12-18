import Link from 'next/link'
import styles from './Header.module.css'
import img from '../../public/book_logo.png'
import Image from 'next/image'
import { useLogout } from '../../hooks/auth/useLogout/useLogout'
import { useUserInfo } from '../../hooks/user/useUserInfo'
export const Header = () => {
  const { handleEndSession, loading } = useLogout()

  const { user, loading: userLoading, error } = useUserInfo()
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src={img} alt='logo' height={60} width={60} />
        <Link className={styles.link} href={'/'}>
          Главная
        </Link>
      </div>
      <div className={styles.userSection}>
        <div className={styles.userName}>{userLoading ? '...' : user?.name + ' (' + user?.email + ')'}</div>

        <button className={styles.logoutButton} onClick={handleEndSession} disabled={loading}>
          {loading ? 'Выход...' : 'Выйти'}
        </button>
      </div>
    </div>
  )
}
