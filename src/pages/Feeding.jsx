import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage, useBaby, hasBabyInfo } from '../hooks/useLocalStorage'
import { FeedingRecord } from '../data/types'

const typeConfig = {
  breast: { label: '母乳', icon: '🍼', color: 'from-pink-400 to-pink-500', badge: 'badge-breast' },
  formula: { label: '配方奶', icon: '🍼', color: 'from-pink-500 to-rose-500', badge: 'badge-formula' },
  solid: { label: '辅食', icon: '🍚', color: 'from-pink-600 to-pink-700', badge: 'badge-solid' },
}

const moduleColor = {
  header: 'from-pink-400 to-pink-500',
  card: 'border-l-pink-400',
  badge: 'bg-pink-100 text-pink-700',
}

export default function Feeding() {
  const navigate = useNavigate()
  const [baby] = useBaby()
  const [feeding, setFeeding] = useLocalStorage('feeding', [])
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...FeedingRecord, startTime: new Date().toISOString().slice(0, 16) })

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
    if (!form.startTime) {
      form.startTime = new Date().toISOString().slice(0, 16)
    }
    setFeeding([{ ...form, id: Date.now().toString() }, ...feeding])
    setForm({ ...FeedingRecord, startTime: new Date().toISOString().slice(0, 16) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setFeeding(feeding.filter(r => r.id !== id))
  }

  const getTypeConfig = (type) => typeConfig[type] || typeConfig.breast

  return (
    <div className="space-y-4 pb-24">
      {checkBabyAndProceed(() => (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {showForm ? '✕ 取消' : '+ 添加喂养记录'}
          </button>

          {showForm && (
            <div className="form-container fade-in">
              <h3 className="font-semibold mb-4">📝 新建记录</h3>
              
              <div>
                <label className="label">喂养类型</label>
                <div className="flex gap-2">
                  {Object.entries(typeConfig).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => setForm({ ...form, type })}
                      className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
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
                <label className="label">时间</label>
                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  className="input-field"
                />
              </div>

              {form.type === 'breast' && (
                <div>
                  <label className="label">喂养时长（分钟）</label>
                  <input
                    type="number"
                    value={form.duration || ''}
                    onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="请输入分钟数"
                  />
                </div>
              )}

              {form.type === 'formula' && (
                <div>
                  <label className="label">奶量（ml）</label>
                  <input
                    type="number"
                    value={form.amount || ''}
                    onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) || 0 })}
                    className="input-field"
                    placeholder="请输入毫升数"
                  />
                </div>
              )}

              {form.type === 'solid' && (
                <>
                  <div>
                    <label className="label">食物名称</label>
                    <input
                      type="text"
                      value={form.foodName || ''}
                      onChange={(e) => setForm({ ...form, foodName: e.target.value })}
                      className="input-field"
                      placeholder="如：米粉、苹果泥"
                    />
                  </div>
                  <div>
                    <label className="label">份量</label>
                    <input
                      type="text"
                      value={form.portion || ''}
                      onChange={(e) => setForm({ ...form, portion: e.target.value })}
                      className="input-field"
                      placeholder="如：半碗、一勺"
                    />
                  </div>
                </>
              )}

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
            {feeding.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🍼</div>
                <p>还没有喂养记录</p>
                <p className="text-sm">点击上方按钮添加第一条记录</p>
              </div>
            )}
            {feeding.map((record) => {
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
                        <div className="text-sm text-gray-500">{record.startTime.replace('T', ' ')}</div>
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
                      {record.type === 'breast' && `${record.duration} 分钟`}
                      {record.type === 'formula' && `${record.amount} ml`}
                      {record.type === 'solid' && `${record.foodName} ${record.portion}`}
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