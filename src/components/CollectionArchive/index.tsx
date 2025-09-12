import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData, CardDisplaySettings } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
  displaySettings?: CardDisplaySettings
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, displaySettings } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card 
                className="h-full" 
                doc={result} 
                relationTo="posts" 
                showCategories={displaySettings?.showCategories ?? true}
                displaySettings={displaySettings}
                key={index} 
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
