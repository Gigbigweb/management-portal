// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb',Twitter:'Tw',Instagram:'In',LinkedIn:'Li',YouTube:'Yt',Pinterest:'Pi',TikTok:'Tk',WhatsApp:'Wa',GitHub:'Gh',Telegram:'Tg' }
// const SOCIAL_COLORS = { Facebook:'#1877f2',Twitter:'#1da1f2',Instagram:'#e1306c',LinkedIn:'#0a66c2',YouTube:'#ff0000',Pinterest:'#e60023',TikTok:'#010101',WhatsApp:'#25d366',GitHub:'#24292e',Telegram:'#2ca5e0' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2'},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2'},{id:newId(),name:'Instagram',url:'#',color:'#e1306c'},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2'}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const sz = parseInt(p.iconSize||36)
//     const icons = (p.links||[]).map(l=>{
//       const abbr = SOCIAL_ABBR[l.name]||l.name.slice(0,2)
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${Math.floor(parseInt(p.gap||12)/2)}px;text-decoration:none"><div style="width:${sz}px;height:${sz}px;background:${l.color||'#666'};border-radius:50%;text-align:center;line-height:${sz}px"><span style="color:#fff;font-size:${Math.round(sz*.38)}px;font-weight:700;font-family:Arial">${abbr}</span></div></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <TextareaField label="HTML Body  ({{name}}, {{company}}, {{email}} work)" value={p.html} onChange={v=>u('html',v)} rows={6} placeholder="<b>Hello</b> {{name}}..." />
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Main Text" value={p.mainText} onChange={v=>u('mainText',v)} />
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const links = p.links||[]
//   const add = () => u('links',[...links,{id:newId(),name:'Facebook',url:'#',color:'#1877f2'}])
//   const del = id => u('links',links.filter(l=>l.id!==id))
//   const upd = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))

//   return <>
//     <Section title="Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Icon Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)"       value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//     <Section title="Social Links" />
//     <button onClick={add} style={{ width:'100%', padding:'6px', background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, marginBottom:8 }}>+ Add Social Link</button>
//     {links.map(l=>(
//       <div key={l.id} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:7, padding:'8px 10px', marginBottom:6 }}>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{l.name}</span>
//           <button onClick={()=>del(l.id)} style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕ Remove</button>
//         </div>
//         <SelectField label="Platform" value={l.name} onChange={v=>{ upd(l.id,'name',v); upd(l.id,'color',SOCIAL_COLORS[v]||'#666') }} options={Object.keys(SOCIAL_ABBR).map(k=>[k,k])} />
//         <Field label="URL" value={l.url} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." />
//         <ColorField label="Icon Color" value={l.color} onChange={v=>upd(l.id,'color',v)} />
//       </div>
//     ))}
//     <Section title="Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <TextareaField label="Main Text" value={p.mainText} onChange={v=>u('mainText',v)} rows={3} />
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'grid', gridTemplateColumns:'200px 1fr 280px', height:680, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ LEFT: Block palette ══ */}
//       <div style={{ background:'#f8fafc', borderRight:'1px solid #e2e8f0', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ padding:'12px 12px 6px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em' }}>
//           {colCtx ? `Adding to Column ${colCtx.colIdx+1}` : 'Add Blocks'}
//         </div>
//         <div style={{ overflowY:'auto', flex:1, padding:'4px 8px 8px' }}>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label, desc })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ width:'100%', padding:'8px 10px', marginBottom:3, background:'white', border:'1px solid #e2e8f0', borderRadius:8, cursor:'pointer', textAlign:'left', display:'block' }}
//               onMouseEnter={e=>e.currentTarget.style.background='#eff6ff'}
//               onMouseLeave={e=>e.currentTarget.style.background='white'}>
//               <div style={{ display:'flex', alignItems:'center', gap:8 }}>
//                 <span style={{ fontSize:14, color:'#64748b', width:18, textAlign:'center' }}>{icon}</span>
//                 <div>
//                   <div style={{ fontSize:12, fontWeight:600, color:'#1e293b' }}>{label}</div>
//                   <div style={{ fontSize:10, color:'#94a3b8' }}>{desc}</div>
//                 </div>
//               </div>
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ width:'100%', padding:'7px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:11, color:'#dc2626', fontWeight:600, marginTop:4 }}>
//               ✕ Cancel — back to main
//             </button>
//           )}
//         </div>

//         {/* Email global settings */}
//         <div style={{ borderTop:'1px solid #e2e8f0', padding:'10px 12px' }}>
//           <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', marginBottom:8 }}>Email Settings</div>
//           <div style={{ marginBottom:8 }}>
//             <span style={s.label}>Background Color</span>
//             <div style={{ display:'flex', gap:5 }}>
//               <StableColor value={emailBg} onChange={setEmailBg} />
//               <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, flex:1 }} />
//             </div>
//           </div>
//           <div style={{ marginBottom:12 }}>
//             <span style={s.label}>Email Width</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={s.select}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//             disabled={!blocks.length}
//             style={{ width:'100%', padding:'10px', background:blocks.length?'#0f172a':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:8, cursor:blocks.length?'pointer':'not-allowed', fontSize:13, fontWeight:700 }}>
//             ✓ Apply Template
//           </button>
//         </div>
//       </div>

//       {/* ══ CENTER: Canvas ══ */}
//       <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ background:'white', borderBottom:'1px solid #e2e8f0', padding:'7px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <span style={{ fontSize:12, color:'#64748b' }}>{blocks.length} block{blocks.length!==1?'s':''}{colCtx?` — adding to col ${colCtx.colIdx+1}`:''}</span>
//           <div style={{ display:'flex', gap:5 }}>
//             {[['edit','Edit',false],['preview','Preview',true]].map(([k,l,v])=>(
//               <button key={k} onClick={()=>setPreview(v)} style={{ padding:'4px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?600:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//           </div>
//         </div>

//         <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//           <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//             {blocks.length===0 && !preview && (
//               <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                 <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                 <div style={{ fontSize:14, fontWeight:500 }}>Left panel se blocks add karo</div>
//                 <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer — sab drag-like sequence mein</div>
//               </div>
//             )}

//             {blocks.map(b=>{
//               const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//               const toolbar = (id, colCtx=null) => !preview && (
//                 <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                   <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                   <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                   {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                   <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                 </div>
//               )

//               if (b.type==='columns') {
//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px dashed transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                       <tbody><tr>
//                         {(b.props.cols||[]).map((col,ci)=>{
//                           const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                           return (
//                             <td key={col.id} width={col.width+'%'} valign="top"
//                               style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                               {(col.blocks||[]).map(ib=>{
//                                 const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                 return (
//                                   <div key={ib.id}
//                                     onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                     style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                     <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                       {!preview&&<><button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                       <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                       <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}} style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button></>}
//                                     </div>
//                                     <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                   </div>
//                                 )
//                               })}
//                               {!preview&&(
//                                 <button
//                                   onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                   style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                   + Add to Col {ci+1}
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
//                   onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                   style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                   {toolbar(b.id)}
//                   <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ══ RIGHT: Properties ══ */}
//       <div style={{ background:'#f8fafc', borderLeft:'1px solid #e2e8f0', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0' }}>
//           {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//         </div>
//         <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 16px' }}>
//           {renderProps()}
//         </div>
//       </div>
//     </div>
//   )
// }

// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }






























// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // RICH TEXT EDITOR — proper WYSIWYG, no BR tags needed
// // Uses contentEditable with execCommand for formatting
// // ─────────────────────────────────────────────────────────────────
// const RichEditor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   const isFocused = useRef(false)

//   // Sync value only when not focused
//   useEffect(() => {
//     if (ref.current && !isFocused.current) {
//       ref.current.innerHTML = value || ''
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.innerHTML = value || ''
//   }, []) // mount only

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     // fire onChange after command
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = (v) => {
//     exec('insertText', v)
//   }

//   const tools = [
//     { label:'B',  title:'Bold',          cmd:()=>exec('bold'),          style:{ fontWeight:700 } },
//     { label:'I',  title:'Italic',        cmd:()=>exec('italic'),        style:{ fontStyle:'italic' } },
//     { label:'U',  title:'Underline',     cmd:()=>exec('underline'),     style:{ textDecoration:'underline' } },
//     { label:'S',  title:'Strikethrough', cmd:()=>exec('strikeThrough'), style:{ textDecoration:'line-through' } },
//     { label:'——', title:'Separator',     cmd:null },
//     { label:'≡',  title:'Align Left',   cmd:()=>exec('justifyLeft') },
//     { label:'≡̈',  title:'Align Center', cmd:()=>exec('justifyCenter') },
//     { label:'≡→', title:'Align Right',  cmd:()=>exec('justifyRight') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'• list', title:'Bullet List',  cmd:()=>exec('insertUnorderedList') },
//     { label:'1. list', title:'Number List', cmd:()=>exec('insertOrderedList') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'🔗', title:'Insert Link',   cmd:insertLink },
//     { label:'✕🔗', title:'Remove Link',  cmd:()=>exec('unlink') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'H1', title:'Heading 1',    cmd:()=>exec('formatBlock','h1') },
//     { label:'H2', title:'Heading 2',    cmd:()=>exec('formatBlock','h2') },
//     { label:'P',  title:'Paragraph',    cmd:()=>exec('formatBlock','p') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'Clr', title:'Clear Format', cmd:()=>exec('removeFormat') },
//   ]

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white' }}>
//       {/* Toolbar */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'4px 6px', display:'flex', flexWrap:'wrap', gap:2, alignItems:'center' }}>
//         {tools.map((t,i) => {
//           if (t.label==='——') return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 2px' }} />
//           return (
//             <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//               style={{ padding:'3px 6px', fontSize:11, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24, ...(t.style||{}) }}
//               onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//               onMouseLeave={e=>e.currentTarget.style.background='none'}>
//               {t.label}
//             </button>
//           )
//         })}
//       </div>

//       {/* Personalization chips */}
//       <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'3px 8px', display:'flex', gap:4, alignItems:'center', flexWrap:'wrap' }}>
//         <span style={{ fontSize:10, color:'#3b82f6', fontWeight:600 }}>Insert:</span>
//         {['{{name}}','{{company}}','{{email}}'].map(v=>(
//           <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//             style={{ padding:'2px 7px', fontSize:10, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:600 }}>
//             {v}
//           </button>
//         ))}
//       </div>

//       {/* Editable area */}
//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onFocus={()=>{ isFocused.current=true }}
//         onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//         onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//         style={{ minHeight:140, padding:'10px 12px', fontSize:14, color:'#374151', lineHeight:1.7, outline:'none', fontFamily:'inherit' }}
//       />
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb',Twitter:'Tw',Instagram:'In',LinkedIn:'Li',YouTube:'Yt',Pinterest:'Pi',TikTok:'Tk',WhatsApp:'Wa',GitHub:'Gh',Telegram:'Tg' }
// const SOCIAL_COLORS = { Facebook:'#1877f2',Twitter:'#1da1f2',Instagram:'#e1306c',LinkedIn:'#0a66c2',YouTube:'#ff0000',Pinterest:'#e60023',TikTok:'#010101',WhatsApp:'#25d366',GitHub:'#24292e',Telegram:'#2ca5e0' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2'},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2'},{id:newId(),name:'Instagram',url:'#',color:'#e1306c'},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2'}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const sz = parseInt(p.iconSize||36)
//     const icons = (p.links||[]).map(l=>{
//       const abbr = SOCIAL_ABBR[l.name]||l.name.slice(0,2)
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${Math.floor(parseInt(p.gap||12)/2)}px;text-decoration:none"><div style="width:${sz}px;height:${sz}px;background:${l.color||'#666'};border-radius:50%;text-align:center;line-height:${sz}px"><span style="color:#fff;font-size:${Math.round(sz*.38)}px;font-weight:700;font-family:Arial">${abbr}</span></div></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditor value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const links = p.links||[]
//   const add = () => u('links',[...links,{id:newId(),name:'Facebook',url:'#',color:'#1877f2'}])
//   const del = id => u('links',links.filter(l=>l.id!==id))
//   const upd = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))

//   return <>
//     <Section title="Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Icon Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)"       value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//     <Section title="Social Links" />
//     <button onClick={add} style={{ width:'100%', padding:'6px', background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, marginBottom:8 }}>+ Add Social Link</button>
//     {links.map(l=>(
//       <div key={l.id} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:7, padding:'8px 10px', marginBottom:6 }}>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{l.name}</span>
//           <button onClick={()=>del(l.id)} style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕ Remove</button>
//         </div>
//         <SelectField label="Platform" value={l.name} onChange={v=>{ upd(l.id,'name',v); upd(l.id,'color',SOCIAL_COLORS[v]||'#666') }} options={Object.keys(SOCIAL_ABBR).map(k=>[k,k])} />
//         <Field label="URL" value={l.url} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." />
//         <ColorField label="Icon Color" value={l.color} onChange={v=>upd(l.id,'color',v)} />
//       </div>
//     ))}
//     <Section title="Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'grid', gridTemplateColumns:'200px 1fr 280px', height:680, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ LEFT: Block palette ══ */}
//       <div style={{ background:'#f8fafc', borderRight:'1px solid #e2e8f0', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ padding:'12px 12px 6px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em' }}>
//           {colCtx ? `Adding to Column ${colCtx.colIdx+1}` : 'Add Blocks'}
//         </div>
//         <div style={{ overflowY:'auto', flex:1, padding:'4px 8px 8px' }}>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label, desc })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ width:'100%', padding:'8px 10px', marginBottom:3, background:'white', border:'1px solid #e2e8f0', borderRadius:8, cursor:'pointer', textAlign:'left', display:'block' }}
//               onMouseEnter={e=>e.currentTarget.style.background='#eff6ff'}
//               onMouseLeave={e=>e.currentTarget.style.background='white'}>
//               <div style={{ display:'flex', alignItems:'center', gap:8 }}>
//                 <span style={{ fontSize:14, color:'#64748b', width:18, textAlign:'center' }}>{icon}</span>
//                 <div>
//                   <div style={{ fontSize:12, fontWeight:600, color:'#1e293b' }}>{label}</div>
//                   <div style={{ fontSize:10, color:'#94a3b8' }}>{desc}</div>
//                 </div>
//               </div>
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ width:'100%', padding:'7px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:11, color:'#dc2626', fontWeight:600, marginTop:4 }}>
//               ✕ Cancel — back to main
//             </button>
//           )}
//         </div>

//         {/* Email global settings */}
//         <div style={{ borderTop:'1px solid #e2e8f0', padding:'10px 12px' }}>
//           <div style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', marginBottom:8 }}>Email Settings</div>
//           <div style={{ marginBottom:8 }}>
//             <span style={s.label}>Background Color</span>
//             <div style={{ display:'flex', gap:5 }}>
//               <StableColor value={emailBg} onChange={setEmailBg} />
//               <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, flex:1 }} />
//             </div>
//           </div>
//           <div style={{ marginBottom:12 }}>
//             <span style={s.label}>Email Width</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={s.select}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//             disabled={!blocks.length}
//             style={{ width:'100%', padding:'10px', background:blocks.length?'#0f172a':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:8, cursor:blocks.length?'pointer':'not-allowed', fontSize:13, fontWeight:700 }}>
//             ✓ Apply Template
//           </button>
//         </div>
//       </div>

//       {/* ══ CENTER: Canvas ══ */}
//       <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ background:'white', borderBottom:'1px solid #e2e8f0', padding:'7px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <span style={{ fontSize:12, color:'#64748b' }}>{blocks.length} block{blocks.length!==1?'s':''}{colCtx?` — adding to col ${colCtx.colIdx+1}`:''}</span>
//           <div style={{ display:'flex', gap:5 }}>
//             {[['edit','Edit',false],['preview','Preview',true]].map(([k,l,v])=>(
//               <button key={k} onClick={()=>setPreview(v)} style={{ padding:'4px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?600:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//           </div>
//         </div>

//         <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//           <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//             {blocks.length===0 && !preview && (
//               <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                 <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                 <div style={{ fontSize:14, fontWeight:500 }}>Left panel se blocks add karo</div>
//                 <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer — sab drag-like sequence mein</div>
//               </div>
//             )}

//             {blocks.map(b=>{
//               const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//               const toolbar = (id, colCtx=null) => !preview && (
//                 <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                   <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                   <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                   {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                   <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                 </div>
//               )

//               if (b.type==='columns') {
//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px dashed transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                       <tbody><tr>
//                         {(b.props.cols||[]).map((col,ci)=>{
//                           const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                           return (
//                             <td key={col.id} width={col.width+'%'} valign="top"
//                               style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                               {(col.blocks||[]).map(ib=>{
//                                 const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                 return (
//                                   <div key={ib.id}
//                                     onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                     style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                     <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                       {!preview&&<><button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                       <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                       <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}} style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button></>}
//                                     </div>
//                                     <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                   </div>
//                                 )
//                               })}
//                               {!preview&&(
//                                 <button
//                                   onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                   style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                   + Add to Col {ci+1}
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
//                   onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                   style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                   {toolbar(b.id)}
//                   <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ══ RIGHT: Properties ══ */}
//       <div style={{ background:'#f8fafc', borderLeft:'1px solid #e2e8f0', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0' }}>
//           {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//         </div>
//         <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 16px' }}>
//           {renderProps()}
//         </div>
//       </div>
//     </div>
//   )
// }

// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }

































// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // RICH TEXT EDITOR — proper WYSIWYG, no BR tags needed
// // Uses contentEditable with execCommand for formatting
// // ─────────────────────────────────────────────────────────────────
// const RichEditor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   const isFocused = useRef(false)

//   // Sync value only when not focused
//   useEffect(() => {
//     if (ref.current && !isFocused.current) {
//       ref.current.innerHTML = value || ''
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.innerHTML = value || ''
//   }, []) // mount only

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     // fire onChange after command
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = (v) => {
//     exec('insertText', v)
//   }

//   const tools = [
//     { label:'B',  title:'Bold',          cmd:()=>exec('bold'),          style:{ fontWeight:700 } },
//     { label:'I',  title:'Italic',        cmd:()=>exec('italic'),        style:{ fontStyle:'italic' } },
//     { label:'U',  title:'Underline',     cmd:()=>exec('underline'),     style:{ textDecoration:'underline' } },
//     { label:'S',  title:'Strikethrough', cmd:()=>exec('strikeThrough'), style:{ textDecoration:'line-through' } },
//     { label:'——', title:'Separator',     cmd:null },
//     { label:'≡',  title:'Align Left',   cmd:()=>exec('justifyLeft') },
//     { label:'≡̈',  title:'Align Center', cmd:()=>exec('justifyCenter') },
//     { label:'≡→', title:'Align Right',  cmd:()=>exec('justifyRight') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'• list', title:'Bullet List',  cmd:()=>exec('insertUnorderedList') },
//     { label:'1. list', title:'Number List', cmd:()=>exec('insertOrderedList') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'🔗', title:'Insert Link',   cmd:insertLink },
//     { label:'✕🔗', title:'Remove Link',  cmd:()=>exec('unlink') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'H1', title:'Heading 1',    cmd:()=>exec('formatBlock','h1') },
//     { label:'H2', title:'Heading 2',    cmd:()=>exec('formatBlock','h2') },
//     { label:'P',  title:'Paragraph',    cmd:()=>exec('formatBlock','p') },
//     { label:'——', title:'Separator',    cmd:null },
//     { label:'Clr', title:'Clear Format', cmd:()=>exec('removeFormat') },
//   ]

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:8, background:'white' }}>
//       {/* Toolbar */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'4px 6px', display:'flex', flexWrap:'wrap', gap:2, alignItems:'center' }}>
//         {tools.map((t,i) => {
//           if (t.label==='——') return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 2px' }} />
//           return (
//             <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//               style={{ padding:'3px 6px', fontSize:11, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24, ...(t.style||{}) }}
//               onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//               onMouseLeave={e=>e.currentTarget.style.background='none'}>
//               {t.label}
//             </button>
//           )
//         })}
//       </div>

//       {/* Personalization chips */}
//       <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'3px 8px', display:'flex', gap:4, alignItems:'center', flexWrap:'wrap' }}>
//         <span style={{ fontSize:10, color:'#3b82f6', fontWeight:600 }}>Insert:</span>
//         {['{{name}}','{{company}}','{{email}}'].map(v=>(
//           <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//             style={{ padding:'2px 7px', fontSize:10, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:600 }}>
//             {v}
//           </button>
//         ))}
//       </div>

//       {/* Editable area */}
//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onFocus={()=>{ isFocused.current=true }}
//         onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//         onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//         style={{ minHeight:200, maxHeight:400, overflowY:'auto', padding:'10px 12px', fontSize:14, color:'#374151', lineHeight:1.7, outline:'none', fontFamily:'inherit', resize:'vertical', display:'block' }}
//       />
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb',Twitter:'Tw',Instagram:'In',LinkedIn:'Li',YouTube:'Yt',Pinterest:'Pi',TikTok:'Tk',WhatsApp:'Wa',GitHub:'Gh',Telegram:'Tg' }
// const SOCIAL_COLORS = { Facebook:'#1877f2',Twitter:'#1da1f2',Instagram:'#e1306c',LinkedIn:'#0a66c2',YouTube:'#ff0000',Pinterest:'#e60023',TikTok:'#010101',WhatsApp:'#25d366',GitHub:'#24292e',Telegram:'#2ca5e0' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2'},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2'},{id:newId(),name:'Instagram',url:'#',color:'#e1306c'},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2'}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const sz = parseInt(p.iconSize||36)
//     const icons = (p.links||[]).map(l=>{
//       const abbr = SOCIAL_ABBR[l.name]||l.name.slice(0,2)
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${Math.floor(parseInt(p.gap||12)/2)}px;text-decoration:none"><div style="width:${sz}px;height:${sz}px;background:${l.color||'#666'};border-radius:50%;text-align:center;line-height:${sz}px"><span style="color:#fff;font-size:${Math.round(sz*.38)}px;font-weight:700;font-family:Arial">${abbr}</span></div></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditor value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const links = p.links||[]
//   const add = () => u('links',[...links,{id:newId(),name:'Facebook',url:'#',color:'#1877f2'}])
//   const del = id => u('links',links.filter(l=>l.id!==id))
//   const upd = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))

//   return <>
//     <Section title="Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Icon Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)"       value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//     <Section title="Social Links" />
//     <button onClick={add} style={{ width:'100%', padding:'6px', background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, marginBottom:8 }}>+ Add Social Link</button>
//     {links.map(l=>(
//       <div key={l.id} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:7, padding:'8px 10px', marginBottom:6 }}>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{l.name}</span>
//           <button onClick={()=>del(l.id)} style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕ Remove</button>
//         </div>
//         <SelectField label="Platform" value={l.name} onChange={v=>{ upd(l.id,'name',v); upd(l.id,'color',SOCIAL_COLORS[v]||'#666') }} options={Object.keys(SOCIAL_ABBR).map(k=>[k,k])} />
//         <Field label="URL" value={l.url} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." />
//         <ColorField label="Icon Color" value={l.color} onChange={v=>upd(l.id,'color',v)} />
//       </div>
//     ))}
//     <Section title="Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP: Block Palette + Email Settings ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block buttons row */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>
//               {label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Email settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)}
//               style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ BOTTOM: Canvas + Properties side by side ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}

//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )

//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id}
//                       onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button
//                                     onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }

//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }


// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }














// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // RICH TEXT EDITOR — proper WYSIWYG, no BR tags needed
// // Uses contentEditable with execCommand for formatting
// // ─────────────────────────────────────────────────────────────────
// const RichEditor = memo(({ value, onChange }) => {
//   const ref        = useRef(null)
//   const isFocused  = useRef(false)
//   const textColorRef = useRef(null)
//   const bgColorRef   = useRef(null)

//   useEffect(() => {
//     if (ref.current) ref.current.innerHTML = value || ''
//   }, [])

//   useEffect(() => {
//     if (ref.current && !isFocused.current) {
//       ref.current.innerHTML = value || ''
//     }
//   }, [value])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = v => exec('insertText', v)

//   const SEP = '|'

//   // Row 1: formatting
//   const row1 = [
//     { t:'B',      title:'Bold',          cmd:()=>exec('bold'),          s:{ fontWeight:700 } },
//     { t:'I',      title:'Italic',        cmd:()=>exec('italic'),        s:{ fontStyle:'italic' } },
//     { t:'U',      title:'Underline',     cmd:()=>exec('underline'),     s:{ textDecoration:'underline' } },
//     { t:'S',      title:'Strikethrough', cmd:()=>exec('strikeThrough'), s:{ textDecoration:'line-through' } },
//     { t:SEP },
//     { t:'≡L',     title:'Align Left',   cmd:()=>exec('justifyLeft') },
//     { t:'≡C',     title:'Align Center', cmd:()=>exec('justifyCenter') },
//     { t:'≡R',     title:'Align Right',  cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list', title:'Bullet List',  cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list',title:'Number List',  cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗',     title:'Insert Link',  cmd:insertLink },
//     { t:'✕🔗',   title:'Remove Link',  cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'Heading 1',  cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'Heading 2',  cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Paragraph',  cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr',title:'Clear Format', cmd:()=>exec('removeFormat') },
//   ]

//   const btnStyle = { padding:'3px 6px', fontSize:11, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:22, lineHeight:1.4 }

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:8, background:'white', overflow:'hidden' }}>

//       {/* ── Row 1: Formatting toolbar ── */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'4px 6px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center' }}>
//         {row1.map((t,i) => {
//           if (t.t===SEP) return <div key={i} style={{ width:1, height:16, background:'#e2e8f0', margin:'0 3px' }} />
//           return (
//             <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//               style={{ ...btnStyle, ...(t.s||{}) }}
//               onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//               onMouseLeave={e=>e.currentTarget.style.background='none'}>
//               {t.t}
//             </button>
//           )
//         })}
//       </div>

//       {/* ── Row 2: Font + Size + Colors ── */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'4px 8px', display:'flex', flexWrap:'wrap', gap:6, alignItems:'center' }}>

//         {/* Font family */}
//         <select title="Font Family"
//           onMouseDown={e=>e.stopPropagation()}
//           onChange={e=>{ ref.current?.focus(); exec('fontName', e.target.value) }}
//           defaultValue=""
//           style={{ fontSize:11, padding:'2px 4px', border:'1px solid #e2e8f0', borderRadius:4, background:'white', cursor:'pointer', color:'#374151', height:24 }}>
//           <option value="" disabled>Font</option>
//           {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>(
//             <option key={v} value={v} style={{ fontFamily:v }}>{l}</option>
//           ))}
//         </select>

//         {/* Font size */}
//         <select title="Font Size"
//           onMouseDown={e=>e.stopPropagation()}
//           onChange={e=>{ ref.current?.focus(); exec('fontSize', e.target.value) }}
//           defaultValue=""
//           style={{ fontSize:11, padding:'2px 4px', border:'1px solid #e2e8f0', borderRadius:4, background:'white', cursor:'pointer', color:'#374151', height:24 }}>
//           <option value="" disabled>Size</option>
//           {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>(
//             <option key={v} value={v}>{l}</option>
//           ))}
//         </select>

//         <div style={{ width:1, height:16, background:'#e2e8f0' }} />

//         {/* Text color */}
//         <label title="Text Color" style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }}
//           onMouseDown={e=>e.preventDefault()}>
//           <span style={{ fontSize:11, color:'#374151', fontWeight:600, textDecoration:'underline', textDecorationColor:'red' }}>A</span>
//           <input ref={textColorRef} type="color" defaultValue="#000000"
//             onChange={e=>{ exec('foreColor', e.target.value) }}
//             style={{ width:22, height:20, border:'none', borderRadius:3, cursor:'pointer', padding:1 }} />
//           <span style={{ fontSize:10, color:'#64748b' }}>Text</span>
//         </label>

//         {/* Background / highlight color */}
//         <label title="Highlight Color" style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }}
//           onMouseDown={e=>e.preventDefault()}>
//           <span style={{ fontSize:11, color:'#374151', fontWeight:600, background:'yellow', padding:'0 2px' }}>A</span>
//           <input ref={bgColorRef} type="color" defaultValue="#ffff00"
//             onChange={e=>{ exec('hiliteColor', e.target.value) }}
//             style={{ width:22, height:20, border:'none', borderRadius:3, cursor:'pointer', padding:1 }} />
//           <span style={{ fontSize:10, color:'#64748b' }}>Highlight</span>
//         </label>

//         <div style={{ width:1, height:16, background:'#e2e8f0' }} />

//         {/* Quick text colors */}
//         <div style={{ display:'flex', gap:3, alignItems:'center' }}>
//           <span style={{ fontSize:10, color:'#64748b' }}>Quick:</span>
//           {['#000000','#374151','#dc2626','#ea580c','#16a34a','#1d4ed8','#7c3aed','#db2777','#ffffff'].map(c=>(
//             <button key={c} title={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor', c) }}
//               style={{ width:16, height:16, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.15)', borderRadius:3, cursor:'pointer', padding:0, flexShrink:0 }} />
//           ))}
//         </div>
//       </div>

//       {/* ── Row 3: Personalization chips ── */}
//       <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'3px 8px', display:'flex', gap:4, alignItems:'center', flexWrap:'wrap' }}>
//         <span style={{ fontSize:10, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//         {['{{name}}','{{company}}','{{email}}'].map(v=>(
//           <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//             style={{ padding:'2px 8px', fontSize:10, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:600 }}>
//             {v}
//           </button>
//         ))}
//       </div>

//       {/* ── Editable content area ── */}
//       <div
//         ref={ref}
//         contentEditable
//         suppressContentEditableWarning
//         onFocus={()=>{ isFocused.current=true }}
//         onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//         onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//         style={{ minHeight:180, maxHeight:380, overflowY:'auto', padding:'10px 12px', fontSize:14, color:'#374151', lineHeight:1.7, outline:'none', fontFamily:'inherit' }}
//       />
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb',Twitter:'Tw',Instagram:'In',LinkedIn:'Li',YouTube:'Yt',Pinterest:'Pi',TikTok:'Tk',WhatsApp:'Wa',GitHub:'Gh',Telegram:'Tg' }
// const SOCIAL_COLORS = { Facebook:'#1877f2',Twitter:'#1da1f2',Instagram:'#e1306c',LinkedIn:'#0a66c2',YouTube:'#ff0000',Pinterest:'#e60023',TikTok:'#010101',WhatsApp:'#25d366',GitHub:'#24292e',Telegram:'#2ca5e0' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2'},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2'},{id:newId(),name:'Instagram',url:'#',color:'#e1306c'},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2'}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const sz = parseInt(p.iconSize||36)
//     const icons = (p.links||[]).map(l=>{
//       const abbr = SOCIAL_ABBR[l.name]||l.name.slice(0,2)
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${Math.floor(parseInt(p.gap||12)/2)}px;text-decoration:none"><div style="width:${sz}px;height:${sz}px;background:${l.color||'#666'};border-radius:50%;text-align:center;line-height:${sz}px"><span style="color:#fff;font-size:${Math.round(sz*.38)}px;font-weight:700;font-family:Arial">${abbr}</span></div></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditor value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const links = p.links||[]
//   const add = () => u('links',[...links,{id:newId(),name:'Facebook',url:'#',color:'#1877f2'}])
//   const del = id => u('links',links.filter(l=>l.id!==id))
//   const upd = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))

//   return <>
//     <Section title="Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Icon Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)"       value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//     <Section title="Social Links" />
//     <button onClick={add} style={{ width:'100%', padding:'6px', background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, marginBottom:8 }}>+ Add Social Link</button>
//     {links.map(l=>(
//       <div key={l.id} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:7, padding:'8px 10px', marginBottom:6 }}>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{l.name}</span>
//           <button onClick={()=>del(l.id)} style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕ Remove</button>
//         </div>
//         <SelectField label="Platform" value={l.name} onChange={v=>{ upd(l.id,'name',v); upd(l.id,'color',SOCIAL_COLORS[v]||'#666') }} options={Object.keys(SOCIAL_ABBR).map(k=>[k,k])} />
//         <Field label="URL" value={l.url} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." />
//         <ColorField label="Icon Color" value={l.color} onChange={v=>upd(l.id,'color',v)} />
//       </div>
//     ))}
//     <Section title="Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP: Block Palette + Email Settings ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block buttons row */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>
//               {label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Email settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)}
//               style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ BOTTOM: Canvas + Properties side by side ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}

