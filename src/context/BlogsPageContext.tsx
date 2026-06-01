import { createContext, useContext } from 'react'

import { featuredPost, trendingArticles } from '../data/blogs'

export type FeaturedPostData = {
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
}

const FeaturedPostContext = createContext<FeaturedPostData>(featuredPost)
const TrendingArticlesContext = createContext(trendingArticles)

export function BlogsPageProvider({
  featured,
  trending,
  children,
}: {
  featured: FeaturedPostData
  trending: typeof trendingArticles
  children: React.ReactNode
}) {
  return (
    <FeaturedPostContext.Provider value={featured}>
      <TrendingArticlesContext.Provider value={trending}>
        {children}
      </TrendingArticlesContext.Provider>
    </FeaturedPostContext.Provider>
  )
}

export function useFeaturedPost() {
  return useContext(FeaturedPostContext)
}

export function useTrendingArticles() {
  return useContext(TrendingArticlesContext)
}
