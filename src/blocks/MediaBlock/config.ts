import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  imageURL: '/block-previews/mediablock.png',
  imageAltText: 'Media - Imagine sau video la lățime completă',
  labels: {
    singular: 'Bloc Media',
    plural: 'Blocuri Media',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
