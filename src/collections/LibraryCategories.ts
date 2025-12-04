import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const LibraryCategories: CollectionConfig = {
  slug: 'library-categories',
  labels: {
    singular: 'Categorie Bibliotecă',
    plural: 'Categorii Bibliotecă',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titlu',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descriere',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Iconiță',
      admin: {
        description: 'Iconiță opțională pentru categorie',
      },
    },
    ...slugField(),
  ],
}
