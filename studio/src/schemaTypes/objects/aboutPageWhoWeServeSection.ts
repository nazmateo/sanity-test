import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPageWhoWeServeSection = defineType({
  name: 'aboutPageWhoWeServeSection',
  title: 'About Page Who We Serve',
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
      rows: 8,
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
      name: 'audiencePanelBackground',
      title: 'Audience Panel Background',
      type: 'string',
      description: 'Any valid CSS color value.',
      initialValue: '#0daee4',
    }),
    defineField({
      name: 'audienceItems',
      title: 'Audience Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audienceItem',
          title: 'Audience Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label'},
            prepare({title}) {
              return {title: title || 'Untitled item'}
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'ctaLabel',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Who We Serve',
        subtitle: subtitle || 'No CTA label',
      }
    },
  },
})

