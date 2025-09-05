'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderStyling {
  backgroundType?: 'transparent' | 'semi-transparent' | 'solid'
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


  // Get header styling
  const extendedData = data as ExtendedHeader
  const styling = extendedData?.styling
  const backgroundType = styling?.backgroundType || 'transparent'
  const backgroundColor = styling?.backgroundColor || 'theme'
  const customBackgroundColor = styling?.customBackgroundColor

  // Generate header classes and styles
  const getHeaderClasses = () => {
    let classes = 'sticky top-0 z-50 transition-all duration-300'
    
    if (backgroundType === 'solid') {
      classes += ' backdrop-blur-md border-b'
      
      if (backgroundColor === 'theme') {
        classes += ' bg-white/95 dark:bg-gray-900/95 border-gray-200/50 dark:border-gray-700/50'
      } else {
        classes += ' border-black/10'
      }
    } else if (backgroundType === 'semi-transparent') {
      classes += ' backdrop-blur-md border-b'
      
      if (backgroundColor === 'theme') {
        // WCAG compliant semi-transparent backgrounds
        classes += ' bg-white/85 dark:bg-gray-900/85 border-gray-200/30 dark:border-gray-700/30'
      } else {
        classes += ' border-black/5'
      }
    } else {
      classes += ' bg-transparent backdrop-blur-sm'
    }
    
    return classes
  }

  const getHeaderStyle = () => {
    const style: React.CSSProperties = {}
    
    if ((backgroundType === 'solid' || backgroundType === 'semi-transparent') && backgroundColor === 'custom' && customBackgroundColor) {
      if (backgroundType === 'semi-transparent') {
        // Add 85% opacity for semi-transparent custom colors to maintain WCAG compliance
        const color = customBackgroundColor
        if (color.includes('rgba')) {
          style.backgroundColor = color
        } else if (color.includes('rgb')) {
          style.backgroundColor = color.replace('rgb', 'rgba').replace(')', ', 0.85)')
        } else if (color.startsWith('#')) {
          // Convert hex to rgba with 85% opacity
          const hex = color.replace('#', '')
          const r = parseInt(hex.substr(0, 2), 16)
          const g = parseInt(hex.substr(2, 2), 16)
          const b = parseInt(hex.substr(4, 2), 16)
          style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.85)`
        }
      } else {
        style.backgroundColor = customBackgroundColor
      }
    }
    
    return style
  }



  return (
    <header 
      className={getHeaderClasses()} 
      style={getHeaderStyle()}
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
