import type { Block } from 'payload'

const StatsSection: Block = {
  slug: 'statsSection',
  interfaceName: 'StatsSectionBlock',
  labels: {
    singular: 'Secțiune Statistici',
    plural: 'Secțiuni Statistici',
  },
  imageURL: '/api/media/file/stats-section-block.jpg',
  imageAltText: 'Stats Section Block',
  fields: [
    {
      name: 'layout',
      type: 'group',
      label: 'Setări Layout',
      fields: [
        {
          name: 'textPosition',
          type: 'select',
          label: 'Poziția Textului',
          defaultValue: 'left',
          options: [
            {
              label: 'Stânga',
              value: 'left',
            },
            {
              label: 'Dreapta', 
              value: 'right',
            },
            {
              label: 'Centru (Lățime Completă)',
              value: 'center',
            },
          ],
          required: false,
        },
        {
          name: 'statsCount',
          type: 'select',
          label: 'Numărul de Statistici',
          defaultValue: '4',
          options: [
            {
              label: '2 Statistici',
              value: '2',
            },
            {
              label: '4 Statistici',
              value: '4',
            },
            {
              label: '6 Statistici',
              value: '6',
            },
          ],
          required: false,
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
          defaultValue: 'solid',
          options: [
            {
              label: 'Fundal Solid (Auto-Adaptat)',
              value: 'solid',
            },
            {
              label: 'Imagine Fundal',
              value: 'image',
            },
          ],
          required: false,
          admin: {
            description: 'Fundalul solid se adaptează automat la tema (gri deschis/întunecat)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine Fundal',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Imaginea de fundal pentru secțiune',
          },
        },
        {
          name: 'overlay',
          type: 'select',
          label: 'Overlay Imagine',
          defaultValue: 'dark',
          options: [
            {
              label: 'Overlay Întunecat',
              value: 'dark',
            },
            {
              label: 'Overlay Deschis',
              value: 'light',
            },
            {
              label: 'Fără Overlay',
              value: 'none',
            },
          ],
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Overlay pentru îmbunătățirea lizibilității textului peste imagine',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      label: 'Conținut',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titlu',
          required: false,
          admin: {
            description: 'Titlul principal pentru secțiunea de statistici',
          },
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descriere',
          required: false,
          admin: {
            description: 'Descrierea opțională pentru secțiunea de statistici',
          },
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistici',
      labels: {
        singular: 'Statistică',
        plural: 'Statistici',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Număr/Valoare',
          required: true,
          admin: {
            description: 'ex: "150+", "50K+", "99%"',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Eticheta',
          required: true,
          admin: {
            description: 'ex: "Organizații Partenere", "Utilizatori Deserviți"',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Iconiță (Opțional)',
          required: false,
        },
        {
          name: 'iconText',
          type: 'text',
          label: 'Text Iconiță (Alternativă)',
          required: false,
          admin: {
            description: 'Folosește emoji sau text în loc de iconiță încărcată',
          },
        },
      ],
      minRows: 2,
      maxRows: 6,
      required: true,
      admin: {
        description: 'Adaugă 2, 4, sau 6 statistici cu numere și etichete',
      },
    },
  ],
}

export default StatsSection
