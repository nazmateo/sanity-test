'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

import type {LayoutSettings} from '@/app/components/Header'
import Image from '@/app/components/SanityImage'
import {SUPPORTED_LANGUAGES} from '@/sanity/lib/i18n'
import {isExternalContentLink, resolveContentLinkHref} from '@/sanity/lib/utils'

type FooterLink = {
  _key?: string
  itemId?: string | null
  label?: string | null
  link?: {
    linkType?: 'external' | 'internal' | null
    internalTargetType?: 'page' | 'path' | null
    internalPageSlug?: string | null
    externalUrl?: string | null
    internalPath?: string | null
    openInNewTab?: boolean | null
  } | null
}

type FooterHeadingImageValue = {
  asset?: {_ref?: string} | null
  alt?: string | null
} | null

type FooterThemeKey = 'light' | 'dark'

function selectFooterTheme(pathname: string): FooterThemeKey {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const isHomeRoute =
    normalizedPath === '/' ||
    SUPPORTED_LANGUAGES.some((language) => normalizedPath === `/${language}`)

  return isHomeRoute ? 'light' : 'dark'
}

function FooterLinkItem({item, theme}: {item: FooterLink; theme: FooterThemeKey}) {
  const href = resolveContentLinkHref(item.link || null)
  if (!href) return null

  const isExternal = isExternalContentLink(item.link || null) && item.link?.openInNewTab
  const linkClass =
    theme === 'light'
      ? 'text-[var(--color-albatha-midnight)] hover:text-[var(--color-albatha-blue)]'
      : 'text-white hover:text-[var(--color-albatha-blue)]'

  return (
    <Link
      href={href}
      className={`py-2 transition-colors ${linkClass}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      data-menu-item-id={item.itemId || undefined}
    >
      {item.label || 'Link'}
    </Link>
  )
}

function FooterColumn({title, links, theme}: {title: string; links: FooterLink[]; theme: FooterThemeKey}) {
  if (!links.length) return null

  return (
    <div className="w-full md:w-[247px]">
      <h4 className="min-h-[52px] py-2 text-2xl text-[var(--color-albatha-blue)]">
        {title?.trim() ? title : '\u00A0'}
      </h4>
      <div className="mt-4 flex flex-col text-xl">
        {links.map((item, index) => (
          <FooterLinkItem key={item.itemId || item._key || `${title}-${index}`} item={item} theme={theme} />
        ))}
      </div>
    </div>
  )
}

function renderMultilineText(value?: string | null) {
  if (!value) return null
  const lines = value.split('\n')
  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ))
}

function Wordmark({title, theme}: {title?: string | null; theme: FooterThemeKey}) {
  const colorClass = theme === 'light' ? 'text-[var(--color-albatha-midnight)]' : 'text-white'
  const borderClass = theme === 'light' ? 'border-[var(--color-albatha-blue)]' : 'border-white'
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${colorClass}`}>
      <span className={`inline-flex size-10 rounded-full border-2 ${borderClass}`} aria-hidden />
      <span className="font-suse text-5xl leading-none tracking-tight">{title || 'albatha'}</span>
    </Link>
  )
}

function FooterHeadingImage({
  heading,
  fallbackTitle,
  theme,
}: {
  heading?: FooterHeadingImageValue
  fallbackTitle?: string | null
  theme: FooterThemeKey
}) {
  const imageRef = heading?.asset?._ref
  const imageAlt = heading?.alt

  if (imageRef) {
    return (
      <Link href="/" className="inline-flex items-center">
        <Image
          id={imageRef}
          alt={imageAlt || fallbackTitle || 'Albatha'}
          width={260}
          height={60}
          mode="contain"
          className="h-auto w-[260px]"
        />
      </Link>
    )
  }

  return <Wordmark title={fallbackTitle} theme={theme} />
}

