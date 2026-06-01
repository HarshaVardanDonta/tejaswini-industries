import { defineField, defineType } from 'sanity'

export const imageWithUrl = defineType({
  name: 'imageWithUrl',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Upload',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'url',
      title: 'Image URL',
      type: 'url',
      description: 'Used when no image is uploaded (e.g. external URL).',
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
  ],
})
