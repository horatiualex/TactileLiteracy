import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import LibraryDetailHero from '@/components/staticpages/library/LibraryDetailHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import type { Library } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const items = await payload.find({
    collection: 'library',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return items.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function LibraryItemPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/library/' + slug
  const item = await queryLibraryItem({ slug })

  if (!item) return <PayloadRedirects url={url} />

  return (
    <article className="bg-[#D2D2D2] min-h-screen">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <LibraryDetailHero item={item} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const item = await queryLibraryItem({ slug })

  return generateMeta({ doc: item })
}

const queryLibraryItem = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'library',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 3,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
