// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { permissions } from 'src/utils/SessionfileData'

// const DashBoard = () => {
//   const navigate = useNavigate()

//   const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}')
//   // const permissions = JSON.parse(localStorage.getItem('management_permissions') || '{}')
//   const slug = staff?.slug || 'Management'

//   const getGreeting = () => {
//     const h = new Date().getHours()
//     if (h < 12) return 'Good Morning'
//     if (h < 17) return 'Good Afternoon'
//     return 'Good Evening'
//   }

//   const today = new Date().toLocaleDateString('en-IN', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//   })

//   const getInitials = (name) =>
//     name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

//   const sectionLabels = {
//     dashboard:          { label: 'Dashboard',       path: `/${slug}/app` },
//     orderDetail:        { label: 'Order Detail',     path: `/${slug}/new-project` },
//     team:               { label: 'Team',             path: `/${slug}/staff` },
//     services:           { label: 'Services',         path: `/${slug}/service` },
//     client:             { label: 'Client',           path: `/${slug}/client` },
//     chat:               { label: 'Chat',             path: `/${slug}/projectchat` },
//     coupon:             { label: 'Coupon',           path: `/${slug}/coupon` },
//     iconsFormat:        { label: 'Icons Format',     path: `/${slug}/iconsformat` },
//     staffRole:          { label: 'Staff Role',       path: `/${slug}/role` },
//     rating:             { label: 'Rating',           path: `/${slug}/rating` },
//     blog:               { label: 'Blog',             path: `/${slug}/blog` },
//     helpSupport:        { label: 'Help & Support',   path: `/${slug}/Help-Support` },
//     bulkMailing:        { label: 'Bulk Mailing',     path: `/${slug}/BulkMailing` },
//     managementSettings: { label: 'Mgmt Settings',    path: `/${slug}/Permissions` },
//   }

//   const activePermissions = []
//   Object.entries(permissions).forEach(([section, value]) => {
//     if (typeof value === 'object') {
//       const keys = Object.entries(value).filter(([, v]) => v === true).map(([k]) => k)
//       if (keys.length > 0) activePermissions.push({ section, keys })
//     } else if (value === true) {
//       activePermissions.push({ section, keys: ['view'] })
//     }
//   })

//   return (
//     <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

//       {/* ── Top Profile Banner ── */}
//       <div style={{
//         background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
//         padding: '24px 28px', marginBottom: 20,
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//           <div style={{
//             width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
//             background: '#eff6ff', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#1e40af',
//           }}>
//             {getInitials(staff?.name)}
//           </div>
//           <div>
//             <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>
//               {getGreeting()}
//             </div>
//             <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
//               {staff?.name || 'Staff Member'}
//             </div>
//             <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//               <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
//                 {staff?.roleName || 'N/A'}
//               </span>
//               <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
//                 /{staff?.slug || 'N/A'}
//               </span>
//               <span style={{
//                 padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
//                 background: staff?.isActive ? '#f0fdf4' : '#fef2f2',
//                 color: staff?.isActive ? '#16a34a' : '#dc2626',
//               }}>
//                 {staff?.isActive ? '● Active' : '● Inactive'}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>
//           {today}
//         </div>
//       </div>

//       {/* ── Stats Row ── */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
//         {[
//           { label: 'Email',       value: staff?.email || '-' },
//           { label: 'Role',        value: staff?.roleName || '-' },
//           { label: 'Slug',        value: `/${staff?.slug || '-'}` },
//           { label: 'Permissions', value: `${activePermissions.length} modules` },
//         ].map(s => (
//           <div key={s.label} style={{
//             background: 'white', borderRadius: 12, padding: '16px 20px',
//             border: '1px solid #e2e8f0',
//           }}>
//             <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
//               {s.label}
//             </div>
//             <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>
//               {s.value}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ── Permissions Grid ── */}
//       <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
//         <div style={{
//           padding: '16px 24px', borderBottom: '1px solid #f1f5f9',
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//         }}>
//           <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
//           <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
//         </div>

//         {activePermissions.length === 0 ? (
//           <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
//             No permissions assigned
//           </div>
//         ) : (
//           <div style={{
//             padding: 20,
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//             gap: 12,
//           }}>
//             {activePermissions.map(({ section, keys }) => {
//               const info = sectionLabels[section] || { label: section, path: '#' }
//               return (
//                 <div key={section}
//                   onClick={() => navigate(info.path)}
//                   style={{
//                     padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
//                     border: '1px solid #e2e8f0', background: '#fafafa',
//                     transition: 'all 0.15s',
//                   }}
//                   onMouseEnter={e => {
//                     e.currentTarget.style.borderColor = '#bfdbfe'
//                     e.currentTarget.style.background = '#eff6ff'
//                   }}
//                   onMouseLeave={e => {
//                     e.currentTarget.style.borderColor = '#e2e8f0'
//                     e.currentTarget.style.background = '#fafafa'
//                   }}
//                 >
//                   <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
//                     {info.label}
//                   </div>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//                     {keys.map(k => (
//                       <span key={k} style={{
//                         padding: '2px 8px', background: '#f0fdf4', color: '#16a34a',
//                         borderRadius: 20, fontSize: 10, fontWeight: 600,
//                       }}>
//                         {k}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DashBoard












// import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { permissions } from 'src/utils/SessionfileData'
// import { io as socketIo } from 'socket.io-client'
// import { Url } from 'src/url/url'

// /* ─────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────── */
// const getToken = () =>
//   sessionStorage.getItem('management_token') ||
//   localStorage.getItem('management_token') ||
//   localStorage.getItem('staffToken') || ''

// const STATUS_COLORS = {
//   open:          { bg: '#FFFBEB', color: '#B45309', dot: '#F59E0B', border: '#FDE68A' },
//   'in-progress': { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6', border: '#BFDBFE' },
//   resolved:      { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', border: '#BBF7D0' },
//   closed:        { bg: '#F9FAFB', color: '#4B5563', dot: '#9CA3AF', border: '#E5E7EB' },
//   escalated:     { bg: '#F5F3FF', color: '#6D28D9', dot: '#8B5CF6', border: '#DDD6FE' },
// }

// const NOTIF_ICONS = {
//   new_ticket:    '🎫',
//   new_message:   '💬',
//   status_change: '🔄',
//   escalated:     '⚡',
//   resolved:      '✅',
//   existing:      '📋',
// }

// const timeAgo = (ts) => {
//   const diff = Date.now() - new Date(ts).getTime()
//   const m = Math.floor(diff / 60000)
//   if (m < 1) return 'Just now'
//   if (m < 60) return `${m}m ago`
//   const h = Math.floor(m / 60)
//   if (h < 24) return `${h}h ago`
//   return `${Math.floor(h / 24)}d ago`
// }

