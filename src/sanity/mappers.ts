import type {
  AboutPageData,
  ContactPageData,
  CorporateProfilePageData,
  ServicesPageData,
} from '../sanity/pageTypes'
import type { LandingPageData } from '../context/LandingPageContext'
import {
  distributionTransformerProducts,
  type ComparisonCellValue,
  type DistributionTransformerProduct,
} from '../data/distributionTransformers'
import type { ImageWithUrl } from './image'
import { resolveImageAlt, resolveImageUrl } from './image'

type SanityComparisonEntry = {
  key: string
  value?: string
  tags?: string[]
}

type SanityDistributionProduct = {
  id: string
  title: string
  image?: ImageWithUrl
  specs?: { label: string; value: string }[]
  badge?: { type: string; label: string; icon?: string }
  accent?: boolean
  detailSlug?: string
  comparisonSku?: string
  comparisonHighlight?: boolean
  comparisonValues?: SanityComparisonEntry[]
}

export function mapComparisonValues(entries?: SanityComparisonEntry[]) {
  const result: Record<string, string | { tags: string[] }> = {}
  for (const entry of entries || []) {
    if (entry.tags?.length) {
      result[entry.key] = { tags: entry.tags }
    } else if (entry.value) {
      result[entry.key] = entry.value
    }
  }
  return result
}

export function mapDistributionProduct(product: SanityDistributionProduct) {
  return {
    id: product.id,
    title: product.title,
    image: resolveImageUrl(product.image),
    imageAlt: resolveImageAlt(product.image, product.title),
    specs: product.specs || [],
    badge: product.badge?.type
      ? product.badge.type === 'efficiency'
        ? {
            type: 'efficiency' as const,
            label: product.badge.label,
            icon: product.badge.icon || 'bolt',
          }
        : { type: 'best-seller' as const, label: product.badge.label }
      : undefined,
    accent: product.accent,
    detailSlug: product.detailSlug,
    comparisonSku: product.comparisonSku,
    comparisonHighlight: product.comparisonHighlight,
    comparisonValues: mapComparisonValues(product.comparisonValues),
  }
}

const QUICK_SPEC_TO_COMPARISON_KEY: Record<string, string> = {
  'Power Rating': 'powerRating',
  'Voltage Ratio': 'voltage',
  'Cooling Type': 'coolingType',
  'Vector Group': 'vectorGroup',
  Capacity: 'capacity',
  'Capacity Range': 'capacity',
  Standard: 'standard',
  'Applicable Standard': 'standard',
  Efficiency: 'efficiency',
}

const TECH_PARAM_TO_COMPARISON_KEY: Record<string, string> = {
  'Continuous Rating': 'powerRating',
  'No-Load Loss (Max)': 'noLoadLoss',
  'Load Loss at 75°C (Max)': 'loadLoss',
  'Impedance Voltage': 'impedance',
  'Applicable Standard': 'compliance',
}

function normalizeComparisonValue(value: string, key: string): ComparisonCellValue {
  if (key === 'compliance' && value.includes('/')) {
    const tags = value
      .split('/')
      .map((part) => part.trim())
      .filter(Boolean)
    if (tags.length > 1) return { tags }
  }
  return value.replace(/\s*W$/, '').replace(/\s*kVA$/i, '').replace(/%/g, '').trim() || value
}

function buildComparisonValuesFromProductDetail(detail: {
  quickSpecs?: { label: string; value: string }[]
  technicalParameters?: { parameter: string; value: string }[]
}): Record<string, ComparisonCellValue> {
  const values: Record<string, ComparisonCellValue> = {}

  for (const spec of detail.quickSpecs ?? []) {
    const key = QUICK_SPEC_TO_COMPARISON_KEY[spec.label]
    if (key) values[key] = normalizeComparisonValue(spec.value, key)
  }

  for (const row of detail.technicalParameters ?? []) {
    const key = TECH_PARAM_TO_COMPARISON_KEY[row.parameter]
    if (key && values[key] === undefined) {
      values[key] = normalizeComparisonValue(row.value, key)
    }
  }

  return values
}

