import {page} from './documents/page'
import {legalPage} from './documents/legalPage'
import {post} from './documents/post'
import {settings} from './singletons/settings'
import {homePage} from './singletons/homePage'
import {header} from './singletons/header'
import {footer} from './singletons/footer'
import {blockContent} from './objects/blockContent'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {aboutPageHero} from './objects/aboutPageHero'
import {aboutPageOriginSection} from './objects/aboutPageOriginSection'
import {aboutPageWhoWeServeSection} from './objects/aboutPageWhoWeServeSection'
import {aboutPageTimelineSection} from './objects/aboutPageTimelineSection'
import cbButton from './objects/button'
import cbButtons from './objects/buttons'
import cbColumn from './objects/column'
import cbColumns from './objects/columns'
import cbCover from './objects/cover'
import cbGroup from './objects/group'
import cbHeading from './objects/heading'
import cbHtml from './objects/html'
import {homePageBelowFold} from './objects/homePageBelowFold'
import {homePageCompaniesSection} from './objects/homePageCompaniesSection'
import {homePageHero} from './objects/homePageHero'
import {homePageNewsSection} from './objects/homePageNewsSection'
import {homePageSectorsSection} from './objects/homePageSectorsSection'
import cbImage from './objects/image'
import cbLink from './objects/link'
import cbListItem from './objects/list-item'
import cbList from './objects/list'
import cbMedia from './objects/media'
import {menuGroup} from './objects/menuGroup'
import {menuLink} from './objects/menuLink'
import {menuSubLink} from './objects/menuSubLink'
import cbNavigationLink from './objects/navigation-link'
import cbNavigation from './objects/navigation'
import cbParagraph from './objects/paragraph'
import cbWysiwyg from './objects/wysiwyg'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  header,
  footer,
  // Documents
  page,
  legalPage,
  post,
  // Objects
  aboutPageHero,
  aboutPageOriginSection,
  aboutPageWhoWeServeSection,
  aboutPageTimelineSection,
  cbButton,
  cbButtons,
  cbColumn,
  cbColumns,
  cbCover,
  cbGroup,
  cbHeading,
  cbHtml,
  homePageBelowFold,
  homePageCompaniesSection,
  homePageHero,
  homePageNewsSection,
  homePageSectorsSection,
  cbImage,
  cbLink,
  cbListItem,
  cbList,
  cbMedia,
  menuGroup,
  menuLink,
  menuSubLink,
  cbNavigationLink,
  cbNavigation,
  cbParagraph,
  cbWysiwyg,
  blockContent,
  blockContentTextOnly,
]