// /* ─────────────────────────────────────────────────────────────────
//    NOTIFICATION BELL DROPDOWN
// ───────────────────────────────────────────────────────────────── */
// const NotifPanel = ({ notifs, onClearAll, onNavigate, unreadCount }) => {
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   return (
//     <div ref={ref} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setOpen(v => !v)}
//         title="Ticket Notifications"
//         style={{
//           position: 'relative', width: 40, height: 40, borderRadius: 10,
//           border: `1px solid ${open ? '#BFDBFE' : '#E2E8F0'}`,
//           background: open ? '#EFF6FF' : '#fff', cursor: 'pointer',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           transition: 'all 0.15s',
//           boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
//         }}
//       >
//         <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
//           stroke={open ? '#2563EB' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
//           <path d="M13.73 21a2 2 0 01-3.46 0"/>
//         </svg>
//         {unreadCount > 0 && (
//           <span style={{
//             position: 'absolute', top: -5, right: -5,
//             background: '#EF4444', color: '#fff', borderRadius: 99,
//             minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '0 4px', border: '2px solid #fff',
//             animation: 'notifPop 0.3s ease',
//           }}>
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div style={{
//           position: 'absolute', top: 50, right: 0, zIndex: 2000,
//           width: 340, background: '#fff',
//           border: '1px solid #E2E8F0', borderRadius: 14,
//           boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
//           overflow: 'hidden', animation: 'dropIn 0.15s ease',
//         }}>
//           {/* Header */}
//           <div style={{
//             padding: '12px 16px', borderBottom: '1px solid #F1F5F9',
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             background: 'linear-gradient(90deg,#EFF6FF,#fff)',
//           }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 7 }}>
//               Ticket Notifications
//               {unreadCount > 0 && (
//                 <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>
//                   {unreadCount} new
//                 </span>
//               )}
//             </span>
//             {notifs.length > 0 && (
//               <button onClick={onClearAll} style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Clear all
//               </button>
//             )}
//           </div>

//           {/* List */}
//           <div style={{ maxHeight: 360, overflowY: 'auto' }}>
//             {notifs.length === 0 ? (
//               <div style={{ padding: '36px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//                 <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
//                 <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>No notifications yet</p>
//                 <p style={{ margin: '4px 0 0', fontSize: 11 }}>Ticket updates will appear here</p>
//               </div>
//             ) : notifs.map((n) => {
//               const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//               return (
//                 <div key={n.id}
//                   onClick={() => { onNavigate(n); setOpen(false) }}
//                   style={{
//                     padding: '11px 14px', cursor: 'pointer',
//                     borderBottom: '1px solid #F8FAFC',
//                     background: n.unread ? '#F0F7FF' : '#fff',
//                     display: 'flex', gap: 10, alignItems: 'flex-start',
//                     transition: 'background 0.1s',
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
//                   onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : '#fff'}
//                 >
//                   <div style={{
//                     width: 32, height: 32, borderRadius: 8, flexShrink: 0,
//                     background: sc.bg, border: `1px solid ${sc.border}`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
//                   }}>
//                     {NOTIF_ICONS[n.type] || '🎫'}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
//                       <span style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>#{n.ticketCode}</span>
//                       <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{timeAgo(n.ts)}</span>
//                     </div>
//                     <p style={{ margin: '2px 0 4px', fontSize: 11.5, color: '#374151', lineHeight: 1.4,
//                       overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                       {n.text}
//                     </p>
//                     <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//                       {n.status && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: 4,
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
//                           background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                         }}>
//                           <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                           {n.status}
//                         </span>
//                       )}
//                       {n.unreadMsgs > 0 && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center',
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700,
//                           background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
//                         }}>
//                           {n.unreadMsgs} unread
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {n.unread && (
//                     <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 4 }} />
//                   )}
//                 </div>
//               )
//             })}
//           </div>

//           {/* Footer */}
//           {notifs.length > 0 && (
//             <div style={{ padding: '10px 14px', borderTop: '1px solid #F1F5F9', background: '#FAFBFC' }}>
//               <button onClick={() => { onNavigate(null); setOpen(false) }}
//                 style={{
//                   width: '100%', padding: '8px', borderRadius: 8, border: 'none',
//                   background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 12.5,
//                   cursor: 'pointer', fontFamily: 'inherit',
//                 }}>
//                 View All Tickets →
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────
//    SUPPORT TICKETS STRIP
// ───────────────────────────────────────────────────────────────── */
// const NotifStrip = ({ notifs, onNavigate, loading }) => {
//   const totalUnread = notifs.filter(n => n.unread).length
//   const recent = notifs.slice(0, 6)

//   return (
//     <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', marginBottom: 20, overflow: 'hidden' }}>
//       {/* Header */}
//       <div style={{
//         padding: '13px 20px', borderBottom: '1px solid #F1F5F9',
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         background: 'linear-gradient(90deg,#EFF6FF 0%,#fff 60%)',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <div style={{
//             width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
//             animation: totalUnread > 0 ? 'pulse 2s ease infinite' : 'none',
//           }} />
//           <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Support Tickets</span>
//           {totalUnread > 0 && (
//             <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
//               {totalUnread} unread
//             </span>
//           )}
//           {!loading && notifs.length > 0 && (
//             <span style={{ fontSize: 11, color: '#9CA3AF' }}>({notifs.length} assigned)</span>
//           )}
//         </div>
//         <button onClick={() => onNavigate(null)} style={{
//           padding: '5px 12px', borderRadius: 7, border: '1px solid #BFDBFE',
//           background: '#EFF6FF', color: '#2563EB', fontSize: 11.5, fontWeight: 600,
//           cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
//         }}
//           onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff' }}
//           onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#2563EB' }}
//         >
//           View All →
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div style={{ padding: '28px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"
//             style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: 8 }}>
//             <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
//             <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
//             <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
//             <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
//           </svg>
//           <p style={{ margin: 0, fontSize: 13 }}>Loading tickets…</p>
//         </div>
//       )}

//       {/* Empty */}
//       {!loading && recent.length === 0 && (
//         <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <div style={{ fontSize: 28, marginBottom: 8 }}>🎫</div>
//           <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#374151' }}>No tickets assigned</p>
//           <p style={{ margin: '4px 0 0', fontSize: 12 }}>Tickets assigned to you will appear here</p>
//         </div>
//       )}

//       {/* Rows */}
//       {!loading && recent.map((n, i) => {
//         const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//         return (
//           <div key={n.id} onClick={() => onNavigate(n)}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
//               borderBottom: i < recent.length - 1 ? '1px solid #F8FAFC' : 'none',
//               background: n.unread ? '#F0F7FF' : 'transparent',
//               cursor: 'pointer', transition: 'background 0.1s',
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
//             onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : 'transparent'}
//           >
//             {/* Icon */}
//             <div style={{
//               width: 36, height: 36, borderRadius: 9, flexShrink: 0,
//               background: sc.bg, border: `1px solid ${sc.border}`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
//             }}>
//               {NOTIF_ICONS[n.type] || '🎫'}
//             </div>

//             {/* Info */}
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <span style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', flexShrink: 0 }}>#{n.ticketCode}</span>
//                 <span style={{ fontSize: 12.5, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {n.text}
//                 </span>
//               </div>
//               {(n.project || n.client) && (
//                 <div style={{ marginTop: 2, fontSize: 11, color: '#9CA3AF' }}>
//                   {[n.client, n.project].filter(Boolean).join(' · ')}
//                 </div>
//               )}
//             </div>

//             {/* Right */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//               <span style={{
//                 padding: '2px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 600,
//                 background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                 display: 'flex', alignItems: 'center', gap: 4,
//               }}>
//                 <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                 {n.status}
//               </span>
//               {n.unreadMsgs > 0 && (
//                 <span style={{
//                   background: '#EF4444', color: '#fff', borderRadius: 99,
//                   minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                 }}>
//                   {n.unreadMsgs}
//                 </span>
//               )}
//               <span style={{ fontSize: 11, color: '#9CA3AF' }}>{timeAgo(n.ts)}</span>
//               {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────
//    MAIN DASHBOARD
// ───────────────────────────────────────────────────────────────── */
// const DashBoard = () => {
//   const navigate = useNavigate()

//   const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}')
//   const slug = staff?.slug || 'Management'
//   const staffId = staff?._id || staff?.id || ''

//   const [notifs, setNotifs]             = useState([])
//   const [ticketsLoading, setTicketsLoading] = useState(false)

//   const unreadCount = notifs.filter(n => n.unread).length

//   /* Convert ticket → notif item */
//   const ticketToNotif = (t, type = 'existing') => ({
//     id:         t._id,
//     type,
//     ticketCode: t.ticketId || '—',
//     text:       t.subject === 'Other' ? (t.customSubject || 'Support ticket') : (t.subject || 'Support ticket'),
//     status:     t.status,
//     project:    t.projectName || t.projectId || '',
//     client:     t.clientName || '',
//     unreadMsgs: t.unreadByStaff || 0,
//     unread:     (t.unreadByStaff || 0) > 0,
//     ts:         t.updatedAt || t.createdAt || Date.now(),
//     ticketId:   t._id,
//   })

//   /* ── Fetch tickets on mount ── */
//   useEffect(() => {
//     if (!staffId) return
//     setTicketsLoading(true)
//     fetch(`${Url}/api/support/tickets/assigned/${staffId}`)
//       .then(r => r.json())
//       .then(d => {
//         const list = d.tickets || []
//         const sorted = [...list].sort((a, b) => {
//           // unread first, then newest
//           if ((b.unreadByStaff || 0) !== (a.unreadByStaff || 0))
//             return (b.unreadByStaff || 0) - (a.unreadByStaff || 0)
//           return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
//         })
//         setNotifs(sorted.map(t => ticketToNotif(t)))
//       })
//       .catch(() => {})
//       .finally(() => setTicketsLoading(false))
//   }, [staffId])

//   /* Upsert helper */
//   const upsertNotif = (newN) => {
//     setNotifs(prev => {
//       const idx = prev.findIndex(n => n.ticketId === newN.ticketId)
//       if (idx !== -1) {
//         const updated = [...prev]
//         updated[idx] = { ...newN, id: prev[idx].id }
//         return updated
//       }
//       return [newN, ...prev].slice(0, 30)
//     })
//   }

//   const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false, unreadMsgs: 0 })))
//   const clearAll    = () => setNotifs([])

//   /* ── Socket ── */
//   const sockRef = useRef(null)
//   useEffect(() => {
//     if (!staffId) return
//     const s = socketIo(Url, { transports: ['websocket'], reconnectionAttempts: 5 })
//     sockRef.current = s

//     s.on('connect', () => { const t = getToken(); if (t) s.emit('join', t) })

//     s.on('support:assigned_to_you', (d) => {
//       upsertNotif({
//         id: `new-${d._id || Date.now()}`, type: 'new_ticket',
//         ticketCode: d.ticketCode || d.ticketId || '—',
//         text: d.subject || 'New ticket assigned',
//         status: 'open', project: d.projectName || '', client: d.clientName || '',
//         unreadMsgs: 0, unread: true, ts: Date.now(), ticketId: d._id,
//       })
//     })

//     s.on('support:ticket_updated', (u) => {
//       if (u.assignedTo?.id !== staffId) {
//         setNotifs(prev => prev.filter(n => n.ticketId !== u._id))
//         return
//       }
//       upsertNotif({ ...ticketToNotif(u, 'status_change'), unread: true })
//     })

//     s.on('support:new_message', (d) => {
//       setNotifs(prev => {
//         const idx = prev.findIndex(n => n.ticketId === d.ticketId)
//         if (idx !== -1) {
//           const updated = [...prev]
//           updated[idx] = { ...updated[idx], unread: true, unreadMsgs: (updated[idx].unreadMsgs || 0) + 1, ts: Date.now(), type: 'new_message' }
//           return updated
//         }
//         return [{
//           id: `msg-${Date.now()}`, type: 'new_message',
//           ticketCode: d.ticketCode || '—', text: 'New message received',
//           status: d.status || 'in-progress', project: '', client: '',
//           unreadMsgs: 1, unread: true, ts: Date.now(), ticketId: d.ticketId,
//         }, ...prev].slice(0, 30)
//       })
//     })

//     s.on('support:unread_update', (d) => {
//       if (!d.unreadByStaff || d.unreadByStaff <= 0) return
//       setNotifs(prev => prev.map(n =>
//         n.ticketId === d.ticketId ? { ...n, unreadMsgs: d.unreadByStaff, unread: true } : n
//       ))
//     })

//     return () => { s.disconnect(); sockRef.current = null }
//   }, [staffId])

//   /* Navigate */
//   const handleNotifNavigate = (notif) => {
//     markAllRead()
//     navigate(
//       `/${slug}/Help-Support`,
//       notif?.ticketId ? { state: { openTicketId: notif.ticketId } } : undefined
//     )
//   }

//   /* ── Dashboard logic ── */
//   const getGreeting = () => {
//     const h = new Date().getHours()
//     if (h < 12) return 'Good Morning'
//     if (h < 17) return 'Good Afternoon'
//     return 'Good Evening'
//   }
//   const today = new Date().toLocaleDateString('en-IN', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   })
//   const getInitials = (name) =>
//     name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

//   const sectionLabels = {
//     dashboard:          { label: 'Dashboard',       path: `/${slug}/app` },
//     orderDetail:        { label: 'Order Detail',     path: `/${slug}/new-project` },
//     team:               { label: 'Team',             path: `/${slug}/staff` },
//     services:           { label: 'Services',         path: `/${slug}/service` },
//     client:             { label: 'Client',           path: `/${slug}/client` },
//     chat:               { label: 'Chat',             path: `/${slug}/projectchat` },
//     coupon:             { label: 'Coupon',           path: `/${slug}/coupon` },
//     iconsFormat:        { label: 'Icons Format',     path: `/${slug}/iconsformat` },
//     staffRole:          { label: 'Staff Role',       path: `/${slug}/role` },
//     rating:             { label: 'Rating',           path: `/${slug}/rating` },
//     blog:               { label: 'Blog',             path: `/${slug}/blog` },
//     helpSupport:        { label: 'Help & Support',   path: `/${slug}/Help-Support` },
//     bulkMailing:        { label: 'Bulk Mailing',     path: `/${slug}/BulkMailing` },
//     managementSettings: { label: 'Mgmt Settings',    path: `/${slug}/Permissions` },
//   }

//   const activePermissions = []
//   Object.entries(permissions).forEach(([section, value]) => {
//     if (typeof value === 'object') {
//       const keys = Object.entries(value).filter(([, v]) => v === true).map(([k]) => k)
//       if (keys.length > 0) activePermissions.push({ section, keys })
//     } else if (value === true) {
//       activePermissions.push({ section, keys: ['view'] })
//     }
//   })

//   return (
//     <>
//       <style>{`
//         @keyframes notifPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
//         @keyframes dropIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//         @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
//         @keyframes spin     { to{transform:rotate(360deg)} }
//       `}</style>

//       <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

//         {/* ── Profile Banner ── */}
//         <div style={{
//           background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
//           padding: '24px 28px', marginBottom: 20,
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//             <div style={{
//               width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
//               background: '#eff6ff', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#1e40af',
//             }}>
//               {getInitials(staff?.name)}
//             </div>
//             <div>
//               <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>{getGreeting()}</div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{staff?.name || 'Staff Member'}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{staff?.roleName || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>/{staff?.slug || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: staff?.isActive ? '#f0fdf4' : '#fef2f2', color: staff?.isActive ? '#16a34a' : '#dc2626' }}>
//                   {staff?.isActive ? '● Active' : '● Inactive'}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//             <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>{today}</div>
//             <NotifPanel notifs={notifs} unreadCount={unreadCount} onClearAll={clearAll} onNavigate={handleNotifNavigate} />
//           </div>
//         </div>

//         {/* ── Stats Row ── */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
//           {[
//             { label: 'Email',       value: staff?.email || '-' },
//             { label: 'Role',        value: staff?.roleName || '-' },
//             { label: 'Slug',        value: `/${staff?.slug || '-'}` },
//             { label: 'Permissions', value: `${activePermissions.length} modules` },
//           ].map(s => (
//             <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
//               <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>{s.value}</div>
//             </div>
//           ))}
//         </div>

//         {/* ── Support Tickets Strip ── */}
//         <NotifStrip notifs={notifs} onNavigate={handleNotifNavigate} loading={ticketsLoading} />

//         {/* ── Permissions Grid ── */}
//         <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
//           <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
//             <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
//           </div>
//           {activePermissions.length === 0 ? (
//             <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No permissions assigned</div>
//           ) : (
//             <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
//               {activePermissions.map(({ section, keys }) => {
//                 const info = sectionLabels[section] || { label: section, path: '#' }
//                 const isSupport = section === 'helpSupport'
//                 return (
//                   <div key={section} onClick={() => navigate(info.path)}
//                     style={{
//                       padding: '14px 16px', borderRadius: 10, cursor: 'pointer', position: 'relative',
//                       border: `1px solid ${isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'}`,
//                       background: isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa',
//                       transition: 'all 0.15s',
//                     }}
//                     onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#eff6ff' }}
//                     onMouseLeave={e => {
//                       e.currentTarget.style.borderColor = isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'
//                       e.currentTarget.style.background = isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa'
//                     }}
//                   >
//                     {isSupport && unreadCount > 0 && (
//                       <span style={{
//                         position: 'absolute', top: 9, right: 9,
//                         background: '#EF4444', color: '#fff', borderRadius: 99,
//                         minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                       }}>{unreadCount}</span>
//                     )}
//                     <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{info.label}</div>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//                       {keys.map(k => (
//                         <span key={k} style={{ padding: '2px 8px', background: '#f0fdf4', color: '#16a34a', borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{k}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default DashBoard













// import React, { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { permissions } from 'src/utils/SessionfileData'
// import { io as socketIo } from 'socket.io-client'
// import { Url } from 'src/url/url'

// /* ─────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────── */
// const getToken = () =>
//   sessionStorage.getItem('management_token') ||
//   localStorage.getItem('management_token') ||
//   localStorage.getItem('staffToken') || ''

// const STATUS_COLORS = {
//   open:          { bg: '#FFFBEB', color: '#B45309', dot: '#F59E0B', border: '#FDE68A' },
//   'in-progress': { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6', border: '#BFDBFE' },
//   resolved:      { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', border: '#BBF7D0' },
//   closed:        { bg: '#F9FAFB', color: '#4B5563', dot: '#9CA3AF', border: '#E5E7EB' },
//   escalated:     { bg: '#F5F3FF', color: '#6D28D9', dot: '#8B5CF6', border: '#DDD6FE' },
// }

// const NOTIF_ICONS = {
//   new_ticket:    '🎫',
//   new_message:   '💬',
//   status_change: '🔄',
//   escalated:     '⚡',
//   resolved:      '✅',
//   existing:      '📋',
// }

// const timeAgo = (ts) => {
//   const diff = Date.now() - new Date(ts).getTime()
//   const m = Math.floor(diff / 60000)
//   if (m < 1) return 'Just now'
//   if (m < 60) return `${m}m ago`
//   const h = Math.floor(m / 60)
//   if (h < 24) return `${h}h ago`
//   return `${Math.floor(h / 24)}d ago`
// }

// /* ─────────────────────────────────────────────────────────────────
//    NOTIFICATION BELL DROPDOWN
// ───────────────────────────────────────────────────────────────── */
// const NotifPanel = ({ notifs, onClearAll, onNavigate, unreadCount }) => {
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   return (
//     <div ref={ref} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setOpen(v => !v)}
//         title="Ticket Notifications"
//         style={{
//           position: 'relative', width: 40, height: 40, borderRadius: 10,
//           border: `1px solid ${open ? '#BFDBFE' : '#E2E8F0'}`,
//           background: open ? '#EFF6FF' : '#fff', cursor: 'pointer',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           transition: 'all 0.15s',
//           boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
//         }}
//       >
//         <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
//           stroke={open ? '#2563EB' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
//           <path d="M13.73 21a2 2 0 01-3.46 0"/>
//         </svg>
//         {unreadCount > 0 && (
//           <span style={{
//             position: 'absolute', top: -5, right: -5,
//             background: '#EF4444', color: '#fff', borderRadius: 99,
//             minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '0 4px', border: '2px solid #fff',
//             animation: 'notifPop 0.3s ease',
//           }}>
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div style={{
//           position: 'absolute', top: 50, right: 0, zIndex: 2000,
//           width: 340, background: '#fff',
//           border: '1px solid #E2E8F0', borderRadius: 14,
//           boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
//           overflow: 'hidden', animation: 'dropIn 0.15s ease',
//         }}>
//           {/* Header */}
//           <div style={{
//             padding: '12px 16px', borderBottom: '1px solid #F1F5F9',
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             background: 'linear-gradient(90deg,#EFF6FF,#fff)',
//           }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 7 }}>
//               Ticket Notifications
//               {unreadCount > 0 && (
//                 <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>
//                   {unreadCount} new
//                 </span>
//               )}
//             </span>
//             {notifs.length > 0 && (
//               <button onClick={onClearAll} style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Clear all
//               </button>
//             )}
//           </div>

//           {/* List */}
//           <div style={{ maxHeight: 360, overflowY: 'auto' }}>
//             {notifs.length === 0 ? (
//               <div style={{ padding: '36px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//                 <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
//                 <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>No notifications yet</p>
//                 <p style={{ margin: '4px 0 0', fontSize: 11 }}>Ticket updates will appear here</p>
//               </div>
//             ) : notifs.map((n) => {
//               const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//               return (
//                 <div key={n.id}
//                   onClick={() => { onNavigate(n); setOpen(false) }}
//                   style={{
//                     padding: '11px 14px', cursor: 'pointer',
//                     borderBottom: '1px solid #F8FAFC',
//                     background: n.unread ? '#F0F7FF' : '#fff',
//                     display: 'flex', gap: 10, alignItems: 'flex-start',
//                     transition: 'background 0.1s',
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
//                   onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : '#fff'}
//                 >
//                   <div style={{
//                     width: 32, height: 32, borderRadius: 8, flexShrink: 0,
//                     background: sc.bg, border: `1px solid ${sc.border}`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
//                   }}>
//                     {/* {NOTIF_ICONS[n.type] || '🎫'} */}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
//                       <span style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>#{n.ticketCode}</span>
//                       <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{timeAgo(n.ts)}</span>
//                     </div>
//                     <p style={{ margin: '2px 0 4px', fontSize: 11.5, color: '#374151', lineHeight: 1.4,
//                       overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                       {n.text}
//                     </p>
//                     <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//                       {n.status && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: 4,
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
//                           background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                         }}>
//                           <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                           {n.status}
//                         </span>
//                       )}
//                       {n.unreadMsgs > 0 && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center',
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700,
//                           background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
//                         }}>
//                           {n.unreadMsgs} unread
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {n.unread && (
//                     <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 4 }} />
//                   )}
//                 </div>
//               )
//             })}
//           </div>

//           {/* Footer */}
//           {notifs.length > 0 && (
//             <div style={{ padding: '10px 14px', borderTop: '1px solid #F1F5F9', background: '#FAFBFC' }}>
//               <button onClick={() => { onNavigate(null); setOpen(false) }}
//                 style={{
//                   width: '100%', padding: '8px', borderRadius: 8, border: 'none',
//                   background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 12.5,
//                   cursor: 'pointer', fontFamily: 'inherit',
//                 }}>
//                 View All Tickets →
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────
//    SUPPORT TICKETS STRIP
// ───────────────────────────────────────────────────────────────── */
// const NotifStrip = ({ notifs, onNavigate, loading }) => {
//   const totalUnread = notifs.filter(n => n.unread).length
//   const recent = notifs.slice(0, 6)

//   return (
//     <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', marginBottom: 20, overflow: 'hidden' }}>
//       {/* Header */}
//       <div style={{
//         padding: '13px 20px', borderBottom: '1px solid #F1F5F9',
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         background: 'linear-gradient(90deg,#EFF6FF 0%,#fff 60%)',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <div style={{
//             width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
//             animation: totalUnread > 0 ? 'pulse 2s ease infinite' : 'none',
//           }} />
//           <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Support Tickets</span>
//           {totalUnread > 0 && (
//             <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
//               {totalUnread} unread
//             </span>
//           )}
//           {!loading && notifs.length > 0 && (
//             <span style={{ fontSize: 11, color: '#9CA3AF' }}>({notifs.length} assigned)</span>
//           )}
//         </div>
//         <button onClick={() => onNavigate(null)} style={{
//           padding: '5px 12px', borderRadius: 7, border: '1px solid #BFDBFE',
//           background: '#EFF6FF', color: '#2563EB', fontSize: 11.5, fontWeight: 600,
//           cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
//         }}
//           onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff' }}
//           onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#2563EB' }}
//         >
//           View All →
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div style={{ padding: '28px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"
//             style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: 8 }}>
//             <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
//             <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
//             <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
//             <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
//           </svg>
//           <p style={{ margin: 0, fontSize: 13 }}>Loading tickets…</p>
//         </div>
//       )}

//       {/* Empty */}
//       {!loading && recent.length === 0 && (
//         <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <div style={{ fontSize: 28, marginBottom: 8 }}>🎫</div>
//           <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#374151' }}>No tickets assigned</p>
//           <p style={{ margin: '4px 0 0', fontSize: 12 }}>Tickets assigned to you will appear here</p>
//         </div>
//       )}

//       {/* Rows */}
//       {!loading && recent.map((n, i) => {
//         const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//         return (
//           <div key={n.id} onClick={() => onNavigate(n)}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
//               borderBottom: i < recent.length - 1 ? '1px solid #F8FAFC' : 'none',
//               background: n.unread ? '#F0F7FF' : 'transparent',
//               cursor: 'pointer', transition: 'background 0.1s',
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
//             onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : 'transparent'}
//           >
//             {/* Icon */}
//             <div style={{
//               width: 36, height: 36, borderRadius: 9, flexShrink: 0,
//               background: sc.bg, border: `1px solid ${sc.border}`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
//             }}>
//               {NOTIF_ICONS[n.type] || '🎫'}
//             </div>

//             {/* Info */}
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <span style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', flexShrink: 0 }}>#{n.ticketCode}</span>
//                 <span style={{ fontSize: 12.5, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {n.text}
//                 </span>
//               </div>
//               {(n.project || n.client) && (
//                 <div style={{ marginTop: 2, fontSize: 11, color: '#9CA3AF' }}>
//                   {[n.client, n.project].filter(Boolean).join(' · ')}
//                 </div>
//               )}
//             </div>

//             {/* Right */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//               <span style={{
//                 padding: '2px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 600,
//                 background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                 display: 'flex', alignItems: 'center', gap: 4,
//               }}>
//                 <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                 {n.status}
//               </span>
//               {n.unreadMsgs > 0 && (
//                 <span style={{
//                   background: '#EF4444', color: '#fff', borderRadius: 99,
//                   minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                 }}>
//                   {n.unreadMsgs}
//                 </span>
//               )}
//               <span style={{ fontSize: 11, color: '#9CA3AF' }}>{timeAgo(n.ts)}</span>
//               {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────
//    MAIN DASHBOARD
// ───────────────────────────────────────────────────────────────── */
// const DashBoard = () => {
//   const navigate = useNavigate()

//   const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}')
//   const slug = staff?.slug || 'Management'
//   const staffId = staff?._id || staff?.id || ''

//   const [notifs, setNotifs]             = useState([])
//   const [ticketsLoading, setTicketsLoading] = useState(false)

//   const unreadCount = notifs.filter(n => n.unread).length

//   /* Convert ticket → notif item */
//   const ticketToNotif = (t, type = 'existing') => ({
//     id:         t._id,
//     type,
//     ticketCode: t.ticketId || '—',
//     text:       t.subject === 'Other' ? (t.customSubject || 'Support ticket') : (t.subject || 'Support ticket'),
//     status:     t.status,
//     project:    t.projectName || t.projectId || '',
//     client:     t.clientName || '',
//     unreadMsgs: t.unreadByStaff || 0,
//     unread:     (t.unreadByStaff || 0) > 0,
//     ts:         t.updatedAt || t.createdAt || Date.now(),
//     ticketId:   t._id,
//   })

//   /* ── Fetch tickets on mount ── */
//   useEffect(() => {
//     if (!staffId) return
//     setTicketsLoading(true)
//     fetch(`${Url}/api/support/tickets/assigned/${staffId}`)
//       .then(r => r.json())
//       .then(d => {
//         const list = d.tickets || []
//         const sorted = [...list].sort((a, b) => {
//           // unread first, then newest
//           if ((b.unreadByStaff || 0) !== (a.unreadByStaff || 0))
//             return (b.unreadByStaff || 0) - (a.unreadByStaff || 0)
//           return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
//         })
//         setNotifs(sorted.map(t => ticketToNotif(t)))
//       })
//       .catch(() => {})
//       .finally(() => setTicketsLoading(false))
//   }, [staffId])

//   /* Upsert helper */
//   const upsertNotif = (newN) => {
//     setNotifs(prev => {
//       const idx = prev.findIndex(n => n.ticketId === newN.ticketId)
//       if (idx !== -1) {
//         const updated = [...prev]
//         updated[idx] = { ...newN, id: prev[idx].id }
//         return updated
//       }
//       return [newN, ...prev].slice(0, 30)
//     })
//   }

//   const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false, unreadMsgs: 0 })))
//   const clearAll    = () => setNotifs([])

//   /* ── Socket ── */
//   const sockRef = useRef(null)
//   useEffect(() => {
//     if (!staffId) return
//     const s = socketIo(Url, { transports: ['websocket'], reconnectionAttempts: 5 })
//     sockRef.current = s

//     s.on('connect', () => { const t = getToken(); if (t) s.emit('join', t) })

//     s.on('support:assigned_to_you', (d) => {
//       upsertNotif({
//         id: `new-${d._id || Date.now()}`, type: 'new_ticket',
//         ticketCode: d.ticketCode || d.ticketId || '—',
//         text: d.subject || 'New ticket assigned',
//         status: 'open', project: d.projectName || '', client: d.clientName || '',
//         unreadMsgs: 0, unread: true, ts: Date.now(), ticketId: d._id,
//       })
//     })

//     s.on('support:ticket_updated', (u) => {
//       if (u.assignedTo?.id !== staffId) {
//         setNotifs(prev => prev.filter(n => n.ticketId !== u._id))
//         return
//       }
//       upsertNotif({ ...ticketToNotif(u, 'status_change'), unread: true })
//     })

//     s.on('support:new_message', (d) => {
//       setNotifs(prev => {
//         const idx = prev.findIndex(n => n.ticketId === d.ticketId)
//         if (idx !== -1) {
//           const updated = [...prev]
//           updated[idx] = { ...updated[idx], unread: true, unreadMsgs: (updated[idx].unreadMsgs || 0) + 1, ts: Date.now(), type: 'new_message' }
//           return updated
//         }
//         return [{
//           id: `msg-${Date.now()}`, type: 'new_message',
//           ticketCode: d.ticketCode || '—', text: 'New message received',
//           status: d.status || 'in-progress', project: '', client: '',
//           unreadMsgs: 1, unread: true, ts: Date.now(), ticketId: d.ticketId,
//         }, ...prev].slice(0, 30)
//       })
//     })

//     s.on('support:unread_update', (d) => {
//       if (!d.unreadByStaff || d.unreadByStaff <= 0) return
//       setNotifs(prev => prev.map(n =>
//         n.ticketId === d.ticketId ? { ...n, unreadMsgs: d.unreadByStaff, unread: true } : n
//       ))
//     })

//     return () => { s.disconnect(); sockRef.current = null }
//   }, [staffId])

//   /* Navigate */
//   const handleNotifNavigate = (notif) => {
//     markAllRead()
//     navigate(
//       `/${slug}/StaffHelpSupport`,
//       notif?.ticketId ? { state: { openTicketId: notif.ticketId } } : undefined
//     )
//   }

//   /* ── Dashboard logic ── */
//   const getGreeting = () => {
//     const h = new Date().getHours()
//     if (h < 12) return 'Good Morning'
//     if (h < 17) return 'Good Afternoon'
//     return 'Good Evening'
//   }
//   const today = new Date().toLocaleDateString('en-IN', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   })
//   const getInitials = (name) =>
//     name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

//   const sectionLabels = {
//     dashboard:          { label: 'Dashboard',       path: `/${slug}/app` },
//     orderDetail:        { label: 'Order Detail',     path: `/${slug}/new-project` },
//     team:               { label: 'Team',             path: `/${slug}/staff` },
//     services:           { label: 'Services',         path: `/${slug}/service` },
//     client:             { label: 'Client',           path: `/${slug}/client` },
//     chat:               { label: 'Chat',             path: `/${slug}/projectchat` },
//     coupon:             { label: 'Coupon',           path: `/${slug}/coupon` },
//     iconsFormat:        { label: 'Icons Format',     path: `/${slug}/iconsformat` },
//     staffRole:          { label: 'Staff Role',       path: `/${slug}/role` },
//     rating:             { label: 'Rating',           path: `/${slug}/rating` },
//     blog:               { label: 'Blog',             path: `/${slug}/blog` },
//     helpSupport:        { label: 'Help & Support',   path: `/${slug}/StaffHelpSupport` },
//     bulkMailing:        { label: 'Bulk Mailing',     path: `/${slug}/BulkMailing` },
//     managementSettings: { label: 'Mgmt Settings',    path: `/${slug}/Permissions` },
//   }

//   const activePermissions = []
//   Object.entries(permissions).forEach(([section, value]) => {
//     if (typeof value === 'object') {
//       const keys = Object.entries(value).filter(([, v]) => v === true).map(([k]) => k)
//       if (keys.length > 0) activePermissions.push({ section, keys })
//     } else if (value === true) {
//       activePermissions.push({ section, keys: ['view'] })
//     }
//   })

//   return (
//     <>
//       <style>{`
//         @keyframes notifPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
//         @keyframes dropIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//         @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
//         @keyframes spin     { to{transform:rotate(360deg)} }
//       `}</style>

//       <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

//         {/* ── Profile Banner ── */}
//         <div style={{
//           background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
//           padding: '24px 28px', marginBottom: 20,
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//             <div style={{
//               width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
//               background: '#eff6ff', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#1e40af',
//             }}>
//               {getInitials(staff?.name)}
//             </div>
//             <div>
//               <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>{getGreeting()}</div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{staff?.name || 'Staff Member'}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{staff?.roleName || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>/{staff?.slug || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: staff?.isActive ? '#f0fdf4' : '#fef2f2', color: staff?.isActive ? '#16a34a' : '#dc2626' }}>
//                   {staff?.isActive ? '● Active' : '● Inactive'}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//             <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>{today}</div>
//             <NotifPanel notifs={notifs} unreadCount={unreadCount} onClearAll={clearAll} onNavigate={handleNotifNavigate} />
//           </div>
//         </div>

//         {/* ── Stats Row ── */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
//           {[
//             { label: 'Email',       value: staff?.email || '-' },
//             { label: 'Role',        value: staff?.roleName || '-' },
//             { label: 'Slug',        value: `/${staff?.slug || '-'}` },
//             { label: 'Permissions', value: `${activePermissions.length} modules` },
//           ].map(s => (
//             <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
//               <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>{s.value}</div>
//             </div>
//           ))}
//         </div>

//         {/* ── Support Tickets Strip ── */}
//         <NotifStrip notifs={notifs} onNavigate={handleNotifNavigate} loading={ticketsLoading} />

//         {/* ── Permissions Grid ── */}
//         <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
//           <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
//             <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
//           </div>
//           {activePermissions.length === 0 ? (
//             <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No permissions assigned</div>
//           ) : (
//             <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
//               {activePermissions.map(({ section, keys }) => {
//                 const info = sectionLabels[section] || { label: section, path: '#' }
//                 const isSupport = section === 'helpSupport'
//                 return (
//                   <div key={section} onClick={() => navigate(info.path)}
//                     style={{
//                       padding: '14px 16px', borderRadius: 10, cursor: 'pointer', position: 'relative',
//                       border: `1px solid ${isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'}`,
//                       background: isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa',
//                       transition: 'all 0.15s',
//                     }}
//                     onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#eff6ff' }}
//                     onMouseLeave={e => {
//                       e.currentTarget.style.borderColor = isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'
//                       e.currentTarget.style.background = isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa'
//                     }}
//                   >
//                     {isSupport && unreadCount > 0 && (
//                       <span style={{
//                         position: 'absolute', top: 9, right: 9,
//                         background: '#EF4444', color: '#fff', borderRadius: 99,
//                         minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                       }}>{unreadCount}</span>
//                     )}
//                     <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{info.label}</div>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//                       {keys.map(k => (
//                         <span key={k} style={{ padding: '2px 8px', background: '#f0fdf4', color: '#16a34a', borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{k}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default DashBoard













// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { permissions } from 'src/utils/SessionfileData'
// import { io as socketIo } from 'socket.io-client'
// import { Url } from 'src/url/url'

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const getToken = () =>
//   sessionStorage.getItem('management_token') ||
//   localStorage.getItem('management_token') ||
//   localStorage.getItem('staffToken') || ''

// const playNotifSound = () => {
//   try {
//     const audio = new Audio('/assets/notification.mp3')
//     audio.volume = 0.6
//     audio.play().catch(() => {})
//   } catch {}
// }

// // ─── Constants ────────────────────────────────────────────────────────────────
// const STATUS_COLORS = {
//   open:          { bg: '#FFFBEB', color: '#B45309', dot: '#F59E0B', border: '#FDE68A' },
//   'in-progress': { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6', border: '#BFDBFE' },
//   resolved:      { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', border: '#BBF7D0' },
//   closed:        { bg: '#F9FAFB', color: '#4B5563', dot: '#9CA3AF', border: '#E5E7EB' },
//   escalated:     { bg: '#F5F3FF', color: '#6D28D9', dot: '#8B5CF6', border: '#DDD6FE' },
// }

// const NOTIF_ICONS = {
//   new_ticket:    '🎫',
//   new_message:   '💬',
//   status_change: '🔄',
//   escalated:     '⚡',
//   resolved:      '✅',
//   existing:      '📋',
// }

// const timeAgo = (ts) => {
//   const diff = Date.now() - new Date(ts).getTime()
//   const m = Math.floor(diff / 60000)
//   if (m < 1) return 'Just now'
//   if (m < 60) return `${m}m ago`
//   const h = Math.floor(m / 60)
//   if (h < 24) return `${h}h ago`
//   return `${Math.floor(h / 24)}d ago`
// }

// // ─── NotifPanel (Bell Dropdown) ───────────────────────────────────────────────
// const NotifPanel = ({ notifs, onClearAll, onNavigate, unreadCount }) => {
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setOpen(false)
//     }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   return (
//     <div ref={ref} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setOpen(v => !v)}
//         title="Ticket Notifications"
//         style={{
//           position: 'relative', width: 40, height: 40, borderRadius: 10,
//           border: `1px solid ${open ? '#BFDBFE' : '#E2E8F0'}`,
//           background: open ? '#EFF6FF' : '#fff', cursor: 'pointer',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           transition: 'all 0.15s',
//           boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
//         }}
//       >
//         <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
//           stroke={open ? '#2563EB' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
//           <path d="M13.73 21a2 2 0 01-3.46 0" />
//         </svg>
//         {unreadCount > 0 && (
//           <span style={{
//             position: 'absolute', top: -5, right: -5,
//             background: '#EF4444', color: '#fff', borderRadius: 99,
//             minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '0 4px', border: '2px solid #fff',
//             animation: 'notifPop 0.3s ease',
//           }}>
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div style={{
//           position: 'absolute', top: 50, right: 0, zIndex: 2000,
//           width: 340, background: '#fff',
//           border: '1px solid #E2E8F0', borderRadius: 14,
//           boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
//           overflow: 'hidden', animation: 'dropIn 0.15s ease',
//         }}>
//           <div style={{
//             padding: '12px 16px', borderBottom: '1px solid #F1F5F9',
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             background: 'linear-gradient(90deg,#EFF6FF,#fff)',
//           }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 7 }}>
//               Ticket Notifications
//               {unreadCount > 0 && (
//                 <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>
//                   {unreadCount} new
//                 </span>
//               )}
//             </span>
//             {notifs.length > 0 && (
//               <button onClick={onClearAll} style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Clear all
//               </button>
//             )}
//           </div>

//           <div style={{ maxHeight: 360, overflowY: 'auto' }}>
//             {notifs.length === 0 ? (
//               <div style={{ padding: '36px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//                 <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
//                 <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>No notifications yet</p>
//                 <p style={{ margin: '4px 0 0', fontSize: 11 }}>Ticket updates will appear here</p>
//               </div>
//             ) : notifs.map((n) => {
//               const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//               return (
//                 <div key={n.id}
//                   onClick={() => { onNavigate(n); setOpen(false) }}
//                   style={{
//                     padding: '11px 14px', cursor: 'pointer',
//                     borderBottom: '1px solid #F8FAFC',
//                     background: n.unread ? '#F0F7FF' : '#fff',
//                     display: 'flex', gap: 10, alignItems: 'flex-start',
//                     transition: 'background 0.1s',
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
//                   onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : '#fff'}
//                 >
//                   <div style={{
//                     width: 32, height: 32, borderRadius: 8, flexShrink: 0,
//                     background: sc.bg, border: `1px solid ${sc.border}`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
//                   }}>
//                     {NOTIF_ICONS[n.type] || '🎫'}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
//                       <span style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>#{n.ticketCode}</span>
//                       <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{timeAgo(n.ts)}</span>
//                     </div>
//                     <p style={{
//                       margin: '2px 0 4px', fontSize: 11.5, color: '#374151', lineHeight: 1.4,
//                       overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//                     }}>
//                       {n.text}
//                     </p>
//                     <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//                       {n.status && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: 4,
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
//                           background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                         }}>
//                           <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                           {n.status}
//                         </span>
//                       )}
//                       {n.unreadMsgs > 0 && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center',
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700,
//                           background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
//                         }}>
//                           {n.unreadMsgs} unread
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {n.unread && (
//                     <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 4 }} />
//                   )}
//                 </div>
//               )
//             })}
//           </div>

//           {notifs.length > 0 && (
//             <div style={{ padding: '10px 14px', borderTop: '1px solid #F1F5F9', background: '#FAFBFC' }}>
//               <button
//                 onClick={() => { onNavigate(null); setOpen(false) }}
//                 style={{
//                   width: '100%', padding: '8px', borderRadius: 8, border: 'none',
//                   background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 12.5,
//                   cursor: 'pointer', fontFamily: 'inherit',
//                 }}
//               >
//                 View All Tickets →
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// // ─── NotifStrip (Support Tickets Strip) ──────────────────────────────────────
// const NotifStrip = ({ notifs, onNavigate, loading }) => {
//   const totalUnread = notifs.filter(n => n.unread).length
//   const recent = notifs.slice(0, 6)

//   return (
//     <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', marginBottom: 20, overflow: 'hidden' }}>
//       <div style={{
//         padding: '13px 20px', borderBottom: '1px solid #F1F5F9',
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         background: 'linear-gradient(90deg,#EFF6FF 0%,#fff 60%)',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <div style={{
//             width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
//             animation: totalUnread > 0 ? 'pulse 2s ease infinite' : 'none',
//           }} />
//           <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Support Tickets</span>
//           {totalUnread > 0 && (
//             <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
//               {totalUnread} unread
//             </span>
//           )}
//           {!loading && notifs.length > 0 && (
//             <span style={{ fontSize: 11, color: '#9CA3AF' }}>({notifs.length} assigned)</span>
//           )}
//         </div>
//         <button
//           onClick={() => onNavigate(null)}
//           style={{
//             padding: '5px 12px', borderRadius: 7, border: '1px solid #BFDBFE',
//             background: '#EFF6FF', color: '#2563EB', fontSize: 11.5, fontWeight: 600,
//             cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff' }}
//           onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#2563EB' }}
//         >
//           View All →
//         </button>
//       </div>

//       {loading && (
//         <div style={{ padding: '28px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"
//             style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: 8 }}>
//             <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
//             <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
//             <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
//             <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
//           </svg>
//           <p style={{ margin: 0, fontSize: 13 }}>Loading tickets…</p>
//         </div>
//       )}

//       {!loading && recent.length === 0 && (
//         <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <div style={{ fontSize: 28, marginBottom: 8 }}>🎫</div>
//           <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#374151' }}>No tickets assigned</p>
//           <p style={{ margin: '4px 0 0', fontSize: 12 }}>Tickets assigned to you will appear here</p>
//         </div>
//       )}

//       {!loading && recent.map((n, i) => {
//         const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//         return (
//           <div key={n.id} onClick={() => onNavigate(n)}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
//               borderBottom: i < recent.length - 1 ? '1px solid #F8FAFC' : 'none',
//               background: n.unread ? '#F0F7FF' : 'transparent',
//               cursor: 'pointer', transition: 'background 0.1s',
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
//             onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : 'transparent'}
//           >
//             <div style={{
//               width: 36, height: 36, borderRadius: 9, flexShrink: 0,
//               background: sc.bg, border: `1px solid ${sc.border}`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
//             }}>
//               {NOTIF_ICONS[n.type] || '🎫'}
//             </div>

//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <span style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', flexShrink: 0 }}>#{n.ticketCode}</span>
//                 <span style={{ fontSize: 12.5, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {n.text}
//                 </span>
//               </div>
//               {(n.project || n.client) && (
//                 <div style={{ marginTop: 2, fontSize: 11, color: '#9CA3AF' }}>
//                   {[n.client, n.project].filter(Boolean).join(' · ')}
//                 </div>
//               )}
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//               <span style={{
//                 padding: '2px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 600,
//                 background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                 display: 'flex', alignItems: 'center', gap: 4,
//               }}>
//                 <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                 {n.status}
//               </span>
//               {n.unreadMsgs > 0 && (
//                 <span style={{
//                   background: '#EF4444', color: '#fff', borderRadius: 99,
//                   minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                 }}>
//                   {n.unreadMsgs}
//                 </span>
//               )}
//               <span style={{ fontSize: 11, color: '#9CA3AF' }}>{timeAgo(n.ts)}</span>
//               {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// // ─── Main Dashboard ───────────────────────────────────────────────────────────
// const DashBoard = () => {
//   const navigate = useNavigate()

//   const staff   = JSON.parse(sessionStorage.getItem('management_staff') || '{}')
//   const slug    = staff?.slug || 'Management'
//   const staffId = staff?._id || staff?.id || ''

//   const [notifs,         setNotifs]         = useState([])
//   const [ticketsLoading, setTicketsLoading] = useState(false)

//   const unreadCount = notifs.filter(n => n.unread).length

//   // ─── ticket → notif object ────────────────────────────────────────────────
//   const ticketToNotif = useCallback((t, type = 'existing') => ({
//     id:         t._id,
//     type,
//     ticketCode: t.ticketId || '—',
//     text:       t.subject === 'Other' ? (t.customSubject || 'Support ticket') : (t.subject || 'Support ticket'),
//     status:     t.status,
//     project:    t.projectName || t.projectId || '',
//     client:     t.clientName  || '',
//     unreadMsgs: t.unreadByStaff || 0,
//     unread:     (t.unreadByStaff || 0) > 0,
//     ts:         t.updatedAt || t.createdAt || Date.now(),
//     ticketId:   t._id,
//   }), [])

//   // ─── Upsert notif ─────────────────────────────────────────────────────────
//   const upsertNotif = useCallback((newN) => {
//     setNotifs(prev => {
//       const idx = prev.findIndex(n => n.ticketId === newN.ticketId)
//       let next
//       if (idx !== -1) {
//         next = [...prev]
//         next[idx] = { ...next[idx], ...newN }
//       } else {
//         next = [newN, ...prev].slice(0, 50)
//       }
//       return next.sort((a, b) => {
//         if (b.unread !== a.unread) return b.unread ? 1 : -1
//         return new Date(b.ts) - new Date(a.ts)
//       })
//     })
//   }, [])

//   // ─── Initial ticket fetch ─────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return
//     setTicketsLoading(true)
//     fetch(`${Url}/api/support/tickets/assigned/${staffId}`)
//       .then(r => r.json())
//       .then(d => {
//         const list = d.tickets || []
//         const sorted = [...list].sort((a, b) => {
//           if ((b.unreadByStaff || 0) !== (a.unreadByStaff || 0))
//             return (b.unreadByStaff || 0) - (a.unreadByStaff || 0)
//           return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
//         })
//         setNotifs(sorted.map(t => ticketToNotif(t)))
//       })
//       .catch(() => {})
//       .finally(() => setTicketsLoading(false))
//   }, [staffId, ticketToNotif])

//   const markAllRead = useCallback(() =>
//     setNotifs(prev => prev.map(n => ({ ...n, unread: false, unreadMsgs: 0 }))), [])

//   const clearAll = useCallback(() => setNotifs([]), [])

//   // ─── Socket ───────────────────────────────────────────────────────────────
//   const sockRef = useRef(null)

//   useEffect(() => {
//     if (!staffId) return

//     const s = socketIo(Url, {
//       transports: ['websocket'],
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     })
//     sockRef.current = s

//     // ✅ staffId ko String mein convert karo — socket closure ke andar
//     const myId = String(staffId || '')

//     const joinRoom = () => {
//       const token = getToken()
//       if (token) s.emit('join', token)
//       s.emit('joinStaff', staffId)
//     }
//     s.on('connect',   joinRoom)
//     s.on('reconnect', joinRoom)

//     // ── New ticket assigned ──────────────────────────────────────────────
//     s.on('support:assigned_to_you', (d) => {
//       playNotifSound()
//       upsertNotif({
//         id:         `new-${d._id || Date.now()}`,
//         type:       'new_ticket',
//         ticketCode: d.ticketCode || d.ticketId || '—',
//         text:       d.subject || 'New ticket assigned',
//         status:     'open',
//         project:    d.projectName || '',
//         client:     d.clientName  || '',
//         unreadMsgs: 0,
//         unread:     true,
//         ts:         Date.now(),
//         ticketId:   d._id,
//       })
//     })

//     // ── Ticket updated ───────────────────────────────────────────────────
//     s.on('support:ticket_updated', (u) => {
//       if (u.assignedTo?.id !== staffId) {
//         setNotifs(prev => prev.filter(n => n.ticketId !== u._id))
//         return
//       }
//       playNotifSound()
//       upsertNotif({
//         ...ticketToNotif(u, 'status_change'),
//         unread: true,
//         ts:     Date.now(),
//       })
//     })

//     // ── New message ──────────────────────────────────────────────────────
//     s.on('support:new_message', (d) => {
//       const tid        = d.ticketId
//       const msgText    = d.message?.message    || ''
//       const senderName = d.message?.senderName || 'Someone'
//       const sender     = d.message?.sender     || ''
//       const senderId   = String(d.message?.senderId || '')

//       // ✅ FIX 1: Apna message — non-empty ID check ke saath ignore karo
//       // Empty string match se bachne ke liye senderId && myId check zaroori hai
//       if (sender === 'staff' && senderId && myId && senderId === myId) return

//       // ✅ FIX 2: Doosre staff ka message — dashboard pe sound nahi bajna chahiye
//       if (sender === 'staff') return

//       // ✅ Sirf client message par sound bajao
//       playNotifSound()

//       setNotifs(prev => {
//         const idx = prev.findIndex(n => n.ticketId === tid)
//         if (idx === -1) return prev
//         const next = [...prev]
//         next[idx] = {
//           ...next[idx],
//           unread:     true,
//           unreadMsgs: (next[idx].unreadMsgs || 0) + 1,
//           ts:         Date.now(),
//           type:       'new_message',
//           text:       msgText ? `${senderName}: ${msgText}` : next[idx].text,
//         }
//         // Bubble to top
//         const item = next.splice(idx, 1)[0]
//         return [item, ...next]
//       })
//     })

//     // ── Server unread sync ───────────────────────────────────────────────
//     s.on('support:unread_update', (d) => {
//       if (!d.ticketId || d.unreadByStaff === undefined) return
//       setNotifs(prev => prev.map(n =>
//         n.ticketId === d.ticketId
//           ? { ...n, unreadMsgs: d.unreadByStaff, unread: d.unreadByStaff > 0 }
//           : n
//       ))
//     })

//     return () => {
//       s.off('connect',   joinRoom)
//       s.off('reconnect', joinRoom)
//       s.disconnect()
//       sockRef.current = null
//     }
//   }, [staffId, ticketToNotif, upsertNotif])

//   // ─── Navigate to ticket ───────────────────────────────────────────────────
//   const handleNotifNavigate = useCallback((notif) => {
//     markAllRead()
//     navigate(
//       `/${slug}/StaffHelpSupport`,
//       notif?.ticketId ? { state: { openTicketId: notif.ticketId } } : undefined
//     )
//   }, [slug, navigate, markAllRead])

//   // ─── Misc ─────────────────────────────────────────────────────────────────
//   const getGreeting = () => {
//     const h = new Date().getHours()
//     if (h < 12) return 'Good Morning'
//     if (h < 17) return 'Good Afternoon'
//     return 'Good Evening'
//   }

//   const today = new Date().toLocaleDateString('en-IN', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   })

//   const getInitials = (name) =>
//     name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

//   const sectionLabels = {
//     dashboard:          { label: 'Dashboard',       path: `/${slug}/app` },
//     orderDetail:        { label: 'Order Detail',     path: `/${slug}/new-project` },
//     team:               { label: 'Team',             path: `/${slug}/staff` },
//     services:           { label: 'Services',         path: `/${slug}/service` },
//     client:             { label: 'Client',           path: `/${slug}/client` },
//     chat:               { label: 'Chat',             path: `/${slug}/projectchat` },
//     coupon:             { label: 'Coupon',           path: `/${slug}/coupon` },
//     iconsFormat:        { label: 'Icons Format',     path: `/${slug}/iconsformat` },
//     staffRole:          { label: 'Staff Role',       path: `/${slug}/role` },
//     rating:             { label: 'Rating',           path: `/${slug}/rating` },
//     blog:               { label: 'Blog',             path: `/${slug}/blog` },
//     helpSupport:        { label: 'Help & Support',   path: `/${slug}/StaffHelpSupport` },
//     bulkMailing:        { label: 'Bulk Mailing',     path: `/${slug}/BulkMailing` },
//     managementSettings: { label: 'Mgmt Settings',    path: `/${slug}/Permissions` },
//   }

//   const activePermissions = []
//   Object.entries(permissions).forEach(([section, value]) => {
//     if (typeof value === 'object') {
//       const keys = Object.entries(value).filter(([, v]) => v === true).map(([k]) => k)
//       if (keys.length > 0) activePermissions.push({ section, keys })
//     } else if (value === true) {
//       activePermissions.push({ section, keys: ['view'] })
//     }
//   })

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{`
//         @keyframes notifPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
//         @keyframes dropIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//         @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
//         @keyframes spin     { to{transform:rotate(360deg)} }
//       `}</style>

//       <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

//         {/* Profile Banner */}
//         <div style={{
//           background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
//           padding: '24px 28px', marginBottom: 20,
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//             <div style={{
//               width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
//               background: '#eff6ff', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#1e40af',
//             }}>
//               {getInitials(staff?.name)}
//             </div>
//             <div>
//               <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>{getGreeting()}</div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{staff?.name || 'Staff Member'}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{staff?.roleName || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>/{staff?.slug || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: staff?.isActive ? '#f0fdf4' : '#fef2f2', color: staff?.isActive ? '#16a34a' : '#dc2626' }}>
//                   {staff?.isActive ? '● Active' : '● Inactive'}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//             <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>{today}</div>
//             <NotifPanel notifs={notifs} unreadCount={unreadCount} onClearAll={clearAll} onNavigate={handleNotifNavigate} />
//           </div>
//         </div>

//         {/* Stats Row */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
//           {[
//             { label: 'Email',       value: staff?.email    || '-' },
//             { label: 'Role',        value: staff?.roleName || '-' },
//             { label: 'Slug',        value: `/${staff?.slug || '-'}` },
//             { label: 'Permissions', value: `${activePermissions.length} modules` },
//           ].map(s => (
//             <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
//               <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>{s.value}</div>
//             </div>
//           ))}
//         </div>

//         {/* Support Tickets Strip */}
//         <NotifStrip notifs={notifs} onNavigate={handleNotifNavigate} loading={ticketsLoading} />

//         {/* Permissions Grid */}
//         <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
//           <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
//             <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
//           </div>
//           {activePermissions.length === 0 ? (
//             <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No permissions assigned</div>
//           ) : (
//             <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
//               {activePermissions.map(({ section, keys }) => {
//                 const info      = sectionLabels[section] || { label: section, path: '#' }
//                 const isSupport = section === 'helpSupport'
//                 return (
//                   <div key={section} onClick={() => navigate(info.path)}
//                     style={{
//                       padding: '14px 16px', borderRadius: 10, cursor: 'pointer', position: 'relative',
//                       border:     `1px solid ${isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'}`,
//                       background: isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa',
//                       transition: 'all 0.15s',
//                     }}
//                     onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#eff6ff' }}
//                     onMouseLeave={e => {
//                       e.currentTarget.style.borderColor = isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'
//                       e.currentTarget.style.background  = isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa'
//                     }}
//                   >
//                     {isSupport && unreadCount > 0 && (
//                       <span style={{
//                         position: 'absolute', top: 9, right: 9,
//                         background: '#EF4444', color: '#fff', borderRadius: 99,
//                         minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                       }}>
//                         {unreadCount}
//                       </span>
//                     )}
//                     <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{info.label}</div>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//                       {keys.map(k => (
//                         <span key={k} style={{ padding: '2px 8px', background: '#f0fdf4', color: '#16a34a', borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{k}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default DashBoard


















// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { permissions } from 'src/utils/SessionfileData'
// import { io as socketIo } from 'socket.io-client'
// import { Url } from 'src/url/url'

// /* ─────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────── */
// const getToken = () =>
//   sessionStorage.getItem('management_token') ||
//   localStorage.getItem('management_token') ||
//   localStorage.getItem('staffToken') || ''

// const playNotifSound = () => {
//   try {
//     const audio = new Audio('/assets/notification.mp3')
//     audio.volume = 0.6
//     audio.play().catch(() => {})
//   } catch {}
// }

// const STATUS_COLORS = {
//   open:          { bg: '#FFFBEB', color: '#B45309', dot: '#F59E0B', border: '#FDE68A' },
//   'in-progress': { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6', border: '#BFDBFE' },
//   resolved:      { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', border: '#BBF7D0' },
//   closed:        { bg: '#F9FAFB', color: '#4B5563', dot: '#9CA3AF', border: '#E5E7EB' },
//   escalated:     { bg: '#F5F3FF', color: '#6D28D9', dot: '#8B5CF6', border: '#DDD6FE' },
// }

// const NOTIF_ICONS = {
//   new_ticket:    '🎫',
//   new_message:   '💬',
//   status_change: '🔄',
//   escalated:     '⚡',
//   resolved:      '✅',
//   existing:      '📋',
// }

// const timeAgo = (ts) => {
//   const diff = Date.now() - new Date(ts).getTime()
//   const m = Math.floor(diff / 60000)
//   if (m < 1) return 'Just now'
//   if (m < 60) return `${m}m ago`
//   const h = Math.floor(m / 60)
//   if (h < 24) return `${h}h ago`
//   return `${Math.floor(h / 24)}d ago`
// }

// /* ─────────────────────────────────────────────────────────────────
//    NOTIFICATION BELL DROPDOWN
// ───────────────────────────────────────────────────────────────── */
// const NotifPanel = ({ notifs, onClearAll, onNavigate, unreadCount }) => {
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)

//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   return (
//     <div ref={ref} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setOpen(v => !v)}
//         title="Ticket Notifications"
//         style={{
//           position: 'relative', width: 40, height: 40, borderRadius: 10,
//           border: `1px solid ${open ? '#BFDBFE' : '#E2E8F0'}`,
//           background: open ? '#EFF6FF' : '#fff', cursor: 'pointer',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           transition: 'all 0.15s',
//           boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
//         }}
//       >
//         <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
//           stroke={open ? '#2563EB' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
//           <path d="M13.73 21a2 2 0 01-3.46 0"/>
//         </svg>
//         {unreadCount > 0 && (
//           <span style={{
//             position: 'absolute', top: -5, right: -5,
//             background: '#EF4444', color: '#fff', borderRadius: 99,
//             minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '0 4px', border: '2px solid #fff',
//             animation: 'notifPop 0.3s ease',
//           }}>
//             {unreadCount > 99 ? '99+' : unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div style={{
//           position: 'absolute', top: 50, right: 0, zIndex: 2000,
//           width: 340, background: '#fff',
//           border: '1px solid #E2E8F0', borderRadius: 14,
//           boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
//           overflow: 'hidden', animation: 'dropIn 0.15s ease',
//         }}>
//           <div style={{
//             padding: '12px 16px', borderBottom: '1px solid #F1F5F9',
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             background: 'linear-gradient(90deg,#EFF6FF,#fff)',
//           }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 7 }}>
//               Ticket Notifications
//               {unreadCount > 0 && (
//                 <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>
//                   {unreadCount} new
//                 </span>
//               )}
//             </span>
//             {notifs.length > 0 && (
//               <button onClick={onClearAll} style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Clear all
//               </button>
//             )}
//           </div>

//           <div style={{ maxHeight: 360, overflowY: 'auto' }}>
//             {notifs.length === 0 ? (
//               <div style={{ padding: '36px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//                 <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
//                 <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>No notifications yet</p>
//                 <p style={{ margin: '4px 0 0', fontSize: 11 }}>Ticket updates will appear here</p>
//               </div>
//             ) : notifs.map((n) => {
//               const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//               return (
//                 <div key={n.id}
//                   onClick={() => { onNavigate(n); setOpen(false) }}
//                   style={{
//                     padding: '11px 14px', cursor: 'pointer',
//                     borderBottom: '1px solid #F8FAFC',
//                     background: n.unread ? '#F0F7FF' : '#fff',
//                     display: 'flex', gap: 10, alignItems: 'flex-start',
//                     transition: 'background 0.1s',
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
//                   onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : '#fff'}
//                 >
//                   <div style={{
//                     width: 32, height: 32, borderRadius: 8, flexShrink: 0,
//                     background: sc.bg, border: `1px solid ${sc.border}`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
//                   }}>
//                     {NOTIF_ICONS[n.type] || '🎫'}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
//                       <span style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>#{n.ticketCode}</span>
//                       <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{timeAgo(n.ts)}</span>
//                     </div>
//                     <p style={{
//                       margin: '2px 0 4px', fontSize: 11.5, color: '#374151', lineHeight: 1.4,
//                       overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
//                     }}>
//                       {n.text}
//                     </p>
//                     <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//                       {n.status && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center', gap: 4,
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
//                           background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                         }}>
//                           <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                           {n.status}
//                         </span>
//                       )}
//                       {n.unreadMsgs > 0 && (
//                         <span style={{
//                           display: 'inline-flex', alignItems: 'center',
//                           padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700,
//                           background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
//                         }}>
//                           {n.unreadMsgs} unread
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {n.unread && (
//                     <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 4 }} />
//                   )}
//                 </div>
//               )
//             })}
//           </div>

//           {notifs.length > 0 && (
//             <div style={{ padding: '10px 14px', borderTop: '1px solid #F1F5F9', background: '#FAFBFC' }}>
//               <button onClick={() => { onNavigate(null); setOpen(false) }}
//                 style={{
//                   width: '100%', padding: '8px', borderRadius: 8, border: 'none',
//                   background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 12.5,
//                   cursor: 'pointer', fontFamily: 'inherit',
//                 }}>
//                 View All Tickets →
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────
//    SUPPORT TICKETS STRIP
// ───────────────────────────────────────────────────────────────── */
// const NotifStrip = ({ notifs, onNavigate, loading }) => {
//   const totalUnread = notifs.filter(n => n.unread).length
//   const recent = notifs.slice(0, 6)

//   return (
//     <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', marginBottom: 20, overflow: 'hidden' }}>
//       <div style={{
//         padding: '13px 20px', borderBottom: '1px solid #F1F5F9',
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         background: 'linear-gradient(90deg,#EFF6FF 0%,#fff 60%)',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <div style={{
//             width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
//             animation: totalUnread > 0 ? 'pulse 2s ease infinite' : 'none',
//           }} />
//           <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Support Tickets</span>
//           {totalUnread > 0 && (
//             <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
//               {totalUnread} unread
//             </span>
//           )}
//           {!loading && notifs.length > 0 && (
//             <span style={{ fontSize: 11, color: '#9CA3AF' }}>({notifs.length} assigned)</span>
//           )}
//         </div>
//         <button onClick={() => onNavigate(null)} style={{
//           padding: '5px 12px', borderRadius: 7, border: '1px solid #BFDBFE',
//           background: '#EFF6FF', color: '#2563EB', fontSize: 11.5, fontWeight: 600,
//           cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
//         }}
//           onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff' }}
//           onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#2563EB' }}
//         >
//           View All →
//         </button>
//       </div>

//       {loading && (
//         <div style={{ padding: '28px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"
//             style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: 8 }}>
//             <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
//             <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
//             <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
//             <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
//           </svg>
//           <p style={{ margin: 0, fontSize: 13 }}>Loading tickets…</p>
//         </div>
//       )}

//       {!loading && recent.length === 0 && (
//         <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9CA3AF' }}>
//           <div style={{ fontSize: 28, marginBottom: 8 }}>🎫</div>
//           <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#374151' }}>No tickets assigned</p>
//           <p style={{ margin: '4px 0 0', fontSize: 12 }}>Tickets assigned to you will appear here</p>
//         </div>
//       )}

//       {!loading && recent.map((n, i) => {
//         const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
//         return (
//           <div key={n.id} onClick={() => onNavigate(n)}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
//               borderBottom: i < recent.length - 1 ? '1px solid #F8FAFC' : 'none',
//               background: n.unread ? '#F0F7FF' : 'transparent',
//               cursor: 'pointer', transition: 'background 0.1s',
//             }}
//             onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
//             onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : 'transparent'}
//           >
//             <div style={{
//               width: 36, height: 36, borderRadius: 9, flexShrink: 0,
//               background: sc.bg, border: `1px solid ${sc.border}`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
//             }}>
//               {NOTIF_ICONS[n.type] || '🎫'}
//             </div>

//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <span style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', flexShrink: 0 }}>#{n.ticketCode}</span>
//                 <span style={{ fontSize: 12.5, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {n.text}
//                 </span>
//               </div>
//               {(n.project || n.client) && (
//                 <div style={{ marginTop: 2, fontSize: 11, color: '#9CA3AF' }}>
//                   {[n.client, n.project].filter(Boolean).join(' · ')}
//                 </div>
//               )}
//             </div>

//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//               <span style={{
//                 padding: '2px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 600,
//                 background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
//                 display: 'flex', alignItems: 'center', gap: 4,
//               }}>
//                 <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
//                 {n.status}
//               </span>
//               {n.unreadMsgs > 0 && (
//                 <span style={{
//                   background: '#EF4444', color: '#fff', borderRadius: 99,
//                   minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                 }}>
//                   {n.unreadMsgs}
//                 </span>
//               )}
//               <span style={{ fontSize: 11, color: '#9CA3AF' }}>{timeAgo(n.ts)}</span>
//               {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────
//    MAIN DASHBOARD
// ───────────────────────────────────────────────────────────────── */
// const DashBoard = () => {
//   const navigate = useNavigate()

//   const staff   = JSON.parse(sessionStorage.getItem('management_staff') || '{}')
//   const slug    = staff?.slug || 'Management'
//   const staffId = staff?._id || staff?.id || ''

//   const [notifs,        setNotifs]        = useState([])
//   const [ticketsLoading, setTicketsLoading] = useState(false)

//   const unreadCount = notifs.filter(n => n.unread).length

//   const ticketToNotif = useCallback((t, type = 'existing') => ({
//     id:         t._id,
//     type,
//     ticketCode: t.ticketId || '—',
//     text:       t.subject === 'Other' ? (t.customSubject || 'Support ticket') : (t.subject || 'Support ticket'),
//     status:     t.status,
//     project:    t.projectName || t.projectId || '',
//     client:     t.clientName || '',
//     unreadMsgs: t.unreadByStaff || 0,
//     unread:     (t.unreadByStaff || 0) > 0,
//     ts:         t.updatedAt || t.createdAt || Date.now(),
//     ticketId:   t._id,
//   }), [])

//   const upsertNotif = useCallback((newN) => {
//     setNotifs(prev => {
//       const idx = prev.findIndex(n => n.ticketId === newN.ticketId)
//       let next
//       if (idx !== -1) {
//         next = [...prev]
//         next[idx] = { ...next[idx], ...newN }
//       } else {
//         next = [newN, ...prev].slice(0, 50)
//       }
//       return next.sort((a, b) => {
//         if (b.unread !== a.unread) return b.unread ? 1 : -1
//         return new Date(b.ts) - new Date(a.ts)
//       })
//     })
//   }, [])

//   /* ── Initial fetch ── */
//   useEffect(() => {
//     if (!staffId) return
//     setTicketsLoading(true)
//     fetch(`${Url}/api/support/tickets/assigned/${staffId}`)
//       .then(r => r.json())
//       .then(d => {
//         const list   = d.tickets || []
//         const sorted = [...list].sort((a, b) => {
//           if ((b.unreadByStaff || 0) !== (a.unreadByStaff || 0))
//             return (b.unreadByStaff || 0) - (a.unreadByStaff || 0)
//           return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
//         })
//         setNotifs(sorted.map(t => ticketToNotif(t)))
//       })
//       .catch(() => {})
//       .finally(() => setTicketsLoading(false))
//   }, [staffId, ticketToNotif])

//   const markAllRead = useCallback(() =>
//     setNotifs(prev => prev.map(n => ({ ...n, unread: false, unreadMsgs: 0 }))), [])

//   const clearAll = useCallback(() => setNotifs([]), [])

//   /* ── ✅ FIXED Socket — join with BOTH token AND staffId ── */
//   const sockRef = useRef(null)

//   useEffect(() => {
//     if (!staffId) return

//     const s = socketIo(Url, {
//       transports:           ['websocket'],
//       reconnectionAttempts: 10,
//       reconnectionDelay:    1000,
//     })
//     sockRef.current = s

//     // ✅ KEY FIX: join with token + staffId explicitly
//     // Server needs staffId to put socket in correct room: user_<staffId>
//     const joinRoom = () => {
//       const token = getToken()
//       if (token) s.emit('join', token)
//       // ✅ Also emit staffId directly so server can join user_<staffId> room
//       s.emit('joinStaff', staffId)
//     }
//     s.on('connect',   joinRoom)
//     s.on('reconnect', joinRoom)

//     /* ── support:assigned_to_you ── */
//     s.on('support:assigned_to_you', (d) => {
//       playNotifSound()
//       upsertNotif({
//         id:         `new-${d._id || Date.now()}`,
//         type:       'new_ticket',
//         ticketCode: d.ticketCode || d.ticketId || '—',
//         text:       d.subject || 'New ticket assigned',
//         status:     'open',
//         project:    d.projectName || '',
//         client:     d.clientName  || '',
//         unreadMsgs: 0,
//         unread:     true,
//         ts:         Date.now(),
//         ticketId:   d._id,
//       })
//     })

//     /* ── support:ticket_updated ── */
//     s.on('support:ticket_updated', (u) => {
//       if (u.assignedTo?.id !== staffId) {
//         setNotifs(prev => prev.filter(n => n.ticketId !== u._id))
//         return
//       }
//       playNotifSound()
//       upsertNotif({
//         ...ticketToNotif(u, 'status_change'),
//         unread: true,
//         ts:     Date.now(),
//       })
//     })

//     /* ── ✅ support:new_message — increment unreadMsgs count ── */
//     s.on('support:new_message', (d) => {
//       // d = { ticketId, ticketCode, message: {sender, message, senderName, ...} }
//       const tid         = d.ticketId
//       const msgText     = d.message?.message || ''
//       const senderName  = d.message?.senderName || 'Someone'
//       const sender      = d.message?.sender || ''

//       // Only count if message is from client (not self)
//       if (sender === 'staff') return

//       playNotifSound()
//       setNotifs(prev => {
//         const idx = prev.findIndex(n => n.ticketId === tid)
//         if (idx === -1) return prev
//         const next    = [...prev]
//         next[idx] = {
//           ...next[idx],
//           unread:     true,
//           unreadMsgs: (next[idx].unreadMsgs || 0) + 1,
//           ts:         Date.now(),
//           type:       'new_message',
//           text:       msgText ? `${senderName}: ${msgText}` : next[idx].text,
//         }
//         // Bubble to top
//         const item = next.splice(idx, 1)[0]
//         return [item, ...next]
//       })
//     })

//     /* ── ✅ support:unread_update — direct count sync from server ── */
//     s.on('support:unread_update', (d) => {
//       // d = { ticketId, unreadByStaff }
//       if (!d.ticketId || d.unreadByStaff === undefined) return
//       setNotifs(prev => prev.map(n =>
//         n.ticketId === d.ticketId
//           ? { ...n, unreadMsgs: d.unreadByStaff, unread: d.unreadByStaff > 0 }
//           : n
//       ))
//     })

//     return () => {
//       s.off('connect',   joinRoom)
//       s.off('reconnect', joinRoom)
//       s.disconnect()
//       sockRef.current = null
//     }
//   }, [staffId, ticketToNotif, upsertNotif])

//   /* ── Navigate ── */
//   const handleNotifNavigate = useCallback((notif) => {
//     markAllRead()
//     navigate(
//       `/${slug}/StaffHelpSupport`,
//       notif?.ticketId ? { state: { openTicketId: notif.ticketId } } : undefined
//     )
//   }, [slug, navigate, markAllRead])

//   /* ── Misc ── */
//   const getGreeting = () => {
//     const h = new Date().getHours()
//     if (h < 12) return 'Good Morning'
//     if (h < 17) return 'Good Afternoon'
//     return 'Good Evening'
//   }

//   const today = new Date().toLocaleDateString('en-IN', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
//   })

//   const getInitials = (name) =>
//     name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

//   const sectionLabels = {
//     dashboard:          { label: 'Dashboard',       path: `/${slug}/app` },
//     orderDetail:        { label: 'Order Detail',     path: `/${slug}/new-project` },
//     team:               { label: 'Team',             path: `/${slug}/staff` },
//     services:           { label: 'Services',         path: `/${slug}/service` },
//     client:             { label: 'Client',           path: `/${slug}/client` },
//     chat:               { label: 'Chat',             path: `/${slug}/projectchat` },
//     coupon:             { label: 'Coupon',           path: `/${slug}/coupon` },
//     iconsFormat:        { label: 'Icons Format',     path: `/${slug}/iconsformat` },
//     staffRole:          { label: 'Staff Role',       path: `/${slug}/role` },
//     rating:             { label: 'Rating',           path: `/${slug}/rating` },
//     blog:               { label: 'Blog',             path: `/${slug}/blog` },
//     helpSupport:        { label: 'Help & Support',   path: `/${slug}/StaffHelpSupport` },
//     bulkMailing:        { label: 'Bulk Mailing',     path: `/${slug}/BulkMailing` },
//     managementSettings: { label: 'Mgmt Settings',    path: `/${slug}/Permissions` },
//   }

//   const activePermissions = []
//   Object.entries(permissions).forEach(([section, value]) => {
//     if (typeof value === 'object') {
//       const keys = Object.entries(value).filter(([, v]) => v === true).map(([k]) => k)
//       if (keys.length > 0) activePermissions.push({ section, keys })
//     } else if (value === true) {
//       activePermissions.push({ section, keys: ['view'] })
//     }
//   })

//   return (
//     <>
//       <style>{`
//         @keyframes notifPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
//         @keyframes dropIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
//         @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
//         @keyframes spin     { to{transform:rotate(360deg)} }
//       `}</style>

//       <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

//         {/* Profile Banner */}
//         <div style={{
//           background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
//           padding: '24px 28px', marginBottom: 20,
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//             <div style={{
//               width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
//               background: '#eff6ff', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#1e40af',
//             }}>
//               {getInitials(staff?.name)}
//             </div>
//             <div>
//               <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>{getGreeting()}</div>
//               <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{staff?.name || 'Staff Member'}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                 <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{staff?.roleName || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>/{staff?.slug || 'N/A'}</span>
//                 <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: staff?.isActive ? '#f0fdf4' : '#fef2f2', color: staff?.isActive ? '#16a34a' : '#dc2626' }}>
//                   {staff?.isActive ? '● Active' : '● Inactive'}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
//             <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>{today}</div>
//             <NotifPanel notifs={notifs} unreadCount={unreadCount} onClearAll={clearAll} onNavigate={handleNotifNavigate} />
//           </div>
//         </div>

//         {/* Stats Row */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
//           {[
//             { label: 'Email',       value: staff?.email    || '-' },
//             { label: 'Role',        value: staff?.roleName || '-' },
//             { label: 'Slug',        value: `/${staff?.slug || '-'}` },
//             { label: 'Permissions', value: `${activePermissions.length} modules` },
//           ].map(s => (
//             <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
//               <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
//               <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>{s.value}</div>
//             </div>
//           ))}
//         </div>

//         {/* Support Tickets Strip */}
//         <NotifStrip notifs={notifs} onNavigate={handleNotifNavigate} loading={ticketsLoading} />

//         {/* Permissions Grid */}
//         <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
//           <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
//             <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
//           </div>
//           {activePermissions.length === 0 ? (
//             <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No permissions assigned</div>
//           ) : (
//             <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
//               {activePermissions.map(({ section, keys }) => {
//                 const info      = sectionLabels[section] || { label: section, path: '#' }
//                 const isSupport = section === 'helpSupport'
//                 return (
//                   <div key={section} onClick={() => navigate(info.path)}
//                     style={{
//                       padding: '14px 16px', borderRadius: 10, cursor: 'pointer', position: 'relative',
//                       border:     `1px solid ${isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'}`,
//                       background: isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa',
//                       transition: 'all 0.15s',
//                     }}
//                     onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#eff6ff' }}
//                     onMouseLeave={e => {
//                       e.currentTarget.style.borderColor = isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'
//                       e.currentTarget.style.background  = isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa'
//                     }}
//                   >
//                     {isSupport && unreadCount > 0 && (
//                       <span style={{
//                         position: 'absolute', top: 9, right: 9,
//                         background: '#EF4444', color: '#fff', borderRadius: 99,
//                         minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
//                       }}>{unreadCount}</span>
//                     )}
//                     <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{info.label}</div>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//                       {keys.map(k => (
//                         <span key={k} style={{ padding: '2px 8px', background: '#f0fdf4', color: '#16a34a', borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{k}</span>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default DashBoard















import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { permissions } from 'src/utils/SessionfileData'
import { io as socketIo } from 'socket.io-client'
import { Url } from 'src/url/url'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getToken = () =>
  sessionStorage.getItem('management_token') ||
  localStorage.getItem('management_token') ||
  localStorage.getItem('staffToken') || ''

const playNotifSound = () => {
  try {
    const audio = new Audio('/assets/notification.mp3')
    audio.volume = 0.6
    audio.play().catch(() => {})
  } catch {}
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  open:          { bg: '#FFFBEB', color: '#B45309', dot: '#F59E0B', border: '#FDE68A' },
  'in-progress': { bg: '#EFF6FF', color: '#1D4ED8', dot: '#3B82F6', border: '#BFDBFE' },
  resolved:      { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', border: '#BBF7D0' },
  closed:        { bg: '#F9FAFB', color: '#4B5563', dot: '#9CA3AF', border: '#E5E7EB' },
  escalated:     { bg: '#F5F3FF', color: '#6D28D9', dot: '#8B5CF6', border: '#DDD6FE' },
}

const NOTIF_ICONS = {
  new_ticket:    '🎫',
  new_message:   '💬',
  status_change: '🔄',
  escalated:     '⚡',
  resolved:      '✅',
  existing:      '📋',
}

const timeAgo = (ts) => {
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'Just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

// ─── NotifPanel (Bell Dropdown) ───────────────────────────────────────────────
const NotifPanel = ({ notifs, onClearAll, onNavigate, unreadCount }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        title="Ticket Notifications"
        style={{
          position: 'relative', width: 40, height: 40, borderRadius: 10,
          border: `1px solid ${open ? '#BFDBFE' : '#E2E8F0'}`,
          background: open ? '#EFF6FF' : '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
          boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke={open ? '#2563EB' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: -5, right: -5,
            background: '#EF4444', color: '#fff', borderRadius: 99,
            minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 4px', border: '2px solid #fff',
            animation: 'notifPop 0.3s ease',
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 50, right: 0, zIndex: 2000,
          width: 340, background: '#fff',
          border: '1px solid #E2E8F0', borderRadius: 14,
          boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
          overflow: 'hidden', animation: 'dropIn 0.15s ease',
        }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid #F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(90deg,#EFF6FF,#fff)',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 7 }}>
              Ticket Notifications
              {unreadCount > 0 && (
                <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 7px', fontSize: 10, fontWeight: 700 }}>
                  {unreadCount} new
                </span>
              )}
            </span>
            {notifs.length > 0 && (
              <button onClick={onClearAll} style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Clear all
              </button>
            )}
          </div>

          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {notifs.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', color: '#9CA3AF' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>No notifications yet</p>
                <p style={{ margin: '4px 0 0', fontSize: 11 }}>Ticket updates will appear here</p>
              </div>
            ) : notifs.map((n) => {
              const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
              return (
                <div key={n.id}
                  onClick={() => { onNavigate(n); setOpen(false) }}
                  style={{
                    padding: '11px 14px', cursor: 'pointer',
                    borderBottom: '1px solid #F8FAFC',
                    background: n.unread ? '#F0F7FF' : '#fff',
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                  onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : '#fff'}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: sc.bg, border: `1px solid ${sc.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  }}>
                    {NOTIF_ICONS[n.type] || '🎫'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>#{n.ticketCode}</span>
                      <span style={{ fontSize: 10.5, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{timeAgo(n.ts)}</span>
                    </div>
                    <p style={{
                      margin: '2px 0 4px', fontSize: 11.5, color: '#374151', lineHeight: 1.4,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {n.text}
                    </p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {n.status && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                          background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                        }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
                          {n.status}
                        </span>
                      )}
                      {n.unreadMsgs > 0 && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '1px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                          background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
                        }}>
                          {n.unreadMsgs} unread
                        </span>
                      )}
                    </div>
                  </div>
                  {n.unread && (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              )
            })}
          </div>

          {notifs.length > 0 && (
            <div style={{ padding: '10px 14px', borderTop: '1px solid #F1F5F9', background: '#FAFBFC' }}>
              <button
                onClick={() => { onNavigate(null); setOpen(false) }}
                style={{
                  width: '100%', padding: '8px', borderRadius: 8, border: 'none',
                  background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 12.5,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                View All Tickets →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── NotifStrip (Support Tickets Strip) ──────────────────────────────────────
const NotifStrip = ({ notifs, onNavigate, loading }) => {
  const totalUnread = notifs.filter(n => n.unread).length
  const recent = notifs.slice(0, 6)

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', marginBottom: 20, overflow: 'hidden' }}>
      <div style={{
        padding: '13px 20px', borderBottom: '1px solid #F1F5F9',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(90deg,#EFF6FF 0%,#fff 60%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
            animation: totalUnread > 0 ? 'pulse 2s ease infinite' : 'none',
          }} />
          <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0F172A' }}>Support Tickets</span>
          {totalUnread > 0 && (
            <span style={{ background: '#EF4444', color: '#fff', borderRadius: 99, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
              {totalUnread} unread
            </span>
          )}
          {!loading && notifs.length > 0 && (
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>({notifs.length} assigned)</span>
          )}
        </div>
        <button
          onClick={() => onNavigate(null)}
          style={{
            padding: '5px 12px', borderRadius: 7, border: '1px solid #BFDBFE',
            background: '#EFF6FF', color: '#2563EB', fontSize: 11.5, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.color = '#2563EB' }}
        >
          View All →
        </button>
      </div>

      {loading && (
        <div style={{ padding: '28px 20px', textAlign: 'center', color: '#9CA3AF' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5"
            style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: 8 }}>
            <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </svg>
          <p style={{ margin: 0, fontSize: 13 }}>Loading tickets…</p>
        </div>
      )}

      {!loading && recent.length === 0 && (
        <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9CA3AF' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎫</div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#374151' }}>No tickets assigned</p>
          <p style={{ margin: '4px 0 0', fontSize: 12 }}>Tickets assigned to you will appear here</p>
        </div>
      )}

      {!loading && recent.map((n, i) => {
        const sc = STATUS_COLORS[n.status] || STATUS_COLORS['in-progress']
        return (
          <div key={n.id} onClick={() => onNavigate(n)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
              borderBottom: i < recent.length - 1 ? '1px solid #F8FAFC' : 'none',
              background: n.unread ? '#F0F7FF' : 'transparent',
              cursor: 'pointer', transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = n.unread ? '#F0F7FF' : 'transparent'}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: sc.bg, border: `1px solid ${sc.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>
              {NOTIF_ICONS[n.type] || '🎫'}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', flexShrink: 0 }}>#{n.ticketCode}</span>
                <span style={{ fontSize: 12.5, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {n.text}
                </span>
              </div>
              {(n.project || n.client) && (
                <div style={{ marginTop: 2, fontSize: 11, color: '#9CA3AF' }}>
                  {[n.client, n.project].filter(Boolean).join(' · ')}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span style={{
                padding: '2px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 600,
                background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: sc.dot }} />
                {n.status}
              </span>
              {n.unreadMsgs > 0 && (
                <span style={{
                  background: '#EF4444', color: '#fff', borderRadius: 99,
                  minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                }}>
                  {n.unreadMsgs}
                </span>
              )}
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{timeAgo(n.ts)}</span>
              {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const DashBoard = () => {
  const navigate = useNavigate()

  const staff   = JSON.parse(sessionStorage.getItem('management_staff') || '{}')
  const slug    = staff?.slug || 'Management'
  const staffId = staff?._id || staff?.id || ''

  const [notifs,         setNotifs]         = useState([])
  const [ticketsLoading, setTicketsLoading] = useState(false)

  const unreadCount = notifs.filter(n => n.unread).length

  // ─── ticket → notif object ────────────────────────────────────────────────
  const ticketToNotif = useCallback((t, type = 'existing') => ({
    id:         t._id,
    type,
    ticketCode: t.ticketId || '—',
    text:       t.subject === 'Other' ? (t.customSubject || 'Support ticket') : (t.subject || 'Support ticket'),
    status:     t.status,
    project:    t.projectName || t.projectId || '',
    client:     t.clientName  || '',
    unreadMsgs: t.unreadByStaff || 0,
    unread:     (t.unreadByStaff || 0) > 0,
    ts:         t.updatedAt || t.createdAt || Date.now(),
    ticketId:   t._id,
  }), [])

  // ─── Upsert notif ─────────────────────────────────────────────────────────
  const upsertNotif = useCallback((newN) => {
    setNotifs(prev => {
      const idx = prev.findIndex(n => n.ticketId === newN.ticketId)
      let next
      if (idx !== -1) {
        next = [...prev]
        next[idx] = { ...next[idx], ...newN }
      } else {
        next = [newN, ...prev].slice(0, 50)
      }
      return next.sort((a, b) => {
        if (b.unread !== a.unread) return b.unread ? 1 : -1
        return new Date(b.ts) - new Date(a.ts)
      })
    })
  }, [])

  // ─── Initial ticket fetch ─────────────────────────────────────────────────
  useEffect(() => {
    if (!staffId) return
    setTicketsLoading(true)
    fetch(`${Url}/api/support/tickets/assigned/${staffId}`)
      .then(r => r.json())
      .then(d => {
        const list = d.tickets || []
        const sorted = [...list].sort((a, b) => {
          if ((b.unreadByStaff || 0) !== (a.unreadByStaff || 0))
            return (b.unreadByStaff || 0) - (a.unreadByStaff || 0)
          return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        })
        setNotifs(sorted.map(t => ticketToNotif(t)))
      })
      .catch(() => {})
      .finally(() => setTicketsLoading(false))
  }, [staffId, ticketToNotif])

  const markAllRead = useCallback(() =>
    setNotifs(prev => prev.map(n => ({ ...n, unread: false, unreadMsgs: 0 }))), [])

  const clearAll = useCallback(() => setNotifs([]), [])

  // ─── Socket ───────────────────────────────────────────────────────────────
  const sockRef = useRef(null)

  useEffect(() => {
    if (!staffId) return

    const s = socketIo(Url, {
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    })
    sockRef.current = s

    const joinRoom = () => {
      const token = getToken()
      if (token) s.emit('join', token)
      s.emit('joinStaff', staffId)
    }
    s.on('connect',   joinRoom)
    s.on('reconnect', joinRoom)

    // ── New ticket assigned ──────────────────────────────────────────────
    s.on('support:assigned_to_you', (d) => {
      playNotifSound()
      upsertNotif({
        id:         `new-${d._id || Date.now()}`,
        type:       'new_ticket',
        ticketCode: d.ticketCode || d.ticketId || '—',
        text:       d.subject || 'New ticket assigned',
        status:     'open',
        project:    d.projectName || '',
        client:     d.clientName  || '',
        unreadMsgs: 0,
        unread:     true,
        ts:         Date.now(),
        ticketId:   d._id,
      })
    })

    // ── Ticket updated ───────────────────────────────────────────────────
    s.on('support:ticket_updated', (u) => {
      if (u.assignedTo?.id !== staffId) {
        setNotifs(prev => prev.filter(n => n.ticketId !== u._id))
        return
      }
      playNotifSound()
      upsertNotif({
        ...ticketToNotif(u, 'status_change'),
        unread: true,
        ts:     Date.now(),
      })
    })

    // ✅ FIX: String() comparison use karo — ObjectId vs string mismatch fix
    s.on('support:new_message', (d) => {
      const tid        = d.ticketId
      const msgText    = d.message?.message    || ''
      const senderName = d.message?.senderName || 'Someone'
      const sender     = d.message?.sender     || ''
      const senderId   = d.message?.senderId   || ''

      // ✅ Apna message — bilkul ignore karo (String() se compare karo ObjectId fix ke liye)
      if (sender === 'staff' && String(senderId) === String(staffId)) return

      // ✅ Doosre staff ka message bhi dashboard par sound nahi bajaye
      if (sender === 'staff') return

      // Sirf client message par sound bajao
      playNotifSound()

      setNotifs(prev => {
        const idx = prev.findIndex(n => n.ticketId === tid)
        if (idx === -1) return prev
        const next = [...prev]
        next[idx] = {
          ...next[idx],
          unread:     true,
          unreadMsgs: (next[idx].unreadMsgs || 0) + 1,
          ts:         Date.now(),
          type:       'new_message',
          text:       msgText ? `${senderName}: ${msgText}` : next[idx].text,
        }
        // Bubble to top
        const item = next.splice(idx, 1)[0]
        return [item, ...next]
      })
    })

    // ── Server unread sync ───────────────────────────────────────────────
    s.on('support:unread_update', (d) => {
      if (!d.ticketId || d.unreadByStaff === undefined) return
      setNotifs(prev => prev.map(n =>
        n.ticketId === d.ticketId
          ? { ...n, unreadMsgs: d.unreadByStaff, unread: d.unreadByStaff > 0 }
          : n
      ))
    })

    return () => {
      s.off('connect',   joinRoom)
      s.off('reconnect', joinRoom)
      s.disconnect()
      sockRef.current = null
    }
  }, [staffId, ticketToNotif, upsertNotif])

  // ─── Navigate to ticket ───────────────────────────────────────────────────
  const handleNotifNavigate = useCallback((notif) => {
    markAllRead()
    navigate(
      `/${slug}/StaffHelpSupport`,
      notif?.ticketId ? { state: { openTicketId: notif.ticketId } } : undefined
    )
  }, [slug, navigate, markAllRead])

  // ─── Misc ─────────────────────────────────────────────────────────────────
  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const getInitials = (name) =>
    name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

  const sectionLabels = {
    dashboard:          { label: 'Dashboard',       path: `/${slug}/app` },
    orderDetail:        { label: 'Order Detail',     path: `/${slug}/new-project` },
    team:               { label: 'Team',             path: `/${slug}/staff` },
    services:           { label: 'Services',         path: `/${slug}/service` },
    client:             { label: 'Client',           path: `/${slug}/client` },
    chat:               { label: 'Chat',             path: `/${slug}/projectchat` },
    coupon:             { label: 'Coupon',           path: `/${slug}/coupon` },
    iconsFormat:        { label: 'Icons Format',     path: `/${slug}/iconsformat` },
    staffRole:          { label: 'Staff Role',       path: `/${slug}/role` },
    rating:             { label: 'Rating',           path: `/${slug}/rating` },
    blog:               { label: 'Blog',             path: `/${slug}/blog` },
    helpSupport:        { label: 'Help & Support',   path: `/${slug}/StaffHelpSupport` },
    bulkMailing:        { label: 'Bulk Mailing',     path: `/${slug}/BulkMailing` },
    managementSettings: { label: 'Mgmt Settings',    path: `/${slug}/Permissions` },
  }

  const activePermissions = []
  Object.entries(permissions).forEach(([section, value]) => {
    if (typeof value === 'object') {
      const keys = Object.entries(value).filter(([, v]) => v === true).map(([k]) => k)
      if (keys.length > 0) activePermissions.push({ section, keys })
    } else if (value === true) {
      activePermissions.push({ section, keys: ['view'] })
    }
  })

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes notifPop { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes dropIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes spin     { to{transform:rotate(360deg)} }
      `}</style>

      <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

        {/* Profile Banner */}
        <div style={{
          background: 'white', borderRadius: 14, border: '1px solid #e2e8f0',
          padding: '24px 28px', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
              background: '#eff6ff', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#1e40af',
            }}>
              {getInitials(staff?.name)}
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>{getGreeting()}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{staff?.name || 'Staff Member'}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{staff?.roleName || 'N/A'}</span>
                <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>/{staff?.slug || 'N/A'}</span>
                <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: staff?.isActive ? '#f0fdf4' : '#fef2f2', color: staff?.isActive ? '#16a34a' : '#dc2626' }}>
                  {staff?.isActive ? '● Active' : '● Inactive'}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>{today}</div>
            <NotifPanel notifs={notifs} unreadCount={unreadCount} onClearAll={clearAll} onNavigate={handleNotifNavigate} />
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Email',       value: staff?.email    || '-' },
            { label: 'Role',        value: staff?.roleName || '-' },
            { label: 'Slug',        value: `/${staff?.slug || '-'}` },
            { label: 'Permissions', value: `${activePermissions.length} modules` },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 12, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Support Tickets Strip */}
        <NotifStrip notifs={notifs} onNavigate={handleNotifNavigate} loading={ticketsLoading} />

        {/* Permissions Grid */}
        <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
          </div>
          {activePermissions.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No permissions assigned</div>
          ) : (
            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {activePermissions.map(({ section, keys }) => {
                const info      = sectionLabels[section] || { label: section, path: '#' }
                const isSupport = section === 'helpSupport'
                return (
                  <div key={section} onClick={() => navigate(info.path)}
                    style={{
                      padding: '14px 16px', borderRadius: 10, cursor: 'pointer', position: 'relative',
                      border:     `1px solid ${isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'}`,
                      background: isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.background = '#eff6ff' }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = isSupport && unreadCount > 0 ? '#BFDBFE' : '#e2e8f0'
                      e.currentTarget.style.background  = isSupport && unreadCount > 0 ? '#EFF6FF' : '#fafafa'
                    }}
                  >
                    {isSupport && unreadCount > 0 && (
                      <span style={{
                        position: 'absolute', top: 9, right: 9,
                        background: '#EF4444', color: '#fff', borderRadius: 99,
                        minWidth: 18, height: 18, fontSize: 9.5, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                      }}>
                        {unreadCount}
                      </span>
                    )}
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{info.label}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {keys.map(k => (
                        <span key={k} style={{ padding: '2px 8px', background: '#f0fdf4', color: '#16a34a', borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{k}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DashBoard












