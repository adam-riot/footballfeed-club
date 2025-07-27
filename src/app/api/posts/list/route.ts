import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    const deletedPostsFile = path.join(process.cwd(), 'content', 'deleted-posts.json')
    
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([])
    }

    // Read deleted posts list
    let deletedPosts: string[] = []
    try {
      if (fs.existsSync(deletedPostsFile)) {
        const deletedData = fs.readFileSync(deletedPostsFile, 'utf8')
        deletedPosts = JSON.parse(deletedData)
      }
    } catch (error) {
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
          filename: fileName, // Real filename from directory
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || new Date().toISOString().split('T')[0],
          excerpt: matterResult.data.excerpt || '',
          category: matterResult.data.category || 'General',
          tags: matterResult.data.tags || [],
          author: matterResult.data.author || 'Football Feed Bot'
        }
      })

    // Sort by date
    allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
    
    return NextResponse.json(allPostsData)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
