import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import BlogPostHeader from '@/components/staticpages/blog/BlogPostHeader'
import RecentPostsSidebar from '@/components/staticpages/blog/RecentPostsSidebar'
import BlogMoreArticles from '@/components/staticpages/blog/BlogMoreArticles'
import NewsletterSection from '@/components/staticpages/blog/NewsletterSection'
import ShareButtons from '@/components/staticpages/blog/ShareButtons'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise } as any)
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }: any) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  // Fetch recent posts for sidebar
  const payload = await getPayload({ config: configPromise } as any)
  const recentPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 5,
    where: {
      _status: {
        equals: 'published',
      },
      slug: {
        not_equals: slug,
      },
    },
    sort: '-publishedAt',
  })

  // Fetch more articles for carousel
  const moreArticles = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 10,
    where: {
      _status: {
        equals: 'published',
      },
      slug: {
        not_equals: slug,
      },
    },
    sort: '-publishedAt',
  })

  return (
    <article className="min-h-screen">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <div className="w-full px-8 lg:px-16 py-16 bg-[#D2D2D2]">
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#434343] mb-8">{post.title}</h1>

        {/* Header Section: Title + Featured Image & Recent Posts Sidebar */}
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr] mb-16">
          <div>
            <BlogPostHeader post={post} />
            <div className="mt-8 font-inter text-black">
              <RichText 
                data={post.content} 
                enableGutter={false} 
                className="text-black prose-p:text-black prose-headings:text-black prose-li:text-black prose-strong:text-black"
              />
              <ShareButtons />
            </div>
          </div>
          <div>
            <RecentPostsSidebar posts={recentPosts.docs} />
          </div>
        </div>
      </div>

      {/* More Articles Carousel */}
      {moreArticles.docs.length > 0 && (
        <BlogMoreArticles posts={moreArticles.docs} />
      )}

      <div className="w-full px-8 lg:px-16">
        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16 max-w-6xl mx-auto">
            <RelatedPosts docs={post.relatedPosts.filter((post: any) => typeof post === 'object')} />
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <NewsletterSection 
        title="Sign up for our newsletter!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise } as any)

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
