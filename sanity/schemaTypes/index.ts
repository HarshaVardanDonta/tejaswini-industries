import { type SchemaTypeDefinition } from 'sanity'

import { blogPost, trendingArticle } from './documents/blogPost'
import { siteInquiry } from './documents/siteInquiry'
import { productCategory } from './documents/productCategory'
import { commissionRow, project } from './documents/project'
import { imageWithUrl } from './objects/imageWithUrl'
import { spec } from './objects/spec'
import { aboutPage } from './singletons/aboutPage'
import { adminCredentials } from './singletons/adminCredentials'
import { contactPage } from './singletons/contactPage'
import { corporateProfilePage } from './singletons/corporateProfilePage'
import { landingPage } from './singletons/landingPage'
import { servicesPage } from './singletons/servicesPage'

export const schemaTypes: SchemaTypeDefinition[] = [
  imageWithUrl,
  spec,
  adminCredentials,
  landingPage,
  servicesPage,
  aboutPage,
  contactPage,
  corporateProfilePage,
  productCategory,
  project,
  commissionRow,
  blogPost,
  trendingArticle,
  siteInquiry,
]
