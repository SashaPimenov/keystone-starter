import Link from 'next/link'
import styles from './Header.module.css'
import img from '../../public/book_logo.png'
import Image from 'next/image'
import { ROUTES } from '../../routes'
import { useAuth } from '../../contexts/AuthContext/AuthProvider'

export const Header = () => {
  const { user, loading, logout, logoutLoading } = useAuth()
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src={img} alt='logo' height={60} width={60} />
        <Link className={styles.link} href={ROUTES.MAIN}>
          Главная
        </Link>
      </div>
      <div className={styles.userSection}>
        <div className={styles.userName}>{loading ? '...' : user?.name + ' (' + user?.email + ')'}</div>
        <button className={styles.logoutButton} onClick={logout} disabled={logoutLoading}>
          {logoutLoading ? 'Выход...' : 'Выйти'}
        </button>
      </div>
    </div>
  )
}
