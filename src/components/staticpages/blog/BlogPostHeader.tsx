'use client'
import React from 'react'
import type { Post } from '@/payload-types'

interface BlogPostHeaderProps {
  post: Post
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const heroImageUrl =
    typeof post.heroImage === 'object' && post.heroImage?.url ? post.heroImage.url : null

  return (
    <div className="w-full">
      {/* Featured Image with inset effect */}
      {heroImageUrl && (
        <div
          className="relative w-full rounded-3xl overflow-hidden bg-[#D2D2D2]"
          style={{
            boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
          }}
        >
          <img
            src={heroImageUrl}
            alt={post.title}
            className="w-full h-auto object-cover"
            style={{
              filter: 'brightness(0.95)',
            }}
          />
        </div>
      )}
    </div>
  )
}
