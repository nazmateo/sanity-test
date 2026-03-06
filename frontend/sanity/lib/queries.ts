import {defineQuery} from 'next-sanity'

const navigationLinksProjection = /* groq */ `
  ...,
  link{
    ...,
    "internalPageSlug": internalPage->slug.current
  },
  subLinks[]{
    ...,
    link{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    ...,
    ogImage{
      ...,
      asset->
    }
  }
`)

export const headerQuery = defineQuery(`
  *[_type == "header"][0]{
    ...,
    brandLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    },
    ctaLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    },
    primaryMenu{
      ...,
      links[]{
        ${navigationLinksProjection}
      }
    },
    secondaryMenu{
      ...,
      links[]{
        ${navigationLinksProjection}
      }
    },
    submenuGroups[]{
      ...,
      groups[]{
        ...,
        links[]{
          ...,
          link{
            ...,
            "internalPageSlug": internalPage->slug.current
          }
        }
      }
    }
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "footer"][0]{
    ...,
    menu{
      ...,
      links[]{
        ${navigationLinksProjection}
      }
    },
    legalMenu{
      ...,
      links[]{
        ${navigationLinksProjection}
      }
    },
    menuGroups[]{
      ...,
      links[]{
        ${navigationLinksProjection}
      }
    },
    navigationGroups[]{
      ...,
      links[]{
        ${navigationLinksProjection}
      }
    }
  }
`)

const cbButtonWithLinkProjection = /* groq */ `
  _type == "cbButton" => {
    ...,
    link{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const cbButtonsWithLinksProjection = /* groq */ `
  _type == "cbButtons" => {
    ...,
    items[]{
      ...,
      link{
        ...,
        "internalPageSlug": internalPage->slug.current
      }
    }
  }
`

const cbNavigationWithLinksProjection = /* groq */ `
  _type == "cbNavigation" => {
    ...,
    links[]{
      ...,
      link{
        ...,
        "internalPageSlug": internalPage->slug.current
      }
    }
  }
