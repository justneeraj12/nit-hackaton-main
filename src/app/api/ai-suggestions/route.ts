import { NextResponse } from 'next/server'

// In a real app, this would be a more sophisticated AI model
function getAISuggestions() {
  const suggestions = [
    "Encourage outdoor activities for 30 minutes daily",
    "Set up a family reading time for 20 minutes before bed",
    "Introduce educational apps to balance entertainment and learning",
    "Plan a tech-free family game night once a week",
    "Teach your child to use screen time tracking tools",
  ]
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
}

export async function GET() {
  const suggestions = getAISuggestions()
  return NextResponse.json(suggestions)
}