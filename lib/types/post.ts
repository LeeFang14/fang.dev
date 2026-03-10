export type PostMeta = {
  slug: string
  category: string
  title: string
  date: string
  tags: string[]
  description: string
  published: boolean
}

export type Post = PostMeta & {
  content: string
}