import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageHero = defineType({
  name: 'homePageHero',
  title: 'Home Page Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'cbMedia',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'cbLink',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phrases',
      title: 'Hero Phrases',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).max(3),
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
      mediaType: 'backgroundMedia.mediaType',
    },
    prepare({headline, mediaType}) {
      const title = (headline || 'Home Page Hero').split('\n')[0]
      return {
        title,
        subtitle: mediaType ? `Background: ${mediaType}` : 'Background: not set',
      }
    },
  },
})
