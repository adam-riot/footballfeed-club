import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface MatchData {
  home_team: string
  away_team: string
  league: string
  date: string
  time: string
  venue?: string
  status: 'scheduled' | 'live' | 'finished'
  score?: {
    home: number
    away: number
  }
  events?: {
    minute: number
    type: 'goal' | 'card' | 'substitution'
    player: string
    team: string
  }[]
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.WEBHOOK_SECRET || 'your-webhook-secret'
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const matchData: MatchData = await request.json()

    // Generate match article content
    const slug = `${matchData.home_team.toLowerCase().replace(/\s+/g, '-')}-vs-${matchData.away_team.toLowerCase().replace(/\s+/g, '-')}-${new Date(matchData.date).toISOString().split('T')[0]}`
    
    let content = ''
    let title = ''
    
    if (matchData.status === 'scheduled') {
      title = `Preview: ${matchData.home_team} vs ${matchData.away_team} - ${matchData.league}`
      content = `
# ${title}

**Match Date:** ${new Date(matchData.date).toLocaleDateString()}
**Kick-off Time:** ${matchData.time}
**League:** ${matchData.league}
${matchData.venue ? `**Venue:** ${matchData.venue}` : ''}

## Match Preview

${matchData.home_team} will face ${matchData.away_team} in what promises to be an exciting ${matchData.league} encounter.

### Key Points:
- **Home Team:** ${matchData.home_team}
- **Away Team:** ${matchData.away_team}
- **Competition:** ${matchData.league}

Stay tuned for live updates during the match!
`
    } else if (matchData.status === 'finished' && matchData.score) {
      title = `${matchData.home_team} ${matchData.score.home}-${matchData.score.away} ${matchData.away_team} - Match Report`
      content = `
# ${title}

**Final Score:** ${matchData.home_team} ${matchData.score.home}-${matchData.score.away} ${matchData.away_team}
**League:** ${matchData.league}
**Date:** ${new Date(matchData.date).toLocaleDateString()}

## Match Report

${matchData.home_team} ${matchData.score.home > matchData.score.away ? 'defeated' : matchData.score.home < matchData.score.away ? 'lost to' : 'drew with'} ${matchData.away_team} ${matchData.score.home}-${matchData.score.away} in a thrilling ${matchData.league} encounter.

### Match Statistics:
- **Final Score:** ${matchData.score.home}-${matchData.score.away}
- **Competition:** ${matchData.league}

${matchData.events && matchData.events.length > 0 ? `
### Key Events:
${matchData.events.map(event => `- ${event.minute}' ${event.type.toUpperCase()}: ${event.player} (${event.team})`).join('\n')}
` : ''}
`
    }

    // Create markdown file
    const contentDir = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(contentDir, `${slug}.md`)

    const frontMatter = `---
title: "${title}"
date: "${new Date().toISOString()}"
excerpt: "${matchData.status === 'scheduled' ? 'Match preview and key information' : 'Full match report with final score and highlights'}"
category: "match"
tags: ["${matchData.home_team}", "${matchData.away_team}", "${matchData.league}", "match-${matchData.status}"]
featured: ${matchData.status === 'finished' ? 'true' : 'false'}
author: "Football Feed Bot"
match_data:
  home_team: "${matchData.home_team}"
  away_team: "${matchData.away_team}"
  league: "${matchData.league}"
  status: "${matchData.status}"
  ${matchData.score ? `score: "${matchData.score.home}-${matchData.score.away}"` : ''}
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
      message: `Match ${matchData.status} article created: ${title}`,
      slug: slug,
      file_path: filePath
    })

  } catch (error) {
    console.error('Error processing match webhook:', error)
    return NextResponse.json({ 
      error: 'Failed to process match data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Match Data Webhook Endpoint',
    supported_methods: ['POST'],
    expected_format: {
      home_team: 'string',
      away_team: 'string', 
      league: 'string',
      date: 'ISO date string',
      time: 'string',
      status: 'scheduled | live | finished',
      score: { home: 'number', away: 'number' },
      events: [{ minute: 'number', type: 'goal | card | substitution', player: 'string', team: 'string' }]
    }
  })
}
