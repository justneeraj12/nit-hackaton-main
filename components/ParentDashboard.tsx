import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ParentDashboard() {
  const [screenTimeData, setScreenTimeData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Screen Time (minutes)',
        data: [120, 90, 150, 80, 110, 180, 200],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  useEffect(() => {
    // Here you would typically fetch the screen time data from your API
    // For now, we're using static data
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Parent Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weekly Screen Time Overview</h2>
          <Bar data={screenTimeData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Encourage outdoor activities for 30 minutes daily</li>
            <li>Set up a family reading time for 20 minutes before bed</li>
            <li>Introduce educational apps to balance entertainment and learning</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Set Screen Time Limits</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Weekday Limit (minutes)</label>
            <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="120" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weekend Limit (minutes)</label>
            <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="180" />
          </div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Save Limits
          </button>
        </form>
      </div>
    </div>
  );
}

export default ParentDashboard;