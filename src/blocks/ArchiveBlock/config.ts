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
  imageURL: '/block-previews/archive.png',
  imageAltText: 'Arhivă - Listare articole și postări',
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
      label: 'Conținut Introducere',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Colecție',
          value: 'collection',
        },
        {
          label: 'Selecție Individuală',
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
      label: 'Colecții de Afișat',
      options: [
        {
          label: 'Articole',
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
      label: 'Categorii de Afișat',
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
      label: 'Limită',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selecție',
      relationTo: ['posts'],
    },
    {
      name: 'displaySettings',
      type: 'group',
      label: 'Setări Afișare',
      fields: [
        {
          name: 'cardStyle',
          type: 'select',
          label: 'Stil Card',
          defaultValue: 'default',
          options: [
            {
              label: 'Implicit (Card complet cu toate detaliile)',
              value: 'default',
            },
            {
              label: 'Minimal (Doar Imagine + Buton)',
              value: 'minimal',
            },
            {
              label: 'Focus Imagine (Imagine mare, text minimal)',
              value: 'imageFocus',
            },
          ],
        },
        {
          name: 'showDate',
          type: 'checkbox',
          label: 'Afișează Data',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData.cardStyle !== 'minimal',
          },
        },
        {
          name: 'showDescription',
          type: 'checkbox',
          label: 'Afișează Descrierea',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData.cardStyle !== 'minimal',
          },
        },
        {
          name: 'showCategories',
          type: 'checkbox',
          label: 'Afișează Categoriile',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData.cardStyle !== 'minimal',
          },
        },
        {
          name: 'aspectRatio',
          type: 'select',
          label: 'Raport Aspect Imagine',
          defaultValue: '4/3',
          options: [
            {
              label: '16:9 (Peisaj)',
              value: '16/9',
            },
            {
              label: '4:3 (Standard)',
              value: '4/3',
            },
            {
              label: '1:1 (Pătrat)',
              value: '1/1',
            },
            {
              label: '3:4 (Portret)',
              value: '3/4',
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Text Buton',
          defaultValue: 'Citește mai mult',
          admin: {
            description: 'Text pentru butonul/link-ul de acțiune',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Arhive',
    singular: 'Arhivă Articole',
  },
}
