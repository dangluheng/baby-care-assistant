import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { HealthRecord } from '../data/types'

export default function Health() {
  const [health, setHealth] = useLocalStorage('health', [])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...HealthRecord, date: new Date().toISOString().slice(0, 10) })

  const handleAdd = () => {
    setHealth([{ ...form, id: Date.now().toString() }, ...health])
    setForm({ ...HealthRecord, date: new Date().toISOString().slice(0, 10) })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setHealth(health.filter(r => r.id !== id))
  }

  const getTypeLabel = (type) => {
    const labels = { vaccine: '疫苗接种', illness: '生病', medicine: '用药' }
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
              <option value="vaccine">疫苗接种</option>
              <option value="illness">生病</option>
              <option value="medicine">用药</option>
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

          {form.type === 'vaccine' && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">疫苗名称</label>
              <input
                type="text"
                value={form.vaccineName}
                onChange={(e) => setForm({ ...form, vaccineName: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          )}

          {form.type === 'illness' && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">症状</label>
              <input
                type="text"
                value={form.illnessName}
                onChange={(e) => setForm({ ...form, illnessName: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          )}

          {form.type === 'medicine' && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">药品名称</label>
                <input
                  type="text"
                  value={form.medicineName}
                  onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
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
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">就诊机构</label>
            <input
              type="text"
              value={form.hospital}
              onChange={(e) => setForm({ ...form, hospital: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
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
        {health.length === 0 && (
          <div className="text-center text-gray-400 py-8">暂无记录</div>
        )}
        {health.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{getTypeLabel(record.type)}</div>
              <div className="text-sm text-gray-500">{record.date}</div>
              <div className="text-sm">
                {record.type === 'vaccine' && record.vaccineName}
                {record.type === 'illness' && record.illnessName}
                {record.type === 'medicine' && `${record.medicineName} ${record.dosage}`}
              </div>
              {record.hospital && <div className="text-sm text-gray-400">机构: {record.hospital}</div>}
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
