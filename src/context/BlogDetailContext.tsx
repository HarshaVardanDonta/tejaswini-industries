import { createContext, useContext } from 'react'

export type BlogChecklistItem = { label: string; text: string }

export type BlogSubsection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
  checklist?: BlogChecklistItem[]
}

export type BlogFigure = {
  url: string
  alt: string
  caption: string
  width?: number
  height?: number
  maxWidth?: 'md' | 'full'
}

export type BlogSection = {
  id: string
  title: string
  /** Paragraph text may contain [link text](/path) and **bold**. */
  paragraphs: string[]
  bullets?: string[]
  subsections?: BlogSubsection[]
  table?: { headers: string[]; rows: string[][] }
  /** Paragraphs shown after the bullets, subsections and table. */
  closing?: string[]
  figure?: BlogFigure
  alert?: { title: string; message: string }
}

export type BlogDetailData = {
  slug: string
  breadcrumbLabel: string
  title: string
  metaTitle: string
  metaDescription: string
  author: string
  date: string
  publishedAt?: string
  dateModified?: string
  readTime: string
  wordCount?: number
  category: string
  heroImage: string
  heroImageAlt: string
  heroCaption: string
  intro: string
  sections: BlogSection[]
  faqs: { question: string; answer: string }[]
  cta?: { title: string; text: string }
  tableOfContents: { id: string; label: string; indent: boolean }[]
  relatedProduct?: {
    title: string
    capacity: string
    image: string
    imageAlt: string
    href: string
  }
}

const emptyArticle: BlogDetailData = {
  slug: '',
  breadcrumbLabel: '',
  title: '',
  metaTitle: '',
  metaDescription: '',
  author: '',
  date: '',
  readTime: '',
  category: '',
  heroImage: '',
  heroImageAlt: '',
  heroCaption: '',
  intro: '',
  sections: [],
  faqs: [],
  tableOfContents: [],
}

const BlogDetailContext = createContext<BlogDetailData>(emptyArticle)

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
