'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'
import { SearchIcon, ChevronDownIcon, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import './mobile-menu-override.css'

interface HeaderStyling {
  backgroundType?: 'transparent' | 'semi-transparent' | 'solid'
  layout?: 'container' | 'full-width'
  buttonStyle?: {
    activeStyle?: 'button' | 'underline'
    roundness?: 'none' | 'small' | 'medium' | 'large' | 'full'
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

interface ExtendedHeader extends HeaderType {
  styling?: HeaderStyling
  branding?: HeaderBranding
  search?: HeaderSearch
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  // Get data from header
  const extendedData = data as ExtendedHeader
  const buttonStyle = extendedData?.styling?.buttonStyle
  const branding = extendedData?.branding
  const search = extendedData?.search
  const activeStyle = buttonStyle?.activeStyle || 'button'
  const roundness = buttonStyle?.roundness || 'medium'

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if click is outside the navigation
      if (!target.closest('.header-nav-container')) {
        setOpenIndex(null)
      }
    }

    if (openIndex !== null) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [openIndex])

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

  // Helper function to get roundness classes
  const getRoundnessClass = () => {
    switch (roundness) {
      case 'none':
        return 'rounded-none'
      case 'small':
        return 'rounded-md'
      case 'medium':
        return 'rounded-lg'
      case 'large':
        return 'rounded-xl'
      case 'full':
        return 'rounded-full'
      default:
        return 'rounded-lg'
    }
  }

  const getButtonClasses = (isActive = false, isHovered = false) => {
    if (activeStyle === 'underline') {
      // Wix-style underline approach
      const baseClasses = `flex items-center gap-1 px-3 py-3 text-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary relative`
      
      if (isActive) {
        return `${baseClasses} text-gray-900 dark:text-white font-medium after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gray-900 dark:after:bg-white after:rounded-full after:transition-all after:duration-200`
      }
      
      if (isHovered) {
        return `${baseClasses} text-gray-900 dark:text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gray-400 dark:after:bg-gray-400 after:rounded-full after:transition-all after:duration-200`
      }
      
      return `${baseClasses} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white`
    } else {
      // Original button style approach
      const baseClasses = `flex items-center gap-1 px-3 py-2 text-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${getRoundnessClass()}`
      
      if (isActive) {
        return `${baseClasses} bg-primary text-primary-foreground shadow-md ring-1 ring-primary/20`
      }
      
      return `${baseClasses} text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800`
    }
  }

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
      // Check if any submenu item is active
      return navItem.submenu.some((subItem) => isSubmenuItemActive(subItem.pageLink))
    }
    return false
  }

  return (
    <div className="flex-1 flex items-center justify-end lg:justify-between">
      {/* Desktop Navigation - Center positioned */}
      <nav className="hidden lg:flex gap-3 items-center header-nav-container lg:flex-1 lg:justify-center" aria-label="Meniu principal">
        {navItems.map((navItem, i) => {
          if (!navItem) return null
          const { label, type, singleLink, submenu, dropdownStyle } = navItem

          // Always render single links
          if (type === 'link' && singleLink && (singleLink.url || singleLink.reference)) {
            const isActive = isNavItemActive(navItem)
            const isHovered = hoveredIndex === i
            return (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CMSLink
                  className={getButtonClasses(isActive, isHovered)}
                  {...singleLink}
                >
                  {label}
                </CMSLink>
              </div>
            )
          }

          // Render dropdown menu
          if (type === 'dropdown' && submenu && submenu.length > 0) {
            const activeSubIndex = submenu.findIndex((sub) => isSubmenuItemActive(sub.pageLink))
            const isActive = activeSubIndex !== -1
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className="relative group"
              >
                <button
                  className={`${getButtonClasses(isActive, isOpen)}`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    setOpenIndex(isOpen ? null : i)
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {label}
                  <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    className={`absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 ${getRoundnessClass()} shadow-lg border border-gray-200 dark:border-gray-700 min-w-56 z-50 transition-all duration-150 opacity-100 visible translate-y-0`}
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
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                  isSubActive
                                    ? 'bg-primary text-primary-foreground font-medium'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                }`}
                              >
                                {item.label}
                              </CMSLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          }

          return null
        })}
      </nav>

      {/* Desktop and Mobile Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <div className="hidden lg:block">
          <ThemeToggle variant="header" />
        </div>

        {/* Desktop Search Button - Right side, black button like Anthropic */}
        {search?.showSearch !== false && (
          <Link
            href={search?.searchUrl || '/search'}
            className="hidden lg:flex items-center justify-center w-10 h-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Căutare"
          >
            <SearchIcon className="w-5 h-5" />
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden bg-background overflow-y-auto min-h-screen">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background">
            <Link href="/acasa" onClick={closeMobileMenu} className="flex items-center gap-3">
              {branding?.showLogo !== false && <Logo />}
              {branding?.showText && branding?.brandText && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {branding.brandText}
                </span>
              )}
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
              aria-label="Închide meniul"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-2 min-h-[calc(100vh-80px)] bg-background" aria-label="Meniu principal mobil">
            {navItems.map((navItem, i) => {
              if (!navItem) return null
              const { label, type, singleLink, submenu } = navItem

              if (type === 'link' && singleLink && (singleLink.url || singleLink.reference)) {
                const isActive = isNavItemActive(navItem)
                return (
                  <div
                    key={i}
                    onClick={closeMobileMenu}
                  >
                    <CMSLink
                      className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      {...singleLink}
                    >
                      <div className="flex items-center justify-between">
                        {label}
                      </div>
                    </CMSLink>
                  </div>
                )
              }

              if (type === 'dropdown' && submenu && submenu.length > 0) {
                const activeSubIndex = submenu.findIndex((sub) => isSubmenuItemActive(sub.pageLink))
                const isActive = activeSubIndex !== -1
                const isOpen = mobileOpenIndex === i

                return (
                  <div key={i} className="space-y-1">
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setMobileOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      {label}
                      <ChevronDownIcon 
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="ml-4 space-y-1">
                        {submenu.map((subItem, subIndex) => {
                          if (!subItem.pageLink) return null
                          const isSubActive = isSubmenuItemActive(subItem.pageLink)
                          
                          return (
                            <div
                              key={subIndex}
                              onClick={closeMobileMenu}
                            >
                              <CMSLink
                                className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                                  isSubActive
                                    ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium border-l-2 border-blue-600 dark:border-blue-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                                {...subItem.pageLink}
                              >
                                <div className="flex items-center justify-between">
                                  {subItem.label}
                                </div>
                              </CMSLink>
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

            {/* Mobile Search */}
            {search?.showSearch !== false && (
              <Link
                href={search?.searchUrl || '/search'}
                className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <SearchIcon className="w-5 h-5" />
                Căutare
              </Link>
            )}

            {/* Mobile Theme Toggle */}
            <div className="px-4 py-3 border-t border-border mt-4 pt-4">
              <div className="flex items-center gap-2">
                <ThemeToggle variant="footer" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
