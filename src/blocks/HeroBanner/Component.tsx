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
  backgroundMedia?: string | MediaType | null
  style?: {
    alignment?: 'left' | 'center'
    size?: 'small' | 'medium' | 'large'
    backgroundTheme?: 'modern' | 'split' | 'card'
    layout?: 'default' | 'split' | 'stacked' | 'card'
    titleSize?: 'normal' | 'large' | 'xl'
  }
  link?: {
    url?: string
    label?: string
    style?: 'solid' | 'outline' | 'ghost' | 'modern'
    newTab?: boolean
  }
}

export const HeroBanner: React.FC<Props> = ({ 
  className,
  icon,
  iconText,
  title,
  description,
  backgroundMedia,
  style = {},
  link,
}) => {
  const getBackgroundClass = () => {
    switch (style.backgroundTheme) {
      case 'modern':
        return 'bg-gray-50 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50'
      case 'split':
        return 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-900'
      case 'card':
        return 'bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900'
      default:
        return 'bg-gray-50 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50'
    }
  }

  const getSizeClass = () => {
    switch (style.size) {
      case 'small':
        return 'py-12 lg:py-16'
      case 'medium':
        return 'py-16 lg:py-24'
      case 'large':
        return 'py-24 lg:py-32'
      default:
        return 'py-16 lg:py-24'
    }
  }

  const getTitleSizeClass = () => {
    switch (style.titleSize) {
      case 'large':
        return 'text-4xl lg:text-5xl xl:text-6xl'
      case 'xl':
        return 'text-5xl lg:text-6xl xl:text-7xl'
      case 'normal':
      default:
        return 'text-3xl lg:text-4xl xl:text-5xl'
    }
  }

  const getButtonClass = () => {
    const baseClass = "inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
    
    // Theme-aware button styles
    if (style.backgroundTheme === 'split' || style.backgroundTheme === 'card') {
      // White buttons for colored backgrounds
      switch (link?.style) {
        case 'outline':
          return `${baseClass} border-2 border-white text-white hover:bg-white hover:text-blue-600 focus:ring-white/50`
        case 'ghost':
          return `${baseClass} text-white/90 hover:bg-white/10 focus:ring-white/50 backdrop-blur-sm`
        case 'modern':
        case 'solid':
        default:
          return `${baseClass} bg-white text-blue-600 hover:bg-gray-100 focus:ring-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-bold`
      }
    } else {
      // Colored buttons for light backgrounds
      switch (link?.style) {
        case 'solid':
          return `${baseClass} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:bg-blue-500 dark:hover:bg-blue-600`
        case 'outline':
          return `${baseClass} border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900`
        case 'ghost':
          return `${baseClass} text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20`
        case 'modern':
          return `${baseClass} bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
        default:
          return `${baseClass} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 dark:bg-blue-500 dark:hover:bg-blue-600`
      }
    }
  }

  // Split layout with content on left, visual on right
  if (style.layout === 'split' || style.backgroundTheme === 'split') {
    return (
      <section className={`relative overflow-hidden ${className || ''}`}>
        <div className={`${getSizeClass()} ${getBackgroundClass()} relative`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-white/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-white/10 to-transparent"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                {/* Fixed icon alignment */}
                {(icon || iconText) && (
                  <div className="flex items-center gap-4 mb-6">
                    {iconText ? (
                      <div className="text-5xl lg:text-6xl text-white drop-shadow-lg flex-shrink-0">
                        {iconText}
                      </div>
                    ) : icon && typeof icon === 'object' ? (
                      <div className="w-12 h-12 lg:w-16 lg:h-16 p-2 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                        <Media
                          resource={icon}
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                    ) : null}
                  </div>
                )}
                
                <h1 className={`${getTitleSizeClass()} font-bold text-white leading-tight tracking-tight`}>
                  {title}
                </h1>
                
                {description && (
                  <div className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                    <RichText 
                      data={description} 
                      enableGutter={false} 
                      enableProse={false}
                      className="prose prose-xl prose-white max-w-none"
                    />
                  </div>
                )}
                
                {link?.url && link?.label && (
                  <div className="pt-4">
                    <a
                      href={link.url}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className={getButtonClass()}
                      aria-label={`${link.label}${link.newTab ? ' (opens in new tab)' : ''}`}
                    >
                      {link.label}
                      <svg
                        className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
              
              {/* Visual element with image support */}
              <div className="relative">
                {backgroundMedia && typeof backgroundMedia === 'object' ? (
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                    <Media
                      resource={backgroundMedia}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center">
                    <div className="text-white/60 text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                      <p className="text-lg font-medium">Add Background Image</p>
                      <p className="text-sm opacity-75 mt-1">Upload an image in the admin panel</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Card layout
  if (style.layout === 'card' || style.backgroundTheme === 'card') {
    return (
      <section className={`py-8 lg:py-12 ${className || ''}`}>
        <div className="container">
          <div className={`${getSizeClass()} ${getBackgroundClass()} rounded-3xl shadow-xl relative overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/50 rounded-full translate-y-24 -translate-x-24"></div>
            </div>
            
            <div className="container relative z-10">
              <div className={`max-w-4xl ${style.alignment === 'center' ? 'mx-auto text-center' : ''}`}>
                {/* Fixed icon alignment for card layout */}
                {(icon || iconText) && (
                  <div className={`mb-8 ${style.alignment === 'center' ? 'flex justify-center' : 'flex justify-start'}`}>
                    {iconText ? (
                      <div className="text-5xl lg:text-6xl text-white drop-shadow-lg">
                        {iconText}
                      </div>
                    ) : icon && typeof icon === 'object' ? (
                      <div className="w-16 h-16 lg:w-20 lg:h-20 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <Media
                          resource={icon}
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                    ) : null}
                  </div>
                )}
                
                <h1 className={`${getTitleSizeClass()} font-bold text-white leading-tight tracking-tight mb-8`}>
                  {title}
                </h1>
                
                {description && (
                  <div className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-10 max-w-3xl">
                    <RichText 
                      data={description} 
                      enableGutter={false} 
                      enableProse={false}
                      className="prose prose-xl prose-white max-w-none"
                    />
                  </div>
                )}
                
                {link?.url && link?.label && (
                  <div className={`${style.alignment === 'center' ? 'flex justify-center' : ''}`}>
                    <a
                      href={link.url}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className={getButtonClass()}
                      aria-label={`${link.label}${link.newTab ? ' (opens in new tab)' : ''}`}
                    >
                      {link.label}
                      <svg
                        className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
      </section>
    )
  }

  // Default and modern layouts with improved alignment
  return (
    <section className={`py-8 lg:py-12 ${className || ''}`}>
      <div className="container">
        <div className={`${getSizeClass()} ${getBackgroundClass()} rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden`}>
          {/* Subtle background patterns */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-current rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-current rounded-full translate-y-24 -translate-x-24"></div>
          </div>
          
          <div className="container relative z-10">
            {/* Full width layout that properly uses space */}
            <div className={`${style.alignment === 'center' ? 'max-w-4xl mx-auto text-center' : 'max-w-7xl'}`}>
              <div className={`grid ${style.alignment === 'left' ? 'lg:grid-cols-3' : ''} gap-8 items-start`}>
                {/* Content area - takes 2/3 on left alignment */}
                <div className={`${style.alignment === 'left' ? 'lg:col-span-2' : ''} space-y-8`}>
                  {/* Fixed Icon and Title Layout */}
                  {style.layout === 'stacked' ? (
                    // Stacked layout: icon above title
                    <div className={`space-y-6 ${style.alignment === 'center' ? 'flex flex-col items-center' : ''}`}>
                      {(icon || iconText) && (
                        <div className="flex-shrink-0">
                          {iconText ? (
                            <div className="text-5xl lg:text-6xl text-gray-900 dark:text-white drop-shadow-sm">
                              {iconText}
                            </div>
                          ) : icon && typeof icon === 'object' ? (
                            <div className="w-16 h-16 lg:w-20 lg:h-20 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                              <Media
                                resource={icon}
                                className="w-full h-full object-contain filter brightness-0 dark:invert transition-all duration-200"
                              />
                            </div>
                          ) : null}
                        </div>
                      )}
                      <h1 className={`${getTitleSizeClass()} font-bold leading-tight text-gray-900 dark:text-white tracking-tight`}>
                        {title}
                      </h1>
                    </div>
                  ) : (
                    // Default inline layout: icon next to title (FIXED ALIGNMENT)
                    <div className={`flex items-center gap-4 ${style.alignment === 'center' ? 'justify-center' : ''}`}>
                      {(icon || iconText) && (
                        <div className="flex-shrink-0">
                          {iconText ? (
                            <div className="text-4xl lg:text-5xl text-gray-900 dark:text-white drop-shadow-sm">
                              {iconText}
                            </div>
                          ) : icon && typeof icon === 'object' ? (
                            <div className="w-12 h-12 lg:w-16 lg:h-16 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                              <Media
                                resource={icon}
                                className="w-full h-full object-contain filter brightness-0 dark:invert transition-all duration-200"
                              />
                            </div>
                          ) : null}
                        </div>
                      )}
                      {/* Title properly aligned with icon */}
                      <h1 className={`${getTitleSizeClass()} font-bold leading-tight text-gray-900 dark:text-white tracking-tight flex-1 min-w-0`}>
                        {title}
                      </h1>
                    </div>
                  )}

                  {/* Enhanced Description */}
                  {description && (
                    <div className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                      <RichText 
                        data={description} 
                        enableGutter={false} 
                        enableProse={false}
                        className="prose prose-lg prose-gray dark:prose-invert max-w-none"
                      />
                    </div>
                  )}

                  {/* Enhanced Call-to-Action Button */}
                  {link?.url && link?.label && (
                    <div className={`pt-4 ${style.alignment === 'center' ? 'flex justify-center' : ''}`}>
                      <a
                        href={link.url}
                        target={link.newTab ? '_blank' : undefined}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        className={getButtonClass()}
                        aria-label={`${link.label}${link.newTab ? ' (opens in new tab)' : ''}`}
                      >
                        {link.label}
                        <svg
                          className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
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
                
                {/* Right side visual area - only on left alignment */}
                {style.alignment === 'left' && (
                  <div className="lg:col-span-1 flex items-center justify-center">
                    {backgroundMedia && typeof backgroundMedia === 'object' ? (
                      <div className="aspect-square w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
                        <Media
                          resource={backgroundMedia}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square w-full max-w-sm bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl shadow-lg flex items-center justify-center">
                        <div className="text-gray-400 dark:text-gray-500 text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                          </div>
                          <p className="text-sm font-medium">Add Image</p>
                        </div>
                      </div>
                    )}
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