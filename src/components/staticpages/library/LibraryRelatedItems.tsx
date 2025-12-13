'use client'
import React, { useState } from 'react'
import type { Library } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface LibraryRelatedItemsProps {
  items: Library[]
}

export default function LibraryRelatedItems({ items }: LibraryRelatedItemsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  if (!items || items.length === 0) return null

  const visibleItems = 3
  const maxIndex = Math.max(0, items.length - visibleItems)
  const displayedItems = items.slice(currentIndex, currentIndex + visibleItems)

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }

  return (
    <section className="w-full bg-[#D2D2D2] py-16 px-8 lg:px-16">
      <div className="w-full">
        {/* Badge - very inset */}
        <div className="mb-8">
          <span
            className="inline-block px-8 py-3 bg-[#d9d9d9] text-[#434343] text-lg rounded-full"
            style={{
              boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
            }}
          >
            See related images
          </span>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-30 w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '4px 4px 8px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.2)',
              }}
              aria-label="Previous items"
            >
              <ChevronLeft size={28} strokeWidth={2.5} className="text-gray-800" />
            </button>
          )}

          {/* Items grid */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-20 pb-10 2xl:pb-16">
              {displayedItems.map((item) => (
                <LibraryRelatedCard key={item.id} item={item} />
              ))}
            </div>
            {/* Shelf - only visible on xl screens (3 columns) */}
            <div className="hidden xl:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[105%] z-10">
              <img 
                src="/assets/library/raft.svg" 
                alt="" 
                className="w-full h-auto"
              />
            </div>

          </div>

          {/* Right arrow */}
          {currentIndex < maxIndex && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-30 w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '4px 4px 8px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.2)',
              }}
              aria-label="Next items"
            >
              <ChevronRight size={28} strokeWidth={2.5} className="text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

// Related card component (reusing the design from LibraryGridSection)
function LibraryRelatedCard({ item }: { item: Library }) {
  const imageUrl = typeof item.tactileImage === 'object' && item.tactileImage?.url 
    ? item.tactileImage.url 
    : null

  const categoryTags = item.categories?.slice(0, 2).map((cat) => {
    if (typeof cat === 'object') return cat.title
    return ''
  }).filter(Boolean) || []

  const difficultyLabel = item.difficultyLevel === 'easy' ? 'Ușor' 
    : item.difficultyLevel === 'medium' ? 'Mediu' 
    : item.difficultyLevel === 'hard' ? 'Dificil' 
    : null

  return (
    <a
      href={`/library/${item.slug}`}
      className="block overflow-hidden group"
    >
      {/* Image area - WHITE background with shadows */}
      <div 
        className="relative rounded-t-3xl overflow-hidden bg-white"
        style={{
          boxShadow: '-2px -1px 2.75px rgba(255, 255, 255, 0.7), 0px 8px 16px rgba(0, 0, 0, 0.35)'
        }}
      >
        {/* Top badges row */}
        <div className="absolute top-4 left-4 right-4 2xl:top-6 2xl:left-6 2xl:right-6 flex items-start justify-between z-10">
          {/* Category badge - left */}
          {categoryTags[0] && (
            <span 
              className="px-4 py-2 2xl:px-6 2xl:py-3 bg-[#E8E8E8] text-gray-700 text-sm 2xl:text-lg font-medium rounded-full"
              style={{ 
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.8)' 
              }}
            >
              {categoryTags[0]}
            </span>
          )}
          
          {/* Difficulty badge - right */}
          {difficultyLabel && (
            <span 
              className="px-4 py-2 2xl:px-6 2xl:py-3 bg-[#E8E8E8] text-gray-600 text-sm 2xl:text-lg rounded-full"
              style={{ 
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.8)' 
              }}
            >
              {difficultyLabel}
            </span>
          )}
        </div>

        {/* Corner markers - top right */}
        <div className="absolute top-12 right-3 w-5 h-5 border-t-2 border-r-2 border-gray-300 z-10" />
        {/* Corner markers - bottom right */}
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gray-300 z-10" />

        {/* Main image - reduced height */}
        <div className="aspect-[4/3] flex items-center justify-center p-4 pt-10">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={item.title} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-lg">img / video</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content with dark SVG background and shadows */}
      <div 
        className="relative" 
        style={{ 
          marginTop: '-1px',
          filter: 'drop-shadow(-2px -1px 2.75px rgba(255, 255, 255, 0.7)) drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.35))'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 298 203.5"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M298,0v93.88c0,13.05-10.58,23.62-23.62,23.62h-23.62c-29.44.43-53.18,24.43-53.18,53.97v16.02c0,8.84-7.17,16.01-16.01,16.01H35c-19.33,0-35-15.67-35-35V0h298Z" 
            style={{ fill: '#434343' }}
          />
        </svg>
        
        {/* Content overlay */}
        <div className="absolute inset-0 p-5 pt-4 2xl:p-8 2xl:pt-6 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl 2xl:text-3xl font-bold text-white mb-2 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm 2xl:text-lg text-gray-300 line-clamp-2">
              {item.shortDescription || 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do...'}
            </p>
          </div>
          
          {/* Footer row - Adapted icons left, fish right */}
          <div className="flex items-end justify-between mt-4">
            {/* Adapted for icons - colored circles with deep inset effect */}
            <div className="flex gap-2 2xl:gap-4">
              {item.adaptedFor?.includes('blind') && (
                <div 
                  className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: '#E53935',
                    boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(255,255,255,0.2), inset 0 0 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <img src="/assets/library/blind.svg" alt="Nevăzători" className="w-7 h-7 2xl:w-10 2xl:h-10 brightness-0 invert" />
                </div>
              )}
              {item.adaptedFor?.includes('deaf') && (
                <div 
                  className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: '#FFC107',
                    boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.3), inset 0 0 12px rgba(0,0,0,0.2)'
                  }}
                >
                  <img src="/assets/library/deaf.tif.svg" alt="Surzi" className="w-7 h-7 2xl:w-10 2xl:h-10" />
                </div>
              )}
              {item.adaptedFor?.includes('neurodivergent') && (
                <div 
                  className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: '#03A9F4',
                    boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(255,255,255,0.2), inset 0 0 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <img src="/assets/library/neurodivergent.svg" alt="Neurodivergenți" className="w-7 h-7 2xl:w-10 2xl:h-10 brightness-0 invert" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fish icon with arrow - responsive to fit cutout */}
        <div
          className="absolute z-20 cursor-pointer right-[0%] bottom-[0%] group/fish"
          aria-hidden
          style={{ width: '28%', height: 'auto', aspectRatio: '1/1' }}
        >
          <div 
            className="relative w-full h-full -scale-x-100"
            style={{
              filter: 'drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.25)) drop-shadow(-1px -1px 2px rgba(255, 255, 255, 0.3))'
            }}
          >
            {/* Default fish - dark */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-out group-hover/fish:opacity-0"
            />
            {/* Hover fish - orange */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover/fish:opacity-100"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1500%) hue-rotate(345deg) brightness(95%) contrast(95%)',
              }}
            />
            {/* Default arrow - white */}
            <svg
              className="absolute inset-0 m-auto w-[30%] h-[30%] transition-all duration-300 ease-out group-hover/fish:opacity-0 -scale-x-100"
              style={{ color: '#D9D9D9' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
            {/* Hover state arrow - white & bigger */}
            <svg
              className="absolute inset-0 m-auto w-[35%] h-[35%] text-white opacity-0 group-hover/fish:opacity-100 transition-all duration-300 ease-out -scale-x-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}
