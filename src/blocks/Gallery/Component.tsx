'use client'

import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'

type MediaObject = {
  url?: string
  alt?: string
  width?: number
  height?: number
  filename?: string
  id?: string
  updatedAt?: string
  createdAt?: string
  [key: string]: unknown
}

type GalleryImage = {
  image?: MediaObject
  caption?: string
}

type Props = {
  className?: string
  title?: string
  description?: string
  images?: GalleryImage[]
  layout?: 'masonry' | 'grid' | 'featured'
  columns?: 'auto' | '2' | '3' | '4' | '5'
  enableLightbox?: boolean
}

export const GalleryBlockComponent: React.FC<Props> = ({ 
  className, 
  title, 
  description,
  images, 
  layout = 'masonry',
  columns = 'auto',
  enableLightbox = true
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen || !images) return

    const nextImage = () => {
      setLightboxIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
      setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, images])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])

  if (!images || images.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    if (images) {
      setLightboxIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images) {
      setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const getGridClasses = () => {
    if (layout === 'masonry') {
      const colsMap = {
        'auto': 'columns-2 md:columns-3 lg:columns-4 xl:columns-5',
        '2': 'columns-2',
        '3': 'columns-3',
        '4': 'columns-4',
        '5': 'columns-5',
      }
      return `${colsMap[columns]} gap-4 space-y-4`
    }
    
    if (layout === 'grid') {
      const gridMap = {
        'auto': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        '2': 'grid-cols-2',
        '3': 'grid-cols-3',
        '4': 'grid-cols-4',
        '5': 'grid-cols-5',
      }
      return `grid ${gridMap[columns]} gap-4`
    }

    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
  }

  return (
    <div className={`container ${className || ''}`}>
      {title && (
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}
      
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {description}
        </p>
      )}

      <div className={getGridClasses()}>
        {images.map((imageItem: GalleryImage, index: number) => {
          if (!imageItem || typeof imageItem.image !== 'object' || !imageItem.image) return null
          
          const { image, caption } = imageItem
          
          return (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-lg ${
                layout === 'masonry' ? 'break-inside-avoid mb-4' : 
                layout === 'grid' ? 'aspect-square' : 
                index === 0 ? 'aspect-[2/1] md:aspect-square' : 'aspect-square'
              } ${enableLightbox ? 'cursor-pointer' : ''}`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative w-full h-full ${layout === 'grid' ? 'h-full' : ''}`}>
                <Media
                  // @ts-expect-error - Media component expects Payload Media type
                  resource={image}
                  fill={layout === 'grid'}
                  className={`w-full h-full transition-transform duration-300 ${
                    layout === 'grid' ? 'object-cover' : 
                    layout === 'masonry' ? 'object-cover' : 'object-cover'
                  } ${enableLightbox ? 'group-hover:scale-105' : ''}`}
                />
                
                {/* Overlay */}
                {enableLightbox && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              {caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-sm font-medium">{caption}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && enableLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 overflow-hidden"
          onClick={closeLightbox}
          style={{ 
            width: '100vw', 
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
              overflow: 'hidden'
            }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Current image container */}
            <div className="max-w-full max-h-full w-full h-full flex items-center justify-center px-16 py-16">
              {images[lightboxIndex] && images[lightboxIndex].image && (
                <div className="relative flex items-center justify-center" style={{ 
                  maxWidth: 'calc(100vw - 8rem)', 
                  maxHeight: 'calc(100vh - 8rem)',
                  width: '100%',
                  height: '100%'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={typeof images[lightboxIndex].image === 'object' && images[lightboxIndex].image?.url 
                      ? images[lightboxIndex].image.url 
                      : ''}
                    alt={images[lightboxIndex].image?.alt || ''}
                    className="block max-w-full max-h-full w-auto h-auto object-contain"
                    style={{
                      maxWidth: 'calc(100vw - 8rem)',
                      maxHeight: 'calc(100vh - 8rem)',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement
                      const maxW = window.innerWidth - 128 // 8rem = 128px
                      const maxH = window.innerHeight - 128
                      
                      if (img.naturalWidth > maxW || img.naturalHeight > maxH) {
                        const ratioW = maxW / img.naturalWidth
                        const ratioH = maxH / img.naturalHeight
                        const ratio = Math.min(ratioW, ratioH)
                        
                        img.style.width = `${img.naturalWidth * ratio}px`
                        img.style.height = `${img.naturalHeight * ratio}px`
                      }
                    }}
                    onError={(e) => {
                      console.error('Failed to load image:', e)
                      const img = e.target as HTMLImageElement
                      img.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Caption in lightbox */}
            {images[lightboxIndex]?.caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                <p className="text-white text-lg bg-black bg-opacity-50 rounded px-4 py-2 inline-block">
                  {images[lightboxIndex].caption}
                </p>
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded px-3 py-1 text-sm z-10">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
