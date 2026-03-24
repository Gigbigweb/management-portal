// import React from 'react'
// import { Helmet } from 'react-helmet-async';
// import {Button, Container, Stack, Typography} from '@mui/material'; 
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';


// import { Url } from '../url/url';

// const ClientPage = () => {
//     const userAllData = useSelector(store => store.client.data) 

//   return (
//     <>
//     <Helmet>
//         <title> Dashboard: Products | Minimal UI </title>
//     </Helmet> 
//     <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Client
//           </Typography> 
//         </Stack> 
//       </Container>
//       <Container className=' '>
//           <div className='d-flex align-items-center justify-content-between felx-wrap bg-lightgray rounded-top p-3'>
//             <div>
//               <form>
//                 <input type='text'  placeholder='Search' className='form-control' />
//               </form>
//             </div> 
//             <div>
//               <div className='d-flex align-items-center '>
//                   <p className='mb-0 me-2 '>Total User : </p>
//                   <h4 className='text-primary fw-bold mb-0'>{userAllData.length}</h4>
//               </div>
//             </div> 
//           </div>
//       </Container>
//       <Container>
//         <section className='table-responsive'>
//             <table className='table table-striped table-bordered text-center table-hover align-top'>
//                 <thead className='table-primary'>
//                     <tr className='align-top'>
//                         <th>S. No.</th>
//                         <th>User Name</th>
//                         <th>User Email</th> 
//                         <th>Client id</th> 
//                         <th>Verified</th> 
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>  
//                     {userAllData.map((cv, i)=>{
//                         return(
//                             <tr className='text-center' key={i}>
//                                 <td>{i + 1}</td> 
//                                 <td className=''>{cv.name}</td>
//                                 <td  className=''>{cv.email}</td>
//                                 <td  className=''>{cv._id}</td>
//                                 <td  className=''>{JSON.parse(cv.verified) ? <p className="text-success">Verify</p> : <p className="text-warning">Unverify</p>}</td> 
//                                 <td  >
//                                     <div className='d-flex align-items-center justify-content-center'>
//                                     <button className='btn border-0'>
//                                         <i className="fa-solid fa-ban text-danger fa-lg"  /> 
//                                     </button>
//                                     <Link className='btn border-0' > 
//                                         <i className="fa-solid fa-eye text-primary fa-lg" />  
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

// export default ClientPage




















// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Button, Container, Stack, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';


// const ClientPage = () => {
//   const userAllData = useSelector(store => store.client.data);

//   return (
//     <>
//       <Helmet>
//         <title>Client Dashboard | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Client Overview
//           </Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm">
//           <div className="clientpage-search">
//             <input type="text" placeholder="Search Clients..." className="form-control shadow-sm" />
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <p className="mb-0 fw-medium text-secondary">Total Users:</p>
//             <h4 className="text-primary fw-bold mb-0">{userAllData.length}</h4>
//           </div>
//         </div>
//       </Container>

//       <Container className="pt-4">
//         <section className="table-responsive clientpage-table">
//           <table className="table table-bordered align-middle text-center shadow-sm">
//             <thead className="clientpage-thead">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Client ID</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userAllData.map((cv, i) => (
//                 <tr key={i}>
//                   <td>{i + 1}</td>
//                   <td>{cv.name}</td>
//                   <td>{cv.email}</td>
//                   <td>{cv._id}</td>
//                   <td>
//                     {JSON.parse(cv.verified) ? (
//                       <span className="badge bg-success">Verified</span>
//                     ) : (
//                       <span className="badge bg-warning text-dark">Unverified</span>
//                     )}
//                   </td>
//                   <td>
//                     <div className="d-flex justify-content-center gap-2">
//                       <button className="btn btn-sm btn-outline-danger rounded-circle" title="Block">
//                         <i className="fa-solid fa-ban" />
//                       </button>
//                       <Link className="btn btn-sm btn-outline-primary rounded-circle" title="View">
//                         <i className="fa-solid fa-eye" />
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default ClientPage;






// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import axios from 'axios';
// import { Url } from '../url/url';
// import { Link } from 'react-router-dom';

// const ClientPage = () => {
//   const [clientData, setClientData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [total, setTotal] = useState(0);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Url}/client/all`, {
//         params: { page, limit, search },
//       });
//       setClientData(res.data.data);
//       setTotal(res.data.total);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, [page, limit, search]);

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <>
//       <Helmet>
//         <title>Client Dashboard | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//           🕵️‍♂️ Client Overview
//           </Typography>
//         </Stack>

//         <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm bg-light">
//           <div className="clientpage-search">
//             <input
//               type="text"
//               placeholder="Search Clients..."
//               className="form-control shadow-sm"
//               value={search}
//               onChange={(e) => {
//                 setPage(1);
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>
//           <div className="d-flex align-items-center gap-3">
//             <div className="d-flex align-items-center gap-2">
//               <p className="mb-0 fw-medium text-secondary">Total Clients:</p>
//               <h5 className="text-primary fw-bold mb-0">{total}</h5>
//             </div>
//             <div>
//               <select
//                 className="form-select"
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//               >
//                 <option value="1">1</option>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="25">25</option>
//                 <option value="50">50</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="pt-4 table-responsive clientpage-table">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" />
//             </div>
//           ) : (
//             <table className="table table-bordered align-middle text-center shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Client ID</th>
//                   <th>Status</th>
//                   {/* <th>Action</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {clientData.map((cv, i) => (
//                   <tr key={i}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td> <Link className='text-primary text-decoration-underline' to={`/dashboard/Client-view/${cv._id}`} >{cv.name}    </Link></td>
//                     <td>{cv.email}</td>
//                     <td>{cv._id}</td>
//                     <td>
//                       {JSON.parse(cv.verified) ? (
//                         <span className="badge bg-success">Verified</span>
//                       ) : (
//                         <span className="badge bg-warning text-dark">Unverified</span>
//                       )}
//                     </td>
//                     {/* <td>
//                       <div className="d-flex justify-content-center gap-2">
//                         <button className="btn btn-sm btn-outline-danger rounded-circle" title="Block">
//                           <i className="fa-solid fa-ban" />
//                         </button>
//                         <Link to={`/dashboard/Client-view/${cv._id}`} className="btn btn-sm btn-outline-primary rounded-circle" title="View">
//                           <i className="fa-solid fa-eye" />
//                         </Link>
//                       </div>
//                     </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

  
// {!loading && totalPages > 1 &&  (
//   <div className="d-flex justify-content-between align-items-center mt-3">
//     <p className="mb-0">
//       Showing   {Math.min(page * limit, total)} of {total} entries
//     </p>
//     <ul className="pagination mb-0">
//       <li className={`page-item ${page === 1 && 'disabled'}`}>
//         <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
//       </li>
//       {[...Array(totalPages)].map((_, i) => (
//         <li key={i} className={`page-item ${page === i + 1 && 'active'}`}>
//           <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
//         </li>
//       ))}
//       <li className={`page-item ${page === totalPages && 'disabled'}`}>
//         <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
//       </li>
//     </ul>
//   </div>
// )}


