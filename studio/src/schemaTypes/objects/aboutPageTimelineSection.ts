import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPageTimelineSection = defineType({
  name: 'aboutPageTimelineSection',
  title: 'About Page Timeline',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timelineItems',
      title: 'Timeline Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'timelineItem',
          title: 'Timeline Item',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'year', subtitle: 'description'},
            prepare({title, subtitle}) {
              return {
                title: title || 'Untitled year',
                subtitle: subtitle || 'No description',
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      media: 'backgroundImage',
      subtitle: 'timelineItems.0.year',
    },
    prepare({media, subtitle}) {
      return {
        title: 'About Timeline',
        subtitle: subtitle ? `Starts at ${subtitle}` : 'No timeline items',
        media,
      }
    },
  },
})

