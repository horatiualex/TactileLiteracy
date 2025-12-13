'use client'

import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type MediaObject = {
  url?: string
  alt?: string
  width?: number
  height?: number
  filename?: string
  id?: string
  updatedAt?: string
  createdAt?: string
  [key: string]: unknown
}

type ButtonType = {
  label: string
  link: {
    type: 'internal' | 'external'
    reference?: {
      value: string
      relationTo: 'pages' | 'posts'
    }
    url?: string
  }
  style: 'primary' | 'secondary' | 'outline'
}

type Props = {
  className?: string
  layout?: 'textLeft' | 'imageLeft' | 'overlay' | 'contentFocus' | 'imageFocus'
  content?: {
    heading?: string
    headingSize?: 'normal' | 'large' | 'xl' | '2xl'
    subheading?: string
    eyebrow?: string
    text?: any
    buttons?: ButtonType[]
  }
  image?: MediaObject
  imageAspect?: 'auto' | 'square' | 'landscape' | 'wide' | 'portrait'
  verticalAlignment?: 'start' | 'center' | 'end'
  backgroundColor?: 'none' | 'subtle' | 'premium' | 'dark' | 'gradient'
  spacing?: 'compact' | 'standard' | 'large' | 'xl'
  imageStyle?: {
    borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'xl'
    shadow?: 'none' | 'small' | 'medium' | 'large'
    overlay?: boolean
  }
}

