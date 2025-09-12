import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
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
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: 'Collections To Show',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['posts'],
    },
    {
      name: 'displaySettings',
      type: 'group',
      label: 'Display Settings',
      fields: [
        {
          name: 'cardStyle',
          type: 'select',
          label: 'Card Style',
          defaultValue: 'default',
          options: [
            {
              label: 'Default (Full card with all details)',
              value: 'default',
            },
            {
              label: 'Minimal (Image + Button only)',
              value: 'minimal',
            },
            {
              label: 'Image Focus (Large image, minimal text)',
              value: 'imageFocus',
            },
          ],
        },
        {
          name: 'showDate',
          type: 'checkbox',
          label: 'Show Date',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData.cardStyle !== 'minimal',
          },
        },
        {
          name: 'showDescription',
          type: 'checkbox',
          label: 'Show Description',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData.cardStyle !== 'minimal',
          },
        },
        {
          name: 'showCategories',
          type: 'checkbox',
          label: 'Show Categories',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData.cardStyle !== 'minimal',
          },
        },
        {
          name: 'aspectRatio',
          type: 'select',
          label: 'Image Aspect Ratio',
          defaultValue: '4/3',
          options: [
            {
              label: '16:9 (Landscape)',
              value: '16/9',
            },
            {
              label: '4:3 (Standard)',
              value: '4/3',
            },
            {
              label: '1:1 (Square)',
              value: '1/1',
            },
            {
              label: '3:4 (Portrait)',
              value: '3/4',
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Citește mai mult',
          admin: {
            description: 'Text for the action button/link',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
