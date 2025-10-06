'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

interface BackToTopProps {
  showAfterScroll?: number
  position?: 'bottom-right' | 'bottom-left'
}

export const BackToTop: React.FC<BackToTopProps> = ({
  showAfterScroll = 300,
  position = 'bottom-right',
}) => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfterScroll) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [showAfterScroll])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  const positionClasses = {
    'bottom-right': 'right-4 sm:right-6 lg:right-8',
    'bottom-left': 'left-4 sm:left-6 lg:left-8',
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          className={`fixed bottom-4 sm:bottom-6 lg:bottom-8 ${positionClasses[position]} z-50 
            flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
            bg-gray-900 dark:bg-gray-100 
            text-white dark:text-gray-900
            rounded-full shadow-lg 
            hover:bg-gray-800 dark:hover:bg-gray-200
            hover:shadow-xl hover:scale-110
            focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2
            transition-all duration-300 ease-in-out
            opacity-0 ${isVisible ? 'animate-fadeIn opacity-100' : ''}
            `}
          aria-label="Înapoi sus"
          title="Înapoi sus"
          tabIndex={0}
        >
          <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          <span className="sr-only">Înapoi în partea de sus a paginii</span>
        </button>
      )}
    </>
  )
}
