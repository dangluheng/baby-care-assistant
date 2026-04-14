import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useApp, hasBabyInfo } from '../context/AppContext'
import { GrowthRecord } from '../data/types'

const moduleColor = {
  header: 'from-green-400 to-green-500',
  card: 'border-l-green-400',
  badge: 'bg-green-100 text-green-700',
}

export default function Growth() {
  const navigate = useNavigate()
  const navigate = useNavigate()
  const { baby, growth, setGrowth } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...GrowthRecord, date: new Date().toISOString().split('T')[0] })

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
    setGrowth([{ ...form, id: Date.now().toString() }, ...growth])
    setForm({ ...GrowthRecord, date: new Date().toISOString().split('T')[0] })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setGrowth(growth.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-4 pb-24">
      {checkBabyAndProceed(() => (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary w-full"
          >
            {showForm ? '✕ 取消' : '+ 添加发育记录'}
          </button>

          {showForm && (
            <div className="form-container fade-in">
              <h3 className="font-semibold mb-4">📝 新建记录</h3>

              <div>
                <label className="label">日期</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">身高 (cm)</label>
                <input
                  type="number"
                  value={form.height || ''}
                  onChange={(e) => setForm({ ...form, height: parseFloat(e.target.value) || 0 })}
                  className="input-field"
                  placeholder="请输入身高"
                />
              </div>

              <div>
                <label className="label">体重 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.weight || ''}
                  onChange={(e) => setForm({ ...form, weight: parseFloat(e.target.value) || 0 })}
                  className="input-field"
                  placeholder="请输入体重"
                />
              </div>

              <div>
                <label className="label">里程碑</label>
                <input
                  type="text"
                  value={form.milestone || ''}
                  onChange={(e) => setForm({ ...form, milestone: e.target.value })}
                  className="input-field"
                  placeholder="如：抬头、翻身、独坐"
                />
              </div>

              <button onClick={handleAdd} className="btn-primary w-full">
                💾 保存记录
              </button>
            </div>
          )}

          <div className="space-y-3">
            {growth.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">📏</div>
                <p>还没有发育记录</p>
                <p className="text-sm">点击上方按钮添加第一条记录</p>
              </div>
            )}
            {growth.map((record) => {
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
                        📏
                      </div>
                      <div>
                        <div className="font-semibold">发育记录</div>
                        <div className="text-sm text-gray-500">{record.date}</div>
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
                      {record.height > 0 && `身高: ${record.height}cm `}
                      {record.weight > 0 && `体重: ${record.weight}kg`}
                    </span>
                    {record.milestone && (
                      <span className="badge ml-2 bg-blue-100 text-blue-700">
                        🎯 {record.milestone}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ))}
    </div>
  )
}