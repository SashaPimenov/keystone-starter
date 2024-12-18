import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import client from '../../../apolloClient'
import { END_SESSION } from './END_SESSION'

export const useLogout = () => {
  const [endSession, { loading }] = useMutation(END_SESSION)
  const [sessionError, setSessionError] = useState<string | null>(null)
  const router = useRouter()

  const handleEndSession = async () => {
    setSessionError(null)
    try {
      await endSession()
      router.replace('/auth')
      await client.resetStore()
      console.log('Сессия успешно завершена')
    } catch (err: any) {
      console.log(err)
    }
  }

  return { handleEndSession, loading, error: sessionError }
}
