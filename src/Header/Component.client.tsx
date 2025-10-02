import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderStyling {
  backgroundType?: 'transparent' | 'semi-transparent' | 'solid'
  layout?: 'container' | 'full-width'
  buttonStyle?: {
    style?: 'text' | 'background' | 'outlined'
    roundness?: 'none' | 'small' | 'medium' | 'large' | 'full'
    colorTheme?: 'auto' | 'custom'
    lightThemeColors?: {
      primaryColor?: string
      hoverColor?: string
      textColor?: string
      textHoverColor?: string
    }
    darkThemeColors?: {
      primaryColor?: string
      hoverColor?: string
      textColor?: string
      textHoverColor?: string
    }
  }
}

interface HeaderBranding {
  showLogo?: boolean
  showText?: boolean
  brandText?: string
  linkToHome?: boolean
}

interface HeaderSearch {
  showSearch?: boolean
  searchUrl?: string
}

interface ExtendedHeader extends Header {
  styling?: HeaderStyling
  branding?: HeaderBranding
  search?: HeaderSearch
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */

  // Get header styling and branding
  const extendedData = data as ExtendedHeader
  const styling = extendedData?.styling
  const branding = extendedData?.branding
  const search = extendedData?.search
  const backgroundType = styling?.backgroundType || 'transparent'
  const layout = styling?.layout || 'container'

  // Generate header classes and styles
  const getHeaderClasses = () => {
    let classes = 'sticky top-0 z-50 transition-all duration-300'
    
    if (backgroundType === 'solid') {
      classes += ' border-b bg-background border-border'
    } else if (backgroundType === 'semi-transparent') {
      classes += ' backdrop-blur-md border-b bg-background/85 border-border/30'
    } else {
      classes += ' bg-transparent backdrop-blur-sm'
    }
    
    return classes
  }

  // Render branding section (logo and/or text)
  const renderBranding = () => {
    const showLogo = branding?.showLogo !== false // default true
    const showText = branding?.showText || false
    const brandText = branding?.brandText || ''
    const linkToHome = branding?.linkToHome !== false // default true

    if (!showLogo && !showText) return null

    const brandingContent = (
      <div className="flex items-center gap-3">
        {showLogo && (
          <Logo 
            loading="eager" 
            priority="high" 
          />
        )}
        {showText && brandText && (
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {brandText}
          </span>
        )}
      </div>
    )

    if (linkToHome) {
      return (
        <Link href="/acasa" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {brandingContent}
        </Link>
      )
    }

    return brandingContent
  }

  return (
    <header 
      className={getHeaderClasses()}
    >
      <div className={layout === 'full-width' ? 'w-full px-4 sm:px-6 lg:px-8' : 'container'}>
        <div className="py-3 flex items-center">
          {/* Left: Branding (Logo and/or Text) */}
          <div className="flex items-center lg:mr-8 flex-shrink-0">
            {renderBranding()}
          </div>

          {/* Center and Right: Navigation and Actions - This includes nav + search/mobile button */}
          <div className="flex-1 flex items-center justify-end lg:justify-between">
            <HeaderNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
