// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {Button, Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';  

// import { projectdata } from 'src/redux/slice/project';

// const WithoutTeamProjectPage = () => {
//   const dispatch = useDispatch()

//     const serviceAllData = useSelector(store => store.service.data) 
//     const staffAllData = useSelector(store => store.staff.data) 
//     const packageAllData = useSelector(store => store.package.data) 
//     const runningProjectAllData = useSelector(store => store.project.data)   
  
  






//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("", {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
  
//         // setCategories(response.data); 
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//         // setError("Failed to load categories");
//       }
//     };
  
    
//     useEffect(() => {
//       fetchCategories();
//     }, []);

//     useEffect(() =>{
//       dispatch(projectdata())
//     }, [])


    

//   return (
//     <>
//     <ToastContainer/>
//     <Helmet>
//         <title> project without team </title>
//     </Helmet> 
//      <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             New Project
//           </Typography>  
//         </Stack> 
//       </Container> 
//       <Container className=''> 
//           <div className='d-flex align-items-center justify-content-between felx-wrap bg-lightgray rounded-top p-3'> 
//             <div> 
//               <form> 
//                 <input type='text'  placeholder='Search' className='form-control' />
//               </form>
//             </div> 
//             <div>
             
//             </div> 
//           </div>
//       </Container>
//       <Container>
//         <section className='table-responsive'>
//             <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
//                 <thead className='table-primary'>
//                     <tr className='align-top'>
//                         <th>S. No.</th> 
//                         <th>Package / service  </th>
//                         <th>Project Id</th> 
//                         <th>Price ($)</th> 
//                         <th>Client</th> 
//                         <th>Client Name</th>
//                         <th>team</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>  
                    


                
//                     {runningProjectAllData && runningProjectAllData.filter(value =>(value.projectStatus === 'pending' )).map((cv, i)=>{
//                         return( 
//                           <tr className='text-center' key={i}>
//                                 <td>{i + 1}</td>  
//                                 {cv.projectType === "package" ?
//                                 <td className='text-capitalize'>{packageAllData.filter(data => data._id === cv.packageId).map((packageVal) => packageVal.packageName)}</td> : 
//                                 <td className='text-capitalize'>"custom Project"</td> } 
//                                 <td> {cv._id}</td> 
//                                 <td>$ {cv.totalPrice}</td> 
//                                 <td>{cv.clientId}</td>
//                                 <td className='text-capitalize'>{cv.clientName}</td>     
//                                 <td> 
//                                   {cv.team ?  Object.keys(cv.team).map((key, index) => {
//                                     const findName = staffAllData.find(data => data._id === cv.team[key]) 
//                                     return (
//                                     <p key={index} className='d-flex align-items-cener width-max-content text-capitalize mb-0 pb-0'>
//                                      <span className='me-1 text-muted'>{key}</span> : {findName?.name}</p>
//                                     )
//                                     }) : 
//                                     <>
//                                     <Link className='' to={`/dashboard/make-team/${cv._id}`}>
//                                       <button className='btn btn-primary btn-sm text-nowrap'>Make a team</button>
//                                     </Link>
//                                     </>
//                                     }
//                                 </td>
//                                 <td>
//                                     <div className='d-flex align-items-center flex-wrap justify-content-center '>  
                                  
//                                     <Link  to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap' > 
//                                       <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
//                                       <small className='fw-bold text-primary'>view</small>
//                                     </Link> 
//                                     </div>
//                                 </td>
//                             </tr> 
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </section>
//       </Container>
//     </>
//   )
// }

// export default WithoutTeamProjectPage



// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from 'src/url/url';

// const WithoutTeamProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchProjects = async (currentPage) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=1`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       console.error('Error fetching project data:', err);
//       toast.error("Failed to load projects");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProjects(page);
//   }, [page]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(prev => prev + 1);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project Without Team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>New Project</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <form>
//             <input type='text' placeholder='Search' className='form-control' />
//           </form>
//         </div>
//       </Container>

//       <Container>
//         <section className='table-responsive'>
//           <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
//             <thead className='table-primary'>
//               <tr className='align-top'>
//                 <th>S. No.</th>
//                 <th>Package / Service</th>
//                 <th>Project Id</th>
//                 <th>Price ($)</th>
//                 <th>Client</th>
//                 <th>Client Name</th>
//                 <th>Team</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 <>
//                   {projects.length > 0 ? projects.map((cv, i) => (
//                     <tr key={i}>
//                       <td>{(page - 1) * 10 + i + 1}</td>
//                       <td className='text-capitalize'>
//                         {cv.projectType === 'package' ? 'Package' : cv.projectType}
//                       </td>
//                       <td>{cv._id}</td>
//                       <td>$ {cv.totalPrice}</td>
//                       <td>{cv.clientId}</td>
//                       <td className='text-capitalize'>{cv.clientName}</td>
//                       <td>
//                         <Link to={`/dashboard/make-team/${cv._id}`}>
//                           <button className='btn btn-primary btn-sm text-nowrap'>Make a team</button>
//                         </Link>
//                       </td>
//                       <td>
//                         <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 text-nowrap'>
//                           <i className="fa-solid fa-eye fa-sm text-primary me-1"></i>
//                           <small className='fw-bold text-primary'>View</small>
//                         </Link>
//                       </td>
//                     </tr>
//                   )) : (
//                     <tr>
//                       <td colSpan="8" className="text-center text-muted py-4">
//                         No projects found.
//                       </td>
//                     </tr>
//                   )}
//                 </>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           {/* <div className="d-flex justify-content-between align-items-center mt-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={handlePrevPage}
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <span>Page {page} of {totalPages}</span>
//             <button
//               className="btn btn-outline-primary"
//               onClick={handleNextPage}
//               disabled={page === totalPages}
//             >
//               Next
//             </button>
//           </div> */}
//           {/* Pagination - only if more than 1 page */}
// {totalPages > 1 && (
//   <div className="d-flex justify-content-between align-items-center mt-3">
//     <button
//       className="btn btn-outline-primary"
//       onClick={handlePrevPage}
//       disabled={page === 1}
//     >
//       Previous
//     </button>
//     <span>Page {page} of {totalPages}</span>
//     <button
//       className="btn btn-outline-primary"
//       onClick={handleNextPage}
//       disabled={page === totalPages}
//     >
//       Next
//     </button>
//   </div>
// )}

//         </section>
//       </Container>
//     </>
//   );
// };

// export default WithoutTeamProjectPage;



// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from 'src/url/url';

// const WithoutTeamProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10); // Default limit
//   const [search, setSearch] = useState('');


//   const fetchProjects = async (currentPage, currentLimit = limit) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=${currentLimit}`);
      
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       console.error('Error fetching project data:', err);
//       toast.error("Failed to load projects");
//     }
//     setLoading(false);
//   };


