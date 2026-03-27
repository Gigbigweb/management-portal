// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { useContext, useEffect } from 'react';
// import {useDispatch} from 'react-redux'
// // routes
// import Router from './routes';
// // theme
// import ThemeProvider from './theme';
// // components
// import { StyledChart } from './components/chart';
// import ScrollToTop from './components/scroll-to-top';
// import "./App.css" 
// import {clientdata} from './redux/slice/client'
// import { packagedata } from './redux/slice/package'
// // import { staffdata } from './redux/slice/staff'
// import { categorydata } from './redux/slice/category'
// import { roledata } from './redux/slice/role'
// import { servicedata } from './redux/slice/service'
// import { projectdata } from './redux/slice/project';
// import { teamdata } from './redux/slice/team';
// import './style.css'
// import { ratingdata } from './redux/slice/rating';
// import { blogdata } from './redux/slice/blog';

// import { SocketProvider, useSocket} from './contexts/SocketContext';
// import { staffdata } from './redux/slice/staff';


// // ----------------------------------------------------------------------

// export default function App() {
//   const dispatch = useDispatch()
//   useEffect(()=>{ 
//     dispatch(clientdata()); 
//     dispatch(packagedata())  
//     dispatch(staffdata())  
//     dispatch(categorydata())  
//     dispatch(roledata())  
//     dispatch(servicedata())  
//     dispatch(projectdata())  
//     dispatch(teamdata())  
//     dispatch(ratingdata())  
//     dispatch(blogdata())  
//   }, []) 

//   return (
//     <>
//      <HelmetProvider>
//        <BrowserRouter>
//          <ThemeProvider>
//          {/* <SocketProvider> */}
//           <ScrollToTop />
//           <StyledChart />
//           <Router />
//           {/* </SocketProvider> */}
//          </ThemeProvider>
//        </BrowserRouter>
//      </HelmetProvider>
//     </>
//   );
// }













// // App.js

// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import Router from './routes';
// import ThemeProvider from './theme';
// import { StyledChart } from './components/chart';
// import ScrollToTop from './components/scroll-to-top';
// import "./App.css";
// import { clientdata } from './redux/slice/client';
// import { packagedata } from './redux/slice/package';
// import { categorydata } from './redux/slice/category';
// import { roledata } from './redux/slice/role';
// import { servicedata } from './redux/slice/service';
// import { projectdata } from './redux/slice/project';
// import { teamdata } from './redux/slice/team';
// import './style.css';
// import { ratingdata } from './redux/slice/rating';
// import { blogdata } from './redux/slice/blog';
// import { staffdata } from './redux/slice/staff';
// import { Url } from './url/url';

// export default function App() {
//   const dispatch = useDispatch();
//   // ✅ Permissions ko state mein rakho — update hone pe app re-render hoga
//   const [permissionsReady, setPermissionsReady] = useState(false);

//   // ✅ Refresh pe permissions fresh fetch karo
//   useEffect(() => {
//     const syncPermissions = async () => {
//       const token  = sessionStorage.getItem('management_token');
//       const staff  = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
//       const roleId = staff?.roleId;

//       if (!token || !roleId) {
//         // Logged out hai — permissions clear karo aur ready mark karo
//         sessionStorage.removeItem('management_permissions');
//         setPermissionsReady(true);
//         return;
//       }

//       try {
//         const permRes     = await axios.get(`${Url}/permissions/true/${roleId}`);
//         const permissions = permRes.data?.data || {};
//         // ✅ sessionStorage update + state trigger → app re-render
//         sessionStorage.setItem('management_permissions', JSON.stringify(permissions));
//       } catch (err) {
//         console.warn('⚠️ Permission sync failed:', err);
//       } finally {
//         // API success ya fail dono cases mein app render hone do
//         setPermissionsReady(true);
//       }
//     };

//     syncPermissions();
//   }, []);

//   useEffect(() => {
//     dispatch(clientdata());
//     dispatch(packagedata());
//     dispatch(staffdata());
//     dispatch(categorydata());
//     dispatch(roledata());
//     dispatch(servicedata());
//     dispatch(projectdata());
//     dispatch(teamdata());
//     dispatch(ratingdata());
//     dispatch(blogdata());
//   }, []);

//   // ✅ Jab tak permissions fetch na ho, blank screen ya loader dikhao
//   // Yeh ensure karta hai ki koi bhi page permissions ke bina render na ho
//   if (!permissionsReady) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         fontSize: '18px',
//         color: '#64748b'
//       }}>
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <>
//       <HelmetProvider>
//         <BrowserRouter>
//           <ThemeProvider>
//             <ScrollToTop />
//             <StyledChart />
//             <Router />
//           </ThemeProvider>
//         </BrowserRouter>
//       </HelmetProvider>
//     </>
//   );
// }












import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import "./App.css";
import { clientdata } from './redux/slice/client';
import { packagedata } from './redux/slice/package';
import { categorydata } from './redux/slice/category';
import { roledata } from './redux/slice/role';
import { servicedata } from './redux/slice/service';
import { projectdata } from './redux/slice/project';
import { teamdata } from './redux/slice/team';
import './style.css';
import { ratingdata } from './redux/slice/rating';
import { blogdata } from './redux/slice/blog';
import { staffdata } from './redux/slice/staff';
import { Url } from './url/url';
import usePermissionSync from './hooks/use-permission-sync';

//                                   




export default function App() {
  const dispatch = useDispatch();
  const permissionsReady = usePermissionSync(); // ✅ bas ek line

  useEffect(() => {
    dispatch(clientdata());
    dispatch(packagedata());
    dispatch(staffdata());
    dispatch(categorydata());
    dispatch(roledata());
    dispatch(servicedata());
    dispatch(projectdata());
    dispatch(teamdata());
    dispatch(ratingdata());
    dispatch(blogdata());
  }, []);

  if (!permissionsReady) return <div>Loading...</div>;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}