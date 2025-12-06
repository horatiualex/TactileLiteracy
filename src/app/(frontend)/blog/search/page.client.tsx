'use client'
import React from 'react'
import BlogHeroSection from '@/components/staticpages/blog/BlogHeroSection'
import BlogGridSection from '@/components/staticpages/blog/BlogGridSection'
import type { Post, Category } from '@/payload-types'

interface BlogSearchResultsProps {
  query: string
  posts: Post[]
  categories: Category[]
}

export default function BlogSearchResults({ query, posts, categories }: BlogSearchResultsProps) {
  return (
    <article className="mt-0">
      <div className="w-full bg-[#3A3A3A]">
        <BlogHeroSection
          title={query ? `Rezultate pentru "${query}"` : 'Blog Tactile Literacy'}
          description={query ? `Am găsit ${posts.length} rezultate` : 'Caută articole în blog'}
          searchPlaceholder="Caută articolul..."
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Blog Tactile Literacy"
        />
      </div>
      <BlogGridSection 
        posts={posts} 
        categories={categories} 
      />
    </article>
  )
}
