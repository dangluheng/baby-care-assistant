import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SleepRecord } from '../data/types'

export default function Sleep() {
  const [sleep, setSleep] = useLocalStorage('sleep', [])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...SleepRecord, startTime: new Date().toISOString().slice(0, 16) })

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
            <label className="block text-sm text-gray-600 mb-1">开始时间</label>
            <input
              type="datetime-local"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">结束时间</label>
            <input
              type="datetime-local"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">睡眠质量</label>
            <select
              value={form.quality}
              onChange={(e) => setForm({ ...form, quality: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="good">好</option>
              <option value="normal">一般</option>
              <option value="poor">差</option>
            </select>
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
        {sleep.length === 0 && (
          <div className="text-center text-gray-400 py-8">暂无记录</div>
        )}
        {sleep.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">睡眠</div>
              <div className="text-sm text-gray-500">
                {record.startTime.replace('T', ' ')} - {record.endTime ? record.endTime.replace('T', ' ') : '进行中'}
              </div>
              <div className="text-sm">时长: {record.duration} 分钟</div>
              <div className="text-sm">质量: {getQualityLabel(record.quality)}</div>
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
