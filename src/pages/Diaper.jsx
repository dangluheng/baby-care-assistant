import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useApp, hasBabyInfo } from '../context/AppContext'
import { DiaperRecord } from '../data/types'

const moduleColor = {
  header: 'from-amber-400 to-orange-500',
  card: 'border-l-amber-400',
  badge: 'bg-amber-100 text-amber-700',
}

export default function Diaper() {
  const navigate = useNavigate()
  const navigate = useNavigate()
  const { baby, diaper, setDiaper } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...DiaperRecord, time: new Date().toISOString().slice(0, 16) })

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
    setDiaper([{ ...form, id: Date.now().toString() }, ...diaper])
    setForm({ ...DiaperRecord, time: new Date().toISOString().slice(0, 16) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setDiaper(diaper.filter(r => r.id !== id))
  }

  const getTypeLabel = (type) => (type === 'diaper' ? '纸尿裤' : '布尿布')

  return (
    <div className="space-y-4 pb-24">
      {checkBabyAndProceed(() => (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary w-full"
          >
            {showForm ? '✕ 取消' : '+ 添加尿布记录'}
          </button>

          {showForm && (
            <div className="form-container fade-in">
              <h3 className="font-semibold mb-4">📝 新建记录</h3>

              <div>
                <label className="label">时间</label>
                <input
                  type="datetime-local"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">类型</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="input-field"
                >
                  <option value="diaper">纸尿裤</option>
                  <option value="cloth">布尿布</option>
                </select>
              </div>

              <div>
                <label className="label">颜色</label>
                <input
                  type="text"
                  value={form.color || ''}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="input-field"
                  placeholder="如：黄色、绿色"
                />
              </div>

              <div>
                <label className="label">性状</label>
                <input
                  type="text"
                  value={form.consistency || ''}
                  onChange={(e) => setForm({ ...form, consistency: e.target.value })}
                  className="input-field"
                  placeholder="如：正常、稀便、便秘"
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
            {diaper.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">👶</div>
                <p>还没有尿布记录</p>
                <p className="text-sm">点击上方按钮添加第一条记录</p>
              </div>
            )}
            {diaper.map((record) => {
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
                        👶
                      </div>
                      <div>
                        <div className="font-semibold">{getTypeLabel(record.type)}</div>
                        <div className="text-sm text-gray-500">{record.time.replace('T', ' ')}</div>
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
                      {record.color && `颜色: ${record.color}`}
                      {record.consistency && ` 性状: ${record.consistency}`}
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