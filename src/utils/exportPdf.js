export async function exportFeedingPdf(feeding, baby) {
  const jsPDF = (await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm')).default
  
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('喂养记录', 20, 20)
  
  doc.setFontSize(12)
  doc.text(`宝宝: ${baby.name || '未设置'}`, 20, 30)
  doc.text(`导出时间: ${new Date().toLocaleString()}`, 20, 40)
  
  let y = 50
  feeding.forEach((record, index) => {
    if (y > 270) {
      doc.addPage()
      y = 20
    }
    
    const type = { breast: '母乳', formula: '配方奶', solid: '辅食' }[record.type]
    const detail = record.type === 'breast' ? `${record.duration}分钟` :
                   record.type === 'formula' ? `${record.amount}ml` :
                   `${record.foodName} ${record.portion}`
    
    doc.text(`${index + 1}. ${type} - ${record.startTime.replace('T', ' ')} - ${detail}`, 20, y)
    y += 10
  })
  
  doc.save('feeding-records.pdf')
}
