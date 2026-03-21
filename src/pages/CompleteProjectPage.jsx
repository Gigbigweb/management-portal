// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {  Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'; 
// import { ToastContainer  } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import { projectdata } from 'src/redux/slice/project'; 
// import Rating from 'react-rating-stars-component';

// const CompleteProjectPage = () => {
 
//     const packageAllData = useSelector(store => store.package.data) 
//     const runningProjectAllData = useSelector(store => store.project.data)    
//     const ratingAllData = useSelector(store => store.rating.data)    
//     const dispatch = useDispatch() 

//     useEffect(()=>{
//       dispatch(projectdata())
//     }, [])

//   return (
//     <>
//     <ToastContainer/>
//     <Helmet>
//         <title> Dashboard: Products | Minimal UI </title>
//     </Helmet> 
//      <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Complete Projects
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
//                         <th>Price ($)</th> 
//                         <th>Client</th> 
//                         <th>Client Name</th> 
//                         <th>rating</th> 
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>   

//                   {runningProjectAllData.length > 0 ? <>{ runningProjectAllData.filter(value => value.projectStatus === "complete" && value.team ).map((cv, i)=>{
//                       return( 
//                         <tr className='text-center' key={i}>
//                               <td>{i + 1}</td>  
//                               {cv.projectType === "package" ?
//                               <td className='text-capitalize'>{packageAllData.filter(data => data._id === cv.packageId).map((packageVal) => packageVal.packageName)}</td> : 
//                               <td className='text-capitalize'>"custom Project"</td> } 
//                               <td>$ {cv.totalPrice}</td> 
//                               <td>{cv.clientId}</td>
//                               <td className='text-capitalize'>{cv.clientName}</td>    
//                               <td className='text-capitalize'>{ratingAllData && ratingAllData.filter(data =>  data.projectId === cv._id ).map((ratingValue)=>{
//                                 return(
                                
//                                 <Rating
//                                   count={5}
//                                   value={ratingValue.ratingStar }  
//                                   size={24} 
//                                   edit={false}
//                                   activeColor="#ff6c00" 
//                                   key={ratingValue._id}
//                                   classNames="w-max"
//                                 />
//                                 )
//                               })}</td>   
//                               <td>
//                                   <div className='d-fle align-items-center flex-wrap justify-content-center flex-column'>  
//                                   <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}> 
//                                     <i className="fa-solid fa-user-pen fa-sm text-success me-1 "></i> 
//                                     <small className='fw-bold text-success'>update</small>
//                                   </Link>
//                                   <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap' > 
//                                     <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
//                                     <small className='fw-bold text-primary'>view</small>
//                                   </Link> 
//                                   </div>
//                               </td>
//                           </tr> 
//                       )
//                   }) }</>
//                 :
//                 <>
//                 <h6 className='text-center py-5 w-100'>No completed Projects</h6>
//                 </>
//                 }
 
//                 </tbody>
//             </table>
//         </section>
//       </Container>
//     </>
//   )
// }

// export default CompleteProjectPage




// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Pagination from '@mui/material/Pagination';
// import Rating from 'react-rating-stars-component';
// import { Url } from 'src/url/url';

// const CompleteProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(false);

//   const fetchProjects = async (currentPage = 1, currentLimit = 10) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/completed?page=${currentPage}&limit=${currentLimit}`);
//       console.log(response)
//       const { data, totalPages } = response.data;
//       const completedWithTeam = data.filter(item => item.projectStatus === 'completed' && item.team);
//       setProjects(completedWithTeam);
//       setTotalPages(totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching complete projects:", error);
//       toast.error("Failed to load complete projects");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   const handleChange = (event, value) => {
//     setPage(value);
//   };
// console.log("completed Projects",projects)
//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Complete Projects</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//           🏁 Complete Projects
//           </Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <div>
//             <form>
//               <input type='text' placeholder='🔍 Search ...' className='form-control' />
//             </form>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <label className="mb-0">Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => {
//                 setPage(1);
//                 setLimit(Number(e.target.value));
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className="mb-0">entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <button className=' btn bg-primary text-white mt-2 mb-3'>download all billing</button>
//         <section className='table-responsive'>
//           <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
//             <thead className='table-dark'>
//               <tr className='align-top'>
//                 <th>S. No.</th>
//                 <th>Project ID</th>
//                 <th>Package / Service</th>
//                 <th>Price ($)</th>
//                 <th>Client</th>
//                 <th>Client Name</th>
//                 <th>Invoice</th>
//                 {/* <th>Rating</th> */}
//                 <th>billing details</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7">
//                     <div className="text-center py-5">Loading...</div>
//                   </td>
//                 </tr>
//               ) : projects.length > 0 ? (
//                 projects.map((cv, i) => (
//                   <tr className='text-center' key={cv._id}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td>{cv._id}</td>
//                     <td className='text-capitalize'>
//                       {cv.projectType === 'package' ? cv.packageId : 'custom Project'}
//                     </td>
//                     <td>$ {cv.totalPrice}</td>
//                     <td>{cv.clientId}</td>
//                     <td className='text-capitalize'>{cv.clientName}</td>
//                              <td>
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
//                           <td><button className='btn bg-primary text-white'>View Billing</button></td>
// {/* 
//                     <td>
//                       {cv.rating && (
//                         <Rating
//                           count={5}
//                           value={cv.rating.ratingStar}
//                           size={24}
//                           edit={false}
//                           activeColor="#ff6c00"
//                           classNames="w-max"
//                         />
//                       )}
//                     </td> */}
//                     <td>
//                       <div className='d-flex flex-column align-items-center'>
//                         <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}>
//                           <i className="fa-solid fa-user-pen fa-sm text-success me-1" />
//                           <small className='fw-bold text-success'>update</small>
//                         </Link>
//                         <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap'>
//                           <i className="fa-solid fa-eye fa-sm text-primary me-1" />
//                           <small className='fw-bold text-primary'>view</small>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">
//                     <h6 className='text-center py-5 w-100'>No completed Projects</h6>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {totalPages > 1 && (
//             <div className='d-flex justify-content-center py-3'>
//               <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default CompleteProjectPage;








// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Pagination from '@mui/material/Pagination';
// import { Url } from 'src/url/url';

// // ─── Billing Modal Component ───────────────────────────────────────────────────
// const BillingModal = ({ project, onClose }) => {
//   if (!project) return null;
//   const p = project.payment || {};

//   return (
//     <div
//       className="modal-overlay"
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0, zIndex: 9999,
//         background: 'rgba(0,0,0,0.55)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         backdropFilter: 'blur(4px)',
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: '#fff',
//           borderRadius: '16px',
//           width: '100%',
//           maxWidth: '600px',
//           maxHeight: '90vh',
//           overflowY: 'auto',
//           boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
//           fontFamily: "'Segoe UI', sans-serif",
//         }}
//       >
//         {/* Header */}
//         <div style={{
//           background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
//           borderRadius: '16px 16px 0 0',
//           padding: '24px 28px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//           <div>
//             <h5 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: 700 }}>
//               🧾 Billing Details
//             </h5>
//             <small style={{ color: '#a0aec0' }}>Project ID: {project._id}</small>
//           </div>
//           <button
//             onClick={onClose}
//             style={{
//               background: 'rgba(255,255,255,0.15)',
//               border: 'none',
//               borderRadius: '8px',
//               color: '#fff',
//               width: '36px', height: '36px',
//               cursor: 'pointer',
//               fontSize: '18px',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div style={{ padding: '28px' }}>

