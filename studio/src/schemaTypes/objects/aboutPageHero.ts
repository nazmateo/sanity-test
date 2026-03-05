import {defineField, defineType} from 'sanity'

export const aboutPageHero = defineType({
  name: 'aboutPageHero',
  title: 'About Page Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: '#f8f8f8',
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'personRole',
      title: 'Person Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Hero Media',
      type: 'cbMedia',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Video Poster Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      description: 'Shown before video starts. Used when Hero Media type is video.',
    }),
    defineField({
      name: 'mediaCaption',
      title: 'Media Caption',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      subtitle: 'personName',
    },
    prepare({title, subtitle}) {
      return {
        title: (title || 'About Hero').split('\n')[0],
        subtitle: subtitle || 'No person name',
      }
    },
  },
})