//       </Container>
//     </>
//   );
// };

// export default ClientPage;



// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import axios from 'axios';
// import { Url } from '../url/url';
// import { Link } from 'react-router-dom';

// const ClientPage = () => {
//   const [clientData, setClientData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [total, setTotal] = useState(0);
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('All');

//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Url}/client/all`, {
//         params: {
//           page,
//           limit,
//           search,
//           ...(activeTab === 'Verified' && { verified: 'true' }),
//           ...(activeTab === 'Unverified' && { verified: 'false' }),
//         },
//       });
//       setClientData(res.data.data);
//       setTotal(res.data.total);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, [page, limit, search, activeTab]);

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <>
//       <Helmet>
//         <title>Client Dashboard | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             🕵️‍♂️ Client Overview
//           </Typography>
//         </Stack>

//         <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm bg-light">
//           <div className="clientpage-search">
//             <input
//               type="text"
//               placeholder="Search Clients..."
//               className="form-control shadow-sm"
//               value={search}
//               onChange={(e) => {
//                 setPage(1);
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>
//           <div className="d-flex align-items-center gap-3">
//             <div className="d-flex align-items-center gap-2">
//               <p className="mb-0 fw-medium text-secondary">Total Clients:</p>
//               <h5 className="text-primary fw-bold mb-0">{total}</h5>
//             </div>
//             <div>
//               <select
//                 className="form-select"
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//               >
//                 <option value="1">1</option>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="25">25</option>
//                 <option value="50">50</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Bootstrap Nav Tabs */}
//         <ul className="nav nav-tabs mt-4">
//           {['All', 'Verified', 'Unverified','domestic','international'].map((tab) => (
//             <li key={tab} className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === tab ? 'active' : ''}`}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setPage(1);
//                 }}
//               >
//                 {tab}
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div className="pt-4 table-responsive clientpage-table">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" />
//             </div>
//           ) : (
//             <table className="table table-bordered align-middle text-center shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Country</th>
//                   <th>State</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clientData.length === 0 ? (
//                   <tr>
//                     <td colSpan="5">No clients found</td>
//                   </tr>
//                 ) : (
//                   clientData.map((cv, i) => (
//                     <tr key={cv._id}>
//                       <td>{(page - 1) * limit + i + 1}</td>
//                       <td>
//                         <Link
//                           className="text-primary text-decoration-underline"
//                           to={`/dashboard/client-view/${cv._id}`}
//                         >
//                           {cv.name}
//                         </Link>
//                       </td>
//                       <td>{cv.email}</td>

//                       <td>{cv.country}</td>
//                       <td>{cv.state}</td>
//                       <td>{cv._id}</td>
//                       <td>
//                         {cv.verified ? (
//                           <span className="badge bg-success">Verified</span>
//                         ) : (
//                           <span className="badge bg-warning text-dark">Unverified</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>













//         {!loading && totalPages > 1 && (
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <p className="mb-0">
//               Showing {Math.min(page * limit, total)} of {total} entries
//             </p>
//             <ul className="pagination mb-0">
//               <li className={`page-item ${page === 1 && 'disabled'}`}>
//                 <button className="page-link" onClick={() => setPage(page - 1)}>
//                   Previous
//                 </button>
//               </li>
//               {[...Array(totalPages)].map((_, i) => (
//                 <li key={i} className={`page-item ${page === i + 1 && 'active'}`}>
//                   <button className="page-link" onClick={() => setPage(i + 1)}>
//                     {i + 1}
//                   </button>
//                 </li>
//               ))}
//               <li className={`page-item ${page === totalPages && 'disabled'}`}>
//                 <button className="page-link" onClick={() => setPage(page + 1)}>
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// };

// export default ClientPage;






// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import axios from 'axios';
// import { Url } from '../url/url';
// import { Link } from 'react-router-dom';

// const ClientPage = () => {
//   const [allClients, setAllClients] = useState([]); 
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('All');
//   const [selectedState, setSelectedState] = useState('');

//   // ✅ Sirf ek baar sab fetch karo
//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Url}/client/all`, {
//         params: { limit: 10000 }, // sab aa jaye
//       });
//       setAllClients(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   // ✅ Tab + Search + State — sab frontend pe filter
//   const filteredClients = allClients.filter((c) => {
//     const country = c.country?.toLowerCase() || '';
//     const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
//     const email = c.email?.toLowerCase() || '';

//     // Tab filter
//     if (activeTab === 'Verified' && !c.verified) return false;
//     if (activeTab === 'Unverified' && c.verified) return false;
//     if (activeTab === 'domestic' && !country.includes('india')) return false;
//     if (activeTab === 'international' && (country.includes('india') || !country)) return false;

//     // Search filter
//     if (search && !fullName.includes(search.toLowerCase()) && !email.includes(search.toLowerCase())) return false;

//     // State filter
//     if (selectedState && c.state?.toLowerCase() !== selectedState.toLowerCase()) return false;

//     return true;
//   });

//   // ✅ Unique states — current tab ke filtered clients se
//   const statesForDropdown = [
//     ...new Set(
//       allClients
//         .filter((c) => {
//           const country = c.country?.toLowerCase() || '';
//           if (activeTab === 'domestic') return country.includes('india');
//           if (activeTab === 'international') return !country.includes('india') && country;
//           return true;
//         })
//         .map((c) => c.state)
//         .filter(Boolean)
//     ),
//   ].sort();

