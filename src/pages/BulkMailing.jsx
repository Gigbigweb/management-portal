// import React, { useState, useRef, useEffect } from 'react'
// import axios from 'axios'
// import { Url } from 'src/url/url'



// const BulkMailing = () => {
//   const [tab, setTab] = useState('csv')

//   // CSV state
//   const [csvFiles, setCsvFiles]       = useState([])
//   const [csvLoading, setCsvLoading]   = useState(false)
//   const [csvUploading, setCsvUploading] = useState(false)
//   const [selectedCSV, setSelectedCSV] = useState(null)
//   const [previewLoading, setPreviewLoading] = useState(false)

//   // Compose
//   const [subject, setSubject] = useState('')
//   const [body, setBody]       = useState('')

//   // Attachments
//   const [attachments, setAttachments]     = useState([])
//   const [attachPreviews, setAttachPreviews] = useState([])

//   // Send / progress
//   const [sending, setSending]   = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [sent, setSent]         = useState(0)
//   const [failed, setFailed]     = useState(0)
//   const [done, setDone]         = useState(false)
//   const [errors, setErrors]     = useState([])

//   const csvRef = useRef()
//   const attRef = useRef()

//   // ── Mount pe S3 CSV list load karo ───────────────────────────────
//   useEffect(() => { fetchCSVList() }, [])

//   // GET /Url/bulkmail/csv/list
//   const fetchCSVList = async () => {
//     setCsvLoading(true)
//     try {
//       const res = await axios.get(`${Url}/api/bulkmail/csv/list`)
//       setCsvFiles(res.data.files || [])
//     } catch (err) {
//       console.error('CSV list error:', err)
//     }
//     setCsvLoading(false)
//   }

//   // POST /Url/bulkmail/csv/upload
//   const handleCSVUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return
//     setCsvUploading(true)
//     const formData = new FormData()
//     formData.append('csv', file)          // key = 'csv' — backend multer isi se expect karta hai
//     try {
//       await axios.post(`${Url}/api/bulkmail/csv/upload`, formData)
//       await fetchCSVList()
//     } catch (err) {
//       alert(err.response?.data?.message || 'CSV upload failed')
//     }
//     setCsvUploading(false)
//     csvRef.current.value = ''
//   }

//   // GET /Url/bulkmail/csv/preview?key=...
//   const handleSelectCSV = async (csvFile) => {
//     if (selectedCSV?.key === csvFile.key) { setSelectedCSV(null); return }
//     setPreviewLoading(true)
//     try {
//       const res = await axios.get(`${Url}/api/bulkmail/csv/preview`, { params: { key: csvFile.key } })
//       setSelectedCSV({
//         key:          csvFile.key,
//         originalName: csvFile.originalName,
//         total:        res.data.total,
//         preview:      res.data.preview,
//         recipients:   res.data.recipients
//       })
//     } catch (err) {
//       alert(err.response?.data?.message || 'Preview failed')
//     }
//     setPreviewLoading(false)
//   }

//   // DELETE /Url/bulkmail/csv/delete
//   const handleDeleteCSV = async (key, name) => {
//     if (!window.confirm(`"${name}" delete karna chahte ho?`)) return
//     try {
//       await axios.delete(`${Url}/api/bulkmail/csv/delete`, { data: { key } })
//       if (selectedCSV?.key === key) setSelectedCSV(null)
//       await fetchCSVList()
//     } catch (err) {
//       alert(err.response?.data?.message || 'Delete failed')
//     }
//   }

//   // Attachments — local only, send pe formData mein jaayenge
//   const handleAttachments = (e) => {
//     const files = Array.from(e.target.files).slice(0, 5 - attachments.length)
//     setAttachments(prev => [...prev, ...files])
//     files.forEach(f => {
//       if (f.type.startsWith('image/')) {
//         const reader = new FileReader()
//         reader.onload = (ev) => setAttachPreviews(prev => [...prev, { type: 'image', url: ev.target.result, name: f.name }])
//         reader.readAsDataURL(f)
//       } else {
//         setAttachPreviews(prev => [...prev, { type: 'file', name: f.name }])
//       }
//     })
//   }

//   const removeAttachment = (i) => {
//     setAttachments(prev => prev.filter((_, idx) => idx !== i))
//     setAttachPreviews(prev => prev.filter((_, idx) => idx !== i))
//   }

//   // POST /Url/bulkmail/send  +  GET /Url/bulkmail/progress/:jobId  (SSE)
//   const handleSend = async () => {
//     if (!subject.trim())  return alert('Subject required!')
//     if (!body.trim())     return alert('Email body required!')
//     if (!selectedCSV)     return alert('Pehle ek CSV select karo!')

//     const jobId = `job_${Date.now()}`
//     setSending(true); setDone(false)
//     setSent(0); setFailed(0); setErrors([]); setProgress(0)

//     // SSE connection — real-time progress
//     const es = new EventSource(`${Url}/api/bulkmail/progress/${jobId}`)
//     es.onmessage = (e) => {
//       const data = JSON.parse(e.data)
//       if (data.type === 'progress') {
//         setProgress(Math.round((data.current / data.total) * 100))
//         setSent(data.sent || 0)
//         setFailed(data.failed || 0)
//       } else if (data.type === 'complete') {
//         setProgress(100); setSent(data.sent); setFailed(data.failed)
//         setErrors(data.errors || []); setSending(false); setDone(true)
//         es.close()
//       } else if (data.type === 'error') {
//         alert(data.message); setSending(false); es.close()
//       }
//     }
//     es.onerror = () => { setSending(false); es.close() }

//     const formData = new FormData()
//     formData.append('subject',  subject)
//     formData.append('htmlBody', body)           // key = 'htmlBody' — backend isi se expect karta hai
//     formData.append('jobId',    jobId)
//     formData.append('csvKey',   selectedCSV.key) // key = 'csvKey'
//     formData.append('delayMs',  '300')
//     attachments.forEach(f => formData.append('attachments', f))

//     try {
//       await axios.post(`${Url}/api/bulkmail/send`, formData)
//     } catch (err) {
//       alert(err.response?.data?.message || 'Send failed')
//       setSending(false); es.close()
//     }
//   }

//   // POST /Url/bulkmail/test
//   const handleTestSMTP = async () => {
//     try {
//       const res = await axios.post(`${Url}/api/bulkmail/test`)
//       alert(res.data.message)
//     } catch (err) {
//       alert(err.response?.data?.message || 'SMTP test failed')
//     }
//   }

//   // ─────────────────────────────────────────────────────────────────
//   return (
//     <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto', padding: '1.5rem' }}>

//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//         <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>📧 Bulk Mailing</h2>
//         <button onClick={handleTestSMTP} style={btnSecondary}>Test SMTP</button>
//       </div>

//       {/* Tabs */}
//       <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
//         {[
//           { key: 'csv',         label: '📁 CSV Files' },
//           { key: 'compose',     label: '✉️ Compose' },
//           { key: 'attachments', label: `📎 Attachments${attachments.length ? ` (${attachments.length})` : ''}` },
//           { key: 'send',        label: '🚀 Send' }
//         ].map(t => (
//           <button key={t.key} onClick={() => setTab(t.key)} style={{
//             padding: '10px 20px', background: 'none', border: 'none',
//             borderBottom: tab === t.key ? '2px solid #111' : '2px solid transparent',
//             fontWeight: tab === t.key ? 600 : 400, cursor: 'pointer',
//             color: tab === t.key ? '#111' : '#6b7280', fontSize: 14
//           }}>{t.label}</button>
//         ))}
//       </div>

//       {/* ══ CSV TAB ═══════════════════════════════════════════════════ */}
//       {tab === 'csv' && (
//         <div>
//           {/* Upload zone */}
//           <div
//             onClick={() => !csvUploading && csvRef.current.click()}
//             style={{ border: '2px dashed #d1d5db', borderRadius: 12, padding: '2rem', textAlign: 'center', cursor: csvUploading ? 'wait' : 'pointer', background: csvUploading ? '#f0fdf4' : '#f9fafb', marginBottom: 20 }}
//           >
//             <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
//               {csvUploading ? '⏳ Uploading to S3...' : '☁️ Click to upload CSV → S3'}
//             </div>
//             <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
//               Required: <code>email</code> column | Optional: <code>name</code>, <code>company</code>
//             </div>
//             <input ref={csvRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleCSVUpload} />
//           </div>

//           {/* List header */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
//             <span style={{ fontWeight: 600, fontSize: 15 }}>
//               S3 CSV Files {csvFiles.length > 0 && <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 400 }}>({csvFiles.length} files)</span>}
//             </span>
//             <button onClick={fetchCSVList} style={btnSecondary}>{csvLoading ? '...' : '↻ Refresh'}</button>
//           </div>

//           {csvLoading ? (
//             <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>Loading...</p>
//           ) : csvFiles.length === 0 ? (
//             <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>Koi CSV file nahi — upar se upload karo</p>
//           ) : (
//             <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
//               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
//                 <thead>
//                   <tr style={{ background: '#f9fafb' }}>
//                     <th style={thStyle}>File Name</th>
//                     <th style={thStyle}>Size</th>
//                     <th style={thStyle}>Date</th>
//                     <th style={thStyle}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {csvFiles.map((f) => {
//                     const isSelected = selectedCSV?.key === f.key
//                     return (
//                       <React.Fragment key={f.key}>
//                         <tr style={{ background: isSelected ? '#eff6ff' : 'white', borderTop: '1px solid #f3f4f6' }}>
//                           <td style={tdStyle}>
//                             <span style={{ fontWeight: 600 }}>📄 {f.originalName}</span>
//                             <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace', marginTop: 2 }}>{f.key}</div>
//                           </td>
//                           <td style={tdStyle}>{f.sizeKB} KB</td>
//                           <td style={tdStyle}>{new Date(f.lastModified).toLocaleDateString()}</td>
//                           <td style={tdStyle}>
//                             <div style={{ display: 'flex', gap: 6 }}>
//                               <button
//                                 onClick={() => handleSelectCSV(f)}
//                                 disabled={previewLoading}
//                                 style={{ ...btnSecondary, fontSize: 12, padding: '5px 12px', background: isSelected ? '#eff6ff' : 'white', color: isSelected ? '#1d4ed8' : '#374151', borderColor: isSelected ? '#93c5fd' : '#d1d5db' }}
//                               >
//                                 {previewLoading && !isSelected ? '...' : isSelected ? '✓ Selected' : 'Select'}
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteCSV(f.key, f.originalName)}
//                                 style={{ ...btnSecondary, fontSize: 12, padding: '5px 10px', color: '#ef4444', borderColor: '#fca5a5' }}
//                               >🗑</button>
//                             </div>
//                           </td>
//                         </tr>

//                         {/* Inline preview row */}
//                         {isSelected && selectedCSV?.preview && (
//                           <tr>
//                             <td colSpan={4} style={{ padding: '0 14px 14px', background: '#f0f9ff' }}>
//                               <div style={{ fontSize: 12, color: '#1d4ed8', fontWeight: 600, marginBottom: 6 }}>
//                                 👥 {selectedCSV.total} recipients — preview (first 10)
//                               </div>
//                               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
//                                 <thead>
//                                   <tr style={{ background: '#dbeafe' }}>
//                                     <th style={{ ...thStyle, padding: '5px 10px' }}>Email</th>
//                                     <th style={{ ...thStyle, padding: '5px 10px' }}>Name</th>
//                                     <th style={{ ...thStyle, padding: '5px 10px' }}>Company</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {selectedCSV.preview.map((r, i) => (
//                                     <tr key={i} style={{ borderTop: '1px solid #bfdbfe' }}>
//                                       <td style={{ padding: '5px 10px', fontFamily: 'monospace', color: '#1d4ed8' }}>{r.email}</td>
//                                       <td style={{ padding: '5px 10px' }}>{r.name || '—'}</td>
//                                       <td style={{ padding: '5px 10px' }}>{r.company || '—'}</td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
//             <button onClick={() => setTab('compose')} style={{ ...btnPrimary, opacity: !selectedCSV ? 0.4 : 1, cursor: !selectedCSV ? 'not-allowed' : 'pointer' }} disabled={!selectedCSV}>
//               Next: Compose →
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ══ COMPOSE TAB ═══════════════════════════════════════════════ */}
//       {tab === 'compose' && (
//         <div>
//           {selectedCSV && (
//             <div style={{ padding: '8px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#16a34a' }}>
//               ✅ {selectedCSV.originalName} — {selectedCSV.total} recipients selected
//             </div>
//           )}
//           <div style={{ marginBottom: 16 }}>
//             <label style={labelStyle}>Subject</label>
//             <input
//               value={subject}
//               onChange={e => setSubject(e.target.value)}
//               placeholder="Email subject... {{name}} use kar sakte ho"
//               style={inputStyle}
//             />
//           </div>
//           <div style={{ marginBottom: 16 }}>
//             <label style={labelStyle}>Message Body</label>
//             <textarea
//               value={body}
//               onChange={e => setBody(e.target.value)}
//               placeholder="Email body likhein... Use {{name}}, {{company}}, {{email}}"
//               rows={8}
//               style={{ ...inputStyle, resize: 'vertical' }}
//             />
//             <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
//               Personalize: <code>{'{{name}}'}</code> <code>{'{{company}}'}</code> <code>{'{{email}}'}</code>
//             </p>
//           </div>
//           <div style={{ display: 'flex', gap: 10 }}>
//             <button onClick={() => setTab('csv')} style={btnSecondary}>← Back</button>
//             <button onClick={() => setTab('attachments')} style={btnPrimary}>Next: Attachments →</button>
//           </div>
//         </div>
//       )}

//       {/* ══ ATTACHMENTS TAB ═══════════════════════════════════════════ */}
//       {tab === 'attachments' && (
//         <div>
//           <div
//             onClick={() => attRef.current.click()}
//             style={{ border: '2px dashed #d1d5db', borderRadius: 12, padding: '2rem', textAlign: 'center', cursor: 'pointer', background: '#f9fafb', marginBottom: 16 }}
//           >
//             <div style={{ fontSize: 14, fontWeight: 600 }}>📎 Click to attach images or files</div>
//             <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Images, PDFs, docs — max 5 files, 10MB each</div>
//             <input ref={attRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleAttachments} />
//           </div>

//           {attachPreviews.length > 0 && (
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
//               {attachPreviews.map((p, i) => (
//                 <div key={i} style={{ position: 'relative', width: 80, height: 80 }}>
//                   {p.type === 'image'
//                     ? <img src={p.url} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
//                     : <div style={{ width: 80, height: 80, borderRadius: 8, border: '1px solid #e5e7eb', background: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
//                         <span style={{ fontSize: 22 }}>📄</span>
//                         <span style={{ fontSize: 9, color: '#6b7280', textAlign: 'center', padding: '0 4px', wordBreak: 'break-all' }}>{p.name.slice(0, 10)}</span>
//                       </div>
//                   }
//                   <button onClick={() => removeAttachment(i)} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 11 }}>✕</button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div style={{ display: 'flex', gap: 10 }}>
//             <button onClick={() => setTab('compose')} style={btnSecondary}>← Back</button>
//             <button onClick={() => setTab('send')} style={btnPrimary}>Review & Send →</button>
//           </div>
//         </div>
//       )}

//       {/* ══ SEND TAB ══════════════════════════════════════════════════ */}
//       {tab === 'send' && (
//         <div>
//           {/* Summary cards */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
//             {[
//               { label: 'Recipients', val: selectedCSV?.total || 0 },
//               { label: 'Attachments', val: attachments.length },
//               { label: 'Subject',     val: subject ? '✓' : '—' }
//             ].map(s => (
//               <div key={s.label} style={{ background: '#f9fafb', borderRadius: 10, padding: '14px 16px' }}>
//                 <div style={{ fontSize: 22, fontWeight: 600 }}>{s.val}</div>
//                 <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Validation warnings */}
//           {!selectedCSV && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, marginBottom: 12, fontSize: 13, color: '#dc2626' }}>⚠️ CSV select nahi ki — CSV tab pe jao</div>}
//           {!subject    && <div style={{ padding: '10px 14px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, marginBottom: 12, fontSize: 13, color: '#92400e' }}>⚠️ Subject empty hai — Compose tab pe likho</div>}

