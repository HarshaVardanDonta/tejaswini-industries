import type { StructureBuilder } from 'sanity/structure'

const singleton = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'landingPage', 'Landing Page'),
              singleton(S, 'servicesPage', 'Services Page'),
              singleton(S, 'aboutPage', 'About Page'),
              singleton(S, 'contactPage', 'Contact Page'),
              singleton(S, 'corporateProfilePage', 'Corporate Profile'),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('trendingArticle').title('Trending Articles'),
      S.divider(),
      S.documentTypeListItem('productCategory').title('Product Categories'),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('commissionRow').title('Commission Rows'),
      S.divider(),
      S.documentTypeListItem('siteInquiry').title('Form Inquiries'),
      S.divider(),
      singleton(S, 'adminCredentials', 'Admin Credentials'),
    ])
