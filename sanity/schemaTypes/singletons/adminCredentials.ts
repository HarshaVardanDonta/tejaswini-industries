import { defineField, defineType } from 'sanity'

export const adminCredentials = defineType({
  name: 'adminCredentials',
  title: 'Admin Credentials',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'password',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Admin Credentials' }),
  },
})