/** Maps a productDetail document to a category listing card (replaces distributionProduct cards). */
export function mapProductDetailToListingProduct(
  detail: Record<string, unknown>
): DistributionTransformerProduct {
  const slug =
    (detail.slug as { current?: string })?.current ?? (detail.slug as string) ?? ''
  const title = (detail.title as string) ?? ''
  const sku = (detail.sku as string) ?? ''
  const images = detail.images as { main?: ImageWithUrl } | undefined
  const quickSpecs =
    (detail.quickSpecs as { label: string; value: string; highlight?: boolean }[]) ?? []

  return {
    id: slug || (detail._id as string) || sku,
    title,
    image: resolveImageUrl(images?.main),
    imageAlt: resolveImageAlt(images?.main, title),
    specs: quickSpecs.map(({ label, value }) => ({ label, value })),
    detailSlug: slug,
    comparisonSku: sku,
    comparisonHighlight: false,
    comparisonValues: buildComparisonValuesFromProductDetail({
      quickSpecs,
      technicalParameters: detail.technicalParameters as
        | { parameter: string; value: string }[]
        | undefined,
    }),
  }
}

export function getDistributionListingProductsFallback(): DistributionTransformerProduct[] {
  return distributionTransformerProducts
}

export function mapProductCategory(category: {
  id: string
  title: string
  description: string
  image?: ImageWithUrl
  listingPath?: string
}) {
  return {
    id: category.id,
    title: category.title,
    description: category.description,
    image: resolveImageUrl(category.image),
    imageAlt: resolveImageAlt(category.image, category.title),
    listingPath: category.listingPath,
  }
}

export function mapBlogPost(post: {
  id: string
  slug?: { current?: string }
  title: string
  excerpt: string
  category: string
  categoryLabel: string
  date: string
  author: string
  image?: ImageWithUrl
  accent?: boolean
  alertMeta?: boolean
}) {
  return {
    id: post.id,
    slug: post.slug?.current,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryLabel: post.categoryLabel,
    date: post.date,
    author: post.author,
    image: resolveImageUrl(post.image),
    imageAlt: resolveImageAlt(post.image, post.title),
    accent: post.accent,
    alertMeta: post.alertMeta,
  }
}

export function mapBlogDetail(
  post: Record<string, unknown> | null,
  fallback?: typeof import('../data/blogDetailTransformerMaintenance').transformerMaintenanceGuide
) {
  if (!post) {
    return fallback
      ? fallback
      : {
          slug: '',
          breadcrumbLabel: '',
          title: '',
          author: '',
          date: '',
          readTime: '',
          heroImage: '',
          heroImageAlt: '',
          intro: '',
          sections: [],
          tableOfContents: [],
          relatedProduct: undefined,
        }
  }
  return {
    slug: (post.slug as { current?: string })?.current || '',
    breadcrumbLabel: (post.breadcrumbLabel as string) || '',
    title: (post.title as string) || '',
    author: (post.author as string) || '',
    date: (post.date as string) || '',
    readTime: (post.readTime as string) || '',
    heroImage: resolveImageUrl(post.image as ImageWithUrl),
    heroImageAlt: resolveImageAlt(post.image as ImageWithUrl, (post.title as string) || ''),
    intro: (post.intro as string) || '',
    sections: ((post.sections as Array<Record<string, unknown>>) || []).map((section) => ({
      id: section.id as string,
      title: section.title as string,
      paragraphs: (section.paragraphs as string[]) || [],
      subsections: section.subsections as Array<{
        id: string
        title: string
        checklist: { label: string; text: string }[]
      }>,
      table: section.table
        ? {
            headers: ((section.table as { headers?: string[] }).headers) || [],
            rows: (((section.table as { rows?: Array<{ cells?: string[] }> }).rows) || []).map(
              (row) => row.cells || []
            ),
          }
        : undefined,
      alert: section.alert as { title: string; message: string } | undefined,
    })),
    tableOfContents:
      (post.tableOfContents as { id: string; label: string; indent: boolean }[]) || [],
    relatedProduct: post.relatedProduct
      ? {
          title: (post.relatedProduct as { title: string }).title,
          capacity: (post.relatedProduct as { capacity: string }).capacity,
          image: resolveImageUrl((post.relatedProduct as { image?: ImageWithUrl }).image),
          imageAlt: resolveImageAlt(
            (post.relatedProduct as { image?: ImageWithUrl }).image,
            (post.relatedProduct as { title: string }).title
          ),
          href: (post.relatedProduct as { href: string }).href,
        }
      : undefined,
  }
}

