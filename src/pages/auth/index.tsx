import styles from './AuthPage.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/auth'
import { ROUTES } from '../../routes'
import { withAuthentication } from '../../HOC/withAuthentication'
import { fieldValidateHelper } from '../../helpers/fieldValidateHelper'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin, authLoading } = useAuth()

  const authValidate = () => {
    if (fieldValidateHelper('Email', email, 4, 30)) {
      handleLogin(email, password)
    }
  }
  return (
    <main>
      <div className={styles.authContainer}>
        <h1>Авторизация</h1>
        <div className={styles.authForm}>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email адрес' required />
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' required />
          <div className={styles.buttonDiv}>
            <button onClick={authValidate} disabled={authLoading || !email || !password}>
              {'Войти'}
            </button>
          </div>
        </div>
        <Link href={ROUTES.REGISTER} className={styles.link}>
          <p className={styles.linkText}>Зарегистрироваться</p>
        </Link>
      </div>
    </main>
  )
}

export default withAuthentication(AuthPage, true)
