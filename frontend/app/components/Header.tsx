import Link from 'next/link'

import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

type MenuLink = {
  _key?: string
  itemId?: string | null
  label?: string | null
  link?: ContentLink | null
  subLinks?: MenuLink[] | null
}

type MenuGroup = {
  menuId?: string | null
  title?: string | null
  links?: MenuLink[] | null
}

type ContentLink = {
  linkType?: 'external' | 'internal' | null
  internalTargetType?: 'page' | 'path' | null
  internalPageSlug?: string | null
  externalUrl?: string | null
  internalPath?: string | null
  openInNewTab?: boolean | null
}

export type LayoutSettings = {
  title?: string | null
  logo?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  header?: {
    _type?: string
    primaryMenu?: MenuGroup | null
    secondaryMenu?: MenuGroup | null
    languageToggleLabel?: string | null
    languageTogglePath?: string | null
    ctaLabel?: string | null
    ctaLink?: ContentLink | null
  } | null
  footer?: {
    _type?: string
    heading?: string | null
    officeHeading?: string | null
    officeAddressOne?: string | null
    officeAddressTwo?: string | null
    phone?: string | null
    email?: string | null
    menu?: MenuGroup | null
    legalMenu?: MenuGroup | null
    menuGroups?: MenuGroup[] | null
    showDefaultLegalLinks?: boolean | null
    copyrightText?: string | null
  } | null
  primaryMenu?: MenuGroup | null
  secondaryMenu?: MenuGroup | null
  menuGroups?: MenuGroup[] | null
}

function MenuItem({item}: {item: MenuLink}) {
  const href = resolveContentLinkHref(item.link)
  if (!href) {
    return null
  }

  const isExternal = isExternalContentLink(item.link) && item.link?.openInNewTab
  const hasSubLinks = Boolean(item.subLinks?.length)

  return (
    <Link
      href={href}
      data-menu-item-id={item.itemId || undefined}
      className="inline-flex items-center gap-1 px-2 py-2 transition-colors hover:text-[var(--color-albatha-blue)]"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span>{item.label || 'Link'}</span>
      {hasSubLinks ? <span aria-hidden className="text-xs">v</span> : null}
    </Link>
  )
}

function Wordmark({title}: {title?: string | null}) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 text-white">
      <span className="inline-flex size-10 rounded-full border-2 border-white/90" aria-hidden />
      <span className="font-suse text-[52px] leading-none tracking-tight">{title || 'albatha'}</span>
    </Link>
  )
}

export default function Header({settings}: {settings?: LayoutSettings | null}) {
  const headerConfig = settings?.header
  const primaryMenu = headerConfig?.primaryMenu || settings?.primaryMenu
  const secondaryMenu = headerConfig?.secondaryMenu || settings?.secondaryMenu
  const leftLinks = (primaryMenu?.links || []).slice(0, 3)
  const rightLinks = secondaryMenu?.links || []
  const languageTogglePath = headerConfig?.languageTogglePath || '/ae'
  const languageToggleLabel = headerConfig?.languageToggleLabel || 'AR'

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div className="mx-auto mt-10 w-[min(1600px,calc(100%-2rem))] border-b border-white/40 bg-[var(--color-albatha-black-20)] px-2 backdrop-blur-[2px]">
        <div className="grid min-h-[74px] grid-cols-[1fr_auto_1fr] items-center gap-4 font-suse text-xl">
          <nav
            aria-label="Primary navigation"
            data-menu-group-id={primaryMenu?.menuId || 'primary'}
            className="justify-self-start"
          >
            <ul role="list" className="flex items-center gap-4">
              {leftLinks.map((item, index) => (
                <li key={item.itemId || item._key || `${item.label || 'left'}-${index}`}>
                  <MenuItem item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <Wordmark title={settings?.title} />

          <div className="flex items-center justify-self-end gap-6">
            <nav
              aria-label="Secondary navigation"
              data-menu-group-id={secondaryMenu?.menuId || 'secondary'}
            >
              <ul role="list" className="flex items-center gap-4">
                {rightLinks.map((item, index) => (
                  <li key={item.itemId || item._key || `${item.label || 'right'}-${index}`}>
                    <MenuItem item={item} />
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href={languageTogglePath}
              className="inline-flex h-[30px] items-center gap-2 rounded-lg border border-white px-3 text-base uppercase transition-colors hover:bg-white/15"
              aria-label="Switch to Arabic"
            >
              <span aria-hidden>o</span>
              <span>{languageToggleLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
