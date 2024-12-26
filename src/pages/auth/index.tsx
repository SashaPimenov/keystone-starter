import React from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import styles from './AuthPage.module.css'
import { useAuth } from '../../contexts/AuthContext/AuthProvider'
import { emailRegexp } from '../../helpers/regexp'
import Link from 'next/link'
import { ROUTES } from '../../routes'
import { FormInput } from '../../components/FormInput'

interface FormValues {
  email: string
  password: string
}

const AuthForm = () => {
  const { login, authLoading } = useAuth()

  const methods = useForm<FormValues>({
    mode: 'onChange'
  })

  const {
    handleSubmit,
    formState: { isValid }
  } = methods

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    login(data.email, data.password)
  }

  return (
    <main>
      <div className={styles.authContainer}>
        <h1>Авторизация</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
            <FormInput
              name='email'
              type='email'
              placeholder='Email адрес'
              rules={{
                required: 'Email обязателен',
                pattern: {
                  value: emailRegexp,
                  message: 'Некорректный email'
                },
                minLength: {
                  value: 8,
                  message: 'Email должен содержать минимум 8 символа'
                },
                maxLength: {
                  value: 30,
                  message: 'Email должен содержать максимум 30 символов'
                }
              }}
            />
            <FormInput
              name='password'
              type='password'
              placeholder='Пароль'
              rules={{
                required: 'Пароль обязателен',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать минимум 8 символов'
                }
              }}
            />
            <div className={styles.buttonDiv}>
              <button type='submit' disabled={authLoading || !isValid}>
                {'Войти'}
              </button>
            </div>
          </form>
        </FormProvider>
        <Link href={ROUTES.REGISTER} className={styles.link}>
          <p className={styles.linkText}>Зарегистрироваться</p>
        </Link>
      </div>
    </main>
  )
}

export default AuthForm
