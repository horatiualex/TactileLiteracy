import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Modular Hero',
          value: 'modular',
        },
      ],
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: 'centered',
      label: 'Layout Style',
      options: [
        {
          label: 'Centered with Background',
          value: 'centered',
        },
        {
          label: 'Text Left - Image Right',
          value: 'textLeft',
        },
        {
          label: 'Text Right - Image Left',
          value: 'textRight',
        },
        {
          label: 'Text Only - Centered',
          value: 'textOnly',
        },
        {
          label: 'Split Screen',
          value: 'splitScreen',
        },
      ],
    },
    {
      name: 'splitScreenRightContent',
      type: 'select',
      admin: {
        condition: (_, { type, layout }: any = {}) => type === 'modular' && layout === 'splitScreen',
      },
      defaultValue: 'image',
      label: 'Right Side Content',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Blog Posts (4 most recent)',
          value: 'blogPosts',
        },
      ],
    },
    {
      name: 'blogPostsMode',
      type: 'select',
      admin: {
        condition: (_, { type, layout, splitScreenRightContent }: any = {}) => 
          type === 'modular' && layout === 'splitScreen' && splitScreenRightContent === 'blogPosts',
      },
      defaultValue: 'newest',
      label: 'Blog Posts Selection',
      options: [
        {
          label: 'Show 4 Newest Posts',
          value: 'newest',
        },
        {
          label: 'Choose Specific Posts',
          value: 'selected',
        },
      ],
    },
    {
      name: 'selectedBlogPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxRows: 4,
      admin: {
        condition: (_, { type, layout, splitScreenRightContent, blogPostsMode }: any = {}) => 
          type === 'modular' && layout === 'splitScreen' && splitScreenRightContent === 'blogPosts' && blogPostsMode === 'selected',
      },
      label: 'Select Blog Posts (max 4)',
    },
    {
      name: 'contentAlignment',
      type: 'select',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: 'center',
      label: 'Content Alignment',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: 'image',
      label: 'Background Style',
      options: [
        {
          label: 'Image Background',
          value: 'image',
        },
        {
          label: 'Gradient Background',
          value: 'gradient',
        },
        {
          label: 'Solid Color',
          value: 'solid',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'text',
      admin: {
        condition: (_, { type, backgroundStyle }: any = {}) => type === 'modular' && backgroundStyle === 'solid',
      },
      label: 'Background Color (hex, rgb, etc.)',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      admin: {
        condition: (_, { type, backgroundStyle }: any = {}) => type === 'modular' && backgroundStyle === 'image',
      },
      relationTo: 'media',
      label: 'Background Image',
      required: false,
    },
    {
      name: 'gradientColors',
      type: 'group',
      admin: {
        condition: (_, { type, backgroundStyle }: any = {}) => type === 'modular' && backgroundStyle === 'gradient',
      },
      fields: [
        {
          name: 'from',
          type: 'text',
          label: 'Gradient From Color',
        },
        {
          name: 'to',
          type: 'text',
          label: 'Gradient To Color',
        },
        {
          name: 'direction',
          type: 'select',
          defaultValue: 'to-br',
          options: [
            { label: 'Top to Bottom', value: 'to-b' },
            { label: 'Bottom Right', value: 'to-br' },
            { label: 'Left to Right', value: 'to-r' },
            { label: 'Top Right', value: 'to-tr' },
          ],
        },
      ],
    },
    {
      name: 'overlay',
      type: 'group',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Overlay',
        },
        {
          name: 'color',
          type: 'text',
          admin: {
            condition: (_, siblingData: any) => siblingData.enabled,
          },
          defaultValue: 'rgba(0,0,0,0.5)',
          label: 'Overlay Color',
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type }: any = {}) => ['highImpact', 'mediumImpact', 'modular'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      admin: {
        condition: (_, { type, layout }: any = {}) => type === 'modular' && ['textLeft', 'textRight', 'splitScreen'].includes(layout),
      },
      relationTo: 'media',
      label: 'Secondary Image (for split layouts)',
    },
    {
      name: 'bottomText',
      type: 'text',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      label: 'Bottom Text (e.g., "Consum combinat: 11,7 – 11,5 l/100 km")',
    },
    {
      name: 'showDownArrow',
      type: 'checkbox',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: false,
      label: 'Show Down Arrow',
    },
  ],
  label: false,
}
