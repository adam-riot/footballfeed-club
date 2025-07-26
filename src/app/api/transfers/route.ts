import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface TransferData {
  player: string
  from_club: string
  to_club: string
  fee?: string
  status: 'rumor' | 'confirmed' | 'completed'
  league?: string
  position?: string
  age?: number
  contract_length?: string
  source_reliability?: 'low' | 'medium' | 'high'
  announcement_date?: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.WEBHOOK_SECRET || 'your-webhook-secret'
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const transferData: TransferData = await request.json()

    // Generate transfer article content
    const slug = `${transferData.player.toLowerCase().replace(/\s+/g, '-')}-${transferData.from_club.toLowerCase().replace(/\s+/g, '-')}-to-${transferData.to_club.toLowerCase().replace(/\s+/g, '-')}-${transferData.status}`
    
    let title = ''
    let content = ''
    let priority = 'medium'
    
    // Generate content based on transfer status
    switch (transferData.status) {
      case 'rumor':
        title = `RUMOR: ${transferData.player} Linked with Move from ${transferData.from_club} to ${transferData.to_club}`
        priority = 'low'
        content = `
# ${title}

**Status:** Transfer Rumor ⏳
**Player:** ${transferData.player}
**Current Club:** ${transferData.from_club}
**Target Club:** ${transferData.to_club}
${transferData.fee ? `**Reported Fee:** ${transferData.fee}` : ''}
${transferData.position ? `**Position:** ${transferData.position}` : ''}

## Transfer Rumor Details

Reports suggest that ${transferData.to_club} are interested in signing ${transferData.player} from ${transferData.from_club}. 

${transferData.fee ? `The potential transfer fee is reported to be around ${transferData.fee}.` : 'The financial details of the potential deal remain unclear.'}

${transferData.position ? `${transferData.player} plays as a ${transferData.position} and` : 'The player'} could be a valuable addition to ${transferData.to_club}'s squad.

### Key Information:
- **Reliability:** ${transferData.source_reliability ? transferData.source_reliability.toUpperCase() : 'MEDIUM'} 📊
- **Status:** Rumor stage
- **Timeline:** No official timeline confirmed

*This is a developing story. We'll keep you updated with the latest developments.*
`
        break;
        
      case 'confirmed':
        title = `CONFIRMED: ${transferData.player} Signs for ${transferData.to_club} from ${transferData.from_club}`
        priority = 'high'
        content = `
# ${title}

**Status:** Transfer Confirmed ✅
**Player:** ${transferData.player}
**From:** ${transferData.from_club}
**To:** ${transferData.to_club}
${transferData.fee ? `**Transfer Fee:** ${transferData.fee}` : ''}
${transferData.contract_length ? `**Contract Length:** ${transferData.contract_length}` : ''}

## Official Confirmation

${transferData.to_club} have officially confirmed the signing of ${transferData.player} from ${transferData.from_club}! 

${transferData.fee ? `The transfer fee is reported to be ${transferData.fee}.` : ''}

${transferData.contract_length ? `${transferData.player} has signed a ${transferData.contract_length} contract with ${transferData.to_club}.` : ''}

### Transfer Details:
- ✅ **Deal Confirmed**
- 📝 **Medical:** Completed
- 🤝 **Contract:** ${transferData.contract_length || 'Terms agreed'}
- 💰 **Fee:** ${transferData.fee || 'Undisclosed'}

Welcome to ${transferData.to_club}, ${transferData.player}! 🎉
`
        break;
        
      case 'completed':
        title = `DONE DEAL: ${transferData.player} Completes Move to ${transferData.to_club}`
        priority = 'urgent'
        content = `
# ${title}

**Status:** Transfer Completed ✅🔥
**Player:** ${transferData.player}
**From:** ${transferData.from_club}
**To:** ${transferData.to_club}
${transferData.fee ? `**Final Fee:** ${transferData.fee}` : ''}
${transferData.contract_length ? `**Contract:** ${transferData.contract_length}` : ''}

## Transfer Complete! 

🚨 **DONE DEAL!** 🚨

${transferData.player} has officially completed his move from ${transferData.from_club} to ${transferData.to_club}!

${transferData.fee ? `The final transfer fee is ${transferData.fee}.` : ''}

### What This Means:
- 🎯 ${transferData.to_club} have secured their target
- 📈 Squad strengthened in ${transferData.position || 'key position'}
- 🔴 ${transferData.from_club} will receive ${transferData.fee || 'compensation'}

${transferData.age ? `At ${transferData.age} years old, ` : ''}${transferData.player} brings experience and quality to ${transferData.to_club}.

**Official announcement:** ${transferData.announcement_date ? new Date(transferData.announcement_date).toLocaleDateString() : 'Today'}

Welcome to your new home, ${transferData.player}! 🏠⚽
`
        break;
    }

    // Create markdown file
    const contentDir = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(contentDir, `${slug}.md`)

    const frontMatter = `---
title: "${title}"
date: "${new Date().toISOString()}"
excerpt: "${transferData.status === 'rumor' ? 'Latest transfer rumors and speculation' : transferData.status === 'confirmed' ? 'Official transfer confirmation' : 'Transfer completed - all details confirmed'}"
category: "transfer"
tags: ["${transferData.player}", "${transferData.from_club}", "${transferData.to_club}", "transfer-${transferData.status}", "${transferData.position || 'football'}"]
featured: ${transferData.status === 'completed' ? 'true' : transferData.status === 'confirmed' ? 'true' : 'false'}
priority: "${priority}"
author: "Transfer News Bot"
transfer_data:
  player: "${transferData.player}"
  from_club: "${transferData.from_club}"
  to_club: "${transferData.to_club}"
  status: "${transferData.status}"
  ${transferData.fee ? `fee: "${transferData.fee}"` : ''}
  ${transferData.position ? `position: "${transferData.position}"` : ''}
  reliability: "${transferData.source_reliability || 'medium'}"
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
      message: `Transfer ${transferData.status} article created: ${title}`,
      slug: slug,
      priority: priority,
      file_path: filePath
    })

  } catch (error) {
    console.error('Error processing transfer webhook:', error)
    return NextResponse.json({ 
      error: 'Failed to process transfer data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Handle GET requests for API documentation
export async function GET() {
  return NextResponse.json({ 
    message: 'Transfer News Webhook Endpoint',
    supported_methods: ['POST'],
    expected_format: {
      player: 'string (required)',
      from_club: 'string (required)', 
      to_club: 'string (required)',
      status: 'rumor | confirmed | completed (required)',
      fee: 'string (optional)',
      position: 'string (optional)',
      age: 'number (optional)',
      contract_length: 'string (optional)',
      league: 'string (optional)',
      source_reliability: 'low | medium | high (optional)',
      announcement_date: 'ISO date string (optional)'
    },
    examples: {
      rumor: {
        player: 'Kylian Mbappe',
        from_club: 'PSG',
        to_club: 'Real Madrid',
        status: 'rumor',
        fee: '€180 million',
        position: 'Forward',
        source_reliability: 'high'
      },
      confirmed: {
        player: 'Erling Haaland',
        from_club: 'Borussia Dortmund',
        to_club: 'Manchester City',
        status: 'confirmed',
        fee: '€75 million',
        contract_length: '5 years'
      }
    }
  })
}
