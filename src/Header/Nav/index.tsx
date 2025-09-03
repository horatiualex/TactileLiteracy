'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDownIcon } from 'lucide-react'

const BadgeNew: React.FC = () => (
  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Nou</span>
)

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <nav className="flex gap-3 items-center" aria-label="Meniu principal">
      {navItems.map((navItem, i) => {
        if (!navItem) return null
        const { label, type, singleLink, submenu, dropdownStyle } = navItem

        // Always render single links
        if (type === 'link' && singleLink && (singleLink.url || singleLink.reference)) {
          return (
            <CMSLink key={i} {...singleLink} appearance="link">
              {label}
            </CMSLink>
          )
        }

        // Render dropdowns only if they have submenu items
        if (type === 'dropdown' && Array.isArray(submenu) && submenu.length > 0) {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex((prev) => (prev === i ? null : prev))}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-primary hover:text-primary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
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
                          className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
      <Link href="/search" className="ml-2">
        <span className="sr-only">Căutare</span>
        <SearchIcon className="w-5 text-primary hover:text-primary/80 transition-colors" />
      </Link>
    </nav>
  )
}
