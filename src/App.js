import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useContext, useEffect } from 'react';
import {useDispatch} from 'react-redux'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import "./App.css" 
import {clientdata} from './redux/slice/client'
import { packagedata } from './redux/slice/package'
// import { staffdata } from './redux/slice/staff'
import { categorydata } from './redux/slice/category'
import { roledata } from './redux/slice/role'
import { servicedata } from './redux/slice/service'
import { projectdata } from './redux/slice/project';
import { teamdata } from './redux/slice/team';
import './style.css'
import { ratingdata } from './redux/slice/rating';
import { blogdata } from './redux/slice/blog';

import { SocketProvider, useSocket} from './contexts/SocketContext';
import { staffdata } from './redux/slice/staff';


// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch()
  useEffect(()=>{ 
    dispatch(clientdata()); 
    dispatch(packagedata())  
    dispatch(staffdata())  
    dispatch(categorydata())  
    dispatch(roledata())  
    dispatch(servicedata())  
    dispatch(projectdata())  
    dispatch(teamdata())  
    dispatch(ratingdata())  
    dispatch(blogdata())  
  }, []) 

  return (
    <>
     <HelmetProvider>
       <BrowserRouter>
         <ThemeProvider>
         {/* <SocketProvider> */}
          <ScrollToTop />
          <StyledChart />
          <Router />
          {/* </SocketProvider> */}
         </ThemeProvider>
       </BrowserRouter>
     </HelmetProvider>
    </>
  );
}
