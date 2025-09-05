/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type ListItem = {
  title: string
  description?: any
  enableLink?: boolean
  link?: any
  icon?: any
}

type Props = {
  title?: string
  subtitle?: string
  columns?: '1' | '2' | '3'
  listStyle?: 'card' | 'simple' | 'bordered'
  items?: ListItem[]
  backgroundColor?: 'transparent' | 'gray-light' | 'blue-light' | 'green-light'
}

export const ListBlockComponent: React.FC<Props> = ({ 
  title, 
  subtitle, 
  columns, 
  listStyle, 
  items, 
  backgroundColor 
}) => {
  if (!items || items.length === 0) {
    return null
  }

  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case 'gray-light':
        return 'bg-gray-50 dark:bg-gray-900/50'
      case 'blue-light':
        return 'bg-blue-50 dark:bg-blue-900/20'
      case 'green-light':
        return 'bg-green-50 dark:bg-green-900/20'
      default:
        return ''
    }
  }

  const getColumnClasses = () => {
    switch (columns) {
      case '1':
        return 'grid-cols-1'
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      default:
        return 'grid-cols-1'
    }
  }

  const getItemClasses = () => {
    switch (listStyle) {
      case 'card':
        return 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-900/20 transition-shadow duration-300 p-6 border border-transparent dark:border-gray-700'
      case 'bordered':
        return 'border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300'
      case 'simple':
      default:
        return 'p-4'
    }
  }

  return (
    <section className={`py-12 ${getBackgroundClasses()}`}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* List Items Grid */}
        <div className={`grid gap-6 ${getColumnClasses()}`}>
          {items.map((item: ListItem, index: number) => (
            <div key={index} className={getItemClasses()}>
              {/* Icon */}
              {item.icon && (
                <div className="mb-4">
                  <Media
                    resource={item.icon as any}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>

              {/* Description */}
              {item.description && (
                <div className="text-gray-600 dark:text-gray-400 mb-4 prose prose-gray dark:prose-invert max-w-none">
                  <RichText data={item.description as any} enableGutter={false} enableProse={false} />
                </div>
              )}

              {/* Link */}
              {item.enableLink && item.link && (
                <div className="mt-auto">
                  <CMSLink
                    {...(item.link as any)}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    {(item.link as any)?.label || (item.link as any)?.text || 'Citește mai mult'}
                    <svg
                      className="ml-2 w-4 h-4"
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
