import { defineArrayMember, defineField, defineType } from 'sanity'

export const productDetail = defineType({
  name: 'productDetail',
  title: 'Product Detail',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryId',
      type: 'string',
      title: 'Category ID',
      description: 'Matches productCategory.id',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'sku', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'breadcrumbLabel', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'images',
      type: 'object',
      fields: [
        defineField({ name: 'main', type: 'imageWithUrl' }),
        defineField({ name: 'front', type: 'imageWithUrl' }),
        defineField({ name: 'detail', type: 'imageWithUrl' }),
      ],
    }),
    defineField({
      name: 'quickSpecs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'highlight', type: 'boolean' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'technicalParameters',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'parameter', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', categoryId: 'categoryId', subtitle: 'slug.current' },
    prepare: ({ title, categoryId, subtitle }) => ({
      title,
      subtitle: [categoryId, subtitle].filter(Boolean).join(' · '),
    }),
  },
})
