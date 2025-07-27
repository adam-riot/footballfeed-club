import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'

// Simple file-based "database" untuk track deleted posts
const DELETED_POSTS_FILE = join(process.cwd(), 'content', 'deleted-posts.json')

export async function POST(request: NextRequest) {
  try {
    const { filename, title } = await request.json()
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    // Read existing deleted posts
    let deletedPosts: string[] = []
    try {
      const data = await readFile(DELETED_POSTS_FILE, 'utf8')
      deletedPosts = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet, that's okay
      deletedPosts = []
    }

    // Add to deleted list if not already there
    if (!deletedPosts.includes(filename)) {
      deletedPosts.push(filename)
      await writeFile(DELETED_POSTS_FILE, JSON.stringify(deletedPosts, null, 2))
    }
    
    // Revalidate paths
    revalidatePath('/posts')
    revalidatePath('/news')
    revalidatePath('/admin/posts')
    revalidatePath('/')
    
    return NextResponse.json({ 
      success: true, 
      message: `Post "${title}" marked as deleted` 
    })
  } catch (error) {
    console.error('Soft delete error:', error)
    return NextResponse.json({ 
      error: 'Failed to mark post as deleted' 
    }, { status: 500 })
  }
}
