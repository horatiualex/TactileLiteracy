'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' | 'createdAt' | 'content'>

// Helper to extract text from Lexical content
const extractTextFromLexical = (node: any): string => {
  if (!node) return ''
  if (node.type === 'text') {
    return node.text || ''
  }
  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => extractTextFromLexical(child)).join(' ')
  }
  return ''
}

export type CardDisplaySettings = {
  cardStyle?: 'default' | 'minimal' | 'imageFocus'
  showDate?: boolean
  showDescription?: boolean
  showCategories?: boolean
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4'
  buttonText?: string
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  displaySettings?: CardDisplaySettings
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { 
    className, 
    doc, 
    relationTo, 
    showCategories: legacyShowCategories, 
    title: titleFromProps,
    displaySettings = {}
  } = props

  const { slug, categories, meta, title, publishedAt, createdAt, content } = doc || {}
  const { description, image: metaImage } = meta || {}

  let descriptionToUse = description

  // If description is missing or is placeholder, try to extract from content
  if ((!descriptionToUse || /lorem\s*ipsum/i.test(descriptionToUse) || descriptionToUse === '') && content && content.root) {
    const extracted = extractTextFromLexical(content.root)
    if (extracted) {
      // Trim to ~150 chars
      descriptionToUse = extracted.substring(0, 150)
      if (extracted.length > 150) descriptionToUse += '...'
    }
  }

  // Extract display settings with defaults
  const {
    cardStyle = 'default',
    showDate = true,
    showDescription = true,
    showCategories = true,
    aspectRatio = '4/3',
    buttonText = 'Citește mai mult'
  } = displaySettings

  // Support legacy showCategories prop
  const shouldShowCategories = showCategories || legacyShowCategories
  
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = descriptionToUse?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16/9':
        return 'aspect-[16/9]'
      case '4/3':
        return 'aspect-[4/3]'
      case '1/1':
        return 'aspect-square'
      case '3/4':
        return 'aspect-[3/4]'
      default:
        return 'aspect-[4/3]'
    }
  }

  // Format date for display
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const displayDate = formatDate(publishedAt || createdAt)

  // Minimal card style
  if (cardStyle === 'minimal') {
    return (
      <article
        className={cn(
          'group relative overflow-hidden rounded-xl cursor-pointer',
          className,
        )}
        ref={card.ref}
      >
        <div className={`relative w-full ${getAspectRatioClass()} overflow-hidden bg-gray-100 dark:bg-gray-800`}>
          {!metaImage && (
            <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
              <div className="text-white text-center opacity-60">
                <div className="text-4xl mb-2">📄</div>
              </div>
            </div>
          )}
          {metaImage && typeof metaImage !== 'string' && (
            <Media 
              resource={metaImage} 
              fill
              size="33vw" 
              className="w-full h-full"
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Minimal content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {titleToUse && (
              <h3 className="text-white text-xl font-bold mb-4 line-clamp-2">
                {titleToUse}
              </h3>
            )}
            
            <Link 
              href={href} 
              ref={link.ref}
              className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              <span>{buttonText}</span>
              <svg 
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Image Focus style 
  if (cardStyle === 'imageFocus') {
    return (
      <article
        className={cn(
          'group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:cursor-pointer transform hover:-translate-y-1',
          className,
        )}
        ref={card.ref}
      >
        <div className={`relative w-full ${getAspectRatioClass()} overflow-hidden bg-gray-100 dark:bg-gray-800`}>
          {!metaImage && (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">📄</div>
                <div className="text-sm opacity-80">Fără imagine</div>
              </div>
            </div>
          )}
          {metaImage && typeof metaImage !== 'string' && (
            <Media 
              resource={metaImage} 
              fill
              size="33vw" 
              className="w-full h-full"
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {/* Date tag in top right corner */}
          {showDate && displayDate && (
            <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-600/50">
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {displayDate}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {shouldShowCategories && hasCategories && (
            <div className="flex flex-wrap gap-2 mb-2">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Fără categorie'

                  return (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {categoryTitle}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}
          
          {titleToUse && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              <Link href={href} ref={link.ref} className="hover:no-underline">
                {titleToUse}
              </Link>
            </h3>
          )}
          
          {/* Minimal button */}
          <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
            <span>{buttonText}</span>
            <svg 
              className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    )
  }

  // Default style
  return (
    <article
      className={cn(
        'group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:cursor-pointer transform hover:-translate-y-1',
        className,
      )}
      ref={card.ref}
    >
      <div className={`relative w-full ${getAspectRatioClass()} overflow-hidden`}>
        {!metaImage && (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📄</div>
              <div className="text-sm opacity-80">Fără imagine</div>
            </div>
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <div className="w-full h-full">
            <Media 
              resource={metaImage} 
              fill
              size="33vw" 
              className="w-full h-full"
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        {/* Date tag in top right corner */}
        {showDate && displayDate && (
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-600/50">
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {displayDate}
            </span>
          </div>
        )}
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        {shouldShowCategories && hasCategories && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Fără categorie'

                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}
        
        {titleToUse && (
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            <Link href={href} ref={link.ref} className="hover:no-underline">
              {titleToUse}
            </Link>
          </h3>
        )}
        
        {showDescription && description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {sanitizedDescription}
          </p>
        )}
        
        {/* Read more indicator */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
          <span>{buttonText}</span>
          <svg 
            className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  )
}
