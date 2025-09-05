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
    let classes = 'relative -mt-[10.4rem] pt-[10.4rem] min-h-screen flex items-center'
    
    if (normalizedBackgroundStyle === 'image' && backgroundImage) {
      classes += ' text-white'
    }
    
    if (normalizedLayout === 'splitScreen') {
      classes += ' min-h-screen'
    } else {
      classes += ' py-20'
    }

    return classes
  }

  // Generate content layout classes
  const getContentClasses = () => {
    let classes = 'container mx-auto px-4 z-20 relative'
    
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      classes += ' grid lg:grid-cols-2 gap-12 items-center'
    } else if (normalizedLayout === 'splitScreen') {
      classes += ' grid lg:grid-cols-2 min-h-screen'
    } else {
      classes += ' max-w-4xl'
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
    <div className={`${getTextClasses()} ${normalizedLayout === 'splitScreen' ? 'flex flex-col justify-center p-12' : ''}`}>
      {richText && (
        <RichText 
          className="mb-8" 
          data={richText} 
          enableGutter={false} 
        />
      )}
      {Array.isArray(links) && links.length > 0 && (
        <div className={`flex gap-4 ${
          normalizedContentAlignment === 'center' ? 'justify-center' : 
          normalizedContentAlignment === 'right' ? 'justify-end' : 'justify-start'
        } ${normalizedLayout === 'textLeft' || normalizedLayout === 'textRight' ? 'flex-wrap' : ''}`}>
          {links.map(({ link }, i) => (
            <CMSLink
              key={i}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              {...link}
            >
              {link.label}
            </CMSLink>
          ))}
        </div>
      )}
    </div>
  )

  const renderImage = (image: Page['hero']['media'], className = '') => (
    image && (
      <div className={`relative ${className}`}>
        <Media
          resource={image}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </div>
    )
  )

  return (
    <div className={getContainerClasses()} style={getBackgroundStyle()}>
      {/* Overlay */}
      {overlay?.enabled && overlay.color && (
        <div
          className="absolute inset-0 z-1"
          style={{ backgroundColor: overlay.color }}
        />
      )}

      {/* Wave decoration for centered layout */}
      {normalizedLayout === 'centered' && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-current text-white dark:text-gray-900"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className={getContentClasses()}>
        {normalizedLayout === 'textLeft' && (
          <>
            {renderContent()}
            {renderImage(media || secondaryImage, 'lg:order-2')}
          </>
        )}

        {normalizedLayout === 'textRight' && (
          <>
            {renderImage(media || secondaryImage, 'lg:order-1')}
            {renderContent()}
          </>
        )}

        {normalizedLayout === 'splitScreen' && (
          <>
            <div className="bg-primary/10 backdrop-blur-sm">
              {renderContent()}
            </div>
            {renderImage(media || secondaryImage, 'relative')}
          </>
        )}

        {(normalizedLayout === 'centered' || normalizedLayout === 'textOnly') && renderContent()}
      </div>
    </div>
  )
}
