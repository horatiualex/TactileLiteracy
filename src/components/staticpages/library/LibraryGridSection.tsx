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
        className="w-full py-4 px-8 lg:px-16 flex items-center justify-center gap-4 flex-wrap"
        style={{ backgroundColor: '#D2D2D2' }}
      >
        {adaptedForOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedAdaptedFor(option.value)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
              selectedAdaptedFor === option.value
                ? 'bg-[#3A3A3A] text-white'
                : 'bg-[#E8E8E8] text-gray-700 hover:bg-[#D9D9D9]'
            }`}
            style={{
              boxShadow: selectedAdaptedFor === option.value
                ? 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.1)'
                : '2px 2px 4px rgba(0, 0, 0, 0.15), -1px -1px 2px rgba(255, 255, 255, 0.8)'
            }}
          >
            <AdaptedIcon type={option.icon} active={selectedAdaptedFor === option.value} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div 
        className="w-full py-16 px-8 lg:px-16"
        style={{ backgroundColor: '#D2D2D2' }}
      >
        <div className="w-full">
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
            <div className="flex-1">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Nu au fost găsite imagini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <LibraryCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Icon component for adapted for filters
function AdaptedIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? '#FFFFFF' : '#3A3A3A'
  
  switch (type) {
    case 'eye':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'blind':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#E53935' : '#E53935'}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" />
        </svg>
      )
    case 'deaf':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#FB8C00' : '#FB8C00'}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4v2c0 1.1-.9 2-2 2h-1" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="10" cy="16" r="1.5" fill="white" />
        </svg>
      )
    case 'neurodivergent':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? '#1E88E5' : '#1E88E5'}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v4M12 14v4M6 12h4M14 12h4" stroke="white" strokeWidth="2" />
        </svg>
      )
    case 'no-description':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
      )
    default:
      return null
  }
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
      href={`/biblioteca/${item.slug}`}
      className="block overflow-hidden group"
    >
      {/* Image with tags */}
      <div 
        className="aspect-square bg-[#4A4A4A] rounded-t-2xl relative overflow-hidden"
        style={{
          boxShadow: 'inset 2.38px 7.13px 3.17px rgba(0, 0, 0, 0.4), -1.58px -2.38px 2.18px rgba(255, 255, 255, 1)',
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} className="w-full h-full object-contain p-4" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/60 text-lg">img / video</span>
          </div>
        )}

        {/* Top tags - Categories & Difficulty */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {categoryTags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 bg-white/90 text-gray-800 text-xs font-medium rounded"
                style={{ boxShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          {difficultyLabel && (
            <span 
              className="px-2.5 py-1 bg-white/90 text-gray-600 text-xs rounded"
              style={{ boxShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
            >
              {difficultyLabel}
            </span>
          )}
        </div>

        {/* Adapted for icons */}
        <div className="absolute top-3 right-3 flex gap-1">
          {item.adaptedFor?.includes('blind') && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs">👁</span>
            </div>
          )}
          {item.adaptedFor?.includes('deaf') && (
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white text-xs">👂</span>
            </div>
          )}
          {item.adaptedFor?.includes('neurodivergent') && (
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xs">🧠</span>
            </div>
          )}
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-3 left-3">
          <span 
            className="px-3 py-1.5 bg-[#3A3A3A] text-white text-xs font-medium rounded"
            style={{ boxShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
          >
            Text nevăzători
          </span>
        </div>
      </div>

      {/* Card Content with SVG background */}
      <div 
        className="relative"
        style={{
          filter: 'drop-shadow(1.58px 2.38px 2.18px rgba(255, 255, 255, 1))',
          marginTop: '-1px'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 406 203"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{
            filter: 'drop-shadow(1.58px 2.38px 2.18px rgba(255, 255, 255, 1))'
          }}
        >
          <defs>
            <filter id="innerShadowLibrary" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset dx="2.38" dy="7.13" />
              <feGaussianBlur stdDeviation="1.585" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="#000000" floodOpacity="0.4" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <path 
            d="M405,0v93.38c0,13.05-10.57,23.62-23.61,23.62h-23.62c-29.45.43-53.18,24.43-53.18,53.97,0,17.69-14.34,32.03-32.03,32.03H35c-19.33,0-35-15.67-35-35V0h405Z" 
            style={{ fill: '#d9d9d8' }}
            filter="url(#innerShadowLibrary)"
          />
        </svg>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.shortDescription || item.meta?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'}
            </p>
          </div>
          
          {/* Footer - Category */}
          <div className="text-sm text-gray-500">
            {categoryTags[0] && <span>Nume categorie?</span>}
          </div>
        </div>

        {/* Fish icon with arrow */}
        <div
          className="absolute z-20 cursor-pointer right-0 bottom-0 group/fish"
          aria-hidden
        >
          <div 
            className="relative w-[100px] h-[100px] -scale-x-100"
            style={{
              filter: 'drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.25)) drop-shadow(-1px -1px 2px rgba(255, 255, 255, 0.6))'
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
            {/* Default arrow - gray */}
            <svg
              className="absolute inset-0 m-auto w-6 h-6 transition-all duration-300 ease-out group-hover/fish:opacity-0 -scale-x-100"
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
              className="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover/fish:opacity-100 transition-all duration-300 ease-out -scale-x-100"
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
