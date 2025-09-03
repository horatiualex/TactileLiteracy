'use client'

import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

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
    type: 'reference' | 'custom'
    reference?: {
      value: string
      relationTo: 'pages' | 'posts'
    }
    url?: string
    newTab?: boolean
  }
  style: 'primary' | 'secondary' | 'outline'
}

type Props = {
  className?: string
  layout?: 'textLeft' | 'imageLeft'
  content?: {
    heading?: string
    subheading?: string
    text?: DefaultTypedEditorState
    buttons?: ButtonType[]
  }
  image?: MediaObject
  imageAspect?: 'auto' | 'square' | 'landscape' | 'wide' | 'portrait'
  verticalAlignment?: 'start' | 'center' | 'end'
  backgroundColor?: 'none' | 'light' | 'dark' | 'primary'
}

export const TextImageBlockComponent: React.FC<Props> = ({
  className,
  layout = 'textLeft',
  content,
  image,
  imageAspect = 'auto',
  verticalAlignment = 'center',
  backgroundColor = 'none',
}) => {
  if (!content && !image) {
    return null
  }

  const getBackgroundClass = () => {
    switch (backgroundColor) {
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

  const getButtonStyle = (style: string) => {
    switch (style) {
      case 'primary':
        return 'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors'
      case 'secondary':
        return 'inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors'
      case 'outline':
        return 'inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors'
      default:
        return 'inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors'
    }
  }

  const renderButton = (button: ButtonType, index: number) => {
    const { label, link, style } = button
    
    if (link.type === 'custom' && link.url) {
      return (
        <a
          key={index}
          href={link.url}
          target={link.newTab ? '_blank' : '_self'}
          rel={link.newTab ? 'noopener noreferrer' : undefined}
          className={getButtonStyle(style)}
        >
          {label}
        </a>
      )
    }

    if (link.type === 'reference' && link.reference) {
      return (
        <CMSLink
          key={index}
          reference={link.reference}
          className={getButtonStyle(style)}
          newTab={link.newTab}
        >
          {label}
        </CMSLink>
      )
    }

    return null
  }

  return (
    <section className={`py-16 lg:py-24 ${getBackgroundClass()} ${className || ''}`}>
      <div className="container">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 ${getAlignmentClass()}`}>
          {/* Content Section */}
          <div className={`space-y-6 break-words ${layout === 'imageLeft' ? 'lg:order-2' : 'lg:order-1'}`}>
            {content?.subheading && (
              <p className="text-sm font-medium text-primary uppercase tracking-wide">
                {content.subheading}
              </p>
            )}
            
            {content?.heading && (
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                {content.heading}
              </h2>
            )}
            
            {content?.text && (
              <div className="prose prose-lg max-w-none dark:prose-invert break-words whitespace-normal">
                <div style={{ 
                  wordWrap: 'break-word', 
                  overflowWrap: 'break-word', 
                  hyphens: 'auto',
                  wordBreak: 'break-word'
                }}>
                  <RichText 
                    data={content.text} 
                    enableGutter={false} 
                    enableProse={false} 
                  />
                </div>
              </div>
            )}
            
            {content?.buttons && content.buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {content.buttons.map((button, index) => renderButton(button, index))}
              </div>
            )}
          </div>

          {/* Image Section */}
          {image && (
            <div className={`${layout === 'imageLeft' ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className={`relative overflow-hidden rounded-lg ${getImageAspectClass()}`}>
                <Media
                  // @ts-expect-error - Media component expects Payload Media type
                  resource={image}
                  fill={imageAspect !== 'auto'}
                  className={`w-full h-full ${imageAspect !== 'auto' ? 'object-cover' : 'object-contain'}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