//           {/* Client Info Section */}
//           <SectionTitle icon="👤" label="Client Information" />
//           <InfoGrid rows={[
//             { label: 'Client Name', value: project.clientName || '—' },
//             { label: 'Client ID', value: project.clientId || '—' },
//             { label: 'Email', value: p.payer?.email || '—' },
//             { label: 'Company', value: p.companyName || '—' },
//           ]} />

//           {/* Address Section */}
//           <SectionTitle icon="📍" label="Address" />
//           <InfoGrid rows={[
//             { label: 'Address', value: p.clientAddress || '—' },
//             { label: 'City', value: p.clientCity || '—' },
//             { label: 'State', value: p.clientState || '—' },
//             { label: 'Country', value: p.clientCountry || '—' },
//             { label: 'Pincode', value: p.clientPincode || '—' },
//           ]} />

//           {/* Invoice Section */}
//           <SectionTitle icon="🧾" label="Invoice Details" />
//           <InfoGrid rows={[
//             { label: 'Invoice Number', value: p.invoiceNumber || '—' },
//             { label: 'Invoice Date', value: p.invoiceDate || '—' },
//             { label: 'Order ID', value: p.razorpayOrderId || '—' },
//             { label: 'Transaction ID', value: p.transactionId || '—' },
//             { label: 'Provider', value: p.provider ? p.provider.toUpperCase() : '—' },
//           ]} />

//           {/* Payment Section */}
//           <SectionTitle icon="💰" label="Payment Summary" />
//           <InfoGrid rows={[
//             { label: 'Currency', value: p.currency || '—' },
//             { label: 'Subtotal', value: p.subtotal ? `$${p.subtotal}` : '—' },
//             { label: 'Discount', value: p.discountAmount ? `$${p.discountAmount}` : '₹0' },
//             { label: 'Final Amount (INR)', value: p.finalAmount ? `₹${p.finalAmount}` : '—' },
//             { label: 'Final Amount (USD)', value: p.finalAmountUSD ? `$${p.finalAmountUSD}` : '—' },
//             { label: 'GST Number', value: p.gstNumber || '—' },
//           ]} />

//           {/* GST Tax Breakdown */}
//           {p.taxBreakdown && (
//             <>
//               <SectionTitle icon="📊" label="Tax Breakdown" />
//               <InfoGrid rows={[
//                 { label: 'Subtotal (pre-tax)', value: p.taxBreakdown.subtotal ? `₹${parseFloat(p.taxBreakdown.subtotal).toFixed(2)}` : '—' },
//                 { label: 'CGST', value: p.taxBreakdown.cgst ? `₹${parseFloat(p.taxBreakdown.cgst).toFixed(2)}` : '₹0' },
//                 { label: 'SGST', value: p.taxBreakdown.sgst ? `₹${parseFloat(p.taxBreakdown.sgst).toFixed(2)}` : '₹0' },
//                 { label: 'IGST', value: p.taxBreakdown.igst ? `₹${parseFloat(p.taxBreakdown.igst).toFixed(2)}` : '₹0' },
//                 { label: 'Total Tax', value: p.taxBreakdown.totalTax ? `₹${parseFloat(p.taxBreakdown.totalTax).toFixed(2)}` : '—' },
//               ]} />
//             </>
//           )}

//           {/* Invoice PDF Button */}
//           {p.invoicePdfKey && (
//             <div style={{ marginTop: '20px', textAlign: 'center' }}>
//               <a
//                 href={p.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   background: 'linear-gradient(135deg, #667eea, #764ba2)',
//                   color: '#fff',
//                   padding: '12px 28px',
//                   borderRadius: '10px',
//                   textDecoration: 'none',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
//                   transition: 'transform 0.2s',
//                 }}
//               >
//                 <i className="bi bi-file-earmark-pdf-fill" />
//                 View Invoice PDF
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Helper Sub-components ─────────────────────────────────────────────────────
// const SectionTitle = ({ icon, label }) => (
//   <div style={{
//     display: 'flex', alignItems: 'center', gap: '8px',
//     borderBottom: '2px solid #e2e8f0',
//     paddingBottom: '6px', marginBottom: '12px', marginTop: '20px',
//   }}>
//     <span style={{ fontSize: '16px' }}>{icon}</span>
//     <span style={{ fontWeight: 700, fontSize: '13px', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//       {label}
//     </span>
//   </div>
// );

// const InfoGrid = ({ rows }) => (
//   <div style={{
//     display: 'grid', gridTemplateColumns: '1fr 1fr',
//     gap: '10px 20px', marginBottom: '4px',
//   }}>
//     {rows.map(({ label, value }) => (
//       <div key={label} style={{
//         background: '#f7fafc', borderRadius: '8px',
//         padding: '10px 14px', borderLeft: '3px solid #667eea',
//       }}>
//         <div style={{ fontSize: '11px', color: '#718096', fontWeight: 600, marginBottom: '2px', textTransform: 'uppercase' }}>
//           {label}
//         </div>
//         <div style={{ fontSize: '13px', color: '#2d3748', fontWeight: 500, wordBreak: 'break-all' }}>
//           {value}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // ─── CSV Download Helper ───────────────────────────────────────────────────────
// const downloadCSV = (projects) => {
//   if (!projects || projects.length === 0) {
//     toast.warn('No data to download!');
//     return;
//   }

//   const headers = [
//     'S.No', 'Project ID', 'Client ID', 'Client Name', 'Email',
//     'Company', 'Address', 'City', 'State', 'Country', 'Pincode',
//     'Invoice Number', 'Invoice Date', 'Order ID', 'Transaction ID',
//     'Provider', 'Currency', 'Subtotal ($)', 'Discount',
//     'Final Amount (INR)', 'Final Amount (USD)', 'GST Number',
//     'CGST', 'SGST', 'IGST', 'Total Tax',
//     'Project Type', 'Project Status', 'Package/Service',
//     'Invoice PDF URL',
//   ];

//   // Force Excel to treat cell as text with symbol (wrap in quotes always for currency)
//   const escapeCsv = (val) => {
//     if (val === null || val === undefined) return '';
//     const str = String(val);
//     // Always quote values containing comma, quote, newline, or currency symbols
//     if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('₹') || str.includes('$')) {
//       return `"${str.replace(/"/g, '""')}"`;
//     }
//     return str;
//   };

//   const inr = (val) => val !== undefined && val !== null && val !== '' ? `₹${parseFloat(val).toFixed(2)}` : '₹0.00';
//   const usd = (val) => val !== undefined && val !== null && val !== '' ? `$${parseFloat(val).toFixed(2)}` : '$0.00';

//   const rows = projects.map((cv, i) => {
//     const p = cv.payment || {};
//     const tax = p.taxBreakdown || {};
//     return [
//       i + 1,
//       cv._id,
//       cv.clientId,
//       cv.clientName,
//       p.payer?.email || '',
//       p.companyName || '',
//       p.clientAddress || '',
//       p.clientCity || '',
//       p.clientState || '',
//       p.clientCountry || '',
//       p.clientPincode || '',
//       p.invoiceNumber || '',
//       p.invoiceDate || '',
//       p.razorpayOrderId || '',
//       p.transactionId || '',
//       p.provider || '',
//       p.currency || '',
//       usd(p.subtotal),                        // Subtotal ($)
//       inr(p.discountAmount),                  // Discount (₹)
//       inr(p.finalAmount),                     // Final Amount (INR)
//       usd(p.finalAmountUSD),                  // Final Amount (USD)
//       p.gstNumber || '',
//       inr(tax.cgst),                          // CGST (₹)
//       inr(tax.sgst),                          // SGST (₹)
//       inr(tax.igst),                          // IGST (₹)
//       inr(tax.totalTax),                      // Total Tax (₹)
//       cv.projectType || '',
//       cv.projectStatus || '',
//       cv.projectType === 'package' ? cv.packageId : 'Custom Project',
//       p.invoicePdfUrl || (p.invoicePdfKey ? `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}` : ''),
//     ].map(escapeCsv);
//   });