//   // ✅ Pagination — filtered data pe
//   const totalFiltered = filteredClients.length;
//   const totalPages = Math.ceil(totalFiltered / limit);
//   const paginatedClients = filteredClients.slice((page - 1) * limit, page * limit);

//   return (
//     <>
//       <Helmet>
//         <title>Client Dashboard | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             🕵️‍♂️ Client Overview
//           </Typography>
//         </Stack>

//         <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm bg-light">
//           <div className="clientpage-search">
//             <input
//               type="text"
//               placeholder="Search Clients..."
//               className="form-control shadow-sm"
//               value={search}
//               onChange={(e) => {
//                 setPage(1);
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>

//           <div className="d-flex align-items-center gap-3">
//             <div className="d-flex align-items-center gap-2">
//               <p className="mb-0 fw-medium text-secondary">Total Clients:</p>
//               {/* ✅ Tab ke hisab se count dikhao */}
//               <h5 className="text-primary fw-bold mb-0">{totalFiltered}</h5>
//             </div>

//             <div>
//               <select
//                 className="form-select"
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//               >
//                 <option value="1">1</option>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="25">25</option>
//                 <option value="50">50</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <ul className="nav nav-tabs mt-4">
//           {['All', 'Verified', 'Unverified', 'domestic', 'international'].map((tab) => (
//             <li key={tab} className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === tab ? 'active' : ''}`}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setSelectedState(''); // ✅ Tab change pe state reset
//                   setPage(1);
//                 }}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* ✅ State Dropdown — sirf domestic/international pe dikhao */}
//         {(activeTab === 'domestic' || activeTab === 'international') && (
//           <div className="mt-3 d-flex align-items-center gap-3">
//             <label className="fw-semibold mb-0">Filter by State:</label>
//             <select
//               className="form-select w-auto"
//               value={selectedState}
//               onChange={(e) => {
//                 setSelectedState(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="">All States</option>
//               {statesForDropdown.map((state) => (
//                 <option key={state} value={state}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//             {selectedState && (
//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={() => { setSelectedState(''); setPage(1); }}
//               >
//                 ✕ Clear
//               </button>
//             )}
//           </div>
//         )}

//         {/* Table */}
//         <div className="pt-4 table-responsive clientpage-table">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" />
//             </div>
//           ) : (
//             <table className="table table-bordered align-middle text-center shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Country</th>
//                   <th>State</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedClients.length === 0 ? (
//                   <tr>
//                     <td colSpan="6">No clients found</td>
//                   </tr>
//                 ) : (
//                   paginatedClients.map((cv, i) => (
//                     <tr key={cv._id}>
//                       <td>{(page - 1) * limit + i + 1}</td>
//                       <td>
//                         <Link
//                           className="text-primary text-decoration-underline"
//                           to={`/dashboard/client-view/${cv._id}`}
//                         >
//                           {cv.firstName} {cv.lastName}
//                         </Link>
//                       </td>
//                       <td>{cv.email}</td>
//                       <td>{cv.country}</td>
//                       <td>{cv.state}</td>
//                       <td>
//                         {cv.verified ? (
//                           <span className="badge bg-success">Verified</span>
//                         ) : (
//                           <span className="badge bg-warning text-dark">Unverified</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <p className="mb-0">
//               Showing {Math.min(page * limit, totalFiltered)} of {totalFiltered} entries
//             </p>

//             <ul className="pagination mb-0">
//               <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                 <button className="page-link" onClick={() => setPage(page - 1)}>
//                   Previous
//                 </button>
//               </li>

//               {[...Array(totalPages)].map((_, i) => (
//                 <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
//                   <button className="page-link" onClick={() => setPage(i + 1)}>
//                     {i + 1}
//                   </button>
//                 </li>
//               ))}

//               <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                 <button className="page-link" onClick={() => setPage(page + 1)}>
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// };

// export default ClientPage;












// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import axios from 'axios';
// import { Url } from '../url/url';
// import { Link } from 'react-router-dom';

// const ClientPage = () => {
//   const [allClients, setAllClients] = useState([]);
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('All');
//   const [selectedState, setSelectedState] = useState('');
// const [showDropdown, setShowDropdown] = useState(false);
//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Url}/client/all`, {
//         params: { limit: 10000 },
//       });
//       setAllClients(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);



//   const filteredClients = allClients.filter((c) => {
//     const country = c.country?.toLowerCase() || '';
//     const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
//     const email = c.email?.toLowerCase() || '';

//     if (activeTab === 'Verified' && !c.verified) return false;
//     if (activeTab === 'Unverified' && c.verified) return false;
//     if (activeTab === 'domestic' && !country.includes('india')) return false;
//     if (activeTab === 'international' && (country.includes('india') || !country)) return false;

//     if (search && !fullName.includes(search.toLowerCase()) && !email.includes(search.toLowerCase())) return false;
//     if (selectedState && c.state?.toLowerCase() !== selectedState.toLowerCase()) return false;

//     return true;
//   });

//   const statesForDropdown = [
//     ...new Set(
//       allClients
//         .filter((c) => {
//           const country = c.country?.toLowerCase() || '';
//           if (activeTab === 'domestic') return country.includes('india');
//           if (activeTab === 'international') return !country.includes('india') && country;
//           return true;
//         })
//         .map((c) => c.state)
//         .filter(Boolean)
//     ),
//   ].sort();

//   const totalFiltered = filteredClients.length;
//   const totalPages = Math.ceil(totalFiltered / limit);
//   const paginatedClients = filteredClients.slice((page - 1) * limit, page * limit);

//   // ✅ CSV Download Function
//   const downloadCSV = (data, filename) => {
//     if (data.length === 0) {
//       alert('No data to download!');
//       return;
//     }

