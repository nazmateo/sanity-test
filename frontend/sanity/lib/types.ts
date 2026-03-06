export type CbButton = {
  _key?: string
  _type: 'cbButton'
  label?: string | null
  actionType?: 'button' | 'link' | null
  link?: CbLink | null
  // Legacy fields
  text?: string | null
  url?: string | null
}

export type CbButtons = {
  _key?: string
  _type: 'cbButtons'
  items?: CbButton[] | null
}

export type CbHeading = {
  _key?: string
  _type: 'cbHeading'
  content?: string | null
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | number | null
}

export type CbParagraph = {
  _key?: string
  _type: 'cbParagraph'
  content?: string | null
}

export type CbWysiwyg = {
  _key?: string
  _type: 'cbWysiwyg'
  content?: unknown[] | null
}

export type CbMedia = {
  _key?: string
  _type: 'cbMedia'
  mediaType?: 'image' | 'video' | null
  image?: {
    asset?: {_ref?: string} | null
    alt?: string | null
    crop?: any
    hotspot?: any
  } | null
  videoFile?: {
    asset?: {_ref?: string} | null
  } | null
}

export type CbLink = {
  _key?: string
  _type: 'cbLink'
  linkType?: 'external' | 'internal' | null
  internalTargetType?: 'page' | 'path' | null
  internalPage?: {_ref?: string} | null
  internalPageSlug?: string | null
  externalUrl?: string | null
  internalPath?: string | null
  openInNewTab?: boolean | null
}

export type CbHtml = {
  _key?: string
  _type: 'cbHtml'
  content?: string | null
}

export type CbImage = {
  _key?: string
  _type: 'cbImage'
  media?: CbMedia | null
  // Legacy fields
  url?: string | null
  alt?: string | null
}

export type CbListItem = {
  _key?: string
  _type: 'cbListItem'
  content?: string | null
}

export type CbList = {
  _key?: string
  _type: 'cbList'
  ordered?: boolean | null
  items?: CbListItem[] | null
}

export type CbNavigationLink = {
  _key?: string
  _type: 'cbNavigationLink'
  label?: string | null
  link?: CbLink | null
  // Legacy field
  url?: string | null
}

export type CbNavigation = {
  _key?: string
  _type: 'cbNavigation'
  links?: CbNavigationLink[] | null
}

export type LegacyCallToAction = {
  _key?: string
  _type: 'callToAction'
  eyebrow?: string
  heading?: string
  body?: unknown[]
  button?: {
    buttonText?: string
    link?: DereferencedLink | null
  } | null
  image?: {
    asset?: {_ref?: string}
    crop?: any
  } | null
  theme?: 'dark' | 'light' | null
  contentAlignment?: 'imageFirst' | 'textFirst' | null
}

export type LegacyInfoSection = {
  _key?: string
  _type: 'infoSection'
  heading?: string
  subheading?: string
  content?: unknown[] | null
}

export type PageBuilderSection =
  | PageBuilderAtom
  | CbButton
  | PageBuilderContainer
  | AboutPageHero
  | AboutPageLeadershipSection
  | AboutPageOriginSection
  | AboutPageWhoWeServeSection
  | AboutPageTimelineSection
  | HomePageHero
  | HomePageBelowFold
  | HomePageSectorsSection
  | HomePageCompaniesSection
  | HomePageNewsSection
  | LegacyCallToAction
  | LegacyInfoSection

export type PageBuilderAtom = CbHeading | CbParagraph | CbWysiwyg | CbHtml | CbImage

export type PageBuilderContainer =
  | CbButtons
  | CbList
  | CbNavigation
  | CbGroup
  | CbColumn
  | CbColumns
  | CbCover

export type CbGroup = {
  _key?: string
  _type: 'cbGroup'
  children?: PageBuilderSection[] | null
}

export type CbColumn = {
  _key?: string
  _type: 'cbColumn'
  children?: PageBuilderSection[] | null
}

export type CbColumns = {
  _key?: string
  _type: 'cbColumns'
  columns?: CbColumn[] | null
}

export type CbCover = {
  _key?: string
  _type: 'cbCover'
  backgroundMedia?: CbMedia | null
  // Legacy field
  url?: string | null
  content?: PageBuilderSection[] | null
}

