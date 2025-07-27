import { NextRequest, NextResponse } from 'next/server'
import { unlink, access } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    // Security check - only allow deletion of .md files
    if (!filename.endsWith('.md')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const postsDir = join(process.cwd(), 'content', 'posts')
    const filePath = join(postsDir, filename)
    
    // Check if file exists first
    try {
      await access(filePath)
    } catch (err) {
      return NextResponse.json({ 
        error: 'File not found' 
      }, { status: 404 })
    }

    // Try to delete the file
    try {
      await unlink(filePath)
      console.log(`Successfully deleted: ${filename}`)
    } catch (deleteError) {
      console.error('Delete error:', deleteError)
      
      // In production (Vercel), we might not be able to delete files
      // So we'll return a different approach message
      if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
        return NextResponse.json({ 
          error: 'File deletion not supported in production environment. Please use GitHub repository for file management.' 
        }, { status: 400 })
      }
      
      throw deleteError
    }
    
    // Revalidate paths to update the cache
    revalidatePath('/posts')
    revalidatePath('/news')
    revalidatePath('/admin/posts')
    revalidatePath('/')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ 
      error: 'Failed to delete post: ' + (error as Error).message 
    }, { status: 500 })
  }
}
