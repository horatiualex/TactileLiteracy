'use client'
import React, { useState } from 'react'
import type { Post } from '@/payload-types'

import { ChevronDown } from 'lucide-react'

interface BlogMoreArticlesProps {
  posts: Post[]
}

export default function BlogMoreArticles({ posts }: BlogMoreArticlesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleCount = 4
  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < posts.length - visibleCount

  const handlePrev = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const visiblePosts = posts.slice(currentIndex, currentIndex + visibleCount)

  return (
    <section 
      className="w-full py-16 px-8 lg:px-16 relative" 
      style={{ 
        backgroundColor: '#D2D2D2',
        boxShadow: 'inset 0px 11px 8px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#D2D2D2] to-transparent z-10 pointer-events-none" />
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#D2D2D2] to-transparent z-10 pointer-events-none" />

      {/* Filter definition for Fish */}
      <svg width="0" height="0" className="absolute block">
        <defs>
          <filter id="fishNeumorph" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="-2.5" dy="3.88" in="SourceAlpha" result="offset"/>
            <feGaussianBlur stdDeviation="1.66" in="offset" result="blur"/>
            <feComposite operator="out" in="SourceAlpha" in2="blur" result="inverse"/>
            <feFlood floodColor="#000000" floodOpacity="0.4" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
        </defs>
      </svg>

      <div className="w-full relative z-0">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          {/* Badge with Title */}
          <span
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#D2D2D2] text-[#434343] text-lg font-bold rounded-full"
            style={{
              boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
            }}
          >
            More articles...
            <ChevronDown className="w-5 h-5" />
          </span>
          
          {posts.length > visibleCount && (
            <div className="flex gap-4">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={!canScrollLeft}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#D9D9D9',
                  boxShadow: canScrollLeft
                    ? '3px 4px 6px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.15), inset 2px 2px 4px rgba(255, 255, 255, 0.5)'
                    : 'inset 3px 3px 6px rgba(0, 0, 0, 0.25), inset -2px -2px 4px rgba(255, 255, 255, 0.5)',
                }}
                aria-label="Previous posts"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={!canScrollRight}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#D9D9D9',
                  boxShadow: canScrollRight
                    ? '3px 4px 6px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.15), inset 2px 2px 4px rgba(255, 255, 255, 0.5)'
                    : 'inset 3px 3px 6px rgba(0, 0, 0, 0.25), inset -2px -2px 4px rgba(255, 255, 255, 0.5)',
                }}
                aria-label="Next posts"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogCard({ post }: { post: Post }) {
  const imageUrl = typeof post.heroImage === 'object' && post.heroImage?.url 
    ? post.heroImage.url 
    : null

  return (
    <a
      href={`/posts/${post.slug}`}
      className="block overflow-hidden"
    >
      {/* Image/Video Placeholder */}
      <div 
        className="aspect-video bg-[#4A4A4A] rounded-t-2xl flex items-center justify-center"
        style={{
          boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
          clipPath: 'inset(0 0 -10px 0)'
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={post.title} className="w-full h-full object-cover rounded-t-2xl" />
        ) : (
          <span className="text-white/60 text-lg">img / video</span>
        )}
      </div>

      {/* Card Content with SVG background */}
      <div 
        className="relative"
        style={{
          filter: 'drop-shadow(1.66px 2.22px 1.53px #FFFFFF)',
          marginTop: '-1px'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 406 203"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{
            filter: 'drop-shadow(1.66px 2.22px 1.53px #FFFFFF)'
          }}
        >
          <defs>
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset dx="2.5" dy="3.88" />
              <feGaussianBlur stdDeviation="1.66" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="#000000" floodOpacity="0.4" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <path 
            d="M405,0v93.38c0,13.05-10.57,23.62-23.61,23.62h-23.62c-29.45.43-53.18,24.43-53.18,53.97,0,17.69-14.34,32.03-32.03,32.03H35c-19.33,0-35-15.67-35-35V0h405Z" 
            style={{ fill: '#d9d9d8' }}
            filter="url(#innerShadow)"
          />
        </svg>
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-base text-gray-600 line-clamp-2">
              {post.meta?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...'}
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {post.publishedAt 
                ? new Date(post.publishedAt).toLocaleDateString('ro-RO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : ''}
            </span>
          </div>
        </div>

        {/* Fish icon with arrow - responsive */}
        <div
          className="absolute z-20 cursor-pointer right-[0%] bottom-[0%] group/fish"
          aria-hidden
          style={{ width: '20%', height: 'auto', aspectRatio: '1/1' }}
        >
          <div 
            className="relative w-full h-full -scale-x-100"
            style={{
              filter: 'drop-shadow(-1.66px 2.22px 1.53px #FFFFFF) url(#fishNeumorph)'
            }}
          >
            {/* Default fish - dark */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-out group-hover/fish:opacity-0"
            />
            {/* Hover fish - orange */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover/fish:opacity-100"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1500%) hue-rotate(345deg) brightness(95%) contrast(95%)',
              }}
            />
            {/* Default arrow - white */}
            <svg
              className="absolute inset-0 m-auto w-[30%] h-[30%] transition-all duration-300 ease-out group-hover/fish:opacity-0 -scale-x-100"
              style={{ color: '#D9D9D9' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
            {/* Hover state arrow - white & bigger */}
            <svg
              className="absolute inset-0 m-auto w-[38%] h-[38%] text-white opacity-0 group-hover/fish:opacity-100 transition-all duration-300 ease-out -scale-x-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}
