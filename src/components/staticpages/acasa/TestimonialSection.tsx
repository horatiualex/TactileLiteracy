'use client'

import React from 'react'

interface TestimonialCardProps {
  mentionedBy: string
  logoSrc?: string
  logoAlt?: string
  logoText?: string
  logoSubtext?: string
  title: string
  description: string
  date: string
  mediaSrc?: string
  mediaAlt?: string
  isReversed?: boolean
}

// Inverted corner SVG component - fixed 144x112px size
// Matches the Figma design exactly
const InvertedCorner: React.FC<{ className?: string; mirrored?: boolean }> = ({ className, mirrored = false }) => (
  <svg
    width="144"
    height="112"
    viewBox="0 0 144 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'block' }}
  >
    {mirrored ? (
      // Mirrored version for left side (reversed card)
      <path
        d="
          M -1 -1
          L -1 8
          A 24 24 0 0 0 24 32
          L 44 32
          A 45 45 0 0 1 94 82
          L 94 88
          A 24 24 0 0 0 118 113
          L -1 113
          Z
        "
        fill="#e1e1e1"
      />
    ) : (
      // Normal version for right side
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
    )}
  </svg>
)

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  mentionedBy,
  logoSrc,
  logoAlt,
  logoText,
  logoSubtext,
  title,
  description,
  date,
  mediaSrc,
  mediaAlt,
  isReversed = false,
}) => {
  // For normal: content on left (round left corners), media on right (round top-right)
  // For reversed: content on right (round right corners), media on left (round top-left)
  const contentRadiusClasses = isReversed
    ? 'rounded-t-3xl rounded-b-none lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none'
    : 'rounded-t-3xl rounded-b-none lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-tr-none lg:rounded-br-none'

  const mediaRadiusClasses = isReversed
    ? 'rounded-b-3xl rounded-t-none lg:rounded-tl-3xl lg:rounded-tr-none lg:rounded-bl-none lg:rounded-br-none'
    : 'rounded-b-3xl rounded-t-none lg:rounded-tr-3xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-br-none'

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      >
        {/* Content Side */}
        <div
          className={`relative flex flex-col p-8 lg:p-10 lg:w-[45%] min-h-[320px] lg:min-h-[420px] bg-[#D9D9D9] ${contentRadiusClasses}`}
          style={{
            boxShadow:
              '2px 3px 2.75px rgba(255,255,255,1), inset 3px 9px 4px rgba(0,0,0,0.4)',
          }}
        >
          {/* Mentioned by label */}
          <div className="text-xs text-gray-500 mb-2">Mentioned by:</div>
          {/* Logo */}
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoAlt || mentionedBy}
              className="h-10 lg:h-12 w-auto object-contain self-start mb-auto"
              style={{ maxWidth: '220px' }}
            />
          ) : logoText ? (
            <div className="flex flex-col items-start gap-0.5 mb-auto">
              <div
                className="w-14 h-2.5 rounded-sm mb-1"
                style={{ backgroundColor: '#5CCFB1' }}
              />
              <span
                className="font-bold text-2xl lg:text-3xl"
                style={{ color: '#3C3C3C' }}
              >
                {logoText}
              </span>
              {logoSubtext && (
                <span className="text-xl lg:text-2xl" style={{ color: '#3C3C3C' }}>
                  {logoSubtext}
                </span>
              )}
            </div>
          ) : (
            <div className="font-bold text-xl mb-auto" style={{ color: '#3C3C3C' }}>
              {mentionedBy}
            </div>
          )}
          {/* Title & Description */}
          <div className="mt-auto">
            <h3
              className="font-bold text-xl lg:text-2xl leading-tight mb-3"
              style={{ color: '#3C3C3C' }}
            >
              {title}
            </h3>
            <p
              className="text-sm lg:text-base leading-relaxed mb-4 line-clamp-2"
              style={{ color: '#6B6B6B' }}
            >
              {description}
            </p>
            <div className="text-sm" style={{ color: '#9B9B9B' }}>
              {date}
            </div>
          </div>
        </div>

        {/* Media Side */}
        <div
          className={`relative lg:w-[55%] min-h-[240px] lg:min-h-[420px] overflow-hidden ${mediaRadiusClasses}`}
        >
          {/* Dark media container */}
          <div
            className={`absolute inset-0 overflow-hidden rounded-b-3xl lg:rounded-b-none ${isReversed ? 'lg:rounded-tl-3xl' : 'lg:rounded-tr-3xl'}`}
            style={{
              backgroundColor: '#545454',
              boxShadow:
                '2px 3px 2.75px rgba(255,255,255,1), inset 3px 9px 4px rgba(0,0,0,0.4)',
            }}
          >
            {mediaSrc ? (
              <img
                src={mediaSrc}
                alt={mediaAlt || 'Testimonial media'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/50 text-lg">img / video</span>
              </div>
            )}
          </div>

          {/* Inverted corner overlay - positioned at bottom corner */}
          <InvertedCorner
            className={`absolute bottom-0 z-10 ${isReversed ? 'left-0' : 'right-0'}`}
            mirrored={isReversed}
          />

          {/* Fish icon with arrow - positioned at the corner */}
          <div
            className={`absolute z-20 cursor-pointer group bottom-0 ${isReversed ? 'left-0' : 'right-0'}`}
            aria-hidden
          >
            <div className={`relative w-[72px] h-[72px] ${isReversed ? 'scale-x-100' : '-scale-x-100'}`}>
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
    </div>
  )
}

export default function TestimonialSection() {
  const testimonials: TestimonialCardProps[] = [
    {
      mentionedBy: 'MUZEUL MUNICIPIULUI BUCUREȘTI',
      logoText: 'Muzeul Taranului Roman',
      logoSubtext: 'București',
      title: 'Titlu articol, articol despre moduri de învățare',
      description: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do...',
      date: '4 Noiembrie, 2025',
      isReversed: false,

    },
    {
      mentionedBy: 'Hewlett Packard Enterprise',
      logoText: 'Hewlett Packard',
      logoSubtext: 'Enterprise',
      title: 'Titlu articol, articol despre moduri de învățare',
      description: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do...',
      date: '4 Noiembrie, 2025',
      isReversed: true,
    },
  ]

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      {/* Badge */}
      <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: '#E1E1E1',
            color: '#3C3C3C',
            boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
          }}
        >
          Ce zic alții de noi
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="w-full px-8 lg:px-16 pt-16 space-y-10">
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>
    </section>
  )
}
