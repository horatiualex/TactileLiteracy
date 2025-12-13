import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const listItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Titlu element',
    required: true,
  },
  {
    name: 'description',
    type: 'richText',
    label: 'Descriere',
    editor: lexicalEditor({
      features: ({ rootFeatures }: any) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Activează link',
  },
  link({
    overrides: {
      admin: {
        condition: (_data: unknown, siblingData: { enableLink?: boolean }) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    label: 'Iconiță (opțional)',
    admin: {
      description: 'Adaugă o iconiță pentru acest element de listă',
    },
  },
]

export const List: Block = {
  slug: 'list',
  interfaceName: 'ListBlock',
  imageURL: '/block-previews/list.png',
  labels: {
    singular: 'Listă',
    plural: 'Liste',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titlu listă',
      admin: {
        description: 'Titlul principal pentru această listă',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitlu (opțional)',
      admin: {
        description: 'Un subtitlu opțional pentru mai mult context',
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Numărul de coloane',
      defaultValue: '1',
      options: [
        {
          label: '1 coloană',
          value: '1',
        },
        {
          label: '2 coloane',
          value: '2',
        },
        {
          label: '3 coloane',
          value: '3',
        },
      ],
      admin: {
        description: 'Alege în câte coloane să fie afișate elementele listei',
      },
    },
    {
      name: 'listStyle',
      type: 'select',
      label: 'Stilul listei',
      defaultValue: 'card',
      options: [
        {
          label: 'Card (cu fundal)',
          value: 'card',
        },
        {
          label: 'Simplu (fără fundal)',
          value: 'simple',
        },
        {
          label: 'Cu bordură',
          value: 'bordered',
        },
      ],
      admin: {
        description: 'Alege cum să fie stilizate elementele listei',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Elemente listă',
      minRows: 1,
      admin: {
        description: 'Adaugă elementele pentru această listă',
        initCollapsed: true,
      },
      fields: listItemFields,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Culoare fundal secțiune',
      defaultValue: 'transparent',
      options: [
        {
          label: 'Transparent',
          value: 'transparent',
        },
        {
          label: 'Gri deschis',
          value: 'gray-light',
        },
        {
          label: 'Albastru deschis',
          value: 'blue-light',
        },
        {
          label: 'Verde deschis',
          value: 'green-light',
        },
      ],
      admin: {
        description: 'Alege culoarea de fundal pentru întreaga secțiune',
      },
    },
  ],
}
