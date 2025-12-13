import React from 'react'

interface StatItemProps {
  number: string
  description: string
}

const StatItem: React.FC<StatItemProps> = ({ number, description }) => (
  <div className="flex flex-col items-center text-center px-4 pt-32">
    <div className="font-bold text-5xl lg:text-6xl mb-4" style={{ color: '#3C3C3C' }}>
      {number}
    </div>
    <p className="text-sm lg:text-base leading-relaxed max-w-[200px]" style={{ color: '#4E4E4E' }}>
      {description}
    </p>
  </div>
)

export default function StatisticsSection() {
  const stats = [
    {
      number: '450',
      description: 'statistici legate de problema pe care o rezolvăm',
    },
    {
      number: '98 mil',
      description: 'statistici despre numărul persoanelor cu dizabilități /cu dificultăți de învățare',
    },
    {
      number: '450',
      description: 'statistici legate școlile care ne folosesc metoda',
    },
  ]

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#E1E1E1' }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.7fr_0.7fr_1.5fr] gap-0 items-center relative">
          {/* Badge positioned relative to grid */}
          <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20">
            <div
              className="inline-flex px-6 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: '#E1E1E1',
                color: '#3C3C3C',
                boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)'
              }}
            >
              Statistici
            </div>
          </div>

          {/* Columns 1-3: Statistics */}
          {stats.map((stat, index) => (
            <StatItem key={index} number={stat.number} description={stat.description} />
          ))}

          {/* Column 4: Circle with text */}
          <div className="relative flex items-center justify-end py-20 lg:py-0 lg:min-h-[560px] overflow-visible">
            <div
              className="relative"
              style={{
                width: 'clamp(280px, 40vw, 560px)',
                height: 'clamp(280px, 40vw, 560px)',
                marginRight: 'clamp(-2rem, -5vw, -5rem)',
              }}
            >
              <img
                src="/assets/acasa/pestisor-invers.svg"
                alt="Statistics background"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(1.42px 2.86px 2.86px rgba(255, 255, 255, 0.7))',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-center px-12">
                <h2
                  className="font-bold leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  Învățarea în date și realități
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="w-full px-8 lg:px-16 mt-12 lg:mt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.7fr_0.7fr_1.5fr] gap-0">
          <div className="col-span-1 lg:col-span-2 flex gap-4">
            <button
              className="px-12 py-3 rounded-full font-medium transition-colors duration-200 whitespace-nowrap flex-1"
              style={{
                backgroundColor: '#434343',
                color: 'white',
                boxShadow:
                  '2px 3.5px 4px rgba(0,0,0,0.4), inset 2px 3px 2px rgba(255,255,255,1)',
              }}
            >
              Descoperă imaginile
            </button>
            <button
              className="px-12 py-3 rounded-full font-medium transition-colors duration-200 whitespace-nowrap flex-1"
              style={{
                backgroundColor: '#F4F4F4',
                color: '#3C3C3C',
                border: '1px solid #BEBEBE',
                boxShadow:
                  '1.76px 2.35px 1.62px rgba(255,255,255,1), inset 2.35px 4.11px 1.76px rgba(0,0,0,0.4)',
              }}
            >
              Learn more about us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
