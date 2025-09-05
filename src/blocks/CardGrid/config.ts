import type { Block } from 'payload'

const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: {
    singular: 'Card Grid Block',
    plural: 'Card Grid Blocks',
  },
  imageURL: '/api/media/file/card-grid-block.jpg',
  imageAltText: 'Card Grid Block',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      required: false,
    },
    {
      name: 'width',
      type: 'select',
      label: 'Content Width',
      defaultValue: 'large',
      options: [
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Extra Large',
          value: 'xlarge',
        },
        {
          label: 'Full Width',
          value: 'full',
        },
      ],
      required: false,
    },
    {
      name: 'style',
      type: 'group',
      label: 'Style Options',
      fields: [
        {
          name: 'backgroundColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
            {
              label: 'Primary',
              value: 'primary',
            },
          ],
          required: false,
        },
        {
          name: 'cardStyle',
          type: 'select',
          label: 'Card Style',
          defaultValue: 'shadow',
          options: [
            {
              label: 'Shadow',
              value: 'shadow',
            },
            {
              label: 'Border',
              value: 'border',
            },
            {
              label: 'Minimal',
              value: 'minimal',
            },
          ],
          required: false,
        },
        {
          name: 'textAlignment',
          type: 'select',
          label: 'Text Alignment',
          defaultValue: 'center',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Center',
              value: 'center',
            },
          ],
          required: false,
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: false,
          admin: {
            description: 'Upload an icon/image for this card (recommended: SVG or small PNG)',
          },
        },
        {
          name: 'iconText',
          type: 'text',
          label: 'Icon Text (Alternative)',
          required: false,
          admin: {
            description: 'Use text instead of an icon (e.g., emoji or single character)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Card Description',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Optional Link',
          fields: [
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              required: false,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Link Label',
              required: false,
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in New Tab',
              defaultValue: false,
              required: false,
            },
          ],
        },
      ],
      minRows: 3,
      maxRows: 9,
      required: true,
      admin: {
        description: 'Add 3, 6, or 9 cards (multiples of 3 work best for the grid layout)',
      },
    },
  ],
}

export default CardGrid