//           {/* Progress bar */}
//           {(sending || done) && (
//             <div style={{ background: '#f9fafb', borderRadius: 10, padding: 16, marginBottom: 16 }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
//                 <span style={{ fontWeight: 600 }}>{done ? '✅ Complete!' : '⏳ Sending...'}</span>
//                 <span style={{ color: '#6b7280' }}>{sent + failed} / {selectedCSV?.total}</span>
//               </div>
//               <div style={{ height: 8, background: '#e5e7eb', borderRadius: 100 }}>
//                 <div style={{ height: 8, borderRadius: 100, background: done ? '#22c55e' : '#3b82f6', width: `${progress}%`, transition: 'width 0.3s' }} />
//               </div>
//               <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12 }}>
//                 <span style={{ color: '#16a34a' }}>✓ {sent} sent</span>
//                 {failed > 0 && <span style={{ color: '#ef4444' }}>✗ {failed} failed</span>}
//               </div>
//               {errors.length > 0 && (
//                 <div style={{ marginTop: 10, maxHeight: 120, overflowY: 'auto' }}>
//                   {errors.map((e, i) => (
//                     <div key={i} style={{ fontSize: 11, color: '#ef4444', fontFamily: 'monospace', padding: '2px 0' }}>
//                       ✗ {e.email} — {e.error}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {!sending && !done && (
//             <button
//               onClick={handleSend}
//               disabled={!selectedCSV || !subject}
//               style={{ ...btnPrimary, opacity: (!selectedCSV || !subject) ? 0.4 : 1, cursor: (!selectedCSV || !subject) ? 'not-allowed' : 'pointer' }}
//             >
//               Send to {selectedCSV?.total || 0} Recipients
//             </button>
//           )}

//           {done && (
//             <button
//               onClick={() => { setTab('csv'); setDone(false); setSent(0); setFailed(0); setProgress(0); setErrors([]) }}
//               style={btnPrimary}
//             >
//               ＋ New Campaign
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// const labelStyle  = { display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6 }
// const inputStyle  = { width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid #d1d5db', borderRadius: 8, outline: 'none', fontFamily: 'inherit' }
// const btnPrimary  = { background: '#111827', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }
// const btnSecondary= { background: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }
// const thStyle     = { padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }
// const tdStyle     = { padding: '10px 12px' }

// export default BulkMailing












// import React, { useState, useRef, useCallback, memo, useEffect } from 'react'
// import axios from 'axios'
// import { Url } from 'src/url/url'
// import EmailBuilder from './Emailbuilder'

// // ─────────────────────────────────────────────────────────────────
// // UTILS
// // ─────────────────────────────────────────────────────────────────
// let _id = 0
// const uid = () => `b${++_id}`
// const clone = x => JSON.parse(JSON.stringify(x))
// const pad  = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mar  = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// // ─────────────────────────────────────────────────────────────────
// // BLOCK REGISTRY — every type: default props + renderer
// // ─────────────────────────────────────────────────────────────────
// const REGISTRY = {

//   text: {
//     label: 'Text', icon: '¶',
//     defaults: {
//       html: 'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.',
//       bgColor: '#ffffff', textColor: '#333333',
//       fontSize: '15', fontFamily: 'Arial', lineHeight: '1.7',
//       textAlign: 'left', fontWeight: '400',
//       pt:'16', pb:'16', pl:'20', pr:'20',
//       mt:'0',  mb:'0',  ml:'0',  mr:'0',
//     },
//     render: p => `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="background:${p.bgColor};padding:${pad(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`,
//   },

//   heading: {
//     label: 'Heading', icon: 'H',
//     defaults: {
//       text: 'Section Heading', level: 'h2',
//       bgColor: '#ffffff', textColor: '#111827',
//       fontSize: '24', fontWeight: '700', textAlign: 'center',
//       letterSpacing: '0', fontFamily: 'Arial',
//       pt:'20', pb:'8', pl:'20', pr:'20',
//       mt:'0',  mb:'0', ml:'0',  mr:'0',
//     },
//     render: p => `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="background:${p.bgColor};padding:${pad(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`,
//   },

//   image: {
//     label: 'Image', icon: '▨',
//     defaults: {
//       src: '', alt: 'image', width: '100', height: '200',
//       borderRadius: '0', align: 'center', link: '',
//       bgColor: '#ffffff',
//       pt:'0', pb:'0', pl:'0', pr:'0',
//       mt:'0', mb:'0', ml:'0', mr:'0',
//     },
//     render: p => {
//       const img = p.src
//         ? `<img src="${p.src}" alt="${p.alt}" width="${p.width}%" style="display:block;${p.width==='100'?'':'margin:0 auto;'}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//         : `<div style="background:#e5e7eb;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#9ca3af;font-family:Arial;font-size:13px">Image URL daalo</div>`
//       const inner = p.link ? `<a href="${p.link}">${img}</a>` : img
//       return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="background:${p.bgColor};padding:${pad(p)};text-align:${p.align}">${inner}</td></tr></table>`
//     },
//   },

//   button: {
//     label: 'Button', icon: '▶',
//     defaults: {
//       text: 'Click Here', url: '#',
//       bgColor: '#1e40af', textColor: '#ffffff',
//       fontSize: '15', fontWeight: '700',
//       borderRadius: '6', align: 'center',
//       fullWidth: 'false',
//       pt:'12', pb:'12', pl:'28', pr:'28',
//       mt:'8',  mb:'8',  ml:'0',  mr:'0',
//     },
//     render: p => {
//       const fw = p.fullWidth === 'true'
//       const a = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pad(p)};font-family:Arial,sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//       return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="text-align:${p.align}">${a}</td></tr></table>`
//     },
//   },

//   divider: {
//     label: 'Divider', icon: '─',
//     defaults: {
//       color: '#e5e7eb', thickness: '1', style: 'solid',
//       pt:'8', pb:'8', pl:'0', pr:'0',
//       mt:'0', mb:'0', ml:'0', mr:'0',
//     },
//     render: p => `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="padding:${pad(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`,
//   },

//   spacer: {
//     label: 'Spacer', icon: '↕',
//     defaults: {
//       height: '24', bgColor: 'transparent',
//       mt:'0', mb:'0', ml:'0', mr:'0',
//     },
//     render: p => `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`,
//   },

//   banner: {
//     label: 'Banner', icon: '◼',
//     defaults: {
//       bgColor: '#1e40af',
//       text: 'Your Company Name',
//       textColor: '#ffffff', fontSize: '26', fontWeight: '700',
//       subtext: '', subtextColor: '#bfdbfe', subtextSize: '14',
//       textAlign: 'center', fontFamily: 'Arial',
//       pt:'28', pb:'28', pl:'24', pr:'24',
//       mt:'0',  mb:'0',  ml:'0',  mr:'0',
//     },
//     render: p => {
//       const sub = p.subtext ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:6px;font-family:${p.fontFamily},sans-serif">${p.subtext}</div>` : ''
//       return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="background:${p.bgColor};padding:${pad(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily},sans-serif">${p.text}</div>${sub}</td></tr></table>`
//     },
//   },

//   social: {
//     label: 'Social', icon: '◉',
//     defaults: {
//       bgColor: '#f8fafc', align: 'center',
//       iconSize: '36', gap: '10',
//       links: [
//         { name:'Facebook',  url:'#', color:'#1877f2' },
//         { name:'Twitter',   url:'#', color:'#1da1f2' },
//         { name:'Instagram', url:'#', color:'#e1306c' },
//         { name:'LinkedIn',  url:'#', color:'#0a66c2' },
//       ],
//       pt:'20', pb:'20', pl:'16', pr:'16',
//       mt:'0',  mb:'0',  ml:'0',  mr:'0',
//     },
//     render: p => {
//       const sz = parseInt(p.iconSize||36)
//       const ABBR = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg' }
//       const icons = (p.links||[]).map(l => {
//         const abbr = ABBR[l.name] || l.name.slice(0,2)
//         return `<a href="${l.url}" style="display:inline-block;margin:0 ${Math.floor(parseInt(p.gap||10)/2)}px;text-decoration:none"><div style="width:${sz}px;height:${sz}px;background:${l.color||'#666'};border-radius:50%;text-align:center;line-height:${sz}px"><span style="color:#fff;font-size:${Math.round(sz*0.38)}px;font-weight:700;font-family:Arial">${abbr}</span></div></a>`
//       }).join('')
//       return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="background:${p.bgColor};padding:${pad(p)};text-align:${p.align}">${icons}</td></tr></table>`
//     },
//   },

//   footer: {
//     label: 'Footer', icon: '▪',
//     defaults: {
//       text: '© 2025 GigBig Global LLP. All rights reserved.',
//       subtext: 'support@gig-big.com  |  www.gig-big.com',
//       unsubText: 'Unsubscribe', unsubUrl: '#', showUnsub: 'true',
//       bgColor: '#f8fafc', textColor: '#94a3b8',
//       fontSize: '12', textAlign: 'center', lineHeight: '1.6',
//       pt:'24', pb:'24', pl:'24', pr:'24',
//       mt:'0',  mb:'0',  ml:'0',  mr:'0',
//     },
//     render: p => {
//       const unsub = p.showUnsub==='true' ? `<div style="margin-top:10px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//       return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:${mar(p)}"><tr><td style="background:${p.bgColor};padding:${pad(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.text}${p.subtext?`<div style="margin-top:4px;font-size:11px;color:#b0bec5">${p.subtext}</div>`:''}${unsub}</td></tr></table>`
//     },
//   },

//   // Multi-column layout — each column has its own blocks[]
//   columns: {
//     label: 'Columns', icon: '⊞',
//     defaults: {
//       bgColor: '#ffffff', colCount: 2, gap: '8',
//       columnDefs: [
//         { id: uid(), width: 50, bgColor: '#ffffff', blocks: [] },
//         { id: uid(), width: 50, bgColor: '#ffffff', blocks: [] },
//       ],
//       pt:'8', pb:'8', pl:'8', pr:'8',
//       mt:'0', mb:'0', ml:'0', mr:'0',
//     },
//     render: p => {
//       const cols = p.columnDefs || []
//       const g = parseInt(p.gap||8)
//       const colsHTML = cols.map(col => {
//         const innerHTML = (col.blocks||[]).map(b => {
//           const reg = REGISTRY[b.type]
//           return reg ? reg.render(b.props) : ''
//         }).join('')
//         return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'}">${innerHTML||'&nbsp;'}</td>`
//       }).join('')
//       return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};margin:${mar(p)}"><tr>${colsHTML}</tr></table>`
//     },
//   },
// }

// // ─────────────────────────────────────────────────────────────────
// // RENDER HELPERS
// // ─────────────────────────────────────────────────────────────────
// const renderBlock = b => {
//   const reg = REGISTRY[b.type]
//   return reg ? reg.render(b.props) : ''
// }

// const buildHTML = (blocks, bg, width) =>
//   `<table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderBlock).join('')}</table></td></tr></table>`

// // ─────────────────────────────────────────────────────────────────
// // PROPERTY FIELDS (stable — always outside render)
// // ─────────────────────────────────────────────────────────────────
// const F = memo(({ label, val, onChange, type='text', half=false }) => (
//   <div style={{ marginBottom:9, width: half?'calc(50% - 3px)':'100%' }}>
//     <div style={pL}>{label}</div>
//     <input type={type} defaultValue={val??''} key={`f-${label}-${val}`}
//       onChange={e=>onChange(e.target.value)} onBlur={e=>onChange(e.target.value)}
//       style={{ ...pI, width:'100%' }} />
//   </div>
// ))

// const CF = memo(({ label, val, onChange }) => (
//   <div style={{ marginBottom:9 }}>
//     <div style={pL}>{label}</div>
//     <div style={{ display:'flex', gap:5 }}>
//       <input type="color" value={val||'#000000'} onChange={e=>onChange(e.target.value)}
//         style={{ width:30, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }} />
//       <input type="text" defaultValue={val||''} key={`cf-${label}-${val}`}
//         onChange={e=>onChange(e.target.value)} onBlur={e=>onChange(e.target.value)}
//         style={{ ...pI, flex:1 }} />
//     </div>
//   </div>
// ))

// const SF = memo(({ label, val, onChange, opts }) => (
//   <div style={{ marginBottom:9 }}>
//     <div style={pL}>{label}</div>
//     <select value={val??''} onChange={e=>onChange(e.target.value)} style={pI}>
//       {opts.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const TGL = memo(({ label, val, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:9 }}>
//     <div style={pL}>{label}</div>
//     <div onClick={()=>onChange(val==='true'?'false':'true')}
//       style={{ width:36, height:20, borderRadius:10, background:val==='true'?'#111827':'#d1d5db', cursor:'pointer', position:'relative', transition:'background 0.2s' }}>
//       <div style={{ width:16, height:16, borderRadius:'50%', background:'white', position:'absolute', top:2, left:val==='true'?18:2, transition:'left 0.2s' }} />
//     </div>
//   </div>
// ))

// const TAF = memo(({ label, val, onChange, rows=4 }) => (
//   <div style={{ marginBottom:9 }}>
//     <div style={pL}>{label}</div>
//     <textarea defaultValue={val??''} key={`ta-${label}-${String(val).slice(0,20)}`} rows={rows}
//       onChange={e=>onChange(e.target.value)} onBlur={e=>onChange(e.target.value)}
//       style={{ ...pI, resize:'vertical', fontFamily:'inherit', lineHeight:1.5 }} />
//   </div>
// ))

// const Sp4 = memo(({ label, p, keys, onUpdate }) => (
//   <div style={{ marginBottom:9 }}>
//     <div style={pL}>{label}</div>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',keys[0]],['Bottom',keys[1]],['Left',keys[2]],['Right',keys[3]]].map(([l,k])=>(
//         <div key={k}>
//           <div style={{ fontSize:10, color:'#aaa', marginBottom:2 }}>{l}</div>
//           <input type="number" defaultValue={p[k]??0} key={`sp-${k}-${p[k]}`}
//             onChange={e=>onUpdate(k,e.target.value)} onBlur={e=>onUpdate(k,e.target.value)}
//             style={{ ...pI, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Sec = ({ t }) => <div style={{ fontSize:10, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.06em', padding:'10px 0 6px', borderTop:'1px solid #f0f0f0', marginTop:4 }}>{t}</div>
// const Row = ({ children }) => <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{children}</div>

// // ─────────────────────────────────────────────────────────────────
// // BLOCK PROPS PANELS
// // ─────────────────────────────────────────────────────────────────
// const FONT_FAMILIES = [['Arial','Arial'],['Georgia','Georgia'],['Trebuchet MS','Trebuchet'],['Verdana','Verdana'],['Tahoma','Tahoma']]
// const FONT_WEIGHTS  = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS        = [['left','Left'],['center','Center'],['right','Right']]

