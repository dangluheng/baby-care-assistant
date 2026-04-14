import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Settings() {
  const navigate = useNavigate()
  const { baby, setBaby, feeding } = useApp()
  const [editing, setEditing] = useState(!baby.name)
  const [form, setForm] = useState(baby)

  const handleSave = () => {
    setBaby({ ...form, id: form.id || Date.now().toString() })
    setEditing(false)
  }

  if (!editing && baby.name) {
    return (
      <div className="space-y-6 pb-24">
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 text-white text-center">
            <div className="text-5xl mb-3">{baby.gender === 'male' ? '👦' : '👧'}</div>
            <h2 className="text-2xl font-bold">{baby.name}</h2>
            <p className="text-white/80">{baby.gender === 'male' ? '小王子' : '小公主'}</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">性别</span>
              <span className="font-medium">{baby.gender === 'male' ? '男 👦' : '女 👧'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">出生日期</span>
              <span className="font-medium">{baby.birthDate}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setEditing(true)}
          className="btn-primary w-full"
        >
          ✏️ 编辑信息
        </button>

        <div className="card p-4">
          <h3 className="font-semibold mb-4">📤 数据导出</h3>
          <div className="space-y-3">
            <button
              onClick={async () => {
                const { exportFeedingPdf } = await import('../utils/exportPdf')
                exportFeedingPdf(feeding, baby)
              }}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              📄 导出 PDF 报告
            </button>
            <button
              onClick={async () => {
                const { exportFeedingExcel } = await import('../utils/exportExcel')
                exportFeedingExcel(feeding, baby)
              }}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              📊 导出 Excel 数据
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>育儿记录助手 v1.0</p>
          <p>数据存储在本地浏览器</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">
          {baby.name ? '✏️ 编辑' : '👶 添加'}宝宝信息
        </h2>
        <div className="space-y-4">
          <div>
            <label className="label">姓名</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="请输入宝宝姓名"
            />
          </div>
          <div>
            <label className="label">性别</label>
            <div className="flex gap-3">
              <button
                onClick={() => setForm({ ...form, gender: 'male' })}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  form.gender === 'male' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                👦 男
              </button>
              <button
                onClick={() => setForm({ ...form, gender: 'female' })}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  form.gender === 'female' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                👧 女
              </button>
            </div>
          </div>
          <div>
            <label className="label">出生日期</label>
            <input
              type="date"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              className="input-field"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            💾 保存
          </button>
          {baby.name && (
            <button
              onClick={() => {
                setForm(baby)
                setEditing(false)
              }}
              className="btn-secondary flex-1"
            >
              取消
            </button>
          )}
        </div>
      </div>
    </div>
  )
}