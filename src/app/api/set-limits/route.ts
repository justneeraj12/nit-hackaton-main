import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { weekdayLimit, weekendLimit } = body

  // In a real app, you would save these limits to a database
  console.log(`Setting limits: Weekday - ${weekdayLimit}, Weekend - ${weekendLimit}`)

  return NextResponse.json({ success: true })
}