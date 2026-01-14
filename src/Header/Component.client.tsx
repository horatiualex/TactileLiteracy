import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header 
      className="sticky top-0 z-50"
      style={{ backgroundColor: '#D9D9D9' }}
    >
      <div className="w-full px-8 lg:px-16">
        <div className="py-4 flex items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image 
                src="/tactile-logo.svg" 
                alt="Tactile Literacy" 
                width={200} 
                height={50}
                priority
                className="h-12 w-auto p-2 rounded-xl"
                style={{
                  boxShadow: '1px 2px 1px 0px #FFFFFF, inset 3px 5px 1px 0px rgba(0, 0, 0, 0.4)'
                }}
              />
            </Link>
          </div>

          {/* Center and Right: Navigation + Search */}
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
