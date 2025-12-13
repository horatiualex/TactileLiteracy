import React from 'react'

export type BadgeBlockProps = {
  text: string
}

export const BadgeBlock: React.FC<BadgeBlockProps> = ({ text }) => {
  return (
    <div className="my-8">
      <span
        className="inline-block rounded-full px-8 py-3 text-[#434343] font-bold text-lg bg-[#D2D2D2]"
        style={{
          boxShadow: '1.66px 2.22px 1.53px 0px #FFFFFF, inset 2.5px 3.88px 1.66px 0px rgba(0, 0, 0, 0.4)',
        }}
      >
        {text}
      </span>
    </div>
  )
}