//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )

//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id}
//                       onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button
//                                     onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }

//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }


// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }













// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // FLOATING TOOLBAR — appears on text selection inside editor
// // ─────────────────────────────────────────────────────────────────
// const FloatingToolbar = memo(({ editorRef, exec, insertLink }) => {
//   const [pos, setPos]       = useState(null) // {top, left}
//   const [showColors, setShowColors] = useState(false)
//   const toolbarRef = useRef(null)

//   useEffect(() => {
//     const onSelChange = () => {
//       const sel = window.getSelection()
//       if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
//         setPos(null); setShowColors(false); return
//       }
//       // Check selection is inside our editor
//       const node = sel.anchorNode
//       if (!editorRef.current?.contains(node)) { setPos(null); return }

//       const range = sel.getRangeAt(0)
//       const rect  = range.getBoundingClientRect()
//       const edRect = editorRef.current.getBoundingClientRect()
//       if (!rect.width) { setPos(null); return }

//       setPos({
//         top:  rect.top  - edRect.top  - 44, // above selection
//         left: Math.max(0, rect.left - edRect.left + rect.width/2 - 160), // centered
//       })
//     }

//     document.addEventListener('selectionchange', onSelChange)
//     return () => document.removeEventListener('selectionchange', onSelChange)
//   }, [editorRef])

//   if (!pos) return null

//   const PB = ({ children, title, onClick, style={} }) => (
//     <button title={title} onMouseDown={e=>{ e.preventDefault(); onClick() }}
//       style={{ padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', cursor:'pointer', color:'white', borderRadius:4, lineHeight:1.3, ...style }}
//       onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
//       onMouseLeave={e=>e.currentTarget.style.background='none'}>
//       {children}
//     </button>
//   )

//   const QUICK_COLORS = ['#000000','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']

//   return (
//     <div ref={toolbarRef}
//       style={{ position:'absolute', top:pos.top, left:pos.left, zIndex:100,
//         background:'#1e293b', borderRadius:8, padding:'4px 6px',
//         display:'flex', alignItems:'center', gap:1, flexWrap:'wrap', maxWidth:340,
//         boxShadow:'0 4px 20px rgba(0,0,0,.35)', border:'1px solid #334155' }}
//       onMouseDown={e=>e.preventDefault()}>

//       {/* Format buttons */}
//       <PB title="Bold"          onClick={()=>exec('bold')}          style={{ fontWeight:700 }}>B</PB>
//       <PB title="Italic"        onClick={()=>exec('italic')}        style={{ fontStyle:'italic' }}>I</PB>
//       <PB title="Underline"     onClick={()=>exec('underline')}     style={{ textDecoration:'underline' }}>U</PB>
//       <PB title="Strikethrough" onClick={()=>exec('strikeThrough')} style={{ textDecoration:'line-through' }}>S</PB>

//       <div style={{ width:1, height:18, background:'#475569', margin:'0 2px' }} />

//       <PB title="Align Left"   onClick={()=>exec('justifyLeft')}>≡L</PB>
//       <PB title="Align Center" onClick={()=>exec('justifyCenter')}>≡C</PB>
//       <PB title="Align Right"  onClick={()=>exec('justifyRight')}>≡R</PB>

//       <div style={{ width:1, height:18, background:'#475569', margin:'0 2px' }} />

//       <PB title="Link" onClick={insertLink}>🔗</PB>
//       <PB title="Remove Link" onClick={()=>exec('unlink')}>✕🔗</PB>

//       <div style={{ width:1, height:18, background:'#475569', margin:'0 2px' }} />

//       <PB title="H1" onClick={()=>exec('formatBlock','h1')}>H1</PB>
//       <PB title="H2" onClick={()=>exec('formatBlock','h2')}>H2</PB>
//       <PB title="P"  onClick={()=>exec('formatBlock','p')}>P</PB>

//       <div style={{ width:1, height:18, background:'#475569', margin:'0 2px' }} />

//       {/* Color toggle */}
//       <PB title="Text Colors" onClick={()=>setShowColors(p=>!p)}>
//         <span style={{ color:'#fbbf24', fontWeight:700 }}>A</span> 🎨
//       </PB>

//       {/* Color palette — shows inline */}
//       {showColors && (
//         <div style={{ display:'flex', gap:3, alignItems:'center', padding:'2px 4px', background:'#0f172a', borderRadius:6 }}>
//           {QUICK_COLORS.map(c=>(
//             <button key={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c); setShowColors(false) }}
//               title={c}
//               style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #475569':'1px solid rgba(255,255,255,.2)', borderRadius:3, cursor:'pointer', padding:0, flexShrink:0 }} />
//           ))}
//           <span style={{ fontSize:9, color:'#94a3b8', marginLeft:2 }}>BG:</span>
//           {['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff'].map(c=>(
//             <button key={c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c); setShowColors(false) }}
//               title={'Highlight: '+c}
//               style={{ width:18, height:18, background:c, border:'1px solid rgba(255,255,255,.2)', borderRadius:3, cursor:'pointer', padding:0, flexShrink:0 }} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // RICH TEXT EDITOR — proper WYSIWYG, no BR tags needed
// // Uses contentEditable with execCommand for formatting
// // ─────────────────────────────────────────────────────────────────
// const RichEditor = memo(({ value, onChange }) => {
//   const ref        = useRef(null)
//   const isFocused  = useRef(false)
//   const textColorRef = useRef(null)
//   const bgColorRef   = useRef(null)

//   useEffect(() => {
//     if (ref.current) ref.current.innerHTML = value || ''
//   }, [])

//   useEffect(() => {
//     if (ref.current && !isFocused.current) {
//       ref.current.innerHTML = value || ''
//     }
//   }, [value])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = v => exec('insertText', v)

//   const SEP = '|'

//   // Row 1: formatting
//   const row1 = [
//     { t:'B',      title:'Bold',          cmd:()=>exec('bold'),          s:{ fontWeight:700 } },
//     { t:'I',      title:'Italic',        cmd:()=>exec('italic'),        s:{ fontStyle:'italic' } },
//     { t:'U',      title:'Underline',     cmd:()=>exec('underline'),     s:{ textDecoration:'underline' } },
//     { t:'S',      title:'Strikethrough', cmd:()=>exec('strikeThrough'), s:{ textDecoration:'line-through' } },
//     { t:SEP },
//     { t:'≡L',     title:'Align Left',   cmd:()=>exec('justifyLeft') },
//     { t:'≡C',     title:'Align Center', cmd:()=>exec('justifyCenter') },
//     { t:'≡R',     title:'Align Right',  cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list', title:'Bullet List',  cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list',title:'Number List',  cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗',     title:'Insert Link',  cmd:insertLink },
//     { t:'✕🔗',   title:'Remove Link',  cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'Heading 1',  cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'Heading 2',  cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Paragraph',  cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr',title:'Clear Format', cmd:()=>exec('removeFormat') },
//   ]

//   const btnStyle = { padding:'3px 6px', fontSize:11, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:22, lineHeight:1.4 }

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:8, background:'white', overflow:'hidden' }}>

//       {/* ── Row 1: Formatting toolbar ── */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'4px 6px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center' }}>
//         {row1.map((t,i) => {
//           if (t.t===SEP) return <div key={i} style={{ width:1, height:16, background:'#e2e8f0', margin:'0 3px' }} />
//           return (
//             <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//               style={{ ...btnStyle, ...(t.s||{}) }}
//               onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//               onMouseLeave={e=>e.currentTarget.style.background='none'}>
//               {t.t}
//             </button>
//           )
//         })}
//       </div>

//       {/* ── Row 2: Font + Size + Colors ── */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'4px 8px', display:'flex', flexWrap:'wrap', gap:6, alignItems:'center' }}>

//         {/* Font family */}
//         <select title="Font Family"
//           onMouseDown={e=>e.stopPropagation()}
//           onChange={e=>{ ref.current?.focus(); exec('fontName', e.target.value) }}
//           defaultValue=""
//           style={{ fontSize:11, padding:'2px 4px', border:'1px solid #e2e8f0', borderRadius:4, background:'white', cursor:'pointer', color:'#374151', height:24 }}>
//           <option value="" disabled>Font</option>
//           {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>(
//             <option key={v} value={v} style={{ fontFamily:v }}>{l}</option>
//           ))}
//         </select>

//         {/* Font size */}
//         <select title="Font Size"
//           onMouseDown={e=>e.stopPropagation()}
//           onChange={e=>{ ref.current?.focus(); exec('fontSize', e.target.value) }}
//           defaultValue=""
//           style={{ fontSize:11, padding:'2px 4px', border:'1px solid #e2e8f0', borderRadius:4, background:'white', cursor:'pointer', color:'#374151', height:24 }}>
//           <option value="" disabled>Size</option>
//           {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>(
//             <option key={v} value={v}>{l}</option>
//           ))}
//         </select>

//         <div style={{ width:1, height:16, background:'#e2e8f0' }} />

//         {/* Text color */}
//         <label title="Text Color" style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }}
//           onMouseDown={e=>e.preventDefault()}>
//           <span style={{ fontSize:11, color:'#374151', fontWeight:600, textDecoration:'underline', textDecorationColor:'red' }}>A</span>
//           <input ref={textColorRef} type="color" defaultValue="#000000"
//             onChange={e=>{ exec('foreColor', e.target.value) }}
//             style={{ width:22, height:20, border:'none', borderRadius:3, cursor:'pointer', padding:1 }} />
//           <span style={{ fontSize:10, color:'#64748b' }}>Text</span>
//         </label>

//         {/* Background / highlight color */}
//         <label title="Highlight Color" style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }}
//           onMouseDown={e=>e.preventDefault()}>
//           <span style={{ fontSize:11, color:'#374151', fontWeight:600, background:'yellow', padding:'0 2px' }}>A</span>
//           <input ref={bgColorRef} type="color" defaultValue="#ffff00"
//             onChange={e=>{ exec('hiliteColor', e.target.value) }}
//             style={{ width:22, height:20, border:'none', borderRadius:3, cursor:'pointer', padding:1 }} />
//           <span style={{ fontSize:10, color:'#64748b' }}>Highlight</span>
//         </label>

//         <div style={{ width:1, height:16, background:'#e2e8f0' }} />

//         {/* Quick text colors */}
//         <div style={{ display:'flex', gap:3, alignItems:'center' }}>
//           <span style={{ fontSize:10, color:'#64748b' }}>Quick:</span>
//           {['#000000','#374151','#dc2626','#ea580c','#16a34a','#1d4ed8','#7c3aed','#db2777','#ffffff'].map(c=>(
//             <button key={c} title={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor', c) }}
//               style={{ width:16, height:16, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.15)', borderRadius:3, cursor:'pointer', padding:0, flexShrink:0 }} />
//           ))}
//         </div>
//       </div>

//       {/* ── Row 3: Personalization chips ── */}
//       <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'3px 8px', display:'flex', gap:4, alignItems:'center', flexWrap:'wrap' }}>
//         <span style={{ fontSize:10, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//         {['{{name}}','{{company}}','{{email}}'].map(v=>(
//           <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//             style={{ padding:'2px 8px', fontSize:10, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:600 }}>
//             {v}
//           </button>
//         ))}
//       </div>

//       {/* ── Editable content area + floating popup ── */}
//       <div style={{ position:'relative' }}>
//         <FloatingToolbar editorRef={ref} exec={exec} insertLink={insertLink} />
//         <div
//           ref={ref}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={()=>{ isFocused.current=true }}
//           onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//           onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//           style={{ minHeight:180, maxHeight:380, overflowY:'auto', padding:'10px 12px', fontSize:14, color:'#374151', lineHeight:1.7, outline:'none', fontFamily:'inherit' }}
//         />
//       </div>
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb',Twitter:'Tw',Instagram:'In',LinkedIn:'Li',YouTube:'Yt',Pinterest:'Pi',TikTok:'Tk',WhatsApp:'Wa',GitHub:'Gh',Telegram:'Tg' }
// const SOCIAL_COLORS = { Facebook:'#1877f2',Twitter:'#1da1f2',Instagram:'#e1306c',LinkedIn:'#0a66c2',YouTube:'#ff0000',Pinterest:'#e60023',TikTok:'#010101',WhatsApp:'#25d366',GitHub:'#24292e',Telegram:'#2ca5e0' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2'},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2'},{id:newId(),name:'Instagram',url:'#',color:'#e1306c'},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2'}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const sz = parseInt(p.iconSize||36)
//     // Real SVG paths for social icons (email-client safe inline SVG)
//     const SVG_PATHS = {
//       Facebook:  `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`,
//       Twitter:   `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>`,
//       Instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
//       LinkedIn:  `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
//       YouTube:   `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000"/></svg>`,
//       Pinterest: `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.562 0-2.387-1.715-4.056-4.163-4.056-2.836 0-4.498 2.127-4.498 4.326 0 .856.33 1.775.741 2.276a.3.3 0 01.069.284c-.076.311-.244.995-.277 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>`,
//       TikTok:    `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>`,
//       WhatsApp:  `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
//       GitHub:    `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`,
//       Telegram:  `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="white"><path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 6.498c-1.556.61-1.547 1.459-.283 1.838l4.226 1.317 1.598 4.858c.193.547.39.785.793.785.316 0 .464-.148.661-.34l1.997-1.938 4.148 3.061c.764.42 1.315.203 1.505-.711l2.725-12.845c.274-1.098-.416-1.597-1.848-.738z"/></svg>`,
//     }

//     const icons = (p.links||[]).map(l=>{
//       const svgPath = SVG_PATHS[l.name]
//       const bg = l.color || SOCIAL_COLORS[l.name] || '#666'
//       const icon = svgPath
//         ? `<div style="width:${sz}px;height:${sz}px;background:${bg};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;text-align:center">${svgPath}</div>`
//         : `<div style="width:${sz}px;height:${sz}px;background:${bg};border-radius:50%;text-align:center;line-height:${sz}px"><span style="color:#fff;font-size:${Math.round(sz*.38)}px;font-weight:700;font-family:Arial">${(SOCIAL_ABBR[l.name]||l.name.slice(0,2))}</span></div>`
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${Math.floor(parseInt(p.gap||12)/2)}px;text-decoration:none;vertical-align:middle">${icon}</a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditor value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const links = p.links||[]
//   const add = () => u('links',[...links,{id:newId(),name:'Facebook',url:'#',color:'#1877f2'}])
//   const del = id => u('links',links.filter(l=>l.id!==id))
//   const upd = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))

//   return <>
//     <Section title="Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Icon Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)"       value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//     <Section title="Social Links" />
//     <button onClick={add} style={{ width:'100%', padding:'6px', background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, marginBottom:8 }}>+ Add Social Link</button>
//     {links.map(l=>(
//       <div key={l.id} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:7, padding:'8px 10px', marginBottom:6 }}>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{l.name}</span>
//           <button onClick={()=>del(l.id)} style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕ Remove</button>
//         </div>
//         <SelectField label="Platform" value={l.name} onChange={v=>{ upd(l.id,'name',v); upd(l.id,'color',SOCIAL_COLORS[v]||'#666') }} options={Object.keys(SOCIAL_ABBR).map(k=>[k,k])} />
//         <Field label="URL" value={l.url} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." />
//         <ColorField label="Icon Color" value={l.color} onChange={v=>upd(l.id,'color',v)} />
//       </div>
//     ))}
//     <Section title="Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditor value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP: Block Palette + Email Settings ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block buttons row */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>
//               {label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Email settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)}
//               style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ BOTTOM: Canvas + Properties side by side ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}

//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )

//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id}
//                       onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button
//                                     onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }

//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }


// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }




















// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // TEXT EDITOR MODAL — opens when "Edit Text" clicked in properties
// // ─────────────────────────────────────────────────────────────────
// const EditorModal = memo(({ value, onChange, onClose }) => {
//   const ref       = useRef(null)
//   const isFocused = useRef(true)

//   useEffect(() => {
//     if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() }
//   }, [])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = v => {
//     ref.current?.focus()
//     document.execCommand('insertText', false, v)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const SEP = '|'
//   const row1 = [
//     { t:'B',       title:'Bold',          cmd:()=>exec('bold'),            s:{fontWeight:700} },
//     { t:'I',       title:'Italic',        cmd:()=>exec('italic'),          s:{fontStyle:'italic'} },
//     { t:'U',       title:'Underline',     cmd:()=>exec('underline'),       s:{textDecoration:'underline'} },
//     { t:'S',       title:'Strike',        cmd:()=>exec('strikeThrough'),   s:{textDecoration:'line-through'} },
//     { t:SEP },
//     { t:'≡L',      title:'Left',          cmd:()=>exec('justifyLeft') },
//     { t:'≡C',      title:'Center',        cmd:()=>exec('justifyCenter') },
//     { t:'≡R',      title:'Right',         cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list',  title:'Bullet list',   cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list', title:'Number list',   cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗',      title:'Add link',      cmd:insertLink },
//     { t:'✕🔗',    title:'Remove link',   cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'Heading 1', cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'Heading 2', cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Paragraph', cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr', title:'Clear format', cmd:()=>exec('removeFormat') },
//   ]
//   const QCOLORS = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
//   const HLCOLORS= ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
//   const btnS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
//       <div style={{ background:'white', borderRadius:12, width:'min(780px,92vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

//         {/* Modal header */}
//         <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>Edit Text Block</span>
//           <button onClick={onClose} style={{ padding:'5px 14px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>Done ✓</button>
//         </div>

//         {/* Row 1 — format toolbar */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
//           {row1.map((t,i) => {
//             if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
//             return (
//               <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//                 style={{ ...btnS, ...(t.s||{}) }}
//                 onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//                 onMouseLeave={e=>e.currentTarget.style.background='none'}>
//                 {t.t}
//               </button>
//             )
//           })}
//         </div>

//         {/* Row 2 — font + size + colors */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
//           <select title="Font" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Font</option>
//             {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>(
//               <option key={v} value={v} style={{fontFamily:v}}>{l}</option>
//             ))}
//           </select>
//           <select title="Size" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Size</option>
//             {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>(
//               <option key={v} value={v}>{l}</option>
//             ))}
//           </select>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
//             <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
//           </label>
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
//             <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
//           </label>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <div style={{ display:'flex', gap:3 }}>
//             {QCOLORS.map(c=>(
//               <button key={c} title={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
//                 style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//           <div style={{ display:'flex', gap:3 }}>
//             <span style={{ fontSize:11, color:'#94a3b8', alignSelf:'center' }}>HL:</span>
//             {HLCOLORS.map(c=>(
//               <button key={c} title={'Highlight: '+c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
//                 style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//         </div>

//         {/* Row 3 — personalization */}
//         <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
//           <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//           {['{{name}}','{{company}}','{{email}}'].map(v=>(
//             <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//               style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>
//               {v}
//             </button>
//           ))}
//         </div>

//         {/* Editable area */}
//         <div
//           ref={ref}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={()=>{ isFocused.current=true }}
//           onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//           onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//           style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:280 }}
//         />

//         {/* Footer */}
//         <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', flexShrink:0, display:'flex', justifyContent:'flex-end', gap:8 }}>
//           <button onClick={()=>{ if(ref.current) { ref.current.innerHTML=''; onChange('') } }}
//             style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>
//             Clear All
//           </button>
//           <button onClick={onClose}
//             style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>
//             Done ✓
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // RICH EDITOR FIELD — small preview in props panel, opens modal
// // ─────────────────────────────────────────────────────────────────
// const RichEditorField = memo(({ value, onChange }) => {
//   const [open, setOpen] = useState(false)

//   return (
//     <>
//       {/* Preview box */}
//       <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
//         <div
//           dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Email body yahan dikhega...</span>' }}
//           style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:90, overflow:'hidden', pointerEvents:'none' }}
//         />
//         <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <span style={{ fontSize:10, color:'#94a3b8' }}>Click to edit</span>
//           <button onClick={()=>setOpen(true)}
//             style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
//             Edit Text
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
//     </>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb',Twitter:'Tw',Instagram:'In',LinkedIn:'Li',YouTube:'Yt',Pinterest:'Pi',TikTok:'Tk',WhatsApp:'Wa',GitHub:'Gh',Telegram:'Tg' }
// const SOCIAL_COLORS = { Facebook:'#1877f2',Twitter:'#1da1f2',Instagram:'#e1306c',LinkedIn:'#0a66c2',YouTube:'#ff0000',Pinterest:'#e60023',TikTok:'#010101',WhatsApp:'#25d366',GitHub:'#24292e',Telegram:'#2ca5e0' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2'},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2'},{id:newId(),name:'Instagram',url:'#',color:'#e1306c'},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2'}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const sz = parseInt(p.iconSize||36)
//     const half = Math.floor(parseInt(p.gap||12)/2)
//     const icons = (p.links||[]).map(l=>{
//       const bg  = l.color || SOCIAL_COLORS[l.name] || '#666'
//       const abbr = SOCIAL_ABBR[l.name] || l.name.slice(0,2).toUpperCase()
//       const fs  = Math.round(sz * 0.36)
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none" target="_blank">` +
//         `<table cellpadding="0" cellspacing="0" style="display:inline-block">` +
//         `<tr><td width="${sz}" height="${sz}" align="center" valign="middle" ` +
//         `style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${sz}px;text-align:center;vertical-align:middle;font-size:${fs}px;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;line-height:${sz}px">` +
//         `${abbr}</td></tr></table></a>`
//     }).join('  ')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr>` +
//       `<td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditorField value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const links = p.links||[]
//   const add = () => u('links',[...links,{id:newId(),name:'Facebook',url:'#',color:'#1877f2'}])
//   const del = id => u('links',links.filter(l=>l.id!==id))
//   const upd = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))

//   return <>
//     <Section title="Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Icon Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)"       value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//     <Section title="Social Links" />
//     <button onClick={add} style={{ width:'100%', padding:'6px', background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, marginBottom:8 }}>+ Add Social Link</button>
//     {links.map(l=>(
//       <div key={l.id} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:7, padding:'8px 10px', marginBottom:6 }}>
//         <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
//           <span style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{l.name}</span>
//           <button onClick={()=>del(l.id)} style={{ padding:'2px 7px', fontSize:11, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕ Remove</button>
//         </div>
//         <SelectField label="Platform" value={l.name} onChange={v=>{ upd(l.id,'name',v); upd(l.id,'color',SOCIAL_COLORS[v]||'#666') }} options={Object.keys(SOCIAL_ABBR).map(k=>[k,k])} />
//         <Field label="URL" value={l.url} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." />
//         <ColorField label="Icon Color" value={l.color} onChange={v=>upd(l.id,'color',v)} />
//       </div>
//     ))}
//     <Section title="Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'OPEN_MODAL':
//       return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }

//     case 'CLOSE_MODAL':
//       return { ...state, openModal:null }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx, openModal } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP: Block Palette + Email Settings ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block buttons row */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>
//               {label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Email settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)}
//               style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ BOTTOM: Canvas + Properties side by side ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}

//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )

//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id}
//                       onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button
//                                     onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }

//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>

//       </div>

//       {openModal && (() => {
//         const mb = blocks.find(x=>x.id===openModal)
//         if (!mb) return null
//         const pk = mb.type==='text' ? 'html' : 'mainText'
//         return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
//       })()}
//     </div>
//   )
// }


// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }


























// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // TEXT EDITOR MODAL — opens when "Edit Text" clicked in properties
// // ─────────────────────────────────────────────────────────────────
// const EditorModal = memo(({ value, onChange, onClose }) => {
//   const ref       = useRef(null)
//   const isFocused = useRef(true)

//   useEffect(() => {
//     if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() }
//   }, [])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = v => {
//     ref.current?.focus()
//     document.execCommand('insertText', false, v)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const SEP = '|'
//   const row1 = [
//     { t:'B',       title:'Bold',          cmd:()=>exec('bold'),            s:{fontWeight:700} },
//     { t:'I',       title:'Italic',        cmd:()=>exec('italic'),          s:{fontStyle:'italic'} },
//     { t:'U',       title:'Underline',     cmd:()=>exec('underline'),       s:{textDecoration:'underline'} },
//     { t:'S',       title:'Strike',        cmd:()=>exec('strikeThrough'),   s:{textDecoration:'line-through'} },
//     { t:SEP },
//     { t:'≡L',      title:'Left',          cmd:()=>exec('justifyLeft') },
//     { t:'≡C',      title:'Center',        cmd:()=>exec('justifyCenter') },
//     { t:'≡R',      title:'Right',         cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list',  title:'Bullet list',   cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list', title:'Number list',   cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗',      title:'Add link',      cmd:insertLink },
//     { t:'✕🔗',    title:'Remove link',   cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'Heading 1', cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'Heading 2', cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Paragraph', cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr', title:'Clear format', cmd:()=>exec('removeFormat') },
//   ]
//   const QCOLORS = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
//   const HLCOLORS= ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
//   const btnS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
//       <div style={{ background:'white', borderRadius:12, width:'min(780px,92vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

//         {/* Modal header */}
//         <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>Edit Text Block</span>
//           <button onClick={onClose} style={{ padding:'5px 14px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>Done ✓</button>
//         </div>

//         {/* Row 1 — format toolbar */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
//           {row1.map((t,i) => {
//             if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
//             return (
//               <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//                 style={{ ...btnS, ...(t.s||{}) }}
//                 onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//                 onMouseLeave={e=>e.currentTarget.style.background='none'}>
//                 {t.t}
//               </button>
//             )
//           })}
//         </div>

//         {/* Row 2 — font + size + colors */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
//           <select title="Font" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Font</option>
//             {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>(
//               <option key={v} value={v} style={{fontFamily:v}}>{l}</option>
//             ))}
//           </select>
//           <select title="Size" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Size</option>
//             {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>(
//               <option key={v} value={v}>{l}</option>
//             ))}
//           </select>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
//             <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
//           </label>
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
//             <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
//           </label>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <div style={{ display:'flex', gap:3 }}>
//             {QCOLORS.map(c=>(
//               <button key={c} title={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
//                 style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//           <div style={{ display:'flex', gap:3 }}>
//             <span style={{ fontSize:11, color:'#94a3b8', alignSelf:'center' }}>HL:</span>
//             {HLCOLORS.map(c=>(
//               <button key={c} title={'Highlight: '+c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
//                 style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//         </div>

//         {/* Row 3 — personalization */}
//         <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
//           <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//           {['{{name}}','{{company}}','{{email}}'].map(v=>(
//             <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//               style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>
//               {v}
//             </button>
//           ))}
//         </div>

//         {/* Editable area */}
//         <div
//           ref={ref}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={()=>{ isFocused.current=true }}
//           onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//           onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//           style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:280 }}
//         />

//         {/* Footer */}
//         <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', flexShrink:0, display:'flex', justifyContent:'flex-end', gap:8 }}>
//           <button onClick={()=>{ if(ref.current) { ref.current.innerHTML=''; onChange('') } }}
//             style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>
//             Clear All
//           </button>
//           <button onClick={onClose}
//             style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>
//             Done ✓
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // RICH EDITOR FIELD — small preview in props panel, opens modal
// // ─────────────────────────────────────────────────────────────────
// const RichEditorField = memo(({ value, onChange }) => {
//   const [open, setOpen] = useState(false)

//   return (
//     <>
//       {/* Preview box */}
//       <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
//         <div
//           dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Email body yahan dikhega...</span>' }}
//           style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:90, overflow:'hidden', pointerEvents:'none' }}
//         />
//         <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <span style={{ fontSize:10, color:'#94a3b8' }}>Click to edit</span>
//           <button onClick={()=>setOpen(true)}
//             style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
//             Edit Text
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
//     </>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg', Snapchat:'Sc', Reddit:'Re', Discord:'Di', Spotify:'Sp', Medium:'Me', Dribbble:'Dr', Behance:'Be', Vimeo:'Vi', Twitch:'Tv', Email:'Em' }
// const SOCIAL_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#24292e', Telegram:'#2ca5e0', Snapchat:'#fffc00', Reddit:'#ff4500', Discord:'#5865f2', Spotify:'#1db954', Medium:'#000000', Dribbble:'#ea4c89', Behance:'#1769ff', Vimeo:'#1ab7ea', Twitch:'#9146ff', Email:'#6366f1' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', borderRadius:'50', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Instagram',url:'#',color:'#e1306c',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2',size:'',pt:'',pb:'',pl:'',pr:''}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const defaultSz = parseInt(p.iconSize||36)
//     const half = Math.floor(parseInt(p.gap||12)/2)
//     const br = p.borderRadius==='50' ? '50%' : (p.borderRadius||'50')+'%'
//     const icons = (p.links||[]).map(l=>{
//       const sz    = parseInt(l.size||defaultSz)
//       const bg    = l.color || SOCIAL_COLORS[l.name] || '#666'
//       const abbr  = SOCIAL_ABBR[l.name] || l.name.slice(0,2).toUpperCase()
//       const fs    = Math.round(sz * 0.36)
//       const ipt   = parseInt(l.pt||0), ipb=parseInt(l.pb||0), ipl=parseInt(l.pl||0), ipr=parseInt(l.pr||0)
//       const totalH = sz + ipt + ipb, totalW = sz + ipl + ipr
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none;vertical-align:middle" target="_blank">` +
//         `<table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:collapse">` +
//         `<tr><td width="${totalW}" height="${totalH}" align="center" valign="middle" ` +
//         `style="width:${totalW}px;height:${totalH}px;padding:${ipt}px ${ipr}px ${ipb}px ${ipl}px;background:transparent">` +
//         `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse"><tr>` +
//         `<td width="${sz}" height="${sz}" align="center" valign="middle" ` +
//         `style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${br};text-align:center;vertical-align:middle;` +
//         `font-size:${fs}px;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;line-height:${sz}px">` +
//         `${abbr}</td></tr></table></td></tr></table></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr>` +
//       `<td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditorField value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const [expanded, setExpanded] = useState(null)
//   const links = p.links || []

//   const add = () => {
//     const l = { id:newId(), name:'Facebook', url:'#', color:'#1877f2', size:'', pt:'', pb:'', pl:'', pr:'' }
//     u('links', [...links, l])
//     setExpanded(l.id)
//   }
//   const del  = id  => { u('links', links.filter(l=>l.id!==id)); if(expanded===id) setExpanded(null) }
//   const upd  = (id,k,v) => u('links', links.map(l=>l.id===id?{...l,[k]:v}:l))
//   const move = (idx, dir) => {
//     const arr=[...links], j=idx+dir
//     if(j<0||j>=arr.length) return
//     ;[arr[idx],arr[j]]=[arr[j],arr[idx]]
//     u('links',arr)
//   }

//   const ALL_PLATFORMS = Object.keys(SOCIAL_ABBR).map(k=>[k,k])

//   return <>
//     <Section title="Row Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Default Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap between icons" value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <Row2>
//       <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//       <div>
//         <span style={s.label}>Shape</span>
//         <select value={p.borderRadius||'50'} onChange={e=>u('borderRadius',e.target.value)} style={s.select}>
//           <option value="50">Circle</option>
//           <option value="20">Rounded</option>
//           <option value="0">Square</option>
//         </select>
//       </div>
//     </Row2>

//     <Section title="Icons (drag ↑↓ to reorder)" />
//     <button onClick={add}
//       style={{ width:'100%', padding:'7px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, marginBottom:8 }}>
//       + Add Social Icon
//     </button>

