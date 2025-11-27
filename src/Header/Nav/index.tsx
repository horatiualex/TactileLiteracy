'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { SearchIcon, Menu, X } from 'lucide-react'
import './mobile-menu-override.css'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const normalizePath = (p?: string | null) => {
    if (!p) return '/'
    if (!p.startsWith('/')) p = '/' + p
    if (p.length > 1) p = p.replace(/\/+$/g, '')
    return p || '/'
  }

  const getSlugFromReference = (reference: unknown): string => {
    if (!reference) return ''
    if (typeof reference === 'string') return reference
    if (typeof reference === 'object') {
      if ('value' in (reference as any)) {
        const val = (reference as any).value
        if (typeof val === 'string') return val
        if (val && typeof val === 'object' && 'slug' in val) {
          return val.slug || ''
        }
      }
      if ('slug' in (reference as any)) {
        return (reference as any).slug || ''
      }
    }
    return ''
  }

  const isNavItemActive = (navItem: NonNullable<HeaderType['navItems']>[0]) => {
    const current = normalizePath(pathname)
    if (navItem.type === 'link' && navItem.singleLink) {
      const link = navItem.singleLink
      if (link.type === 'reference' && link.reference) {
        const slug = getSlugFromReference(link.reference)
        const normalizedSlug = normalizePath(slug)
        return current === normalizedSlug
      } else if (link.type === 'custom' && link.url) {
        const normalizedUrl = normalizePath(link.url)
        return current === normalizedUrl
      }
    }
    return false
  }

  return (
    <div className="flex items-center flex-1">
      {/* Desktop Navigation - CENTER */}
      <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label="Meniu principal">
        {navItems.map((navItem, i) => {
          if (!navItem || navItem.type !== 'link' || !navItem.singleLink) return null
          const { label, singleLink } = navItem
          const isActive = isNavItemActive(navItem)

          return (
            <CMSLink
              key={i}
              {...singleLink}
              className={`px-6 py-2.5 text-base font-medium transition-all duration-200 rounded-full text-gray-700 hover:text-gray-900 ${
                isActive ? 'bg-[#D9D9D9]' : ''
              }`}
              style={isActive ? {
                boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.25), inset -2px -2px 4px rgba(255, 255, 255, 0.7)'
              } : undefined}
            >
              {label}
            </CMSLink>
          )
        })}
      </nav>

      {/* Desktop Search Input with inset/depth effect - RIGHT */}
      <div className="hidden lg:flex items-center ml-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your image..."
            className="w-80 px-5 py-2.5 pr-12 rounded-full bg-white/80 text-gray-700 placeholder:text-gray-500 focus:outline-none focus:bg-white transition-colors border-0"
            style={{
              boxShadow: '1.37px 2.75px 2.75px rgba(255, 255, 255, 1), inset 4px 3px 4px rgba(0, 0, 0, 0.5)'
            }}
          />
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden bg-white overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-xl">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((navItem, i) => {
              if (!navItem || navItem.type !== 'link' || !navItem.singleLink) return null
              const { label, singleLink } = navItem
              const isActive = isNavItemActive(navItem)

              return (
                <div key={i} onClick={() => setMobileMenuOpen(false)}>
                  <CMSLink
                    {...singleLink}
                    className={`block px-4 py-3 rounded-lg ${
                      isActive
                        ? 'bg-gray-900 text-white font-medium'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </CMSLink>
                </div>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}
