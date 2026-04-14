import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, hasBabyInfo } from '../context/AppContext'
import { SleepRecord } from '../data/types'

const moduleColor = {
  header: 'from-purple-400 to-purple-500',
  card: 'border-l-purple-400',
  badge: 'bg-purple-100 text-purple-700',
  quickBtn: 'bg-gradient-to-r from-purple-500 to-indigo-500',
}

export default function Sleep() {
  const navigate = useNavigate()
  const { baby, sleep, setSleep } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...SleepRecord, startTime: new Date().toISOString().slice(0, 16) })

  const checkBabyAndProceed = (action) => {
    if (!hasBabyInfo(baby)) {
      return (
        <div className="card p-6 text-center">
          <div className="text-4xl mb-4">👶</div>
          <h3 className="font-semibold mb-2">请先添加宝宝信息</h3>
          <p className="text-sm text-gray-500 mb-4">记录数据前需要先设置宝宝的基本信息</p>
          <button onClick={() => navigate('/settings')} className="btn-primary">
            去添加宝宝信息
          </button>
        </div>
      )
    }
    return action()
  }

  const handleAdd = () => {
    const endTime = new Date(form.endTime)
    const startTime = new Date(form.startTime)
    const duration = Math.round((endTime - startTime) / (1000 * 60))
    setSleep([{ ...form, id: Date.now().toString(), duration }, ...sleep])
    setForm({ ...SleepRecord, startTime: new Date().toISOString().slice(0, 16) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setSleep(sleep.filter(r => r.id !== id))
  }

  const getQualityLabel = (quality) => {
    const labels = { good: '好', normal: '一般', poor: '差' }
    return labels[quality] || quality
  }

  const getQualityColor = (quality) => {
    const colors = { good: 'text-green-600', normal: 'text-yellow-600', poor: 'text-red-600' }
    return colors[quality] || 'text-gray-600'
  }

  return (
    <div className="space-y-4 pb-24">
      {checkBabyAndProceed(() => (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary w-full"
          >
            {showForm ? '✕ 取消' : '+ 添加睡眠记录'}
          </button>

          {showForm && (
            <div className="form-container fade-in">
              <h3 className="font-semibold mb-4">📝 新建记录</h3>

              <div>
                <label className="label">开始时间</label>
                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">结束时间</label>
                <input
                  type="datetime-local"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">睡眠质量</label>
                <select
                  value={form.quality}
                  onChange={(e) => setForm({ ...form, quality: e.target.value })}
                  className="input-field"
                >
                  <option value="good">好 😴</option>
                  <option value="normal">一般 😐</option>
                  <option value="poor">差 😫</option>
                </select>
              </div>

              <div>
                <label className="label">备注</label>
                <textarea
                  value={form.note || ''}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="input-field"
                  rows={2}
                  placeholder="可选填写备注"
                />
              </div>

              <button onClick={handleAdd} className="btn-primary w-full">
                💾 保存记录
              </button>
            </div>
          )}

          <div className="space-y-3">
            {sleep.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">😴</div>
                <p>还没有睡眠记录</p>
                <p className="text-sm">点击上方按钮添加第一条记录</p>
              </div>
            )}
            {sleep.map((record) => {
              const isExpanded = expandedId === record.id
              return (
                <div 
                  key={record.id} 
                  className={`record-card ${moduleColor.card}`}
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${moduleColor.header} flex items-center justify-center text-white`}>
                        😴
                      </div>
                      <div>
                        <div className="font-semibold">睡眠</div>
                        <div className="text-sm text-gray-500">
                          {record.startTime.replace('T', ' ')} - {record.endTime ? record.endTime.replace('T', ' ') : '进行中'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(record.id); }}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className={`badge ${moduleColor.badge}`}>
                      ⏱️ {record.duration} 分钟
                    </span>
                    <span className={`badge ml-2 ${getQualityColor(record.quality)} bg-opacity-20`}>
                      {getQualityLabel(record.quality)}
                    </span>
                  </div>
                  {isExpanded && record.note && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                      📝 备注：{record.note}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      ))}
    </div>
  )
}