import { defineArrayMember, defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'id', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Transformers', value: 'transformers' },
          { title: 'HT Panels', value: 'ht-panels' },
          { title: 'Installations', value: 'installations' },
        ],
      },
    }),
    defineField({ name: 'categoryLabel', type: 'string' }),
    defineField({ name: 'sector', type: 'string' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'image', type: 'imageWithUrl' }),
    defineField({
      name: 'specs',
      type: 'array',
      of: [defineArrayMember({ type: 'spec' })],
    }),
    defineField({ name: 'accent', type: 'boolean' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location' },
  },
})

export const commissionRow = defineType({
  name: 'commissionRow',
  title: 'Commission Row',
  type: 'document',
  fields: [
    defineField({ name: 'id', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'sector', type: 'string' }),
    defineField({ name: 'deliverable', type: 'string' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['active', 'closed'] },
    }),
  ],
  preview: {
    select: { title: 'deliverable', subtitle: 'sector' },
  },
})

