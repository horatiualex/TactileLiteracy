'use client'

import React from 'react'
import RichText from '@/components/RichText'
import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type TimelineEvent = {
  year: string
  title: string
  description?: DefaultTypedEditorState
  id?: string | null
}

const TimelineEventComponent: React.FC<{
  event: any // Using any for now to handle the complex generated type
  index: number
  isLast: boolean
  isHorizontal: boolean
  backgroundType?: string | null
}> = ({ event, index, isLast, isHorizontal, backgroundType }) => {
  const getTextColorClass = () => {
    return backgroundType === 'image' ? 'text-white' : 'text-gray-900 dark:text-white'
  }

  if (isHorizontal) {
    return (
      <div className="flex flex-col items-center relative">
        {/* Year Circle */}
        <div className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full border-4 border-white shadow-lg ${
          backgroundType === 'image' 
            ? 'bg-white/20 backdrop-blur-sm text-white border-white/30' 
            : 'bg-primary text-primary-foreground border-background'
        }`}>
          <span className="text-sm font-bold text-center leading-tight">
            {event.year}
          </span>
        </div>
        
        {/* Connecting Line */}
        {!isLast && (
          <div className={`hidden lg:block absolute top-10 left-10 w-full h-0.5 z-0 ${
            backgroundType === 'image' 
              ? 'bg-gradient-to-r from-white/50 to-white/20' 
              : 'bg-gradient-to-r from-primary to-primary/30'
          }`} 
               style={{ width: 'calc(100% + 2rem)' }} />
        )}
        
        {/* Content */}
        <div className="mt-6 text-center max-w-xs">
          <h3 className={`text-lg font-semibold mb-2 ${getTextColorClass()}`}>
            {event.title}
          </h3>
          {event.description && (
            <div className={`text-sm opacity-90 ${getTextColorClass()}`}>
              <RichText 
                data={event.description} 
                enableGutter={false} 
                enableProse={false}
                className="prose prose-sm max-w-none"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Vertical layout
  return (
    <div className="flex items-start space-x-6 relative">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 shadow-md ${
          backgroundType === 'image' 
            ? 'bg-white/20 backdrop-blur-sm text-white border-white/30' 
            : 'bg-primary text-primary-foreground border-background'
        }`}>
          <span className="text-xs font-bold">
            {event.year}
          </span>
        </div>
        {!isLast && (
          <div className={`w-0.5 h-16 mt-2 ${
            backgroundType === 'image' ? 'bg-white/30' : 'bg-primary/30'
          }`} />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className={`text-xl font-semibold mb-3 ${getTextColorClass()}`}>
          {event.title}
        </h3>
        {event.description && (
          <div className={`text-base opacity-90 ${getTextColorClass()}`}>
            <RichText 
              data={event.description} 
              enableGutter={false} 
              enableProse={false}
              className="prose max-w-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export const TimelineBlockComponent: React.FC<
  TimelineBlockProps & { className?: string }
> = ({
  title,
  subtitle,
  events,
  layout = {},
  background = {},
  className,
}) => {
  if (!events || events.length === 0) {
    return null
  }

  // Smart layout decision based on number of events and screen size
  const shouldUseHorizontal = events.length <= 4 && layout?.style !== 'vertical'
  
  const getBackgroundClass = () => {
    if (background?.type === 'image') return ''
    
    // Default theme-aware background like Statistics section
    return 'bg-gray-100 dark:bg-gray-800'
  }

  const getCustomBackgroundStyle = () => {
    const style: React.CSSProperties = {}
    
    if (background?.type === 'image' && background.image && typeof background.image === 'object') {
      style.backgroundImage = `url(${background.image.url})`
      style.backgroundSize = 'cover'
      style.backgroundPosition = 'center'
      style.backgroundRepeat = 'no-repeat'
    }
    
    return style
  }

  const getOverlayClass = () => {
    if (background?.type !== 'image') return ''
    
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
    return background?.type === 'image' ? 'text-white' : 'text-gray-900 dark:text-white'
  }

  return (
    <section 
      className={`py-16 lg:py-24 ${getBackgroundClass()} ${getOverlayClass()} ${className || ''}`}
      style={getCustomBackgroundStyle()}
    >
      <div className="container relative z-10">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 lg:mb-16">
            {title && (
              <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight ${getTextColorClass()}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <div className={`text-lg lg:text-xl opacity-90 max-w-3xl mx-auto ${getTextColorClass()}`}>
                <RichText 
                  data={subtitle} 
                  enableGutter={false} 
                  enableProse={false}
                  className="prose prose-lg max-w-none"
                />
              </div>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="relative">
          {shouldUseHorizontal ? (
            /* Horizontal Timeline for Desktop with few events */
            <div className="hidden lg:block">
              <div className="grid gap-8 relative" 
                   style={{ gridTemplateColumns: `repeat(${events.length}, 1fr)` }}>
                
                {/* Horizontal Line */}
                <div className={`absolute top-10 left-10 right-10 h-0.5 z-0 ${
                  background?.type === 'image' 
                    ? 'bg-gradient-to-r from-white/50 via-white/50 to-white/20' 
                    : 'bg-gradient-to-r from-primary via-primary to-primary/30'
                }`} />
                
                {/* Timeline Events */}
                {events.map((event, index) => (
                  <TimelineEventComponent
                    key={index}
                    event={event}
                    index={index}
                    isLast={index === events.length - 1}
                    isHorizontal={true}
                    backgroundType={background?.type || undefined}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Vertical Timeline (always shown on mobile, or when many events) */}
          <div className={shouldUseHorizontal ? 'lg:hidden' : 'block'}>
            <div className="space-y-0">
              {events.map((event, index) => (
                <TimelineEventComponent
                  key={index}
                  event={event}
                  index={index}
                  isLast={index === events.length - 1}
                  isHorizontal={false}
                  backgroundType={background?.type || undefined}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Optional decorative elements */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className={`w-8 h-0.5 ${
              background?.type === 'image' ? 'bg-white/30' : 'bg-primary/30'
            }`} />
            <div className={`w-2 h-2 rounded-full ${
              background?.type === 'image' ? 'bg-white/50' : 'bg-primary'
            }`} />
            <div className={`w-8 h-0.5 ${
              background?.type === 'image' ? 'bg-white/30' : 'bg-primary/30'
            }`} />
          </div>
        </div>
      </div>
    </section>
  )
}