//   // '\uFEFF' = UTF-8 BOM — makes Excel show ₹ and $ symbols correctly
//   const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = `completed_projects_billing_${new Date().toISOString().slice(0, 10)}.csv`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
//   toast.success('CSV downloaded successfully!');
// };

// // ─── Main Page ─────────────────────────────────────────────────────────────────
// const CompleteProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null); // for modal

//   const fetchProjects = async (currentPage = 1, currentLimit = 10) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/completed?page=${currentPage}&limit=${currentLimit}`);
//       const { data, totalPages } = response.data;
//       const completedWithTeam = data.filter(item => item.projectStatus === 'completed' && item.team);
//       setProjects(completedWithTeam);
//       setTotalPages(totalPages || 1);
//     } catch (error) {
//       console.error('Error fetching complete projects:', error);
//       toast.error('Failed to load complete projects');
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   const handleChange = (event, value) => setPage(value);

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Complete Projects</title></Helmet>

//       {/* Billing Modal */}
//       {selectedProject && (
//         <BillingModal project={selectedProject} onClose={() => setSelectedProject(null)} />
//       )}

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             🏁 Complete Projects
//           </Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <div>
//             <form>
//               <input type='text' placeholder='🔍 Search ...' className='form-control' />
//             </form>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <label className="mb-0">Show</label>
//             <select
//               className="form-select"
//               style={{ width: 'auto' }}
//               value={limit}
//               onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className="mb-0">entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         {/* Download All Billing CSV Button */}
//         <button
//           className='btn bg-primary text-white mt-2 mb-3'
//           onClick={() => downloadCSV(projects)}
//         >
//           <i className="bi bi-download me-2" />
//           Download All Billing (CSV)
//         </button>

//         <section className='table-responsive'>
//           <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
//             <thead className='table-dark'>
//               <tr className='align-top'>
//                 <th>S. No.</th>
//                 <th>Project ID</th>
//                 <th>Package / Service</th>
//                 <th>Price</th>
//                 <th>Client</th>
//                 <th>Client Name</th>
//                 <th>Invoice</th>
//                 <th>Billing Details</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9">
//                     <div className="text-center py-5">Loading...</div>
//                   </td>
//                 </tr>
//               ) : projects.length > 0 ? (
//                 projects.map((cv, i) => (
//                   <tr className='text-center' key={cv._id}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td>{cv._id}</td>
//                     <td className='text-capitalize'>
//                       {cv.projectType === 'package' ? cv.packageId : 'Custom Project'}
//                     </td>
//                     <td>
//                       <div>₹{cv.totalPrice}</div>
//                       <small className="text-muted">(${cv.totalPriceUSD})</small>
//                     </td>
//                     <td>{cv.clientId}</td>
//                     <td className='text-capitalize'>{cv.clientName}</td>
//                     <td>
//                       {cv.payment?.invoicePdfKey ? (
//                         <a
//                           href={cv.payment.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.payment.invoicePdfKey}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-primary btn-sm shadow-sm"
//                         >
//                           <i className="bi bi-file-earmark-pdf me-1" /> View
//                         </a>
//                       ) : (
//                         <span className="text-muted">—</span>
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         className='btn btn-sm text-white'
//                         style={{ background: 'linear-gradient(135deg,#667eea,#764ba2)', whiteSpace: 'nowrap' }}
//                         onClick={() => setSelectedProject(cv)}
//                       >
//                         <i className="bi bi-receipt me-1" />
//                         View Billing
//                       </button>
//                     </td>
//                     <td>
//                       <div className='d-flex flex-column align-items-center'>
//                         <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}>
//                           <i className="fa-solid fa-user-pen fa-sm text-success me-1" />
//                           <small className='fw-bold text-success'>update</small>
//                         </Link>
//                         <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap'>
//                           <i className="fa-solid fa-eye fa-sm text-primary me-1" />
//                           <small className='fw-bold text-primary'>view</small>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9">
//                     <h6 className='text-center py-5 w-100'>No completed Projects</h6>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {totalPages > 1 && (
//             <div className='d-flex justify-content-center py-3'>
//               <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default CompleteProjectPage;













// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import Pagination from '@mui/material/Pagination';
// import { Url } from 'src/url/url';

// // ─── Shared Styles ─────────────────────────────────────────────────────────────
// const overlay = {
//   position: 'fixed', inset: 0, zIndex: 9999,
//   background: 'rgba(15,23,42,0.55)',
//   backdropFilter: 'blur(6px)',
//   display: 'flex', alignItems: 'center', justifyContent: 'center',
//   padding: '16px',
// };

// const card = {
//   background: '#fff',
//   borderRadius: '20px',
//   boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
//   fontFamily: "'Inter','Segoe UI',sans-serif",
//   display: 'flex', flexDirection: 'column',
//   overflow: 'hidden',
// };

// const modalHeader = {
//   padding: '18px 24px',
//   borderBottom: '1px solid #f1f5f9',
//   display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//   background: '#fafafa',
// };

// const closeBtn = {
//   background: '#f1f5f9', border: 'none', borderRadius: '8px',
//   width: '32px', height: '32px', cursor: 'pointer',
//   display: 'flex', alignItems: 'center', justifyContent: 'center',
//   color: '#64748b', fontSize: '15px', flexShrink: 0,
// };

// const badge = (color) => ({
//   display: 'inline-block',
//   background: color + '18',
//   color,
//   border: `1px solid ${color}35`,
//   borderRadius: '6px',
//   padding: '2px 10px',
//   fontSize: '11px',
//   fontWeight: 700,
//   letterSpacing: '0.4px',
//   textTransform: 'uppercase',
// });

// // ─── Single Billing Modal ──────────────────────────────────────────────────────
// const BillingModal = ({ project, onClose }) => {
//   if (!project) return null;
//   const p = project.payment || {};
//   const tax = p.taxBreakdown || {};

//   const Row = ({ label, value, mono }) => (
//     <div style={{
//       display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
//       padding: '9px 0', borderBottom: '1px solid #f8fafc',
//     }}>
//       <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 500, minWidth: '150px', flexShrink: 0 }}>
//         {label}
//       </span>
//       <span style={{
//         fontSize: '13px', color: '#1e293b', fontWeight: 600, textAlign: 'right',
//         fontFamily: mono ? "'Courier New', monospace" : 'inherit',
//         wordBreak: 'break-all', paddingLeft: '12px',
//       }}>
//         {value || '—'}
//       </span>
//     </div>
//   );

//   const Section = ({ icon, title, children }) => (
//     <div style={{ marginBottom: '2px' }}>
//       <div style={{
//         fontSize: '10px', fontWeight: 700, color: '#94a3b8',
//         letterSpacing: '1px', textTransform: 'uppercase',
//         padding: '16px 0 6px', display: 'flex', alignItems: 'center', gap: '6px',
//       }}>
//         <span>{icon}</span>{title}
//       </div>
//       <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 16px' }}>
//         {children}
//       </div>
//     </div>
//   );

