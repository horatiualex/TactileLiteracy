'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

interface ModularHeroProps {
  richText?: Page['hero']['richText']
  links?: Page['hero']['links']
  media?: Page['hero']['media']
  backgroundImage?: Page['hero']['media']
  secondaryImage?: Page['hero']['media']
  layout?: 'centered' | 'textLeft' | 'textRight' | 'textOnly' | 'splitScreen' | null
  contentAlignment?: 'left' | 'center' | 'right' | null
  backgroundStyle?: 'image' | 'gradient' | 'solid' | 'none' | null
  backgroundColor?: string | null
  gradientColors?: {
    from?: string | null
    to?: string | null
    direction?: string | null
  } | null
  overlay?: {
    enabled?: boolean | null
    color?: string | null
  } | null
}

export const ModularHero: React.FC<ModularHeroProps> = ({
  richText,
  links,
  media,
  backgroundImage,
  secondaryImage,
  layout = 'centered',
  contentAlignment = 'center',
  backgroundStyle = 'image',
  backgroundColor,
  gradientColors,
  overlay,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  // Normalize null values to defaults
  const normalizedLayout = layout || 'centered'
  const normalizedContentAlignment = contentAlignment || 'center'
  const normalizedBackgroundStyle = backgroundStyle || 'image'

  useEffect(() => {
    // Set header theme based on background
    if (normalizedBackgroundStyle === 'image' || (overlay?.enabled && overlay.color?.includes('0,0,0'))) {
      setHeaderTheme('dark')
    } else {
      setHeaderTheme('light')
    }
  }, [normalizedBackgroundStyle, overlay, setHeaderTheme])

  // Generate background styles
  const getBackgroundStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {}

    if (normalizedBackgroundStyle === 'solid' && backgroundColor) {
      style.backgroundColor = backgroundColor
    } else if (normalizedBackgroundStyle === 'gradient' && gradientColors?.from && gradientColors?.to) {
      const direction = gradientColors.direction || 'to-br'
      const gradientMap: Record<string, string> = {
        'to-b': 'to bottom',
        'to-br': 'to bottom right',
        'to-r': 'to right',
        'to-tr': 'to top right',
      }
      style.background = `linear-gradient(${gradientMap[direction] || 'to bottom right'}, ${gradientColors.from}, ${gradientColors.to})`
    } else if (normalizedBackgroundStyle === 'image' && backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage) {
      // Use CSS background-image for perfect coverage
      style.backgroundImage = `url(${backgroundImage.url})`
      style.backgroundSize = 'cover'
      style.backgroundPosition = 'center center'
      style.backgroundRepeat = 'no-repeat'
    }

    return style
  }

  // Generate container classes based on layout
  const getContainerClasses = () => {
    let classes = 'relative -mt-[10.4rem] pt-[10.4rem] min-h-screen flex items-center overflow-hidden'
    
    if (normalizedBackgroundStyle === 'image' && backgroundImage) {
      classes += ' text-white'
    }
    
    if (normalizedLayout === 'splitScreen') {
      classes += ' min-h-screen'
    } else {
      classes += ' py-20 lg:py-28'
    }

    return classes
  }

  // Generate content layout classes
  const getContentClasses = () => {
    let classes = 'container mx-auto px-6 lg:px-8 z-20 relative'
    
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      classes += ' grid lg:grid-cols-2 gap-16 xl:gap-20 items-center'
    } else if (normalizedLayout === 'splitScreen') {
      classes += ' grid lg:grid-cols-2 min-h-screen'
    } else {
      classes += ' max-w-5xl'
      // Only center text if not using image background layouts
      if (normalizedLayout === 'centered' || normalizedLayout === 'textOnly') {
        classes += ' text-center'
      }
      if (normalizedContentAlignment === 'left') classes += ' text-left'
      if (normalizedContentAlignment === 'right') classes += ' text-right'
    }

    return classes
  }

  // Generate text alignment classes
  const getTextClasses = () => {
    let classes = ''
    
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      classes += normalizedContentAlignment === 'center' ? 'text-center' : `text-${normalizedContentAlignment}`
    }
    
    return classes
  }

  const renderContent = () => (
    <div className={`${getTextClasses()} ${normalizedLayout === 'splitScreen' ? 'flex flex-col justify-center p-12' : ''} ${normalizedLayout === 'textLeft' || normalizedLayout === 'textRight' ? 'max-w-2xl' : ''}`}>
      {/* Cool left border accent */}
      <div className="border-l-4 border-white/30 pl-6 mb-10">
        {richText && (
          <RichText 
            className="mb-10 prose prose-lg prose-invert max-w-none [&>h1]:text-4xl [&>h1]:sm:text-5xl [&>h1]:lg:text-6xl [&>h1]:font-bold [&>h1]:leading-tight [&>h1]:mb-6 [&>h1]:text-white [&>p]:text-lg [&>p]:text-white/90 [&>p]:leading-relaxed [&>p]:mb-6" 
            data={richText} 
            enableGutter={false} 
          />
        )}
      </div>
      {Array.isArray(links) && links.length > 0 && (
        <div className={`flex gap-4 ${
          normalizedContentAlignment === 'center' ? 'justify-center' : 
          normalizedContentAlignment === 'right' ? 'justify-end' : 'justify-start'
        } ${normalizedLayout === 'textLeft' || normalizedLayout === 'textRight' ? 'flex-wrap' : ''}`}>
          {links.map(({ link }, i) => (
            <CMSLink
              key={i}
              className={`group relative inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all duration-300 overflow-hidden rounded-full ${
                i === 0 
                  ? 'bg-white text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-white/90 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent' 
                  : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent'
              }`}
              {...link}
            >
              <span className="relative z-10">{link.label}</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={i === 0 ? "M13 7l5 5m0 0l-5 5m5-5H6" : "M9 5l7 7-7 7"} />
              </svg>
            </CMSLink>
          ))}
        </div>
      )}
    </div>
  )

  const renderImage = (image: Page['hero']['media'], className = '') => (
    image && (
      <div className={`relative group ${className}`}>
        <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-4xl transition-all duration-500 ring-1 ring-white/10">
          <Media
            resource={image}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      </div>
    )
  )

  return (
    <div className={getContainerClasses()} style={getBackgroundStyle()}>
      {/* Subtle background effects - no animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      {/* Overlay */}
      {overlay?.enabled && overlay.color && (
        <div
          className="absolute inset-0 z-1"
          style={{ backgroundColor: overlay.color }}
        />
      )}

      {/* Content */}
      <div className={getContentClasses()}>
        {normalizedLayout === 'textLeft' && (
          <>
            <div className="space-y-8">
              {renderContent()}
            </div>
            {renderImage(media || secondaryImage, 'lg:order-2')}
          </>
        )}

        {normalizedLayout === 'textRight' && (
          <>
            {renderImage(media || secondaryImage, 'lg:order-1')}
            <div className="space-y-8">
              {renderContent()}
            </div>
          </>
        )}

        {normalizedLayout === 'splitScreen' && (
          <>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {renderContent()}
            </div>
            {renderImage(media || secondaryImage, 'relative')}
          </>
        )}

        {(normalizedLayout === 'centered' || normalizedLayout === 'textOnly') && (
          <div className="space-y-8">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  )
}
