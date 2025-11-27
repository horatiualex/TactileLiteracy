
'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const timelineItems = [
  {
    year: '2014',
    title: 'Începutul',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    opacity: 1,
  },
  {
    year: '2019',
    title: 'Primele imagini',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    opacity: 1,
  },
  {
    year: '2023',
    title: 'Începutul',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    opacity: 1,
  },
  {
    year: '2050',
    title: 'Începutul',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    opacity: 0.4,
  },
] as const

// Removed drop-shadow constants - using box-shadow on wrapper divs instead

export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const fishRefs = useRef<(HTMLImageElement | null)[]>([])
  const [lineTop, setLineTop] = useState<number | null>(null)

  const setFishRef = useCallback((index: number) => {
    return (node: HTMLImageElement | null) => {
      fishRefs.current[index] = node
    }
  }, [])

  const updateLinePosition = useCallback(() => {
    const section = timelineRef.current?.closest('section')
    if (!section) return

    const sectionRect = section.getBoundingClientRect()
    const firstFish = fishRefs.current.find(Boolean)

    if (!firstFish) return

    const fishRect = firstFish.getBoundingClientRect()
    const offset = fishRect.top - sectionRect.top + fishRect.height / 2
    setLineTop(offset)
  }, [])

  useEffect(() => {
    updateLinePosition()

    const resizeObserver = new ResizeObserver(() => updateLinePosition())

    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current)
    }

    fishRefs.current.forEach((fish) => {
      if (fish) resizeObserver.observe(fish)
    })

    window.addEventListener('resize', updateLinePosition)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateLinePosition)
    }
  }, [updateLinePosition])

  const renderedItems = useMemo(
    () =>
      timelineItems.map((item, index) => (
        <div
          key={item.year}
          className="relative flex flex-col items-center text-center px-6 py-12"
        >
          <img
            ref={setFishRef(index)}
            src="/assets/acasa/pestisor.svg"
            alt=""
            className="w-12 h-12 mb-4 relative z-10"
            style={{
              opacity: item.opacity,
            }}
          />
          <div className="font-bold text-2xl mb-3" style={{ color: '#3C3C3C' }}>
            {item.year}
          </div>
          <h3 className="font-semibold text-base mb-2" style={{ color: '#3C3C3C' }}>
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#4E4E4E' }}>
            {item.description}
          </p>
        </div>
      )),
    [setFishRef],
  )

  return (
    <section
      className="relative w-full py-20 overflow-visible"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium border shadow-sm"
          style={{
            backgroundColor: '#E1E1E1',
            color: '#3C3C3C',
            borderColor: '#BEBEBE',
            boxShadow: 'inset 4px 4px 6px rgba(0, 0, 0, 0.3), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
          }}
        >
          Istoria noastră
        </div>
      </div>

      <div className="w-full" ref={timelineRef}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-0 items-center">
          <div className="relative flex items-center justify-start py-20 lg:py-0 z-10">
            <div
              className="relative -ml-4 lg:-ml-10"
              style={{
                width: 'clamp(340px, 40vw, 560px)',
                height: 'clamp(340px, 40vw, 560px)',
              }}
            >
              <img
                src="/assets/acasa/pestisor.svg"
                alt="Misiune background"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-center px-12">
                <h2 className="font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  Educație incluzivă și independentă pentru toții!
                </h2>
              </div>
            </div>
          </div>

          {renderedItems}
        </div>

        <div
          className="hidden lg:block absolute left-0 right-0 h-0.5 bg-[#3C3C3C]"
          style={{
            top: lineTop ?? 0,
            zIndex: 5,
            opacity: lineTop ? 1 : 0,
            transition: 'top 150ms ease, opacity 150ms ease',
          }}
        ></div>
      </div>
    </section>
  )
}
