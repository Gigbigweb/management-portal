import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Url } from 'src/url/url';

const SYNC_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes

/**
 * Fetches latest permissions from server and updates sessionStorage.
 * Call this hook once in App.js (inside BrowserRouter so useLocation works).
 *
 * Triggers:
 *  - On every route change
 *  - Every 5 minutes (configurable via SYNC_INTERVAL_MS)
 */
const usePermissionSync = () => {
  const location = useLocation();

  const syncPermissions = useCallback(async () => {
    try {
      const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
      const roleId = staff?.roleId;

      // Not logged in — nothing to sync
      if (!roleId) return;

      const res = await axios.get(`${Url}/permissions/true/${roleId}`);
      const permissions = res.data?.data || {};
      sessionStorage.setItem('management_permissions', JSON.stringify(permissions));
    } catch (err) {
      // Silently fail — stale permissions remain, user is not disrupted
      console.warn('Permission sync failed:', err?.response?.status ?? err.message);
    }
  }, []);

  // Sync on every route change
  useEffect(() => {
    syncPermissions();
  }, [location.pathname, syncPermissions]);

  // Sync on interval
  useEffect(() => {
    const timer = setInterval(syncPermissions, SYNC_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [syncPermissions]);
};

export default usePermissionSync;