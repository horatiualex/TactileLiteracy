import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  // Typography size classes with responsive design
  const headingSizeClasses = {
    'xs': '[&_h1]:text-lg [&_h1]:md:text-xl [&_h1]:lg:text-2xl [&_h2]:text-base [&_h2]:md:text-lg [&_h2]:lg:text-xl [&_h3]:text-sm [&_h3]:md:text-base [&_h3]:lg:text-lg [&_h4]:text-sm [&_h4]:md:text-base',
    'sm': '[&_h1]:text-xl [&_h1]:md:text-2xl [&_h1]:lg:text-3xl [&_h2]:text-lg [&_h2]:md:text-xl [&_h2]:lg:text-2xl [&_h3]:text-base [&_h3]:md:text-lg [&_h3]:lg:text-xl [&_h4]:text-base [&_h4]:md:text-lg',
    'default': '[&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:lg:text-4xl [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:lg:text-3xl [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:lg:text-2xl [&_h4]:text-lg [&_h4]:md:text-xl',
    'lg': '[&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:lg:text-4xl [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:lg:text-3xl [&_h4]:text-xl [&_h4]:md:text-2xl',
    'xl': '[&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:lg:text-5xl [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:lg:text-4xl [&_h4]:text-2xl [&_h4]:md:text-3xl',
    '2xl': '[&_h1]:text-5xl [&_h1]:md:text-6xl [&_h1]:lg:text-7xl [&_h2]:text-4xl [&_h2]:md:text-5xl [&_h2]:lg:text-6xl [&_h3]:text-3xl [&_h3]:md:text-4xl [&_h3]:lg:text-5xl [&_h4]:text-3xl [&_h4]:md:text-4xl',
  }

  const bodySizeClasses = {
    'xs': '[&_p]:text-xs [&_p]:md:text-sm [&_li]:text-xs [&_li]:md:text-sm [&_span]:text-xs [&_span]:md:text-sm',
    'sm': '[&_p]:text-sm [&_p]:md:text-base [&_li]:text-sm [&_li]:md:text-base [&_span]:text-sm [&_span]:md:text-base',
    'default': '[&_p]:text-base [&_p]:md:text-lg [&_li]:text-base [&_li]:md:text-lg [&_span]:text-base [&_span]:md:text-lg',
    'lg': '[&_p]:text-lg [&_p]:md:text-xl [&_li]:text-lg [&_li]:md:text-xl [&_span]:text-lg [&_span]:md:text-xl',
    'xl': '[&_p]:text-xl [&_p]:md:text-2xl [&_li]:text-xl [&_li]:md:text-2xl [&_span]:text-xl [&_span]:md:text-2xl',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, textAlign, typography } = col

            // Get typography classes
            const headingClass = typography?.headingSize && typography.headingSize !== 'default'
              ? headingSizeClasses[typography.headingSize as keyof typeof headingSizeClasses]
              : headingSizeClasses.default

            const bodyClass = typography?.bodySize && typography.bodySize !== 'default'
              ? bodySizeClasses[typography.bodySize as keyof typeof bodySizeClasses]
              : bodySizeClasses.default

            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  textAlign ? textAlignClasses[textAlign as keyof typeof textAlignClasses] : 'text-left',
                  headingClass,
                  bodyClass,
                  {
                    'md:col-span-2': size !== 'full',
                  }
                )}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