export function mapProductDetail(
  detail: Record<string, unknown> | null,
  fallback: typeof import('../data/productDetail250Kva').productDetail250Kva
) {
  if (!detail) return fallback
  return {
    slug: (detail.slug as { current?: string })?.current || fallback.slug,
    sku: (detail.sku as string) || fallback.sku,
    title: (detail.title as string) || fallback.title,
    breadcrumbLabel: (detail.breadcrumbLabel as string) || fallback.breadcrumbLabel,
    description: (detail.description as string) || fallback.description,
    images: {
      main: {
        src: resolveImageUrl(
          (detail.images as { main?: ImageWithUrl })?.main,
          fallback.images.main.src
        ),
        alt: resolveImageAlt(
          (detail.images as { main?: ImageWithUrl })?.main,
          fallback.images.main.alt
        ),
      },
      front: {
        src: resolveImageUrl(
          (detail.images as { front?: ImageWithUrl })?.front,
          fallback.images.front.src
        ),
        alt: resolveImageAlt(
          (detail.images as { front?: ImageWithUrl })?.front,
          fallback.images.front.alt
        ),
      },
      detail: {
        src: resolveImageUrl(
          (detail.images as { detail?: ImageWithUrl })?.detail,
          fallback.images.detail.src
        ),
        alt: resolveImageAlt(
          (detail.images as { detail?: ImageWithUrl })?.detail,
          fallback.images.detail.alt
        ),
      },
    },
    quickSpecs:
      (detail.quickSpecs as typeof fallback.quickSpecs) || fallback.quickSpecs,
    technicalParameters:
      (detail.technicalParameters as typeof fallback.technicalParameters) ||
      fallback.technicalParameters,
  }
}

export function mapProject(project: {
  id: string
  title: string
  category: string
  categoryLabel: string
  sector: string
  location: string
  image?: ImageWithUrl
  specs?: { label: string; value: string }[]
  accent?: boolean
}) {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    categoryLabel: project.categoryLabel,
    sector: project.sector,
    location: project.location,
    image: resolveImageUrl(project.image),
    imageAlt: resolveImageAlt(project.image, project.title),
    specs: project.specs || [],
    accent: project.accent,
  }
}

export function img(url: string, alt = '') {
  return { url, alt }
}

function mapImageField(image?: ImageWithUrl, fallbackUrl = '', fallbackAlt = '') {
  return {
    url: resolveImageUrl(image, fallbackUrl),
    alt: resolveImageAlt(image, fallbackAlt),
  }
}

export function mapLandingPage(doc: Record<string, unknown> | null, fallback: LandingPageData): LandingPageData {
  if (!doc) return fallback
  const hero = doc.hero as Record<string, unknown> | undefined
  const companyIntro = doc.companyIntro as Record<string, unknown> | undefined
  const portfolio = doc.portfolio as Record<string, unknown> | undefined
  const technicalSupremacy = doc.technicalSupremacy as Record<string, unknown> | undefined
  const ctaBanner = doc.ctaBanner as Record<string, unknown> | undefined

  const heroImage = mapImageField(hero?.image as ImageWithUrl, fallback.hero.image, fallback.hero.imageAlt)

  return {
    hero: {
      image: heroImage.url,
      imageAlt: heroImage.alt,
      badgePrimary: (hero?.badgePrimary as string) || fallback.hero.badgePrimary,
      badgeSecondary: (hero?.badgeSecondary as string) || fallback.hero.badgeSecondary,
      title: (hero?.title as string) || fallback.hero.title,
      description: (hero?.description as string) || fallback.hero.description,
      primaryCta: (hero?.primaryCta as string) || fallback.hero.primaryCta,
      secondaryCta: (hero?.secondaryCta as string) || fallback.hero.secondaryCta,
    },
    companyIntro: {
      title: (companyIntro?.title as string) || fallback.companyIntro.title,
      paragraphs: (companyIntro?.paragraphs as string[]) || fallback.companyIntro.paragraphs,
      image: mapImageField(companyIntro?.image as ImageWithUrl, fallback.companyIntro.image, fallback.companyIntro.imageAlt).url,
      imageAlt: mapImageField(companyIntro?.image as ImageWithUrl, fallback.companyIntro.image, fallback.companyIntro.imageAlt).alt,
      stats: (companyIntro?.stats as LandingPageData['companyIntro']['stats']) || fallback.companyIntro.stats,
    },
    portfolio: {
      eyebrow: (portfolio?.eyebrow as string) || fallback.portfolio.eyebrow,
      title: (portfolio?.title as string) || fallback.portfolio.title,
      linkLabel: (portfolio?.linkLabel as string) || fallback.portfolio.linkLabel,
      items: ((portfolio?.items as Array<Record<string, unknown>>) || []).map((item, index) => {
        const fb = fallback.portfolio.items[index] || fallback.portfolio.items[0]
        const image = mapImageField(item.image as ImageWithUrl, fb.image, fb.imageAlt)
        return {
          title: (item.title as string) || fb.title,
          description: (item.description as string) || fb.description,
          image: image.url,
          imageAlt: image.alt,
          size: (item.size as 'large' | 'small') || fb.size,
          overlayPrimary: (item.overlayPrimary as boolean) ?? fb.overlayPrimary,
        }
      }),
    },
    technicalSupremacy: {
      title: (technicalSupremacy?.title as string) || fallback.technicalSupremacy.title,
      features: ((technicalSupremacy?.features as Array<Record<string, unknown>>) || fallback.technicalSupremacy.features).map(
        (feature, index) => ({
          icon: (feature.icon as string) || fallback.technicalSupremacy.features[index]?.icon || 'architecture',
          title: (feature.title as string) || fallback.technicalSupremacy.features[index]?.title || '',
          description: (feature.description as string) || fallback.technicalSupremacy.features[index]?.description || '',
          accent: (feature.accent as 'primary' | 'secondary') || fallback.technicalSupremacy.features[index]?.accent || 'primary',
        })
      ),
    },
    ctaBanner: {
      title: (ctaBanner?.title as string) || fallback.ctaBanner.title,
      description: (ctaBanner?.description as string) || fallback.ctaBanner.description,
      buttonLabel: (ctaBanner?.buttonLabel as string) || fallback.ctaBanner.buttonLabel,
    },
  }
}

