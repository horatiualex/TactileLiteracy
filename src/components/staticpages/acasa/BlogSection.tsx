'use client'

import React from 'react'

interface BlogCardProps {
  title: string
  description: string
  date: string
  mediaSrc?: string
  mediaAlt?: string
}

// Inverted corner SVG component - same as TestimonialSection
const InvertedCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="144"
    height="112"
    viewBox="0 0 144 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'block' }}
  >
    <path
      d="
        M 145 -1
        L 145 8
        A 24 24 0 0 1 120 32
        L 100 32
        A 45 45 0 0 0 50 82
        L 50 88
        A 24 24 0 0 1 26 113
        L 145 113
        Z
      "
      fill="#e1e1e1"
    />
  </svg>
)

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  date,
  mediaSrc,
  mediaAlt,
}) => {
  return (
    <div className="relative flex flex-col rounded-3xl overflow-hidden h-full">
      {/* Media Section */}
      <div
        className="relative w-full aspect-[4/3] rounded-t-3xl overflow-hidden"
        style={{
          backgroundColor: '#545454',
        }}
      >
        {mediaSrc ? (
          <img
            src={mediaSrc}
            alt={mediaAlt || 'Blog media'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/50 text-lg">img / video</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className="relative flex flex-col flex-1 p-6 rounded-b-3xl"
        style={{
          backgroundColor: '#D9D9D9',
          boxShadow:
            '2px 3px 2.75px rgba(255,255,255,1), inset 3px 9px 4px rgba(0,0,0,0.4)',
        }}
      >
        {/* Title */}
        <h3
          className="font-bold text-lg leading-tight mb-2"
          style={{ color: '#3C3C3C' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: '#6B6B6B' }}
        >
          {description}
        </p>

        {/* Date - pushed to bottom */}
        <div className="mt-auto text-sm" style={{ color: '#9B9B9B' }}>
          {date}
        </div>

        {/* Inverted corner overlay - same as TestimonialSection */}
        <InvertedCorner className="absolute bottom-0 right-0 z-10" />

        {/* Fish icon with arrow - same as TestimonialSection */}
        <div
          className="absolute z-20 cursor-pointer group right-0 bottom-0"
          aria-hidden
        >
          <div className="relative w-[72px] h-[72px] -scale-x-100">
            {/* Default fish - dark */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-out group-hover:opacity-0"
            />
            {/* Hover fish - orange */}
            <img
              src="/assets/acasa/pestisor.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1500%) hue-rotate(345deg) brightness(95%) contrast(95%)',
              }}
            />
            {/* Default arrow - gray */}
            <svg
              className="absolute inset-0 m-auto w-7 h-7 transition-all duration-300 ease-out group-hover:opacity-0 -scale-x-100"
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
              className="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out -scale-x-100"
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
    </div>
  )
}

export default function BlogSection() {
  const blogPosts: BlogCardProps[] = [
    {
      title: 'Titlu articol, articol despre moduri de învățare',
      description: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do...',
      date: '4 Noiembrie, 2025',
    },
    {
      title: 'Titlu articol, articol despre moduri de învățare',
      description: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do...',
      date: '4 Noiembrie, 2025',
    },
    {
      title: 'Titlu articol, articol despre moduri de învățare',
      description: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do...',
      date: '4 Noiembrie, 2025',
    },
  ]

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      {/* Badge */}
      <div className="w-full px-8 lg:px-16 mb-10">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: '#E1E1E1',
            color: '#3C3C3C',
            boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
          }}
        >
          Latest News
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>

      {/* Mai multe articole Button */}
      <div className="w-full px-8 lg:px-16 mt-12 flex justify-center">
        <button
          className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
          style={{
            backgroundColor: '#545454',
            color: '#FFFFFF',
            boxShadow:
              '2px 3px 2.75px rgba(255,255,255,1), inset 2px 4px 2px rgba(0,0,0,0.4)',
          }}
        >
          Mai multe articole
        </button>
      </div>
    </section>
  )
}