// const TextProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Content" />
//     <TAF label="HTML content ({{name}} works)" val={p.html} onChange={v=>u('html',v)} rows={5} />
//     <Sec t="Typography" />
//     <Row>
//       <F label="Size (px)" val={p.fontSize} onChange={v=>u('fontSize',v)} type="number" half />
//       <SF label="Weight" val={p.fontWeight} onChange={v=>u('fontWeight',v)} opts={FONT_WEIGHTS} />
//     </Row>
//     <SF label="Font family" val={p.fontFamily} onChange={v=>u('fontFamily',v)} opts={FONT_FAMILIES} />
//     <SF label="Align" val={p.textAlign} onChange={v=>u('textAlign',v)} opts={ALIGNS} />
//     <F  label="Line height" val={p.lineHeight} onChange={v=>u('lineHeight',v)} half />
//     <CF label="Text color" val={p.textColor} onChange={v=>u('textColor',v)} />
//     <CF label="Background" val={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Sec t="Spacing" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const HeadingProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Content" />
//     <F label="Heading text" val={p.text} onChange={v=>u('text',v)} />
//     <SF label="Level" val={p.level} onChange={v=>u('level',v)} opts={[['h1','H1'],['h2','H2'],['h3','H3'],['h4','H4']]} />
//     <Sec t="Style" />
//     <Row>
//       <F label="Size (px)" val={p.fontSize} onChange={v=>u('fontSize',v)} type="number" half />
//       <SF label="Weight" val={p.fontWeight} onChange={v=>u('fontWeight',v)} opts={FONT_WEIGHTS} />
//     </Row>
//     <SF label="Align" val={p.textAlign} onChange={v=>u('textAlign',v)} opts={ALIGNS} />
//     <F  label="Letter spacing (px)" val={p.letterSpacing} onChange={v=>u('letterSpacing',v)} half />
//     <CF label="Text color" val={p.textColor} onChange={v=>u('textColor',v)} />
//     <CF label="Background" val={p.bgColor}   onChange={v=>u('bgColor',v)} />
//     <Sec t="Spacing" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const ImageProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Image" />
//     <F label="Image URL" val={p.src} onChange={v=>u('src',v)} />
//     <F label="Click link URL (optional)" val={p.link} onChange={v=>u('link',v)} />
//     <F label="Alt text" val={p.alt} onChange={v=>u('alt',v)} />
//     <Row>
//       <F label="Width (%)" val={p.width} onChange={v=>u('width',v)} type="number" half />
//       <F label="Max height (px)" val={p.height} onChange={v=>u('height',v)} type="number" half />
//     </Row>
//     <F  label="Border radius (px)" val={p.borderRadius} onChange={v=>u('borderRadius',v)} half />
//     <SF label="Align" val={p.align} onChange={v=>u('align',v)} opts={ALIGNS} />
//     <CF label="Background" val={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Sec t="Spacing" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const ButtonProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Button" />
//     <F  label="Button text" val={p.text} onChange={v=>u('text',v)} />
//     <F  label="Link URL"    val={p.url}  onChange={v=>u('url',v)} />
//     <Sec t="Style" />
//     <CF label="Button color" val={p.bgColor}    onChange={v=>u('bgColor',v)} />
//     <CF label="Text color"   val={p.textColor}  onChange={v=>u('textColor',v)} />
//     <Row>
//       <F label="Size (px)" val={p.fontSize} onChange={v=>u('fontSize',v)} type="number" half />
//       <SF label="Weight" val={p.fontWeight} onChange={v=>u('fontWeight',v)} opts={FONT_WEIGHTS} />
//     </Row>
//     <Row>
//       <F label="Radius (px)" val={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" half />
//     </Row>
//     <SF label="Align" val={p.align} onChange={v=>u('align',v)} opts={ALIGNS} />
//     <TGL label="Full width" val={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//     <Sec t="Padding (button inner)" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const DividerProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Line" />
//     <CF label="Color" val={p.color} onChange={v=>u('color',v)} />
//     <Row>
//       <F label="Thickness (px)" val={p.thickness} onChange={v=>u('thickness',v)} type="number" half />
//       <SF label="Style" val={p.style} onChange={v=>u('style',v)} opts={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted']]} />
//     </Row>
//     <Sec t="Spacing" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const SpacerProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Spacer" />
//     <F  label="Height (px)" val={p.height} onChange={v=>u('height',v)} type="number" half />
//     <CF label="Background" val={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Sec t="Margin" />
//     <Sp4 label="Margin" p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const BannerProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Content" />
//     <F  label="Main text" val={p.text}    onChange={v=>u('text',v)} />
//     <F  label="Subtext (optional)" val={p.subtext} onChange={v=>u('subtext',v)} />
//     <Sec t="Style" />
//     <CF label="Background" val={p.bgColor}      onChange={v=>u('bgColor',v)} />
//     <CF label="Text color"  val={p.textColor}    onChange={v=>u('textColor',v)} />
//     <CF label="Subtext color" val={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//     <Row>
//       <F label="Font size (px)" val={p.fontSize} onChange={v=>u('fontSize',v)} type="number" half />
//       <F label="Subtext size"   val={p.subtextSize} onChange={v=>u('subtextSize',v)} type="number" half />
//     </Row>
//     <SF label="Weight" val={p.fontWeight} onChange={v=>u('fontWeight',v)} opts={FONT_WEIGHTS} />
//     <SF label="Align"  val={p.textAlign}  onChange={v=>u('textAlign',v)} opts={ALIGNS} />
//     <Sec t="Spacing" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// const SocialProps = memo(({ p, u }) => {
//   const links = p.links || []
//   const PLATFORMS = ['Facebook','Twitter','Instagram','LinkedIn','YouTube','Pinterest','TikTok','WhatsApp','GitHub','Telegram']
//   const DEF_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#333', Telegram:'#2ca5e0' }

//   const updateLink = (i, k, v) => {
//     const next = links.map((l,idx) => idx===i ? {...l,[k]:v} : l)
//     u('links', next)
//   }
//   const addLink = () => {
//     const pl = 'Facebook'
//     u('links', [...links, { name:pl, url:'#', color:DEF_COLORS[pl] }])
//   }
//   const removeLink = i => u('links', links.filter((_,idx)=>idx!==i))

//   return (
//     <>
//       <Sec t="Layout" />
//       <CF label="Background" val={p.bgColor} onChange={v=>u('bgColor',v)} />
//       <Row>
//         <F label="Icon size (px)" val={p.iconSize} onChange={v=>u('iconSize',v)} type="number" half />
//         <F label="Gap (px)" val={p.gap} onChange={v=>u('gap',v)} type="number" half />
//       </Row>
//       <SF label="Align" val={p.align} onChange={v=>u('align',v)} opts={ALIGNS} />
//       <Sec t="Social Links" />
//       <button onClick={addLink} style={{ ...smBtn, marginBottom:8 }}>+ Add Social Link</button>
//       {links.map((l,i) => (
//         <div key={i} style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:7, padding:8, marginBottom:6 }}>
//           <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//             <span style={{ fontSize:11, fontWeight:600, color:'#374151' }}>{l.name}</span>
//             <button onClick={()=>removeLink(i)} style={{ ...smBtn, background:'#fef2f2', color:'#dc2626', borderColor:'#fecaca' }}>✕</button>
//           </div>
//           <div style={{ marginBottom:5 }}>
//             <div style={pL}>Platform</div>
//             <select value={l.name} onChange={e => { updateLink(i,'name',e.target.value); updateLink(i,'color',DEF_COLORS[e.target.value]||'#666') }} style={pI}>
//               {PLATFORMS.map(pl=><option key={pl} value={pl}>{pl}</option>)}
//             </select>
//           </div>
//           <div style={{ marginBottom:5 }}>
//             <div style={pL}>URL</div>
//             <input type="text" defaultValue={l.url||''} key={`sl-${i}-url`}
//               onChange={e=>updateLink(i,'url',e.target.value)} onBlur={e=>updateLink(i,'url',e.target.value)} style={pI} />
//           </div>
//           <div style={pL}>Icon Color</div>
//           <div style={{ display:'flex', gap:5 }}>
//             <input type="color" value={l.color||'#666'} onChange={e=>updateLink(i,'color',e.target.value)}
//               style={{ width:30, height:26, border:'none', borderRadius:5, cursor:'pointer', padding:1 }} />
//             <input type="text" defaultValue={l.color||''} key={`sl-${i}-color`}
//               onChange={e=>updateLink(i,'color',e.target.value)} style={{ ...pI, flex:1 }} />
//           </div>
//         </div>
//       ))}
//       <Sec t="Spacing" />
//       <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//       <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//     </>
//   )
// })

// const FooterProps = memo(({ p, u }) => (
//   <>
//     <Sec t="Content" />
//     <TAF label="Main text" val={p.text} onChange={v=>u('text',v)} rows={3} />
//     <F   label="Sub text (optional)" val={p.subtext} onChange={v=>u('subtext',v)} />
//     <Sec t="Unsubscribe" />
//     <TGL label="Show unsubscribe link" val={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//     {p.showUnsub==='true' && <>
//       <F label="Unsub text" val={p.unsubText} onChange={v=>u('unsubText',v)} />
//       <F label="Unsub URL"  val={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} />
//     </>}
//     <Sec t="Style" />
//     <CF label="Background" val={p.bgColor}  onChange={v=>u('bgColor',v)} />
//     <CF label="Text color"  val={p.textColor} onChange={v=>u('textColor',v)} />
//     <Row>
//       <F label="Font size (px)" val={p.fontSize} onChange={v=>u('fontSize',v)} type="number" half />
//       <F label="Line height" val={p.lineHeight} onChange={v=>u('lineHeight',v)} half />
//     </Row>
//     <SF label="Align" val={p.textAlign} onChange={v=>u('textAlign',v)} opts={ALIGNS} />
//     <Sec t="Spacing" />
//     <Sp4 label="Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//     <Sp4 label="Margin"  p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//   </>
// ))

// // ─────────────────────────────────────────────────────────────────
// // COLUMNS PROPS — each column is a mini-canvas
// // ─────────────────────────────────────────────────────────────────
// const ColumnsProps = memo(({ p, u, blockId, onSelectInner }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.columnDefs || []

//   const updateCols = newCols => u('columnDefs', newCols)

//   const addCol = () => {
//     const newCol = { id:uid(), width: Math.floor(100/(cols.length+1)), bgColor:'#ffffff', blocks:[] }
//     const next = [...cols, newCol].map((c,_,arr) => ({ ...c, width: Math.floor(100/arr.length) }))
//     updateCols(next)
//     setActiveCol(next.length-1)
//   }

//   const removeCol = i => {
//     if (cols.length<=1) return
//     const next = cols.filter((_,idx)=>idx!==i).map((c,_,arr)=>({ ...c, width:Math.floor(100/arr.length) }))
//     updateCols(next)
//     setActiveCol(Math.max(0, activeCol - (i<=activeCol ? 1 : 0)))
//   }

//   const updateColProp = (i, k, v) => {
//     updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   }

//   const col = cols[Math.min(activeCol, cols.length-1)]

//   return (
//     <>
//       <Sec t="Row" />
//       <CF label="Row background" val={p.bgColor} onChange={v=>u('bgColor',v)} />
//       <Row>
//         <F label="Gap (px)" val={p.gap} onChange={v=>u('gap',v)} type="number" half />
//       </Row>

//       <Sec t="Columns" />
//       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//         <span style={{ fontSize:12, color:'#374151' }}>{cols.length} column{cols.length!==1?'s':''}</span>
//         <button onClick={addCol} style={{ ...smBtn, background:'#1e40af', color:'white', borderColor:'#1e40af' }}>+ Add Column</button>
//       </div>

//       <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//         {cols.map((_,i)=>(
//           <div key={i} style={{ display:'flex', gap:2 }}>
//             <button onClick={()=>setActiveCol(i)}
//               style={{ padding:'4px 10px', fontSize:11, borderRadius:5, cursor:'pointer', border:'1px solid #e5e7eb',
//                 background:activeCol===i?'#111827':'white', color:activeCol===i?'white':'#374151', fontWeight:activeCol===i?600:400 }}>
//               Col {i+1}
//             </button>
//             {cols.length>1 && <button onClick={()=>removeCol(i)}
//               style={{ padding:'3px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//           </div>
//         ))}
//       </div>

//       {col && (
//         <div style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:8, padding:10 }}>
//           <div style={{ fontSize:11, fontWeight:600, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1} settings</div>
//           <F  label="Width (%)" val={String(col.width)} onChange={v=>updateColProp(activeCol,'width',parseInt(v)||50)} type="number" half />
//           <CF label="Background" val={col.bgColor} onChange={v=>updateColProp(activeCol,'bgColor',v)} />
//           <div style={{ marginTop:8, fontSize:11, color:'#6b7280' }}>
//             Column {activeCol+1} mein blocks add karne ke liye canvas mein us column par click karo
//           </div>
//         </div>
//       )}

//       <Sec t="Spacing" />
//       <Sp4 label="Outer Padding" p={p} keys={['pt','pb','pl','pr']} onUpdate={u} />
//       <Sp4 label="Margin"        p={p} keys={['mt','mb','ml','mr']} onUpdate={u} />
//     </>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANEL ROUTER
// // ─────────────────────────────────────────────────────────────────
// const PropsPanel = memo(({ sel, onUpdate }) => {
//   if (!sel) return (
//     <div style={{ padding:20, textAlign:'center', color:'#9ca3af', fontSize:13 }}>
//       <div style={{ fontSize:24, marginBottom:8 }}>←</div>
//       Block select karo to properties edit karo
//     </div>
//   )

//   const u = (k, v) => onUpdate(sel.id, k, v)
//   const p = sel.props

//   const panels = {
//     text:     <TextProps    p={p} u={u} />,
//     heading:  <HeadingProps p={p} u={u} />,
//     image:    <ImageProps   p={p} u={u} />,
//     button:   <ButtonProps  p={p} u={u} />,
//     divider:  <DividerProps p={p} u={u} />,
//     spacer:   <SpacerProps  p={p} u={u} />,
//     banner:   <BannerProps  p={p} u={u} />,
//     social:   <SocialProps  p={p} u={u} />,
//     footer:   <FooterProps  p={p} u={u} />,
//     columns:  <ColumnsProps p={p} u={u} blockId={sel.id} />,
//   }

//   return (
//     <div style={{ padding:'8px 12px', overflowY:'auto', height:'100%' }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#374151', textTransform:'uppercase', letterSpacing:'0.05em', paddingBottom:8, marginBottom:4, borderBottom:'1px solid #f0f0f0' }}>
//         {REGISTRY[sel.type]?.label || sel.type} Settings
//       </div>
//       {panels[sel.type] || <div style={{ color:'#9ca3af', fontSize:12 }}>No settings</div>}
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // MINI BLOCK LIST (for inside columns)
// // ─────────────────────────────────────────────────────────────────
// const INNER_BLOCKS = ['text','heading','image','button','divider','spacer']

// // ─────────────────────────────────────────────────────────────────
// // TEMPLATE BUILDER
// // ─────────────────────────────────────────────────────────────────
// function TemplateBuilder({ onUseTemplate }) {
//   const [blocks, setBlocks]       = useState([])
//   const [selId, setSelId]         = useState(null)
//   const [selInner, setSelInner]   = useState(null) // {blockId, colIdx, innerId}
//   const [emailBg, setEmailBg]     = useState('#f4f4f4')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview, setPreview]     = useState(false)
//   const [addingInCol, setAddingInCol] = useState(null) // {blockId, colIdx}

//   const addBlock = type => {
//     if (addingInCol) {
//       // Add into a column
//       const { blockId, colIdx } = addingInCol
//       setBlocks(prev => prev.map(b => {
//         if (b.id !== blockId) return b
//         const cols = [...(b.props.columnDefs||[])]
//         const newInner = { id:uid(), type, props:clone(REGISTRY[type].defaults) }
//         cols[colIdx] = { ...cols[colIdx], blocks:[...(cols[colIdx].blocks||[]), newInner] }
//         return { ...b, props:{ ...b.props, columnDefs:cols } }
//       }))
//       setAddingInCol(null)
//       return
//     }
//     const id = uid()
//     setBlocks(prev => [...prev, { id, type, props:clone(REGISTRY[type].defaults) }])
//     setSelId(id)
//     setSelInner(null)
//   }

//   const deleteBlock = id => {
//     setBlocks(prev => prev.filter(b => b.id!==id))
//     if (selId===id) { setSelId(null); setSelInner(null) }
//   }

//   const duplicateBlock = id => {
//     const b = blocks.find(x=>x.id===id); if (!b) return
//     const newB = { id:uid(), type:b.type, props:clone(b.props) }
//     const idx = blocks.findIndex(x=>x.id===id)
//     const next = [...blocks]; next.splice(idx+1,0,newB)
//     setBlocks(next); setSelId(newB.id)
//   }

//   const moveBlock = (id, dir) => {
//     setBlocks(prev => {
//       const arr=[...prev], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if (j<0||j>=arr.length) return arr
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]; return arr
//     })
//   }

//   // Update prop on main block
//   const updateProp = useCallback((id, key, val) => {
//     setBlocks(prev => prev.map(b => b.id===id ? {...b, props:{...b.props,[key]:val}} : b))
//   }, [])

//   // Update prop on inner block (inside column)
//   const updateInnerProp = useCallback((blockId, colIdx, innerId, key, val) => {
//     setBlocks(prev => prev.map(b => {
//       if (b.id!==blockId) return b
//       const cols = (b.props.columnDefs||[]).map((c,ci) => {
//         if (ci!==colIdx) return c
//         return { ...c, blocks:(c.blocks||[]).map(ib => ib.id===innerId ? {...ib, props:{...ib.props,[key]:val}} : ib) }
//       })
//       return {...b, props:{...b.props, columnDefs:cols}}
//     }))
//   }, [])

