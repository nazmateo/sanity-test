'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

import Image from '@/app/components/SanityImage'
import {SUPPORTED_LANGUAGES} from '@/sanity/lib/i18n'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

type ContentLink = {
  linkType?: 'external' | 'internal' | null
  internalTargetType?: 'page' | 'path' | null
  internalPageSlug?: string | null
  externalUrl?: string | null
  internalPath?: string | null
  openInNewTab?: boolean | null
}

type MenuSubLink = {
  _key?: string
  itemId?: string | null
  label?: string | null
  link?: ContentLink | null
}

type MenuLink = {
  _key?: string
  itemId?: string | null
  label?: string | null
  link?: ContentLink | null
  subLinks?: MenuSubLink[] | null
}

type MenuGroup = {
  _key?: string
  menuId?: string | null
  title?: string | null
  links?: MenuLink[] | null
}

type HeaderSubmenuPanel = {
  _key?: string
  title?: string | null
  links?: MenuSubLink[] | null
}

type HeaderSubmenuConfig = {
  _key?: string
  parentItemId?: string | null
  groups?: HeaderSubmenuPanel[] | null
}

type HeaderThemeKey = 'light' | 'dark'

export type LayoutSettings = {
  title?: string | null
  logo?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  header?: {
    _type?: string
    brandImage?: {
      asset?: {_ref?: string} | null
      alt?: string | null
    } | null
    brandImageLight?: {
      asset?: {_ref?: string} | null
      alt?: string | null
    } | null
    brandImageDark?: {
      asset?: {_ref?: string} | null
      alt?: string | null
    } | null
    brandLink?: ContentLink | null
    primaryMenu?: MenuGroup | null
    secondaryMenu?: MenuGroup | null
    submenuGroups?: HeaderSubmenuConfig[] | null
    languageToggleLabel?: string | null
    languageTogglePath?: string | null
    ctaLabel?: string | null
    ctaLink?: ContentLink | null
  } | null
  footer?: {
    _type?: string
    heading?: {
      asset?: {_ref?: string} | null
      alt?: string | null
    } | null
    headingDark?: {
      asset?: {_ref?: string} | null
      alt?: string | null
    } | null
    officeHeading?: string | null
    officeAddressOne?: string | null
    officeAddressTwo?: string | null
    phone?: string | null
    email?: string | null
    menu?: MenuGroup | null
    legalMenu?: MenuGroup | null
    menuGroups?: MenuGroup[] | null
    navigationGroups?: MenuGroup[] | null
    showDefaultLegalLinks?: boolean | null
    copyrightText?: string | null
  } | null
  primaryMenu?: MenuGroup | null
  secondaryMenu?: MenuGroup | null
  menuGroups?: MenuGroup[] | null
}

function selectHeaderTheme(pathname: string): HeaderThemeKey {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const isHomeRoute =
    normalizedPath === '/' ||
    SUPPORTED_LANGUAGES.some((language) => normalizedPath === `/${language}`)
  return isHomeRoute ? 'light' : 'dark'
}

function splitSubLinksForPanels(items: MenuSubLink[]) {
  const safeItems = items.filter(Boolean)
  if (safeItems.length <= 8) {
    return {
      leftColumns:
        safeItems.length <= 4
          ? [safeItems]
          : [
              safeItems.slice(0, Math.ceil(safeItems.length / 2)),
              safeItems.slice(Math.ceil(safeItems.length / 2)),
            ],
      rightColumn: [] as MenuSubLink[],
    }
  }

  const left = safeItems.slice(0, 8)
  return {
    leftColumns: [left.slice(0, 4), left.slice(4, 8)],
    rightColumn: safeItems.slice(8),
  }
}

function normalizePanelGroups(
  item: MenuLink,
  configured?: HeaderSubmenuConfig | null,
): HeaderSubmenuPanel[] {
  if (configured?.groups && configured.groups.length > 0) {
    return configured.groups
      .slice(0, 2)
      .map((panel) => ({
        ...panel,
        links: (panel.links || []).filter((sub) => resolveContentLinkHref(sub.link)),
      }))
      .filter((panel) => (panel.links || []).length > 0)
  }

  const subLinks = (item.subLinks || []).filter((sub) => resolveContentLinkHref(sub.link))
  const {leftColumns, rightColumn} = splitSubLinksForPanels(subLinks)
  const primaryMerged = leftColumns.flat()
  const panels: HeaderSubmenuPanel[] = []
  if (primaryMerged.length > 0) {
    panels.push({
      title: item.label === 'Business Units' ? 'Albatha Business Units' : item.label,
      links: primaryMerged,
    })
  }
  if (rightColumn.length > 0) {
    panels.push({
      title: 'Flagship Brands',
      links: rightColumn,
    })
  }
  return panels
}

