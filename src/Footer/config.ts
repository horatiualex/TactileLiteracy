import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Coloane Footer',
      minRows: 3,
      maxRows: 5,
      admin: {
        description: 'Adaugă între 3-5 coloane pentru footer. Fiecare coloană poate conține text, logo, linkuri sau social media.',
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipul coloanei',
          required: true,
          options: [
            {
              label: 'Logo și descriere',
              value: 'logoAndText',
            },
            {
              label: 'Lista de linkuri',
              value: 'linkList',
            },
            {
              label: 'Social Media',
              value: 'socialMedia',
            },
            {
              label: 'Contact Info',
              value: 'contactInfo',
            },
            {
              label: 'Text personalizat',
              value: 'customText',
            },
          ],
        },
        // Logo and Text Column
        {
          name: 'logoText',
          type: 'group',
          label: 'Setări Logo și Text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'logoAndText',
          },
          fields: [
            {
              name: 'showLogo',
              type: 'checkbox',
              label: 'Afișează logo',
              defaultValue: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Titlu (opțional)',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descriere',
              admin: {
                rows: 4,
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Platforma',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'Email', value: 'email' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Link URL',
                  required: true,
                },
              ],
            },
          ],
        },
        // Link List Column
        {
          name: 'linkList',
          type: 'group',
          label: 'Lista de Linkuri',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'linkList',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titlul secțiunii',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              label: 'Linkuri',
              maxRows: 10,
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'customHtml',
              type: 'code',
              label: 'Custom HTML (ex: ANPC badges)',
              admin: {
                language: 'html',
                description: 'Introduceți cod HTML personalizat care va apărea sub lista de linkuri.',
              },
            },
          ],
        },
        // Social Media Column
        {
          name: 'socialMedia',
          type: 'group',
          label: 'Social Media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'socialMedia',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titlul secțiunii',
              defaultValue: 'Urmărește-ne',
            },
            {
              name: 'platforms',
              type: 'array',
              label: 'Platforme sociale',
              maxRows: 8,
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Platforma',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Email', value: 'email' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Etichetă (opțional)',
                  admin: {
                    description: 'Dacă nu este completat, se va folosi numele platformei',
                  },
                },
              ],
            },
          ],
        },
        // Contact Info Column
        {
          name: 'contactInfo',
          type: 'group',
          label: 'Informații Contact',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'contactInfo',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titlul secțiunii',
              defaultValue: 'Contact',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Adresă',
              admin: {
                rows: 2,
              },
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
            },
            {
              name: 'schedule',
              type: 'array',
              label: 'Program',
              maxRows: 7,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Etichetă (ex: Secretariat)',
                  required: true,
                },
                {
                  name: 'time',
                  type: 'text',
                  label: 'Interval orar',
                  required: true,
                },
              ],
            },
          ],
        },
        // Custom Text Column
        {
          name: 'customText',
          type: 'group',
          label: 'Text Personalizat',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'customText',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titlul secțiunii',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Conținut',
              admin: {
                description: 'Poți adăuga text formatat, linkuri, etc.',
              },
            },
          ],
        },
      ],
    },
    // Footer bottom section
    {
      name: 'bottomSection',
      type: 'group',
      label: 'Secțiunea de jos',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Text copyright',
          defaultValue: '© 2025 Școala Gimnazială "Mihai Eminescu" Vaslui. Toate drepturile rezervate.',
        },
        {
          name: 'bottomLinks',
          type: 'array',
          label: 'Linkuri de jos',
          maxRows: 5,
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        {
          name: 'showThemeSelector',
          type: 'checkbox',
          label: 'Afișează selector temă',
          defaultValue: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
