import {defineField, defineType} from 'sanity'

export const homePageSectorsSection = defineType({
  name: 'homePageSectorsSection',
  title: 'Home Page Sectors Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'leftImage',
      title: 'Left Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rightImageLink',
      title: 'Right Image Link',
      type: 'cbLink',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: (title || 'Sectors Section').split('\n')[0],
      }
    },
  },
})
