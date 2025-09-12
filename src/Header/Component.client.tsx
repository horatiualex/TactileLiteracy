import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderStyling {
  backgroundType?: 'transparent' | 'semi-transparent' | 'solid'
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

interface ExtendedHeader extends Header {
  styling?: HeaderStyling
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */


  // Get header styling
  const extendedData = data as ExtendedHeader
  const styling = extendedData?.styling
  const backgroundType = styling?.backgroundType || 'transparent'

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

  return (
    <header 
      className={getHeaderClasses()}
    >
      <div className="container">
        <div className="py-3 flex justify-between items-center">
          <Link href="/">
            <Logo 
              loading="eager" 
              priority="high" 
            />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