//     {links.map((l,idx) => {
//       const isOpen = expanded === l.id
//       return (
//         <div key={l.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, marginBottom:6, overflow:'hidden' }}>
//           {/* Header row */}
//           <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', background: isOpen?'#eff6ff':'#f8fafc', cursor:'pointer' }}
//             onClick={()=>setExpanded(isOpen ? null : l.id)}>
//             {/* Color circle preview */}
//             <div style={{ width:22, height:22, borderRadius:'50%', background:l.color||SOCIAL_COLORS[l.name]||'#666', flexShrink:0,
//               display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'white', fontWeight:700 }}>
//               {(SOCIAL_ABBR[l.name]||l.name.slice(0,2)).slice(0,2)}
//             </div>
//             <span style={{ flex:1, fontSize:12, fontWeight:600, color:'#374151' }}>{l.name}</span>
//             {/* Move up/down */}
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,-1)}}
//               style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↑</button>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,1)}}
//               style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↓</button>
//             <button onMouseDown={e=>{e.stopPropagation();del(l.id)}}
//               style={{ padding:'1px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:3, cursor:'pointer' }}>✕</button>
//             <span style={{ fontSize:10, color:'#94a3b8' }}>{isOpen?'▲':'▼'}</span>
//           </div>

//           {/* Expanded settings */}
//           {isOpen && (
//             <div style={{ padding:'8px 10px', borderTop:'1px solid #e2e8f0' }}>
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Platform</span>
//                 <select value={l.name}
//                   onChange={e=>{ upd(l.id,'name',e.target.value); upd(l.id,'color',SOCIAL_COLORS[e.target.value]||'#666') }}
//                   style={s.select}>
//                   {ALL_PLATFORMS.map(([v,lb])=><option key={v} value={v}>{lb}</option>)}
//                 </select>
//               </div>
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Link URL</span>
//                 <StableInput value={l.url||''} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." style={s.input} />
//               </div>
//               <ColorField label="Icon Color" value={l.color||SOCIAL_COLORS[l.name]||'#666'} onChange={v=>upd(l.id,'color',v)} />
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Custom Size (px) — leave blank for default</span>
//                 <StableInput value={l.size||''} onChange={v=>upd(l.id,'size',v)} type="number" placeholder={p.iconSize||'36'} style={s.input} />
//               </div>
//               <div style={{ marginBottom:4 }}>
//                 <span style={s.label}>Icon Padding (px)</span>
//                 <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//                   {[['Top','pt'],['Bottom','pb'],['Left','pl'],['Right','pr']].map(([lb,k])=>(
//                     <div key={k}>
//                       <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{lb}</div>
//                       <StableInput value={l[k]||''} onChange={v=>upd(l.id,k,v)} type="number" placeholder="0" style={{ ...s.input, width:'100%' }} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     })}

//     <Section title="Row Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'OPEN_MODAL':
//       return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }

//     case 'CLOSE_MODAL':
//       return { ...state, openModal:null }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx, openModal } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP: Block Palette + Email Settings ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block buttons row */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>
//               {label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Email settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)}
//               style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ BOTTOM: Canvas + Properties side by side ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}

//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )

//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id}
//                       onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button
//                                     onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }

//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>

//       </div>

//       {openModal && (() => {
//         const mb = blocks.find(x=>x.id===openModal)
//         if (!mb) return null
//         const pk = mb.type==='text' ? 'html' : 'mainText'
//         return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
//       })()}
//     </div>
//   )
// }


// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }




























// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'
// import { SOCIAL_SVG } from 'src/utils/data'

// // ─────────────────────────────────────────────────────────────────
// // FIX: Stable input — never loses focus
// // Key is set ONCE on mount based on field identity, not value
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   // Only sync from outside if user is NOT focused
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, []) // only on mount

//   return (
//     <input
//       ref={ref}
//       type={type}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)

//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])

//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])

//   return (
//     <textarea
//       ref={ref}
//       defaultValue={value ?? ''}
//       placeholder={placeholder}
//       rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style}
//     />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input
//       ref={ref}
//       type="color"
//       defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }}
//     />
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // TEXT EDITOR MODAL — opens when "Edit Text" clicked in properties
// // ─────────────────────────────────────────────────────────────────
// const EditorModal = memo(({ value, onChange, onClose }) => {
//   const ref       = useRef(null)
//   const isFocused = useRef(true)

//   useEffect(() => {
//     if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() }
//   }, [])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }

//   const insertVar = v => {
//     ref.current?.focus()
//     document.execCommand('insertText', false, v)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }

//   const SEP = '|'
//   const row1 = [
//     { t:'B',       title:'Bold',          cmd:()=>exec('bold'),            s:{fontWeight:700} },
//     { t:'I',       title:'Italic',        cmd:()=>exec('italic'),          s:{fontStyle:'italic'} },
//     { t:'U',       title:'Underline',     cmd:()=>exec('underline'),       s:{textDecoration:'underline'} },
//     { t:'S',       title:'Strike',        cmd:()=>exec('strikeThrough'),   s:{textDecoration:'line-through'} },
//     { t:SEP },
//     { t:'≡L',      title:'Left',          cmd:()=>exec('justifyLeft') },
//     { t:'≡C',      title:'Center',        cmd:()=>exec('justifyCenter') },
//     { t:'≡R',      title:'Right',         cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list',  title:'Bullet list',   cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list', title:'Number list',   cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗',      title:'Add link',      cmd:insertLink },
//     { t:'✕🔗',    title:'Remove link',   cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'Heading 1', cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'Heading 2', cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Paragraph', cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr', title:'Clear format', cmd:()=>exec('removeFormat') },
//   ]
//   const QCOLORS = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
//   const HLCOLORS= ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
//   const btnS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
//       <div style={{ background:'white', borderRadius:12, width:'min(780px,92vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

//         {/* Modal header */}
//         <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>Edit Text Block</span>
//           <button onClick={onClose} style={{ padding:'5px 14px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>Done ✓</button>
//         </div>

//         {/* Row 1 — format toolbar */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
//           {row1.map((t,i) => {
//             if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
//             return (
//               <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//                 style={{ ...btnS, ...(t.s||{}) }}
//                 onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//                 onMouseLeave={e=>e.currentTarget.style.background='none'}>
//                 {t.t}
//               </button>
//             )
//           })}
//         </div>

//         {/* Row 2 — font + size + colors */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
//           <select title="Font" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Font</option>
//             {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>(
//               <option key={v} value={v} style={{fontFamily:v}}>{l}</option>
//             ))}
//           </select>
//           <select title="Size" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Size</option>
//             {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>(
//               <option key={v} value={v}>{l}</option>
//             ))}
//           </select>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
//             <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
//           </label>
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
//             <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
//           </label>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <div style={{ display:'flex', gap:3 }}>
//             {QCOLORS.map(c=>(
//               <button key={c} title={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
//                 style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//           <div style={{ display:'flex', gap:3 }}>
//             <span style={{ fontSize:11, color:'#94a3b8', alignSelf:'center' }}>HL:</span>
//             {HLCOLORS.map(c=>(
//               <button key={c} title={'Highlight: '+c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
//                 style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//         </div>

//         {/* Row 3 — personalization */}
//         <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
//           <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//           {['{{name}}','{{company}}','{{email}}'].map(v=>(
//             <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//               style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>
//               {v}
//             </button>
//           ))}
//         </div>

//         {/* Editable area */}
//         <div
//           ref={ref}
//           contentEditable
//           suppressContentEditableWarning
//           onFocus={()=>{ isFocused.current=true }}
//           onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//           onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//           style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:280 }}
//         />

//         {/* Footer */}
//         <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', flexShrink:0, display:'flex', justifyContent:'flex-end', gap:8 }}>
//           <button onClick={()=>{ if(ref.current) { ref.current.innerHTML=''; onChange('') } }}
//             style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>
//             Clear All
//           </button>
//           <button onClick={onClose}
//             style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>
//             Done ✓
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // RICH EDITOR FIELD — small preview in props panel, opens modal
// // ─────────────────────────────────────────────────────────────────
// const RichEditorField = memo(({ value, onChange }) => {
//   const [open, setOpen] = useState(false)

//   return (
//     <>
//       {/* Preview box */}
//       <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
//         <div
//           dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Email body yahan dikhega...</span>' }}
//           style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:90, overflow:'hidden', pointerEvents:'none' }}
//         />
//         <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <span style={{ fontSize:10, color:'#94a3b8' }}>Click to edit</span>
//           <button onClick={()=>setOpen(true)}
//             style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
//             Edit Text
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
//     </>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field = memo(({ label, value, onChange, type='text', placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} />
//   </div>
// ))

// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
//       style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} />
//   </div>
// ))

// const ColorField = memo(({ label, value, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'flex', gap:6, alignItems:'center' }}>
//       <StableColor value={value} onChange={onChange} />
//       <StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} />
//     </div>
//   </div>
// ))

// const SelectField = memo(({ label, value, onChange, options }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>
//       {options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}
//     </select>
//   </div>
// ))

// const ToggleField = memo(({ label, value, onChange }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div onClick={()=>onChange(value==='true'?'false':'true')}
//       style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}>
//       <div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} />
//     </div>
//   </div>
// ))

// const SpacingGrid = memo(({ label, values, keys, onChange }) => (
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>{label}</span>
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//       {[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(
//         <div key={l}>
//           <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div>
//           <StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number"
//             style={{ ...s.input, width:'100%' }} />
//         </div>
//       ))}
//     </div>
//   </div>
// ))

// const Row2 = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// // ─────────────────────────────────────────────────────────────────
// // BLOCK DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg', Snapchat:'Sc', Reddit:'Re', Discord:'Di', Spotify:'Sp', Medium:'Me', Dribbble:'Dr', Behance:'Be', Vimeo:'Vi', Twitch:'Tv', Email:'Em' }


// const SOCIAL_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#24292e', Telegram:'#2ca5e0', Snapchat:'#fffc00', Reddit:'#ff4500', Discord:'#5865f2', Spotify:'#1db954', Medium:'#000000', Dribbble:'#ea4c89', Behance:'#1769ff', Vimeo:'#1ab7ea', Twitch:'#9146ff', Email:'#6366f1' }

// const D = { // defaults
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', borderRadius:'50', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Instagram',url:'#',color:'#e1306c',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2',size:'',pt:'',pb:'',pl:'',pr:''}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`

//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

//   if (b.type==='image') {
//     const img = p.src
//       ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
//       : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }

//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }

//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }

//   if (b.type==='social') {
//     const defaultSz = parseInt(p.iconSize||36)
//     const half = Math.floor(parseInt(p.gap||12)/2)
//     const br = p.borderRadius==='50' ? '50%' : p.borderRadius==='20' ? '8px' : '4px'
//     // CDN slug map for simpleicons
//     const SLUG = { Facebook:'facebook', Twitter:'x', Instagram:'instagram', LinkedIn:'linkedin',
//       YouTube:'youtube', Pinterest:'pinterest', TikTok:'tiktok', WhatsApp:'whatsapp',
//       GitHub:'github', Telegram:'telegram', Snapchat:'snapchat', Reddit:'reddit',
//       Discord:'discord', Spotify:'spotify', Medium:'medium', Dribbble:'dribbble',
//       Behance:'behance', Vimeo:'vimeo', Twitch:'twitch', Email:'gmail' }
//     const icons = (p.links||[]).map(l=>{
//       const sz  = parseInt(l.size||defaultSz)
//       const bg  = l.color || SOCIAL_COLORS[l.name] || '#666'
//       const ipt = parseInt(l.pt||0), ipb=parseInt(l.pb||0), ipl=parseInt(l.pl||0), ipr=parseInt(l.pr||0)
//       const slug = SLUG[l.name] || l.name.toLowerCase()
//       // Use simpleicons CDN — white icon on colored circle
//       // const iconUrl = `https://cdn.simpleicons.org/${slug}/ffffff`
//   //  const iconUrl = `https://cdn.simpleicons.org/${slug}/ffffff?v=${l.name}`
// const svgPath = SOCIAL_SVG[l.name]


//       const iconSz = Math.round(sz * 0.52)
//       const inner = svgPath
//   ? `<svg width="${iconSz}" height="${iconSz}" viewBox="0 0 24 24" fill="white" style="display:block;margin:0 auto;">
//        <path d="${svgPath}"/>
//      </svg>`
//   : `<span style="display:block;width:${iconSz}px;height:${iconSz}px;line-height:${iconSz}px;text-align:center;color:white;font-size:10px;font-weight:bold;">
//        ${(l.name || '').slice(0,2)}
//      </span>`
//       // const inner = `<img src="${iconUrl}" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;width:${iconSz}px;height:${iconSz}px; margin: 0 auto;">`
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none;vertical-align:middle" target="_blank">` +
//         `<table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:collapse"><tr>` +
//         `<td width="${sz}" height="${sz}" align="center" valign="middle" ` +
//         `style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${br};` +
//         `text-align:center;vertical-align:middle;padding:${ipt}px ${ipr}px ${ipb}px ${ipl}px">` +
//         `${inner}</td></tr></table></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr>` +
//       `<td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
//   }

//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }

//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS per block type
// // ─────────────────────────────────────────────────────────────────
// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Email Body</span>
//     <RichEditorField value={p.html} onChange={v=>u('html',v)} />
//   </div>
//   <Section title="Typography" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const HeadingPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <Field label="Text" value={p.text} onChange={v=>u('text',v)} />
//   <SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} />
//   <Section title="Style" />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//     <Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <ColorField label="Background"  value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ImagePanel = memo(({ p, u }) => <>
//   <Section title="Image" />
//   <Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." />
//   <Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." />
//   <Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} />
//   <Row2>
//     <Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" />
//     <Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ButtonPanel = memo(({ p, u }) => <>
//   <Section title="Button" />
//   <Field label="Button Text" value={p.text} onChange={v=>u('text',v)} />
//   <Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." />
//   <Section title="Style" />
//   <ColorField label="Button Color" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"   value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//   </Row2>
//   <Row2>
//     <Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" />
//     <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//   </Row2>
//   <ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} />
//   <Section title="Button Padding" />
//   {sp(p,u)}
//   <Section title="Outer Margin" />
//   {sm(p,u)}
// </>)

// const DividerPanel = memo(({ p, u }) => <>
//   <Section title="Line" />
//   <ColorField label="Color" value={p.color} onChange={v=>u('color',v)} />
//   <Row2>
//     <Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" />
//     <SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} />
//   </Row2>
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SpacerPanel = memo(({ p, u }) => <>
//   <Section title="Spacer" />
//   <Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" />
//   <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//   <Section title="Margin" />
//   {sm(p,u)}
// </>)

// const BannerPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Main Text</span>
//     <RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Style" />
//   <ColorField label="Background"    value={p.bgColor}      onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"    value={p.textColor}    onChange={v=>u('textColor',v)} />
//   <ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} />
//   <Row2>
//     <Field label="Main Size (px)"   value={p.fontSize}     onChange={v=>u('fontSize',v)}     type="number" />
//     <Field label="Sub Size (px)"    value={p.subtextSize}  onChange={v=>u('subtextSize',v)}  type="number" />
//   </Row2>
//   <Row2>
//     <SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} />
//     <SelectField label="Align"  value={p.textAlign}  onChange={v=>u('textAlign',v)}  options={ALIGNS} />
//   </Row2>
//   <SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const SocialPanel = memo(({ p, u }) => {
//   const [expanded, setExpanded] = useState(null)
//   const links = p.links || []

//   const add = () => {
//     const l = { id:newId(), name:'Facebook', url:'#', color:'#1877f2', size:'', pt:'', pb:'', pl:'', pr:'' }
//     u('links', [...links, l])
//     setExpanded(l.id)
//   }
//   const del  = id  => { u('links', links.filter(l=>l.id!==id)); if(expanded===id) setExpanded(null) }
//   const upd  = (id,k,v) => u('links', links.map(l=>l.id===id?{...l,[k]:v}:l))
//   const move = (idx, dir) => {
//     const arr=[...links], j=idx+dir
//     if(j<0||j>=arr.length) return
//     ;[arr[idx],arr[j]]=[arr[j],arr[idx]]
//     u('links',arr)
//   }
//   const moveTo = (fromIdx, toPos) => {
//     const to = Math.max(0, Math.min(links.length-1, parseInt(toPos)-1))
//     if(isNaN(to) || to===fromIdx) return
//     const arr=[...links]
//     const [item]=arr.splice(fromIdx,1)
//     arr.splice(to,0,item)
//     u('links',arr)
//   }

//   const ALL_PLATFORMS = Object.keys(SOCIAL_ABBR).map(k=>[k,k])

//   return <>
//     <Section title="Row Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Default Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap between icons" value={p.gap}      onChange={v=>u('gap',v)}      type="number" />
//     </Row2>
//     <Row2>
//       <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//       <div>
//         <span style={s.label}>Shape</span>
//         <select value={p.borderRadius||'50'} onChange={e=>u('borderRadius',e.target.value)} style={s.select}>
//           <option value="50">Circle</option>
//           <option value="20">Rounded</option>
//           <option value="0">Square</option>
//         </select>
//       </div>
//     </Row2>

//     <Section title="Icons (drag ↑↓ to reorder)" />
//     <button onClick={add}
//       style={{ width:'100%', padding:'7px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, marginBottom:8 }}>
//       + Add Social Icon
//     </button>

//     {links.map((l,idx) => {
//       const isOpen = expanded === l.id
//       return (
//         <div key={l.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, marginBottom:6, overflow:'hidden' }}>
//           {/* Header row */}
//           <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', background: isOpen?'#eff6ff':'#f8fafc', cursor:'pointer' }}
//             onClick={()=>setExpanded(isOpen ? null : l.id)}>
//             {/* Position number */}
//             <div style={{ width:18, height:18, borderRadius:'50%', background:'#e2e8f0', flexShrink:0,
//               display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#64748b', fontWeight:700, cursor:'default' }}
//               title="Position">
//               {idx+1}
//             </div>
//             {/* Color circle preview */}
//             <div style={{ width:22, height:22, borderRadius:'50%', background:l.color||SOCIAL_COLORS[l.name]||'#666', flexShrink:0,
//               display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'white', fontWeight:700 }}>
//               <img src={`https://cdn.simpleicons.org/${({'Facebook':'facebook','Twitter':'x','Instagram':'instagram','LinkedIn':'linkedin','YouTube':'youtube','Pinterest':'pinterest','TikTok':'tiktok','WhatsApp':'whatsapp','GitHub':'github','Telegram':'telegram','Snapchat':'snapchat','Reddit':'reddit','Discord':'discord','Spotify':'spotify','Medium':'medium','Dribbble':'dribbble','Behance':'behance','Vimeo':'vimeo','Twitch':'twitch','Email':'gmail'})[l.name]||l.name.toLowerCase()}/ffffff`}
//                 width="12" height="12" alt="" style={{ display:'block' }}
//                 onError={e=>{ e.target.style.display='none'; e.target.nextSibling.style.display='block' }} />
//               <span style={{ display:'none', fontSize:8 }}>{(SOCIAL_ABBR[l.name]||l.name.slice(0,2)).slice(0,2)}</span>
//             </div>
//             <span style={{ flex:1, fontSize:12, fontWeight:600, color:'#374151' }}>{l.name}</span>
//             {/* Move up/down */}
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,-1)}}
//               style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↑</button>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,1)}}
//               style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↓</button>
//             <button onMouseDown={e=>{e.stopPropagation();del(l.id)}}
//               style={{ padding:'1px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:3, cursor:'pointer' }}>✕</button>
//             <span style={{ fontSize:10, color:'#94a3b8' }}>{isOpen?'▲':'▼'}</span>
//           </div>

//           {/* Expanded settings */}
//           {isOpen && (
//             <div style={{ padding:'8px 10px', borderTop:'1px solid #e2e8f0' }}>
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Platform</span>
//                 {/* <select value={l.name}
//                   onChange={e=>{ upd(l.id,'name',e.target.value); upd(l.id,'color',SOCIAL_COLORS[e.target.value]||'#666') }}
//                   style={s.select}>
//                   {ALL_PLATFORMS.map(([v,lb])=><option key={v} value={v}>{lb}</option>)}
//                 </select> */}

// <select value={l.name}
//   onChange={e=>{
//     const newName = e.target.value

//     const updatedLinks = (p.links || []).map(item =>
//       item.id === l.id
//         ? {
//             ...item,
//             name: newName,
//             color: SOCIAL_COLORS[newName] || '#666'
//           }
//         : item
//     )

//     u('links', updatedLinks)
//   }}
//   style={s.select}
// >
// {ALL_PLATFORMS.map(([value, label]) => (
//   <option key={value} value={value}>
//     {label}
//   </option>
// ))}
// </select>
//               </div>
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Link URL</span>
//                 <StableInput value={l.url||''} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." style={s.input} />
//               </div>
//               <ColorField label="Icon Color" value={l.color||SOCIAL_COLORS[l.name]||'#666'} onChange={v=>upd(l.id,'color',v)} />
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Custom Size (px) — leave blank for default</span>
//                 <StableInput value={l.size||''} onChange={v=>upd(l.id,'size',v)} type="number" placeholder={p.iconSize||'36'} style={s.input} />
//               </div>
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Move to Position (1 = first)</span>
//                 <div style={{ display:'flex', gap:6 }}>
//                   <StableInput value={String(idx+1)} onChange={()=>{}} type="number" style={{ ...s.input, width:60, textAlign:'center' }} />
//                   <select defaultValue="" onChange={e=>{ if(e.target.value) moveTo(idx, e.target.value); e.target.value='' }}
//                     style={{ ...s.input, flex:1, cursor:'pointer' }}>
//                     <option value="">Jump to position...</option>
//                     {links.map((_,i)=>i!==idx&&<option key={i} value={i+1}>Position {i+1}</option>)}
//                   </select>
//                 </div>
//               </div>
//               <div style={{ marginBottom:4 }}>
//                 <span style={s.label}>Icon Padding (px)</span>
//                 <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//                   {[['Top','pt'],['Bottom','pb'],['Left','pl'],['Right','pr']].map(([lb,k])=>(
//                     <div key={k}>
//                       <div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{lb}</div>
//                       <StableInput value={l[k]||''} onChange={v=>upd(l.id,k,v)} type="number" placeholder="0" style={{ ...s.input, width:'100%' }} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     })}

//     <Section title="Row Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <>
//   <Section title="Content" />
//   <div style={{ marginBottom:10 }}>
//     <span style={s.label}>Footer Text</span>
//     <RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} />
//   </div>
//   <Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} />
//   <Section title="Unsubscribe" />
//   <ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />
//   {p.showUnsub==='true' && <>
//     <Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} />
//     <Field label="Unsubscribe URL"  value={p.unsubUrl}  onChange={v=>u('unsubUrl',v)} placeholder="https://..." />
//   </>}
//   <Section title="Style" />
//   <ColorField label="Background" value={p.bgColor}   onChange={v=>u('bgColor',v)} />
//   <ColorField label="Text Color"  value={p.textColor} onChange={v=>u('textColor',v)} />
//   <Row2>
//     <Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" />
//     <Field label="Line Height"    value={p.lineHeight} onChange={v=>u('lineHeight',v)} />
//   </Row2>
//   <SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} />
//   <Section title="Spacing" />
//   {sp(p,u)}{sm(p,u)}
// </>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]

//   const updateCols = next => u('cols', next)
//   const addCol    = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp= (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]

//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
//       <span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span>
//       <button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button>
//     </div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>
//       {cols.map((_,i)=>(
//         <div key={i} style={{ display:'flex', gap:2 }}>
//           <button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':' white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>
//           {cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}
//         </div>
//       ))}
//     </div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}>
//       <div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div>
//       <Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" />
//       <ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} />
//       <div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>
//         💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo
//       </div>
//     </div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// // ─────────────────────────────────────────────────────────────────
// // MAIN BUILDER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',   desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading',  desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',     desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',    desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',   desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns',  desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider',  desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',   desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',   desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',   desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// // state structure
// const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null }) // colCtx = {blockId, colIdx} when adding to col

// function reducer(state, action) {
//   switch(action.type) {

//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         // insert into column
//         const { blockId, colIdx } = action.colCtx
//         return {
//           ...state,
//           colCtx: null,
//           blocks: state.blocks.map(bl => bl.id!==blockId ? bl : {
//             ...bl, props: { ...bl.props, cols: bl.props.cols.map((c,i) => i!==colIdx ? c : { ...c, blocks:[...(c.blocks||[]),b] }) }
//           })
//         }
//       }
//       return { ...state, blocks:[...state.blocks, b], sel:{ id:b.id, colCtx:null } }
//     }

//     case 'SELECT':
//       return { ...state, sel:action.sel }

//     case 'OPEN_MODAL':
//       return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }

//     case 'CLOSE_MODAL':
//       return { ...state, openModal:null }

//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) {
//         return { ...state, sel:null, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       }
//       return { ...state, sel:null, blocks: state.blocks.filter(b=>b.id!==id) }
//     }

//     case 'DUPLICATE': {
//       const idx = state.blocks.findIndex(b=>b.id===action.id)
//       if(idx<0) return state
//       const copy = { ...deep(state.blocks[idx]), id:newId() }
//       const next = [...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }

//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }

//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) {
//         return { ...state, blocks: state.blocks.map(bl => bl.id!==colCtx.blockId ? bl : { ...bl, props:{ ...bl.props, cols: bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks: c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       }
//       return { ...state, blocks: state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }

//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks: state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols = bl.props.cols.map((c,ci)=>{
//           if(ci!==colIdx) return c
//           const arr=[...(c.blocks||[])], i=arr.findIndex(b=>b.id===id), j=i+dir
//           if(j<0||j>=arr.length) return c
//           ;[arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr}
//         })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }

//     case 'SET_COL_CTX':
//       return { ...state, colCtx:action.ctx }

//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   const { blocks, sel, colCtx, openModal } = state

//   // find selected block (main or inner)
//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP: Block Palette + Email Settings ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block buttons row */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>
//               {label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Email settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)}
//               style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ BOTTOM: Canvas + Properties side by side ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}

//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )

//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id}
//                       onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button
//                                     onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }

//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>

//       </div>

//       {openModal && (() => {
//         const mb = blocks.find(x=>x.id===openModal)
//         if (!mb) return null
//         const pk = mb.type==='text' ? 'html' : 'mainText'
//         return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
//       })()}
//     </div>
//   )
// }


// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }








































// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'
// import axios from 'axios'
// import { Url } from 'src/url/url'
// import { SOCIAL_SVG } from 'src/utils/data'

// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])
//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])
//   return (
//     <input ref={ref} type={type} defaultValue={value ?? ''} placeholder={placeholder}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style} />
//   )
// })

