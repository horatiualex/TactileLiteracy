import type { Block } from 'payload'

const HeroBanner: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Hero Banner Block',
    plural: 'Hero Banner Blocks',
  },
  imageURL: '/api/media/file/hero-banner-block.jpg',
  imageAltText: 'Hero Banner Block',
  fields: [
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icon',
      required: false,
      admin: {
        description: 'Upload an icon for the banner (SVG recommended)',
      },
    },
    {
      name: 'iconText',
      type: 'text',
      label: 'Icon Text (Alternative)',
      required: false,
      admin: {
        description: 'Use text instead of an icon (e.g., emoji or character)',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
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
              label: 'None',
              value: 'none',
            },
            {
              label: 'Custom',
              value: 'custom',
            },
          ],
          required: false,
        },
        {
          name: 'customBackgroundColor',
          type: 'text',
          label: 'Custom Background Color',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundColor === 'custom',
            description: 'Enter a hex color code (e.g., #3b82f6) or CSS color name',
          },
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
            description: 'Enter a hex color code (e.g., #ffffff) or CSS color name',
          },
        },
        {
          name: 'alignment',
          type: 'select',
          label: 'Content Alignment',
          defaultValue: 'left',
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
        {
          name: 'size',
          type: 'select',
          label: 'Banner Size',
          defaultValue: 'medium',
          options: [
            {
              label: 'Small',
              value: 'small',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Large',
              value: 'large',
            },
          ],
          required: false,
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      label: 'Optional Call-to-Action',
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
          required: false,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'outline',
          options: [
            {
              label: 'Solid',
              value: 'solid',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
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
}

export default HeroBanner
