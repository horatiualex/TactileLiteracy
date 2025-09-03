import { Block } from 'payload'

export const TextImage: Block = {
  slug: 'textImage',
  labels: {
    singular: 'Text & Image',
    plural: 'Text & Image Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'textLeft',
      options: [
        {
          label: 'Text Left, Image Right',
          value: 'textLeft',
        },
        {
          label: 'Image Left, Text Right',
          value: 'imageLeft',
        },
      ],
      admin: {
        description: 'Choose whether text appears on the left or right side',
      },
    },
    {
      name: 'content',
      type: 'group',
      label: 'Content',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          admin: {
            description: 'Main heading for this section',
          },
        },
        {
          name: 'subheading',
          type: 'text',
          label: 'Subheading',
          admin: {
            description: 'Optional subheading',
          },
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Text Content',
          required: true,
          admin: {
            description: 'The main text content',
          },
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'Action Buttons',
          maxRows: 2,
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Button Label',
              required: true,
            },
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  label: 'Link Type',
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal Link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'reference',
                  type: 'relationship',
                  label: 'Link to Page',
                  relationTo: ['pages', 'posts'],
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Custom URL',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                  },
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'style',
              type: 'select',
              label: 'Button Style',
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
                  label: 'Outline',
                  value: 'outline',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The image to display alongside the text',
      },
    },
    {
      name: 'imageAspect',
      type: 'select',
      label: 'Image Aspect Ratio',
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto (Original)',
          value: 'auto',
        },
        {
          label: 'Square (1:1)',
          value: 'square',
        },
        {
          label: 'Landscape (4:3)',
          value: 'landscape',
        },
        {
          label: 'Wide (16:9)',
          value: 'wide',
        },
        {
          label: 'Portrait (3:4)',
          value: 'portrait',
        },
      ],
      admin: {
        description: 'Control the aspect ratio of the image',
      },
    },
    {
      name: 'verticalAlignment',
      type: 'select',
      label: 'Vertical Alignment',
      defaultValue: 'center',
      options: [
        {
          label: 'Top',
          value: 'start',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Bottom',
          value: 'end',
        },
      ],
      admin: {
        description: 'How to align content vertically',
      },
    },
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
          label: 'Light Gray',
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
      admin: {
        description: 'Background color for this section',
      },
    },
  ],
}