// const StableTextarea = memo(({ value, onChange, rows=4, style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)
//   useEffect(() => {
//     if (ref.current) ref.current.value = value ?? ''
//     lastVal.current = value
//   }, [])
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''
//       lastVal.current = value
//     }
//   }, [value])
//   return (
//     <textarea ref={ref} defaultValue={value ?? ''} placeholder={placeholder} rows={rows}
//       onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }}
//       style={style} />
//   )
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return (
//     <input ref={ref} type="color" defaultValue={value || '#000000'}
//       onChange={e => onChange(e.target.value)}
//       style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }} />
//   )
// })

// const EditorModal = memo(({ value, onChange, onClose }) => {
//   const ref       = useRef(null)
//   const isFocused = useRef(true)
//   useEffect(() => {
//     if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() }
//   }, [])
//   const exec = (cmd, val=null) => {
//     ref.current?.focus()
//     document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }
//   const insertLink = () => {
//     const url = window.prompt('Link URL daalo:', 'https://')
//     if (url) exec('createLink', url)
//   }
//   const insertVar = v => {
//     ref.current?.focus()
//     document.execCommand('insertText', false, v)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }
//   const SEP = '|'
//   const row1 = [
//     { t:'B', title:'Bold', cmd:()=>exec('bold'), s:{fontWeight:700} },
//     { t:'I', title:'Italic', cmd:()=>exec('italic'), s:{fontStyle:'italic'} },
//     { t:'U', title:'Underline', cmd:()=>exec('underline'), s:{textDecoration:'underline'} },
//     { t:'S', title:'Strike', cmd:()=>exec('strikeThrough'), s:{textDecoration:'line-through'} },
//     { t:SEP },
//     { t:'≡L', title:'Left', cmd:()=>exec('justifyLeft') },
//     { t:'≡C', title:'Center', cmd:()=>exec('justifyCenter') },
//     { t:'≡R', title:'Right', cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list', title:'Bullet list', cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list', title:'Number list', cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗', title:'Add link', cmd:insertLink },
//     { t:'✕🔗', title:'Remove link', cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'Heading 1', cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'Heading 2', cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Paragraph', cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr', title:'Clear format', cmd:()=>exec('removeFormat') },
//   ]
//   const QCOLORS  = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
//   const HLCOLORS = ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
//   const btnS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }
//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
//       <div style={{ background:'white', borderRadius:12, width:'min(780px,92vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
//         <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>Edit Text Block</span>
//           <button onClick={onClose} style={{ padding:'5px 14px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>Done ✓</button>
//         </div>
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
//           {row1.map((t,i) => {
//             if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
//             return (
//               <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//                 style={{ ...btnS, ...(t.s||{}) }}
//                 onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//                 onMouseLeave={e=>e.currentTarget.style.background='none'}>
//                 {t.t}
//               </button>
//             )
//           })}
//         </div>
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
//           <select title="Font" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Font</option>
//             {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>(
//               <option key={v} value={v} style={{fontFamily:v}}>{l}</option>
//             ))}
//           </select>
//           <select title="Size" onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Size</option>
//             {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>(
//               <option key={v} value={v}>{l}</option>
//             ))}
//           </select>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
//             <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
//           </label>
//           <label style={{ display:'flex', alignItems:'center', gap:3, cursor:'pointer' }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
//             <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
//           </label>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <div style={{ display:'flex', gap:3 }}>
//             {QCOLORS.map(c=>(
//               <button key={c} title={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
//                 style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//           <div style={{ display:'flex', gap:3 }}>
//             <span style={{ fontSize:11, color:'#94a3b8', alignSelf:'center' }}>HL:</span>
//             {HLCOLORS.map(c=>(
//               <button key={c} title={'Highlight: '+c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
//                 style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />
//             ))}
//           </div>
//         </div>
//         <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
//           <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//           {['{{name}}','{{company}}','{{email}}'].map(v=>(
//             <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//               style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>
//               {v}
//             </button>
//           ))}
//         </div>
//         <div ref={ref} contentEditable suppressContentEditableWarning
//           onFocus={()=>{ isFocused.current=true }}
//           onBlur={()=>{ isFocused.current=false; onChange(ref.current?.innerHTML||'') }}
//           onInput={()=>{ onChange(ref.current?.innerHTML||'') }}
//           style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:280 }} />
//         <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', flexShrink:0, display:'flex', justifyContent:'flex-end', gap:8 }}>
//           <button onClick={()=>{ if(ref.current) { ref.current.innerHTML=''; onChange('') } }}
//             style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>
//             Clear All
//           </button>
//           <button onClick={onClose}
//             style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:600 }}>
//             Done ✓
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// })

// const RichEditorField = memo(({ value, onChange }) => {
//   const [open, setOpen] = useState(false)
//   return (
//     <>
//       <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
//         <div dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Email body yahan dikhega...</span>' }}
//           style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:90, overflow:'hidden', pointerEvents:'none' }} />
//         <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//           <span style={{ fontSize:10, color:'#94a3b8' }}>Click to edit</span>
//           <button onClick={()=>setOpen(true)}
//             style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
//             Edit Text
//           </button>
//         </div>
//       </div>
//       {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
//     </>
//   )
// })

// const s = {
//   label:        { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input:        { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select:       { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }

// const Field         = memo(({ label, value, onChange, type='text', placeholder='' }) => (<div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} /></div>))
// const TextareaField = memo(({ label, value, onChange, rows=4, placeholder='' }) => (<div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><StableTextarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} style={{ ...s.input, resize:'vertical', lineHeight:1.5 }} /></div>))
// const ColorField    = memo(({ label, value, onChange }) => (<div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'flex', gap:6, alignItems:'center' }}><StableColor value={value} onChange={onChange} /><StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} /></div></div>))
// const SelectField   = memo(({ label, value, onChange, options }) => (<div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>{options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}</select></div>))
// const ToggleField   = memo(({ label, value, onChange }) => (<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}><span style={s.label}>{label}</span><div onClick={()=>onChange(value==='true'?'false':'true')} style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}><div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} /></div></div>))
// const SpacingGrid   = memo(({ label, values, keys, onChange }) => (<div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>{[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=>(<div key={l}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div><StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number" style={{ ...s.input, width:'100%' }} /></div>))}</div></div>))
// const Row2    = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>
// const Divider = () => <div style={{ borderTop:'1px solid #f1f5f9', margin:'8px 0' }} />

// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS   = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS  = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR   = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg', Snapchat:'Sc', Reddit:'Re', Discord:'Di', Spotify:'Sp', Medium:'Me', Dribbble:'Dr', Behance:'Be', Vimeo:'Vi', Twitch:'Tv', Email:'Em' }
// const SOCIAL_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#24292e', Telegram:'#2ca5e0', Snapchat:'#fffc00', Reddit:'#ff4500', Discord:'#5865f2', Spotify:'#1db954', Medium:'#000000', Dribbble:'#ea4c89', Behance:'#1769ff', Vimeo:'#1ab7ea', Twitch:'#9146ff', Email:'#6366f1' }

// const D = {
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', borderRadius:'50', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Instagram',url:'#',color:'#e1306c',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2',size:'',pt:'',pb:'',pl:'',pr:''}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props
//   const ms = `margin:${mars(p)};`
//   if (b.type==='text')    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`
//   if (b.type==='heading') return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`
//   if (b.type==='image') {
//     const img = p.src ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">` : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image — URL daalo ]</div>`
//     const inner = p.link ? `<a href="${p.link}" style="display:block">${img}</a>` : img
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${inner}</td></tr></table>`
//   }
//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     const btn = `<a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0">${btn}</td></tr></table>`
//   }
//   if (b.type==='divider') return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`
//   if (b.type==='spacer')  return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`
//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }
//   if (b.type==='social') {
//     const defaultSz = parseInt(p.iconSize||36)
//     const half = Math.floor(parseInt(p.gap||12)/2)
//     const br = p.borderRadius==='50' ? '50%' : p.borderRadius==='20' ? '8px' : '4px'
//     const SLUG = { Facebook:'facebook', Twitter:'x', Instagram:'instagram', LinkedIn:'linkedin', YouTube:'youtube', Pinterest:'pinterest', TikTok:'tiktok', WhatsApp:'whatsapp', GitHub:'github', Telegram:'telegram', Snapchat:'snapchat', Reddit:'reddit', Discord:'discord', Spotify:'spotify', Medium:'medium', Dribbble:'dribbble', Behance:'behance', Vimeo:'vimeo', Twitch:'twitch', Email:'gmail' }
//     const icons = (p.links||[]).map(l=>{
//       const sz  = parseInt(l.size||defaultSz)
//       const bg  = l.color || SOCIAL_COLORS[l.name] || '#666'
//       const ipt = parseInt(l.pt||0), ipb=parseInt(l.pb||0), ipl=parseInt(l.pl||0), ipr=parseInt(l.pr||0)
//       const svgPath = SOCIAL_SVG[l.name]
//       const iconSz = Math.round(sz * 0.52)
//       const inner = svgPath
//         ? `<svg width="${iconSz}" height="${iconSz}" viewBox="0 0 24 24" fill="white" style="display:block;margin:0 auto;"><path d="${svgPath}"/></svg>`
//         : `<span style="display:block;width:${iconSz}px;height:${iconSz}px;line-height:${iconSz}px;text-align:center;color:white;font-size:10px;font-weight:bold;">${(l.name || '').slice(0,2)}</span>`
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none;vertical-align:middle" target="_blank"><table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:collapse"><tr><td width="${sz}" height="${sz}" align="center" valign="middle" style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${br};text-align:center;vertical-align:middle;padding:${ipt}px ${ipr}px ${ipb}px ${ipl}px">${inner}</td></tr></table></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
//   }
//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }
//   if (b.type==='columns') {
//     const cols = p.cols||[]
//     const g = parseInt(p.gap||8)
//     const colsHTML = cols.map(col=>{
//       const inner = (col.blocks||[]).map(renderEl).join('')
//       return `<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${inner||'&nbsp;'}</td>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${colsHTML}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// const sp = (p, u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p, u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel    = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Email Body</span><RichEditorField value={p.html} onChange={v=>u('html',v)} /></div><Section title="Typography" /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const HeadingPanel = memo(({ p, u }) => <><Section title="Content" /><Field label="Text" value={p.text} onChange={v=>u('text',v)} /><SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1 — Largest'],['h2','H2'],['h3','H3'],['h4','H4 — Smallest']]} /><Section title="Style" /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const ImagePanel   = memo(({ p, u }) => <><Section title="Image" /><Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." /><Field label="Click Link (optional)" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." /><Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} /><Row2><Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" /><Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /></Row2><Row2><Field label="Border Radius (px)" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const ButtonPanel  = memo(({ p, u }) => <><Section title="Button" /><Field label="Button Text" value={p.text} onChange={v=>u('text',v)} /><Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." /><Section title="Style" /><ColorField label="Button Color" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} /><Section title="Button Padding" />{sp(p,u)}<Section title="Outer Margin" />{sm(p,u)}</>)
// const DividerPanel = memo(({ p, u }) => <><Section title="Line" /><ColorField label="Color" value={p.color} onChange={v=>u('color',v)} /><Row2><Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" /><SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} /></Row2><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const SpacerPanel  = memo(({ p, u }) => <><Section title="Spacer" /><Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Margin" />{sm(p,u)}</>)
// const BannerPanel  = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Main Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} /><Row2><Field label="Main Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Sub Size (px)" value={p.subtextSize} onChange={v=>u('subtextSize',v)} type="number" /></Row2><Row2><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const FooterPanel  = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Footer Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text (optional)" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Unsubscribe" /><ToggleField label="Show Unsubscribe Link" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />{p.showUnsub==='true'&&<><Field label="Unsubscribe Text" value={p.unsubText} onChange={v=>u('unsubText',v)} /><Field label="Unsubscribe URL" value={p.unsubUrl} onChange={v=>u('unsubUrl',v)} placeholder="https://..." /></>}<Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

// const SocialPanel = memo(({ p, u }) => {
//   const [expanded, setExpanded] = useState(null)
//   const links = p.links || []
//   const add  = () => { const l={id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''}; u('links',[...links,l]); setExpanded(l.id) }
//   const del  = id => { u('links',links.filter(l=>l.id!==id)); if(expanded===id) setExpanded(null) }
//   const upd  = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))
//   const move = (idx,dir) => { const arr=[...links],j=idx+dir; if(j<0||j>=arr.length) return; [arr[idx],arr[j]]=[arr[j],arr[idx]]; u('links',arr) }
//   const moveTo = (fromIdx,toPos) => { const to=Math.max(0,Math.min(links.length-1,parseInt(toPos)-1)); if(isNaN(to)||to===fromIdx) return; const arr=[...links]; const [item]=arr.splice(fromIdx,1); arr.splice(to,0,item); u('links',arr) }
//   const ALL_PLATFORMS = Object.keys(SOCIAL_ABBR).map(k=>[k,k])
//   return <>
//     <Section title="Row Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2><Field label="Default Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" /><Field label="Gap between icons" value={p.gap} onChange={v=>u('gap',v)} type="number" /></Row2>
//     <Row2><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /><div><span style={s.label}>Shape</span><select value={p.borderRadius||'50'} onChange={e=>u('borderRadius',e.target.value)} style={s.select}><option value="50">Circle</option><option value="20">Rounded</option><option value="0">Square</option></select></div></Row2>
//     <Section title="Icons (drag ↑↓ to reorder)" />
//     <button onClick={add} style={{ width:'100%', padding:'7px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, marginBottom:8 }}>+ Add Social Icon</button>
//     {links.map((l,idx)=>{
//       const isOpen=expanded===l.id
//       return (
//         <div key={l.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, marginBottom:6, overflow:'hidden' }}>
//           <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', background:isOpen?'#eff6ff':'#f8fafc', cursor:'pointer' }} onClick={()=>setExpanded(isOpen?null:l.id)}>
//             <div style={{ width:18, height:18, borderRadius:'50%', background:'#e2e8f0', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#64748b', fontWeight:700 }}>{idx+1}</div>
//             <div style={{ width:22, height:22, borderRadius:'50%', background:l.color||SOCIAL_COLORS[l.name]||'#666', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'white', fontWeight:700 }}>
//               <img src={`https://cdn.simpleicons.org/${({'Facebook':'facebook','Twitter':'x','Instagram':'instagram','LinkedIn':'linkedin','YouTube':'youtube','Pinterest':'pinterest','TikTok':'tiktok','WhatsApp':'whatsapp','GitHub':'github','Telegram':'telegram','Snapchat':'snapchat','Reddit':'reddit','Discord':'discord','Spotify':'spotify','Medium':'medium','Dribbble':'dribbble','Behance':'behance','Vimeo':'vimeo','Twitch':'twitch','Email':'gmail'})[l.name]||l.name.toLowerCase()}/ffffff`} width="12" height="12" alt="" style={{ display:'block' }} onError={e=>{ e.target.style.display='none'; e.target.nextSibling.style.display='block' }} />
//               <span style={{ display:'none', fontSize:8 }}>{(SOCIAL_ABBR[l.name]||l.name.slice(0,2)).slice(0,2)}</span>
//             </div>
//             <span style={{ flex:1, fontSize:12, fontWeight:600, color:'#374151' }}>{l.name}</span>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,-1)}} style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↑</button>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,1)}}  style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↓</button>
//             <button onMouseDown={e=>{e.stopPropagation();del(l.id)}}    style={{ padding:'1px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:3, cursor:'pointer' }}>✕</button>
//             <span style={{ fontSize:10, color:'#94a3b8' }}>{isOpen?'▲':'▼'}</span>
//           </div>
//           {isOpen&&(
//             <div style={{ padding:'8px 10px', borderTop:'1px solid #e2e8f0' }}>
//               <div style={{ marginBottom:8 }}>
//                 <span style={s.label}>Platform</span>
//                 <select value={l.name} onChange={e=>{ const n=e.target.value; u('links',(p.links||[]).map(item=>item.id===l.id?{...item,name:n,color:SOCIAL_COLORS[n]||'#666'}:item)) }} style={s.select}>
//                   {ALL_PLATFORMS.map(([v,lb])=><option key={v} value={v}>{lb}</option>)}
//                 </select>
//               </div>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Link URL</span><StableInput value={l.url||''} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." style={s.input} /></div>
//               <ColorField label="Icon Color" value={l.color||SOCIAL_COLORS[l.name]||'#666'} onChange={v=>upd(l.id,'color',v)} />
//               <div style={{ marginBottom:8 }}><span style={s.label}>Custom Size (px) — leave blank for default</span><StableInput value={l.size||''} onChange={v=>upd(l.id,'size',v)} type="number" placeholder={p.iconSize||'36'} style={s.input} /></div>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Move to Position (1 = first)</span><div style={{ display:'flex', gap:6 }}><StableInput value={String(idx+1)} onChange={()=>{}} type="number" style={{ ...s.input, width:60, textAlign:'center' }} /><select defaultValue="" onChange={e=>{ if(e.target.value) moveTo(idx,e.target.value); e.target.value='' }} style={{ ...s.input, flex:1, cursor:'pointer' }}><option value="">Jump to position...</option>{links.map((_,i)=>i!==idx&&<option key={i} value={i+1}>Position {i+1}</option>)}</select></div></div>
//               <div style={{ marginBottom:4 }}><span style={s.label}>Icon Padding (px)</span><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>{[['Top','pt'],['Bottom','pb'],['Left','pl'],['Right','pr']].map(([lb,k])=>(<div key={k}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{lb}</div><StableInput value={l[k]||''} onChange={v=>upd(l.id,k,v)} type="number" placeholder="0" style={{ ...s.input, width:'100%' }} /></div>))}</div></div>
//             </div>
//           )}
//         </div>
//       )
//     })}
//     <Section title="Row Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]
//   const updateCols = next => u('cols',next)
//   const addCol     = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol  = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp = (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]
//   return <>
//     <Section title="Row" />
//     <ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Field label="Gap Between Columns (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     <Section title="Columns" />
//     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><span style={{ fontSize:12, color:'#374151', fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span><button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button></div>
//     <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>{cols.map((_,i)=>(<div key={i} style={{ display:'flex', gap:2 }}><button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':'white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>{cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}</div>))}</div>
//     {col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}><div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div><Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" /><ColorField label="Column Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} /><div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>💡 Canvas mein Col {activeCol+1} pe click karo phir "Add to Column" se blocks daalo</div></div>}
//     <Section title="Outer Spacing" />
//     {sp(p,u)}{sm(p,u)}
//   </>
// })

// const BLOCK_DEFS  = [
//   { type:'banner',  icon:'◼', label:'Banner',  desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading', desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',    desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',   desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',  desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns', desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider', desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',  desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',  desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',  desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']

// const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null })

// function reducer(state, action) {
//   switch(action.type) {
//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         const { blockId, colIdx } = action.colCtx
//         return { ...state, colCtx:null, blocks:state.blocks.map(bl=>bl.id!==blockId?bl:{ ...bl, props:{ ...bl.props, cols:bl.props.cols.map((c,i)=>i!==colIdx?c:{ ...c, blocks:[...(c.blocks||[]),b] }) } }) }
//       }
//       return { ...state, blocks:[...state.blocks,b], sel:{ id:b.id, colCtx:null } }
//     }
//     case 'SELECT':      return { ...state, sel:action.sel }
//     case 'OPEN_MODAL':  return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }
//     case 'CLOSE_MODAL': return { ...state, openModal:null }
//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) return { ...state, sel:null, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{ ...bl, props:{ ...bl.props, cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.filter(ib=>ib.id!==id) }) } }) }
//       return { ...state, sel:null, blocks:state.blocks.filter(b=>b.id!==id) }
//     }
//     case 'DUPLICATE': {
//       const idx=state.blocks.findIndex(b=>b.id===action.id); if(idx<0) return state
//       const copy={ ...deep(state.blocks[idx]), id:newId() }
//       const next=[...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }
//     case 'MOVE': {
//       const { id, dir } = action
//       const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
//       if(j<0||j>=arr.length) return state
//       ;[arr[i],arr[j]]=[arr[j],arr[i]]
//       return { ...state, blocks:arr }
//     }
//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) return { ...state, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{ ...bl, props:{ ...bl.props, cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{ ...c, blocks:c.blocks.map(ib=>ib.id!==id?ib:{ ...ib, props:{ ...ib.props,[key]:val } }) }) } }) }
//       return { ...state, blocks:state.blocks.map(b=>b.id!==id?b:{ ...b, props:{ ...b.props,[key]:val } }) }
//     }
//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks:state.blocks.map(bl=>{ if(bl.id!==blockId) return bl; const cols=bl.props.cols.map((c,ci)=>{ if(ci!==colIdx) return c; const arr=[...(c.blocks||[])],i=arr.findIndex(b=>b.id===id),j=i+dir; if(j<0||j>=arr.length) return c; [arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr} }); return {...bl,props:{...bl.props,cols}} }) }
//     }
//     case 'SET_COL_CTX': return { ...state, colCtx:action.ctx }
//     default: return state
//   }
// }

// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch] = useReducer(reducer, null, init)
//   const [emailBg,    setEmailBg]    = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview,    setPreview]    = useState(false)

//   // ── Template Save/Load States ──
//   const [savedTemplates, setSavedTemplates] = useState([])
//   const [showSaveModal,  setShowSaveModal]  = useState(false)
//   const [showLoadDrawer, setShowLoadDrawer] = useState(false)
//   const [templateName,   setTemplateName]   = useState('')
//   const [savingTpl,      setSavingTpl]      = useState(false)

//   const { blocks, sel, colCtx, openModal } = state

//   useEffect(() => { fetchSavedTemplates() }, [])

//   const fetchSavedTemplates = async () => {
//     try {
//       const r = await axios.get(`${Url}/api/bulkmail/templates/list`)
//       setSavedTemplates(r.data.templates || [])
//     } catch(e) { console.error(e) }
//   }

//   const handleSaveTemplate = async () => {
//     if (!templateName.trim()) return alert('Template naam do!')
//     if (!blocks.length) return alert('Pehle kuch blocks add karo!')
//     setSavingTpl(true)
//     try {
//       await axios.post(`${Url}/api/bulkmail/templates/save`, {
//         name: templateName,
//         htmlBody: buildEmail(blocks, emailBg, emailWidth)
//       })
//       await fetchSavedTemplates()
//       setShowSaveModal(false)
//       setTemplateName('')
//       alert('✅ Template save ho gaya!')
//     } catch(e) { alert(e.response?.data?.message || 'Save failed') }
//     setSavingTpl(false)
//   }

//   const handleDeleteTemplate = async (id, name, e) => {
//     e.stopPropagation()
//     if (!window.confirm(`"${name}" delete karna chahte ho?`)) return
//     try {
//       await axios.delete(`${Url}/api/bulkmail/templates/${id}`)
//       await fetchSavedTemplates()
//     } catch(e) { alert('Delete failed') }
//   }

//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       const col    = parent?.props?.cols?.[sel.colCtx.colIdx]
//       selBlock     = col?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx:sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return (
//       <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}>
//         <div style={{ fontSize:32, marginBottom:8 }}>←</div>
//         <div style={{ fontSize:13 }}>Left se block add karo ya canvas mein select karo</div>
//       </div>
//     )
//     const p = selBlock.props
//     const u = (k,v) => update(selBlock.id, k, v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP BAR ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>

//         {/* Block palette */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label })=>(
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>{label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={{ ...s.select, width:140 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>

//           {/* ── ACTION BUTTONS ── */}
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)}
//                 style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>
//                 {l}
//               </button>
//             ))}

//             {/* 💾 Save Button */}
//             <button
//               onClick={() => setShowSaveModal(true)}
//               disabled={!blocks.length}
//               title="Template DB mein save karo"
//               style={{ padding:'5px 12px', fontSize:12, fontWeight:600,
//                 background: blocks.length ? '#f0fdf4' : '#f3f4f6',
//                 color:      blocks.length ? '#16a34a' : '#9ca3af',
//                 border:     `1px solid ${blocks.length ? '#bbf7d0' : '#e5e7eb'}`,
//                 borderRadius:7, cursor: blocks.length ? 'pointer' : 'not-allowed' }}>
//               💾 Save
//             </button>

//             {/* 📂 Load Button */}
//             <button
//               onClick={() => { setShowLoadDrawer(true); fetchSavedTemplates() }}
//               title="Saved templates load karo"
//               style={{ padding:'5px 12px', fontSize:12, fontWeight:600,
//                 background:'#eff6ff', color:'#1d4ed8',
//                 border:'1px solid #93c5fd', borderRadius:7, cursor:'pointer' }}>
//               📂 Load{savedTemplates.length > 0 ? ` (${savedTemplates.length})` : ''}
//             </button>

//             {/* ✓ Apply Template */}
//             <button
//               onClick={() => blocks.length && onUseTemplate(buildEmail(blocks,emailBg,emailWidth))}
//               disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ CANVAS + PROPS ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>

//         {/* Canvas */}
//         <div style={{ background:'white', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:'white', maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Add blocks On Top</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}
//               {blocks.map(b=>{
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, colCtx=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB} title="Move Up">↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB} title="Move Down">↓</button>
//                     {!colCtx&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}} title="Duplicate">⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx})}} style={{...TB,background:'#dc2626'}} title="Delete">✕</button>
//                   </div>
//                 )
//                 if (b.type==='columns') {
//                   return (
//                     <div key={b.id} onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                       style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                       {toolbar(b.id)}
//                       <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                         <tbody><tr>
//                           {(b.props.cols||[]).map((col,ci)=>{
//                             const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                             return (
//                               <td key={col.id} width={col.width+'%'} valign="top"
//                                 style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                                 {(col.blocks||[]).map(ib=>{
//                                   const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                   return (
//                                     <div key={ib.id}
//                                       onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                       style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                       <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                         {!preview&&<>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                           <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                         </>}
//                                       </div>
//                                       <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                     </div>
//                                   )
//                                 })}
//                                 {!preview&&(
//                                   <button onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                     style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                     + Add to Col {ci+1}
//                                   </button>
//                                 )}
//                               </td>
//                             )
//                           })}
//                         </tr></tbody>
//                       </table>
//                     </div>
//                   )
//                 }
//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties panel */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>
//       </div>

//       {/* Text/Banner/Footer editor modal */}
//       {openModal && (() => {
//         const mb = blocks.find(x=>x.id===openModal)
//         if (!mb) return null
//         const pk = mb.type==='text' ? 'html' : 'mainText'
//         return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
//       })()}

//       {/* ── SAVE MODAL ── */}
//       {showSaveModal && (
//         <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9998 }}>
//           <div style={{ background:'white', borderRadius:12, padding:24, width:300, boxShadow:'0 20px 60px rgba(0,0,0,0.25)' }}>
//             <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>💾 Template Save Karo</div>
//             <span style={s.label}>Template Name</span>
//             <input
//               value={templateName}
//               onChange={e => setTemplateName(e.target.value)}
//               onKeyDown={e => e.key==='Enter' && handleSaveTemplate()}
//               placeholder="e.g. Welcome Email..."
//               autoFocus
//               style={{ ...s.input, marginBottom:16 }}
//             />
//             <div style={{ display:'flex', gap:8 }}>
//               <button onClick={() => { setShowSaveModal(false); setTemplateName('') }}
//                 style={{ flex:1, padding:'8px', background:'white', color:'#374151', border:'1px solid #d1d5db', borderRadius:8, cursor:'pointer', fontSize:13 }}>
//                 Cancel
//               </button>
//               <button onClick={handleSaveTemplate} disabled={savingTpl}
//                 style={{ flex:1, padding:'8px', background:savingTpl?'#9ca3af':'#111827', color:'white', border:'none', borderRadius:8, fontWeight:700, fontSize:13, cursor:savingTpl?'not-allowed':'pointer' }}>
//                 {savingTpl ? 'Saving...' : '✓ Save'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── LOAD DRAWER ── */}
//       {showLoadDrawer && (
//         <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.35)', zIndex:9998 }}
//           onClick={() => setShowLoadDrawer(false)}>
//           <div style={{ position:'absolute', top:0, right:0, bottom:0, width:300, background:'white', boxShadow:'-4px 0 24px rgba(0,0,0,0.15)', display:'flex', flexDirection:'column' }}
//             onClick={e => e.stopPropagation()}>
//             <div style={{ padding:'14px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
//               <span style={{ fontWeight:700, fontSize:14 }}>📂 Saved Templates</span>
//               <button onClick={() => setShowLoadDrawer(false)} style={{ background:'none', border:'none', fontSize:18, cursor:'pointer', color:'#6b7280' }}>✕</button>
//             </div>
//             <div style={{ flex:1, overflowY:'auto', padding:12 }}>
//               {savedTemplates.length === 0
//                 ? <div style={{ textAlign:'center', padding:'40px 20px', color:'#9ca3af', fontSize:13 }}>Koi saved template nahi</div>
//                 : savedTemplates.map(t => (
//                     <div key={t._id} style={{ border:'1px solid #e2e8f0', borderRadius:9, padding:12, marginBottom:8, background:'#fafafa' }}>
//                       <div style={{ fontWeight:600, fontSize:13, color:'#111827', marginBottom:3 }}>{t.name}</div>
//                       <div style={{ fontSize:11, color:'#9ca3af', marginBottom:10 }}>
//                         {new Date(t.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}
//                       </div>
//                       <div style={{ display:'flex', gap:6 }}>
//                         <button
//                           onClick={async () => {
//                             try {
//                               const r = await axios.get(`${Url}/api/bulkmail/templates/${t._id}`)
//                               onUseTemplate(r.data.template.htmlBody)
//                               setShowLoadDrawer(false)
//                             } catch(e) { alert('Load failed') }
//                           }}
//                           style={{ flex:1, padding:'6px', fontSize:12, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
//                           ✓ Use This
//                         </button>
//                         <button
//                           onClick={(e) => handleDeleteTemplate(t._id, t.name, e)}
//                           style={{ padding:'6px 10px', fontSize:12, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer' }}>
//                           🗑
//                         </button>
//                       </div>
//                     </div>
//                   ))
//               }
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }
















// with edit feature in template 





// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'
// import axios from 'axios'
// import { Url } from 'src/url/url'
// import { SOCIAL_SVG } from 'src/utils/data'

// // ─────────────────────────────────────────────────────────────────
// // STABLE INPUTS
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)
//   useEffect(() => { if (ref.current) { ref.current.value = value ?? ''; lastVal.current = value } }, [])
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''; lastVal.current = value
//     }
//   }, [value])
//   return <input ref={ref} type={type} defaultValue={value ?? ''} placeholder={placeholder}
//     onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }} style={style} />
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return <input ref={ref} type="color" defaultValue={value || '#000000'} onChange={e => onChange(e.target.value)}
//     style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }} />
// })

// // ─────────────────────────────────────────────────────────────────
// // TEMPLATE SAVE / LOAD MODAL
// // ─────────────────────────────────────────────────────────────────
// const TemplateSaveModal = memo(({ blocks, emailBg, emailWidth, onClose, onLoad }) => {
//   const [tab,       setTab]       = useState('save')
//   const [name,      setName]      = useState('')
//   const [templates, setTemplates] = useState([])
//   const [loading,   setLoading]   = useState(false)
//   const [saving,    setSaving]    = useState(false)
//   const [msg,       setMsg]       = useState(null)
//   const nameRef = useRef(null)

//   // Load template list when 'load' tab opens
//   useEffect(() => {
//     if (tab === 'load') {
//       setLoading(true)
//       axios.get(`${Url}/api/bulkmail/templates/list`)
//         .then(r => setTemplates(r.data.templates || []))
//         .catch(() => setMsg({ err: true, text: 'Templates load nahi hue' }))
//         .finally(() => setLoading(false))
//     }
//   }, [tab])

//   // ── Save current template ─────────────────────────────────────
//   const handleSave = async () => {
//     const n = nameRef.current?.value?.trim()
//     if (!n) return setMsg({ err: true, text: 'Template ka naam daalo' })
//     if (!blocks.length) return setMsg({ err: true, text: 'Pehle builder mein blocks add karo' })
//     setSaving(true); setMsg(null)
//     try {
//       // Build final HTML from current blocks
//       const html = buildEmail(blocks, emailBg, emailWidth)
//       await axios.post(`${Url}/api/bulkmail/templates/save`, {
//         name:       n,
//         htmlBody:   html,
//         blocks:     blocks,
//         emailBg:    emailBg,
//         emailWidth: emailWidth,
//       })
//       setMsg({ err: false, text: `"${n}" save ho gaya! ✅` })
//       if (nameRef.current) nameRef.current.value = ''
//     } catch (e) {
//       setMsg({ err: true, text: e.response?.data?.message || 'Save failed' })
//     }
//     setSaving(false)
//   }

//   // ── Delete template ───────────────────────────────────────────
//   const handleDelete = async (id, tplName, e) => {
//     e.stopPropagation()
//     if (!window.confirm(`"${tplName}" delete karna chahte ho?`)) return
//     try {
//       await axios.delete(`${Url}/api/bulkmail/templates/${id}`)
//       setTemplates(t => t.filter(x => x._id !== id))
//     } catch {
//       setMsg({ err: true, text: 'Delete failed' })
//     }
//   }

//   // ── Edit: load blocks into builder ────────────────────────────
//   const handleEdit = async (tpl) => {
//     try {
//       const r = await axios.get(`${Url}/api/bulkmail/templates/${tpl._id}`)
//       const full = r.data.template
//       onLoad({ blocks: full.blocks || [], emailBg: full.emailBg, emailWidth: full.emailWidth, mode: 'edit' })
//     } catch {
//       onLoad({ blocks: tpl.blocks || [], emailBg: tpl.emailBg, emailWidth: tpl.emailWidth, mode: 'edit' })
//     }
//     onClose()
//   }

//   // ── Use: apply htmlBody directly as email body ────────────────
//   const handleUse = (tpl) => {
//     onLoad({ htmlBody: tpl.htmlBody, mode: 'use' })
//     onClose()
//   }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e => e.target === e.currentTarget && onClose()}>
//       <div style={{ background:'white', borderRadius:14, width:'min(580px,94vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>

//         {/* Header */}
//         <div style={{ padding:'14px 18px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:15, fontWeight:700, color:'#1e293b' }}>📋 Email Templates</span>
//           <button onClick={onClose} style={{ padding:'4px 12px', background:'#e2e8f0', border:'none', borderRadius:6, cursor:'pointer', fontSize:13, color:'#64748b' }}>✕ Close</button>
//         </div>

//         {/* Tab switcher */}
//         <div style={{ display:'flex', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//           {[['save','💾 Save Current'],['load','📂 My Templates']].map(([k,l]) => (
//             <button key={k} onClick={() => { setTab(k); setMsg(null) }}
//               style={{ padding:'10px 20px', fontSize:13, border:'none', cursor:'pointer', fontWeight:tab===k?700:400, background:'none', borderBottom:tab===k?'2px solid #1e40af':'2px solid transparent', color:tab===k?'#1e40af':'#64748b' }}>
//               {l}
//             </button>
//           ))}
//         </div>

//         <div style={{ flex:1, overflowY:'auto', padding:20 }}>

//           {/* ══ SAVE TAB ══ */}
//           {tab === 'save' && (
//             <div>
//               <p style={{ fontSize:13, color:'#64748b', marginBottom:16, marginTop:0 }}>
//                 Builder ka current design save karo — baad mein edit ya use kar sakte ho.
//               </p>
//               <label style={{ fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.04em', display:'block', marginBottom:6 }}>
//                 Template Name
//               </label>
//               <input ref={nameRef} placeholder="e.g. Welcome Email, Diwali Offer..."
//                 style={{ width:'100%', padding:'10px 12px', fontSize:14, border:'1px solid #e2e8f0', borderRadius:8, outline:'none', boxSizing:'border-box', marginBottom:12 }} />
//               <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:12, color:'#64748b' }}>
//                 <strong>{blocks.length}</strong> blocks · BG: <code>{emailBg}</code> · Width: {emailWidth}px
//               </div>
//               {msg && (
//                 <div style={{ padding:'9px 13px', borderRadius:8, marginBottom:14, fontSize:13, background:msg.err?'#fef2f2':'#f0fdf4', color:msg.err?'#dc2626':'#16a34a', border:`1px solid ${msg.err?'#fecaca':'#bbf7d0'}` }}>
//                   {msg.text}
//                 </div>
//               )}
//               <button onClick={handleSave} disabled={saving || !blocks.length}
//                 style={{ width:'100%', padding:'12px', background:(saving||!blocks.length)?'#e2e8f0':'#1e40af', color:(saving||!blocks.length)?'#94a3b8':'white', border:'none', borderRadius:8, cursor:(saving||!blocks.length)?'not-allowed':'pointer', fontSize:14, fontWeight:700 }}>
//                 {saving ? '⏳ Saving...' : '💾 Save Template'}
//               </button>
//               {!blocks.length && (
//                 <p style={{ fontSize:12, color:'#94a3b8', textAlign:'center', marginTop:8 }}>
//                   Builder mein pehle kuch blocks add karo
//                 </p>
//               )}
//             </div>
//           )}

//           {/* ══ LOAD TAB ══ */}
//           {tab === 'load' && (
//             <div>
//               {msg && (
//                 <div style={{ padding:'9px 13px', borderRadius:8, marginBottom:14, fontSize:13, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca' }}>
//                   {msg.text}
//                 </div>
//               )}
//               {loading ? (
//                 <div style={{ textAlign:'center', padding:'40px 0', color:'#94a3b8', fontSize:13 }}>Loading...</div>
//               ) : templates.length === 0 ? (
//                 <div style={{ textAlign:'center', padding:'40px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Koi saved template nahi</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Save tab se pehle ek save karo</div>
//                 </div>
//               ) : (
//                 <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
//                   {templates.map(tpl => (
//                     <div key={tpl._id} style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', background:'white', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>

