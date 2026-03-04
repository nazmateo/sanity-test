import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'primaryMenu',
      title: 'Primary menu',
      description: 'Main header menu.',
      type: 'menuGroup',
      initialValue: {
        menuId: 'primary',
        title: 'Primary',
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const menu = value as {menuId?: string} | undefined
          if (!menu) return true
          if (menu.menuId !== 'primary') {
            return 'Primary menu must use menuId "primary".'
          }
          return true
        }),
    }),
    defineField({
      name: 'secondaryMenu',
      title: 'Secondary menu',
      description: 'Secondary/utility header menu.',
      type: 'menuGroup',
      initialValue: {
        menuId: 'secondary',
        title: 'Secondary',
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const menu = value as {menuId?: string} | undefined
          if (!menu) return true
          if (menu.menuId !== 'secondary') {
            return 'Secondary menu must use menuId "secondary".'
          }
          return true
        }),
    }),
    defineField({
      name: 'languageToggleLabel',
      title: 'Language toggle label',
      type: 'string',
      initialValue: 'AR',
    }),
    defineField({
      name: 'languageTogglePath',
      title: 'Language toggle path',
      type: 'string',
      initialValue: '/ae',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Header CTA label',
      type: 'string',
      initialValue: 'CreatedbyBlack',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Header CTA link',
      type: 'cbLink',
      initialValue: {
        linkType: 'external',
        externalUrl: 'https://createdbyblack.com',
        openInNewTab: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
      }
    },
  },
})
