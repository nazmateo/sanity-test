import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPageLeadershipSection = defineType({
  name: 'aboutPageLeadershipSection',
  title: 'About Page Leadership',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Section Background',
      type: 'string',
      description: 'Any valid CSS background value (e.g. #f8f8f8 or linear-gradient(...)).',
      initialValue: '#f8f8f8',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
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
      name: 'leaders',
      title: 'Leadership Profiles',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'leaderProfile',
          title: 'Leader Profile',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role'},
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'leaders.0.name',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Leadership',
        subtitle: subtitle ? `Starts with ${subtitle}` : 'No leadership profiles',
      }
    },
  },
})

