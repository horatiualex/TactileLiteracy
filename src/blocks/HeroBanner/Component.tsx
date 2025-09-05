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
    backgroundColor?: 'primary' | 'secondary' | 'dark' | 'light' | 'none' | 'custom'
    customBackgroundColor?: string
    textColor?: 'white' | 'dark' | 'custom'
    customTextColor?: string
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

export const HeroBannerBlockComponent: React.FC<Props> = ({
  className,
  icon,
  iconText,
  title,
  description,
  style = {},
  link,
}) => {
  const getBackgroundClass = () => {
    switch (style.backgroundColor) {
      case 'primary':
        return 'bg-primary'
      case 'secondary':
        return 'bg-secondary'
      case 'dark':
        return 'bg-gray-800'
      case 'light':
        return 'bg-gray-50'
      case 'none':
        return 'bg-transparent'
      case 'custom':
        return ''
      default:
        return 'bg-primary'
    }
  }

  const getCustomBackgroundStyle = () => {
    if (style.backgroundColor === 'custom' && style.customBackgroundColor) {
      return { backgroundColor: style.customBackgroundColor }
    }
    return {}
  }

  const getTextColorClass = () => {
    switch (style.textColor) {
      case 'white':
        return 'text-white dark:text-gray-100'
      case 'dark':
        return 'text-gray-900 dark:text-white'
      case 'custom':
        return ''
      default:
        return 'text-white dark:text-gray-100'
    }
  }

  const getCustomTextStyle = () => {
    if (style.textColor === 'custom' && style.customTextColor) {
      return { color: style.customTextColor }
    }
    return {}
  }

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
          className={`${getSizeClass()} ${getBackgroundClass()} ${getTextColorClass()} rounded-2xl`}
          style={{
            ...getCustomBackgroundStyle(),
            ...getCustomTextStyle(),
          }}
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
                        <div className="text-4xl lg:text-5xl">
                          {iconText}
                        </div>
                      ) : icon && typeof icon === 'object' ? (
                        <div className="w-12 h-12 lg:w-16 lg:h-16">
                          <Media
                            resource={icon}
                            className="w-full h-full object-contain filter brightness-0 invert"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
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
                      className="prose prose-lg prose-invert max-w-none"
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
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        link.style === 'solid'
                          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          : 'border-2 border-white dark:border-gray-300 text-white dark:text-gray-100 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`}
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
