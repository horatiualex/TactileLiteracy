import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

/**
 * Header global with fully dynamic multi-level navigation.
 * Admin users can create either a single link or a dropdown that contains submenu items.
 * Each submenu item itself can optionally contain its own nested children (up to 3 levels deep by default).
 */
export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'styling',
      type: 'group',
      label: 'Opțiuni stil header',
      admin: {
        description: 'Personalizează aspectul header-ului',
      },
      fields: [
        {
          name: 'backgroundType',
          type: 'radio',
          label: 'Tip fundal',
          defaultValue: 'transparent',
          admin: { layout: 'horizontal' },
          options: [
            { label: 'Transparent', value: 'transparent' },
            { label: 'Semi-transparent', value: 'semi-transparent' },
            { label: 'Solid', value: 'solid' },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'radio',
          label: 'Culoare fundal',
          defaultValue: 'theme',
          admin: { 
            layout: 'horizontal',
            condition: (_, siblingData) => siblingData?.backgroundType === 'solid' || siblingData?.backgroundType === 'semi-transparent'
          },
          options: [
            { label: 'Temă curentă', value: 'theme' },
            { label: 'Personalizată', value: 'custom' },
          ],
        },
        {
          name: 'customBackgroundColor',
          type: 'text',
          label: 'Culoare personalizată (hex)',
          admin: {
            condition: (_, siblingData) => (siblingData?.backgroundType === 'solid' || siblingData?.backgroundType === 'semi-transparent') && siblingData?.backgroundColor === 'custom',
            placeholder: '#000000'
          },
        },
        {
          name: 'buttonStyle',
          type: 'group',
          label: 'Stil butoane navigare',
          fields: [
            {
              name: 'style',
              type: 'radio',
              label: 'Stil butoane',
              defaultValue: 'text',
              admin: { layout: 'horizontal' },
              options: [
                { label: 'Text simplu', value: 'text' },
                { label: 'Cu fundal', value: 'background' },
                { label: 'Outlined', value: 'outlined' },
              ],
            },
            {
              name: 'roundness',
              type: 'radio',
              label: 'Rotunjire butoane',
              defaultValue: 'medium',
              admin: { layout: 'horizontal' },
              options: [
                { label: 'Fără', value: 'none' },
                { label: 'Puțin', value: 'small' },
                { label: 'Mediu', value: 'medium' },
                { label: 'Mult', value: 'large' },
                { label: 'Complet', value: 'full' },
              ],
            },
            {
              name: 'primaryColor',
              type: 'text',
              label: 'Culoare primară (hex sau rgba)',
              admin: {
                condition: (_, siblingData) => siblingData?.style !== 'text',
                placeholder: 'rgba(79, 70, 229, 0.8)',
                description: 'Exemple: #4F46E5, rgb(79, 70, 229), rgba(79, 70, 229, 0.8) pentru 80% transparență'
              },
            },
            {
              name: 'hoverColor',
              type: 'text',
              label: 'Culoare hover (hex sau rgba)',
              admin: {
                condition: (_, siblingData) => siblingData?.style !== 'text',
                placeholder: 'rgba(55, 48, 163, 0.9)',
                description: 'Exemple: #3730A3, rgba(55, 48, 163, 0.9) pentru 90% transparență'
              },
            },
            {
              name: 'textColor',
              type: 'text',
              label: 'Culoare text butoane (hex sau rgba)',
              admin: {
                placeholder: 'rgba(255, 255, 255, 0.9)',
                description: 'Exemple: #FFFFFF, rgba(255, 255, 255, 0.9) pentru text semi-transparent. Dacă nu e specificată, se folosește automat alb/negru'
              },
            },
            {
              name: 'textHoverColor',
              type: 'text',
              label: 'Culoare text hover (hex sau rgba)',
              admin: {
                placeholder: '#FFFFFF',
                description: 'Exemple: #FFFFFF, rgba(255, 255, 255, 1). Dacă nu e specificată, se folosește textColor sau automat'
              },
            },
          ],
        },
      ],
    },
    {
      name: 'navItems',
      label: 'Elemente meniu',
      type: 'array',
      maxRows: 12,
      admin: {
        initCollapsed: true,
        description:
          'Adaugă elementele principale ale meniului (ex: Concursuri, Serbări, Orare). Poți avea fie un link simplu, fie un dropdown cu pagini dedesubt.',
        components: { RowLabel: '@/Header/RowLabel#RowLabel' },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Titlu meniu',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Tip',
          defaultValue: 'link',
          admin: { layout: 'horizontal' },
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          required: true,
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            name: 'singleLink',
            admin: { condition: (_, siblingData) => siblingData?.type === 'link' },
          },
        }),
        {
          name: 'dropdownStyle',
          type: 'select',
          label: 'Stil dropdown',
          admin: { condition: (_, s) => s?.type === 'dropdown', width: '50%' },
          defaultValue: 'standard',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Cu descrieri', value: 'with-descriptions' },
          ],
        },
        {
          name: 'submenu',
          label: 'Pagini submeniu',
          type: 'array',
          admin: { condition: (_, s) => s?.type === 'dropdown', initCollapsed: true },
          fields: [
            { name: 'label', type: 'text', label: 'Etichetă', required: true },
            link({
              appearances: false,
              disableLabel: true,
              overrides: { name: 'pageLink' },
            }),
            {
              name: 'description',
              type: 'textarea',
              label: 'Descriere (opțional)',
              admin: { rows: 2 },
            },
            { name: 'showNewBadge', type: 'checkbox', label: 'Badge "Nou"', defaultValue: false },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [revalidateHeader] },
}
