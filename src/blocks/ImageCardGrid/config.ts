import type { Block } from 'payload'

const ImageCardGrid: Block = {
  slug: 'imageCardGrid',
  interfaceName: 'ImageCardGridBlock',
  labels: {
    singular: 'Image Card Grid Block',
    plural: 'Image Card Grid Blocks',
  },
  imageURL: '/api/media/file/image-card-grid-block.jpg',
  imageAltText: 'Image Card Grid Block',
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
          name: 'columns',
          type: 'select',
          label: 'Number of Columns',
          defaultValue: '3',
          options: [
            {
              label: '2 Columns',
              value: '2',
            },
            {
              label: '3 Columns',
              value: '3',
            },
            {
              label: '4 Columns',
              value: '4',
            },
          ],
          required: false,
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Image Cards',
      labels: {
        singular: 'Image Card',
        plural: 'Image Cards',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
          required: true,
          admin: {
            description: 'Main image for the card (recommended: 16:9 aspect ratio)',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: false,
          admin: {
            description: 'Small icon for the card title (SVG recommended)',
          },
        },
        {
          name: 'iconText',
          type: 'text',
          label: 'Icon Text (Alternative)',
          required: false,
          admin: {
            description: 'Use text/emoji instead of an icon',
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
          label: 'Optional Link Button',
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
              label: 'Button Label',
              defaultValue: 'Learn More',
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
      minRows: 1,
      required: true,
      admin: {
        description: 'Add image cards with photos, icons, titles, and descriptions',
      },
    },
  ],
}

export default ImageCardGrid
