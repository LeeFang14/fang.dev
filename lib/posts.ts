import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from './types/post'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

function parsePost(filePath: string): Post | null {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  if (!data.published) return null

  const slug = path.basename(filePath, '.md')

  return {
    slug,
    category: data.category ?? '',
    title: data.title,
    date: data.date,
    tags: data.tags ?? [],
    description: data.description ?? '',
    published: data.published,
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => parsePost(path.join(POSTS_DIR, file)))
    .filter((post): post is Post => post !== null)

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return parsePost(filePath)
}