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
}

export const FAQBlockComponent: React.FC<Props> = ({
  className,
  title,
  description,
  width = 'medium',
  faqItems,
  style = {},
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(
      faqItems
        ?.map((item, index) => (item.defaultOpen ? index : null))
        .filter((index): index is number => index !== null) || []
    )
  )

  if (!faqItems || faqItems.length === 0) {
    return null
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const getBackgroundClass = () => {
    switch (style.backgroundColor) {
      case 'light':
        return 'bg-gray-50 dark:bg-gray-900'
      case 'dark':
        return 'bg-gray-900 dark:bg-gray-800 text-white'
      case 'primary':
        return 'bg-primary text-primary-foreground'
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
    <section className={`py-16 lg:py-24 ${getBackgroundClass()} ${className || ''}`}>
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

          <div className="space-y-0">
            {faqItems.map((item, index) => {
              const isOpen = openItems.has(index)
              const isLast = index === faqItems.length - 1
              
              return (
                <div 
                  key={index} 
                  className={`${
                    style.showDividers !== false && !isLast 
                      ? 'border-b border-gray-200 dark:border-gray-700' 
                      : ''
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className={`w-full py-6 px-0 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      isOpen ? 'pb-4' : ''
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
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
                    id={`faq-answer-${index}`}
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
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