`

const homePageHeroWithLinkProjection = /* groq */ `
  _type == "homePageHero" => {
    ...,
    ctaLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const aboutPageHeroWithLinkProjection = /* groq */ `
  _type == "aboutPageHero" => {
    ...
  }
`

const aboutPageOriginSectionWithLinkProjection = /* groq */ `
  _type == "aboutPageOriginSection" => {
    ...,
    ctaLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const aboutPageWhoWeServeSectionWithLinkProjection = /* groq */ `
  _type == "aboutPageWhoWeServeSection" => {
    ...,
    ctaLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const aboutPageLeadershipSectionWithLinkProjection = /* groq */ `
  _type == "aboutPageLeadershipSection" => {
    ...,
    ctaLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const homePageBelowFoldWithLinkProjection = /* groq */ `
  _type == "homePageBelowFold" => {
    ...,
    ctaLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const homePageSectorsSectionWithLinkProjection = /* groq */ `
  _type == "homePageSectorsSection" => {
    ...,
    rightImageLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const homePageCompaniesSectionWithLinkProjection = /* groq */ `
  _type == "homePageCompaniesSection" => {
    ...,
    companies[]{
      ...,
      link{
        ...,
        "internalPageSlug": internalPage->slug.current
      }
    }
  }
`

const homePageNewsSectionWithLinkProjection = /* groq */ `
  _type == "homePageNewsSection" => {
    ...,
    featuredPost->{
      ...,
      link{
        ...,
        "internalPageSlug": internalPage->slug.current
      }
    },
    cards[]{
      ...,
      post->{
        ...,
        link{
          ...,
          "internalPageSlug": internalPage->slug.current
        }
      }
    },
    backToTopLink{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`

const cbWysiwygWithResolvedLinksProjection = /* groq */ `
  _type == "cbWysiwyg" => {
    ...,
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          "page": page->slug.current
        }
      }
    }
  }
`

export const getPageQuery = defineQuery(`
  *[
    _type == 'page' &&
    slug.current == $slug &&
    coalesce(language, "en") == $language
  ][0]{
    _id,
    _type,
    name,
    language,
    slug,
    seo{
      ...,
      ogImage{
        ...,
        asset->
      }
    },
    structuredData,
    "pageBuilder": pageBuilder[]{
      ...,
      ${cbButtonWithLinkProjection},
      ${cbButtonsWithLinksProjection},
      ${cbNavigationWithLinksProjection},
      ${aboutPageHeroWithLinkProjection},
      ${aboutPageLeadershipSectionWithLinkProjection},
      ${aboutPageOriginSectionWithLinkProjection},
      ${aboutPageWhoWeServeSectionWithLinkProjection},
      ${homePageHeroWithLinkProjection},
      ${homePageBelowFoldWithLinkProjection},
      ${homePageSectorsSectionWithLinkProjection},
      ${homePageCompaniesSectionWithLinkProjection},
      ${homePageNewsSectionWithLinkProjection},
      ${cbWysiwygWithResolvedLinksProjection},
      _type == "cbGroup" => {
        ...,
        children[]{
          ...,
          ${cbButtonWithLinkProjection},
          ${cbButtonsWithLinksProjection},
          ${cbNavigationWithLinksProjection},
          ${aboutPageHeroWithLinkProjection},
          ${aboutPageLeadershipSectionWithLinkProjection},
          ${aboutPageOriginSectionWithLinkProjection},
          ${aboutPageWhoWeServeSectionWithLinkProjection},
          ${homePageBelowFoldWithLinkProjection},
          ${homePageSectorsSectionWithLinkProjection},
          ${homePageCompaniesSectionWithLinkProjection},
          ${homePageNewsSectionWithLinkProjection},
          ${cbWysiwygWithResolvedLinksProjection}
        }
      },
      _type == "cbColumn" => {
        ...,
        children[]{
          ...,
          ${cbButtonWithLinkProjection},
          ${cbButtonsWithLinksProjection},
          ${cbNavigationWithLinksProjection},
          ${aboutPageHeroWithLinkProjection},
          ${aboutPageLeadershipSectionWithLinkProjection},
          ${aboutPageOriginSectionWithLinkProjection},
          ${aboutPageWhoWeServeSectionWithLinkProjection},
          ${homePageBelowFoldWithLinkProjection},
          ${homePageSectorsSectionWithLinkProjection},
          ${homePageCompaniesSectionWithLinkProjection},
          ${homePageNewsSectionWithLinkProjection},
          ${cbWysiwygWithResolvedLinksProjection}
        }
      },
      _type == "cbCover" => {
        ...,
        content[]{
          ...,
          ${cbButtonWithLinkProjection},
          ${cbButtonsWithLinksProjection},
          ${cbNavigationWithLinksProjection},
          ${aboutPageHeroWithLinkProjection},
          ${aboutPageLeadershipSectionWithLinkProjection},
          ${aboutPageOriginSectionWithLinkProjection},
          ${aboutPageWhoWeServeSectionWithLinkProjection},
          ${homePageBelowFoldWithLinkProjection},
          ${homePageSectorsSectionWithLinkProjection},
          ${homePageCompaniesSectionWithLinkProjection},
          ${homePageNewsSectionWithLinkProjection},
          ${cbWysiwygWithResolvedLinksProjection}
        }
      },
      _type == "cbColumns" => {
        ...,
        columns[]{
          ...,
          children[]{
            ...,
            ${cbButtonWithLinkProjection},
            ${cbButtonsWithLinksProjection},
            ${cbNavigationWithLinksProjection},
            ${aboutPageHeroWithLinkProjection},
            ${aboutPageLeadershipSectionWithLinkProjection},
            ${aboutPageOriginSectionWithLinkProjection},
            ${aboutPageWhoWeServeSectionWithLinkProjection},
            ${homePageBelowFoldWithLinkProjection},
            ${homePageSectorsSectionWithLinkProjection},
            ${homePageCompaniesSectionWithLinkProjection},
            ${homePageNewsSectionWithLinkProjection},
            ${cbWysiwygWithResolvedLinksProjection}
          }
        }
      }
    }
  }
`)

export const homePageQuery = defineQuery(`
  *[
    _type == "homePage" &&
    coalesce(language, "en") == $language
  ][0]{
    _id,
    _type,
    name,
    seo{
      ...,
      ogImage{
        ...,
        asset->
      }
    },
    structuredData,
    "pageBuilder": pageBuilder[]{
      ...,
      ${cbButtonWithLinkProjection},
      ${cbButtonsWithLinksProjection},
      ${cbNavigationWithLinksProjection},
      ${aboutPageHeroWithLinkProjection},
      ${aboutPageLeadershipSectionWithLinkProjection},
      ${aboutPageOriginSectionWithLinkProjection},
      ${aboutPageWhoWeServeSectionWithLinkProjection},
      ${homePageHeroWithLinkProjection},
      ${homePageBelowFoldWithLinkProjection},
      ${homePageSectorsSectionWithLinkProjection},
      ${homePageCompaniesSectionWithLinkProjection},
      ${homePageNewsSectionWithLinkProjection},
      ${cbWysiwygWithResolvedLinksProjection},
      _type == "cbGroup" => {
        ...,
        children[]{
          ...,
          ${cbButtonWithLinkProjection},
          ${cbButtonsWithLinksProjection},
          ${cbNavigationWithLinksProjection},
          ${aboutPageHeroWithLinkProjection},
          ${aboutPageLeadershipSectionWithLinkProjection},
          ${aboutPageOriginSectionWithLinkProjection},
          ${aboutPageWhoWeServeSectionWithLinkProjection},
          ${homePageBelowFoldWithLinkProjection},
          ${homePageSectorsSectionWithLinkProjection},
          ${homePageCompaniesSectionWithLinkProjection},
          ${homePageNewsSectionWithLinkProjection},
          ${cbWysiwygWithResolvedLinksProjection}
        }
      },
      _type == "cbColumn" => {
        ...,
        children[]{
          ...,
          ${cbButtonWithLinkProjection},
          ${cbButtonsWithLinksProjection},
          ${cbNavigationWithLinksProjection},
          ${aboutPageHeroWithLinkProjection},
          ${aboutPageLeadershipSectionWithLinkProjection},
          ${aboutPageOriginSectionWithLinkProjection},
          ${aboutPageWhoWeServeSectionWithLinkProjection},
          ${homePageBelowFoldWithLinkProjection},
          ${homePageSectorsSectionWithLinkProjection},
          ${homePageCompaniesSectionWithLinkProjection},
          ${homePageNewsSectionWithLinkProjection},
          ${cbWysiwygWithResolvedLinksProjection}
        }
      },
      _type == "cbCover" => {
        ...,
        content[]{
          ...,
          ${cbButtonWithLinkProjection},
          ${cbButtonsWithLinksProjection},
          ${cbNavigationWithLinksProjection},
          ${aboutPageHeroWithLinkProjection},
          ${aboutPageLeadershipSectionWithLinkProjection},
          ${aboutPageOriginSectionWithLinkProjection},
          ${aboutPageWhoWeServeSectionWithLinkProjection},
          ${homePageBelowFoldWithLinkProjection},
          ${homePageSectorsSectionWithLinkProjection},
          ${homePageCompaniesSectionWithLinkProjection},
          ${homePageNewsSectionWithLinkProjection},
          ${cbWysiwygWithResolvedLinksProjection}
        }
      },
      _type == "cbColumns" => {
        ...,
        columns[]{
          ...,
          children[]{
            ...,
            ${cbButtonWithLinkProjection},
            ${cbButtonsWithLinksProjection},
            ${cbNavigationWithLinksProjection},
            ${aboutPageHeroWithLinkProjection},
            ${aboutPageLeadershipSectionWithLinkProjection},
            ${aboutPageOriginSectionWithLinkProjection},
            ${aboutPageWhoWeServeSectionWithLinkProjection},
            ${homePageBelowFoldWithLinkProjection},
            ${homePageSectorsSectionWithLinkProjection},
            ${homePageCompaniesSectionWithLinkProjection},
            ${homePageNewsSectionWithLinkProjection},
            ${cbWysiwygWithResolvedLinksProjection}
          }
        }
      }
    }
  }
`)

export const homePageLanguagesQuery = defineQuery(`
  *[_type == "homePage"]{
    "language": coalesce(language, "en")
  }
`)

export const sitemapData = defineQuery(`
  *[
    (_type == "homePage") ||
    (_type == "page" && defined(slug.current)) ||
    (_type == "legalPage" && defined(slug))
  ] | order(_type asc) {
    "slug": select(_type == "legalPage" => slug, slug.current),
    "language": coalesce(language, "en"),
    _type,
    _updatedAt,
  }
`)

export const legalPageBySlugQuery = defineQuery(`
  *[
    _type == "legalPage" &&
    slug == $slug &&
    coalesce(language, "en") == $language
  ][0]{
    _id,
    title,
    slug,
    language,
    content,
    seo{
      ...,
      ogImage{
        ...,
        asset->
      }
    }
  }
`)

export const pagesSlugs = defineQuery(`
  *[
    _type == "page" &&
    defined(slug.current) &&
    coalesce(language, "en") == $language
  ]
  {"slug": slug.current}
`)

export const localizedPagesSlugs = defineQuery(`
  *[
    _type == "page" &&
    defined(slug.current) &&
    coalesce(language, "en") != $defaultLanguage
  ]{
    "slug": slug.current,
    "language": coalesce(language, "en")
  }
`)

export const pageLanguagesBySlugQuery = defineQuery(`
  *[
    _type == "page" &&
    slug.current == $slug
  ]{
    "language": coalesce(language, "en")
  }
`)

export const legalPageLanguagesBySlugQuery = defineQuery(`
  *[
    _type == "legalPage" &&
    slug == $slug
  ]{
    "language": coalesce(language, "en")
  }
`)

export const postBySlugQuery = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug &&
    coalesce(language, "en") == $language
  ][0]{
    _id,
    _type,
    title,
    slug,
    language,
    publishedAt,
    cardImage,
    excerpt,
    link{
      ...,
      "internalPageSlug": internalPage->slug.current
    }
  }
`)

export const postSlugsQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    coalesce(language, "en") == $language
  ]{
    "slug": slug.current
  }
`)
