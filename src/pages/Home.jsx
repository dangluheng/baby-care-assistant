import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import BabyInfoCard from '../components/BabyInfoCard'

export default function Home({ baby }) {
  const navigate = useNavigate()
  const [feeding] = useLocalStorage('feeding', [])
  const [sleep] = useLocalStorage('sleep', [])
  const [diaper] = useLocalStorage('diaper', [])

  const today = new Date().toISOString().split('T')[0]

  const todayFeeding = feeding.filter(r => r.startTime.startsWith(today))
  const todaySleep = sleep.filter(r => r.startTime.startsWith(today))
  const todayDiaper = diaper.filter(r => r.time.startsWith(today))

  const stats = [
    { label: '喂养', value: todayFeeding.length, color: 'from-pink-400 to-pink-500', icon: '🍼' },
    { label: '睡眠', value: todaySleep.length, color: 'from-purple-400 to-purple-500', icon: '😴' },
    { label: '尿布', value: todayDiaper.length, color: 'from-amber-400 to-amber-500', icon: '👶' },
  ]

  const quickActions = [
    { path: '/feeding', label: '记录喂养', icon: '🍼', color: 'from-pink-500 to-rose-500' },
    { path: '/sleep', label: '记录睡眠', icon: '😴', color: 'from-purple-500 to-indigo-500' },
    { path: '/diaper', label: '记录尿布', icon: '👶', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="space-y-6 pb-24">
      <BabyInfoCard baby={baby} />

      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">今日概览</h2>
          <span className="text-sm text-gray-400">{today}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className={`text-2xl mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-bold`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <div
            key={action.path}
            onClick={() => navigate(action.path)}
            className="quick-action"
          >
            <div className={`text-3xl mb-2 bg-gradient-to-r ${action.color} bg-clip-text text-transparent`}>
              {action.icon}
            </div>
            <div className="text-sm font-medium text-gray-700">{action.label}</div>
          </div>
        ))}
      </div>

      {todayFeeding.length === 0 && todaySleep.length === 0 && todayDiaper.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>还没有记录，快来记录宝宝的一天吧！</p>
        </div>
      )}
    </div>
  )
}
