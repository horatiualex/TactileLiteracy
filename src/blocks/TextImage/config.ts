import { Block } from 'payload'

export const TextImage: Block = {
  slug: 'textImage',
  imageURL: '/block-previews/textimage.png',
  imageAltText: 'Text & Imagine - Layout text alături de imagine',
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
        {
          label: 'Hero Overlay (Text pe Imagine)',
          value: 'overlay',
        },
        {
          label: 'Content Focus (Text Dominant)',
          value: 'contentFocus',
        },
        {
          label: 'Image Focus (Imagine Dominantă)',
          value: 'imageFocus',
        },
      ],
      admin: {
        description: 'Alege stilul de layout - traditional, overlay modern, sau focus pe conținut/imagine',
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
          name: 'headingSize',
          type: 'select',
          label: 'Mărime Titlu',
          defaultValue: 'large',
          options: [
            {
              label: 'Normal',
              value: 'normal',
            },
            {
              label: 'Mare',
              value: 'large',
            },
            {
              label: 'Foarte Mare (Hero)',
              value: 'xl',
            },
            {
              label: 'Extra Mare (Statement)',
              value: '2xl',
            },
          ],
          admin: {
            condition: (_: unknown, siblingData: { heading?: string }) => siblingData?.heading,
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
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Text',
          admin: {
            description: 'Text mic deasupra titlului (stilul premium)',
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
                    condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'internal',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  admin: {
                    condition: (_: unknown, siblingData: { type?: string }) => siblingData?.type === 'external',
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
            {
              label: 'Fundal Premium (Gri Elegant)',
              value: 'premium',
            },
            {
              label: 'Fundal Dark Modern',
              value: 'dark',
            },
            {
              label: 'Gradient Elegant',
              value: 'gradient',
            },
          ],
          admin: {
            description: 'Stilul de fundal al secțiunii',
          },
        },
        {
          name: 'spacing',
          type: 'select',
          label: 'Spațiere',
          defaultValue: 'large',
          options: [
            {
              label: 'Compactă',
              value: 'compact',
            },
            {
              label: 'Standard',
              value: 'standard',
            },
            {
              label: 'Mare (Recommended)',
              value: 'large',
            },
            {
              label: 'Extra Mare (Hero Style)',
              value: 'xl',
            },
          ],
          admin: {
            description: 'Spațierea verticală a secțiunii',
          },
        },
        {
          name: 'imageStyle',
          type: 'group',
          label: 'Stil Imagine',
          fields: [
            {
              name: 'borderRadius',
              type: 'select',
              label: 'Rotunjire Colțuri',
              defaultValue: 'medium',
              options: [
                {
                  label: 'Fără',
                  value: 'none',
                },
                {
                  label: 'Mică',
                  value: 'small',
                },
                {
                  label: 'Medie',
                  value: 'medium',
                },
                {
                  label: 'Mare',
                  value: 'large',
                },
                {
                  label: 'Extra Mare',
                  value: 'xl',
                },
              ],
            },
            {
              name: 'shadow',
              type: 'select',
              label: 'Umbră',
              defaultValue: 'medium',
              options: [
                {
                  label: 'Fără',
                  value: 'none',
                },
                {
                  label: 'Subtilă',
                  value: 'small',
                },
                {
                  label: 'Medie',
                  value: 'medium',
                },
                {
                  label: 'Mare (Premium)',
                  value: 'large',
                },
              ],
            },
            {
              name: 'overlay',
              type: 'checkbox',
              label: 'Overlay pentru Text',
              admin: {
                description: 'Adaugă un overlay pentru textul pe imagine (pentru layout overlay)',
              },
            },
          ],
        },
  ],
}
