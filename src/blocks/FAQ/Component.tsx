'use client'

import React, { useState } from 'react'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type FAQItem = {
  question: string
  answer: DefaultTypedEditorState
  defaultOpen?: boolean
}

type Props = {
  className?: string
  title?: string
  description?: string
  width?: 'small' | 'medium' | 'large' | 'xlarge' | 'full'
  faqItems?: FAQItem[]
  style?: {
    backgroundColor?: 'none' | 'light' | 'dark' | 'primary'
    questionStyle?: 'normal' | 'medium' | 'semibold' | 'bold'
    showDividers?: boolean
  }
  showSearch?: boolean
  searchPlaceholder?: string
}

export const FAQBlockComponent: React.FC<Props> = ({
  className,
  title,
  description,
  width = 'medium',
  faqItems,
  style = {},
  showSearch = false,
  searchPlaceholder = 'Search for a question',
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(
      faqItems
        ?.map((item, index) => (item.defaultOpen ? index : null))
        .filter((index): index is number => index !== null) || []
    )
  )
  
  const [searchQuery, setSearchQuery] = useState('')

  if (!faqItems || faqItems.length === 0) {
    return null
  }

  // Filter FAQ items based on search query
  const filteredFaqItems = faqItems.filter((item, index) => {
    if (!searchQuery.trim()) return true
    
    const searchLower = searchQuery.toLowerCase()
    const questionMatch = item.question.toLowerCase().includes(searchLower)
    
    // Simple search in answer content (assuming it's a string representation)
    const answerText = JSON.stringify(item.answer).toLowerCase()
    const answerMatch = answerText.includes(searchLower)
    
    return questionMatch || answerMatch
  }).map((item, newIndex) => ({
    ...item,
    originalIndex: faqItems.findIndex(original => original === item)
  }))

  const toggleItem = (originalIndex: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(originalIndex)) {
        newSet.delete(originalIndex)
      } else {
        newSet.add(originalIndex)
      }
      return newSet
    })
  }

  const getBackgroundClass = () => {
    switch (style.backgroundColor) {
      case 'light':
        return 'bg-gray-50 dark:bg-gray-900 rounded-2xl'
      case 'dark':
        return 'bg-gray-900 dark:bg-gray-800 text-white rounded-2xl'
      case 'primary':
        return 'bg-primary text-primary-foreground rounded-2xl'
      default:
        return ''
    }
  }

  const getWidthClass = () => {
    switch (width) {
      case 'small':
        return 'max-w-2xl'
      case 'medium':
        return 'max-w-3xl'
      case 'large':
        return 'max-w-4xl'
      case 'xlarge':
        return 'max-w-5xl'
      case 'full':
        return 'max-w-none'
      default:
        return 'max-w-3xl'
    }
  }

  const getQuestionStyleClass = () => {
    switch (style.questionStyle) {
      case 'normal':
        return 'font-normal'
      case 'medium':
        return 'font-medium'
      case 'semibold':
        return 'font-semibold'
      case 'bold':
        return 'font-bold'
      default:
        return 'font-semibold'
    }
  }

  return (
    <section className={`py-8 lg:py-12 ${className || ''}`}>
      {width === 'full' ? (
        // Full width layout - background extends to full viewport width
        <div className={`py-12 lg:py-16 ${getBackgroundClass()}`}>
          <div className="container">
            <div className={`mx-auto ${getWidthClass()}`}>
              {title && (
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl text-center mb-4">
                  {title}
                </h2>
              )}
              
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
                  {description}
                </p>
              )}

              {/* Search Bar */}
              {showSearch && (
                <div className="mb-8">
                  <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-0">
                {filteredFaqItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No questions found matching your search.
                    </p>
                  </div>
                ) : (
                  filteredFaqItems.map((item, index) => {
                    const originalIndex = item.originalIndex
                    const isOpen = openItems.has(originalIndex)
                    const isLast = index === filteredFaqItems.length - 1
                    
                    return (
                      <div 
                        key={originalIndex} 
                        className={`${
                          style.showDividers !== false && !isLast 
                            ? 'border-b border-gray-200 dark:border-gray-700' 
                            : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(originalIndex)}
                          className={`w-full py-6 px-0 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
                            isOpen ? 'pb-4' : ''
                          }`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${originalIndex}`}
                        >
                          <span className={`text-lg ${getQuestionStyleClass()} pr-4 text-left`}>
                            {item.question}
                          </span>
                          <span className="flex-shrink-0 ml-4">
                            <svg
                              className={`w-5 h-5 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </button>
                        
                        <div
                          id={`faq-answer-${originalIndex}`}
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
                          }`}
                          style={{
                            maxHeight: isOpen ? '1000px' : '0px',
                          }}
                        >
                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            <RichText data={item.answer} enableGutter={false} enableProse={false} />
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Regular layout - background contained within container  
        <div className="container">
          <div className={`py-12 lg:py-16 ${getBackgroundClass()}`}>
            <div className="container">
              <div className={`mx-auto ${getWidthClass()}`}>
                {title && (
                  <h2 className="text-3xl font-bold tracking-tight lg:text-4xl text-center mb-4">
                    {title}
                  </h2>
                )}
                
                {description && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
                    {description}
                  </p>
                )}

                {/* Search Bar */}
                {showSearch && (
                  <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-0">
                  {filteredFaqItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        No questions found matching your search.
                      </p>
                    </div>
                  ) : (
                    filteredFaqItems.map((item, index) => {
                      const originalIndex = item.originalIndex
                      const isOpen = openItems.has(originalIndex)
                      const isLast = index === filteredFaqItems.length - 1
                      
                      return (
                        <div 
                          key={originalIndex} 
                          className={`${
                            style.showDividers !== false && !isLast 
                              ? 'border-b border-gray-200 dark:border-gray-700' 
                              : ''
                          }`}
                        >
                          <button
                            onClick={() => toggleItem(originalIndex)}
                            className={`w-full py-6 px-0 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
                              isOpen ? 'pb-4' : ''
                            }`}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${originalIndex}`}
                          >
                            <span className={`text-lg ${getQuestionStyleClass()} pr-4 text-left`}>
                              {item.question}
                            </span>
                            <span className="flex-shrink-0 ml-4">
                              <svg
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </span>
                          </button>
                          
                          <div
                            id={`faq-answer-${originalIndex}`}
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
                            }`}
                            style={{
                              maxHeight: isOpen ? '1000px' : '0px',
                            }}
                          >
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                              <RichText data={item.answer} enableGutter={false} enableProse={false} />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
