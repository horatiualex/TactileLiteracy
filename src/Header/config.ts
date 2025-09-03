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
