'use client'

import React from 'react'

export const ScrollDownButton: React.FC = () => {
  const handleClick = () => {
    const heroElement = document.querySelector('[class*="min-h-screen"]')
    if (heroElement) {
      const heroHeight = heroElement.getBoundingClientRect().height
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="absolute bottom-8 right-4 sm:right-8 z-30">
      <button 
        className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16
        bg-white dark:bg-white
        text-gray-900 dark:text-gray-900
        rounded-full shadow-xl 
        hover:bg-gray-100 dark:hover:bg-gray-200
        hover:shadow-2xl hover:scale-110
        focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black/50
        transition-all duration-300 ease-in-out
        border-2 border-white/20"
        onClick={handleClick}
        aria-label="Derulează la secțiunea următoare"
        title="Derulează jos"
      >
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 text-gray-900 group-hover:translate-y-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
        <span className="sr-only">Derulează la următoarea secțiune</span>
      </button>
    </div>
  )
}
