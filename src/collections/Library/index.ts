import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateLibraryItem, revalidateLibraryDelete } from './hooks/revalidateLibraryItem'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Library: CollectionConfig<'library'> = {
  slug: 'library',
  labels: {
    singular: 'Imagine Tactilă',
    plural: 'Bibliotecă',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    tactileImage: true,
    shortDescription: true,
    adaptedFor: true,
    difficultyLevel: true,
    hasDescription: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'categories', 'updatedAt'],
    livePreview: {
      url: ({ data, req }: { data?: { slug?: string | null }; req: unknown }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'library',
          req,
        })

        return path
      },
    },
    preview: (data: { slug?: string | null }, { req }: { req: unknown }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'library',
        req,
      }),
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
      type: 'tabs',
      tabs: [
        {
          label: 'Imagine Tactilă',
          fields: [
            {
              name: 'tactileImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imaginea Tactilă',
              admin: {
                description: 'Imaginea stilizată pentru persoane cu deficiențe de vedere',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Descriere Scurtă',
              admin: {
                description: 'Descriere scurtă afișată în card și în sidebar',
              },
            },
            {
              name: 'downloadFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Fișier pentru Download',
              admin: {
                description: 'Fișierul care va fi descărcat (PDF, SVG, etc.)',
              },
            },
          ],
        },
        {
          label: 'Descrierea Imaginii',
          fields: [
            {
              name: 'imageDescription',
              type: 'richText',
              label: 'Descrierea Detaliată a Imaginii',
              admin: {
                description: 'Descrierea completă a elementelor vizuale din imagine',
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }: { rootFeatures: unknown[] }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
          ],
        },
        {
          label: 'Date Relevante',
          fields: [
            {
              name: 'relevantData',
              type: 'richText',
              label: 'Date Relevante despre Subiect',
              admin: {
                description: 'Informații științifice, educaționale despre subiectul imaginii',
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }: { rootFeatures: unknown[] }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
            {
              name: 'realImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagine Reală',
              admin: {
                description: 'Fotografie reală a subiectului (ex: fotografia pescărușului)',
              },
            },
          ],
        },
        {
          label: 'Bibliografie',
          fields: [
            {
              name: 'bibliography',
              type: 'textarea',
              label: 'Text pentru Bibliografie',
              admin: {
                description: 'Textul pentru citare/referință bibliografică',
              },
            },
          ],
        },
        {
          label: 'Categorii & Relații',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'library-categories',
              label: 'Categorii',
            },
            {
              name: 'adaptedFor',
              type: 'select',
              hasMany: true,
              label: 'Adaptat pentru',
              admin: {
                description: 'Selectează grupurile țintă pentru care este adaptată imaginea',
              },
              options: [
                {
                  label: 'Nevăzători',
                  value: 'blind',
                },
                {
                  label: 'Surzi',
                  value: 'deaf',
                },
                {
                  label: 'Neurodivergenți',
                  value: 'neurodivergent',
                },
              ],
            },
            {
              name: 'difficultyLevel',
              type: 'select',
              label: 'Nivel de dificultate',
              admin: {
                description: 'Nivelul de complexitate al imaginii tactile',
              },
              options: [
                {
                  label: 'Ușor',
                  value: 'easy',
                },
                {
                  label: 'Mediu',
                  value: 'medium',
                },
                {
                  label: 'Dificil',
                  value: 'hard',
                },
              ],
            },
            {
              name: 'hasDescription',
              type: 'checkbox',
              label: 'Are descriere',
              defaultValue: true,
              admin: {
                description: 'Bifează dacă imaginea include descriere detaliată',
              },
            },
            {
              name: 'relatedItems',
              type: 'relationship',
              filterOptions: ({ id }: { id?: string | number }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'library',
              label: 'Imagini Înrudite',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }: { siblingData?: { _status?: string }; value?: unknown }) => {
            if (siblingData?._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'woocommerceProductId',
      type: 'text',
      label: 'WooCommerce Product ID',
      admin: {
        position: 'sidebar',
        description: 'ID-ul produsului din WooCommerce pentru checkout',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Preț (RON)',
      admin: {
        position: 'sidebar',
        description: 'Prețul pentru printare',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateLibraryItem],
    afterDelete: [revalidateLibraryDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
