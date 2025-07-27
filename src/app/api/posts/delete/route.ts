import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
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
    
    // Delete the file
    await unlink(filePath)
    
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
      error: 'Failed to delete post' 
    }, { status: 500 })
  }
}
