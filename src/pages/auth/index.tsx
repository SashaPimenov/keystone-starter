import styles from './AuthPage.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/auth/useAuth/useAuth'
import { useCheckAuth } from '../../hooks/auth/useCheckAuth/useCheckAuth'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSubmit, isLoading: loading, error } = useAuth(email, password)
  const { loading: checkAuthLoading, isAuthenticated } = useCheckAuth()

  if (checkAuthLoading || loading) {
    return <LoadingComponent />
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <main>
      <div className={styles.authContainer}>
        <h1>Авторизация</h1>
        <div className={styles.authForm}>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email адрес' required />
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' required />
          <div className={styles.buttonDiv}>
            <button onClick={handleSubmit} disabled={loading}>
              {'Войти'}
            </button>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <Link href='/register' style={{ textDecoration: 'none' }}>
          <p className={styles.link}>Зарегистрироваться</p>
        </Link>
      </div>
    </main>
  )
}

export default AuthPage