export function mapServicesPage(
  doc: Record<string, unknown> | null,
  fallback: ServicesPageData
): ServicesPageData {
  if (!doc) return fallback
  const hero = doc.hero as Record<string, unknown> | undefined
  const heroImage = mapImageField(hero?.image as ImageWithUrl, fallback.hero.image, fallback.hero.imageAlt)
  const capabilities = doc.capabilities as Record<string, unknown> | undefined
  const featured = capabilities?.featured as Record<string, unknown> | undefined
  const featuredImage = mapImageField(featured?.image as ImageWithUrl, fallback.capabilities.featured.image, fallback.capabilities.featured.imageAlt)

  return {
    hero: {
      image: heroImage.url,
      imageAlt: heroImage.alt,
      eyebrow: (hero?.eyebrow as string) || fallback.hero.eyebrow,
      title: (hero?.title as string) || fallback.hero.title,
      description: (hero?.description as string) || fallback.hero.description,
    },
    coreServices: (doc.coreServices as ServicesPageData['coreServices']) || fallback.coreServices,
    processSteps: (doc.processSteps as ServicesPageData['processSteps']) || fallback.processSteps,
    capabilities: {
      featured: {
        image: featuredImage.url,
        imageAlt: featuredImage.alt,
        title: (featured?.title as string) || fallback.capabilities.featured.title,
        description: (featured?.description as string) || fallback.capabilities.featured.description,
      },
      internalElectrification:
        (capabilities?.internalElectrification as ServicesPageData['capabilities']['internalElectrification']) ||
        fallback.capabilities.internalElectrification,
      structural:
        (capabilities?.structural as ServicesPageData['capabilities']['structural']) ||
        fallback.capabilities.structural,
      energyAuditing:
        (capabilities?.energyAuditing as ServicesPageData['capabilities']['energyAuditing']) ||
        fallback.capabilities.energyAuditing,
    },
    cta: (doc.cta as ServicesPageData['cta']) || fallback.cta,
  }
}

export function mapAboutPage(doc: Record<string, unknown> | null, fallback: AboutPageData): AboutPageData {
  if (!doc) return fallback
  const hero = doc.hero as Record<string, unknown> | undefined
  const overview = doc.overview as Record<string, unknown> | undefined
  const infrastructure = doc.infrastructure as Record<string, unknown> | undefined
  const heroImage = mapImageField(hero?.image as ImageWithUrl, fallback.hero.image, fallback.hero.imageAlt)
  const isoImage = mapImageField(overview?.isoImage as ImageWithUrl, fallback.overview.isoImage, fallback.overview.isoImageAlt)
  const facilityImage = mapImageField(
    infrastructure?.facilityImage as ImageWithUrl,
    fallback.infrastructure.facilityImage,
    fallback.infrastructure.facilityImageAlt
  )

  return {
    hero: {
      title: (hero?.title as string) || fallback.hero.title,
      description: (hero?.description as string) || fallback.hero.description,
      image: heroImage.url,
      imageAlt: heroImage.alt,
    },
    overview: {
      title: (overview?.title as string) || fallback.overview.title,
      paragraphs: (overview?.paragraphs as string[]) || fallback.overview.paragraphs,
      isoImage: isoImage.url,
      isoImageAlt: isoImage.alt,
      highlights: (overview?.highlights as AboutPageData['overview']['highlights']) || fallback.overview.highlights,
    },
    visionMission: (doc.visionMission as AboutPageData['visionMission']) || fallback.visionMission,
    infrastructure: {
      title: (infrastructure?.title as string) || fallback.infrastructure.title,
      subtitle: (infrastructure?.subtitle as string) || fallback.infrastructure.subtitle,
      facilityImage: facilityImage.url,
      facilityImageAlt: facilityImage.alt,
      features: (infrastructure?.features as AboutPageData['infrastructure']['features']) || fallback.infrastructure.features,
    },
    sectors: (doc.sectors as AboutPageData['sectors']) || fallback.sectors,
    cta: (doc.cta as AboutPageData['cta']) || fallback.cta,
  }
}

