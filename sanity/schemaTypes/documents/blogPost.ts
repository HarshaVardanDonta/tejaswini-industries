import { defineArrayMember, defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'id', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Transformers', value: 'transformers' },
          { title: 'Electrical Safety', value: 'electrical-safety' },
          { title: 'Industry News', value: 'industry-news' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
    }),
    defineField({ name: 'categoryLabel', type: 'string' }),
    defineField({ name: 'date', type: 'string' }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'image', type: 'imageWithUrl' }),
    defineField({ name: 'accent', type: 'boolean' }),
    defineField({ name: 'alertMeta', type: 'boolean' }),
    defineField({ name: 'featured', type: 'boolean' }),
    defineField({ name: 'authorRole', type: 'string' }),
    defineField({ name: 'authorImage', type: 'imageWithUrl' }),
    defineField({ name: 'readTime', type: 'string' }),
    defineField({ name: 'breadcrumbLabel', type: 'string' }),
    defineField({ name: 'intro', type: 'text' }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
            defineField({
              name: 'subsections',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'id', type: 'string' }),
                    defineField({ name: 'title', type: 'string' }),
                    defineField({
                      name: 'checklist',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          type: 'object',
                          fields: [
                            defineField({ name: 'label', type: 'string' }),
                            defineField({ name: 'text', type: 'string' }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'table',
              type: 'object',
              fields: [
                defineField({ name: 'headers', type: 'array', of: [{ type: 'string' }] }),
                defineField({
                  name: 'rows',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'cells',
                          type: 'array',
                          of: [{ type: 'string' }],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'alert',
              type: 'object',
              fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'message', type: 'text' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tableOfContents',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'id', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'indent', type: 'boolean' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'relatedProduct',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'capacity', type: 'string' }),
        defineField({ name: 'image', type: 'imageWithUrl' }),
        defineField({ name: 'href', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})

export const trendingArticle = defineType({
  name: 'trendingArticle',
  title: 'Trending Article',
  type: 'document',
  fields: [
    defineField({ name: 'rank', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'readTime', type: 'string' }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'rank' },
  },
})