//                       {/* Preview thumbnail */}
//                       <div style={{ height:180, background:'#f8fafc', overflow:'hidden', position:'relative', borderBottom:'1px solid #e2e8f0' }}>
//                         {tpl.htmlBody ? (
//                           <iframe
//                             srcDoc={tpl.htmlBody}
//                             scrolling="no"
//                             title={tpl.name}
//                             sandbox="allow-same-origin"
//                             style={{ width:'600px', height:'900px', border:'none', pointerEvents:'none', transform:'scale(0.85)', transformOrigin:'top left' }}
//                           />
//                         ) : (
//                           <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#94a3b8', fontSize:13 }}>No preview</div>
//                         )}
//                       </div>

//                       {/* Name + actions */}
//                       <div style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:8 }}>
//                         <div style={{ flex:1, minWidth:0 }}>
//                           <div style={{ fontSize:13, fontWeight:700, color:'#1e293b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{tpl.name}</div>
//                           <div style={{ fontSize:11, color:'#94a3b8', marginTop:2 }}>
//                             {new Date(tpl.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
//                           </div>
//                         </div>
//                         <button onClick={() => handleEdit(tpl)}
//                           style={{ padding:'7px 14px', background:'#f0fdf4', color:'#16a34a', border:'1px solid #bbf7d0', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
//                           ✏️ Edit
//                         </button>
//                         <button onClick={() => handleUse(tpl)}
//                           style={{ padding:'7px 16px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
//                           ✓ Use
//                         </button>
//                         <button onClick={e => handleDelete(tpl._id, tpl.name, e)}
//                           style={{ padding:'7px 10px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12 }}>
//                           🗑
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // TEXT EDITOR MODAL
// // ─────────────────────────────────────────────────────────────────
// const EditorModal = memo(({ value, onChange, onClose }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() } }, [])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus(); document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }
//   const insertLink = () => { const url = window.prompt('Link URL:', 'https://'); if (url) exec('createLink', url) }
//   const insertVar  = v => { ref.current?.focus(); document.execCommand('insertText', false, v); setTimeout(() => onChange(ref.current?.innerHTML || ''), 0) }

//   const SEP = '|'
//   const row1 = [
//     { t:'B', title:'Bold', cmd:()=>exec('bold'), s:{fontWeight:700} },
//     { t:'I', title:'Italic', cmd:()=>exec('italic'), s:{fontStyle:'italic'} },
//     { t:'U', title:'Underline', cmd:()=>exec('underline'), s:{textDecoration:'underline'} },
//     { t:'S', title:'Strike', cmd:()=>exec('strikeThrough'), s:{textDecoration:'line-through'} },
//     { t:SEP },
//     { t:'≡L', title:'Left',   cmd:()=>exec('justifyLeft') },
//     { t:'≡C', title:'Center', cmd:()=>exec('justifyCenter') },
//     { t:'≡R', title:'Right',  cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list', title:'Bullet', cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list',title:'Number', cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗', title:'Link',        cmd:insertLink },
//     { t:'✕🔗',title:'Remove link', cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'H1', cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'H2', cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Para', cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr', title:'Clear', cmd:()=>exec('removeFormat') },
//   ]
//   const QC = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
//   const HL = ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
//   const bS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
//       <div style={{ background:'white', borderRadius:12, width:'min(800px,94vw)', maxHeight:'90vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
//         <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>✏️ Edit Text</span>
//           <button onClick={onClose} style={{ padding:'5px 16px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700 }}>Done ✓</button>
//         </div>
//         {/* Toolbar row 1 */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
//           {row1.map((t,i) => {
//             if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
//             return <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//               style={{ ...bS, ...(t.s||{}) }}
//               onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//               onMouseLeave={e=>e.currentTarget.style.background='none'}>{t.t}</button>
//           })}
//         </div>
//         {/* Toolbar row 2 — font + color */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
//           <select onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Font</option>
//             {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>
//               <option key={v} value={v}>{l}</option>)}
//           </select>
//           <select onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Size</option>
//             {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>
//               <option key={v} value={v}>{l}</option>)}
//           </select>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <label style={{ display:'flex', alignItems:'center', gap:3 }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
//             <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
//           </label>
//           <label style={{ display:'flex', alignItems:'center', gap:3 }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
//             <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
//           </label>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <div style={{ display:'flex', gap:3 }}>
//             {QC.map(c=><button key={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
//               style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />)}
//           </div>
//           <div style={{ display:'flex', gap:3, alignItems:'center' }}>
//             <span style={{ fontSize:11, color:'#94a3b8' }}>HL:</span>
//             {HL.map(c=><button key={c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
//               style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />)}
//           </div>
//         </div>
//         {/* Personalization */}
//         <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
//           <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//           {['{{name}}','{{company}}','{{email}}'].map(v=>
//             <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//               style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>{v}</button>)}
//         </div>
//         {/* Editor area */}
//         <div ref={ref} contentEditable suppressContentEditableWarning
//           onBlur={()=>onChange(ref.current?.innerHTML||'')}
//           onInput={()=>onChange(ref.current?.innerHTML||'')}
//           style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:260 }} />
//         <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', display:'flex', justifyContent:'flex-end', gap:8, flexShrink:0 }}>
//           <button onClick={()=>{ if(ref.current){ ref.current.innerHTML=''; onChange('') } }}
//             style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>Clear</button>
//           <button onClick={onClose}
//             style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700 }}>Done ✓</button>
//         </div>
//       </div>
//     </div>
//   )
// })

// const RichEditorField = memo(({ value, onChange }) => {
//   const [open, setOpen] = useState(false)
//   return (
//     <>
//       <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
//         <div dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Empty...</span>' }}
//           style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:80, overflow:'hidden', pointerEvents:'none' }} />
//         <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'flex-end' }}>
//           <button onClick={()=>setOpen(true)} style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>Edit Text ✏️</button>
//         </div>
//       </div>
//       {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
//     </>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }
// const sL  = s.label
// const sIn = s.input

// const Field       = memo(({ label, value, onChange, type='text', placeholder='' }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} /></div>)
// const ColorField  = memo(({ label, value, onChange }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'flex', gap:6, alignItems:'center' }}><StableColor value={value} onChange={onChange} /><StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} /></div></div>)
// const SelectField = memo(({ label, value, onChange, options }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>{options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}</select></div>)
// const ToggleField = memo(({ label, value, onChange }) => <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}><span style={s.label}>{label}</span><div onClick={()=>onChange(value==='true'?'false':'true')} style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}><div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} /></div></div>)
// const SpacingGrid = memo(({ label, values, keys, onChange }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>{[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=><div key={l}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div><StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number" style={{ ...s.input, width:'100%' }} /></div>)}</div></div>)
// const Row2    = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>

// // ─────────────────────────────────────────────────────────────────
// // DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS   = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS  = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR   = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg', Snapchat:'Sc', Reddit:'Re', Discord:'Di', Spotify:'Sp', Medium:'Me', Dribbble:'Dr', Behance:'Be', Vimeo:'Vi', Twitch:'Tv', Email:'Em' }
// const SOCIAL_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#24292e', Telegram:'#2ca5e0', Snapchat:'#fffc00', Reddit:'#ff4500', Discord:'#5865f2', Spotify:'#1db954', Medium:'#000000', Dribbble:'#ea4c89', Behance:'#1769ff', Vimeo:'#1ab7ea', Twitch:'#9146ff', Email:'#6366f1' }
// const SOCIAL_SLUG   = { Facebook:'facebook', Twitter:'x', Instagram:'instagram', LinkedIn:'linkedin', YouTube:'youtube', Pinterest:'pinterest', TikTok:'tiktok', WhatsApp:'whatsapp', GitHub:'github', Telegram:'telegram', Snapchat:'snapchat', Reddit:'reddit', Discord:'discord', Spotify:'spotify', Medium:'medium', Dribbble:'dribbble', Behance:'behance', Vimeo:'vimeo', Twitch:'twitch', Email:'gmail' }

// const D = {
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', borderRadius:'50', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Instagram',url:'#',color:'#e1306c',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2',size:'',pt:'',pb:'',pl:'',pr:''}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props, ms = `margin:${mars(p)};`
//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`
//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`
//   if (b.type==='image') {
//     const img = p.src ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">` : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image URL daalo ]</div>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${p.link?`<a href="${p.link}" style="display:block">${img}</a>`:img}</td></tr></table>`
//   }
//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0"><a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a></td></tr></table>`
//   }
//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`
//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`
//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }
//   if (b.type==='social') {
//     const dfSz = parseInt(p.iconSize||36), half = Math.floor(parseInt(p.gap||12)/2)
//     const br = p.borderRadius==='50'?'50%':p.borderRadius==='20'?'8px':'4px'
//     const icons = (p.links||[]).map(l=>{
//       const sz = parseInt(l.size||dfSz), bg = l.color||SOCIAL_COLORS[l.name]||'#666'
//       const ipt=parseInt(l.pt||0),ipb=parseInt(l.pb||0),ipl=parseInt(l.pl||0),ipr=parseInt(l.pr||0)
//       const slug = SOCIAL_SLUG[l.name]||l.name.toLowerCase()
//       const svgPath = SOCIAL_SVG?.[l.name]
//       const iconSz = Math.round(sz*0.52)
//       const inner = svgPath
//         ? `<svg width="${iconSz}" height="${iconSz}" viewBox="0 0 24 24" fill="white" style="display:block;margin:0 auto"><path d="${svgPath}"/></svg>`
//         : `<img src="https://cdn.simpleicons.org/${slug}/ffffff" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;margin:0 auto">`
//       return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none;vertical-align:middle" target="_blank"><table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:collapse"><tr><td width="${sz}" height="${sz}" align="center" valign="middle" style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${br};text-align:center;vertical-align:middle;padding:${ipt}px ${ipr}px ${ipb}px ${ipl}px">${inner}</td></tr></table></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
//   }
//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }
//   if (b.type==='columns') {
//     const cols=p.cols||[], g=parseInt(p.gap||8)
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${cols.map(col=>`<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${(col.blocks||[]).map(renderEl).join('')||'&nbsp;'}</td>`).join('')}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS
// // ─────────────────────────────────────────────────────────────────
// const sp = (p,u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p,u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel    = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Email Body</span><RichEditorField value={p.html} onChange={v=>u('html',v)} /></div><Section title="Typography" /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const HeadingPanel = memo(({ p, u }) => <><Section title="Content" /><Field label="Text" value={p.text} onChange={v=>u('text',v)} /><SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1'],['h2','H2'],['h3','H3'],['h4','H4']]} /><Section title="Style" /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const ImagePanel   = memo(({ p, u }) => <><Section title="Image" /><Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." /><Field label="Click Link" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." /><Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} /><Row2><Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" /><Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const ButtonPanel  = memo(({ p, u }) => <><Section title="Button" /><Field label="Button Text" value={p.text} onChange={v=>u('text',v)} /><Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." /><Section title="Style" /><ColorField label="Button Color" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} /><Section title="Button Padding" />{sp(p,u)}<Section title="Outer Margin" />{sm(p,u)}</>)
// const DividerPanel = memo(({ p, u }) => <><Section title="Line" /><ColorField label="Color" value={p.color} onChange={v=>u('color',v)} /><Row2><Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" /><SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} /></Row2><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const SpacerPanel  = memo(({ p, u }) => <><Section title="Spacer" /><Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Margin" />{sm(p,u)}</>)
// const BannerPanel  = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Main Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} /><Row2><Field label="Main Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Sub Size" value={p.subtextSize} onChange={v=>u('subtextSize',v)} type="number" /></Row2><Row2><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

// const SocialPanel = memo(({ p, u }) => {
//   const [expanded, setExpanded] = useState(null)
//   const links = p.links || []
//   const add    = () => { const l={id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''}; u('links',[...links,l]); setExpanded(l.id) }
//   const del    = id  => { u('links',links.filter(l=>l.id!==id)); if(expanded===id) setExpanded(null) }
//   const upd    = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))
//   const move   = (idx,dir) => { const arr=[...links],j=idx+dir; if(j<0||j>=arr.length) return; [arr[idx],arr[j]]=[arr[j],arr[idx]]; u('links',arr) }
//   const moveTo = (fromIdx,toPos) => { const to=Math.max(0,Math.min(links.length-1,parseInt(toPos)-1)); if(isNaN(to)||to===fromIdx) return; const arr=[...links]; const [item]=arr.splice(fromIdx,1); arr.splice(to,0,item); u('links',arr) }
//   const ALL = Object.keys(SOCIAL_ABBR).map(k=>[k,k])
//   return <>
//     <Section title="Row Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Default Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     </Row2>
//     <Row2>
//       <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//       <div><span style={s.label}>Shape</span><select value={p.borderRadius||'50'} onChange={e=>u('borderRadius',e.target.value)} style={s.select}><option value="50">Circle</option><option value="20">Rounded</option><option value="0">Square</option></select></div>
//     </Row2>
//     <Section title="Icons (↑↓ to reorder)" />
//     <button onClick={add} style={{ width:'100%', padding:'7px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, marginBottom:8 }}>+ Add Social Icon</button>
//     {links.map((l,idx) => {
//       const isOpen = expanded === l.id
//       return (
//         <div key={l.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, marginBottom:6, overflow:'hidden' }}>
//           <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', background:isOpen?'#eff6ff':'#f8fafc', cursor:'pointer' }} onClick={()=>setExpanded(isOpen?null:l.id)}>
//             <div style={{ width:18, height:18, borderRadius:'50%', background:'#e2e8f0', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#64748b', fontWeight:700 }}>{idx+1}</div>
//             <div style={{ width:22, height:22, borderRadius:'50%', background:l.color||SOCIAL_COLORS[l.name]||'#666', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
//               <img src={`https://cdn.simpleicons.org/${SOCIAL_SLUG[l.name]||l.name.toLowerCase()}/ffffff`} width="12" height="12" alt="" style={{ display:'block' }} onError={e=>{ e.target.style.display='none' }} />
//             </div>
//             <span style={{ flex:1, fontSize:12, fontWeight:600, color:'#374151' }}>{l.name}</span>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,-1)}} style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↑</button>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,1)}} style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↓</button>
//             <button onMouseDown={e=>{e.stopPropagation();del(l.id)}} style={{ padding:'1px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:3, cursor:'pointer' }}>✕</button>
//             <span style={{ fontSize:10, color:'#94a3b8' }}>{isOpen?'▲':'▼'}</span>
//           </div>
//           {isOpen && (
//             <div style={{ padding:'8px 10px', borderTop:'1px solid #e2e8f0' }}>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Platform</span>
//                 <select value={l.name} onChange={e=>{ const n=e.target.value; u('links',links.map(x=>x.id===l.id?{...x,name:n,color:SOCIAL_COLORS[n]||'#666'}:x)) }} style={s.select}>
//                   {ALL.map(([v,lb])=><option key={v} value={v}>{lb}</option>)}
//                 </select>
//               </div>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Link URL</span><StableInput value={l.url||''} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." style={s.input} /></div>
//               <ColorField label="Icon Color" value={l.color||SOCIAL_COLORS[l.name]||'#666'} onChange={v=>upd(l.id,'color',v)} />
//               <div style={{ marginBottom:8 }}><span style={s.label}>Custom Size (blank = default)</span><StableInput value={l.size||''} onChange={v=>upd(l.id,'size',v)} type="number" placeholder={p.iconSize||'36'} style={s.input} /></div>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Move to Position</span>
//                 <div style={{ display:'flex', gap:6 }}>
//                   <div style={{ ...s.input, width:40, textAlign:'center', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700 }}>{idx+1}</div>
//                   <select defaultValue="" onChange={e=>{ if(e.target.value){moveTo(idx,e.target.value);e.target.value=''}}} style={{ ...s.input, flex:1, cursor:'pointer' }}>
//                     <option value="">Jump to position...</option>
//                     {links.map((_,i)=>i!==idx&&<option key={i} value={i+1}>Position {i+1}</option>)}
//                   </select>
//                 </div>
//               </div>
//               <div style={{ marginBottom:4 }}><span style={s.label}>Icon Padding (px)</span>
//                 <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//                   {[['Top','pt'],['Bottom','pb'],['Left','pl'],['Right','pr']].map(([lb,k])=><div key={k}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{lb}</div><StableInput value={l[k]||''} onChange={v=>upd(l.id,k,v)} type="number" placeholder="0" style={{ ...s.input, width:'100%' }} /></div>)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     })}
//     <Section title="Row Spacing" />{sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Footer Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Unsubscribe" /><ToggleField label="Show Unsubscribe" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />{p.showUnsub==='true'&&<><Field label="Unsub Text" value={p.unsubText} onChange={v=>u('unsubText',v)} /><Field label="Unsub URL" value={p.unsubUrl} onChange={v=>u('unsubUrl',v)} placeholder="https://..." /></>}<Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]
//   const updateCols = next => u('cols',next)
//   const addCol     = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol  = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp = (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]
//   return <><Section title="Row" /><ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Field label="Gap (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" /><Section title="Columns" /><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><span style={{ fontSize:12, fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span><button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button></div><div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>{cols.map((_,i)=><div key={i} style={{ display:'flex', gap:2 }}><button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':'white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>{cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}</div>)}</div>{col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}><div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div><Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" /><ColorField label="Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} /><div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>💡 Canvas mein Col {activeCol+1} pe click → "Add to Column"</div></div>}<Section title="Outer Spacing" />{sp(p,u)}{sm(p,u)}</>
// })

// // ─────────────────────────────────────────────────────────────────
// // REDUCER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',  desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading', desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',    desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',   desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',  desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns', desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider', desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',  desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',  desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',  desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']
// const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null })

// function reducer(state, action) {
//   switch(action.type) {
//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         const { blockId, colIdx } = action.colCtx
//         return { ...state, colCtx:null, blocks: state.blocks.map(bl => bl.id!==blockId ? bl : { ...bl, props:{ ...bl.props, cols:bl.props.cols.map((c,i)=>i!==colIdx?c:{...c,blocks:[...(c.blocks||[]),b]}) } }) }
//       }
//       return { ...state, blocks:[...state.blocks,b], sel:{ id:b.id, colCtx:null } }
//     }
//     case 'SELECT':       return { ...state, sel:action.sel }
//     case 'OPEN_MODAL':   return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }
//     case 'CLOSE_MODAL':  return { ...state, openModal:null }
//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) return { ...state, sel:null, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{...c,blocks:c.blocks.filter(ib=>ib.id!==id)})}}) }
//       return { ...state, sel:null, blocks:state.blocks.filter(b=>b.id!==id) }
//     }
//     case 'DUPLICATE': {
//       const idx=state.blocks.findIndex(b=>b.id===action.id); if(idx<0) return state
//       const copy={...deep(state.blocks[idx]),id:newId()}; const next=[...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }
//     case 'MOVE': {
//       const { id, dir } = action; const arr=[...state.blocks],i=arr.findIndex(b=>b.id===id),j=i+dir
//       if(j<0||j>=arr.length) return state; [arr[i],arr[j]]=[arr[j],arr[i]]; return { ...state, blocks:arr }
//     }
//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) return { ...state, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{...c,blocks:c.blocks.map(ib=>ib.id!==id?ib:{...ib,props:{...ib.props,[key]:val}})})}})}
//       return { ...state, blocks:state.blocks.map(b=>b.id!==id?b:{...b,props:{...b.props,[key]:val}}) }
//     }
//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks:state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols=bl.props.cols.map((c,ci)=>{ if(ci!==colIdx) return c; const arr=[...(c.blocks||[])],i=arr.findIndex(b=>b.id===id),j=i+dir; if(j<0||j>=arr.length) return c; [arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr} })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }
//     case 'LOAD_TEMPLATE': {
//       // Reset uid to avoid id conflicts
//       uid = Date.now()
//       return { ...state, blocks: action.blocks, openModal: null, sel: null, colCtx: null }
//     }
//     case 'SET_COL_CTX':  return { ...state, colCtx:action.ctx }
//     default: return state
//   }
// }

// // ─────────────────────────────────────────────────────────────────
// // MAIN EXPORT
// // ─────────────────────────────────────────────────────────────────
// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch]         = useReducer(reducer, null, init)
//   const [emailBg, setEmailBg]     = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview, setPreview]     = useState(false)
//   const [showTplModal, setShowTplModal] = useState(false)

//   const { blocks, sel, colCtx, openModal } = state

