'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'
import { SearchIcon, ChevronDownIcon, Menu, X } from 'lucide-react'
import './mobile-menu-override.css'

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
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setMobileMenuOpen(false)
        setMobileOpenIndex(null)
        setOpenIndex(null)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Helper function to close mobile menu and reset states
  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileOpenIndex(null)
  }

  const getMobileMenuBackgroundStyle = () => {
    const backgroundType = extendedData?.styling?.backgroundType || 'solid'
    const backgroundColor = extendedData?.styling?.backgroundColor || 'theme'
    const customColor = extendedData?.styling?.customBackgroundColor

    if (backgroundType === 'solid' && backgroundColor === 'custom' && customColor) {
      return { backgroundColor: parseColor(customColor, '#FFFFFF') }
    }

    // Return empty object - let CSS classes handle the background
    return {}
  }

  // Comment out theme-based mobile menu text color function - now using custom styling
  // const getMobileMenuTextColor = () => {
  //   const backgroundColor = extendedData?.styling?.backgroundColor || 'theme'
  //   const customColor = extendedData?.styling?.customBackgroundColor

  //   if (backgroundColor === 'custom' && customColor) {
  //     // Simple light/dark detection for text contrast
  //     const color = parseColor(customColor, '#FFFFFF')
  //     if (color.startsWith('#')) {
  //       const hex = color.replace('#', '')
  //       const r = parseInt(hex.substr(0, 2), 16)
  //       const g = parseInt(hex.substr(2, 2), 16)
  //       const b = parseInt(hex.substr(4, 2), 16)
  //       const brightness = (r * 299 + g * 587 + b * 114) / 1000
  //       return brightness > 128 ? 'text-gray-900' : 'text-white'
  //     }
  //   }

  //   return 'text-gray-900 dark:text-gray-100'
  // }

  // Get button styling from header data
  const extendedData = data as ExtendedHeader
  const buttonStyle = extendedData?.styling?.buttonStyle
  const style = buttonStyle?.style || 'text'
  const roundness = buttonStyle?.roundness || 'medium'
  const primaryColor = buttonStyle?.primaryColor || '#4F46E5'
  const hoverColor = buttonStyle?.hoverColor || '#3730A3'
  const textColor = buttonStyle?.textColor
  const textHoverColor = buttonStyle?.textHoverColor

  // Normalize any path (remove trailing slash except root, ensure leading slash)
  const normalizePath = (p?: string | null) => {
    if (!p) return '/'
    try {
      if (p.startsWith('http://') || p.startsWith('https://')) {
        const url = new URL(p)
        p = url.pathname || '/'
      }
    } catch {/* ignore malformed */}
    if (!p.startsWith('/')) p = '/' + p
    if (p.length > 1) p = p.replace(/\/+$/g, '')
    return p || '/'
  }

  // Helper function to get slug from reference (handles relationship shape)
  interface RefWithValue { value: unknown }
  interface SlugDoc { slug?: string }
  const getSlugFromReference = (reference: unknown): string => {
    if (!reference) return ''
    if (typeof reference === 'string') return reference
    if (typeof reference === 'object') {
      // Relationship shape { value: string | { slug: string } }
      if ('value' in (reference as RefWithValue)) {
        const val = (reference as RefWithValue).value
        if (typeof val === 'string') return val
        if (val && typeof val === 'object' && 'slug' in (val as SlugDoc)) {
          return (val as SlugDoc).slug || ''
        }
      }
      if ('slug' in (reference as SlugDoc)) {
        return (reference as SlugDoc).slug || ''
      }
    }
    return ''
  }

  // Helper function to check if a specific submenu item is active
  const isSubmenuItemActive = (pageLink: { type?: 'custom' | 'reference' | null; reference?: unknown; url?: string | null } | undefined) => {
    if (!pageLink) return false
    const current = normalizePath(pathname)
    if (pageLink.type === 'reference' && pageLink.reference) {
      const slug = getSlugFromReference(pageLink.reference)
      return current === normalizePath(slug)
    } else if (pageLink.type === 'custom' && pageLink.url) {
      return current === normalizePath(pageLink.url)
    }
    return false
  }

  // Helper function to check if a nav item is active (parent or any child)
  const isNavItemActive = (navItem: NonNullable<HeaderType['navItems']>[0]) => {
    const current = normalizePath(pathname)
    if (navItem.type === 'link' && navItem.singleLink) {
      const link = navItem.singleLink
      if (link.type === 'reference' && link.reference) {
        const slug = getSlugFromReference(link.reference)
        return current === normalizePath(slug)
      } else if (link.type === 'custom' && link.url) {
        return current === normalizePath(link.url)
      }
    } else if (navItem.type === 'dropdown' && navItem.submenu) {
      return navItem.submenu.some((subItem) => isSubmenuItemActive(subItem.pageLink))
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
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-3 items-center header-nav-container" aria-label="Meniu principal">
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
            const activeSubIndex = submenu.findIndex((subItem) => isSubmenuItemActive(subItem.pageLink))
            const isActive = activeSubIndex !== -1
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
                  className={`${getButtonClasses(isActive || isOpen)}`}
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
                      {submenu.map((item, subIndex) => {
                        const isSubActive = subIndex === activeSubIndex
                        return (
                          <li key={subIndex}>
                            <div
                              className={`mx-1 rounded-md ${getButtonClasses(isSubActive)}`}
                              style={isSubActive ? getButtonStyle(false, true) : {}}
                            >
                              <CMSLink
                                {...item.pageLink}
                                className="block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-md"
                                aria-current={isSubActive ? 'page' : undefined}
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
                            </div>
                          </li>
                        )
                      })}
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

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center gap-2">
        {/* Mobile Search */}
        <Link 
          href="/search" 
          className={`${getButtonClasses()} p-2.5`}
          style={getButtonStyle(hoveredButton === -1)}
        >
          <span className="sr-only">Căutare</span>
          <SearchIcon className="w-5 h-5" />
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={`${getButtonClasses()} p-2.5`}
          style={getButtonStyle(hoveredButton === -2)}
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen)
            // Close any open desktop dropdowns when opening mobile menu
            if (!mobileMenuOpen) {
              setOpenIndex(null)
              setMobileOpenIndex(null)
            }
          }}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[999999] w-screen h-screen animate-in fade-in duration-300 mobile-menu-overlay-force bg-white dark:bg-gray-900"
          style={{
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            isolation: 'isolate',
            ...getMobileMenuBackgroundStyle()
          }}
        >
          <div className="flex flex-col w-full h-full animate-in slide-in-from-top-4 duration-300">
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header flex items-center justify-between w-full px-4 py-3 border-b border-gray-200 dark:border-gray-700" style={{minHeight: 56}}>
              {/* Logo */}
              <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                <Logo />
              </Link>
              {/* Close Button */}
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-900 dark:text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="mobile-menu-container flex flex-col flex-1 justify-center items-stretch gap-2 w-full px-4 pb-8 pt-6">
              {navItems.map((navItem, i) => {
                if (!navItem) return null
                const { label, type, singleLink, submenu } = navItem

                if (type === 'link' && singleLink && (singleLink.url || singleLink.reference)) {
                  const isActive = isNavItemActive(navItem)
                  return (
                    <div key={i} onClick={closeMobileMenu}>
                      <div
                        className={`w-full ${getButtonClasses(isActive)} rounded-lg`}
                        style={isActive ? getButtonStyle(false, true) : {}}
                      >
                        <CMSLink
                          {...singleLink}
                          className="block w-full px-4 py-3 text-lg font-semibold rounded-lg transition-all duration-200 text-left text-gray-900 dark:text-white"
                        >
                          {label}
                        </CMSLink>
                      </div>
                    </div>
                  )
                }

                if (type === 'dropdown' && Array.isArray(submenu) && submenu.length > 0) {
                  const activeSubIndex = submenu.findIndex((subItem) => isSubmenuItemActive(subItem.pageLink))
                  const isActive = activeSubIndex !== -1
                  const isOpen = mobileOpenIndex === i
                  return (
                    <div key={i} className="w-full">
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 text-lg rounded-lg transition-all duration-200 text-left font-semibold text-gray-900 dark:text-white ${getButtonClasses(isActive)}`}
                        style={isActive ? getButtonStyle(false, true) : {}}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMobileOpenIndex(isOpen ? null : i)}
                      >
                        <span>{label}</span>
                        <ChevronDownIcon
                          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="flex flex-col gap-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                          {submenu.map((item, subIndex) => {
                            const isSubActive = subIndex === activeSubIndex
                            return (
                              <div key={subIndex} onClick={closeMobileMenu}>
                                <div
                                  className={`w-full ${getButtonClasses(isSubActive)} rounded-lg`}
                                  style={isSubActive ? getButtonStyle(false, true) : {}}
                                >
                                  <CMSLink
                                    {...item.pageLink}
                                    className="block w-full px-6 py-3 text-base rounded-lg transition-all duration-200 text-left text-gray-900 dark:text-white"
                                    aria-current={isSubActive ? 'page' : undefined}
                                  >
                                    <div className="flex items-center gap-2 justify-start">
                                      <span>{item.label}</span>
                                      {item.showNewBadge && <BadgeNew />}
                                    </div>
                                  </CMSLink>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
