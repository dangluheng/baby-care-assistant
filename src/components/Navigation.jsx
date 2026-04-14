import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 shadow-lg z-50">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center py-2 px-2 text-xs no-underline ${
                isActive ? 'text-pink-500' : 'text-gray-400'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="mt-1">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