//   return (
//     <div style={overlay} onClick={onClose}>
//       <div onClick={e => e.stopPropagation()} style={{ ...card, width: '100%', maxWidth: '500px', maxHeight: '88vh' }}>
//         {/* Header */}
//         <div style={modalHeader}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <div style={{
//               background: '#eff6ff', borderRadius: '10px',
//               width: '40px', height: '40px',
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
//             }}>🧾</div>
//             <div>
//               <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>Billing Details</div>
//               <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', marginTop: '2px' }}>
//                 Project #{project._id}
//               </div>
//             </div>
//           </div>
//           <button style={closeBtn} onClick={onClose}>✕</button>
//         </div>

//         {/* Body */}
//         <div style={{ overflowY: 'auto', padding: '4px 24px 24px' }}>
//           {/* Badges */}
//           <div style={{ display: 'flex', gap: '6px', paddingTop: '14px', paddingBottom: '2px', flexWrap: 'wrap' }}>
//             <span style={badge('#10b981')}>{project.projectStatus}</span>
//             <span style={badge('#3b82f6')}>{project.projectType}</span>
//             {p.currency && <span style={badge('#f59e0b')}>{p.currency}</span>}
//             {p.provider && <span style={badge('#8b5cf6')}>{p.provider}</span>}
//           </div>

//           <Section icon="👤" title="Client">
//             <Row label="Name" value={project.clientName} />
//             <Row label="Client ID" value={`#${project.clientId}`} />
//             <Row label="Email" value={p.payer?.email} />
//             <Row label="Company" value={p.companyName} />
//           </Section>

//           <Section icon="📍" title="Address">
//             <Row label="Street" value={p.clientAddress} />
//             <Row label="City" value={p.clientCity} />
//             <Row label="State" value={p.clientState} />
//             <Row label="Country" value={p.clientCountry} />
//             <Row label="Pincode" value={p.clientPincode} />
//           </Section>

//           <Section icon="🧾" title="Invoice">
//             <Row label="Invoice No." value={p.invoiceNumber} mono />
//             <Row label="Invoice Date" value={p.invoiceDate} />
//             <Row label="Order ID" value={p.razorpayOrderId} mono />
//             <Row label="Transaction ID" value={p.transactionId} mono />
//             <Row label="GST Number" value={p.gstNumber} />
//           </Section>

//           <Section icon="💰" title="Payment">
//             <Row label="Subtotal" value={p.subtotal ? `$${p.subtotal}` : null} />
//             <Row label="Discount" value={`₹${p.discountAmount || 0}`} />
//             <Row label="Final (INR)" value={p.finalAmount ? `₹${p.finalAmount}` : null} />
//             <Row label="Final (USD)" value={p.finalAmountUSD ? `$${p.finalAmountUSD}` : null} />
//           </Section>

//           {Object.keys(tax).length > 0 && (
//             <Section icon="📊" title="Tax Breakdown">
//               <Row label="Pre-tax Subtotal" value={tax.subtotal ? `₹${parseFloat(tax.subtotal).toFixed(2)}` : null} />
//               <Row label="CGST" value={`₹${parseFloat(tax.cgst || 0).toFixed(2)}`} />
//               <Row label="SGST" value={`₹${parseFloat(tax.sgst || 0).toFixed(2)}`} />
//               <Row label="IGST" value={`₹${parseFloat(tax.igst || 0).toFixed(2)}`} />
//               <Row label="Total Tax" value={tax.totalTax ? `₹${parseFloat(tax.totalTax).toFixed(2)}` : null} />
//             </Section>
//           )}

//           {p.invoicePdfKey && (
//             <div style={{ marginTop: '20px', textAlign: 'center' }}>
//               <a
//                 href={p.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}`}
//                 target="_blank" rel="noopener noreferrer"
//                 style={{
//                   display: 'inline-flex', alignItems: 'center', gap: '8px',
//                   background: '#1e293b', color: '#fff',
//                   padding: '10px 22px', borderRadius: '10px',
//                   textDecoration: 'none', fontWeight: 600, fontSize: '13px',
//                 }}
//               >
//                 <i className="bi bi-file-earmark-pdf-fill" style={{ color: '#f87171' }} />
//                 View Invoice PDF
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── All Billings Table Modal ──────────────────────────────────────────────────
// const AllBillingsModal = ({ projects, onClose }) => {
//   const [search, setSearch] = useState('');

//   const filtered = projects.filter(cv => {
//     const q = search.toLowerCase();
//     const p = cv.payment || {};
//     return (
//       String(cv._id).includes(q) ||
//       (cv.clientName || '').toLowerCase().includes(q) ||
//       (p.invoiceNumber || '').toLowerCase().includes(q) ||
//       (p.clientCity || '').toLowerCase().includes(q) ||
//       (p.clientCountry || '').toLowerCase().includes(q) ||
//       (p.razorpayOrderId || '').toLowerCase().includes(q)
//     );
//   });

//   const thStyle = {
//     padding: '11px 14px', textAlign: 'left',
//     fontWeight: 700, fontSize: '11px', color: '#64748b',
//     textTransform: 'uppercase', letterSpacing: '0.5px',
//     borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap',
//     background: '#f8fafc',
//   };

//   const tdStyle = { padding: '11px 14px', fontSize: '13px', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' };

//   return (
//     <div style={overlay} onClick={onClose}>
//       <div onClick={e => e.stopPropagation()} style={{ ...card, width: '98vw', maxWidth: '1120px', maxHeight: '92vh' }}>
//         {/* Header */}
//         <div style={modalHeader}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <div style={{
//               background: '#f0fdf4', borderRadius: '10px',
//               width: '40px', height: '40px',
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
//             }}>📋</div>
//             <div>
//               <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>All Billing Records</div>
//               <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
//                 {filtered.length} of {projects.length} entries
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//             <div style={{ position: 'relative' }}>
//               <i className="bi bi-search" style={{
//                 position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
//                 color: '#94a3b8', fontSize: '12px',
//               }} />
//               <input
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search..."
//                 style={{
//                   border: '1.5px solid #e2e8f0', borderRadius: '8px',
//                   padding: '7px 12px 7px 30px', fontSize: '13px',
//                   outline: 'none', width: '200px', color: '#334155',
//                 }}
//               />
//             </div>
//             <button style={closeBtn} onClick={onClose}>✕</button>
//           </div>
//         </div>

