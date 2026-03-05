import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageBelowFold = defineType({
  name: 'homePageBelowFold',
  title: 'Home Page Below The Fold',
  type: 'object',
  fields: [
    defineField({
      name: 'introImage',
      title: 'Intro Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
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
      name: 'stats',
      title: 'Stat Cards',
      type: 'array',
      validation: (rule) => rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          name: 'homePageBelowFoldStat',
          title: 'Stat Card',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
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
              name: 'subLabel',
              title: 'Sub Label',
              type: 'string',
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              initialValue: 'dark',
              options: {
                list: [
                  {title: 'Dark', value: 'dark'},
                  {title: 'Blue', value: 'blue'},
                  {title: 'Outline', value: 'outline'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      count: 'stats',
    },
    prepare({title, count}) {
      return {
        title: (title || 'Below The Fold').split('\n')[0],
        subtitle: `${Array.isArray(count) ? count.length : 0} stat cards`,
      }
    },
  },
})