//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/project/searchNewProject?page=1&limit=${limit}&search=${value}`);
//       console.log("searchbar",response)
   
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages || 1);
//       setPage(1);
//     } catch (err) {
//       console.error('Error searching projects:', err);
//       toast.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   useEffect(() => {
//     if (search.trim() === '') {
//       fetchProjects(1, limit);
//       setPage(1);
//     }
//   }, [search]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(prev => prev + 1);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project Without Team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>💼 New Project</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <form>
            
//             <input
//   type='text'
//   placeholder="🔍 Search ..."

//   className='form-control'
//   value={search}
//   onChange={handleSearchChange}
// />

//           </form>

        
//           <div className="d-flex align-items-center gap-2">
//             <label className='mb-0'>Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => {
//                 setPage(1); 
//                 setLimit(Number(e.target.value));
//               }}
//             >
//               <option value={1}>1</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className='mb-0'>entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <section className='table-responsive bg-white'>
        

// <div className="card  rounded-4 newproject-card" style={{overflow:'auto'}}>
//   <div className="card-body p-4">
//     <table className="table table-hover table-bordered text-center align-middle newproject-table">
//       <thead className="table-primary text-dark">
//         <tr>
//           <th>S. No.</th>
//           <th>Package / Service</th>
//           <th>Project ID</th>
//           <th>Price ($)</th>
//           <th>Client ID</th>
//           <th>Client Name</th>
//           <th>Team</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {loading ? (
//           <tr>
//             <td colSpan="8" className="text-center py-4">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </td>
//           </tr>
//         ) : (
//           <>
//             {projects.length > 0 ? projects.map((cv, i) => (
//               <tr key={i} className="newproject-row">
//                 <td className="fw-semibold">{(page - 1) * limit + i + 1}</td>

//                 <td>
//                   <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm text-capitalize">
//                     {cv.projectType === 'package' ? 'Custom Package' : cv.projectType}
//                   </span>
//                 </td>

//                 <td>
//                   <span className="badge bg-dark text-white rounded-pill px-3 py-2 shadow-sm">
//                     {cv._id?.toString().slice(-5)}
//                   </span>
//                 </td>

//                 <td>
//                   <span className="fw-bold text-success">${cv.totalPrice}</span>
//                 </td>

//                 <td>{cv.clientId}</td>

//                 <td className="fw-medium text-capitalize">{cv.clientName}</td>

//                 <td>
//                   {cv.team ? (
//                     <span className="badge btn btn-outline-primary rounded-pill px-3 py-2 text-dark shadow-sm">
//                       <i className="bi bi-check-circle-fill me-1"></i> Created
//                     </span>
//                   ) : (
//                     <Link to={`/dashboard/make-team/${cv._id}`}>
//                       <button className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm">
//                         <i className="fa-solid fa-user-plus me-1"></i> Add
//                       </button>
//                     </Link>
//                   )}
//                 </td>

//                 <td>
//                   <Link to={`/dashboard/project/${cv._id}`}>
//                     <button className="btn btn-outline-warning btn-sm rounded-pill shadow-sm">
//                       <i className="fa-solid fa-eye"></i>
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan="8" className="text-muted py-4">No projects found.</td>
//               </tr>
//             )}
//           </>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>


//           {/* Pagination - Only if more than 1 page */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handlePrevPage}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <span>Page {page} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handleNextPage}
//                 disabled={page === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default WithoutTeamProjectPage;










// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from 'src/url/url';

// const WithoutTeamProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [search, setSearch] = useState('');

//   const fetchProjects = async (currentPage, currentLimit = limit) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=${currentLimit}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       console.error('Error fetching project data:', err);
//       toast.error("Failed to load projects");
//     }
//     setLoading(false);
//   };

//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/project/searchNewProject?page=1&limit=${limit}&search=${value}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages || 1);
//       setPage(1);
//     } catch (err) {
//       console.error('Error searching projects:', err);
//       toast.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   useEffect(() => {
//     if (search.trim() === '') {
//       fetchProjects(1, limit);
//       setPage(1);
//     }
//   }, [search]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(prev => prev + 1);
//   };

//   // Helper function to get payment status badge
//   const getPaymentStatusBadge = (payment) => {
//     if (!payment) {
//       return <span className="badge bg-secondary">No Payment</span>;
//     }

//     const status = payment.status?.toLowerCase();
    
//     switch(status) {
//       case 'completed':
//         return (
//           <span className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-check-circle-fill"></i>
//             Completed
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="badge bg-warning text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-clock-fill"></i>
//             Pending
//           </span>
//         );
//       case 'failed':
//         return (
//           <span className="badge bg-danger d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-x-circle-fill"></i>
//             Failed
//           </span>
//         );
//       case 'refunded':
//         return (
//           <span className="badge bg-info text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-arrow-counterclockwise"></i>
//             Refunded
//           </span>
//         );
//       default:
//         return (
//           <span className="badge bg-secondary" style={{ fontSize: '0.85rem' }}>
//             {status || 'Unknown'}
//           </span>
//         );
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project Without Team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>💼 New Project</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <form>
//             <input
//               type='text'
//               placeholder="🔍 Search ..."
//               className='form-control'
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </form>

//           <div className="d-flex align-items-center gap-2">
//             <label className='mb-0'>Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => {
//                 setPage(1); 
//                 setLimit(Number(e.target.value));
//               }}
//             >
//               <option value={1}>1</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className='mb-0'>entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <section className='table-responsive bg-white'>
//           <div className="card rounded-4 newproject-card" style={{overflow:'auto'}}>
//             <div className="card-body p-4">
//               <table className="table table-hover table-bordered text-center align-middle newproject-table">
//                 <thead className="table-primary text-dark">
//                   <tr>
//                     <th>S. No.</th>
//                     <th>Package / Service</th>
//                     <th>Project ID</th>
//                     <th>Price ($)</th>
//                     <th>Payment Status</th>
//                     <th>Client ID</th>
//                     <th>Client Name</th>
//                     <th>Team</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="9" className="text-center py-4">
//                         <div className="spinner-border text-primary" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     <>
//                       {projects.length > 0 ? projects.map((cv, i) => (
//                         <tr key={i} className="newproject-row">
//                           <td className="fw-semibold">{(page - 1) * limit + i + 1}</td>

//                           <td>
//                             <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm text-capitalize">
//                               {cv.projectType === 'package' ? 'Custom Package' : cv.projectType}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="badge bg-dark text-white rounded-pill px-3 py-2 shadow-sm">
//                               {cv._id?.toString().slice(-5)}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="fw-bold text-success">${cv.totalPrice}</span>
//                           </td>