//         {/* Table */}
//         <div style={{ overflowX: 'auto', overflowY: 'auto', flex: 1 }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
//               <tr>
//                 <th style={thStyle}>Project ID</th>
//                 <th style={thStyle}>Client Name</th>
//                 <th style={thStyle}>Invoice No.</th>
//                 <th style={thStyle}>Date</th>
//                 <th style={thStyle}>City</th>
//                 <th style={thStyle}>State</th>
//                 <th style={thStyle}>Country</th>
//                 <th style={thStyle}>Amount (INR)</th>
//                 <th style={thStyle}>Amount (USD)</th>
//                 <th style={thStyle}>Order ID</th>
//                 <th style={thStyle}>Status</th>
//                 <th style={thStyle}>Invoice</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={12} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
//                     No records found
//                   </td>
//                 </tr>
//               ) : filtered.map((cv) => {
//                 const p = cv.payment || {};
//                 return (
//                   <tr key={cv._id}
//                     style={{ transition: 'background 0.15s' }}
//                     onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
//                     onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>{cv._id}</td>
//                     <td style={{ ...tdStyle, fontWeight: 600, color: '#0f172a' }}>{cv.clientName || '—'}</td>
//                     <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: '#3b82f6' }}>{p.invoiceNumber || '—'}</td>
//                     <td style={{ ...tdStyle, color: '#64748b' }}>{p.invoiceDate || '—'}</td>
//                     <td style={{ ...tdStyle, color: '#334155' }}>{p.clientCity || '—'}</td>
//                     <td style={{ ...tdStyle, color: '#334155' }}>{p.clientState || '—'}</td>
//                     <td style={{ ...tdStyle, color: '#334155' }}>{p.clientCountry || '—'}</td>
//                     <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>
//                       {p.finalAmount ? `₹${p.finalAmount}` : '—'}
//                     </td>
//                     <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>
//                       {p.finalAmountUSD ? `$${p.finalAmountUSD}` : '—'}
//                     </td>
//                     <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '11px', color: '#94a3b8' }}>
//                       {p.razorpayOrderId || '—'}
//                     </td>
//                     <td style={tdStyle}>
//                       <span style={badge(p.status === 'completed' ? '#10b981' : '#f59e0b')}>
//                         {p.status || '—'}
//                       </span>
//                     </td>
//                     <td style={tdStyle}>
//                       {p.invoicePdfKey ? (
//                         <a
//                           href={p.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}`}
//                           target="_blank" rel="noopener noreferrer"
//                           style={{
//                             display: 'inline-flex', alignItems: 'center', gap: '4px',
//                             background: '#eff6ff', color: '#3b82f6',
//                             border: '1px solid #bfdbfe',
//                             padding: '4px 10px', borderRadius: '6px',
//                             textDecoration: 'none', fontSize: '12px', fontWeight: 600,
//                           }}
//                         >
//                           <i className="bi bi-file-earmark-pdf" /> PDF
//                         </a>
//                       ) : <span style={{ color: '#cbd5e1' }}>—</span>}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div style={{
//           padding: '13px 24px', borderTop: '1px solid #f1f5f9', background: '#fafafa',
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//         }}>
//           <span style={{ fontSize: '12px', color: '#94a3b8' }}>
//             Showing <strong style={{ color: '#334155' }}>{filtered.length}</strong> records
//           </span>
//           <button
//             onClick={onClose}
//             style={{
//               background: '#1e293b', color: '#fff', border: 'none',
//               borderRadius: '8px', padding: '8px 20px',
//               fontSize: '13px', fontWeight: 600, cursor: 'pointer',
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── CSV Download ──────────────────────────────────────────────────────────────
// const downloadCSV = (projects) => {
//   if (!projects || projects.length === 0) { toast.warn('No data to download!'); return; }

//   const headers = [
//     'S.No', 'Project ID', 'Client ID', 'Client Name', 'Email', 'Company',
//     'Address', 'City', 'State', 'Country', 'Pincode',
//     'Invoice Number', 'Invoice Date', 'Order ID', 'Transaction ID', 'Provider', 'Currency',
//     'Subtotal ($)', 'Discount (Rs)', 'Final Amount (INR)', 'Final Amount (USD)', 'GST Number',
//     'CGST (Rs)', 'SGST (Rs)', 'IGST (Rs)', 'Total Tax (Rs)',
//     'Project Type', 'Project Status', 'Package/Service', 'Invoice PDF URL',
//   ];

//   const esc = (val) => {
//     if (val === null || val === undefined) return '';
//     const str = String(val);
//     return (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\u20b9') || str.includes('$'))
//       ? `"${str.replace(/"/g, '""')}"` : str;
//   };
//   const inr = (v) => `\u20b9${parseFloat(v || 0).toFixed(2)}`;
//   const usd = (v) => `$${parseFloat(v || 0).toFixed(2)}`;

//   const rows = projects.map((cv, i) => {
//     const p = cv.payment || {};
//     const t = p.taxBreakdown || {};
//     return [
//       i + 1, cv._id, cv.clientId, cv.clientName,
//       p.payer?.email || '', p.companyName || '',
//       p.clientAddress || '', p.clientCity || '', p.clientState || '', p.clientCountry || '', p.clientPincode || '',
//       p.invoiceNumber || '', p.invoiceDate || '', p.razorpayOrderId || '', p.transactionId || '', p.provider || '', p.currency || '',
//       usd(p.subtotal), inr(p.discountAmount), inr(p.finalAmount), usd(p.finalAmountUSD), p.gstNumber || '',
//       inr(t.cgst), inr(t.sgst), inr(t.igst), inr(t.totalTax),
//       cv.projectType || '', cv.projectStatus || '',
//       cv.projectType === 'package' ? cv.packageId : 'Custom Project',
//       p.invoicePdfUrl || (p.invoicePdfKey ? `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}` : ''),
//     ].map(esc);
//   });

//   const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = `completed_billing_${new Date().toISOString().slice(0, 10)}.csv`;
//   document.body.appendChild(a); a.click();
//   document.body.removeChild(a); URL.revokeObjectURL(url);
//   toast.success('CSV downloaded!');
// };

// // ─── Main Page ─────────────────────────────────────────────────────────────────
// const CompleteProjectPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showAllBillings, setShowAllBillings] = useState(false);

//   const fetchProjects = async (currentPage = 1, currentLimit = 10) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/completed?page=${currentPage}&limit=${currentLimit}`);
//       const { data, totalPages } = response.data;
//       const completedWithTeam = data.filter(item => item.projectStatus === 'completed' && item.team);
//       setProjects(completedWithTeam);
//       setTotalPages(totalPages || 1);
//     } catch (error) {
//       console.error('Error fetching complete projects:', error);
//       toast.error('Failed to load complete projects');
//     }
//     setLoading(false);
//   };

//   useEffect(() => { fetchProjects(page, limit); }, [page, limit]);
//   const handleChange = (_, value) => setPage(value);

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Complete Projects</title></Helmet>

//       {selectedProject && <BillingModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
//       {showAllBillings && <AllBillingsModal projects={projects} onClose={() => setShowAllBillings(false)} />}

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>🏁 Complete Projects</Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
//           <div>
//             <input type='text' placeholder='🔍 Search ...' className='form-control' />
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <label className="mb-0">Show</label>
//             <select className="form-select" style={{ width: 'auto' }} value={limit}
//               onChange={e => { setPage(1); setLimit(Number(e.target.value)); }}>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label className="mb-0">entries</label>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         {/* Action Buttons */}
//         <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0 16px' }}>
//           <button
//             onClick={() => downloadCSV(projects)}
//             style={{
//               display: 'inline-flex', alignItems: 'center', gap: '7px',
//               background: '#1e293b', color: '#fff', border: 'none',
//               borderRadius: '9px', padding: '9px 18px',
//               fontSize: '13px', fontWeight: 600, cursor: 'pointer',
//             }}
//           >
//             <i className="bi bi-download" />
//             Download All Billing (CSV)
//           </button>

//           <button
//             onClick={() => setShowAllBillings(true)}
//             style={{
//               display: 'inline-flex', alignItems: 'center', gap: '7px',
//               background: '#fff', color: '#334155',
//               border: '1.5px solid #e2e8f0',
//               borderRadius: '9px', padding: '9px 18px',
//               fontSize: '13px', fontWeight: 600, cursor: 'pointer',
//             }}
//           >
//             <i className="bi bi-table" style={{ color: '#64748b' }} />
//             View All Billings
//           </button>
//         </div>

