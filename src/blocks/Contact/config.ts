import type { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Informații de Contact',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          admin: {
            placeholder: 'exemplu@scoala.ro',
          },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
          admin: {
            placeholder: '+40 123 456 789',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Adresă',
          admin: {
            placeholder: 'Strada Principală nr. 123, București, România',
          },
        },
      ],
    },
    {
      name: 'googleMaps',
      type: 'group',
      label: 'Google Maps',
      fields: [
        {
          name: 'embedUrl',
          type: 'textarea',
          label: 'URL de Embed Google Maps',
          admin: {
            description: 'Copiază URL-ul de embed de la Google Maps (src="..." din iframe)',
            placeholder: 'https://www.google.com/maps/embed?pb=!1m18!1m12...',
            rows: 3,
          },
        },
        {
          name: 'height',
          type: 'number',
          label: 'Înălțimea Hărții (px)',
          defaultValue: 400,
          min: 200,
          max: 800,
          admin: {
            description: 'Înălțimea hărții în pixeli (200-800px)',
          },
        },
      ],
    },
    {
      name: 'businessHours',
      type: 'array',
      label: 'Program de Lucru',
      fields: [
        {
          name: 'day',
          type: 'text',
          label: 'Ziua',
          required: true,
          admin: {
            placeholder: 'Luni - Vineri',
          },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Orele',
          required: true,
          admin: {
            placeholder: '08:00 - 16:00',
          },
        },
      ],
      admin: {
        description: 'Adaugă programul de lucru pentru fiecare zi',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Link-uri Social Media',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platforma',
          required: true,
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Twitter/X',
              value: 'twitter',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
            {
              label: 'TikTok',
              value: 'tiktok',
            },
            {
              label: 'Altă platformă',
              value: 'other',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          admin: {
            placeholder: 'https://facebook.com/scoala',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Eticheta',
          required: true,
          admin: {
            placeholder: 'Pagina noastră de Facebook',
          },
        },
      ],
      admin: {
        description: 'Adaugă link-uri către rețelele sociale',
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      defaultValue: 'grid',
      options: [
        {
          label: 'Grid (informații sus, hartă jos)',
          value: 'grid',
        },
        {
          label: 'Split (informații stânga, hartă dreapta)',
          value: 'split',
        },
      ],
      admin: {
        description: 'Alege cum să fie aranjate elementele',
      },
    },
  ],
}