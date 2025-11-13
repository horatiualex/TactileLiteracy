'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ 
  links, 
  media, 
  richText,
  highImpactAlignment = 'center',
  highImpactOverlay
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const alignmentClasses = {
    left: 'justify-start md:justify-start',
    center: 'justify-center md:justify-center',
    right: 'justify-end md:justify-end',
  }

  const textAlignmentClasses = {
    left: 'text-left md:text-left',
    center: 'text-center md:text-center',
    right: 'text-right md:text-right',
  }

  const linkJustifyClasses = {
    left: 'justify-start md:justify-start',
    center: 'justify-center md:justify-center',
    right: 'justify-end md:justify-end',
  }

  const alignmentValue = highImpactAlignment || 'center'
  const containerJustify = alignmentClasses[alignmentValue as keyof typeof alignmentClasses]
  const textAlignment = textAlignmentClasses[alignmentValue as keyof typeof textAlignmentClasses]
  const linkJustify = linkJustifyClasses[alignmentValue as keyof typeof linkJustifyClasses]

  const overlayEnabled = highImpactOverlay?.enabled || false
  const overlayOpacity = highImpactOverlay?.opacity || 0.5

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className={`container mb-8 z-10 relative flex items-center ${containerJustify}`}>
        <div className={`max-w-[36.5rem] ${textAlignment}`}>
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className={`flex gap-4 ${linkJustify}`}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        {overlayEnabled && (
          <div 
            className="absolute inset-0 bg-black -z-[5]"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>
    </div>
  )
}
