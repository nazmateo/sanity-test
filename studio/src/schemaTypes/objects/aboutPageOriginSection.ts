import {defineField, defineType} from 'sanity'

export const aboutPageOriginSection = defineType({
  name: 'aboutPageOriginSection',
  title: 'About Page Origin Section',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Any valid CSS background value (e.g. #151d28 or linear-gradient(...)).',
      initialValue: '#151d28',
    }),
    defineField({
      name: 'image',
      title: 'Left Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageBadgeLabel',
      title: 'Image Badge Label',
      type: 'string',
      initialValue: 'AL BATHA = THE VALLEY',
      validation: (rule) => rule.required(),
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
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'ctaLabel',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'About Origin Section',
        subtitle: subtitle || 'No CTA label',
        media,
      }
    },
  },
})
