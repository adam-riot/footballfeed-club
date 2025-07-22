import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface WebhookPayload {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  author?: string
  featured_image?: string
}

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

    const payload: WebhookPayload = await request.json()

    // Validate required fields
    if (!payload.title || !payload.content || !payload.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, category' },
        { status: 400 }
      )
    }

    // Generate unique ID for the post
    const postId = generatePostId(payload.title)
    const currentDate = new Date().toISOString().split('T')[0]

    // Create markdown content
    const frontmatter = `---
title: "${payload.title.replace(/"/g, '\\"')}"
date: "${currentDate}"
excerpt: "${(payload.excerpt || '').replace(/"/g, '\\"')}"
category: "${payload.category}"
tags: [${payload.tags?.map(tag => `"${tag}"`).join(', ') || ''}]
featured_image: "${payload.featured_image || '/images/default-football.jpg'}"
author: "${payload.author || 'Football Feed Bot'}"
---

${payload.content}`

    // Save to content/posts directory
    const postsDir = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(postsDir, `${postId}.md`)

    // Ensure directory exists
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true })
    }

    // Write the file
    fs.writeFileSync(filePath, frontmatter, 'utf8')

    // Trigger rebuild (this would typically trigger a Git commit and push)
    // For now, we'll just return success
    
    return NextResponse.json({
      success: true,
      postId: postId,
      message: 'Post created successfully',
      filePath: `content/posts/${postId}.md`
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Football Feed Club Webhook Endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}

function generatePostId(title: string): string {
  // Convert title to URL-friendly slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .substring(0, 50) // Limit length

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now().toString().slice(-6)
  
  return `${slug}-${timestamp}`
}