export type HomePageHero = {
  _key?: string
  _type?: 'homePageHero'
  backgroundMedia?: CbMedia | null
  headline?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaLink?: CbLink | null
  phrases?: string[] | null
}

export type AboutPageHero = {
  _key?: string
  _type?: 'aboutPageHero'
  backgroundColor?: string | null
  personName?: string | null
  personRole?: string | null
  quote?: string | null
  media?: CbMedia | null
  posterImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  mediaCaption?: string | null
}

export type AboutPageOriginSection = {
  _key?: string
  _type?: 'aboutPageOriginSection'
  backgroundColor?: string | null
  image?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  imageBadgeLabel?: string | null
  heading?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaLink?: CbLink | null
}

export type AboutPageWhoWeServeAudienceItem = {
  _key?: string
  label?: string | null
}

export type AboutPageWhoWeServeSection = {
  _key?: string
  _type?: 'aboutPageWhoWeServeSection'
  backgroundColor?: string | null
  heading?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaLink?: CbLink | null
  audiencePanelBackground?: string | null
  audienceItems?: AboutPageWhoWeServeAudienceItem[] | null
}

export type AboutPageTimelineItem = {
  _key?: string
  year?: string | null
  description?: string | null
}

export type AboutPageTimelineSection = {
  _key?: string
  _type?: 'aboutPageTimelineSection'
  backgroundImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  timelineItems?: AboutPageTimelineItem[] | null
}

export type AboutPageLeadershipProfile = {
  _key?: string
  name?: string | null
  role?: string | null
  bio?: string | null
}

export type AboutPageLeadershipSection = {
  _key?: string
  _type?: 'aboutPageLeadershipSection'
  backgroundColor?: string | null
  heading?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaLink?: CbLink | null
  leaders?: AboutPageLeadershipProfile[] | null
}

export type HomePageBelowFoldStat = {
  _key?: string
  value?: string | null
  label?: string | null
  subLabel?: string | null
  variant?: 'dark' | 'blue' | 'outline' | null
}

export type HomePageBelowFold = {
  _key?: string
  _type?: 'homePageBelowFold'
  introImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  headline?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaLink?: CbLink | null
  stats?: HomePageBelowFoldStat[] | null
}

export type HomePageSectorsSection = {
  _key?: string
  _type?: 'homePageSectorsSection'
  heading?: string | null
  leftImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  rightImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  rightImageLink?: CbLink | null
}

export type HomePageCompaniesItem = {
  _key?: string
  title?: string | null
  label?: string | null
  link?: CbLink | null
}

export type HomePageCompaniesSection = {
  _key?: string
  _type?: 'homePageCompaniesSection'
  backgroundColor?: string | null
  backgroundImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  heading?: string | null
  companies?: HomePageCompaniesItem[] | null
}

export type PostDocument = {
  _id?: string
  title?: string | null
  slug?: {current?: string | null} | null
  publishedAt?: string | null
  cardImage?: {
    asset?: {_ref?: string} | null
    alt?: string | null
  } | null
  excerpt?: string | null
  link?: CbLink | null
}

export type HomePageNewsCardItem = {
  _key?: string
  post?: PostDocument | null
  linkLabel?: string | null
}

export type HomePageNewsSection = {
  _key?: string
  _type?: 'homePageNewsSection'
  backgroundColor?: string | null
  featuredPost?: PostDocument | null
  featuredLinkLabel?: string | null
  cards?: HomePageNewsCardItem[] | null
  backToTopLabel?: string | null
  backToTopLink?: CbLink | null
}

export type ExtractPageBuilderType<T extends string> = Extract<PageBuilderSection, {_type: T}>

export type PageDocumentForBuilder = {
  _id: string
  _type: string
  name?: string | null
  slug?: {current?: string | null} | null
  pageBuilder?: PageBuilderSection[] | null
} | null

// Represents a Link after GROQ dereferencing (page references become slug strings)
export type DereferencedLink = {
  _type: 'link'
  linkType?: 'href' | 'page'
  href?: string
  page?: string | null
  openInNewTab?: boolean
}
