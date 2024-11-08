import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // This is a placeholder. In a real application, you'd have a more complex
    // data model to track screen time by category.
    const categoryData = {
      labels: ['Education', 'Entertainment', 'Social', 'Other'],
      datasets: [
        {
          label: 'Screen Time by Category',
          data: [30, 45, 20, 15],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
        },
      ],
    }

    return NextResponse.json(categoryData)
  } catch (error) {
    console.error('Error fetching category data:', error)
    return NextResponse.json({ error: 'An error occurred while fetching category data' }, { status: 500 })
  }
}