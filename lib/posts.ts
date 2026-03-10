import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from './types/post'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

function parsePost(filePath: string, category: string): Post | null {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.published) return null

  const slug = path.basename(filePath, '.mdx')

  return {
    slug,
    category,
    title: data.title,
    date: data.date,
    tags: data.tags ?? [],
    description: data.description ?? '',
    published: data.published,
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  const categories = fs.readdirSync(POSTS_DIR)

  const posts = categories.flatMap((category) => {
    const categoryDir = path.join(POSTS_DIR, category)
    if (!fs.statSync(categoryDir).isDirectory()) return []

    return fs
      .readdirSync(categoryDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => parsePost(path.join(categoryDir, file), category))
      .filter((post): post is Post => post !== null)
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(category: string, slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return parsePost(filePath, category)
}