//   const deleteInnerBlock = (blockId, colIdx, innerId) => {
//     setBlocks(prev => prev.map(b => {
//       if (b.id!==blockId) return b
//       const cols = (b.props.columnDefs||[]).map((c,ci) => ci===colIdx ? {...c, blocks:(c.blocks||[]).filter(ib=>ib.id!==innerId)} : c)
//       return {...b, props:{...b.props, columnDefs:cols}}
//     }))
//     if (selInner?.innerId===innerId) setSelInner(null)
//   }

//   const moveInnerBlock = (blockId, colIdx, innerId, dir) => {
//     setBlocks(prev => prev.map(b => {
//       if (b.id!==blockId) return b
//       const cols = (b.props.columnDefs||[]).map((c,ci) => {
//         if (ci!==colIdx) return c
//         const arr=[...(c.blocks||[])], i=arr.findIndex(x=>x.id===innerId), j=i+dir
//         if (j<0||j>=arr.length) return c
//         ;[arr[i],arr[j]]=[arr[j],arr[i]]
//         return {...c, blocks:arr}
//       })
//       return {...b, props:{...b.props, columnDefs:cols}}
//     }))
//   }

//   // Resolve selected block for props panel
//   let selBlock = null
//   if (selInner) {
//     const parent = blocks.find(b=>b.id===selInner.blockId)
//     const col = parent?.props?.columnDefs?.[selInner.colIdx]
//     selBlock = col?.blocks?.find(ib=>ib.id===selInner.innerId) || null
//     if (selBlock) selBlock = { ...selBlock, _inner:selInner }
//   } else if (selId) {
//     selBlock = blocks.find(b=>b.id===selId) || null
//   }

//   const handlePropUpdate = useCallback((id, key, val) => {
//     if (selInner && selInner.innerId===id) {
//       updateInnerProp(selInner.blockId, selInner.colIdx, id, key, val)
//     } else {
//       updateProp(id, key, val)
//     }
//   }, [selInner, updateProp, updateInnerProp])

//   return (
//     <div style={{ border:'1px solid #e5e7eb', borderRadius:10, overflow:'hidden', display:'grid', gridTemplateColumns:'200px 1fr 270px', height:660 }}>

//       {/* ── LEFT PANEL ── */}
//       <div style={{ background:'#fafafa', borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ padding:'10px 12px 4px' }}>
//           {addingInCol ? (
//             <div style={{ marginBottom:8 }}>
//               <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:4 }}>
//                 Adding to Col {addingInCol.colIdx+1}
//               </div>
//               <button onClick={()=>setAddingInCol(null)}
//                 style={{ ...smBtn, width:'100%', justifyContent:'center', marginBottom:4 }}>
//                 ✕ Cancel
//               </button>
//             </div>
//           ) : (
//             <div style={{ fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Add Blocks</div>
//           )}
//         </div>

//         <div style={{ overflowY:'auto', flex:1, padding:'0 8px 8px' }}>
//           {(addingInCol ? INNER_BLOCKS : Object.keys(REGISTRY)).map(type => {
//             const r = REGISTRY[type]; if (!r) return null
//             return (
//               <button key={type} onClick={() => addBlock(type)}
//                 style={{ width:'100%', padding:'7px 10px', marginBottom:3, background:'white', border:'1px solid #e5e7eb', borderRadius:7, cursor:'pointer', textAlign:'left', display:'block', transition:'background 0.1s' }}
//                 onMouseEnter={e=>e.currentTarget.style.background='#f0f9ff'}
//                 onMouseLeave={e=>e.currentTarget.style.background='white'}>
//                 <span style={{ fontSize:13, marginRight:8, color:'#6b7280' }}>{r.icon}</span>
//                 <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{r.label}</span>
//               </button>
//             )
//           })}
//         </div>

//         {/* Email settings */}
//         <div style={{ borderTop:'1px solid #e5e7eb', padding:'10px 12px' }}>
//           <div style={{ fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', marginBottom:8 }}>Email Settings</div>
//           <div style={{ marginBottom:7 }}>
//             <div style={pL}>Background</div>
//             <div style={{ display:'flex', gap:5 }}>
//               <input type="color" value={emailBg} onChange={e=>setEmailBg(e.target.value)}
//                 style={{ width:28, height:26, border:'none', borderRadius:5, cursor:'pointer', padding:1 }} />
//               <input type="text" value={emailBg} onChange={e=>setEmailBg(e.target.value)}
//                 style={{ ...pI, flex:1, fontSize:11 }} />
//             </div>
//           </div>
//           <div style={{ marginBottom:10 }}>
//             <div style={pL}>Width</div>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={pI}>
//               {[['520','520px'],['600','600px (standard)'],['640','640px']].map(([v,l])=><option key={v} value={v}>{l}</option>)}
//             </select>
//           </div>
//           <button onClick={() => blocks.length && onUseTemplate(buildHTML(blocks, emailBg, emailWidth))}
//             disabled={!blocks.length}
//             style={{ width:'100%', padding:'9px', background:blocks.length?'#111827':'#e5e7eb', color:blocks.length?'white':'#9ca3af', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:13, fontWeight:700 }}>
//             ✓ Use Template
//           </button>
//         </div>
//       </div>

//       {/* ── CENTER: CANVAS ── */}
//       <div style={{ background:'#dde1e7', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ background:'white', borderBottom:'1px solid #e5e7eb', padding:'6px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <span style={{ fontSize:11, color:'#6b7280' }}>{blocks.length} block{blocks.length!==1?'s':''}</span>
//           <div style={{ display:'flex', gap:5 }}>
//             <button onClick={()=>{setPreview(false)}} style={{ padding:'3px 12px', fontSize:11, borderRadius:5, border:'1px solid #e5e7eb', cursor:'pointer', background:!preview?'#111827':'white', color:!preview?'white':'#6b7280' }}>Edit</button>
//             <button onClick={()=>{setPreview(true)}}  style={{ padding:'3px 12px', fontSize:11, borderRadius:5, border:'1px solid #e5e7eb', cursor:'pointer', background: preview?'#111827':'white', color: preview?'white':'#6b7280' }}>Preview</button>
//           </div>
//         </div>

//         <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//           <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:300 }}>
//             {blocks.length===0 && (
//               <div style={{ textAlign:'center', padding:'60px 20px', color:'#9ca3af', fontSize:13 }}>
//                 ← Left panel se block add karo
//               </div>
//             )}

//             {blocks.map(b => {
//               const isSelected = !preview && selId===b.id && !selInner

//               if (b.type==='columns') {
//                 // Render columns with inner-block editing
//                 return (
//                   <div key={b.id} onClick={()=>{if(!preview){setSelId(b.id);setSelInner(null)}}}
//                     style={{ position:'relative', outline:isSelected?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                     {!preview && (
//                       <div style={{ position:'absolute', top:4, right:4, display:'flex', gap:3, zIndex:20 }} onClick={e=>e.stopPropagation()}>
//                         <button onClick={()=>moveBlock(b.id,-1)} style={tbB} title="Up">↑</button>
//                         <button onClick={()=>moveBlock(b.id,1)} style={tbB} title="Down">↓</button>
//                         <button onClick={()=>duplicateBlock(b.id)} style={{...tbB,background:'#059669'}} title="Duplicate">⧉</button>
//                         <button onClick={()=>deleteBlock(b.id)} style={{...tbB,background:'#dc2626'}} title="Delete">✕</button>
//                       </div>
//                     )}

//                     {/* Columns preview with editable inner blocks */}
//                     <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor }}>
//                       <tbody><tr>
//                         {(b.props.columnDefs||[]).map((col,ci) => {
//                           const isColActive = !preview && addingInCol?.blockId===b.id && addingInCol?.colIdx===ci
//                           return (
//                             <td key={col.id} width={col.width+'%'} valign="top"
//                               style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor, outline:isColActive?'2px dashed #3b82f6':'2px dashed transparent', position:'relative', verticalAlign:'top' }}>

//                               {/* Inner blocks */}
//                               {(col.blocks||[]).map(ib => {
//                                 const isInnerSel = !preview && selInner?.blockId===b.id && selInner?.colIdx===ci && selInner?.innerId===ib.id
//                                 return (
//                                   <div key={ib.id}
//                                     onClick={e=>{e.stopPropagation(); if(!preview){setSelInner({blockId:b.id,colIdx:ci,innerId:ib.id}); setSelId(null)}}}
//                                     style={{ position:'relative', outline:isInnerSel?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                     {!preview && (
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:15 }} onClick={e=>e.stopPropagation()}>
//                                         <button onClick={()=>moveInnerBlock(b.id,ci,ib.id,-1)} style={{...tbB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                         <button onClick={()=>moveInnerBlock(b.id,ci,ib.id,1)}  style={{...tbB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                         <button onClick={()=>deleteInnerBlock(b.id,ci,ib.id)}  style={{...tbB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                       </div>
//                                     )}
//                                     <div dangerouslySetInnerHTML={{ __html:renderBlock(ib) }} />
//                                   </div>
//                                 )
//                               })}

//                               {/* Add block to this column button */}
//                               {!preview && (
//                                 <button
//                                   onClick={e=>{e.stopPropagation(); setAddingInCol({blockId:b.id,colIdx:ci}); setSelId(b.id); setSelInner(null)}}
//                                   style={{ width:'100%', padding:'6px', background:'rgba(59,130,246,0.07)', border:'1px dashed #93c5fd', borderRadius:6, cursor:'pointer', fontSize:11, color:'#3b82f6', marginTop:(col.blocks||[]).length?6:0 }}>
//                                   + Add block to Col {ci+1}
//                                 </button>
//                               )}
//                             </td>
//                           )
//                         })}
//                       </tr></tbody>
//                     </table>
//                   </div>
//                 )
//               }

//               return (
//                 <div key={b.id}
//                   onClick={()=>{if(!preview){setSelId(b.id);setSelInner(null)}}}
//                   style={{ position:'relative', outline:isSelected?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                   {!preview && (
//                     <div style={{ position:'absolute', top:4, right:4, display:'flex', gap:3, zIndex:20 }} onClick={e=>e.stopPropagation()}>
//                       <button onClick={()=>moveBlock(b.id,-1)} style={tbB} title="Up">↑</button>
//                       <button onClick={()=>moveBlock(b.id,1)} style={tbB} title="Down">↓</button>
//                       <button onClick={()=>duplicateBlock(b.id)} style={{...tbB,background:'#059669'}} title="Duplicate">⧉</button>
//                       <button onClick={()=>deleteBlock(b.id)} style={{...tbB,background:'#dc2626'}} title="Delete">✕</button>
//                     </div>
//                   )}
//                   <div dangerouslySetInnerHTML={{ __html:renderBlock(b) }} />
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ── RIGHT: PROPS ── */}
//       <div style={{ background:'#fafafa', borderLeft:'1px solid #e5e7eb', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ padding:'10px 12px 6px', fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.05em', borderBottom:'1px solid #e5e7eb' }}>
//           {selBlock ? `${REGISTRY[selBlock.type]?.label||selBlock.type} Settings` : 'Properties'}
//         </div>
//         <div style={{ flex:1, overflow:'hidden' }}>
//           <PropsPanel sel={selBlock} onUpdate={handlePropUpdate} />
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─────────────────────────────────────────────────────────────────
// // MAIN BULKMAILING COMPONENT
// // ─────────────────────────────────────────────────────────────────
// const BulkMailing = () => {
//   const [tab, setTab]                       = useState('csv')
//   const [csvFiles, setCsvFiles]             = useState([])
//   const [csvLoading, setCsvLoading]         = useState(false)
//   const [csvUploading, setCsvUploading]     = useState(false)
//   const [selectedCSV, setSelectedCSV]       = useState(null)
//   const [previewLoading, setPreviewLoading] = useState(false)
//   const [subject, setSubject]               = useState('')
//   const [body, setBody]                     = useState('')
//   const [showBuilder, setShowBuilder]       = useState(false)
//   const [attachments, setAttachments]       = useState([])
//   const [attachPreviews, setAttachPreviews] = useState([])
//   const [sending, setSending]               = useState(false)
//   const [progress, setProgress]             = useState(0)
//   const [sent, setSent]                     = useState(0)
//   const [failed, setFailed]                 = useState(0)
//   const [done, setDone]                     = useState(false)
//   const [errors, setErrors]                 = useState([])

//   const csvRef = useRef()
//   const attRef = useRef()

//   useEffect(() => { fetchCSVList() }, [])

//   const fetchCSVList = async () => {
//     setCsvLoading(true)
//     try { const r = await axios.get(`${Url}/api/bulkmail/csv/list`); setCsvFiles(r.data.files||[]) }
//     catch(e){ console.error(e) }
//     setCsvLoading(false)
//   }

//   const handleCSVUpload = async e => {
//     const f = e.target.files[0]; if (!f) return
//     setCsvUploading(true)
//     const fd = new FormData(); fd.append('csv', f)
//     try { await axios.post(`${Url}/api/bulkmail/csv/upload`, fd); await fetchCSVList() }
//     catch(e){ alert(e.response?.data?.message||'Upload failed') }
//     setCsvUploading(false); csvRef.current.value = ''
//   }

//   const handleSelectCSV = async f => {
//     if (selectedCSV?.key===f.key) { setSelectedCSV(null); return }
//     setPreviewLoading(true)
//     try {
//       const r = await axios.get(`${Url}/api/bulkmail/csv/preview`, { params:{ key:f.key } })
//       setSelectedCSV({ key:f.key, originalName:f.originalName, total:r.data.total, preview:r.data.preview })
//     } catch(e){ alert(e.response?.data?.message||'Preview failed') }
//     setPreviewLoading(false)
//   }

//   const handleDeleteCSV = async (key, name) => {
//     if (!window.confirm(`"${name}" delete karna chahte ho?`)) return
//     try { await axios.delete(`${Url}/api/bulkmail/csv/delete`,{data:{key}}); if(selectedCSV?.key===key) setSelectedCSV(null); await fetchCSVList() }
//     catch(e){ alert(e.response?.data?.message||'Delete failed') }
//   }

//   const handleAttachments = e => {
//     const files = Array.from(e.target.files).slice(0, 5-attachments.length)
//     setAttachments(p=>[...p,...files])
//     files.forEach(f=>{
//       if (f.type.startsWith('image/')) { const r=new FileReader(); r.onload=ev=>setAttachPreviews(p=>[...p,{type:'image',url:ev.target.result,name:f.name}]); r.readAsDataURL(f) }
//       else setAttachPreviews(p=>[...p,{type:'file',name:f.name}])
//     })
//   }

//   const removeAtt = i => { setAttachments(p=>p.filter((_,idx)=>idx!==i)); setAttachPreviews(p=>p.filter((_,idx)=>idx!==i)) }

//   const handleSend = async () => {
//     if (!subject.trim()) return alert('Subject required!')
//     if (!body.trim())    return alert('Email body required!')
//     if (!selectedCSV)    return alert('Pehle CSV select karo!')
//     const jobId = `job_${Date.now()}`
//     setSending(true); setDone(false); setSent(0); setFailed(0); setErrors([]); setProgress(0)
//     const es = new EventSource(`${Url}/api/bulkmail/progress/${jobId}`)
//     es.onmessage = e => {
//       const d = JSON.parse(e.data)
//       if (d.type==='progress') { setProgress(Math.round((d.current/d.total)*100)); setSent(d.sent||0); setFailed(d.failed||0) }
//       else if (d.type==='complete') { setProgress(100); setSent(d.sent); setFailed(d.failed); setErrors(d.errors||[]); setSending(false); setDone(true); es.close() }
//       else if (d.type==='error') { alert(d.message); setSending(false); es.close() }
//     }
//     es.onerror = () => { setSending(false); es.close() }
//     const fd = new FormData()
//     fd.append('subject',subject); fd.append('htmlBody',body); fd.append('jobId',jobId)
//     fd.append('csvKey',selectedCSV.key); fd.append('delayMs','300')
//     attachments.forEach(f=>fd.append('attachments',f))
//     try { await axios.post(`${Url}/api/bulkmail/send`, fd) }
//     catch(e){ alert(e.response?.data?.message||'Send failed'); setSending(false); es.close() }
//   }

