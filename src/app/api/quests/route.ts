import { NextResponse } from 'next/server'
import prisma from 'lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const quests = await prisma.quest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })

    const completedQuests = await prisma.completedQuest.findMany({
      where: { userId: session.user.id },
      select: { questId: true },
    })

    const completedQuestIds = new Set(completedQuests.map(cq => cq.questId))

    const questsWithCompletionStatus = quests.map(quest => ({
      ...quest,
      completed: completedQuestIds.has(quest.id),
    }))

    return NextResponse.json(questsWithCompletionStatus)
  } catch (error) {
    console.error('Error fetching quests:', error)
    return NextResponse.json({ error: 'An error occurred while fetching quests' }, { status: 500 })
  }
}