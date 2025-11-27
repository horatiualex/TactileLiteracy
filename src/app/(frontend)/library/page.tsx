import type { Metadata } from 'next'
import React from 'react'
import LibraryHeroSection from '@/components/staticpages/library/LibraryHeroSection'
import NeedImageSection from '@/components/staticpages/acasa/NeedImageSection'

export default async function LibraryPage() {
  return (
    <article className="mt-0">
      <div className="w-full bg-[#3A3A3A] min-h-screen">
        <LibraryHeroSection
          title="Biblioteca Tactile Literacy"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          searchPlaceholder="Caută imaginea ta..."
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Biblioteca Tactile Literacy"
        />
         <NeedImageSection />
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Bibliotecă - Tactile Literacy',
  description: 'Biblioteca de imagini tactile pentru persoanele cu dizabilități',
}
