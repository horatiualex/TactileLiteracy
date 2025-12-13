'use client'
import React from 'react'
import type { Library } from '@/payload-types'
import RichText from '@/components/RichText'
import { Edit3, Download } from 'lucide-react'

interface LibraryRelevantDataProps {
  item: Library
}

export default function LibraryRelevantData({ item }: LibraryRelevantDataProps) {
  if (!item.relevantData) return null

  const realImageUrl =
    typeof item.realImage === 'object' && item.realImage?.url ? item.realImage.url : null

  return (
    <section className="w-full bg-[#D2D2D2] py-16 pl-8 lg:pl-16 overflow-hidden">
      <div className="w-full grid gap-0 lg:grid-cols-[55%,45%]">
        {/* Left side - Content with scrollable text (NO BACKGROUND) */}
        <div className="relative text-[#2B2B2B] pr-8 lg:pr-12 flex flex-col">
          {/* Badge */}
          <div className="mb-6 -mt-2 lg:-mt-4">
            <span
              className="inline-block px-8 py-3 bg-[#D9D9D9] text-[#434343] text-lg font-bold rounded-full"
              style={{
                boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
              }}
            >
              Date Relevante
            </span>
          </div>

          {/* Scrollable content area */}
          <div className="relative">
            <div
              className="flex-1 overflow-y-auto pr-4 mb-8"
              style={{
                maxHeight: 'calc(100vh - 400px)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#7A7A7A #C8C8C8',
              }}
            >
              <div
                className="prose prose-lg max-w-none text-[#2B2B2B] prose-p:!text-[#2B2B2B] prose-strong:!text-[#1F1F1F] prose-li:!text-[#2B2B2B] prose-ul:!text-[#2B2B2B] prose-ol:!text-[#2B2B2B]"
                style={{ color: '#2B2B2B' }}
              >
                <RichText data={item.relevantData} enableGutter={false} />
              </div>
            </div>
            {/* Fade gradient overlay */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
              style={{
                background: 'linear-gradient(to top, #D2D2D2 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-gray-400/30 mb-8 lg:mb-0">
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
              href={realImageUrl || '#'}
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

        {/* Right side - Fish shape with real image, sticking to screen edge */}
         <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
          {/* Fish SVG mask - flipped horizontally */}
          <div
            className="absolute inset-0 scale-x-[-1]"
            style={{
              clipPath: `url(#fishClipPath)`,
              WebkitClipPath: `url(#fishClipPath)`,
              filter: 'url(#fish-inner-shadow)',
            }}
          >
            {realImageUrl ? (
              <img
                src={realImageUrl}
                alt="Imagine reală"
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="w-full h-full bg-[#434343]" />
            )}
          </div>

          {/* SVG definition for clip path */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <clipPath id="fishClipPath" clipPathUnits="objectBoundingBox">
                <path d="M-0.0376,0 L0.2237,-0.0000129 L0.2237,0.1711 C0.3041,0.0664 0.4224,0 0.5545,0 C0.7959,0.0000268 0.9910,0.2211 0.9910,0.4937 C0.9910,0.7664 0.7973,0.9875 0.5545,0.9875 C0.4224,0.9875 0.3041,0.9211 0.2237,0.8164 L0.2237,0.9875 L-0.0376,0.9875 L-0.0376,0 Z" />
              </clipPath>
              <filter id="fish-inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
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

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #c8c8c8;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #7a7a7a;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #6a6a6a;
        }
      `}</style>
    </section>
  )
}
