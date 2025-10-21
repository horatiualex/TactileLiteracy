import type { Block } from 'payload'

const HeroBanner: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Hero Banner Block',
    plural: 'Hero Banner Blocks',
  },
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
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
      admin: {
        description: 'Background image for split screen layout or visual element for other themes',
        condition: (data, siblingData) => {
          return siblingData?.style?.backgroundTheme === 'split' || siblingData?.style?.backgroundTheme === 'modern'
        },
      },
    },
    {
      name: 'style',
      type: 'group',
      label: 'Style Options',
      fields: [
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
        {
          name: 'backgroundTheme',
          type: 'select',
          label: 'Style Theme',
          defaultValue: 'modern',
          options: [
            {
              label: 'Modern (Clean theme-aware background)',
              value: 'modern',
            },
            {
              label: 'Split Screen (Blue gradient with image)',
              value: 'split',
            },
            {
              label: 'Card Style (Blue gradient card)',
              value: 'card',
            },
          ],
          required: false,
          admin: {
            description: 'Choose the style and layout for the hero banner',
          },
        },
        {
          name: 'layout',
          type: 'select',
          label: 'Icon & Title Layout',
          defaultValue: 'default',
          options: [
            {
              label: 'Inline (Icon next to title)',
              value: 'default',
            },
            {
              label: 'Stacked (Icon above title)',
              value: 'stacked',
            },
          ],
          required: false,
          admin: {
            description: 'Control how the icon and title are positioned',
            condition: (data, siblingData) => {
              return siblingData?.backgroundTheme === 'modern'
            },
          },
        },
        {
          name: 'titleSize',
          type: 'select',
          label: 'Title Size',
          defaultValue: 'normal',
          options: [
            {
              label: 'Normal',
              value: 'normal',
            },
            {
              label: 'Large',
              value: 'large',
            },
            {
              label: 'Extra Large',
              value: 'xl',
            },
          ],
          required: false,
          admin: {
            description: 'Control the size of the main title',
          },
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
          defaultValue: 'solid',
          options: [
            {
              label: 'Solid',
              value: 'solid',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
            {
              label: 'Ghost',
              value: 'ghost',
            },
            {
              label: 'Modern Gradient',
              value: 'modern',
            },
          ],
          required: false,
          admin: {
            description: 'Choose the visual style of the call-to-action button',
          },
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