//                           {/* 💰 Payment Status Column */}
//                           <td>
//                             <div className="d-flex flex-column align-items-center gap-1">
//                               {getPaymentStatusBadge(cv.payment)}
//                               {cv.payment && cv.payment.provider && (
//                                 <small className="text-muted text-capitalize">
//                                   via {cv.payment.provider}
//                                 </small>
//                               )}
//                               {cv.payment && cv.payment.refund?.isRefunded && (
//                                 <span className="badge bg-warning text-dark" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-triangle-fill"></i> Refunded
//                                 </span>
//                               )}
//                               {cv.payment && cv.payment.dispute?.isDisputed && (
//                                 <span className="badge bg-danger" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-circle-fill"></i> Disputed
//                                 </span>
//                               )}
//                             </div>
//                           </td>

//                           <td>{cv.clientId}</td>

//                           <td className="fw-medium text-capitalize">{cv.clientName}</td>

//                           <td>
//                             {cv.team ? (
//                               <span className="badge btn btn-outline-primary rounded-pill px-3 py-2 text-dark shadow-sm">
//                                 <i className="bi bi-check-circle-fill me-1"></i> Created
//                               </span>
//                             ) : (
//                               <Link to={`/dashboard/make-team/${cv._id}`}>
//                                 <button className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm">
//                                   <i className="fa-solid fa-user-plus me-1"></i> Add
//                                 </button>
//                               </Link>
//                             )}
//                           </td>

//                           <td>
//                             <Link to={`/dashboard/project/${cv._id}`}>
//                               <button className="btn btn-outline-warning btn-sm rounded-pill shadow-sm">
//                                 <i className="fa-solid fa-eye"></i>
//                               </button>
//                             </Link>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr>
//                           <td colSpan="9" className="text-muted py-4">No projects found.</td>
//                         </tr>
//                       )}
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handlePrevPage}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <span>Page {page} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handleNextPage}
//                 disabled={page === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default WithoutTeamProjectPage;










// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from 'src/url/url';

// const WithoutTeamProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [search, setSearch] = useState('');

//   const fetchProjects = async (currentPage, currentLimit = limit) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=${currentLimit}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       console.error('Error fetching project data:', err);
//       toast.error("Failed to load projects");
//     }
//     setLoading(false);
//   };

//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/project/searchNewProject?page=1&limit=${limit}&search=${value}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages || 1);
//       setPage(1);
//     } catch (err) {
//       console.error('Error searching projects:', err);
//       toast.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   useEffect(() => {
//     if (search.trim() === '') {
//       fetchProjects(1, limit);
//       setPage(1);
//     }
//   }, [search]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(prev => prev + 1);
//   };

//   // Helper function to get payment status badge
//   const getPaymentStatusBadge = (payment) => {
//     if (!payment) {
//       return <span className="badge bg-secondary">No Payment</span>;
//     }

//     const status = payment.status?.toLowerCase();
    
//     switch(status) {
//       case 'completed':
//         return (
//           <span className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-check-circle-fill"></i>
//             Completed
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="badge bg-warning text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-clock-fill"></i>
//             Pending
//           </span>
//         );
//       case 'failed':
//         return (
//           <span className="badge bg-danger d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-x-circle-fill"></i>
//             Failed
//           </span>
//         );
//       case 'refunded':
//         return (
//           <span className="badge bg-info text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-arrow-counterclockwise"></i>
//             Refunded
//           </span>
//         );
//       default:
//         return (
//           <span className="badge bg-secondary" style={{ fontSize: '0.85rem' }}>
//             {status || 'Unknown'}
//           </span>
//         );
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project Without Team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>💼 New Project</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <form>
//             <input
//               type='text'
//               placeholder="🔍 Search ..."
//               className='form-control'
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </form>

//           <div className="d-flex align-items-center gap-2">
//             <label className='mb-0'>Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => {
//                 setPage(1); 
//                 setLimit(Number(e.target.value));
//               }}
//             >
//               <option value={1}>1</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className='mb-0'>entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <section className='table-responsive bg-white'>
//           <div className="card rounded-4 newproject-card" style={{overflow:'auto'}}>
//             <div className="card-body p-4">
//               <table className="table table-hover table-bordered text-center align-middle newproject-table">
//                 <thead className="table-primary text-dark">
//                   <tr>
//                     <th>S. No.</th>
//                     <th>Package / Service</th>
//                     <th>Project ID</th>
//                     <th>Price ($)</th>
//                     <th>Payment Status</th>
//                     <th>Invoice Number</th>
//                     <th>Invoice Date</th>
//                     <th>Client ID</th>
//                     <th>Client Name</th>
//                     <th>Team</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="11" className="text-center py-4">
//                         <div className="spinner-border text-primary" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     <>
//                       {projects.length > 0 ? projects.map((cv, i) => (
//                         <tr key={i} className="newproject-row">
//                           <td className="fw-semibold">{(page - 1) * limit + i + 1}</td>

//                           <td>
//                             <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm text-capitalize">
//                               {cv.projectType === 'package' ? 'Custom Package' : cv.projectType}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="badge bg-dark text-white rounded-pill px-3 py-2 shadow-sm">
//                               {cv._id?.toString().slice(-5)}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="fw-bold text-success">${cv.totalPrice}</span>
//                           </td>

//                           {/* 💰 Payment Status Column */}
//                           <td>
//                             <div className="d-flex flex-column align-items-center gap-1">
//                               {getPaymentStatusBadge(cv.payment)}
//                               {cv.payment && cv.payment.provider && (
//                                 <small className="text-muted text-capitalize">
//                                   via {cv.payment.provider}
//                                 </small>
//                               )}
//                               {cv.payment && cv.payment.refund?.isRefunded && (
//                                 <span className="badge bg-warning text-dark" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-triangle-fill"></i> Refunded
//                                 </span>
//                               )}
//                               {cv.payment && cv.payment.dispute?.isDisputed && (
//                                 <span className="badge bg-danger" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-circle-fill"></i> Disputed
//                                 </span>
//                               )}
//                             </div>
//                           </td>
// {/* 🔢 Invoice Number Column */}
// <td>
//   {cv.payment?.invoiceNumber ? ( // ✅ SAHI PATH
//     <div className="d-flex flex-column align-items-center">
//       <span className="text-dark px-2 py-1" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
//         <i className="bi bi-file-earmark-text"></i> {cv.payment.invoiceNumber}
//       </span>
//       {cv.payment.invoiceSent && (
//         <small className="text-success mt-1">
//           <i className="bi bi-check-circle-fill"></i> Sent
//         </small>
//       )}
//     </div>
//   ) : (
//     <span className="text-muted">—</span>
//   )}
// </td>

