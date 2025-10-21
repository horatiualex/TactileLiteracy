'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect } from 'react'

export const SetHeaderTheme: React.FC<{
  theme: 'light' | 'dark'
}> = ({ theme }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(theme)
  }, [theme, setHeaderTheme])

  return null
}
