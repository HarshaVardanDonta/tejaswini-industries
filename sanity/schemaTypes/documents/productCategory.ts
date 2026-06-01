import { defineField, defineType } from 'sanity'

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'image', type: 'imageWithUrl' }),
    defineField({ name: 'listingPath', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'id' },
  },
})
