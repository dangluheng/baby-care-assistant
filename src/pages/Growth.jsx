import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { GrowthRecord } from '../data/types'

export default function Growth() {
  const [growth, setGrowth] = useLocalStorage('growth', [])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...GrowthRecord, date: new Date().toISOString().split('T')[0] })

  const handleAdd = () => {
    setGrowth([{ ...form, id: Date.now().toString() }, ...growth])
    setForm({ ...GrowthRecord, date: new Date().toISOString().split('T')[0] })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setGrowth(growth.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-4 pb-20">
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold"
      >
        {showForm ? '取消' : '+ 添加记录'}
      </button>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">日期</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">身高 (cm)</label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: parseFloat(e.target.value) || 0 })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">体重 (kg)</label>
            <input
              type="number"
              step="0.1"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: parseFloat(e.target.value) || 0 })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">里程碑</label>
            <input
              type="text"
              value={form.milestone}
              onChange={(e) => setForm({ ...form, milestone: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="如：抬头、翻身、独坐"
            />
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            保存
          </button>
        </div>
      )}

      <div className="space-y-2">
        {growth.length === 0 && (
          <div className="text-center text-gray-400 py-8">暂无记录</div>
        )}
        {growth.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{record.date}</div>
              <div className="text-sm">
                {record.height > 0 && `身高: ${record.height}cm `}
                {record.weight > 0 && `体重: ${record.weight}kg`}
              </div>
              {record.milestone && <div className="text-sm text-blue-500">里程碑: {record.milestone}</div>}
            </div>
            <button
              onClick={() => handleDelete(record.id)}
              className="text-red-500 text-sm"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
