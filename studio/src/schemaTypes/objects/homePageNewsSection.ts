import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageNewsSection = defineType({
  name: 'homePageNewsSection',
  title: 'Home Page News Section',
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
      name: 'featuredPost',
      title: 'Featured Post',
      type: 'reference',
      to: [{type: 'post'}],
    }),
    defineField({
      name: 'featuredLinkLabel',
      title: 'Featured Link Label',
      type: 'string',
      initialValue: 'READ MORE',
    }),
    defineField({
      name: 'cards',
      title: 'News Cards',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          name: 'homePageNewsCardItem',
          title: 'News Card Item',
          type: 'object',
          fields: [
            defineField({
              name: 'post',
              title: 'Post',
              type: 'reference',
              to: [{type: 'post'}],
            }),
            defineField({
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
              initialValue: 'READ MORE',
            }),
          ],
          preview: {
            select: {
              title: 'post.title',
              subtitle: 'linkLabel',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'backToTopLabel',
      title: 'Back To Top Label',
      type: 'string',
      initialValue: 'Back to Top',
    }),
    defineField({
      name: 'backToTopLink',
      title: 'Back To Top Link',
      type: 'cbLink',
      description: 'Internal path like /#top',
    }),
  ],
  preview: {
    select: {
      title: 'featuredPost.title',
      count: 'cards',
    },
    prepare({title, count}) {
      return {
        title: (title || 'News Section').split('\n')[0],
        subtitle: `${Array.isArray(count) ? count.length : 0} secondary cards`,
      }
    },
  },
})
