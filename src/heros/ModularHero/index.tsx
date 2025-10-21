import React from 'react'
import type { Page, Post } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { SetHeaderTheme } from './SetHeaderTheme'
import { ScrollDownButton } from './ScrollDownButton'

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
  bottomText?: string | null
  showDownArrow?: boolean | null
  splitScreenRightContent?: 'image' | 'blogPosts' | null
  blogPostsMode?: 'newest' | 'selected' | null
  selectedBlogPosts?: (string | Post)[]
}

export const ModularHero = async ({
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
  bottomText,
  showDownArrow,
  splitScreenRightContent = 'image',
  blogPostsMode = 'newest',
  selectedBlogPosts,
}: ModularHeroProps) => {

  // Normalize null values to defaults
  const normalizedLayout = layout || 'centered'
  const normalizedContentAlignment = contentAlignment || 'center'
  const normalizedBackgroundStyle = backgroundStyle || 'image'

  // Determine header theme
  const headerTheme = (normalizedBackgroundStyle === 'image' || (overlay?.enabled && overlay?.color?.includes('0,0,0'))) ? 'dark' : 'light'

  // Fetch blog posts if needed
  let blogPosts: Post[] = []
  if (normalizedLayout === 'splitScreen' && splitScreenRightContent === 'blogPosts') {
    const payload = await getPayload({ config })
    
    if (blogPostsMode === 'selected' && selectedBlogPosts && selectedBlogPosts.length > 0) {
      // Get specific selected posts
      const postIds = selectedBlogPosts.map(post => typeof post === 'string' ? post : post.id).slice(0, 4)
      const result = await payload.find({
        collection: 'posts',
        where: {
          id: {
            in: postIds,
          },
        },
        limit: 4,
        depth: 1,
      })
      blogPosts = result.docs
    } else {
      // Get 4 newest posts
      const result = await payload.find({
        collection: 'posts',
        limit: 4,
        sort: '-publishedAt',
        depth: 1,
      })
      blogPosts = result.docs
    }
  }

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
    let classes = 'relative -mt-[10.4rem] pt-[10.4rem] flex items-center overflow-hidden'
    
    if (normalizedBackgroundStyle === 'image' && backgroundImage) {
      classes += ' text-white'
    }
    
    if (normalizedLayout === 'splitScreen') {
      classes += ' min-h-[85vh]'
    } else {
      classes += ' min-h-screen py-20 lg:py-28'
    }

    return classes
  }

  // Generate content layout classes
  const getContentClasses = () => {
    let classes = 'container mx-auto px-6 lg:px-8 z-20 relative w-full'
    
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      classes += ' grid lg:grid-cols-2 gap-16 xl:gap-20 items-center'
    } else if (normalizedLayout === 'splitScreen') {
      classes += ' grid lg:grid-cols-2 gap-20 xl:gap-24 items-center'
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
    <div className={`${getTextClasses()} ${normalizedLayout === 'splitScreen' ? 'flex flex-col justify-center max-w-xl' : ''} ${normalizedLayout === 'textLeft' || normalizedLayout === 'textRight' ? 'max-w-2xl' : ''}`}>
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
              className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
                i === 0 
                  ? 'bg-white text-gray-900 shadow-lg hover:bg-gray-100 focus:ring-white' 
                  : 'bg-transparent text-white border-2 border-white/30 hover:bg-white hover:text-gray-900 hover:border-white focus:ring-white'
              }`}
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
        <div className="relative z-10 overflow-hidden rounded-lg shadow-lg">
          <Media
            resource={image}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    )
  )

  return (
    <div className={getContainerClasses()} style={getBackgroundStyle()}>
      <SetHeaderTheme theme={headerTheme} />

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
            <div className="flex items-center justify-start">
              {renderContent()}
            </div>
            {splitScreenRightContent === 'blogPosts' ? (
              <div className="flex items-center justify-end pr-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-[600px]">
                  {blogPosts.map((post, index) => {
                    const featuredImage = typeof post.meta?.image === 'object' ? post.meta.image : null
                    
                    return (
                      <Link
                        key={post.id}
                        href={`/posts/${post.slug}`}
                        className="group relative block bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
                        style={{
                          animationDelay: `${index * 75}ms`
                        }}
                      >
                        {/* Post Image */}
                        {featuredImage && (
                          <div className="aspect-[1.2/1] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 pointer-events-none" />
                            <Media
                              resource={featuredImage}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-out"
                            />
                          </div>
                        )}
                        
                        {/* Post Content */}
                        <div className="p-5 relative bg-white">
                          <h3 className="text-gray-900 font-bold text-[13px] leading-[1.4] line-clamp-2 group-hover:text-gray-700 transition-colors duration-300 mb-3 min-h-[2.3rem]">
                            {post.title}
                          </h3>
                          
                          {/* Read more indicator */}
                          <div className="flex items-center text-[11px] font-bold text-gray-400 group-hover:text-blue-500 transition-all duration-300">
                            <span className="uppercase tracking-wide">Citește mai mult</span>
                            <svg 
                              className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Subtle shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-full transition-all duration-700" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-end">
                {renderImage(media || secondaryImage, 'relative max-w-2xl')}
              </div>
            )}
          </>
        )}

        {(normalizedLayout === 'centered' || normalizedLayout === 'textOnly') && (
          <div className="space-y-8">
            {renderContent()}
          </div>
        )}
      </div>

      {/* Bottom Text - Clean minimal styling */}
      {bottomText && (
        <div className="absolute bottom-8 left-8 right-20 sm:right-24 z-30">
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            {bottomText}
          </p>
        </div>
      )}

      {/* Down Arrow - Improved visibility and WCAG compliance */}
      {showDownArrow && <ScrollDownButton />}
    </div>
  )
}