export function mapContactPage(doc: Record<string, unknown> | null, fallback: ContactPageData): ContactPageData {
  if (!doc) return fallback
  const map = doc.map as Record<string, unknown> | undefined
  const mapImage = mapImageField(map?.image as ImageWithUrl, fallback.map.image, fallback.map.imageAlt)

  return {
    hero: (doc.hero as ContactPageData['hero']) || fallback.hero,
    infoCards: (doc.infoCards as ContactPageData['infoCards']) || fallback.infoCards,
    whatsapp: (doc.whatsapp as ContactPageData['whatsapp']) || fallback.whatsapp,
    map: {
      image: mapImage.url,
      imageAlt: mapImage.alt,
      label: (map?.label as string) || fallback.map.label,
    },
    form: (doc.form as ContactPageData['form']) || fallback.form,
    inquiryTypes: (doc.inquiryTypes as ContactPageData['inquiryTypes']) || fallback.inquiryTypes,
  }
}

export function mapCorporateProfilePage(
  doc: Record<string, unknown> | null,
  fallback: CorporateProfilePageData
): CorporateProfilePageData {
  if (!doc) return fallback
  const hero = doc.hero as Record<string, unknown> | undefined
  const profile = doc.profile as Record<string, unknown> | undefined
  const heroImage = mapImageField(hero?.image as ImageWithUrl, fallback.hero.image, fallback.hero.imageAlt)
  const profileImage = mapImageField(profile?.image as ImageWithUrl, fallback.profile.image, fallback.profile.imageAlt)

  return {
    hero: {
      image: heroImage.url,
      imageAlt: heroImage.alt,
      badge: (hero?.badge as string) || fallback.hero.badge,
      title: (hero?.title as string) || fallback.hero.title,
      titleHighlight: (hero?.titleHighlight as string) || fallback.hero.titleHighlight,
      description: (hero?.description as string) || fallback.hero.description,
      stats: (hero?.stats as CorporateProfilePageData['hero']['stats']) || fallback.hero.stats,
    },
    profile: {
      image: profileImage.url,
      imageAlt: profileImage.alt,
      eyebrow: (profile?.eyebrow as string) || fallback.profile.eyebrow,
      title: (profile?.title as string) || fallback.profile.title,
      paragraphs: (profile?.paragraphs as string[]) || fallback.profile.paragraphs,
      highlights: (profile?.highlights as CorporateProfilePageData['profile']['highlights']) || fallback.profile.highlights,
      established: (profile?.established as string) || fallback.profile.established,
    },
  }
}

export function mapFeaturedPost(post: Record<string, unknown> | null, fallback: {
  categoryLabel: string
  date: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
  authorName: string
  authorRole: string
  authorImage: string
  authorImageAlt: string
}) {
  if (!post) return fallback
  const image = mapImageField(post.image as ImageWithUrl, fallback.image, fallback.imageAlt)
  const authorImage = mapImageField(post.authorImage as ImageWithUrl, fallback.authorImage, fallback.authorImageAlt)
  return {
    categoryLabel: (post.categoryLabel as string) || fallback.categoryLabel,
    date: (post.date as string) || fallback.date,
    title: (post.title as string) || fallback.title,
    excerpt: (post.excerpt as string) || fallback.excerpt,
    image: image.url,
    imageAlt: image.alt,
    authorName: (post.author as string) || fallback.authorName,
    authorRole: (post.authorRole as string) || fallback.authorRole,
    authorImage: authorImage.url,
    authorImageAlt: authorImage.alt,
  }
}
