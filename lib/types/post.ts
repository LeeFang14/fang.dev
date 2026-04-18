export type PostMeta = {
  slug: string
  category: string
  title: string
  date: string
  tags: string[]
  description: string
}

export type Post = PostMeta & {
  content: string
}