//   const handleTestSMTP = async () => {
//     try { const r = await axios.post(`${Url}/api/bulkmail/test`); alert(r.data.message) }
//     catch(e){ alert(e.response?.data?.message||'SMTP failed') }
//   }

//   return (
//     <div style={{ fontFamily:'sans-serif', maxWidth:1200, margin:'0 auto', padding:'1.5rem' }}>
//       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
//         <h2 style={{ margin:0, fontSize:20, fontWeight:700 }}>📧 Bulk Mailing</h2>
//         <button onClick={handleTestSMTP} style={bSec}>Test SMTP</button>
//       </div>

//       <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb', marginBottom:'1.5rem' }}>
//         {[{key:'csv',label:'📁 CSV Files'},{key:'compose',label:'✉️ Compose'},{key:'attachments',label:`📎 Attachments${attachments.length?` (${attachments.length})`:''}`},{key:'send',label:'🚀 Send'}].map(t=>(
//           <button key={t.key} onClick={()=>setTab(t.key)} style={{ padding:'10px 20px', background:'none', border:'none', borderBottom:tab===t.key?'2px solid #111':'2px solid transparent', fontWeight:tab===t.key?600:400, cursor:'pointer', color:tab===t.key?'#111':'#6b7280', fontSize:14 }}>{t.label}</button>
//         ))}
//       </div>

//       {tab==='csv' && (
//         <div>
//           <div onClick={()=>!csvUploading&&csvRef.current.click()} style={{ border:'2px dashed #d1d5db', borderRadius:12, padding:'2rem', textAlign:'center', cursor:csvUploading?'wait':'pointer', background:csvUploading?'#f0fdf4':'#f9fafb', marginBottom:20 }}>
//             <div style={{ fontSize:14, fontWeight:600 }}>{csvUploading?'⏳ Uploading...':'☁️ Click to upload CSV → S3'}</div>
//             <div style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>Required: <code>email</code> | Optional: <code>name</code>, <code>company</code></div>
//             <input ref={csvRef} type="file" accept=".csv" style={{ display:'none' }} onChange={handleCSVUpload} />
//           </div>
//           <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//             <span style={{ fontWeight:600 }}>S3 CSV Files</span>
//             <button onClick={fetchCSVList} style={bSec}>{csvLoading?'...':'↻ Refresh'}</button>
//           </div>
//           {csvLoading ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Loading...</p>
//           : csvFiles.length===0 ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Koi CSV nahi</p>
//           : <div style={{ border:'1px solid #e5e7eb', borderRadius:10, overflow:'hidden' }}>
//               <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
//                 <thead><tr style={{ background:'white' }}>
//                   <th style={thS}>File</th><th style={thS}>Size</th><th style={thS}>Date</th><th style={thS}>Actions</th>
//                 </tr></thead>
//                 <tbody>
//                   {csvFiles.map(f=>{
//                     const isSel=selectedCSV?.key===f.key
//                     return (
//                       <React.Fragment key={f.key}>
//                         <tr style={{ background:isSel?'white':'white', borderTop:'1px solid #f3f4f6' }}>
//                           <td style={tdS}><b>📄 {f.originalName}</b><div style={{ fontSize:11, color:'#9ca3af', fontFamily:'monospace' }}>{f.key}</div></td>
//                           <td style={tdS}>{f.sizeKB} KB</td>
//                           <td style={tdS}>{new Date(f.lastModified).toLocaleDateString()}</td>
//                           <td style={tdS}>
//                             <div style={{ display:'flex', gap:6 }}>
//                               <button onClick={()=>handleSelectCSV(f)} disabled={previewLoading}
//                                 style={{ ...bSec, fontSize:12, padding:'5px 12px', background:isSel?'white':'white', color:isSel?'#1d4ed8':'#374151', borderColor:isSel?'#93c5fd':'#d1d5db' }}>
//                                 {previewLoading&&!isSel?'...':isSel?'✓ Selected':'Select'}
//                               </button>
//                               <button onClick={()=>handleDeleteCSV(f.key,f.originalName)} style={{ ...bSec, fontSize:12, padding:'5px 10px', color:'#ef4444', borderColor:'#fca5a5' }}>🗑</button>
//                             </div>
//                           </td>
//                         </tr>
//                         {isSel&&selectedCSV?.preview&&(
//                           <tr><td colSpan={4} style={{ padding:'0 14px 14px', background:'white' }}>
//                             <div style={{ fontSize:12, color:'#1d4ed8', fontWeight:600, marginBottom:6 }}>👥 {selectedCSV.total} recipients</div>
//                             <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
//                               <thead><tr style={{ background:'#dbeafe' }}>
//                                 <th style={{ ...thS, padding:'5px 10px' }}>Email</th>
//                                 <th style={{ ...thS, padding:'5px 10px' }}>Name</th>
//                                 <th style={{ ...thS, padding:'5px 10px' }}>Company</th>
//                               </tr></thead>
//                               <tbody>{selectedCSV.preview.map((r,i)=>(
//                                 <tr key={i} style={{ borderTop:'1px solid #bfdbfe' }}>
//                                   <td style={{ padding:'5px 10px', fontFamily:'monospace', color:'#1d4ed8' }}>{r.email}</td>
//                                   <td style={{ padding:'5px 10px' }}>{r.name||'—'}</td>
//                                   <td style={{ padding:'5px 10px' }}>{r.company||'—'}</td>
//                                 </tr>
//                               ))}</tbody>
//                             </table>
//                           </td></tr>
//                         )}
//                       </React.Fragment>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           }
//           <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
//             <button onClick={()=>setTab('compose')} disabled={!selectedCSV} style={{ ...bPri, opacity:!selectedCSV?0.4:1, cursor:!selectedCSV?'not-allowed':'pointer' }}>Next: Compose →</button>
//           </div>
//         </div>
//       )}

//       {tab==='compose' && (
//         <div>
//           {selectedCSV&&<div style={{ padding:'8px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, marginBottom:16, fontSize:13, color:'#16a34a' }}>✅ {selectedCSV.originalName} — {selectedCSV.total} recipients</div>}
//           <div style={{ marginBottom:16 }}>
//             <label style={lS}>Subject</label>
//             <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject... {{name}} use kar sakte ho" style={iS} />
//           </div>
//           <div style={{ marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//             <label style={lS}>Message Body</label>
//             <div style={{ display:'flex', border:'1px solid #e5e7eb', borderRadius:8, overflow:'hidden' }}>
//               <button onClick={()=>setShowBuilder(false)} style={{ padding:'5px 14px', fontSize:12, border:'none', cursor:'pointer', fontWeight:!showBuilder?600:400, background:!showBuilder?'#111827':'white', color:!showBuilder?'white':'#6b7280' }}>Plain Text</button>
//               <button onClick={()=>setShowBuilder(true)}  style={{ padding:'5px 14px', fontSize:12, border:'none', cursor:'pointer', fontWeight: showBuilder?600:400, background: showBuilder?'#111827':'white', color: showBuilder?'white':'#6b7280' }}>🎨 Template Builder</button>
//             </div>
//           </div>
//           {!showBuilder && (
//             <div style={{ marginBottom:16 }}>
//               <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Email body... {{name}}, {{company}}, {{email}}" rows={8} style={{ ...iS, resize:'vertical' }} />
//               <p style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>Personalize: <code>{'{{name}}'}</code> <code>{'{{company}}'}</code> <code>{'{{email}}'}</code></p>
//             </div>
//           )}
//           {showBuilder && (
//             <div style={{ marginBottom:16 }}>
//               <EmailBuilder onUseTemplate={html=>{ setBody(html); setShowBuilder(false) }} />
//               {body&&<div style={{ marginTop:8, padding:'7px 12px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12, color:'#16a34a' }}>✅ Template set hai — "Use Template" dobara dabao to update karo</div>}
//             </div>
//           )}
//           <div style={{ display:'flex', gap:10 }}>
//             <button onClick={()=>setTab('csv')} style={bSec}>← Back</button>
//             <button onClick={()=>setTab('attachments')} style={bPri}>Next: Attachments →</button>
//           </div>
//         </div>
//       )}

//       {tab==='attachments' && (
//         <div>
//           <div onClick={()=>attRef.current.click()} style={{ border:'2px dashed #d1d5db', borderRadius:12, padding:'2rem', textAlign:'center', cursor:'pointer', background:'#f9fafb', marginBottom:16 }}>
//             <div style={{ fontSize:14, fontWeight:600 }}>📎 Click to attach images or files</div>
//             <div style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>Images, PDFs, docs — max 5 files, 10MB each</div>
//             <input ref={attRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" style={{ display:'none' }} onChange={handleAttachments} />
//           </div>
//           {attachPreviews.length>0&&<div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:16 }}>
//             {attachPreviews.map((p,i)=>(
//               <div key={i} style={{ position:'relative', width:80, height:80 }}>
//                 {p.type==='image'?<img src={p.url} alt="" style={{ width:80, height:80, objectFit:'cover', borderRadius:8, border:'1px solid #e5e7eb' }} />
//                   :<div style={{ width:80, height:80, borderRadius:8, border:'1px solid #e5e7eb', background:'#f3f4f6', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4 }}>
//                     <span style={{ fontSize:22 }}>📄</span>
//                     <span style={{ fontSize:9, color:'#6b7280', textAlign:'center', padding:'0 4px', wordBreak:'break-all' }}>{p.name.slice(0,10)}</span>
//                   </div>}
//                 <button onClick={()=>removeAtt(i)} style={{ position:'absolute', top:-6, right:-6, background:'#ef4444', color:'white', border:'none', borderRadius:'50%', width:20, height:20, cursor:'pointer', fontSize:11 }}>✕</button>
//               </div>
//             ))}
//           </div>}
//           <div style={{ display:'flex', gap:10 }}>
//             <button onClick={()=>setTab('compose')} style={bSec}>← Back</button>
//             <button onClick={()=>setTab('send')} style={bPri}>Review & Send →</button>
//           </div>
//         </div>
//       )}

//       {tab==='send' && (
//         <div>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
//             {[{label:'Recipients',val:selectedCSV?.total||0},{label:'Attachments',val:attachments.length},{label:'Subject',val:subject?'✓':'—'}].map(s=>(
//               <div key={s.label} style={{ background:'#f9fafb', borderRadius:10, padding:'14px 16px' }}>
//                 <div style={{ fontSize:22, fontWeight:600 }}>{s.val}</div>
//                 <div style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>{s.label}</div>
//               </div>
//             ))}
//           </div>
//           {!selectedCSV&&<div style={{ padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, marginBottom:12, fontSize:13, color:'#dc2626' }}>⚠️ CSV select nahi ki</div>}
//           {!subject&&<div style={{ padding:'10px 14px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, marginBottom:12, fontSize:13, color:'#92400e' }}>⚠️ Subject empty hai</div>}
//           {!body&&<div style={{ padding:'10px 14px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, marginBottom:12, fontSize:13, color:'#92400e' }}>⚠️ Body empty hai</div>}
//           {(sending||done)&&(
//             <div style={{ background:'#f9fafb', borderRadius:10, padding:16, marginBottom:16 }}>
//               <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
//                 <span style={{ fontWeight:600 }}>{done?'✅ Complete!':'⏳ Sending...'}</span>
//                 <span style={{ color:'#6b7280' }}>{sent+failed} / {selectedCSV?.total}</span>
//               </div>
//               <div style={{ height:8, background:'#e5e7eb', borderRadius:100 }}>
//                 <div style={{ height:8, borderRadius:100, background:done?'#22c55e':'#3b82f6', width:`${progress}%`, transition:'width 0.3s' }} />
//               </div>
//               <div style={{ display:'flex', gap:16, marginTop:8, fontSize:12 }}>
//                 <span style={{ color:'#16a34a' }}>✓ {sent} sent</span>
//                 {failed>0&&<span style={{ color:'#ef4444' }}>✗ {failed} failed</span>}
//               </div>
//               {errors.length>0&&<div style={{ marginTop:10, maxHeight:100, overflowY:'auto' }}>
//                 {errors.map((e,i)=><div key={i} style={{ fontSize:11, color:'#ef4444', fontFamily:'monospace' }}>✗ {e.email} — {e.error}</div>)}
//               </div>}
//             </div>
//           )}
//           {!sending&&!done&&<button onClick={handleSend} disabled={!selectedCSV||!subject||!body} style={{ ...bPri, opacity:(!selectedCSV||!subject||!body)?0.4:1, cursor:(!selectedCSV||!subject||!body)?'not-allowed':'pointer' }}>Send to {selectedCSV?.total||0} Recipients</button>}
//           {done&&<button onClick={()=>{ setTab('csv'); setDone(false); setSent(0); setFailed(0); setProgress(0); setErrors([]) }} style={bPri}>＋ New Campaign</button>}
//         </div>
//       )}
//     </div>
//   )
// }

// // ─── Styles ───────────────────────────────────────────────────────
// const lS  = { display:'block', fontSize:12, fontWeight:600, color:'#6b7280', marginBottom:6 }
// const iS  = { width:'100%', padding:'10px 14px', fontSize:14, border:'1px solid #d1d5db', borderRadius:8, outline:'none', fontFamily:'inherit' }
// const bPri = { background:'#111827', color:'white', border:'none', borderRadius:8, padding:'10px 20px', fontWeight:600, fontSize:14, cursor:'pointer' }
// const bSec = { background:'white', color:'#374151', border:'1px solid #d1d5db', borderRadius:8, padding:'8px 16px', fontSize:13, cursor:'pointer' }
// const thS  = { padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase' }
// const tdS  = { padding:'10px 12px' }
// const pL   = { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600 }
// const pI   = { width:'100%', padding:'5px 8px', fontSize:12, border:'1px solid #e5e7eb', borderRadius:6, outline:'none', color:'#111827', background:'white' }
// const tbB  = { padding:'2px 6px', fontSize:10, background:'#4b5563', color:'white', border:'none', borderRadius:4, cursor:'pointer' }
// const smBtn = { padding:'4px 10px', fontSize:11, background:'white', color:'#374151', border:'1px solid #e5e7eb', borderRadius:5, cursor:'pointer' }

// export default BulkMailing





































// import React, { useState, useRef, useCallback, memo, useEffect } from 'react'
// import axios from 'axios'
// import { Url } from 'src/url/url'
// import EmailBuilder from './Emailbuilder'

// // ─────────────────────────────────────────────────────────────────
// // UTILS
// // ─────────────────────────────────────────────────────────────────
// let _id = 0
// const uid = () => `b${++_id}`
// const clone = x => JSON.parse(JSON.stringify(x))

// // ─────────────────────────────────────────────────────────────────
// // MAIN BULKMAILING COMPONENT
// // ─────────────────────────────────────────────────────────────────
// const BulkMailing = () => {
//   const [tab, setTab]                       = useState('csv')
//   const [csvFiles, setCsvFiles]             = useState([])
//   const [csvLoading, setCsvLoading]         = useState(false)
//   const [csvUploading, setCsvUploading]     = useState(false)
//   const [selectedCSV, setSelectedCSV]       = useState(null)
//   const [previewLoading, setPreviewLoading] = useState(false)
//   const [subject, setSubject]               = useState('')
//   const [body, setBody]                     = useState('')
//   const [showBuilder, setShowBuilder]       = useState(false)
//   const [attachments, setAttachments]       = useState([])
//   const [attachPreviews, setAttachPreviews] = useState([])
//   const [sending, setSending]               = useState(false)
//   const [progress, setProgress]             = useState(0)
//   const [sent, setSent]                     = useState(0)
//   const [failed, setFailed]                 = useState(0)
//   const [done, setDone]                     = useState(false)
//   const [errors, setErrors]                 = useState([])

//   const csvRef = useRef()
//   const attRef = useRef()

//   useEffect(() => { fetchCSVList() }, [])

//   const fetchCSVList = async () => {
//     setCsvLoading(true)
//     try { const r = await axios.get(`${Url}/api/bulkmail/csv/list`); setCsvFiles(r.data.files||[]) }
//     catch(e){ console.error(e) }
//     setCsvLoading(false)
//   }

