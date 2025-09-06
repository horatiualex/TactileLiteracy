import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Galerie',
    plural: 'Galerii',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titlu galerie',
      admin: {
        description: 'Titlul principal pentru galerie (opțional)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descriere',
      admin: {
        description: 'Descriere pentru galerie (opțional)',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imagini',
      minRows: 1,
      labels: {
        singular: 'Imagine',
        plural: 'Imagini',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagine',
          required: true,
          admin: {
            description: 'Selectează imaginea pentru galerie',
          },
          validate: (value: unknown) => {
            if (!value) {
              return 'Imaginea este obligatorie'
            }
            // Ensure value is either a string (ID) or valid object with id
            if (typeof value === 'string') {
              return true
            }
            if (typeof value === 'object' && value !== null && 'id' in value) {
              return true
            }
            return 'Selectează o imagine validă din biblioteca media'
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Titlu imagine',
          admin: {
            description: 'Titlu/descriere pentru imagine (opțional)',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Text alternativ',
          admin: {
            description: 'Text alternativ pentru accesibilitate (opțional)',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Tip layout',
      defaultValue: 'masonry',
      options: [
        {
          label: 'Masonry (înălțimi diferite)',
          value: 'masonry',
        },
        {
          label: 'Grid uniform',
          value: 'grid',
        },
        {
          label: 'Grid mare cu thumbnail-uri',
          value: 'featured',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Număr coloane',
      defaultValue: 'auto',
      options: [
        {
          label: 'Automat (responsive)',
          value: 'auto',
        },
        {
          label: '2 coloane',
          value: '2',
        },
        {
          label: '3 coloane',
          value: '3',
        },
        {
          label: '4 coloane',
          value: '4',
        },
        {
          label: '5 coloane',
          value: '5',
        },
      ],
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      label: 'Activează lightbox',
      defaultValue: true,
      admin: {
        description: 'Permite vizualizarea imaginilor în modul lightbox la click',
      },
    },
  ],
}
