"use client"
import React, { useState } from 'react'
import type { Library } from '@/payload-types'
import { Download, Printer, ShoppingBag, Edit3 } from 'lucide-react'

interface LibraryDetailHeroProps {
  item: Library
}

const adaptedIconConfig = {
  blind: {
    bg: '#E53935',
    icon: '/assets/library/blind.svg',
    label: 'Nevăzători',
    invert: true,
  },
  deaf: {
    bg: '#FFC107',
    icon: '/assets/library/deaf.tif.svg',
    label: 'Surzi',
    invert: false,
  },
  neurodivergent: {
    bg: '#03A9F4',
    icon: '/assets/library/neurodivergent.svg',
    label: 'Neurodivergenți',
    invert: true,
  },
}

const difficultyLabelMap: Record<string, string> = {
  easy: 'Ușor',
  medium: 'Mediu',
  hard: 'Dificil',
}

export default function LibraryDetailHero({ item }: LibraryDetailHeroProps) {
  const tactileImageUrl =
    typeof item.tactileImage === 'object' && item.tactileImage?.url ? item.tactileImage.url : undefined

  const downloadUrl =
    typeof item.downloadFile === 'object' && item.downloadFile?.url ? item.downloadFile.url : tactileImageUrl

  const categoryLabels = (item.categories || [])
    .map((category) => (typeof category === 'object' ? category.title : ''))
    .filter(Boolean)
    .slice(0, 1)

  const difficultyLabel = item.difficultyLevel ? difficultyLabelMap[item.difficultyLevel] : null

  // Get primary adapted icon for sidebar
  const primaryAdaptedFor = Array.isArray(item.adaptedFor) && item.adaptedFor.length > 0 ? item.adaptedFor[0] : null
  const primaryConfig = primaryAdaptedFor ? adaptedIconConfig[primaryAdaptedFor as keyof typeof adaptedIconConfig] : null

  const [quantity, setQuantity] = useState(1)

  const handlePrint = () => {
    if (!tactileImageUrl) return
    const printWindow = window.open(tactileImageUrl, '_blank', 'noopener,noreferrer')
    if (printWindow) {
      printWindow.focus()
      printWindow.onload = () => {
        try {
          printWindow.print()
        } catch (error) {
          console.error('Failed to trigger print dialog', error)
        }
      }
    }
  }

  return (
    <section className="w-full bg-[#D2D2D2] py-16 px-8 lg:px-16">
      <div className="w-full grid gap-0 lg:grid-cols-[2fr,1fr]">
        {/* Left side - Image Card */}
        <div
          className="relative rounded-t-[40px] lg:rounded-tr-none lg:rounded-l-[40px] bg-white border border-[#CFCFCF]"
          style={{
            boxShadow: 'inset 4.82px 6.47px 2.77px rgba(0, 0, 0, 0.5), inset 0px 0px 0px rgba(0, 0, 0, 0.5)',
            filter: 'drop-shadow(3.7px 3.7px 2.77px #FFFFFF)',
          }}
        >

          {/* Main tactile image */}
          <div className="flex h-full items-center justify-center p-12 lg:p-16">
            {tactileImageUrl ? (
              <img src={tactileImageUrl} alt={item.title} className="max-h-full w-full object-contain" />
            ) : (
              <div className="text-gray-500 text-lg">Imaginea tactilă lipsește</div>
            )}
          </div>
        </div>

        {/* Right side - Dark sidebar */}
        <div
          className="relative rounded-b-[40px] lg:rounded-bl-none lg:rounded-r-[40px] bg-[#434343] text-white p-8 lg:p-10 flex flex-col"
          style={{
            boxShadow: 'inset 4.82px 6.47px 2.77px rgba(0, 0, 0, 0.5), inset 0px 0px 0px rgba(0, 0, 0, 0.5)',
            filter: 'drop-shadow(3.7px 3.7px 2.77px #FFFFFF)',
          }}
        >
          {/* Top row: Primary icon + Edit & Download buttons */}
          <div className="flex items-start justify-between gap-3 mb-6">
            {primaryConfig ? (
              <div
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: primaryConfig.bg,
                  boxShadow:
                    'inset 4px 4px 8px rgba(0,0,0,0.45), inset -2px -2px 6px rgba(255,255,255,0.25), inset 0 0 12px rgba(0,0,0,0.3)',
                }}
                title={primaryConfig.label}
                aria-label={primaryConfig.label}
              >
                <img
                  src={primaryConfig.icon}
                  alt=""
                  className={`w-8 h-8 lg:w-10 lg:h-10 ${primaryConfig.invert ? 'brightness-0 invert' : ''}`}
                />
              </div>
            ) : (
              <div className="w-14 h-14 lg:w-16 lg:h-16" />
            )}

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {/* TODO: implement edit */}}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9D9D9] text-gray-900 text-base font-medium hover:bg-[#E0E0E0] transition"
                style={{
                  boxShadow: '4px 4px 8px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.15)',
                }}
              >
                <Edit3 size={18} />
                Editează
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5A5A5A] text-white text-base font-medium hover:bg-[#656565] transition"
                  style={{
                    boxShadow: '4px 4px 8px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.15)',
                  }}
                  download
                >
                  <Download size={18} />
                  Descarcă
                </a>
              )}
            </div>
          </div>

          {/* Title and description */}
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">{item.title}</h1>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              {item.shortDescription || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'}
            </p>
          </div>

          {/* Action buttons at bottom */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={handlePrint}
              disabled={!tactileImageUrl}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full text-base font-bold bg-[#D9D9D9] text-gray-900 hover:bg-[#E0E0E0] disabled:opacity-60 disabled:cursor-not-allowed transition whitespace-nowrap"
              style={{
                boxShadow: '5px 5px 10px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.2)',
              }}
            >
              <Printer size={24} strokeWidth={2.5} />
              Use your printer
            </button>

            <div
              className="inline-flex items-center rounded-full bg-[#D9D9D9]"
              style={{
                boxShadow: '5px 5px 10px rgba(0,0,0,0.5), -3px -3px 6px rgba(255,255,255,0.2)',
              }}
            >
              <a
                href=""
                onClick={(event) => event.preventDefault()}
                className="inline-flex items-center gap-3 px-6 py-3.5 text-base font-bold text-gray-900 hover:bg-[#E0E0E0] transition whitespace-nowrap rounded-l-full"
              >
                <ShoppingBag size={24} strokeWidth={2.5} />
                Order print
              </a>
              
              <div className="w-px h-8 bg-gray-400/30" />
              
              <div className="flex items-center justify-center bg-[#525252] rounded-full px-4 py-2 ml-1 mr-1 my-1 gap-1.5">
                <span className="text-white font-bold text-base min-w-[1.5rem] text-center">
                  {quantity}
                </span>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white hover:text-gray-200 transition leading-none"
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M1 7 L6 2 L11 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white hover:text-gray-200 transition leading-none"
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M1 1 L6 6 L11 1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