export default function Footer({settings}: {settings?: LayoutSettings | null}) {
  const pathname = usePathname() || '/'
  const theme = selectFooterTheme(pathname)
  const isLight = theme === 'light'

  const footerConfig = settings?.footer
  const headingImage = isLight ? footerConfig?.heading : footerConfig?.headingDark || footerConfig?.heading

  const allFooterGroups = footerConfig?.menuGroups || settings?.menuGroups || []
  const configuredNavigationGroups = footerConfig?.navigationGroups || []
  const footerMenuGroup = allFooterGroups.find((group) => group?.menuId === 'footer')
  const legalLinks = footerConfig?.legalMenu?.links || []
  const defaultFooterLinks = (footerConfig?.menu?.links || footerMenuGroup?.links || []) as FooterLink[]
  const fallbackGroups = allFooterGroups.filter((group) => group?.menuId !== 'footer').slice(0, 3)
  const navigationGroups =
    configuredNavigationGroups.length > 0 ? configuredNavigationGroups.slice(0, 3) : fallbackGroups

  const officeHeading = footerConfig?.officeHeading || 'Albatha Head Offices'
  const officeAddressOne =
    footerConfig?.officeAddressOne || 'Level 22, Boulevard Plaza 1,\nDowntown Burj Khalifa, Dubai'
  const officeAddressTwo = footerConfig?.officeAddressTwo || 'Level 23, Albatha Tower\nBuhaira Corniche, Sharjah'
  const phone = footerConfig?.phone || '+971 4 371 1300'
  const email = footerConfig?.email || 'business@albatha.com'

  const footerBg = isLight ? 'bg-[var(--color-albatha-white)]' : 'bg-[var(--color-albatha-midnight)]'
  const bodyText = isLight ? 'text-[var(--color-albatha-midnight)]' : 'text-white'
  const divider = isLight ? 'border-[var(--color-albatha-midnight)]/35' : 'border-white/60'
  const legalText = isLight ? 'text-[var(--color-albatha-midnight)]/60' : 'text-white/60'
  const legalFallbackLink = isLight
    ? 'text-[var(--color-albatha-midnight)] hover:text-[var(--color-albatha-blue)]'
    : 'text-white hover:text-[var(--color-albatha-blue)]'

  return (
    <footer className={`font-suse ${footerBg}`}>
      <div className="mx-auto w-[min(1600px,calc(100%-2rem))] py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.4fr]">
          <section className={`max-w-[560px] ${bodyText}`}>
            <FooterHeadingImage heading={headingImage} fallbackTitle={settings?.title} theme={theme} />
            <div className="mt-8 grid gap-6 text-lg leading-[1.4] md:grid-cols-2">
              <p>
                <strong className="mb-5 block text-xl font-medium">{officeHeading}</strong>
                {renderMultilineText(officeAddressOne)}
              </p>
              <p>{renderMultilineText(officeAddressTwo)}</p>
            </div>
            <div className="mt-8 text-[30px] leading-[1.3] text-[var(--color-albatha-orange)]">
              <p className="mb-2">{phone}</p>
              <Link href={`mailto:${email}`} className="hover:underline">
                {email}
              </Link>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3 md:gap-4">
            {navigationGroups.map((group, index) => (
              <FooterColumn
                key={group?.menuId || group?._key || `nav-group-${index}`}
                title={group?.title || (index === 0 ? 'Albatha Links' : index === 1 ? 'Businesses Units' : 'More')}
                links={((group?.links || []) as FooterLink[]).slice(0, 8)}
                theme={theme}
              />
            ))}
            {navigationGroups.length === 0 ? (
              <FooterColumn title="Albatha Links" links={defaultFooterLinks.slice(0, 8)} theme={theme} />
            ) : null}
          </section>
        </div>

        <div className={`mt-10 border-t pt-4 text-xl ${divider} ${legalText}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-10">
              {legalLinks.length > 0 ? (
                legalLinks.map((item, index) => (
                  <FooterLinkItem key={item.itemId || item._key || `legal-${index}`} item={item as FooterLink} theme={theme} />
                ))
              ) : (
                <>
                  <Link href="/privacy-policy" className={`underline transition-colors ${legalFallbackLink}`}>
                    Privacy Policy
                  </Link>
                  <Link href="/terms-and-conditions" className={`underline transition-colors ${legalFallbackLink}`}>
                    Terms and Conditions
                  </Link>
                </>
              )}
            </div>
            <p>{footerConfig?.copyrightText || '(c) 2026 Albatha Holding LLC. Created by Black.'}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

