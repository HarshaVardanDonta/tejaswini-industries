import { defineField, defineType } from 'sanity'

export const comparisonParameter = defineType({
  name: 'comparisonParameter',
  title: 'Comparison Parameter',
  type: 'document',
  fields: [
    defineField({ name: 'key', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'hint', type: 'string' }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'key' },
  },
})
