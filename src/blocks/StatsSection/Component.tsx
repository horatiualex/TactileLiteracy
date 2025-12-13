'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Stat = {
  id?: string | null
  number: string
  label: string
  icon?: string | MediaType | null
  iconText?: string | null
}

type Props = {
  className?: string
  layout?: {
    textPosition?: 'left' | 'right' | 'center'
    statsCount?: '2' | '4' | '6'
  }
  background?: {
    type?: 'color' | 'image' | 'none'
    color?: 'primary' | 'secondary' | 'dark' | 'light' | 'custom'
    customColor?: string
    image?: string | MediaType | null
    overlay?: 'dark' | 'light' | 'none'
  }
  content?: {
    title?: string
    description?: any
    textColor?: 'white' | 'dark' | 'custom'
    customTextColor?: string
  }
  stats?: Stat[]
}

export const StatsSectionBlockComponent: React.FC<Props> = ({
  className,
  layout = {},
  background = {},
  content = {},
  stats,
}) => {
  if (!stats || stats.length === 0) {
    return null
  }

  const getBackgroundClass = () => {
    if (background.type === 'image') return ''
    
    // Default solid background that adapts to theme
    return 'bg-gray-100 dark:bg-gray-800'
  }

  const getCustomBackgroundStyle = () => {
    const style: React.CSSProperties = {}
    
    if (background.type === 'image' && background.image && typeof background.image === 'object') {
      style.backgroundImage = `url(${background.image.url})`
      style.backgroundSize = 'cover'
      style.backgroundPosition = 'center'
      style.backgroundRepeat = 'no-repeat'
    }
    
    return style
  }

  const getOverlayClass = () => {
    if (background.type !== 'image') return ''
    
    switch (background.overlay) {
      case 'dark':
        return 'relative before:absolute before:inset-0 before:bg-black before:bg-opacity-50 before:z-0'
      case 'light':
        return 'relative before:absolute before:inset-0 before:bg-white before:bg-opacity-30 before:z-0'
      default:
        return ''
    }
  }

  const getTextColorClass = () => {
    // For image backgrounds, use white text for better contrast
    if (background.type === 'image') {
      return 'text-white'
    }
    
    // For solid backgrounds, use theme-aware colors
    return 'text-gray-900 dark:text-white'
  }

  const getLayoutClass = () => {
    switch (layout.textPosition) {
      case 'right':
        return 'lg:flex-row-reverse'
      case 'center':
        return 'flex-col'
      case 'left':
      default:
        return 'lg:flex-row'
    }
  }

  const getContentWidthClass = () => {
    return layout.textPosition === 'center' ? 'w-full text-center' : 'w-full lg:w-1/2'
  }

  const getStatsWidthClass = () => {
    return layout.textPosition === 'center' ? 'w-full' : 'w-full lg:w-1/2'
  }

  return (
    <section 
      className={`py-16 lg:py-24 ${getBackgroundClass()} ${getOverlayClass()} ${className || ''}`}
      style={getCustomBackgroundStyle()}
    >
      <div className="container relative z-10">
        <div className={`flex flex-col lg:gap-16 gap-12 items-center ${getLayoutClass()}`}>
          {/* Content Section */}
          {(content.title || content.description) && (
            <div className={`${getContentWidthClass()}`}>
              <div 
                className={`${getTextColorClass()}`}
              >
                {content.title && (
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                    {content.title}
                  </h2>
                )}
                
                {content.description && (
                  <div className="text-lg lg:text-xl opacity-90 max-w-2xl">
                    <RichText 
                      data={content.description} 
                      enableGutter={false} 
                      enableProse={false}
                      className="prose prose-lg max-w-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className={`${getStatsWidthClass()}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={stat.id || `stat-${index}`} 
                  className={`backdrop-blur-sm rounded-lg p-8 text-center border transition-all duration-300 ${
                    background.type === 'image' 
                      ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Optional Icon */}
                  {(stat.icon || stat.iconText) && (
                    <div className="mb-3 flex justify-center">
                      {stat.iconText ? (
                        <div className={`text-2xl ${
                          background.type === 'image' 
                            ? 'text-white' 
                            : 'text-gray-700 dark:text-gray-200'
                        }`}>
                          {stat.iconText}
                        </div>
                      ) : stat.icon && typeof stat.icon === 'object' ? (
                        <div className="w-8 h-8">
                          <Media
                            resource={stat.icon}
                            className={`w-full h-full object-contain ${
                              background.type === 'image' 
                                ? 'filter brightness-0 invert' 
                                : ''
                            }`}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                  
                  {/* Number */}
                  <div className={`text-4xl lg:text-5xl font-bold mb-3 ${
                    background.type === 'image' 
                      ? 'text-white' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className={`text-lg font-medium ${
                    background.type === 'image' 
                      ? 'text-white/90' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
