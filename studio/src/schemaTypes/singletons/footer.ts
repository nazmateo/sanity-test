import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().warning('Heading image alt text improves accessibility.'),
        }),
      ],
    }),
    defineField({
      name: 'officeHeading',
      title: 'Office heading',
      type: 'string',
      initialValue: 'Albatha Head Offices',
    }),
    defineField({
      name: 'officeAddressOne',
      title: 'Office address (column 1)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'officeAddressTwo',
      title: 'Office address (column 2)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      initialValue: '+971 4 371 1300',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'business@albatha.com',
    }),
    defineField({
      name: 'menu',
      title: 'Footer menu',
      description: 'Main footer links.',
      type: 'menuGroup',
      initialValue: {
        menuId: 'footer',
        title: 'Footer',
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const menu = value as {menuId?: string} | undefined
          if (!menu) return true
          if (menu.menuId !== 'footer') {
            return 'Footer menu must use menuId "footer".'
          }
          return true
        }),
    }),
    defineField({
      name: 'menuGroups',
      title: 'Additional menu groups',
      description: 'Additional columns for footer navigation.',
      type: 'array',
      of: [defineArrayMember({type: 'menuGroup'})],
      validation: (rule) =>
        rule.custom((value) => {
          if (!Array.isArray(value)) {
            return true
          }

          const menuIds = (value as Array<{menuId?: string}>)
            .map((group) => group?.menuId)
            .filter(Boolean)
          const duplicates = menuIds.filter((id, index) => menuIds.indexOf(id) !== index)
          if (duplicates.length > 0) {
            return `Duplicate menu IDs found: ${Array.from(new Set(duplicates)).join(', ')}`
          }
          return true
        }),
    }),
    defineField({
      name: 'navigationGroups',
      title: 'Right navigation groups',
      description: 'Three navigation columns shown on the right side of the footer.',
      type: 'array',
      of: [defineArrayMember({type: 'menuGroup'})],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'legalMenu',
      title: 'Legal menu',
      description: 'Optional legal links (privacy, terms, etc).',
      type: 'menuGroup',
      initialValue: {
        menuId: 'legal',
        title: 'Legal',
      },
      validation: (rule) =>
        rule.custom((value) => {
          const menu = value as {menuId?: string} | undefined
          if (!menu) return true
          if (menu.menuId !== 'legal') {
            return 'Legal menu must use menuId "legal".'
          }
          return true
        }),
    }),
    defineField({
      name: 'showDefaultLegalLinks',
      title: 'Show default legal links',
      description:
        'Fallback to /privacy-policy and /terms-and-conditions when Legal menu is empty.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
      }
    },
  },
})
