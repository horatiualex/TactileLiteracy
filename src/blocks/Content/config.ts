import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'textAlign',
    type: 'select',
    label: 'Aliniere text',
    defaultValue: 'left',
    admin: {
      description: 'Alege cum să fie aliniat textul în această coloană',
    },
    options: [
      {
        label: 'Stânga',
        value: 'left',
      },
      {
        label: 'Centru',
        value: 'center',
      },
      {
        label: 'Dreapta',
        value: 'right',
      },
      {
        label: 'Justificat',
        value: 'justify',
      },
    ],
  },
  {
    name: 'typography',
    type: 'group',
    label: 'Stiluri text',
    admin: {
      description: 'Controlează mărimea și stilul textului din această coloană',
    },
    fields: [
      {
        name: 'headingSize',
        type: 'select',
        label: 'Mărime titluri (H1, H2, H3)',
        defaultValue: 'default',
        options: [
          {
            label: 'Foarte mic',
            value: 'xs',
          },
          {
            label: 'Mic',
            value: 'sm',
          },
          {
            label: 'Normal (implicit)',
            value: 'default',
          },
          {
            label: 'Mare',
            value: 'lg',
          },
          {
            label: 'Foarte mare',
            value: 'xl',
          },
          {
            label: 'Extra mare',
            value: '2xl',
          },
        ],
      },
      {
        name: 'bodySize',
        type: 'select',
        label: 'Mărime text normal',
        defaultValue: 'default',
        options: [
          {
            label: 'Foarte mic',
            value: 'xs',
          },
          {
            label: 'Mic',
            value: 'sm',
          },
          {
            label: 'Normal (implicit)',
            value: 'default',
          },
          {
            label: 'Mare',
            value: 'lg',
          },
          {
            label: 'Foarte mare',
            value: 'xl',
          },
        ],
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
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
