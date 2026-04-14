import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage, useBaby, hasBabyInfo } from '../hooks/useLocalStorage'
import { SupplementRecord } from '../data/types'

const typeConfig = {
  ad: { label: 'AD', icon: '💊', color: 'from-teal-400 to-teal-500', badge: 'bg-teal-100 text-teal-700' },
  probiotic: { label: '益生菌', icon: '🧬', color: 'from-cyan-400 to-cyan-500', badge: 'bg-cyan-100 text-cyan-700' },
  d3: { label: 'D3', icon: '☀️', color: 'from-sky-400 to-sky-500', badge: 'bg-sky-100 text-sky-700' },
  iron: { label: '铁剂', icon: '🔴', color: 'from-rose-400 to-rose-500', badge: 'bg-rose-100 text-rose-700' },
  calcium: { label: '钙', icon: '🦴', color: 'from-indigo-400 to-indigo-500', badge: 'bg-indigo-100 text-indigo-700' },
}

const moduleColor = {
  header: 'from-teal-400 to-cyan-500',
  card: 'border-l-teal-400',
}

export default function Supplement() {
  const navigate = useNavigate()
  const [baby] = useBaby()
  const [supplement, setSupplement] = useLocalStorage('supplement', [])
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...SupplementRecord, date: new Date().toISOString().slice(0, 10) })

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
    setSupplement([{ ...form, id: Date.now().toString() }, ...supplement])
    setForm({ ...SupplementRecord, date: new Date().toISOString().slice(0, 10) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setSupplement(supplement.filter(r => r.id !== id))
  }

  const getTypeConfig = (type) => typeConfig[type] || typeConfig.ad

  return (
    <div className="space-y-4 pb-24">
      {checkBabyAndProceed(() => (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary w-full"
          >
            {showForm ? '✕ 取消' : '+ 添加营养补充'}
          </button>

          {showForm && (
            <div className="form-container fade-in">
              <h3 className="font-semibold mb-4">📝 新建记录</h3>

              <div>
                <label className="label">补充类型</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(typeConfig).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => setForm({ ...form, type })}
                      className={`py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        form.type === type
                          ? `bg-gradient-to-r ${config.color} text-white`
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span className="text-xl">{config.icon}</span>
                      <span className="text-sm">{config.label}</span>
                    </button>
                  ))}
                </div>
              </div>

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
                <label className="label">剂量</label>
                <input
                  type="text"
                  value={form.dosage || ''}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  className="input-field"
                  placeholder="如：1滴、1袋、1片"
                />
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
            {supplement.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">💊</div>
                <p>还没有营养补充记录</p>
                <p className="text-sm">点击上方按钮添加第一条记录</p>
              </div>
            )}
            {supplement.map((record) => {
              const config = getTypeConfig(record.type)
              const isExpanded = expandedId === record.id
              return (
                <div 
                  key={record.id} 
                  className={`record-card ${moduleColor.card}`}
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center text-white`}>
                        {config.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{config.label}</div>
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
                    <span className={`badge ${config.badge}`}>
                      {record.dosage && `剂量: ${record.dosage}`}
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