export const TextImageBlockComponent: React.FC<Props> = ({
  className,
  layout = 'textLeft',
  content,
  image,
  imageAspect = 'auto',
  verticalAlignment = 'center',
  backgroundColor = 'none',
  spacing = 'large',
  imageStyle = {},
}) => {
  if (!content && !image) {
    return null
  }

  // Background classes based on design style and background type
  const getBackgroundClass = () => {
    const baseClass = 'relative'
    
    switch (backgroundColor) {
      case 'subtle':
        return `${baseClass} bg-gray-50 dark:bg-gray-900`
      case 'premium':
        return `${baseClass} bg-gray-100 dark:bg-gray-800`
      case 'dark':
        return `${baseClass} bg-gray-900 text-white`
      case 'gradient':
        return `${baseClass} bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`
      default:
        return baseClass
    }
  }

  // Spacing classes
  const getSpacingClass = () => {
    switch (spacing) {
      case 'compact':
        return 'py-8 lg:py-12'
      case 'standard':
        return 'py-12 lg:py-16'
      case 'large':
        return 'py-16 lg:py-24'
      case 'xl':
        return 'py-24 lg:py-32'
      default:
        return 'py-16 lg:py-24'
    }
  }

  // Heading size classes
  const getHeadingClass = () => {
    const baseClass = 'font-bold tracking-tight'
    
    switch (content?.headingSize) {
      case 'normal':
        return `${baseClass} text-2xl lg:text-3xl`
      case 'large':
        return `${baseClass} text-3xl lg:text-4xl xl:text-5xl`
      case 'xl':
        return `${baseClass} text-4xl lg:text-5xl xl:text-6xl`
      case '2xl':
        return `${baseClass} text-5xl lg:text-6xl xl:text-7xl`
      default:
        return `${baseClass} text-3xl lg:text-4xl xl:text-5xl`
    }
  }

  // Image styling classes
  const getImageClasses = () => {
    const borderRadius = {
      'none': '',
      'small': 'rounded-md',
      'medium': 'rounded-lg',
      'large': 'rounded-xl',
      'xl': 'rounded-2xl',
    }[imageStyle?.borderRadius || 'medium']

    const shadow = {
      'none': '',
      'small': 'shadow-sm',
      'medium': 'shadow-lg',
      'large': 'shadow-2xl',
    }[imageStyle?.shadow || 'medium']

    return `${borderRadius} ${shadow}`
  }

  const getImageAspectClass = () => {
    switch (imageAspect) {
      case 'square':
        return 'aspect-square'
      case 'landscape':
        return 'aspect-[4/3]'
      case 'wide':
        return 'aspect-[16/9]'
      case 'portrait':
        return 'aspect-[3/4]'
      default:
        return ''
    }
  }

  const getAlignmentClass = () => {
    switch (verticalAlignment) {
      case 'start':
        return 'items-start'
      case 'end':
        return 'items-end'
      default:
        return 'items-center'
    }
  }

  // Button styles
  const getButtonStyle = (style: string) => {
    const baseClass = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200'
    
    switch (style) {
      case 'primary':
        return `${baseClass} rounded-lg bg-primary px-6 py-3 text-base text-primary-foreground hover:bg-primary/90`
      case 'secondary':
        return `${baseClass} rounded-lg bg-secondary px-6 py-3 text-base text-secondary-foreground hover:bg-secondary/80`
      case 'outline':
        return `${baseClass} rounded-lg border-2 border-input bg-background px-6 py-3 text-base hover:bg-accent hover:text-accent-foreground`
      default:
        return `${baseClass} rounded-lg bg-primary px-6 py-3 text-base text-primary-foreground hover:bg-primary/90`
    }
  }

  const renderButton = (button: ButtonType, index: number) => {
    const { label, link, style } = button
    
    if (link.type === 'external' && link.url) {
      return (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={getButtonStyle(style)}
        >
          {label}
          <svg 
            className="w-4 h-4" 
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
      )
    }

    if (link.type === 'internal' && link.reference) {
      return (
        <CMSLink
          key={index}
          reference={link.reference}
          className={getButtonStyle(style)}
        >
          {label}
          <svg 
            className="w-4 h-4" 
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
        </CMSLink>
      )
    }

    return null
  }

  // Content rendering component
  const renderContent = (additionalClasses = '') => (
    <div className={cn('space-y-6', additionalClasses)}>
      {content?.eyebrow && (
        <div className="text-sm font-medium text-primary uppercase tracking-wider">
          {content.eyebrow}
        </div>
      )}
      
      {content?.heading && (
        <h2 className={cn(getHeadingClass(), 'text-gray-900 dark:text-white')}>
          {content.heading}
        </h2>
      )}
      
      {content?.subheading && (
        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {content.subheading}
        </p>
      )}
      
      {content?.text && (
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <RichText 
            data={content.text} 
            enableGutter={false} 
            enableProse={false} 
          />
        </div>
      )}
      
      {content?.buttons && content.buttons.length > 0 && (
        <div className="flex flex-wrap gap-4 pt-4">
          {content.buttons.map((button, index) => renderButton(button, index))}
        </div>
      )}
    </div>
  )

  // Image rendering component
  const renderImage = (additionalClasses = '') => (
    image && (
      <div className={cn('relative', additionalClasses)}>
        <div className={cn(
          'relative overflow-hidden',
          getImageClasses(),
          getImageAspectClass()
        )}>
          <Media
            // @ts-expect-error - Media component expects Payload Media type
            resource={image}
            fill={imageAspect !== 'auto'}
            imgClassName={cn(
              'w-full h-full',
              imageAspect !== 'auto' ? 'object-cover object-center' : 'object-contain'
            )}
          />
          
          {/* Overlay for text on image layouts */}
          {layout === 'overlay' && imageStyle?.overlay && (
            <div className="absolute inset-0 bg-black/40" />
          )}
        </div>
      </div>
    )
  )

  // Layout rendering logic
  const renderLayout = () => {
    const containerClass = 'container'
    
    switch (layout) {
      case 'overlay':
        return (
          <div className={containerClass}>
            <div className="relative">
              {renderImage('min-h-[60vh] lg:min-h-[70vh]')}
              
              {/* Overlay content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  {renderContent('text-white [&_h2]:text-white [&_p]:text-white/90')}
                </div>
              </div>
            </div>
          </div>
        )

      case 'contentFocus':
        return (
          <div className={containerClass}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-2">
                {renderContent()}
              </div>
              <div className="lg:col-span-1">
                {renderImage()}
              </div>
            </div>
          </div>
        )

      case 'imageFocus':
        return (
          <div className={containerClass}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-1 lg:order-2">
                {renderContent()}
              </div>
              <div className="lg:col-span-2 lg:order-1">
                {renderImage()}
              </div>
            </div>
          </div>
        )

      default:
        // Traditional layout (textLeft/imageLeft)
        return (
          <div className={containerClass}>
            <div className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16',
              getAlignmentClass()
            )}>
              <div className={cn(
                'space-y-6',
                layout === 'imageLeft' ? 'lg:order-2' : 'lg:order-1'
              )}>
                {renderContent()}
              </div>
              
              <div className={layout === 'imageLeft' ? 'lg:order-1' : 'lg:order-2'}>
                {renderImage()}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section className={cn(
      getBackgroundClass(),
      getSpacingClass(),
      className
    )}>
      {renderLayout()}
    </section>
  )
}
