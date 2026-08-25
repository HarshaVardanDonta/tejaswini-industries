import { defineField, defineType } from 'sanity'

const quoteFields = [
  defineField({ name: 'category', type: 'string' }),
  defineField({ name: 'capacity', type: 'string' }),
  defineField({ name: 'transformerType', type: 'string' }),
  defineField({ name: 'coolingType', type: 'string' }),
  defineField({ name: 'windingMaterial', type: 'string' }),
  defineField({ name: 'tapChanger', type: 'string' }),
  defineField({ name: 'altitude', type: 'string' }),
  defineField({ name: 'maxAmbientTemp', type: 'string' }),
  defineField({ name: 'siteDetails', type: 'string' }),
  defineField({ name: 'standardsIs', type: 'boolean' }),
  defineField({ name: 'standardsIec', type: 'boolean' }),
  defineField({ name: 'standardsAnsi', type: 'boolean' }),
  defineField({ name: 'technicalRequirements', type: 'text' }),
  defineField({ name: 'product', type: 'string' }),
  defineField({ name: 'sku', type: 'string' }),
]

export const siteInquiry = defineType({
  name: 'siteInquiry',
  title: 'Form Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      type: 'string',
      options: {
        list: [
          { title: 'Quote', value: 'quote' },
          { title: 'Contact', value: 'contact' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'responded',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'inquiryLabel', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({
      name: 'quote',
      type: 'object',
      fields: quoteFields,
    }),
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'name',
      source: 'source',
      responded: 'responded',
    },
    prepare({ title, subtitle, source, responded }) {
      const status = responded ? 'Responded' : 'Pending'
      return {
        title: title || subtitle || 'Inquiry',
        subtitle: [source, status].filter(Boolean).join(' · '),
      }
    },
  },
})
