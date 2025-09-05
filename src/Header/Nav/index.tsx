'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDownIcon } from 'lucide-react'

const BadgeNew: React.FC = () => (
  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Nou</span>
)

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

interface ExtendedHeader extends HeaderType {
  styling?: HeaderStyling
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)
  const pathname = usePathname()

  // Get button styling from header data
  const extendedData = data as ExtendedHeader
  const buttonStyle = extendedData?.styling?.buttonStyle
  const style = buttonStyle?.style || 'text'
  const roundness = buttonStyle?.roundness || 'medium'
  const primaryColor = buttonStyle?.primaryColor || '#4F46E5'
  const hoverColor = buttonStyle?.hoverColor || '#3730A3'
  const textColor = buttonStyle?.textColor
  const textHoverColor = buttonStyle?.textHoverColor

  // Helper function to get slug from reference
  const getSlugFromReference = (reference: unknown) => {
    if (typeof reference === 'string') return reference
    if (reference && typeof reference === 'object' && 'value' in reference) {
      const typedRef = reference as { value: unknown }
      if (typeof typedRef.value === 'string') return typedRef.value
      if (typedRef.value && typeof typedRef.value === 'object' && 'slug' in typedRef.value) {
        return (typedRef.value as { slug: string }).slug
      }
    }
    if (reference && typeof reference === 'object' && 'slug' in reference) {
      return (reference as { slug: string }).slug
    }
    return ''
  }

  // Helper function to check if a nav item is active
  const isNavItemActive = (navItem: NonNullable<HeaderType['navItems']>[0]) => {
    if (navItem.type === 'link' && navItem.singleLink) {
      const link = navItem.singleLink
      if (link.type === 'reference' && link.reference) {
        const slug = getSlugFromReference(link.reference)
        return pathname === `/${slug}`
      } else if (link.type === 'custom' && link.url) {
        return pathname === link.url
      }
    } else if (navItem.type === 'dropdown' && navItem.submenu) {
      // Check if any submenu item is active
      return navItem.submenu.some((subItem: NonNullable<typeof navItem.submenu>[0]) => {
        if (subItem.pageLink?.type === 'reference' && subItem.pageLink?.reference) {
          const slug = getSlugFromReference(subItem.pageLink.reference)
          return pathname === `/${slug}`
        } else if (subItem.pageLink?.type === 'custom' && subItem.pageLink?.url) {
          return pathname === subItem.pageLink.url
        }
        return false
      })
    }
    return false
  }

  // Helper function to get roundness classes
  const getRoundnessClass = () => {
    switch (roundness) {
      case 'none': return 'rounded-none'
      case 'small': return 'rounded-sm'
      case 'medium': return 'rounded-lg'
      case 'large': return 'rounded-xl'
      case 'full': return 'rounded-full'
      default: return 'rounded-lg'
    }
  }

  // Helper function to validate and parse color (supports hex, rgb, rgba)
  const parseColor = (color: string | undefined, fallback: string) => {
    if (!color) return fallback
    // Check if it's a valid hex, rgb, or rgba color
    if (color.match(/^#[0-9A-Fa-f]{3,8}$/) || 
        color.match(/^rgba?\([\d\s,.\%]+\)$/) ||
        color.match(/^hsla?\([\d\s,.\%]+\)$/)) {
      return color
    }
    return fallback
  }

  // Generate button classes based on style
  const getButtonClasses = (_isActive = false) => {
    const baseClasses = `flex items-center gap-1 px-3 py-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${getRoundnessClass()} font-medium shadow-sm hover:shadow-md`
    
    switch (style) {
      case 'background':
        return `${baseClasses} transform hover:-translate-y-0.5`
      case 'outlined':
        return `${baseClasses} border-2 bg-transparent transform hover:-translate-y-0.5`
      case 'text':
      default:
        return `${baseClasses} ${!textColor ? 'text-primary hover:text-primary/80' : ''} transform hover:-translate-y-0.5`
    }
  }

  // Generate button styles based on custom colors with transparency support
  const getButtonStyle = (isHover = false, isActive = false) => {
    const styleObj: React.CSSProperties = {}
    
    // Use active state for coloring (isActive takes precedence over isHover)
    const shouldUseActiveColor = isActive || isHover
    
    // Set background colors
    if (style === 'background') {
      if (isActive) {
        styleObj.backgroundColor = parseColor(primaryColor, '#4F46E5')
      } else if (isHover) {
        styleObj.backgroundColor = parseColor(hoverColor, '#3730A3')
      }
    } else if (style === 'outlined') {
      styleObj.borderColor = parseColor(primaryColor, '#4F46E5')
      if (shouldUseActiveColor) {
        styleObj.backgroundColor = parseColor(primaryColor, '#4F46E5')
      }
    }
    
    // Set text colors
    if (textColor) {
      if (style === 'outlined' && shouldUseActiveColor) {
        // For outlined buttons when active/hover, use textHoverColor or white
        styleObj.color = parseColor(textHoverColor, '#FFFFFF')
      } else {
        styleObj.color = parseColor(shouldUseActiveColor && textHoverColor ? textHoverColor : textColor, '#FFFFFF')
      }
    } else {
      // Default text colors based on style
      if (style === 'background') {
        styleObj.color = '#FFFFFF'
      } else if (style === 'outlined') {
        if (shouldUseActiveColor) {
          styleObj.color = '#FFFFFF'
        } else {
          styleObj.color = parseColor(primaryColor, '#4F46E5')
        }
      }
    }
    
    return styleObj
  }

  return (
    <nav className="flex gap-3 items-center" aria-label="Meniu principal">
      {navItems.map((navItem, i) => {
        if (!navItem) return null
        const { label, type, singleLink, submenu, dropdownStyle } = navItem

        // Always render single links
        if (type === 'link' && singleLink && (singleLink.url || singleLink.reference)) {
          const isActive = isNavItemActive(navItem)
          return (
            <div 
              key={i} 
              className={getButtonClasses(isActive)}
              style={getButtonStyle(hoveredButton === i, isActive)}
              onMouseEnter={() => setHoveredButton(i)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <CMSLink {...singleLink} className="block w-full h-full">
                {label}
              </CMSLink>
            </div>
          )
        }

        // Render dropdowns only if they have submenu items
        if (type === 'dropdown' && Array.isArray(submenu) && submenu.length > 0) {
          const isOpen = openIndex === i
          const isHovered = hoveredButton === i || isOpen
          const isActive = isNavItemActive(navItem)
          return (
            <div
              key={i}
              className="relative group"
              onMouseEnter={() => {
                setOpenIndex(i)
                setHoveredButton(i)
              }}
              onMouseLeave={() => {
                setOpenIndex((prev) => (prev === i ? null : prev))
                setHoveredButton(null)
              }}
            >
              <button
                className={getButtonClasses(isActive || isOpen)}
                style={getButtonStyle(isHovered, isActive)}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {label}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-56 z-50 transition-all duration-150 ${
                  isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                role="menu"
              >
                <div className="py-1">
                  <ul>
                    {submenu.map((item, subIndex) => (
                      <li key={subIndex}>
                        <CMSLink
                          {...item.pageLink}
                          className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-md mx-1"
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {item.label}
                            </span>
                            {item.showNewBadge && <BadgeNew />}
                          </span>
                          {dropdownStyle === 'with-descriptions' && item.description && (
                            <span className="block text-[11px] leading-snug mt-0.5 text-gray-600 dark:text-gray-400">
                              {item.description}
                            </span>
                          )}
                        </CMSLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        }
        return null
      })}
      
      {/* Search Icon with same styling */}
      <div className="ml-2 group">
        <Link 
          href="/search" 
          className={`${getButtonClasses()} p-2.5`}
          style={getButtonStyle(hoveredButton === -1)}
          onMouseEnter={() => setHoveredButton(-1)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span className="sr-only">Căutare</span>
          <SearchIcon className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  )
}
