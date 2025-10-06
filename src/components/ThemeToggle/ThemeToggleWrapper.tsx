import { ThemeToggle } from './index'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

interface ThemeToggleWrapperProps {
  variant: 'header' | 'footer'
}

export async function ThemeToggleWrapper({ variant }: ThemeToggleWrapperProps) {
  let settings
  
  try {
    const payload = await getPayload({ config: configPromise })
    settings = await payload.findGlobal({
      slug: 'settings',
    })
  } catch {
    // If settings don't exist yet, show in header by default
    if (variant === 'header') {
      return <ThemeToggle variant="header" />
    }
    return null
  }

  const themeToggleConfig = settings?.themeToggle || {}
  const showInHeader = themeToggleConfig.showInHeader !== false // default to true
  const showInFooter = themeToggleConfig.showInFooter || false

  if (variant === 'header' && showInHeader) {
    return <ThemeToggle variant="header" />
  }

  if (variant === 'footer' && showInFooter) {
    return <ThemeToggle variant="footer" />
  }

  return null
}
