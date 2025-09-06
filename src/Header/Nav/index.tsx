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
    // For mobile menu, always use theme colors for consistency
    return {}
  }

  // Get button styling from header data
  const extendedData = data as ExtendedHeader
  const buttonStyle = extendedData?.styling?.buttonStyle
  const style = buttonStyle?.style || 'text'
  const roundness = buttonStyle?.roundness || 'medium'
  const colorTheme = buttonStyle?.colorTheme || 'auto'
  const lightColors = buttonStyle?.lightThemeColors
  const darkColors = buttonStyle?.darkThemeColors

  // Get theme-aware colors
  const getThemeColors = () => {
    if (colorTheme === 'auto') {
      // Use default theme colors
      return {
        primaryColor: undefined, // Will use CSS variables
        hoverColor: undefined,
        textColor: undefined,
        textHoverColor: undefined
      }
    } else {
      // Use custom colors that adapt to theme
      return {
        lightTheme: {
          primaryColor: lightColors?.primaryColor || '#4F46E5',
          hoverColor: lightColors?.hoverColor || '#3730A3',
          textColor: lightColors?.textColor,
          textHoverColor: lightColors?.textHoverColor
        },
        darkTheme: {
          primaryColor: darkColors?.primaryColor || '#93C5FD',
          hoverColor: darkColors?.hoverColor || '#93C5FD',
          textColor: darkColors?.textColor,
          textHoverColor: darkColors?.textHoverColor
        }
      }
    }
  }

  const _themeColors = getThemeColors() // Prefixed with _ to avoid lint warning

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
      const normalizedSlug = normalizePath(slug)
      
      // Handle home page matching
      if ((current === '/' || current === '') && (normalizedSlug === '/' || normalizedSlug === '' || normalizedSlug === '/home')) {
        return true
      }
      
      // Exact match or path starts with slug (for nested pages)
      return current === normalizedSlug || (normalizedSlug !== '/' && current.startsWith(normalizedSlug + '/'))
    } else if (pageLink.type === 'custom' && pageLink.url) {
      const normalizedUrl = normalizePath(pageLink.url)
      
      // Handle home page matching for custom URLs
      if ((current === '/' || current === '') && (normalizedUrl === '/' || normalizedUrl === '' || normalizedUrl === '/home')) {
        return true
      }
      
      // Exact match or path starts with URL (for nested pages)
      return current === normalizedUrl || (normalizedUrl !== '/' && current.startsWith(normalizedUrl + '/'))
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
        const normalizedSlug = normalizePath(slug)
        
        // Handle home page matching
        if ((current === '/' || current === '') && (normalizedSlug === '/' || normalizedSlug === '' || normalizedSlug === '/home')) {
          return true
        }
        
        // Exact match or path starts with slug (for nested pages)
        return current === normalizedSlug || (normalizedSlug !== '/' && current.startsWith(normalizedSlug + '/'))
      } else if (link.type === 'custom' && link.url) {
        const normalizedUrl = normalizePath(link.url)
        
        // Handle home page matching for custom URLs
        if ((current === '/' || current === '') && (normalizedUrl === '/' || normalizedUrl === '' || normalizedUrl === '/home')) {
          return true
        }
        
        // Exact match or path starts with URL (for nested pages)
        return current === normalizedUrl || (normalizedUrl !== '/' && current.startsWith(normalizedUrl + '/'))
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

  // Generate button classes based on style
  // Generate button classes with theme-aware colors
  const getButtonClasses = (isActive = false) => {
    const baseClasses = `flex items-center gap-1 px-3 py-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${getRoundnessClass()}`
    
    if (colorTheme === 'auto') {
      // Use theme-aware classes with clean active states
      switch (style) {
        case 'background':
          return `${baseClasses} ${isActive 
            ? 'bg-primary text-primary-foreground font-medium' 
            : 'bg-primary/50 text-primary-foreground/80 hover:bg-primary/70'}`
        case 'outlined':
          return `${baseClasses} border ${isActive 
            ? 'border-primary bg-primary text-primary-foreground' 
            : 'border-primary/60 text-primary/70 bg-transparent hover:border-primary hover:text-primary'}`
        case 'text':
        default:
          return `${baseClasses} ${isActive 
            ? 'text-primary font-medium bg-primary/10 relative' 
            : 'text-primary/60 hover:text-primary/80'}`
      }
    } else {
      // Use custom colors with CSS custom properties
      switch (style) {
        case 'background':
          return `${baseClasses} nav-button-bg ${isActive ? 'nav-active-bg' : 'opacity-60 hover:opacity-80'}`
        case 'outlined':
          return `${baseClasses} border nav-button-outlined ${isActive ? 'nav-active-outlined' : 'opacity-60 hover:opacity-80'} bg-transparent`
        case 'text':
        default:
          return `${baseClasses} nav-button-text ${isActive ? 'nav-active-text' : 'opacity-60 hover:opacity-80'}`
      }
    }
  }

  // Generate button styles for custom colors with theme awareness
  const getButtonStyle = (_isHover = false, _isActive = false) => {
    if (colorTheme === 'auto') {
      return {} // Let CSS classes handle styling
    }

    const styleObj: Record<string, string> = {}
    
    // Create CSS custom properties for theme-aware colors
    if (lightColors) {
      styleObj['--nav-light-primary'] = lightColors.primaryColor || '#4F46E5'
      styleObj['--nav-light-hover'] = lightColors.hoverColor || '#3730A3'
      styleObj['--nav-light-text'] = lightColors.textColor || '#FFFFFF'
      styleObj['--nav-light-text-hover'] = lightColors.textHoverColor || '#FFFFFF'
    }
    if (darkColors) {
      styleObj['--nav-dark-primary'] = darkColors.primaryColor || '#93C5FD'
      styleObj['--nav-dark-hover'] = darkColors.hoverColor || '#93C5FD'
      styleObj['--nav-dark-text'] = darkColors.textColor || '#1e293b'
      styleObj['--nav-dark-text-hover'] = darkColors.textHoverColor || '#1e293b'
    }

    // Apply appropriate classes based on state
    return styleObj as React.CSSProperties
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
                style={getButtonStyle(hoveredButton === i, isActive)}
                onMouseEnter={() => setHoveredButton(i)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <CMSLink 
                  {...singleLink} 
                  className={getButtonClasses(isActive)}
                >
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
                            <CMSLink
                              {...item.pageLink}
                              className={`mx-1 rounded-md block px-4 py-3 text-sm transition-colors ${
                                isSubActive 
                                  ? 'bg-primary/10 text-primary font-medium' 
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
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
