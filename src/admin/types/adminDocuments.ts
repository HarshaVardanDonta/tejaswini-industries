export type ContentImage = {
  _type?: 'imageWithUrl'
  asset?: {
    _type?: 'image'
    asset?: { _type: 'reference'; _ref: string }
  }
  url?: string
  alt?: string
}

export type ContentSlug = { _type?: 'slug'; current?: string }

export type ContentDocBase = {
  _id: string
  _type: string
  _rev?: string
}

export type Spec = { _type?: 'spec'; label: string; value: string }

export type AdminCredentials = ContentDocBase & {
  _type: 'adminCredentials'
  username: string
  password: string
}
