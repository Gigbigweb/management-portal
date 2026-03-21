import React, { useState } from 'react'

// ─────────────────────────────────────────────────────────────────
// PERMISSION STRUCTURE — sidebar se liya gaya
// ─────────────────────────────────────────────────────────────────
const PERMISSION_GROUPS = [
  {
    group: 'Dashboard',
    key: 'dashboard',
    items: [
      { label: 'View Dashboard', key: 'view' },
    ],
  },
  {
    group: 'Order Detail',
    key: 'orderDetail',
    items: [
      { label: 'New Projects',      key: 'newProjects' },
      { label: 'Running Projects',  key: 'runningProjects' },
      { label: 'Complete Projects', key: 'completeProjects' },
      { label: 'Refund Project',    key: 'refundProject' },
    ],
  },
  {
    group: 'Team',
    key: 'team',
    items: [
      { label: 'Staff',       key: 'staff' },
      { label: 'Freelancers', key: 'freelancers' },
    ],
  },
  {
    group: 'Services',
    key: 'services',
    items: [
      { label: 'Category',        key: 'category' },
      { label: 'Subcategory',     key: 'subcategory' },
      { label: 'Package',         key: 'package' },
      { label: 'Project',         key: 'project' },
      { label: 'Combo Services',  key: 'comboServices' },
    ],
  },
  {
    group: 'Client',
    key: 'client',
    items: [
      { label: 'View Client', key: 'view' },
    ],
  },
  {
    group: 'Chat',
    key: 'chat',
    items: [
      { label: 'View Chat', key: 'view' },
    ],
  },
  {
    group: 'Coupon',
    key: 'coupon',
    items: [
      { label: 'View Coupon', key: 'view' },
    ],
  },
  {
    group: 'Icons Format',
    key: 'iconsFormat',
    items: [
      { label: 'Icons Format',      key: 'iconsFormat' },
      { label: 'Bulk Email Images', key: 'bulkEmailImages' },
    ],
  },
  {
    group: 'Staff Role',
    key: 'staffRole',
    items: [
      { label: 'View Staff Role', key: 'view' },
    ],
  },
  {
    group: 'Rating',
    key: 'rating',
    items: [
      { label: 'View Rating', key: 'view' },
    ],
  },
  {
    group: 'Blog',
    key: 'blog',
    items: [
      { label: 'View Blog', key: 'view' },
    ],
  },
  {
    group: 'Help Support',
    key: 'helpSupport',
    items: [
      { label: 'View Help Support', key: 'view' },
    ],
  },
  {
    group: 'Bulk Mailing',
    key: 'bulkMailing',
    items: [
      { label: 'View Bulk Mailing', key: 'view' },
    ],
  },
  {
    group: 'Management Settings',
    key: 'managementSettings',
    items: [
      { label: 'Add Staff',   key: 'addStaff' },
      { label: 'Permissions', key: 'permissions' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────
// Build initial state — sab false se shuru
// ─────────────────────────────────────────────────────────────────
const buildInitialState = () => {
  const state = {}
  PERMISSION_GROUPS.forEach(g => {
    state[g.key] = {}
    g.items.forEach(item => {
      state[g.key][item.key] = false
    })
  })
  return state
}

// ─────────────────────────────────────────────────────────────────
// Build payload — sirf true wale permissions
// ─────────────────────────────────────────────────────────────────
const buildPayload = (perms) => {
  const payload = {}
  Object.entries(perms).forEach(([groupKey, items]) => {
    payload[groupKey] = { ...items }
  })
  return payload
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
const Permissions = () => {
  const [permissions, setPermissions] = useState(buildInitialState)

  // ── Toggle single item ────────────────────────────────────────
  const toggleItem = (groupKey, itemKey) => {
    setPermissions(prev => ({
      ...prev,
      [groupKey]: {
        ...prev[groupKey],
        [itemKey]: !prev[groupKey][itemKey],
      },
    }))
  }

  // ── Toggle entire group (select all / deselect all) ───────────
  const toggleGroup = (groupKey, items) => {
    const allChecked = items.every(item => permissions[groupKey][item.key])
    const updated = {}
    items.forEach(item => { updated[item.key] = !allChecked })
    setPermissions(prev => ({ ...prev, [groupKey]: updated }))
  }

  // ── Select All / Deselect All ─────────────────────────────────
  const selectAll = (val) => {
    const state = {}
    PERMISSION_GROUPS.forEach(g => {
      state[g.key] = {}
      g.items.forEach(item => { state[g.key][item.key] = val })
    })
    setPermissions(state)
  }

  const isGroupChecked  = (groupKey, items) => items.every(i  => permissions[groupKey][i.key])
  const isGroupPartial  = (groupKey, items) => items.some(i   => permissions[groupKey][i.key]) && !isGroupChecked(groupKey, items)
  const totalSelected   = () => Object.values(permissions).flatMap(g => Object.values(g)).filter(Boolean).length
  const totalPermissions = PERMISSION_GROUPS.reduce((acc, g) => acc + g.items.length, 0)

  const handleSubmit = () => {
    const payload = buildPayload(permissions)
    console.log('Permissions Payload:', JSON.stringify(payload, null, 2))
    // axios.post(`${Url}/api/permissions/save`, { permissions: payload })
    alert('Payload logged to console!')
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Permissions</h2>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b' }}>
          Manage access control for staff roles
        </p>
      </div>

      {/* Stats + Bulk Actions */}
      <div style={{ background: 'white', borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, boxShadow: '0 1px 4px rgba(0,0,0,.06)', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: 13, color: '#64748b' }}>
          <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 16 }}>{totalSelected()}</span>
          <span style={{ margin: '0 4px' }}>/</span>
          <span>{totalPermissions} permissions selected</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => selectAll(true)}
            style={{ padding: '7px 16px', fontSize: 12, fontWeight: 600, background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: 7, cursor: 'pointer' }}>
            ✓ Select All
          </button>
          <button onClick={() => selectAll(false)}
            style={{ padding: '7px 16px', fontSize: 12, fontWeight: 600, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 7, cursor: 'pointer' }}>
            ✕ Deselect All
          </button>
          <button onClick={handleSubmit}
            style={{ padding: '7px 20px', fontSize: 12, fontWeight: 700, background: '#1e40af', color: 'white', border: 'none', borderRadius: 7, cursor: 'pointer' }}>
            💾 Save Permissions
          </button>
        </div>
      </div>

      {/* Permission Groups Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {PERMISSION_GROUPS.map(({ group, key: groupKey, items }) => {
          const allChecked     = isGroupChecked(groupKey, items)
          const partialChecked = isGroupPartial(groupKey, items)

          return (
            <div key={groupKey} style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>

              {/* Group Header */}
              <div style={{ padding: '12px 16px', background: allChecked ? '#eff6ff' : partialChecked ? '#fefce8' : '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                onClick={() => toggleGroup(groupKey, items)}>
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={el => { if (el) el.indeterminate = partialChecked }}
                  onChange={() => toggleGroup(groupKey, items)}
                  onClick={e => e.stopPropagation()}
                  style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#1e40af' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', flex: 1 }}>{group}</span>
                <span style={{ fontSize: 11, color: allChecked ? '#1e40af' : partialChecked ? '#92400e' : '#94a3b8', fontWeight: 600 }}>
                  {items.filter(i => permissions[groupKey][i.key]).length}/{items.length}
                </span>
              </div>

              {/* Items */}
              <div style={{ padding: '8px 16px 12px' }}>
                {items.map(({ label, key: itemKey }) => (
                  <label key={itemKey}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}>
                    <input
                      type="checkbox"
                      checked={permissions[groupKey][itemKey]}
                      onChange={() => toggleItem(groupKey, itemKey)}
                      style={{ width: 15, height: 15, cursor: 'pointer', accentColor: '#1e40af' }}
                    />
                    <span style={{ fontSize: 13, color: permissions[groupKey][itemKey] ? '#1e293b' : '#64748b', fontWeight: permissions[groupKey][itemKey] ? 500 : 400 }}>
                      {label}
                    </span>
                    {permissions[groupKey][itemKey] && (
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#16a34a', fontWeight: 700 }}>✓</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Save */}
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleSubmit}
          style={{ padding: '10px 32px', fontSize: 14, fontWeight: 700, background: '#1e40af', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          💾 Save Permissions
        </button>
      </div>

      {/* Payload Preview (dev only — hata sakte ho) */}
      <details style={{ marginTop: 24 }}>
        <summary style={{ fontSize: 12, color: '#94a3b8', cursor: 'pointer', userSelect: 'none' }}>🔍 Preview Payload (dev)</summary>
        <pre style={{ marginTop: 8, padding: 16, background: '#0f172a', color: '#7dd3fc', borderRadius: 10, fontSize: 11, overflowX: 'auto', lineHeight: 1.6 }}>
          {JSON.stringify(buildPayload(permissions), null, 2)}
        </pre>
      </details>

    </div>
  )
}

export default Permissions