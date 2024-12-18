import Link from 'next/link'
import styles from './RegisterPage.module.css'
import { useRegister } from '../../hooks/register/useRegister/useRegister'
import { useState } from 'react'
import { useCheckAuth } from '../../hooks/auth/useCheckAuth/useCheckAuth'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

const RegisterPage = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { handleSubmit, loading, error } = useRegister(name, email, password)
  const { loading: checkAuthLoading, isAuthenticated } = useCheckAuth()

  if (checkAuthLoading || loading) {
    return <LoadingComponent />
  }

  if (isAuthenticated) {
    return null
  }
  return (
    <main>
      <div className={styles.registerContainer}>
        <h1>Регистрация</h1>
        <div className={styles.authForm}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Имя пользователя'
            required
            minLength={20}
            maxLength={20}
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email адрес'
            required
            minLength={8}
            maxLength={40}
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Пароль'
            required
            minLength={8}
            maxLength={15}
          />
          <div className={styles.buttonDiv}>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <Link href='/auth' style={{ textDecoration: 'none' }}>
          <p className={styles.link}>Авторизация</p>
        </Link>
      </div>
    </main>
  )
}

export default RegisterPage
