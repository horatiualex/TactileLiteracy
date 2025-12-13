import { Block } from 'payload'

const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'Întrebări Frecvente (FAQ)',
    plural: 'Secțiuni FAQ',
  },
  imageURL: '/block-previews/faq.png',
  imageAltText: 'FAQ - Întrebări și răspunsuri acordeon',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: false,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: false,
    },
    {
      name: 'width',
      type: 'select',
      label: 'Content Width',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'Extra Large',
          value: 'xlarge',
        },
        {
          label: 'Full Width',
          value: 'full',
        },
      ],
      required: false,
    },
    {
      name: 'showSearch',
      type: 'checkbox',
      label: 'Show Search Bar',
      defaultValue: false,
      required: false,
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder Text',
      defaultValue: 'Search for a question',
      admin: {
        condition: (data: any, siblingData: any) => siblingData.showSearch,
      },
      required: false,
    },
    {
      name: 'style',
      type: 'group',
      label: 'Style Options',
      fields: [
        {
          name: 'backgroundColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Dark',
              value: 'dark',
            },
            {
              label: 'Primary',
              value: 'primary',
            },
          ],
          required: false,
        },
        {
          name: 'questionStyle',
          type: 'select',
          label: 'Question Font Weight',
          defaultValue: 'semibold',
          options: [
            {
              label: 'Normal',
              value: 'normal',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Semi Bold',
              value: 'semibold',
            },
            {
              label: 'Bold',
              value: 'bold',
            },
          ],
          required: false,
        },
        {
          name: 'showDividers',
          type: 'checkbox',
          label: 'Show Dividers Between Items',
          defaultValue: true,
          required: false,
        },
      ],
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ Items',
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          required: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Open by Default',
          defaultValue: false,
          required: false,
        },
      ],
      minRows: 1,
      required: true,
    },
  ],
}

export default FAQ
