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
  splitScreenRightContent?: 'image' | 'blogPosts' | 'statistics' | null
  blogPostsMode?: 'newest' | 'selected' | null
  selectedBlogPosts?: (string | Post)[] | null
  statisticsCards?: Array<{
    number: string
    label: string
    icon?: string | null
    id?: string | null
  }> | null
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
  statisticsCards,
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
      // Ensure color has # prefix if it's a hex value without it
      const normalizedColor = backgroundColor.trim()
      // Check if it's a hex color without # (6 or 3 characters)
      const isHexWithoutHash = /^[0-9A-Fa-f]{6}$|^[0-9A-Fa-f]{3}$/.test(normalizedColor)
      style.backgroundColor = isHexWithoutHash ? `#${normalizedColor}` : normalizedColor
    } else if (normalizedBackgroundStyle === 'gradient' && gradientColors?.from && gradientColors?.to) {
      const direction = gradientColors.direction || 'to-br'
      const gradientMap: Record<string, string> = {
        'to-b': 'to bottom',
        'to-br': 'to bottom right',
        'to-r': 'to right',
        'to-tr': 'to top right',
      }
      // Ensure colors have # prefix if they're hex values without it
      const fromColor = gradientColors.from.startsWith('#') ? gradientColors.from : `#${gradientColors.from}`
      const toColor = gradientColors.to.startsWith('#') ? gradientColors.to : `#${gradientColors.to}`
      style.background = `linear-gradient(${gradientMap[direction] || 'to bottom right'}, ${fromColor}, ${toColor})`
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
    
    // Add white text for image, gradient, and solid backgrounds
    if ((normalizedBackgroundStyle === 'image' && backgroundImage) || 
        (normalizedBackgroundStyle === 'gradient' && gradientColors?.from && gradientColors?.to) ||
        (normalizedBackgroundStyle === 'solid' && backgroundColor)) {
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
    let classes = 'z-20 relative w-full'
    
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      classes += ' container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-32 xl:gap-40 items-center'
    } else if (normalizedLayout === 'splitScreen') {
      classes += ' container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 gap-12 lg:gap-16'
    } else {
      classes += ' container mx-auto px-6 lg:px-8 max-w-5xl'
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
    
    // For split layouts, always left-align text
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      classes += 'text-left'
    }
    
    return classes
  }

  // Generate button alignment classes
  const getButtonAlignmentClasses = () => {
    if (normalizedLayout === 'textLeft' || normalizedLayout === 'textRight') {
      return 'justify-start'
    }
    
    if (normalizedLayout === 'centered' || normalizedLayout === 'textOnly') {
      if (normalizedContentAlignment === 'left') return 'justify-start'
      if (normalizedContentAlignment === 'right') return 'justify-end'
      return 'justify-center'
    }
    
    return 'justify-start'
  }

  const renderContent = () => (
    <div className={`${getTextClasses()} ${normalizedLayout === 'splitScreen' ? 'flex flex-col justify-center w-full lg:max-w-2xl' : ''} ${normalizedLayout === 'textLeft' || normalizedLayout === 'textRight' ? 'max-w-2xl' : ''}`}>
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
        <div className={`flex gap-4 ${normalizedLayout === 'textLeft' || normalizedLayout === 'textRight' ? 'flex-wrap' : ''} ${getButtonAlignmentClasses()}`}>
          {links.map(({ link }, i) => {
            // Determine if we should use light buttons (for dark backgrounds)
            const useLightButtons = normalizedBackgroundStyle === 'image' || 
                                   normalizedBackgroundStyle === 'gradient' ||
                                   normalizedBackgroundStyle === 'solid' ||
                                   overlay?.enabled
            
            return (
              <CMSLink
                key={i}
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${
                  i === 0 
                    ? useLightButtons
                      ? 'bg-white text-gray-900 shadow-lg hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 focus:ring-white'
                      : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 focus:ring-blue-500'
                    : useLightButtons
                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 focus:ring-white/50 backdrop-blur-sm'
                      : 'bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300 hover:border-gray-400 focus:ring-gray-500'
                }`}
                {...link}
              >
                {link.label}
                {i === 0 && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </CMSLink>
            )
          })}
        </div>
      )}
      {/* Bottom Text - Integrated into content flow */}
      {bottomText && (
        <div className="mt-12">
          <p className="text-white/80 text-sm sm:text-base font-medium">
            {bottomText}
          </p>
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
            {renderImage(secondaryImage, '')}
          </>
        )}

        {normalizedLayout === 'textRight' && (
          <>
            {renderImage(secondaryImage, '')}
            <div className="space-y-8">
              {renderContent()}
            </div>
          </>
        )}

        {normalizedLayout === 'splitScreen' && (
          <>
            <div className="flex-1 flex items-center w-full">
              {renderContent()}
            </div>
            {splitScreenRightContent === 'blogPosts' ? (
              <div className="flex-1 flex items-center w-full lg:max-w-[500px] xl:max-w-[600px]">
                <div className="w-full space-y-4">
                  {/* Header with View All link */}
                  <div className="flex items-center justify-between mb-6 lg:mb-8">
                    <h2 className={`text-2xl lg:text-3xl font-bold ${normalizedBackgroundStyle === 'image' || overlay?.enabled ? 'text-white' : 'text-gray-900'}`}>
                      Ultimele Noutăți
                    </h2>
                    <Link 
                      href="/posts" 
                      className={`text-sm lg:text-base font-semibold inline-flex items-center gap-1.5 transition-colors ${
                        normalizedBackgroundStyle === 'image' || overlay?.enabled 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Vezi Toate
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  
                  {/* Stacked blog post cards */}
                  <div className="space-y-3 lg:space-y-4">
                    {blogPosts.map((post) => {
                      const featuredImage = typeof post.meta?.image === 'object' ? post.meta.image : null
                      const isDarkTheme = normalizedBackgroundStyle === 'image' || overlay?.enabled
                      
                      return (
                        <Link
                          key={post.id}
                          href={`/posts/${post.slug}`}
                          className={`group block rounded-xl lg:rounded-2xl p-4 lg:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                            isDarkTheme
                              ? 'bg-gray-800/70 backdrop-blur-md border-gray-700/50 hover:bg-gray-800/90 hover:border-gray-600/50'
                              : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300 shadow-md'
                          }`}
                        >
                          <div className="flex flex-col gap-2 lg:gap-3">
                            {/* Post Title */}
                            <h3 className={`font-bold text-base lg:text-lg leading-tight line-clamp-2 transition-colors ${
                              isDarkTheme
                                ? 'text-white group-hover:text-blue-400'
                                : 'text-gray-900 group-hover:text-blue-600'
                            }`}>
                              {post.title}
                            </h3>
                            
                            {/* Post Meta - Date and Read Time */}
                            <div className={`flex items-center gap-3 lg:gap-4 text-xs lg:text-sm ${
                              isDarkTheme ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              {post.publishedAt && (
                                <span className="flex items-center gap-1.5 lg:gap-2">
                                  <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {new Date(post.publishedAt).toLocaleDateString('ro-RO', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              )}
                              <span className="flex items-center gap-1.5 lg:gap-2">
                                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                5 min citire
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  {showDownArrow && <ScrollDownButton />}
                </div>
              </div>
            ) : splitScreenRightContent === 'statistics' && statisticsCards && statisticsCards.length > 0 ? (
              <div className="flex-1 flex items-center w-full lg:max-w-[550px] xl:max-w-[650px]">
                <div className="w-full grid grid-cols-2 gap-4 lg:gap-6">
                  {statisticsCards.map((stat, index) => {
                    const isDarkTheme = normalizedBackgroundStyle === 'image' || normalizedBackgroundStyle === 'gradient' || normalizedBackgroundStyle === 'solid' || overlay?.enabled
                    
                    return (
                      <div
                        key={index}
                        className={`rounded-xl p-6 lg:p-8 text-center border transition-all duration-300 hover:scale-105 ${
                          isDarkTheme
                            ? 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20'
                            : 'bg-white border-gray-200 shadow-md hover:shadow-xl'
                        }`}
                      >
                        {/* Icon */}
                        {stat.icon && (
                          <div className={`text-3xl lg:text-4xl mb-3 ${isDarkTheme ? 'opacity-90' : ''}`}>
                            {stat.icon}
                          </div>
                        )}
                        
                        {/* Number */}
                        <div className={`text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 leading-none ${
                          isDarkTheme ? 'text-white' : 'text-gray-900'
                        }`}>
                          {stat.number}
                        </div>
                        
                        {/* Label */}
                        <div className={`text-sm lg:text-base font-medium leading-tight ${
                          isDarkTheme ? 'text-white/90' : 'text-gray-600'
                        }`}>
                          {stat.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                {renderImage(secondaryImage, 'relative w-full max-w-2xl')}
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
      {bottomText && normalizedLayout !== 'splitScreen' && (
        <div className="absolute bottom-8 left-8 right-20 sm:right-24 z-30">
          <p className="text-white/80 text-sm sm:text-base font-medium">
            {bottomText}
          </p>
        </div>
      )}

      {/* Down Arrow - Improved visibility and WCAG compliance */}
      {showDownArrow && normalizedLayout !== 'splitScreen' && <ScrollDownButton />}
    </div>
  )
}
