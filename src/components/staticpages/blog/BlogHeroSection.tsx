'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/utilities/useDebounce'

interface BlogHeroSectionProps {
  title: string
  description: string
  searchPlaceholder?: string
  imagePosition?: 'left' | 'right'
  imageSrc?: string
  imageAlt?: string
}

export default function BlogHeroSection({
  title,
  description,
  searchPlaceholder = 'Caută articolul...',
  imagePosition = 'right',
  imageSrc = '/hello-languages.jpg',
  imageAlt = 'Blog Hero Image',
}: BlogHeroSectionProps) {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const debouncedValue = useDebounce(searchValue)
  const isImageRight = imagePosition === 'right'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <section className="relative w-full h-[90vh] max-h-[900px] flex items-center">
      <div
        className={`w-full ${
          isImageRight ? 'pl-8 lg:pl-16 pr-[60%]' : 'pr-8 lg:pr-16 pl-[60%]'
        }`}
      >
        <div
          className={`space-y-6 z-10 max-w-2xl ${!isImageRight ? 'ml-auto' : ''}`}
          style={{ color: '#D9D9D9' }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
          <p className="text-lg leading-relaxed">{description}</p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full px-6 py-3 pr-12 bg-white/90 text-gray-900 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-500"
                style={{
                  boxShadow:
                    '3px 6px 6px rgba(0, 0, 0, 0.5), inset 3px 3.5px 2.5px rgba(255, 255, 255, 1)',
                }}
                aria-label="Caută conținut"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Trimite căutarea"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        
        {/* Hero Image with Mask */}
        <div
          className={`absolute ${isImageRight ? 'right-0' : 'left-0'} top-0 w-[60vw] max-w-[1100px] h-[90vh] max-h-[900px]`}
        >
          <div
            className="w-full h-full"
            style={{
              position: 'relative',
              filter: 'drop-shadow(1.42px 2.86px 2.86px rgba(255, 255, 255, 0.7))',
            }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                WebkitMaskImage: 'url(/mask-shape.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'right center',
                maskImage: 'url(/mask-shape.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'right center',
                transform: isImageRight ? undefined : 'scaleX(-1)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
