import type { Block } from 'payload'

const StatsSection: Block = {
  slug: 'statsSection',
  interfaceName: 'StatsSectionBlock',
  labels: {
    singular: 'Stats Section Block',
    plural: 'Stats Section Blocks',
  },
  imageURL: '/api/media/file/stats-section-block.jpg',
  imageAltText: 'Stats Section Block',
  fields: [
    {
      name: 'layout',
      type: 'group',
      label: 'Layout Settings',
      fields: [
        {
          name: 'textPosition',
          type: 'select',
          label: 'Text Position',
          defaultValue: 'left',
          options: [
            {
              label: 'Left Side',
              value: 'left',
            },
            {
              label: 'Right Side', 
              value: 'right',
            },
            {
              label: 'Center (Full Width)',
              value: 'center',
            },
          ],
          required: false,
        },
        {
          name: 'statsCount',
          type: 'select',
          label: 'Number of Stats',
          defaultValue: '4',
          options: [
            {
              label: '2 Stats',
              value: '2',
            },
            {
              label: '4 Stats',
              value: '4',
            },
            {
              label: '6 Stats',
              value: '6',
            },
          ],
          required: false,
        },
      ],
    },
    {
      name: 'background',
      type: 'group',
      label: 'Background Settings',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Background Type',
          defaultValue: 'color',
          options: [
            {
              label: 'Solid Color',
              value: 'color',
            },
            {
              label: 'Background Image',
              value: 'image',
            },
            {
              label: 'None',
              value: 'none',
            },
          ],
          required: false,
        },
        {
          name: 'color',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Custom',
              value: 'custom',
            },
          ],
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'color',
          },
        },
        {
          name: 'customColor',
          type: 'text',
          label: 'Custom Background Color',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'color' && siblingData?.color === 'custom',
            description: 'Enter a hex color code (e.g., #059669)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Background image for the section',
          },
        },
        {
          name: 'overlay',
          type: 'select',
          label: 'Image Overlay',
          defaultValue: 'dark',
          options: [
            {
              label: 'Dark Overlay',
              value: 'dark',
            },
            {
              label: 'Light Overlay',
              value: 'light',
            },
            {
              label: 'No Overlay',
              value: 'none',
            },
          ],
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      label: 'Content',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: false,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          required: false,
        },
        {
          name: 'textColor',
          type: 'select',
          label: 'Text Color',
          defaultValue: 'white',
          options: [
            {
              label: 'White',
              value: 'white',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
            {
              label: 'Custom',
              value: 'custom',
            },
          ],
          required: false,
        },
        {
          name: 'customTextColor',
          type: 'text',
          label: 'Custom Text Color',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.textColor === 'custom',
            description: 'Enter a hex color code (e.g., #ffffff)',
          },
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      labels: {
        singular: 'Statistic',
        plural: 'Statistics',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Number/Value',
          required: true,
          admin: {
            description: 'e.g., "150+", "50K+", "99%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            description: 'e.g., "Partner Organizations", "Users Served"',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (Optional)',
          required: false,
        },
        {
          name: 'iconText',
          type: 'text',
          label: 'Icon Text (Alternative)',
          required: false,
          admin: {
            description: 'Use emoji or text instead of uploaded icon',
          },
        },
      ],
      minRows: 2,
      maxRows: 6,
      required: true,
      admin: {
        description: 'Add 2, 4, or 6 statistics with numbers and labels',
      },
    },
  ],
}

export default StatsSection
