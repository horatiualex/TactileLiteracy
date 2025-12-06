'use client'
import React from 'react'
import LibraryHeroSection from '@/components/staticpages/library/LibraryHeroSection'
import LibraryGridSection from '@/components/staticpages/library/LibraryGridSection'
import type { Library, Category } from '@/payload-types'

interface LibrarySearchResultsProps {
  query: string
  items: Library[]
  categories: Category[]
}

export default function LibrarySearchResults({ query, items, categories }: LibrarySearchResultsProps) {
  return (
    <article className="mt-0">
      <div className="w-full bg-[#3A3A3A]">
        <LibraryHeroSection
          title={query ? `Rezultate pentru "${query}"` : 'Biblioteca Tactile Literacy'}
          description={query ? `Am găsit ${items.length} rezultate` : 'Caută în biblioteca noastră de imagini tactile'}
          searchPlaceholder="Caută imaginea ta..."
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Biblioteca Tactile Literacy"
        />
      </div>
      <LibraryGridSection 
        items={items} 
        categories={categories} 
      />
    </article>
  )
}
