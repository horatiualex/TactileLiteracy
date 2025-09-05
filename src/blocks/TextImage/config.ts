import { Block } from 'payload'

export const TextImage: Block = {
  slug: 'textImage',
  labels: {
    singular: 'Text & Imagine',
    plural: 'Blocuri Text & Imagine',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'textLeft',
      options: [
        {
          label: 'Text Stânga, Imagine Dreapta',
          value: 'textLeft',
        },
        {
          label: 'Imagine Stânga, Text Dreapta',
          value: 'imageLeft',
        },
      ],
      admin: {
        description: 'Alege dacă textul apare în stânga sau dreapta',
      },
    },
    {
      name: 'content',
      type: 'group',
      label: 'Conținut',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Titlu Principal',
          admin: {
            description: 'Titlul principal pentru această secțiune',
          },
        },
        {
          name: 'subheading',
          type: 'text',
          label: 'Subtitlu',
          admin: {
            description: 'Subtitlu opțional',
          },
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Conținut Text',
          required: true,
          admin: {
            description: 'Conținutul principal de text',
          },
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'Butoane',
          admin: {
            description: 'Butoane opționale pentru acțiuni',
          },
          fields: [
            {
              name: 'link',
              type: 'group',
              label: 'Link',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  label: 'Tip Link',
                  options: [
                    {
                      label: 'Pagină Internă',
                      value: 'internal',
                    },
                    {
                      label: 'URL Extern',
                      value: 'external',
                    },
                  ],
                  defaultValue: 'internal',
                },
                {
                  name: 'reference',
                  type: 'relationship',
                  label: 'Pagină',
                  relationTo: 'pages',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'internal',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'external',
                  },
                },
              ],
            },
            {
              name: 'label',
              type: 'text',
              label: 'Text Buton',
              required: true,
            },
            {
              name: 'style',
              type: 'select',
              label: 'Stil Buton',
              defaultValue: 'primary',
              options: [
                {
                  label: 'Principal',
                  value: 'primary',
                },
                {
                  label: 'Secundar',
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
      label: 'Imagine',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Imaginea care se va afișa alături de text',
      },
    },
    {
      name: 'imageAspect',
      type: 'select',
      label: 'Proporții Imagine',
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto (Original)',
          value: 'auto',
        },
        {
          label: 'Pătrat (1:1)',
          value: 'square',
        },
        {
          label: 'Peisaj (4:3)',
          value: 'landscape',
        },
        {
          label: 'Panoramic (16:9)',
          value: 'wide',
        },
        {
          label: 'Portret (3:4)',
          value: 'portrait',
        },
      ],
      admin: {
        description: 'Controlează proporțiile imaginii',
      },
    },
    {
      name: 'verticalAlignment',
      type: 'select',
      label: 'Aliniere Verticală',
      defaultValue: 'center',
      options: [
        {
          label: 'Sus',
          value: 'start',
        },
        {
          label: 'Centru',
          value: 'center',
        },
        {
          label: 'Jos',
          value: 'end',
        },
      ],
      admin: {
        description: 'Cum să fie aliniat conținutul pe verticală',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Tip Fundal',
      defaultValue: 'none',
      options: [
        {
          label: 'Fără Fundal',
          value: 'none',
        },
        {
          label: 'Fundal Subtil (Auto-Adaptat)',
          value: 'subtle',
        },
      ],
      admin: {
        description: 'Fundalul subtil se adaptează automat la tema (gri foarte deschis/întunecat)',
      },
    },
  ],
}
