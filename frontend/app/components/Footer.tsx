import Link from 'next/link'

import type {LayoutSettings} from '@/app/components/Header'
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

function FooterLinkItem({item}: {item: FooterLink}) {
  const href = resolveContentLinkHref(item.link || null)
  if (!href) {
    return null
  }

  const isExternal = isExternalContentLink(item.link || null) && item.link?.openInNewTab
  return (
    <Link
      href={href}
      className="py-2 transition-colors hover:text-[var(--color-albatha-blue)]"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      data-menu-item-id={item.itemId || undefined}
    >
      {item.label || 'Link'}
    </Link>
  )
}

function FooterColumn({title, links}: {title: string; links: FooterLink[]}) {
  if (!links.length) {
    return null
  }

  return (
    <div className="w-full md:w-[247px]">
      <h4 className="py-2 text-2xl text-[var(--color-albatha-blue)]">{title}</h4>
      <div className="mt-4 flex flex-col text-xl text-[var(--color-albatha-midnight)]">
        {links.map((item, index) => (
          <FooterLinkItem key={item.itemId || item._key || `${title}-${index}`} item={item} />
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

function splitLinks(links: FooterLink[]): [FooterLink[], FooterLink[]] {
  const middle = Math.ceil(links.length / 2)
  return [links.slice(0, middle), links.slice(middle)]
}

function Wordmark({title}: {title?: string | null}) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 text-[var(--color-albatha-midnight)]">
      <span className="inline-flex size-10 rounded-full border-2 border-[var(--color-albatha-blue)]" aria-hidden />
      <span className="font-suse text-5xl leading-none tracking-tight">{title || 'albatha'}</span>
    </Link>
  )
}

export default function Footer({settings}: {settings?: LayoutSettings | null}) {
  const footerConfig = settings?.footer
  const allFooterGroups = footerConfig?.menuGroups || settings?.menuGroups || []
  const footerMenuGroup = allFooterGroups.find((group) => group?.menuId === 'footer')
  const legalLinks = footerConfig?.legalMenu?.links || []
  const defaultFooterLinks = (footerConfig?.menu?.links || footerMenuGroup?.links || []) as FooterLink[]
  const additionalGroups = allFooterGroups
    .filter((group) => group?.menuId !== 'footer')
    .slice(0, 2)

  const firstColumnLinks =
    additionalGroups[0]?.links?.length && additionalGroups[0].links
      ? (additionalGroups[0].links as FooterLink[])
      : defaultFooterLinks.slice(0, 4)

  const [secondLinks, thirdLinks] =
    additionalGroups[1]?.links?.length && additionalGroups[1].links
      ? splitLinks(additionalGroups[1].links as FooterLink[])
      : splitLinks(defaultFooterLinks.slice(4))

  const officeHeading = footerConfig?.officeHeading || 'Albatha Head Offices'
  const officeAddressOne =
    footerConfig?.officeAddressOne || 'Level 22, Boulevard Plaza 1,\nDowntown Burj Khalifa, Dubai'
  const officeAddressTwo = footerConfig?.officeAddressTwo || 'Level 23, Albatha Tower\nBuhaira Corniche, Sharjah'
  const phone = footerConfig?.phone || '+971 4 371 1300'
  const email = footerConfig?.email || 'business@albatha.com'

  return (
    <footer className="bg-[var(--color-albatha-white)] font-suse text-[var(--color-albatha-midnight)]">
      <div className="mx-auto w-[min(1600px,calc(100%-2rem))] py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.4fr]">
          <section className="max-w-[560px]">
            <Wordmark title={settings?.title} />
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
            <FooterColumn title={additionalGroups[0]?.title || 'Albatha Links'} links={firstColumnLinks} />
            <FooterColumn title={additionalGroups[1]?.title || 'Businesses Units'} links={secondLinks} />
            <div className="mt-12 flex flex-col text-xl text-[var(--color-albatha-midnight)] md:mt-0">
              {thirdLinks.map((item, index) => (
                <FooterLinkItem key={item.itemId || item._key || `tail-${index}`} item={item} />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-[var(--color-albatha-midnight)]/35 pt-4 text-xl text-[var(--color-albatha-midnight)]/60">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-10">
              {legalLinks.length > 0 ? (
                legalLinks.map((item, index) => (
                  <FooterLinkItem key={item.itemId || item._key || `legal-${index}`} item={item as FooterLink} />
                ))
              ) : (
                <>
                  <Link href="/privacy-policy" className="underline">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-and-conditions" className="underline">
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
