"use client"; // Ensure the component is treated as a client-side component

import React, { useState, useEffect } from 'react';

function KidDashboard() {
  const [screenTime, setScreenTime] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(120); // 2 hours daily goal
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [quests, setQuests] = useState([
    { id: 1, task: 'Read a book for 30 minutes', completed: false },
    { id: 2, task: 'Do 20 minutes of physical exercise', completed: false },
    { id: 3, task: 'Help with a household chore', completed: false },
  ]);

  // Update screen time and XP every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenTime((prevTime) => {
        if (prevTime < dailyGoal) {
          const newTime = prevTime + 1;
          setXp((prevXp) => {
            const newXp = prevXp + 1;
            if (newXp >= level * 100) {
              setLevel((prevLevel) => prevLevel + 1); // Level up
            }
            return newXp;
          });
          return newTime;
        }
        return prevTime; // Stop when the daily goal is reached
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [dailyGoal, level]); // Only update when dailyGoal or level changes

  const handleQuestCompletion = (id: number) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, completed: !quest.completed } : quest
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Kid Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Screen Time */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Screen Time Adventure</h2>
          <div className="text-4xl font-bold text-green-500 mb-4">{screenTime} minutes</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(screenTime / dailyGoal) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Daily Goal: {dailyGoal} minutes</p>
        </div>

        {/* Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="text-2xl font-bold text-purple-600 mb-2">Level {level}</div>
          <div className="text-lg text-purple-500 mb-4">{xp} XP</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${(xp / (level * 100)) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Next level: {level * 100 - xp} XP to go!</p>
        </div>
      </div>

      {/* Quests */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Today's Quests</h2>
        <ul className="space-y-2">
          {quests.map((quest) => (
            <li
              key={quest.id}
              className={`flex items-center ${quest.completed ? 'bg-green-100' : ''} p-2 rounded-lg`}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={quest.completed}
                onChange={() => handleQuestCompletion(quest.id)}
              />
              <span className={quest.completed ? 'line-through text-gray-500' : ''}>
                {quest.task}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default KidDashboard;
