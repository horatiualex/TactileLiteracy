import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const HeroBanner: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  imageURL: '/block-previews/herobanner.png',
  imageAltText: 'Banner - Secțiune hero mare cu imagine',
  labels: {
    singular: 'Banner (Hero)',
    plural: 'Bannere',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titlu',
      required: true,
      admin: {
        placeholder: 'Găsește mașina ta perfectă',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descriere',
      required: false,
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
        description: 'Text descriptiv opțional sub titlu',
      },
    },
    {
      name: 'layout',
      type: 'group',
      label: 'Layout',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tip Layout',
          defaultValue: 'split',
          options: [
            {
              label: 'Split Screen (Text stânga, Imagine dreapta)',
              value: 'split',
            },
            {
              label: 'Centrat (Doar text)',
              value: 'centered',
            },
            {
              label: 'Full Width (Text peste imagine de fundal)',
              value: 'fullWidth',
            },
          ],
          required: true,
          admin: {
            description: 'Alege cum vrei să fie aranjat conținutul',
          },
        },
        {
          name: 'size',
          type: 'select',
          label: 'Înălțime Banner',
          defaultValue: 'medium',
          options: [
            {
              label: 'Mic',
              value: 'small',
            },
            {
              label: 'Mediu',
              value: 'medium',
            },
            {
              label: 'Mare',
              value: 'large',
            },
            {
              label: 'Ecran Complet',
              value: 'fullHeight',
            },
          ],
          required: false,
          admin: {
            description: 'Controlează înălțimea banner-ului',
          },
        },
        {
          name: 'contentAlignment',
          type: 'select',
          label: 'Aliniere Text',
          defaultValue: 'left',
          options: [
            {
              label: 'Stânga',
              value: 'left',
            },
            {
              label: 'Centru',
              value: 'center',
            },
          ],
          required: false,
          admin: {
            description: 'Alinierea textului în zona de conținut',
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
          label: 'Tip Fundal',
          defaultValue: 'themeAware',
          options: [
            {
              label: 'Tema Adaptivă (Se schimbă cu dark/light mode)',
              value: 'themeAware',
            },
            {
              label: 'Culoare Personalizată',
              value: 'customColor',
            },
            {
              label: 'Gradient',
              value: 'gradient',
            },
            {
              label: 'Imagine',
              value: 'image',
            },
          ],
          required: true,
          admin: {
            description: 'Alege tipul de fundal pentru banner',
          },
        },
        {
          name: 'customColor',
          type: 'text',
          label: 'Culoare Personalizată',
          required: false,
          admin: {
            placeholder: '#1e40af',
            description: 'Cod culoare hex (ex: #1e40af)',
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'customColor',
          },
        },
        {
          name: 'gradientFrom',
          type: 'text',
          label: 'Gradient De La',
          required: false,
          admin: {
            placeholder: '#1e40af',
            description: 'Culoare de start pentru gradient',
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'gradient',
          },
        },
        {
          name: 'gradientTo',
          type: 'text',
          label: 'Gradient Până La',
          required: false,
          admin: {
            placeholder: '#7c3aed',
            description: 'Culoare finală pentru gradient',
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'gradient',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine de Fundal',
          required: false,
          admin: {
            description: 'Imagine pentru fundal (când tipul este "Imagine")',
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'image',
          },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Opacitate Overlay',
          defaultValue: 0.5,
          min: 0,
          max: 1,
          required: false,
          admin: {
            description: 'Întunecă imaginea de fundal pentru lizibilitate (0-1)',
            condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'image',
          },
        },
        {
          name: 'textColor',
          type: 'select',
          label: 'Culoare Text',
          defaultValue: 'auto',
          options: [
            {
              label: 'Auto (Alb pe fundal întunecat, Negru pe fundal deschis)',
              value: 'auto',
            },
            {
              label: 'Întotdeauna Alb',
              value: 'white',
            },
            {
              label: 'Întotdeauna Negru',
              value: 'dark',
            },
          ],
          required: false,
          admin: {
            description: 'Controlează culoarea textului',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'group',
      label: 'Imagine Banner',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Adaugă Imagine',
          defaultValue: true,
          required: false,
          admin: {
            description: 'Bifează pentru a adăuga o imagine în banner',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Selectează Imaginea',
          required: false,
          admin: {
            description: 'Imaginea care apare în partea dreaptă (pentru split layout)',
            condition: (_: unknown, siblingData: { enabled?: boolean }) => siblingData?.enabled === true,
          },
        },
        {
          name: 'position',
          type: 'select',
          label: 'Poziție Imagine',
          defaultValue: 'right',
          options: [
            {
              label: 'Dreapta',
              value: 'right',
            },
            {
              label: 'Stânga',
              value: 'left',
            },
          ],
          required: false,
          admin: {
            description: 'Unde apare imaginea în layout split',
            condition: (_: unknown, siblingData: { enabled?: boolean }) => siblingData?.enabled === true,
          },
        },
      ],
    },
    {
      name: 'button',
      type: 'group',
      label: 'Buton Call-to-Action',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Adaugă Buton',
          defaultValue: false,
          required: false,
          admin: {
            description: 'Bifează pentru a adăuga un buton',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Text Buton',
          required: false,
          admin: {
            placeholder: 'Află mai multe',
            condition: (_: unknown, siblingData: { enabled?: boolean }) => siblingData?.enabled === true,
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          required: false,
          admin: {
            placeholder: '/contact',
            condition: (_: unknown, siblingData: { enabled?: boolean }) => siblingData?.enabled === true,
          },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Stil Buton',
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
          ],
          required: false,
          admin: {
            condition: (_: unknown, siblingData: { enabled?: boolean }) => siblingData?.enabled === true,
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Deschide în Tab Nou',
          defaultValue: false,
          required: false,
          admin: {
            condition: (_: unknown, siblingData: { enabled?: boolean }) => siblingData?.enabled === true,
          },
        },
      ],
    },
  ],
}

export default HeroBanner
