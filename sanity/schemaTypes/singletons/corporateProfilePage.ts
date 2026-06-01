import { defineArrayMember, defineField, defineType } from 'sanity'

export const corporateProfilePage = defineType({
  name: 'corporateProfilePage',
  title: 'Corporate Profile Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({ name: 'badge', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'titleHighlight', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({
          name: 'stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', type: 'string' }),
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'accent', type: 'boolean' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'profile',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
        defineField({
          name: 'highlights',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', type: 'string' }),
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'description', type: 'text' }),
              ],
            }),
          ],
        }),
        defineField({ name: 'established', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Corporate Profile Page' }),
  },
})
