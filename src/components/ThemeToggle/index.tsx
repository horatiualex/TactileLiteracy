'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import React from 'react'

interface ThemeToggleProps {
  variant?: 'header' | 'footer'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'header' }) => {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleTheme()
    }
  }

  // Header variant - more compact, fits in navigation
  if (variant === 'header') {
    return (
      <button
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-center w-10 h-10 
          bg-gray-100 dark:bg-gray-800 
          text-gray-900 dark:text-white
          hover:bg-gray-200 dark:hover:bg-gray-700
          rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={theme === 'dark' ? 'Schimbă la tema light' : 'Schimbă la tema dark'}
        title="Schimbă tema"
        role="button"
        tabIndex={0}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Moon className="w-5 h-5" aria-hidden="true" />
        )}
        <span className="sr-only">
          {theme === 'dark' ? 'Schimbă la tema light' : 'Schimbă la tema dark'}
        </span>
      </button>
    )
  }

  // Footer variant - can have text label
  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-2 px-4 py-2
        bg-gray-100 dark:bg-gray-800 
        text-gray-900 dark:text-white
        hover:bg-gray-200 dark:hover:bg-gray-700
        rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        text-sm font-medium"
      aria-label={theme === 'dark' ? 'Schimbă la tema light' : 'Schimbă la tema dark'}
      title="Schimbă tema"
      role="button"
      tabIndex={0}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-5 h-5" aria-hidden="true" />
          <span>Temă Light</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" aria-hidden="true" />
          <span>Temă Dark</span>
        </>
      )}
      <span className="sr-only">
        {theme === 'dark' ? 'Schimbă la tema light' : 'Schimbă la tema dark'}
      </span>
    </button>
  )
}
