import Link from 'next/link'
import styles from './Header.module.css'
import img from '../../public/book_logo.png'
import Image from 'next/image'
import { ROUTES } from '../../routes'
import { useAuth } from '../../hooks/auth'
import { useUser } from '../../contexts/AuthContext/AuthProver'

export const Header = () => {
  const { handleLogout, logoutLoading } = useAuth()

  const { user, loading } = useUser()

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

        <button className={styles.logoutButton} onClick={handleLogout} disabled={logoutLoading}>
          {logoutLoading ? 'Выход...' : 'Выйти'}
        </button>
      </div>
    </div>
  )
}
