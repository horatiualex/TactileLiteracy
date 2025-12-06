'use client'
import React from 'react'
import type { Library } from '@/payload-types'
import { Facebook, Youtube, Instagram, Linkedin } from 'lucide-react'

interface LibraryBibliographyProps {
  item: Library
}

export default function LibraryBibliography({ item }: LibraryBibliographyProps) {
  if (!item.bibliography) return null

  return (
    <section className="w-full bg-[#434343] py-16 px-8 lg:px-16">
      <div className="w-full">
        {/* Badge - very inset */}
        <div className="mb-8">
          <span
            className="inline-block px-8 py-3 bg-[#434343] text-[#D9D9D9] text-lg rounded-full"
            style={{
              boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.1)',
            }}
          >
            Bibliografie
          </span>
        </div>

        {/* Bibliography text */}
        <div className="mb-8">
          <p className="text-[#D9D9D9] text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
            {item.bibliography}
          </p>
        </div>

        {/* Share this section */}
        <div className="border-t border-gray-600/30 pt-8">
          <h3 className="text-[#D9D9D9] text-lg font-semibold mb-4">Share this:</h3>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.1)',
              }}
              aria-label="Share on Facebook"
            >
              <Facebook size={24} className="text-gray-800" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.1)',
              }}
              aria-label="Share on YouTube"
            >
              <Youtube size={24} className="text-gray-800" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.1)',
              }}
              aria-label="Share on Instagram"
            >
              <Instagram size={24} className="text-gray-800" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-12 h-12 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '3px 3px 6px rgba(0,0,0,0.4), -2px -2px 4px rgba(255,255,255,0.1)',
              }}
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={24} className="text-gray-800" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