//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       selBlock = parent?.props?.cols?.[sel.colCtx.colIdx]?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}><div style={{ fontSize:32, marginBottom:8 }}>←</div><div style={{ fontSize:13 }}>Block select karo</div></div>
//     const p = selBlock.props, u = (k,v) => update(selBlock.id,k,v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const handleLoad = (tpl) => {
//     if (tpl.mode === 'use') {
//       // Apply htmlBody directly as email body
//       onUseTemplate(tpl.htmlBody || '')
//       return
//     }
//     // mode:'edit' — load blocks into builder
//     dispatch({ type:'LOAD_TEMPLATE', blocks: tpl.blocks || [] })
//     if (tpl.emailBg)    setEmailBg(tpl.emailBg)
//     if (tpl.emailWidth) setEmailWidth(String(tpl.emailWidth || '600'))
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP BAR ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//         {/* Block buttons */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label }) => (
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>{label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={{ ...s.select, width:130 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto' }}>
//             {/* Save/Load Templates button */}
//             <button onClick={()=>setShowTplModal(true)}
//               style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', background:'white', color:'#374151', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
//               📋 Templates
//             </button>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))} disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ CANVAS + PROPS ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>
//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}
//               {blocks.map(b => {
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, cc=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB}>↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB}>↓</button>
//                     {!cc&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}}>⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx:cc})}} style={{...TB,background:'#dc2626'}}>✕</button>
//                   </div>
//                 )
//                 if (b.type==='columns') return (
//                   <div key={b.id} onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                       <tbody><tr>
//                         {(b.props.cols||[]).map((col,ci) => {
//                           const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                           return (
//                             <td key={col.id} width={col.width+'%'} valign="top"
//                               style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                               {(col.blocks||[]).map(ib => {
//                                 const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                 return (
//                                   <div key={ib.id} onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                     style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                     <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                       {!preview&&<>
//                                         <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                         <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                         <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                       </>}
//                                     </div>
//                                     <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                   </div>
//                                 )
//                               })}
//                               {!preview&&<button onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                 style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                 + Add to Col {ci+1}
//                               </button>}
//                             </td>
//                           )
//                         })}
//                       </tr></tbody>
//                     </table>
//                   </div>
//                 )
//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>
//       </div>

//       {/* Editor modal */}
//       {openModal && (() => {
//         const mb = blocks.find(x=>x.id===openModal); if (!mb) return null
//         const pk = mb.type==='text' ? 'html' : 'mainText'
//         return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
//       })()}

//       {/* Template save/load modal */}
//       {showTplModal && (
//         <TemplateSaveModal
//           blocks={blocks}
//           emailBg={emailBg}
//           emailWidth={emailWidth}
//           onClose={()=>setShowTplModal(false)}
//           onLoad={handleLoad}
//         />
//       )}
//     </div>
//   )
// }

// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }






































// import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'
// import axios from 'axios'
// import { Url } from 'src/url/url'
// import { SOCIAL_SVG } from 'src/utils/data'

// // ─────────────────────────────────────────────────────────────────
// // STABLE INPUTS
// // ─────────────────────────────────────────────────────────────────
// const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
//   const ref = useRef(null)
//   const lastVal = useRef(value)
//   useEffect(() => { if (ref.current) { ref.current.value = value ?? ''; lastVal.current = value } }, [])
//   useEffect(() => {
//     if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
//       ref.current.value = value ?? ''; lastVal.current = value
//     }
//   }, [value])
//   return <input ref={ref} type={type} defaultValue={value ?? ''} placeholder={placeholder}
//     onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }} style={style} />
// })

// const StableColor = memo(({ value, onChange }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
//   return <input ref={ref} type="color" defaultValue={value || '#000000'} onChange={e => onChange(e.target.value)}
//     style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }} />
// })

// // ─────────────────────────────────────────────────────────────────
// // TEMPLATE SAVE / LOAD MODAL
// // ─────────────────────────────────────────────────────────────────
// const TemplateSaveModal = memo(({ blocks, emailBg, emailWidth, onClose, onLoad }) => {
//   const [tab,       setTab]       = useState('save')
//   const [name,      setName]      = useState('')
//   const [templates, setTemplates] = useState([])
//   const [loading,   setLoading]   = useState(false)
//   const [saving,    setSaving]    = useState(false)
//   const [msg,       setMsg]       = useState(null)
//   const nameRef = useRef(null)

//   // Load template list when 'load' tab opens
//   useEffect(() => {
//     if (tab === 'load') {
//       setLoading(true)
//       axios.get(`${Url}/api/bulkmail/templates/list`)
//         .then(r => setTemplates(r.data.templates || []))
//         .catch(() => setMsg({ err: true, text: 'Templates is not Found' }))
//         .finally(() => setLoading(false))
//     }
//   }, [tab])

//   // ── Save current template ─────────────────────────────────────
//   const handleSave = async () => {
//     const n = nameRef.current?.value?.trim()
//     if (!n) return setMsg({ err: true, text: 'Enter Template name' })
//     if (!blocks.length) return setMsg({ err: true, text: 'Add Block inside the Builder' })
//     setSaving(true); setMsg(null)
//     try {
//       // Build final HTML from current blocks
//       const html = buildEmail(blocks, emailBg, emailWidth)
//       await axios.post(`${Url}/api/bulkmail/templates/save`, {
//         name:       n,
//         htmlBody:   html,
//         blocks:     blocks,
//         emailBg:    emailBg,
//         emailWidth: emailWidth,
//       })
//       setMsg({ err: false, text: `"${n}" is saved ✅` })
//       if (nameRef.current) nameRef.current.value = ''
//     } catch (e) {
//       setMsg({ err: true, text: e.response?.data?.message || 'Save failed' })
//     }
//     setSaving(false)
//   }

//   // ── Delete template ───────────────────────────────────────────
//   const handleDelete = async (id, tplName, e) => {
//     e.stopPropagation()
//     if (!window.confirm(`"${tplName}"Are you sure to delte?`)) return
//     try {
//       await axios.delete(`${Url}/api/bulkmail/templates/${id}`)
//       setTemplates(t => t.filter(x => x._id !== id))
//     } catch {
//       setMsg({ err: true, text: 'Delete failed' })
//     }
//   }

//   // ── Edit: load blocks into builder ────────────────────────────
//   const handleEdit = async (tpl) => {
//     try {
//       const r = await axios.get(`${Url}/api/bulkmail/templates/${tpl._id}`)
//       const full = r.data.template
//       // Pass _id + name so Update button knows which template to overwrite
//       onLoad({ _id: full._id, name: full.name, blocks: full.blocks || [], emailBg: full.emailBg, emailWidth: full.emailWidth, mode: 'edit' })
//     } catch {
//       onLoad({ _id: tpl._id, name: tpl.name, blocks: tpl.blocks || [], emailBg: tpl.emailBg, emailWidth: tpl.emailWidth, mode: 'edit' })
//     }
//     onClose()
//   }

//   // ── Use: apply htmlBody directly as email body ────────────────
//   const handleUse = (tpl) => {
//     onLoad({ htmlBody: tpl.htmlBody, mode: 'use' })
//     onClose()
//   }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e => e.target === e.currentTarget && onClose()}>
//       <div style={{ background:'white', borderRadius:14, width:'min(580px,94vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>

//         {/* Header */}
//         <div style={{ padding:'14px 18px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:15, fontWeight:700, color:'#1e293b' }}>📋 Email Templates</span>
//           <button onClick={onClose} style={{ padding:'4px 12px', background:'#e2e8f0', border:'none', borderRadius:6, cursor:'pointer', fontSize:13, color:'#64748b' }}>✕ Close</button>
//         </div>

//         {/* Tab switcher */}
//         <div style={{ display:'flex', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//           {[['save','💾 Save Current'],['load','📂 My Templates']].map(([k,l]) => (
//             <button key={k} onClick={() => { setTab(k); setMsg(null) }}
//               style={{ padding:'10px 20px', fontSize:13, border:'none', cursor:'pointer', fontWeight:tab===k?700:400, background:'none', borderBottom:tab===k?'2px solid #1e40af':'2px solid transparent', color:tab===k?'#1e40af':'#64748b' }}>
//               {l}
//             </button>
//           ))}
//         </div>

//         <div style={{ flex:1, overflowY:'auto', padding:20 }}>

//           {/* ══ SAVE TAB ══ */}
//           {tab === 'save' && (
//             <div>
//               <p style={{ fontSize:13, color:'#64748b', marginBottom:16, marginTop:0 }}>
//                 Builder ka current design save karo — baad mein edit ya use kar sakte ho.
//               </p>
//               <label style={{ fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.04em', display:'block', marginBottom:6 }}>
//                 Template Name
//               </label>
//               <input ref={nameRef} placeholder="e.g. Welcome Email, Diwali Offer..."
//                 style={{ width:'100%', padding:'10px 12px', fontSize:14, border:'1px solid #e2e8f0', borderRadius:8, outline:'none', boxSizing:'border-box', marginBottom:12 }} />
//               <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:12, color:'#64748b' }}>
//                 <strong>{blocks.length}</strong> blocks · BG: <code>{emailBg}</code> · Width: {emailWidth}px
//               </div>
//               {msg && (
//                 <div style={{ padding:'9px 13px', borderRadius:8, marginBottom:14, fontSize:13, background:msg.err?'#fef2f2':'#f0fdf4', color:msg.err?'#dc2626':'#16a34a', border:`1px solid ${msg.err?'#fecaca':'#bbf7d0'}` }}>
//                   {msg.text}
//                 </div>
//               )}
//               <button onClick={handleSave} disabled={saving || !blocks.length}
//                 style={{ width:'100%', padding:'12px', background:(saving||!blocks.length)?'#e2e8f0':'#1e40af', color:(saving||!blocks.length)?'#94a3b8':'white', border:'none', borderRadius:8, cursor:(saving||!blocks.length)?'not-allowed':'pointer', fontSize:14, fontWeight:700 }}>
//                 {saving ? '⏳ Saving...' : '💾 Save Template'}
//               </button>
//               {!blocks.length && (
//                 <p style={{ fontSize:12, color:'#94a3b8', textAlign:'center', marginTop:8 }}>
//                   Builder mein pehle kuch blocks add karo
//                 </p>
//               )}
//             </div>
//           )}

//           {/* ══ LOAD TAB ══ */}
//           {tab === 'load' && (
//             <div>
//               {msg && (
//                 <div style={{ padding:'9px 13px', borderRadius:8, marginBottom:14, fontSize:13, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca' }}>
//                   {msg.text}
//                 </div>
//               )}
//               {loading ? (
//                 <div style={{ textAlign:'center', padding:'40px 0', color:'#94a3b8', fontSize:13 }}>Loading...</div>
//               ) : templates.length === 0 ? (
//                 <div style={{ textAlign:'center', padding:'40px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Koi saved template nahi</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Save tab se pehle ek save karo</div>
//                 </div>
//               ) : (
//                 <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
//                   {templates.map(tpl => (
//                     <div key={tpl._id} style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', background:'white', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>

//                       {/* Preview thumbnail */}
//                       <div style={{ height:180, background:'#f8fafc', overflow:'hidden', position:'relative', borderBottom:'1px solid #e2e8f0' }}>
//                         {tpl.htmlBody ? (
//                           <iframe
//                             srcDoc={tpl.htmlBody}
//                             scrolling="no"
//                             title={tpl.name}
//                             sandbox="allow-same-origin"
//                             style={{ width:'600px', height:'900px', border:'none', pointerEvents:'none', transform:'scale(0.85)', transformOrigin:'top left' }}
//                           />
//                         ) : (
//                           <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#94a3b8', fontSize:13 }}>No preview</div>
//                         )}
//                       </div>

//                       {/* Name + actions */}
//                       <div style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:8 }}>
//                         <div style={{ flex:1, minWidth:0 }}>
//                           <div style={{ fontSize:13, fontWeight:700, color:'#1e293b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{tpl.name}</div>
//                           <div style={{ fontSize:11, color:'#94a3b8', marginTop:2 }}>
//                             {new Date(tpl.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
//                           </div>
//                         </div>
//                         <button onClick={() => handleEdit(tpl)}
//                           style={{ padding:'7px 14px', background:'#f0fdf4', color:'#16a34a', border:'1px solid #bbf7d0', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
//                           ✏️ Edit
//                         </button>
//                         <button onClick={() => handleUse(tpl)}
//                           style={{ padding:'7px 16px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>
//                           ✓ Use
//                         </button>
//                         <button onClick={e => handleDelete(tpl._id, tpl.name, e)}
//                           style={{ padding:'7px 10px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12 }}>
//                           🗑
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// })


// // ─────────────────────────────────────────────────────────────────
// // TEXT EDITOR MODAL
// // ─────────────────────────────────────────────────────────────────
// const EditorModal = memo(({ value, onChange, onClose }) => {
//   const ref = useRef(null)
//   useEffect(() => { if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() } }, [])

//   const exec = (cmd, val=null) => {
//     ref.current?.focus(); document.execCommand(cmd, false, val)
//     setTimeout(() => onChange(ref.current?.innerHTML || ''), 0)
//   }
//   const insertLink = () => { const url = window.prompt('Link URL:', 'https://'); if (url) exec('createLink', url) }
//   const insertVar  = v => { ref.current?.focus(); document.execCommand('insertText', false, v); setTimeout(() => onChange(ref.current?.innerHTML || ''), 0) }

//   const SEP = '|'
//   const row1 = [
//     { t:'B', title:'Bold', cmd:()=>exec('bold'), s:{fontWeight:700} },
//     { t:'I', title:'Italic', cmd:()=>exec('italic'), s:{fontStyle:'italic'} },
//     { t:'U', title:'Underline', cmd:()=>exec('underline'), s:{textDecoration:'underline'} },
//     { t:'S', title:'Strike', cmd:()=>exec('strikeThrough'), s:{textDecoration:'line-through'} },
//     { t:SEP },
//     { t:'≡L', title:'Left',   cmd:()=>exec('justifyLeft') },
//     { t:'≡C', title:'Center', cmd:()=>exec('justifyCenter') },
//     { t:'≡R', title:'Right',  cmd:()=>exec('justifyRight') },
//     { t:SEP },
//     { t:'• list', title:'Bullet', cmd:()=>exec('insertUnorderedList') },
//     { t:'1. list',title:'Number', cmd:()=>exec('insertOrderedList') },
//     { t:SEP },
//     { t:'🔗', title:'Link',        cmd:insertLink },
//     { t:'✕🔗',title:'Remove link', cmd:()=>exec('unlink') },
//     { t:SEP },
//     { t:'H1', title:'H1', cmd:()=>exec('formatBlock','h1') },
//     { t:'H2', title:'H2', cmd:()=>exec('formatBlock','h2') },
//     { t:'P',  title:'Para', cmd:()=>exec('formatBlock','p') },
//     { t:SEP },
//     { t:'Clr', title:'Clear', cmd:()=>exec('removeFormat') },
//   ]
//   const QC = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
//   const HL = ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
//   const bS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }

//   return (
//     <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
//       onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
//       <div style={{ background:'white', borderRadius:12, width:'min(800px,94vw)', maxHeight:'90vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
//         <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
//           <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>✏️ Edit Text</span>
//           <button onClick={onClose} style={{ padding:'5px 16px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700 }}>Done ✓</button>
//         </div>
//         {/* Toolbar row 1 */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
//           {row1.map((t,i) => {
//             if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
//             return <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
//               style={{ ...bS, ...(t.s||{}) }}
//               onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
//               onMouseLeave={e=>e.currentTarget.style.background='none'}>{t.t}</button>
//           })}
//         </div>
//         {/* Toolbar row 2 — font + color */}
//         <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
//           <select onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Font</option>
//             {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>
//               <option key={v} value={v}>{l}</option>)}
//           </select>
//           <select onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
//             style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
//             <option value="" disabled>Size</option>
//             {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>
//               <option key={v} value={v}>{l}</option>)}
//           </select>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <label style={{ display:'flex', alignItems:'center', gap:3 }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
//             <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
//           </label>
//           <label style={{ display:'flex', alignItems:'center', gap:3 }} onMouseDown={e=>e.preventDefault()}>
//             <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
//             <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)}
//               style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
//             <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
//           </label>
//           <div style={{ width:1, height:18, background:'#e2e8f0' }} />
//           <div style={{ display:'flex', gap:3 }}>
//             {QC.map(c=><button key={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
//               style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />)}
//           </div>
//           <div style={{ display:'flex', gap:3, alignItems:'center' }}>
//             <span style={{ fontSize:11, color:'#94a3b8' }}>HL:</span>
//             {HL.map(c=><button key={c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
//               style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />)}
//           </div>
//         </div>
//         {/* Personalization */}
//         <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
//           <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
//           {['{{name}}','{{company}}','{{email}}'].map(v=>
//             <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
//               style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>{v}</button>)}
//         </div>
//         {/* Editor area */}
//         <div ref={ref} contentEditable suppressContentEditableWarning
//           onBlur={()=>onChange(ref.current?.innerHTML||'')}
//           onInput={()=>onChange(ref.current?.innerHTML||'')}
//           style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:260 }} />
//         <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', display:'flex', justifyContent:'flex-end', gap:8, flexShrink:0 }}>
//           <button onClick={()=>{ if(ref.current){ ref.current.innerHTML=''; onChange('') } }}
//             style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>Clear</button>
//           <button onClick={onClose}
//             style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700 }}>Done ✓</button>
//         </div>
//       </div>
//     </div>
//   )
// })

// const RichEditorField = memo(({ value, onChange }) => {
//   const [open, setOpen] = useState(false)
//   return (
//     <>
//       <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
//         <div dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Empty...</span>' }}
//           style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:80, overflow:'hidden', pointerEvents:'none' }} />
//         <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'flex-end' }}>
//           <button onClick={()=>setOpen(true)} style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>Edit Text ✏️</button>
//         </div>
//       </div>
//       {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
//     </>
//   )
// })

// // ─────────────────────────────────────────────────────────────────
// // FIELD COMPONENTS
// // ─────────────────────────────────────────────────────────────────
// const s = {
//   label: { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
//   input: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
//   select: { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
//   sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
// }
// const sL  = s.label
// const sIn = s.input

// const Field       = memo(({ label, value, onChange, type='text', placeholder='' }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} /></div>)
// const ColorField  = memo(({ label, value, onChange }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'flex', gap:6, alignItems:'center' }}><StableColor value={value} onChange={onChange} /><StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} /></div></div>)
// const SelectField = memo(({ label, value, onChange, options }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>{options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}</select></div>)
// const ToggleField = memo(({ label, value, onChange }) => <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}><span style={s.label}>{label}</span><div onClick={()=>onChange(value==='true'?'false':'true')} style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}><div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} /></div></div>)
// const SpacingGrid = memo(({ label, values, keys, onChange }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>{[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=><div key={l}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div><StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number" style={{ ...s.input, width:'100%' }} /></div>)}</div></div>)
// const Row2    = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
// const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>

// // ─────────────────────────────────────────────────────────────────
// // DEFAULTS & RENDERERS
// // ─────────────────────────────────────────────────────────────────
// let uid = 0
// const newId = () => `el_${++uid}_${Date.now()}`
// const deep  = x => JSON.parse(JSON.stringify(x))

// const FONTS   = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
// const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
// const ALIGNS  = [['left','Left'],['center','Center'],['right','Right']]

// const SOCIAL_ABBR   = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg', Snapchat:'Sc', Reddit:'Re', Discord:'Di', Spotify:'Sp', Medium:'Me', Dribbble:'Dr', Behance:'Be', Vimeo:'Vi', Twitch:'Tv', Email:'Em' }
// const SOCIAL_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#24292e', Telegram:'#2ca5e0', Snapchat:'#fffc00', Reddit:'#ff4500', Discord:'#5865f2', Spotify:'#1db954', Medium:'#000000', Dribbble:'#ea4c89', Behance:'#1769ff', Vimeo:'#1ab7ea', Twitch:'#9146ff', Email:'#6366f1' }
// const SOCIAL_SLUG   = { Facebook:'facebook', Twitter:'x', Instagram:'instagram', LinkedIn:'linkedin', YouTube:'youtube', Pinterest:'pinterest', TikTok:'tiktok', WhatsApp:'whatsapp', GitHub:'github', Telegram:'telegram', Snapchat:'snapchat', Reddit:'reddit', Discord:'discord', Spotify:'spotify', Medium:'medium', Dribbble:'dribbble', Behance:'behance', Vimeo:'vimeo', Twitch:'twitch', Email:'gmail' }

// const D = {
//   text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
//   image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
//   divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
//   spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
//   banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', borderRadius:'50', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0', links:[{id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Twitter',url:'#',color:'#1da1f2',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'Instagram',url:'#',color:'#e1306c',size:'',pt:'',pb:'',pl:'',pr:''},{id:newId(),name:'LinkedIn',url:'#',color:'#0a66c2',size:'',pt:'',pb:'',pl:'',pr:''}] },
//   footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
//   columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
// }

// const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
// const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// const renderEl = b => {
//   const p = b.props, ms = `margin:${mars(p)};`
//   if (b.type==='text')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`
//   if (b.type==='heading')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`
//   if (b.type==='image') {
//     const img = p.src ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">` : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image URL daalo ]</div>`
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${p.link?`<a href="${p.link}" style="display:block">${img}</a>`:img}</td></tr></table>`
//   }
//   if (b.type==='button') {
//     const fw = p.fullWidth==='true'
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0"><a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a></td></tr></table>`
//   }
//   if (b.type==='divider')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`
//   if (b.type==='spacer')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`
//   if (b.type==='banner') {
//     const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
//   }
//   if (b.type==='social') {
//     const dfSz = parseInt(p.iconSize||36), half = Math.floor(parseInt(p.gap||12)/2)
//     const br = p.borderRadius==='50'?'50%':p.borderRadius==='20'?'8px':'4px'
//     const icons = (p.links||[]).map(l=>{
//       const sz = parseInt(l.size||dfSz), bg = l.color||SOCIAL_COLORS[l.name]||'#666'
//       const ipt=parseInt(l.pt||0),ipb=parseInt(l.pb||0),ipl=parseInt(l.pl||0),ipr=parseInt(l.pr||0)
//       const slug = SOCIAL_SLUG[l.name]||l.name.toLowerCase()
//       const svgPath = SOCIAL_SVG?.[l.name]
//       const iconSz = Math.round(sz*0.52)
//       // const inner = svgPath
//       //   ? `<svg width="${iconSz}" height="${iconSz}" viewBox="0 0 24 24" fill="white" style="display:block;margin:0 auto"><path d="${svgPath}"/></svg>`
//       //   : `<img src="https://cdn.simpleicons.org/${slug}/ffffff" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;margin:0 auto">`
//      const inner = svgPath
//   ? (() => {
//       const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSz}" height="${iconSz}" viewBox="0 0 24 24" fill="white"><path d="${svgPath}"/></svg>`
//       const b64 = btoa(svgStr)
//       return `<img src="data:image/svg+xml;base64,${b64}" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;margin:0 auto">`
//     })()
//   : `<img src="https://cdn.simpleicons.org/${slug}/ffffff" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;margin:0 auto">`
//         return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none;vertical-align:middle" target="_blank"><table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:collapse"><tr><td width="${sz}" height="${sz}" align="center" valign="middle" style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${br};text-align:center;vertical-align:middle;padding:${ipt}px ${ipr}px ${ipb}px ${ipl}px">${inner}</td></tr></table></a>`
//     }).join('')
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
//   }
//   if (b.type==='footer') {
//     const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
//     const sub = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
//   }
//   if (b.type==='columns') {
//     const cols=p.cols||[], g=parseInt(p.gap||8)
//     return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${cols.map(col=>`<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${(col.blocks||[]).map(renderEl).join('')||'&nbsp;'}</td>`).join('')}</tr></table>`
//   }
//   return ''
// }

// const buildEmail = (blocks, bg, width) =>
//   `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// // ─────────────────────────────────────────────────────────────────
// // PROPS PANELS
// // ─────────────────────────────────────────────────────────────────
// const sp = (p,u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
// const sm = (p,u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

// const TextPanel    = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Email Body</span><RichEditorField value={p.html} onChange={v=>u('html',v)} /></div><Section title="Typography" /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const HeadingPanel = memo(({ p, u }) => <><Section title="Content" /><Field label="Text" value={p.text} onChange={v=>u('text',v)} /><SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1'],['h2','H2'],['h3','H3'],['h4','H4']]} /><Section title="Style" /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const ImagePanel   = memo(({ p, u }) => <><Section title="Image" /><Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." /><Field label="Click Link" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." /><Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} /><Row2><Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" /><Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const ButtonPanel  = memo(({ p, u }) => <><Section title="Button" /><Field label="Button Text" value={p.text} onChange={v=>u('text',v)} /><Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." /><Section title="Style" /><ColorField label="Button Color" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} /><Section title="Button Padding" />{sp(p,u)}<Section title="Outer Margin" />{sm(p,u)}</>)
// const DividerPanel = memo(({ p, u }) => <><Section title="Line" /><ColorField label="Color" value={p.color} onChange={v=>u('color',v)} /><Row2><Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" /><SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} /></Row2><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
// const SpacerPanel  = memo(({ p, u }) => <><Section title="Spacer" /><Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Margin" />{sm(p,u)}</>)
// const BannerPanel  = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Main Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} /><Row2><Field label="Main Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Sub Size" value={p.subtextSize} onChange={v=>u('subtextSize',v)} type="number" /></Row2><Row2><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

// const SocialPanel = memo(({ p, u }) => {
//   const [expanded, setExpanded] = useState(null)
//   const links = p.links || []
//   const add    = () => { const l={id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''}; u('links',[...links,l]); setExpanded(l.id) }
//   const del    = id  => { u('links',links.filter(l=>l.id!==id)); if(expanded===id) setExpanded(null) }
//   const upd    = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))
//   const move   = (idx,dir) => { const arr=[...links],j=idx+dir; if(j<0||j>=arr.length) return; [arr[idx],arr[j]]=[arr[j],arr[idx]]; u('links',arr) }
//   const moveTo = (fromIdx,toPos) => { const to=Math.max(0,Math.min(links.length-1,parseInt(toPos)-1)); if(isNaN(to)||to===fromIdx) return; const arr=[...links]; const [item]=arr.splice(fromIdx,1); arr.splice(to,0,item); u('links',arr) }
//   const ALL = Object.keys(SOCIAL_ABBR).map(k=>[k,k])
//   return <>
//     <Section title="Row Layout" />
//     <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
//     <Row2>
//       <Field label="Default Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
//       <Field label="Gap (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
//     </Row2>
//     <Row2>
//       <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
//       <div><span style={s.label}>Shape</span><select value={p.borderRadius||'50'} onChange={e=>u('borderRadius',e.target.value)} style={s.select}><option value="50">Circle</option><option value="20">Rounded</option><option value="0">Square</option></select></div>
//     </Row2>
//     <Section title="Icons (↑↓ to reorder)" />
//     <button onClick={add} style={{ width:'100%', padding:'7px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, marginBottom:8 }}>+ Add Social Icon</button>
//     {links.map((l,idx) => {
//       const isOpen = expanded === l.id
//       return (
//         <div key={l.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, marginBottom:6, overflow:'hidden' }}>
//           <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', background:isOpen?'#eff6ff':'#f8fafc', cursor:'pointer' }} onClick={()=>setExpanded(isOpen?null:l.id)}>
//             <div style={{ width:18, height:18, borderRadius:'50%', background:'#e2e8f0', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#64748b', fontWeight:700 }}>{idx+1}</div>
//             <div style={{ width:22, height:22, borderRadius:'50%', background:l.color||SOCIAL_COLORS[l.name]||'#666', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
//               <img src={`https://cdn.simpleicons.org/${SOCIAL_SLUG[l.name]||l.name.toLowerCase()}/ffffff`} width="12" height="12" alt="" style={{ display:'block' }} onError={e=>{ e.target.style.display='none' }} />
//             </div>
//             <span style={{ flex:1, fontSize:12, fontWeight:600, color:'#374151' }}>{l.name}</span>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,-1)}} style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↑</button>
//             <button onMouseDown={e=>{e.stopPropagation();move(idx,1)}} style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↓</button>
//             <button onMouseDown={e=>{e.stopPropagation();del(l.id)}} style={{ padding:'1px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:3, cursor:'pointer' }}>✕</button>
//             <span style={{ fontSize:10, color:'#94a3b8' }}>{isOpen?'▲':'▼'}</span>
//           </div>
//           {isOpen && (
//             <div style={{ padding:'8px 10px', borderTop:'1px solid #e2e8f0' }}>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Platform</span>
//                 <select value={l.name} onChange={e=>{ const n=e.target.value; u('links',links.map(x=>x.id===l.id?{...x,name:n,color:SOCIAL_COLORS[n]||'#666'}:x)) }} style={s.select}>
//                   {ALL.map(([v,lb])=><option key={v} value={v}>{lb}</option>)}
//                 </select>
//               </div>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Link URL</span><StableInput value={l.url||''} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." style={s.input} /></div>
//               <ColorField label="Icon Color" value={l.color||SOCIAL_COLORS[l.name]||'#666'} onChange={v=>upd(l.id,'color',v)} />
//               <div style={{ marginBottom:8 }}><span style={s.label}>Custom Size (blank = default)</span><StableInput value={l.size||''} onChange={v=>upd(l.id,'size',v)} type="number" placeholder={p.iconSize||'36'} style={s.input} /></div>
//               <div style={{ marginBottom:8 }}><span style={s.label}>Move to Position</span>
//                 <div style={{ display:'flex', gap:6 }}>
//                   <div style={{ ...s.input, width:40, textAlign:'center', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700 }}>{idx+1}</div>
//                   <select defaultValue="" onChange={e=>{ if(e.target.value){moveTo(idx,e.target.value);e.target.value=''}}} style={{ ...s.input, flex:1, cursor:'pointer' }}>
//                     <option value="">Jump to position...</option>
//                     {links.map((_,i)=>i!==idx&&<option key={i} value={i+1}>Position {i+1}</option>)}
//                   </select>
//                 </div>
//               </div>
//               <div style={{ marginBottom:4 }}><span style={s.label}>Icon Padding (px)</span>
//                 <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
//                   {[['Top','pt'],['Bottom','pb'],['Left','pl'],['Right','pr']].map(([lb,k])=><div key={k}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{lb}</div><StableInput value={l[k]||''} onChange={v=>upd(l.id,k,v)} type="number" placeholder="0" style={{ ...s.input, width:'100%' }} /></div>)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     })}
//     <Section title="Row Spacing" />{sp(p,u)}{sm(p,u)}
//   </>
// })

// const FooterPanel = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Footer Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Unsubscribe" /><ToggleField label="Show Unsubscribe" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />{p.showUnsub==='true'&&<><Field label="Unsub Text" value={p.unsubText} onChange={v=>u('unsubText',v)} /><Field label="Unsub URL" value={p.unsubUrl} onChange={v=>u('unsubUrl',v)} placeholder="https://..." /></>}<Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

// const ColumnsPanel = memo(({ p, u }) => {
//   const [activeCol, setActiveCol] = useState(0)
//   const cols = p.cols||[]
//   const updateCols = next => u('cols',next)
//   const addCol     = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
//   const removeCol  = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
//   const setColProp = (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
//   const col = cols[Math.min(activeCol,cols.length-1)]
//   return <><Section title="Row" /><ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Field label="Gap (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" /><Section title="Columns" /><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><span style={{ fontSize:12, fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span><button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button></div><div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>{cols.map((_,i)=><div key={i} style={{ display:'flex', gap:2 }}><button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':'white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>{cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}</div>)}</div>{col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}><div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div><Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" /><ColorField label="Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} /><div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>💡 Canvas mein Col {activeCol+1} pe click → "Add to Column"</div></div>}<Section title="Outer Spacing" />{sp(p,u)}{sm(p,u)}</>
// })

// // ─────────────────────────────────────────────────────────────────
// // REDUCER
// // ─────────────────────────────────────────────────────────────────
// const BLOCK_DEFS = [
//   { type:'banner',  icon:'◼', label:'Banner',  desc:'Header/brand bar' },
//   { type:'heading', icon:'H', label:'Heading', desc:'Section title' },
//   { type:'text',    icon:'¶', label:'Text',    desc:'Paragraph / HTML' },
//   { type:'image',   icon:'▨', label:'Image',   desc:'Photo / banner' },
//   { type:'button',  icon:'▶', label:'Button',  desc:'CTA / link button' },
//   { type:'columns', icon:'⊞', label:'Columns', desc:'Multi-col layout' },
//   { type:'divider', icon:'─', label:'Divider', desc:'Horizontal rule' },
//   { type:'spacer',  icon:'↕', label:'Spacer',  desc:'Empty gap' },
//   { type:'social',  icon:'◉', label:'Social',  desc:'Social icons row' },
//   { type:'footer',  icon:'▪', label:'Footer',  desc:'Footer + unsub' },
// ]
// const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']
// const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null })

// function reducer(state, action) {
//   switch(action.type) {
//     case 'ADD_BLOCK': {
//       const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
//       if (action.colCtx) {
//         const { blockId, colIdx } = action.colCtx
//         return { ...state, colCtx:null, blocks: state.blocks.map(bl => bl.id!==blockId ? bl : { ...bl, props:{ ...bl.props, cols:bl.props.cols.map((c,i)=>i!==colIdx?c:{...c,blocks:[...(c.blocks||[]),b]}) } }) }
//       }
//       return { ...state, blocks:[...state.blocks,b], sel:{ id:b.id, colCtx:null } }
//     }
//     case 'SELECT':       return { ...state, sel:action.sel }
//     case 'OPEN_MODAL':   return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }
//     case 'CLOSE_MODAL':  return { ...state, openModal:null }
//     case 'DELETE': {
//       const { id, colCtx } = action
//       if (colCtx) return { ...state, sel:null, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{...c,blocks:c.blocks.filter(ib=>ib.id!==id)})}}) }
//       return { ...state, sel:null, blocks:state.blocks.filter(b=>b.id!==id) }
//     }
//     case 'DUPLICATE': {
//       const idx=state.blocks.findIndex(b=>b.id===action.id); if(idx<0) return state
//       const copy={...deep(state.blocks[idx]),id:newId()}; const next=[...state.blocks]; next.splice(idx+1,0,copy)
//       return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
//     }
//     case 'MOVE': {
//       const { id, dir } = action; const arr=[...state.blocks],i=arr.findIndex(b=>b.id===id),j=i+dir
//       if(j<0||j>=arr.length) return state; [arr[i],arr[j]]=[arr[j],arr[i]]; return { ...state, blocks:arr }
//     }
//     case 'UPDATE_PROP': {
//       const { id, key, val, colCtx } = action
//       if (colCtx) return { ...state, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{...c,blocks:c.blocks.map(ib=>ib.id!==id?ib:{...ib,props:{...ib.props,[key]:val}})})}})}
//       return { ...state, blocks:state.blocks.map(b=>b.id!==id?b:{...b,props:{...b.props,[key]:val}}) }
//     }
//     case 'MOVE_INNER': {
//       const { blockId, colIdx, id, dir } = action
//       return { ...state, blocks:state.blocks.map(bl=>{
//         if(bl.id!==blockId) return bl
//         const cols=bl.props.cols.map((c,ci)=>{ if(ci!==colIdx) return c; const arr=[...(c.blocks||[])],i=arr.findIndex(b=>b.id===id),j=i+dir; if(j<0||j>=arr.length) return c; [arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr} })
//         return {...bl,props:{...bl.props,cols}}
//       }) }
//     }
//     case 'LOAD_TEMPLATE': {
//       // Reset uid to avoid id conflicts
//       uid = Date.now()
//       return { ...state, blocks: action.blocks, openModal: null, sel: null, colCtx: null }
//     }
//     case 'SET_COL_CTX':  return { ...state, colCtx:action.ctx }
//     default: return state
//   }
// }

// // ─────────────────────────────────────────────────────────────────
// // MAIN EXPORT
// // ─────────────────────────────────────────────────────────────────
// export default function EmailBuilder({ onUseTemplate }) {
//   const [state, dispatch]         = useReducer(reducer, null, init)
//   const [emailBg, setEmailBg]     = useState('#f1f5f9')
//   const [emailWidth, setEmailWidth] = useState('600')
//   const [preview, setPreview]     = useState(false)
//   const [showTplModal,  setShowTplModal]  = useState(false)
//   const [editingTpl,    setEditingTpl]    = useState(null)  // { _id, name } — set when editing a saved template

//   const { blocks, sel, colCtx, openModal } = state

//   let selBlock = null
//   if (sel) {
//     if (sel.colCtx) {
//       const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
//       selBlock = parent?.props?.cols?.[sel.colCtx.colIdx]?.blocks?.find(b=>b.id===sel.id) || null
//     } else {
//       selBlock = blocks.find(b=>b.id===sel.id) || null
//     }
//   }

//   const update = useCallback((id, key, val) => {
//     dispatch({ type:'UPDATE_PROP', id, key, val, colCtx: sel?.colCtx||null })
//   }, [sel])

//   const renderProps = () => {
//     if (!selBlock) return <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}><div style={{ fontSize:32, marginBottom:8 }}>←</div><div style={{ fontSize:13 }}>Block select karo</div></div>
//     const p = selBlock.props, u = (k,v) => update(selBlock.id,k,v)
//     const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
//     return map[selBlock.type] || null
//   }

//   const handleLoad = (tpl) => {
//     if (tpl.mode === 'use') {
//       // Apply htmlBody directly as email body
//       onUseTemplate(tpl.htmlBody || '')
//       return
//     }
//     // mode:'edit' — load blocks into builder and remember which template to update
//     dispatch({ type:'LOAD_TEMPLATE', blocks: tpl.blocks || [] })
//     if (tpl.emailBg)    setEmailBg(tpl.emailBg)
//     if (tpl.emailWidth) setEmailWidth(String(tpl.emailWidth || '600'))
//     if (tpl._id) setEditingTpl({ _id: tpl._id, name: tpl.name })  // track for "Update" button
//   }

//   const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

//   return (
//     <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

//       {/* ══ TOP BAR ══ */}
//       <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//         {/* Block buttons */}
//         <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
//             {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
//           </span>
//           {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label }) => (
//             <button key={type} onClick={()=>addBlock(type)}
//               style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
//               onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
//               onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.borderColor='#e2e8f0' }}>
//               <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>{label}
//             </button>
//           ))}
//           {colCtx && (
//             <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
//               style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
//               ✕ Cancel
//             </button>
//           )}
//         </div>

//         {/* Settings row */}
//         <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
//           <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
//             <StableColor value={emailBg} onChange={setEmailBg} />
//             <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:5 }}>
//             <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
//             <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={{ ...s.select, width:130 }}>
//               <option value="520">520px — Narrow</option>
//               <option value="600">600px — Standard</option>
//               <option value="640">640px — Wide</option>
//             </select>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto', flexWrap:'wrap' }}>

//             {/* ── Editing banner + Update button ── */}
//             {editingTpl && (
//               <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8 }}>
//                 <span style={{ fontSize:11, color:'#92400e' }}>✏️ Editing: <b>{editingTpl.name}</b></span>
//                 <button
//                   onClick={async () => {
//                     if (!blocks.length) return alert('Koi block nahi hai!')
//                     try {
//                       const html = buildEmail(blocks, emailBg, emailWidth)
//                       await axios.put(`${Url}/api/bulkmail/templates/${editingTpl._id}`, {
//                         htmlBody:   html,
//                         blocks:     blocks,
//                         emailBg:    emailBg,
//                         emailWidth: emailWidth,
//                       })
//                       alert(`✅ "${editingTpl.name}" update ho gaya!`)
//                     } catch(e) { alert(e.response?.data?.message || 'Update failed') }
//                   }}
//                   style={{ padding:'4px 12px', fontSize:11, fontWeight:700, background:'#f59e0b', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
//                   💾 Update
//                 </button>
//                 <button onClick={()=>setEditingTpl(null)}
//                   style={{ padding:'3px 7px', fontSize:11, background:'none', border:'none', cursor:'pointer', color:'#94a3b8' }} title="Stop editing this template">
//                   ✕
//                 </button>
//               </div>
//             )}

//             {/* Save/Load Templates button */}
//             <button onClick={()=>setShowTplModal(true)}
//               style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', background:'white', color:'#374151', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
//               📋 Templates
//             </button>
//             {[['Edit',false],['Preview',true]].map(([l,v])=>(
//               <button key={l} onClick={()=>setPreview(v)} style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
//             ))}
//             <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))} disabled={!blocks.length}
//               style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
//               ✓ Apply Template
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ══ CANVAS + PROPS ══ */}
//       <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>
//         {/* Canvas */}
//         <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
//           <div style={{ overflowY:'auto', flex:1, padding:16 }}>
//             <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
//               {blocks.length===0 && !preview && (
//                 <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
//                   <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
//                   <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
//                   <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
//                 </div>
//               )}
//               {blocks.map(b => {
//                 const isSel = !preview && sel?.id===b.id && !sel?.colCtx
//                 const toolbar = (id, cc=null) => !preview && (
//                   <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB}>↑</button>
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB}>↓</button>
//                     {!cc&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}}>⧉</button>}
//                     <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx:cc})}} style={{...TB,background:'#dc2626'}}>✕</button>
//                   </div>
//                 )
//                 if (b.type==='columns') return (
//                   <div key={b.id} onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                     {toolbar(b.id)}
//                     <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
//                       <tbody><tr>
//                         {(b.props.cols||[]).map((col,ci) => {
//                           const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
//                           return (
//                             <td key={col.id} width={col.width+'%'} valign="top"
//                               style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
//                               {(col.blocks||[]).map(ib => {
//                                 const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
//                                 return (
//                                   <div key={ib.id} onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
//                                     style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
//                                     <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
//                                       {!preview&&<>
//                                         <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
//                                         <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
//                                         <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
//                                       </>}
//                                     </div>
//                                     <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
//                                   </div>
//                                 )
//                               })}
//                               {!preview&&<button onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
//                                 style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
//                                 + Add to Col {ci+1}
//                               </button>}
//                             </td>
//                           )
//                         })}
//                       </tr></tbody>
//                     </table>
//                   </div>
//                 )
//                 return (
//                   <div key={b.id}
//                     onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
//                     onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
//                     style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
//                     {toolbar(b.id)}
//                     <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Properties */}
//         <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
//           <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
//             {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
//           </div>
//           <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>
//             {renderProps()}
//           </div>
//         </div>
//       </div>

//       {/* Editor modal */}
//       {openModal && (() => {
//         const mb = blocks.find(x=>x.id===openModal); if (!mb) return null
//         const pk = mb.type==='text' ? 'html' : 'mainText'
//         return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
//       })()}

//       {/* Template save/load modal */}
//       {showTplModal && (
//         <TemplateSaveModal
//           blocks={blocks}
//           emailBg={emailBg}
//           emailWidth={emailWidth}
//           onClose={()=>setShowTplModal(false)}
//           onLoad={handleLoad}
//         />
//       )}
//     </div>
//   )
// }

// const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }













import React, { useState, useRef, useCallback, memo, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Url } from 'src/url/url'
import { SOCIAL_SVG } from 'src/utils/data'

