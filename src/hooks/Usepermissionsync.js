import { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../url/url';

const usePermissionSync = () => {
  const [permissionsReady, setPermissionsReady] = useState(false);

  useEffect(() => {
    const sync = async () => {
      const token  = sessionStorage.getItem('management_token');
      const staff  = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
      const roleId = staff?.roleId;


      if (!token || !roleId) {
        sessionStorage.removeItem('management_permissions');
        setPermissionsReady(true);
        return;
      }
      

      try {
        const res = await axios.get(`${Url}/permissions/true/${roleId}`);
        sessionStorage.setItem('management_permissions', JSON.stringify(res.data?.data || {}));
      } catch (err) {
        console.warn('Permission sync failed:', err);
      } finally {
        setPermissionsReady(true);
      }
    };

    sync();
  }, []);

  return permissionsReady;
};

export default usePermissionSync;