'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderStyling {
  backgroundType?: 'transparent' | 'solid'
  backgroundColor?: 'theme' | 'custom'
  customBackgroundColor?: string
  buttonStyle?: {
    style?: 'text' | 'background' | 'outlined'
    roundness?: 'none' | 'small' | 'medium' | 'large' | 'full'
    primaryColor?: string
    hoverColor?: string
    textColor?: string
    textHoverColor?: string
  }
}

interface ExtendedHeader extends Header {
  styling?: HeaderStyling
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Get header styling
  const extendedData = data as ExtendedHeader
  const styling = extendedData?.styling
  const backgroundType = styling?.backgroundType || 'transparent'
  const backgroundColor = styling?.backgroundColor || 'theme'
  const customBackgroundColor = styling?.customBackgroundColor

  // Generate header classes and styles
  const getHeaderClasses = () => {
    let classes = 'relative z-20 transition-all duration-300'
    
    if (backgroundType === 'solid') {
      classes += ' backdrop-blur-md border-b'
      
      if (backgroundColor === 'theme') {
        classes += ' bg-white/95 dark:bg-gray-900/95 border-gray-200/50 dark:border-gray-700/50'
      } else {
        classes += ' border-black/10'
      }
    } else {
      classes += ' bg-transparent'
    }
    
    return classes
  }

  const getHeaderStyle = () => {
    const style: React.CSSProperties = {}
    
    if (backgroundType === 'solid' && backgroundColor === 'custom' && customBackgroundColor) {
      style.backgroundColor = customBackgroundColor
    }
    
    return style
  }

  return (
    <header 
      className={getHeaderClasses()} 
      style={getHeaderStyle()}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container">
        <div className="py-8 flex justify-between items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
