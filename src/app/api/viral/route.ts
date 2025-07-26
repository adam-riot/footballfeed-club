import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface ViralContent {
  title: string
  description: string
  source_url: string
  engagement_score: number // 1-100
  platform: 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'reddit' | 'facebook'
  content_type: 'video' | 'image' | 'text' | 'meme'
  trending_keywords: string[]
  related_teams?: string[]
  related_players?: string[]
  viral_metrics: {
    views?: number
    shares?: number
    likes?: number
    comments?: number
  }
  detected_at: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.WEBHOOK_SECRET || 'your-webhook-secret'
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const viralData: ViralContent = await request.json()

    // Only process high engagement content
    if (viralData.engagement_score < 70) {
      return NextResponse.json({ 
        success: false, 
        message: 'Content engagement score too low for publication',
        engagement_score: viralData.engagement_score,
        threshold: 70
      })
    }

    // Generate viral content article
    const slug = `viral-${viralData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}-${Date.now()}`
    
    const title = `🔥 VIRAL: ${viralData.title}`
    const priority = viralData.engagement_score >= 90 ? 'urgent' : 'high'
    
    const content = `
# ${title}

**🔥 Viral Alert!** This is trending across ${viralData.platform}!

**Engagement Score:** ${viralData.engagement_score}/100 📊
**Platform:** ${viralData.platform.charAt(0).toUpperCase() + viralData.platform.slice(1)} 📱
**Content Type:** ${viralData.content_type.charAt(0).toUpperCase() + viralData.content_type.slice(1)} 🎯

## What's Going Viral? 

${viralData.description}

### 📈 Viral Metrics:
${viralData.viral_metrics.views ? `- **Views:** ${viralData.viral_metrics.views.toLocaleString()} 👀` : ''}
${viralData.viral_metrics.likes ? `- **Likes:** ${viralData.viral_metrics.likes.toLocaleString()} ❤️` : ''}
${viralData.viral_metrics.shares ? `- **Shares:** ${viralData.viral_metrics.shares.toLocaleString()} 🔄` : ''}
${viralData.viral_metrics.comments ? `- **Comments:** ${viralData.viral_metrics.comments.toLocaleString()} 💬` : ''}

${viralData.related_teams && viralData.related_teams.length > 0 ? `
### 🏆 Teams Involved:
${viralData.related_teams.map(team => `- ${team}`).join('\n')}
` : ''}

${viralData.related_players && viralData.related_players.length > 0 ? `
### ⚽ Players Mentioned:
${viralData.related_players.map(player => `- ${player}`).join('\n')}
` : ''}

### 🔥 Trending Keywords:
${viralData.trending_keywords.map(keyword => `#${keyword}`).join(' • ')}

---

**Source:** [View Original Content](${viralData.source_url})

*This content is trending NOW! Join the conversation and share your thoughts!*

**Detected:** ${new Date(viralData.detected_at).toLocaleString()}
`

    // Create markdown file
    const contentDir = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(contentDir, `${slug}.md`)

    const frontMatter = `---
title: "${title}"
date: "${new Date().toISOString()}"
excerpt: "🔥 Viral football content trending on ${viralData.platform} with ${viralData.engagement_score}/100 engagement score"
category: "viral"
tags: [${viralData.trending_keywords.map(keyword => `"${keyword}"`).join(', ')}, "viral", "${viralData.platform}", "${viralData.content_type}"]
featured: ${viralData.engagement_score >= 90 ? 'true' : 'false'}
priority: "${priority}"
author: "Viral Content Bot"
viral_data:
  platform: "${viralData.platform}"
  engagement_score: ${viralData.engagement_score}
  content_type: "${viralData.content_type}"
  source_url: "${viralData.source_url}"
  detected_at: "${viralData.detected_at}"
  metrics:
    ${viralData.viral_metrics.views ? `views: ${viralData.viral_metrics.views}` : ''}
    ${viralData.viral_metrics.likes ? `likes: ${viralData.viral_metrics.likes}` : ''}
    ${viralData.viral_metrics.shares ? `shares: ${viralData.viral_metrics.shares}` : ''}
---

${content}`

    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true })
    }

    // Write file
    fs.writeFileSync(filePath, frontMatter)

    return NextResponse.json({ 
      success: true, 
      message: `Viral content article created: ${title}`,
      slug: slug,
      priority: priority,
      engagement_score: viralData.engagement_score,
      file_path: filePath
    })

  } catch (error) {
    console.error('Error processing viral content webhook:', error)
    return NextResponse.json({ 
      error: 'Failed to process viral content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Handle GET requests for API documentation
export async function GET() {
  return NextResponse.json({ 
    message: 'Viral Content Detection Webhook Endpoint',
    supported_methods: ['POST'],
    engagement_threshold: 70,
    expected_format: {
      title: 'string (required)',
      description: 'string (required)',
      source_url: 'string (required)',
      engagement_score: 'number 1-100 (required)',
      platform: 'twitter | instagram | tiktok | youtube | reddit | facebook (required)',
      content_type: 'video | image | text | meme (required)',
      trending_keywords: 'string[] (required)',
      related_teams: 'string[] (optional)',
      related_players: 'string[] (optional)',
      viral_metrics: {
        views: 'number (optional)',
        shares: 'number (optional)', 
        likes: 'number (optional)',
        comments: 'number (optional)'
      },
      detected_at: 'ISO date string (required)'
    },
    example: {
      title: "Messi Incredible Free Kick Goal",
      description: "Lionel Messi scores an unbelievable free kick that has football fans going crazy!",
      source_url: "https://twitter.com/example/status/123",
      engagement_score: 95,
      platform: "twitter",
      content_type: "video",
      trending_keywords: ["Messi", "FreekickGoal", "GOAT", "PSG"],
      related_teams: ["PSG", "Argentina"],
      related_players: ["Lionel Messi"],
      viral_metrics: {
        views: 2500000,
        likes: 180000,
        shares: 45000,
        comments: 12000
      },
      detected_at: new Date().toISOString()
    }
  })
}
