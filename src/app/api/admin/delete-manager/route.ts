import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Simple in-memory storage untuk deleted posts (production workaround)
// Dalam production, ini akan reset bila server restart, tetapi OK untuk demo
const deletedPostsCache: string[] = []

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.WEBHOOK_SECRET || 'your-webhook-secret'
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { action, filename, title } = await request.json()
    
    if (action !== 'delete' || !filename) {
      return NextResponse.json({ error: 'Invalid action or missing filename' }, { status: 400 })
    }

    // Add to deleted cache
    if (!deletedPostsCache.includes(filename)) {
      deletedPostsCache.push(filename)
    }
    
    // Revalidate paths
    revalidatePath('/posts')
    revalidatePath('/news')
    revalidatePath('/admin/posts')
    revalidatePath('/')
    
    return NextResponse.json({ 
      success: true, 
      message: `Post "${title}" marked as deleted (cache)`,
      deletedCount: deletedPostsCache.length
    })
  } catch (error) {
    console.error('Delete webhook error:', error)
    return NextResponse.json({ 
      error: 'Failed to process delete request' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Delete management endpoint',
    deletedPosts: deletedPostsCache,
    deletedCount: deletedPostsCache.length
  })
}
