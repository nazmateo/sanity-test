import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'content', title: 'Content'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'en',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Post Link',
      type: 'cbLink',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'cardImage',
    },
    prepare({title, date, media}) {
      return {
        title: title || 'Untitled post',
        subtitle: date || 'No date',
        media,
      }
    },
  },
})
