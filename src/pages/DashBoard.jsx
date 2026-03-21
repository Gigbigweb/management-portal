import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const navigate = useNavigate()

  const staff = JSON.parse(localStorage.getItem('management_staff') || '{}')
  const permissions = JSON.parse(localStorage.getItem('management_permissions') || '{}')
  const slug = staff?.slug || 'Management'

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
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
    helpSupport:        { label: 'Help & Support',   path: `/${slug}/Help-Support` },
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

  return (
    <div style={{ padding: '24px 28px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>

      {/* ── Top Profile Banner ── */}
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
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 3, fontWeight: 500 }}>
              {getGreeting()}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              {staff?.name || 'Staff Member'}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                {staff?.roleName || 'N/A'}
              </span>
              <span style={{ padding: '3px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                /{staff?.slug || 'N/A'}
              </span>
              <span style={{
                padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: staff?.isActive ? '#f0fdf4' : '#fef2f2',
                color: staff?.isActive ? '#16a34a' : '#dc2626',
              }}>
                {staff?.isActive ? '● Active' : '● Inactive'}
              </span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>
          {today}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Email',       value: staff?.email || '-' },
          { label: 'Role',        value: staff?.roleName || '-' },
          { label: 'Slug',        value: `/${staff?.slug || '-'}` },
          { label: 'Permissions', value: `${activePermissions.length} modules` },
        ].map(s => (
          <div key={s.label} style={{
            background: 'white', borderRadius: 12, padding: '16px 20px',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {s.label}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', wordBreak: 'break-all' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Permissions Grid ── */}
      <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
        <div style={{
          padding: '16px 24px', borderBottom: '1px solid #f1f5f9',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>My Permissions</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{activePermissions.length} active modules</span>
        </div>

        {activePermissions.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            No permissions assigned
          </div>
        ) : (
          <div style={{
            padding: 20,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}>
            {activePermissions.map(({ section, keys }) => {
              const info = sectionLabels[section] || { label: section, path: '#' }
              return (
                <div key={section}
                  onClick={() => navigate(info.path)}
                  style={{
                    padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
                    border: '1px solid #e2e8f0', background: '#fafafa',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#bfdbfe'
                    e.currentTarget.style.background = '#eff6ff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.background = '#fafafa'
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
                    {info.label}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {keys.map(k => (
                      <span key={k} style={{
                        padding: '2px 8px', background: '#f0fdf4', color: '#16a34a',
                        borderRadius: 20, fontSize: 10, fontWeight: 600,
                      }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashBoard