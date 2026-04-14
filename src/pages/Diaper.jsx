import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DiaperRecord } from '../data/types'

export default function Diaper() {
  const [diaper, setDiaper] = useLocalStorage('diaper', [])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...DiaperRecord, time: new Date().toISOString().slice(0, 16) })

  const handleAdd = () => {
    setDiaper([{ ...form, id: Date.now().toString() }, ...diaper])
    setForm({ ...DiaperRecord, time: new Date().toISOString().slice(0, 16) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setDiaper(diaper.filter(r => r.id !== id))
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
            <label className="block text-sm text-gray-600 mb-1">时间</label>
            <input
              type="datetime-local"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">类型</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="diaper">纸尿裤</option>
              <option value="cloth">布尿布</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">颜色</label>
            <input
              type="text"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="如：黄色、绿色"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">性状</label>
            <input
              type="text"
              value={form.consistency}
              onChange={(e) => setForm({ ...form, consistency: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="如：正常、稀便、便秘"
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
        {diaper.length === 0 && (
          <div className="text-center text-gray-400 py-8">暂无记录</div>
        )}
        {diaper.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{record.type === 'diaper' ? '纸尿裤' : '布尿布'}</div>
              <div className="text-sm text-gray-500">{record.time.replace('T', ' ')}</div>
              <div className="text-sm">
                {record.color && `颜色: ${record.color}`}
                {record.consistency && ` 性状: ${record.consistency}`}
              </div>
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
