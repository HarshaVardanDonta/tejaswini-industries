export const ADMIN_SESSION_KEY = 'ti-admin-authenticated'

export const queries = {
  adminCredentials: `*[_type == "adminCredentials"][0]{ username, password }`,

  landingPage: `*[_type == "landingPage" && _id == "landingPage"][0]`,
  servicesPage: `*[_type == "servicesPage" && _id == "servicesPage"][0]`,
  aboutPage: `*[_type == "aboutPage" && _id == "aboutPage"][0]`,
  contactPage: `*[_type == "contactPage" && _id == "contactPage"][0]`,
  corporateProfilePage: `*[_type == "corporateProfilePage" && _id == "corporateProfilePage"][0]`,

  productsPage: `*[_type == "productsPage" && _id == "productsPage"][0]`,
  productCategories: `*[_type == "productCategory"] | order(id asc)`,
  productCategoryById: `*[_type == "productCategory" && id == $id][0]`,

  projects: `*[_type == "project"] | order(id asc)`,
  commissionRows: `*[_type == "commissionRow"] | order(id asc)`,

  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc)`,
  featuredBlogPost: `*[_type == "blogPost" && featured == true][0]`,
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0]`,
} as const