//     const headers = ['#', 'First Name', 'Last Name', 'Email', 'Country', 'State', 'Status'];
//     const rows = data.map((c, i) => [
//       i + 1,
//       c.firstName || '',
//       c.lastName || '',
//       c.email || '',
//       c.country || '',
//       c.state || '',
//       c.verified ? 'Verified' : 'Unverified',
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
//       .join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${filename}.csv`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   // ✅ Saare download options
//   const handleDownload = (type) => {
//     console.log("working")
//     const domesticClients = allClients.filter((c) => c.country?.toLowerCase().includes('india'));
//     const internationalClients = allClients.filter(
//       (c) => c.country && !c.country.toLowerCase().includes('india')
//     );

//     switch (type) {
//       case 'current':
//         // Jo abhi screen pe filter ho raha hai wahi download
//         downloadCSV(filteredClients, `clients_${activeTab}${selectedState ? `_${selectedState}` : ''}`);
//         break;

//       case 'all':
//         downloadCSV(allClients, 'all_clients');
//         break;

//       case 'domestic':
//         downloadCSV(domesticClients, 'domestic_clients_india');
//         break;

//       case 'international':
//         downloadCSV(internationalClients, 'international_clients');
//         break;

//       case 'domestic_statewise':
//         // Domestic clients grouped by state — ek file mein sab states
//         const domesticSorted = [...domesticClients].sort((a, b) =>
//           (a.state || '').localeCompare(b.state || '')
//         );
//         downloadCSV(domesticSorted, 'domestic_clients_statewise');
//         break;

//       case 'international_statewise':
//         // International clients grouped by state/region
//         const intlSorted = [...internationalClients].sort((a, b) =>
//           (a.country || '').localeCompare(b.country || '') ||
//           (a.state || '').localeCompare(b.state || '')
//         );
//         downloadCSV(intlSorted, 'international_clients_statewise');
//         break;

//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Client Dashboard | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//              Client Overview
//           </Typography>
//         </Stack>

//         <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm bg-light">
//           <div className="clientpage-search">
//             <input
//               type="text"
//               placeholder="Search Clients..."
//               className="form-control shadow-sm"
//               value={search}
//               onChange={(e) => {
//                 setPage(1);
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>

//           <div className="d-flex align-items-center gap-3 flex-wrap">
//             <div className="d-flex align-items-center gap-2">
//               <p className="mb-0 fw-medium text-secondary">Total Clients:</p>
//               <h5 className="text-primary fw-bold mb-0">{totalFiltered}</h5>
//             </div>

//             <div>
//               <select
//                 className="form-select"
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//               >
//                 <option value="1">1</option>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="25">25</option>
//                 <option value="50">50</option>
//               </select>
//             </div>

// <div className="dropdown position-relative">
//   <button
//     className="btn btn-success dropdown-toggle d-flex align-items-center gap-2"
//     type="button"
//     onClick={() => setShowDropdown((prev) => !prev)}
//   >
//     Download CSV
//   </button>

//   {showDropdown && (
//     <ul
//       className="dropdown-menu dropdown-menu-end shadow show"
//       style={{ position: 'absolute', right: 0, zIndex: 1000 }}
//     >
//       <li>
//         <h6 className="dropdown-header text-muted">Current View</h6>
//       </li>
//       <li>
//         <button className="dropdown-item" onClick={() => { handleDownload('current'); setShowDropdown(false); }}>
//          download ({totalFiltered} clients)
//         </button>
//       </li>

//       {/* <li><hr className="dropdown-divider" /></li>
//       <li>
//         <h6 className="dropdown-header text-muted">All Clients</h6>
//       </li>
//       <li>
//         <button className="dropdown-item" onClick={() => { handleDownload('all'); setShowDropdown(false); }}>
//           👥 All Clients ({allClients.length})
//         </button>
//       </li>

//       <li><hr className="dropdown-divider" /></li>
//       <li>
//         <h6 className="dropdown-header text-muted">Domestic (India)</h6>
//       </li>
//       <li>
//         <button className="dropdown-item" onClick={() => { handleDownload('domestic'); setShowDropdown(false); }}>
//           🇮🇳 All Domestic Clients
//         </button>
//       </li>
//       <li>
//         <button className="dropdown-item" onClick={() => { handleDownload('domestic_statewise'); setShowDropdown(false); }}>
//           🗂️ Domestic — State Wise
//         </button>
//       </li>

//       <li><hr className="dropdown-divider" /></li>
//       <li>
//         <h6 className="dropdown-header text-muted">International</h6>
//       </li>
//       <li>
//         <button className="dropdown-item" onClick={() => { handleDownload('international'); setShowDropdown(false); }}>
//           🌍 All International Clients
//         </button>
//       </li>
//       <li>
//         <button className="dropdown-item" onClick={() => { handleDownload('international_statewise'); setShowDropdown(false); }}>
//           🗂️ International — Country/State Wise
//         </button>
//       </li> */}
//     </ul>
//   )}
// </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <ul className="nav nav-tabs mt-4">
//           {['All', 'Verified', 'Unverified', 'domestic', 'international'].map((tab) => (
//             <li key={tab} className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === tab ? 'active' : ''}`}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setSelectedState('');
//                   setPage(1);
//                 }}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* State Dropdown */}
//         {(activeTab === 'domestic' || activeTab === 'international') && (
//           <div className="mt-3 d-flex align-items-center gap-3">
//             <label className="fw-semibold mb-0">Filter by State:</label>
//             <select
//               className="form-select w-auto"
//               value={selectedState}
//               onChange={(e) => {
//                 setSelectedState(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="">All States</option>
//               {statesForDropdown.map((state) => (
//                 <option key={state} value={state}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//             {selectedState && (
//               <button
//                 className="btn btn-sm btn-outline-secondary"
//                 onClick={() => { setSelectedState(''); setPage(1); }}
//               >
//                 ✕ Clear
//               </button>
//             )}
//           </div>
//         )}

