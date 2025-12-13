import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import LibraryHeroSection from '@/components/staticpages/library/LibraryHeroSection'
import LibraryGridSection from '@/components/staticpages/library/LibraryGridSection'
import NeedImageSection from '@/components/staticpages/acasa/NeedImageSection'

export default async function LibraryPage() {
  const payload = await getPayload({ config } as any)

  // Fetch library items
  const libraryData = await payload.find({
    collection: 'library',
    depth: 2,
    limit: 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  // Fetch library categories
  const categoriesData = await payload.find({
    collection: 'library-categories',
    limit: 100,
  })

  return (
    <article className="mt-0">
      <div className="w-full bg-[#3A3A3A]">
        <LibraryHeroSection
          title="Biblioteca Tactile Literacy"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          searchPlaceholder="Caută imaginea ta..."
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Biblioteca Tactile Literacy"
        />
      </div>
      <LibraryGridSection 
        items={libraryData.docs} 
        categories={categoriesData.docs} 
      />
      <NeedImageSection />
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Bibliotecă - Tactile Literacy',
  description: 'Biblioteca de imagini tactile pentru persoanele cu dizabilități',
}