// {/* 📅 Invoice Date Column */}
// <td>
//   {cv.payment?.invoiceDate ? ( // ✅ SAHI PATH
//     <span className="text-dark" style={{ fontSize: '0.85rem' }}>
//       <i className="bi bi-calendar-check"></i> {cv.payment.invoiceDate}
//     </span>
//   ) : (
//     <span className="text-muted">—</span>
//   )}
// </td>

//                           <td>{cv.clientId}</td>

//                           <td className="fw-medium text-capitalize">{cv.clientName}</td>

//                           <td>
//                             {cv.team ? (
//                               <span className="badge btn btn-outline-primary rounded-pill px-3 py-2 text-dark shadow-sm">
//                                 <i className="bi bi-check-circle-fill me-1"></i> Created
//                               </span>
//                             ) : (
//                               <Link to={`/dashboard/make-team/${cv._id}`}>
//                                 <button className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm">
//                                   <i className="fa-solid fa-user-plus me-1"></i> Add
//                                 </button>
//                               </Link>
//                             )}
//                           </td>

//                           <td>
//                             <Link to={`/dashboard/project/${cv._id}`}>
//                               <button className="btn btn-outline-warning btn-sm rounded-pill shadow-sm">
//                                 <i className="fa-solid fa-eye"></i>
//                               </button>
//                             </Link>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr>
//                           <td colSpan="11" className="text-muted py-4">No projects found.</td>
//                         </tr>
//                       )}
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handlePrevPage}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <span>Page {page} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handleNextPage}
//                 disabled={page === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default WithoutTeamProjectPage;

















// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from 'src/url/url';

// const WithoutTeamProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [search, setSearch] = useState('');

//   const fetchProjects = async (currentPage, currentLimit = limit) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=${currentLimit}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       console.error('Error fetching project data:', err);
//       toast.error("Failed to load projects");
//     }
//     setLoading(false);
//   };

//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/project/searchNewProject?page=1&limit=${limit}&search=${value}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages || 1);
//       setPage(1);
//     } catch (err) {
//       console.error('Error searching projects:', err);
//       toast.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   useEffect(() => {
//     if (search.trim() === '') {
//       fetchProjects(1, limit);
//       setPage(1);
//     }
//   }, [search]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(prev => prev + 1);
//   };

//   // Helper function to get payment status badge
//   const getPaymentStatusBadge = (payment) => {
//     if (!payment) {
//       return <span className="badge bg-secondary">No Payment</span>;
//     }

//     const status = payment.status?.toLowerCase();
    
//     switch(status) {
//       case 'completed':
//         return (
//           <span className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-check-circle-fill"></i>
//             Completed
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="badge bg-warning text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-clock-fill"></i>
//             Pending
//           </span>
//         );
//       case 'failed':
//         return (
//           <span className="badge bg-danger d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-x-circle-fill"></i>
//             Failed
//           </span>
//         );
//       case 'refunded':
//         return (
//           <span className="badge bg-info text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-arrow-counterclockwise"></i>
//             Refunded
//           </span>
//         );
//       default:
//         return (
//           <span className="badge bg-secondary" style={{ fontSize: '0.85rem' }}>
//             {status || 'Unknown'}
//           </span>
//         );
//     }
//   };
//   console.log("projects",projects)

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project Without Team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>💼 New Project</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <form>
//             <input
//               type='text'
//               placeholder="🔍 Search ..."
//               className='form-control'
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </form>

//           <div className="d-flex align-items-center gap-2">
//             <label className='mb-0'>Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => {
//                 setPage(1); 
//                 setLimit(Number(e.target.value));
//               }}
//             >
//               <option value={1}>1</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className='mb-0'>entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <section className='table-responsive bg-white'>
//           <div className="card rounded-4 newproject-card" style={{overflow:'auto'}}>
//             <div className="card-body p-4">
//               <table className="table table-hover table-bordered text-center align-middle newproject-table">
//                 <thead className="table-primary text-dark">
//                   <tr>
//                     <th>S. No.</th>
//                     <th>Package / Service</th>
//                     <th>Project ID</th>
//                     <th>Price ($)</th>
//                     <th>Payment Status</th>
//                     <th>Invoice Number</th>
//                     <th>Invoice</th>
//                     <th>Invoice Date</th>
//                     <th>Client ID</th>
//                     <th>Client Name</th>
//                     <th>Team</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="12" className="text-center py-4">
//                         <div className="spinner-border text-primary" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     <>
//                       {projects.length > 0 ? projects.map((cv, i) => (
//                         <tr key={i} className="newproject-row">
//                           <td className="fw-semibold">{(page - 1) * limit + i + 1}</td>

//                           <td>
//                             <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm text-capitalize">
//                               {cv.projectType === 'package' ? 'Custom Package' : cv.projectType}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="badge bg-dark text-white rounded-pill px-3 py-2 shadow-sm">
//                               {cv._id?.toString().slice(-5)}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="fw-bold text-success">${cv.totalPrice}</span>
//                           </td>

//                           {/* 💰 Payment Status Column */}
//                           <td>
//                             <div className="d-flex flex-column align-items-center gap-1">
//                               {getPaymentStatusBadge(cv.payment)}
//                               {cv.payment && cv.payment.provider && (
//                                 <small className="text-muted text-capitalize">
//                                   via {cv.payment.provider}
//                                 </small>
//                               )}
//                               {cv.payment && cv.payment.refund?.isRefunded && (
//                                 <span className="badge bg-warning text-dark" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-triangle-fill"></i> Refunded
//                                 </span>
//                               )}
//                               {cv.payment && cv.payment.dispute?.isDisputed && (
//                                 <span className="badge bg-danger" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-circle-fill"></i> Disputed
//                                 </span>
//                               )}
//                             </div>
//                           </td>

//                           {/* 🔢 Invoice Number Column */}
//                           <td>
//                             {cv.payment?.invoiceNumber ? (
//                               <div className="d-flex flex-column align-items-center">
//                                 <span className="text-dark px-2 py-1" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
//                                   <i className="bi bi-file-earmark-text"></i> {cv.payment.invoiceNumber}
//                                 </span>
//                                 {cv.payment.invoiceSent && (
//                                   <small className="text-success mt-1">
//                                     <i className="bi bi-check-circle-fill"></i> Sent
//                                   </small>
//                                 )}
//                               </div>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           {/* 📄 Invoice View Button Column */}
//                           <td>
//                             {cv.payment?.invoicePdfKey ? (
//                               <a 
//                                 href={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.payment.invoicePdfKey}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="btn btn-primary btn-sm shadow-sm"
//                               >
//                                 <i className="bi bi-file-earmark-pdf me-1"></i> View 
//                               </a>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           {/* 📅 Invoice Date Column */}
//                           <td>
//                             {cv.payment?.invoiceDate ? (
//                               <span className="text-dark" style={{ fontSize: '0.85rem' }}>
//                                 <i className="bi bi-calendar-check"></i> {cv.payment.invoiceDate}
//                               </span>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           <td>{cv.clientId}</td>

