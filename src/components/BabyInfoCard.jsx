import React from 'react'
import { Link } from 'react-router-dom'

export default function BabyInfoCard({ baby }) {
  const age = calculateAge(baby.birthDate)

  if (!baby.name) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-3">👶</div>
        <p className="text-gray-500 mb-3">请先添加宝宝信息</p>
        <Link to="/settings" className="btn-primary inline-block">
          去添加
        </Link>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            {baby.gender === 'male' ? '👦' : '👧'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{baby.name}</h2>
            <p className="text-white/90">{age}</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-gray-500">出生日期</span>
        <span className="font-medium">{baby.birthDate}</span>
      </div>
    </div>
  )
}

function calculateAge(birthDate) {
  if (!birthDate) return ''
  const birth = new Date(birthDate)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()
  if (months < 1) {
    const days = Math.floor((now - birth) / (1000 * 60 * 60 * 24))
    return `${days} 天`
  }
  if (months < 24) {
    return `${months} 个月`
  }
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  return remainingMonths > 0 ? `${years}岁${remainingMonths}个月` : `${years} 岁`
}
