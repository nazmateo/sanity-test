import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageCompaniesSection = defineType({
  name: 'homePageCompaniesSection',
  title: 'Home Page Companies Section',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'CSS color value (example: #151d28).',
      initialValue: '#151d28',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companies',
      title: 'Company Items',
      type: 'array',
      validation: (rule) => rule.required().min(6).max(6),
      of: [
        defineArrayMember({
          name: 'homePageCompaniesItem',
          title: 'Company Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'cbLink',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'label',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      count: 'companies',
    },
    prepare({title, count}) {
      return {
        title: (title || 'Companies Section').split('\n')[0],
        subtitle: `${Array.isArray(count) ? count.length : 0} company items`,
      }
    },
  },
})
