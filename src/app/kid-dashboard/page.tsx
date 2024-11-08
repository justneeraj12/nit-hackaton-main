'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Quest {
  id: string;
  description: string;
  completed: boolean;
}

interface UserData {
  screenTime: number;
  dailyGoal: number;
  xp: number;
  level: number;
}

export default function KidDashboard() {
  const [userData, setUserData] = useState<UserData>({
    screenTime: 0,
    dailyGoal: 120,
    xp: 0,
    level: 1,
  })
  const [quests, setQuests] = useState<Quest[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await fetch('/api/user-data')
        const userData: UserData = await userDataResponse.json()
        setUserData(userData)

        const questsResponse = await fetch('/api/quests')
        const questsData = await questsResponse.json()
        console.log('questsData:', questsData)  // Log the fetched quests data
        // Ensure that questsData is an array before setting state
        if (Array.isArray(questsData)) {
          setQuests(questsData)
        } else {
          console.error('Invalid quests data:', questsData)
          setQuests([]) // Fallback to empty array if data is invalid
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleQuestCompletion = async (questId: string) => {
    try {
      const response = await fetch('/api/complete-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId }),
      })
      if (response.ok) {
        setQuests((prevQuests) =>
          prevQuests.map((quest) =>
            quest.id === questId ? { ...quest, completed: true } : quest
          )
        )
        const { xpGained } = await response.json()
        setUserData((prevData) => ({
          ...prevData,
          xp: prevData.xp + xpGained,
        }))
      }
    } catch (error) {
      console.error('Error completing quest:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold text-green-800 mb-8">Kid Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Data</h2>
          <p>Screen Time: {userData.screenTime} minutes</p>
          <p>Daily Goal: {userData.dailyGoal} minutes</p>
          <p>XP: {userData.xp}</p>
          <p>Level: {userData.level}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quests</h2>
          <ul>
            {quests.map((quest) => (
              <li key={quest.id} className="mb-2">
                <span>{quest.description}</span>
                <button
                  onClick={() => handleQuestCompletion(quest.id)}
                  disabled={quest.completed}
                  className={`ml-4 px-2 py-1 rounded ${
                    quest.completed ? 'bg-gray-400' : 'bg-green-500'
                  } text-white`}
                >
                  {quest.completed ? 'Completed' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}