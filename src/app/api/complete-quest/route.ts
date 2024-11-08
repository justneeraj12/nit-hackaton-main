import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { questId } = body

  try {
    const quest = await prisma.quest.findUnique({
      where: { id: questId },
    })

    if (!quest) {
      return NextResponse.json({ error: 'Quest not found' }, { status: 404 })
    }

    await prisma.completedQuest.create({
      data: {
        userId: session.user.id,
        questId: quest.id,
      },
    })

    await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        xp: { increment: quest.xpReward },
      },
    })

    return NextResponse.json({ success: true, xpGained: quest.xpReward })
  } catch (error) {
    console.error('Error completing quest:', error)
    return NextResponse.json({ error: 'An error occurred while completing the quest' }, { status: 500 })
  }
}