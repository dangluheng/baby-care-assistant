import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useApp, hasBabyInfo } from '../context/AppContext'
import { HealthRecord } from '../data/types'

const typeConfig = {
  vaccine: { label: '疫苗接种', icon: '💉', color: 'from-red-400 to-red-500', badge: 'bg-red-100 text-red-700' },
  illness: { label: '生病', icon: '🤒', color: 'from-orange-400 to-orange-500', badge: 'bg-orange-100 text-orange-700' },
  medicine: { label: '用药', icon: '💊', color: 'from-yellow-400 to-yellow-500', badge: 'bg-yellow-100 text-yellow-700' },
}

const moduleColor = {
  header: 'from-red-400 to-orange-500',
  card: 'border-l-red-400',
}

export default function Health() {
  const navigate = useNavigate()
  const navigate = useNavigate()
  const { baby, health, setHealth } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({ ...HealthRecord, date: new Date().toISOString().slice(0, 10) })

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
    setHealth([{ ...form, id: Date.now().toString() }, ...health])
    setForm({ ...HealthRecord, date: new Date().toISOString().slice(0, 10) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setHealth(health.filter(r => r.id !== id))
  }

  const getTypeConfig = (type) => typeConfig[type] || typeConfig.vaccine

  return (
    <div className="space-y-4 pb-24">
      {checkBabyAndProceed(() => (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary w-full"
          >
            {showForm ? '✕ 取消' : '+ 添加健康记录'}
          </button>

          {showForm && (
            <div className="form-container fade-in">
              <h3 className="font-semibold mb-4">📝 新建记录</h3>

              <div>
                <label className="label">类型</label>
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
                <label className="label">日期</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input-field"
                />
              </div>

              {form.type === 'vaccine' && (
                <div>
                  <label className="label">疫苗名称</label>
                  <input
                    type="text"
                    value={form.vaccineName || ''}
                    onChange={(e) => setForm({ ...form, vaccineName: e.target.value })}
                    className="input-field"
                    placeholder="请输入疫苗名称"
                  />
                </div>
              )}

              {form.type === 'illness' && (
                <div>
                  <label className="label">症状</label>
                  <input
                    type="text"
                    value={form.illnessName || ''}
                    onChange={(e) => setForm({ ...form, illnessName: e.target.value })}
                    className="input-field"
                    placeholder="请输入症状"
                  />
                </div>
              )}

              {form.type === 'medicine' && (
                <>
                  <div>
                    <label className="label">药品名称</label>
                    <input
                      type="text"
                      value={form.medicineName || ''}
                      onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
                      className="input-field"
                      placeholder="请输入药品名称"
                    />
                  </div>
                  <div>
                    <label className="label">剂量</label>
                    <input
                      type="text"
                      value={form.dosage || ''}
                      onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                      className="input-field"
                      placeholder="如：1片、5ml"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="label">就诊机构</label>
                <input
                  type="text"
                  value={form.hospital || ''}
                  onChange={(e) => setForm({ ...form, hospital: e.target.value })}
                  className="input-field"
                  placeholder="请输入机构名称"
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
            {health.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">💊</div>
                <p>还没有健康记录</p>
                <p className="text-sm">点击上方按钮添加第一条记录</p>
              </div>
            )}
            {health.map((record) => {
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
                      {record.type === 'vaccine' && record.vaccineName}
                      {record.type === 'illness' && record.illnessName}
                      {record.type === 'medicine' && `${record.medicineName} ${record.dosage}`}
                    </span>
                  </div>
                  {isExpanded && (record.hospital || record.note) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 space-y-1">
                      {record.hospital && <div>🏥 就诊机构：{record.hospital}</div>}
                      {record.note && <div>📝 备注：{record.note}</div>}
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