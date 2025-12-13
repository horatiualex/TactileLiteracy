import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  imageURL: '/block-previews/timeline.png',
  imageAltText: 'Cronologie - Prezintă evenimente în timp',
  labels: {
    singular: 'Cronologie (Timeline)',
    plural: 'Cronologii',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titlu',
      admin: {
        placeholder: 'Istoria noastră',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitlu',
      editor: lexicalEditor({
        features: ({ rootFeatures }: any) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Urmărește evoluția instituției noastre de-a lungul anilor',
      },
    },
    {
      name: 'events',
      type: 'array',
      label: 'Evenimente Timeline',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Anul',
          required: true,
          admin: {
            placeholder: '1922',
            description: 'Anul evenimentului',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titlu Eveniment',
          required: true,
          admin: {
            placeholder: 'Fondarea instituției',
            description: 'Titlul scurt al evenimentului',
          },
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descriere Detaliată',
          editor: lexicalEditor({
            features: ({ rootFeatures }: any) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description: 'Descrierea completă a evenimentului (opțional)',
          },
        },
      ],
      admin: {
        description: 'Adaugă evenimentele importante din istoria instituției în ordine cronologică',
      },
    },
    {
      name: 'layout',
      type: 'group',
      label: 'Setări Layout',
      fields: [
        {
          name: 'style',
          type: 'select',
          label: 'Stilul Timeline-ului',
          defaultValue: 'auto',
          options: [
            {
              label: 'Automat (Orizontal pentru puține evenimente, Vertical pentru multe)',
              value: 'auto',
            },
            {
              label: 'Întotdeauna Vertical',
              value: 'vertical',
            },
          ],
          admin: {
            description: 'Cum să fie afișat timeline-ul',
          },
        },
      ],
    },
    {
      name: 'background',
      type: 'group',
      label: 'Setări Fundal',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipul Fundalului',
          defaultValue: 'color',
          options: [
            {
              label: 'Culoare (Tema adaptivă)',
              value: 'color',
            },
            {
              label: 'Imagine',
              value: 'image',
            },
          ],
          required: false,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagine de Fundal',
          relationTo: 'media',
          admin: {
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'image',
            description: 'Imaginea care va fi folosită ca fundal',
          },
        },
        {
          name: 'overlayIntensity',
          type: 'number',
          label: 'Intensitate Overlay',
          defaultValue: 0.5,
          min: 0,
          max: 1,
          admin: {
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'image',
            description: 'Intensitatea overlay-ului întunecat (0 = transparent, 1 = complet întunecat)',
          },
        },
      ],
    },
  ],
}