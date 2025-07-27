import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  featured_image?: string
  author: string
  content?: string
  contentHtml?: string
}

export function getAllPosts(): PostData[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  // Read deleted posts list
  const deletedPostsFile = path.join(process.cwd(), 'content', 'deleted-posts.json')
  let deletedPosts: string[] = []
  try {
    if (fs.existsSync(deletedPostsFile)) {
      const deletedData = fs.readFileSync(deletedPostsFile, 'utf8')
      deletedPosts = JSON.parse(deletedData)
    }
  } catch {
    console.log('No deleted posts file found or error reading it')
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .filter(fileName => !deletedPosts.includes(fileName)) // Exclude deleted posts
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        excerpt: matterResult.data.excerpt || '',
        category: matterResult.data.category || 'General',
        tags: matterResult.data.tags || [],
        featured_image: matterResult.data.featured_image,
        author: matterResult.data.author || 'Football Feed Bot',
        content: matterResult.content
      } as PostData
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    excerpt: matterResult.data.excerpt || '',
    category: matterResult.data.category || 'General',
    tags: matterResult.data.tags || [],
    featured_image: matterResult.data.featured_image,
    author: matterResult.data.author || 'Football Feed Bot',
    content: matterResult.content
  }
}

export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase())
}

export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function getFeaturedPosts(limit: number = 3): PostData[] {
  const allPosts = getAllPosts()
  return allPosts.slice(0, limit)
}