//   const handleCSVUpload = async e => {
//     const f = e.target.files[0]; if (!f) return
//     setCsvUploading(true)
//     const fd = new FormData(); fd.append('csv', f)
//     try { await axios.post(`${Url}/api/bulkmail/csv/upload`, fd); await fetchCSVList() }
//     catch(e){ alert(e.response?.data?.message||'Upload failed') }
//     setCsvUploading(false); csvRef.current.value = ''
//   }

//   const handleSelectCSV = async f => {
//     if (selectedCSV?.key===f.key) { setSelectedCSV(null); return }
//     setPreviewLoading(true)
//     try {
//       const r = await axios.get(`${Url}/api/bulkmail/csv/preview`, { params:{ key:f.key } })
//       setSelectedCSV({ key:f.key, originalName:f.originalName, total:r.data.total, preview:r.data.preview })
//     } catch(e){ alert(e.response?.data?.message||'Preview failed') }
//     setPreviewLoading(false)
//   }

//   const handleDeleteCSV = async (key, name) => {
//     if (!window.confirm(`"${name}" delete karna chahte ho?`)) return
//     try { await axios.delete(`${Url}/api/bulkmail/csv/delete`,{data:{key}}); if(selectedCSV?.key===key) setSelectedCSV(null); await fetchCSVList() }
//     catch(e){ alert(e.response?.data?.message||'Delete failed') }
//   }

//   const handleAttachments = e => {
//     const files = Array.from(e.target.files).slice(0, 5-attachments.length)
//     setAttachments(p=>[...p,...files])
//     files.forEach(f=>{
//       if (f.type.startsWith('image/')) {
//         const r=new FileReader()
//         r.onload=ev=>setAttachPreviews(p=>[...p,{type:'image',url:ev.target.result,name:f.name}])
//         r.readAsDataURL(f)
//       } else setAttachPreviews(p=>[...p,{type:'file',name:f.name}])
//     })
//   }

//   const removeAtt = i => {
//     setAttachments(p=>p.filter((_,idx)=>idx!==i))
//     setAttachPreviews(p=>p.filter((_,idx)=>idx!==i))
//   }

//   const handleSend = async () => {
//     if (!subject.trim()) return alert('Subject required!')
//     if (!body.trim())    return alert('Email body required!')
//     if (!selectedCSV)    return alert('Pehle CSV select karo!')
//     const jobId = `job_${Date.now()}`
//     setSending(true); setDone(false); setSent(0); setFailed(0); setErrors([]); setProgress(0)
//     const es = new EventSource(`${Url}/api/bulkmail/progress/${jobId}`)
//     es.onmessage = e => {
//       const d = JSON.parse(e.data)
//       if (d.type==='progress')  { setProgress(Math.round((d.current/d.total)*100)); setSent(d.sent||0); setFailed(d.failed||0) }
//       else if (d.type==='complete') { setProgress(100); setSent(d.sent); setFailed(d.failed); setErrors(d.errors||[]); setSending(false); setDone(true); es.close() }
//       else if (d.type==='error')    { alert(d.message); setSending(false); es.close() }
//     }
//     es.onerror = () => { setSending(false); es.close() }
//     const fd = new FormData()
//     fd.append('subject',subject); fd.append('htmlBody',body); fd.append('jobId',jobId)
//     fd.append('csvKey',selectedCSV.key); fd.append('delayMs','300')
//     attachments.forEach(f=>fd.append('attachments',f))
//     try { await axios.post(`${Url}/api/bulkmail/send`, fd) }
//     catch(e){ alert(e.response?.data?.message||'Send failed'); setSending(false); es.close() }
//   }

//   const handleTestSMTP = async () => {
//     try { const r = await axios.post(`${Url}/api/bulkmail/test`); alert(r.data.message) }
//     catch(e){ alert(e.response?.data?.message||'SMTP failed') }
//   }

//   // ── Attachment mini-panel (reusable in Send tab too) ──
//   const AttachmentPanel = () => (
//     <div>
//       <div onClick={()=>attRef.current.click()}
//         style={{ border:'2px dashed #d1d5db', borderRadius:10, padding:'1rem', textAlign:'center', cursor:'pointer', background:'#f9fafb', marginBottom:10 }}>
//         <div style={{ fontSize:13, fontWeight:600 }}>📎 {attachments.length>0 ? `${attachments.length} file${attachments.length>1?'s':''} attached — click to add more` : 'Click to attach (optional)'}</div>
//         <div style={{ fontSize:11, color:'#9ca3af', marginTop:2 }}>Images, PDFs, docs — max 5 files, 10MB each</div>
//         <input ref={attRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" style={{ display:'none' }} onChange={handleAttachments} />
//       </div>
//       {attachPreviews.length>0 && (
//         <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
//           {attachPreviews.map((p,i)=>(
//             <div key={i} style={{ position:'relative', width:70, height:70 }}>
//               {p.type==='image'
//                 ? <img src={p.url} alt="" style={{ width:70, height:70, objectFit:'cover', borderRadius:7, border:'1px solid #e5e7eb' }} />
//                 : <div style={{ width:70, height:70, borderRadius:7, border:'1px solid #e5e7eb', background:'#f3f4f6', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3 }}>
//                     <span style={{ fontSize:20 }}>📄</span>
//                     <span style={{ fontSize:9, color:'#6b7280', textAlign:'center', padding:'0 3px', wordBreak:'break-all' }}>{p.name.slice(0,10)}</span>
//                   </div>
//               }
//               <button onClick={()=>removeAtt(i)}
//                 style={{ position:'absolute', top:-5, right:-5, background:'#ef4444', color:'white', border:'none', borderRadius:'50%', width:18, height:18, cursor:'pointer', fontSize:10, lineHeight:'18px', textAlign:'center', padding:0 }}>✕</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )

//   return (
//     <div style={{ fontFamily:'sans-serif', maxWidth:1200, margin:'0 auto', padding:'1.5rem' }}>
//       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
//         <h2 style={{ margin:0, fontSize:20, fontWeight:700 }}>📧 Bulk Mailing</h2>
//         <button onClick={handleTestSMTP} style={bSec}>Test SMTP</button>
//       </div>

//       {/* ── TABS ── */}
//       <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb', marginBottom:'1.5rem' }}>
//         {[
//           { key:'csv',     label:'📁 CSV Files' },
//           { key:'compose', label:'✉️ Compose' },
//           { key:'send',    label:'🚀 Send' },
//         ].map(t=>(
//           <button key={t.key} onClick={()=>setTab(t.key)} style={{
//             padding:'10px 20px', background:'none', border:'none',
//             borderBottom:tab===t.key?'2px solid #111':'2px solid transparent',
//             fontWeight:tab===t.key?600:400, cursor:'pointer',
//             color:tab===t.key?'#111':'#6b7280', fontSize:14
//           }}>{t.label}</button>
//         ))}
//       </div>

//       {/* ══ CSV TAB ══ */}
//       {tab==='csv' && (
//         <div>
//           <div onClick={()=>!csvUploading&&csvRef.current.click()}
//             style={{ border:'2px dashed #d1d5db', borderRadius:12, padding:'2rem', textAlign:'center', cursor:csvUploading?'wait':'pointer', background:csvUploading?'#f0fdf4':'#f9fafb', marginBottom:20 }}>
//             <div style={{ fontSize:14, fontWeight:600 }}>{csvUploading?'⏳ Uploading...':'☁️ Click to upload CSV → S3'}</div>
//             <div style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>Required: <code>email</code> | Optional: <code>name</code>, <code>company</code></div>
//             <input ref={csvRef} type="file" accept=".csv" style={{ display:'none' }} onChange={handleCSVUpload} />
//           </div>

//           <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//             <span style={{ fontWeight:600 }}>S3 CSV Files</span>
//             <button onClick={fetchCSVList} style={bSec}>{csvLoading?'...':'↻ Refresh'}</button>
//           </div>

//           {csvLoading
//             ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Loading...</p>
//             : csvFiles.length===0
//               ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Koi CSV nahi</p>
//               : (
//                 <div style={{ border:'1px solid #e5e7eb', borderRadius:10, overflow:'hidden' }}>
//                   <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
//                     <thead><tr style={{ background:'#f9fafb' }}>
//                       <th style={thS}>File</th><th style={thS}>Size</th><th style={thS}>Date</th><th style={thS}>Actions</th>
//                     </tr></thead>
//                     <tbody>
//                       {csvFiles.map(f=>{
//                         const isSel=selectedCSV?.key===f.key
//                         return (
//                           <React.Fragment key={f.key}>
//                             <tr style={{ background:isSel?'#eff6ff':'white', borderTop:'1px solid #f3f4f6' }}>
//                               <td style={tdS}><b>📄 {f.originalName}</b><div style={{ fontSize:11, color:'#9ca3af', fontFamily:'monospace' }}>{f.key}</div></td>
//                               <td style={tdS}>{f.sizeKB} KB</td>
//                               <td style={tdS}>{new Date(f.lastModified).toLocaleDateString()}</td>
//                               <td style={tdS}>
//                                 <div style={{ display:'flex', gap:6 }}>
//                                   <button onClick={()=>handleSelectCSV(f)} disabled={previewLoading}
//                                     style={{ ...bSec, fontSize:12, padding:'5px 12px', background:isSel?'#eff6ff':'white', color:isSel?'#1d4ed8':'#374151', borderColor:isSel?'#93c5fd':'#d1d5db' }}>
//                                     {previewLoading&&!isSel?'...':isSel?'✓ Selected':'Select'}
//                                   </button>
//                                   <button onClick={()=>handleDeleteCSV(f.key,f.originalName)}
//                                     style={{ ...bSec, fontSize:12, padding:'5px 10px', color:'#ef4444', borderColor:'#fca5a5' }}>🗑</button>
//                                 </div>
//                               </td>
//                             </tr>
//                             {isSel&&selectedCSV?.preview&&(
//                               <tr><td colSpan={4} style={{ padding:'0 14px 14px', background:'#f0f9ff' }}>
//                                 <div style={{ fontSize:12, color:'#1d4ed8', fontWeight:600, marginBottom:6 }}>👥 {selectedCSV.total} recipients</div>
//                                 <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
//                                   <thead><tr style={{ background:'#dbeafe' }}>
//                                     <th style={{ ...thS, padding:'5px 10px' }}>Email</th>
//                                     <th style={{ ...thS, padding:'5px 10px' }}>Name</th>
//                                     <th style={{ ...thS, padding:'5px 10px' }}>Company</th>
//                                   </tr></thead>
//                                   <tbody>{selectedCSV.preview.map((r,i)=>(
//                                     <tr key={i} style={{ borderTop:'1px solid #bfdbfe' }}>
//                                       <td style={{ padding:'5px 10px', fontFamily:'monospace', color:'#1d4ed8' }}>{r.email}</td>
//                                       <td style={{ padding:'5px 10px' }}>{r.name||'—'}</td>
//                                       <td style={{ padding:'5px 10px' }}>{r.company||'—'}</td>
//                                     </tr>
//                                   ))}</tbody>
//                                 </table>
//                               </td></tr>
//                             )}
//                           </React.Fragment>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )
//           }

//           <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
//             <button onClick={()=>setTab('compose')} disabled={!selectedCSV}
//               style={{ ...bPri, opacity:!selectedCSV?0.4:1, cursor:!selectedCSV?'not-allowed':'pointer' }}>
//               Next: Compose →
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ══ COMPOSE TAB ══ */}
//       {tab==='compose' && (
//         <div>
//           {selectedCSV && (
//             <div style={{ padding:'8px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, marginBottom:16, fontSize:13, color:'#16a34a' }}>
//               ✅ {selectedCSV.originalName} — {selectedCSV.total} recipients
//             </div>
//           )}

//           <div style={{ marginBottom:16 }}>
//             <label style={lS}>Subject</label>
//             <input value={subject} onChange={e=>setSubject(e.target.value)}
//               placeholder="Subject... {{name}} use kar sakte ho" style={iS} />
//           </div>

//           <div style={{ marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//             <label style={lS}>Message Body</label>
//             <div style={{ display:'flex', border:'1px solid #e5e7eb', borderRadius:8, overflow:'hidden' }}>
//               <button onClick={()=>setShowBuilder(false)}
//                 style={{ padding:'5px 14px', fontSize:12, border:'none', cursor:'pointer', fontWeight:!showBuilder?600:400, background:!showBuilder?'#111827':'white', color:!showBuilder?'white':'#6b7280' }}>
//                 Plain Text
//               </button>
//               <button onClick={()=>setShowBuilder(true)}
//                 style={{ padding:'5px 14px', fontSize:12, border:'none', cursor:'pointer', fontWeight:showBuilder?600:400, background:showBuilder?'#111827':'white', color:showBuilder?'white':'#6b7280' }}>
//                 🎨 Template Builder
//               </button>
//             </div>
//           </div>

//           {!showBuilder && (
//             <div style={{ marginBottom:16 }}>
//               <textarea value={body} onChange={e=>setBody(e.target.value)}
//                 placeholder="Email body... {{name}}, {{company}}, {{email}}" rows={8}
//                 style={{ ...iS, resize:'vertical' }} />
//               <p style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>
//                 Personalize: <code>{'{{name}}'}</code> <code>{'{{company}}'}</code> <code>{'{{email}}'}</code>
//               </p>
//             </div>
//           )}

//           {showBuilder && (
//             <div style={{ marginBottom:16 }}>
//               <EmailBuilder onUseTemplate={html=>{ setBody(html); setShowBuilder(false) }} />
//               {body && (
//                 <div style={{ marginTop:8, padding:'7px 12px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12, color:'#16a34a' }}>
//                   ✅ Template set hai
//                 </div>
//               )}
//             </div>
//           )}

//           <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
//             <button onClick={()=>setTab('csv')} style={bSec}>← Back</button>
//             {/* Direct to Send — no mandatory attachment step */}
//             <button onClick={()=>setTab('send')}
//               disabled={!subject.trim()||!body.trim()}
//               style={{ ...bPri, opacity:(!subject.trim()||!body.trim())?0.4:1, cursor:(!subject.trim()||!body.trim())?'not-allowed':'pointer' }}>
//               Next: Send →
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ══ SEND TAB — attachments optional here ══ */}
//       {tab==='send' && (
//         <div>
//           {/* Summary cards */}
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
//             {[
//               { label:'Recipients', val:selectedCSV?.total||0, color: selectedCSV ? '#16a34a' : '#ef4444' },
//               { label:'Subject',    val:subject||'—',           color: subject ? '#374151' : '#ef4444', small:true },
//               { label:'Body',       val:body?'✓ Ready':'—',     color: body ? '#16a34a' : '#ef4444' },
//               { label:'Attachments',val:attachments.length===0 ? 'None (optional)' : `${attachments.length} file${attachments.length>1?'s':''}`, color:'#64748b', small:true },
//             ].map(s=>(
//               <div key={s.label} style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:10, padding:'12px 14px' }}>
//                 <div style={{ fontSize:s.small?13:20, fontWeight:600, color:s.color, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.val}</div>
//                 <div style={{ fontSize:11, color:'#6b7280', marginTop:3 }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Validation errors */}
//           {!selectedCSV && <div style={{ padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, marginBottom:10, fontSize:13, color:'#dc2626' }}>⚠️ CSV select nahi ki — CSV tab mein jao</div>}
//           {!subject.trim() && <div style={{ padding:'10px 14px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, marginBottom:10, fontSize:13, color:'#92400e' }}>⚠️ Subject empty hai</div>}
//           {!body.trim()    && <div style={{ padding:'10px 14px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, marginBottom:10, fontSize:13, color:'#92400e' }}>⚠️ Email body empty hai</div>}

//           {/* ── OPTIONAL ATTACHMENTS ── */}
//           <div style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:10, padding:'14px 16px', marginBottom:16 }}>
//             <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
//               <div>
//                 <span style={{ fontWeight:600, fontSize:13, color:'#374151' }}>📎 Attachments</span>
//                 <span style={{ fontSize:11, color:'#94a3b8', marginLeft:8 }}>Optional — sirf tab add karo jab chahiye</span>
//               </div>
//               {attachments.length > 0 && (
//                 <button onClick={()=>{ setAttachments([]); setAttachPreviews([]) }}
//                   style={{ fontSize:11, color:'#dc2626', background:'none', border:'none', cursor:'pointer', padding:0 }}>
//                   Clear all
//                 </button>
//               )}
//             </div>
//             <AttachmentPanel />
//           </div>

