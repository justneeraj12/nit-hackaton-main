import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { Profile: true },
    })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, isParent: user.isParent },
      SECRET_KEY,
      { expiresIn: '1d' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isParent: user.isParent,
        profile: user.Profile,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}