//                           <td className="fw-medium text-capitalize">{cv.clientName}</td>

//                           <td>
//                             {cv.team ? (
//                               <span className="badge btn btn-outline-primary rounded-pill px-3 py-2 text-dark shadow-sm">
//                                 <i className="bi bi-check-circle-fill me-1"></i> Created
//                               </span>
//                             ) : (
//                               <Link to={`/dashboard/make-team/${cv._id}`}>
//                                 <button className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm">
//                                   <i className="fa-solid fa-user-plus me-1"></i> Add
//                                 </button>
//                               </Link>
//                             )}
//                           </td>

//                           <td>
//                             <Link to={`/dashboard/project/${cv._id}`}>
//                               <button className="btn btn-outline-warning btn-sm rounded-pill shadow-sm">
//                                 <i className="fa-solid fa-eye"></i>
//                               </button>
//                             </Link>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr>
//                           <td colSpan="12" className="text-muted py-4">No projects found.</td>
//                         </tr>
//                       )}
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handlePrevPage}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <span>Page {page} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handleNextPage}
//                 disabled={page === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default WithoutTeamProjectPage;






// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from 'src/url/url';

// const WithoutTeamProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [search, setSearch] = useState('');

//   // 🔥 Refund Modal States
//   const [showRefundModal, setShowRefundModal] = useState(false);
//   const [selectedRefundProject, setSelectedRefundProject] = useState(null);
//   const [refundActionLoading, setRefundActionLoading] = useState(false);

//   const fetchProjects = async (currentPage, currentLimit = limit) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=${currentLimit}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages);
//     } catch (err) {
//       console.error('Error fetching project data:', err);
//       toast.error("Failed to load projects");
//     }
//     setLoading(false);
//   };

