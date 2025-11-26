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
            ro: 'Generale',
          },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: {
                en: 'Site Name',
                ro: 'Nume Site',
              },
              defaultValue: 'Tactile CMS',
              required: true,
              admin: {
                description: {
                  en: 'This name will appear in the browser tab and as the default page title',
                  ro: 'Acest nume va apărea în tab-ul browserului și ca titlu implicit al paginii',
                },
              },
            },
            {
              name: 'siteTitle',
              type: 'text',
              label: {
                en: 'Site Title Template',
                ro: 'Șablon Titlu Site',
              },
              defaultValue: '%s | Tactile CMS',
              admin: {
                description: {
                  en: 'Template for page titles. Use %s as placeholder for page name',
                  ro: 'Șablon pentru titlurile paginilor. Folosiți %s ca placeholder pentru numele paginii',
                },
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              label: {
                en: 'Favicon',
                ro: 'Favicon',
              },
              relationTo: 'media',
              admin: {
                description: {
                  en: 'Upload a .ico, .png, or .svg file for the browser tab icon (recommended: 32x32px or 48x48px)',
                  ro: 'Încărcați un fișier .ico, .png sau .svg pentru iconița din tab-ul browserului (recomandat: 32x32px sau 48x48px)',
                },
              },
            },
            {
              name: 'faviconSvg',
              type: 'upload',
              label: {
                en: 'Favicon SVG',
                ro: 'Favicon SVG',
              },
              relationTo: 'media',
              admin: {
                description: {
                  en: 'Optional: Upload an SVG version for modern browsers',
                  ro: 'Opțional: Încărcați o versiune SVG pentru browsere moderne',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
