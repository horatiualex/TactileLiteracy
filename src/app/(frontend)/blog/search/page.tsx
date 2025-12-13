import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import BlogSearchResults from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function BlogSearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise } as any)

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 50,
    where: {
      _status: {
        equals: 'published',
      },
      ...(query
        ? {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
            ],
          }
        : {}),
    },
    sort: '-publishedAt',
  })

  const categoriesData = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
  })

  return (
    <BlogSearchResults 
      query={query || ''} 
      posts={posts.docs} 
      categories={categoriesData.docs}
    />
  )
}

export const metadata: Metadata = {
  title: 'Căutare Blog - Tactile Literacy',
  description: 'Rezultate căutare în blog',
}
