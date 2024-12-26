import React from 'react'
import { RegisterOptions, FieldError, useForm, useFormContext } from 'react-hook-form'
import styles from './FormInput.module.css'

interface FormInputProps {
  name: string
  type: string
  placeholder: string
  rules?: RegisterOptions
  onFocus?: () => void
}

const FormInput: React.FC<FormInputProps> = ({ name, type, placeholder, rules, onFocus }) => {
  const {
    register,
    formState: { errors },
    clearErrors
  } = useFormContext()

  const handleFocus = () => {
    if (onFocus) {
      onFocus()
    }
    clearErrors(name)
  }
  return (
    <>
      <input type={type} {...register(name, rules)} placeholder={placeholder} onFocus={() => clearErrors(name)} className={styles.input} />
      {errors[name] && <p className={styles.error}>{(errors[name] as FieldError).message}</p>}
    </>
  )
}

export default FormInput
