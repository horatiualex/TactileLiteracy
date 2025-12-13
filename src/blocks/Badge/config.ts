import type { Block } from 'payload'

export const Badge: Block = {
  slug: 'badge',
  labels: {
    singular: 'Badge',
    plural: 'Badges',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Badge Text',
    },
  ],
}
