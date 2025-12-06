import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import LibrarySearchResults from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function LibrarySearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const libraryItems = await payload.find({
    collection: 'library',
    depth: 2,
    limit: 50,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                shortDescription: {
                  like: query,
                },
              },
              {
                imageDescription: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  const categoriesData = await payload.find({
    collection: 'library-categories',
    limit: 100,
  })

  return (
    <LibrarySearchResults 
      query={query || ''} 
      items={libraryItems.docs} 
      categories={categoriesData.docs}
    />
  )
}

export const metadata: Metadata = {
  title: 'Căutare Bibliotecă - Tactile Literacy',
  description: 'Rezultate căutare în biblioteca de imagini tactile',
}
