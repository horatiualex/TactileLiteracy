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
    <section className="relative w-full lg:h-[90vh] lg:max-h-[900px] flex items-center pt-32 lg:pt-0 overflow-hidden">
      <div
        className={`w-full flex flex-col lg:block px-8 lg:px-0 ${
          isImageRight ? 'lg:pl-16 lg:pr-[60%]' : 'lg:pr-16 lg:pl-[60%]'
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
          className={`
            relative w-full h-[50vh] mt-8
            lg:absolute lg:top-0 lg:mt-0 lg:h-[90vh] lg:max-h-[900px] lg:w-[60vw] lg:max-w-[1100px]
            ${isImageRight ? 'lg:right-0' : 'lg:left-0'}
          `}
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
              className="w-full h-full object-cover"
              style={{
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
