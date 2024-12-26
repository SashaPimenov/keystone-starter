import Link from 'next/link'
import styles from './RegisterPage.module.css'
import { useRegister } from '../../hooks/register'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { ROUTES } from '../../routes'
import { withAuthentication } from '../../HOC/withAuthentication'
import { emailRegexp } from '../../helpers/regexp'
import { FormInput } from '../../components/FormInput'

interface FormValues {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const { handleRegister, loading } = useRegister()

  const methods = useForm<FormValues>({
    mode: 'onChange'
  })

  const {
    handleSubmit,
    formState: { isValid }
  } = methods

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleRegister(data)
  }

  return (
    <main>
      <div className={styles.registerContainer}>
        <h1>Регистрация</h1>
        <FormProvider {...methods}>
          <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name='name'
              type='text'
              placeholder='Имя пользователя'
              rules={{
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа'
                },
                maxLength: {
                  value: 20,
                  message: 'Имя должно содержать максимум 20 символов'
                }
              }}
            />

            <FormInput
              name='email'
              type='email'
              placeholder='Email'
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
              <button type='submit' disabled={loading || !isValid}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>
            </div>
          </form>
        </FormProvider>
        <Link href={ROUTES.AUTH} className={styles.link}>
          <p className={styles.linkText}>Авторизация</p>
        </Link>
      </div>
    </main>
  )
}

export default withAuthentication(RegisterPage, true)
