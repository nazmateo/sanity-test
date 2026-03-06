import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'brandImage',
      title: 'Center Brand Image (Fallback)',
      type: 'image',
      description: 'Used when a theme-specific brand image is not set.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().warning('Brand image alt text improves accessibility.'),
        }),
      ],
    }),
    defineField({
      name: 'brandImageLight',
      title: 'Center Brand Image (Light Theme)',
      type: 'image',
      description: 'Logo variant for home/light header theme.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().warning('Brand image alt text improves accessibility.'),
        }),
      ],
    }),
    defineField({
      name: 'brandImageDark',
      title: 'Center Brand Image (Dark Theme)',
      type: 'image',
      description: 'Logo variant for about/default dark-text header theme.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().warning('Brand image alt text improves accessibility.'),
        }),
      ],
    }),
    defineField({
      name: 'brandLink',
      title: 'Center Brand Link',
      type: 'cbLink',
      initialValue: {
        linkType: 'internal',
        internalTargetType: 'path',
        internalPath: '/',
      },
    }),
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
      name: 'submenuGroups',
      title: 'Submenu Groups',
      description: 'Dropdown panel configuration keyed by parent menu item ID.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'headerSubmenuConfig',
          title: 'Header Submenu Config',
          type: 'object',
          fields: [
            defineField({
              name: 'parentItemId',
              title: 'Parent Menu Item ID',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'groups',
              title: 'Panels',
              type: 'array',
              validation: (rule) => rule.required().min(1).max(2),
              of: [
                defineArrayMember({
                  name: 'headerSubmenuPanel',
                  title: 'Panel',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Panel Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'links',
                      title: 'Links',
                      type: 'array',
                      validation: (rule) => rule.required().min(1),
                      of: [defineArrayMember({type: 'menuSubLink'})],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
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
