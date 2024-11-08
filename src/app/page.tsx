import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Welcome to KidScreen</h1>
      <div className="space-x-4">
        <Link href="/parent-login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Parent Login
        </Link>
        <Link href="/kid-login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Kid Login
        </Link>
      </div>
    </div>
  )
}