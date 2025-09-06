import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  GalleryBlock as GalleryBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | GalleryBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    gallery: ({ node }) => {
      // Convert payload gallery data to component props
      const convertedImages = node.fields.images?.map((item) => {
        let mediaObject
        if (typeof item.image === 'string') {
          mediaObject = { id: item.image }
        } else if (item.image) {
          mediaObject = {
            id: item.image.id,
            url: item.image.url || undefined,
            alt: item.image.alt || undefined,
            width: item.image.width || undefined,
            height: item.image.height || undefined,
            filename: item.image.filename || undefined,
            updatedAt: item.image.updatedAt || undefined,
            createdAt: item.image.createdAt || undefined,
          }
        }
        
        return {
          image: mediaObject,
          caption: item.caption || undefined,
          alt: item.alt || undefined,
        }
      })

      return (
        <GalleryBlockComponent 
          className="col-start-1 col-span-3 my-8" 
          title={node.fields.title || undefined}
          description={node.fields.description || undefined}
          images={convertedImages}
          layout={node.fields.layout || undefined}
          columns={node.fields.columns || undefined}
          enableLightbox={node.fields.enableLightbox || false}
        />
      )
    },
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
