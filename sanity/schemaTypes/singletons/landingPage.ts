import { defineArrayMember, defineField, defineType } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({ name: 'badgePrimary', type: 'string', title: 'Primary badge' }),
        defineField({ name: 'badgeSecondary', type: 'string', title: 'Secondary badge' }),
        defineField({ name: 'title', type: 'text', rows: 2 }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'primaryCta', type: 'string', title: 'Primary CTA label' }),
        defineField({ name: 'secondaryCta', type: 'string', title: 'Secondary CTA label' }),
      ],
    }),
    defineField({
      name: 'companyIntro',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({
          name: 'stats',
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
    }),
    defineField({
      name: 'portfolio',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'linkLabel', type: 'string' }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'description', type: 'text' }),
                defineField({ name: 'image', type: 'imageWithUrl' }),
                defineField({
                  name: 'size',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Large', value: 'large' },
                      { title: 'Small', value: 'small' },
                    ],
                  },
                }),
                defineField({ name: 'overlayPrimary', type: 'boolean' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'technicalSupremacy',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
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
                  name: 'accent',
                  type: 'string',
                  options: { list: ['primary', 'secondary'] },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaBanner',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'buttonLabel', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Landing Page' }),
  },
})
