import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: {
    en: 'Site Settings',
    ro: 'Setări Site',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Accessibility',
            ro: 'Accesibilitate',
          },
          fields: [
            {
              name: 'backToTop',
              type: 'group',
              label: {
                en: 'Back to Top Button',
                ro: 'Buton Înapoi Sus',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: {
                    en: 'Enable Back to Top Button',
                    ro: 'Activează butonul Înapoi Sus',
                  },
                  defaultValue: true,
                  admin: {
                    description: {
                      en: 'Show a button to scroll back to top on long pages',
                      ro: 'Afișează un buton pentru a reveni rapid în partea de sus a paginilor lungi',
                    },
                  },
                },
                {
                  name: 'showAfterScroll',
                  type: 'number',
                  label: {
                    en: 'Show after scroll (pixels)',
                    ro: 'Afișează după scroll (pixeli)',
                  },
                  defaultValue: 300,
                  min: 100,
                  max: 1000,
                  admin: {
                    description: {
                      en: 'Number of pixels to scroll before showing the button',
                      ro: 'Numărul de pixeli de scroll înainte de a afișa butonul',
                    },
                  },
                },
                {
                  name: 'position',
                  type: 'select',
                  label: {
                    en: 'Button Position',
                    ro: 'Poziția Butonului',
                  },
                  defaultValue: 'bottom-right',
                  options: [
                    {
                      label: {
                        en: 'Bottom Right',
                        ro: 'Jos Dreapta',
                      },
                      value: 'bottom-right',
                    },
                    {
                      label: {
                        en: 'Bottom Left',
                        ro: 'Jos Stânga',
                      },
                      value: 'bottom-left',
                    },
                  ],
                },
              ],
            },
            {
              name: 'themeToggle',
              type: 'group',
              label: {
                en: 'Theme Toggle Button',
                ro: 'Buton Schimbare Temă',
              },
              fields: [
                {
                  name: 'showInHeader',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Header',
                    ro: 'Afișează în Header',
                  },
                  defaultValue: true,
                  admin: {
                    description: {
                      en: 'Display theme toggle button in the header for quick access',
                      ro: 'Afișează butonul de schimbare a temei în header pentru acces rapid',
                    },
                  },
                },
                {
                  name: 'showInFooter',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Footer',
                    ro: 'Afișează în Footer',
                  },
                  defaultValue: false,
                  admin: {
                    description: {
                      en: 'Display theme toggle button in the footer',
                      ro: 'Afișează butonul de schimbare a temei în footer',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'General',
            ro: 'General',
          },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: {
                en: 'Site Name',
                ro: 'Nume Site',
              },
              defaultValue: 'S58 Studio',
            },
          ],
        },
      ],
    },
  ],
}
