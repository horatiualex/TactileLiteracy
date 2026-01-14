import React from 'react'

export default function PartnersSection() {
  return (
    <section className="w-full bg-[#FFFFFF] relative">
      <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: '#F0F0F0',
            color: '#3C3C3C',
            boxShadow: 'inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
          }}
        >
          Parteneri
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 pt-24 pb-12 lg:py-20">
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