//           {/* Progress bar */}
//           {(sending||done) && (
//             <div style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:10, padding:16, marginBottom:16 }}>
//               <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
//                 <span style={{ fontWeight:600 }}>{done?'✅ Complete!':'⏳ Sending...'}</span>
//                 <span style={{ color:'#6b7280' }}>{sent+failed} / {selectedCSV?.total}</span>
//               </div>
//               <div style={{ height:8, background:'#e5e7eb', borderRadius:100 }}>
//                 <div style={{ height:8, borderRadius:100, background:done?'#22c55e':'#3b82f6', width:`${progress}%`, transition:'width 0.3s' }} />
//               </div>
//               <div style={{ display:'flex', gap:16, marginTop:8, fontSize:12 }}>
//                 <span style={{ color:'#16a34a' }}>✓ {sent} sent</span>
//                 {failed>0 && <span style={{ color:'#ef4444' }}>✗ {failed} failed</span>}
//               </div>
//               {errors.length>0 && (
//                 <div style={{ marginTop:10, maxHeight:100, overflowY:'auto' }}>
//                   {errors.map((e,i)=><div key={i} style={{ fontSize:11, color:'#ef4444', fontFamily:'monospace' }}>✗ {e.email} — {e.error}</div>)}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Action buttons */}
//           {!sending && !done && (
//             <div style={{ display:'flex', gap:10, alignItems:'center' }}>
//               <button onClick={()=>setTab('compose')} style={bSec}>← Edit</button>
//               <button onClick={handleSend}
//                 disabled={!selectedCSV||!subject.trim()||!body.trim()}
//                 style={{ ...bPri, opacity:(!selectedCSV||!subject.trim()||!body.trim())?0.4:1, cursor:(!selectedCSV||!subject.trim()||!body.trim())?'not-allowed':'pointer', fontSize:15, padding:'12px 32px' }}>
//                 🚀 Send to {selectedCSV?.total||0} Recipients
//               </button>
//             </div>
//           )}

//           {done && (
//             <button onClick={()=>{ setTab('csv'); setDone(false); setSent(0); setFailed(0); setProgress(0); setErrors([]) }}
//               style={bPri}>
//               ＋ New Campaign
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// // ─── Styles ───────────────────────────────────────────────────────
// const lS  = { display:'block', fontSize:12, fontWeight:600, color:'#6b7280', marginBottom:6 }
// const iS  = { width:'100%', padding:'10px 14px', fontSize:14, border:'1px solid #d1d5db', borderRadius:8, outline:'none', fontFamily:'inherit' }
// const bPri = { background:'#111827', color:'white', border:'none', borderRadius:8, padding:'10px 20px', fontWeight:600, fontSize:14, cursor:'pointer' }
// const bSec = { background:'white', color:'#374151', border:'1px solid #d1d5db', borderRadius:8, padding:'8px 16px', fontSize:13, cursor:'pointer' }
// const thS  = { padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase' }
// const tdS  = { padding:'10px 12px' }

// export default BulkMailing


























import React, { useState, useRef, useCallback, memo, useEffect } from 'react'
import axios from 'axios'
import { Url } from 'src/url/url'
import EmailBuilder from './Emailbuilder'

// ─────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────
let _id = 0
const uid = () => `b${++_id}`
const clone = x => JSON.parse(JSON.stringify(x))

