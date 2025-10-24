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
      label: 'Tip',
      options: [
        {
          label: 'Fără',
          value: 'none',
        },
        {
          label: 'Impact Mare',
          value: 'highImpact',
        },
        {
          label: 'Impact Mediu',
          value: 'mediumImpact',
        },
        {
          label: 'Impact Mic',
          value: 'lowImpact',
        },
        {
          label: 'Hero Modular',
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
      label: 'Stil Layout',
      options: [
        {
          label: 'Centrat cu Fundal',
          value: 'centered',
        },
        {
          label: 'Text Stânga - Imagine Dreapta',
          value: 'textLeft',
        },
        {
          label: 'Text Dreapta - Imagine Stânga',
          value: 'textRight',
        },
        {
          label: 'Doar Text - Centrat',
          value: 'textOnly',
        },
        {
          label: 'Ecran Împărțit',
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
      label: 'Conținut Partea Dreaptă',
      options: [
        {
          label: 'Imagine',
          value: 'image',
        },
        {
          label: 'Articole Blog (4 cele mai recente)',
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
      label: 'Selectare Articole Blog',
      options: [
        {
          label: 'Afișează 4 Articole Recente',
          value: 'newest',
        },
        {
          label: 'Alege Articole Specifice',
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
      label: 'Selectează Articole Blog (max 4)',
    },
    {
      name: 'contentAlignment',
      type: 'select',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: 'center',
      label: 'Aliniere Conținut',
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
      ],
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: 'image',
      label: 'Stil Fundal',
      options: [
        {
          label: 'Fundal Imagine',
          value: 'image',
        },
        {
          label: 'Fundal Gradient',
          value: 'gradient',
        },
        {
          label: 'Culoare Solidă',
          value: 'solid',
        },
        {
          label: 'Fără',
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
      label: 'Culoare Fundal (hex, rgb, etc.)',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      admin: {
        condition: (_, { type, backgroundStyle }: any = {}) => type === 'modular' && backgroundStyle === 'image',
      },
      relationTo: 'media',
      label: 'Imagine Fundal',
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
          label: 'Culoare Început Gradient',
        },
        {
          name: 'to',
          type: 'text',
          label: 'Culoare Sfârșit Gradient',
        },
        {
          name: 'direction',
          type: 'select',
          defaultValue: 'to-br',
          options: [
            { label: 'Sus către Jos', value: 'to-b' },
            { label: 'Spre Dreapta-Jos', value: 'to-br' },
            { label: 'Stânga către Dreapta', value: 'to-r' },
            { label: 'Spre Dreapta-Sus', value: 'to-tr' },
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
          label: 'Activează Overlay',
        },
        {
          name: 'color',
          type: 'text',
          admin: {
            condition: (_, siblingData: any) => siblingData.enabled,
          },
          defaultValue: 'rgba(0,0,0,0.5)',
          label: 'Culoare Overlay',
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
      label: 'Imagine Secundară (pentru layout-uri împărțite)',
    },
    {
      name: 'bottomText',
      type: 'text',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      label: 'Text Jos (ex: "Consum combinat: 11,7 – 11,5 l/100 km")',
    },
    {
      name: 'showDownArrow',
      type: 'checkbox',
      admin: {
        condition: (_, { type }: any = {}) => type === 'modular',
      },
      defaultValue: false,
      label: 'Afișează Săgeată Jos',
    },
  ],
  label: false,
}
