import Link from 'next/link'
import styles from './RegisterPage.module.css'
import { useRegister } from '../../hooks/register'
import { useState } from 'react'
import { ROUTES } from '../../routes'
import { withAuthentication } from '../../HOC/withAuthentication'
import { fieldValidateHelper } from '../../helpers/fieldValidateHelper'
import { toast } from 'react-toastify'

const emailRegex = /^\S+@\S+\.\S+$/

const RegisterPage = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { handleRegister, loading } = useRegister({ name, email, password })

  const registerValidate = () => {
    if (fieldValidateHelper('Имя', name, 2, 15) && fieldValidateHelper('Email', email, 4, 30) && fieldValidateHelper('Пароль', password, 8, 20)) {
      if (emailRegex.test(email)) {
        handleRegister()
      } else {
        toast.error('Неверный формат почты')
      }
    }
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
            minLength={2}
            maxLength={20}
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email адрес'
            required
            minLength={4}
            maxLength={40}
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Пароль'
            required
            minLength={8}
            maxLength={20}
          />
          <div className={styles.buttonDiv}>
            <button onClick={registerValidate} disabled={loading || !name || !email || !password}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </div>
        <Link href={ROUTES.AUTH} className={styles.link}>
          <p className={styles.linkText}>Авторизация</p>
        </Link>
      </div>
    </main>
  )
}

export default withAuthentication(RegisterPage, true)
