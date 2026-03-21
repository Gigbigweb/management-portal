// import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// // components
// import Iconify from '../components/iconify';
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// // ----------------------------------------------------------------------

// export default function DashboardAppPage() {
//   const theme = useTheme();

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard | Minimal UI </title>
//       </Helmet>

//       <Container maxWidth="xl">
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Hi, Welcome back
//         </Typography>

//         <Grid container spacing={3}>
//           {/* <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="New Project" total={714000} icon={'ant-design:android-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Running Project" total={1352831} color="info" icon={'ant-design:apple-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Completed Projects" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Total Services" total={234} color="error" icon={'ant-design:bug-filled'} />
//           </Grid> */}
// {/* 
// <Grid container spacing={3}>
//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="New Project" 
//       total={10} 
//       icon={'ant-design:plus-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Running Project" 
//       total={20} 
//       color="info" 
//       icon={'ant-design:play-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Completed Projects" 
//       total={50} 
//       color="warning" 
//       icon={'ant-design:check-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Services" 
//       total={80} 
//       color="error" 
//       icon={'ant-design:appstore-filled'} 
//     />
//   </Grid>
//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Staff" 
//       total={10} 
//       icon={'ant-design:plus-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Inhouse staff" 
//       total={20} 
//       color="info" 
//       icon={'ant-design:play-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Freelancers" 
//       total={50} 
//       color="warning" 
//       icon={'ant-design:check-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Category" 
//       total={80} 
//       color="error" 
//       icon={'ant-design:appstore-filled'} 
//     />
//   </Grid>
// </Grid> */}

// <Grid container spacing={3}>
//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="New Project" 
//       total={10} 
//       icon={'ant-design:rocket-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Running Project" 
//       total={20} 
//       color="info" 
//       icon={'ant-design:thunderbolt-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Completed Projects" 
//       total={50} 
//       color="success" 
//       icon={'ant-design:check-circle-filled'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Services" 
//       total={80} 
//       color="warning" 
//       icon={'ant-design:appstore-filled'} 
//     />
//   </Grid>
//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Staff" 
//       total={10} 
//       icon={'ant-design:team-outlined'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Inhouse staff" 
//       total={20} 
//       color="info" 
//       icon={'ant-design:user-outlined'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Freelancers" 
//       total={50} 
//       color="secondary" 
//       icon={'ant-design:usergroup-add-outlined'} 
//     />
//   </Grid>

//   <Grid item xs={12} sm={6} md={3}>
//     <AppWidgetSummary 
//       title="Total Category" 
//       total={80} 
//       color="error" 
//       icon={'ant-design:tags-filled'} 
//     />
//   </Grid>
// </Grid>




//           <Grid item xs={12} md={6} lg={8}>
//             <AppWebsiteVisits
//               title="Website Visits"
//               subheader="(+43%) than last year"
//               chartLabels={[
//                 '01/01/2003',
//                 '02/01/2003',
//                 '03/01/2003',
//                 '04/01/2003',
//                 '05/01/2003',
//                 '06/01/2003',
//                 '07/01/2003',
//                 '08/01/2003',
//                 '09/01/2003',
//                 '10/01/2003',
//                 '11/01/2003',
//               ]}
//               chartData={[
//                 {
//                   name: 'Team A',
//                   type: 'column',
//                   fill: 'solid',
//                   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                 },
//                 {
//                   name: 'Team B',
//                   type: 'area',
//                   fill: 'gradient',
//                   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                 },
//                 {
//                   name: 'Team C',
//                   type: 'line',
//                   fill: 'solid',
//                   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentVisits
//               title="Current Visits"
//               chartData={[
//                 { label: 'America', value: 4344 },
//                 { label: 'Asia', value: 5435 },
//                 { label: 'Europe', value: 1443 },
//                 { label: 'Africa', value: 4443 },
//               ]}
//               chartColors={[
//                 theme.palette.primary.main,
//                 theme.palette.info.main,
//                 theme.palette.warning.main,
//                 theme.palette.error.main,
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppConversionRates
//               title="Conversion Rates"
//               subheader="(+43%) than last year"
//               chartData={[
//                 { label: 'Italy', value: 400 },
//                 { label: 'Japan', value: 430 },
//                 { label: 'China', value: 448 },
//                 { label: 'Canada', value: 470 },
//                 { label: 'France', value: 540 },
//                 { label: 'Germany', value: 580 },
//                 { label: 'South Korea', value: 690 },
//                 { label: 'Netherlands', value: 1100 },
//                 { label: 'United States', value: 1200 },
//                 { label: 'United Kingdom', value: 1380 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppCurrentSubject
//               title="Current Subject"
//               chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
//               chartData={[
//                 { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
//                 { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
//                 { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
//               ]}
//               chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 {
//                   name: 'FaceBook',
//                   value: 323234,
//                   icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
//                 },
//                 {
//                   name: 'Google',
//                   value: 341212,
//                   icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
//                 },
//                 {
//                   name: 'Linkedin',
//                   value: 411213,
//                   icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
//                 },
//                 {
//                   name: 'Twitter',
//                   value: 443232,
//                   icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={6} lg={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }







// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect } from 'react';
// import { faker } from '@faker-js/faker';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// // components
// import Iconify from '../components/iconify';
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// // ----------------------------------------------------------------------

// export default function DashboardAppPage() {
//   const theme = useTheme();
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     pageContainer: {
//       padding: '1.5rem',
//       maxWidth: '100%',
//     },
//     header: {
//       marginBottom: '1.5rem',
//       paddingBottom: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//     },
//     greeting: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       marginBottom: '0.25rem',
//     },
//     subtitle: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '0.5rem',
//     },
//     sectionTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#334155',
//       marginBottom: '1rem',
//       marginTop: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f8fafc;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb:hover {
//       background: #94a3b8;
//     }

//     .MuiCard-root {
//       border-radius: 8px !important;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
//       border: 1px solid #e2e8f0 !important;
//       transition: all 0.2s ease !important;
//     }

//     .MuiCard-root:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
//     }

//     .stat-card {
//       background: white;
//       border-radius: 8px;
//       padding: 1rem;
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       transition: all 0.2s ease;
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       height: 100%;
//     }

//     .stat-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .stat-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//       color: white;
//     }

//     .stat-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .stat-title {
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .stat-value {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #1e293b;
//       margin: 0;
//       line-height: 1;
//     }

//     .section-icon {
//       width: 20px;
//       height: 20px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #64748b;
//     }
//   `;

//   const statsData = [
//     {
//       title: "New Projects",
//       total: 10,
//       icon: "mdi:rocket-launch",
//       bgColor: "#667eea",
//     },
//     {
//       title: "Running Projects",
//       total: 20,
//       icon: "mdi:lightning-bolt",
//       bgColor: "#3b82f6",
//     },
//     {
//       title: "Completed",
//       total: 50,
//       icon: "mdi:check-circle",
//       bgColor: "#10b981",
//     },
//     {
//       title: "Services",
//       total: 80,
//       icon: "mdi:grid",
//       bgColor: "#f59e0b",
//     },
//     {
//       title: "Total Staff",
//       total: 10,
//       icon: "mdi:account-group",
//       bgColor: "#8b5cf6",
//     },
//     {
//       title: "Inhouse Staff",
//       total: 20,
//       icon: "mdi:account-tie",
//       bgColor: "#14b8a6",
//     },
//     {
//       title: "Freelancers",
//       total: 50,
//       icon: "mdi:briefcase-account",
//       bgColor: "#ec4899",
//     },
//     {
//       title: "Categories",
//       total: 80,
//       icon: "mdi:tag-multiple",
//       bgColor: "#ef4444",
//     },
//   ];

//   const fetchdata = async()=>{
//     const res = await axios.get(`${Url}/dashboardStaics/GetCardsstats`)
//     console.log("res",res)
//   }


//   useEffect(()=>{
// fetchdata()
//   },[])

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet>
//         <title>Dashboard | Admin Panel</title>
//       </Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>
//               {currentTime.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//             <span>
//               {currentTime.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', 
//                 minute: '2-digit'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((stat, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: stat.bgColor }}>
//                   <Iconify icon={stat.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{stat.title}</p>
//                   <h3 className="stat-value">{stat.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-line" width={18} />
//           </span>
//           Analytics
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppWebsiteVisits
//               title="Website Visits"
//               subheader="(+43%) than last year"
//               chartLabels={[
//                 '01/01/2003',
//                 '02/01/2003',
//                 '03/01/2003',
//                 '04/01/2003',
//                 '05/01/2003',
//                 '06/01/2003',
//                 '07/01/2003',
//                 '08/01/2003',
//                 '09/01/2003',
//                 '10/01/2003',
//                 '11/01/2003',
//               ]}
//               chartData={[
//                 {
//                   name: 'Team A',
//                   type: 'column',
//                   fill: 'solid',
//                   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                 },
//                 {
//                   name: 'Team B',
//                   type: 'area',
//                   fill: 'gradient',
//                   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                 },
//                 {
//                   name: 'Team C',
//                   type: 'line',
//                   fill: 'solid',
//                   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppCurrentVisits
//               title="Current Visits"
//               chartData={[
//                 { label: 'America', value: 4344 },
//                 { label: 'Asia', value: 5435 },
//                 { label: 'Europe', value: 1443 },
//                 { label: 'Africa', value: 4443 },
//               ]}
//               chartColors={[
//                 theme.palette.primary.main,
//                 theme.palette.info.main,
//                 theme.palette.warning.main,
//                 theme.palette.error.main,
//               ]}
//             />
//           </Grid>
//         </Grid>

//         {/* Conversions */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:trending-up" width={18} />
//           </span>
//           Conversion Rates
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppConversionRates
//               title="Conversion Rates"
//               subheader="(+43%) than last year"
//               chartData={[
//                 { label: 'Italy', value: 400 },
//                 { label: 'Japan', value: 430 },
//                 { label: 'China', value: 448 },
//                 { label: 'Canada', value: 470 },
//                 { label: 'France', value: 540 },
//                 { label: 'Germany', value: 580 },
//                 { label: 'South Korea', value: 690 },
//                 { label: 'Netherlands', value: 1100 },
//                 { label: 'United States', value: 1200 },
//                 { label: 'United Kingdom', value: 1380 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppCurrentSubject
//               title="Current Subject"
//               chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
//               chartData={[
//                 { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
//                 { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
//                 { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
//               ]}
//               chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
//             />
//           </Grid>
//         </Grid>

//         {/* Updates */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:newspaper-variant" width={18} />
//           </span>
//           Recent Updates
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>
//         </Grid>

//         {/* Traffic & Tasks */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-bar" width={18} />
//           </span>
//           Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 {
//                   name: 'FaceBook',
//                   value: 323234,
//                   icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
//                 },
//                 {
//                   name: 'Google',
//                   value: 341212,
//                   icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
//                 },
//                 {
//                   name: 'Linkedin',
//                   value: 411213,
//                   icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
//                 },
//                 {
//                   name: 'Twitter',
//                   value: 443232,
//                   icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }





// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect } from 'react';
// import { faker } from '@faker-js/faker';
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography, CircularProgress, Alert, Skeleton } from '@mui/material';
// import Iconify from '../components/iconify';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const theme = useTheme();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [analyticsPeriod, setAnalyticsPeriod] = useState('15days');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     pageContainer: {
//       padding: '1.5rem',
//       maxWidth: '100%',
//     },
//     header: {
//       marginBottom: '1.5rem',
//       paddingBottom: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//     },
//     greeting: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       marginBottom: '0.25rem',
//     },
//     subtitle: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '0.5rem',
//     },
//     sectionTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#334155',
//       marginBottom: '1rem',
//       marginTop: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//     loadingContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '400px',
//       flexDirection: 'column',
//       gap: '1rem',
//     },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f8fafc;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb:hover {
//       background: #94a3b8;
//     }

//     .MuiCard-root {
//       border-radius: 8px !important;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
//       border: 1px solid #e2e8f0 !important;
//       transition: all 0.2s ease !important;
//     }

//     .MuiCard-root:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
//     }

//     .stat-card {
//       background: white;
//       border-radius: 8px;
//       padding: 1rem;
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       transition: all 0.2s ease;
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       height: 100%;
//     }

//     .stat-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .stat-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//       color: white;
//     }

//     .stat-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .stat-title {
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .stat-value {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #1e293b;
//       margin: 0;
//       line-height: 1;
//     }

//     .section-icon {
//       width: 20px;
//       height: 20px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #64748b;
//     }
//   `;

//   const fetchdata = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [statsRes, analyticsRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(`${Url}/dashboardStaics/GetAnalytics?period=${analyticsPeriod}`)
//       ]);
      
//       if (statsRes.data.success && statsRes.data.data) {
//         setDashboardData(statsRes.data.data);
//       } else {
//         setError('Failed to fetch dashboard data');
//       }
      
//       if (analyticsRes.data.success && analyticsRes.data.data) {
//         setAnalyticsData(analyticsRes.data.data);
//         console.log("✅ Analytics Data:", analyticsRes.data.data);
//       }
      
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       setError(err.message || 'An error occurred while fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchdata();
//   }, [analyticsPeriod]);

//   const getStatsData = () => {
//     if (!dashboardData) return [];

//     const { projects, services, staff, freelancers, categories } = dashboardData;

//     return [
//       {
//         title: "New Projects",
//         total: projects?.new || 0,
//         icon: "mdi:rocket-launch",
//         bgColor: "#667eea",
//       },
//       {
//         title: "Running Projects",
//         total: projects?.running || 0,
//         icon: "mdi:lightning-bolt",
//         bgColor: "#3b82f6",
//       },
//       {
//         title: "Completed",
//         total: projects?.completed || 0,
//         icon: "mdi:check-circle",
//         bgColor: "#10b981",
//       },
//       {
//         title: "Total Projects",
//         total: projects?.total || 0,
//         icon: "mdi:briefcase",
//         bgColor: "#8b5cf6",
//       },
//       {
//         title: "Services",
//         total: services || 0,
//         icon: "mdi:grid",
//         bgColor: "#f59e0b",
//       },
//       {
//         title: "Total Staff",
//         total: staff?.total || 0,
//         icon: "mdi:account-group",
//         bgColor: "#14b8a6",
//       },
//       {
//         title: "Inhouse Staff",
//         total: staff?.inhouse || 0,
//         icon: "mdi:account-tie",
//         bgColor: "#ec4899",
//       },
//       {
//         title: "Freelancers",
//         total: freelancers || 0,
//         icon: "mdi:briefcase-account",
//         bgColor: "#ef4444",
//       },
//       {
//         title: "Categories",
//         total: categories || 0,
//         icon: "mdi:tag-multiple",
//         bgColor: "#06b6d4",
//       },
//     ];
//   };

//   const LoadingState = () => (
//     <Container maxWidth="xl" sx={{ py: 2 }}>
//       <div style={styles.header}>
//         <Skeleton variant="text" width={250} height={40} />
//         <Skeleton variant="text" width={200} height={20} sx={{ mt: 1 }} />
//       </div>

//       <Grid container spacing={1.5} sx={{ mb: 2 }}>
//         {[...Array(8)].map((_, index) => (
//           <Grid item xs={6} sm={4} md={3} key={index}>
//             <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
//           </Grid>
//         ))}
//       </Grid>

//       <div style={styles.loadingContainer}>
//         <CircularProgress size={60} />
//         <Typography variant="body1" color="text.secondary">
//           Loading dashboard data...
//         </Typography>
//       </div>
//     </Container>
//   );

//   const ErrorState = () => (
//     <Container maxWidth="xl" sx={{ py: 2 }}>
//       <Alert 
//         severity="error" 
//         sx={{ mb: 3 }}
//         action={
//           <button 
//             onClick={fetchdata}
//             style={{
//               background: 'transparent',
//               border: 'none',
//               color: '#d32f2f',
//               cursor: 'pointer',
//               textDecoration: 'underline',
//               fontSize: '0.875rem',
//             }}
//           >
//             Retry
//           </button>
//         }
//       >
//         <strong>Error loading dashboard:</strong> {error}
//       </Alert>
//     </Container>
//   );

//   if (loading) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <LoadingState />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <ErrorState />
//       </>
//     );
//   }

//   const statsData = getStatsData();

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet>
//         <title>Dashboard | Admin Panel</title>
//       </Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>
//               {currentTime.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//             <span>
//               {currentTime.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', 
//                 minute: '2-digit'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((stat, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: stat.bgColor }}>
//                   <Iconify icon={stat.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{stat.title}</p>
//                   <h3 className="stat-value">{stat.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics Header */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '1rem',
//           marginTop: '1.5rem'
//         }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon">
//               <Iconify icon="mdi:chart-line" width={18} />
//             </span>
//             Purchasing Analytics
//           </Typography>
          
//           <div style={{ display: 'flex', gap: '0.5rem' }}>
//             <button
//               onClick={() => setAnalyticsPeriod('15days')}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: analyticsPeriod === '15days' ? '#3b82f6' : 'white',
//                 color: analyticsPeriod === '15days' ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//               }}
//             >
//               15 Days
//             </button>
//             <button
//               onClick={() => setAnalyticsPeriod('1month')}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: analyticsPeriod === '1month' ? '#3b82f6' : 'white',
//                 color: analyticsPeriod === '1month' ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//               }}
//             >
//               1 Month
//             </button>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#3b82f6' }}>
//                 <Iconify icon="mdi:cart-check" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Services Bought</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalServicesBought || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#ef4444' }}>
//                 <Iconify icon="mdi:cash-refund" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refunds</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalRefunds || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#10b981' }}>
//                 <Iconify icon="mdi:cash-multiple" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Total Revenue</p>
//                 <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>
//                   ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#f59e0b' }}>
//                 <Iconify icon="mdi:percent" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refund Rate</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.refundRate || 0}%</h3>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* CUSTOM CHARTS */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               {/* Header */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                     Purchasing Report
//                   </h3>
//                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
//                     Bought: {analyticsData?.summary?.totalServicesBought || 0} | 
//                     Refunded: {analyticsData?.summary?.totalRefunds || 0} | 
//                     Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                   </p>
//                 </div>
//                 <div style={{
//                   background: '#3b82f6',
//                   padding: '0.75rem 1.25rem',
//                   borderRadius: '8px',
//                   color: 'white',
//                   textAlign: 'center',
//                   minWidth: '140px',
//                 }}>
//                   <div style={{ fontSize: '1rem', fontWeight: '600' }}>
//                     {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                   </div>
//                   <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
//                     Total: {analyticsData?.summary?.totalServicesBought || 0}
//                   </div>
//                 </div>
//               </div>

//               {/* CUSTOM BAR CHART */}
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '6px', 
//                   minWidth: '900px',
//                   height: '300px',
//                   alignItems: 'flex-end',
//                   borderBottom: '2px solid #e2e8f0',
//                   paddingBottom: '10px',
//                   paddingTop: '30px'
//                 }}>
//                   {analyticsData?.chartLabels?.map((label, index) => {
//                     const bought = analyticsData?.chartData?.servicesBought[index] || 0;
//                     const refunds = analyticsData?.chartData?.refunds[index] || 0;
//                     const maxValue = Math.max(...(analyticsData?.chartData?.servicesBought || [0]), ...(analyticsData?.chartData?.refunds || [0]), 1);
//                     const boughtHeight = (bought / maxValue) * 240;
//                     const refundHeight = (refunds / maxValue) * 240;
//                     const isToday = index === (analyticsData?.chartLabels?.length - 1);
                    
//                     return (
//                       <div key={index} style={{ 
//                         flex: 1, 
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         gap: '4px',
//                       }}>
//                         {/* Bars */}
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           {/* Services Bought Bar */}
//                           <div style={{
//                             width: '18px',
//                             height: `${boughtHeight}px`,
//                             background: isToday ? '#2563eb' : '#3b82f6',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                             boxShadow: isToday ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none',
//                           }}>
//                             {bought > 0 && (
//                               <div style={{
//                                 position: 'absolute',
//                                 top: '-22px',
//                                 left: '50%',
//                                 transform: 'translateX(-50%)',
//                                 fontSize: '11px',
//                                 fontWeight: '700',
//                                 color: isToday ? '#2563eb' : '#3b82f6',
//                               }}>
//                                 {bought}
//                               </div>
//                             )}
//                           </div>
                          
//                           {/* Refunds Bar */}
//                           <div style={{
//                             width: '18px',
//                             height: `${refundHeight}px`,
//                             background: isToday ? '#dc2626' : '#ef4444',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                             boxShadow: isToday ? '0 4px 12px rgba(220, 38, 38, 0.4)' : 'none',
//                           }}>
//                             {refunds > 0 && (
//                               <div style={{
//                                 position: 'absolute',
//                                 top: '-22px',
//                                 left: '50%',
//                                 transform: 'translateX(-50%)',
//                                 fontSize: '11px',
//                                 fontWeight: '700',
//                                 color: isToday ? '#dc2626' : '#ef4444',
//                               }}>
//                                 {refunds}
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Date Label */}
//                         <div style={{
//                           fontSize: '11px',
//                           whiteSpace: 'nowrap',
//                           fontWeight: isToday ? '800' : '500',
//                           color: isToday ? '#3b82f6' : '#64748b',
//                           background: isToday ? '#dbeafe' : 'transparent',
//                           padding: isToday ? '4px 6px' : '4px 0',
//                           borderRadius: '4px',
//                         }}>
//                           {label}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 {/* Legend */}
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '1.5rem', 
//                   justifyContent: 'center',
//                   marginTop: '1rem',
//                   fontSize: '0.875rem'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             {/* CUSTOM COUNTRY LIST */}
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '100%',
//             }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Countries
//               </h3>
              
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats?.map((country, index) => {
//                   const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];
//                   const color = colors[index % colors.length];
                  
//                   return (
//                     <div key={index} style={{ marginBottom: '1rem' }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                           <div style={{ 
//                             width: '14px', 
//                             height: '14px', 
//                             background: color, 
//                             borderRadius: '3px',
//                             boxShadow: `0 2px 4px ${color}40`
//                           }}></div>
//                           <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: '600' }}>
//                             {country.label}
//                           </span>
//                         </div>
//                         <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>
//                           {country.percentage}%
//                         </span>
//                       </div>
                      
//                       {/* Progress Bar */}
//                       <div style={{ 
//                         width: '100%', 
//                         height: '10px', 
//                         background: '#f1f5f9', 
//                         borderRadius: '5px',
//                         overflow: 'hidden',
//                         marginBottom: '0.5rem'
//                       }}>
//                         <div style={{
//                           width: `${country.percentage}%`,
//                           height: '100%',
//                           background: color,
//                           borderRadius: '5px',
//                           transition: 'width 0.3s ease'
//                         }}></div>
//                       </div>
                      
//                       <div style={{ 
//                         fontSize: '0.75rem', 
//                         color: '#64748b', 
//                         display: 'flex',
//                         justifyContent: 'space-between'
//                       }}>
//                         <span style={{ fontWeight: '500' }}>{country.value} purchases</span>
//                         <span style={{ fontWeight: '600', color: '#10b981' }}>₹{country.revenue.toLocaleString()}</span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance & Country Stats */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:trending-up" width={18} />
//           </span>
//           Service Performance & Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Top Services
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto', fontSize: '0.875rem' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Service
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Bought
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Refunds
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Revenue
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.map((service, index) => (
//                       <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={{ padding: '0.75rem 0.5rem', color: '#334155', fontWeight: '500' }}>
//                           {service.label}
//                         </td>
//                         <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                           <span style={{ 
//                             background: '#dbeafe', 
//                             padding: '2px 8px', 
//                             borderRadius: '4px',
//                             fontSize: '0.75rem',
//                             fontWeight: '600',
//                             color: '#1e40af'
//                           }}>
//                             {service.value}
//                           </span>
//                         </td>
//                         <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                           <span style={{ 
//                             background: service.refunds > 0 ? '#fee2e2' : '#f1f5f9', 
//                             padding: '2px 8px', 
//                             borderRadius: '4px',
//                             fontSize: '0.75rem',
//                             fontWeight: '600',
//                             color: service.refunds > 0 ? '#991b1b' : '#64748b'
//                           }}>
//                             {service.refunds}
//                           </span>
//                         </td>
//                         <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                           ₹{service.revenue.toLocaleString()}
//                         </td>
//                       </tr>
//                     )) || (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Country Revenue
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto', fontSize: '0.875rem' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Country
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         %
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Purchases
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Revenue
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats?.map((country, index) => {
//                       const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                       const color = colors[index % colors.length];
                      
//                       return (
//                         <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '0.75rem 0.5rem' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                               <div style={{ 
//                                 width: '12px', 
//                                 height: '12px', 
//                                 background: color, 
//                                 borderRadius: '2px' 
//                               }}></div>
//                               <span style={{ color: '#334155', fontWeight: '500' }}>
//                                 {country.label}
//                               </span>
//                             </div>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ 
//                               background: '#fef3c7', 
//                               padding: '2px 8px', 
//                               borderRadius: '4px',
//                               fontSize: '0.7rem',
//                               fontWeight: '600',
//                               color: '#92400e'
//                             }}>
//                               {country.percentage}%
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ 
//                               background: '#dbeafe', 
//                               padding: '2px 8px', 
//                               borderRadius: '4px',
//                               fontSize: '0.75rem',
//                               fontWeight: '600',
//                               color: '#1e40af'
//                             }}>
//                               {country.value}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                             ₹{country.revenue.toLocaleString()}
//                           </td>
//                         </tr>
//                       );
//                     }) || (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>
//         </Grid>

//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-bar" width={18} />
//           </span>
//           Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 {
//                   name: 'FaceBook',
//                   value: 323234,
//                   icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
//                 },
//                 {
//                   name: 'Google',
//                   value: 341212,
//                   icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
//                 },
//                 {
//                   name: 'Linkedin',
//                   value: 411213,
//                   icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
//                 },
//                 {
//                   name: 'Twitter',
//                   value: 443232,
//                   icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
//                 },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }






// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect } from 'react';
// import { faker } from '@faker-js/faker';
// import { Grid, Container, Typography, CircularProgress, Alert, Skeleton } from '@mui/material';
// import Iconify from '../components/iconify';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     header: {
//       marginBottom: '1.5rem',
//       paddingBottom: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//     },
//     greeting: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       marginBottom: '0.25rem',
//     },
//     subtitle: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '0.5rem',
//     },
//     sectionTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#334155',
//       marginBottom: '1rem',
//       marginTop: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f8fafc;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }

//     .stat-card {
//       background: white;
//       border-radius: 8px;
//       padding: 1rem;
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       transition: all 0.2s ease;
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       height: 100%;
//     }

//     .stat-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .stat-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//       color: white;
//     }

//     .stat-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .stat-title {
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .stat-value {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #1e293b;
//       margin: 0;
//       line-height: 1;
//     }

//     .section-icon {
//       width: 20px;
//       height: 20px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #64748b;
//     }
    
//     .date-input {
//       padding: 0.5rem 0.75rem;
//       border: 1px solid #e2e8f0;
//       border-radius: 6px;
//       font-size: 0.875rem;
//       color: #334155;
//       background: white;
//       cursor: pointer;
//       font-weight: 500;
//     }
    
//     .date-input:focus {
//       outline: none;
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//     }
//   `;

//   const fetchdata = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Build analytics URL
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//         console.log("📅 Fetching with custom dates:", startDate, "to", endDate);
//       } else {
//         console.log("📅 Fetching default current month data");
//       }
      
//       const [statsRes, analyticsRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl)
//       ]);
      
//       console.log("📊 Stats:", statsRes.data);
//       console.log("📈 Analytics:", analyticsRes.data);
      
//       if (statsRes.data.success && statsRes.data.data) {
//         setDashboardData(statsRes.data.data);
//       }
      
//       if (analyticsRes.data.success && analyticsRes.data.data) {
//         setAnalyticsData(analyticsRes.data.data);
//         console.log("✅ Data loaded successfully");
//       }
      
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchdata();
//   }, [startDate, endDate]);

//   const getStatsData = () => {
//     if (!dashboardData) return [];

//     const { projects, services, staff, freelancers, categories } = dashboardData;

//     return [
//       {
//         title: "New Projects",
//         total: projects?.new || 0,
//         icon: "mdi:rocket-launch",
//         bgColor: "#667eea",
//       },
//       {
//         title: "Running Projects",
//         total: projects?.running || 0,
//         icon: "mdi:lightning-bolt",
//         bgColor: "#3b82f6",
//       },
//       {
//         title: "Completed",
//         total: projects?.completed || 0,
//         icon: "mdi:check-circle",
//         bgColor: "#10b981",
//       },
//       {
//         title: "Total Projects",
//         total: projects?.total || 0,
//         icon: "mdi:briefcase",
//         bgColor: "#8b5cf6",
//       },
//       {
//         title: "Services",
//         total: services || 0,
//         icon: "mdi:grid",
//         bgColor: "#f59e0b",
//       },
//       {
//         title: "Total Staff",
//         total: staff?.total || 0,
//         icon: "mdi:account-group",
//         bgColor: "#14b8a6",
//       },
//       {
//         title: "Inhouse Staff",
//         total: staff?.inhouse || 0,
//         icon: "mdi:account-tie",
//         bgColor: "#ec4899",
//       },
//       {
//         title: "Freelancers",
//         total: freelancers || 0,
//         icon: "mdi:briefcase-account",
//         bgColor: "#ef4444",
//       },
//       {
//         title: "Categories",
//         total: categories || 0,
//         icon: "mdi:tag-multiple",
//         bgColor: "#06b6d4",
//       },
//     ];
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//             <CircularProgress size={60} />
//           </div>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <Alert severity="error" sx={{ mb: 3 }}>
//             <strong>Error:</strong> {error}
//             <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>
//               Retry
//             </button>
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   const statsData = getStatsData();

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet>
//         <title>Dashboard | Admin Panel</title>
//       </Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>
//               {currentTime.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//             <span>
//               {currentTime.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', 
//                 minute: '2-digit'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((stat, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: stat.bgColor }}>
//                   <Iconify icon={stat.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{stat.title}</p>
//                   <h3 className="stat-value">{stat.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics Header with Date Filter */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '1rem',
//           marginTop: '1.5rem',
//           flexWrap: 'wrap',
//           gap: '1rem'
//         }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon">
//               <Iconify icon="mdi:chart-line" width={18} />
//             </span>
//             Purchasing Analytics
//           </Typography>
          
//           {/* Date Range Filter */}
//           <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//             <input
//               type="date"
//               className="date-input"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               max={new Date().toISOString().split('T')[0]}
//             />
//             <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>to</span>
//             <input
//               type="date"
//               className="date-input"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               max={new Date().toISOString().split('T')[0]}
//               min={startDate}
//             />
//             {startDate && endDate && (
//               <button
//                 onClick={() => {
//                   setStartDate('');
//                   setEndDate('');
//                 }}
//                 style={{
//                   background: '#fee2e2',
//                   border: '1px solid #fecaca',
//                   borderRadius: '4px',
//                   padding: '0.5rem 0.75rem',
//                   cursor: 'pointer',
//                   fontSize: '0.75rem',
//                   color: '#991b1b',
//                   fontWeight: '600'
//                 }}
//               >
//                 ✕ Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#3b82f6' }}>
//                 <Iconify icon="mdi:cart-check" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Services Bought</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalServicesBought || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#ef4444' }}>
//                 <Iconify icon="mdi:cash-refund" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refunds</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalRefunds || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#10b981' }}>
//                 <Iconify icon="mdi:cash-multiple" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Total Revenue</p>
//                 <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>
//                   ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#f59e0b' }}>
//                 <Iconify icon="mdi:percent" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refund Rate</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.refundRate || 0}%</h3>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                     Purchasing Report
//                   </h3>
//                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
//                     {analyticsData?.summary?.dateRange?.start} to {analyticsData?.summary?.dateRange?.end}
//                   </p>
//                 </div>
//               </div>

//               {/* Bar Chart */}
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '6px', 
//                   minWidth: '900px',
//                   height: '300px',
//                   alignItems: 'flex-end',
//                   borderBottom: '2px solid #e2e8f0',
//                   paddingBottom: '10px',
//                   paddingTop: '30px'
//                 }}>
//                   {analyticsData?.chartLabels?.map((label, index) => {
//                     const bought = analyticsData?.chartData?.servicesBought[index] || 0;
//                     const refunds = analyticsData?.chartData?.refunds[index] || 0;
//                     const maxValue = Math.max(
//                       ...(analyticsData?.chartData?.servicesBought || [1]), 
//                       ...(analyticsData?.chartData?.refunds || [1])
//                     );
//                     const boughtHeight = (bought / maxValue) * 240;
//                     const refundHeight = (refunds / maxValue) * 240;
                    
//                     return (
//                       <div key={index} style={{ 
//                         flex: 1, 
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         gap: '4px',
//                       }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{
//                             width: '18px',
//                             height: `${boughtHeight}px`,
//                             background: '#3b82f6',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {bought > 0 && (
//                               <div style={{
//                                 position: 'absolute',
//                                 top: '-22px',
//                                 left: '50%',
//                                 transform: 'translateX(-50%)',
//                                 fontSize: '11px',
//                                 fontWeight: '700',
//                                 color: '#3b82f6',
//                               }}>
//                                 {bought}
//                               </div>
//                             )}
//                           </div>
                          
//                           <div style={{
//                             width: '18px',
//                             height: `${refundHeight}px`,
//                             background: '#ef4444',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {refunds > 0 && (
//                               <div style={{
//                                 position: 'absolute',
//                                 top: '-22px',
//                                 left: '50%',
//                                 transform: 'translateX(-50%)',
//                                 fontSize: '11px',
//                                 fontWeight: '700',
//                                 color: '#ef4444',
//                               }}>
//                                 {refunds}
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div style={{
//                           fontSize: '11px',
//                           whiteSpace: 'nowrap',
//                           fontWeight: '500',
//                           color: '#64748b',
//                         }}>
//                           {label}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '1.5rem', 
//                   justifyContent: 'center',
//                   marginTop: '1rem',
//                   fontSize: '0.875rem'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '100%',
//             }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Countries
//               </h3>
              
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                   analyticsData.countryStats.map((country, index) => {
//                     const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                     const color = colors[index % colors.length];
                    
//                     return (
//                       <div key={index} style={{ marginBottom: '1rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             <div style={{ width: '14px', height: '14px', background: color, borderRadius: '3px' }}></div>
//                             <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: '600' }}>
//                               {country.label}
//                             </span>
//                           </div>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>
//                             {country.percentage}%
//                           </span>
//                         </div>
                        
//                         <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
//                           <div style={{ width: `${country.percentage}%`, height: '100%', background: color, borderRadius: '5px' }}></div>
//                         </div>
                        
//                         <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                           <span>{country.value} purchases</span>
//                           <span style={{ fontWeight: '600', color: '#10b981' }}>₹{country.revenue.toLocaleString()}</span>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                     No country data available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:trending-up" width={18} />
//           </span>
//           Service Performance
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Top Services
//               </h3>
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Service</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Bought</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Refunds</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Revenue</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats && analyticsData.serviceStats.length > 0 ? (
//                       analyticsData.serviceStats.map((service, index) => (
//                         <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '0.75rem 0.5rem', color: '#334155', fontWeight: '500' }}>
//                             {service.label}
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', color: '#1e40af' }}>
//                               {service.value}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ 
//                               background: service.refunds > 0 ? '#fee2e2' : '#f1f5f9', 
//                               padding: '2px 8px', 
//                               borderRadius: '4px',
//                               fontSize: '0.75rem',
//                               fontWeight: '600',
//                               color: service.refunds > 0 ? '#991b1b' : '#64748b'
//                             }}>
//                               {service.refunds}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                             ₹{service.revenue.toLocaleString()}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No service data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>
//         </Grid>

//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-bar" width={18} />
//           </span>
//           Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 { name: 'FaceBook', value: 323234, icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} /> },
//                 { name: 'Google', value: 341212, icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} /> },
//                 { name: 'Linkedin', value: 411213, icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} /> },
//                 { name: 'Twitter', value: 443232, icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} /> },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }




// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect } from 'react';
// import { faker } from '@faker-js/faker';
// import { Grid, Container, Typography, CircularProgress, Alert, Skeleton } from '@mui/material';
// import Iconify from '../components/iconify';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterPeriod, setFilterPeriod] = useState('month'); // 'month', '15days'
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     header: {
//       marginBottom: '1.5rem',
//       paddingBottom: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//     },
//     greeting: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       marginBottom: '0.25rem',
//     },
//     subtitle: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '0.5rem',
//     },
//     sectionTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#334155',
//       marginBottom: '1rem',
//       marginTop: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f8fafc;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }

//     .stat-card {
//       background: white;
//       border-radius: 8px;
//       padding: 1rem;
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       transition: all 0.2s ease;
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       height: 100%;
//     }

//     .stat-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .stat-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//       color: white;
//     }

//     .stat-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .stat-title {
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .stat-value {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #1e293b;
//       margin: 0;
//       line-height: 1;
//     }

//     .section-icon {
//       width: 20px;
//       height: 20px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #64748b;
//     }
    
//     .date-input {
//       padding: 0.5rem 0.75rem;
//       border: 1px solid #e2e8f0;
//       border-radius: 6px;
//       font-size: 0.875rem;
//       color: #334155;
//       background: white;
//       cursor: pointer;
//       font-weight: 500;
//     }
    
//     .date-input:focus {
//       outline: none;
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//     }
//   `;

//   const fetchdata = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Build analytics URL based on filter
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
      
//       if (startDate && endDate) {
//         // Custom date range
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//         console.log("📅 Custom dates:", startDate, "to", endDate);
//       } else if (filterPeriod === '15days') {
//         // Last 15 days
//         const end = new Date();
//         const start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//         console.log("📅 Last 15 days");
//       } else {
//         // Default current month
//         console.log("📅 Current month (default)");
//       }
      
//       const [statsRes, analyticsRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl)
//       ]);
      
//       if (statsRes.data.success && statsRes.data.data) {
//         setDashboardData(statsRes.data.data);
//       }
      
//       if (analyticsRes.data.success && analyticsRes.data.data) {
//         setAnalyticsData(analyticsRes.data.data);
//         console.log("✅ Data loaded");
//       }
      
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchdata();
//   }, [filterPeriod, startDate, endDate]);

//   const getStatsData = () => {
//     if (!dashboardData) return [];

//     const { projects, services, staff, freelancers, categories } = dashboardData;

//     return [
//       {
//         title: "New Projects",
//         total: projects?.new || 0,
//         icon: "mdi:rocket-launch",
//         bgColor: "#667eea",
//       },
//       {
//         title: "Running Projects",
//         total: projects?.running || 0,
//         icon: "mdi:lightning-bolt",
//         bgColor: "#3b82f6",
//       },
//       {
//         title: "Completed",
//         total: projects?.completed || 0,
//         icon: "mdi:check-circle",
//         bgColor: "#10b981",
//       },
//       {
//         title: "Total Projects",
//         total: projects?.total || 0,
//         icon: "mdi:briefcase",
//         bgColor: "#8b5cf6",
//       },
//       {
//         title: "Services",
//         total: services || 0,
//         icon: "mdi:grid",
//         bgColor: "#f59e0b",
//       },
//       {
//         title: "Total Staff",
//         total: staff?.total || 0,
//         icon: "mdi:account-group",
//         bgColor: "#14b8a6",
//       },
//       {
//         title: "Inhouse Staff",
//         total: staff?.inhouse || 0,
//         icon: "mdi:account-tie",
//         bgColor: "#ec4899",
//       },
//       {
//         title: "Freelancers",
//         total: freelancers || 0,
//         icon: "mdi:briefcase-account",
//         bgColor: "#ef4444",
//       },
//       {
//         title: "Categories",
//         total: categories || 0,
//         icon: "mdi:tag-multiple",
//         bgColor: "#06b6d4",
//       },
//     ];
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//             <CircularProgress size={60} />
//           </div>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <Alert severity="error" sx={{ mb: 3 }}>
//             <strong>Error:</strong> {error}
//             <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>
//               Retry
//             </button>
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   const statsData = getStatsData();

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet>
//         <title>Dashboard | Admin Panel</title>
//       </Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>
//               {currentTime.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//             <span>
//               {currentTime.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', 
//                 minute: '2-digit'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((stat, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: stat.bgColor }}>
//                   <Iconify icon={stat.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{stat.title}</p>
//                   <h3 className="stat-value">{stat.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics Header with Filters */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '1rem',
//           marginTop: '1.5rem',
//           flexWrap: 'wrap',
//           gap: '1rem'
//         }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon">
//               <Iconify icon="mdi:chart-line" width={18} />
//             </span>
//             Purchasing Analytics
//           </Typography>
          
//           <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {/* 15 Days / 1 Month Buttons */}
//             <button
//               onClick={() => {
//                 setFilterPeriod('15days');
//                 setStartDate('');
//                 setEndDate('');
//               }}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: filterPeriod === '15days' ? '#3b82f6' : 'white',
//                 color: filterPeriod === '15days' ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//               }}
//             >
//               15 Days
//             </button>
//             <button
//               onClick={() => {
//                 setFilterPeriod('month');
//                 setStartDate('');
//                 setEndDate('');
//               }}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: filterPeriod === 'month' && !startDate && !endDate ? '#3b82f6' : 'white',
//                 color: filterPeriod === 'month' && !startDate && !endDate ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//               }}
//             >
//               1 Month
//             </button>
            
//             {/* Date Range Filter */}
//             <div style={{ 
//               display: 'flex', 
//               gap: '0.5rem', 
//               alignItems: 'center',
//               padding: '0.25rem 0.5rem',
//               background: startDate && endDate ? '#eff6ff' : 'transparent',
//               borderRadius: '6px'
//             }}>
//               <input
//                 type="date"
//                 className="date-input"
//                 value={startDate}
//                 onChange={(e) => {
//                   setStartDate(e.target.value);
//                   setFilterPeriod('custom');
//                 }}
//                 max={new Date().toISOString().split('T')[0]}
//               />
//               <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>to</span>
//               <input
//                 type="date"
//                 className="date-input"
//                 value={endDate}
//                 onChange={(e) => {
//                   setEndDate(e.target.value);
//                   setFilterPeriod('custom');
//                 }}
//                 max={new Date().toISOString().split('T')[0]}
//                 min={startDate}
//               />
//               {startDate && endDate && (
//                 <button
//                   onClick={() => {
//                     setStartDate('');
//                     setEndDate('');
//                     setFilterPeriod('month');
//                   }}
//                   style={{
//                     background: '#fee2e2',
//                     border: '1px solid #fecaca',
//                     borderRadius: '4px',
//                     padding: '0.5rem 0.75rem',
//                     cursor: 'pointer',
//                     fontSize: '0.75rem',
//                     color: '#991b1b',
//                     fontWeight: '600'
//                   }}
//                 >
//                   ✕ Clear
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#3b82f6' }}>
//                 <Iconify icon="mdi:cart-check" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Services Bought</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalServicesBought || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#ef4444' }}>
//                 <Iconify icon="mdi:cash-refund" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refunds</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalRefunds || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#10b981' }}>
//                 <Iconify icon="mdi:cash-multiple" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Total Revenue</p>
//                 <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>
//                   ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#f59e0b' }}>
//                 <Iconify icon="mdi:percent" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refund Rate</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.refundRate || 0}%</h3>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                     Purchasing Report
//                   </h3>
//                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
//                     Bought: {analyticsData?.summary?.totalServicesBought || 0} | 
//                     Refunded: {analyticsData?.summary?.totalRefunds || 0} | 
//                     Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Bar Chart */}
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '6px', 
//                   minWidth: '900px',
//                   height: '340px',
//                   alignItems: 'flex-end',
//                   borderBottom: '2px solid #e2e8f0',
//                   paddingBottom: '10px',
//                   paddingTop: '50px'
//                 }}>
//                   {analyticsData?.chartLabels?.map((label, index) => {
//                     const bought = analyticsData?.chartData?.servicesBought[index] || 0;
//                     const refunds = analyticsData?.chartData?.refunds[index] || 0;
//                     const boughtAmount = analyticsData?.chartData?.revenue[index] || 0;
//                     const refundAmount = analyticsData?.chartData?.refundAmount?.[index] || 0;
                    
//                     const maxValue = Math.max(
//                       ...(analyticsData?.chartData?.servicesBought || [1]), 
//                       ...(analyticsData?.chartData?.refunds || [1])
//                     );
//                     const boughtHeight = (bought / maxValue) * 240;
//                     const refundHeight = (refunds / maxValue) * 240;
                    
//                     return (
//                       <div key={index} style={{ 
//                         flex: 1, 
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         gap: '4px',
//                       }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           {/* Bought Bar */}
//                           <div style={{
//                             width: '20px',
//                             height: `${boughtHeight}px`,
//                             background: '#3b82f6',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {bought > 0 && (
//                               <>
//                                 {/* Count */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-42px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '11px',
//                                   fontWeight: '700',
//                                   color: '#3b82f6',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   {bought}
//                                 </div>
//                                 {/* Amount */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-28px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '9px',
//                                   fontWeight: '600',
//                                   color: '#10b981',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   ₹{boughtAmount}
//                                 </div>
//                               </>
//                             )}
//                           </div>
                          
//                           {/* Refund Bar */}
//                           <div style={{
//                             width: '20px',
//                             height: `${refundHeight}px`,
//                             background: '#ef4444',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {refunds > 0 && (
//                               <>
//                                 {/* Count */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-42px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '11px',
//                                   fontWeight: '700',
//                                   color: '#ef4444',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   {refunds}
//                                 </div>
//                                 {/* Amount */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-28px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '9px',
//                                   fontWeight: '600',
//                                   color: '#f59e0b',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   ₹{refundAmount}
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div style={{
//                           fontSize: '11px',
//                           whiteSpace: 'nowrap',
//                           fontWeight: '500',
//                           color: '#64748b',
//                         }}>
//                           {label}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '1.5rem', 
//                   justifyContent: 'center',
//                   marginTop: '1rem',
//                   fontSize: '0.875rem'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '100%',
//             }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Countries
//               </h3>
              
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                   analyticsData.countryStats.map((country, index) => {
//                     const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                     const color = colors[index % colors.length];
                    
//                     return (
//                       <div key={index} style={{ marginBottom: '1rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             <div style={{ width: '14px', height: '14px', background: color, borderRadius: '3px' }}></div>
//                             <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: '600' }}>
//                               {country.label}
//                             </span>
//                           </div>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>
//                             {country.percentage}%
//                           </span>
//                         </div>
                        
//                         <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
//                           <div style={{ width: `${country.percentage}%`, height: '100%', background: color, borderRadius: '5px' }}></div>
//                         </div>
                        
//                         <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                           <span>{country.value} purchases</span>
//                           <span style={{ fontWeight: '600', color: '#10b981' }}>₹{country.revenue.toLocaleString()}</span>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                     No country data available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance & Country Revenue */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:trending-up" width={18} />
//           </span>
//           Service Performance & Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Top Services
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Service</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Bought</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Refunds</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Revenue</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats && analyticsData.serviceStats.length > 0 ? (
//                       analyticsData.serviceStats.map((service, index) => (
//                         <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '0.75rem 0.5rem', color: '#334155', fontWeight: '500' }}>
//                             {service.label}
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', color: '#1e40af' }}>
//                               {service.value}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ 
//                               background: service.refunds > 0 ? '#fee2e2' : '#f1f5f9', 
//                               padding: '2px 8px', 
//                               borderRadius: '4px',
//                               fontSize: '0.75rem',
//                               fontWeight: '600',
//                               color: service.refunds > 0 ? '#991b1b' : '#64748b'
//                             }}>
//                               {service.refunds}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                             ₹{service.revenue.toLocaleString()}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No service data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Country Revenue
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto', fontSize: '0.875rem' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Country
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         %
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Purchases
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Revenue
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                       analyticsData.countryStats.map((country, index) => {
//                         const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                         const color = colors[index % colors.length];
                        
//                         return (
//                           <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                             <td style={{ padding: '0.75rem 0.5rem' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                                 <div style={{ 
//                                   width: '12px', 
//                                   height: '12px', 
//                                   background: color, 
//                                   borderRadius: '2px' 
//                                 }}></div>
//                                 <span style={{ color: '#334155', fontWeight: '500' }}>
//                                   {country.label}
//                                 </span>
//                               </div>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                               <span style={{ 
//                                 background: '#fef3c7', 
//                                 padding: '2px 8px', 
//                                 borderRadius: '4px',
//                                 fontSize: '0.7rem',
//                                 fontWeight: '600',
//                                 color: '#92400e'
//                               }}>
//                                 {country.percentage}%
//                               </span>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                               <span style={{ 
//                                 background: '#dbeafe', 
//                                 padding: '2px 8px', 
//                                 borderRadius: '4px',
//                                 fontSize: '0.75rem',
//                                 fontWeight: '600',
//                                 color: '#1e40af'
//                               }}>
//                                 {country.value}
//                               </span>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                               ₹{country.revenue.toLocaleString()}
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No country data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>
//         </Grid>

//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-bar" width={18} />
//           </span>
//           Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 { name: 'FaceBook', value: 323234, icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} /> },
//                 { name: 'Google', value: 341212, icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} /> },
//                 { name: 'Linkedin', value: 411213, icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} /> },
//                 { name: 'Twitter', value: 443232, icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} /> },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }







// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { faker } from '@faker-js/faker';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [topRatedStaff, setTopRatedStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterPeriod, setFilterPeriod] = useState('month'); // 'month', '15days', 'custom'
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     header: {
//       marginBottom: '1.5rem',
//       paddingBottom: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//     },
//     greeting: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       marginBottom: '0.25rem',
//     },
//     subtitle: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '0.5rem',
//     },
//     sectionTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#334155',
//       marginBottom: '1rem',
//       marginTop: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f8fafc;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }

//     .stat-card {
//       background: white;
//       border-radius: 8px;
//       padding: 1rem;
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       transition: all 0.2s ease;
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       height: 100%;
//     }

//     .stat-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .stat-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//       color: white;
//     }

//     .stat-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .stat-title {
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .stat-value {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #1e293b;
//       margin: 0;
//       line-height: 1;
//     }

//     .section-icon {
//       width: 20px;
//       height: 20px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #64748b;
//     }
    
//     .date-input {
//       padding: 0.5rem 0.75rem;
//       border: 1px solid #e2e8f0;
//       border-radius: 6px;
//       font-size: 0.875rem;
//       color: #334155;
//       background: white;
//       cursor: pointer;
//       font-weight: 500;
//     }
    
//     .date-input:focus {
//       outline: none;
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//     }
//   `;

//   // ✅ FIX: useCallback to avoid dependency warning
//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Build analytics URL based on filter
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
      
//       if (startDate && endDate) {
//         // Custom date range
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//         console.log("📅 Custom dates:", startDate, "to", endDate);
//       } else if (filterPeriod === '15days') {
//         // Last 15 days
//         const end = new Date();
//         const start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//         console.log("📅 Last 15 days");
//       } else {
//         // Default current month
//         console.log("📅 Current month (default)");
//       }
      
//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`)
//       ]);
      
//       if (statsRes.data.success && statsRes.data.data) {
//         setDashboardData(statsRes.data.data);
//       }
      
//       if (analyticsRes.data.success && analyticsRes.data.data) {
//         setAnalyticsData(analyticsRes.data.data);
//         console.log("✅ Data loaded");
//       }
      
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         setTopRatedStaff(topStaffRes.data.data);
//         console.log("✅ Top rated staff loaded");
//       }
      
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]); // ✅ Dependencies properly added

//   useEffect(() => {
//     fetchdata();
//   }, [fetchdata]); // ✅ Now fetchdata is in dependencies

//   const getStatsData = () => {
//     if (!dashboardData) return [];

//     const { projects, services, staff, freelancers, categories } = dashboardData;

//     return [
//       {
//         title: "New Projects",
//         total: projects?.new || 0,
//         icon: "mdi:rocket-launch",
//         bgColor: "#667eea",
//       },
//       {
//         title: "Running Projects",
//         total: projects?.running || 0,
//         icon: "mdi:lightning-bolt",
//         bgColor: "#3b82f6",
//       },
//       {
//         title: "Completed",
//         total: projects?.completed || 0,
//         icon: "mdi:check-circle",
//         bgColor: "#10b981",
//       },
//       {
//         title: "Total Projects",
//         total: projects?.total || 0,
//         icon: "mdi:briefcase",
//         bgColor: "#8b5cf6",
//       },
//       {
//         title: "Services",
//         total: services || 0,
//         icon: "mdi:grid",
//         bgColor: "#f59e0b",
//       },
//       {
//         title: "Total Staff",
//         total: staff?.total || 0,
//         icon: "mdi:account-group",
//         bgColor: "#14b8a6",
//       },
//       {
//         title: "Inhouse Staff",
//         total: staff?.inhouse || 0,
//         icon: "mdi:account-tie",
//         bgColor: "#ec4899",
//       },
//       {
//         title: "Freelancers",
//         total: freelancers || 0,
//         icon: "mdi:briefcase-account",
//         bgColor: "#ef4444",
//       },
//       {
//         title: "Categories",
//         total: categories || 0,
//         icon: "mdi:tag-multiple",
//         bgColor: "#06b6d4",
//       },
//     ];
//   };

//   // ✅ FIX: Date validation handler
//   const handleStartDateChange = (e) => {
//     const newStartDate = e.target.value;
//     if (endDate && newStartDate > endDate) {
//       alert('Start date cannot be after end date');
//       return;
//     }
//     setStartDate(newStartDate);
//     setFilterPeriod('custom');
//   };

//   const handleEndDateChange = (e) => {
//     const newEndDate = e.target.value;
//     if (startDate && newEndDate < startDate) {
//       alert('End date cannot be before start date');
//       return;
//     }
//     setEndDate(newEndDate);
//     setFilterPeriod('custom');
//   };

//   const handleClearDates = () => {
//     setStartDate('');
//     setEndDate('');
//     setFilterPeriod('month');
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//             <CircularProgress size={60} />
//           </div>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <Alert severity="error" sx={{ mb: 3 }}>
//             <strong>Error:</strong> {error}
//             <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>
//               Retry
//             </button>
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   const statsData = getStatsData();

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet>
//         <title>Dashboard | Admin Panel</title>
//       </Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>
//               {currentTime.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//             <span>
//               {currentTime.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', 
//                 minute: '2-digit'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((stat, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: stat.bgColor }}>
//                   <Iconify icon={stat.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{stat.title}</p>
//                   <h3 className="stat-value">{stat.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Top Rated Staff Section */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:star" width={18} />
//           </span>
//           Top Rated Staff
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               <div style={{ 
//                 display: 'grid', 
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//                 gap: '1rem'
//               }}>
//                 {topRatedStaff && topRatedStaff.length > 0 ? (
//                   topRatedStaff.map((staff, index) => (
//                     <div 
//                       key={staff.id || index}
//                       style={{
//                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                         borderRadius: '12px',
//                         padding: '1.25rem',
//                         color: 'white',
//                         position: 'relative',
//                         transition: 'transform 0.2s ease',
//                         cursor: 'pointer',
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = 'translateY(-4px)';
//                         e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = 'translateY(0)';
//                         e.currentTarget.style.boxShadow = 'none';
//                       }}
//                     >
//                       {/* Rank Badge */}
//                       <div style={{
//                         position: 'absolute',
//                         top: '0.5rem',
//                         right: '0.5rem',
//                         background: 'rgba(255, 255, 255, 0.25)',
//                         borderRadius: '50%',
//                         width: '32px',
//                         height: '32px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontSize: '0.875rem',
//                         fontWeight: '700',
//                       }}>
//                         #{index + 1}
//                       </div>

//                       {/* Avatar */}
//                       <div style={{
//                         width: '64px',
//                         height: '64px',
//                         borderRadius: '50%',
//                         background: 'rgba(255, 255, 255, 0.2)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontSize: '1.5rem',
//                         fontWeight: '700',
//                         marginBottom: '0.75rem',
//                         border: '3px solid rgba(255, 255, 255, 0.3)',
//                       }}>
//                         {staff.name.charAt(0).toUpperCase()}
//                       </div>

//                       {/* Name */}
//                       <h4 style={{
//                         margin: '0 0 0.25rem 0',
//                         fontSize: '1rem',
//                         fontWeight: '600',
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                       }}>
//                         {staff.name}
//                       </h4>

//                       {/* Role */}
//                       <p style={{
//                         margin: '0 0 0.75rem 0',
//                         fontSize: '0.75rem',
//                         opacity: 0.9,
//                         textTransform: 'capitalize',
//                       }}>
//                         {staff.role}
//                       </p>

//                       {/* Rating */}
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                         marginTop: '0.75rem',
//                       }}>
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '0.25rem',
//                         }}>
//                           {[...Array(5)].map((_, i) => (
//                             <Iconify
//                               key={i}
//                               icon={i < Math.floor(staff.rating) ? "mdi:star" : "mdi:star-outline"}
//                               width={16}
//                               style={{ color: '#fbbf24' }}
//                             />
//                           ))}
//                         </div>
//                         <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
//                           {staff.rating}
//                         </span>
//                         {/* ✅ FIX: Corrected the quote issue here */}
//                         <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
//                           ({staff.totalRatings})
//                         </span>
//                       </div>

//                       {/* Source Badge */}
//                       <div style={{
//                         marginTop: '0.75rem',
//                         padding: '0.25rem 0.5rem',
//                         background: 'rgba(255, 255, 255, 0.2)',
//                         borderRadius: '4px',
//                         fontSize: '0.7rem',
//                         fontWeight: '600',
//                         textTransform: 'uppercase',
//                         display: 'inline-block',
//                       }}>
//                         {staff.source}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{
//                     gridColumn: '1 / -1',
//                     padding: '3rem',
//                     textAlign: 'center',
//                     color: '#94a3b8',
//                   }}>
//                     <Iconify icon="mdi:star-outline" width={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
//                     <p style={{ margin: 0, fontSize: '0.875rem' }}>No rated staff yet</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Analytics Header with Filters */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '1rem',
//           marginTop: '1.5rem',
//           flexWrap: 'wrap',
//           gap: '1rem'
//         }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon">
//               <Iconify icon="mdi:chart-line" width={18} />
//             </span>
//             Purchasing Analytics
//           </Typography>
          
//           <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {/* 15 Days / 1 Month Buttons */}
//             <button
//               onClick={() => {
//                 setFilterPeriod('15days');
//                 setStartDate('');
//                 setEndDate('');
//               }}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: filterPeriod === '15days' && !startDate && !endDate ? '#3b82f6' : 'white',
//                 color: filterPeriod === '15days' && !startDate && !endDate ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//                 transition: 'all 0.2s ease',
//               }}
//             >
//               15 Days
//             </button>
//             <button
//               onClick={() => {
//                 setFilterPeriod('month');
//                 setStartDate('');
//                 setEndDate('');
//               }}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: filterPeriod === 'month' && !startDate && !endDate ? '#3b82f6' : 'white',
//                 color: filterPeriod === 'month' && !startDate && !endDate ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//                 transition: 'all 0.2s ease',
//               }}
//             >
//               1 Month
//             </button>
            
//             {/* Date Range Filter */}
//             <div style={{ 
//               display: 'flex', 
//               gap: '0.5rem', 
//               alignItems: 'center',
//               padding: '0.25rem 0.5rem',
//               background: startDate && endDate ? '#eff6ff' : 'transparent',
//               borderRadius: '6px'
//             }}>
//               <input
//                 type="date"
//                 className="date-input"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 max={new Date().toISOString().split('T')[0]}
//               />
//               <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>to</span>
//               <input
//                 type="date"
//                 className="date-input"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 max={new Date().toISOString().split('T')[0]}
//                 min={startDate}
//               />
//               {startDate && endDate && (
//                 <button
//                   onClick={handleClearDates}
//                   style={{
//                     background: '#fee2e2',
//                     border: '1px solid #fecaca',
//                     borderRadius: '4px',
//                     padding: '0.5rem 0.75rem',
//                     cursor: 'pointer',
//                     fontSize: '0.75rem',
//                     color: '#991b1b',
//                     fontWeight: '600',
//                     transition: 'all 0.2s ease',
//                   }}
//                 >
//                   ✕ Clear
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#3b82f6' }}>
//                 <Iconify icon="mdi:cart-check" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Services Bought</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalServicesBought || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#ef4444' }}>
//                 <Iconify icon="mdi:cash-refund" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refunds</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalRefunds || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#10b981' }}>
//                 <Iconify icon="mdi:cash-multiple" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Total Revenue</p>
//                 <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>
//                   ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#f59e0b' }}>
//                 <Iconify icon="mdi:percent" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refund Rate</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.refundRate || 0}%</h3>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                     Purchasing Report
//                   </h3>
//                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
//                     Bought: {analyticsData?.summary?.totalServicesBought || 0} | 
//                     Refunded: {analyticsData?.summary?.totalRefunds || 0} | 
//                     Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Bar Chart */}
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '6px', 
//                   minWidth: '900px',
//                   height: '340px',
//                   alignItems: 'flex-end',
//                   borderBottom: '2px solid #e2e8f0',
//                   paddingBottom: '10px',
//                   paddingTop: '50px'
//                 }}>
//                   {analyticsData?.chartLabels?.map((label, index) => {
//                     const bought = analyticsData?.chartData?.servicesBought[index] || 0;
//                     const refunds = analyticsData?.chartData?.refunds[index] || 0;
//                     const boughtAmount = analyticsData?.chartData?.revenue[index] || 0;
//                     const refundAmount = analyticsData?.chartData?.refundAmount?.[index] || 0;
                    
//                     const maxValue = Math.max(
//                       ...(analyticsData?.chartData?.servicesBought || [1]), 
//                       ...(analyticsData?.chartData?.refunds || [1])
//                     );
//                     const boughtHeight = (bought / maxValue) * 240;
//                     const refundHeight = (refunds / maxValue) * 240;
                    
//                     return (
//                       <div key={index} style={{ 
//                         flex: 1, 
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         gap: '4px',
//                       }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           {/* Bought Bar */}
//                           <div style={{
//                             width: '20px',
//                             height: `${boughtHeight}px`,
//                             background: '#3b82f6',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {bought > 0 && (
//                               <>
//                                 {/* Count */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-42px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '11px',
//                                   fontWeight: '700',
//                                   color: '#3b82f6',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   {bought}
//                                 </div>
//                                 {/* Amount */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-28px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '9px',
//                                   fontWeight: '600',
//                                   color: '#10b981',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   ₹{boughtAmount}
//                                 </div>
//                               </>
//                             )}
//                           </div>
                          
//                           {/* Refund Bar */}
//                           <div style={{
//                             width: '20px',
//                             height: `${refundHeight}px`,
//                             background: '#ef4444',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {refunds > 0 && (
//                               <>
//                                 {/* Count */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-42px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '11px',
//                                   fontWeight: '700',
//                                   color: '#ef4444',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   {refunds}
//                                 </div>
//                                 {/* Amount */}
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-28px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '9px',
//                                   fontWeight: '600',
//                                   color: '#f59e0b',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   ₹{refundAmount}
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div style={{
//                           fontSize: '11px',
//                           whiteSpace: 'nowrap',
//                           fontWeight: '500',
//                           color: '#64748b',
//                         }}>
//                           {label}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '1.5rem', 
//                   justifyContent: 'center',
//                   marginTop: '1rem',
//                   fontSize: '0.875rem'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '100%',
//             }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Countries
//               </h3>
              
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                   analyticsData.countryStats.map((country, index) => {
//                     const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                     const color = colors[index % colors.length];
                    
//                     return (
//                       <div key={index} style={{ marginBottom: '1rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             <div style={{ width: '14px', height: '14px', background: color, borderRadius: '3px' }}></div>
//                             <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: '600' }}>
//                               {country.label}
//                             </span>
//                           </div>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>
//                             {country.percentage}%
//                           </span>
//                         </div>
                        
//                         <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
//                           <div style={{ width: `${country.percentage}%`, height: '100%', background: color, borderRadius: '5px' }}></div>
//                         </div>
                        
//                         <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                           <span>{country.value} purchases</span>
//                           <span style={{ fontWeight: '600', color: '#10b981' }}>₹{country.revenue.toLocaleString()}</span>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                     No country data available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance & Country Revenue */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:trending-up" width={18} />
//           </span>
//           Service Performance & Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Top Services
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Service</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Bought</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Refunds</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Revenue</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats && analyticsData.serviceStats.length > 0 ? (
//                       analyticsData.serviceStats.map((service, index) => (
//                         <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '0.75rem 0.5rem', color: '#334155', fontWeight: '500' }}>
//                             {service.label}
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', color: '#1e40af' }}>
//                               {service.value}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ 
//                               background: service.refunds > 0 ? '#fee2e2' : '#f1f5f9', 
//                               padding: '2px 8px', 
//                               borderRadius: '4px',
//                               fontSize: '0.75rem',
//                               fontWeight: '600',
//                               color: service.refunds > 0 ? '#991b1b' : '#64748b'
//                             }}>
//                               {service.refunds}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                             ₹{service.revenue.toLocaleString()}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No service data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Country Revenue
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto', fontSize: '0.875rem' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Country
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         %
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Purchases
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Revenue
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                       analyticsData.countryStats.map((country, index) => {
//                         const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                         const color = colors[index % colors.length];
                        
//                         return (
//                           <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                             <td style={{ padding: '0.75rem 0.5rem' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                                 <div style={{ 
//                                   width: '12px', 
//                                   height: '12px', 
//                                   background: color, 
//                                   borderRadius: '2px' 
//                                 }}></div>
//                                 <span style={{ color: '#334155', fontWeight: '500' }}>
//                                   {country.label}
//                                 </span>
//                               </div>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                               <span style={{ 
//                                 background: '#fef3c7', 
//                                 padding: '2px 8px', 
//                                 borderRadius: '4px',
//                                 fontSize: '0.7rem',
//                                 fontWeight: '600',
//                                 color: '#92400e'
//                               }}>
//                                 {country.percentage}%
//                               </span>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                               <span style={{ 
//                                 background: '#dbeafe', 
//                                 padding: '2px 8px', 
//                                 borderRadius: '4px',
//                                 fontSize: '0.75rem',
//                                 fontWeight: '600',
//                                 color: '#1e40af'
//                               }}>
//                                 {country.value}
//                               </span>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                               ₹{country.revenue.toLocaleString()}
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No country data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>
//         </Grid>

//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-bar" width={18} />
//           </span>
//           Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 { name: 'FaceBook', value: 323234, icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} /> },
//                 { name: 'Google', value: 341212, icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} /> },
//                 { name: 'Linkedin', value: 411213, icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} /> },
//                 { name: 'Twitter', value: 443232, icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} /> },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }











// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { faker } from '@faker-js/faker';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [topRatedStaff, setTopRatedStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterPeriod, setFilterPeriod] = useState('month');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     header: {
//       marginBottom: '1.5rem',
//       paddingBottom: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//     },
//     greeting: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       marginBottom: '0.25rem',
//     },
//     subtitle: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '0.5rem',
//     },
//     sectionTitle: {
//       fontSize: '1rem',
//       fontWeight: '600',
//       color: '#334155',
//       marginBottom: '1rem',
//       marginTop: '1.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar {
//       width: 6px;
//       height: 6px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f8fafc;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }

//     .stat-card {
//       background: white;
//       border-radius: 8px;
//       padding: 1rem;
//       border: 1px solid #e2e8f0;
//       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       transition: all 0.2s ease;
//       display: flex;
//       align-items: center;
//       gap: 0.875rem;
//       height: 100%;
//     }

//     .stat-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .stat-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//       color: white;
//     }

//     .stat-content {
//       flex: 1;
//       min-width: 0;
//     }

//     .stat-title {
//       font-size: 0.75rem;
//       color: #64748b;
//       font-weight: 500;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .stat-value {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #1e293b;
//       margin: 0;
//       line-height: 1;
//     }

//     .section-icon {
//       width: 20px;
//       height: 20px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       color: #64748b;
//     }
    
//     .date-input {
//       padding: 0.5rem 0.75rem;
//       border: 1px solid #e2e8f0;
//       border-radius: 6px;
//       font-size: 0.875rem;
//       color: #334155;
//       background: white;
//       cursor: pointer;
//       font-weight: 500;
//     }
    
//     .date-input:focus {
//       outline: none;
//       border-color: #3b82f6;
//       box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//     }

//     /* ✅ Staff Card Styles */
//     .staff-card {
//       background: white;
//       border: 1px solid #e2e8f0;
//       border-radius: 8px;
//       padding: 1rem;
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       transition: all 0.2s ease;
//       margin-bottom: 0.75rem;
//     }

//     .staff-card:hover {
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//       border-color: #cbd5e1;
//     }

//     .staff-rank {
//       background: #f1f5f9;
//       color: #475569;
//       font-weight: 700;
//       font-size: 1rem;
//       width: 40px;
//       height: 40px;
//       border-radius: 8px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//     }

//     .staff-avatar {
//       width: 48px;
//       height: 48px;
//       border-radius: 50%;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       color: white;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-weight: 700;
//       font-size: 1.125rem;
//       flex-shrink: 0;
//     }

//     .staff-info {
//       flex: 1;
//       min-width: 0;
//     }

//     .staff-name {
//       font-weight: 600;
//       color: #1e293b;
//       font-size: 0.9375rem;
//       margin: 0 0 0.25rem 0;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }

//     .staff-role {
//       font-size: 0.75rem;
//       color: #64748b;
//       margin: 0;
//       text-transform: capitalize;
//     }

//     .staff-rating {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       flex-shrink: 0;
//     }

//     .staff-source {
//       background: #eff6ff;
//       color: #1e40af;
//       padding: 0.25rem 0.625rem;
//       border-radius: 4px;
//       font-size: 0.7rem;
//       font-weight: 600;
//       text-transform: uppercase;
//       flex-shrink: 0;
//     }
//   `;

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
      
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//         console.log("📅 Custom dates:", startDate, "to", endDate);
//       } else if (filterPeriod === '15days') {
//         const end = new Date();
//         const start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//         console.log("📅 Last 15 days");
//       } else {
//         console.log("📅 Current month (default)");
//       }
      
//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`)
//       ]);
      
//       if (statsRes.data.success && statsRes.data.data) {
//         setDashboardData(statsRes.data.data);
//       }
      
//       if (analyticsRes.data.success && analyticsRes.data.data) {
//         setAnalyticsData(analyticsRes.data.data);
//         console.log("✅ Data loaded");
//       }
      
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         setTopRatedStaff(topStaffRes.data.data);
//         console.log("✅ Top rated staff loaded:", topStaffRes.data.data.length);
//       }
      
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => {
//     fetchdata();
//   }, [fetchdata]);

//   const getStatsData = () => {
//     if (!dashboardData) return [];

//     const { projects, services, staff, freelancers, categories } = dashboardData;

//     return [
//       {
//         title: "New Projects",
//         total: projects?.new || 0,
//         icon: "mdi:rocket-launch",
//         bgColor: "#667eea",
//       },
//       {
//         title: "Running Projects",
//         total: projects?.running || 0,
//         icon: "mdi:lightning-bolt",
//         bgColor: "#3b82f6",
//       },
//       {
//         title: "Completed",
//         total: projects?.completed || 0,
//         icon: "mdi:check-circle",
//         bgColor: "#10b981",
//       },
//       {
//         title: "Total Projects",
//         total: projects?.total || 0,
//         icon: "mdi:briefcase",
//         bgColor: "#8b5cf6",
//       },
//       {
//         title: "Services",
//         total: services || 0,
//         icon: "mdi:grid",
//         bgColor: "#f59e0b",
//       },
//       {
//         title: "Total Staff",
//         total: staff?.total || 0,
//         icon: "mdi:account-group",
//         bgColor: "#14b8a6",
//       },
//       {
//         title: "Inhouse Staff",
//         total: staff?.inhouse || 0,
//         icon: "mdi:account-tie",
//         bgColor: "#ec4899",
//       },
//       {
//         title: "Freelancers",
//         total: freelancers || 0,
//         icon: "mdi:briefcase-account",
//         bgColor: "#ef4444",
//       },
//       {
//         title: "Categories",
//         total: categories || 0,
//         icon: "mdi:tag-multiple",
//         bgColor: "#06b6d4",
//       },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const newStartDate = e.target.value;
//     if (endDate && newStartDate > endDate) {
//       alert('Start date cannot be after end date');
//       return;
//     }
//     setStartDate(newStartDate);
//     setFilterPeriod('custom');
//   };

//   const handleEndDateChange = (e) => {
//     const newEndDate = e.target.value;
//     if (startDate && newEndDate < startDate) {
//       alert('End date cannot be before start date');
//       return;
//     }
//     setEndDate(newEndDate);
//     setFilterPeriod('custom');
//   };

//   const handleClearDates = () => {
//     setStartDate('');
//     setEndDate('');
//     setFilterPeriod('month');
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//             <CircularProgress size={60} />
//           </div>
//         </Container>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <style>{customCSS}</style>
//         <Helmet>
//           <title>Dashboard | Admin Panel</title>
//         </Helmet>
//         <Container maxWidth="xl" sx={{ py: 2 }}>
//           <Alert severity="error" sx={{ mb: 3 }}>
//             <strong>Error:</strong> {error}
//             <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>
//               Retry
//             </button>
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   const statsData = getStatsData();

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet>
//         <title>Dashboard | Admin Panel</title>
//       </Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>
//               {currentTime.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//             <span>
//               {currentTime.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', 
//                 minute: '2-digit'
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((stat, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: stat.bgColor }}>
//                   <Iconify icon={stat.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{stat.title}</p>
//                   <h3 className="stat-value">{stat.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

    

//         {/* Analytics Header with Filters */}
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           marginBottom: '1rem',
//           marginTop: '1.5rem',
//           flexWrap: 'wrap',
//           gap: '1rem'
//         }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon">
//               <Iconify icon="mdi:chart-line" width={18} />
//             </span>
//             Purchasing Analytics
//           </Typography>
          
//           <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             <button
//               onClick={() => {
//                 setFilterPeriod('15days');
//                 setStartDate('');
//                 setEndDate('');
//               }}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: filterPeriod === '15days' && !startDate && !endDate ? '#3b82f6' : 'white',
//                 color: filterPeriod === '15days' && !startDate && !endDate ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//                 transition: 'all 0.2s ease',
//               }}
//             >
//               15 Days
//             </button>
//             <button
//               onClick={() => {
//                 setFilterPeriod('month');
//                 setStartDate('');
//                 setEndDate('');
//               }}
//               style={{
//                 padding: '0.5rem 1rem',
//                 background: filterPeriod === 'month' && !startDate && !endDate ? '#3b82f6' : 'white',
//                 color: filterPeriod === 'month' && !startDate && !endDate ? 'white' : '#64748b',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//                 transition: 'all 0.2s ease',
//               }}
//             >
//               1 Month
//             </button>
            
//             <div style={{ 
//               display: 'flex', 
//               gap: '0.5rem', 
//               alignItems: 'center',
//               padding: '0.25rem 0.5rem',
//               background: startDate && endDate ? '#eff6ff' : 'transparent',
//               borderRadius: '6px'
//             }}>
//               <input
//                 type="date"
//                 className="date-input"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 max={new Date().toISOString().split('T')[0]}
//               />
//               <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '500' }}>to</span>
//               <input
//                 type="date"
//                 className="date-input"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 max={new Date().toISOString().split('T')[0]}
//                 min={startDate}
//               />
//               {startDate && endDate && (
//                 <button
//                   onClick={handleClearDates}
//                   style={{
//                     background: '#fee2e2',
//                     border: '1px solid #fecaca',
//                     borderRadius: '4px',
//                     padding: '0.5rem 0.75rem',
//                     cursor: 'pointer',
//                     fontSize: '0.75rem',
//                     color: '#991b1b',
//                     fontWeight: '600',
//                     transition: 'all 0.2s ease',
//                   }}
//                 >
//                   ✕ Clear
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#3b82f6' }}>
//                 <Iconify icon="mdi:cart-check" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Services Bought</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalServicesBought || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#ef4444' }}>
//                 <Iconify icon="mdi:cash-refund" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refunds</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.totalRefunds || 0}</h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#10b981' }}>
//                 <Iconify icon="mdi:cash-multiple" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Total Revenue</p>
//                 <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>
//                   ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <div className="stat-card">
//               <div className="stat-icon" style={{ background: '#f59e0b' }}>
//                 <Iconify icon="mdi:percent" width={20} />
//               </div>
//               <div className="stat-content">
//                 <p className="stat-title">Refund Rate</p>
//                 <h3 className="stat-value">{analyticsData?.summary?.refundRate || 0}%</h3>
//               </div>
//             </div>
//           </Grid>
//         </Grid>



        

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
//                 <div>
//                   <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                     Purchasing Report
//                   </h3>
//                   <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
//                     Bought: {analyticsData?.summary?.totalServicesBought || 0} | 
//                     Refunded: {analyticsData?.summary?.totalRefunds || 0} | 
//                     Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Bar Chart */}
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '6px', 
//                   minWidth: '900px',
//                   height: '340px',
//                   alignItems: 'flex-end',
//                   borderBottom: '2px solid #e2e8f0',
//                   paddingBottom: '10px',
//                   paddingTop: '50px'
//                 }}>
//                   {analyticsData?.chartLabels?.map((label, index) => {
//                     const bought = analyticsData?.chartData?.servicesBought[index] || 0;
//                     const refunds = analyticsData?.chartData?.refunds[index] || 0;
//                     const boughtAmount = analyticsData?.chartData?.revenue[index] || 0;
//                     const refundAmount = analyticsData?.chartData?.refundAmount?.[index] || 0;
                    
//                     const maxValue = Math.max(
//                       ...(analyticsData?.chartData?.servicesBought || [1]), 
//                       ...(analyticsData?.chartData?.refunds || [1])
//                     );
//                     const boughtHeight = (bought / maxValue) * 240;
//                     const refundHeight = (refunds / maxValue) * 240;
                    
//                     return (
//                       <div key={index} style={{ 
//                         flex: 1, 
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         gap: '4px',
//                       }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           {/* Bought Bar */}
//                           <div style={{
//                             width: '20px',
//                             height: `${boughtHeight}px`,
//                             background: '#3b82f6',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {bought > 0 && (
//                               <>
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-42px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '11px',
//                                   fontWeight: '700',
//                                   color: '#3b82f6',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   {bought}
//                                 </div>
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-28px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '9px',
//                                   fontWeight: '600',
//                                   color: '#10b981',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   ₹{boughtAmount}
//                                 </div>
//                               </>
//                             )}
//                           </div>
                          
//                           {/* Refund Bar */}
//                           <div style={{
//                             width: '20px',
//                             height: `${refundHeight}px`,
//                             background: '#ef4444',
//                             borderRadius: '4px 4px 0 0',
//                             position: 'relative',
//                           }}>
//                             {refunds > 0 && (
//                               <>
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-42px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '11px',
//                                   fontWeight: '700',
//                                   color: '#ef4444',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   {refunds}
//                                 </div>
//                                 <div style={{
//                                   position: 'absolute',
//                                   top: '-28px',
//                                   left: '50%',
//                                   transform: 'translateX(-50%)',
//                                   fontSize: '9px',
//                                   fontWeight: '600',
//                                   color: '#f59e0b',
//                                   whiteSpace: 'nowrap',
//                                 }}>
//                                   ₹{refundAmount}
//                                 </div>
//                               </>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div style={{
//                           fontSize: '11px',
//                           whiteSpace: 'nowrap',
//                           fontWeight: '500',
//                           color: '#64748b',
//                         }}>
//                           {label}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
                
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '1.5rem', 
//                   justifyContent: 'center',
//                   marginTop: '1rem',
//                   fontSize: '0.875rem'
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }}></div>
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '100%',
//             }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Countries
//               </h3>
              
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                   analyticsData.countryStats.map((country, index) => {
//                     const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                     const color = colors[index % colors.length];
                    
//                     return (
//                       <div key={index} style={{ marginBottom: '1rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                             <div style={{ width: '14px', height: '14px', background: color, borderRadius: '3px' }}></div>
//                             <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: '600' }}>
//                               {country.label}
//                             </span>
//                           </div>
//                           <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>
//                             {country.percentage}%
//                           </span>
//                         </div>
                        
//                         <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
//                           <div style={{ width: `${country.percentage}%`, height: '100%', background: color, borderRadius: '5px' }}></div>
//                         </div>
                        
//                         <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                           <span>{country.value} purchases</span>
//                           <span style={{ fontWeight: '600', color: '#10b981' }}>₹{country.revenue.toLocaleString()}</span>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                     No country data available
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Grid>
//         </Grid>


//             {/* ✅ UPDATED - Top Rated Staff Section */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:star" width={18} />
//           </span>
//           Top Rated Staff ({topRatedStaff.length})
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               maxHeight: '500px',
//               overflowY: 'auto',
//             }}>
//               {topRatedStaff && topRatedStaff.length > 0 ? (
//                 topRatedStaff.map((staff, index) => (
//                   <div key={staff.id || index} className="staff-card">
//                     {/* Rank */}
//                     <div className="staff-rank">
//                       #{index + 1}
//                     </div>

//                     {/* Avatar */}
//                     <div className="staff-avatar">
//                       {staff.name.charAt(0).toUpperCase()}
//                     </div>

//                     {/* Info */}
//                     <div className="staff-info">
//                       <h4 className="staff-name">{staff.name}</h4>
//                       <p className="staff-role">{staff.role}</p>
//                     </div>

//                     {/* Rating */}
//                     <div className="staff-rating">
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
//                         {[...Array(5)].map((_, i) => (
//                           <Iconify
//                             key={i}
//                             icon={i < Math.floor(staff.rating) ? "mdi:star" : "mdi:star-outline"}
//                             width={16}
//                             style={{ color: '#f59e0b' }}
//                           />
//                         ))}
//                       </div>
//                       <span style={{ 
//                         fontSize: '0.875rem', 
//                         fontWeight: '700', 
//                         color: '#1e293b' 
//                       }}>
//                         {staff.rating}
//                       </span>
//                       <span style={{ 
//                         fontSize: '0.75rem', 
//                         color: '#64748b' 
//                       }}>
//                         ({staff.totalRatings})
//                       </span>
//                     </div>

//                     {/* Source */}
//                     <div className="staff-source">
//                       {staff.source}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div style={{
//                   padding: '3rem',
//                   textAlign: 'center',
//                   color: '#94a3b8',
//                 }}>
//                   <Iconify icon="mdi:star-outline" width={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
//                   <p style={{ margin: 0, fontSize: '0.875rem' }}>No rated staff yet</p>
//                 </div>
//               )}
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance & Country Revenue */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:trending-up" width={18} />
//           </span>
//           Service Performance & Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Top Services
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Service</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Bought</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Refunds</th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>Revenue</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats && analyticsData.serviceStats.length > 0 ? (
//                       analyticsData.serviceStats.map((service, index) => (
//                         <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '0.75rem 0.5rem', color: '#334155', fontWeight: '500' }}>
//                             {service.label}
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', color: '#1e40af' }}>
//                               {service.value}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                             <span style={{ 
//                               background: service.refunds > 0 ? '#fee2e2' : '#f1f5f9', 
//                               padding: '2px 8px', 
//                               borderRadius: '4px',
//                               fontSize: '0.75rem',
//                               fontWeight: '600',
//                               color: service.refunds > 0 ? '#991b1b' : '#64748b'
//                             }}>
//                               {service.refunds}
//                             </span>
//                           </td>
//                           <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                             ₹{service.revenue.toLocaleString()}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No service data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{
//               background: 'white',
//               borderRadius: '8px',
//               padding: '1.5rem',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               height: '400px',
//             }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
//                 Country Revenue
//               </h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto', fontSize: '0.875rem' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       <th style={{ padding: '0.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Country
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         %
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Purchases
//                       </th>
//                       <th style={{ padding: '0.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
//                         Revenue
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats && analyticsData.countryStats.length > 0 ? (
//                       analyticsData.countryStats.map((country, index) => {
//                         const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
//                         const color = colors[index % colors.length];
                        
//                         return (
//                           <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                             <td style={{ padding: '0.75rem 0.5rem' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                                 <div style={{ 
//                                   width: '12px', 
//                                   height: '12px', 
//                                   background: color, 
//                                   borderRadius: '2px' 
//                                 }}></div>
//                                 <span style={{ color: '#334155', fontWeight: '500' }}>
//                                   {country.label}
//                                 </span>
//                               </div>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                               <span style={{ 
//                                 background: '#fef3c7', 
//                                 padding: '2px 8px', 
//                                 borderRadius: '4px',
//                                 fontSize: '0.7rem',
//                                 fontWeight: '600',
//                                 color: '#92400e'
//                               }}>
//                                 {country.percentage}%
//                               </span>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
//                               <span style={{ 
//                                 background: '#dbeafe', 
//                                 padding: '2px 8px', 
//                                 borderRadius: '4px',
//                                 fontSize: '0.75rem',
//                                 fontWeight: '600',
//                                 color: '#1e40af'
//                               }}>
//                                 {country.value}
//                               </span>
//                             </td>
//                             <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>
//                               ₹{country.revenue.toLocaleString()}
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
//                           No country data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate
//               title="News Update"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: faker.name.jobTitle(),
//                 description: faker.name.jobTitle(),
//                 image: `/assets/images/covers/cover_${index + 1}.jpg`,
//                 postedAt: faker.date.recent(),
//               }))}
//             />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline
//               title="Order Timeline"
//               list={[...Array(5)].map((_, index) => ({
//                 id: faker.datatype.uuid(),
//                 title: [
//                   '1983, orders, $4220',
//                   '12 Invoices have been paid',
//                   'Order #37745 from September',
//                   'New order placed #XF-2356',
//                   'New order placed #XF-2346',
//                 ][index],
//                 type: `order${index + 1}`,
//                 time: faker.date.past(),
//               }))}
//             />
//           </Grid>
//         </Grid>

//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon">
//             <Iconify icon="mdi:chart-bar" width={18} />
//           </span>
//           Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite
//               title="Traffic by Site"
//               list={[
//                 { name: 'FaceBook', value: 323234, icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} /> },
//                 { name: 'Google', value: 341212, icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} /> },
//                 { name: 'Linkedin', value: 411213, icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} /> },
//                 { name: 'Twitter', value: 443232, icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} /> },
//               ]}
//             />
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <AppTasks
//               title="Tasks"
//               list={[
//                 { id: '1', label: 'Create FireStone Logo' },
//                 { id: '2', label: 'Add SCSS and JS files if required' },
//                 { id: '3', label: 'Stakeholder Meeting' },
//                 { id: '4', label: 'Scoping & Estimations' },
//                 { id: '5', label: 'Sprint Showcase' },
//               ]}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }










// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { faker } from '@faker-js/faker';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppTrafficBySite,
// } from '../sections/@dashboard/app';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [staffList, setStaffList] = useState([]);
//   const [freelancerList, setFreelancerList] = useState([]);
//   const [activeTab, setActiveTab] = useState('staff');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterPeriod, setFilterPeriod] = useState('month');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const styles = {
//     header: { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting: { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle: { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%}
//     .stat-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.08);border-color:#cbd5e1}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1}
//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}

//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}

//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:8px;padding:.875rem 1rem;display:flex;align-items:center;gap:1rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.08);border-color:#cbd5e1}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.875rem;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
//     .staff-rank.top1{background:#fef9c3;color:#92400e}
//     .staff-rank.top2{background:#f1f5f9;color:#374151}
//     .staff-rank.top3{background:#fef3c7;color:#b45309}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{background:#eff6ff;color:#1e40af;padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//   `;

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date();
//         const start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }

//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);

//       if (statsRes.data.success) setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);

//       // ✅ SMART PARSER — handles both old & new backend format
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const rawData = topStaffRes.data.data;
//         console.log("📦 GetTopRatedStaff raw data:", rawData);

//         if (Array.isArray(rawData)) {
//           // ─── OLD FORMAT: data is a flat array of staff ───────────────
//           // Separate by source field: "Internal" → staff, "Freelancer" → freelancer
//           console.log("📌 Old format detected — flat array, length:", rawData.length);
//           const staff = rawData.filter(p => p.source === 'Internal' || p.type === 'staff' || !p.source || p.source === 'not assign');
//           const freelancers = rawData.filter(p => p.source === 'Freelancer' || p.type === 'freelancer');
//           console.log("→ Staff:", staff.length, "Freelancers:", freelancers.length);
//           setStaffList(staff);
//           setFreelancerList(freelancers);
//         } else if (rawData.staff !== undefined || rawData.freelancers !== undefined) {
//           // ─── NEW FORMAT: data is { staff: [], freelancers: [] } ───────
//           console.log("📌 New format detected — object with staff/freelancers keys");
//           setStaffList(rawData.staff || []);
//           setFreelancerList(rawData.freelancers || []);
//         } else {
//           // Fallback
//           console.warn("⚠️ Unknown data format:", rawData);
//           setStaffList([]);
//           setFreelancerList([]);
//         }
//       }

//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: "New Projects", total: projects?.new || 0, icon: "mdi:rocket-launch", bg: "white" },
//       { title: "Running Projects", total: projects?.running || 0, icon: "mdi:lightning-bolt", bg: "white" },
//       { title: "Completed", total: projects?.completed || 0, icon: "mdi:check-circle", bg: "white" },
//       { title: "Total Projects", total: projects?.total || 0, icon: "mdi:briefcase", bg: "white" },
//       { title: "Services", total: services || 0, icon: "mdi:grid", bg: "white" },
//       { title: "Total Staff", total: staff?.total || 0, icon: "mdi:account-group", bg: "white" },
//       { title: "Inhouse Staff", total: staff?.inhouse || 0, icon: "mdi:account-tie", bg: "white" },
//       { title: "Freelancers", total: freelancers || 0, icon: "mdi:briefcase-account", bg: "white" },
//       { title: "Categories", total: categories || 0, icon: "mdi:tag-multiple", bg: "white" },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   const renderPeopleList = (list, type) => {
//     if (!list || list.length === 0) {
//       return (
//         <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
//           <Iconify icon="mdi:account-off-outline" width={48} style={{ opacity: 0.3, display: 'block', margin: '0 auto 1rem' }} />
//           <p style={{ margin: 0, fontSize: '0.875rem' }}>No {type === 'staff' ? 'staff' : 'freelancers'} found</p>
//         </div>
//       );
//     }
//     const isFL = type === 'freelancer';
//     return list.map((person, index) => (
//       <div key={String(person.id || person._id || index)} className="staff-card">
//         <div className={`staff-rank${index === 0 ? ' top1' : index === 1 ? ' top2' : index === 2 ? ' top3' : ''}`}>
//           #{index + 1}
//         </div>
//         <div className={`staff-avatar${isFL ? ' fl' : ''}`}>
//           {(person.name || 'U').charAt(0).toUpperCase()}
//         </div>
//         <div className="staff-info">
//           <h4 className="staff-name">{person.name}</h4>
//           <p className="staff-role">{person.role}</p>
//         </div>
//         <div className="staff-rating">
//           {person.rating > 0 || person.hasRating ? (
//             <>
//               <div style={{ display: 'flex', gap: '2px' }}>
//                 {[...Array(5)].map((_, i) => (
//                   <Iconify key={i}
//                     icon={i < Math.floor(person.rating) ? "mdi:star" : i < person.rating ? "mdi:star-half-full" : "mdi:star-outline"}
//                     width={15} style={{ color: '#f59e0b' }} />
//                 ))}
//               </div>
//               <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating}</span>
//               <span style={{ fontSize: '.75rem', color: '#64748b' }}>({person.totalRatings})</span>
//             </>
//           ) : (
//             <span className="no-rating">No rating</span>
//           )}
//         </div>
//         <div className={`src-badge${isFL ? ' fl' : ''}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//       </div>
//     ));
//   };

//   if (loading) return (
//     <><style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container></>
//   );

//   if (error) return (
//     <><style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container></>
//   );

//   const statsData = getStatsData();
//   const activeList = activeTab === 'staff' ? staffList : freelancerList;

//   return (
//     <><style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>

//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card">
//                 <div className="stat-icon border text-dark" style={{ background: s.bg }}><Iconify icon={s.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0, icon: 'mdi:cart-check', bg: '#3b82f6' },
//             { title: 'Refunds', value: analyticsData?.summary?.totalRefunds || 0, icon: 'mdi:cash-refund', bg: '#ef4444' },
//             { title: 'Total Revenue', value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`, icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate', value: `${analyticsData?.summary?.refundRate || 0}%`, icon: 'mdi:percent', bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} | Refunded: {analyticsData?.summary?.totalRefunds || 0} | Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i] || 0;
//                     const bAmt = analyticsData.chartData.revenue[i] || 0;
//                     const rAmt = analyticsData.chartData.refundAmount?.[i] || 0;
//                     const mx = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH = (bought / mx) * 240;
//                     const rH = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} /><span style={{ fontWeight: '500' }}>Services Bought</span></div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} /><span style={{ fontWeight: '500' }}>Refunds</span></div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats?.length > 0 ? analyticsData.countryStats.map((c, i) => {
//                   const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                   const col = colors[i % colors.length];
//                   return (
//                     <div key={i} style={{ marginBottom: '1rem' }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                           <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//                           <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//                         </div>
//                         <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//                       </div>
//                       <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//                         <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px' }} />
//                       </div>
//                       <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                         <span>{c.value} purchases</span>
//                         <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//                       </div>
//                     </div>
//                   );
//                 }) : <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</div>}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ✅ Staff & Freelancers — TABS */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>Staff & Freelancers
//           </Typography>
//           <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>Sorted by rating (highest first)</span>
//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff' ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} />
//                   Total Staff
//                   <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} />
//                   Freelancers
//                   <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>Service Performance & Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>{['Service','Bought','Refunds','Revenue'].map((h,i)=><th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>)}</tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0 ? analyticsData.serviceStats.map((s,i)=>(
//                       <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                         <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span></td>
//                         <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: s.refunds>0?'#fee2e2':'#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds>0?'#991b1b':'#64748b' }}>{s.refunds}</span></td>
//                         <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                       </tr>
//                     )) : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>{['Country','%','Purchases','Revenue'].map((h,i)=><th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>)}</tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats?.length > 0 ? analyticsData.countryStats.map((c,i)=>{
//                       const colors=['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                       const col=colors[i%colors.length];
//                       return(
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }}/><span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span></div></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//                         </tr>
//                       );
//                     }) : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</td></tr>}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>
// {/* 
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <AppNewsUpdate title="News Update" list={[...Array(5)].map((_,i)=>({ id: faker.datatype.uuid(), title: faker.name.jobTitle(), description: faker.name.jobTitle(), image: `/assets/images/covers/cover_${i+1}.jpg`, postedAt: faker.date.recent() }))} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <AppOrderTimeline title="Order Timeline" list={[...Array(5)].map((_,i)=>({ id: faker.datatype.uuid(), title: ['1983, orders, $4220','12 Invoices have been paid','Order #37745 from September','New order placed #XF-2356','New order placed #XF-2346'][i], type: `order${i+1}`, time: faker.date.past() }))} />
//           </Grid>
//         </Grid> */}







//         {/* <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:chart-bar" width={18} /></span>Traffic & Tasks
//         </Typography>

//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={4}>
//             <AppTrafficBySite title="Traffic by Site" list={[
//               { name: 'FaceBook', value: 323234, icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32}/> },
//               { name: 'Google', value: 341212, icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32}/> },
//               { name: 'Linkedin', value: 411213, icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32}/> },
//               { name: 'Twitter', value: 443232, icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32}/> },
//             ]} />
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <AppTasks title="Tasks" list={[
//               { id: '1', label: 'Create FireStone Logo' },
//               { id: '2', label: 'Add SCSS and JS files if required' },
//               { id: '3', label: 'Stakeholder Meeting' },
//               { id: '4', label: 'Scoping & Estimations' },
//               { id: '5', label: 'Sprint Showcase' },
//             ]} />
//           </Grid>
//         </Grid> */}


//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:chart-bar" width={18} /></span>Send Notification to team
//         </Typography>

//         <Grid container spacing={1.5}>
//           {/* <Grid item xs={12} md={4}>
//             <AppTrafficBySite title="Traffic by Site" list={[
//               { name: 'FaceBook', value: 323234, icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32}/> },
//               { name: 'Google', value: 341212, icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32}/> },
//               { name: 'Linkedin', value: 411213, icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32}/> },
//               { name: 'Twitter', value: 443232, icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32}/> },
//             ]} />
//           </Grid> */}
//           <Grid item xs={12} md={12}>
//             {/* <AppTasks title="Tasks" list={[
//               { id: '1', label: 'Create FireStone Logo' },
//               { id: '2', label: 'Add SCSS and JS files if required' },
//               { id: '3', label: 'Stakeholder Meeting' },
//               { id: '4', label: 'Scoping & Estimations' },
//               { id: '5', label: 'Sprint Showcase' },
//             ]} /> */}
//           </Grid>
//         </Grid>





        

//       </Container>
//     </>
//   );
// }







// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const [currentTime, setCurrentTime]     = useState(new Date());
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [staffList, setStaffList]         = useState([]);
//   const [freelancerList, setFreelancerList] = useState([]);
//   const [activeTab, setActiveTab]         = useState('staff');
//   const [loading, setLoading]             = useState(true);
//   const [error, setError]                 = useState(null);
//   const [filterPeriod, setFilterPeriod]   = useState('month');
//   const [startDate, setStartDate]         = useState('');
//   const [endDate, setEndDate]             = useState('');

//   // live clock
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   // ─── CSS ────────────────────────────────────────────────────────────────────
//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}

//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%}
//     .stat-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.08);border-color:#cbd5e1}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1}

//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}

//     /* ── Tabs ── */
//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}

//     /* ── Staff card ── */
//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:1rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}

//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}

//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}

//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}

//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}

//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}

//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//   `;

//   const styles = {
//     header: { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting: { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle: { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   // ─── Data Fetch ──────────────────────────────────────────────────────────────
//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end   = new Date();
//         const start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }

//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);

//       if (statsRes.data.success)    setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);

//       // ── Parse staff / freelancer lists ──────────────────────────────────────
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;

//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           // NEW FORMAT → { staff: [], freelancers: [] }
//           const staff = (raw.staff || []).sort(sortByRating);
//           const fls   = (raw.freelancers || []).sort(sortByRating);
//           setStaffList(staff);
//           setFreelancerList(fls);

//         } else if (Array.isArray(raw)) {
//           // OLD FORMAT → flat array; separate by type/source
//           const staff = raw
//             .filter(p => p.type === 'staff' || p.source === 'Internal' || (!p.source && p.type !== 'freelancer'))
//             .sort(sortByRating);
//           const fls = raw
//             .filter(p => p.type === 'freelancer' || p.source === 'Freelancer')
//             .sort(sortByRating);
//           setStaffList(staff);
//           setFreelancerList(fls);
//         } else {
//           setStaffList([]);
//           setFreelancerList([]);
//         }
//       }
//     } catch (err) {
//       console.error('Dashboard fetch error:', err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   // Sort helper: highest rating first; ties broken by totalRatings count
//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   // ─── Stats cards data ────────────────────────────────────────────────────────
//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   // ─── Render people list ──────────────────────────────────────────────────────
//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';

//     if (!list || list.length === 0) {
//       return (
//         <div className="empty-state">
//           <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//           <p className="empty-state-text">
//             No {isFL ? 'freelancers' : 'staff members'} found
//           </p>
//         </div>
//       );
//     }

//     return list.map((person, index) => {
//       const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//       const avatarLetter = (person.name || 'U').charAt(0).toUpperCase();

//       return (
//         <div key={String(person.id || person._id || index)} className="staff-card">

//           {/* Rank badge */}
//           <div className={`staff-rank${rankClass ? ` ${rankClass}` : ''}`}>
//             #{index + 1}
//           </div>

//           {/* Avatar */}
//           <div className={`staff-avatar${isFL ? ' fl' : ''}`}>
//             {avatarLetter}
//           </div>

//           {/* Info */}
//           <div className="staff-info">
//             <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//             <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//             {person.email && person.email !== 'N/A' && (
//               <p className="staff-email">{person.email}</p>
//             )}
//           </div>

//           {/* Stars */}
//           <div className="staff-rating">
//             {person.rating > 0 || person.hasRating ? (
//               <>
//                 <div style={{ display: 'flex', gap: '2px' }}>
//                   {[...Array(5)].map((_, i) => (
//                     <Iconify
//                       key={i}
//                       icon={
//                         i < Math.floor(person.rating)
//                           ? 'mdi:star'
//                           : i < person.rating
//                           ? 'mdi:star-half-full'
//                           : 'mdi:star-outline'
//                       }
//                       width={15}
//                       style={{ color: '#f59e0b' }}
//                     />
//                   ))}
//                 </div>
//                 <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>
//                   {person.rating?.toFixed(1)}
//                 </span>
//                 <span className="rating-count-badge">
//                   {person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}
//                 </span>
//               </>
//             ) : (
//               <span className="no-rating">No rating</span>
//             )}
//           </div>

//           {/* Source badge */}
//           <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>
//             {person.source || (isFL ? 'Freelancer' : 'Internal')}
//           </div>
//         </div>
//       );
//     });
//   };

//   // ─── Loading / Error states ──────────────────────────────────────────────────
//   if (loading) return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>
//             Retry
//           </button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData   = getStatsData();
//   const activeList  = activeTab === 'staff' ? staffList : freelancerList;

//   // ─── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       <Container maxWidth="xl" sx={{ py: 2 }}>

//         {/* ── Header ── */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* ── Stats Grid ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card">
//                 <div className="stat-icon border text-dark" style={{ background: 'white' }}>
//                   <Iconify icon={s.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Analytics Header ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p}
//                 onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>
//                   ✕ Clear
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Summary Cards ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                         icon: 'mdi:cart-check',   bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                         icon: 'mdi:cash-refund',  bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,        icon: 'mdi:cash-multiple',bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                      icon: 'mdi:percent',      bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card">
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Charts ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH      = (bought  / mx) * 240;
//                     const rH      = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats?.length > 0
//                   ? analyticsData.countryStats.map((c, i) => {
//                     const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                     const col = colors[i % colors.length];
//                     return (
//                       <div key={i} style={{ marginBottom: '1rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                             <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//                             <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//                           </div>
//                           <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//                         </div>
//                         <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//                           <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px' }} />
//                         </div>
//                         <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                           <span>{c.value} purchases</span>
//                           <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//                         </div>
//                       </div>
//                     );
//                   })
//                   : <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</div>
//                 }
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Staff & Freelancers TABS ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>
//           <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>
//             Sorted by rating — highest first
//           </span>
//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>

//               {/* Tabs */}
//               <div className="people-tabs">
//                 <button
//                   className={`people-tab${activeTab === 'staff' ? ' active' : ''}`}
//                   onClick={() => setActiveTab('staff')}
//                 >
//                   <Iconify icon="mdi:account-tie" width={16} />
//                   Internal Staff
//                   <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button
//                   className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`}
//                   onClick={() => setActiveTab('freelancer')}
//                 >
//                   <Iconify icon="mdi:briefcase-account" width={16} />
//                   Freelancers
//                   <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//               </div>

//               {/* List */}
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Service Performance ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0 ? 'left' : i===3 ? 'right' : 'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0 ? 'left' : i===3 ? 'right' : 'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats?.length > 0
//                       ? analyticsData.countryStats.map((c, i) => {
//                         const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                         const col = colors[i % colors.length];
//                         return (
//                           <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                             <td style={{ padding: '.75rem .5rem' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                                 <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//                                 <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//                               </div>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                               <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                               <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//                           </tr>
//                         );
//                       })
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Notification Section ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:bell-ring" width={18} /></span>
//           Send Notification to Team
//         </Typography>
//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={12} />
//         </Grid>

//       </Container>
//     </>
//   );
// }





// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime, setCurrentTime]       = useState(new Date());
//   const [dashboardData, setDashboardData]   = useState(null);
//   const [analyticsData, setAnalyticsData]   = useState(null);
//   const [staffList, setStaffList]           = useState([]);
//   const [freelancerList, setFreelancerList] = useState([]);
//   const [activeTab, setActiveTab]           = useState('staff');
//   const [loading, setLoading]               = useState(true);
//   const [error, setError]                   = useState(null);
//   const [filterPeriod, setFilterPeriod]     = useState('month');
//   const [startDate, setStartDate]           = useState('');
//   const [endDate, setEndDate]               = useState('');

//   // live clock
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   // ─── CSS ────────────────────────────────────────────────────────────────────
//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}

//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%;cursor:pointer;text-decoration:none;}
//     .stat-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:#94a3b8;transform:translateY(-2px);}
//     .stat-card:hover .stat-value{color:#3b82f6;}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1;transition:color .2s;}
//     .stat-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:#3b82f6;flex-shrink:0;}
//     .stat-card:hover .stat-arrow{opacity:1;transform:translateX(0);}

//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}

//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}

//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:1rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}
//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//   `;

//   const styles = {
//     header:       { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting:     { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle:     { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   // ─── Data Fetch ──────────────────────────────────────────────────────────────
//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end   = new Date();
//         const start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }

//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);

//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);

//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           setStaffList((raw.staff       || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         } else if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff'      || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else {
//           setStaffList([]); setFreelancerList([]);
//         }
//       }
//     } catch (err) {
//       console.error('Dashboard fetch error:', err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   // ─── Stats cards — path bhi define karo ─────────────────────────────────────
//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',     path: '/dashboard/new-project',      color: '#6366f1' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',     path: '/dashboard/running-project',  color: '#f59e0b' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',       path: '/dashboard/complete-project', color: '#10b981' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',          path: '/dashboard/new-project',      color: '#3b82f6' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',               path: '/dashboard/service',          color: '#8b5cf6' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',      path: '/dashboard/staff',            color: '#06b6d4' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',        path: '/dashboard/staff',            color: '#0ea5e9' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account',  path: '/dashboard/Freelancers',      color: '#ec4899' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',       path: '/dashboard/category',         color: '#f97316' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   // ─── Render people list ──────────────────────────────────────────────────────
//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list || list.length === 0) {
//       return (
//         <div className="empty-state">
//           <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//           <p className="empty-state-text">No {isFL ? 'freelancers' : 'staff members'} found</p>
//         </div>
//       );
//     }
//     return list.map((person, index) => {
//       const rankClass    = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//       const avatarLetter = (person.name || 'U').charAt(0).toUpperCase();
//       return (
//         <div key={String(person.id || person._id || index)} className="staff-card">
//           <div className={`staff-rank${rankClass ? ` ${rankClass}` : ''}`}>#{index + 1}</div>
//           <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{avatarLetter}</div>
//           <div className="staff-info">
//             <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//             <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//             {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//           </div>
//           <div className="staff-rating">
//             {person.rating > 0 || person.hasRating ? (
//               <>
//                 <div style={{ display: 'flex', gap: '2px' }}>
//                   {[...Array(5)].map((_, i) => (
//                     <Iconify key={i} icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'} width={15} style={{ color: '#f59e0b' }} />
//                   ))}
//                 </div>
//                 <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating?.toFixed(1)}</span>
//                 <span className="rating-count-badge">{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</span>
//               </>
//             ) : (
//               <span className="no-rating">No rating</span>
//             )}
//           </div>
//           <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//         </div>
//       );
//     });
//   };

//   // ─── Loading / Error ─────────────────────────────────────────────────────────
//   if (loading) return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData  = getStatsData();
//   const activeList = activeTab === 'staff' ? staffList : freelancerList;

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       <Container maxWidth="xl" sx={{ py: 0 }}>

//         {/* ── Header ── */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* ── Stats Grid — clickable cards ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               {/* ✅ onClick se navigate karo */}
//               <div
//                 className="stat-card"
//                 onClick={() => navigate(s.path)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === 'Enter' && navigate(s.path)}
//               >
//                 <div className="stat-icon" style={{ background: s.color }}>
//                   <Iconify icon={s.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 {/* arrow — hover pe dikhega */}
//                 <Iconify icon="mdi:arrow-right" width={16} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Analytics Header ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p}
//                 onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Summary Cards ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                  icon: 'mdi:cart-check',    bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                  icon: 'mdi:cash-refund',   bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`, icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,               icon: 'mdi:percent',       bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Charts ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH      = (bought  / mx) * 240;
//                     const rH      = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
              
//               <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//               <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {analyticsData?.countryStats?.length > 0
//                   ? analyticsData.countryStats.map((c, i) => {
//                     const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                     const col = colors[i % colors.length];
//                     return (
//                       <div key={i} style={{ marginBottom: '1rem' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                             <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//                             <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//                           </div>
//                           <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//                         </div>
//                         <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//                           <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px' }} />
//                         </div>
//                         <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//                           <span>{c.value} purchases</span>
//                           <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//                         </div>
//                       </div>
//                     );
//                   })
//                   : <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</div>
//                 }
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Staff & Freelancers TABS ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>
//           <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>Sorted by rating — highest first</span>
//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff' ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} />
//                   Internal Staff
//                   <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} />
//                   Freelancers
//                   <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Service Performance ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats?.length > 0
//                       ? analyticsData.countryStats.map((c, i) => {
//                         const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                         const col = colors[i % colors.length];
//                         return (
//                           <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                             <td style={{ padding: '.75rem .5rem' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                                 <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//                                 <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//                               </div>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                               <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                               <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//                           </tr>
//                         );
//                       })
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Notification Section ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:bell-ring" width={18} /></span>
//           Send Notification to Team
//         </Typography>
//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={12} />
//         </Grid>

//       </Container>
//     </>
//   );
// }









// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// // ── Domestic country names — India ke liye ──────────────────────────────────
// const DOMESTIC_COUNTRIES = ['india', 'in'];

// const isDomestic = (label = '') =>
//   DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime, setCurrentTime]         = useState(new Date());
//   const [dashboardData, setDashboardData]     = useState(null);
//   const [analyticsData, setAnalyticsData]     = useState(null);
//   const [staffList, setStaffList]             = useState([]);
//   const [freelancerList, setFreelancerList]   = useState([]);
//   const [activeTab, setActiveTab]             = useState('staff');
//   const [countryTab, setCountryTab]           = useState('domestic');   // ✅ new
//   const [loading, setLoading]                 = useState(true);
//   const [error, setError]                     = useState(null);
//   const [filterPeriod, setFilterPeriod]       = useState('month');
//   const [startDate, setStartDate]             = useState('');
//   const [endDate, setEndDate]                 = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}

//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%;cursor:pointer;text-decoration:none;}
//     .stat-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:#94a3b8;transform:translateY(-2px);}
//     .stat-card:hover .stat-value{color:#3b82f6;}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1;transition:color .2s;}
//     .stat-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:#3b82f6;flex-shrink:0;}
//     .stat-card:hover .stat-arrow{opacity:1;transform:translateX(0);}

//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}

//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}

//     /* ── Country tabs ── */
//     .country-tabs{display:flex;gap:.5rem;margin-bottom:1.25rem}
//     .country-tab{flex:1;padding:.5rem .75rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:.8rem;font-weight:600;color:#64748b;transition:all .2s;text-align:center}
//     .country-tab.active.domestic{background:#eff6ff;border-color:#3b82f6;color:#1d4ed8;}
//     .country-tab.active.international{background:#f0fdf4;border-color:#22c55e;color:#15803d;}
//     .country-tab:hover:not(.active){background:#f1f5f9;border-color:#cbd5e1;}
//     .country-tab-icon{font-size:1rem;margin-bottom:2px;display:block;}
//     .no-country{padding:2rem;text-align:center;color:#94a3b8;font-size:.875rem}

//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:1rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}
//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//   `;

//   const styles = {
//     header:       { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting:     { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle:     { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date(), start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }

//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);

//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);

//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           setStaffList((raw.staff || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         } else if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff' || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else {
//           setStaffList([]); setFreelancerList([]);
//         }
//       }
//     } catch (err) {
//       console.error('Dashboard fetch error:', err);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',    path: '/dashboard/new-project',      color: '#6366f1' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',    path: '/dashboard/running-project',  color: '#f59e0b' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',      path: '/dashboard/complete-project', color: '#10b981' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',         path: '/dashboard/new-project',      color: '#3b82f6' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',              path: '/dashboard/service',          color: '#8b5cf6' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',     path: '/dashboard/staff',            color: '#06b6d4' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',       path: '/dashboard/staff',            color: '#0ea5e9' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account', path: '/dashboard/Freelancers',      color: '#ec4899' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',      path: '/dashboard/category',         color: '#f97316' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   // ── Country stats split ──────────────────────────────────────────────────────
//   const allCountries      = analyticsData?.countryStats || [];
//   const domesticCountries = allCountries.filter(c => isDomestic(c.label));
//   const intlCountries     = allCountries.filter(c => !isDomestic(c.label));
//   const activeCountries   = countryTab === 'domestic' ? domesticCountries : intlCountries;

//   // ── Country bar renderer ─────────────────────────────────────────────────────
//   const renderCountryList = (list, accentColor) => {
//     if (!list || list.length === 0) {
//       return (
//         <div className="no-country">
//           <Iconify icon="mdi:earth-off" width={32} style={{ opacity: 0.25, display: 'block', margin: '0 auto .75rem' }} />
//           No data available
//         </div>
//       );
//     }
//     const colors = accentColor
//       ? [accentColor]
//       : ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];

//     return list.map((c, i) => {
//       const col = colors[i % colors.length];
//       return (
//         <div key={i} style={{ marginBottom: '1rem' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//               <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//             </div>
//             <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//           </div>
//           <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//             <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px', transition: 'width .4s ease' }} />
//           </div>
//           <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//             <span>{c.value} purchases</span>
//             <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//           </div>
//         </div>
//       );
//     });
//   };

//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list || list.length === 0) {
//       return (
//         <div className="empty-state">
//           <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//           <p className="empty-state-text">No {isFL ? 'freelancers' : 'staff members'} found</p>
//         </div>
//       );
//     }
//     return list.map((person, index) => {
//       const rankClass    = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//       const avatarLetter = (person.name || 'U').charAt(0).toUpperCase();
//       return (
//         <div key={String(person.id || person._id || index)} className="staff-card">
//           <div className={`staff-rank${rankClass ? ` ${rankClass}` : ''}`}>#{index + 1}</div>
//           <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{avatarLetter}</div>
//           <div className="staff-info">
//             <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//             <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//             {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//           </div>
//           <div className="staff-rating">
//             {person.rating > 0 || person.hasRating ? (
//               <>
//                 <div style={{ display: 'flex', gap: '2px' }}>
//                   {[...Array(5)].map((_, i) => (
//                     <Iconify key={i} icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'} width={15} style={{ color: '#f59e0b' }} />
//                   ))}
//                 </div>
//                 <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating?.toFixed(1)}</span>
//                 <span className="rating-count-badge">{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</span>
//               </>
//             ) : (
//               <span className="no-rating">No rating</span>
//             )}
//           </div>
//           <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//         </div>
//       );
//     });
//   };

//   if (loading) return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData  = getStatsData();
//   const activeList = activeTab === 'staff' ? staffList : freelancerList;

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       <Container maxWidth="xl" sx={{ py: 0 }}>

//         {/* ── Header ── */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* ── Stats Grid ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(s.path)}>
//                 <div className="stat-icon" style={{ background: s.color }}>
//                   <Iconify icon={s.icon} width={20} />
//                 </div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 <Iconify icon="mdi:arrow-right" width={16} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Analytics Header ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Summary Cards ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                   icon: 'mdi:cart-check',    bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                   icon: 'mdi:cash-refund',   bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,  icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                icon: 'mdi:percent',       bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Charts ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {/* Bar chart */}
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH      = (bought  / mx) * 240;
//                     const rH      = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           {/* ✅ Countries — Domestic / International tabs */}
//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>

//               {/* Header row */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>
//                   {allCountries.length} {allCountries.length === 1 ? 'country' : 'countries'}
//                 </span>
//               </div>

//               {/* ✅ Domestic / International tabs */}
//               <div className="country-tabs">
//                 <button
//                   className={`country-tab${countryTab === 'domestic' ? ' active domestic' : ''}`}
//                   onClick={() => setCountryTab('domestic')}
//                 >
//                   <span className="country-tab-icon">🇮🇳</span>
//                   Domestic
//                   <span style={{ marginLeft: '4px', fontSize: '.7rem', opacity: .7 }}>({domesticCountries.length})</span>
//                 </button>
//                 <button
//                   className={`country-tab${countryTab === 'international' ? ' active international' : ''}`}
//                   onClick={() => setCountryTab('international')}
//                 >
//                   <span className="country-tab-icon">🌍</span>
//                   International
//                   <span style={{ marginLeft: '4px', fontSize: '.7rem', opacity: .7 }}>({intlCountries.length})</span>
//                 </button>
//               </div>

//               {/* ✅ Summary strip */}
//               {activeCountries.length > 0 && (
//                 <div style={{ background: countryTab === 'domestic' ? '#eff6ff' : '#f0fdf4', borderRadius: '6px', padding: '.5rem .75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '.75rem' }}>
//                   <span style={{ color: '#475569', fontWeight: '500' }}>
//                     {activeCountries.reduce((s, c) => s + c.value, 0)} purchases
//                   </span>
//                   <span style={{ fontWeight: '700', color: '#10b981' }}>
//                     ₹{activeCountries.reduce((s, c) => s + c.revenue, 0).toLocaleString()}
//                   </span>
//                 </div>
//               )}

//               {/* Country list */}
//               <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
//                 {renderCountryList(
//                   activeCountries,
//                   countryTab === 'domestic' ? '#3b82f6' : null
//                 )}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Staff & Freelancers TABS ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>
//           <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>Sorted by rating — highest first</span>
//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff' ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} />
//                   Internal Staff
//                   <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} />
//                   Freelancers
//                   <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Service Performance ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.countryStats?.length > 0
//                       ? analyticsData.countryStats.map((c, i) => {
//                         const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//                         const col = colors[i % colors.length];
//                         return (
//                           <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                             <td style={{ padding: '.75rem .5rem' }}>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                                 <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//                                 <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//                               </div>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                               <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                               <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//                             </td>
//                             <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//                           </tr>
//                         );
//                       })
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No country data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Notification Section ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:bell-ring" width={18} /></span>
//           Send Notification to Team
//         </Typography>
//         <Grid container spacing={1.5}>
//           <Grid item xs={12} md={12} />
//         </Grid>

//       </Container>
//     </>
//   );
// }








// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// const DOMESTIC_COUNTRIES = ['india', 'in'];
// const isDomestic = (label = '') => DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime, setCurrentTime]       = useState(new Date());
//   const [dashboardData, setDashboardData]   = useState(null);
//   const [analyticsData, setAnalyticsData]   = useState(null);
//   const [staffList, setStaffList]           = useState([]);
//   const [freelancerList, setFreelancerList] = useState([]);
//   const [activeTab, setActiveTab]           = useState('staff');
//   const [countryTab, setCountryTab]         = useState('domestic');
//   const [countryRevenueTab, setCountryRevenueTab] = useState('domestic'); // ✅ new
//   const [loading, setLoading]               = useState(true);
//   const [error, setError]                   = useState(null);
//   const [filterPeriod, setFilterPeriod]     = useState('month');
//   const [startDate, setStartDate]           = useState('');
//   const [endDate, setEndDate]               = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}

//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%;cursor:pointer;}
//     .stat-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:#94a3b8;transform:translateY(-2px);}
//     .stat-card:hover .stat-value{color:#3b82f6;}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1;transition:color .2s;}
//     .stat-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:#3b82f6;flex-shrink:0;}
//     .stat-card:hover .stat-arrow{opacity:1;transform:translateX(0);}

//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}

//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}

//     .country-tabs{display:flex;gap:.5rem;margin-bottom:1rem}
//     .country-tab{flex:1;padding:.45rem .75rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:.78rem;font-weight:600;color:#64748b;transition:all .2s;text-align:center;display:flex;align-items:center;justify-content:center;gap:.35rem;}
//     .country-tab.active.domestic{background:#eff6ff;border-color:#3b82f6;color:#1d4ed8;}
//     .country-tab.active.international{background:#f0fdf4;border-color:#22c55e;color:#15803d;}
//     .country-tab:hover:not(.active){background:#f1f5f9;border-color:#cbd5e1;}
//     .no-country{padding:2rem;text-align:center;color:#94a3b8;font-size:.875rem}

//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:1rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}
//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//   `;

//   const styles = {
//     header:       { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting:     { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle:     { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true); setError(null);
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date(), start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }
//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);
//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           setStaffList((raw.staff || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         } else if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff' || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else { setStaffList([]); setFreelancerList([]); }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally { setLoading(false); }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',    path: '/dashboard/new-project',      color: '#6366f1' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',    path: '/dashboard/running-project',  color: '#f59e0b' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',      path: '/dashboard/complete-project', color: '#10b981' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',         path: '/dashboard/new-project',      color: '#3b82f6' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',              path: '/dashboard/service',          color: '#8b5cf6' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',     path: '/dashboard/staff',            color: '#06b6d4' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',       path: '/dashboard/staff',            color: '#0ea5e9' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account', path: '/dashboard/Freelancers',      color: '#ec4899' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',      path: '/dashboard/category',         color: '#f97316' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   // ── Country splits ───────────────────────────────────────────────────────────
//   const allCountries          = analyticsData?.countryStats || [];
//   const domesticCountries     = allCountries.filter(c =>  isDomestic(c.label));
//   const intlCountries         = allCountries.filter(c => !isDomestic(c.label));
//   const activeCountries       = countryTab        === 'domestic' ? domesticCountries : intlCountries;
//   const activeRevenueCountries = countryRevenueTab === 'domestic' ? domesticCountries : intlCountries;

//   // ── Reusable tab buttons ─────────────────────────────────────────────────────
//   const CountryTabButtons = ({ value, onChange }) => (
//     <div className="country-tabs">
//       <button
//         className={`country-tab${value === 'domestic' ? ' active domestic' : ''}`}
//         onClick={() => onChange('domestic')}
//       >
//         🇮🇳 Domestic
//         <span style={{ fontSize: '.7rem', opacity: .7 }}>({domesticCountries.length})</span>
//       </button>
//       <button
//         className={`country-tab${value === 'international' ? ' active international' : ''}`}
//         onClick={() => onChange('international')}
//       >
//         🌍 International
//         <span style={{ fontSize: '.7rem', opacity: .7 }}>({intlCountries.length})</span>
//       </button>
//     </div>
//   );

//   // ── Summary strip ────────────────────────────────────────────────────────────
//   const CountrySummaryStrip = ({ list, tab }) =>
//     list.length > 0 ? (
//       <div style={{ background: tab === 'domestic' ? '#eff6ff' : '#f0fdf4', borderRadius: '6px', padding: '.45rem .75rem', marginBottom: '.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '.75rem' }}>
//         <span style={{ color: '#475569', fontWeight: '500' }}>
//           {list.reduce((s, c) => s + c.value, 0)} purchases
//         </span>
//         <span style={{ fontWeight: '700', color: '#10b981' }}>
//           ₹{list.reduce((s, c) => s + c.revenue, 0).toLocaleString()}
//         </span>
//       </div>
//     ) : null;

//   // ── Country bar list ─────────────────────────────────────────────────────────
//   const renderCountryBars = (list, singleColor) => {
//     if (!list?.length) return (
//       <div className="no-country">
//         <Iconify icon="mdi:earth-off" width={32} style={{ opacity: .25, display: 'block', margin: '0 auto .75rem' }} />
//         No data available
//       </div>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = singleColor || palette[i % palette.length];
//       return (
//         <div key={i} style={{ marginBottom: '1rem' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//               <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//             </div>
//             <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//           </div>
//           <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//             <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px', transition: 'width .4s ease' }} />
//           </div>
//           <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//             <span>{c.value} purchases</span>
//             <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//           </div>
//         </div>
//       );
//     });
//   };

//   // ── Country revenue table ────────────────────────────────────────────────────
//   const renderCountryTable = (list) => {
//     if (!list?.length) return (
//       <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No data available</td></tr>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = palette[i % palette.length];
//       return (
//         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//           <td style={{ padding: '.75rem .5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//               <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//             </div>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//         </tr>
//       );
//     });
//   };

//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list?.length) return (
//       <div className="empty-state">
//         <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//         <p className="empty-state-text">No {isFL ? 'freelancers' : 'staff members'} found</p>
//       </div>
//     );
//     return list.map((person, index) => {
//       const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//       const avatarLetter = (person.name || 'U').charAt(0).toUpperCase();
//       return (
//         <div key={String(person.id || person._id || index)} className="staff-card">
//           <div className={`staff-rank${rankClass ? ` ${rankClass}` : ''}`}>#{index + 1}</div>
//           <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{avatarLetter}</div>
//           <div className="staff-info">
//             <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//             <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//             {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//           </div>
//           <div className="staff-rating">
//             {person.rating > 0 || person.hasRating ? (
//               <>
//                 <div style={{ display: 'flex', gap: '2px' }}>
//                   {[...Array(5)].map((_, i) => (
//                     <Iconify key={i} icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'} width={15} style={{ color: '#f59e0b' }} />
//                   ))}
//                 </div>
//                 <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating?.toFixed(1)}</span>
//                 <span className="rating-count-badge">{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</span>
//               </>
//             ) : <span className="no-rating">No rating</span>}
//           </div>
//           <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//         </div>
//       );
//     });
//   };

//   if (loading) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData  = getStatsData();
//   const activeList = activeTab === 'staff' ? staffList : freelancerList;

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 0 }}>

//         {/* ── Header ── */}
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* ── Stats Grid ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(s.path)}>
//                 <div className="stat-icon" style={{ background: s.color }}><Iconify icon={s.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 <Iconify icon="mdi:arrow-right" width={16} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Analytics Header ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Summary Cards ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                   icon: 'mdi:cart-check',    bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                   icon: 'mdi:cash-refund',   bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,  icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                icon: 'mdi:percent',       bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ── Charts ── */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {/* Bar chart */}
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH = (bought / mx) * 240, rH = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           {/* ✅ Countries bar — Domestic / International */}
//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryTab} onChange={setCountryTab} />
//               <CountrySummaryStrip list={activeCountries} tab={countryTab} />
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 {renderCountryBars(activeCountries, countryTab === 'domestic' ? '#3b82f6' : null)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Staff & Freelancers ── */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>
//           <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>Sorted by rating — highest first</span>
//         </div>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff' ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} /> Internal Staff <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} /> Freelancers <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Service Performance & Geography ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {/* Top Services table */}
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           {/* ✅ Country Revenue table — Domestic / International tabs */}
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px', display: 'flex', flexDirection: 'column' }}>

//               {/* Header */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>

//               {/* ✅ Tabs */}
//               <CountryTabButtons value={countryRevenueTab} onChange={setCountryRevenueTab} />

//               {/* ✅ Summary strip */}
//               <CountrySummaryStrip list={activeRevenueCountries} tab={countryRevenueTab} />

//               {/* Table */}
//               <div style={{ flex: 1, overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {renderCountryTable(activeRevenueCountries)}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── Notification ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:bell-ring" width={18} /></span>
//           Send Notification to Team
//         </Typography>
//         <Grid container spacing={1.5}><Grid item xs={12} md={12} /></Grid>

//       </Container>
//     </>
//   );
// }





// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// const DOMESTIC_COUNTRIES = ['india', 'in'];
// const isDomestic = (label = '') => DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());

// const parseKey   = (key)          => { const [id, type] = key.split('::'); return { id, type }; };
// const makeKey    = (person, type) => `${person.id || person._id}::${type}`;
// const getInitial = (name)         => (name || 'U').charAt(0).toUpperCase();

// // Defined OUTSIDE component — no re-creation on render
// const CheckSVG = () => (
//   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//     <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime,       setCurrentTime]       = useState(new Date());
//   const [dashboardData,     setDashboardData]      = useState(null);
//   const [analyticsData,     setAnalyticsData]      = useState(null);
//   const [staffList,         setStaffList]          = useState([]);
//   const [freelancerList,    setFreelancerList]     = useState([]);
//   const [activeTab,         setActiveTab]          = useState('staff');
//   const [countryTab,        setCountryTab]         = useState('domestic');
//   const [countryRevenueTab, setCountryRevenueTab]  = useState('domestic');
//   const [loading,           setLoading]            = useState(true);
//   const [error,             setError]              = useState(null);
//   const [filterPeriod,      setFilterPeriod]       = useState('month');
//   const [startDate,         setStartDate]          = useState('');
//   const [endDate,           setEndDate]            = useState('');

//   // Notification state
//   const [selectedPeople,  setSelectedPeople]  = useState(new Set());
//   const [notifModalOpen,  setNotifModalOpen]  = useState(false);
//   const [modalRecipients, setModalRecipients] = useState(new Set());
//   const [notifSubject,    setNotifSubject]    = useState('');
//   const [notifMessage,    setNotifMessage]    = useState('');
//   const [notifSending,    setNotifSending]    = useState(false);
//   const [notifSuccess,    setNotifSuccess]    = useState('');
//   const [notifError,      setNotifError]      = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);


// const StaffgetAllNotification = async()=>{
//   try {
//     const response = await axios.get(`${Url}/StaffcustomnotificationRoutes/GetAllNotificationStaff`)
//     console.log("response",response)
    
//   } catch (error) {
    
//   }
// }


// useEffect(()=>{
//   StaffgetAllNotification()
// },[])

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const openNotifModal = () => {
//     setModalRecipients(new Set(selectedPeople));
//     setNotifSubject('');
//     setNotifMessage('');
//     setNotifSuccess('');
//     setNotifError('');
//     setNotifModalOpen(true);
//   };

//   const closeNotifModal = () => setNotifModalOpen(false);

//   const toggleSelect = (person, type) => {
//     const key = makeKey(person, type);
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       next.has(key) ? next.delete(key) : next.add(key);
//       return next;
//     });
//   };

//   const toggleSelectAll = (list, type) => {
//     const keys   = list.map(p => makeKey(p, type));
//     const allSel = keys.every(k => selectedPeople.has(k));
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       if (allSel) keys.forEach(k => next.delete(k));
//       else        keys.forEach(k => next.add(k));
//       return next;
//     });
//   };

//   const removeModalRecipient = (key) =>
//     setModalRecipients(prev => { const n = new Set(prev); n.delete(key); return n; });

//   const getPersonFromKey = (key) => {
//     const { id, type } = parseKey(key);
//     const list = type === 'staff' ? staffList : freelancerList;
//     return { person: list.find(p => String(p.id || p._id) === String(id)), type };
//   };

//   const handleSendNotification = async () => {
//     if (!notifMessage.trim())  { setNotifError('Message cannot be empty.'); return; }
//     if (!modalRecipients.size) { setNotifError('No recipients selected.');  return; }

//     // Admin ID localStorage se nikalo
//     let sentBy = null;
//     try {
//       const adminRaw = localStorage.getItem('admin');
//       if (adminRaw) {
//         const adminObj = JSON.parse(adminRaw);
//         sentBy = adminObj?._id || adminObj?.id || null;
//       }
//     } catch { sentBy = null; }

//     if (!sentBy) { setNotifError('Admin session not found. Please login again.'); return; }

//     setNotifError(''); setNotifSending(true);
//     try {
//       const recipients = [...modalRecipients].map(k => parseKey(k));
//       const res = await axios.post(`${Url}/StaffcustomnotificationRoutes/send`, {
//         subject: notifSubject, message: notifMessage, recipients, sentBy,
//       });
//       if (res.data.success) {
//         setNotifSuccess(`✓ Notification sent to ${res.data.data.totalRecipients} recipient(s)!`);
//         setTimeout(() => { setSelectedPeople(new Set()); closeNotifModal(); }, 1600);
//       } else {
//         setNotifError(res.data.message || 'Something went wrong.');
//       }
//     } catch (err) {
//       setNotifError(err.response?.data?.message || err.message);
//     } finally { setNotifSending(false); }
//   };

//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%;cursor:pointer;}
//     .stat-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:#94a3b8;transform:translateY(-2px);}
//     .stat-card:hover .stat-value{color:#3b82f6;}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1;transition:color .2s;}
//     .stat-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:#3b82f6;flex-shrink:0;}
//     .stat-card:hover .stat-arrow{opacity:1;transform:translateX(0);}
//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}
//     .country-tabs{display:flex;gap:.5rem;margin-bottom:1rem}
//     .country-tab{flex:1;padding:.45rem .75rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:.78rem;font-weight:600;color:#64748b;transition:all .2s;text-align:center;display:flex;align-items:center;justify-content:center;gap:.35rem;}
//     .country-tab.active.domestic{background:#eff6ff;border-color:#3b82f6;color:#1d4ed8;}
//     .country-tab.active.international{background:#f0fdf4;border-color:#22c55e;color:#15803d;}
//     .country-tab:hover:not(.active){background:#f1f5f9;border-color:#cbd5e1;}
//     .no-country{padding:2rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:.75rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}
//     .staff-card.selected{border-color:#3b82f6 !important;background:#f0f7ff;box-shadow:0 0 0 2px rgba(59,130,246,.15) !important}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}
//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//     .scn-cb-wrap{position:relative;cursor:pointer;flex-shrink:0;width:20px;height:20px}
//     .scn-cb-wrap input[type=checkbox]{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
//     .scn-cb-box{width:20px;height:20px;border:2px solid #cbd5e1;border-radius:5px;display:flex;align-items:center;justify-content:center;transition:all .15s;background:white;cursor:pointer}
//     .scn-cb-wrap input:checked ~ .scn-cb-box{background:#3b82f6;border-color:#3b82f6}
//     .scn-cb-box svg{opacity:0;transform:scale(.5);transition:all .15s}
//     .scn-cb-wrap input:checked ~ .scn-cb-box svg{opacity:1;transform:scale(1)}
//     .scn-select-bar{display:flex;align-items:center;gap:.75rem;padding:.5rem .875rem;background:#f8fafc;border-radius:8px;margin-bottom:.75rem;border:1px solid #e2e8f0}
//     .scn-sel-count{margin-left:auto;font-size:.75rem;background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:4px;font-weight:600}
//     .scn-send-fab{display:flex;align-items:center;gap:.5rem;padding:.55rem 1.1rem;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;border-radius:8px;cursor:pointer;font-size:.8rem;font-weight:700;box-shadow:0 4px 14px rgba(59,130,246,.4);transition:all .2s;white-space:nowrap}
//     .scn-send-fab:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(59,130,246,.5)}
//     .scn-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(4px);z-index:1400;display:flex;align-items:center;justify-content:center;padding:1rem}
//     .scn-modal{background:white;border-radius:16px;width:100%;max-width:580px;box-shadow:0 25px 60px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:92vh;overflow:hidden}
//     .scn-modal-header{padding:1.25rem 1.5rem;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
//     .scn-modal-body{padding:1.25rem 1.5rem;overflow-y:auto;flex:1}
//     .scn-modal-footer{padding:1rem 1.5rem;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:.75rem;flex-shrink:0;background:#f8fafc}
//     .scn-close-btn{width:32px;height:32px;border-radius:8px;border:1px solid #e2e8f0;background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:all .15s;padding:0}
//     .scn-close-btn:hover{background:#f1f5f9;color:#1e293b}
//     .scn-label{font-size:.8rem;font-weight:700;color:#374151;margin-bottom:.375rem;display:block}
//     .scn-recipients-box{display:flex;flex-wrap:wrap;gap:.4rem;padding:.625rem;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;min-height:48px;margin-bottom:1rem}
//     .scn-chip{display:flex;align-items:center;gap:.35rem;padding:.25rem .6rem .25rem .35rem;background:white;border:1px solid #e2e8f0;border-radius:20px;font-size:.78rem;font-weight:600;color:#334155;box-shadow:0 1px 2px rgba(0,0,0,.05)}
//     .scn-chip-avatar{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:white;flex-shrink:0}
//     .scn-chip-avatar.staff{background:linear-gradient(135deg,#667eea,#764ba2)}
//     .scn-chip-avatar.freelancer{background:linear-gradient(135deg,#f093fb,#f5576c)}
//     .scn-chip-remove{width:16px;height:16px;border-radius:50%;background:#f1f5f9;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;transition:all .15s;padding:0;margin-left:.1rem}
//     .scn-chip-remove:hover{background:#fecaca;color:#dc2626}
//     .scn-section-label{width:100%;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin:.35rem 0 .25rem .1rem}
//     .scn-input{width:100%;padding:.625rem .875rem;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.875rem;color:#1e293b;font-family:inherit;transition:border .15s;background:white;box-sizing:border-box;margin-bottom:.875rem}
//     .scn-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
//     .scn-textarea{resize:vertical;min-height:120px;line-height:1.65;margin-bottom:.25rem}
//     .scn-char{font-size:.72rem;color:#94a3b8;text-align:right;margin-bottom:.5rem}
//     .scn-banner{display:flex;align-items:center;gap:.625rem;padding:.75rem 1rem;border-radius:8px;font-size:.875rem;font-weight:500;margin-bottom:.875rem}
//     .scn-banner.success{background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d}
//     .scn-banner.error{background:#fef2f2;border:1px solid #fecaca;color:#dc2626}
//     .scn-btn-cancel{padding:.65rem 1.25rem;background:white;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.875rem;font-weight:600;color:#64748b;cursor:pointer;transition:all .15s}
//     .scn-btn-cancel:hover{background:#f1f5f9;border-color:#cbd5e1}
//     .scn-btn-send{display:flex;align-items:center;gap:.5rem;padding:.65rem 1.5rem;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;border-radius:8px;font-size:.875rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(59,130,246,.35);transition:all .2s}
//     .scn-btn-send:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 18px rgba(59,130,246,.45)}
//     .scn-btn-send:disabled{opacity:.5;cursor:not-allowed;transform:none}
//     @keyframes scnSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//     .scn-spin{animation:scnSpin 1s linear infinite}
//   `;

//   const styles = {
//     header:       { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting:     { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle:     { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true); setError(null);
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date(), start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }
//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);
//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           setStaffList((raw.staff       || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         } else if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff'      || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else { setStaffList([]); setFreelancerList([]); }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally { setLoading(false); }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',    path: '/dashboard/new-project',      color: '#6366f1' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',    path: '/dashboard/running-project',  color: '#f59e0b' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',      path: '/dashboard/complete-project', color: '#10b981' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',         path: '/dashboard/new-project',      color: '#3b82f6' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',              path: '/dashboard/service',          color: '#8b5cf6' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',     path: '/dashboard/staff',            color: '#06b6d4' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',       path: '/dashboard/staff',            color: '#0ea5e9' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account', path: '/dashboard/Freelancers',      color: '#ec4899' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',      path: '/dashboard/category',         color: '#f97316' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   const allCountries           = analyticsData?.countryStats || [];
//   const domesticCountries      = allCountries.filter(c =>  isDomestic(c.label));
//   const intlCountries          = allCountries.filter(c => !isDomestic(c.label));
//   const activeCountries        = countryTab        === 'domestic' ? domesticCountries : intlCountries;
//   const activeRevenueCountries = countryRevenueTab === 'domestic' ? domesticCountries : intlCountries;

//   const CountryTabButtons = ({ value, onChange }) => (
//     <div className="country-tabs">
//       <button className={`country-tab${value === 'domestic'      ? ' active domestic'      : ''}`} onClick={() => onChange('domestic')}>
//         🇮🇳 Domestic <span style={{ fontSize: '.7rem', opacity: .7 }}>({domesticCountries.length})</span>
//       </button>
//       <button className={`country-tab${value === 'international' ? ' active international' : ''}`} onClick={() => onChange('international')}>
//         🌍 International <span style={{ fontSize: '.7rem', opacity: .7 }}>({intlCountries.length})</span>
//       </button>
//     </div>
//   );

//   const CountrySummaryStrip = ({ list, tab }) =>
//     list.length > 0 ? (
//       <div style={{ background: tab === 'domestic' ? '#eff6ff' : '#f0fdf4', borderRadius: '6px', padding: '.45rem .75rem', marginBottom: '.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '.75rem' }}>
//         <span style={{ color: '#475569', fontWeight: '500' }}>{list.reduce((s, c) => s + c.value, 0)} purchases</span>
//         <span style={{ fontWeight: '700', color: '#10b981' }}>₹{list.reduce((s, c) => s + c.revenue, 0).toLocaleString()}</span>
//       </div>
//     ) : null;

//   const renderCountryBars = (list, singleColor) => {
//     if (!list?.length) return (
//       <div className="no-country">
//         <Iconify icon="mdi:earth-off" width={32} style={{ opacity: .25, display: 'block', margin: '0 auto .75rem' }} />
//         No data available
//       </div>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = singleColor || palette[i % palette.length];
//       return (
//         <div key={i} style={{ marginBottom: '1rem' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//               <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//             </div>
//             <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//           </div>
//           <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//             <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px', transition: 'width .4s ease' }} />
//           </div>
//           <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//             <span>{c.value} purchases</span>
//             <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//           </div>
//         </div>
//       );
//     });
//   };

//   const renderCountryTable = (list) => {
//     if (!list?.length) return (
//       <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No data available</td></tr>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = palette[i % palette.length];
//       return (
//         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//           <td style={{ padding: '.75rem .5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//               <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//             </div>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//         </tr>
//       );
//     });
//   };

//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list?.length) return (
//       <div className="empty-state">
//         <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//         <p className="empty-state-text">No {isFL ? 'freelancers' : 'staff members'} found</p>
//       </div>
//     );
//     const allKeys  = list.map(p => makeKey(p, type));
//     const allSel   = allKeys.every(k => selectedPeople.has(k));
//     const someSel  = allKeys.some(k =>  selectedPeople.has(k));
//     const selCount = allKeys.filter(k => selectedPeople.has(k)).length;
//     return (
//       <>
//         <div className="scn-select-bar">
//           <label className="scn-cb-wrap">
//             <input
//               type="checkbox"
//               checked={allSel}
//               ref={el => { if (el) el.indeterminate = someSel && !allSel; }}
//               onChange={() => toggleSelectAll(list, type)}
//             />
//             <div className="scn-cb-box"><CheckSVG /></div>
//           </label>
//           <span style={{ fontSize: '.82rem', color: '#475569', fontWeight: '600' }}>Select All</span>
//           {someSel && <span className="scn-sel-count">{selCount} selected</span>}
//         </div>
//         {list.map((person, index) => {
//           const key     = makeKey(person, type);
//           const isSel   = selectedPeople.has(key);
//           const rankCls = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//           return (
//             <div key={String(person.id || person._id || index)} className={`staff-card${isSel ? ' selected' : ''}`}>
//               <label className="scn-cb-wrap" onClick={e => e.stopPropagation()}>
//                 <input type="checkbox" checked={isSel} onChange={() => toggleSelect(person, type)} />
//                 <div className="scn-cb-box"><CheckSVG /></div>
//               </label>
//               <div className={`staff-rank${rankCls ? ` ${rankCls}` : ''}`}>#{index + 1}</div>
//               <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{getInitial(person.name)}</div>
//               <div className="staff-info">
//                 <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//                 <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//                 {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//               </div>
//               <div className="staff-rating">
//                 {person.rating > 0 || person.hasRating ? (
//                   <>
//                     <div style={{ display: 'flex', gap: '2px' }}>
//                       {[...Array(5)].map((_, i) => (
//                         <Iconify key={i} icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'} width={15} style={{ color: '#f59e0b' }} />
//                       ))}
//                     </div>
//                     <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating?.toFixed(1)}</span>
//                     <span className="rating-count-badge">{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</span>
//                   </>
//                 ) : <span className="no-rating">No rating</span>}
//               </div>
//               <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//             </div>
//           );
//         })}
//       </>
//     );
//   };

//   if (loading) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData  = getStatsData();
//   const activeList = activeTab === 'staff' ? staffList : freelancerList;
//   const staffKeys      = [...modalRecipients].filter(k => k.endsWith('::staff'));
//   const freelancerKeys = [...modalRecipients].filter(k => k.endsWith('::freelancer'));

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       {/* ── MODAL — inline JSX, NOT a sub-component, fixes blink ── */}
//       {notifModalOpen && (
//         <div className="scn-overlay" onClick={e => { if (e.target === e.currentTarget) closeNotifModal(); }}>
//           <div className="scn-modal">

//             <div className="scn-modal-header">
//               <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
//                 <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                   <Iconify icon="mdi:bell-ring" width={20} style={{ color: 'white' }} />
//                 </div>
//                 <div>
//                   <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Send Notification</h2>
//                   <p style={{ margin: 0, fontSize: '.75rem', color: '#64748b' }}>
//                     {modalRecipients.size} recipient{modalRecipients.size !== 1 ? 's' : ''} selected
//                   </p>
//                 </div>
//               </div>
//               <button className="scn-close-btn" onClick={closeNotifModal}>
//                 <Iconify icon="mdi:close" width={16} />
//               </button>
//             </div>

//             <div className="scn-modal-body">
//               {notifSuccess && (
//                 <div className="scn-banner success">
//                   <Iconify icon="mdi:check-circle" width={18} /> {notifSuccess}
//                 </div>
//               )}
//               {notifError && (
//                 <div className="scn-banner error">
//                   <Iconify icon="mdi:alert-circle" width={18} /> {notifError}
//                 </div>
//               )}

//               <span className="scn-label">To</span>
//               <div className="scn-recipients-box">
//                 {modalRecipients.size === 0 && (
//                   <span style={{ fontSize: '.8rem', color: '#94a3b8', alignSelf: 'center' }}>No recipients</span>
//                 )}
//                 {staffKeys.length > 0 && (
//                   <>
//                     <span className="scn-section-label">Internal Staff</span>
//                     {staffKeys.map(key => {
//                       const { person } = getPersonFromKey(key);
//                       return (
//                         <div className="scn-chip" key={key}>
//                           <div className="scn-chip-avatar staff">{getInitial(person?.name)}</div>
//                           {person?.name || 'Unknown'}
//                           <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}>
//                             <Iconify icon="mdi:close" width={9} />
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//                 {freelancerKeys.length > 0 && (
//                   <>
//                     <span className="scn-section-label">Freelancers</span>
//                     {freelancerKeys.map(key => {
//                       const { person } = getPersonFromKey(key);
//                       return (
//                         <div className="scn-chip" key={key}>
//                           <div className="scn-chip-avatar freelancer">{getInitial(person?.name)}</div>
//                           {person?.name || 'Unknown'}
//                           <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}>
//                             <Iconify icon="mdi:close" width={9} />
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//               </div>

//               <span className="scn-label">
//                 Subject <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional)</span>
//               </span>
//               <input
//                 type="text"
//                 className="scn-input"
//                 placeholder="e.g. Project Update, New Assignment..."
//                 value={notifSubject}
//                 onChange={e => setNotifSubject(e.target.value)}
//                 maxLength={120}
//               />

//               <span className="scn-label">
//                 Message <span style={{ color: '#ef4444' }}>*</span>
//               </span>
//               <textarea
//                 className="scn-input scn-textarea"
//                 placeholder="Type your message here..."
//                 value={notifMessage}
//                 onChange={e => { setNotifMessage(e.target.value); setNotifError(''); }}
//                 maxLength={1000}
//               />
//               <div className="scn-char">{notifMessage.length} / 1000</div>
//             </div>

//             <div className="scn-modal-footer">
//               <button className="scn-btn-cancel" onClick={closeNotifModal} disabled={notifSending}>Cancel</button>
//               <button
//                 className="scn-btn-send"
//                 onClick={handleSendNotification}
//                 disabled={notifSending || !modalRecipients.size || !notifMessage.trim()}
//               >
//                 {notifSending
//                   ? <><Iconify icon="mdi:loading" width={16} className="scn-spin" /> Sending...</>
//                   : <><Iconify icon="mdi:send" width={16} /> Send to {modalRecipients.size}</>
//                 }
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//       <Container maxWidth="xl" sx={{ py: 0 }}>

//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(s.path)}>
//                 <div className="stat-icon" style={{ background: s.color }}><Iconify icon={s.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 <Iconify icon="mdi:arrow-right" width={16} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                   icon: 'mdi:cart-check',    bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                   icon: 'mdi:cash-refund',   bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,  icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                icon: 'mdi:percent',       bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH = (bought / mx) * 240, rH = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} />
//                     <span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryTab} onChange={setCountryTab} />
//               <CountrySummaryStrip list={activeCountries} tab={countryTab} />
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 {renderCountryBars(activeCountries, countryTab === 'domestic' ? '#3b82f6' : null)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem', flexWrap: 'wrap', gap: '.75rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>

//         </div>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff'      ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} /> Internal Staff <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} /> Freelancers <span className="tab-count">{freelancerList.length}</span>
//                 </button>

//           <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem' }}>
//             {/* <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>Sorted by rating — highest first</span> */}
//             {selectedPeople.size > 0 && (
//               <button className="scn-send-fab" onClick={openNotifModal}>
//                 <Iconify icon="mdi:bell-ring" width={16} />
//                 Send Notification&nbsp;
//                 <span style={{ background: 'rgba(255,255,255,.25)', borderRadius: '20px', padding: '1px 8px', fontSize: '.75rem' }}>
//                   {selectedPeople.size}
//                 </span>
//               </button>
//             )}
//           </div>

//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>




//                <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//          send Notication all 
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>All Notications</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['StaafId','StaffName','Staffemail','subject','message'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//         </Grid>













//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>

//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//                             <span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span>
//                           </td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px', display: 'flex', flexDirection: 'column' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryRevenueTab} onChange={setCountryRevenueTab} />
//               <CountrySummaryStrip list={activeRevenueCountries} tab={countryRevenueTab} />
//               <div style={{ flex: 1, overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>{renderCountryTable(activeRevenueCountries)}</tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>



//       </Container>
//     </>
//   );
// }









// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// const DOMESTIC_COUNTRIES = ['india', 'in'];
// const isDomestic = (label = '') => DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());

// const parseKey   = (key)          => { const [id, type] = key.split('::'); return { id, type }; };
// const makeKey    = (person, type) => `${person.id || person._id}::${type}`;
// const getInitial = (name)         => (name || 'U').charAt(0).toUpperCase();

// const CheckSVG = () => (
//   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//     <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // ─── timeAgo helper ───────────────────────────────────────────────────────────
// const timeAgo = (dateStr) => {
//   if (!dateStr) return '';
//   const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
//   if (diff < 60)    return `${diff}s ago`;
//   if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
//   return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
// };

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime,       setCurrentTime]       = useState(new Date());
//   const [dashboardData,     setDashboardData]      = useState(null);
//   const [analyticsData,     setAnalyticsData]      = useState(null);
//   const [staffList,         setStaffList]          = useState([]);
//   const [freelancerList,    setFreelancerList]     = useState([]);
//   const [activeTab,         setActiveTab]          = useState('staff');
//   const [countryTab,        setCountryTab]         = useState('domestic');
//   const [countryRevenueTab, setCountryRevenueTab]  = useState('domestic');
//   const [loading,           setLoading]            = useState(true);
//   const [error,             setError]              = useState(null);
//   const [filterPeriod,      setFilterPeriod]       = useState('month');
//   const [startDate,         setStartDate]          = useState('');
//   const [endDate,           setEndDate]            = useState('');

//   // Notification send state
//   const [selectedPeople,  setSelectedPeople]  = useState(new Set());
//   const [notifModalOpen,  setNotifModalOpen]  = useState(false);
//   const [modalRecipients, setModalRecipients] = useState(new Set());
//   const [notifSubject,    setNotifSubject]    = useState('');
//   const [notifMessage,    setNotifMessage]    = useState('');
//   const [notifSending,    setNotifSending]    = useState(false);
//   const [notifSuccess,    setNotifSuccess]    = useState('');
//   const [notifError,      setNotifError]      = useState('');

//   // ── Notification History state ────────────────────────────────────────────
//   const [notifHistory,        setNotifHistory]        = useState([]);
//   const [notifHistoryLoading, setNotifHistoryLoading] = useState(false);
//   const [notifHistoryError,   setNotifHistoryError]   = useState(null);
//   const [notifHistoryPage,    setNotifHistoryPage]    = useState(1);
//   const [notifHistoryTotal,   setNotifHistoryTotal]   = useState(0);
//   const [expandedNotif,       setExpandedNotif]       = useState(null); // which row is expanded
//   const NOTIF_HISTORY_LIMIT = 10;

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   // ── Fetch notification history ────────────────────────────────────────────
//   const fetchNotifHistory = useCallback(async (page = 1) => {
//     setNotifHistoryLoading(true);
//     setNotifHistoryError(null);
//     try {
//       const res = await axios.get(`${Url}/StaffcustomnotificationRoutes`, {
//         params: { page, limit: NOTIF_HISTORY_LIMIT },
//       });
//       if (res.data.success) {
//         setNotifHistory(res.data.data || []);
//         setNotifHistoryTotal(res.data.pagination?.total || 0);
//         setNotifHistoryPage(page);
//       }
//     } catch (err) {
//       setNotifHistoryError(err.response?.data?.message || err.message);
//     } finally {
//       setNotifHistoryLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchNotifHistory(1); }, [fetchNotifHistory]);

//   // ── Delete notification ───────────────────────────────────────────────────
//   const deleteNotif = async (id) => {
//     if (!window.confirm('Delete this notification?')) return;
//     try {
//       await axios.delete(`${Url}/StaffcustomnotificationRoutes/${id}`);
//       fetchNotifHistory(notifHistoryPage);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Delete failed');
//     }
//   };

//   const openNotifModal = () => {
//     setModalRecipients(new Set(selectedPeople));
//     setNotifSubject(''); setNotifMessage('');
//     setNotifSuccess(''); setNotifError('');
//     setNotifModalOpen(true);
//   };

//   const closeNotifModal = () => setNotifModalOpen(false);

//   const toggleSelect = (person, type) => {
//     const key = makeKey(person, type);
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       next.has(key) ? next.delete(key) : next.add(key);
//       return next;
//     });
//   };

//   const toggleSelectAll = (list, type) => {
//     const keys   = list.map(p => makeKey(p, type));
//     const allSel = keys.every(k => selectedPeople.has(k));
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       if (allSel) keys.forEach(k => next.delete(k));
//       else        keys.forEach(k => next.add(k));
//       return next;
//     });
//   };

//   const removeModalRecipient = (key) =>
//     setModalRecipients(prev => { const n = new Set(prev); n.delete(key); return n; });

//   const getPersonFromKey = (key) => {
//     const { id, type } = parseKey(key);
//     const list = type === 'staff' ? staffList : freelancerList;
//     return { person: list.find(p => String(p.id || p._id) === String(id)), type };
//   };

//   const handleSendNotification = async () => {
//     if (!notifMessage.trim())  { setNotifError('Message cannot be empty.'); return; }
//     if (!modalRecipients.size) { setNotifError('No recipients selected.');  return; }

//     let sentBy = null;
//     try {
//       const adminRaw = localStorage.getItem('admin');
//       if (adminRaw) {
//         const adminObj = JSON.parse(adminRaw);
//         sentBy = adminObj?._id || adminObj?.id || null;
//       }
//     } catch { sentBy = null; }

//     if (!sentBy) { setNotifError('Admin session not found. Please login again.'); return; }

//     setNotifError(''); setNotifSending(true);
//     try {
//       const recipients = [...modalRecipients].map(k => parseKey(k));
//       const res = await axios.post(`${Url}/StaffcustomnotificationRoutes/send`, {
//         subject: notifSubject, message: notifMessage, recipients, sentBy,
//       });
//       if (res.data.success) {
//         setNotifSuccess(`✓ Notification sent to ${res.data.data.totalRecipients} recipient(s)!`);
//         setTimeout(() => {
//           setSelectedPeople(new Set());
//           closeNotifModal();
//           fetchNotifHistory(1); // ✅ History refresh karo after send
//         }, 1600);
//       } else {
//         setNotifError(res.data.message || 'Something went wrong.');
//       }
//     } catch (err) {
//       setNotifError(err.response?.data?.message || err.message);
//     } finally { setNotifSending(false); }
//   };

//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%;cursor:pointer;}
//     .stat-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:#94a3b8;transform:translateY(-2px);}
//     .stat-card:hover .stat-value{color:#3b82f6;}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1;transition:color .2s;}
//     .stat-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:#3b82f6;flex-shrink:0;}
//     .stat-card:hover .stat-arrow{opacity:1;transform:translateX(0);}
//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}
//     .country-tabs{display:flex;gap:.5rem;margin-bottom:1rem}
//     .country-tab{flex:1;padding:.45rem .75rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:.78rem;font-weight:600;color:#64748b;transition:all .2s;text-align:center;display:flex;align-items:center;justify-content:center;gap:.35rem;}
//     .country-tab.active.domestic{background:#eff6ff;border-color:#3b82f6;color:#1d4ed8;}
//     .country-tab.active.international{background:#f0fdf4;border-color:#22c55e;color:#15803d;}
//     .country-tab:hover:not(.active){background:#f1f5f9;border-color:#cbd5e1;}
//     .no-country{padding:2rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:.75rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}
//     .staff-card.selected{border-color:#3b82f6 !important;background:#f0f7ff;box-shadow:0 0 0 2px rgba(59,130,246,.15) !important}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}
//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//     .scn-cb-wrap{position:relative;cursor:pointer;flex-shrink:0;width:20px;height:20px}
//     .scn-cb-wrap input[type=checkbox]{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
//     .scn-cb-box{width:20px;height:20px;border:2px solid #cbd5e1;border-radius:5px;display:flex;align-items:center;justify-content:center;transition:all .15s;background:white;cursor:pointer}
//     .scn-cb-wrap input:checked ~ .scn-cb-box{background:#3b82f6;border-color:#3b82f6}
//     .scn-cb-box svg{opacity:0;transform:scale(.5);transition:all .15s}
//     .scn-cb-wrap input:checked ~ .scn-cb-box svg{opacity:1;transform:scale(1)}
//     .scn-select-bar{display:flex;align-items:center;gap:.75rem;padding:.5rem .875rem;background:#f8fafc;border-radius:8px;margin-bottom:.75rem;border:1px solid #e2e8f0}
//     .scn-sel-count{margin-left:auto;font-size:.75rem;background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:4px;font-weight:600}
//     .scn-send-fab{display:flex;align-items:center;gap:.5rem;padding:.55rem 1.1rem;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;border-radius:8px;cursor:pointer;font-size:.8rem;font-weight:700;box-shadow:0 4px 14px rgba(59,130,246,.4);transition:all .2s;white-space:nowrap}
//     .scn-send-fab:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(59,130,246,.5)}
//     .scn-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(4px);z-index:1400;display:flex;align-items:center;justify-content:center;padding:1rem}
//     .scn-modal{background:white;border-radius:16px;width:100%;max-width:580px;box-shadow:0 25px 60px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:92vh;overflow:hidden}
//     .scn-modal-header{padding:1.25rem 1.5rem;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
//     .scn-modal-body{padding:1.25rem 1.5rem;overflow-y:auto;flex:1}
//     .scn-modal-footer{padding:1rem 1.5rem;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:.75rem;flex-shrink:0;background:#f8fafc}
//     .scn-close-btn{width:32px;height:32px;border-radius:8px;border:1px solid #e2e8f0;background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:all .15s;padding:0}
//     .scn-close-btn:hover{background:#f1f5f9;color:#1e293b}
//     .scn-label{font-size:.8rem;font-weight:700;color:#374151;margin-bottom:.375rem;display:block}
//     .scn-recipients-box{display:flex;flex-wrap:wrap;gap:.4rem;padding:.625rem;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;min-height:48px;margin-bottom:1rem}
//     .scn-chip{display:flex;align-items:center;gap:.35rem;padding:.25rem .6rem .25rem .35rem;background:white;border:1px solid #e2e8f0;border-radius:20px;font-size:.78rem;font-weight:600;color:#334155;box-shadow:0 1px 2px rgba(0,0,0,.05)}
//     .scn-chip-avatar{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:white;flex-shrink:0}
//     .scn-chip-avatar.staff{background:linear-gradient(135deg,#667eea,#764ba2)}
//     .scn-chip-avatar.freelancer{background:linear-gradient(135deg,#f093fb,#f5576c)}
//     .scn-chip-remove{width:16px;height:16px;border-radius:50%;background:#f1f5f9;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;transition:all .15s;padding:0;margin-left:.1rem}
//     .scn-chip-remove:hover{background:#fecaca;color:#dc2626}
//     .scn-section-label{width:100%;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin:.35rem 0 .25rem .1rem}
//     .scn-input{width:100%;padding:.625rem .875rem;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.875rem;color:#1e293b;font-family:inherit;transition:border .15s;background:white;box-sizing:border-box;margin-bottom:.875rem}
//     .scn-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
//     .scn-textarea{resize:vertical;min-height:120px;line-height:1.65;margin-bottom:.25rem}
//     .scn-char{font-size:.72rem;color:#94a3b8;text-align:right;margin-bottom:.5rem}
//     .scn-banner{display:flex;align-items:center;gap:.625rem;padding:.75rem 1rem;border-radius:8px;font-size:.875rem;font-weight:500;margin-bottom:.875rem}
//     .scn-banner.success{background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d}
//     .scn-banner.error{background:#fef2f2;border:1px solid #fecaca;color:#dc2626}
//     .scn-btn-cancel{padding:.65rem 1.25rem;background:white;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.875rem;font-weight:600;color:#64748b;cursor:pointer;transition:all .15s}
//     .scn-btn-cancel:hover{background:#f1f5f9;border-color:#cbd5e1}
//     .scn-btn-send{display:flex;align-items:center;gap:.5rem;padding:.65rem 1.5rem;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;border-radius:8px;font-size:.875rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(59,130,246,.35);transition:all .2s}
//     .scn-btn-send:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 18px rgba(59,130,246,.45)}
//     .scn-btn-send:disabled{opacity:.5;cursor:not-allowed;transform:none}
//     @keyframes scnSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//     .scn-spin{animation:scnSpin 1s linear infinite}

//     /* ── Notification History Table ── */
//     .nh-wrap{background:white;border-radius:10px;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);overflow:hidden}
//     .nh-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #e2e8f0;background:#fafafa}
//     .nh-title{font-size:.9375rem;font-weight:700;color:#1e293b;display:flex;align-items:center;gap:.5rem}
//     .nh-total-badge{background:#dbeafe;color:#1e40af;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px}
//     .nh-refresh-btn{display:flex;align-items:center;gap:.35rem;padding:.375rem .75rem;background:white;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;font-size:.75rem;font-weight:600;color:#475569;transition:all .15s}
//     .nh-refresh-btn:hover{background:#f1f5f9;border-color:#cbd5e1}
//     .nh-scroll{overflow-x:auto}
//     .nh-table{width:100%;border-collapse:collapse;min-width:700px}
//     .nh-table thead th{padding:.625rem 1rem;background:#f8fafc;text-align:left;font-size:.72rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e2e8f0;white-space:nowrap}
//     .nh-table thead th:last-child{text-align:center}
//     .nh-row{border-bottom:1px solid #f1f5f9;transition:background .15s;cursor:pointer}
//     .nh-row:hover{background:#f8fafc}
//     .nh-row.expanded{background:#eff6ff}
//     .nh-row td{padding:.75rem 1rem;vertical-align:top}
//     .nh-subject{font-weight:600;color:#1e293b;font-size:.875rem;margin:0 0 .2rem 0}
//     .nh-message-preview{color:#64748b;font-size:.78rem;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px}
//     .nh-time{color:#94a3b8;font-size:.75rem;white-space:nowrap}
//     .nh-recipients-count{display:inline-flex;align-items:center;gap:.35rem;background:#f1f5f9;padding:.2rem .6rem;border-radius:20px;font-size:.75rem;font-weight:600;color:#475569}
//     .nh-read-bar{height:6px;background:#e2e8f0;border-radius:3px;margin-top:.25rem;overflow:hidden}
//     .nh-read-fill{height:100%;background:linear-gradient(90deg,#22c55e,#16a34a);border-radius:3px;transition:width .3s ease}
//     .nh-read-text{font-size:.68rem;color:#64748b;margin-top:.2rem}
//     .nh-actions{display:flex;align-items:center;justify-content:center;gap:.5rem}
//     .nh-icon-btn{width:28px;height:28px;border-radius:6px;border:1px solid #e2e8f0;background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:all .15s;padding:0}
//     .nh-icon-btn:hover.expand{background:#eff6ff;border-color:#3b82f6;color:#3b82f6}
//     .nh-icon-btn:hover.delete{background:#fef2f2;border-color:#fecaca;color:#dc2626}
//     .nh-expand-row td{padding:0;border-bottom:1px solid #e2e8f0}
//     .nh-expand-body{background:#f8faff;padding:1rem 1.25rem 1.25rem 1.25rem;border-top:1px solid #dbeafe}
//     .nh-expand-msg{background:white;border:1px solid #e2e8f0;border-radius:8px;padding:.875rem 1rem;font-size:.875rem;color:#334155;line-height:1.6;margin-bottom:1rem;white-space:pre-wrap}
//     .nh-recipient-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}
//     .nh-rchip{display:inline-flex;align-items:center;gap:.35rem;padding:.25rem .625rem;border-radius:20px;font-size:.75rem;font-weight:600}
//     .nh-rchip.staff{background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe}
//     .nh-rchip.freelancer{background:#fdf4ff;color:#7e22ce;border:1px solid #e9d5ff}
//     .nh-rchip .read-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
//     .nh-rchip .read-dot.yes{background:#22c55e}
//     .nh-rchip .read-dot.no{background:#f59e0b}
//     .nh-pagination{display:flex;align-items:center;justify-content:space-between;padding:.875rem 1.25rem;border-top:1px solid #e2e8f0;background:#fafafa}
//     .nh-page-info{font-size:.78rem;color:#64748b}
//     .nh-page-btns{display:flex;gap:.375rem}
//     .nh-page-btn{padding:.375rem .75rem;border:1px solid #e2e8f0;background:white;border-radius:6px;font-size:.78rem;font-weight:600;color:#475569;cursor:pointer;transition:all .15s}
//     .nh-page-btn:hover:not(:disabled){background:#f1f5f9;border-color:#cbd5e1}
//     .nh-page-btn:disabled{opacity:.4;cursor:not-allowed}
//     .nh-page-btn.active{background:#3b82f6;border-color:#3b82f6;color:white}
//     .nh-empty{padding:3rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     .nh-loading{padding:2.5rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     @keyframes nhFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
//     .nh-expand-body{animation:nhFadeIn .18s ease}
//   `;

//   const styles = {
//     header:       { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting:     { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle:     { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true); setError(null);
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date(), start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }
//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);
//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           setStaffList((raw.staff       || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         } else if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff'      || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else { setStaffList([]); setFreelancerList([]); }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally { setLoading(false); }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',    path: '/dashboard/new-project',      color: '#6366f1' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',    path: '/dashboard/running-project',  color: '#f59e0b' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',      path: '/dashboard/complete-project', color: '#10b981' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',         path: '/dashboard/new-project',      color: '#3b82f6' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',              path: '/dashboard/service',          color: '#8b5cf6' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',     path: '/dashboard/staff',            color: '#06b6d4' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',       path: '/dashboard/staff',            color: '#0ea5e9' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account', path: '/dashboard/Freelancers',      color: '#ec4899' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',      path: '/dashboard/category',         color: '#f97316' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   const allCountries           = analyticsData?.countryStats || [];
//   const domesticCountries      = allCountries.filter(c =>  isDomestic(c.label));
//   const intlCountries          = allCountries.filter(c => !isDomestic(c.label));
//   const activeCountries        = countryTab        === 'domestic' ? domesticCountries : intlCountries;
//   const activeRevenueCountries = countryRevenueTab === 'domestic' ? domesticCountries : intlCountries;

//   const CountryTabButtons = ({ value, onChange }) => (
//     <div className="country-tabs">
//       <button className={`country-tab${value === 'domestic'      ? ' active domestic'      : ''}`} onClick={() => onChange('domestic')}>
//         🇮🇳 Domestic <span style={{ fontSize: '.7rem', opacity: .7 }}>({domesticCountries.length})</span>
//       </button>
//       <button className={`country-tab${value === 'international' ? ' active international' : ''}`} onClick={() => onChange('international')}>
//         🌍 International <span style={{ fontSize: '.7rem', opacity: .7 }}>({intlCountries.length})</span>
//       </button>
//     </div>
//   );

//   const CountrySummaryStrip = ({ list, tab }) =>
//     list.length > 0 ? (
//       <div style={{ background: tab === 'domestic' ? '#eff6ff' : '#f0fdf4', borderRadius: '6px', padding: '.45rem .75rem', marginBottom: '.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '.75rem' }}>
//         <span style={{ color: '#475569', fontWeight: '500' }}>{list.reduce((s, c) => s + c.value, 0)} purchases</span>
//         <span style={{ fontWeight: '700', color: '#10b981' }}>₹{list.reduce((s, c) => s + c.revenue, 0).toLocaleString()}</span>
//       </div>
//     ) : null;

//   const renderCountryBars = (list, singleColor) => {
//     if (!list?.length) return (
//       <div className="no-country">
//         <Iconify icon="mdi:earth-off" width={32} style={{ opacity: .25, display: 'block', margin: '0 auto .75rem' }} />
//         No data available
//       </div>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = singleColor || palette[i % palette.length];
//       return (
//         <div key={i} style={{ marginBottom: '1rem' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//               <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//             </div>
//             <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//           </div>
//           <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//             <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px', transition: 'width .4s ease' }} />
//           </div>
//           <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//             <span>{c.value} purchases</span>
//             <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//           </div>
//         </div>
//       );
//     });
//   };

//   const renderCountryTable = (list) => {
//     if (!list?.length) return (
//       <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No data available</td></tr>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = palette[i % palette.length];
//       return (
//         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//           <td style={{ padding: '.75rem .5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//               <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//             </div>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//         </tr>
//       );
//     });
//   };

//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list?.length) return (
//       <div className="empty-state">
//         <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//         <p className="empty-state-text">No {isFL ? 'freelancers' : 'staff members'} found</p>
//       </div>
//     );
//     const allKeys  = list.map(p => makeKey(p, type));
//     const allSel   = allKeys.every(k => selectedPeople.has(k));
//     const someSel  = allKeys.some(k =>  selectedPeople.has(k));
//     const selCount = allKeys.filter(k => selectedPeople.has(k)).length;
//     return (
//       <>
//         <div className="scn-select-bar">
//           <label className="scn-cb-wrap">
//             <input
//               type="checkbox"
//               checked={allSel}
//               ref={el => { if (el) el.indeterminate = someSel && !allSel; }}
//               onChange={() => toggleSelectAll(list, type)}
//             />
//             <div className="scn-cb-box"><CheckSVG /></div>
//           </label>
//           <span style={{ fontSize: '.82rem', color: '#475569', fontWeight: '600' }}>Select All</span>
//           {someSel && <span className="scn-sel-count">{selCount} selected</span>}
//         </div>
//         {list.map((person, index) => {
//           const key     = makeKey(person, type);
//           const isSel   = selectedPeople.has(key);
//           const rankCls = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//           return (
//             <div key={String(person.id || person._id || index)} className={`staff-card${isSel ? ' selected' : ''}`}>
//               <label className="scn-cb-wrap" onClick={e => e.stopPropagation()}>
//                 <input type="checkbox" checked={isSel} onChange={() => toggleSelect(person, type)} />
//                 <div className="scn-cb-box"><CheckSVG /></div>
//               </label>
//               <div className={`staff-rank${rankCls ? ` ${rankCls}` : ''}`}>#{index + 1}</div>
//               <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{getInitial(person.name)}</div>
//               <div className="staff-info">
//                 <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//                 <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//                 {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//               </div>
//               <div className="staff-rating">
//                 {person.rating > 0 || person.hasRating ? (
//                   <>
//                     <div style={{ display: 'flex', gap: '2px' }}>
//                       {[...Array(5)].map((_, i) => (
//                         <Iconify key={i} icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'} width={15} style={{ color: '#f59e0b' }} />
//                       ))}
//                     </div>
//                     <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating?.toFixed(1)}</span>
//                     <span className="rating-count-badge">{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</span>
//                   </>
//                 ) : <span className="no-rating">No rating</span>}
//               </div>
//               <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//             </div>
//           );
//         })}
//       </>
//     );
//   };

//   // ── Notification History renderer ─────────────────────────────────────────
//   const renderNotifHistory = () => {
//     const totalPages = Math.ceil(notifHistoryTotal / NOTIF_HISTORY_LIMIT);

//     return (
//       <div className="nh-wrap">
//         {/* Header */}
//         <div className="nh-header">
//           <div className="nh-title">
//             <Iconify icon="mdi:bell-check" width={18} style={{ color: '#3b82f6' }} />
//             Sent Notifications
//             {notifHistoryTotal > 0 && (
//               <span className="nh-total-badge">{notifHistoryTotal} total</span>
//             )}
//           </div>
//           <button className="nh-refresh-btn" onClick={() => fetchNotifHistory(notifHistoryPage)}>
//             <Iconify icon="mdi:refresh" width={14} />
//             Refresh
//           </button>
//         </div>

//         <div className="nh-scroll">
//           <table className="nh-table">
//             <thead>
//               <tr>
//                 <th style={{ width: '32%' }}>Subject / Message</th>
//                 <th style={{ width: '15%' }}>Sent At</th>
//                 <th style={{ width: '13%' }}>Recipients</th>
//                 <th style={{ width: '28%' }}>Read Progress</th>
//                 <th style={{ width: '12%', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {notifHistoryLoading ? (
//                 <tr>
//                   <td colSpan="5" className="nh-loading">
//                     <Iconify icon="mdi:loading" width={20} className="scn-spin" style={{ display: 'inline-block', marginRight: '8px' }} />
//                     Loading notifications...
//                   </td>
//                 </tr>
//               ) : notifHistoryError ? (
//                 <tr>
//                   <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#ef4444', fontSize: '.875rem' }}>
//                     <Iconify icon="mdi:alert-circle" width={18} style={{ marginRight: '6px' }} />
//                     {notifHistoryError}
//                   </td>
//                 </tr>
//               ) : notifHistory.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="nh-empty">
//                     <Iconify icon="mdi:bell-off-outline" width={36} style={{ opacity: .25, display: 'block', margin: '0 auto .75rem' }} />
//                     No notifications sent yet
//                   </td>
//                 </tr>
//               ) : (
//                 notifHistory.map((notif) => {
//                   const isExpanded  = expandedNotif === notif._id;
//                   const readCount   = notif.recipients?.filter(r => r.readAt)?.length || 0;
//                   const total       = notif.recipients?.length || notif.totalRecipients || 0;
//                   const readPct     = total > 0 ? Math.round((readCount / total) * 100) : 0;
//                   const staffRecs   = notif.recipients?.filter(r => r.recipientType === 'staff') || [];
//                   const flRecs      = notif.recipients?.filter(r => r.recipientType === 'freelancer') || [];

//                   return (
//                     <>
//                       <tr
//                         key={notif._id}
//                         className={`nh-row${isExpanded ? ' expanded' : ''}`}
//                         onClick={() => setExpandedNotif(isExpanded ? null : notif._id)}
//                       >
//                         {/* Subject / Message */}
//                         <td>
//                           <p className="nh-subject">
//                             {notif.subject || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No subject</span>}
//                           </p>
//                           <p className="nh-message-preview">{notif.message}</p>
//                         </td>

//                         {/* Sent At */}
//                         <td>
//                           <div className="nh-time">{timeAgo(notif.createdAt)}</div>
//                           <div style={{ fontSize: '.68rem', color: '#cbd5e1', marginTop: '.1rem' }}>
//                             {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
//                           </div>
//                         </td>

//                         {/* Recipients count */}
//                         <td>
//                           <div className="nh-recipients-count">
//                             <Iconify icon="mdi:account-multiple" width={13} />
//                             {total}
//                           </div>
//                           <div style={{ fontSize: '.68rem', color: '#94a3b8', marginTop: '.25rem', display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
//                             {staffRecs.length > 0 && (
//                               <span style={{ background: '#eff6ff', color: '#1e40af', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>
//                                 {staffRecs.length} staff
//                               </span>
//                             )}
//                             {flRecs.length > 0 && (
//                               <span style={{ background: '#fdf4ff', color: '#7e22ce', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>
//                                 {flRecs.length} freelancer
//                               </span>
//                             )}
//                           </div>
//                         </td>

//                         {/* Read progress bar */}
//                         <td>
//                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.2rem' }}>
//                             <span style={{ fontSize: '.72rem', color: '#64748b', fontWeight: 600 }}>
//                               {readCount}/{total} read
//                             </span>
//                             <span style={{ fontSize: '.72rem', fontWeight: 700, color: readPct === 100 ? '#16a34a' : readPct > 0 ? '#f59e0b' : '#94a3b8' }}>
//                               {readPct}%
//                             </span>
//                           </div>
//                           <div className="nh-read-bar">
//                             <div className="nh-read-fill" style={{ width: `${readPct}%`, background: readPct === 100 ? 'linear-gradient(90deg,#22c55e,#16a34a)' : readPct > 0 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : '#e2e8f0' }} />
//                           </div>
//                           <div className="nh-read-text">
//                             {readPct === 100 ? '✓ All read' : readPct === 0 ? 'None read yet' : `${total - readCount} pending`}
//                           </div>
//                         </td>

//                         {/* Actions */}
//                         <td>
//                           <div className="nh-actions" onClick={e => e.stopPropagation()}>
//                             <button
//                               className={`nh-icon-btn expand`}
//                               title={isExpanded ? 'Collapse' : 'View details'}
//                               onClick={(e) => { e.stopPropagation(); setExpandedNotif(isExpanded ? null : notif._id); }}
//                             >
//                               <Iconify icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={15} />
//                             </button>
//                             <button
//                               className={`nh-icon-btn delete`}
//                               title="Delete notification"
//                               onClick={(e) => { e.stopPropagation(); deleteNotif(notif._id); }}
//                             >
//                               <Iconify icon="mdi:trash-can-outline" width={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>

//                       {/* ── Expanded row ── */}
//                       {isExpanded && (
//                         <tr key={`${notif._id}-expand`} className="nh-expand-row">
//                           <td colSpan="5">
//                             <div className="nh-expand-body">
//                               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                                 {/* Full message */}
//                                 <div>
//                                   <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
//                                     Full Message
//                                   </div>
//                                   <div className="nh-expand-msg">{notif.message}</div>
//                                   <div style={{ fontSize: '.72rem', color: '#94a3b8' }}>
//                                     Sent on {new Date(notif.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
//                                   </div>
//                                 </div>

//                                 {/* Recipients with read status */}
//                                 <div>
//                                   <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
//                                     Recipients ({total})
//                                   </div>
//                                   <div className="nh-recipient-chips">
//                                     {notif.recipients?.map((r, i) => {
//                                       const isStaff = r.recipientType === 'staff';
//                                       return (
//                                         <span key={i} className={`nh-rchip ${isStaff ? 'staff' : 'freelancer'}`} title={r.readAt ? `Read: ${new Date(r.readAt).toLocaleString('en-IN')}` : 'Not read yet'}>
//                                           <span className={`read-dot ${r.readAt ? 'yes' : 'no'}`} />
//                                           {r.name || 'Unknown'}
//                                           {r.readAt
//                                             ? <Iconify icon="mdi:check-circle" width={11} style={{ color: '#22c55e', marginLeft: '2px' }} />
//                                             : <Iconify icon="mdi:clock-outline" width={11} style={{ color: '#f59e0b', marginLeft: '2px' }} />
//                                           }
//                                         </span>
//                                       );
//                                     })}
//                                   </div>
//                                   {notif.recipients?.length === 0 && (
//                                     <span style={{ fontSize: '.78rem', color: '#94a3b8' }}>No recipient data available</span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="nh-pagination">
//             <span className="nh-page-info">
//               Showing {((notifHistoryPage - 1) * NOTIF_HISTORY_LIMIT) + 1}–{Math.min(notifHistoryPage * NOTIF_HISTORY_LIMIT, notifHistoryTotal)} of {notifHistoryTotal}
//             </span>
//             <div className="nh-page-btns">
//               <button
//                 className="nh-page-btn"
//                 disabled={notifHistoryPage === 1}
//                 onClick={() => fetchNotifHistory(notifHistoryPage - 1)}
//               >
//                 ← Prev
//               </button>
//               {[...Array(Math.min(totalPages, 5))].map((_, i) => {
//                 const pg = i + 1;
//                 return (
//                   <button
//                     key={pg}
//                     className={`nh-page-btn${notifHistoryPage === pg ? ' active' : ''}`}
//                     onClick={() => fetchNotifHistory(pg)}
//                   >
//                     {pg}
//                   </button>
//                 );
//               })}
//               <button
//                 className="nh-page-btn"
//                 disabled={notifHistoryPage === totalPages}
//                 onClick={() => fetchNotifHistory(notifHistoryPage + 1)}
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData      = getStatsData();
//   const activeList     = activeTab === 'staff' ? staffList : freelancerList;
//   const staffKeys      = [...modalRecipients].filter(k => k.endsWith('::staff'));
//   const freelancerKeys = [...modalRecipients].filter(k => k.endsWith('::freelancer'));

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       {/* ── Send Notification Modal ── */}
//       {notifModalOpen && (
//         <div className="scn-overlay" onClick={e => { if (e.target === e.currentTarget) closeNotifModal(); }}>
//           <div className="scn-modal">
//             <div className="scn-modal-header">
//               <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
//                 <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                   <Iconify icon="mdi:bell-ring" width={20} style={{ color: 'white' }} />
//                 </div>
//                 <div>
//                   <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Send Notification</h2>
//                   <p style={{ margin: 0, fontSize: '.75rem', color: '#64748b' }}>
//                     {modalRecipients.size} recipient{modalRecipients.size !== 1 ? 's' : ''} selected
//                   </p>
//                 </div>
//               </div>
//               <button className="scn-close-btn" onClick={closeNotifModal}>
//                 <Iconify icon="mdi:close" width={16} />
//               </button>
//             </div>
//             <div className="scn-modal-body">
//               {notifSuccess && <div className="scn-banner success"><Iconify icon="mdi:check-circle" width={18} /> {notifSuccess}</div>}
//               {notifError   && <div className="scn-banner error"><Iconify icon="mdi:alert-circle" width={18} /> {notifError}</div>}
//               <span className="scn-label">To</span>
//               <div className="scn-recipients-box">
//                 {modalRecipients.size === 0 && <span style={{ fontSize: '.8rem', color: '#94a3b8', alignSelf: 'center' }}>No recipients</span>}
//                 {staffKeys.length > 0 && (
//                   <>
//                     <span className="scn-section-label">Internal Staff</span>
//                     {staffKeys.map(key => {
//                       const { person } = getPersonFromKey(key);
//                       return (
//                         <div className="scn-chip" key={key}>
//                           <div className="scn-chip-avatar staff">{getInitial(person?.name)}</div>
//                           {person?.name || 'Unknown'}
//                           <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//                 {freelancerKeys.length > 0 && (
//                   <>
//                     <span className="scn-section-label">Freelancers</span>
//                     {freelancerKeys.map(key => {
//                       const { person } = getPersonFromKey(key);
//                       return (
//                         <div className="scn-chip" key={key}>
//                           <div className="scn-chip-avatar freelancer">{getInitial(person?.name)}</div>
//                           {person?.name || 'Unknown'}
//                           <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//               </div>
//               <span className="scn-label">Subject <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional)</span></span>
//               <input type="text" className="scn-input" placeholder="e.g. Project Update, New Assignment..." value={notifSubject} onChange={e => setNotifSubject(e.target.value)} maxLength={120} />
//               <span className="scn-label">Message <span style={{ color: '#ef4444' }}>*</span></span>
//               <textarea className="scn-input scn-textarea" placeholder="Type your message here..." value={notifMessage} onChange={e => { setNotifMessage(e.target.value); setNotifError(''); }} maxLength={1000} />
//               <div className="scn-char">{notifMessage.length} / 1000</div>
//             </div>
//             <div className="scn-modal-footer">
//               <button className="scn-btn-cancel" onClick={closeNotifModal} disabled={notifSending}>Cancel</button>
//               <button className="scn-btn-send" onClick={handleSendNotification} disabled={notifSending || !modalRecipients.size || !notifMessage.trim()}>
//                 {notifSending ? <><Iconify icon="mdi:loading" width={16} className="scn-spin" /> Sending...</> : <><Iconify icon="mdi:send" width={16} /> Send to {modalRecipients.size}</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Container maxWidth="xl" sx={{ py: 0 }}>
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* Stats */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(s.path)}>
//                 <div className="stat-icon" style={{ background: s.color }}><Iconify icon={s.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 <Iconify icon="mdi:arrow-right" width={16} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                   icon: 'mdi:cart-check',    bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                   icon: 'mdi:cash-refund',   bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,  icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                icon: 'mdi:percent',       bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH = (bought / mx) * 240, rH = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} /><span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} /><span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryTab} onChange={setCountryTab} />
//               <CountrySummaryStrip list={activeCountries} tab={countryTab} />
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 {renderCountryBars(activeCountries, countryTab === 'domestic' ? '#3b82f6' : null)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Staff & Freelancers */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem', flexWrap: 'wrap', gap: '.75rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>
//         </div>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff'      ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} /> Internal Staff <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} /> Freelancers <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem', marginLeft: 'auto' }}>
//                   {selectedPeople.size > 0 && (
//                     <button className="scn-send-fab" onClick={openNotifModal}>
//                       <Iconify icon="mdi:bell-ring" width={16} />
//                       Send Notification&nbsp;
//                       <span style={{ background: 'rgba(255,255,255,.25)', borderRadius: '20px', padding: '1px 8px', fontSize: '.75rem' }}>
//                         {selectedPeople.size}
//                       </span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px', display: 'flex', flexDirection: 'column' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryRevenueTab} onChange={setCountryRevenueTab} />
//               <CountrySummaryStrip list={activeRevenueCountries} tab={countryRevenueTab} />
//               <div style={{ flex: 1, overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>{renderCountryTable(activeRevenueCountries)}</tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── NOTIFICATION HISTORY SECTION ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:bell-check" width={18} /></span>
//           Notification History
//         </Typography>
//         <Grid container spacing={1.5} sx={{ mb: 4 }}>
//           <Grid item xs={12}>
//             {renderNotifHistory()}
//           </Grid>
//         </Grid>

//       </Container>
//     </>
//   );
// }















































// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// const DOMESTIC_COUNTRIES = ['india', 'in'];
// const isDomestic = (label = '') => DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());

// const parseKey   = (key)          => { const [id, type] = key.split('::'); return { id, type }; };
// const makeKey    = (person, type) => `${person.id || person._id}::${type}`;
// const getInitial = (name)         => (name || 'U').charAt(0).toUpperCase();

// const CheckSVG = () => (
//   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//     <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // ─── timeAgo helper ───────────────────────────────────────────────────────────
// const timeAgo = (dateStr) => {
//   if (!dateStr) return '';
//   const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
//   if (diff < 60)    return `${diff}s ago`;
//   if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
//   return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
// };

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime,       setCurrentTime]       = useState(new Date());
//   const [dashboardData,     setDashboardData]      = useState(null);
//   const [analyticsData,     setAnalyticsData]      = useState(null);
//   const [staffList,         setStaffList]          = useState([]);
//   const [freelancerList,    setFreelancerList]     = useState([]);
//   const [activeTab,         setActiveTab]          = useState('staff');
//   const [countryTab,        setCountryTab]         = useState('domestic');
//   const [countryRevenueTab, setCountryRevenueTab]  = useState('domestic');
//   const [loading,           setLoading]            = useState(true);
//   const [error,             setError]              = useState(null);
//   const [filterPeriod,      setFilterPeriod]       = useState('month');
//   const [startDate,         setStartDate]          = useState('');
//   const [endDate,           setEndDate]            = useState('');

//   // Notification send state
//   const [selectedPeople,  setSelectedPeople]  = useState(new Set());
//   const [notifModalOpen,  setNotifModalOpen]  = useState(false);
//   const [modalRecipients, setModalRecipients] = useState(new Set());
//   const [notifSubject,    setNotifSubject]    = useState('');
//   const [notifMessage,    setNotifMessage]    = useState('');
//   const [notifSending,    setNotifSending]    = useState(false);
//   const [notifSuccess,    setNotifSuccess]    = useState('');
//   const [notifError,      setNotifError]      = useState('');

//   // ── Notification History state ────────────────────────────────────────────
//   const [notifHistory,        setNotifHistory]        = useState([]);
//   const [notifHistoryLoading, setNotifHistoryLoading] = useState(false);
//   const [notifHistoryError,   setNotifHistoryError]   = useState(null);
//   const [notifHistoryPage,    setNotifHistoryPage]    = useState(1);
//   const [notifHistoryTotal,   setNotifHistoryTotal]   = useState(0);
//   const [expandedNotif,       setExpandedNotif]       = useState(null); // which row is expanded
//   const NOTIF_HISTORY_LIMIT = 10;

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   // ── Fetch notification history ────────────────────────────────────────────
//   const fetchNotifHistory = useCallback(async (page = 1) => {
//     setNotifHistoryLoading(true);
//     setNotifHistoryError(null);
//     try {
//       const res = await axios.get(`${Url}/StaffcustomnotificationRoutes`, {
//         params: { page, limit: NOTIF_HISTORY_LIMIT },
//       });
//       if (res.data.success) {
//         setNotifHistory(res.data.data || []);
//         setNotifHistoryTotal(res.data.pagination?.total || 0);
//         setNotifHistoryPage(page);
//       }
//     } catch (err) {
//       setNotifHistoryError(err.response?.data?.message || err.message);
//     } finally {
//       setNotifHistoryLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchNotifHistory(1); }, [fetchNotifHistory]);

//   // ── Delete notification ───────────────────────────────────────────────────
//   const deleteNotif = async (id) => {
//     if (!window.confirm('Delete this notification?')) return;
//     try {
//       await axios.delete(`${Url}/StaffcustomnotificationRoutes/${id}`);
//       fetchNotifHistory(notifHistoryPage);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Delete failed');
//     }
//   };

//   const openNotifModal = () => {
//     setModalRecipients(new Set(selectedPeople));
//     setNotifSubject(''); setNotifMessage('');
//     setNotifSuccess(''); setNotifError('');
//     setNotifModalOpen(true);
//   };

//   const closeNotifModal = () => setNotifModalOpen(false);

//   const toggleSelect = (person, type) => {
//     const key = makeKey(person, type);
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       next.has(key) ? next.delete(key) : next.add(key);
//       return next;
//     });
//   };

//   const toggleSelectAll = (list, type) => {
//     const keys   = list.map(p => makeKey(p, type));
//     const allSel = keys.every(k => selectedPeople.has(k));
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       if (allSel) keys.forEach(k => next.delete(k));
//       else        keys.forEach(k => next.add(k));
//       return next;
//     });
//   };

//   const removeModalRecipient = (key) =>
//     setModalRecipients(prev => { const n = new Set(prev); n.delete(key); return n; });

//   const getPersonFromKey = (key) => {
//     const { id, type } = parseKey(key);
//     const list = type === 'staff' ? staffList : freelancerList;
//     return { person: list.find(p => String(p.id || p._id) === String(id)), type };
//   };

//   const handleSendNotification = async () => {
//     if (!notifMessage.trim())  { setNotifError('Message cannot be empty.'); return; }
//     if (!modalRecipients.size) { setNotifError('No recipients selected.');  return; }

//     let sentBy = null;
//     try {
//       const adminRaw = localStorage.getItem('admin');
//       if (adminRaw) {
//         const adminObj = JSON.parse(adminRaw);
//         sentBy = adminObj?._id || adminObj?.id || null;
//       }
//     } catch { sentBy = null; }

//     if (!sentBy) { setNotifError('Admin session not found. Please login again.'); return; }

//     setNotifError(''); setNotifSending(true);
//     try {
//       const recipients = [...modalRecipients].map(k => parseKey(k));
//       const res = await axios.post(`${Url}/StaffcustomnotificationRoutes/send`, {
//         subject: notifSubject, message: notifMessage, recipients, sentBy,
//       });
//       if (res.data.success) {
//         setNotifSuccess(`✓ Notification sent to ${res.data.data.totalRecipients} recipient(s)!`);
//         setTimeout(() => {
//           setSelectedPeople(new Set());
//           closeNotifModal();
//           fetchNotifHistory(1); // ✅ History refresh karo after send
//         }, 1600);
//       } else {
//         setNotifError(res.data.message || 'Something went wrong.');
//       }
//     } catch (err) {
//       setNotifError(err.response?.data?.message || err.message);
//     } finally { setNotifSending(false); }
//   };

//   const customCSS = `
//     *::-webkit-scrollbar{width:6px;height:6px}
//     *::-webkit-scrollbar-track{background:#f8fafc;border-radius:10px}
//     *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
//     .stat-card{background:white;border-radius:8px;padding:1rem;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);transition:all .2s;display:flex;align-items:center;gap:.875rem;height:100%;cursor:pointer;}
//     .stat-card:hover{box-shadow:0 4px 12px rgba(0,0,0,.1);border-color:#94a3b8;transform:translateY(-2px);}
//     .stat-card:hover .stat-value{color:#3b82f6;}
//     .stat-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:white}
//     .stat-content{flex:1;min-width:0}
//     .stat-title{font-size:.75rem;color:#64748b;font-weight:500;margin:0 0 .25rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .stat-value{font-size:1.5rem;font-weight:700;color:#1e293b;margin:0;line-height:1;transition:color .2s;}
//     .stat-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:#3b82f6;flex-shrink:0;}
//     .stat-card:hover .stat-arrow{opacity:1;transform:translateX(0);}
//     .section-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#64748b}
//     .date-input{padding:.5rem .75rem;border:1px solid #e2e8f0;border-radius:6px;font-size:.875rem;color:#334155;background:white;cursor:pointer;font-weight:500}
//     .date-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
//     .people-tabs{display:flex;border-bottom:2px solid #e2e8f0;margin-bottom:1.25rem}
//     .people-tab{padding:.625rem 1.25rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:.875rem;font-weight:600;color:#64748b;transition:all .2s;margin-bottom:-2px;display:flex;align-items:center;gap:.5rem}
//     .people-tab.active{color:#3b82f6;border-bottom-color:#3b82f6}
//     .people-tab:hover:not(.active){color:#334155;background:#f8fafc;border-radius:6px 6px 0 0}
//     .tab-count{background:#e2e8f0;color:#475569;font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:20px;min-width:20px;text-align:center}
//     .people-tab.active .tab-count{background:#dbeafe;color:#1e40af}
//     .country-tabs{display:flex;gap:.5rem;margin-bottom:1rem}
//     .country-tab{flex:1;padding:.45rem .75rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:.78rem;font-weight:600;color:#64748b;transition:all .2s;text-align:center;display:flex;align-items:center;justify-content:center;gap:.35rem;}
//     .country-tab.active.domestic{background:#eff6ff;border-color:#3b82f6;color:#1d4ed8;}
//     .country-tab.active.international{background:#f0fdf4;border-color:#22c55e;color:#15803d;}
//     .country-tab:hover:not(.active){background:#f1f5f9;border-color:#cbd5e1;}
//     .no-country{padding:2rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     .staff-card{background:white;border:1px solid #e2e8f0;border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:.75rem;transition:all .2s;margin-bottom:.625rem}
//     .staff-card:hover{box-shadow:0 2px 10px rgba(0,0,0,.08);border-color:#cbd5e1;transform:translateY(-1px)}
//     .staff-card.selected{border-color:#3b82f6 !important;background:#f0f7ff;box-shadow:0 0 0 2px rgba(59,130,246,.15) !important}
//     .staff-rank{background:#f1f5f9;color:#475569;font-weight:700;font-size:.8rem;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;letter-spacing:-.5px}
//     .staff-rank.top1{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;box-shadow:0 2px 6px rgba(245,158,11,.4)}
//     .staff-rank.top2{background:linear-gradient(135deg,#94a3b8,#64748b);color:#fff;box-shadow:0 2px 6px rgba(100,116,139,.3)}
//     .staff-rank.top3{background:linear-gradient(135deg,#fb923c,#ea580c);color:#fff;box-shadow:0 2px 6px rgba(234,88,12,.3)}
//     .staff-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;flex-shrink:0;box-shadow:0 2px 6px rgba(102,126,234,.3)}
//     .staff-avatar.fl{background:linear-gradient(135deg,#f093fb,#f5576c);box-shadow:0 2px 6px rgba(245,87,108,.3)}
//     .staff-info{flex:1;min-width:0}
//     .staff-name{font-weight:600;color:#1e293b;font-size:.9375rem;margin:0 0 .2rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-role{font-size:.72rem;color:#64748b;margin:0;text-transform:capitalize}
//     .staff-email{font-size:.7rem;color:#94a3b8;margin:.1rem 0 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
//     .staff-rating{display:flex;align-items:center;gap:.4rem;flex-shrink:0}
//     .no-rating{background:#f1f5f9;color:#94a3b8;padding:.2rem .6rem;border-radius:4px;font-size:.7rem;font-weight:500}
//     .src-badge{padding:.25rem .625rem;border-radius:4px;font-size:.7rem;font-weight:600;text-transform:uppercase;flex-shrink:0}
//     .src-badge.internal{background:#eff6ff;color:#1e40af}
//     .src-badge.fl{background:#fdf4ff;color:#7e22ce}
//     .empty-state{padding:3rem;text-align:center;color:#94a3b8}
//     .empty-state-icon{opacity:.25;display:block;margin:0 auto 1rem}
//     .empty-state-text{margin:0;font-size:.875rem}
//     .rating-count-badge{background:#f1f5f9;color:#475569;font-size:.68rem;font-weight:600;padding:.15rem .45rem;border-radius:4px}
//     .scn-cb-wrap{position:relative;cursor:pointer;flex-shrink:0;width:20px;height:20px}
//     .scn-cb-wrap input[type=checkbox]{position:absolute;opacity:0;width:0;height:0;pointer-events:none}
//     .scn-cb-box{width:20px;height:20px;border:2px solid #cbd5e1;border-radius:5px;display:flex;align-items:center;justify-content:center;transition:all .15s;background:white;cursor:pointer}
//     .scn-cb-wrap input:checked ~ .scn-cb-box{background:#3b82f6;border-color:#3b82f6}
//     .scn-cb-box svg{opacity:0;transform:scale(.5);transition:all .15s}
//     .scn-cb-wrap input:checked ~ .scn-cb-box svg{opacity:1;transform:scale(1)}
//     .scn-select-bar{display:flex;align-items:center;gap:.75rem;padding:.5rem .875rem;background:#f8fafc;border-radius:8px;margin-bottom:.75rem;border:1px solid #e2e8f0}
//     .scn-sel-count{margin-left:auto;font-size:.75rem;background:#dbeafe;color:#1e40af;padding:2px 8px;border-radius:4px;font-weight:600}
//     .scn-send-fab{display:flex;align-items:center;gap:.5rem;padding:.55rem 1.1rem;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;border-radius:8px;cursor:pointer;font-size:.8rem;font-weight:700;box-shadow:0 4px 14px rgba(59,130,246,.4);transition:all .2s;white-space:nowrap}
//     .scn-send-fab:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(59,130,246,.5)}
//     .scn-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);backdrop-filter:blur(4px);z-index:1400;display:flex;align-items:center;justify-content:center;padding:1rem}
//     .scn-modal{background:white;border-radius:16px;width:100%;max-width:580px;box-shadow:0 25px 60px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:92vh;overflow:hidden}
//     .scn-modal-header{padding:1.25rem 1.5rem;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
//     .scn-modal-body{padding:1.25rem 1.5rem;overflow-y:auto;flex:1}
//     .scn-modal-footer{padding:1rem 1.5rem;border-top:1px solid #e2e8f0;display:flex;justify-content:flex-end;gap:.75rem;flex-shrink:0;background:#f8fafc}
//     .scn-close-btn{width:32px;height:32px;border-radius:8px;border:1px solid #e2e8f0;background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:all .15s;padding:0}
//     .scn-close-btn:hover{background:#f1f5f9;color:#1e293b}
//     .scn-label{font-size:.8rem;font-weight:700;color:#374151;margin-bottom:.375rem;display:block}
//     .scn-recipients-box{display:flex;flex-wrap:wrap;gap:.4rem;padding:.625rem;border:1.5px solid #e2e8f0;border-radius:8px;background:#f8fafc;min-height:48px;margin-bottom:1rem}
//     .scn-chip{display:flex;align-items:center;gap:.35rem;padding:.25rem .6rem .25rem .35rem;background:white;border:1px solid #e2e8f0;border-radius:20px;font-size:.78rem;font-weight:600;color:#334155;box-shadow:0 1px 2px rgba(0,0,0,.05)}
//     .scn-chip-avatar{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:white;flex-shrink:0}
//     .scn-chip-avatar.staff{background:linear-gradient(135deg,#667eea,#764ba2)}
//     .scn-chip-avatar.freelancer{background:linear-gradient(135deg,#f093fb,#f5576c)}
//     .scn-chip-remove{width:16px;height:16px;border-radius:50%;background:#f1f5f9;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;transition:all .15s;padding:0;margin-left:.1rem}
//     .scn-chip-remove:hover{background:#fecaca;color:#dc2626}
//     .scn-section-label{width:100%;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin:.35rem 0 .25rem .1rem}
//     .scn-input{width:100%;padding:.625rem .875rem;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.875rem;color:#1e293b;font-family:inherit;transition:border .15s;background:white;box-sizing:border-box;margin-bottom:.875rem}
//     .scn-input:focus{outline:none;border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
//     .scn-textarea{resize:vertical;min-height:120px;line-height:1.65;margin-bottom:.25rem}
//     .scn-char{font-size:.72rem;color:#94a3b8;text-align:right;margin-bottom:.5rem}
//     .scn-banner{display:flex;align-items:center;gap:.625rem;padding:.75rem 1rem;border-radius:8px;font-size:.875rem;font-weight:500;margin-bottom:.875rem}
//     .scn-banner.success{background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d}
//     .scn-banner.error{background:#fef2f2;border:1px solid #fecaca;color:#dc2626}
//     .scn-btn-cancel{padding:.65rem 1.25rem;background:white;border:1.5px solid #e2e8f0;border-radius:8px;font-size:.875rem;font-weight:600;color:#64748b;cursor:pointer;transition:all .15s}
//     .scn-btn-cancel:hover{background:#f1f5f9;border-color:#cbd5e1}
//     .scn-btn-send{display:flex;align-items:center;gap:.5rem;padding:.65rem 1.5rem;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;border-radius:8px;font-size:.875rem;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(59,130,246,.35);transition:all .2s}
//     .scn-btn-send:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 18px rgba(59,130,246,.45)}
//     .scn-btn-send:disabled{opacity:.5;cursor:not-allowed;transform:none}
//     @keyframes scnSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
//     .scn-spin{animation:scnSpin 1s linear infinite}

//     /* ── Notification History Table ── */
//     .nh-wrap{background:white;border-radius:10px;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.05);overflow:hidden}
//     .nh-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #e2e8f0;background:#fafafa}
//     .nh-title{font-size:.9375rem;font-weight:700;color:#1e293b;display:flex;align-items:center;gap:.5rem}
//     .nh-total-badge{background:#dbeafe;color:#1e40af;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:20px}
//     .nh-refresh-btn{display:flex;align-items:center;gap:.35rem;padding:.375rem .75rem;background:white;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;font-size:.75rem;font-weight:600;color:#475569;transition:all .15s}
//     .nh-refresh-btn:hover{background:#f1f5f9;border-color:#cbd5e1}
//     .nh-scroll{overflow-x:auto;overflow-y:auto;max-height:480px}
//     .nh-table{width:100%;border-collapse:collapse;min-width:700px}
//     .nh-table thead th{position:sticky;top:0;z-index:2;padding:.625rem 1rem;background:#f8fafc;text-align:left;font-size:.72rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.04em;border-bottom:2px solid #e2e8f0;white-space:nowrap}
//     .nh-table thead th:last-child{text-align:center}
//     .nh-row{border-bottom:1px solid #f1f5f9;transition:background .15s;cursor:pointer}
//     .nh-row:hover{background:#f8fafc}
//     .nh-row.expanded{background:#eff6ff}
//     .nh-row td{padding:.75rem 1rem;vertical-align:top}
//     .nh-subject{font-weight:600;color:#1e293b;font-size:.875rem;margin:0 0 .2rem 0}
//     .nh-message-preview{color:#64748b;font-size:.78rem;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:260px}
//     .nh-time{color:#94a3b8;font-size:.75rem;white-space:nowrap}
//     .nh-recipients-count{display:inline-flex;align-items:center;gap:.35rem;background:#f1f5f9;padding:.2rem .6rem;border-radius:20px;font-size:.75rem;font-weight:600;color:#475569}
//     .nh-read-bar{height:6px;background:#e2e8f0;border-radius:3px;margin-top:.25rem;overflow:hidden}
//     .nh-read-fill{height:100%;background:linear-gradient(90deg,#22c55e,#16a34a);border-radius:3px;transition:width .3s ease}
//     .nh-read-text{font-size:.68rem;color:#64748b;margin-top:.2rem}
//     .nh-actions{display:flex;align-items:center;justify-content:center;gap:.5rem}
//     .nh-icon-btn{width:28px;height:28px;border-radius:6px;border:1px solid #e2e8f0;background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:all .15s;padding:0}
//     .nh-icon-btn:hover.expand{background:#eff6ff;border-color:#3b82f6;color:#3b82f6}
//     .nh-icon-btn:hover.delete{background:#fef2f2;border-color:#fecaca;color:#dc2626}
//     .nh-expand-row td{padding:0;border-bottom:1px solid #e2e8f0}
//     .nh-expand-body{background:#f8faff;padding:1rem 1.25rem 1.25rem 1.25rem;border-top:1px solid #dbeafe}
//     .nh-expand-msg{background:white;border:1px solid #e2e8f0;border-radius:8px;padding:.875rem 1rem;font-size:.875rem;color:#334155;line-height:1.6;margin-bottom:1rem;white-space:pre-wrap}
//     .nh-recipient-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}
//     .nh-rchip{display:inline-flex;align-items:center;gap:.35rem;padding:.25rem .625rem;border-radius:20px;font-size:.75rem;font-weight:600}
//     .nh-rchip.staff{background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe}
//     .nh-rchip.freelancer{background:#fdf4ff;color:#7e22ce;border:1px solid #e9d5ff}
//     .nh-rchip .read-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
//     .nh-rchip .read-dot.yes{background:#22c55e}
//     .nh-rchip .read-dot.no{background:#f59e0b}
//     .nh-pagination{display:flex;align-items:center;justify-content:space-between;padding:.875rem 1.25rem;border-top:1px solid #e2e8f0;background:#fafafa}
//     .nh-page-info{font-size:.78rem;color:#64748b}
//     .nh-page-btns{display:flex;gap:.375rem}
//     .nh-page-btn{padding:.375rem .75rem;border:1px solid #e2e8f0;background:white;border-radius:6px;font-size:.78rem;font-weight:600;color:#475569;cursor:pointer;transition:all .15s}
//     .nh-page-btn:hover:not(:disabled){background:#f1f5f9;border-color:#cbd5e1}
//     .nh-page-btn:disabled{opacity:.4;cursor:not-allowed}
//     .nh-page-btn.active{background:#3b82f6;border-color:#3b82f6;color:white}
//     .nh-empty{padding:3rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     .nh-loading{padding:2.5rem;text-align:center;color:#94a3b8;font-size:.875rem}
//     @keyframes nhFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
//     .nh-expand-body{animation:nhFadeIn .18s ease}
//   `;

//   const styles = {
//     header:       { marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' },
//     greeting:     { fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' },
//     subtitle:     { fontSize: '0.875rem', color: '#64748b', display: 'flex', gap: '1rem', marginTop: '0.5rem' },
//     sectionTitle: { fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
//   };

//   const fetchdata = useCallback(async () => {
//     try {
//       setLoading(true); setError(null);
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date(), start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }
//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);
//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);
//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (raw.staff !== undefined || raw.freelancers !== undefined) {
//           setStaffList((raw.staff       || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         } else if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff'      || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else { setStaffList([]); setFreelancerList([]); }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally { setLoading(false); }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchdata(); }, [fetchdata]);

//   const sortByRating = (a, b) =>
//     (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',    path: '/dashboard/new-project',      color: '#6366f1' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',    path: '/dashboard/running-project',  color: '#f59e0b' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',      path: '/dashboard/complete-project', color: '#10b981' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',         path: '/dashboard/new-project',      color: '#3b82f6' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',              path: '/dashboard/service',          color: '#8b5cf6' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',     path: '/dashboard/staff',            color: '#06b6d4' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',       path: '/dashboard/staff',            color: '#0ea5e9' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account', path: '/dashboard/Freelancers',      color: '#ec4899' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',      path: '/dashboard/category',         color: '#f97316' },
//     ];
//   };

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   const allCountries           = analyticsData?.countryStats || [];
//   const domesticCountries      = allCountries.filter(c =>  isDomestic(c.label));
//   const intlCountries          = allCountries.filter(c => !isDomestic(c.label));
//   const activeCountries        = countryTab        === 'domestic' ? domesticCountries : intlCountries;
//   const activeRevenueCountries = countryRevenueTab === 'domestic' ? domesticCountries : intlCountries;

//   const CountryTabButtons = ({ value, onChange }) => (
//     <div className="country-tabs">
//       <button className={`country-tab${value === 'domestic'      ? ' active domestic'      : ''}`} onClick={() => onChange('domestic')}>
//         🇮🇳 Domestic <span style={{ fontSize: '.7rem', opacity: .7 }}>({domesticCountries.length})</span>
//       </button>
//       <button className={`country-tab${value === 'international' ? ' active international' : ''}`} onClick={() => onChange('international')}>
//         🌍 International <span style={{ fontSize: '.7rem', opacity: .7 }}>({intlCountries.length})</span>
//       </button>
//     </div>
//   );

//   const CountrySummaryStrip = ({ list, tab }) =>
//     list.length > 0 ? (
//       <div style={{ background: tab === 'domestic' ? '#eff6ff' : '#f0fdf4', borderRadius: '6px', padding: '.45rem .75rem', marginBottom: '.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '.75rem' }}>
//         <span style={{ color: '#475569', fontWeight: '500' }}>{list.reduce((s, c) => s + c.value, 0)} purchases</span>
//         <span style={{ fontWeight: '700', color: '#10b981' }}>₹{list.reduce((s, c) => s + c.revenue, 0).toLocaleString()}</span>
//       </div>
//     ) : null;

//   const renderCountryBars = (list, singleColor) => {
//     if (!list?.length) return (
//       <div className="no-country">
//         <Iconify icon="mdi:earth-off" width={32} style={{ opacity: .25, display: 'block', margin: '0 auto .75rem' }} />
//         No data available
//       </div>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = singleColor || palette[i % palette.length];
//       return (
//         <div key={i} style={{ marginBottom: '1rem' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '14px', height: '14px', background: col, borderRadius: '3px' }} />
//               <span style={{ fontSize: '.875rem', color: '#334155', fontWeight: '600' }}>{c.label}</span>
//             </div>
//             <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{c.percentage}%</span>
//           </div>
//           <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '.5rem' }}>
//             <div style={{ width: `${c.percentage}%`, height: '100%', background: col, borderRadius: '5px', transition: 'width .4s ease' }} />
//           </div>
//           <div style={{ fontSize: '.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
//             <span>{c.value} purchases</span>
//             <span style={{ fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</span>
//           </div>
//         </div>
//       );
//     });
//   };

//   const renderCountryTable = (list) => {
//     if (!list?.length) return (
//       <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No data available</td></tr>
//     );
//     const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
//     return list.map((c, i) => {
//       const col = palette[i % palette.length];
//       return (
//         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//           <td style={{ padding: '.75rem .5rem' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//               <div style={{ width: '12px', height: '12px', background: col, borderRadius: '2px' }} />
//               <span style={{ color: '#334155', fontWeight: '500' }}>{c.label}</span>
//             </div>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#fef3c7', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: '600', color: '#92400e' }}>{c.percentage}%</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}>
//             <span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{c.value}</span>
//           </td>
//           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{c.revenue.toLocaleString()}</td>
//         </tr>
//       );
//     });
//   };

//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list?.length) return (
//       <div className="empty-state">
//         <Iconify icon="mdi:account-off-outline" width={48} className="empty-state-icon" />
//         <p className="empty-state-text">No {isFL ? 'freelancers' : 'staff members'} found</p>
//       </div>
//     );
//     const allKeys  = list.map(p => makeKey(p, type));
//     const allSel   = allKeys.every(k => selectedPeople.has(k));
//     const someSel  = allKeys.some(k =>  selectedPeople.has(k));
//     const selCount = allKeys.filter(k => selectedPeople.has(k)).length;
//     return (
//       <>
//         <div className="scn-select-bar">
//           <label className="scn-cb-wrap">
//             <input
//               type="checkbox"
//               checked={allSel}
//               ref={el => { if (el) el.indeterminate = someSel && !allSel; }}
//               onChange={() => toggleSelectAll(list, type)}
//             />
//             <div className="scn-cb-box"><CheckSVG /></div>
//           </label>
//           <span style={{ fontSize: '.82rem', color: '#475569', fontWeight: '600' }}>Select All</span>
//           {someSel && <span className="scn-sel-count">{selCount} selected</span>}
//         </div>
//         {list.map((person, index) => {
//           const key     = makeKey(person, type);
//           const isSel   = selectedPeople.has(key);
//           const rankCls = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
//           return (
//             <div key={String(person.id || person._id || index)} className={`staff-card${isSel ? ' selected' : ''}`}>
//               <label className="scn-cb-wrap" onClick={e => e.stopPropagation()}>
//                 <input type="checkbox" checked={isSel} onChange={() => toggleSelect(person, type)} />
//                 <div className="scn-cb-box"><CheckSVG /></div>
//               </label>
//               <div className={`staff-rank${rankCls ? ` ${rankCls}` : ''}`}>#{index + 1}</div>
//               <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{getInitial(person.name)}</div>
//               <div className="staff-info">
//                 <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//                 <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//                 {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//               </div>
//               <div className="staff-rating">
//                 {person.rating > 0 || person.hasRating ? (
//                   <>
//                     <div style={{ display: 'flex', gap: '2px' }}>
//                       {[...Array(5)].map((_, i) => (
//                         <Iconify key={i} icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'} width={15} style={{ color: '#f59e0b' }} />
//                       ))}
//                     </div>
//                     <span style={{ fontSize: '.875rem', fontWeight: '700', color: '#1e293b' }}>{person.rating?.toFixed(1)}</span>
//                     <span className="rating-count-badge">{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</span>
//                   </>
//                 ) : <span className="no-rating">No rating</span>}
//               </div>
//               <div className={`src-badge${isFL ? ' fl' : ' internal'}`}>{person.source || (isFL ? 'Freelancer' : 'Internal')}</div>
//             </div>
//           );
//         })}
//       </>
//     );
//   };

//   // ── Notification History renderer ─────────────────────────────────────────
//   const renderNotifHistory = () => {
//     const totalPages = Math.ceil(notifHistoryTotal / NOTIF_HISTORY_LIMIT);

//     return (
//       <div className="nh-wrap">
//         {/* Header */}
//         <div className="nh-header">
//           <div className="nh-title">
//             <Iconify icon="mdi:bell-check" width={18} style={{ color: '#3b82f6' }} />
//             Sent Notifications
//             {notifHistoryTotal > 0 && (
//               <span className="nh-total-badge">{notifHistoryTotal} total</span>
//             )}
//           </div>
//           <button className="nh-refresh-btn" onClick={() => fetchNotifHistory(notifHistoryPage)}>
//             <Iconify icon="mdi:refresh" width={14} />
//             Refresh
//           </button>
//         </div>

//         <div className="nh-scroll">
//           <table className="nh-table">
//             <thead>
//               <tr>
//                 <th style={{ width: '32%' }}>Subject / Message</th>
//                 <th style={{ width: '15%' }}>Sent At</th>
//                 <th style={{ width: '13%' }}>Recipients</th>
//                 <th style={{ width: '28%' }}>Read Progress</th>
//                 <th style={{ width: '12%', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {notifHistoryLoading ? (
//                 <tr>
//                   <td colSpan="5" className="nh-loading">
//                     <Iconify icon="mdi:loading" width={20} className="scn-spin" style={{ display: 'inline-block', marginRight: '8px' }} />
//                     Loading notifications...
//                   </td>
//                 </tr>
//               ) : notifHistoryError ? (
//                 <tr>
//                   <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#ef4444', fontSize: '.875rem' }}>
//                     <Iconify icon="mdi:alert-circle" width={18} style={{ marginRight: '6px' }} />
//                     {notifHistoryError}
//                   </td>
//                 </tr>
//               ) : notifHistory.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="nh-empty">
//                     <Iconify icon="mdi:bell-off-outline" width={36} style={{ opacity: .25, display: 'block', margin: '0 auto .75rem' }} />
//                     No notifications sent yet
//                   </td>
//                 </tr>
//               ) : (
//                 notifHistory.map((notif) => {
//                   const isExpanded  = expandedNotif === notif._id;
//                   const readCount   = notif.recipients?.filter(r => r.readAt)?.length || 0;
//                   const total       = notif.recipients?.length || notif.totalRecipients || 0;
//                   const readPct     = total > 0 ? Math.round((readCount / total) * 100) : 0;
//                   const staffRecs   = notif.recipients?.filter(r => r.recipientType === 'staff') || [];
//                   const flRecs      = notif.recipients?.filter(r => r.recipientType === 'freelancer') || [];

//                   return (
//                     <>
//                       <tr
//                         key={notif._id}
//                         className={`nh-row${isExpanded ? ' expanded' : ''}`}
//                         onClick={() => setExpandedNotif(isExpanded ? null : notif._id)}
//                       >
//                         {/* Subject / Message */}
//                         <td>
//                           <p className="nh-subject">
//                             {notif.subject || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No subject</span>}
//                           </p>
//                           <p className="nh-message-preview">{notif.message}</p>
//                         </td>

//                         {/* Sent At */}
//                         <td>
//                           <div className="nh-time">{timeAgo(notif.createdAt)}</div>
//                           <div style={{ fontSize: '.68rem', color: '#cbd5e1', marginTop: '.1rem' }}>
//                             {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
//                           </div>
//                         </td>

//                         {/* Recipients count */}
//                         <td>
//                           <div className="nh-recipients-count">
//                             <Iconify icon="mdi:account-multiple" width={13} />
//                             {total}
//                           </div>
//                           <div style={{ fontSize: '.68rem', color: '#94a3b8', marginTop: '.25rem', display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
//                             {staffRecs.length > 0 && (
//                               <span style={{ background: '#eff6ff', color: '#1e40af', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>
//                                 {staffRecs.length} staff
//                               </span>
//                             )}
//                             {flRecs.length > 0 && (
//                               <span style={{ background: '#fdf4ff', color: '#7e22ce', padding: '1px 5px', borderRadius: '3px', fontWeight: 600 }}>
//                                 {flRecs.length} freelancer
//                               </span>
//                             )}
//                           </div>
//                         </td>

//                         {/* Read progress bar */}
//                         <td>
//                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.2rem' }}>
//                             <span style={{ fontSize: '.72rem', color: '#64748b', fontWeight: 600 }}>
//                               {readCount}/{total} read
//                             </span>
//                             <span style={{ fontSize: '.72rem', fontWeight: 700, color: readPct === 100 ? '#16a34a' : readPct > 0 ? '#f59e0b' : '#94a3b8' }}>
//                               {readPct}%
//                             </span>
//                           </div>
//                           <div className="nh-read-bar">
//                             <div className="nh-read-fill" style={{ width: `${readPct}%`, background: readPct === 100 ? 'linear-gradient(90deg,#22c55e,#16a34a)' : readPct > 0 ? 'linear-gradient(90deg,#f59e0b,#d97706)' : '#e2e8f0' }} />
//                           </div>
//                           <div className="nh-read-text">
//                             {readPct === 100 ? '✓ All read' : readPct === 0 ? 'None read yet' : `${total - readCount} pending`}
//                           </div>
//                         </td>

//                         {/* Actions */}
//                         <td>
//                           <div className="nh-actions" onClick={e => e.stopPropagation()}>
//                             <button
//                               className={`nh-icon-btn expand`}
//                               title={isExpanded ? 'Collapse' : 'View details'}
//                               onClick={(e) => { e.stopPropagation(); setExpandedNotif(isExpanded ? null : notif._id); }}
//                             >
//                               <Iconify icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={15} />
//                             </button>
//                             <button
//                               className={`nh-icon-btn delete`}
//                               title="Delete notification"
//                               onClick={(e) => { e.stopPropagation(); deleteNotif(notif._id); }}
//                             >
//                               <Iconify icon="mdi:trash-can-outline" width={14} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>

//                       {/* ── Expanded row ── */}
//                       {isExpanded && (
//                         <tr key={`${notif._id}-expand`} className="nh-expand-row">
//                           <td colSpan="5">
//                             <div className="nh-expand-body">
//                               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                                 {/* Full message */}
//                                 <div>
//                                   <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
//                                     Full Message
//                                   </div>
//                                   <div className="nh-expand-msg">{notif.message}</div>
//                                   <div style={{ fontSize: '.72rem', color: '#94a3b8' }}>
//                                     Sent on {new Date(notif.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
//                                   </div>
//                                 </div>

//                                 {/* Recipients with read status */}
//                                 <div>
//                                   <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
//                                     Recipients ({total})
//                                   </div>
//                                   <div className="nh-recipient-chips">
//                                     {notif.recipients?.map((r, i) => {
//                                       const isStaff = r.recipientType === 'staff';
//                                       return (
//                                         <span key={i} className={`nh-rchip ${isStaff ? 'staff' : 'freelancer'}`} title={r.readAt ? `Read: ${new Date(r.readAt).toLocaleString('en-IN')}` : 'Not read yet'}>
//                                           <span className={`read-dot ${r.readAt ? 'yes' : 'no'}`} />
//                                           {r.name || 'Unknown'}
//                                           {r.readAt
//                                             ? <Iconify icon="mdi:check-circle" width={11} style={{ color: '#22c55e', marginLeft: '2px' }} />
//                                             : <Iconify icon="mdi:clock-outline" width={11} style={{ color: '#f59e0b', marginLeft: '2px' }} />
//                                           }
//                                         </span>
//                                       );
//                                     })}
//                                   </div>
//                                   {notif.recipients?.length === 0 && (
//                                     <span style={{ fontSize: '.78rem', color: '#94a3b8' }}>No recipient data available</span>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="nh-pagination">
//             <span className="nh-page-info">
//               Showing {((notifHistoryPage - 1) * NOTIF_HISTORY_LIMIT) + 1}–{Math.min(notifHistoryPage * NOTIF_HISTORY_LIMIT, notifHistoryTotal)} of {notifHistoryTotal}
//             </span>
//             <div className="nh-page-btns">
//               <button
//                 className="nh-page-btn"
//                 disabled={notifHistoryPage === 1}
//                 onClick={() => fetchNotifHistory(notifHistoryPage - 1)}
//               >
//                 ← Prev
//               </button>
//               {[...Array(Math.min(totalPages, 5))].map((_, i) => {
//                 const pg = i + 1;
//                 return (
//                   <button
//                     key={pg}
//                     className={`nh-page-btn${notifHistoryPage === pg ? ' active' : ''}`}
//                     onClick={() => fetchNotifHistory(pg)}
//                   >
//                     {pg}
//                   </button>
//                 );
//               })}
//               <button
//                 className="nh-page-btn"
//                 disabled={notifHistoryPage === totalPages}
//                 onClick={() => fetchNotifHistory(notifHistoryPage + 1)}
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={60} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <><style>{customCSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchdata} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData      = getStatsData();
//   const activeList     = activeTab === 'staff' ? staffList : freelancerList;
//   const staffKeys      = [...modalRecipients].filter(k => k.endsWith('::staff'));
//   const freelancerKeys = [...modalRecipients].filter(k => k.endsWith('::freelancer'));

//   return (
//     <>
//       <style>{customCSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       {/* ── Send Notification Modal ── */}
//       {notifModalOpen && (
//         <div className="scn-overlay" onClick={e => { if (e.target === e.currentTarget) closeNotifModal(); }}>
//           <div className="scn-modal">
//             <div className="scn-modal-header">
//               <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
//                 <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
//                   <Iconify icon="mdi:bell-ring" width={20} style={{ color: 'white' }} />
//                 </div>
//                 <div>
//                   <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Send Notification</h2>
//                   <p style={{ margin: 0, fontSize: '.75rem', color: '#64748b' }}>
//                     {modalRecipients.size} recipient{modalRecipients.size !== 1 ? 's' : ''} selected
//                   </p>
//                 </div>
//               </div>
//               <button className="scn-close-btn" onClick={closeNotifModal}>
//                 <Iconify icon="mdi:close" width={16} />
//               </button>
//             </div>
//             <div className="scn-modal-body">
//               {notifSuccess && <div className="scn-banner success"><Iconify icon="mdi:check-circle" width={18} /> {notifSuccess}</div>}
//               {notifError   && <div className="scn-banner error"><Iconify icon="mdi:alert-circle" width={18} /> {notifError}</div>}
//               <span className="scn-label">To</span>
//               <div className="scn-recipients-box">
//                 {modalRecipients.size === 0 && <span style={{ fontSize: '.8rem', color: '#94a3b8', alignSelf: 'center' }}>No recipients</span>}
//                 {staffKeys.length > 0 && (
//                   <>
//                     <span className="scn-section-label">Internal Staff</span>
//                     {staffKeys.map(key => {
//                       const { person } = getPersonFromKey(key);
//                       return (
//                         <div className="scn-chip" key={key}>
//                           <div className="scn-chip-avatar staff">{getInitial(person?.name)}</div>
//                           {person?.name || 'Unknown'}
//                           <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//                 {freelancerKeys.length > 0 && (
//                   <>
//                     <span className="scn-section-label">Freelancers</span>
//                     {freelancerKeys.map(key => {
//                       const { person } = getPersonFromKey(key);
//                       return (
//                         <div className="scn-chip" key={key}>
//                           <div className="scn-chip-avatar freelancer">{getInitial(person?.name)}</div>
//                           {person?.name || 'Unknown'}
//                           <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
//                         </div>
//                       );
//                     })}
//                   </>
//                 )}
//               </div>
//               <span className="scn-label">Subject <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional)</span></span>
//               <input type="text" className="scn-input" placeholder="e.g. Project Update, New Assignment..." value={notifSubject} onChange={e => setNotifSubject(e.target.value)} maxLength={120} />
//               <span className="scn-label">Message <span style={{ color: '#ef4444' }}>*</span></span>
//               <textarea className="scn-input scn-textarea" placeholder="Type your message here..." value={notifMessage} onChange={e => { setNotifMessage(e.target.value); setNotifError(''); }} maxLength={1000} />
//               <div className="scn-char">{notifMessage.length} / 1000</div>
//             </div>
//             <div className="scn-modal-footer">
//               <button className="scn-btn-cancel" onClick={closeNotifModal} disabled={notifSending}>Cancel</button>
//               <button className="scn-btn-send" onClick={handleSendNotification} disabled={notifSending || !modalRecipients.size || !notifMessage.trim()}>
//                 {notifSending ? <><Iconify icon="mdi:loading" width={16} className="scn-spin" /> Sending...</> : <><Iconify icon="mdi:send" width={16} /> Send to {modalRecipients.size}</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Container maxWidth="xl" sx={{ py: 0 }}>
//         <div style={styles.header}>
//           <h1 style={styles.greeting}>{getGreeting()}, Admin</h1>
//           <div style={styles.subtitle}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* Stats */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(s.path)}>
//                 <div className="stat-icon" style={{ background: s.color }}><Iconify icon={s.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 <Iconify icon="mdi:arrow-right" width={16} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//           <Typography style={styles.sectionTitle}>
//             <span className="section-icon"><Iconify icon="mdi:chart-line" width={18} /></span>
//             Purchasing Analytics
//           </Typography>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.5rem 1rem', background: filterPeriod === p && !startDate && !endDate ? '#3b82f6' : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : '#64748b', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: '500' }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', padding: '.25rem .5rem', background: startDate && endDate ? '#eff6ff' : 'transparent', borderRadius: '6px' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: '#64748b', fontSize: '.875rem', fontWeight: '500' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '4px', padding: '.5rem .75rem', cursor: 'pointer', fontSize: '.75rem', color: '#991b1b', fontWeight: '600' }}>✕ Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary cards */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                   icon: 'mdi:cart-check',    bg: '#3b82f6' },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                   icon: 'mdi:cash-refund',   bg: '#ef4444' },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,  icon: 'mdi:cash-multiple', bg: '#10b981', sm: true },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                icon: 'mdi:percent',       bg: '#f59e0b' },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon" style={{ background: c.bg }}><Iconify icon={c.icon} width={20} /></div>
//                 <div className="stat-content">
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={c.sm ? { fontSize: '1.25rem' } : {}}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Charts */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <h3 style={{ margin: '0 0 .25rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem 0', fontSize: '.875rem', color: '#64748b' }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} &nbsp;|&nbsp;
//                 Refunded: {analyticsData?.summary?.totalRefunds || 0} &nbsp;|&nbsp;
//                 Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '340px', alignItems: 'flex-end', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH = (bought / mx) * 240, rH = (refunds / mx) * 240;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
//                         <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '240px' }}>
//                           <div style={{ width: '20px', height: `${bH}px`, background: '#3b82f6', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#3b82f6', whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#10b981', whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: '20px', height: `${rH}px`, background: '#ef4444', borderRadius: '4px 4px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: '-42px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', fontWeight: '600', color: '#f59e0b', whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: '11px', whiteSpace: 'nowrap', fontWeight: '500', color: '#64748b' }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }} /><span style={{ fontWeight: '500' }}>Services Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '3px' }} /><span style={{ fontWeight: '500' }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '100%' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Countries</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryTab} onChange={setCountryTab} />
//               <CountrySummaryStrip list={activeCountries} tab={countryTab} />
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 {renderCountryBars(activeCountries, countryTab === 'domestic' ? '#3b82f6' : null)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Staff & Freelancers */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '.5rem', flexWrap: 'wrap', gap: '.75rem' }}>
//           <Typography style={{ ...styles.sectionTitle, margin: 0 }}>
//             <span className="section-icon"><Iconify icon="mdi:star" width={18} /></span>
//             Staff &amp; Freelancers
//           </Typography>
//         </div>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
//               <div className="people-tabs">
//                 <button className={`people-tab${activeTab === 'staff'      ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={16} /> Internal Staff <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`people-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={16} /> Freelancers <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem', marginLeft: 'auto' }}>
//                   {selectedPeople.size > 0 && (
//                     <button className="scn-send-fab" onClick={openNotifModal}>
//                       <Iconify icon="mdi:bell-ring" width={16} />
//                       Send Notification&nbsp;
//                       <span style={{ background: 'rgba(255,255,255,.25)', borderRadius: '20px', padding: '1px 8px', fontSize: '.75rem' }}>
//                         {selectedPeople.size}
//                       </span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:trending-up" width={18} /></span>
//           Service Performance &amp; Geography
//         </Typography>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px' }}>
//               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Top Services</h3>
//               <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Service','Bought','Refunds','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                           <td style={{ padding: '.75rem .5rem', color: '#334155', fontWeight: '500' }}>{s.label}</td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: '#1e40af' }}>{s.value}</span></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'center' }}><span style={{ background: s.refunds > 0 ? '#fee2e2' : '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '.75rem', fontWeight: '600', color: s.refunds > 0 ? '#991b1b' : '#64748b' }}>{s.refunds}</span></td>
//                           <td style={{ padding: '.75rem .5rem', textAlign: 'right', fontWeight: '600', color: '#10b981' }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,.05)', height: '400px', display: 'flex', flexDirection: 'column' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>Country Revenue</h3>
//                 <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryRevenueTab} onChange={setCountryRevenueTab} />
//               <CountrySummaryStrip list={activeRevenueCountries} tab={countryRevenueTab} />
//               <div style={{ flex: 1, overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
//                     <tr>
//                       {['Country','%','Purchases','Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i===0?'left':i===3?'right':'center', fontSize: '.75rem', fontWeight: '600', color: '#64748b' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>{renderCountryTable(activeRevenueCountries)}</tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* ── NOTIFICATION HISTORY SECTION ── */}
//         <Typography style={styles.sectionTitle}>
//           <span className="section-icon"><Iconify icon="mdi:bell-check" width={18} /></span>
//           Notification History
//         </Typography>
//         <Grid container spacing={1.5} sx={{ mb: 4 }}>
//           <Grid item xs={12}>
//             {renderNotifHistory()}
//           </Grid>
//         </Grid>

//       </Container>
//     </>
//   );
// }















// import { Helmet } from 'react-helmet-async';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Container, Typography, CircularProgress, Alert } from '@mui/material';
// import Iconify from '../components/iconify';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// // ─── Constants ────────────────────────────────────────────────────────────────

// const DOMESTIC_COUNTRIES  = ['india', 'in'];
// const NOTIF_HISTORY_LIMIT = 10;

// // ─── Design tokens — ONE place to change colours ─────────────────────────────
// const C = {
//   primary:   '#2563eb',   // blue — CTAs, active states
//   success:   '#16a34a',   // green — positive values
//   danger:    '#dc2626',   // red   — errors, refunds
//   warn:      '#d97706',   // amber — pending / warnings
//   text:      '#111827',   // near-black
//   textSub:   '#6b7280',   // grey — labels, secondary
//   textMuted: '#9ca3af',   // light grey
//   border:    '#e5e7eb',
//   bg:        '#f9fafb',
//   white:     '#ffffff',
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const isDomestic  = (label = '') => DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());
// const parseKey    = (key)          => { const [id, type] = key.split('::'); return { id, type }; };
// const makeKey     = (p, type)      => `${p.id || p._id}::${type}`;
// const getInitial  = (name)         => (name || 'U').charAt(0).toUpperCase();

// const timeAgo = (dateStr) => {
//   if (!dateStr) return '';
//   const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
//   if (diff < 60)     return `${diff}s ago`;
//   if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
//   if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
//   return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
// };

// const sortByRating = (a, b) =>
//   (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

// // ─── Tiny sub-components ─────────────────────────────────────────────────────

// const CheckSVG = () => (
//   <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//     <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const Tag = ({ children, color = C.textSub, bg = C.bg }) => (
//   <span style={{ background: bg, color, fontSize: '.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}>
//     {children}
//   </span>
// );

// // ─── CSS ─────────────────────────────────────────────────────────────────────

// const CSS = `
//   *::-webkit-scrollbar { width: 5px; height: 5px }
//   *::-webkit-scrollbar-track { background: ${C.bg} }
//   *::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 8px }

//   /* Cards */
//   .dc-card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 10px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,.04); }

//   /* Stat cards */
//   .stat-card { display: flex; align-items: center; gap: .875rem; cursor: pointer; transition: box-shadow .2s, transform .2s; height: 100%; }
//   .stat-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,.08); transform: translateY(-1px); }
//   .stat-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: ${C.bg}; color: ${C.primary}; }
//   .stat-title { font-size: .72rem; color: ${C.textSub}; font-weight: 500; margin: 0 0 .2rem 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//   .stat-value { font-size: 1.4rem; font-weight: 700; color: ${C.text}; margin: 0; line-height: 1; }
//   .stat-arrow { opacity: 0; transform: translateX(-4px); transition: all .2s; color: ${C.primary}; flex-shrink: 0; }
//   .stat-card:hover .stat-arrow { opacity: 1; transform: translateX(0); }

//   /* Tabs */
//   .dc-tabs { display: flex; border-bottom: 2px solid ${C.border}; margin-bottom: 1.25rem; }
//   .dc-tab { padding: .6rem 1.2rem; background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-size: .875rem; font-weight: 600; color: ${C.textSub}; transition: all .15s; margin-bottom: -2px; display: flex; align-items: center; gap: .4rem; }
//   .dc-tab.active { color: ${C.primary}; border-bottom-color: ${C.primary}; }
//   .dc-tab:hover:not(.active) { color: ${C.text}; background: ${C.bg}; border-radius: 6px 6px 0 0; }
//   .tab-count { background: ${C.bg}; color: ${C.textSub}; font-size: .68rem; font-weight: 700; padding: 1px 7px; border-radius: 20px; }
//   .dc-tab.active .tab-count { background: #dbeafe; color: ${C.primary}; }

//   /* Country tabs */
//   .ctry-tabs { display: flex; gap: .5rem; margin-bottom: .875rem; }
//   .ctry-tab { flex: 1; padding: .4rem .75rem; background: ${C.bg}; border: 1.5px solid ${C.border}; border-radius: 8px; cursor: pointer; font-size: .78rem; font-weight: 600; color: ${C.textSub}; transition: all .15s; text-align: center; }
//   .ctry-tab.active { background: #eff6ff; border-color: ${C.primary}; color: ${C.primary}; }
//   .ctry-tab:hover:not(.active) { background: ${C.border}; }

//   /* Staff cards */
//   .staff-card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 10px; padding: .875rem 1rem; display: flex; align-items: center; gap: .75rem; transition: box-shadow .15s, border-color .15s; margin-bottom: .5rem; }
//   .staff-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,.07); border-color: #cbd5e1; }
//   .staff-card.selected { border-color: ${C.primary}; background: #f0f7ff; }
//   .staff-rank { background: ${C.bg}; color: ${C.textSub}; font-weight: 700; font-size: .78rem; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//   .staff-rank.top1 { background: #fef3c7; color: #92400e; }
//   .staff-rank.top2 { background: ${C.bg}; color: ${C.textSub}; }
//   .staff-rank.top3 { background: #fef3c7; color: #92400e; opacity: .7; }
//   .staff-avatar { width: 40px; height: 40px; border-radius: 50%; background: ${C.primary}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
//   .staff-avatar.fl { background: ${C.textSub}; }
//   .staff-info { flex: 1; min-width: 0; }
//   .staff-name { font-weight: 600; color: ${C.text}; font-size: .9rem; margin: 0 0 .15rem 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//   .staff-role { font-size: .72rem; color: ${C.textSub}; margin: 0; text-transform: capitalize; }
//   .staff-email { font-size: .68rem; color: ${C.textMuted}; margin: .1rem 0 0 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//   .no-rating { font-size: .72rem; color: ${C.textMuted}; }

//   /* Select bar */
//   .scn-select-bar { display: flex; align-items: center; gap: .75rem; padding: .5rem .875rem; background: ${C.bg}; border-radius: 8px; margin-bottom: .75rem; border: 1px solid ${C.border}; }
//   .scn-sel-count { margin-left: auto; font-size: .72rem; background: #dbeafe; color: ${C.primary}; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
//   .scn-cb-wrap { position: relative; cursor: pointer; flex-shrink: 0; width: 20px; height: 20px; }
//   .scn-cb-wrap input[type=checkbox] { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
//   .scn-cb-box { width: 20px; height: 20px; border: 2px solid ${C.border}; border-radius: 5px; display: flex; align-items: center; justify-content: center; transition: all .15s; background: white; cursor: pointer; }
//   .scn-cb-wrap input:checked ~ .scn-cb-box { background: ${C.primary}; border-color: ${C.primary}; }
//   .scn-cb-box svg { opacity: 0; transform: scale(.5); transition: all .15s; }
//   .scn-cb-wrap input:checked ~ .scn-cb-box svg { opacity: 1; transform: scale(1); }

//   /* Send FAB */
//   .scn-send-fab { display: flex; align-items: center; gap: .5rem; padding: .5rem 1rem; background: ${C.primary}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: .8rem; font-weight: 600; transition: opacity .15s; white-space: nowrap; }
//   .scn-send-fab:hover { opacity: .88; }

//   /* Modal */
//   .scn-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); backdrop-filter: blur(3px); z-index: 1400; display: flex; align-items: center; justify-content: center; padding: 1rem; }
//   .scn-modal { background: white; border-radius: 12px; width: 100%; max-width: 560px; box-shadow: 0 20px 50px rgba(0,0,0,.18); display: flex; flex-direction: column; max-height: 92vh; overflow: hidden; }
//   .scn-modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid ${C.border}; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
//   .scn-modal-body { padding: 1.25rem 1.5rem; overflow-y: auto; flex: 1; }
//   .scn-modal-footer { padding: 1rem 1.5rem; border-top: 1px solid ${C.border}; display: flex; justify-content: flex-end; gap: .75rem; flex-shrink: 0; background: ${C.bg}; }
//   .scn-close-btn { width: 30px; height: 30px; border-radius: 6px; border: 1px solid ${C.border}; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: ${C.textSub}; transition: background .15s; padding: 0; }
//   .scn-close-btn:hover { background: ${C.bg}; }
//   .scn-label { font-size: .78rem; font-weight: 700; color: ${C.text}; margin-bottom: .375rem; display: block; }
//   .scn-recipients-box { display: flex; flex-wrap: wrap; gap: .4rem; padding: .625rem; border: 1.5px solid ${C.border}; border-radius: 8px; background: ${C.bg}; min-height: 44px; margin-bottom: 1rem; }
//   .scn-chip { display: flex; align-items: center; gap: .35rem; padding: .2rem .55rem .2rem .3rem; background: white; border: 1px solid ${C.border}; border-radius: 20px; font-size: .78rem; font-weight: 600; color: ${C.text}; }
//   .scn-chip-avatar { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .62rem; font-weight: 700; color: white; flex-shrink: 0; background: ${C.primary}; }
//   .scn-chip-avatar.freelancer { background: ${C.textSub}; }
//   .scn-chip-remove { width: 15px; height: 15px; border-radius: 50%; background: ${C.bg}; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: ${C.textSub}; padding: 0; }
//   .scn-chip-remove:hover { background: #fee2e2; color: ${C.danger}; }
//   .scn-section-label { width: 100%; font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: ${C.textMuted}; margin: .3rem 0 .2rem .1rem; }
//   .scn-input { width: 100%; padding: .6rem .875rem; border: 1.5px solid ${C.border}; border-radius: 8px; font-size: .875rem; color: ${C.text}; font-family: inherit; transition: border .15s; background: white; box-sizing: border-box; margin-bottom: .875rem; }
//   .scn-input:focus { outline: none; border-color: ${C.primary}; }
//   .scn-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }
//   .scn-char { font-size: .72rem; color: ${C.textMuted}; text-align: right; margin-bottom: .5rem; margin-top: -.5rem; }
//   .scn-banner { display: flex; align-items: center; gap: .5rem; padding: .65rem .875rem; border-radius: 8px; font-size: .85rem; font-weight: 500; margin-bottom: .875rem; }
//   .scn-banner.success { background: #f0fdf4; border: 1px solid #bbf7d0; color: ${C.success}; }
//   .scn-banner.error   { background: #fef2f2; border: 1px solid #fecaca; color: ${C.danger}; }
//   .scn-btn-cancel { padding: .6rem 1.25rem; background: white; border: 1.5px solid ${C.border}; border-radius: 8px; font-size: .875rem; font-weight: 600; color: ${C.textSub}; cursor: pointer; }
//   .scn-btn-cancel:hover { background: ${C.bg}; }
//   .scn-btn-send { display: flex; align-items: center; gap: .5rem; padding: .6rem 1.5rem; background: ${C.primary}; color: white; border: none; border-radius: 8px; font-size: .875rem; font-weight: 600; cursor: pointer; transition: opacity .15s; }
//   .scn-btn-send:hover:not(:disabled) { opacity: .88; }
//   .scn-btn-send:disabled { opacity: .45; cursor: not-allowed; }
//   @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
//   .spin { animation: spin 1s linear infinite; display: inline-block; }

//   /* Notification history */
//   .nh-wrap { background: white; border-radius: 10px; border: 1px solid ${C.border}; overflow: hidden; }
//   .nh-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 1px solid ${C.border}; background: ${C.bg}; }
//   .nh-title { font-size: .9rem; font-weight: 700; color: ${C.text}; display: flex; align-items: center; gap: .5rem; }
//   .nh-refresh-btn { display: flex; align-items: center; gap: .35rem; padding: .35rem .75rem; background: white; border: 1px solid ${C.border}; border-radius: 6px; cursor: pointer; font-size: .75rem; font-weight: 600; color: ${C.textSub}; }
//   .nh-refresh-btn:hover { background: ${C.bg}; }
//   .nh-scroll { overflow-x: auto; max-height: 480px; }
//   .nh-table { width: 100%; border-collapse: collapse; min-width: 700px; }
//   .nh-table thead th { position: sticky; top: 0; z-index: 2; padding: .6rem 1rem; background: ${C.bg}; text-align: left; font-size: .72rem; font-weight: 700; color: ${C.textSub}; text-transform: uppercase; letter-spacing: .04em; border-bottom: 2px solid ${C.border}; white-space: nowrap; }
//   .nh-row { border-bottom: 1px solid ${C.bg}; transition: background .12s; cursor: pointer; }
//   .nh-row:hover { background: ${C.bg}; }
//   .nh-row.expanded { background: #f0f7ff; }
//   .nh-row td { padding: .75rem 1rem; vertical-align: top; }
//   .nh-subject { font-weight: 600; color: ${C.text}; font-size: .875rem; margin: 0 0 .2rem 0; }
//   .nh-preview { color: ${C.textSub}; font-size: .78rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 260px; }
//   .nh-time { color: ${C.textMuted}; font-size: .75rem; }
//   .nh-read-bar { height: 5px; background: ${C.border}; border-radius: 3px; overflow: hidden; margin: .3rem 0 .2rem; }
//   .nh-read-fill { height: 100%; border-radius: 3px; transition: width .3s; }
//   .nh-actions { display: flex; align-items: center; justify-content: center; gap: .4rem; }
//   .nh-icon-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid ${C.border}; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: ${C.textSub}; padding: 0; transition: all .12s; }
//   .nh-icon-btn:hover { background: ${C.bg}; }
//   .nh-icon-btn.del:hover { background: #fef2f2; border-color: #fecaca; color: ${C.danger}; }
//   .nh-expand-row td { padding: 0; }
//   .nh-expand-body { background: #f8faff; padding: 1rem 1.25rem 1.25rem; border-top: 1px solid #dbeafe; animation: fadeIn .15s ease; }
//   .nh-expand-msg { background: white; border: 1px solid ${C.border}; border-radius: 8px; padding: .875rem 1rem; font-size: .875rem; color: ${C.text}; line-height: 1.6; margin-bottom: 1rem; white-space: pre-wrap; }
//   .nh-rchip { display: inline-flex; align-items: center; gap: .3rem; padding: .2rem .6rem; border-radius: 20px; font-size: .75rem; font-weight: 600; border: 1px solid ${C.border}; color: ${C.textSub}; background: white; }
//   .nh-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
//   .nh-pagination { display: flex; align-items: center; justify-content: space-between; padding: .875rem 1.25rem; border-top: 1px solid ${C.border}; background: ${C.bg}; }
//   .nh-page-info { font-size: .78rem; color: ${C.textSub}; }
//   .nh-page-btns { display: flex; gap: .35rem; }
//   .nh-page-btn { padding: .35rem .75rem; border: 1px solid ${C.border}; background: white; border-radius: 6px; font-size: .78rem; font-weight: 600; color: ${C.textSub}; cursor: pointer; }
//   .nh-page-btn:hover:not(:disabled) { background: ${C.bg}; }
//   .nh-page-btn:disabled { opacity: .4; cursor: not-allowed; }
//   .nh-page-btn.active { background: ${C.primary}; border-color: ${C.primary}; color: white; }
//   @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }

//   /* Date input */
//   .date-input { padding: .45rem .75rem; border: 1px solid ${C.border}; border-radius: 6px; font-size: .875rem; color: ${C.text}; background: white; cursor: pointer; }
//   .date-input:focus { outline: none; border-color: ${C.primary}; }
// `;

// // ─── Shared UI ────────────────────────────────────────────────────────────────

// const SectionTitle = ({ icon, children }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', margin: '1.5rem 0 1rem', fontSize: '1rem', fontWeight: 700, color: C.text }}>
//     <Iconify icon={icon} width={18} style={{ color: C.textSub }} />
//     {children}
//   </div>
// );

// const CountryTabButtons = ({ value, onChange, domesticCount, intlCount }) => (
//   <div className="ctry-tabs">
//     <button className={`ctry-tab${value === 'domestic'      ? ' active' : ''}`} onClick={() => onChange('domestic')}>
//       🇮🇳 Domestic ({domesticCount})
//     </button>
//     <button className={`ctry-tab${value === 'international' ? ' active' : ''}`} onClick={() => onChange('international')}>
//       🌍 International ({intlCount})
//     </button>
//   </div>
// );

// // ─── Main component ───────────────────────────────────────────────────────────

// export default function DashboardAppPage() {
//   const navigate = useNavigate();

//   const [currentTime,       setCurrentTime]       = useState(new Date());
//   const [dashboardData,     setDashboardData]      = useState(null);
//   const [analyticsData,     setAnalyticsData]      = useState(null);
//   const [staffList,         setStaffList]          = useState([]);
//   const [freelancerList,    setFreelancerList]     = useState([]);
//   const [activeTab,         setActiveTab]          = useState('staff');
//   const [countryTab,        setCountryTab]         = useState('domestic');
//   const [countryRevenueTab, setCountryRevenueTab]  = useState('domestic');
//   const [loading,           setLoading]            = useState(true);
//   const [error,             setError]              = useState(null);
//   const [filterPeriod,      setFilterPeriod]       = useState('month');
//   const [startDate,         setStartDate]          = useState('');
//   const [endDate,           setEndDate]            = useState('');

//   // Notification compose
//   const [selectedPeople,  setSelectedPeople]  = useState(new Set());
//   const [notifModalOpen,  setNotifModalOpen]  = useState(false);
//   const [modalRecipients, setModalRecipients] = useState(new Set());
//   const [notifSubject,    setNotifSubject]    = useState('');
//   const [notifMessage,    setNotifMessage]    = useState('');
//   const [notifSending,    setNotifSending]    = useState(false);
//   const [notifSuccess,    setNotifSuccess]    = useState('');
//   const [notifError,      setNotifError]      = useState('');

//   // Notification history
//   const [notifHistory,        setNotifHistory]        = useState([]);
//   const [notifHistoryLoading, setNotifHistoryLoading] = useState(false);
//   const [notifHistoryError,   setNotifHistoryError]   = useState(null);
//   const [notifHistoryPage,    setNotifHistoryPage]    = useState(1);
//   const [notifHistoryTotal,   setNotifHistoryTotal]   = useState(0);
//   const [expandedNotif,       setExpandedNotif]       = useState(null);

//   // ── Clock ──────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     const t = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   const getGreeting = () => {
//     const h = currentTime.getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   // ── Data fetching ──────────────────────────────────────────────────────────

//   const fetchData = useCallback(async () => {
//     setLoading(true); setError(null);
//     try {
//       let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
//       if (startDate && endDate) {
//         analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
//       } else if (filterPeriod === '15days') {
//         const end = new Date(), start = new Date();
//         start.setDate(start.getDate() - 14);
//         analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
//       }

//       const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
//         axios.get(`${Url}/dashboardStaics/GetCardsstats`),
//         axios.get(analyticsUrl),
//         axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
//       ]);

//       if (statsRes.data.success)     setDashboardData(statsRes.data.data);
//       if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);

//       if (topStaffRes.data.success && topStaffRes.data.data) {
//         const raw = topStaffRes.data.data;
//         if (Array.isArray(raw)) {
//           setStaffList(raw.filter(p => p.type === 'staff'      || p.source === 'Internal').sort(sortByRating));
//           setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
//         } else {
//           setStaffList((raw.staff       || []).sort(sortByRating));
//           setFreelancerList((raw.freelancers || []).sort(sortByRating));
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterPeriod, startDate, endDate]);

//   useEffect(() => { fetchData(); }, [fetchData]);

//   const fetchNotifHistory = useCallback(async (page = 1) => {
//     setNotifHistoryLoading(true); setNotifHistoryError(null);
//     try {
//       const { data } = await axios.get(`${Url}/StaffcustomnotificationRoutes`, {
//         params: { page, limit: NOTIF_HISTORY_LIMIT },
//       });
//       if (data.success) {
//         setNotifHistory(data.data || []);
//         setNotifHistoryTotal(data.pagination?.total || 0);
//         setNotifHistoryPage(page);
//       }
//     } catch (err) {
//       setNotifHistoryError(err.response?.data?.message || err.message);
//     } finally {
//       setNotifHistoryLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchNotifHistory(1); }, [fetchNotifHistory]);

//   // ── Actions ────────────────────────────────────────────────────────────────

//   const deleteNotif = async (id) => {
//     if (!window.confirm('Delete this notification?')) return;
//     try {
//       await axios.delete(`${Url}/StaffcustomnotificationRoutes/${id}`);
//       fetchNotifHistory(notifHistoryPage);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Delete failed');
//     }
//   };

//   const toggleSelect = (person, type) => {
//     const key = makeKey(person, type);
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       next.has(key) ? next.delete(key) : next.add(key);
//       return next;
//     });
//   };

//   const toggleSelectAll = (list, type) => {
//     const keys   = list.map(p => makeKey(p, type));
//     const allSel = keys.every(k => selectedPeople.has(k));
//     setSelectedPeople(prev => {
//       const next = new Set(prev);
//       if (allSel) keys.forEach(k => next.delete(k));
//       else        keys.forEach(k => next.add(k));
//       return next;
//     });
//   };

//   const removeModalRecipient = (key) =>
//     setModalRecipients(prev => { const n = new Set(prev); n.delete(key); return n; });

//   const getPersonFromKey = (key) => {
//     const { id, type } = parseKey(key);
//     const list = type === 'staff' ? staffList : freelancerList;
//     return { person: list.find(p => String(p.id || p._id) === String(id)), type };
//   };

//   const openNotifModal = () => {
//     setModalRecipients(new Set(selectedPeople));
//     setNotifSubject(''); setNotifMessage('');
//     setNotifSuccess(''); setNotifError('');
//     setNotifModalOpen(true);
//   };
//   const closeNotifModal = () => setNotifModalOpen(false);

//   const handleSendNotification = async () => {
//     if (!notifMessage.trim())  { setNotifError('Message cannot be empty.');  return; }
//     if (!modalRecipients.size) { setNotifError('No recipients selected.'); return; }

//     let sentBy = null;
//     try {
//       const adminRaw = localStorage.getItem('admin');
//       if (adminRaw) { const o = JSON.parse(adminRaw); sentBy = o?._id || o?.id || null; }
//     } catch { sentBy = null; }
//     if (!sentBy) { setNotifError('Admin session not found. Please login again.'); return; }

//     setNotifError(''); setNotifSending(true);
//     try {
//       const recipients = [...modalRecipients].map(k => parseKey(k));
//       const { data } = await axios.post(`${Url}/StaffcustomnotificationRoutes/send`, {
//         subject: notifSubject, message: notifMessage, recipients, sentBy,
//       });
//       if (data.success) {
//         setNotifSuccess(`✓ Sent to ${data.data.totalRecipients} recipient(s)!`);
//         setTimeout(() => { setSelectedPeople(new Set()); closeNotifModal(); fetchNotifHistory(1); }, 1600);
//       } else {
//         setNotifError(data.message || 'Something went wrong.');
//       }
//     } catch (err) {
//       setNotifError(err.response?.data?.message || err.message);
//     } finally { setNotifSending(false); }
//   };

//   // ── Date filters ───────────────────────────────────────────────────────────

//   const handleStartDateChange = (e) => {
//     const v = e.target.value;
//     if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
//     setStartDate(v); setFilterPeriod('custom');
//   };
//   const handleEndDateChange = (e) => {
//     const v = e.target.value;
//     if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
//     setEndDate(v); setFilterPeriod('custom');
//   };
//   const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

//   // ── Derived data ───────────────────────────────────────────────────────────

//   const getStatsData = () => {
//     if (!dashboardData) return [];
//     const { projects, services, staff, freelancers, categories } = dashboardData;
//     return [
//       { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',    path: '/dashboard/new-project' },
//       { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',   path: '/dashboard/running-project' },
//       { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',     path: '/dashboard/complete-project' },
//       { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',        path: '/dashboard/new-project' },
//       { title: 'Services',         total: services            || 0, icon: 'mdi:grid',             path: '/dashboard/service' },
//       { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',    path: '/dashboard/staff' },
//       { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',      path: '/dashboard/staff' },
//       { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account',path: '/dashboard/Freelancers' },
//       { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',     path: '/dashboard/category' },
//     ];
//   };

//   const allCountries           = analyticsData?.countryStats || [];
//   const domesticCountries      = allCountries.filter(c =>  isDomestic(c.label));
//   const intlCountries          = allCountries.filter(c => !isDomestic(c.label));
//   const activeCountries        = countryTab        === 'domestic' ? domesticCountries : intlCountries;
//   const activeRevenueCountries = countryRevenueTab === 'domestic' ? domesticCountries : intlCountries;

//   // ── Renderers ──────────────────────────────────────────────────────────────

//   const renderCountryBars = (list) => {
//     if (!list?.length) return (
//       <div style={{ padding: '2rem', textAlign: 'center', color: C.textMuted, fontSize: '.875rem' }}>No data available</div>
//     );
//     return list.map((c, i) => (
//       <div key={i} style={{ marginBottom: '.875rem' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
//           <span style={{ fontSize: '.875rem', color: C.text, fontWeight: 600 }}>{c.label}</span>
//           <span style={{ fontSize: '.8rem', fontWeight: 700, color: C.text }}>{c.percentage}%</span>
//         </div>
//         <div style={{ width: '100%', height: '8px', background: C.border, borderRadius: '4px', overflow: 'hidden', marginBottom: '.3rem' }}>
//           <div style={{ width: `${c.percentage}%`, height: '100%', background: C.primary, borderRadius: '4px', transition: 'width .4s ease' }} />
//         </div>
//         <div style={{ fontSize: '.72rem', color: C.textSub, display: 'flex', justifyContent: 'space-between' }}>
//           <span>{c.value} purchases</span>
//           <span style={{ fontWeight: 600, color: C.success }}>₹{c.revenue.toLocaleString()}</span>
//         </div>
//       </div>
//     ));
//   };

//   const renderCountryTable = (list) => {
//     if (!list?.length) return (
//       <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: C.textMuted }}>No data available</td></tr>
//     );
//     return list.map((c, i) => (
//       <tr key={i} style={{ borderBottom: `1px solid ${C.bg}` }}>
//         <td style={{ padding: '.7rem .5rem', color: C.text, fontWeight: 500 }}>{c.label}</td>
//         <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{c.percentage}%</Tag></td>
//         <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{c.value}</Tag></td>
//         <td style={{ padding: '.7rem .5rem', textAlign: 'right', fontWeight: 700, color: C.success }}>₹{c.revenue.toLocaleString()}</td>
//       </tr>
//     ));
//   };

//   const renderPeopleList = (list, type) => {
//     const isFL = type === 'freelancer';
//     if (!list?.length) return (
//       <div style={{ padding: '3rem', textAlign: 'center', color: C.textMuted, fontSize: '.875rem' }}>
//         No {isFL ? 'freelancers' : 'staff'} found
//       </div>
//     );
//     const allKeys  = list.map(p => makeKey(p, type));
//     const allSel   = allKeys.every(k => selectedPeople.has(k));
//     const someSel  = allKeys.some(k =>  selectedPeople.has(k));
//     const selCount = allKeys.filter(k => selectedPeople.has(k)).length;

//     return (
//       <>
//         <div className="scn-select-bar">
//           <label className="scn-cb-wrap">
//             <input
//               type="checkbox"
//               checked={allSel}
//               ref={el => { if (el) el.indeterminate = someSel && !allSel; }}
//               onChange={() => toggleSelectAll(list, type)}
//             />
//             <div className="scn-cb-box"><CheckSVG /></div>
//           </label>
//           <span style={{ fontSize: '.82rem', color: C.textSub, fontWeight: 600 }}>Select All</span>
//           {someSel && <span className="scn-sel-count">{selCount} selected</span>}
//         </div>

//         {list.map((person, index) => {
//           const key   = makeKey(person, type);
//           const isSel = selectedPeople.has(key);
//           const rankCls = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';

//           return (
//             <div key={String(person.id || person._id || index)} className={`staff-card${isSel ? ' selected' : ''}`}>
//               <label className="scn-cb-wrap" onClick={e => e.stopPropagation()}>
//                 <input type="checkbox" checked={isSel} onChange={() => toggleSelect(person, type)} />
//                 <div className="scn-cb-box"><CheckSVG /></div>
//               </label>
//               <div className={`staff-rank${rankCls ? ` ${rankCls}` : ''}`}>#{index + 1}</div>
//               <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{getInitial(person.name)}</div>
//               <div className="staff-info">
//                 <h4 className="staff-name">{person.name || 'Unknown'}</h4>
//                 <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
//                 {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', flexShrink: 0 }}>
//                 {person.rating > 0 ? (
//                   <>
//                     <div style={{ display: 'flex', gap: '2px' }}>
//                       {[...Array(5)].map((_, i) => (
//                         <Iconify key={i}
//                           icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'}
//                           width={14}
//                           style={{ color: '#f59e0b' }}
//                         />
//                       ))}
//                     </div>
//                     <span style={{ fontSize: '.8rem', fontWeight: 700, color: C.text }}>{person.rating?.toFixed(1)}</span>
//                     <Tag>{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</Tag>
//                   </>
//                 ) : <span className="no-rating">No rating</span>}
//               </div>
//             </div>
//           );
//         })}
//       </>
//     );
//   };

//   const renderNotifHistory = () => {
//     const totalPages = Math.ceil(notifHistoryTotal / NOTIF_HISTORY_LIMIT);

//     return (
//       <div className="nh-wrap">
//         <div className="nh-header">
//           <div className="nh-title">
//             <Iconify icon="mdi:bell-check" width={16} style={{ color: C.primary }} />
//             Sent Notifications
//             {notifHistoryTotal > 0 && <Tag color={C.primary} bg="#dbeafe">{notifHistoryTotal} total</Tag>}
//           </div>
//           <button className="nh-refresh-btn" onClick={() => fetchNotifHistory(notifHistoryPage)}>
//             <Iconify icon="mdi:refresh" width={13} /> Refresh
//           </button>
//         </div>

//         <div className="nh-scroll">
//           <table className="nh-table">
//             <thead>
//               <tr>
//                 <th style={{ width: '32%' }}>Subject / Message</th>
//                 <th style={{ width: '15%' }}>Sent At</th>
//                 <th style={{ width: '13%' }}>Recipients</th>
//                 <th style={{ width: '28%' }}>Read</th>
//                 <th style={{ width: '12%', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {notifHistoryLoading ? (
//                 <tr><td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: C.textMuted }}>Loading…</td></tr>
//               ) : notifHistoryError ? (
//                 <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: C.danger, fontSize: '.875rem' }}>{notifHistoryError}</td></tr>
//               ) : notifHistory.length === 0 ? (
//                 <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: C.textMuted }}>No notifications sent yet</td></tr>
//               ) : notifHistory.map((notif) => {
//                 const isExpanded = expandedNotif === notif._id;
//                 const readCount  = notif.recipients?.filter(r => r.readAt)?.length || 0;
//                 const total      = notif.recipients?.length || notif.totalRecipients || 0;
//                 const readPct    = total > 0 ? Math.round((readCount / total) * 100) : 0;
//                 const barColor   = readPct === 100 ? C.success : readPct > 0 ? C.warn : C.border;

//                 return (
//                   <>
//                     <tr
//                       key={notif._id}
//                       className={`nh-row${isExpanded ? ' expanded' : ''}`}
//                       onClick={() => setExpandedNotif(isExpanded ? null : notif._id)}
//                     >
//                       <td>
//                         <p className="nh-subject">
//                           {notif.subject || <span style={{ color: C.textMuted, fontStyle: 'italic' }}>No subject</span>}
//                         </p>
//                         <p className="nh-preview">{notif.message}</p>
//                       </td>
//                       <td>
//                         <div className="nh-time">{timeAgo(notif.createdAt)}</div>
//                         <div style={{ fontSize: '.68rem', color: C.textMuted, marginTop: '.1rem' }}>
//                           {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
//                         </div>
//                       </td>
//                       <td>
//                         <span style={{ fontSize: '.8rem', fontWeight: 600, color: C.text }}>{total}</span>
//                       </td>
//                       <td>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: C.textSub, marginBottom: '.25rem' }}>
//                           <span>{readCount}/{total} read</span>
//                           <span style={{ fontWeight: 700, color: barColor }}>{readPct}%</span>
//                         </div>
//                         <div className="nh-read-bar">
//                           <div className="nh-read-fill" style={{ width: `${readPct}%`, background: barColor }} />
//                         </div>
//                       </td>
//                       <td onClick={e => e.stopPropagation()}>
//                         <div className="nh-actions">
//                           <button className="nh-icon-btn" title={isExpanded ? 'Collapse' : 'Expand'}
//                             onClick={() => setExpandedNotif(isExpanded ? null : notif._id)}>
//                             <Iconify icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={14} />
//                           </button>
//                           <button className="nh-icon-btn del" title="Delete" onClick={() => deleteNotif(notif._id)}>
//                             <Iconify icon="mdi:trash-can-outline" width={13} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>

//                     {isExpanded && (
//                       <tr key={`${notif._id}-exp`} className="nh-expand-row">
//                         <td colSpan="5">
//                           <div className="nh-expand-body">
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                               <div>
//                                 <div style={{ fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
//                                   Full Message
//                                 </div>
//                                 <div className="nh-expand-msg">{notif.message}</div>
//                                 <div style={{ fontSize: '.72rem', color: C.textMuted }}>
//                                   {new Date(notif.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
//                                 </div>
//                               </div>
//                               <div>
//                                 <div style={{ fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
//                                   Recipients ({total})
//                                 </div>
//                                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
//                                   {notif.recipients?.map((r, i) => (
//                                     <span key={i} className="nh-rchip"
//                                       title={r.readAt ? `Read: ${new Date(r.readAt).toLocaleString('en-IN')}` : 'Not read yet'}>
//                                       <span className="nh-dot" style={{ background: r.readAt ? C.success : C.warn }} />
//                                       {r.name || 'Unknown'}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {totalPages > 1 && (
//           <div className="nh-pagination">
//             <span className="nh-page-info">
//               {((notifHistoryPage - 1) * NOTIF_HISTORY_LIMIT) + 1}–{Math.min(notifHistoryPage * NOTIF_HISTORY_LIMIT, notifHistoryTotal)} of {notifHistoryTotal}
//             </span>
//             <div className="nh-page-btns">
//               <button className="nh-page-btn" disabled={notifHistoryPage === 1} onClick={() => fetchNotifHistory(notifHistoryPage - 1)}>← Prev</button>
//               {[...Array(Math.min(totalPages, 5))].map((_, i) => (
//                 <button key={i + 1} className={`nh-page-btn${notifHistoryPage === i + 1 ? ' active' : ''}`} onClick={() => fetchNotifHistory(i + 1)}>
//                   {i + 1}
//                 </button>
//               ))}
//               <button className="nh-page-btn" disabled={notifHistoryPage === totalPages} onClick={() => fetchNotifHistory(notifHistoryPage + 1)}>Next →</button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ── Loading / Error states ─────────────────────────────────────────────────

//   if (loading) return (
//     <><style>{CSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//           <CircularProgress size={48} />
//         </div>
//       </Container>
//     </>
//   );

//   if (error) return (
//     <><style>{CSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
//       <Container maxWidth="xl" sx={{ py: 2 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           <strong>Error:</strong> {error}
//           <button onClick={fetchData} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
//         </Alert>
//       </Container>
//     </>
//   );

//   const statsData      = getStatsData();
//   const activeList     = activeTab === 'staff' ? staffList : freelancerList;
//   const staffKeys      = [...modalRecipients].filter(k => k.endsWith('::staff'));
//   const freelancerKeys = [...modalRecipients].filter(k => k.endsWith('::freelancer'));

//   // ── Render ─────────────────────────────────────────────────────────────────

//   return (
//     <>
//       <style>{CSS}</style>
//       <Helmet><title>Dashboard | Admin Panel</title></Helmet>

//       {/* Notification Modal */}
//       {notifModalOpen && (
//         <div className="scn-overlay" onClick={e => { if (e.target === e.currentTarget) closeNotifModal(); }}>
//           <div className="scn-modal">
//             <div className="scn-modal-header">
//               <div>
//                 <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: C.text }}>Send Notification</h2>
//                 <p style={{ margin: 0, fontSize: '.75rem', color: C.textSub }}>{modalRecipients.size} recipient{modalRecipients.size !== 1 ? 's' : ''}</p>
//               </div>
//               <button className="scn-close-btn" onClick={closeNotifModal}><Iconify icon="mdi:close" width={15} /></button>
//             </div>

//             <div className="scn-modal-body">
//               {notifSuccess && <div className="scn-banner success"><Iconify icon="mdi:check-circle" width={16} /> {notifSuccess}</div>}
//               {notifError   && <div className="scn-banner error"><Iconify icon="mdi:alert-circle" width={16} /> {notifError}</div>}

//               <span className="scn-label">To</span>
//               <div className="scn-recipients-box">
//                 {modalRecipients.size === 0 && <span style={{ fontSize: '.8rem', color: C.textMuted, alignSelf: 'center' }}>No recipients</span>}
//                 {staffKeys.length > 0 && (<>
//                   <span className="scn-section-label">Internal Staff</span>
//                   {staffKeys.map(key => {
//                     const { person } = getPersonFromKey(key);
//                     return (
//                       <div className="scn-chip" key={key}>
//                         <div className="scn-chip-avatar">{getInitial(person?.name)}</div>
//                         {person?.name || 'Unknown'}
//                         <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
//                       </div>
//                     );
//                   })}
//                 </>)}
//                 {freelancerKeys.length > 0 && (<>
//                   <span className="scn-section-label">Freelancers</span>
//                   {freelancerKeys.map(key => {
//                     const { person } = getPersonFromKey(key);
//                     return (
//                       <div className="scn-chip" key={key}>
//                         <div className="scn-chip-avatar freelancer">{getInitial(person?.name)}</div>
//                         {person?.name || 'Unknown'}
//                         <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
//                       </div>
//                     );
//                   })}
//                 </>)}
//               </div>

//               <span className="scn-label">Subject <span style={{ color: C.textMuted, fontWeight: 400 }}>(optional)</span></span>
//               <input type="text" className="scn-input" placeholder="e.g. Project Update…" value={notifSubject} onChange={e => setNotifSubject(e.target.value)} maxLength={120} />

//               <span className="scn-label">Message <span style={{ color: C.danger }}>*</span></span>
//               <textarea className="scn-input scn-textarea" placeholder="Type your message…" value={notifMessage} onChange={e => { setNotifMessage(e.target.value); setNotifError(''); }} maxLength={1000} />
//               <div className="scn-char">{notifMessage.length} / 1000</div>
//             </div>

//             <div className="scn-modal-footer">
//               <button className="scn-btn-cancel" onClick={closeNotifModal} disabled={notifSending}>Cancel</button>
//               <button className="scn-btn-send" onClick={handleSendNotification} disabled={notifSending || !modalRecipients.size || !notifMessage.trim()}>
//                 {notifSending
//                   ? <><Iconify icon="mdi:loading" width={16} className="spin" /> Sending…</>
//                   : <><Iconify icon="mdi:send" width={16} /> Send to {modalRecipients.size}</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Container maxWidth="xl" sx={{ py: 0 }}>
//         {/* Header */}
//         <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${C.border}` }}>
//           <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: C.text, margin: 0 }}>{getGreeting()}, Admin</h1>
//           <div style={{ display: 'flex', gap: '1rem', marginTop: '.5rem', fontSize: '.875rem', color: C.textSub }}>
//             <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
//             <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
//           </div>
//         </div>

//         {/* Stats */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {statsData.map((s, i) => (
//             <Grid item xs={6} sm={4} md={3} key={i}>
//               <div className="dc-card stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && navigate(s.path)}>
//                 <div className="stat-icon"><Iconify icon={s.icon} width={20} /></div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <p className="stat-title">{s.title}</p>
//                   <h3 className="stat-value">{s.total}</h3>
//                 </div>
//                 <Iconify icon="mdi:arrow-right" width={15} className="stat-arrow" />
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Analytics filter */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.75rem', margin: '1.5rem 0 1rem' }}>
//           <SectionTitle icon="mdi:chart-line">Purchasing Analytics</SectionTitle>
//           <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
//             {['15days', 'month'].map(p => (
//               <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
//                 style={{ padding: '.4rem .875rem', background: filterPeriod === p && !startDate && !endDate ? C.primary : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : C.textSub, border: `1px solid ${C.border}`, borderRadius: '6px', cursor: 'pointer', fontSize: '.875rem', fontWeight: 500 }}>
//                 {p === '15days' ? '15 Days' : '1 Month'}
//               </button>
//             ))}
//             <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
//               <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
//               <span style={{ color: C.textSub, fontSize: '.875rem' }}>to</span>
//               <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
//               {startDate && endDate && (
//                 <button onClick={handleClearDates} style={{ padding: '.4rem .75rem', background: 'white', border: `1px solid ${C.border}`, borderRadius: '6px', cursor: 'pointer', fontSize: '.78rem', color: C.textSub }}>Clear</button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Summary */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           {[
//             { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                   icon: 'mdi:cart-check'    },
//             { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                   icon: 'mdi:cash-refund'   },
//             { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`,  icon: 'mdi:cash-multiple' },
//             { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,                icon: 'mdi:percent'       },
//           ].map((c, i) => (
//             <Grid item xs={6} sm={3} key={i}>
//               <div className="dc-card stat-card" style={{ cursor: 'default' }}>
//                 <div className="stat-icon"><Iconify icon={c.icon} width={20} /></div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <p className="stat-title">{c.title}</p>
//                   <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>{c.value}</h3>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Chart + Countries */}
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={8}>
//             <div className="dc-card">
//               <h3 style={{ margin: '0 0 .25rem', fontSize: '1rem', fontWeight: 700, color: C.text }}>Purchasing Report</h3>
//               <p style={{ margin: '0 0 1.5rem', fontSize: '.875rem', color: C.textSub }}>
//                 Bought: {analyticsData?.summary?.totalServicesBought || 0} · Refunded: {analyticsData?.summary?.totalRefunds || 0} · Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
//               </p>
//               <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
//                 <div style={{ display: 'flex', gap: '6px', minWidth: '900px', height: '320px', alignItems: 'flex-end', borderBottom: `2px solid ${C.border}`, paddingBottom: '10px', paddingTop: '50px' }}>
//                   {analyticsData?.chartLabels?.map((label, i) => {
//                     const bought  = analyticsData.chartData.servicesBought[i] || 0;
//                     const refunds = analyticsData.chartData.refunds[i]         || 0;
//                     const bAmt    = analyticsData.chartData.revenue[i]         || 0;
//                     const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
//                     const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
//                     const bH = (bought / mx) * 220, rH = (refunds / mx) * 220;
//                     return (
//                       <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
//                         <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 220 }}>
//                           <div style={{ width: 18, height: `${bH}px`, background: C.primary, borderRadius: '3px 3px 0 0', position: 'relative' }}>
//                             {bought > 0 && (<>
//                               <div style={{ position: 'absolute', top: -42, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: C.primary, whiteSpace: 'nowrap' }}>{bought}</div>
//                               <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 600, color: C.success, whiteSpace: 'nowrap' }}>₹{bAmt}</div>
//                             </>)}
//                           </div>
//                           <div style={{ width: 18, height: `${rH}px`, background: C.danger, borderRadius: '3px 3px 0 0', position: 'relative' }}>
//                             {refunds > 0 && (<>
//                               <div style={{ position: 'absolute', top: -42, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: C.danger, whiteSpace: 'nowrap' }}>{refunds}</div>
//                               <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 600, color: C.warn, whiteSpace: 'nowrap' }}>₹{rAmt}</div>
//                             </>)}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: 11, whiteSpace: 'nowrap', color: C.textSub }}>{label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: 14, height: 14, background: C.primary, borderRadius: 3 }} /><span style={{ color: C.textSub }}>Bought</span>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
//                     <div style={{ width: 14, height: 14, background: C.danger, borderRadius: 3 }} /><span style={{ color: C.textSub }}>Refunds</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <div className="dc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: C.text }}>Countries</h3>
//                 <span style={{ fontSize: '.75rem', color: C.textMuted }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryTab} onChange={setCountryTab} domesticCount={domesticCountries.length} intlCount={intlCountries.length} />
//               <div style={{ flex: 1, overflowY: 'auto' }}>{renderCountryBars(activeCountries)}</div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Staff & Freelancers */}
//         <SectionTitle icon="mdi:star">Staff &amp; Freelancers</SectionTitle>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12}>
//             <div className="dc-card">
//               <div className="dc-tabs">
//                 <button className={`dc-tab${activeTab === 'staff'      ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
//                   <Iconify icon="mdi:account-tie" width={15} /> Internal Staff <span className="tab-count">{staffList.length}</span>
//                 </button>
//                 <button className={`dc-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
//                   <Iconify icon="mdi:briefcase-account" width={15} /> Freelancers <span className="tab-count">{freelancerList.length}</span>
//                 </button>
//                 {selectedPeople.size > 0 && (
//                   <button className="scn-send-fab" style={{ marginLeft: 'auto' }} onClick={openNotifModal}>
//                     <Iconify icon="mdi:bell-ring" width={15} />
//                     Send Notification
//                     <Tag color="white" bg="rgba(255,255,255,.2)">{selectedPeople.size}</Tag>
//                   </button>
//                 )}
//               </div>
//               <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
//                 {renderPeopleList(activeList, activeTab)}
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Service Performance */}
//         <SectionTitle icon="mdi:trending-up">Service Performance &amp; Geography</SectionTitle>
//         <Grid container spacing={1.5} sx={{ mb: 2 }}>
//           <Grid item xs={12} md={6}>
//             <div className="dc-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
//               <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: C.text }}>Top Services</h3>
//               <div style={{ flex: 1, overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: C.bg, borderBottom: `2px solid ${C.border}` }}>
//                     <tr>
//                       {['Service', 'Bought', 'Refunds', 'Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i === 0 ? 'left' : i === 3 ? 'right' : 'center', fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {analyticsData?.serviceStats?.length > 0
//                       ? analyticsData.serviceStats.map((s, i) => (
//                         <tr key={i} style={{ borderBottom: `1px solid ${C.bg}` }}>
//                           <td style={{ padding: '.7rem .5rem', color: C.text, fontWeight: 500 }}>{s.label}</td>
//                           <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{s.value}</Tag></td>
//                           <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{s.refunds}</Tag></td>
//                           <td style={{ padding: '.7rem .5rem', textAlign: 'right', fontWeight: 700, color: C.success }}>₹{s.revenue.toLocaleString()}</td>
//                         </tr>
//                       ))
//                       : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: C.textMuted }}>No service data</td></tr>
//                     }
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <div className="dc-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
//                 <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: C.text }}>Country Revenue</h3>
//                 <span style={{ fontSize: '.75rem', color: C.textMuted }}>{allCountries.length} countries</span>
//               </div>
//               <CountryTabButtons value={countryRevenueTab} onChange={setCountryRevenueTab} domesticCount={domesticCountries.length} intlCount={intlCountries.length} />
//               <div style={{ flex: 1, overflowY: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ position: 'sticky', top: 0, background: C.bg, borderBottom: `2px solid ${C.border}` }}>
//                     <tr>
//                       {['Country', '%', 'Purchases', 'Revenue'].map((h, i) => (
//                         <th key={h} style={{ padding: '.5rem', textAlign: i === 0 ? 'left' : i === 3 ? 'right' : 'center', fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase' }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>{renderCountryTable(activeRevenueCountries)}</tbody>
//                 </table>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         {/* Notification History */}
//         <SectionTitle icon="mdi:bell-check">Notification History</SectionTitle>
//         <Grid container spacing={1.5} sx={{ mb: 4 }}>
//           <Grid item xs={12}>{renderNotifHistory()}</Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// }










import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, CircularProgress, Alert } from '@mui/material';
import Iconify from '../components/iconify';
import axios from 'axios';
import { Url } from 'src/url/url';

// ─── Constants ────────────────────────────────────────────────────────────────
const DOMESTIC_COUNTRIES  = ['india', 'in'];
const NOTIF_HISTORY_LIMIT = 10;

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  primary:   '#2563eb',
  success:   '#16a34a',
  danger:    '#dc2626',
  warn:      '#d97706',
  text:      '#111827',
  textSub:   '#6b7280',
  textMuted: '#9ca3af',
  border:    '#e5e7eb',
  bg:        '#f9fafb',
  white:     '#ffffff',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isDomestic = (label = '') => DOMESTIC_COUNTRIES.includes(label.trim().toLowerCase());
const parseKey   = (key)        => { const [id, type] = key.split('::'); return { id, type }; };
const makeKey    = (p, type)    => `${p.id || p._id}::${type}`;
const getInitial = (name)       => (name || 'U').charAt(0).toUpperCase();
const sortByRating = (a, b)     => (b.rating || 0) - (a.rating || 0) || (b.totalRatings || 0) - (a.totalRatings || 0);

const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)     return `${diff}s ago`;
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  *::-webkit-scrollbar { width: 5px; height: 5px }
  *::-webkit-scrollbar-track { background: ${C.bg} }
  *::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 8px }
  .dc-card { background: ${C.white}; border: 1px solid ${C.border}; border-radius: 10px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,.04); }
  .stat-card { display:flex; align-items:center; gap:.875rem; cursor:pointer; transition:box-shadow .2s,transform .2s; height:100%; }
  .stat-card:hover { box-shadow:0 4px 14px rgba(0,0,0,.08); transform:translateY(-1px); }
  .stat-icon { width:38px; height:38px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:${C.bg}; color:${C.primary}; }
  .stat-title { font-size:.72rem; color:${C.textSub}; font-weight:500; margin:0 0 .2rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .stat-value { font-size:1.4rem; font-weight:700; color:${C.text}; margin:0; line-height:1; }
  .stat-arrow { opacity:0; transform:translateX(-4px); transition:all .2s; color:${C.primary}; flex-shrink:0; }
  .stat-card:hover .stat-arrow { opacity:1; transform:translateX(0); }
  .dc-tabs { display:flex; border-bottom:2px solid ${C.border}; margin-bottom:1.25rem; }
  .dc-tab { padding:.6rem 1.2rem; background:transparent; border:none; border-bottom:2px solid transparent; cursor:pointer; font-size:.875rem; font-weight:600; color:${C.textSub}; transition:all .15s; margin-bottom:-2px; display:flex; align-items:center; gap:.4rem; }
  .dc-tab.active { color:${C.primary}; border-bottom-color:${C.primary}; }
  .dc-tab:hover:not(.active) { color:${C.text}; background:${C.bg}; border-radius:6px 6px 0 0; }
  .tab-count { background:${C.bg}; color:${C.textSub}; font-size:.68rem; font-weight:700; padding:1px 7px; border-radius:20px; }
  .dc-tab.active .tab-count { background:#dbeafe; color:${C.primary}; }
  .ctry-tabs { display:flex; gap:.5rem; margin-bottom:.875rem; }
  .ctry-tab { flex:1; padding:.4rem .75rem; background:${C.bg}; border:1.5px solid ${C.border}; border-radius:8px; cursor:pointer; font-size:.78rem; font-weight:600; color:${C.textSub}; transition:all .15s; text-align:center; }
  .ctry-tab.active { background:#eff6ff; border-color:${C.primary}; color:${C.primary}; }
  .ctry-tab:hover:not(.active) { background:${C.border}; }
  .staff-card { background:${C.white}; border:1px solid ${C.border}; border-radius:10px; padding:.875rem 1rem; display:flex; align-items:center; gap:.75rem; transition:box-shadow .15s,border-color .15s; margin-bottom:.5rem; }
  .staff-card:hover { box-shadow:0 2px 8px rgba(0,0,0,.07); border-color:#cbd5e1; }
  .staff-card.selected { border-color:${C.primary}; background:#f0f7ff; }
  .staff-rank { background:${C.bg}; color:${C.textSub}; font-weight:700; font-size:.78rem; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .staff-rank.top1 { background:#fef3c7; color:#92400e; }
  .staff-rank.top3 { background:#fef3c7; color:#92400e; opacity:.7; }
  .staff-avatar { width:40px; height:40px; border-radius:50%; background:${C.primary}; color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1rem; flex-shrink:0; }
  .staff-avatar.fl { background:${C.textSub}; }
  .staff-info { flex:1; min-width:0; }
  .staff-name { font-weight:600; color:${C.text}; font-size:.9rem; margin:0 0 .15rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .staff-role { font-size:.72rem; color:${C.textSub}; margin:0; text-transform:capitalize; }
  .staff-email { font-size:.68rem; color:${C.textMuted}; margin:.1rem 0 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .no-rating { font-size:.72rem; color:${C.textMuted}; }
  .scn-select-bar { display:flex; align-items:center; gap:.75rem; padding:.5rem .875rem; background:${C.bg}; border-radius:8px; margin-bottom:.75rem; border:1px solid ${C.border}; }
  .scn-sel-count { margin-left:auto; font-size:.72rem; background:#dbeafe; color:${C.primary}; padding:2px 8px; border-radius:4px; font-weight:600; }
  .scn-cb-wrap { position:relative; cursor:pointer; flex-shrink:0; width:20px; height:20px; }
  .scn-cb-wrap input[type=checkbox] { position:absolute; opacity:0; width:0; height:0; pointer-events:none; }
  .scn-cb-box { width:20px; height:20px; border:2px solid ${C.border}; border-radius:5px; display:flex; align-items:center; justify-content:center; transition:all .15s; background:white; cursor:pointer; }
  .scn-cb-wrap input:checked ~ .scn-cb-box { background:${C.primary}; border-color:${C.primary}; }
  .scn-cb-box svg { opacity:0; transform:scale(.5); transition:all .15s; }
  .scn-cb-wrap input:checked ~ .scn-cb-box svg { opacity:1; transform:scale(1); }
  .scn-send-fab { display:flex; align-items:center; gap:.5rem; padding:.5rem 1rem; background:${C.primary}; color:white; border:none; border-radius:8px; cursor:pointer; font-size:.8rem; font-weight:600; transition:opacity .15s; white-space:nowrap; }
  .scn-send-fab:hover { opacity:.88; }
  .scn-overlay { position:fixed; inset:0; background:rgba(0,0,0,.4); backdrop-filter:blur(3px); z-index:1400; display:flex; align-items:center; justify-content:center; padding:1rem; }
  .scn-modal { background:white; border-radius:12px; width:100%; max-width:560px; box-shadow:0 20px 50px rgba(0,0,0,.18); display:flex; flex-direction:column; max-height:92vh; overflow:hidden; }
  .scn-modal-header { padding:1.25rem 1.5rem; border-bottom:1px solid ${C.border}; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
  .scn-modal-body { padding:1.25rem 1.5rem; overflow-y:auto; flex:1; }
  .scn-modal-footer { padding:1rem 1.5rem; border-top:1px solid ${C.border}; display:flex; justify-content:flex-end; gap:.75rem; flex-shrink:0; background:${C.bg}; }
  .scn-close-btn { width:30px; height:30px; border-radius:6px; border:1px solid ${C.border}; background:white; display:flex; align-items:center; justify-content:center; cursor:pointer; color:${C.textSub}; transition:background .15s; padding:0; }
  .scn-close-btn:hover { background:${C.bg}; }
  .scn-label { font-size:.78rem; font-weight:700; color:${C.text}; margin-bottom:.375rem; display:block; }
  .scn-recipients-box { display:flex; flex-wrap:wrap; gap:.4rem; padding:.625rem; border:1.5px solid ${C.border}; border-radius:8px; background:${C.bg}; min-height:44px; margin-bottom:1rem; }
  .scn-chip { display:flex; align-items:center; gap:.35rem; padding:.2rem .55rem .2rem .3rem; background:white; border:1px solid ${C.border}; border-radius:20px; font-size:.78rem; font-weight:600; color:${C.text}; }
  .scn-chip-avatar { width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.62rem; font-weight:700; color:white; flex-shrink:0; background:${C.primary}; }
  .scn-chip-avatar.freelancer { background:${C.textSub}; }
  .scn-chip-remove { width:15px; height:15px; border-radius:50%; background:${C.bg}; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:${C.textSub}; padding:0; }
  .scn-chip-remove:hover { background:#fee2e2; color:${C.danger}; }
  .scn-section-label { width:100%; font-size:.68rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:${C.textMuted}; margin:.3rem 0 .2rem .1rem; }
  .scn-input { width:100%; padding:.6rem .875rem; border:1.5px solid ${C.border}; border-radius:8px; font-size:.875rem; color:${C.text}; font-family:inherit; transition:border .15s; background:white; box-sizing:border-box; margin-bottom:.875rem; }
  .scn-input:focus { outline:none; border-color:${C.primary}; }
  .scn-textarea { resize:vertical; min-height:110px; line-height:1.6; }
  .scn-char { font-size:.72rem; color:${C.textMuted}; text-align:right; margin-bottom:.5rem; margin-top:-.5rem; }
  .scn-banner { display:flex; align-items:center; gap:.5rem; padding:.65rem .875rem; border-radius:8px; font-size:.85rem; font-weight:500; margin-bottom:.875rem; }
  .scn-banner.success { background:#f0fdf4; border:1px solid #bbf7d0; color:${C.success}; }
  .scn-banner.error   { background:#fef2f2; border:1px solid #fecaca; color:${C.danger}; }
  .scn-btn-cancel { padding:.6rem 1.25rem; background:white; border:1.5px solid ${C.border}; border-radius:8px; font-size:.875rem; font-weight:600; color:${C.textSub}; cursor:pointer; }
  .scn-btn-cancel:hover { background:${C.bg}; }
  .scn-btn-send { display:flex; align-items:center; gap:.5rem; padding:.6rem 1.5rem; background:${C.primary}; color:white; border:none; border-radius:8px; font-size:.875rem; font-weight:600; cursor:pointer; transition:opacity .15s; }
  .scn-btn-send:hover:not(:disabled) { opacity:.88; }
  .scn-btn-send:disabled { opacity:.45; cursor:not-allowed; }
  @keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
  .spin { animation:spin 1s linear infinite; display:inline-block; }
  .nh-wrap { background:white; border-radius:10px; border:1px solid ${C.border}; overflow:hidden; }
  .nh-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.25rem; border-bottom:1px solid ${C.border}; background:${C.bg}; }
  .nh-title { font-size:.9rem; font-weight:700; color:${C.text}; display:flex; align-items:center; gap:.5rem; }
  .nh-refresh-btn { display:flex; align-items:center; gap:.35rem; padding:.35rem .75rem; background:white; border:1px solid ${C.border}; border-radius:6px; cursor:pointer; font-size:.75rem; font-weight:600; color:${C.textSub}; }
  .nh-refresh-btn:hover { background:${C.bg}; }
  .nh-scroll { overflow-x:auto; max-height:480px; }
  .nh-table { width:100%; border-collapse:collapse; min-width:700px; }
  .nh-table thead th { position:sticky; top:0; z-index:2; padding:.6rem 1rem; background:${C.bg}; text-align:left; font-size:.72rem; font-weight:700; color:${C.textSub}; text-transform:uppercase; letter-spacing:.04em; border-bottom:2px solid ${C.border}; white-space:nowrap; }
  .nh-row { border-bottom:1px solid ${C.bg}; transition:background .12s; cursor:pointer; }
  .nh-row:hover { background:${C.bg}; }
  .nh-row.expanded { background:#f0f7ff; }
  .nh-row td { padding:.75rem 1rem; vertical-align:top; }
  .nh-subject { font-weight:600; color:${C.text}; font-size:.875rem; margin:0 0 .2rem; }
  .nh-preview { color:${C.textSub}; font-size:.78rem; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:260px; }
  .nh-time { color:${C.textMuted}; font-size:.75rem; }
  .nh-read-bar { height:5px; background:${C.border}; border-radius:3px; overflow:hidden; margin:.3rem 0 .2rem; }
  .nh-read-fill { height:100%; border-radius:3px; transition:width .3s; }
  .nh-actions { display:flex; align-items:center; justify-content:center; gap:.4rem; }
  .nh-icon-btn { width:28px; height:28px; border-radius:6px; border:1px solid ${C.border}; background:white; display:flex; align-items:center; justify-content:center; cursor:pointer; color:${C.textSub}; padding:0; transition:all .12s; }
  .nh-icon-btn:hover { background:${C.bg}; }
  .nh-icon-btn.del:hover { background:#fef2f2; border-color:#fecaca; color:${C.danger}; }
  .nh-expand-row td { padding:0; }
  .nh-expand-body { background:#f8faff; padding:1rem 1.25rem 1.25rem; border-top:1px solid #dbeafe; animation:fadeIn .15s ease; }
  .nh-expand-msg { background:white; border:1px solid ${C.border}; border-radius:8px; padding:.875rem 1rem; font-size:.875rem; color:${C.text}; line-height:1.6; margin-bottom:1rem; white-space:pre-wrap; }
  .nh-rchip { display:inline-flex; align-items:center; gap:.3rem; padding:.2rem .6rem; border-radius:20px; font-size:.75rem; font-weight:600; border:1px solid ${C.border}; color:${C.textSub}; background:white; }
  .nh-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .nh-pagination { display:flex; align-items:center; justify-content:space-between; padding:.875rem 1.25rem; border-top:1px solid ${C.border}; background:${C.bg}; }
  .nh-page-info { font-size:.78rem; color:${C.textSub}; }
  .nh-page-btns { display:flex; gap:.35rem; }
  .nh-page-btn { padding:.35rem .75rem; border:1px solid ${C.border}; background:white; border-radius:6px; font-size:.78rem; font-weight:600; color:${C.textSub}; cursor:pointer; }
  .nh-page-btn:hover:not(:disabled) { background:${C.bg}; }
  .nh-page-btn:disabled { opacity:.4; cursor:not-allowed; }
  .nh-page-btn.active { background:${C.primary}; border-color:${C.primary}; color:white; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:translateY(0) } }
  .date-input { padding:.45rem .75rem; border:1px solid ${C.border}; border-radius:6px; font-size:.875rem; color:${C.text}; background:white; cursor:pointer; }
  .date-input:focus { outline:none; border-color:${C.primary}; }
`;

// ─── Small reusable components ────────────────────────────────────────────────
const CheckSVG = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Tag = ({ children, color = C.textSub, bg = C.bg }) => (
  <span style={{ background: bg, color, fontSize: '.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}>
    {children}
  </span>
);

const SectionTitle = ({ icon, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', margin: '1.5rem 0 1rem', fontSize: '1rem', fontWeight: 700, color: C.text }}>
    <Iconify icon={icon} width={18} style={{ color: C.textSub }} />
    {children}
  </div>
);

const CountryTabButtons = ({ value, onChange, domesticCount, intlCount }) => (
  <div className="ctry-tabs">
    <button className={`ctry-tab${value === 'domestic' ? ' active' : ''}`} onClick={() => onChange('domestic')}>
      🇮🇳 Domestic ({domesticCount})
    </button>
    <button className={`ctry-tab${value === 'international' ? ' active' : ''}`} onClick={() => onChange('international')}>
      🌍 International ({intlCount})
    </button>
  </div>
);

// ─── Notification Row (extracted to fix key warning) ─────────────────────────
// 🔑 KEY FIX: Using React.Fragment with explicit key instead of <> shorthand
const NotifRow = ({ notif, isExpanded, onToggle, onDelete, currency }) => {
  const readCount = notif.recipients?.filter(r => r.readAt)?.length || 0;
  const total     = notif.recipients?.length || notif.totalRecipients || 0;
  const readPct   = total > 0 ? Math.round((readCount / total) * 100) : 0;
  const barColor  = readPct === 100 ? C.success : readPct > 0 ? C.warn : C.border;

  return (
    // ✅ React.Fragment with key — this is the CORRECT way to key fragment pairs
    <Fragment key={notif._id}>
      <tr
        className={`nh-row${isExpanded ? ' expanded' : ''}`}
        onClick={() => onToggle(notif._id)}
      >
        <td>
          <p className="nh-subject">
            {notif.subject || <span style={{ color: C.textMuted, fontStyle: 'italic' }}>No subject</span>}
          </p>
          <p className="nh-preview">{notif.message}</p>
        </td>
        <td>
          <div className="nh-time">{timeAgo(notif.createdAt)}</div>
          <div style={{ fontSize: '.68rem', color: C.textMuted, marginTop: '.1rem' }}>
            {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </div>
        </td>
        <td>
          <span style={{ fontSize: '.8rem', fontWeight: 600, color: C.text }}>{total}</span>
        </td>
        <td>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: C.textSub, marginBottom: '.25rem' }}>
            <span>{readCount}/{total} read</span>
            <span style={{ fontWeight: 700, color: barColor }}>{readPct}%</span>
          </div>
          <div className="nh-read-bar">
            <div className="nh-read-fill" style={{ width: `${readPct}%`, background: barColor }} />
          </div>
        </td>
        <td onClick={e => e.stopPropagation()}>
          <div className="nh-actions">
            <button className="nh-icon-btn" title={isExpanded ? 'Collapse' : 'Expand'} onClick={() => onToggle(notif._id)}>
              <Iconify icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={14} />
            </button>
            <button className="nh-icon-btn del" title="Delete" onClick={() => onDelete(notif._id)}>
              <Iconify icon="mdi:trash-can-outline" width={13} />
            </button>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="nh-expand-row">
          <td colSpan="5">
            <div className="nh-expand-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
                    Full Message
                  </div>
                  <div className="nh-expand-msg">{notif.message}</div>
                  <div style={{ fontSize: '.72rem', color: C.textMuted }}>
                    {new Date(notif.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>
                    Recipients ({total})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                    {notif.recipients?.map((r, i) => (
                      <span key={`${notif._id}-recipient-${i}`} className="nh-rchip"
                        title={r.readAt ? `Read: ${new Date(r.readAt).toLocaleString('en-IN')}` : 'Not read yet'}>
                        <span className="nh-dot" style={{ background: r.readAt ? C.success : C.warn }} />
                        {r.name || 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

// ─── Custom Hooks ─────────────────────────────────────────────────────────────
const useDashboard = (filterPeriod, startDate, endDate) => {
  const [dashboardData,  setDashboardData]  = useState(null);
  const [analyticsData,  setAnalyticsData]  = useState(null);
  const [staffList,      setStaffList]      = useState([]);
  const [freelancerList, setFreelancerList] = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      let analyticsUrl = `${Url}/dashboardStaics/GetAnalytics`;
      if (startDate && endDate) {
        analyticsUrl += `?startDate=${startDate}&endDate=${endDate}`;
      } else if (filterPeriod === '15days') {
        const end = new Date(), start = new Date();
        start.setDate(start.getDate() - 14);
        analyticsUrl += `?startDate=${start.toISOString().split('T')[0]}&endDate=${end.toISOString().split('T')[0]}`;
      }

      const [statsRes, analyticsRes, topStaffRes] = await Promise.all([
        axios.get(`${Url}/dashboardStaics/GetCardsstats`),
        axios.get(analyticsUrl),
        axios.get(`${Url}/dashboardStaics/GetTopRatedStaff`),
      ]);

      if (statsRes.data.success)     setDashboardData(statsRes.data.data);
      if (analyticsRes.data.success) setAnalyticsData(analyticsRes.data.data);

      if (topStaffRes.data.success && topStaffRes.data.data) {
        const raw = topStaffRes.data.data;
        if (Array.isArray(raw)) {
          setStaffList(raw.filter(p => p.type === 'staff'       || p.source === 'Internal').sort(sortByRating));
          setFreelancerList(raw.filter(p => p.type === 'freelancer' || p.source === 'Freelancer').sort(sortByRating));
        } else {
          setStaffList((raw.staff        || []).sort(sortByRating));
          setFreelancerList((raw.freelancers || []).sort(sortByRating));
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [filterPeriod, startDate, endDate]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { dashboardData, analyticsData, staffList, freelancerList, loading, error, refetch: fetchData };
};

const useNotifHistory = () => {
  const [notifHistory,        setNotifHistory]        = useState([]);
  const [notifHistoryLoading, setNotifHistoryLoading] = useState(false);
  const [notifHistoryError,   setNotifHistoryError]   = useState(null);
  const [notifHistoryPage,    setNotifHistoryPage]    = useState(1);
  const [notifHistoryTotal,   setNotifHistoryTotal]   = useState(0);

  const fetchNotifHistory = useCallback(async (page = 1) => {
    setNotifHistoryLoading(true); setNotifHistoryError(null);
    try {
      const { data } = await axios.get(`${Url}/StaffcustomnotificationRoutes`, {
        params: { page, limit: NOTIF_HISTORY_LIMIT },
      });
      if (data.success) {
        setNotifHistory(data.data || []);
        setNotifHistoryTotal(data.pagination?.total || 0);
        setNotifHistoryPage(page);
      }
    } catch (err) {
      setNotifHistoryError(err.response?.data?.message || err.message);
    } finally {
      setNotifHistoryLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotifHistory(1); }, [fetchNotifHistory]);

  return { notifHistory, notifHistoryLoading, notifHistoryError, notifHistoryPage, notifHistoryTotal, fetchNotifHistory };
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardAppPage() {
  const navigate = useNavigate();

  // Clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const greeting = useMemo(() => {
    const h = currentTime.getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, [currentTime.getHours()]);

  // Filters
  const [filterPeriod, setFilterPeriod] = useState('month');
  const [startDate,    setStartDate]    = useState('');
  const [endDate,      setEndDate]      = useState('');

  // Tabs
  const [activeTab,         setActiveTab]         = useState('staff');
  const [countryTab,        setCountryTab]        = useState('domestic');
  const [countryRevenueTab, setCountryRevenueTab] = useState('domestic');
  const [expandedNotif,     setExpandedNotif]     = useState(null);

  // Notification compose
  const [selectedPeople, setSelectedPeople] = useState(new Set());
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [modalRecipients, setModalRecipients] = useState(new Set());
  const [notifSubject,   setNotifSubject]   = useState('');
  const [notifMessage,   setNotifMessage]   = useState('');
  const [notifSending,   setNotifSending]   = useState(false);
  const [notifSuccess,   setNotifSuccess]   = useState('');
  const [notifError,     setNotifError]     = useState('');

  // Data hooks
  const { dashboardData, analyticsData, staffList, freelancerList, loading, error, refetch } =
    useDashboard(filterPeriod, startDate, endDate);
  const { notifHistory, notifHistoryLoading, notifHistoryError, notifHistoryPage, notifHistoryTotal, fetchNotifHistory } =
    useNotifHistory();

  // ── Derived data ─────────────────────────────────────────────────────────
  const statsData = useMemo(() => {
    if (!dashboardData) return [];
    const { projects, services, staff, freelancers, categories } = dashboardData;
    return [
      { title: 'New Projects',     total: projects?.new       || 0, icon: 'mdi:rocket-launch',     path: '/dashboard/new-project' },
      { title: 'Running Projects', total: projects?.running   || 0, icon: 'mdi:lightning-bolt',    path: '/dashboard/running-project' },
      { title: 'Completed',        total: projects?.completed || 0, icon: 'mdi:check-circle',      path: '/dashboard/complete-project' },
      { title: 'Total Projects',   total: projects?.total     || 0, icon: 'mdi:briefcase',         path: '/dashboard/new-project' },
      { title: 'Services',         total: services            || 0, icon: 'mdi:grid',              path: '/dashboard/service' },
      { title: 'Total Staff',      total: staff?.total        || 0, icon: 'mdi:account-group',     path: '/dashboard/staff' },
      { title: 'Inhouse Staff',    total: staff?.inhouse      || 0, icon: 'mdi:account-tie',       path: '/dashboard/staff' },
      { title: 'Freelancers',      total: freelancers         || 0, icon: 'mdi:briefcase-account', path: '/dashboard/Freelancers' },
      { title: 'Categories',       total: categories          || 0, icon: 'mdi:tag-multiple',      path: '/dashboard/category' },
    ];
  }, [dashboardData]);

  const allCountries           = analyticsData?.countryStats || [];
  const domesticCountries      = useMemo(() => allCountries.filter(c =>  isDomestic(c.label)), [allCountries]);
  const intlCountries          = useMemo(() => allCountries.filter(c => !isDomestic(c.label)), [allCountries]);
  const activeCountries        = countryTab        === 'domestic' ? domesticCountries : intlCountries;
  const activeRevenueCountries = countryRevenueTab === 'domestic' ? domesticCountries : intlCountries;

  // ── Notification actions ──────────────────────────────────────────────────
  const deleteNotif = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try {
      await axios.delete(`${Url}/StaffcustomnotificationRoutes/${id}`);
      fetchNotifHistory(notifHistoryPage);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const toggleSelect = useCallback((person, type) => {
    const key = makeKey(person, type);
    setSelectedPeople(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((list, type) => {
    const keys   = list.map(p => makeKey(p, type));
    const allSel = keys.every(k => selectedPeople.has(k));
    setSelectedPeople(prev => {
      const next = new Set(prev);
      if (allSel) keys.forEach(k => next.delete(k));
      else        keys.forEach(k => next.add(k));
      return next;
    });
  }, [selectedPeople]);

  const removeModalRecipient = (key) =>
    setModalRecipients(prev => { const n = new Set(prev); n.delete(key); return n; });

  const getPersonFromKey = useCallback((key) => {
    const { id, type } = parseKey(key);
    const list = type === 'staff' ? staffList : freelancerList;
    return { person: list.find(p => String(p.id || p._id) === String(id)), type };
  }, [staffList, freelancerList]);

  const openNotifModal = () => {
    setModalRecipients(new Set(selectedPeople));
    setNotifSubject(''); setNotifMessage('');
    setNotifSuccess(''); setNotifError('');
    setNotifModalOpen(true);
  };

  const handleSendNotification = async () => {
    if (!notifMessage.trim())  { setNotifError('Message cannot be empty.');  return; }
    if (!modalRecipients.size) { setNotifError('No recipients selected.'); return; }

    let sentBy = null;
    try {
      const adminRaw = localStorage.getItem('admin');
      if (adminRaw) { const o = JSON.parse(adminRaw); sentBy = o?._id || o?.id || null; }
    } catch { sentBy = null; }
    if (!sentBy) { setNotifError('Admin session not found. Please login again.'); return; }

    setNotifError(''); setNotifSending(true);
    try {
      const { data } = await axios.post(`${Url}/StaffcustomnotificationRoutes/send`, {
        subject: notifSubject,
        message: notifMessage,
        recipients: [...modalRecipients].map(k => parseKey(k)),
        sentBy,
      });
      if (data.success) {
        setNotifSuccess(`✓ Sent to ${data.data.totalRecipients} recipient(s)!`);
        setTimeout(() => { setSelectedPeople(new Set()); setNotifModalOpen(false); fetchNotifHistory(1); }, 1600);
      } else {
        setNotifError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setNotifError(err.response?.data?.message || err.message);
    } finally { setNotifSending(false); }
  };

  // ── Date filters ──────────────────────────────────────────────────────────
  const handleStartDateChange = (e) => {
    const v = e.target.value;
    if (endDate && v > endDate) { alert('Start date cannot be after end date'); return; }
    setStartDate(v); setFilterPeriod('custom');
  };
  const handleEndDateChange = (e) => {
    const v = e.target.value;
    if (startDate && v < startDate) { alert('End date cannot be before start date'); return; }
    setEndDate(v); setFilterPeriod('custom');
  };
  const handleClearDates = () => { setStartDate(''); setEndDate(''); setFilterPeriod('month'); };

  // ── Render helpers ────────────────────────────────────────────────────────
  const renderCountryBars = (list) => {
    if (!list?.length) return (
      <div style={{ padding: '2rem', textAlign: 'center', color: C.textMuted, fontSize: '.875rem' }}>No data available</div>
    );
    return list.map((c, i) => (
      <div key={`country-bar-${i}`} style={{ marginBottom: '.875rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
          <span style={{ fontSize: '.875rem', color: C.text, fontWeight: 600 }}>{c.label}</span>
          <span style={{ fontSize: '.8rem', fontWeight: 700, color: C.text }}>{c.percentage}%</span>
        </div>
        <div style={{ width: '100%', height: 8, background: C.border, borderRadius: 4, overflow: 'hidden', marginBottom: '.3rem' }}>
          <div style={{ width: `${c.percentage}%`, height: '100%', background: C.primary, borderRadius: 4, transition: 'width .4s ease' }} />
        </div>
        <div style={{ fontSize: '.72rem', color: C.textSub, display: 'flex', justifyContent: 'space-between' }}>
          <span>{c.value} purchases</span>
          <span style={{ fontWeight: 600, color: C.success }}>₹{c.revenue.toLocaleString()}</span>
        </div>
      </div>
    ));
  };

  const renderCountryTable = (list) => {
    if (!list?.length) return (
      <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: C.textMuted }}>No data available</td></tr>
    );
    return list.map((c, i) => (
      <tr key={`country-row-${i}`} style={{ borderBottom: `1px solid ${C.bg}` }}>
        <td style={{ padding: '.7rem .5rem', color: C.text, fontWeight: 500 }}>{c.label}</td>
        <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{c.percentage}%</Tag></td>
        <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{c.value}</Tag></td>
        <td style={{ padding: '.7rem .5rem', textAlign: 'right', fontWeight: 700, color: C.success }}>₹{c.revenue.toLocaleString()}</td>
      </tr>
    ));
  };

  const renderPeopleList = (list, type) => {
    const isFL    = type === 'freelancer';
    if (!list?.length) return (
      <div style={{ padding: '3rem', textAlign: 'center', color: C.textMuted, fontSize: '.875rem' }}>
        No {isFL ? 'freelancers' : 'staff'} found
      </div>
    );
    const allKeys  = list.map(p => makeKey(p, type));
    const allSel   = allKeys.every(k => selectedPeople.has(k));
    const someSel  = allKeys.some(k =>  selectedPeople.has(k));
    const selCount = allKeys.filter(k => selectedPeople.has(k)).length;

    return (
      <>
        <div className="scn-select-bar">
          <label className="scn-cb-wrap">
            <input
              type="checkbox"
              checked={allSel}
              ref={el => { if (el) el.indeterminate = someSel && !allSel; }}
              onChange={() => toggleSelectAll(list, type)}
            />
            <div className="scn-cb-box"><CheckSVG /></div>
          </label>
          <span style={{ fontSize: '.82rem', color: C.textSub, fontWeight: 600 }}>Select All</span>
          {someSel && <span className="scn-sel-count">{selCount} selected</span>}
        </div>

        {list.map((person, index) => {
          const key    = makeKey(person, type);
          const isSel  = selectedPeople.has(key);
          const rankCls = index === 0 ? 'top1' : index === 2 ? 'top3' : '';

          return (
            <div key={String(person.id || person._id || index)} className={`staff-card${isSel ? ' selected' : ''}`}>
              <label className="scn-cb-wrap" onClick={e => e.stopPropagation()}>
                <input type="checkbox" checked={isSel} onChange={() => toggleSelect(person, type)} />
                <div className="scn-cb-box"><CheckSVG /></div>
              </label>
              <div className={`staff-rank${rankCls ? ` ${rankCls}` : ''}`}>#{index + 1}</div>
              <div className={`staff-avatar${isFL ? ' fl' : ''}`}>{getInitial(person.name)}</div>
              <div className="staff-info">
                <h4 className="staff-name">{person.name || 'Unknown'}</h4>
                <p className="staff-role">{person.role || (isFL ? 'Freelancer' : 'Staff')}</p>
                {person.email && person.email !== 'N/A' && <p className="staff-email">{person.email}</p>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', flexShrink: 0 }}>
                {person.rating > 0 ? (
                  <>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <Iconify key={i}
                          icon={i < Math.floor(person.rating) ? 'mdi:star' : i < person.rating ? 'mdi:star-half-full' : 'mdi:star-outline'}
                          width={14}
                          style={{ color: '#f59e0b' }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '.8rem', fontWeight: 700, color: C.text }}>{person.rating?.toFixed(1)}</span>
                    <Tag>{person.totalRatings} {person.totalRatings === 1 ? 'review' : 'reviews'}</Tag>
                  </>
                ) : <span className="no-rating">No rating</span>}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  // ── Loading / Error ───────────────────────────────────────────────────────
  if (loading) return (
    <><style>{CSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress size={48} />
        </div>
      </Container>
    </>
  );

  if (error) return (
    <><style>{CSS}</style><Helmet><title>Dashboard | Admin Panel</title></Helmet>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Error:</strong> {error}
          <button onClick={refetch} style={{ marginLeft: '1rem', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}>Retry</button>
        </Alert>
      </Container>
    </>
  );

  const activeList     = activeTab === 'staff' ? staffList : freelancerList;
  const staffKeys      = [...modalRecipients].filter(k => k.endsWith('::staff'));
  const freelancerKeys = [...modalRecipients].filter(k => k.endsWith('::freelancer'));
  const totalPages     = Math.ceil(notifHistoryTotal / NOTIF_HISTORY_LIMIT);

  return (
    <>
      <style>{CSS}</style>
      <Helmet><title>Dashboard | Admin Panel</title></Helmet>

      {/* ── Notification Modal ── */}
      {notifModalOpen && (
        <div className="scn-overlay" onClick={e => { if (e.target === e.currentTarget) setNotifModalOpen(false); }}>
          <div className="scn-modal">
            <div className="scn-modal-header">
              <div>
                <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: C.text }}>Send Notification</h2>
                <p style={{ margin: 0, fontSize: '.75rem', color: C.textSub }}>{modalRecipients.size} recipient{modalRecipients.size !== 1 ? 's' : ''}</p>
              </div>
              <button className="scn-close-btn" onClick={() => setNotifModalOpen(false)}><Iconify icon="mdi:close" width={15} /></button>
            </div>

            <div className="scn-modal-body">
              {notifSuccess && <div className="scn-banner success"><Iconify icon="mdi:check-circle" width={16} />{notifSuccess}</div>}
              {notifError   && <div className="scn-banner error"><Iconify icon="mdi:alert-circle"  width={16} />{notifError}</div>}

              <span className="scn-label">To</span>
              <div className="scn-recipients-box">
                {modalRecipients.size === 0 && <span style={{ fontSize: '.8rem', color: C.textMuted, alignSelf: 'center' }}>No recipients</span>}
                {staffKeys.length > 0 && (
                  <>
                    <span className="scn-section-label">Internal Staff</span>
                    {staffKeys.map(key => {
                      const { person } = getPersonFromKey(key);
                      return (
                        <div className="scn-chip" key={key}>
                          <div className="scn-chip-avatar">{getInitial(person?.name)}</div>
                          {person?.name || 'Unknown'}
                          <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
                        </div>
                      );
                    })}
                  </>
                )}
                {freelancerKeys.length > 0 && (
                  <>
                    <span className="scn-section-label">Freelancers</span>
                    {freelancerKeys.map(key => {
                      const { person } = getPersonFromKey(key);
                      return (
                        <div className="scn-chip" key={key}>
                          <div className="scn-chip-avatar freelancer">{getInitial(person?.name)}</div>
                          {person?.name || 'Unknown'}
                          <button className="scn-chip-remove" onClick={() => removeModalRecipient(key)}><Iconify icon="mdi:close" width={9} /></button>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <span className="scn-label">Subject <span style={{ color: C.textMuted, fontWeight: 400 }}>(optional)</span></span>
              <input type="text" className="scn-input" placeholder="e.g. Project Update…" value={notifSubject} onChange={e => setNotifSubject(e.target.value)} maxLength={120} />

              <span className="scn-label">Message <span style={{ color: C.danger }}>*</span></span>
              <textarea className="scn-input scn-textarea" placeholder="Type your message…" value={notifMessage} onChange={e => { setNotifMessage(e.target.value); setNotifError(''); }} maxLength={1000} />
              <div className="scn-char">{notifMessage.length} / 1000</div>
            </div>

            <div className="scn-modal-footer">
              <button className="scn-btn-cancel" onClick={() => setNotifModalOpen(false)} disabled={notifSending}>Cancel</button>
              <button className="scn-btn-send" onClick={handleSendNotification} disabled={notifSending || !modalRecipients.size || !notifMessage.trim()}>
                {notifSending
                  ? <><Iconify icon="mdi:loading" width={16} className="spin" /> Sending…</>
                  : <><Iconify icon="mdi:send" width={16} /> Send to {modalRecipients.size}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <Container maxWidth="xl" sx={{ py: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${C.border}` }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: C.text, margin: 0 }}>{greeting}, Admin</h1>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '.5rem', fontSize: '.875rem', color: C.textSub }}>
            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Stats */}
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          {statsData.map((s, i) => (
            <Grid item xs={6} sm={4} md={3} key={`stat-${i}`}>
              <div className="dc-card stat-card" onClick={() => navigate(s.path)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && navigate(s.path)}>
                <div className="stat-icon"><Iconify icon={s.icon} width={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="stat-title">{s.title}</p>
                  <h3 className="stat-value">{s.total}</h3>
                </div>
                <Iconify icon="mdi:arrow-right" width={15} className="stat-arrow" />
              </div>
            </Grid>
          ))}
        </Grid>

        {/* Analytics filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.75rem', margin: '1.5rem 0 1rem' }}>
          <SectionTitle icon="mdi:chart-line">Purchasing Analytics</SectionTitle>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {['15days', 'month'].map(p => (
              <button key={p} onClick={() => { setFilterPeriod(p); setStartDate(''); setEndDate(''); }}
                style={{ padding: '.4rem .875rem', background: filterPeriod === p && !startDate && !endDate ? C.primary : 'white', color: filterPeriod === p && !startDate && !endDate ? 'white' : C.textSub, border: `1px solid ${C.border}`, borderRadius: 6, cursor: 'pointer', fontSize: '.875rem', fontWeight: 500 }}>
                {p === '15days' ? '15 Days' : '1 Month'}
              </button>
            ))}
            <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <input type="date" className="date-input" value={startDate} onChange={handleStartDateChange} max={new Date().toISOString().split('T')[0]} />
              <span style={{ color: C.textSub, fontSize: '.875rem' }}>to</span>
              <input type="date" className="date-input" value={endDate} onChange={handleEndDateChange} max={new Date().toISOString().split('T')[0]} min={startDate} />
              {startDate && endDate && (
                <button onClick={handleClearDates} style={{ padding: '.4rem .75rem', background: 'white', border: `1px solid ${C.border}`, borderRadius: 6, cursor: 'pointer', fontSize: '.78rem', color: C.textSub }}>Clear</button>
              )}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          {[
            { title: 'Services Bought', value: analyticsData?.summary?.totalServicesBought || 0,                  icon: 'mdi:cart-check'    },
            { title: 'Refunds',         value: analyticsData?.summary?.totalRefunds         || 0,                  icon: 'mdi:cash-refund'   },
            { title: 'Total Revenue',   value: `₹${(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}`, icon: 'mdi:cash-multiple' },
            { title: 'Refund Rate',     value: `${analyticsData?.summary?.refundRate        || 0}%`,               icon: 'mdi:percent'       },
          ].map((c, i) => (
            <Grid item xs={6} sm={3} key={`summary-${i}`}>
              <div className="dc-card stat-card" style={{ cursor: 'default' }}>
                <div className="stat-icon"><Iconify icon={c.icon} width={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="stat-title">{c.title}</p>
                  <h3 className="stat-value" style={{ fontSize: '1.25rem' }}>{c.value}</h3>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        {/* Chart + Countries */}
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          <Grid item xs={12} md={8}>
            <div className="dc-card">
              <h3 style={{ margin: '0 0 .25rem', fontSize: '1rem', fontWeight: 700, color: C.text }}>Purchasing Report</h3>
              <p style={{ margin: '0 0 1.5rem', fontSize: '.875rem', color: C.textSub }}>
                Bought: {analyticsData?.summary?.totalServicesBought || 0} · Refunded: {analyticsData?.summary?.totalRefunds || 0} · Revenue: ₹{(analyticsData?.summary?.totalRevenue || 0).toLocaleString()}
              </p>
              <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: 6, minWidth: 900, height: 320, alignItems: 'flex-end', borderBottom: `2px solid ${C.border}`, paddingBottom: 10, paddingTop: 50 }}>
                  {analyticsData?.chartLabels?.map((label, i) => {
                    const bought  = analyticsData.chartData.servicesBought[i] || 0;
                    const refunds = analyticsData.chartData.refunds[i]         || 0;
                    const bAmt    = analyticsData.chartData.revenue[i]         || 0;
                    const rAmt    = analyticsData.chartData.refundAmount?.[i]  || 0;
                    const mx      = Math.max(...analyticsData.chartData.servicesBought, ...analyticsData.chartData.refunds, 1);
                    const bH      = (bought / mx) * 220;
                    const rH      = (refunds / mx) * 220;
                    return (
                      <div key={`chart-${i}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 220 }}>
                          <div style={{ width: 18, height: `${bH}px`, background: C.primary, borderRadius: '3px 3px 0 0', position: 'relative' }}>
                            {bought > 0 && (<>
                              <div style={{ position: 'absolute', top: -42, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: C.primary, whiteSpace: 'nowrap' }}>{bought}</div>
                              <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 600, color: C.success, whiteSpace: 'nowrap' }}>₹{bAmt}</div>
                            </>)}
                          </div>
                          <div style={{ width: 18, height: `${rH}px`, background: C.danger, borderRadius: '3px 3px 0 0', position: 'relative' }}>
                            {refunds > 0 && (<>
                              <div style={{ position: 'absolute', top: -42, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 700, color: C.danger, whiteSpace: 'nowrap' }}>{refunds}</div>
                              <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 600, color: C.warn, whiteSpace: 'nowrap' }}>₹{rAmt}</div>
                            </>)}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, whiteSpace: 'nowrap', color: C.textSub }}>{label}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem', fontSize: '.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <div style={{ width: 14, height: 14, background: C.primary, borderRadius: 3 }} /><span style={{ color: C.textSub }}>Bought</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <div style={{ width: 14, height: 14, background: C.danger, borderRadius: 3 }} /><span style={{ color: C.textSub }}>Refunds</span>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div className="dc-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: C.text }}>Countries</h3>
                <span style={{ fontSize: '.75rem', color: C.textMuted }}>{allCountries.length} countries</span>
              </div>
              <CountryTabButtons value={countryTab} onChange={setCountryTab} domesticCount={domesticCountries.length} intlCount={intlCountries.length} />
              <div style={{ flex: 1, overflowY: 'auto' }}>{renderCountryBars(activeCountries)}</div>
            </div>
          </Grid>
        </Grid>

        {/* Staff & Freelancers */}
        <SectionTitle icon="mdi:star">Staff &amp; Freelancers</SectionTitle>
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <div className="dc-card">
              <div className="dc-tabs">
                <button className={`dc-tab${activeTab === 'staff'      ? ' active' : ''}`} onClick={() => setActiveTab('staff')}>
                  <Iconify icon="mdi:account-tie" width={15} /> Internal Staff <span className="tab-count">{staffList.length}</span>
                </button>
                <button className={`dc-tab${activeTab === 'freelancer' ? ' active' : ''}`} onClick={() => setActiveTab('freelancer')}>
                  <Iconify icon="mdi:briefcase-account" width={15} /> Freelancers <span className="tab-count">{freelancerList.length}</span>
                </button>
                {selectedPeople.size > 0 && (
                  <button className="scn-send-fab" style={{ marginLeft: 'auto' }} onClick={openNotifModal}>
                    <Iconify icon="mdi:bell-ring" width={15} />
                    Send Notification
                    <Tag color="white" bg="rgba(255,255,255,.2)">{selectedPeople.size}</Tag>
                  </button>
                )}
              </div>
              <div style={{ maxHeight: 520, overflowY: 'auto', paddingRight: 4 }}>
                {renderPeopleList(activeList, activeTab)}
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Service Performance */}
        <SectionTitle icon="mdi:trending-up">Service Performance &amp; Geography</SectionTitle>
        <Grid container spacing={1.5} sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <div className="dc-card" style={{ height: 400, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: C.text }}>Top Services</h3>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, background: C.bg, borderBottom: `2px solid ${C.border}` }}>
                    <tr>
                      {['Service', 'Bought', 'Refunds', 'Revenue'].map((h, i) => (
                        <th key={h} style={{ padding: '.5rem', textAlign: i === 0 ? 'left' : i === 3 ? 'right' : 'center', fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData?.serviceStats?.length > 0
                      ? analyticsData.serviceStats.map((s, i) => (
                        <tr key={`svc-${i}`} style={{ borderBottom: `1px solid ${C.bg}` }}>
                          <td style={{ padding: '.7rem .5rem', color: C.text, fontWeight: 500 }}>{s.label}</td>
                          <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{s.value}</Tag></td>
                          <td style={{ padding: '.7rem .5rem', textAlign: 'center' }}><Tag>{s.refunds}</Tag></td>
                          <td style={{ padding: '.7rem .5rem', textAlign: 'right', fontWeight: 700, color: C.success }}>₹{s.revenue.toLocaleString()}</td>
                        </tr>
                      ))
                      : <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: C.textMuted }}>No service data</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="dc-card" style={{ height: 400, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: C.text }}>Country Revenue</h3>
                <span style={{ fontSize: '.75rem', color: C.textMuted }}>{allCountries.length} countries</span>
              </div>
              <CountryTabButtons value={countryRevenueTab} onChange={setCountryRevenueTab} domesticCount={domesticCountries.length} intlCount={intlCountries.length} />
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, background: C.bg, borderBottom: `2px solid ${C.border}` }}>
                    <tr>
                      {['Country', '%', 'Purchases', 'Revenue'].map((h, i) => (
                        <th key={h} style={{ padding: '.5rem', textAlign: i === 0 ? 'left' : i === 3 ? 'right' : 'center', fontSize: '.72rem', fontWeight: 700, color: C.textSub, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{renderCountryTable(activeRevenueCountries)}</tbody>
                </table>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Notification History */}
        <SectionTitle icon="mdi:bell-check">Notification History</SectionTitle>
        <Grid container spacing={1.5} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <div className="nh-wrap">
              <div className="nh-header">
                <div className="nh-title">
                  <Iconify icon="mdi:bell-check" width={16} style={{ color: C.primary }} />
                  Sent Notifications
                  {notifHistoryTotal > 0 && <Tag color={C.primary} bg="#dbeafe">{notifHistoryTotal} total</Tag>}
                </div>
                <button className="nh-refresh-btn" onClick={() => fetchNotifHistory(notifHistoryPage)}>
                  <Iconify icon="mdi:refresh" width={13} /> Refresh
                </button>
              </div>

              <div className="nh-scroll">
                <table className="nh-table">
                  <thead>
                    <tr>
                      <th style={{ width: '32%' }}>Subject / Message</th>
                      <th style={{ width: '15%' }}>Sent At</th>
                      <th style={{ width: '13%' }}>Recipients</th>
                      <th style={{ width: '28%' }}>Read</th>
                      <th style={{ width: '12%', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifHistoryLoading ? (
                      <tr><td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: C.textMuted }}>Loading…</td></tr>
                    ) : notifHistoryError ? (
                      <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: C.danger }}>{notifHistoryError}</td></tr>
                    ) : notifHistory.length === 0 ? (
                      <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: C.textMuted }}>No notifications sent yet</td></tr>
                    ) : notifHistory.map(notif => (
                      // ✅ NotifRow component handles Fragment with key internally
                      <NotifRow
                        key={notif._id}
                        notif={notif}
                        isExpanded={expandedNotif === notif._id}
                        onToggle={id => setExpandedNotif(prev => prev === id ? null : id)}
                        onDelete={deleteNotif}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="nh-pagination">
                  <span className="nh-page-info">
                    {((notifHistoryPage - 1) * NOTIF_HISTORY_LIMIT) + 1}–{Math.min(notifHistoryPage * NOTIF_HISTORY_LIMIT, notifHistoryTotal)} of {notifHistoryTotal}
                  </span>
                  <div className="nh-page-btns">
                    <button className="nh-page-btn" disabled={notifHistoryPage === 1} onClick={() => fetchNotifHistory(notifHistoryPage - 1)}>← Prev</button>
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                      <button key={`page-${i + 1}`} className={`nh-page-btn${notifHistoryPage === i + 1 ? ' active' : ''}`} onClick={() => fetchNotifHistory(i + 1)}>
                        {i + 1}
                      </button>
                    ))}
                    <button className="nh-page-btn" disabled={notifHistoryPage === totalPages} onClick={() => fetchNotifHistory(notifHistoryPage + 1)}>Next →</button>
                  </div>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}