import React from 'react'

interface HeroSectionProps {
  title: string
  description: string
  buttonText: string
  imagePosition: 'left' | 'right'
  imageSrc: string
  imageAlt: string
}

export default function HeroSection({
  title,
  description,
  buttonText,
  imagePosition,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  const isImageRight = imagePosition === 'right'

  return (
    <section className="relative w-full min-h-screen flex items-center">
      <div
        className={`w-full ${
          isImageRight ? 'pl-8 lg:pl-16 pr-[60%]' : 'pr-8 lg:pr-16 pl-[60%]'
        }`}
      >
        <div
          className={`space-y-6 z-10 max-w-2xl ${!isImageRight ? 'ml-auto' : ''}`}
          style={{ color: '#D9D9D9' }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
          <p className="text-lg leading-relaxed">{description}</p>
          <button
            className="px-8 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-full font-medium transition-colors duration-200"
            style={{
              boxShadow:
                '3px 6px 6px rgba(0, 0, 0, 0.5), inset 3px 3.5px 2.5px rgba(255, 255, 255, 1)',
            }}
          >
            {buttonText}
          </button>
        </div>
        <div
          className={`absolute ${isImageRight ? 'right-0' : 'left-0'} top-0 w-[60vw] max-w-[1100px] h-[90vh] max-h-[900px]`}
        >
          <div
            className="w-full h-full"
            style={{
              position: 'relative',
              filter: 'drop-shadow(1.42px 2.86px 2.86px rgba(255, 255, 255, 0.7))',
            }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                WebkitMaskImage: 'url(/mask-shape.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'right center',
                maskImage: 'url(/mask-shape.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'right center',
                transform: isImageRight ? undefined : 'scaleX(-1)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