// ─────────────────────────────────────────────────────────────────
// STABLE INPUTS
// ─────────────────────────────────────────────────────────────────
const StableInput = memo(({ value, onChange, type='text', style={}, placeholder='' }) => {
  const ref = useRef(null)
  const lastVal = useRef(value)
  useEffect(() => { if (ref.current) { ref.current.value = value ?? ''; lastVal.current = value } }, [])
  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current && value !== lastVal.current) {
      ref.current.value = value ?? ''; lastVal.current = value
    }
  }, [value])
  return <input ref={ref} type={type} defaultValue={value ?? ''} placeholder={placeholder}
    onChange={e => { lastVal.current = e.target.value; onChange(e.target.value) }} style={style} />
})

const StableColor = memo(({ value, onChange }) => {
  const ref = useRef(null)
  useEffect(() => { if (ref.current) ref.current.value = value || '#000000' }, [value])
  return <input ref={ref} type="color" defaultValue={value || '#000000'} onChange={e => onChange(e.target.value)}
    style={{ width:32, height:28, border:'none', borderRadius:5, cursor:'pointer', padding:1, flexShrink:0 }} />
})

// ─────────────────────────────────────────────────────────────────
// ICON HELPER
// — S3/CDN URL  → direct use karo (Gmail mein perfectly kaam karta hai)
// — SVG path    → Canvas 4× PNG banao (local preview ke liye)
// ─────────────────────────────────────────────────────────────────
const resolveIconSrc = (value, iconSz) => {
  if (!value) return null
  // Hosted URL (S3, CDN, etc.) — direct return
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  // SVG path — Canvas se PNG banao
  try {
    const scale  = 4
    const canvas = document.createElement('canvas')
    canvas.width  = iconSz * scale
    canvas.height = iconSz * scale
    const ctx       = canvas.getContext('2d')
    ctx.scale(scale, scale)
    const pathScale = iconSz / 24
    ctx.save()
    ctx.scale(pathScale, pathScale)
    ctx.fillStyle = 'white'
    ctx.fill(new Path2D(value))
    ctx.restore()
    return canvas.toDataURL('image/png')
  } catch {
    // Canvas fail — base64 SVG fallback
    try {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSz}" height="${iconSz}" viewBox="0 0 24 24" fill="white"><path d="${value}"/></svg>`
      return `data:image/svg+xml;base64,${btoa(svg)}`
    } catch { return null }
  }
}