//         <section className='table-responsive'>
//           <table className='table table-striped table-bordered text-center table-hover align-middle data-sm'>
//             <thead className='table-dark'>
//               <tr>
//                 <th>S. No.</th>
//                 <th>Project ID</th>
//                 <th>Package / Service</th>
//                 <th>Price</th>
//                 <th>Client ID</th>
//                 <th>Client Name</th>
//                 <th>Invoice</th>
//                 <th>Billing</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="9"><div className="text-center py-5">Loading...</div></td></tr>
//               ) : projects.length > 0 ? (
//                 projects.map((cv, i) => (
//                   <tr key={cv._id}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{cv._id}</td>
//                     <td className='text-capitalize'>
//                       {cv.projectType === 'package' ? cv.packageId : cv.projectType || 'Custom Project'}
//                     </td>
//                     <td>
//                       <div style={{ fontWeight: 600, color: '#10b981' }}>₹{cv.totalPrice}</div>
//                       <small className="text-muted">${cv.totalPriceUSD}</small>
//                     </td>
//                     <td>{cv.clientId}</td>
//                     <td className='text-capitalize'>{cv.clientName}</td>
//                     <td>
//                       {cv.payment?.invoicePdfKey ? (
//                         <a
//                           href={cv.payment.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.payment.invoicePdfKey}`}
//                           target="_blank" rel="noopener noreferrer"
//                           className="btn btn-primary btn-sm"
//                         >
//                           <i className="bi bi-file-earmark-pdf me-1" />View
//                         </a>
//                       ) : <span className="text-muted">—</span>}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => setSelectedProject(cv)}
//                         style={{
//                           background: '#f8fafc', border: '1.5px solid #e2e8f0',
//                           borderRadius: '8px', padding: '6px 14px',
//                           fontSize: '12px', fontWeight: 600, color: '#334155',
//                           cursor: 'pointer', whiteSpace: 'nowrap',
//                           display: 'inline-flex', alignItems: 'center', gap: '5px',
//                           transition: 'all 0.18s',
//                         }}
//                         onMouseEnter={e => {
//                           e.currentTarget.style.background = '#1e293b';
//                           e.currentTarget.style.color = '#fff';
//                           e.currentTarget.style.borderColor = '#1e293b';
//                         }}
//                         onMouseLeave={e => {
//                           e.currentTarget.style.background = '#f8fafc';
//                           e.currentTarget.style.color = '#334155';
//                           e.currentTarget.style.borderColor = '#e2e8f0';
//                         }}
//                       >
//                         <i className="bi bi-receipt" />
//                         View Billing
//                       </button>
//                     </td>
//                     <td>
//                       <div className='d-flex flex-column align-items-center gap-1'>
//                         <Link className='btn border-0 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}>
//                           <i className="fa-solid fa-user-pen fa-sm text-success me-1" />
//                           <small className='fw-bold text-success'>update</small>
//                         </Link>
//                         <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 pb-0 text-nowrap'>
//                           <i className="fa-solid fa-eye fa-sm text-primary me-1" />
//                           <small className='fw-bold text-primary'>view</small>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="9"><h6 className='text-center py-5 w-100'>No completed Projects</h6></td></tr>
//               )}
//             </tbody>
//           </table>

//           {totalPages > 1 && (
//             <div className='d-flex justify-content-center py-3'>
//               <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
//             </div>
//           )}
//         </section>
//       </Container>
//     </>
//   );
// };

// export default CompleteProjectPage;









import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Url } from 'src/url/url';

// ─── Shared Styles ─────────────────────────────────────────────────────────────
const overlay = {
  position: 'fixed', inset: 0, zIndex: 9999,
  background: 'rgba(15,23,42,0.55)',
  backdropFilter: 'blur(6px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '16px',
};
const card = {
  background: '#fff', borderRadius: '20px',
  boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
  fontFamily: "'Inter','Segoe UI',sans-serif",
  display: 'flex', flexDirection: 'column', overflow: 'hidden',
};
const modalHeader = {
  padding: '18px 24px', borderBottom: '1px solid #f1f5f9',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  background: '#fafafa',
};
const closeBtn = {
  background: '#f1f5f9', border: 'none', borderRadius: '8px',
  width: '32px', height: '32px', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#64748b', fontSize: '15px', flexShrink: 0,
};
const badge = (color) => ({
  display: 'inline-block', background: color + '18', color,
  border: `1px solid ${color}35`, borderRadius: '6px',
  padding: '2px 10px', fontSize: '11px', fontWeight: 700,
  letterSpacing: '0.4px', textTransform: 'uppercase',
});
const dateInput = {
  border: '1.5px solid #e2e8f0', borderRadius: '8px',
  padding: '7px 12px', fontSize: '13px', color: '#334155',
  outline: 'none', background: '#fff', cursor: 'pointer',
};

// ─── Date Filter utility ────────────────────────────────────────────────────────
// uses createdAt field for filtering
const filterByDate = (list, startDate, endDate) => {
  if (!startDate && !endDate) return list;
  const start = startDate ? new Date(startDate + 'T00:00:00') : null;
  const end   = endDate   ? new Date(endDate   + 'T23:59:59') : null;
  return list.filter(cv => {
    const d = new Date(cv.createdAt);
    if (start && d < start) return false;
    if (end   && d > end)   return false;
    return true;
  });
};

