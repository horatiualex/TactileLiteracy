'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Card = {
  id?: string | null
  image: string | MediaType
  icon?: string | MediaType | null
  iconText?: string
  title: string
  description: any
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
    columns?: '2' | '3' | '4'
    cornerRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  }
}

export const ImageCardGridBlockComponent: React.FC<Props> = ({
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

  const getGridClass = () => {
    switch (style.columns) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case '4':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  const getCardStyleClass = () => {
    switch (style.cardStyle) {
      case 'shadow':
        return 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
      case 'border':
        return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300'
      case 'minimal':
        return 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300'
      default:
        return 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
    }
  }

  const getCornerRadiusClass = () => {
    switch (style.cornerRadius) {
      case 'none':
        return 'rounded-none'
      case 'sm':
        return 'rounded-sm'
      case 'md':
        return 'rounded-lg'
      case 'lg':
        return 'rounded-xl'
      case 'xl':
        return 'rounded-2xl'
      case '2xl':
        return 'rounded-3xl'
      default:
        return 'rounded-lg'
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
          <div className={`grid ${getGridClass()} gap-8`}>
            {cards.map((card, index) => (
              <div key={card.id || `card-${index}`} className={`${getCornerRadiusClass()} overflow-hidden ${getCardStyleClass()}`}>
                {/* Card Image */}
                <div className="aspect-[16/9] overflow-hidden">
                  <Media
                    resource={card.image}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* Icon */}
                    {(card.icon || card.iconText) && (
                      <div className="flex-shrink-0">
                        {card.iconText ? (
                          <div className="text-2xl">
                            {card.iconText}
                          </div>
                        ) : card.icon && typeof card.icon === 'object' ? (
                          <div className="w-6 h-6">
                            <Media
                              resource={card.icon}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="prose prose-gray dark:prose-invert prose-sm max-w-none mb-6">
                    <RichText data={card.description} enableGutter={false} enableProse={false} />
                  </div>

                  {/* Learn More Button */}
                  {card.link?.url && card.link?.label && (
                    <div>
                      <a
                        href={card.link.url}
                        target={card.link.newTab ? '_blank' : undefined}
                        rel={card.link.newTab ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
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
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
