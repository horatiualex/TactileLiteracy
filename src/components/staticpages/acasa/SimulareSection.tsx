import React from 'react'

export default function SimulareSection() {
  return (
    <section className="relative w-full min-h-[50vh] lg:min-h-screen bg-white py-12 lg:py-24 overflow-hidden">
      <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20">
        <div
          className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#3C3C3C',
            boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
          }}
        >
          Simulare
        </div>
      </div>

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img
          src="/assets/acasa/tantar.svg"
          alt="Simulare țânțar"
          className="w-[95vw] max-w-[1100px] opacity-90"
        />
      </div>
    </section>
  )
}
