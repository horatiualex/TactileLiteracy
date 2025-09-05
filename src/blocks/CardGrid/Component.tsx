'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media as MediaType } from '@/payload-types'

type Card = {
  icon?: string | MediaType | null
  iconText?: string
  title: string
  description: DefaultTypedEditorState
  link?: {
    url?: string
    label?: string
    newTab?: boolean
  }
}

type Props = {
  className?: string
  title?: string
  description?: string
  width?: 'medium' | 'large' | 'xlarge' | 'full'
  cards?: Card[]
  style?: {
    backgroundColor?: 'none' | 'light' | 'dark' | 'primary'
    cardStyle?: 'shadow' | 'border' | 'minimal'
    textAlignment?: 'left' | 'center'
  }
}

export const CardGridBlockComponent: React.FC<Props> = ({
  className,
  title,
  description,
  width = 'large',
  cards,
  style = {},
}) => {
  if (!cards || cards.length === 0) {
    return null
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
      case 'medium':
        return 'max-w-4xl'
      case 'large':
        return 'max-w-6xl'
      case 'xlarge':
        return 'max-w-7xl'
      case 'full':
        return 'max-w-none'
      default:
        return 'max-w-6xl'
    }
  }

  const getCardStyleClass = () => {
    switch (style.cardStyle) {
      case 'shadow':
        return 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300'
      case 'border':
        return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300'
      case 'minimal':
        return 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300'
      default:
        return 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300'
    }
  }

  const getTextAlignmentClass = () => {
    switch (style.textAlignment) {
      case 'left':
        return 'text-left'
      case 'center':
        return 'text-center'
      default:
        return 'text-center'
    }
  }

  return (
    <section className={`py-16 lg:py-24 ${getBackgroundClass()} ${className || ''}`}>
      <div className="container">
        <div className={`mx-auto ${getWidthClass()}`}>
          {/* Section Header */}
          {(title || description) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
                  {title}
                </h2>
              )}
              
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => {
              const CardWrapper = card.link?.url ? 'a' : 'div'
              const linkProps = card.link?.url
                ? {
                    href: card.link.url,
                    target: card.link.newTab ? '_blank' : undefined,
                    rel: card.link.newTab ? 'noopener noreferrer' : undefined,
                    className: 'block h-full',
                  }
                : { className: 'block h-full' }

              return (
                <CardWrapper key={index} {...linkProps}>
                  <div className={`rounded-lg p-6 h-full flex flex-col ${getCardStyleClass()} ${getTextAlignmentClass()}`}>
                    {/* Icon */}
                    {(card.icon || card.iconText) && (
                      <div className={`mb-4 ${style.textAlignment === 'center' ? 'flex justify-center' : ''}`}>
                        {card.iconText ? (
                          <div className="text-4xl mb-2">
                            {card.iconText}
                          </div>
                        ) : card.icon && typeof card.icon === 'object' ? (
                          <div className="w-12 h-12 mb-2">
                            <Media
                              resource={card.icon}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <div className="prose prose-gray dark:prose-invert prose-sm max-w-none flex-grow">
                      <RichText data={card.description} enableGutter={false} enableProse={false} />
                    </div>

                    {/* Link Button */}
                    {card.link?.url && card.link?.label && (
                      <div className={`mt-4 ${style.textAlignment === 'center' ? 'flex justify-center' : ''}`}>
                        <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                          {card.link.label}
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                </CardWrapper>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
