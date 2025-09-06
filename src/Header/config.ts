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
              name: 'colorTheme',
              type: 'radio',
              label: 'Schemă de culori',
              defaultValue: 'auto',
              admin: { layout: 'horizontal' },
              options: [
                { label: 'Automat (se adaptează la temă)', value: 'auto' },
                { label: 'Personalizată', value: 'custom' },
              ],
            },
            {
              name: 'lightThemeColors',
              type: 'group',
              label: 'Culori temă luminoasă',
              admin: {
                condition: (_, siblingData) => siblingData?.colorTheme === 'custom',
              },
              fields: [
                {
                  name: 'primaryColor',
                  type: 'text',
                  label: 'Culoare primară (hex sau rgba)',
                  admin: {
                    condition: (_, siblingData) => siblingData?.style !== 'text',
                    placeholder: 'rgba(79, 70, 229, 0.8)',
                    description: 'Culoarea de fundal/border pentru butoane în temă luminoasă'
                  },
                },
                {
                  name: 'hoverColor',
                  type: 'text',
                  label: 'Culoare hover (hex sau rgba)',
                  admin: {
                    condition: (_, siblingData) => siblingData?.style !== 'text',
                    placeholder: 'rgba(55, 48, 163, 0.9)',
                    description: 'Culoarea la hover în temă luminoasă'
                  },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Culoare text (hex sau rgba)',
                  admin: {
                    placeholder: 'rgba(255, 255, 255, 0.9)',
                    description: 'Culoarea textului pentru temă luminoasă'
                  },
                },
                {
                  name: 'textHoverColor',
                  type: 'text',
                  label: 'Culoare text hover (hex sau rgba)',
                  admin: {
                    placeholder: '#FFFFFF',
                    description: 'Culoarea textului la hover pentru temă luminoasă'
                  },
                },
              ],
            },
            {
              name: 'darkThemeColors',
              type: 'group',
              label: 'Culori temă întunecată',
              admin: {
                condition: (_, siblingData) => siblingData?.colorTheme === 'custom',
              },
              fields: [
                {
                  name: 'primaryColor',
                  type: 'text',
                  label: 'Culoare primară (hex sau rgba)',
                  admin: {
                    condition: (_, siblingData) => siblingData?.style !== 'text',
                    placeholder: 'rgba(147, 197, 253, 0.8)',
                    description: 'Culoarea de fundal/border pentru butoane în temă întunecată'
                  },
                },
                {
                  name: 'hoverColor',
                  type: 'text',
                  label: 'Culoare hover (hex sau rgba)',
                  admin: {
                    condition: (_, siblingData) => siblingData?.style !== 'text',
                    placeholder: 'rgba(147, 197, 253, 1)',
                    description: 'Culoarea la hover în temă întunecată'
                  },
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Culoare text (hex sau rgba)',
                  admin: {
                    placeholder: 'rgba(30, 41, 59, 0.9)',
                    description: 'Culoarea textului pentru temă întunecată'
                  },
                },
                {
                  name: 'textHoverColor',
                  type: 'text',
                  label: 'Culoare text hover (hex sau rgba)',
                  admin: {
                    placeholder: '#1e293b',
                    description: 'Culoarea textului la hover pentru temă întunecată'
                  },
                },
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