function MenuItem({
  item,
  configuredSubmenu,
  theme,
}: {
  item: MenuLink
  configuredSubmenu?: HeaderSubmenuConfig | null
  theme: HeaderThemeKey
}) {
  const href = resolveContentLinkHref(item.link)
  if (!href) {
    return null
  }

  const isExternal = isExternalContentLink(item.link) && item.link?.openInNewTab
  const panels = normalizePanelGroups(item, configuredSubmenu)
  const hasSubLinks = panels.length > 0
  const primaryPanel = panels[0]
  const secondaryPanel = panels[1]

  const primaryLinks = (primaryPanel?.links || []).filter((sub) => resolveContentLinkHref(sub.link))
  const primaryColumns = [primaryLinks.slice(0, 4), primaryLinks.slice(4, 8)].filter(
    (column) => column.length > 0,
  )
  const secondaryLinks = (secondaryPanel?.links || []).filter((sub) =>
    resolveContentLinkHref(sub.link),
  )

  if (!hasSubLinks) {
    return (
      <Link
        href={href}
        data-menu-item-id={item.itemId || undefined}
        className={`inline-flex items-center gap-[6px] p-[10px] text-[20px] leading-none transition-colors hover:text-[var(--color-albatha-blue)] ${
          theme === 'light' ? 'text-white' : 'text-[var(--color-albatha-midnight)]'
        }`}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <span>{item.label || 'Link'}</span>
      </Link>
    )
  }

  return (
    <div className="group relative">
      <Link
        href={href}
        data-menu-item-id={item.itemId || undefined}
        className={`inline-flex items-center gap-[6px] rounded-[8px] p-[10px] text-[20px] leading-none transition-colors hover:text-[var(--color-albatha-blue)] ${
          theme === 'light'
            ? 'text-white group-hover:bg-white/10'
            : 'text-[var(--color-albatha-midnight)] group-hover:bg-black/5'
        }`}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <span>{item.label || 'Link'}</span>
        <span aria-hidden className="text-[14px] leading-none">
          v
        </span>
      </Link>

      <div className="pointer-events-none absolute left-0 top-full z-50 hidden w-[1600px] group-hover:pointer-events-auto group-hover:block group-focus-within:pointer-events-auto group-focus-within:block">
        <div className="flex min-h-[366px] items-start border-t border-white/60 pt-[0.5px]">
          <div className="mt-[1px] flex h-[366px] w-[964px] gap-[14px] text-white">
            <div className="w-[580px] rounded-[18px] border border-white/75 bg-[linear-gradient(90deg,#091a34_0%,#0f1d34_100%)] px-[28px] py-[40px]">
              <p className="px-[10px] text-[24px] leading-none text-[var(--color-albatha-blue)]">
                {primaryPanel?.title ||
                  (item.label === 'Business Units' ? 'Albatha Business Units' : item.label)}
              </p>
              <div className="mt-[23px] grid grid-cols-2 gap-x-[51px] px-[10px]">
                {primaryColumns.map((column, columnIndex) => (
                  <ul
                    key={`${item._key || item.itemId || 'sub'}-left-${columnIndex}`}
                    role="list"
                    className="flex flex-col gap-[30px]"
                  >
                    {column.map((sub, subIndex) => {
                      const subHref = resolveContentLinkHref(sub.link)
                      if (!subHref) return null
                      const subExternal = isExternalContentLink(sub.link) && sub.link?.openInNewTab
                      return (
                        <li key={sub.itemId || sub._key || `${columnIndex}-${subIndex}`}>
                          <Link
                            href={subHref}
                            className="inline-flex p-[10px] text-[20px] leading-none transition-colors hover:text-[var(--color-albatha-blue)]"
                            target={subExternal ? '_blank' : undefined}
                            rel={subExternal ? 'noopener noreferrer' : undefined}
                          >
                            {sub.label || 'Link'}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                ))}
              </div>
            </div>

            {secondaryLinks.length > 0 ? (
              <div className="w-[370px] rounded-[18px] border border-white/75 bg-[linear-gradient(90deg,#0d1b30_0%,#111b2e_100%)] px-[28px] py-[40px]">
                <p className="px-[10px] text-[24px] leading-none text-[var(--color-albatha-blue)]">
                  {secondaryPanel?.title || 'Flagship Brands'}
                </p>
                <ul role="list" className="mt-[23px] flex flex-col gap-[30px] px-[10px]">
                  {secondaryLinks.map((sub, subIndex) => {
                    const subHref = resolveContentLinkHref(sub.link)
                    if (!subHref) return null
                    const subExternal = isExternalContentLink(sub.link) && sub.link?.openInNewTab
                    return (
                      <li key={sub.itemId || sub._key || `right-${subIndex}`}>
                        <Link
                          href={subHref}
                          className="inline-flex p-[10px] text-[20px] leading-none transition-colors hover:text-[var(--color-albatha-blue)]"
                          target={subExternal ? '_blank' : undefined}
                          rel={subExternal ? 'noopener noreferrer' : undefined}
                        >
                          {sub.label || 'Link'}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="h-[366px] flex-1 border-l border-white/60" aria-hidden />
        </div>
      </div>
    </div>
  )
}

function CenterBrand({
  title,
  imageRef,
  imageAlt,
  href,
  theme,
}: {
  title?: string | null
  imageRef?: string
  imageAlt?: string | null
  href: string
  theme: HeaderThemeKey
}) {
  if (imageRef) {
    return (
      <Link href={href} className="inline-flex items-center">
        <Image
          id={imageRef}
          alt={imageAlt || title || 'Albatha'}
          width={260}
          height={60}
          mode="contain"
          className="h-auto w-[260px]"
        />
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 ${
        theme === 'light' ? 'text-white' : 'text-[var(--color-albatha-midnight)]'
      }`}
    >
      <span
        className={`inline-flex size-10 rounded-full border-2 ${
          theme === 'light' ? 'border-white/90' : 'border-[var(--color-albatha-midnight)]'
        }`}
        aria-hidden
      />
      <span className="font-suse text-[52px] leading-none tracking-tight">
        {title || 'albatha'}
      </span>
    </Link>
  )
}

export default function Header({settings}: {settings?: LayoutSettings | null}) {
  const pathname = usePathname() || '/'
  const theme = selectHeaderTheme(pathname)

  const headerConfig = settings?.header
  const primaryMenu = headerConfig?.primaryMenu || settings?.primaryMenu
  const secondaryMenu = headerConfig?.secondaryMenu || settings?.secondaryMenu
  const leftLinks = (primaryMenu?.links || []).slice(0, 3)
  const rightLinks = secondaryMenu?.links || []
  const languageTogglePath = headerConfig?.languageTogglePath || '/ae'
  const languageToggleLabel = headerConfig?.languageToggleLabel || 'AR'
  const brandHref = resolveContentLinkHref(headerConfig?.brandLink || null) || '/'
  const selectedBrandImage =
    theme === 'light'
      ? headerConfig?.brandImageLight || headerConfig?.brandImage
      : headerConfig?.brandImageDark || headerConfig?.brandImage
  const brandImageRef = selectedBrandImage?.asset?._ref
  const brandImageAlt = selectedBrandImage?.alt
  const submenuConfigs = headerConfig?.submenuGroups || []

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 ${
        theme === 'light' ? 'text-white' : 'text-[var(--color-albatha-midnight)]'
      }`}
    >
      <div className="mx-auto mt-10 w-[min(1600px,calc(100%-2rem))]  px-2">
        <div className="grid min-h-[74px] grid-cols-[1fr_auto_1fr] items-center gap-4 font-suse">
          <nav
            aria-label="Primary navigation"
            data-menu-group-id={primaryMenu?.menuId || 'primary'}
            className="justify-self-start"
          >
            <ul role="list" className="flex items-center gap-[20px]">
              {leftLinks.map((item, index) => (
                <li
                  key={item.itemId || item._key || `${item.label || 'left'}-${index}`}
                  className="group"
                >
                  <MenuItem
                    item={item}
                    configuredSubmenu={submenuConfigs.find(
                      (config) => config.parentItemId === item.itemId,
                    )}
                    theme={theme}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <CenterBrand
            title={settings?.title}
            imageRef={brandImageRef}
            imageAlt={brandImageAlt}
            href={brandHref}
            theme={theme}
          />

          <div className="flex items-center justify-self-end gap-6">
            <nav
              aria-label="Secondary navigation"
              data-menu-group-id={secondaryMenu?.menuId || 'secondary'}
            >
              <ul role="list" className="flex items-center gap-[20px]">
                {rightLinks.map((item, index) => (
                  <li
                    key={item.itemId || item._key || `${item.label || 'right'}-${index}`}
                    className="group"
                  >
                    <MenuItem
                      item={item}
                      configuredSubmenu={submenuConfigs.find(
                        (config) => config.parentItemId === item.itemId,
                      )}
                      theme={theme}
                    />
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href={languageTogglePath}
              className={`inline-flex h-[30px] items-center gap-[8px] rounded-[8px] border px-[12px] text-[16px] uppercase leading-none transition-colors ${
                theme === 'light'
                  ? 'border-white text-white hover:bg-white/15'
                  : 'border-[var(--color-albatha-midnight)] text-[var(--color-albatha-midnight)] hover:bg-black/5'
              }`}
              aria-label="Switch to Arabic"
            >
              <span aria-hidden className="text-[14px]">
                o
              </span>
              <span>{languageToggleLabel}</span>
            </Link>
          </div>
        </div>
        <div
          className={`h-px w-full ${
            theme === 'light' ? 'bg-white/60' : 'bg-[var(--color-albatha-black-20)]'
          }`}
        />
      </div>
    </header>
  )
}
