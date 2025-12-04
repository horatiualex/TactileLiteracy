import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import BlogHeroSection from '@/components/staticpages/blog/BlogHeroSection'
import BlogGridSection from '@/components/staticpages/blog/BlogGridSection'
import NewsletterSection from '@/components/staticpages/blog/NewsletterSection'

export default async function BlogPage() {
  const payload = await getPayload({ config })

  // Fetch all published posts
  const postsData = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  })

  // Fetch all categories
  const categoriesData = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
  })

  return (
    <article className="mt-0">
      <div className="w-full bg-[#3A3A3A] min-h-screen">
        <BlogHeroSection
          title="Blog Tactile Literacy"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          searchPlaceholder="Caută articolul..."
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Blog Tactile Literacy"
        />
        
        <BlogGridSection 
          posts={postsData.docs} 
          categories={categoriesData.docs} 
        />

        <NewsletterSection 
          title="Sign up for our newsletter!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
        />
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Blog - Tactile Literacy',
  description: 'Articole și resurse pentru persoanele cu dizabilități',
}
