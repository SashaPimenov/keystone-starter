import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CHECK_AUTH } from './gql'
import { ROUTES } from '../../../routes'

export const useCheckAuth = () => {
  const { data, loading, ...rest } = useQuery(CHECK_AUTH)
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    const isAuthenticated = !!data?.authenticatedItem
    const currentPath = router.pathname
    if (isAuthenticated && (currentPath === '/auth' || currentPath === '/register')) {
      router.replace(ROUTES.MAIN)
    } else if (!isAuthenticated && currentPath !== '/auth' && currentPath !== '/register') {
      router.replace(ROUTES.AUTH)
    }
  }, [data, loading, router])

  return { isAuthenticated: !!data?.authenticatedItem, loading, ...rest }
}
