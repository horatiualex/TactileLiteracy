'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

interface StepData {
  number: string
  title: string
  description: string
  mediaLabel: string
  orientation: 'left' | 'right'
  hasTopTab?: boolean
}

interface ConnectorState {
  width: number
  height: number
  paths: string[]
}

const steps: StepData[] = [
  {
    number: '1',
    title: 'Descarcă aplicația',
    description:
      'Descarcă aplicația gratuită Tactile Literacy din App Store sau Google Play. Aplicația este disponibilă pentru dispozitive iOS și Android.',
    mediaLabel: 'img  /  video',
    orientation: 'left',
  },
  {
    number: '2',
    title: 'Explorează biblioteca',
    description:
      'Accesează biblioteca cu peste 800 de imagini tactile din diverse domenii: hărți, obiecte, portrete, vehicule și multe altele.',
    mediaLabel: 'img  /  video',
    orientation: 'right',
    hasTopTab: true,
  },
  {
    number: '3',
    title: 'Printează imagini',
    description:
      'Printează imaginile tactile folosind imprimanta Tactile Printer One sau tehnica manuală cu seringă și lipici pentru lemn.',
    mediaLabel: 'img  /  video',
    orientation: 'left',
  },
  {
    number: '4',
    title: 'Scanează QR Code-ul',
    description:
      'Folosește aplicația pentru a scana codul QR de pe imaginea tactilă imprimată. Acest cod va lansa descrierile audio și video.',
    mediaLabel: 'img  /  video',
    orientation: 'right',
  },
  {
    number: '5',
    title: 'Explorează prin atingere',
    description:
      'Atinge diferitele zone ale imaginii reliefate pentru a auzi explicații audio detaliate sau a urmări interpretări în limbajul semnelor.',
    mediaLabel: 'img  /  video',
    orientation: 'left',
  },
  {
    number: '6',
    title: 'Învață independent',
    description:
      'Elevii pot studia în propriul ritm, explorând singuri lumea vizuală prin atingere, sunet și limbaj semnelor, fără să depindă constant de un asistent.',
    mediaLabel: 'img  /  video',
    orientation: 'right',
  },
   {
    number: '7',
    title: 'Creează conținut personalizat',
    description:
      'Folosește Image Creator de pe platformă pentru a crea propriile imagini tactile interactive cu descrieri personalizate în mai multe limbi.',
    mediaLabel: 'img  /  video',
    orientation: 'left',
  },
]

type AnchorSetter = (index: number) => (node: HTMLDivElement | null) => void

const HowToSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const startAnchors = useRef<(HTMLDivElement | null)[]>([])
  const endAnchors = useRef<(HTMLDivElement | null)[]>([])
  const [connectorState, setConnectorState] = useState<ConnectorState>({
    width: 0,
    height: 0,
    paths: [],
  })

  const registerStartAnchor: AnchorSetter = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      startAnchors.current[index] = node
    },
    [],
  )

  const registerEndAnchor: AnchorSetter = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      endAnchors.current[index] = node
    },
    [],
  )

  const updatePaths = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setConnectorState({ width: 0, height: 0, paths: [] })
      return
    }

    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const newPaths: string[] = []

    for (let i = 0; i < steps.length - 1; i += 1) {
      const startEl = startAnchors.current[i]
      const endEl = endAnchors.current[i + 1]

      if (!startEl || !endEl) {
        newPaths.push('')
        continue
      }

      const startRect = startEl.getBoundingClientRect()
      const endRect = endEl.getBoundingClientRect()

      const rawStartX = startRect.left + startRect.width / 2 - containerRect.left
      let startX = rawStartX
      const startY = startRect.top + startRect.height / 2 - containerRect.top
      const endX = endRect.left + endRect.width / 2 - containerRect.left
      const endY = endRect.top + endRect.height / 2 - containerRect.top

      const horizontalDir = endX >= rawStartX ? 1 : -1
      const verticalDir = endY >= startY ? 1 : -1
      const startExtension = 65
      startX = rawStartX - horizontalDir * startExtension
      const availableRadius = Math.min(Math.abs(endX - startX), Math.abs(endY - startY)) / 2
      const radius = Math.max(24, Math.min(64, availableRadius || 24))

      const preCornerX = endX - horizontalDir * radius
      const preCornerY = startY
      const postCornerX = endX
      const postCornerY = startY + verticalDir * radius

      const path = `M ${startX} ${startY} L ${preCornerX} ${preCornerY} Q ${endX} ${startY} ${postCornerX} ${postCornerY} L ${endX} ${endY}`
      newPaths.push(path)
    }

    setConnectorState({
      width: containerRect.width,
      height: containerRect.height,
      paths: newPaths,
    })
  }, [])

  useEffect(() => {
    const handleResize = () => updatePaths()

    const rafId = window.requestAnimationFrame(updatePaths)
    const timeoutId = window.setTimeout(updatePaths, 320)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(timeoutId)
    }
  }, [updatePaths])

  const StepItems = useMemo(
    () =>
      steps.map((step, index) => (
        <StepItem
          key={step.number}
          step={step}
          index={index}
          setStartAnchor={registerStartAnchor}
          setEndAnchor={registerEndAnchor}
        />
      )),
    [registerEndAnchor, registerStartAnchor],
  )

  return (
    <section className="relative w-full py-24" style={{ backgroundColor: '#2F2F2F' }}>
      <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20 mb-12">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: '#2F2F2F',
            color: '#F5F5F5',
            boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.1)'
          }}
        >
          Cum funcționează
        </div>
      </div>

      <div className="relative w-full mx-auto pl-8 pr-6 lg:pl-16 lg:pr-12 pt-16" ref={containerRef}>
        {connectorState.width > 0 && connectorState.height > 0 && (
          <svg
            className="hidden lg:block absolute inset-0 pointer-events-none"
            width={connectorState.width}
            height={connectorState.height}
            viewBox={`0 0 ${connectorState.width} ${connectorState.height}`}
            preserveAspectRatio="none"
          >
            {connectorState.paths.map((path, index) =>
              path ? (
                <path
                  key={`connector-${index}`}
                  d={path}
                  stroke="#EAEAEA"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                />
              ) : null,
            )}
          </svg>
        )}

        
        <div className="flex flex-col gap-16 lg:gap-20">
          {StepItems}

          <div className="flex justify-center mt-12 lg:mt-16">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm lg:text-base font-medium"
              style={{
                backgroundColor: '#D9D9D9',
                color: '#222',
                boxShadow: '3px 6px 6px 0 rgba(0,0,0,0.5), inset 3px 3.5px 2.5px 0 rgba(255,255,255,1)',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              Get your image
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepItemProps {
  step: StepData
  index: number
  setStartAnchor: AnchorSetter
  setEndAnchor: AnchorSetter
}

const StepItem: React.FC<StepItemProps> = ({ step, index, setStartAnchor, setEndAnchor }) => {
  const isLeft = step.orientation === 'left'
  const mediaWidth = 'clamp(260px, 32vw, 420px)'
  const mediaHeight = 'clamp(260px, 32vw, 420px)'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div
        className={`relative flex justify-center order-2 ${
          isLeft ? 'lg:justify-start lg:order-1' : 'lg:justify-end lg:order-2'
        }`}
      >
        <div
          className="relative"
          style={{
            width: mediaWidth,
            height: mediaHeight,
            marginLeft: isLeft && index !== 0 && index !== 2 && index !== 4 && index !== 6 ? 'clamp(-4rem, -8vw, -6rem)' : undefined,
            marginRight: !isLeft && index !== 1 && index !== 3 && index !== 5 && index !== 7 ? 'clamp(-4rem, -8vw, -6rem)' : undefined,
          }}
        >
          <img
            src={'/assets/acasa/pestisor.svg'}
            alt="Fish background"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              transform: index === 1 ? 'rotate(90deg)' : index === 2 ? 'rotate(-90deg)' : index === 3 ? 'scaleX(-1)' : index === 5 ? 'rotate(90deg)' : index === 6 ? 'rotate(-90deg)' : undefined,
            }}
          />

          {index >= 0 && index <= 6 && (
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage: 'url(/assets/acasa/pestisor.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/assets/acasa/pestisor.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                transform: index === 1 ? 'rotate(90deg)' : index === 2 ? 'rotate(-90deg)' : index === 3 ? 'scaleX(-1)' : index === 5 ? 'rotate(90deg)' : index === 6 ? 'rotate(-90deg)' : undefined,
              }}
            >
              <img
                src={`/assets/acasa/${
                  index === 0 ? 'descarca.png' :
                  index === 1 ? 'exploreaza.png' :
                  index === 2 ? 'printeaza.png' :
                  index === 3 ? 'scaneaza.png' :
                  index === 4 ? 'atingere.png' :
                  index === 5 ? 'invata.png' :
                  'creeaza.png'
                }`}
                alt={step.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: index === 1 ? 'rotate(-90deg)' : index === 2 ? 'rotate(90deg)' : index === 3 ? 'scaleX(-1)' : index === 5 ? 'rotate(-90deg)' : index === 6 ? 'rotate(90deg)' : undefined,
                }}
              />
            </div>
          )}

          {index === 7 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="px-10 py-6 text-white text-lg lg:text-xl font-semibold uppercase tracking-[0.15em]"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  borderRadius: '999px',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {step.mediaLabel}
              </div>
            </div>
          )}

          <div
            ref={setEndAnchor(index)}
            className="hidden lg:block absolute top-0 w-1 h-1"
            style={{
              left: '50%',
              transform: 'translate(-50%, 20px)',
            }}
          />

          {index < steps.length - 1 && (
            <div
              ref={setStartAnchor(index)}
              className="hidden lg:block absolute w-1 h-1"
              style={{
                bottom: '15%',
                right: isLeft ? '10px' : undefined,
                left: isLeft ? undefined : '10px',
              }}
            />
          )}
        </div>
      </div>

      <div
        className={`relative flex flex-col gap-6 text-white order-1 ${
          isLeft ? 'lg:order-2 text-left' : 'lg:order-1 text-left'
        }`}
        style={{ color: '#D9D9D9' }}
      >
        <div className="flex items-start gap-4">
          <span className="text-8xl lg:text-9xl font-extrabold leading-none" style={{ color: '#D9D9D9' }}>
            {step.number}
          </span>
          <h3 className="text-4xl lg:text-5xl font-bold leading-tight" style={{ color: '#D9D9D9' }}>
            {step.title}
          </h3>
        </div>
        <p className="text-sm lg:text-base leading-relaxed max-w-xl" style={{ color: '#D9D9D9' }}>
          {step.description}
        </p>

      </div>
    </div>
  )
}

export default HowToSection
