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
      name: 'branding',
      type: 'group',
      label: 'Logo și titlu',
      admin: {
        description: 'Configurează logo-ul și textul din partea stângă a header-ului',
      },
      fields: [
        {
          name: 'showLogo',
          type: 'checkbox',
          label: 'Afișează logo',
          defaultValue: true,
        },
        {
          name: 'showText',
          type: 'checkbox',
          label: 'Afișează text',
          defaultValue: false,
        },
        {
          name: 'brandText',
          type: 'text',
          label: 'Text brand',
          admin: {
            condition: (_, siblingData) => siblingData?.showText,
          },
        },
        {
          name: 'linkToHome',
          type: 'checkbox',
          label: 'Logo/text să ducă la pagina principală',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'search',
      type: 'group',
      label: 'Opțiuni căutare',
      admin: {
        description: 'Configurează butonul de căutare din header',
      },
      fields: [
        {
          name: 'showSearch',
          type: 'checkbox',
          label: 'Afișează butonul de căutare',
          defaultValue: true,
        },
        {
          name: 'searchUrl',
          type: 'text',
          label: 'URL căutare',
          admin: {
            condition: (_, siblingData) => siblingData?.showSearch,
            description: 'URL-ul către pagina de căutare (ex: /cautare)',
          },
        },
      ],
    },
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
          name: 'layout',
          type: 'radio',
          label: 'Lățime header',
          defaultValue: 'container',
          admin: { layout: 'horizontal' },
          options: [
            { label: 'Container (Conținut centrat)', value: 'container' },
            { label: 'Full Width (Lățime completă)', value: 'full-width' },
          ],
        },

        {
          name: 'buttonStyle',
          type: 'group',
          label: 'Stil butoane navigare',
          fields: [
            {
              name: 'activeStyle',
              type: 'radio',
              label: 'Stil stare activă',
              defaultValue: 'button',
              admin: { layout: 'horizontal' },
              options: [
                { label: 'Buton (fundal colorat)', value: 'button' },
                { label: 'Underline (subliniere ca Wix)', value: 'underline' },
              ],
            },
            {
              name: 'roundness',
              type: 'radio',
              label: 'Rotunjire butoane',
              defaultValue: 'medium',
              admin: { 
                layout: 'horizontal',
                condition: (_, siblingData) => siblingData?.activeStyle === 'button',
              },
              options: [
                { label: 'Fără', value: 'none' },
                { label: 'Puțin', value: 'small' },
                { label: 'Mediu', value: 'medium' },
                { label: 'Mult', value: 'large' },
                { label: 'Complet', value: 'full' },
              ],
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
