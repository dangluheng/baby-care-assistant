import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/feeding', label: '喂养', icon: '🍼' },
  { path: '/sleep', label: '睡眠', icon: '😴' },
  { path: '/diaper', label: '尿布', icon: '👶' },
  { path: '/growth', label: '发育', icon: '📈' },
  { path: '/health', label: '健康', icon: '💊' },
  { path: '/supplement', label: '营养', icon: '🌟' },
  { path: '/settings', label: '设置', icon: '⚙️' },
]

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-pink-100 shadow-lg">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="text-2xl transition-transform">{tab.icon}</span>
              <span className="mt-1">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
