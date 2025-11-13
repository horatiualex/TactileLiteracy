import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      links?: never
      lowImpactAlignment?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
      links?: Page['hero']['links']
      lowImpactAlignment?: Page['hero']['lowImpactAlignment']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ 
  children, 
  richText, 
  links,
  lowImpactAlignment = 'left'
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

  const alignmentValue = lowImpactAlignment || 'left'
  const containerAlignment = containerAlignmentClasses[alignmentValue as keyof typeof containerAlignmentClasses]
  const textAlignment = textAlignmentClasses[alignmentValue as keyof typeof textAlignmentClasses]
  const linkJustify = linkJustifyClasses[alignmentValue as keyof typeof linkJustifyClasses]

  return (
    <div className="container mt-16">
      <div className={`max-w-[48rem] ${containerAlignment} ${textAlignment}`}>
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
        
        {Array.isArray(links) && links.length > 0 && (
          <ul className={`flex gap-4 mt-6 ${linkJustify}`}>
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
  )
}
