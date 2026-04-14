import * as XLSX from 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm'

export function exportFeedingExcel(feeding, baby) {
  const data = feeding.map(record => ({
    类型: { breast: '母乳', formula: '配方奶', solid: '辅食' }[record.type],
    时间: record.startTime,
    详情: record.type === 'breast' ? `${record.duration}分钟` :
           record.type === 'formula' ? `${record.amount}ml` :
           `${record.foodName} ${record.portion}`,
    备注: record.note || '',
  }))
  
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '喂养记录')
  XLSX.writeFile(wb, 'feeding-records.xlsx')
}
