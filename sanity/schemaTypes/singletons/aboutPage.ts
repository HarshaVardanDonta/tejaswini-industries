import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'image', type: 'imageWithUrl' }),
      ],
    }),
    defineField({
      name: 'overview',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
        defineField({ name: 'isoImage', type: 'imageWithUrl' }),
        defineField({
          name: 'highlights',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', type: 'string' }),
                defineField({ name: 'label', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'visionMission',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
            defineField({
              name: 'variant',
              type: 'string',
              options: { list: ['vision', 'mission'] },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'infrastructure',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'subtitle', type: 'text' }),
        defineField({ name: 'facilityImage', type: 'imageWithUrl' }),
        defineField({
          name: 'features',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', type: 'string' }),
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'description', type: 'text' }),
                defineField({
                  name: 'variant',
                  type: 'string',
                  options: { list: ['primary', 'default'] },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'sectors',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', type: 'string' }),
                defineField({ name: 'label', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'buttonLabel', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
