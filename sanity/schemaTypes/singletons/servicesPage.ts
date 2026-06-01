import { defineArrayMember, defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'coreServices',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
            defineField({ name: 'icon', type: 'string' }),
            defineField({
              name: 'iconBg',
              type: 'string',
              options: { list: ['blue-light', 'red-light'] },
            }),
            defineField({ name: 'accent', type: 'string', options: { list: ['secondary'] } }),
            defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'processSteps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'step', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'highlight', type: 'boolean' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'capabilities',
      type: 'object',
      fields: [
        defineField({
          name: 'featured',
          type: 'object',
          fields: [
            defineField({ name: 'image', type: 'imageWithUrl' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
          ],
        }),
        defineField({
          name: 'internalElectrification',
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
          ],
        }),
        defineField({
          name: 'structural',
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
          ],
        }),
        defineField({
          name: 'energyAuditing',
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
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
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Services Page' }),
  },
})
