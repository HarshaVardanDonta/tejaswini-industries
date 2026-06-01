const imageProjection = `{
  _type,
  url,
  alt,
  asset {
    _type,
    asset {
      _ref
    }
  }
}`

export const adminQueries = {
  byId: `*[_id == $id][0]`,
  byType: `*[_type == $type] | order(_id asc)`,
  landingPage: `*[_id == "landingPage"][0]{
    _id, _type,
    hero{ image${imageProjection}, badgePrimary, badgeSecondary, title, description, primaryCta, secondaryCta },
    companyIntro{ title, paragraphs, image${imageProjection}, stats[]{ value, label } },
    portfolio{ eyebrow, title, linkLabel, items[]{ title, description, image${imageProjection}, size, overlayPrimary } },
    technicalSupremacy{ title, features[]{ icon, title, description, accent } },
    ctaBanner{ title, description, buttonLabel }
  }`,
  servicesPage: `*[_id == "servicesPage"][0]{
    _id, _type,
    hero{ image${imageProjection}, eyebrow, title, description },
    coreServices[]{ id, title, description, icon, iconBg, accent, features },
    processSteps[]{ step, title, description, icon, highlight },
    capabilities{
      featured{ image${imageProjection}, title, description },
      internalElectrification{ icon, title, description },
      structural{ icon, title, description },
      energyAuditing{ icon, title, description }
    },
    cta{ title, description }
  }`,
  aboutPage: `*[_id == "aboutPage"][0]{
    _id, _type,
    hero{ title, description, image${imageProjection} },
    overview{ title, paragraphs, isoImage${imageProjection}, highlights[]{ icon, label } },
    visionMission[]{ icon, title, description, variant },
    infrastructure{ title, subtitle, facilityImage${imageProjection}, features[]{ icon, title, description, variant } },
    sectors{ title, items[]{ icon, label } },
    cta{ title, description, buttonLabel }
  }`,
  contactPage: `*[_id == "contactPage"][0]{
    _id, _type,
    hero{ title, description },
    infoCards[]{ icon, title, lines, mono },
    whatsapp{ title, description, buttonLabel },
    map{ image${imageProjection}, label },
    form{ title, submitLabel },
    inquiryTypes[]{ value, label }
  }`,
  corporateProfilePage: `*[_id == "corporateProfilePage"][0]{
    _id, _type,
    hero{ image${imageProjection}, badge, title, titleHighlight, description, stats[]{ value, label, accent } },
    profile{ image${imageProjection}, eyebrow, title, paragraphs, highlights[]{ icon, title, description }, established }
  }`,
  distributionCategory: `*[_id == "distributionCategory"][0]{ _id, _type, slug, title, description }`,
  productCategories: `*[_type == "productCategory"] | order(id asc){ _id, _type, id, title, description, image${imageProjection}, listingPath }`,
  listingProducts: `*[_type == "distributionProduct"] | order(categoryId asc, id asc){
    _id, _type, categoryId, id, title, image${imageProjection}, specs[]{ label, value },
    badge{ type, label, icon }, accent, detailSlug, comparisonSku, comparisonHighlight,
    comparisonValues[]{ key, value, tags }
  }`,
  listingProductsByCategory: `*[_type == "distributionProduct" && categoryId == $categoryId] | order(id asc){
    _id, _type, categoryId, id, title, image${imageProjection}, specs[]{ label, value },
    badge{ type, label, icon }, accent, detailSlug, comparisonSku, comparisonHighlight,
    comparisonValues[]{ key, value, tags }
  }`,
  productDetails: `*[_type == "productDetail"] | order(title asc){
    _id, _type, categoryId, slug, sku, title, breadcrumbLabel, description,
    images{ main${imageProjection}, front${imageProjection}, detail${imageProjection} },
    quickSpecs[]{ label, value, highlight },
    technicalParameters[]{ parameter, value }
  }`,
  productDetailsByCategory: `*[_type == "productDetail" && categoryId == $categoryId] | order(title asc){
    _id, _type, categoryId, slug, sku, title
  }`,
  comparisonParameters: `*[_type == "comparisonParameter"] | order(order asc){ _id, _type, key, label, hint, order }`,
  projects: `*[_type == "project"] | order(id asc){
    _id, _type, id, title, category, categoryLabel, sector, location, image${imageProjection},
    specs[]{ label, value }, accent
  }`,
  commissionRows: `*[_type == "commissionRow"] | order(id asc){ _id, _type, id, sector, deliverable, location, status }`,
  blogPosts: `*[_type == "blogPost"] | order(date desc){
    _id, _type, id, slug, title, excerpt, category, categoryLabel, date, author, featured, accent, alertMeta
  }`,
  blogPostFull: `*[_id == $id][0]{
    _id, _type, id, slug, title, excerpt, category, categoryLabel, date, author, featured, accent, alertMeta,
    authorRole, readTime, breadcrumbLabel, intro, image${imageProjection}, authorImage${imageProjection},
    sections[]{
      id, title, paragraphs,
      subsections[]{ id, title, checklist[]{ label, text } },
      table{ headers, rows[]{ cells } },
      alert{ title, message }
    },
    tableOfContents[]{ id, label, indent },
    relatedProduct{ title, capacity, image${imageProjection}, href }
  }`,
  trendingArticles: `*[_type == "trendingArticle"] | order(order asc){ _id, _type, rank, title, readTime, order }`,
  adminCredentials: `*[_id == "adminCredentials"][0]{ _id, _type, username, password }`,
} as const

export function getPageQuery(pageKey: string): string | null {
  const map: Record<string, string> = {
    landing: adminQueries.landingPage,
    services: adminQueries.servicesPage,
    about: adminQueries.aboutPage,
    contact: adminQueries.contactPage,
    'corporate-profile': adminQueries.corporateProfilePage,
    'distribution-category': adminQueries.distributionCategory,
  }
  return map[pageKey] ?? null
}