//   const handleSearchChange = async (e) => {
//     const value = e.target.value;
//     setSearch(value);
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/project/searchNewProject?page=1&limit=${limit}&search=${value}`);
//       setProjects(response.data.data || []);
//       setTotalPages(response.data.totalPages || 1);
//       setPage(1);
//     } catch (err) {
//       console.error('Error searching projects:', err);
//       toast.error("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   useEffect(() => {
//     if (search.trim() === '') {
//       fetchProjects(1, limit);
//       setPage(1);
//     }
//   }, [search]);

//   const handlePrevPage = () => {
//     if (page > 1) setPage(prev => prev - 1);
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) setPage(prev => prev + 1);
//   };

//   // 🔥 Open Refund Modal
//   const handleOpenRefundModal = (project) => {
//     setSelectedRefundProject(project);
//     setShowRefundModal(true);
//   };

//   // 🔥 Close Refund Modal
//   const handleCloseRefundModal = () => {
//     setShowRefundModal(false);
//     setSelectedRefundProject(null);
//   };

//   // 🔥 Handle Refund Action (Approve/Reject)
//   const handleRefundAction = async (action) => {
//     if (!selectedRefundProject) return;

//     setRefundActionLoading(true);
//     try {
//       const adminId = 1; // Replace with actual admin ID from auth/session
      
//       const response = await axios.post(`${Url}/project/refund-review`, {
//         projectId: selectedRefundProject._id,
//         action: action, // "approved" or "rejected"
//         adminId: adminId,
//         note: action === 'approved' ? 'Refund approved by admin' : 'Refund rejected by admin'
//       });

//       if (response.data.success) {
//         toast.success(response.data.message || `Refund ${action} successfully!`);
//         handleCloseRefundModal();
//         fetchProjects(page, limit); // Refresh the list
//       } else {
//         toast.error(response.data.message || `Failed to ${action} refund`);
//       }
//     } catch (error) {
//       console.error('Refund action error:', error);
//       toast.error('An error occurred while processing the refund');
//     } finally {
//       setRefundActionLoading(false);
//     }
//   };

//   // Helper function to get payment status badge
//   const getPaymentStatusBadge = (payment) => {
//     if (!payment) {
//       return <span className="badge bg-secondary">No Payment</span>;
//     }

//     const status = payment.status?.toLowerCase();
    
//     switch(status) {
//       case 'completed':
//         return (
//           <span className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-check-circle-fill"></i>
//             Completed
//           </span>
//         );
//       case 'pending':
//         return (
//           <span className="badge bg-warning text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-clock-fill"></i>
//             Pending
//           </span>
//         );
//       case 'failed':
//         return (
//           <span className="badge bg-danger d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-x-circle-fill"></i>
//             Failed
//           </span>
//         );
//       case 'refunded':
//         return (
//           <span className="badge bg-info text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
//             <i className="bi bi-arrow-counterclockwise"></i>
//             Refunded
//           </span>
//         );
//       default:
//         return (
//           <span className="badge bg-secondary" style={{ fontSize: '0.85rem' }}>
//             {status || 'Unknown'}
//           </span>
//         );
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project Without Team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>💼 New Project</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <form>
//             <input
//               type='text'
//               placeholder="🔍 Search ..."
//               className='form-control'
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </form>

//           <div className="d-flex align-items-center gap-2">
//             <label className='mb-0'>Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => {
//                 setPage(1); 
//                 setLimit(Number(e.target.value));
//               }}
//             >
//               <option value={1}>1</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className='mb-0'>entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <section className='table-responsive bg-white'>
//           <div className="card rounded-4 newproject-card" style={{overflow:'auto'}}>
//             <div className="card-body p-4">
//               <table className="table table-hover table-bordered text-center align-middle newproject-table">
//                 <thead className="table-primary text-dark">
//                   <tr>
//                     <th>S. No.</th>
//                     <th>Package / Service</th>
//                     <th>Project ID</th>
//                     <th>Price ($)</th>
//                     <th>Payment Status</th>
//                     <th>Invoice Number</th>
//                     <th>Invoice</th>
//                     <th>Invoice Date</th>
//                     <th>Client ID</th>
//                     <th>Client Name</th>
//                     <th>Refund Request</th> {/* 🔥 New Column */}
//                     <th>Team</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="13" className="text-center py-4">
//                         <div className="spinner-border text-primary" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     <>
//                       {projects.length > 0 ? projects.map((cv, i) => (
//                         <tr key={i} className="newproject-row">
//                           <td className="fw-semibold">{(page - 1) * limit + i + 1}</td>

//                           <td>
//                             <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm text-capitalize">
//                               {cv.projectType === 'package' ? 'Custom Package' : cv.projectType}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="badge bg-dark text-white rounded-pill px-3 py-2 shadow-sm">
//                               {cv._id?.toString().slice(-5)}
//                             </span>
//                           </td>

//                           <td>
//                             <span className="fw-bold text-success">${cv.totalPrice}</span>
//                           </td>

//                           {/* 💰 Payment Status Column */}
//                           <td>
//                             <div className="d-flex flex-column align-items-center gap-1">
//                               {getPaymentStatusBadge(cv.payment)}
//                               {cv.payment && cv.payment.provider && (
//                                 <small className="text-muted text-capitalize">
//                                   via {cv.payment.provider}
//                                 </small>
//                               )}
//                               {cv.payment && cv.payment.refund?.isRefunded && (
//                                 <span className="badge bg-warning text-dark" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-triangle-fill"></i> Refunded
//                                 </span>
//                               )}
//                               {cv.payment && cv.payment.dispute?.isDisputed && (
//                                 <span className="badge bg-danger" style={{ fontSize: '0.7rem' }}>
//                                   <i className="bi bi-exclamation-circle-fill"></i> Disputed
//                                 </span>
//                               )}
//                             </div>
//                           </td>

//                           {/* 🔢 Invoice Number Column */}
//                           <td>
//                             {cv.payment?.invoiceNumber ? (
//                               <div className="d-flex flex-column align-items-center">
//                                 <span className="text-dark px-2 py-1" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
//                                   <i className="bi bi-file-earmark-text"></i> {cv.payment.invoiceNumber}
//                                 </span>
//                                 {cv.payment.invoiceSent && (
//                                   <small className="text-success mt-1">
//                                     <i className="bi bi-check-circle-fill"></i> Sent
//                                   </small>
//                                 )}
//                               </div>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           {/* 📄 Invoice View Button Column */}
//                           <td>
//                             {cv.payment?.invoicePdfKey ? (
//                               <a 
//                                 href={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.payment.invoicePdfKey}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="btn btn-primary btn-sm shadow-sm"
//                               >
//                                 <i className="bi bi-file-earmark-pdf me-1"></i> View 
//                               </a>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           {/* 📅 Invoice Date Column */}
//                           <td>
//                             {cv.payment?.invoiceDate ? (
//                               <span className="text-dark" style={{ fontSize: '0.85rem' }}>
//                                 <i className="bi bi-calendar-check"></i> {cv.payment.invoiceDate}
//                               </span>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           <td>{cv.clientId}</td>

//                           <td className="fw-medium text-capitalize">{cv.clientName}</td>

//                           {/* 🔥 Refund Request Column */}
//                           <td>
//                             {cv.refundRequest?.requested ? (
//                               <div className="d-flex flex-column gap-1 align-items-center">
//                                 {cv.refundRequest.status === 'pending' && (
//                                   <button
//                                     className="btn btn-warning btn-sm shadow-sm"
//                                     onClick={() => handleOpenRefundModal(cv)}
//                                   >
//                                     <i className="bi bi-exclamation-circle me-1"></i>
//                                     View Request
//                                   </button>
//                                 )}
//                                 {cv.refundRequest.status === 'approved' && (
//                                   <span className="badge bg-success">
//                                     <i className="bi bi-check-circle-fill me-1"></i>
//                                     Approved
//                                   </span>
//                                 )}
//                                 {cv.refundRequest.status === 'rejected' && (
//                                   <span className="badge bg-danger">
//                                     <i className="bi bi-x-circle-fill me-1"></i>
//                                     Rejected
//                                   </span>
//                                 )}
//                               </div>
//                             ) : (
//                               <span className="text-muted">—</span>
//                             )}
//                           </td>

//                           <td>
//                             {cv.team ? (
//                               <span className="badge btn btn-outline-primary rounded-pill px-3 py-2 text-dark shadow-sm">
//                                 <i className="bi bi-check-circle-fill me-1"></i> Created
//                               </span>
//                             ) : (
//                               <Link to={`/dashboard/make-team/${cv._id}`}>
//                                 <button className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm">
//                                   <i className="fa-solid fa-user-plus me-1"></i> Add
//                                 </button>
//                               </Link>
//                             )}
//                           </td>

//                           <td>
//                             <Link to={`/dashboard/project/${cv._id}`}>
//                               <button className="btn btn-outline-warning btn-sm rounded-pill shadow-sm">
//                                 <i className="fa-solid fa-eye"></i>
//                               </button>
//                             </Link>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr>
//                           <td colSpan="13" className="text-muted py-4">No projects found.</td>
//                         </tr>
//                       )}
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handlePrevPage}
//                 disabled={page === 1}
//               >
//                 Previous
//               </button>
//               <span>Page {page} of {totalPages}</span>
//               <button
//                 className="btn btn-outline-primary"
//                 onClick={handleNextPage}
//                 disabled={page === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </section>
//       </Container>

//       {/* 🔥 Refund Request Modal */}
//       {showRefundModal && selectedRefundProject && (
//         <div
//           className="modal fade show d-block"
//           style={{ backgroundColor: 'rgba(0,0,0,0.6)',zIndex:'9999' }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               {/* Header */}
//               <div className="modal-header bg-warning text-dark">
//                 <h5 className="modal-title">
//                   <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                   Refund Request Details
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleCloseRefundModal}
//                 />
//               </div>

//               {/* Body */}
//               <div className="modal-body">
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <strong>Project ID:</strong>
//                     <p className="mb-0">{selectedRefundProject._id}</p>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>Client Name:</strong>
//                     <p className="mb-0 text-capitalize">{selectedRefundProject.clientName}</p>
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <strong>Project Type:</strong>
//                     <p className="mb-0 text-capitalize">{selectedRefundProject.projectType}</p>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>Total Price:</strong>
//                     <p className="mb-0 text-success fw-bold">${selectedRefundProject.totalPrice}</p>
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <strong>Requested At:</strong>
//                   <p className="mb-0">
//                     {new Date(selectedRefundProject.refundRequest.requestedAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="mb-3">
//                   <strong>Status:</strong>
//                   <p className="mb-0">
//                     <span className={`badge ${
//                       selectedRefundProject.refundRequest.status === 'pending' ? 'bg-warning text-dark' :
//                       selectedRefundProject.refundRequest.status === 'approved' ? 'bg-success' :
//                       'bg-danger'
//                     }`}>
//                       {selectedRefundProject.refundRequest.status.toUpperCase()}
//                     </span>
//                   </p>
//                 </div>

//                 <div className="mb-3">
//                   <strong>Reason for Refund:</strong>
//                   <div className="alert alert-light mt-2">
//                     <i className="bi bi-chat-left-quote me-2"></i>
//                     {selectedRefundProject.refundRequest.reason}
//                   </div>
//                 </div>

//                 {/* Payment Details */}
//                 {selectedRefundProject.payment && (
//                   <div className="border-top pt-3 mt-3">
//                     <h6 className="mb-3">Payment Information</h6>
//                     <div className="row">
//                       <div className="col-md-6 mb-2">
//                         <strong>Payment Status:</strong>
//                         <p className="mb-0">{selectedRefundProject.payment.status}</p>
//                       </div>
//                       <div className="col-md-6 mb-2">
//                         <strong>Payment Provider:</strong>
//                         <p className="mb-0 text-capitalize">{selectedRefundProject.payment.provider || 'N/A'}</p>
//                       </div>
//                       {selectedRefundProject.payment.invoiceNumber && (
//                         <div className="col-md-6 mb-2">
//                           <strong>Invoice Number:</strong>
//                           <p className="mb-0">{selectedRefundProject.payment.invoiceNumber}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleCloseRefundModal}
//                   disabled={refundActionLoading}
//                 >
//                   Close
//                 </button>

//                 {selectedRefundProject.refundRequest.status === 'pending' && (
//                   <>
//                     <button
//                       type="button"
//                       className="btn btn-danger d-flex align-items-center gap-2"
//                       onClick={() => handleRefundAction('rejected')}
//                       disabled={refundActionLoading}
//                     >
//                       <i className="bi bi-x-circle"></i>
//                       <span>Reject</span>
//                       {refundActionLoading && (
//                         <div className="spinner-border spinner-border-sm" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                       )}
//                     </button>

//                     <button
//                       type="button"
//                       className="btn btn-success d-flex align-items-center gap-2"
//                       onClick={() => handleRefundAction('approved')}
//                       disabled={refundActionLoading}
//                     >
//                       <i className="bi bi-check-circle"></i>
//                       <span>Approve Refund</span>
//                       {refundActionLoading && (
//                         <div className="spinner-border spinner-border-sm" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                       )}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default WithoutTeamProjectPage;






import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Url } from 'src/url/url';

const WithoutTeamProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  // 🔥 Refund Modal States
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedRefundProject, setSelectedRefundProject] = useState(null);
  const [refundActionLoading, setRefundActionLoading] = useState(false);

  const fetchProjects = async (currentPage, currentLimit = limit) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Url}/project/pending?page=${currentPage}&limit=${currentLimit}`);
      setProjects(response.data.data || []);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching project data:', err);
      toast.error("Failed to load projects");
    }
    setLoading(false);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/project/searchNewProject?page=1&limit=${limit}&search=${value}`);
      setProjects(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setPage(1);
    } catch (err) {
      console.error('Error searching projects:', err);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page, limit);
  }, [page, limit]);

  useEffect(() => {
    if (search.trim() === '') {
      fetchProjects(1, limit);
      setPage(1);
    }
  }, [search]);

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  // 🔥 Open Refund Modal
  const handleOpenRefundModal = (project) => {
    setSelectedRefundProject(project);
    setShowRefundModal(true);
  };

  // 🔥 Close Refund Modal
  const handleCloseRefundModal = () => {
    setShowRefundModal(false);
    setSelectedRefundProject(null);
  };

  // 🔥 Handle Refund Action (Approve/Reject)
  const handleRefundAction = async (action) => {
    if (!selectedRefundProject) return;

    setRefundActionLoading(true);
    try {
      const adminId = 1; // 🔥 Replace with actual admin ID from auth/session
      
      const response = await axios.post(`${Url}/project/refund-review`, {
        projectId: selectedRefundProject._id,
        action: action, // "approved" or "rejected"
        adminId: adminId,
        note: action === 'approved' ? 'Refund approved by admin' : 'Refund rejected by admin'
      });

      if (response.data.success) {
        toast.success(response.data.message || `Refund ${action} successfully!`);
        handleCloseRefundModal();
        fetchProjects(page, limit); // Refresh the list
      } else {
        toast.error(response.data.message || `Failed to ${action} refund`);
      }
    } catch (error) {
      console.error('Refund action error:', error);
      toast.error('An error occurred while processing the refund');
    } finally {
      setRefundActionLoading(false);
    }
  };

  // Helper function to get payment status badge
  const getPaymentStatusBadge = (payment) => {
    if (!payment) {
      return <span className="badge bg-secondary">No Payment</span>;
    }

    const status = payment.status?.toLowerCase();
    
    switch(status) {
      case 'completed':
        return (
          <span className="badge bg-success d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-check-circle-fill"></i>
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="badge bg-warning text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-clock-fill"></i>
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="badge bg-danger d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-x-circle-fill"></i>
            Failed
          </span>
        );
      case 'refunded':
        return (
          <span className="badge bg-info text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-arrow-counterclockwise"></i>
            Refunded
          </span>
        );
      default:
        return (
          <span className="badge bg-secondary" style={{ fontSize: '0.85rem' }}>
            {status || 'Unknown'}
          </span>
        );
    }
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Project Without Team</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>💼 New Project</Typography>
        </Stack>
      </Container>

      <Container>
        <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
          <form>
            <input
              type='text'
              placeholder="🔍 Search ..."
              className='form-control'
              value={search}
              onChange={handleSearchChange}
            />
          </form>

          <div className="d-flex align-items-center gap-2">
            <label className='mb-0'>Show</label>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={limit}
              onChange={(e) => {
                setPage(1); 
                setLimit(Number(e.target.value));
              }}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <label className='mb-0'>entries</label>
          </div>
        </div>
      </Container>

      <Container>
        <section className='table-responsive bg-white'>
          <div className="card rounded-4 newproject-card" style={{overflow:'auto'}}>
            <div className="card-body p-4">
              <table className="table table-hover table-bordered text-center align-middle newproject-table">
                <thead className="table-primary text-dark">
                  <tr>
                    <th>S. No.</th>
                    <th>Package / Service</th>
                    <th>Project ID</th>
                    <th>Price ($)</th>
                    <th>Payment Status</th>
                    <th>Invoice Number</th>
                    <th>Invoice</th>
                    <th>Invoice Date</th>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Refund Request</th>
                    <th>Team</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="13" className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {projects.length > 0 ? projects.map((cv, i) => (
                        <tr key={i} className="newproject-row">
                          <td className="fw-semibold">{(page - 1) * limit + i + 1}</td>

                          <td>
                            <span className="badge bg-white text-dark px-3 py-2 rounded-pill shadow-sm text-capitalize">
                              {cv.projectType === 'package' ? 'Custom Package' : cv.projectType}
                            </span>
                          </td>

                          <td>
                            <span className="badge bg-dark text-white rounded-pill px-3 py-2 shadow-sm">
                              {cv._id?.toString().slice(-5)}
                            </span>
                          </td>

                          <td>
                            <span className="fw-bold text-success">${cv.totalPrice}</span>
                          </td>

                          {/* 💰 Payment Status Column */}
                          <td>
                            <div className="d-flex flex-column align-items-center gap-1">
                              {getPaymentStatusBadge(cv.payment)}
                              {cv.payment && cv.payment.provider && (
                                <small className="text-muted text-capitalize">
                                  via {cv.payment.provider}
                                </small>
                              )}
                              {cv.payment && cv.payment.refund?.isRefunded && (
                                <span className="badge bg-warning text-dark" style={{ fontSize: '0.7rem' }}>
                                  <i className="bi bi-exclamation-triangle-fill"></i> Refunded
                                </span>
                              )}
                              {cv.payment && cv.payment.dispute?.isDisputed && (
                                <span className="badge bg-danger" style={{ fontSize: '0.7rem' }}>
                                  <i className="bi bi-exclamation-circle-fill"></i> Disputed
                                </span>
                              )}
                            </div>
                          </td>

                          {/* 🔢 Invoice Number Column */}
                          <td>
                            {cv.payment?.invoiceNumber ? (
                              <div className="d-flex flex-column align-items-center">
                                <span className="text-dark px-2 py-1" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                  <i className="bi bi-file-earmark-text"></i> {cv.payment.invoiceNumber}
                                </span>
                                {cv.payment.invoiceSent && (
                                  <small className="text-success mt-1">
                                    <i className="bi bi-check-circle-fill"></i> Sent
                                  </small>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>

                          {/* 📄 Invoice View Button Column */}
                          <td>
                            {cv.payment?.invoicePdfKey ? (
                              <a 
                                href={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.payment.invoicePdfKey}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm shadow-sm"
                              >
                                <i className="bi bi-file-earmark-pdf me-1"></i> View 
                              </a>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>

                          {/* 📅 Invoice Date Column */}
                          <td>
                            {cv.payment?.invoiceDate ? (
                              <span className="text-dark" style={{ fontSize: '0.85rem' }}>
                                <i className="bi bi-calendar-check"></i> {cv.payment.invoiceDate}
                              </span>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>

                          <td>{cv.clientId}</td>

                          <td className="fw-medium text-capitalize">{cv.clientName}</td>

                          {/* 🔥 Refund Request Column */}
                          <td>
                            {cv.refundRequest?.requested ? (
                              <div className="d-flex flex-column gap-1 align-items-center">
                                {cv.refundRequest.status === 'pending' && (
                                  <button
                                    className="btn btn-warning btn-sm shadow-sm"
                                    onClick={() => handleOpenRefundModal(cv)}
                                  >
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    View Request
                                  </button>
                                )}
                                {cv.refundRequest.status === 'processing' && (
                                  <span className="badge bg-info text-white">
                                    <i className="bi bi-hourglass-split me-1"></i>
                                    Processing
                                  </span>
                                )}
                                {cv.refundRequest.status === 'approved' && (
                                  <span className="badge bg-success">
                                    <i className="bi bi-check-circle-fill me-1"></i>
                                    Approved
                                  </span>
                                )}
                                {cv.refundRequest.status === 'rejected' && (
                                  <span className="badge bg-danger">
                                    <i className="bi bi-x-circle-fill me-1"></i>
                                    Rejected
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>

                          <td>
                            {cv.team ? (
                              <span className="badge btn btn-outline-primary rounded-pill px-3 py-2 text-dark shadow-sm">
                                <i className="bi bi-check-circle-fill me-1"></i> Created
                              </span>
                            ) : (
                              <Link to={`/dashboard/make-team/${cv._id}`}>
                                <button className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm">
                                  <i className="fa-solid fa-user-plus me-1"></i> Add
                                </button>
                              </Link>
                            )}
                          </td>

                          <td>
                            <Link to={`/dashboard/project/${cv._id}`}>
                              <button className="btn btn-outline-warning btn-sm rounded-pill shadow-sm">
                                <i className="fa-solid fa-eye"></i>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="13" className="text-muted py-4">No projects found.</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-outline-primary"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                className="btn btn-outline-primary"
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </Container>

      {/* 🔥 Refund Request Modal */}
      {showRefundModal && selectedRefundProject && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: '9999' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Refund Request Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseRefundModal}
                />
              </div>

              {/* Body */}
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Project ID:</strong>
                    <p className="mb-0">{selectedRefundProject._id}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Client Name:</strong>
                    <p className="mb-0 text-capitalize">{selectedRefundProject.clientName}</p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Project Type:</strong>
                    <p className="mb-0 text-capitalize">{selectedRefundProject.projectType}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Total Price:</strong>
                    <p className="mb-0 text-success fw-bold">${selectedRefundProject.totalPrice}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Requested At:</strong>
                  <p className="mb-0">
                    {new Date(selectedRefundProject.refundRequest.requestedAt).toLocaleString()}
                  </p>
                </div>

                <div className="mb-3">
                  <strong>Status:</strong>
                  <p className="mb-0">
                    <span className={`badge ${
                      selectedRefundProject.refundRequest.status === 'pending' ? 'bg-warning text-dark' :
                      selectedRefundProject.refundRequest.status === 'processing' ? 'bg-info text-white' :
                      selectedRefundProject.refundRequest.status === 'approved' ? 'bg-success' :
                      'bg-danger'
                    }`}>
                      {selectedRefundProject.refundRequest.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className="mb-3">
                  <strong>Reason for Refund:</strong>
                  <div className="alert alert-light mt-2">
                    <i className="bi bi-chat-left-quote me-2"></i>
                    {selectedRefundProject.refundRequest.reason}
                  </div>
                </div>

                {/* Payment Details */}
                {selectedRefundProject.payment && (
                  <div className="border-top pt-3 mt-3">
                    <h6 className="mb-3">Payment Information</h6>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <strong>Payment Status:</strong>
                        <p className="mb-0 text-capitalize">{selectedRefundProject.payment.status}</p>
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>Payment Provider:</strong>
                        <p className="mb-0 text-capitalize">{selectedRefundProject.payment.provider || 'N/A'}</p>
                      </div>
                      {selectedRefundProject.payment.invoiceNumber && (
                        <div className="col-md-6 mb-2">
                          <strong>Invoice Number:</strong>
                          <p className="mb-0">{selectedRefundProject.payment.invoiceNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseRefundModal}
                  disabled={refundActionLoading}
                >
                  Close
                </button>

                {selectedRefundProject.refundRequest.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger d-flex align-items-center gap-2"
                      onClick={() => handleRefundAction('rejected')}
                      disabled={refundActionLoading}
                    >
                      <i className="bi bi-x-circle"></i>
                      <span>Reject</span>
                      {refundActionLoading && (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn btn-success d-flex align-items-center gap-2"
                      onClick={() => handleRefundAction('approved')}
                      disabled={refundActionLoading}
                    >
                      <i className="bi bi-check-circle"></i>
                      <span>Approve Refund</span>
                      {refundActionLoading && (
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithoutTeamProjectPage;