// ─── Single Billing Modal ───────────────────────────────────────────────────────
const BillingModal = ({ project, onClose }) => {
  if (!project) return null;
  const p   = project.payment || {};
  const tax = p.taxBreakdown  || {};

  const Row = ({ label, value, mono }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #f0f4f8' }}>
      <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 500, minWidth: '150px', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: 600, textAlign: 'right', fontFamily: mono ? "'Courier New',monospace" : 'inherit', wordBreak: 'break-all', paddingLeft: '12px' }}>
        {value || '—'}
      </span>
    </div>
  );

  const Section = ({ icon, title, children }) => (
    <div style={{ marginBottom: '2px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', padding: '16px 0 6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>{icon}</span>{title}
      </div>
      <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 16px' }}>{children}</div>
    </div>
  );

  return (
    <div style={overlay} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ ...card, width: '100%', maxWidth: '500px', maxHeight: '88vh' }}>
        <div style={modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#eff6ff', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧾</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>Billing Details</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', marginTop: '2px' }}>Project #{project._id}</div>
            </div>
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', padding: '4px 24px 24px' }}>
          <div style={{ display: 'flex', gap: '6px', paddingTop: '14px', paddingBottom: '2px', flexWrap: 'wrap' }}>
            <span style={badge('#10b981')}>{project.projectStatus}</span>
            <span style={badge('#3b82f6')}>{project.projectType}</span>
            {p.currency  && <span style={badge('#f59e0b')}>{p.currency}</span>}
            {p.provider  && <span style={badge('#8b5cf6')}>{p.provider}</span>}
          </div>

          <Section icon="👤" title="Client">
            <Row label="Name"      value={project.clientName} />
            <Row label="Client ID" value={`#${project.clientId}`} />
            <Row label="Email"     value={p.payer?.email} />
            <Row label="Company"   value={p.companyName} />
          </Section>

          <Section icon="📍" title="Address">
            <Row label="Street"  value={p.clientAddress} />
            <Row label="City"    value={p.clientCity} />
            <Row label="State"   value={p.clientState} />
            <Row label="Country" value={p.clientCountry} />
            <Row label="Pincode" value={p.clientPincode} />
          </Section>

          <Section icon="🧾" title="Invoice">
            <Row label="Invoice No."    value={p.invoiceNumber}   mono />
            <Row label="Invoice Date"   value={p.invoiceDate} />
            <Row label="Order ID"       value={p.razorpayOrderId} mono />
            <Row label="Transaction ID" value={p.transactionId}   mono />
            <Row label="GST Number"     value={p.gstNumber} />
          </Section>

          <Section icon="💰" title="Payment">
            <Row label="Subtotal"      value={p.subtotal      ? `$${p.subtotal}`      : null} />
            <Row label="Discount"      value={`₹${p.discountAmount || 0}`} />
            <Row label="Final (INR)"   value={p.finalAmount   ? `₹${p.finalAmount}`   : null} />
            <Row label="Final (USD)"   value={p.finalAmountUSD ? `$${p.finalAmountUSD}` : null} />
          </Section>

          {Object.keys(tax).length > 0 && (
            <Section icon="📊" title="Tax Breakdown">
              <Row label="Pre-tax Subtotal" value={tax.subtotal  ? `₹${parseFloat(tax.subtotal).toFixed(2)}`  : null} />
              <Row label="CGST"             value={`₹${parseFloat(tax.cgst  || 0).toFixed(2)}`} />
              <Row label="SGST"             value={`₹${parseFloat(tax.sgst  || 0).toFixed(2)}`} />
              <Row label="IGST"             value={`₹${parseFloat(tax.igst  || 0).toFixed(2)}`} />
              <Row label="Total Tax"        value={tax.totalTax ? `₹${parseFloat(tax.totalTax).toFixed(2)}` : null} />
            </Section>
          )}

          {p.invoicePdfKey && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href={p.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1e293b', color: '#fff', padding: '10px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>
                <i className="bi bi-file-earmark-pdf-fill" style={{ color: '#f87171' }} />
                View Invoice PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── All Billings Table Modal ───────────────────────────────────────────────────
const AllBillingsModal = ({ projects, onClose, onDownloadCSV }) => {
  const [search,    setSearch]    = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate,   setEndDate]   = useState('');

  const filtered = useMemo(() => {
    let list = filterByDate(projects, startDate, endDate);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(cv => {
        const p = cv.payment || {};
        return (
          String(cv._id).includes(q) ||
          (cv.clientName      || '').toLowerCase().includes(q) ||
          (p.invoiceNumber    || '').toLowerCase().includes(q) ||
          (p.clientCity       || '').toLowerCase().includes(q) ||
          (p.clientCountry    || '').toLowerCase().includes(q) ||
          (p.razorpayOrderId  || '').toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [projects, search, startDate, endDate]);

  const hasDateFilter = startDate || endDate;

  const thStyle = {
    padding: '11px 14px', textAlign: 'left', fontWeight: 700, fontSize: '11px',
    color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px',
    borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap', background: '#f8fafc',
  };
  const tdStyle = { padding: '11px 14px', fontSize: '13px', borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' };

  return (
    <div style={overlay} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ ...card, width: '98vw', maxWidth: '1200px', maxHeight: '92vh' }}>

        {/* Header */}
        <div style={modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#f0fdf4', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📋</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>All Billing Records</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                {filtered.length} of {projects.length} entries
                {hasDateFilter && <span style={{ marginLeft: '8px', ...badge('#3b82f6'), fontSize: '10px' }}>Date filtered</span>}
              </div>
            </div>
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Filter Bar */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #f1f5f9', background: '#fff', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '160px' }}>
            <i className="bi bi-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '12px' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, invoice, city..."
              style={{ ...dateInput, width: '100%', paddingLeft: '30px' }} />
          </div>

          {/* Date Range */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>
              <i className="bi bi-calendar3 me-1" />Date Range:
            </span>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              style={{ ...dateInput, width: '150px' }} />
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>→</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
              style={{ ...dateInput, width: '150px' }} />
            {hasDateFilter && (
              <button onClick={() => { setStartDate(''); setEndDate(''); }}
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', borderRadius: '7px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Download filtered */}
          <button onClick={() => onDownloadCSV(filtered, startDate, endDate)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <i className="bi bi-download" />
            {hasDateFilter ? 'Download Filtered CSV' : 'Download All CSV'}
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Client Name</th>
                <th style={thStyle}>Invoice No.</th>
                <th style={thStyle}>Created Date</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>State</th>
                <th style={thStyle}>Country</th>
                <th style={thStyle}>Amount (INR)</th>
                <th style={thStyle}>Amount (USD)</th>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
                    {hasDateFilter ? '📅 No records in this date range' : 'No records found'}
                  </td>
                </tr>
              ) : filtered.map((cv) => {
                const p = cv.payment || {};
                return (
                  <tr key={cv._id}
                    style={{ transition: 'background 0.15s', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>{cv._id}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#0f172a' }}>{cv.clientName || '—'}</td>
                    <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px', color: '#3b82f6' }}>{p.invoiceNumber || '—'}</td>
                    <td style={{ ...tdStyle, color: '#64748b' }}>
                      {cv.createdAt ? new Date(cv.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td style={{ ...tdStyle, color: '#334155' }}>{p.clientCity    || '—'}</td>
                    <td style={{ ...tdStyle, color: '#334155' }}>{p.clientState   || '—'}</td>
                    <td style={{ ...tdStyle, color: '#334155' }}>{p.clientCountry || '—'}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>{p.finalAmount   ? `₹${p.finalAmount}` : '—'}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>{p.finalAmountUSD ? `$${p.finalAmountUSD}` : '—'}</td>
                    <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '11px', color: '#94a3b8' }}>{p.razorpayOrderId || '—'}</td>
                    <td style={tdStyle}>
                      <span style={badge(p.status === 'completed' ? '#10b981' : '#f59e0b')}>{p.status || '—'}</span>
                    </td>
                    <td style={tdStyle}>
                      {p.invoicePdfKey ? (
                        <a href={p.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe', padding: '4px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
                          <i className="bi bi-file-earmark-pdf" />PDF
                        </a>
                      ) : <span style={{ color: '#cbd5e1' }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: '13px 24px', borderTop: '1px solid #f1f5f9', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            Showing <strong style={{ color: '#334155' }}>{filtered.length}</strong> records
            {hasDateFilter && startDate && endDate && (
              <span style={{ marginLeft: '6px', color: '#64748b' }}>
                ({new Date(startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} – {new Date(endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })})
              </span>
            )}
          </span>
          <button onClick={onClose}
            style={{ background: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── CSV Download ───────────────────────────────────────────────────────────────
const downloadCSV = (projects, startDate = '', endDate = '') => {
  // apply date filter (if any)
  const data = filterByDate(projects, startDate, endDate);

  if (!data || data.length === 0) { toast.warn('No data to download for selected range!'); return; }

  const headers = [
    'S.No', 'Project ID', 'Client ID', 'Client Name', 'Email', 'Company',
    'Address', 'City', 'State', 'Country', 'Pincode',
    'Invoice Number', 'Invoice Date', 'Created Date',
    'Order ID', 'Transaction ID', 'Provider', 'Currency',
    'Subtotal ($)', 'Discount (Rs)', 'Final Amount (INR)', 'Final Amount (USD)', 'GST Number',
    'CGST (Rs)', 'SGST (Rs)', 'IGST (Rs)', 'Total Tax (Rs)',
    'Project Type', 'Project Status', 'Package/Service', 'Invoice PDF URL',
  ];

  const esc = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    return (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\u20b9') || str.includes('$'))
      ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const inr = (v) => `\u20b9${parseFloat(v || 0).toFixed(2)}`;
  const usd = (v) => `$${parseFloat(v || 0).toFixed(2)}`;
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

  const rows = data.map((cv, i) => {
    const p = cv.payment || {};
    const t = p.taxBreakdown || {};
    return [
      i + 1, cv._id, cv.clientId, cv.clientName,
      p.payer?.email || '', p.companyName || '',
      p.clientAddress || '', p.clientCity || '', p.clientState || '', p.clientCountry || '', p.clientPincode || '',
      p.invoiceNumber || '', p.invoiceDate || '', fmtDate(cv.createdAt),
      p.razorpayOrderId || '', p.transactionId || '', p.provider || '', p.currency || '',
      usd(p.subtotal), inr(p.discountAmount), inr(p.finalAmount), usd(p.finalAmountUSD), p.gstNumber || '',
      inr(t.cgst), inr(t.sgst), inr(t.igst), inr(t.totalTax),
      cv.projectType || '', cv.projectStatus || '',
      cv.projectType === 'package' ? cv.packageId : 'Custom Project',
      p.invoicePdfUrl || (p.invoicePdfKey ? `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${p.invoicePdfKey}` : ''),
    ].map(esc);
  });

  const csv    = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob   = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  const suffix = startDate && endDate ? `_${startDate}_to_${endDate}` : startDate ? `_from_${startDate}` : endDate ? `_till_${endDate}` : '_all';
  a.href       = url;
  a.download   = `completed_billing${suffix}.csv`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  toast.success(`CSV downloaded! (${data.length} records)`);
};

// ─── Main Page ──────────────────────────────────────────────────────────────────
const CompleteProjectPage = () => {
  const [projects,        setProjects]        = useState([]);
  const [page,            setPage]            = useState(1);
  const [totalPages,      setTotalPages]      = useState(1);
  const [limit,           setLimit]           = useState(10);
  const [loading,         setLoading]         = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllBillings, setShowAllBillings] = useState(false);

  // Date filter state (for main page table)
  const [startDate, setStartDate] = useState('');
  const [endDate,   setEndDate]   = useState('');

  const fetchProjects = async (currentPage = 1, currentLimit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Url}/project/completed?page=${currentPage}&limit=${currentLimit}`);
      const { data, totalPages } = response.data;
      const completedWithTeam = data.filter(item => item.projectStatus === 'completed' && item.team);
      setProjects(completedWithTeam);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.error('Error fetching complete projects:', error);
      toast.error('Failed to load complete projects');
    }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(page, limit); }, [page, limit]);
  const handleChange = (_, value) => setPage(value);

  // Apply date filter to current page's data
  const filteredProjects = useMemo(() => filterByDate(projects, startDate, endDate), [projects, startDate, endDate]);
  const hasDateFilter    = startDate || endDate;

  return (
    <>
      <ToastContainer />
      <Helmet><title>Complete Projects</title></Helmet>

      {selectedProject && <BillingModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {showAllBillings  && (
        <AllBillingsModal
          projects={projects}
          onClose={() => setShowAllBillings(false)}
          onDownloadCSV={downloadCSV}
        />
      )}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>🏁 Complete Projects</Typography>
        </Stack>
      </Container>

      {/* Search + Entries row */}
      <Container>
        <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
          <div>
            <input type='text' placeholder='🔍 Search ...' className='form-control' />
          </div>
          <div className="d-flex align-items-center gap-2">
            <label className="mb-0">Show</label>
            <select className="form-select" style={{ width: 'auto' }} value={limit}
              onChange={e => { setPage(1); setLimit(Number(e.target.value)); }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <label className="mb-0">entries</label>
          </div>
        </div>
      </Container>

      <Container>
        {/* ── Date Filter + Action Buttons Row ── */}
        <div style={{
          display: 'flex', gap: '10px', alignItems: 'center',
          flexWrap: 'wrap', margin: '14px 0',
          padding: '14px 18px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1.5px solid #e2e8f0',
        }}>
          {/* Date Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap' }}>
              <i className="bi bi-calendar3 me-1" />Filter by Date:
            </span>
            <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value); setPage(1); }}
              style={{ ...dateInput, width: '148px' }} />
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>→</span>
            <input type="date" value={endDate} onChange={e => { setEndDate(e.target.value); setPage(1); }}
              style={{ ...dateInput, width: '148px' }} />
            {hasDateFilter && (
              <button onClick={() => { setStartDate(''); setEndDate(''); setPage(1); }}
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', borderRadius: '7px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                ✕ Clear Filter
              </button>
            )}
            {hasDateFilter && (
              <span style={{ ...badge('#3b82f6'), fontSize: '11px' }}>
                {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '32px', background: '#e2e8f0' }} />

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => downloadCSV(projects, startDate, endDate)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '9px', padding: '9px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              <i className="bi bi-download" />
              {hasDateFilter ? 'Download Filtered CSV' : 'Download All CSV'}
            </button>

            <button onClick={() => setShowAllBillings(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#fff', color: '#334155', border: '1.5px solid #e2e8f0', borderRadius: '9px', padding: '9px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              <i className="bi bi-table" style={{ color: '#64748b' }} />
              View All Billings
            </button>
          </div>
        </div>

        {/* Table */}
        <section className='table-responsive'>
          <table className='table table-striped table-bordered text-center table-hover align-middle data-sm'>
            <thead className='table-dark'>
              <tr>
                <th>S. No.</th>
                <th>Project ID</th>
                <th>Package / Service</th>
                <th>Price</th>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Created Date</th>
                <th>Invoice</th>
                <th>Billing</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="10"><div className="text-center py-5">Loading...</div></td></tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((cv, i) => (
                  <tr key={cv._id}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{cv._id}</td>
                    <td className='text-capitalize'>{cv.projectType === 'package' ? cv.packageId : cv.projectType || 'Custom Project'}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#10b981' }}>₹{cv.totalPrice}</div>
                      <small className="text-muted">${cv.totalPriceUSD}</small>
                    </td>
                    <td>{cv.clientId}</td>
                    <td className='text-capitalize'>{cv.clientName}</td>
                    <td style={{ color: '#64748b', fontSize: '12px' }}>
                      {cv.createdAt ? new Date(cv.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td>
                      {cv.payment?.invoicePdfKey ? (
                        <a href={cv.payment.invoicePdfUrl || `https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.payment.invoicePdfKey}`}
                          target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                          <i className="bi bi-file-earmark-pdf me-1" />View
                        </a>
                      ) : <span className="text-muted">—</span>}
                    </td>
                    <td>
                      <button onClick={() => setSelectedProject(cv)}
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'all 0.18s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1e293b'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#334155'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                        <i className="bi bi-receipt" />View Billing
                      </button>
                    </td>
                    <td>
                      <div className='d-flex flex-column align-items-center gap-1'>
                        <Link className='btn border-0 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}>
                          <i className="fa-solid fa-user-pen fa-sm text-success me-1" />
                          <small className='fw-bold text-success'>update</small>
                        </Link>
                        <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 pb-0 text-nowrap'>
                          <i className="fa-solid fa-eye fa-sm text-primary me-1" />
                          <small className='fw-bold text-primary'>view</small>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">
                    <div className='text-center py-5'>
                      {hasDateFilter
                        ? <><div style={{ fontSize: '32px' }}>📅</div><h6 className='mt-2'>No projects found in this date range</h6></>
                        : <h6>No completed Projects</h6>
                      }
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className='d-flex justify-content-center py-3'>
              <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default CompleteProjectPage;