//         {/* Table */}
//         <div className="pt-4 table-responsive clientpage-table">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" />
//             </div>
//           ) : (
//             <table className="table table-bordered align-middle text-center shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Country</th>
//                   <th>State</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedClients.length === 0 ? (
//                   <tr>
//                     <td colSpan="6">No clients found</td>
//                   </tr>
//                 ) : (
//                   paginatedClients.map((cv, i) => (
//                     <tr key={cv._id}>
//                       <td>{(page - 1) * limit + i + 1}</td>
//                       <td>
//                         <Link
//                           className="text-primary text-decoration-underline"
//                           to={`/dashboard/client-view/${cv._id}`}
//                         >
//                           {cv.firstName} {cv.lastName}
//                         </Link>
//                       </td>
//                       <td>{cv.email}</td>
//                       <td>{cv.country}</td>
//                       <td>{cv.state}</td>
//                       <td>
//                         {cv.verified ? (
//                           <span className="badge bg-success">Verified</span>
//                         ) : (
//                           <span className="badge bg-warning text-dark">Unverified</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <p className="mb-0">
//               Showing {Math.min(page * limit, totalFiltered)} of {totalFiltered} entries
//             </p>
//             <ul className="pagination mb-0">
//               <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                 <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
//               </li>
//               {[...Array(totalPages)].map((_, i) => (
//                 <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
//                   <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
//                 </li>
//               ))}
//               <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                 <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// };

// export default ClientPage;










// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import axios from 'axios';
// import { Url } from '../url/url';
// import { Link } from 'react-router-dom';

// const ClientPage = () => {
//   const [allClients, setAllClients] = useState([]);
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('All');
//   const [selectedState, setSelectedState] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showStateStats, setShowStateStats] = useState(true);

//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${Url}/client/all`, {
//         params: { limit: 10000 },
//       });
//       setAllClients(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error:', err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.csv-dropdown-wrapper')) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const filteredClients = allClients.filter((c) => {
//     const country = c.country?.toLowerCase() || '';
//     const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
//     const email = c.email?.toLowerCase() || '';

//     if (activeTab === 'Verified' && !c.verified) return false;
//     if (activeTab === 'Unverified' && c.verified) return false;
//     if (activeTab === 'domestic' && !country.includes('india')) return false;
//     if (activeTab === 'international' && (country.includes('india') || !country)) return false;
//     if (search && !fullName.includes(search.toLowerCase()) && !email.includes(search.toLowerCase())) return false;
//     if (selectedState && c.state?.toLowerCase() !== selectedState.toLowerCase()) return false;

//     return true;
//   });

//   const statesForDropdown = [
//     ...new Set(
//       allClients
//         .filter((c) => {
//           const country = c.country?.toLowerCase() || '';
//           if (activeTab === 'domestic') return country.includes('india');
//           if (activeTab === 'international') return !country.includes('india') && country;
//           return true;
//         })
//         .map((c) => c.state)
//         .filter(Boolean)
//     ),
//   ].sort();

//   // ✅ FIX: selectedState bhi apply hoga — jab Delhi select ho to sirf Delhi dikhega
//   const baseForStats = allClients.filter((c) => {
//     const country = c.country?.toLowerCase() || '';
//     const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
//     const email = c.email?.toLowerCase() || '';

//     if (activeTab === 'Verified' && !c.verified) return false;
//     if (activeTab === 'Unverified' && c.verified) return false;
//     if (activeTab === 'domestic' && !country.includes('india')) return false;
//     if (activeTab === 'international' && (country.includes('india') || !country)) return false;
//     if (search && !fullName.includes(search.toLowerCase()) && !email.includes(search.toLowerCase())) return false;
//     if (selectedState && c.state?.toLowerCase() !== selectedState.toLowerCase()) return false; // ✅ yahi fix hai

//     return true;
//   });

//   const stateWiseCount = baseForStats.reduce((acc, c) => {
//     const state = c.state || 'Unknown';
//     acc[state] = (acc[state] || 0) + 1;
//     return acc;
//   }, {});

//   const stateWiseSorted = Object.entries(stateWiseCount).sort((a, b) => b[1] - a[1]);

//   const totalFiltered = filteredClients.length;
//   const totalPages = Math.ceil(totalFiltered / limit);
//   const paginatedClients = filteredClients.slice((page - 1) * limit, page * limit);

//   const downloadCSV = (data, filename) => {
//     if (data.length === 0) { alert('No data to download!'); return; }
//     const headers = ['#', 'First Name', 'Last Name', 'Email', 'Country', 'State', 'Status'];
//     const rows = data.map((c, i) => [
//       i + 1, c.firstName || '', c.lastName || '', c.email || '',
//       c.country || '', c.state || '', c.verified ? 'Verified' : 'Unverified',
//     ]);
//     const csvContent = [headers, ...rows]
//       .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
//       .join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${filename}.csv`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleDownload = (type) => {
//     const domesticClients = allClients.filter((c) => c.country?.toLowerCase().includes('india'));
//     const internationalClients = allClients.filter((c) => c.country && !c.country.toLowerCase().includes('india'));
//     switch (type) {
//       case 'current':
//         downloadCSV(filteredClients, `clients_${activeTab}${selectedState ? `_${selectedState}` : ''}`);
//         break;
//       case 'all':
//         downloadCSV(allClients, 'all_clients');
//         break;
//       case 'domestic':
//         downloadCSV(domesticClients, 'domestic_clients_india');
//         break;
//       case 'international':
//         downloadCSV(internationalClients, 'international_clients');
//         break;
//       case 'domestic_statewise':
//         downloadCSV([...domesticClients].sort((a, b) => (a.state || '').localeCompare(b.state || '')), 'domestic_clients_statewise');
//         break;
//       case 'international_statewise':
//         downloadCSV(
//           [...internationalClients].sort((a, b) =>
//             (a.country || '').localeCompare(b.country || '') || (a.state || '').localeCompare(b.state || '')
//           ), 'international_clients_statewise'
//         );
//         break;
//       default: break;
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Client Dashboard | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Client Overview
//           </Typography>
//         </Stack>

//         <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm bg-light">
//           <div className="clientpage-search">
//             <input
//               type="text"
//               placeholder="Search Clients..."
//               className="form-control shadow-sm"
//               value={search}
//               onChange={(e) => { setPage(1); setSearch(e.target.value); }}
//             />
//           </div>

//           <div className="d-flex align-items-center gap-3 flex-wrap">
//             <div className="d-flex align-items-center gap-2">
//               <p className="mb-0 fw-medium text-secondary">Total Clients:</p>
//               <h5 className="text-primary fw-bold mb-0">{totalFiltered}</h5>
//             </div>

