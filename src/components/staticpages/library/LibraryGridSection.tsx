'use client'
import React, { useState } from 'react'
import type { Library, LibraryCategory } from '@/payload-types'

// Filter options for "Adaptat pentru"
const adaptedForOptions = [
  { value: 'all', label: 'Vezi tot', icon: 'eye' },
  { value: 'blind', label: 'Adaptat pentru nevăzători', icon: 'blind' },
  { value: 'deaf', label: 'Adaptat pentru surzi', icon: 'deaf' },
  { value: 'neurodivergent', label: 'Adaptat pentru neurodivergenți', icon: 'neurodivergent' },
  { value: 'no-description', label: 'Fără descriere', icon: 'no-description' },
]

// Difficulty levels
const difficultyOptions = [
  { value: 'easy', label: 'Ușor' },
  { value: 'medium', label: 'Mediu' },
  { value: 'hard', label: 'Dificil' },
]

interface LibraryGridSectionProps {
  items: Library[]
  categories: LibraryCategory[]
}

export default function LibraryGridSection({ items, categories }: LibraryGridSectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedAdaptedFor, setSelectedAdaptedFor] = useState<string>('all')

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    )
  }

  // Filter items based on all selected filters
  const filteredItems = items.filter((item) => {
    // Category filter
    if (selectedCategories.length > 0) {
      if (!item.categories) return false
      const hasMatchingCategory = item.categories.some((cat) => {
        const categoryId = typeof cat === 'object' ? cat.id : cat
        return selectedCategories.includes(String(categoryId))
      })
      if (!hasMatchingCategory) return false
    }

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      if (!item.difficultyLevel || !selectedDifficulties.includes(item.difficultyLevel)) {
        return false
      }
    }

    // Adapted for filter
    if (selectedAdaptedFor !== 'all') {
      if (selectedAdaptedFor === 'no-description') {
        if (item.hasDescription !== false) return false
      } else {
        if (!item.adaptedFor || !item.adaptedFor.includes(selectedAdaptedFor as 'blind' | 'deaf' | 'neurodivergent')) {
          return false
        }
      }
    }

    return true
  })

  // Count items per category
  const getCategoryItemCount = (categoryId: string) => {
    return items.filter((item) => {
      if (!item.categories) return false
      return item.categories.some((cat) => {
        const catId = typeof cat === 'object' ? cat.id : cat
        return String(catId) === categoryId
      })
    }).length
  }

  // Count items per difficulty
  const getDifficultyItemCount = (difficulty: string) => {
    return items.filter((item) => item.difficultyLevel === difficulty).length
  }

  return (
    <section className="w-full">
      {/* Top Filter Bar - Adaptat pentru */}
      <div 
        className="w-full py-4 px-8 lg:px-16"
        style={{ 
          backgroundColor: '#D9D9D9',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Filter buttons - full width, spaced evenly on large screens */}
        <div className="flex items-center justify-center gap-2 lg:gap-3 flex-wrap">
          {adaptedForOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAdaptedFor(option.value)}
              className={`flex items-center justify-center gap-2 lg:gap-3 px-4 py-2 lg:px-5 lg:py-3 xl:px-6 2xl:px-8 2xl:py-3 rounded-full font-medium transition-all duration-200 ${
                selectedAdaptedFor === option.value
                  ? 'bg-[#C8C8C8] text-gray-800'
                  : 'bg-[#E8E8E8] text-gray-700 hover:bg-[#DFDFDF]'
              }`}
              style={{
                boxShadow: selectedAdaptedFor === option.value
                  ? 'inset 3px 3px 8px rgba(0, 0, 0, 0.35), inset -2px -2px 6px rgba(255, 255, 255, 0.4)'
                  : '3px 3px 6px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.9)'
              }}
            >
              <img 
                src={`/assets/library/${option.icon === 'eye' ? 'seeall' : option.icon === 'blind' ? 'blind' : option.icon === 'deaf' ? 'deaf.tif' : option.icon === 'neurodivergent' ? 'neurodivergent' : 'nodescription'}.svg`}
                alt=""
                className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7 flex-shrink-0"
              />
              <span className="text-sm lg:text-base 2xl:text-lg whitespace-nowrap">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="w-full py-16 px-8 lg:px-16 relative"
        style={{ backgroundColor: '#D2D2D2' }}
      >
        {/* Top light - positioned under filter bar, only over grid area */}
        <div className="hidden xl:block absolute xl:-top-10 2xl:-top-28 left-0 right-0 h-40 pointer-events-none z-0">
          <div className="absolute top-0 left-[calc(288px+2rem+4rem)] right-0">
            <img 
              src="/assets/library/light.svg" 
              alt="" 
              className="w-full h-auto opacity-90"
            />
          </div>
        </div>

        <div className="w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div 
                className="sticky top-24 p-6 rounded-3xl bg-[#D9D9D9]"
                style={{
                  boxShadow: 'inset 6px 6px 12px rgba(0, 0, 0, 0.25), inset -6px -6px 12px rgba(255, 255, 255, 0.9), 3px 3px 6px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrează după:</h3>
                
                {/* Categories Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Categorie:</h4>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(String(category.id))}
                          onChange={() => toggleCategory(String(category.id))}
                          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                        />
                        <span>{category.title}</span>
                        <span className="text-gray-400">({getCategoryItemCount(String(category.id))})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Nivel de dificultate:</h4>
                  <div className="space-y-2">
                    {difficultyOptions.map((difficulty) => (
                      <label
                        key={difficulty.value}
                        className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDifficulties.includes(difficulty.value)}
                          onChange={() => toggleDifficulty(difficulty.value)}
                          className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                        />
                        <span>{difficulty.label}</span>
                        <span className="text-gray-400">({getDifficultyItemCount(difficulty.value)})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Library Items Grid */}
            <div className="flex-1 relative">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Nu au fost găsite imagini.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {/* Group items in rows of 3 for shelf display */}
                  {Array.from({ length: Math.ceil(filteredItems.length / 3) }).map((_, rowIndex) => {
                    const rowItems = filteredItems.slice(rowIndex * 3, rowIndex * 3 + 3)
                    return (
                      <div key={rowIndex} className="relative">
                        {/* Cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-20 pb-10 2xl:pb-16">
                          {rowItems.map((item) => (
                            <LibraryCard key={item.id} item={item} />
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
                        {/* Light under shelf */}
                        <div className="hidden xl:block absolute -bottom-20 xl:-bottom-24 2xl:-bottom-32 left-1/2 -translate-x-1/2 w-full z-0 pointer-events-none">
                          <img 
                            src="/assets/library/light.svg" 
                            alt="" 
                            className="w-full h-auto opacity-90"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Library Card Component
function LibraryCard({ item }: { item: Library }) {
  const imageUrl = typeof item.tactileImage === 'object' && item.tactileImage?.url 
    ? item.tactileImage.url 
    : null

  // Get category labels for tags
  const categoryTags = item.categories?.slice(0, 2).map((cat) => {
    if (typeof cat === 'object') return cat.title
    return ''
  }).filter(Boolean) || []

  // Get difficulty label
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
