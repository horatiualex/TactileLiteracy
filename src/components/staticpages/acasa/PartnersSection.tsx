import React from 'react'

export default function PartnersSection() {
  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-12 lg:py-20 relative">
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-20">
          <div
            className="inline-flex px-5 py-2 rounded-full text-sm font-medium border shadow-sm"
            style={{
              backgroundColor: '#F4F4F4',
              color: '#3C3C3C',
              borderColor: '#BEBEBE',
              boxShadow:
                '1.76px 2.35px 1.62px rgba(255,255,255,1), inset 2.35px 4.11px 1.76px rgba(0,0,0,0.4)',
            }}
          >
            Parteneri
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="/assets/acasa/parteneri.svg"
            alt="Parteneri"
            className="w-full h-auto object-contain"
            style={{ maxHeight: 160 }}
          />
        </div>
      </div>
    </section>
  )
}
