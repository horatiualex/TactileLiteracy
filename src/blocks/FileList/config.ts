import type { Block } from 'payload'

export const FileList: Block = {
  slug: 'fileList',
  interfaceName: 'FileListBlock',
  labels: {
    singular: 'Lista Fișiere',
    plural: 'Liste Fișiere',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titlu secțiune',
      admin: {
        description: 'Titlul principal pentru lista de fișiere (opțional)',
      },
    },
    {
      name: 'files',
      type: 'array',
      label: 'Fișiere',
      minRows: 1,
      labels: {
        singular: 'Fișier',
        plural: 'Fișiere',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titlu fișier',
          required: true,
          admin: {
            description: 'Numele care va fi afișat pentru acest fișier',
          },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'Fișier',
          required: true,
          admin: {
            description: 'Selectează fișierul (PDF, DOC, XLS, etc.)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descriere',
          admin: {
            description: 'Descriere opțională pentru fișier',
          },
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: 'Stil listă',
      defaultValue: 'list',
      options: [
        {
          label: 'Listă cu bullet points',
          value: 'list',
        },
        {
          label: 'Carduri',
          value: 'cards',
        },
        {
          label: 'Listă compactă',
          value: 'compact',
        },
      ],
    },
    {
      name: 'columns',
      type: 'radio',
      label: 'Numărul de coloane',
      defaultValue: '1',
      admin: {
        layout: 'horizontal',
        description: 'Alege câte coloane să fie afișate pentru lista de fișiere',
      },
      options: [
        {
          label: '1 coloană',
          value: '1',
        },
        {
          label: '2 coloane',
          value: '2',
        },
      ],
    },
  ],
}
