import React from 'react'

export default function SimulareSection() {
  return (
    <section className="relative w-full min-h-screen bg-white py-24 overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img
          src="/assets/acasa/țânțar.svg"
          alt="Simulare țânțar"
          className="w-[95vw] max-w-[1100px] opacity-90"
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-flex px-6 py-2 rounded-full text-sm font-medium border shadow-sm"
            style={{
              backgroundColor: '#F4F4F4',
              color: '#3C3C3C',
              borderColor: '#BEBEBE',
              boxShadow:
                '1.76px 2.35px 1.62px rgba(255,255,255,1), inset 2.35px 4.11px 1.76px rgba(0,0,0,0.4)',
            }}
          >
            Simulare
          </div>
        </div>
      </div>
    </section>
  )
}
