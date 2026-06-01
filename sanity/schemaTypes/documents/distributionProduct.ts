import { defineArrayMember, defineField, defineType } from 'sanity'

export const distributionProduct = defineType({
  name: 'distributionProduct',
  title: 'Distribution Product',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryId',
      type: 'string',
      title: 'Category ID',
      description: 'Matches productCategory.id (e.g. distribution-transformers)',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'id', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'image', type: 'imageWithUrl' }),
    defineField({
      name: 'specs',
      type: 'array',
      of: [defineArrayMember({ type: 'spec' })],
    }),
    defineField({
      name: 'badge',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          type: 'string',
          options: { list: ['best-seller', 'efficiency'] },
        }),
        defineField({ name: 'label', type: 'string' }),
        defineField({ name: 'icon', type: 'string' }),
      ],
    }),
    defineField({ name: 'accent', type: 'boolean' }),
    defineField({ name: 'detailSlug', type: 'string' }),
    defineField({ name: 'comparisonSku', type: 'string' }),
    defineField({ name: 'comparisonHighlight', type: 'boolean' }),
    defineField({
      name: 'comparisonValues',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'key', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', categoryId: 'categoryId', subtitle: 'id' },
    prepare: ({ title, categoryId, subtitle }) => ({
      title,
      subtitle: [categoryId, subtitle].filter(Boolean).join(' · '),
    }),
  },
})
