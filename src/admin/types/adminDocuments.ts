export type SanityImageWithUrl = {
  _type?: 'imageWithUrl'
  asset?: {
    _type?: 'image'
    asset?: { _type: 'reference'; _ref: string }
  }
  url?: string
  alt?: string
}

export type SanitySlug = { _type?: 'slug'; current?: string }

export type SanityDocBase = {
  _id: string
  _type: string
  _rev?: string
}

export type Spec = { _type?: 'spec'; label: string; value: string }

export type AdminCredentials = SanityDocBase & {
  _type: 'adminCredentials'
  username: string
  password: string
}
