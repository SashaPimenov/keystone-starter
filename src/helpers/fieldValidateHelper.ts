import { toast } from 'react-toastify'

export const fieldValidateHelper = (nameField: string, valueField: string, minLength: number, maxLength: number): boolean => {
  if (valueField.length < minLength || valueField.length > maxLength) {
    toast.error(`Поле ${nameField}:\nМинимальная длина - ${minLength}\nМаксимальная длина - ${maxLength}`)
    return false
  }
  return true
}
