'use client'
import React from 'react'
import type { Library } from '@/payload-types'
import RichText from '@/components/RichText'
import { Edit3, Download } from 'lucide-react'

interface LibraryImageDescriptionProps {
  item: Library
}

export default function LibraryImageDescription({ item }: LibraryImageDescriptionProps) {
  if (!item.imageDescription) return null

  const tactileImageUrl =
    typeof item.tactileImage === 'object' && item.tactileImage?.url ? item.tactileImage.url : null

  return (
    <section className="w-full bg-[#434343] py-16 overflow-hidden">
      <div className="w-full px-8 lg:px-16">
        {/* Badge */}
        <div className="mb-8">
          <span
            className="inline-block px-8 py-3 bg-[#434343] text-white text-lg rounded-full"
            style={{
              boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.1)',
            }}
          >
            Descriere Imagine
          </span>
        </div>
      </div>

      <div className="w-full">
        <div className="grid gap-0 lg:grid-cols-[40%,60%]">
          {/* Left side - Fish shape with tactile image inside */}
          <div className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-start bg-[#434343]">
            <div className="w-full lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-start">
              {/* Wrapper to maintain aspect ratio and prevent stretching */}
              <div className="relative w-full aspect-[1.1] lg:w-auto lg:h-full lg:max-w-full">
                {/* Fish SVG mask with white fill */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `url(#fishClipPathImageDesc)`,
                    WebkitClipPath: `url(#fishClipPathImageDesc)`,
                    backgroundColor: 'white',
                    filter: 'url(#fish-inner-shadow-desc)',
                  }}
                >
                  {/* Tactile image inside fish, clipped */}
                  <div className="absolute inset-0 flex items-center justify-center pb-32 pt-32">
                    {tactileImageUrl ? (
                      <img
                        src={tactileImageUrl}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-lg">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SVG definition for clip path */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                  <defs>
                    <clipPath id="fishClipPathImageDesc" clipPathUnits="objectBoundingBox">
                      <path d="M-0.0376,0 L0.2237,-0.0000129 L0.2237,0.1711 C0.3041,0.0664 0.4224,0 0.5545,0 C0.7959,0.0000268 0.9910,0.2211 0.9910,0.4937 C0.9910,0.7664 0.7973,0.9875 0.5545,0.9875 C0.4224,0.9875 0.3041,0.9211 0.2237,0.8164 L0.2237,0.9875 L-0.0376,0.9875 L-0.0376,0 Z" />
                    </clipPath>
                    <filter id="fish-inner-shadow-desc" x="-50%" y="-50%" width="200%" height="200%">
                      <feFlood flood-opacity="0.6" flood-color="black" result="flood1" />
                      <feComposite in="flood1" in2="SourceAlpha" operator="out" result="shadow1_out" />
                      <feGaussianBlur in="shadow1_out" stdDeviation="6" result="shadow1_blur" />
                      <feOffset in="shadow1_blur" dx="6" dy="8" result="shadow1_offset" />
                      <feComposite in="shadow1_offset" in2="SourceAlpha" operator="in" result="shadow1_final" />
                      <feFlood flood-opacity="0.3" flood-color="black" result="flood2" />
                      <feComposite in="flood2" in2="SourceAlpha" operator="out" result="shadow2_out" />
                      <feGaussianBlur in="shadow2_out" stdDeviation="4" result="shadow2_blur" />
                      <feOffset in="shadow2_blur" dx="-4" dy="-4" result="shadow2_offset" />
                      <feComposite in="shadow2_offset" in2="SourceAlpha" operator="in" result="shadow2_final" />
                      <feMerge>
                        <feMergeNode in="SourceGraphic" />
                        <feMergeNode in="shadow1_final" />
                        <feMergeNode in="shadow2_final" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>          {/* Right side - Scrollable text area */}
          <div className="relative text-[#D9D9D9] px-8 lg:px-16 flex flex-col">
            {/* Scrollable content */}
            <div className="relative">
              <div
                className="flex-1 overflow-y-auto pr-4 mb-8"
                style={{
                  maxHeight: 'calc(100vh - 400px)',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#7A7A7A #2A2A2A',
                }}
              >
                <div
                  className="prose prose-lg max-w-none text-[#D9D9D9] prose-p:!text-[#D9D9D9] prose-strong:!text-white prose-li:!text-[#D9D9D9] prose-ul:!text-[#D9D9D9] prose-ol:!text-[#D9D9D9] prose-headings:!text-white"
                  style={{ color: '#D9D9D9' }}
                >
                  <RichText data={item.imageDescription} enableGutter={false} />
                </div>
              </div>
              {/* Fade gradient overlay */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
                style={{
                  background: 'linear-gradient(to top, #434343 0%, transparent 100%)',
                }}
              />
            </div>


          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-gray-600/30">
            <button
              type="button"
              onClick={() => {
                /* TODO: implement edit */
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9D9D9] text-gray-900 text-base font-medium hover:bg-[#E0E0E0] transition"
              style={{
                boxShadow: '4px 4px 8px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.15)',
              }}
            >
              <Edit3 size={18} />
              Editează
            </button>

            <a
              href={tactileImageUrl || '#'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A5A5A] text-white text-base font-medium hover:bg-[#656565] transition"
              style={{
                boxShadow: '4px 4px 8px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.15)',
              }}
              download
            >
              <Download size={18} />
              Descarcă
            </a>
          </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #7a7a7a;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #8a8a8a;
        }
      `}</style>
    </section>
  )
}