// ─────────────────────────────────────────────────────────────────
// TEMPLATE SAVE / LOAD MODAL
// ─────────────────────────────────────────────────────────────────
const TemplateSaveModal = memo(({ blocks, emailBg, emailWidth, onClose, onLoad }) => {
  const [tab,       setTab]       = useState('save')
  const [templates, setTemplates] = useState([])
  const [loading,   setLoading]   = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [msg,       setMsg]       = useState(null)
  const nameRef = useRef(null)

  useEffect(() => {
    if (tab === 'load') {
      setLoading(true)
      axios.get(`${Url}/api/bulkmail/templates/list`)
        .then(r => setTemplates(r.data.templates || []))
        .catch(() => setMsg({ err: true, text: 'Templates is not Found' }))
        .finally(() => setLoading(false))
    }
  }, [tab])

  const handleSave = async () => {
    const n = nameRef.current?.value?.trim()
    if (!n) return setMsg({ err: true, text: 'Enter Template name' })
    if (!blocks.length) return setMsg({ err: true, text: 'Add Block inside the Builder' })
    setSaving(true); setMsg(null)
    try {
      const html = buildEmail(blocks, emailBg, emailWidth)
      await axios.post(`${Url}/api/bulkmail/templates/save`, { name:n, htmlBody:html, blocks, emailBg, emailWidth })
      setMsg({ err: false, text: `"${n}" is saved ✅` })
      if (nameRef.current) nameRef.current.value = ''
    } catch (e) {
      setMsg({ err: true, text: e.response?.data?.message || 'Save failed' })
    }
    setSaving(false)
  }

  const handleDelete = async (id, tplName, e) => {
    e.stopPropagation()
    if (!window.confirm(`"${tplName}" Are you sure to delete?`)) return
    try {
      await axios.delete(`${Url}/api/bulkmail/templates/${id}`)
      setTemplates(t => t.filter(x => x._id !== id))
    } catch { setMsg({ err: true, text: 'Delete failed' }) }
  }

  const handleEdit = async (tpl) => {
    try {
      const r = await axios.get(`${Url}/api/bulkmail/templates/${tpl._id}`)
      const f = r.data.template
      onLoad({ _id:f._id, name:f.name, blocks:f.blocks||[], emailBg:f.emailBg, emailWidth:f.emailWidth, mode:'edit' })
    } catch {
      onLoad({ _id:tpl._id, name:tpl.name, blocks:tpl.blocks||[], emailBg:tpl.emailBg, emailWidth:tpl.emailWidth, mode:'edit' })
    }
    onClose()
  }

  const handleUse = (tpl) => { onLoad({ htmlBody:tpl.htmlBody, mode:'use' }); onClose() }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}
      onMouseDown={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:'white', borderRadius:14, width:'min(580px,94vw)', maxHeight:'88vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
          <span style={{ fontSize:15, fontWeight:700, color:'#1e293b' }}>📋 Email Templates</span>
          <button onClick={onClose} style={{ padding:'4px 12px', background:'#e2e8f0', border:'none', borderRadius:6, cursor:'pointer', fontSize:13, color:'#64748b' }}>✕ Close</button>
        </div>
        <div style={{ display:'flex', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
          {[['save','💾 Save Current'],['load','📂 My Templates']].map(([k,l]) => (
            <button key={k} onClick={() => { setTab(k); setMsg(null) }}
              style={{ padding:'10px 20px', fontSize:13, border:'none', cursor:'pointer', fontWeight:tab===k?700:400, background:'none', borderBottom:tab===k?'2px solid #1e40af':'2px solid transparent', color:tab===k?'#1e40af':'#64748b' }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:20 }}>
          {tab === 'save' && (
            <div>
              <p style={{ fontSize:13, color:'#64748b', marginBottom:16, marginTop:0 }}>Builder ka current design save karo — baad mein edit ya use kar sakte ho.</p>
              <label style={{ fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.04em', display:'block', marginBottom:6 }}>Template Name</label>
              <input ref={nameRef} placeholder="e.g. Welcome Email, Diwali Offer..."
                style={{ width:'100%', padding:'10px 12px', fontSize:14, border:'1px solid #e2e8f0', borderRadius:8, outline:'none', boxSizing:'border-box', marginBottom:12 }} />
              <div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:12, color:'#64748b' }}>
                <strong>{blocks.length}</strong> blocks · BG: <code>{emailBg}</code> · Width: {emailWidth}px
              </div>
              {msg && <div style={{ padding:'9px 13px', borderRadius:8, marginBottom:14, fontSize:13, background:msg.err?'#fef2f2':'#f0fdf4', color:msg.err?'#dc2626':'#16a34a', border:`1px solid ${msg.err?'#fecaca':'#bbf7d0'}` }}>{msg.text}</div>}
              <button onClick={handleSave} disabled={saving||!blocks.length}
                style={{ width:'100%', padding:'12px', background:(saving||!blocks.length)?'#e2e8f0':'#1e40af', color:(saving||!blocks.length)?'#94a3b8':'white', border:'none', borderRadius:8, cursor:(saving||!blocks.length)?'not-allowed':'pointer', fontSize:14, fontWeight:700 }}>
                {saving ? '⏳ Saving...' : '💾 Save Template'}
              </button>
              {!blocks.length && <p style={{ fontSize:12, color:'#94a3b8', textAlign:'center', marginTop:8 }}>Builder mein pehle kuch blocks add karo</p>}
            </div>
          )}
          {tab === 'load' && (
            <div>
              {msg && <div style={{ padding:'9px 13px', borderRadius:8, marginBottom:14, fontSize:13, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca' }}>{msg.text}</div>}
              {loading ? (
                <div style={{ textAlign:'center', padding:'40px 0', color:'#94a3b8', fontSize:13 }}>Loading...</div>
              ) : templates.length === 0 ? (
                <div style={{ textAlign:'center', padding:'40px 20px', color:'#94a3b8' }}>
                  <div style={{ fontSize:40, marginBottom:10 }}>📭</div>
                  <div style={{ fontSize:14, fontWeight:500 }}>Koi saved template nahi</div>
                  <div style={{ fontSize:12, marginTop:6 }}>Save tab se pehle ek save karo</div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {templates.map(tpl => (
                    <div key={tpl._id} style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', background:'white', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
                      <div style={{ height:180, background:'#f8fafc', overflow:'hidden', position:'relative', borderBottom:'1px solid #e2e8f0' }}>
                        {tpl.htmlBody
                          ? <iframe srcDoc={tpl.htmlBody} scrolling="no" title={tpl.name} sandbox="allow-same-origin" style={{ width:'600px', height:'900px', border:'none', pointerEvents:'none', transform:'scale(0.85)', transformOrigin:'top left' }} />
                          : <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#94a3b8', fontSize:13 }}>No preview</div>}
                      </div>
                      <div style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:700, color:'#1e293b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{tpl.name}</div>
                          <div style={{ fontSize:11, color:'#94a3b8', marginTop:2 }}>{new Date(tpl.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                        </div>
                        <button onClick={() => handleEdit(tpl)} style={{ padding:'7px 14px', background:'#f0fdf4', color:'#16a34a', border:'1px solid #bbf7d0', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>✏️ Edit</button>
                        <button onClick={() => handleUse(tpl)}  style={{ padding:'7px 16px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, whiteSpace:'nowrap' }}>✓ Use</button>
                        <button onClick={e => handleDelete(tpl._id, tpl.name, e)} style={{ padding:'7px 10px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12 }}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

// ─────────────────────────────────────────────────────────────────
// TEXT EDITOR MODAL
// ─────────────────────────────────────────────────────────────────
const EditorModal = memo(({ value, onChange, onClose }) => {
  const ref = useRef(null)
  useEffect(() => { if (ref.current) { ref.current.innerHTML = value || ''; ref.current.focus() } }, [])

  const exec       = (cmd, val=null) => { ref.current?.focus(); document.execCommand(cmd, false, val); setTimeout(() => onChange(ref.current?.innerHTML || ''), 0) }
  const insertLink = () => { const url = window.prompt('Link URL:', 'https://'); if (url) exec('createLink', url) }
  const insertVar  = v  => { ref.current?.focus(); document.execCommand('insertText', false, v); setTimeout(() => onChange(ref.current?.innerHTML || ''), 0) }

  const SEP  = '|'
  const row1 = [
    { t:'B',       title:'Bold',        cmd:()=>exec('bold'),                  s:{fontWeight:700} },
    { t:'I',       title:'Italic',      cmd:()=>exec('italic'),                s:{fontStyle:'italic'} },
    { t:'U',       title:'Underline',   cmd:()=>exec('underline'),             s:{textDecoration:'underline'} },
    { t:'S',       title:'Strike',      cmd:()=>exec('strikeThrough'),         s:{textDecoration:'line-through'} },
    { t:SEP },
    { t:'≡L',      title:'Left',        cmd:()=>exec('justifyLeft') },
    { t:'≡C',      title:'Center',      cmd:()=>exec('justifyCenter') },
    { t:'≡R',      title:'Right',       cmd:()=>exec('justifyRight') },
    { t:SEP },
    { t:'• list',  title:'Bullet',      cmd:()=>exec('insertUnorderedList') },
    { t:'1. list', title:'Number',      cmd:()=>exec('insertOrderedList') },
    { t:SEP },
    { t:'🔗',      title:'Link',        cmd:insertLink },
    { t:'✕🔗',    title:'Remove link',  cmd:()=>exec('unlink') },
    { t:SEP },
    { t:'H1',      title:'H1',          cmd:()=>exec('formatBlock','h1') },
    { t:'H2',      title:'H2',          cmd:()=>exec('formatBlock','h2') },
    { t:'P',       title:'Para',        cmd:()=>exec('formatBlock','p') },
    { t:SEP },
    { t:'Clr',     title:'Clear',       cmd:()=>exec('removeFormat') },
  ]
  const QC = ['#000000','#1f2937','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff']
  const HL = ['#fef9c3','#dcfce7','#dbeafe','#fce7f3','#f3e8ff','#ffedd5']
  const bS = { padding:'4px 7px', fontSize:12, fontWeight:600, background:'none', border:'none', borderRadius:4, cursor:'pointer', color:'#374151', minWidth:24 }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center' }}
      onMouseDown={e=>{ if(e.target===e.currentTarget) onClose() }}>
      <div style={{ background:'white', borderRadius:12, width:'min(800px,94vw)', maxHeight:'90vh', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.3)' }}>
        <div style={{ padding:'12px 16px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f8fafc', flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:700, color:'#1e293b' }}>✏️ Edit Text</span>
          <button onClick={onClose} style={{ padding:'5px 16px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700 }}>Done ✓</button>
        </div>
        <div style={{ background:'#f8fafc', borderBottom:'1px solid #f1f5f9', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:1, alignItems:'center', flexShrink:0 }}>
          {row1.map((t,i) => {
            if (t.t===SEP) return <div key={i} style={{ width:1, height:18, background:'#e2e8f0', margin:'0 3px' }} />
            return <button key={i} title={t.title} onMouseDown={e=>{ e.preventDefault(); t.cmd() }}
              style={{ ...bS, ...(t.s||{}) }}
              onMouseEnter={e=>e.currentTarget.style.background='#e2e8f0'}
              onMouseLeave={e=>e.currentTarget.style.background='none'}>{t.t}</button>
          })}
        </div>
        <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', padding:'5px 10px', display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', flexShrink:0 }}>
          <select onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontName',e.target.value) }} defaultValue=""
            style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
            <option value="" disabled>Font</option>
            {[['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Times New Roman','Times'],['Courier New','Courier'],['Impact','Impact']].map(([v,l])=>
              <option key={v} value={v}>{l}</option>)}
          </select>
          <select onMouseDown={e=>e.stopPropagation()} onChange={e=>{ ref.current?.focus(); exec('fontSize',e.target.value) }} defaultValue=""
            style={{ fontSize:12, padding:'3px 6px', border:'1px solid #e2e8f0', borderRadius:5, background:'white', cursor:'pointer', height:26 }}>
            <option value="" disabled>Size</option>
            {[['1','8px'],['2','10px'],['3','12px'],['4','14px'],['5','18px'],['6','24px'],['7','32px']].map(([v,l])=>
              <option key={v} value={v}>{l}</option>)}
          </select>
          <div style={{ width:1, height:18, background:'#e2e8f0' }} />
          <label style={{ display:'flex', alignItems:'center', gap:3 }} onMouseDown={e=>e.preventDefault()}>
            <span style={{ fontSize:12, fontWeight:700, textDecoration:'underline', textDecorationColor:'#ef4444' }}>A</span>
            <input type="color" defaultValue="#000000" onChange={e=>exec('foreColor',e.target.value)} style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
            <span style={{ fontSize:11, color:'#64748b' }}>Color</span>
          </label>
          <label style={{ display:'flex', alignItems:'center', gap:3 }} onMouseDown={e=>e.preventDefault()}>
            <span style={{ fontSize:12, fontWeight:700, background:'#fde047', padding:'0 3px' }}>A</span>
            <input type="color" defaultValue="#fef9c3" onChange={e=>exec('hiliteColor',e.target.value)} style={{ width:24, height:22, border:'none', borderRadius:4, cursor:'pointer', padding:1 }} />
            <span style={{ fontSize:11, color:'#64748b' }}>Highlight</span>
          </label>
          <div style={{ width:1, height:18, background:'#e2e8f0' }} />
          <div style={{ display:'flex', gap:3 }}>
            {QC.map(c=><button key={c} onMouseDown={e=>{ e.preventDefault(); exec('foreColor',c) }}
              style={{ width:18, height:18, background:c, border:c==='#ffffff'?'1px solid #e2e8f0':'1px solid rgba(0,0,0,.1)', borderRadius:3, cursor:'pointer', padding:0 }} />)}
          </div>
          <div style={{ display:'flex', gap:3, alignItems:'center' }}>
            <span style={{ fontSize:11, color:'#94a3b8' }}>HL:</span>
            {HL.map(c=><button key={c} onMouseDown={e=>{ e.preventDefault(); exec('hiliteColor',c) }}
              style={{ width:18, height:18, background:c, border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', padding:0 }} />)}
          </div>
        </div>
        <div style={{ background:'#eff6ff', borderBottom:'1px solid #dbeafe', padding:'4px 10px', display:'flex', gap:6, alignItems:'center', flexShrink:0 }}>
          <span style={{ fontSize:11, color:'#3b82f6', fontWeight:700 }}>Insert:</span>
          {['{{name}}','{{company}}','{{email}}'].map(v=>
            <button key={v} onMouseDown={e=>{ e.preventDefault(); insertVar(v) }}
              style={{ padding:'2px 9px', fontSize:11, background:'#dbeafe', color:'#1d4ed8', border:'none', borderRadius:10, cursor:'pointer', fontWeight:700 }}>{v}</button>)}
        </div>
        <div ref={ref} contentEditable suppressContentEditableWarning
          onBlur={()=>onChange(ref.current?.innerHTML||'')}
          onInput={()=>onChange(ref.current?.innerHTML||'')}
          style={{ flex:1, overflowY:'auto', padding:'20px 24px', fontSize:15, color:'#374151', lineHeight:1.8, outline:'none', fontFamily:'Arial,sans-serif', minHeight:260 }} />
        <div style={{ padding:'10px 16px', borderTop:'1px solid #e2e8f0', background:'#f8fafc', display:'flex', justifyContent:'flex-end', gap:8, flexShrink:0 }}>
          <button onClick={()=>{ if(ref.current){ ref.current.innerHTML=''; onChange('') } }}
            style={{ padding:'6px 14px', background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, cursor:'pointer', fontSize:12 }}>Clear</button>
          <button onClick={onClose}
            style={{ padding:'6px 20px', background:'#0f172a', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700 }}>Done ✓</button>
        </div>
      </div>
    </div>
  )
})

const RichEditorField = memo(({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{ border:'1px solid #e2e8f0', borderRadius:8, overflow:'hidden', background:'white', marginBottom:2 }}>
        <div dangerouslySetInnerHTML={{ __html: value || '<span style="color:#94a3b8;font-style:italic">Empty...</span>' }}
          style={{ padding:'8px 10px', fontSize:12, color:'#374151', lineHeight:1.6, maxHeight:80, overflow:'hidden', pointerEvents:'none' }} />
        <div style={{ borderTop:'1px solid #f1f5f9', padding:'5px 8px', background:'#f8fafc', display:'flex', justifyContent:'flex-end' }}>
          <button onClick={()=>setOpen(true)} style={{ padding:'4px 14px', fontSize:11, fontWeight:700, background:'#1e40af', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>Edit Text ✏️</button>
        </div>
      </div>
      {open && <EditorModal value={value} onChange={onChange} onClose={()=>setOpen(false)} />}
    </>
  )
})

// ─────────────────────────────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────────────────────────────
const s = {
  label:        { fontSize:11, color:'#6b7280', marginBottom:3, fontWeight:600, display:'block', textTransform:'uppercase', letterSpacing:'0.04em' },
  input:        { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit', boxSizing:'border-box' },
  select:       { width:'100%', padding:'6px 8px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, outline:'none', color:'#1a202c', background:'white', fontFamily:'inherit' },
  sectionTitle: { fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', padding:'10px 0 5px', borderTop:'1px solid #f1f5f9', marginTop:6, display:'block' },
}

const Field       = memo(({ label, value, onChange, type='text', placeholder='' }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><StableInput value={value} onChange={onChange} type={type} placeholder={placeholder} style={s.input} /></div>)
const ColorField  = memo(({ label, value, onChange }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'flex', gap:6, alignItems:'center' }}><StableColor value={value} onChange={onChange} /><StableInput value={value} onChange={onChange} style={{ ...s.input, flex:1 }} /></div></div>)
const SelectField = memo(({ label, value, onChange, options }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><select value={value||''} onChange={e=>onChange(e.target.value)} style={s.select}>{options.map(([v,l])=><option key={v} value={v}>{l??v}</option>)}</select></div>)
const ToggleField = memo(({ label, value, onChange }) => <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}><span style={s.label}>{label}</span><div onClick={()=>onChange(value==='true'?'false':'true')} style={{ width:38, height:21, borderRadius:11, background:value==='true'?'#334155':'#cbd5e1', cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 }}><div style={{ width:17, height:17, borderRadius:'50%', background:'white', position:'absolute', top:2, left:value==='true'?19:2, transition:'left .2s' }} /></div></div>)
const SpacingGrid = memo(({ label, values, keys, onChange }) => <div style={{ marginBottom:10 }}><span style={s.label}>{label}</span><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>{[['Top',0],['Right',1],['Bottom',2],['Left',3]].map(([l,i])=><div key={l}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{l}</div><StableInput value={values[i]??'0'} onChange={v=>onChange(keys[i],v)} type="number" style={{ ...s.input, width:'100%' }} /></div>)}</div></div>)
const Row2    = ({ children }) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{children}</div>
const Section = ({ title }) => <span style={s.sectionTitle}>{title}</span>

// ─────────────────────────────────────────────────────────────────
// DEFAULTS & RENDERERS
// ─────────────────────────────────────────────────────────────────
let uid = 0
const newId = () => `el_${++uid}_${Date.now()}`
const deep  = x => JSON.parse(JSON.stringify(x))

const FONTS   = [['Arial','Arial'],['Georgia','Georgia'],['Verdana','Verdana'],['Trebuchet MS','Trebuchet'],['Tahoma','Tahoma']]
const WEIGHTS = [['400','Regular'],['500','Medium'],['600','SemiBold'],['700','Bold'],['800','ExtraBold']]
const ALIGNS  = [['left','Left'],['center','Center'],['right','Right']]

const SOCIAL_ABBR   = { Facebook:'Fb', Twitter:'Tw', Instagram:'In', LinkedIn:'Li', YouTube:'Yt', Pinterest:'Pi', TikTok:'Tk', WhatsApp:'Wa', GitHub:'Gh', Telegram:'Tg', Snapchat:'Sc', Reddit:'Re', Discord:'Di', Spotify:'Sp', Medium:'Me', Dribbble:'Dr', Behance:'Be', Vimeo:'Vi', Twitch:'Tv', Email:'Em' }
const SOCIAL_COLORS = { Facebook:'#1877f2', Twitter:'#1da1f2', Instagram:'#e1306c', LinkedIn:'#0a66c2', YouTube:'#ff0000', Pinterest:'#e60023', TikTok:'#010101', WhatsApp:'#25d366', GitHub:'#24292e', Telegram:'#2ca5e0', Snapchat:'#fffc00', Reddit:'#ff4500', Discord:'#5865f2', Spotify:'#1db954', Medium:'#000000', Dribbble:'#ea4c89', Behance:'#1769ff', Vimeo:'#1ab7ea', Twitch:'#9146ff', Email:'#6366f1' }
const SOCIAL_SLUG   = { Facebook:'facebook', Twitter:'x', Instagram:'instagram', LinkedIn:'linkedin', YouTube:'youtube', Pinterest:'pinterest', TikTok:'tiktok', WhatsApp:'whatsapp', GitHub:'github', Telegram:'telegram', Snapchat:'snapchat', Reddit:'reddit', Discord:'discord', Spotify:'spotify', Medium:'medium', Dribbble:'dribbble', Behance:'behance', Vimeo:'vimeo', Twitch:'twitch', Email:'gmail' }

const D = {
  text:    { html:'Hello <strong>{{name}}</strong>,<br><br>Your message goes here.<br><br>Best regards,<br><strong>Team GigBig</strong>', bgColor:'#ffffff', textColor:'#374151', fontSize:'15', fontFamily:'Arial', fontWeight:'400', lineHeight:'1.7', textAlign:'left', pt:'20', pr:'24', pb:'20', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
  heading: { text:'Section Heading', level:'h2', bgColor:'#ffffff', textColor:'#111827', fontSize:'26', fontWeight:'700', fontFamily:'Arial', textAlign:'center', letterSpacing:'0', pt:'20', pr:'20', pb:'8', pl:'20', mt:'0', mr:'0', mb:'0', ml:'0' },
  image:   { src:'', alt:'', link:'', width:'100', height:'220', borderRadius:'0', align:'center', bgColor:'#ffffff', pt:'0', pr:'0', pb:'0', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
  button:  { text:'Click Here', url:'#', bgColor:'#1e40af', textColor:'#ffffff', fontSize:'15', fontWeight:'700', fontFamily:'Arial', borderRadius:'6', align:'center', fullWidth:'false', pt:'12', pr:'28', pb:'12', pl:'28', mt:'8', mr:'0', mb:'8', ml:'0' },
  divider: { color:'#e2e8f0', thickness:'1', style:'solid', pt:'8', pr:'0', pb:'8', pl:'0', mt:'0', mr:'0', mb:'0', ml:'0' },
  spacer:  { height:'24', bgColor:'transparent', mt:'0', mr:'0', mb:'0', ml:'0' },
  banner:  { mainText:'Your Company', subText:'Your tagline here', bgColor:'#1e40af', textColor:'#ffffff', subtextColor:'#bfdbfe', fontSize:'28', subtextSize:'14', fontWeight:'700', fontFamily:'Arial', textAlign:'center', pt:'30', pr:'24', pb:'30', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
  social:  { bgColor:'#f8fafc', align:'center', iconSize:'36', gap:'12', borderRadius:'50', pt:'20', pr:'16', pb:'20', pl:'16', mt:'0', mr:'0', mb:'0', ml:'0',
    links:[
      {id:newId(),name:'Facebook', url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''},
      {id:newId(),name:'Twitter',  url:'#',color:'#1da1f2',size:'',pt:'',pb:'',pl:'',pr:''},
      {id:newId(),name:'Instagram',url:'#',color:'#e1306c',size:'',pt:'',pb:'',pl:'',pr:''},
      {id:newId(),name:'LinkedIn', url:'#',color:'#0a66c2',size:'',pt:'',pb:'',pl:'',pr:''},
      {id:newId(),name:'WhatsApp', url:'#',color:'#25d366',size:'',pt:'',pb:'',pl:'',pr:''},
    ]
  },
  footer:  { mainText:'© 2025 GigBig Global LLP. All rights reserved.', subText:'support@gig-big.com  •  www.gig-big.com', showUnsub:'true', unsubText:'Unsubscribe', unsubUrl:'#', bgColor:'#f8fafc', textColor:'#94a3b8', fontSize:'12', lineHeight:'1.6', textAlign:'center', pt:'24', pr:'24', pb:'24', pl:'24', mt:'0', mr:'0', mb:'0', ml:'0' },
  columns: { bgColor:'transparent', gap:'8', pt:'8', pr:'8', pb:'8', pl:'8', mt:'0', mr:'0', mb:'0', ml:'0', cols:[{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] },{ id:newId(), width:50, bgColor:'#ffffff', blocks:[] }] },
}

const pads = p => `${p.pt||0}px ${p.pr||0}px ${p.pb||0}px ${p.pl||0}px`
const mars = p => `${p.mt||0}px ${p.mr||0}px ${p.mb||0}px ${p.ml||0}px`

// ─────────────────────────────────────────────────────────────────
// RENDER ELEMENT
// Social icons: S3 URL → direct img | SVG path → Canvas PNG | fallback CDN
// ─────────────────────────────────────────────────────────────────
const renderEl = b => {
  const p = b.props, ms = `margin:${mars(p)};`

  if (b.type==='text')
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};font-size:${p.fontSize}px;color:${p.textColor};font-family:${p.fontFamily},sans-serif;line-height:${p.lineHeight};text-align:${p.textAlign};font-weight:${p.fontWeight}">${p.html}</td></tr></table>`

  if (b.type==='heading')
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><${p.level} style="margin:0;font-size:${p.fontSize}px;font-weight:${p.fontWeight};color:${p.textColor};font-family:${p.fontFamily},sans-serif;letter-spacing:${p.letterSpacing}px">${p.text}</${p.level}></td></tr></table>`

  if (b.type==='image') {
    const img = p.src
      ? `<img src="${p.src}" alt="${p.alt||''}" width="${p.width}%" style="display:block;${p.width!=='100'?'margin:0 auto;':''}max-height:${p.height}px;object-fit:cover;border-radius:${p.borderRadius}px">`
      : `<div style="background:#e2e8f0;height:${p.height}px;text-align:center;line-height:${p.height}px;color:#94a3b8;font-family:Arial;font-size:13px">[ Image URL daalo ]</div>`
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align}">${p.link?`<a href="${p.link}" style="display:block">${img}</a>`:img}</td></tr></table>`
  }

  if (b.type==='button') {
    const fw = p.fullWidth==='true'
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="text-align:${p.align};padding:0"><a href="${p.url}" style="display:inline-block;background:${p.bgColor};color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};text-decoration:none;border-radius:${p.borderRadius}px;padding:${pads(p)};font-family:${p.fontFamily||'Arial'},sans-serif;${fw?'width:100%;text-align:center;box-sizing:border-box;':''}">${p.text}</a></td></tr></table>`
  }

  if (b.type==='divider')
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="padding:${pads(p)}"><hr style="border:0;border-top:${p.thickness}px ${p.style} ${p.color};margin:0"></td></tr></table>`

  if (b.type==='spacer')
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="height:${p.height}px;background:${p.bgColor};font-size:1px;line-height:1px">&nbsp;</td></tr></table>`

  if (b.type==='banner') {
    const sub = p.subText ? `<div style="color:${p.subtextColor};font-size:${p.subtextSize}px;margin-top:8px;font-family:${p.fontFamily||'Arial'},sans-serif">${p.subText}</div>` : ''
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign}"><div style="color:${p.textColor};font-size:${p.fontSize}px;font-weight:${p.fontWeight};font-family:${p.fontFamily||'Arial'},sans-serif">${p.mainText}</div>${sub}</td></tr></table>`
  }

  if (b.type==='social') {
    const dfSz = parseInt(p.iconSize || 36)
    const half = Math.floor(parseInt(p.gap || 12) / 2)
    const br   = p.borderRadius==='50' ? '50%' : p.borderRadius==='20' ? '8px' : '4px'

    const icons = (p.links || []).map(l => {
      const sz  = parseInt(l.size || dfSz)
      const bg  = l.color || SOCIAL_COLORS[l.name] || '#666'
      const ipt = parseInt(l.pt||0), ipb = parseInt(l.pb||0)
      const ipl = parseInt(l.pl||0), ipr = parseInt(l.pr||0)
      const iconSz  = Math.round(sz * 0.52)
      const svgVal  = SOCIAL_SVG?.[l.name]

      // ── Resolve icon src ───────────────────────────────────────
      // 1. S3/hosted URL  → direct use (100% Gmail safe ✅)
      // 2. SVG path       → Canvas PNG (local preview ✅, Gmail ✅)
      // 3. No value       → simpleicons CDN fallback
      let iconSrc = resolveIconSrc(svgVal, iconSz)
      let inner
      if (iconSrc) {
        inner = `<img src="${iconSrc}" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;margin:0 auto">`
      } else {
        const slug = SOCIAL_SLUG[l.name] || l.name.toLowerCase()
        inner = `<img src="https://cdn.simpleicons.org/${slug}/ffffff" width="${iconSz}" height="${iconSz}" alt="${l.name}" style="display:block;margin:0 auto">`
      }

      return `<a href="${l.url}" style="display:inline-block;margin:0 ${half}px;text-decoration:none;vertical-align:middle" target="_blank"><table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:collapse"><tr><td width="${sz}" height="${sz}" align="center" valign="middle" style="width:${sz}px;height:${sz}px;background:${bg};border-radius:${br};text-align:center;vertical-align:middle;padding:${ipt}px ${ipr}px ${ipb}px ${ipl}px">${inner}</td></tr></table></a>`
    }).join('')

    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.align};font-size:0;line-height:0">${icons}</td></tr></table>`
  }

  if (b.type==='footer') {
    const unsub = p.showUnsub==='true' ? `<div style="margin-top:12px"><a href="${p.unsubUrl}" style="color:#94a3b8;font-size:11px;font-family:Arial,sans-serif">${p.unsubText||'Unsubscribe'}</a></div>` : ''
    const sub   = p.subText ? `<div style="margin-top:4px;font-size:11px;color:#b0bec5;font-family:Arial,sans-serif">${p.subText}</div>` : ''
    return `<table width="100%" cellpadding="0" cellspacing="0" style="${ms}border-collapse:collapse"><tr><td style="background:${p.bgColor};padding:${pads(p)};text-align:${p.textAlign};font-size:${p.fontSize}px;color:${p.textColor};font-family:Arial,sans-serif;line-height:${p.lineHeight}">${p.mainText}${sub}${unsub}</td></tr></table>`
  }

  if (b.type==='columns') {
    const cols = p.cols||[], g = parseInt(p.gap||8)
    return `<table width="100%" cellpadding="0" cellspacing="0" style="background:${p.bgColor};${ms}border-collapse:collapse"><tr>${cols.map(col=>`<td width="${col.width}%" valign="top" style="padding:${g}px;background:${col.bgColor||'transparent'};vertical-align:top">${(col.blocks||[]).map(renderEl).join('')||'&nbsp;'}</td>`).join('')}</tr></table>`
  }

  return ''
}

const buildEmail = (blocks, bg, width) =>
  `<!DOCTYPE html><html><body style="margin:0;padding:0;background:${bg}"><table width="100%" cellpadding="0" cellspacing="0" style="background:${bg}"><tr><td align="center" style="padding:20px 0"><table width="${width}" cellpadding="0" cellspacing="0" style="background:#ffffff">${blocks.map(renderEl).join('')}</table></td></tr></table></body></html>`

// ─────────────────────────────────────────────────────────────────
// PROPS PANELS
// ─────────────────────────────────────────────────────────────────
const sp = (p,u) => <SpacingGrid label="Padding" values={[p.pt,p.pr,p.pb,p.pl]} keys={['pt','pr','pb','pl']} onChange={u} />
const sm = (p,u) => <SpacingGrid label="Margin"  values={[p.mt,p.mr,p.mb,p.ml]} keys={['mt','mr','mb','ml']} onChange={u} />

const TextPanel    = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Email Body</span><RichEditorField value={p.html} onChange={v=>u('html',v)} /></div><Section title="Typography" /><Row2><Field label="Font Size (px)" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
const HeadingPanel = memo(({ p, u }) => <><Section title="Content" /><Field label="Text" value={p.text} onChange={v=>u('text',v)} /><SelectField label="Level" value={p.level} onChange={v=>u('level',v)} options={[['h1','H1'],['h2','H2'],['h3','H3'],['h4','H4']]} /><Section title="Style" /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Field label="Letter Spacing" value={p.letterSpacing} onChange={v=>u('letterSpacing',v)} type="number" /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
const ImagePanel   = memo(({ p, u }) => <><Section title="Image" /><Field label="Image URL" value={p.src} onChange={v=>u('src',v)} placeholder="https://..." /><Field label="Click Link" value={p.link} onChange={v=>u('link',v)} placeholder="https://..." /><Field label="Alt Text" value={p.alt} onChange={v=>u('alt',v)} /><Row2><Field label="Width (%)" value={p.width} onChange={v=>u('width',v)} type="number" /><Field label="Max Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ColorField label="Cell Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
const ButtonPanel  = memo(({ p, u }) => <><Section title="Button" /><Field label="Button Text" value={p.text} onChange={v=>u('text',v)} /><Field label="URL" value={p.url} onChange={v=>u('url',v)} placeholder="https://..." /><Section title="Style" /><ColorField label="Button Color" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /></Row2><Row2><Field label="Border Radius" value={p.borderRadius} onChange={v=>u('borderRadius',v)} type="number" /><SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} /></Row2><ToggleField label="Full Width" value={p.fullWidth} onChange={v=>u('fullWidth',v)} /><Section title="Button Padding" />{sp(p,u)}<Section title="Outer Margin" />{sm(p,u)}</>)
const DividerPanel = memo(({ p, u }) => <><Section title="Line" /><ColorField label="Color" value={p.color} onChange={v=>u('color',v)} /><Row2><Field label="Thickness (px)" value={p.thickness} onChange={v=>u('thickness',v)} type="number" /><SelectField label="Style" value={p.style} onChange={v=>u('style',v)} options={[['solid','Solid'],['dashed','Dashed'],['dotted','Dotted'],['double','Double']]} /></Row2><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)
const SpacerPanel  = memo(({ p, u }) => <><Section title="Spacer" /><Field label="Height (px)" value={p.height} onChange={v=>u('height',v)} type="number" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Section title="Margin" />{sm(p,u)}</>)
const BannerPanel  = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Main Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><ColorField label="Subtext Color" value={p.subtextColor} onChange={v=>u('subtextColor',v)} /><Row2><Field label="Main Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Sub Size" value={p.subtextSize} onChange={v=>u('subtextSize',v)} type="number" /></Row2><Row2><SelectField label="Weight" value={p.fontWeight} onChange={v=>u('fontWeight',v)} options={WEIGHTS} /><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /></Row2><SelectField label="Font Family" value={p.fontFamily} onChange={v=>u('fontFamily',v)} options={FONTS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

const SocialPanel = memo(({ p, u }) => {
  const [expanded, setExpanded] = useState(null)
  const links = p.links || []
  const add    = () => { const l={id:newId(),name:'Facebook',url:'#',color:'#1877f2',size:'',pt:'',pb:'',pl:'',pr:''}; u('links',[...links,l]); setExpanded(l.id) }
  const del    = id  => { u('links',links.filter(l=>l.id!==id)); if(expanded===id) setExpanded(null) }
  const upd    = (id,k,v) => u('links',links.map(l=>l.id===id?{...l,[k]:v}:l))
  const move   = (idx,dir) => { const arr=[...links],j=idx+dir; if(j<0||j>=arr.length) return; [arr[idx],arr[j]]=[arr[j],arr[idx]]; u('links',arr) }
  const moveTo = (fromIdx,toPos) => { const to=Math.max(0,Math.min(links.length-1,parseInt(toPos)-1)); if(isNaN(to)||to===fromIdx) return; const arr=[...links]; const [item]=arr.splice(fromIdx,1); arr.splice(to,0,item); u('links',arr) }
  const ALL = Object.keys(SOCIAL_ABBR).map(k=>[k,k])

  return <>
    <Section title="Row Layout" />
    <ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} />
    <Row2>
      <Field label="Default Size (px)" value={p.iconSize} onChange={v=>u('iconSize',v)} type="number" />
      <Field label="Gap (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" />
    </Row2>
    <Row2>
      <SelectField label="Align" value={p.align} onChange={v=>u('align',v)} options={ALIGNS} />
      <div><span style={s.label}>Shape</span>
        <select value={p.borderRadius||'50'} onChange={e=>u('borderRadius',e.target.value)} style={s.select}>
          <option value="50">Circle</option><option value="20">Rounded</option><option value="0">Square</option>
        </select>
      </div>
    </Row2>
    <Section title="Icons (↑↓ to reorder)" />
    <button onClick={add} style={{ width:'100%', padding:'7px', background:'#1e40af', color:'white', border:'none', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700, marginBottom:8 }}>+ Add Social Icon</button>
    {links.map((l,idx) => {
      const isOpen = expanded===l.id
      return (
        <div key={l.id} style={{ border:'1px solid #e2e8f0', borderRadius:8, marginBottom:6, overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 8px', background:isOpen?'#eff6ff':'#f8fafc', cursor:'pointer' }} onClick={()=>setExpanded(isOpen?null:l.id)}>
            <div style={{ width:18, height:18, borderRadius:'50%', background:'#e2e8f0', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:'#64748b', fontWeight:700 }}>{idx+1}</div>
            <div style={{ width:22, height:22, borderRadius:'50%', background:l.color||SOCIAL_COLORS[l.name]||'#666', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <img src={`https://cdn.simpleicons.org/${SOCIAL_SLUG[l.name]||l.name.toLowerCase()}/ffffff`} width="12" height="12" alt="" style={{ display:'block' }} onError={e=>{ e.target.style.display='none' }} />
            </div>
            <span style={{ flex:1, fontSize:12, fontWeight:600, color:'#374151' }}>{l.name}</span>
            <button onMouseDown={e=>{e.stopPropagation();move(idx,-1)}} style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↑</button>
            <button onMouseDown={e=>{e.stopPropagation();move(idx,1)}}  style={{ padding:'1px 5px', fontSize:10, background:'none', border:'1px solid #e2e8f0', borderRadius:3, cursor:'pointer', color:'#64748b' }}>↓</button>
            <button onMouseDown={e=>{e.stopPropagation();del(l.id)}}    style={{ padding:'1px 6px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:3, cursor:'pointer' }}>✕</button>
            <span style={{ fontSize:10, color:'#94a3b8' }}>{isOpen?'▲':'▼'}</span>
          </div>
          {isOpen && (
            <div style={{ padding:'8px 10px', borderTop:'1px solid #e2e8f0' }}>
              <div style={{ marginBottom:8 }}><span style={s.label}>Platform</span>
                <select value={l.name} onChange={e=>{ const n=e.target.value; u('links',links.map(x=>x.id===l.id?{...x,name:n,color:SOCIAL_COLORS[n]||'#666'}:x)) }} style={s.select}>
                  {ALL.map(([v,lb])=><option key={v} value={v}>{lb}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:8 }}><span style={s.label}>Link URL</span><StableInput value={l.url||''} onChange={v=>upd(l.id,'url',v)} placeholder="https://..." style={s.input} /></div>
              <ColorField label="Icon Color" value={l.color||SOCIAL_COLORS[l.name]||'#666'} onChange={v=>upd(l.id,'color',v)} />
              <div style={{ marginBottom:8 }}><span style={s.label}>Custom Size (blank = default)</span><StableInput value={l.size||''} onChange={v=>upd(l.id,'size',v)} type="number" placeholder={p.iconSize||'36'} style={s.input} /></div>
              <div style={{ marginBottom:8 }}><span style={s.label}>Move to Position</span>
                <div style={{ display:'flex', gap:6 }}>
                  <div style={{ ...s.input, width:40, textAlign:'center', background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700 }}>{idx+1}</div>
                  <select defaultValue="" onChange={e=>{ if(e.target.value){moveTo(idx,e.target.value);e.target.value=''}}} style={{ ...s.input, flex:1, cursor:'pointer' }}>
                    <option value="">Jump to position...</option>
                    {links.map((_,i)=>i!==idx&&<option key={i} value={i+1}>Position {i+1}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:4 }}><span style={s.label}>Icon Padding (px)</span>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
                  {[['Top','pt'],['Bottom','pb'],['Left','pl'],['Right','pr']].map(([lb,k])=>(
                    <div key={k}><div style={{ fontSize:10, color:'#94a3b8', marginBottom:2 }}>{lb}</div><StableInput value={l[k]||''} onChange={v=>upd(l.id,k,v)} type="number" placeholder="0" style={{ ...s.input, width:'100%' }} /></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    })}
    <Section title="Row Spacing" />{sp(p,u)}{sm(p,u)}
  </>
})

const FooterPanel = memo(({ p, u }) => <><Section title="Content" /><div style={{ marginBottom:10 }}><span style={s.label}>Footer Text</span><RichEditorField value={p.mainText} onChange={v=>u('mainText',v)} /></div><Field label="Sub Text" value={p.subText} onChange={v=>u('subText',v)} /><Section title="Unsubscribe" /><ToggleField label="Show Unsubscribe" value={p.showUnsub} onChange={v=>u('showUnsub',v)} />{p.showUnsub==='true'&&<><Field label="Unsub Text" value={p.unsubText} onChange={v=>u('unsubText',v)} /><Field label="Unsub URL" value={p.unsubUrl} onChange={v=>u('unsubUrl',v)} placeholder="https://..." /></>}<Section title="Style" /><ColorField label="Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><ColorField label="Text Color" value={p.textColor} onChange={v=>u('textColor',v)} /><Row2><Field label="Font Size" value={p.fontSize} onChange={v=>u('fontSize',v)} type="number" /><Field label="Line Height" value={p.lineHeight} onChange={v=>u('lineHeight',v)} /></Row2><SelectField label="Align" value={p.textAlign} onChange={v=>u('textAlign',v)} options={ALIGNS} /><Section title="Spacing" />{sp(p,u)}{sm(p,u)}</>)

const ColumnsPanel = memo(({ p, u }) => {
  const [activeCol, setActiveCol] = useState(0)
  const cols = p.cols||[]
  const updateCols = next => u('cols',next)
  const addCol     = () => { const next=[...cols,{id:newId(),width:Math.floor(100/(cols.length+1)),bgColor:'#ffffff',blocks:[]}].map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(next.length-1) }
  const removeCol  = i => { if(cols.length<=1) return; const next=cols.filter((_,idx)=>idx!==i).map((c,_,a)=>({...c,width:Math.floor(100/a.length)})); updateCols(next); setActiveCol(Math.max(0,Math.min(activeCol,next.length-1))) }
  const setColProp = (i,k,v) => updateCols(cols.map((c,idx)=>idx===i?{...c,[k]:v}:c))
  const col = cols[Math.min(activeCol,cols.length-1)]
  return <><Section title="Row" /><ColorField label="Row Background" value={p.bgColor} onChange={v=>u('bgColor',v)} /><Field label="Gap (px)" value={p.gap} onChange={v=>u('gap',v)} type="number" /><Section title="Columns" /><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><span style={{ fontSize:12, fontWeight:600 }}>{cols.length} Column{cols.length!==1?'s':''}</span><button onClick={addCol} style={{ padding:'4px 12px', fontSize:11, background:'#1e40af', color:'white', border:'none', borderRadius:5, cursor:'pointer', fontWeight:600 }}>+ Add</button></div><div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>{cols.map((_,i)=><div key={i} style={{ display:'flex', gap:2 }}><button onClick={()=>setActiveCol(i)} style={{ padding:'4px 12px', fontSize:11, border:'1px solid #e2e8f0', borderRadius:5, cursor:'pointer', fontWeight:activeCol===i?700:400, background:activeCol===i?'#1e3a8a':'white', color:activeCol===i?'white':'#374151' }}>Col {i+1}</button>{cols.length>1&&<button onClick={()=>removeCol(i)} style={{ padding:'3px 7px', fontSize:10, background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:4, cursor:'pointer' }}>✕</button>}</div>)}</div>{col&&<div style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:10 }}><div style={{ fontSize:11, fontWeight:700, color:'#1e40af', marginBottom:8 }}>Column {activeCol+1}</div><Field label="Width (%)" value={String(col.width)} onChange={v=>setColProp(activeCol,'width',parseInt(v)||50)} type="number" /><ColorField label="Background" value={col.bgColor} onChange={v=>setColProp(activeCol,'bgColor',v)} /><div style={{ marginTop:6, padding:'8px', background:'#eff6ff', borderRadius:6, fontSize:11, color:'#1d4ed8' }}>💡 Canvas mein Col {activeCol+1} pe click → "Add to Column"</div></div>}<Section title="Outer Spacing" />{sp(p,u)}{sm(p,u)}</>
})

// ─────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────
const BLOCK_DEFS = [
  { type:'banner',  icon:'◼', label:'Banner',  desc:'Header/brand bar' },
  { type:'heading', icon:'H', label:'Heading', desc:'Section title' },
  { type:'text',    icon:'¶', label:'Text',    desc:'Paragraph / HTML' },
  { type:'image',   icon:'▨', label:'Image',   desc:'Photo / banner' },
  { type:'button',  icon:'▶', label:'Button',  desc:'CTA / link button' },
  { type:'columns', icon:'⊞', label:'Columns', desc:'Multi-col layout' },
  { type:'divider', icon:'─', label:'Divider', desc:'Horizontal rule' },
  { type:'spacer',  icon:'↕', label:'Spacer',  desc:'Empty gap' },
  { type:'social',  icon:'◉', label:'Social',  desc:'Social icons row' },
  { type:'footer',  icon:'▪', label:'Footer',  desc:'Footer + unsub' },
]
const INNER_TYPES = ['banner','heading','text','image','button','divider','spacer']
const init = () => ({ blocks:[], sel:null, colCtx:null, openModal:null })

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const b = { id:newId(), type:action.btype, props:deep(D[action.btype]) }
      if (action.colCtx) {
        const { blockId, colIdx } = action.colCtx
        return { ...state, colCtx:null, blocks:state.blocks.map(bl=>bl.id!==blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colIdx?c:{...c,blocks:[...(c.blocks||[]),b]})}}) }
      }
      return { ...state, blocks:[...state.blocks,b], sel:{ id:b.id, colCtx:null } }
    }
    case 'SELECT':      return { ...state, sel:action.sel }
    case 'OPEN_MODAL':  return { ...state, sel:{ id:action.id, colCtx:null }, openModal:action.id }
    case 'CLOSE_MODAL': return { ...state, openModal:null }
    case 'DELETE': {
      const { id, colCtx } = action
      if (colCtx) return { ...state, sel:null, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{...c,blocks:c.blocks.filter(ib=>ib.id!==id)})}}) }
      return { ...state, sel:null, blocks:state.blocks.filter(b=>b.id!==id) }
    }
    case 'DUPLICATE': {
      const idx=state.blocks.findIndex(b=>b.id===action.id); if(idx<0) return state
      const copy={...deep(state.blocks[idx]),id:newId()}; const next=[...state.blocks]; next.splice(idx+1,0,copy)
      return { ...state, blocks:next, sel:{ id:copy.id, colCtx:null } }
    }
    case 'MOVE': {
      const { id, dir } = action; const arr=[...state.blocks], i=arr.findIndex(b=>b.id===id), j=i+dir
      if(j<0||j>=arr.length) return state; [arr[i],arr[j]]=[arr[j],arr[i]]; return { ...state, blocks:arr }
    }
    case 'UPDATE_PROP': {
      const { id, key, val, colCtx } = action
      if (colCtx) return { ...state, blocks:state.blocks.map(bl=>bl.id!==colCtx.blockId?bl:{...bl,props:{...bl.props,cols:bl.props.cols.map((c,i)=>i!==colCtx.colIdx?c:{...c,blocks:c.blocks.map(ib=>ib.id!==id?ib:{...ib,props:{...ib.props,[key]:val}})})}})}
      return { ...state, blocks:state.blocks.map(b=>b.id!==id?b:{...b,props:{...b.props,[key]:val}}) }
    }
    case 'MOVE_INNER': {
      const { blockId, colIdx, id, dir } = action
      return { ...state, blocks:state.blocks.map(bl=>{
        if(bl.id!==blockId) return bl
        const cols=bl.props.cols.map((c,ci)=>{ if(ci!==colIdx) return c; const arr=[...(c.blocks||[])],i=arr.findIndex(b=>b.id===id),j=i+dir; if(j<0||j>=arr.length) return c; [arr[i],arr[j]]=[arr[j],arr[i]]; return {...c,blocks:arr} })
        return {...bl,props:{...bl.props,cols}}
      }) }
    }
    case 'LOAD_TEMPLATE': { uid=Date.now(); return { ...state, blocks:action.blocks, openModal:null, sel:null, colCtx:null } }
    case 'SET_COL_CTX':   return { ...state, colCtx:action.ctx }
    default: return state
  }
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function EmailBuilder({ onUseTemplate }) {
  const [state, dispatch]           = useReducer(reducer, null, init)
  const [emailBg, setEmailBg]       = useState('#f1f5f9')
  const [emailWidth, setEmailWidth] = useState('600')
  const [preview, setPreview]       = useState(false)
  const [showTplModal, setShowTplModal] = useState(false)
  const [editingTpl,   setEditingTpl]   = useState(null)

  const { blocks, sel, colCtx, openModal } = state

  let selBlock = null
  if (sel) {
    if (sel.colCtx) {
      const parent = blocks.find(b=>b.id===sel.colCtx.blockId)
      selBlock = parent?.props?.cols?.[sel.colCtx.colIdx]?.blocks?.find(b=>b.id===sel.id) || null
    } else {
      selBlock = blocks.find(b=>b.id===sel.id) || null
    }
  }

  const update = useCallback((id, key, val) => {
    dispatch({ type:'UPDATE_PROP', id, key, val, colCtx:sel?.colCtx||null })
  }, [sel])

  const renderProps = () => {
    if (!selBlock) return <div style={{ padding:20, textAlign:'center', color:'#94a3b8' }}><div style={{ fontSize:32, marginBottom:8 }}>←</div><div style={{ fontSize:13 }}>Block select karo</div></div>
    const p = selBlock.props, u = (k,v) => update(selBlock.id,k,v)
    const map = { text:<TextPanel p={p} u={u}/>, heading:<HeadingPanel p={p} u={u}/>, image:<ImagePanel p={p} u={u}/>, button:<ButtonPanel p={p} u={u}/>, divider:<DividerPanel p={p} u={u}/>, spacer:<SpacerPanel p={p} u={u}/>, banner:<BannerPanel p={p} u={u}/>, social:<SocialPanel p={p} u={u}/>, footer:<FooterPanel p={p} u={u}/>, columns:<ColumnsPanel p={p} u={u}/> }
    return map[selBlock.type] || null
  }

  const handleLoad = (tpl) => {
    if (tpl.mode==='use') { onUseTemplate(tpl.htmlBody||''); return }
    dispatch({ type:'LOAD_TEMPLATE', blocks:tpl.blocks||[] })
    if (tpl.emailBg)    setEmailBg(tpl.emailBg)
    if (tpl.emailWidth) setEmailWidth(String(tpl.emailWidth||'600'))
    if (tpl._id) setEditingTpl({ _id:tpl._id, name:tpl.name })
  }

  const addBlock = btype => dispatch({ type:'ADD_BLOCK', btype, colCtx })

  return (
    <div style={{ border:'1px solid #e2e8f0', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', height:'78vh', minHeight:660, fontFamily:'system-ui,sans-serif' }}>

      {/* TOP BAR */}
      <div style={{ background:'#f8fafc', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
        <div style={{ padding:'8px 10px 6px', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', borderBottom:'1px solid #f1f5f9' }}>
          <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', marginRight:4, whiteSpace:'nowrap' }}>
            {colCtx ? `+ Col ${colCtx.colIdx+1}:` : 'Add:'}
          </span>
          {(colCtx ? BLOCK_DEFS.filter(b=>INNER_TYPES.includes(b.type)) : BLOCK_DEFS).map(({ type, icon, label }) => (
            <button key={type} onClick={()=>addBlock(type)}
              style={{ padding:'5px 10px', background:'white', border:'1px solid #e2e8f0', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:500, color:'#374151', whiteSpace:'nowrap' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#93c5fd' }}
              onMouseLeave={e=>{ e.currentTarget.style.background='white';   e.currentTarget.style.borderColor='#e2e8f0' }}>
              <span style={{ fontSize:13, color:'#64748b' }}>{icon}</span>{label}
            </button>
          ))}
          {colCtx && (
            <button onClick={()=>dispatch({type:'SET_COL_CTX',ctx:null})}
              style={{ padding:'5px 10px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, cursor:'pointer', fontSize:12, color:'#dc2626', fontWeight:600, marginLeft:'auto' }}>
              ✕ Cancel
            </button>
          )}
        </div>
        <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <span style={{ fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Settings:</span>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ fontSize:11, color:'#64748b' }}>BG:</span>
            <StableColor value={emailBg} onChange={setEmailBg} />
            <StableInput value={emailBg} onChange={setEmailBg} style={{ ...s.input, width:80 }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ fontSize:11, color:'#64748b' }}>Width:</span>
            <select value={emailWidth} onChange={e=>setEmailWidth(e.target.value)} style={{ ...s.select, width:130 }}>
              <option value="520">520px — Narrow</option>
              <option value="600">600px — Standard</option>
              <option value="640">640px — Wide</option>
            </select>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto', flexWrap:'wrap' }}>
            {editingTpl && (
              <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8 }}>
                <span style={{ fontSize:11, color:'#92400e' }}>✏️ Editing: <b>{editingTpl.name}</b></span>
                <button onClick={async () => {
                  if (!blocks.length) return alert('Koi block nahi hai!')
                  try {
                    const html = buildEmail(blocks, emailBg, emailWidth)
                    await axios.put(`${Url}/api/bulkmail/templates/${editingTpl._id}`, { htmlBody:html, blocks, emailBg, emailWidth })
                    alert(`✅ "${editingTpl.name}" update ho gaya!`)
                  } catch(e) { alert(e.response?.data?.message || 'Update failed') }
                }} style={{ padding:'4px 12px', fontSize:11, fontWeight:700, background:'#f59e0b', color:'white', border:'none', borderRadius:6, cursor:'pointer' }}>
                  💾 Update
                </button>
                <button onClick={()=>setEditingTpl(null)} style={{ padding:'3px 7px', fontSize:11, background:'none', border:'none', cursor:'pointer', color:'#94a3b8' }}>✕</button>
              </div>
            )}
            <button onClick={()=>setShowTplModal(true)}
              style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', background:'white', color:'#374151', fontWeight:600, display:'flex', alignItems:'center', gap:5 }}>
              📋 Templates
            </button>
            {[['Edit',false],['Preview',true]].map(([l,v])=>(
              <button key={l} onClick={()=>setPreview(v)}
                style={{ padding:'5px 14px', fontSize:12, borderRadius:6, border:'1px solid #e2e8f0', cursor:'pointer', fontWeight:preview===v?700:400, background:preview===v?'#0f172a':'white', color:preview===v?'white':'#64748b' }}>{l}</button>
            ))}
            <button onClick={()=>blocks.length&&onUseTemplate(buildEmail(blocks,emailBg,emailWidth))} disabled={!blocks.length}
              style={{ padding:'5px 18px', background:blocks.length?'#1e40af':'#e2e8f0', color:blocks.length?'white':'#94a3b8', border:'none', borderRadius:7, cursor:blocks.length?'pointer':'not-allowed', fontSize:12, fontWeight:700 }}>
              ✓ Apply Template
            </button>
          </div>
        </div>
      </div>

      {/* CANVAS + PROPS */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', flex:1, overflow:'hidden' }}>
        <div style={{ background:'#cbd5e1', display:'flex', flexDirection:'column', overflow:'hidden', borderRight:'1px solid #e2e8f0' }}>
          <div style={{ overflowY:'auto', flex:1, padding:16 }}>
            <div style={{ background:emailBg, maxWidth:emailWidth+'px', margin:'0 auto', minHeight:400, boxShadow:'0 2px 16px rgba(0,0,0,.08)' }}>
              {blocks.length===0 && !preview && (
                <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>✉️</div>
                  <div style={{ fontSize:14, fontWeight:500 }}>Upar se blocks add karo</div>
                  <div style={{ fontSize:12, marginTop:6 }}>Banner → Text → Button → Footer</div>
                </div>
              )}
              {blocks.map(b => {
                const isSel = !preview && sel?.id===b.id && !sel?.colCtx
                const toolbar = (id, cc=null) => !preview && (
                  <div style={{ position:'absolute', top:3, right:3, display:'flex', gap:2, zIndex:30 }} onMouseDown={e=>e.stopPropagation()}>
                    <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:-1})}} style={TB}>↑</button>
                    <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE',id,dir:1})}}  style={TB}>↓</button>
                    {!cc&&<button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DUPLICATE',id})}} style={{...TB,background:'#059669'}}>⧉</button>}
                    <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id,colCtx:cc})}} style={{...TB,background:'#dc2626'}}>✕</button>
                  </div>
                )
                if (b.type==='columns') return (
                  <div key={b.id} onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
                    style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer' }}>
                    {toolbar(b.id)}
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ background:b.props.bgColor, borderCollapse:'collapse' }}>
                      <tbody><tr>
                        {(b.props.cols||[]).map((col,ci) => {
                          const colActive = !preview && colCtx?.blockId===b.id && colCtx?.colIdx===ci
                          return (
                            <td key={col.id} width={col.width+'%'} valign="top"
                              style={{ padding:parseInt(b.props.gap||8)+'px', background:col.bgColor||'transparent', verticalAlign:'top', outline:colActive?'2px dashed #3b82f6':'none', position:'relative' }}>
                              {(col.blocks||[]).map(ib => {
                                const iib = !preview && sel?.id===ib.id && sel?.colCtx?.blockId===b.id && sel?.colCtx?.colIdx===ci
                                return (
                                  <div key={ib.id} onClick={e=>{e.stopPropagation();!preview&&dispatch({type:'SELECT',sel:{id:ib.id,colCtx:{blockId:b.id,colIdx:ci}}})}}
                                    style={{ position:'relative', outline:iib?'2px solid #f59e0b':'2px solid transparent', cursor:preview?'default':'pointer' }}>
                                    <div style={{ position:'absolute', top:2, right:2, display:'flex', gap:2, zIndex:25 }} onMouseDown={e=>e.stopPropagation()}>
                                      {!preview&&<>
                                        <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:-1})}} style={{...TB,padding:'1px 4px',fontSize:9}}>↑</button>
                                        <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'MOVE_INNER',blockId:b.id,colIdx:ci,id:ib.id,dir:1})}}  style={{...TB,padding:'1px 4px',fontSize:9}}>↓</button>
                                        <button onMouseDown={e=>{e.stopPropagation();dispatch({type:'DELETE',id:ib.id,colCtx:{blockId:b.id,colIdx:ci}})}}   style={{...TB,padding:'1px 4px',fontSize:9,background:'#dc2626'}}>✕</button>
                                      </>}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html:renderEl(ib) }} />
                                  </div>
                                )
                              })}
                              {!preview&&<button onClick={e=>{e.stopPropagation();dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}});dispatch({type:'SET_COL_CTX',ctx:{blockId:b.id,colIdx:ci}})}}
                                style={{ width:'100%', marginTop:4, padding:'5px', background:'rgba(59,130,246,.08)', border:'1.5px dashed #93c5fd', borderRadius:5, cursor:'pointer', fontSize:11, color:'#3b82f6', fontWeight:500 }}>
                                + Add to Col {ci+1}
                              </button>}
                            </td>
                          )
                        })}
                      </tr></tbody>
                    </table>
                  </div>
                )
                return (
                  <div key={b.id}
                    onClick={()=>!preview&&dispatch({type:'SELECT',sel:{id:b.id,colCtx:null}})}
                    onDoubleClick={()=>{ if(!preview&&(b.type==='text'||b.type==='banner'||b.type==='footer')) dispatch({type:'OPEN_MODAL',id:b.id}) }}
                    style={{ position:'relative', outline:isSel?'2px solid #3b82f6':'2px solid transparent', cursor:preview?'default':'pointer', userSelect:'none' }}>
                    {toolbar(b.id)}
                    <div dangerouslySetInnerHTML={{ __html:renderEl(b) }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div style={{ background:'#f8fafc', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'10px 14px 8px', fontSize:10, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.07em', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
            {selBlock ? `${BLOCK_DEFS.find(b=>b.type===selBlock.type)?.label||selBlock.type} Settings` : 'Properties'}
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'8px 14px 20px', minHeight:0 }}>{renderProps()}</div>
        </div>
      </div>

      {openModal && (() => {
        const mb = blocks.find(x=>x.id===openModal); if (!mb) return null
        const pk = mb.type==='text' ? 'html' : 'mainText'
        return <EditorModal value={mb.props[pk]} onChange={v=>dispatch({type:'UPDATE_PROP',id:mb.id,key:pk,val:v,colCtx:null})} onClose={()=>dispatch({type:'CLOSE_MODAL'})} />
      })()}

      {showTplModal && (
        <TemplateSaveModal blocks={blocks} emailBg={emailBg} emailWidth={emailWidth}
          onClose={()=>setShowTplModal(false)} onLoad={handleLoad} />
      )}
    </div>
  )
}

const TB = { padding:'2px 6px', fontSize:10, background:'#475569', color:'white', border:'none', borderRadius:3, cursor:'pointer' }