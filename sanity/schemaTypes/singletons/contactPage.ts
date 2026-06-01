import { defineArrayMember, defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'infoCards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'lines', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'mono', type: 'boolean' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'whatsapp',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'buttonLabel', type: 'string' }),
      ],
    }),
    defineField({
      name: 'map',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({ name: 'label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'form',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'submitLabel', type: 'string' }),
      ],
    }),
    defineField({
      name: 'inquiryTypes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