//             <div>
//               <select
//                 className="form-select"
//                 value={limit}
//                 onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
//               >
//                 <option value="1">1</option>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//                 <option value="25">25</option>
//                 <option value="50">50</option>
//               </select>
//             </div>

//             {/* CSV Download Dropdown */}
//             <div className="csv-dropdown-wrapper position-relative">
//               <button
//                 className="btn btn-success dropdown-toggle d-flex align-items-center gap-2"
//                 type="button"
//                 onClick={() => setShowDropdown((prev) => !prev)}
//               >
//                 Download CSV
//               </button>
//               {showDropdown && (
//                 <ul className="dropdown-menu shadow show" style={{ position: 'absolute', right: 0, zIndex: 1000, minWidth: '220px' }}>
//                   <li><h6 className="dropdown-header text-muted">Current View</h6></li>
//                   <li>
//                     <button className="dropdown-item" onClick={() => { handleDownload('current'); setShowDropdown(false); }}>
//                       📄 Current Filter ({totalFiltered} clients)
//                     </button>
//                   </li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><h6 className="dropdown-header text-muted">All Clients</h6></li>
//                   <li>
//                     <button className="dropdown-item" onClick={() => { handleDownload('all'); setShowDropdown(false); }}>
//                       👥 All Clients ({allClients.length})
//                     </button>
//                   </li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><h6 className="dropdown-header text-muted">Domestic (India)</h6></li>
//                   <li>
//                     <button className="dropdown-item" onClick={() => { handleDownload('domestic'); setShowDropdown(false); }}>
//                       🇮🇳 All Domestic Clients
//                     </button>
//                   </li>
//                   <li>
//                     <button className="dropdown-item" onClick={() => { handleDownload('domestic_statewise'); setShowDropdown(false); }}>
//                       🗂️ Domestic — State Wise
//                     </button>
//                   </li>
//                   <li><hr className="dropdown-divider" /></li>
//                   <li><h6 className="dropdown-header text-muted">International</h6></li>
//                   <li>
//                     <button className="dropdown-item" onClick={() => { handleDownload('international'); setShowDropdown(false); }}>
//                       🌍 All International Clients
//                     </button>
//                   </li>
//                   <li>
//                     <button className="dropdown-item" onClick={() => { handleDownload('international_statewise'); setShowDropdown(false); }}>
//                       🗂️ International — Country/State Wise
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <ul className="nav nav-tabs mt-4">
//           {['All', 'Verified', 'Unverified', 'domestic', 'international'].map((tab) => (
//             <li key={tab} className="nav-item">
//               <button
//                 className={`nav-link ${activeTab === tab ? 'active' : ''}`}
//                 onClick={() => {
//                   setActiveTab(tab);
//                   setSelectedState('');
//                   setShowStateStats(true);
//                   setPage(1);
//                 }}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* State Filter + State Stats Toggle */}
//         {(activeTab === 'domestic' || activeTab === 'international') && (
//           <div className="mt-3">
//             <div className="d-flex align-items-center gap-3 flex-wrap">
//               <label className="fw-semibold mb-0">Filter by State:</label>
//               <select
//                 className="form-select w-auto"
//                 value={selectedState}
//                 onChange={(e) => { setSelectedState(e.target.value); setPage(1); }}
//               >
//                 <option value="">All States</option>
//                 {statesForDropdown.map((state) => (
//                   <option key={state} value={state}>{state}</option>
//                 ))}
//               </select>
//               {selectedState && (
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => { setSelectedState(''); setPage(1); }}
//                 >
//                   ✕ Clear
//                 </button>
//               )}
//               {/* <button
//                 className="btn btn-sm btn-outline-info ms-2"
//                 onClick={() => setShowStateStats((prev) => !prev)}
//               >
//                 📊 {showStateStats ? 'Hide' : 'Show'} State-wise Count
//               </button> */}
//             </div>

//             {/* ✅ State-wise Count Table */}
//             {showStateStats && (
//               <div className="mt-3 table-responsive" style={{ maxWidth: '480px' }}>
//                 <table className="table table-sm table-bordered text-center shadow-sm">
//                   <thead className="table-secondary">
//                     <tr>
//                       <th>#</th>
//                       <th className="text-start">
//                         State {selectedState && <span className="text-primary fw-normal">— {selectedState}</span>}
//                       </th>
//                       <th>Clients</th>
//                       {/* <th>% Share</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {stateWiseSorted.length === 0 ? (
//                       <tr><td colSpan="4">No data</td></tr>
//                     ) : (
//                       stateWiseSorted.map(([state, count], i) => (
//                         <tr
//                           key={state}
//                           onClick={() => { setSelectedState(selectedState === state ? '' : state); setPage(1); }}
//                           style={{
//                             cursor: 'pointer',
//                             backgroundColor: selectedState === state ? '#cfe2ff' : '',
//                             fontWeight: selectedState === state ? '600' : 'normal',
//                           }}
//                         >
//                           <td>{i + 1}</td>
//                           <td className="text-start">{state}</td>
//                           <td><span className="badge bg-primary">{count}</span></td>
//                           {/* <td>{((count / baseForStats.length) * 100).toFixed(1)}%</td> */}
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                   <tfoot className="table-light fw-bold">
//                     <tr>
//                       <td colSpan="2">Total</td>
//                       <td>{baseForStats.length}</td>
//                       {/* <td>100%</td> */}
//                     </tr>
//                   </tfoot>
//                 </table>
//                 {/* <small className="text-muted">
//                   {selectedState
//                     ? `✅ Sirf "${selectedState}" ke clients dikh rahe hain — Clear karein sab dekhne ke liye`
//                     : '💡 Row pe click karein us state ko filter karne ke liye'}
//                 </small> */}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Table */}
//      {/* Table */}
// <div className="pt-4 table-responsive clientpage-table" style={{ maxHeight: '500px', overflowY: 'auto' }}>
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" />
//             </div>
//           ) : (
//             <table className="table table-bordered align-middle text-center shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Country</th>
//                   <th>State</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedClients.length === 0 ? (
//                   <tr><td colSpan="6">No clients found</td></tr>
//                 ) : (
//                   paginatedClients.map((cv, i) => (
//                     <tr key={cv._id}>
//                       <td>{(page - 1) * limit + i + 1}</td>
//                       <td>
//                         <Link
//                           className="text-primary text-decoration-underline"
//                           to={`/dashboard/client-view/${cv._id}`}
//                         >
//                           {cv.firstName} {cv.lastName}
//                         </Link>
//                       </td>
//                       <td>{cv.email}</td>
//                       <td>{cv.country}</td>
//                       <td>{cv.state}</td>
//                       <td>
//                         {cv.verified ? (
//                           <span className="badge bg-success">Verified</span>
//                         ) : (
//                           <span className="badge bg-warning text-dark">Unverified</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && totalPages > 1 && (
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <p className="mb-0">
//               Showing {Math.min(page * limit, totalFiltered)} of {totalFiltered} entries
//             </p>
//             <ul className="pagination mb-0">
//               <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                 <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
//               </li>
//               {[...Array(totalPages)].map((_, i) => (
//                 <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
//                   <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
//                 </li>
//               ))}
//               <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                 <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// };

