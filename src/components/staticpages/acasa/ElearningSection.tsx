import React from 'react'

export default function ElearningSection() {
  return (
    <section
      className="relative w-full min-h-screen py-20 overflow-hidden"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-start">
          {/* Left column */}
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pl-4 sm:pl-0">
              <div
                className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                style={{
                  backgroundColor: '#E1E1E1',
                  color: '#3C3C3C',
                  boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
                }}
              >
                E-learning platform
              </div>
            </div>

            <div className="space-y-6 pl-4 sm:pl-10 lg:pl-12">
              <h2
                className="font-extrabold text-[#3C3C3C] leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 72px)' }}
              >
                <span className="block">Alege</span>
                <span className="block lg:translate-x-28">studiul</span>
              </h2>
              <p
                className="leading-relaxed max-w-sm pl-0 sm:pl-2"
                style={{ color: '#4E4E4E', fontSize: 'clamp(0.95rem, 1.2vw, 1.125rem)' }}
              >
                Platforma oferă copiilor cu deficiențe de vedere șansa de a studia de unii singuri.
                Cu o aplicație de mobil și desene reliefate interactive, care se autodescriu audio,
                ei pot descoperi singuri lumea, lucrurile pe care nu le pot atinge.
              </p>
            </div>
          </div>

          {/* Middle column - phone */}
          <div className="flex justify-center">
            <div
              className="relative"
              style={{
                width: 'clamp(280px, 35vw, 500px)',
                height: 'clamp(400px, 50vw, 700px)',
              }}
            >
              <img
                src="/assets/acasa/mana.svg"
                alt="Hand"
                className="absolute z-0"
                style={{
                  width: 'clamp(300px, 37vw, 520px)',
                  bottom: '0',
                  left: '20%',
                  transform: 'translateX(-40%)',
                  filter: 'drop-shadow(1.84px 4.6px 1.79px rgba(255, 255, 255, 0.8))',
                }}
              />
              <img
                src="/assets/acasa/telefon.svg"
                alt="Mobile App"
                className="absolute z-10"
                style={{
                  width: 'clamp(170px, 17vw, 240px)',
                  top: '36%',
                  left: '50%',
                  transform: 'translate(-50%, -36%)',
                }}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="relative flex flex-col justify-end h-full min-h-[480px] pb-32">
            <div
              className="hidden lg:block absolute lg:-left-[10rem] xl:-left-40"
              style={{ top: 'clamp(6rem, 10vw, 8rem)' }}
            >
              <h2 className="text-[#3C3C3C] leading-tight flex flex-col items-start gap-1">
                <span className="font-bold" style={{ fontSize: 'clamp(2.5rem, 3.5vw, 48px)' }}>
                  pe cont
                </span>
                <span
                  className="font-extrabold translate-x-8"
                  style={{ fontSize: 'clamp(3.5rem, 5.5vw, 80px)' }}
                >
                  propriu!
                </span>
              </h2>
            </div>
            <div className="lg:hidden mb-8">
              <h2 className="text-[#3C3C3C] leading-tight flex flex-col items-end text-right gap-1">
                <span className="font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                  pe cont
                </span>
                <span className="font-extrabold" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                  propriu!
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 items-end self-end w-full max-w-sm">
              <button
                className="flex items-center gap-3 px-6 py-3 rounded-full text-left w-full max-w-[260px]"
                style={{
                  backgroundColor: '#434343',
                  boxShadow:
                    '2px 3.5px 4px rgba(0,0,0,0.4), inset 2px 3px 2px rgba(255,255,255,1)',
                }}
              >
                <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-white">
                  <div className="text-sm font-semibold leading-none">Descarcă aplicația</div>
                  <div className="text-xs">pentru iOS</div>
                </div>
              </button>
              <button
                className="flex items-center gap-3 px-6 py-3 rounded-full text-left w-full max-w-[260px]"
                style={{
                  backgroundColor: '#434343',
                  boxShadow:
                    '2px 3.5px 4px rgba(0,0,0,0.4), inset 2px 3px 2px rgba(255,255,255,1)',
                }}
              >
                <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-white">
                  <div className="text-sm font-semibold leading-none">Descarcă aplicația</div>
                  <div className="text-xs">pentru Android</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
