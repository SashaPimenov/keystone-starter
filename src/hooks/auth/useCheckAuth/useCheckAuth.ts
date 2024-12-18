import { useQuery } from '@apollo/client'
import { CHECK_AUTH } from './CHECK_AUTH'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useCheckAuth = () => {
  const { data, loading } = useQuery(CHECK_AUTH)
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    const isAuthenticated = !!data?.authenticatedItem
    const currentPath = router.pathname
    if (isAuthenticated && (currentPath === '/auth' || currentPath === '/register')) {
      router.replace('/')
    } else if (!isAuthenticated && currentPath !== '/auth' && currentPath !== '/register') {
      router.replace('/auth')
    }
  }, [data, loading, router])

  return { isAuthenticated: !!data?.authenticatedItem, loading }
}