// export default ClientPage;


import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { Url } from '../url/url';
import { Link } from 'react-router-dom';

const ClientPage = () => {
  // ✅ Permission setup - sessionStorage se directly read
  const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}');
  const staff       = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
  const slug        = staff?.slug || 'Management';

  const perm      = permissions?.client || {};
  const enabled   = perm?.enable === true;
  const canView   = perm?.view   === true;  // ✅ Name & Email click control
  const canAdd    = perm?.add    === true;
  const canEdit   = perm?.edit   === true;
  const canDelete = perm?.delete === true;

  const [allClients, setAllClients]         = useState([]);
  const [search, setSearch]                 = useState('');
  const [limit, setLimit]                   = useState(10);
  const [page, setPage]                     = useState(1);
  const [loading, setLoading]               = useState(true);
  const [activeTab, setActiveTab]           = useState('All');
  const [selectedState, setSelectedState]   = useState('');
  const [showDropdown, setShowDropdown]     = useState(false);
  const [showStateStats, setShowStateStats] = useState(true);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Url}/client/all`, { params: { limit: 10000 } });
      setAllClients(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.csv-dropdown-wrapper')) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredClients = allClients.filter((c) => {
    const country  = c.country?.toLowerCase() || '';
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const email    = c.email?.toLowerCase() || '';

    if (activeTab === 'Verified'      && !c.verified) return false;
    if (activeTab === 'Unverified'    && c.verified)  return false;
    if (activeTab === 'domestic'      && !country.includes('india')) return false;
    if (activeTab === 'international' && (country.includes('india') || !country)) return false;
    if (search && !fullName.includes(search.toLowerCase()) && !email.includes(search.toLowerCase())) return false;
    if (selectedState && c.state?.toLowerCase() !== selectedState.toLowerCase()) return false;
    return true;
  });

  const statesForDropdown = [
    ...new Set(
      allClients
        .filter((c) => {
          const country = c.country?.toLowerCase() || '';
          if (activeTab === 'domestic')      return country.includes('india');
          if (activeTab === 'international') return !country.includes('india') && country;
          return true;
        })
        .map((c) => c.state)
        .filter(Boolean)
    ),
  ].sort();

  const baseForStats = allClients.filter((c) => {
    const country  = c.country?.toLowerCase() || '';
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const email    = c.email?.toLowerCase() || '';

    if (activeTab === 'Verified'      && !c.verified) return false;
    if (activeTab === 'Unverified'    && c.verified)  return false;
    if (activeTab === 'domestic'      && !country.includes('india')) return false;
    if (activeTab === 'international' && (country.includes('india') || !country)) return false;
    if (search && !fullName.includes(search.toLowerCase()) && !email.includes(search.toLowerCase())) return false;
    if (selectedState && c.state?.toLowerCase() !== selectedState.toLowerCase()) return false;
    return true;
  });

  const stateWiseCount = baseForStats.reduce((acc, c) => {
    const state = c.state || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const stateWiseSorted  = Object.entries(stateWiseCount).sort((a, b) => b[1] - a[1]);
  const totalFiltered    = filteredClients.length;
  const totalPages       = Math.ceil(totalFiltered / limit);
  const paginatedClients = filteredClients.slice((page - 1) * limit, page * limit);

  const downloadCSV = (data, filename) => {
    if (data.length === 0) { alert('No data to download!'); return; }
    const headers = ['#', 'First Name', 'Last Name', 'Email', 'Country', 'State', 'Status'];
    const rows = data.map((c, i) => [
      i + 1, c.firstName || '', c.lastName || '', c.email || '',
      c.country || '', c.state || '', c.verified ? 'Verified' : 'Unverified',
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `${filename}.csv`; link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = (type) => {
    const domesticClients      = allClients.filter((c) => c.country?.toLowerCase().includes('india'));
    const internationalClients = allClients.filter((c) => c.country && !c.country.toLowerCase().includes('india'));
    switch (type) {
      case 'current':             downloadCSV(filteredClients, `clients_${activeTab}${selectedState ? `_${selectedState}` : ''}`); break;
      case 'all':                 downloadCSV(allClients, 'all_clients'); break;
      case 'domestic':            downloadCSV(domesticClients, 'domestic_clients_india'); break;
      case 'international':       downloadCSV(internationalClients, 'international_clients'); break;
      case 'domestic_statewise':  downloadCSV([...domesticClients].sort((a, b) => (a.state || '').localeCompare(b.state || '')), 'domestic_clients_statewise'); break;
      case 'international_statewise':
        downloadCSV(
          [...internationalClients].sort((a, b) =>
            (a.country || '').localeCompare(b.country || '') || (a.state || '').localeCompare(b.state || '')
          ), 'international_clients_statewise'
        ); break;
      default: break;
    }
  };

  // ✅ ACCESS DENIED
  if (!enabled) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
          <div style={{ fontSize: 50 }}>🔒</div>
          <h4 style={{ marginTop: 16, color: '#1e293b' }}>Access Denied</h4>
          <p>Aapke paas is page ka access nahi hai.</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet><title>Client Dashboard | Minimal UI</title></Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>Client Overview</Typography>
        </Stack>

        {/* Header */}
        <div className="clientpage-header d-flex align-items-center justify-content-between flex-wrap p-3 rounded shadow-sm bg-light">
          <div className="clientpage-search">
            <input
              type="text" placeholder="Search Clients..." className="form-control shadow-sm"
              value={search} onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            />
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <p className="mb-0 fw-medium text-secondary">Total Clients:</p>
              <h5 className="text-primary fw-bold mb-0">{totalFiltered}</h5>
            </div>

            <select className="form-select" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
              {[1, 5, 10, 25, 50].map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            {/* CSV Download */}
            <div className="csv-dropdown-wrapper position-relative">
              <button className="btn btn-success dropdown-toggle d-flex align-items-center gap-2" type="button" onClick={() => setShowDropdown((prev) => !prev)}>
                Download CSV
              </button>
              {showDropdown && (
                <ul className="dropdown-menu shadow show" style={{ position: 'absolute', right: 0, zIndex: 1000, minWidth: '220px' }}>
                  <li><h6 className="dropdown-header text-muted">Current View</h6></li>
                  <li><button className="dropdown-item" onClick={() => { handleDownload('current'); setShowDropdown(false); }}>📄 Current Filter ({totalFiltered} clients)</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header text-muted">All Clients</h6></li>
                  <li><button className="dropdown-item" onClick={() => { handleDownload('all'); setShowDropdown(false); }}>👥 All Clients ({allClients.length})</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header text-muted">Domestic (India)</h6></li>
                  <li><button className="dropdown-item" onClick={() => { handleDownload('domestic'); setShowDropdown(false); }}>🇮🇳 All Domestic Clients</button></li>
                  <li><button className="dropdown-item" onClick={() => { handleDownload('domestic_statewise'); setShowDropdown(false); }}>🗂️ Domestic — State Wise</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header text-muted">International</h6></li>
                  <li><button className="dropdown-item" onClick={() => { handleDownload('international'); setShowDropdown(false); }}>🌍 All International Clients</button></li>
                  <li><button className="dropdown-item" onClick={() => { handleDownload('international_statewise'); setShowDropdown(false); }}>🗂️ International — Country/State Wise</button></li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-4">
          {['All', 'Verified', 'Unverified', 'domestic', 'international'].map((tab) => (
            <li key={tab} className="nav-item">
              <button
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => { setActiveTab(tab); setSelectedState(''); setShowStateStats(true); setPage(1); }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* State Filter */}
        {(activeTab === 'domestic' || activeTab === 'international') && (
          <div className="mt-3">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <label className="fw-semibold mb-0">Filter by State:</label>
              <select className="form-select w-auto" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setPage(1); }}>
                <option value="">All States</option>
                {statesForDropdown.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
              {selectedState && (
                <button className="btn btn-sm btn-outline-secondary" onClick={() => { setSelectedState(''); setPage(1); }}>✕ Clear</button>
              )}
            </div>

            {showStateStats && (
              <div className="mt-3 table-responsive" style={{ maxWidth: '480px' }}>
                <table className="table table-sm table-bordered text-center shadow-sm">
                  <thead className="table-secondary">
                    <tr>
                      <th>#</th>
                      <th className="text-start">State {selectedState && <span className="text-primary fw-normal">— {selectedState}</span>}</th>
                      <th>Clients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stateWiseSorted.length === 0 ? (
                      <tr><td colSpan="3">No data</td></tr>
                    ) : (
                      stateWiseSorted.map(([state, count], i) => (
                        <tr
                          key={state}
                          onClick={() => { setSelectedState(selectedState === state ? '' : state); setPage(1); }}
                          style={{ cursor: 'pointer', backgroundColor: selectedState === state ? '#cfe2ff' : '', fontWeight: selectedState === state ? '600' : 'normal' }}
                        >
                          <td>{i + 1}</td>
                          <td className="text-start">{state}</td>
                          <td><span className="badge bg-primary">{count}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="table-light fw-bold">
                    <tr><td colSpan="2">Total</td><td>{baseForStats.length}</td></tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="pt-4 table-responsive clientpage-table" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary" role="status" /></div>
          ) : (
            <table className="table table-bordered align-middle text-center shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                {canView && <th>Email</th>}
                  <th>Country</th>
                  <th>State</th>
                  <th>Status</th>
                  {(canEdit || canDelete) && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedClients.length === 0 ? (
                  <tr><td colSpan={canEdit || canDelete ? 7 : 6}>No clients found</td></tr>
                ) : (
                  paginatedClients.map((cv, i) => (
                    <tr key={cv._id}>
                      <td>{(page - 1) * limit + i + 1}</td>

                      {/* ✅ Name - canView true ho to Link, warna plain text */}
                      <td>
                        {canView ? (
                          <Link className="text-primary text-decoration-underline" to={`/${slug}/client-view/${cv._id}`}>
                            {cv.firstName} {cv.lastName}
                          </Link>
                        ) : (
                          <span>{cv.firstName} {cv.lastName}</span>
                        )}
                      </td>

          
                {/* ✅ Email td - sirf canView pe render karo, warna bilkul mat dikhao */}
{canView && (
  <td>
    <Link className="text-primary text-decoration-underline" to={`/${slug}/client-view/${cv._id}`}>
      {cv.email}
    </Link>
  </td>
)}

                      <td>{cv.country}</td>
                      <td>{cv.state}</td>
                      <td>
                        {cv.verified ? (
                          <span className="badge bg-success">Verified</span>
                        ) : (
                          <span className="badge bg-warning text-dark">Unverified</span>
                        )}
                      </td>

                      {/* ✅ Action - canEdit / canDelete */}
                      {(canEdit || canDelete) && (
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            {canEdit && (
                              <Link to={`/${slug}/client-edit/${cv._id}`} className="btn btn-sm btn-warning">
                                <i className="fa fa-pen" />
                              </Link>
                            )}
                            {canDelete && (
                              <button className="btn btn-sm btn-danger" onClick={() => { /* delete handler */ }}>
                                <i className="fa fa-trash" />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <p className="mb-0">Showing {Math.min(page * limit, totalFiltered)} of {totalFiltered} entries</p>
            <ul className="pagination mb-0">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </>
  );
};

export default ClientPage;