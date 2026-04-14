import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SupplementRecord } from '../data/types'

export default function Supplement() {
  const [supplement, setSupplement] = useLocalStorage('supplement', [])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...SupplementRecord, date: new Date().toISOString().slice(0, 10) })

  const handleAdd = () => {
    setSupplement([{ ...form, id: Date.now().toString() }, ...supplement])
    setForm({ ...SupplementRecord, date: new Date().toISOString().slice(0, 10) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setSupplement(supplement.filter(r => r.id !== id))
  }

  const getTypeLabel = (type) => {
    const labels = { ad: 'AD', probiotic: '益生菌' }
    return labels[type] || type
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
            <label className="block text-sm text-gray-600 mb-1">类型</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="ad">AD</option>
              <option value="probiotic">益生菌</option>
            </select>
          </div>

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
            <label className="block text-sm text-gray-600 mb-1">剂量</label>
            <input
              type="text"
              value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="如：1滴、1袋"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">备注</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              rows={2}
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
        {supplement.length === 0 && (
          <div className="text-center text-gray-400 py-8">暂无记录</div>
        )}
        {supplement.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{getTypeLabel(record.type)}</div>
              <div className="text-sm text-gray-500">{record.date}</div>
              <div className="text-sm">{record.dosage && `剂量: ${record.dosage}`}</div>
              {record.note && <div className="text-sm text-gray-400">{record.note}</div>}
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
