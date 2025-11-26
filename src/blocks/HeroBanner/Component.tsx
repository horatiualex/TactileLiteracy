'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { HeroBannerBlock } from '@/payload-types'

export const HeroBanner: React.FC<HeroBannerBlock> = ({
  title,
  description,
  layout,
  background,
  image,
  button,
}) => {
  // Get background styles based on configuration
  const getBackgroundStyles = (): { className: string; style: React.CSSProperties } => {
    const result = { className: '', style: {} as React.CSSProperties }

    switch (background?.type) {
      case 'themeAware':
        result.className = 'bg-gray-100 dark:bg-gray-900'
        break
      case 'customColor':
        if (background.customColor) {
          result.style.backgroundColor = background.customColor
        }
        break
      case 'gradient':
        if (background.gradientFrom && background.gradientTo) {
          result.style.background = `linear-gradient(135deg, ${background.gradientFrom}, ${background.gradientTo})`
        }
        break
      case 'image':
        if (background.image && typeof background.image === 'object') {
          result.style.backgroundImage = `url(${background.image.url})`
          result.style.backgroundSize = 'cover'
          result.style.backgroundPosition = 'center'
        }
        break
    }

    return result
  }

  // Determine text color
  const getTextColor = () => {
    if (background?.textColor === 'white') return 'text-white'
    if (background?.textColor === 'dark') return 'text-gray-900'
    
    // Auto mode
    if (background?.type === 'gradient' || background?.type === 'customColor' || background?.type === 'image') {
      return 'text-white'
    }
    return 'text-gray-900 dark:text-white'
  }

  // Get size classes
  const getSizeClass = () => {
    switch (layout?.size) {
      case 'small':
        return 'py-8 md:py-12'
      case 'medium':
        return 'py-16 md:py-20'
      case 'large':
        return 'py-24 md:py-32'
      case 'fullHeight':
        return 'min-h-screen py-20'
      default:
        return 'py-16 md:py-20'
    }
  }

  // Get button styles
  const getButtonClass = () => {
    const baseClass = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const isDarkBg = background?.type === 'gradient' || background?.type === 'customColor' || background?.type === 'image' || background?.textColor === 'white'
    
    switch (button?.style) {
      case 'outline':
        return `${baseClass} ${isDarkBg ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900' : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900'}`
      case 'ghost':
        return `${baseClass} ${isDarkBg ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-900/10 dark:text-white dark:hover:bg-white/10'}`
      case 'solid':
      default:
        return `${baseClass} ${isDarkBg ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'}`
    }
  }

  const bgStyles = getBackgroundStyles()
  const textColor = getTextColor()
  const sizeClass = getSizeClass()

  // Split Screen Layout (like the example image)
  if (layout?.type === 'split') {
    const imageOnRight = !image?.position || image?.position === 'right'
    
    return (
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className={`${bgStyles.className} rounded-3xl shadow-2xl overflow-hidden relative`} style={bgStyles.style}>
            {/* Overlay for background images */}
            {background?.type === 'image' && (
              <div 
                className="absolute inset-0 bg-black z-0"
                style={{ opacity: background.overlayOpacity ?? 0.5 }}
              />
            )}

            <div className={`grid lg:grid-cols-2 ${!imageOnRight ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content Side */}
              <div className={`${sizeClass} px-8 md:px-12 lg:px-16 flex flex-col justify-center space-y-6 ${layout?.contentAlignment === 'center' ? 'text-center items-center' : ''} ${!imageOnRight ? 'lg:col-start-2' : ''} relative z-10`}>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}>
                  {title}
                </h1>
                
                {description && (
                  <div className={`text-lg md:text-xl leading-relaxed opacity-90 ${textColor}`}>
                    <RichText 
                      data={description} 
                      enableGutter={false} 
                      enableProse={false}
                      className="prose prose-lg max-w-none"
                    />
                  </div>
                )}
                
                {button?.enabled && button?.label && button?.url && (
                  <div className={`pt-4 ${layout?.contentAlignment === 'center' ? 'flex justify-center' : ''}`}>
                    <a
                      href={button.url}
                      target={button.newTab ? '_blank' : undefined}
                      rel={button.newTab ? 'noopener noreferrer' : undefined}
                      className={getButtonClass()}
                    >
                      {button.label}
                      <svg
                        className="w-5 h-5"
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

              {/* Image Side - Fills completely with no padding */}
              {image?.enabled && image?.media && typeof image.media === 'object' && (
                <div className={`relative ${!imageOnRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="absolute inset-0">
                    <Media
                      resource={image.media}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Centered Layout
  if (layout?.type === 'centered') {
    return (
      <section className="relative overflow-hidden">
        <div className={`${bgStyles.className} ${sizeClass}`} style={bgStyles.style}>
          {/* Overlay for background images */}
          {background?.type === 'image' && (
            <div 
              className="absolute inset-0 bg-black z-0"
              style={{ opacity: background.overlayOpacity ?? 0.5 }}
            />
          )}

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}>
                {title}
              </h1>
              
              {description && (
                <div className={`text-lg md:text-xl leading-relaxed opacity-90 ${textColor}`}>
                  <RichText 
                    data={description} 
                    enableGutter={false} 
                    enableProse={false}
                    className="prose prose-lg max-w-none"
                  />
                </div>
              )}
              
              {button?.enabled && button?.label && button?.url && (
                <div className="pt-4 flex justify-center">
                  <a
                    href={button.url}
                    target={button.newTab ? '_blank' : undefined}
                    rel={button.newTab ? 'noopener noreferrer' : undefined}
                    className={getButtonClass()}
                  >
                    {button.label}
                    <svg
                      className="w-5 h-5"
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
      </section>
    )
  }

  // Full Width Layout (text over background image)
  return (
    <section className="relative overflow-hidden">
      <div className={`${bgStyles.className} ${sizeClass}`} style={bgStyles.style}>
        {/* Overlay for background images */}
        {background?.type === 'image' && (
          <div 
            className="absolute inset-0 bg-black z-0"
            style={{ opacity: background.overlayOpacity ?? 0.5 }}
          />
        )}

        <div className="container relative z-10">
          <div className={`max-w-3xl space-y-6 ${layout?.contentAlignment === 'center' ? 'mx-auto text-center' : ''}`}>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}>
              {title}
            </h1>
            
            {description && (
              <div className={`text-lg md:text-xl leading-relaxed opacity-90 ${textColor}`}>
                <RichText 
                  data={description} 
                  enableGutter={false} 
                  enableProse={false}
                  className="prose prose-lg max-w-none"
                />
              </div>
            )}
            
            {button?.enabled && button?.label && button?.url && (
              <div className={`pt-4 ${layout?.contentAlignment === 'center' ? 'flex justify-center' : ''}`}>
                <a
                  href={button.url}
                  target={button.newTab ? '_blank' : undefined}
                  rel={button.newTab ? 'noopener noreferrer' : undefined}
                  className={getButtonClass()}
                >
                  {button.label}
                  <svg
                    className="w-5 h-5"
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
    </section>
  )
}
