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
    const screenTimeLogs = await prisma.screenTimeLog.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    const data = {
      labels: screenTimeLogs.map(log => log.date.toLocaleDateString()),
      datasets: [
        {
          label: 'Daily Screen Time',
          data: screenTimeLogs.map(log => log.minutes),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching screen time data:', error)
    return NextResponse.json({ error: 'An error occurred while fetching screen time data' }, { status: 500 })
  }
}