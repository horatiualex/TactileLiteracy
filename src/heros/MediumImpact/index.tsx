import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ 
  links, 
  media, 
  richText,
  mediumImpactAlignment = 'left',
  mediumImpactMediaPosition = 'after'
}) => {
  const containerAlignmentClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  const textAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const linkJustifyClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const alignmentValue = mediumImpactAlignment || 'left'
  const containerAlignment = containerAlignmentClasses[alignmentValue as keyof typeof containerAlignmentClasses]
  const textAlignment = textAlignmentClasses[alignmentValue as keyof typeof textAlignmentClasses]
  const linkJustify = linkJustifyClasses[alignmentValue as keyof typeof linkJustifyClasses]

  const textContent = (
    <div className={`max-w-[48rem] ${containerAlignment} ${textAlignment}`}>
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
  )

  const mediaContent = media && typeof media === 'object' && (
    <div>
      <Media
        className="-mx-4 md:-mx-8 2xl:-mx-16"
        imgClassName=""
        priority
        resource={media}
      />
      {media?.caption && (
        <div className="mt-3">
          <RichText data={media.caption} enableGutter={false} />
        </div>
      )}
    </div>
  )

  return (
    <div className="">
      {mediumImpactMediaPosition === 'before' ? (
        <>
          <div className="container mb-8">
            {mediaContent}
          </div>
          <div className="container mb-8">
            {textContent}
          </div>
        </>
      ) : (
        <>
          <div className="container mb-8">
            {textContent}
          </div>
          <div className="container ">
            {mediaContent}
          </div>
        </>
      )}
    </div>
  )
}
