import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CardGridBlockComponent } from '@/blocks/CardGrid/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQBlockComponent } from '@/blocks/FAQ/Component'
import { FileListBlockComponent } from '@/blocks/FileList/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'
import { HeroBannerBlockComponent } from '@/blocks/HeroBanner/Component'
import { ImageCardGridBlockComponent } from '@/blocks/ImageCardGrid/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StatsSectionBlockComponent } from '@/blocks/StatsSection/Component'
import { TextImageBlockComponent } from '@/blocks/TextImage/Component'

const blockComponents = {
  archive: ArchiveBlock,
  cardGrid: CardGridBlockComponent,
  content: ContentBlock,
  cta: CallToActionBlock,
  faq: FAQBlockComponent,
  fileList: FileListBlockComponent,
  formBlock: FormBlock,
  gallery: GalleryBlockComponent,
  heroBanner: HeroBannerBlockComponent,
  imageCardGrid: ImageCardGridBlockComponent,
  mediaBlock: MediaBlock,
  statsSection: StatsSectionBlockComponent,
  textImage: TextImageBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error - Block components have different prop types */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
