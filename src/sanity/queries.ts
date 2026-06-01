export const ADMIN_SESSION_KEY = 'ti-admin-authenticated'

export const queries = {
  adminCredentials: `*[_type == "adminCredentials"][0]{ username, password }`,

  landingPage: `*[_type == "landingPage" && _id == "landingPage"][0]`,
  servicesPage: `*[_type == "servicesPage" && _id == "servicesPage"][0]`,
  aboutPage: `*[_type == "aboutPage" && _id == "aboutPage"][0]`,
  contactPage: `*[_type == "contactPage" && _id == "contactPage"][0]`,
  corporateProfilePage: `*[_type == "corporateProfilePage" && _id == "corporateProfilePage"][0]`,

  productCategories: `*[_type == "productCategory"] | order(id asc)`,
  distributionCategory: `*[_type == "distributionCategory" && _id == "distributionCategory"][0]`,
  comparisonParameters: `*[_type == "comparisonParameter"] | order(order asc)`,
  productDetailBySlug: `*[_type == "productDetail" && slug.current == $slug][0]`,
  productDetailsByCategory: `*[_type == "productDetail" && (categoryId == $categoryId || (!defined(categoryId) && $categoryId == "distribution-transformers"))] | order(title asc)`,

  projects: `*[_type == "project"] | order(id asc)`,
  commissionRows: `*[_type == "commissionRow"] | order(id asc)`,

  blogPosts: `*[_type == "blogPost"] | order(date desc)`,
  featuredBlogPost: `*[_type == "blogPost" && featured == true][0]`,
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0]`,
  trendingArticles: `*[_type == "trendingArticle"] | order(order asc)`,
} as const
