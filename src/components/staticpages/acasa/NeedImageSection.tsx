import React from 'react'

export default function NeedImageSection() {
  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: '#3A3A3A' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-16 lg:py-24 text-center">
        <h2
          className="font-bold text-3xl lg:text-5xl"
          style={{ color: '#F5F5F5' }}
        >
          Ai nevoie de o imagine specifică?
        </h2>

        <p className="mt-4 text-sm lg:text-base text-gray-200 max-w-[640px] mx-auto">
          Spune-ne ce ce îți putem fi de folos.
          <br />
          Suntem la un mail distanță!
        </p>

        <div className="mt-8">
          <button
            type="button"
            className="px-6 lg:px-8 py-3 rounded-full font-medium"
            style={{
              backgroundColor: '#E5E5E5',
              color: '#222',
              boxShadow: '2px 4px 6px rgba(0,0,0,0.4), inset 2px 2px 0 rgba(255,255,255,0.6)',
            }}
          >
            Contactează-ne
          </button>
        </div>
      </div>
    </section>
  )
}
