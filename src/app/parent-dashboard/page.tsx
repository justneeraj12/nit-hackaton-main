'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ParentDashboard() {
  const [screenTimeData, setScreenTimeData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Daily Screen Time',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  })

  const [categoryData, setCategoryData] = useState({
    labels: ['Education', 'Entertainment', 'Social', 'Other'],
    datasets: [
      {
        label: 'Screen Time by Category',
        data: [0, 0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  })

  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Fetch screen time data
      const screenTimeResponse = await fetch('/api/screen-time')
      const screenTimeData = await screenTimeResponse.json()
      setScreenTimeData(screenTimeData)

      // Fetch category data
      const categoryResponse = await fetch('/api/category-time')
      const categoryData = await categoryResponse.json()
      setCategoryData(categoryData)

      // Fetch AI suggestions
      const suggestionsResponse = await fetch('/api/ai-suggestions')
      const suggestionsData = await suggestionsResponse.json()
      setSuggestions(suggestionsData)
    }

    fetchData()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Parent Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Daily Screen Time</h2>
          <Line data={screenTimeData} />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Screen Time by Category</h2>
          <Bar data={categoryData} />
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">AI Suggestions</h2>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center"
            >
              <span className="text-purple-600 mr-2">•</span>
              {suggestion}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}