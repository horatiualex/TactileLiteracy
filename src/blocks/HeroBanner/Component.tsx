'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media as MediaType } from '@/payload-types'

type Props = {
  className?: string
  icon?: string | MediaType | null
  iconText?: string
  title: string
  description?: DefaultTypedEditorState
  style?: {
    alignment?: 'left' | 'center'
    size?: 'small' | 'medium' | 'large'
  }
  link?: {
    url?: string
    label?: string
    style?: 'solid' | 'outline'
    newTab?: boolean
  }
}

export const HeroBanner: React.FC<Props> = ({ 
  className,
  icon,
  iconText,
  title,
  description,
  style = {},
  link,
}) => {
  const getAlignmentClass = () => {
    switch (style.alignment) {
      case 'center':
        return 'text-center'
      case 'left':
      default:
        return 'text-left'
    }
  }

  const getSizeClass = () => {
    switch (style.size) {
      case 'small':
        return 'py-6 lg:py-8'
      case 'medium':
        return 'py-8 lg:py-12'
      case 'large':
        return 'py-12 lg:py-16'
      default:
        return 'py-8 lg:py-12'
    }
  }

  return (
    <section className={`py-8 lg:py-12 ${className || ''}`}>
      <div className="container">
        <div 
          className={`${getSizeClass()} bg-gray-50 dark:bg-gray-900 rounded-2xl`}
        >
          <div className="container">
            <div className={`max-w-4xl ${style.alignment === 'center' ? 'mx-auto' : ''}`}>
              <div className={`${getAlignmentClass()}`}>
                {/* Icon and Title - Inline Layout */}
                <div className={`flex items-center gap-4 mb-6 ${style.alignment === 'center' ? 'justify-center' : ''}`}>
                  {/* Icon */}
                  {(icon || iconText) && (
                    <div className="flex-shrink-0">
                      {iconText ? (
                        <div className="text-4xl lg:text-5xl text-gray-900 dark:text-white">
                          {iconText}
                        </div>
                      ) : icon && typeof icon === 'object' ? (
                        <div className="w-12 h-12 lg:w-16 lg:h-16">
                          <Media
                            resource={icon}
                            className="w-full h-full object-contain filter brightness-0 dark:invert transition-all duration-200"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                    {title}
                  </h1>
                </div>

                {/* Description */}
                {description && (
                  <div className="text-lg lg:text-xl opacity-90 mb-8 max-w-3xl">
                    <RichText 
                      data={description} 
                      enableGutter={false} 
                      enableProse={false}
                      className="prose prose-lg prose-gray dark:prose-invert max-w-none"
                    />
                  </div>
                )}

                {/* Call-to-Action Button */}
                {link?.url && link?.label && (
                  <div className={`${style.alignment === 'center' ? 'flex justify-center' : ''}`}>
                    <a
                      href={link.url}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      {link.label}
                      <svg
                        className="ml-2 w-4 h-4"
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
          </div>
        </div>
      </div>
    </section>
  )
}