// ─────────────────────────────────────────────────────────────────
// MAIN BULKMAILING COMPONENT
// ─────────────────────────────────────────────────────────────────
const BulkMailing = () => {
  const [tab, setTab]                       = useState('csv')
  const [csvFiles, setCsvFiles]             = useState([])
  const [csvLoading, setCsvLoading]         = useState(false)
  const [csvUploading, setCsvUploading]     = useState(false)
  const [selectedCSV, setSelectedCSV]       = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [subject, setSubject]               = useState('')
  const [body, setBody]                     = useState('')
  const [showBuilder, setShowBuilder]       = useState(false)
  const [attachments, setAttachments]       = useState([])
  const [attachPreviews, setAttachPreviews] = useState([])
  const [sending, setSending]               = useState(false)
  const [progress, setProgress]             = useState(0)
  const [sent, setSent]                     = useState(0)
  const [failed, setFailed]                 = useState(0)
  const [done, setDone]                     = useState(false)
  const [errors, setErrors]                 = useState([])

  // Campaign history states
  const [campaigns, setCampaigns]         = useState([])
  const [campaignLoading, setCampaignLoading] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [campaignDetail, setCampaignDetail]   = useState(null)
  const [detailLoading, setDetailLoading]     = useState(false)
  const [campaignFilter, setCampaignFilter]   = useState('all') // all | sent | failed

  const csvRef = useRef()
  const attRef = useRef()

  useEffect(() => { fetchCSVList(); fetchCampaigns() }, [])

  const fetchCSVList = async () => {
    setCsvLoading(true)
    try { const r = await axios.get(`${Url}/api/bulkmail/csv/list`); setCsvFiles(r.data.files||[]) }
    catch(e){ console.error(e) }
    setCsvLoading(false)
  }

  const fetchCampaigns = async () => {
    setCampaignLoading(true)
    try {
      const r = await axios.get(`${Url}/api/bulkmail/campaigns?limit=50`)
      setCampaigns(r.data.campaigns || [])
    } catch(e){ console.error(e) }
    setCampaignLoading(false)
  }

  const fetchCampaignDetail = async (id) => {
    setDetailLoading(true)
    try {
      const r = await axios.get(`${Url}/api/bulkmail/campaigns/${id}`)
      setCampaignDetail(r.data.campaign)
    } catch(e){ console.error(e) }
    setDetailLoading(false)
  }

  const deleteCampaign = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('are you sure to delte this campaign record?')) return
    try {
      await axios.delete(`${Url}/api/bulkmail/campaigns/${id}`)
      setCampaigns(p => p.filter(c => c._id !== id))
      if (selectedCampaign === id) { setSelectedCampaign(null); setCampaignDetail(null) }
    } catch(e){ alert('Delete failed') }
  }

  const handleCSVUpload = async e => {
    const f = e.target.files[0]; if (!f) return
    setCsvUploading(true)
    const fd = new FormData(); fd.append('csv', f)
    try { await axios.post(`${Url}/api/bulkmail/csv/upload`, fd); await fetchCSVList() }
    catch(e){ alert(e.response?.data?.message||'Upload failed') }
    setCsvUploading(false); csvRef.current.value = ''
  }

  const handleSelectCSV = async f => {
    if (selectedCSV?.key===f.key) { setSelectedCSV(null); return }
    setPreviewLoading(true)
    try {
      const r = await axios.get(`${Url}/api/bulkmail/csv/preview`, { params:{ key:f.key } })
      setSelectedCSV({ key:f.key, originalName:f.originalName, total:r.data.total, preview:r.data.preview })
    } catch(e){ alert(e.response?.data?.message||'Preview failed') }
    setPreviewLoading(false)
  }

  const handleDeleteCSV = async (key, name) => {
    if (!window.confirm(`"${name}" are you sure to delete?`)) return
    try { await axios.delete(`${Url}/api/bulkmail/csv/delete`,{data:{key}}); if(selectedCSV?.key===key) setSelectedCSV(null); await fetchCSVList() }
    catch(e){ alert(e.response?.data?.message||'Delete failed') }
  }

  const handleAttachments = e => {
    const files = Array.from(e.target.files).slice(0, 5-attachments.length)
    setAttachments(p=>[...p,...files])
    files.forEach(f=>{
      if (f.type.startsWith('image/')) {
        const r=new FileReader()
        r.onload=ev=>setAttachPreviews(p=>[...p,{type:'image',url:ev.target.result,name:f.name}])
        r.readAsDataURL(f)
      } else setAttachPreviews(p=>[...p,{type:'file',name:f.name}])
    })
  }

  const removeAtt = i => {
    setAttachments(p=>p.filter((_,idx)=>idx!==i))
    setAttachPreviews(p=>p.filter((_,idx)=>idx!==i))
  }

  const handleSend = async () => {
    if (!subject.trim()) return alert('Subject required!')
    if (!body.trim())    return alert('Email body required!')
    if (!selectedCSV)    return alert('Pehle CSV select karo!')
    const jobId = `job_${Date.now()}`
    setSending(true); setDone(false); setSent(0); setFailed(0); setErrors([]); setProgress(0)
    const es = new EventSource(`${Url}/api/bulkmail/progress/${jobId}`)
    es.onmessage = e => {
      const d = JSON.parse(e.data)
      if (d.type==='progress')  { setProgress(Math.round((d.current/d.total)*100)); setSent(d.sent||0); setFailed(d.failed||0) }
      else if (d.type==='complete') { setProgress(100); setSent(d.sent); setFailed(d.failed); setErrors(d.errors||[]); setSending(false); setDone(true); es.close() }
      else if (d.type==='error')    { alert(d.message); setSending(false); es.close() }
    }
    es.onerror = () => { setSending(false); es.close() }
    const fd = new FormData()
    fd.append('subject',subject); fd.append('htmlBody',body); fd.append('jobId',jobId)
    fd.append('csvKey',selectedCSV.key); fd.append('delayMs','300')
    attachments.forEach(f=>fd.append('attachments',f))
    try { await axios.post(`${Url}/api/bulkmail/send`, fd) }
    catch(e){ alert(e.response?.data?.message||'Send failed'); setSending(false); es.close() }
  }

  const handleTestSMTP = async () => {
    try { const r = await axios.post(`${Url}/api/bulkmail/test`); alert(r.data.message) }
    catch(e){ alert(e.response?.data?.message||'SMTP failed') }
  }

  // ── Attachment mini-panel (reusable in Send tab too) ──
  const AttachmentPanel = () => (
    <div>
      <div onClick={()=>attRef.current.click()}
        style={{ border:'2px dashed #d1d5db', borderRadius:10, padding:'1rem', textAlign:'center', cursor:'pointer', background:'#f9fafb', marginBottom:10 }}>
        <div style={{ fontSize:13, fontWeight:600 }}>📎 {attachments.length>0 ? `${attachments.length} file${attachments.length>1?'s':''} attached — click to add more` : 'Click to attach (optional)'}</div>
        <div style={{ fontSize:11, color:'#9ca3af', marginTop:2 }}>Images, PDFs, docs — max 5 files, 10MB each</div>
        <input ref={attRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" style={{ display:'none' }} onChange={handleAttachments} />
      </div>
      {attachPreviews.length>0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {attachPreviews.map((p,i)=>(
            <div key={i} style={{ position:'relative', width:70, height:70 }}>
              {p.type==='image'
                ? <img src={p.url} alt="" style={{ width:70, height:70, objectFit:'cover', borderRadius:7, border:'1px solid #e5e7eb' }} />
                : <div style={{ width:70, height:70, borderRadius:7, border:'1px solid #e5e7eb', background:'#f3f4f6', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3 }}>
                    <span style={{ fontSize:20 }}>📄</span>
                    <span style={{ fontSize:9, color:'#6b7280', textAlign:'center', padding:'0 3px', wordBreak:'break-all' }}>{p.name.slice(0,10)}</span>
                  </div>
              }
              <button onClick={()=>removeAtt(i)}
                style={{ position:'absolute', top:-5, right:-5, background:'#ef4444', color:'white', border:'none', borderRadius:'50%', width:18, height:18, cursor:'pointer', fontSize:10, lineHeight:'18px', textAlign:'center', padding:0 }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div style={{ fontFamily:'sans-serif', maxWidth:1200, margin:'0 auto', padding:'1.5rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700 }}>📧 Bulk Mailing</h2>
        <button onClick={handleTestSMTP} style={bSec}>Test SMTP</button>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb', marginBottom:'1.5rem' }}>
        {[
          { key:'csv',     label:'📁 CSV Files' },
          { key:'compose', label:'→ Compose' },
          { key:'send',    label:'→ Send' },
          { key:'history', label:`→ Campaigns${campaigns.length ? ` (${campaigns.length})` : ''}` },
        ].map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)} style={{
            padding:'10px 20px', background:'none', border:'none',
            borderBottom:tab===t.key?'2px solid #111':'2px solid transparent',
            fontWeight:tab===t.key?600:400, cursor:'pointer',
            color:tab===t.key?'#111':'#6b7280', fontSize:14
          }}>{t.label}</button>
        ))}
      </div>

      {/* ══ CSV TAB ══ */}
      {tab==='csv' && (
        <div>
          <div onClick={()=>!csvUploading&&csvRef.current.click()}
            style={{ border:'2px dashed #d1d5db', borderRadius:12, padding:'2rem', textAlign:'center', cursor:csvUploading?'wait':'pointer', background:csvUploading?'#f0fdf4':'#f9fafb', marginBottom:20 }}>
            <div style={{ fontSize:14, fontWeight:600 }}>{csvUploading?'⏳ Uploading...':'☁️ Click to upload CSV → S3'}</div>
            <div style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>Required: <code>email</code> | Optional: <code>name</code>, <code>company</code></div>
            <input ref={csvRef} type="file" accept=".csv" style={{ display:'none' }} onChange={handleCSVUpload} />
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontWeight:600 }}>S3 CSV Files</span>
            <button onClick={fetchCSVList} style={bSec}>{csvLoading?'...':'↻ Refresh'}</button>
          </div>

          {csvLoading
            ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Loading...</p>
            : csvFiles.length===0
              ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Koi CSV nahi</p>
              : (
                <div style={{ border:'1px solid #e5e7eb', borderRadius:10, overflow:'hidden' }}>
                  <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                    <thead><tr style={{ background:'#f9fafb' }}>
                      <th style={thS}>File</th><th style={thS}>Size</th><th style={thS}>Date</th><th style={thS}>Actions</th>
                    </tr></thead>
                    <tbody>
                      {csvFiles.map(f=>{
                        const isSel=selectedCSV?.key===f.key
                        return (
                          <React.Fragment key={f.key}>
                            <tr style={{ background:isSel?'#eff6ff':'white', borderTop:'1px solid #f3f4f6' }}>
                              <td style={tdS}><b>📄 {f.originalName}</b><div style={{ fontSize:11, color:'#9ca3af', fontFamily:'monospace' }}>{f.key}</div></td>
                              <td style={tdS}>{f.sizeKB} KB</td>
                              <td style={tdS}>{new Date(f.lastModified).toLocaleDateString()}</td>
                              <td style={tdS}>
                                <div style={{ display:'flex', gap:6 }}>
                                  <button onClick={()=>handleSelectCSV(f)} disabled={previewLoading}
                                    style={{ ...bSec, fontSize:12, padding:'5px 12px', background:isSel?'#eff6ff':'white', color:isSel?'#1d4ed8':'#374151', borderColor:isSel?'#93c5fd':'#d1d5db' }}>
                                    {previewLoading&&!isSel?'...':isSel?'✓ Selected':'Select'}
                                  </button>
                                  <button onClick={()=>handleDeleteCSV(f.key,f.originalName)}
                                    style={{ ...bSec, fontSize:12, padding:'5px 10px', color:'#ef4444', borderColor:'#fca5a5' }}>🗑</button>
                                </div>
                              </td>
                            </tr>
                            {isSel&&selectedCSV?.preview&&(
                              <tr><td colSpan={4} style={{ padding:'0 14px 14px', background:'#f0f9ff' }}>
                                <div style={{ fontSize:12, color:'#1d4ed8', fontWeight:600, marginBottom:6 }}>👥 {selectedCSV.total} recipients</div>
                                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                                  <thead><tr style={{ background:'#dbeafe' }}>
                                    <th style={{ ...thS, padding:'5px 10px' }}>Email</th>
                                    <th style={{ ...thS, padding:'5px 10px' }}>Name</th>
                                    <th style={{ ...thS, padding:'5px 10px' }}>Company</th>
                                  </tr></thead>
                                  <tbody>{selectedCSV.preview.map((r,i)=>(
                                    <tr key={i} style={{ borderTop:'1px solid #bfdbfe' }}>
                                      <td style={{ padding:'5px 10px', fontFamily:'monospace', color:'#1d4ed8' }}>{r.email}</td>
                                      <td style={{ padding:'5px 10px' }}>{r.name||'—'}</td>
                                      <td style={{ padding:'5px 10px' }}>{r.company||'—'}</td>
                                    </tr>
                                  ))}</tbody>
                                </table>
                              </td></tr>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
          }

          <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
            <button onClick={()=>setTab('compose')} disabled={!selectedCSV}
              style={{ ...bPri, opacity:!selectedCSV?0.4:1, cursor:!selectedCSV?'not-allowed':'pointer' }}>
              Next: Compose →
            </button>
          </div>
        </div>
      )}

      {/* ══ COMPOSE TAB ══ */}
      {tab==='compose' && (
        <div>
          {selectedCSV && (
            <div style={{ padding:'8px 14px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, marginBottom:16, fontSize:13, color:'#16a34a' }}>
              ✅ {selectedCSV.originalName} — {selectedCSV.total} recipients
            </div>
          )}

          <div style={{ marginBottom:16 }}>
            <label style={lS}>Subject</label>
            <input value={subject} onChange={e=>setSubject(e.target.value)}
              placeholder="Subject... {{name}} use kar sakte ho" style={iS} />
          </div>

          <div style={{ marginBottom:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <label style={lS}>Message Body</label>
            <div style={{ display:'flex', border:'1px solid #e5e7eb', borderRadius:8, overflow:'hidden' }}>
              <button onClick={()=>setShowBuilder(false)}
                style={{ padding:'5px 14px', fontSize:12, border:'none', cursor:'pointer', fontWeight:!showBuilder?600:400, background:!showBuilder?'#111827':'white', color:!showBuilder?'white':'#6b7280' }}>
                Plain Text
              </button>
              <button onClick={()=>setShowBuilder(true)}
                style={{ padding:'5px 14px', fontSize:12, border:'none', cursor:'pointer', fontWeight:showBuilder?600:400, background:showBuilder?'#111827':'white', color:showBuilder?'white':'#6b7280' }}>
                 Template Builder
              </button>
            </div>
          </div>

          {!showBuilder && (
            <div style={{ marginBottom:16 }}>
              <textarea value={body} onChange={e=>setBody(e.target.value)}
                placeholder="Email body... {{name}}, {{company}}, {{email}}" rows={8}
                style={{ ...iS, resize:'vertical' }} />
              <p style={{ fontSize:12, color:'#9ca3af', marginTop:4 }}>
                Personalize: <code>{'{{name}}'}</code> <code>{'{{company}}'}</code> <code>{'{{email}}'}</code>
              </p>
            </div>
          )}

          {showBuilder && (
            <div style={{ marginBottom:16 }}>
              <EmailBuilder onUseTemplate={html=>{ setBody(html); setShowBuilder(false) }} />
              {body && (
                <div style={{ marginTop:8, padding:'7px 12px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, fontSize:12, color:'#16a34a' }}>
                  ✅ Template set hai
                </div>
              )}
            </div>
          )}

          <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
            <button onClick={()=>setTab('csv')} style={bSec}>← Back</button>
            {/* Direct to Send — no mandatory attachment step */}
            <button onClick={()=>setTab('send')}
              disabled={!subject.trim()||!body.trim()}
              style={{ ...bPri, opacity:(!subject.trim()||!body.trim())?0.4:1, cursor:(!subject.trim()||!body.trim())?'not-allowed':'pointer' }}>
              Next: Send →
            </button>
          </div>
        </div>
      )}

      {/* ══ SEND TAB — attachments optional here ══ */}
      {tab==='send' && (
        <div>
          {/* Summary cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
            {[
              { label:'Recipients', val:selectedCSV?.total||0, color: selectedCSV ? '#16a34a' : '#ef4444' },
              { label:'Subject',    val:subject||'—',           color: subject ? '#374151' : '#ef4444', small:true },
              { label:'Body',       val:body?'✓ Ready':'—',     color: body ? '#16a34a' : '#ef4444' },
              { label:'Attachments',val:attachments.length===0 ? 'None (optional)' : `${attachments.length} file${attachments.length>1?'s':''}`, color:'#64748b', small:true },
            ].map(s=>(
              <div key={s.label} style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:10, padding:'12px 14px' }}>
                <div style={{ fontSize:s.small?13:20, fontWeight:600, color:s.color, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.val}</div>
                <div style={{ fontSize:11, color:'#6b7280', marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Validation errors */}
          {!selectedCSV && <div style={{ padding:'10px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, marginBottom:10, fontSize:13, color:'#dc2626' }}>⚠️ CSV select nahi ki — CSV tab mein jao</div>}
          {!subject.trim() && <div style={{ padding:'10px 14px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, marginBottom:10, fontSize:13, color:'#92400e' }}>⚠️ Subject empty hai</div>}
          {!body.trim()    && <div style={{ padding:'10px 14px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, marginBottom:10, fontSize:13, color:'#92400e' }}>⚠️ Email body empty hai</div>}

          {/* ── OPTIONAL ATTACHMENTS ── */}
          <div style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:10, padding:'14px 16px', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <div>
                <span style={{ fontWeight:600, fontSize:13, color:'#374151' }}>📎 Attachments</span>
                <span style={{ fontSize:11, color:'#94a3b8', marginLeft:8 }}>Optional — sirf tab add karo jab chahiye</span>
              </div>
              {attachments.length > 0 && (
                <button onClick={()=>{ setAttachments([]); setAttachPreviews([]) }}
                  style={{ fontSize:11, color:'#dc2626', background:'none', border:'none', cursor:'pointer', padding:0 }}>
                  Clear all
                </button>
              )}
            </div>
            <AttachmentPanel />
          </div>

          {/* Progress bar */}
          {(sending||done) && (
            <div style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:10, padding:16, marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
                <span style={{ fontWeight:600 }}>{done?'✅ Complete!':'⏳ Sending...'}</span>
                <span style={{ color:'#6b7280' }}>{sent+failed} / {selectedCSV?.total}</span>
              </div>
              <div style={{ height:8, background:'#e5e7eb', borderRadius:100 }}>
                <div style={{ height:8, borderRadius:100, background:done?'#22c55e':'#3b82f6', width:`${progress}%`, transition:'width 0.3s' }} />
              </div>
              <div style={{ display:'flex', gap:16, marginTop:8, fontSize:12 }}>
                <span style={{ color:'#16a34a' }}>✓ {sent} sent</span>
                {failed>0 && <span style={{ color:'#ef4444' }}>✗ {failed} failed</span>}
              </div>
              {errors.length>0 && (
                <div style={{ marginTop:10, maxHeight:100, overflowY:'auto' }}>
                  {errors.map((e,i)=><div key={i} style={{ fontSize:11, color:'#ef4444', fontFamily:'monospace' }}>✗ {e.email} — {e.error}</div>)}
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          {!sending && !done && (
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <button onClick={()=>setTab('compose')} style={bSec}>← Edit</button>
              <button onClick={handleSend}
                disabled={!selectedCSV||!subject.trim()||!body.trim()}
                style={{ ...bPri, opacity:(!selectedCSV||!subject.trim()||!body.trim())?0.4:1, cursor:(!selectedCSV||!subject.trim()||!body.trim())?'not-allowed':'pointer', fontSize:15, padding:'12px 32px' }}>
                 Send to {selectedCSV?.total||0} Recipients
              </button>
            </div>
          )}

          {done && (
            <button onClick={()=>{ setTab('csv'); setDone(false); setSent(0); setFailed(0); setProgress(0); setErrors([]) }}
              style={bPri}>
              ＋ New Campaign
            </button>
          )}
        </div>
      )}
      {/* ══ HISTORY TAB ══ */}
      {tab==='history' && (
        <div style={{ display:'grid', gridTemplateColumns: selectedCampaign ? '340px 1fr' : '1fr', gap:16, alignItems:'start' }}>

          {/* Left — campaign list */}
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <span style={{ fontWeight:700, fontSize:15 }}>Campaign History</span>
              <button onClick={fetchCampaigns} style={bSec}>{campaignLoading?'...':'↻ Refresh'}</button>
            </div>

            {/* Filter pills */}
            <div style={{ display:'flex', gap:6, marginBottom:12 }}>
              {[['all','All'],['sent','✓ Sent'],['failed','✗ Failed']].map(([k,l])=>(
                <button key={k} onClick={()=>setCampaignFilter(k)}
                  style={{ padding:'4px 12px', fontSize:12, borderRadius:20, cursor:'pointer', border:'1px solid #e5e7eb',
                    background: campaignFilter===k ? '#111827' : 'white',
                    color: campaignFilter===k ? 'white' : '#374151',
                    fontWeight: campaignFilter===k ? 600 : 400 }}>
                  {l}
                </button>
              ))}
            </div>

            {campaignLoading
              ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem' }}>Loading...</p>
              : campaigns.length===0
                ? <div style={{ textAlign:'center', padding:'3rem 1rem', color:'#9ca3af' }}>
                    <div style={{ fontSize:32, marginBottom:8 }}></div>
                    <div>Koi campaign nahi abhi tak</div>
                    <div style={{ fontSize:12, marginTop:4 }}>Send tab se email bhejo</div>
                  </div>
                : campaigns
                    .filter(c => {
                      if (campaignFilter === 'sent')   return c.sentCount > 0
                      if (campaignFilter === 'failed') return c.failedCount > 0
                      return true
                    })
                    .map(c => {
                      const isSelected = selectedCampaign === c._id
                      const successRate = c.totalCount ? Math.round((c.sentCount/c.totalCount)*100) : 0
                      const statusColor = c.status==='completed' ? '#16a34a' : c.status==='failed' ? '#dc2626' : '#d97706'
                      return (
                        <div key={c._id}
                          onClick={()=>{ setSelectedCampaign(isSelected?null:c._id); if(!isSelected){ fetchCampaignDetail(c._id) } else { setCampaignDetail(null) } }}
                          style={{ border:`1px solid ${isSelected?'#93c5fd':'#e5e7eb'}`, borderRadius:10, padding:'12px 14px', marginBottom:8, cursor:'pointer',
                            background: isSelected ? '#eff6ff' : 'white', transition:'all 0.15s' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                            <div style={{ fontWeight:600, fontSize:13, color:'#111827', flex:1, marginRight:8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                              {c.subject}
                            </div>
                            <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                              <span style={{ fontSize:11, fontWeight:600, color:statusColor, background: statusColor+'15', padding:'2px 8px', borderRadius:10 }}>
                                {c.status}
                              </span>
                              <button onClick={e=>deleteCampaign(c._id,e)}
                                style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:5, cursor:'pointer' }}>
                                🗑
                              </button>
                            </div>
                          </div>
                          <div style={{ fontSize:11, color:'#6b7280', marginBottom:6 }}>
                            {new Date(c.createdAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}
                            {c.csvName && <span style={{ marginLeft:8 }}>📄 {c.csvName}</span>}
                          </div>
                          {/* Mini stats bar */}
                          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                            <div style={{ flex:1, height:5, background:'#e5e7eb', borderRadius:10, overflow:'hidden' }}>
                              <div style={{ height:5, background:'#22c55e', width:`${successRate}%`, borderRadius:10 }} />
                            </div>
                            <span style={{ fontSize:11, color:'#16a34a', fontWeight:600 }}>✓ {c.sentCount}</span>
                            {c.failedCount > 0 && <span style={{ fontSize:11, color:'#ef4444', fontWeight:600 }}>✗ {c.failedCount}</span>}
                            <span style={{ fontSize:11, color:'#9ca3af' }}>/ {c.totalCount}</span>
                          </div>
                        </div>
                      )
                    })
            }
          </div>

          {/* Right — campaign detail */}
          {selectedCampaign && (
            <div style={{ border:'1px solid #e5e7eb', borderRadius:12, overflow:'hidden', background:'white' }}>
              {detailLoading
                ? <div style={{ padding:'3rem', textAlign:'center', color:'#9ca3af' }}>Loading detail...</div>
                : campaignDetail && (
                  <>
                    {/* Detail header */}
                    <div style={{ padding:'14px 16px', background:'white', borderBottom:'1px solid #e5e7eb' }}>
                      <div style={{ fontWeight:700, fontSize:14, color:'#111827', marginBottom:4 }}>{campaignDetail.subject}</div>
                      <div style={{ display:'flex', gap:16, fontSize:12, color:'#6b7280' }}>
                        <span>Date : {new Date(campaignDetail.startedAt).toLocaleString('en-IN')}</span>
                        {campaignDetail.csvName && <span>File Name : {campaignDetail.csvName}</span>}
                      </div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:'1px solid white' }}>
                      {[
                        { label:'Total Sent', val:campaignDetail.sentCount, color:'#16a34a', bg:'#f0fdf4' },
                        { label:'Failed',     val:campaignDetail.failedCount, color:'#dc2626', bg:'#fef2f2' },
                        { label:'Total',      val:campaignDetail.totalCount,  color:'#374151', bg:'#f9fafb' },
                      ].map(s=>(
                        <div key={s.label} style={{ padding:'14px 16px', background:s.bg, textAlign:'center' }}>
                          <div style={{ fontSize:22, fontWeight:700, color:s.color }}>{s.val}</div>
                          <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Results table */}
                    {campaignDetail.results?.length > 0 && (
                      <div style={{ maxHeight:420, overflowY:'auto' }}>
                        {/* Filter tabs */}
                        <div style={{ padding:'8px 12px', borderBottom:'1px solid #f3f4f6', display:'flex', gap:6 }}>
                          {['All','Sent ✓','Failed ✗'].map((l,i)=>{
                            const filters = [null, 'sent', 'failed']
                            const [fTab, setFTab] = [null, null] // handled via state below
                            return null // placeholder
                          })}
                          <span style={{ fontSize:11, color:'#6b7280', alignSelf:'center' }}>
                            {campaignDetail.results.length} records
                          </span>
                        </div>
                        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                          <thead>
                            <tr style={{ background:'#f9fafb', position:'sticky', top:0 }}>
                              <th style={{ ...thS, padding:'8px 12px' }}>Status</th>
                              <th style={{ ...thS, padding:'8px 12px' }}>Email</th>
                              <th style={{ ...thS, padding:'8px 12px' }}>Name</th>
                              <th style={{ ...thS, padding:'8px 12px' }}>Error</th>
                            </tr>
                          </thead>
                          <tbody>
                            {campaignDetail.results.map((r,i)=>(
                              <tr key={i} style={{ borderTop:'1px solid #f3f4f6', background: r.status==='failed'?'#fff8f8':'white' }}>
                                <td style={{ padding:'7px 12px' }}>
                                  <span style={{ fontSize:11, fontWeight:600, padding:'2px 7px', borderRadius:8,
                                    background: r.status==='sent'?'#f0fdf4':'#fef2f2',
                                    color: r.status==='sent'?'#16a34a':'#dc2626' }}>
                                    {r.status==='sent' ? '✓ Sent' : '✗ Failed'}
                                  </span>
                                </td>
                                <td style={{ padding:'7px 12px', fontFamily:'monospace', color:'#1d4ed8', fontSize:11 }}>{r.email}</td>
                                <td style={{ padding:'7px 12px', color:'#374151' }}>{r.name || '—'}</td>
                                <td style={{ padding:'7px 12px', color:'#ef4444', fontSize:11, maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}
                                  title={r.error}>
                                  {r.error || '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )
              }
            </div>
          )}
        </div>
      )}

    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────
const lS  = { display:'block', fontSize:12, fontWeight:600, color:'#6b7280', marginBottom:6 }
const iS  = { width:'100%', padding:'10px 14px', fontSize:14, border:'1px solid #d1d5db', borderRadius:8, outline:'none', fontFamily:'inherit' }
const bPri = { background:'#111827', color:'white', border:'none', borderRadius:8, padding:'10px 20px', fontWeight:600, fontSize:14, cursor:'pointer' }
const bSec = { background:'white', color:'#374151', border:'1px solid #d1d5db', borderRadius:8, padding:'8px 16px', fontSize:13, cursor:'pointer' }
const thS  = { padding:'10px 12px', textAlign:'left', fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase' }
const tdS  = { padding:'10px 12px' }

export default BulkMailing