import { createContext, useContext } from 'react'

export type BlogDetailData = {
  slug: string
  breadcrumbLabel: string
  title: string
  author: string
  date: string
  readTime: string
  heroImage: string
  heroImageAlt: string
  intro: string
  sections: Array<{
    id: string
    title: string
    paragraphs: string[]
    subsections?: Array<{
      id: string
      title: string
      checklist: { label: string; text: string }[]
    }>
    table?: { headers: string[]; rows: string[][] }
    alert?: { title: string; message: string }
  }>
  tableOfContents: { id: string; label: string; indent: boolean }[]
  relatedProduct?: {
    title: string
    capacity: string
    image: string
    imageAlt: string
    href: string
  }
}

import { transformerMaintenanceGuide } from '../data/blogDetailTransformerMaintenance'

const BlogDetailContext = createContext<BlogDetailData>(transformerMaintenanceGuide)

export function BlogDetailProvider({
  value,
  children,
}: {
  value: BlogDetailData
  children: React.ReactNode
}) {
  return <BlogDetailContext.Provider value={value}>{children}</BlogDetailContext.Provider>
}

export function useBlogDetail() {
  return useContext(BlogDetailContext)
}
