// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Url } from 'src/url/url'; // ✅ Make sure Url = 'http://localhost:5000/api' or your API root
// import Swal from 'sweetalert2';
// import CircularProgress from './CircularProgress';
// import { Link } from 'react-router-dom';


// const Freelancers = () => {
//   const [freelancers, setFreelancers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getAllfreelancersfunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/freelancer/frelancerall`);
//       setFreelancers(response.data.data  || []);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError("Something went wrong while fetching freelancers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllfreelancersfunc();
//   }, []);



//   const handleApprove = (freelancer) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to approve ${freelancer.firstName} ${freelancer.lastName}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#28a745',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, approve!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           // ✅ CALL THE CORRECT MIGRATION API
//           await axios.post(`${Url}/freelancer/migrate-freelancer/${freelancer._id}`,{
//                   status: 'approved',
//           });

//           Swal.fire('Approved!', 'Freelancer has been approved and migrated.', 'success');
//           getAllfreelancersfunc(); // refresh list
//         } catch (error) {
//           console.error('❌ Error approving freelancer:', error);
//           Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
//         }
//       }
//     });
//   };

//   const handleReject = (freelancer) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to reject ${freelancer.firstName} ${freelancer.lastName}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#dc3545',
//       cancelButtonColor: '#6c757d',
//       confirmButtonText: 'Yes, reject!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.put(`${Url}/freelancer/update-status/${freelancer._id}`, {
//             status: 'rejected',
//           });
//           Swal.fire('Rejected!', 'Freelancer has been rejected.', 'success');
//           getAllfreelancersfunc();
//         } catch (error) {
//           console.error('❌ Error rejecting freelancer:', error);
//           Swal.fire('Error!', 'Something went wrong.', 'error');
//         }
//       }
//     });
//   };
// const handleSendMail = (freelancer) => {
//   Swal.fire({
//     title: 'Send Email?',
//     text: `Do you want to send an email to ${freelancer.firstName} ${freelancer.lastName}?`,
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, send it!',
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         await axios.post(`${Url}/freelancer/send-mail/${freelancer._id}`);
//         Swal.fire('Sent!', 'Email has been sent successfully.', 'success');
//       } catch (error) {
//         console.error('❌ Email send error:', error);
//         Swal.fire('Error!', 'Failed to send email.', 'error');
//       }
//     }
//   });
// };

//   return (
//     <div className='container mt-5'>
//       <h3 className="text-primary mb-4">Freelancer List</h3>

//       {loading && (
//         <div className="text-center my-5">
//           <div className="spinner-border text-primary" role="status"></div>
//           <p className="text-muted mt-2">Loading freelancers...</p>
//         </div>
//       )}

//       {!loading && error && (
//         <div className="alert alert-danger">{error}</div>
//       )}

//       {!loading && !error && freelancers.length === 0 && (
//         <div className="alert alert-warning">No freelancer data found.</div>
//       )}

//       {!loading && !error && freelancers.length > 0 && (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Bank Detail</th>
//                 <th>Phone</th>
//                 <th>Country</th>
//                 <th>Experience</th>
//                 <th>Role</th>
//                 <th>Status</th>
//                 <th>Portfolio</th>
//                 <th>Profile</th>
//                 <th>Send Mail</th>
//               </tr>
//             </thead>
//             <tbody>
//               {freelancers.map((f) => (
//                 <tr key={f._id}>
//                   {/* <td className='text-primary'>{f.firstName} {f.lastName}</td> */}
            

// <td className='text-primary'>
//   <Link to={`/dashboard/view-Freelancer/${f._id}`}>
//     {f.firstName} {f.lastName}
//   </Link>
// </td>

//                   <td>{f.email}</td>
//                   <td></td>
//                   <td>{f.phone}</td>
//                   <td>{f.country}</td>
//                   <td>{f.experience}</td>
//                   <td>{f.role}</td>
//                   <td>
//                     <span className={`badge ${f.isAdminApproved === 'pending' ? 'bg-warning text-dark' : f.isAdminApproved === 'approved' ? 'bg-success' : 'bg-secondary'}`}>
//                       {f.isAdminApproved}
//                     </span>

//                     {f.isAdminApproved === 'pending' && (
//                       <>
//                         <button
//                           className="btn bg-success text-white ms-2"
//                           onClick={() => handleApprove(f)}
//                         >
//                           <i className="fa-solid fa-check"></i>
//                         </button>

//                         <button
//                           className="btn bg-danger text-white ms-2"
//                           onClick={() => handleReject(f)}
//                         >
//                           <i className="fa-solid fa-xmark"></i>
//                         </button>
//                       </>
//                     )}
//                   </td>
//                   <td>
//                     {f.portfolio ? (
//                       <a
//                         href={f.portfolio}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn btn-sm btn-outline-primary"
//                       >
//                         View PDF
//                       </a>
//                     ) : (
//                       <span className="text-muted">No Portfolio</span>
//                     )}
//                   </td>
//                 <td>
//   {/* <meter 
//     value={f.profileCompletion} 
//     min="0" 
//     max="100"
//     low="40" 
//     high="80" 
//     optimum="100">
//   </meter> {f.profileCompletion}% */}
//    <CircularProgress value={f.profileCompletion} />
// </td>
// <td className='text-center'>
//   <button 
//     className='btn btn-primary'
//     onClick={() => handleSendMail(f)}
//   >
//     <i className="fa-regular fa-paper-plane"></i>
//   </button>
// </td>



//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Freelancers;








// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Url } from 'src/url/url';
// import Swal from 'sweetalert2';
// import CircularProgress from './CircularProgress';
// import { Link } from 'react-router-dom';

// const Freelancers = () => {
//   const [freelancers, setFreelancers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   const getAllfreelancersfunc = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/freelancer/frelancerall`);
//       setFreelancers(response.data.data || []);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError("Something went wrong while fetching freelancers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllfreelancersfunc();
//   }, []);

//   const handleApprove = (freelancer) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to approve ${freelancer.firstName} ${freelancer.lastName}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#28a745',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, approve!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.post(`${Url}/freelancer/migrate-freelancer/${freelancer._id}`, {
//             status: 'approved',
//           });
//           Swal.fire('Approved!', 'Freelancer has been approved and migrated.', 'success');
//           getAllfreelancersfunc();
//         } catch (error) {
//           console.error('❌ Error approving freelancer:', error);
//           Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
//         }
//       }
//     });
//   };

//   const handleReject = (freelancer) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `Do you want to reject ${freelancer.firstName} ${freelancer.lastName}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#dc3545',
//       cancelButtonColor: '#6c757d',
//       confirmButtonText: 'Yes, reject!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.put(`${Url}/freelancer/update-status/${freelancer._id}`, {
//             status: 'rejected',
//           });
//           Swal.fire('Rejected!', 'Freelancer has been rejected.', 'success');
//           getAllfreelancersfunc();
//         } catch (error) {
//           console.error('❌ Error rejecting freelancer:', error);
//           Swal.fire('Error!', 'Something went wrong.', 'error');
//         }
//       }
//     });
//   };

//   const handleSendMail = (freelancer) => {
//     console.log(freelancer._id)
//     Swal.fire({
//       title: 'Send Email?',
//       text: `Do you want to send an email to ${freelancer.firstName} ${freelancer.lastName}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, send it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.post(`${Url}/freelancer/send-mail/${freelancer._id}`);
//           Swal.fire('Sent!', 'Email has been sent successfully.', 'success');
//         } catch (error) {
//           console.error('❌ Email send error:', error);
//           Swal.fire('Error!', 'Failed to send email.', 'error');
//         }
//       }
//     });
//   };

//   // Filter freelancers
//   const filteredFreelancers = freelancers.filter((f) => {
//     const matchesSearch =
//       f.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       f.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       f.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       f.country?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus = filterStatus === 'all' || f.isAdminApproved === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   const styles = {
//     container: {
//       maxWidth: '1400px',
//       margin: '0 auto',
//       padding: '2rem 1rem',
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '2rem',
//       flexWrap: 'wrap',
//       gap: '1.5rem',
//     },
//     headerLeft: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1.25rem',
//     },
//     headerIcon: {
//       width: '56px',
//       height: '56px',
//       background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
//       borderRadius: '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'white',
//       fontSize: '1.5rem',
//       boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
//     },
//     pageTitle: {
//       fontSize: '1.875rem',
//       fontWeight: '700',
//       color: '#1a202c',
//       margin: '0',
//       lineHeight: '1.2',
//     },
//     pageSubtitle: {
//       fontSize: '0.938rem',
//       color: '#718096',
//       margin: '0.25rem 0 0 0',
//     },
//     statsCard: {
//       background: 'white',
//       borderRadius: '16px',
//       padding: '1.5rem',
//       marginBottom: '1.5rem',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
//       border: '1px solid #e2e8f0',
//     },
//     filtersRow: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1.5rem',
//       flexWrap: 'wrap',
//     },
//     searchContainer: {
//       flex: '1',
//       minWidth: '280px',
//       position: 'relative',
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '1rem',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       color: '#94a3b8',
//       fontSize: '0.938rem',
//     },
//     searchInput: {
//       width: '100%',
//       padding: '0.75rem 2.75rem',
//       border: '2px solid #e2e8f0',
//       borderRadius: '12px',
//       fontSize: '0.938rem',
//       background: '#f8fafc',
//       transition: 'all 0.3s ease',
//     },
//     filterSelect: {
//       padding: '0.75rem 2.5rem 0.75rem 1rem',
//       border: '2px solid #e2e8f0',
//       borderRadius: '12px',
//       fontSize: '0.875rem',
//       background: 'white',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       minWidth: '160px',
//     },
//     statsBadges: {
//       display: 'flex',
//       gap: '1rem',
//       marginLeft: 'auto',
//       flexWrap: 'wrap',
//     },
//     statBadge: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.625rem 1rem',
//       borderRadius: '10px',
//       fontSize: '0.875rem',
//       fontWeight: '600',
//     },
//     tableCard: {
//       background: 'white',
//       borderRadius: '16px',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
//       border: '1px solid #e2e8f0',
//       overflow: 'hidden',
//     },
//     tableWrapper: {
//       overflowX: 'auto',
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       minWidth: '1200px',
//     },
//     tableHead: {
//       background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
//       borderBottom: '2px solid #e2e8f0',
//     },
//     th: {
//       padding: '1rem 1.25rem',
//       textAlign: 'left',
//       fontSize: '0.813rem',
//       fontWeight: '600',
//       color: '#475569',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       whiteSpace: 'nowrap',
//     },
//     td: {
//       padding: '1rem 1.25rem',
//       fontSize: '0.938rem',
//       color: '#334155',
//       verticalAlign: 'middle',
//       borderBottom: '1px solid #f1f5f9',
//     },
//     freelancerInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//     },
//     avatar: {
//       width: '40px',
//       height: '40px',
//       borderRadius: '10px',
//       background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
//       color: 'white',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: '600',
//       fontSize: '0.875rem',
//       textTransform: 'uppercase',
//       flexShrink: 0,
//     },
//     nameLink: {
//       color: '#1e293b',
//       fontWeight: '600',
//       textDecoration: 'none',
//       transition: 'color 0.2s ease',
//     },
//     statusBadge: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.375rem',
//       padding: '0.375rem 0.875rem',
//       borderRadius: '8px',
//       fontSize: '0.813rem',
//       fontWeight: '600',
//       whiteSpace: 'nowrap',
//     },
//     actionBtn: {
//       width: '36px',
//       height: '36px',
//       border: 'none',
//       borderRadius: '8px',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       fontSize: '0.875rem',
//       marginLeft: '0.5rem',
//     },
//     viewBtn: {
//       padding: '0.5rem 1rem',
//       background: '#dbeafe',
//       color: '#1e40af',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '0.813rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       textDecoration: 'none',
//       display: 'inline-block',
//     },
//     loadingContainer: {
//       textAlign: 'center',
//       padding: '4rem 2rem',
//     },
//     spinner: {
//       width: '48px',
//       height: '48px',
//       border: '4px solid #f1f5f9',
//       borderTopColor: '#f59e0b',
//       borderRadius: '50%',
//       animation: 'spin 0.8s linear infinite',
//       margin: '0 auto 1rem',
//     },
//     emptyState: {
//       textAlign: 'center',
//       padding: '4rem 2rem',
//       color: '#94a3b8',
//     },
//     emptyIcon: {
//       fontSize: '4rem',
//       marginBottom: '1rem',
//       opacity: 0.3,
//     },
//   };

//   // Custom CSS for animations
//   const customCSS = `
//     @keyframes spin {
//       to { transform: rotate(360deg); }
//     }
    
//     *::-webkit-scrollbar {
//       width: 8px;
//       height: 8px;
//     }
    
//     *::-webkit-scrollbar-track {
//       background: #f1f5f9;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb {
//       background: #cbd5e1;
//       border-radius: 10px;
//     }
    
//     *::-webkit-scrollbar-thumb:hover {
//       background: #94a3b8;
//     }

//     .hover-lift:hover {
//       transform: translateY(-2px);
//     }
//   `;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending':
//         return { background: '#fef3c7', color: '#92400e' };
//       case 'approved':
//         return { background: '#d1fae5', color: '#065f46' };
//       case 'rejected':
//         return { background: '#fee2e2', color: '#991b1b' };
//       default:
//         return { background: '#f1f5f9', color: '#475569' };
//     }
//   };

//   const statusCounts = {
//     total: freelancers.length,
//     pending: freelancers.filter((f) => f.isAdminApproved === 'pending').length,
//     approved: freelancers.filter((f) => f.isAdminApproved === 'approved').length,
//     rejected: freelancers.filter((f) => f.isAdminApproved === 'rejected').length,
//   };

//   return (
//     <>
//       <style>{customCSS}</style>
//       <div style={styles.container}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.headerLeft}>
//             <div style={styles.headerIcon}>
//               <i className="fa-solid fa-user-tie"></i>
//             </div>
//             <div>
//               <h1 style={styles.pageTitle}>Freelancer Management</h1>
//               <p style={styles.pageSubtitle}>Manage and approve freelancer applications</p>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Stats */}
//         <div style={styles.statsCard}>
//           <div style={styles.filtersRow}>
//             {/* Search */}
//             <div style={styles.searchContainer}>
//               <i className="fa-solid fa-magnifying-glass" style={styles.searchIcon}></i>
//               <input
//                 type="text"
//                 placeholder="Search by name, email, country..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={styles.searchInput}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#f59e0b';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e2e8f0';
//                   e.target.style.background = '#f8fafc';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             {/* Filter by Status */}
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               style={styles.filterSelect}
//               onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
//               onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>

//             {/* Stats Badges */}
//             <div style={styles.statsBadges}>
//               <div style={{ ...styles.statBadge, background: '#e0f2fe', color: '#0369a1' }}>
//                 <i className="fa-solid fa-users"></i>
//                 <span>{statusCounts.total} Total</span>
//               </div>
//               <div style={{ ...styles.statBadge, background: '#fef3c7', color: '#92400e' }}>
//                 <i className="fa-solid fa-clock"></i>
//                 <span>{statusCounts.pending} Pending</span>
//               </div>
//               <div style={{ ...styles.statBadge, background: '#d1fae5', color: '#065f46' }}>
//                 <i className="fa-solid fa-check-circle"></i>
//                 <span>{statusCounts.approved} Approved</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div style={styles.loadingContainer}>
//             <div style={styles.spinner}></div>
//             <p style={{ color: '#94a3b8', fontSize: '0.938rem' }}>Loading freelancers...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {!loading && error && (
//           <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '12px', marginBottom: '1.5rem' }}>
//             {error}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && filteredFreelancers.length === 0 && (
//           <div style={styles.emptyState}>
//             <i className="fa-solid fa-user-slash" style={styles.emptyIcon}></i>
//             <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#64748b', margin: '0 0 0.5rem 0' }}>
//               No Freelancers Found
//             </h3>
//             <p style={{ fontSize: '0.938rem', color: '#94a3b8', margin: 0 }}>
//               {searchQuery || filterStatus !== 'all'
//                 ? 'Try adjusting your filters'
//                 : 'No freelancer applications yet'}
//             </p>
//           </div>
//         )}

//         {/* Table */}
//         {!loading && !error && filteredFreelancers.length > 0 && (
//           <div style={styles.tableCard}>
//             <div style={styles.tableWrapper}>
//               <table style={styles.table}>
//                 <thead style={styles.tableHead}>
//                   <tr>
//                     <th style={styles.th}>#</th>
//                     <th style={styles.th}>Freelancer</th>
//                     <th style={styles.th}>Email</th>
//                     <th style={styles.th}>Phone</th>
//                     <th style={styles.th}>Country</th>
//                     <th style={styles.th}>Experience</th>
//                     <th style={styles.th}>Role</th>
//                     <th style={styles.th}>Status</th>
//                     <th style={styles.th}>Portfolio</th>
//                     <th style={styles.th}>Profile</th>
//                     <th style={styles.th}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredFreelancers.map((f, index) => (
//                     <tr
//                       key={f._id}
//                       onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
//                       onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
//                     >
//                       <td style={{ ...styles.td, color: '#94a3b8', fontWeight: '600', width: '60px' }}>
//                         {index + 1}
//                       </td>
//                       <td style={styles.td}>
//                         <div style={styles.freelancerInfo}>
//                           <div style={styles.avatar}>
//                             {f.firstName?.[0]}{f.lastName?.[0]}
//                           </div>
//                           <Link
//                             to={`/dashboard/view-Freelancer/${f._id}`}
//                             style={styles.nameLink}
//                             onMouseEnter={(e) => {
//                               e.target.style.color = '#f59e0b';
//                               e.target.style.textDecoration = 'underline';
//                             }}
//                             onMouseLeave={(e) => {
//                               e.target.style.color = '#1e293b';
//                               e.target.style.textDecoration = 'none';
//                             }}
//                           >
//                             {f.firstName} {f.lastName}
//                           </Link>
//                         </div>
//                       </td>
//                       <td style={{ ...styles.td, color: '#64748b', fontSize: '0.875rem' }}>{f.email}</td>
//                       <td style={styles.td}>{f.phone || '—'}</td>
//                       <td style={styles.td}>{f.country || '—'}</td>
//                       <td style={styles.td}>{f.experience || '—'}</td>
//                       <td style={styles.td}>
//                         <span
//                           style={{
//                             padding: '0.375rem 0.875rem',
//                             background: '#f1f5f9',
//                             color: '#475569',
//                             borderRadius: '8px',
//                             fontSize: '0.813rem',
//                             fontWeight: '500',
//                             textTransform: 'capitalize',
//                           }}
//                         >
//                           {f.role || 'N/A'}
//                         </span>
//                       </td>
//                       <td style={styles.td}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                           <span style={{ ...styles.statusBadge, ...getStatusColor(f.isAdminApproved) }}>
//                             {f.isAdminApproved === 'pending' && <i className="fa-solid fa-clock"></i>}
//                             {f.isAdminApproved === 'approved' && <i className="fa-solid fa-check-circle"></i>}
//                             {f.isAdminApproved === 'rejected' && <i className="fa-solid fa-times-circle"></i>}
//                             {f.isAdminApproved}
//                           </span>

//                           {f.isAdminApproved === 'pending' && (
//                             <>
//                               <button
//                                 style={{ ...styles.actionBtn, background: '#d1fae5', color: '#065f46' }}
//                                 onClick={() => handleApprove(f)}
//                                 onMouseEnter={(e) => {
//                                   e.target.style.background = '#10b981';
//                                   e.target.style.color = 'white';
//                                   e.target.style.transform = 'translateY(-2px)';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.target.style.background = '#d1fae5';
//                                   e.target.style.color = '#065f46';
//                                   e.target.style.transform = 'translateY(0)';
//                                 }}
//                                 title="Approve"
//                               >
//                                 <i className="fa-solid fa-check"></i>
//                               </button>

//                               <button
//                                 style={{ ...styles.actionBtn, background: '#fee2e2', color: '#991b1b' }}
//                                 onClick={() => handleReject(f)}
//                                 onMouseEnter={(e) => {
//                                   e.target.style.background = '#ef4444';
//                                   e.target.style.color = 'white';
//                                   e.target.style.transform = 'translateY(-2px)';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.target.style.background = '#fee2e2';
//                                   e.target.style.color = '#991b1b';
//                                   e.target.style.transform = 'translateY(0)';
//                                 }}
//                                 title="Reject"
//                               >
//                                 <i className="fa-solid fa-xmark"></i>
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </td>
//                       <td style={styles.td}>
//                         {f.portfolio ? (
//                           <a
//                             href={f.portfolio}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={styles.viewBtn}
//                             onMouseEnter={(e) => {
//                               e.target.style.background = '#60a5fa';
//                               e.target.style.color = 'white';
//                               e.target.style.transform = 'translateY(-2px)';
//                             }}
//                             onMouseLeave={(e) => {
//                               e.target.style.background = '#dbeafe';
//                               e.target.style.color = '#1e40af';
//                               e.target.style.transform = 'translateY(0)';
//                             }}
//                           >
//                             <i className="fa-solid fa-file-pdf me-1"></i> View
//                           </a>
//                         ) : (
//                           <span style={{ color: '#cbd5e1', fontWeight: '500' }}>—</span>
//                         )}
//                       </td>
//                       <td style={styles.td}>
//                         <CircularProgress value={f.profileCompletion} />
//                       </td>
//                       <td style={styles.td}>
//                         <button
//                           style={{ ...styles.actionBtn, background: '#dbeafe', color: '#1e40af' }}
//                           onClick={() => handleSendMail(f)}
//                           onMouseEnter={(e) => {
//                             e.target.style.background = '#60a5fa';
//                             e.target.style.color = 'white';
//                             e.target.style.transform = 'translateY(-2px)';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.target.style.background = '#dbeafe';
//                             e.target.style.color = '#1e40af';
//                             e.target.style.transform = 'translateY(0)';
//                           }}
//                           title="Send Email"
//                         >
//                           <i className="fa-regular fa-paper-plane"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Freelancers;











import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Url } from 'src/url/url';
import Swal from 'sweetalert2';
import CircularProgress from './CircularProgress';
import { Link } from 'react-router-dom';

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getAllfreelancersfunc = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/freelancer/frelancerall`);
      setFreelancers(response.data.data || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("Something went wrong while fetching freelancers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllfreelancersfunc();
  }, []);

  // ✅ ROOT FIX: Mongoose "virtuals: true" set hone se _id ki jagah
  // sirf "id" virtual field aata hai frontend pe.
  // Isliye f._id || f.id use karo — jo bhi valid ObjectId ho woh use hoga.
  const getId = (f) => f._id || f.id;

  const handleApprove = (freelancer) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to approve ${freelancer.firstName} ${freelancer.lastName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${Url}/freelancer/migrate-freelancer/${getId(freelancer)}`, { // ✅ FIX
            status: 'approved',
          });
          Swal.fire('Approved!', 'Freelancer has been approved and migrated.', 'success');
          getAllfreelancersfunc();
        } catch (error) {
          console.error('❌ Error approving freelancer:', error);
          Swal.fire('Error!', error.response?.data?.message || 'Something went wrong.', 'error');
        }
      }
    });
  };

  const handleReject = (freelancer) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to reject ${freelancer.firstName} ${freelancer.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, reject!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${Url}/freelancer/update-status/${getId(freelancer)}`, { // ✅ FIX
            status: 'rejected',
          });
          Swal.fire('Rejected!', 'Freelancer has been rejected.', 'success');
          getAllfreelancersfunc();
        } catch (error) {
          console.error('❌ Error rejecting freelancer:', error);
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      }
    });
  };

  const handleSendMail = (freelancer) => {
    const freelancerId = getId(freelancer); // ✅ FIX — "122" nahi, real ObjectId milega
    console.log('✅ Sending mail to ID:', freelancerId);

    Swal.fire({
      title: 'Send Email?',
      text: `Do you want to send an email to ${freelancer.firstName} ${freelancer.lastName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${Url}/freelancer/send-mail/${freelancerId}`); // ✅ FIX
          Swal.fire('Sent!', 'Email has been sent successfully.', 'success');
        } catch (error) {
          console.error('❌ Email send error:', error);
          Swal.fire('Error!', 'Failed to send email.', 'error');
        }
      }
    });
  };

  const filteredFreelancers = freelancers.filter((f) => {
    const matchesSearch =
      f.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.country?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || f.isAdminApproved === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const styles = {
    container: { maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
    headerIcon: { width: '56px', height: '56px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' },
    pageTitle: { fontSize: '1.875rem', fontWeight: '700', color: '#1a202c', margin: '0', lineHeight: '1.2' },
    pageSubtitle: { fontSize: '0.938rem', color: '#718096', margin: '0.25rem 0 0 0' },
    statsCard: { background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    filtersRow: { display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' },
    searchContainer: { flex: '1', minWidth: '280px', position: 'relative' },
    searchIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.938rem' },
    searchInput: { width: '100%', padding: '0.75rem 2.75rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '0.938rem', background: '#f8fafc', transition: 'all 0.3s ease' },
    filterSelect: { padding: '0.75rem 2.5rem 0.75rem 1rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '0.875rem', background: 'white', cursor: 'pointer', transition: 'all 0.2s ease', minWidth: '160px' },
    statsBadges: { display: 'flex', gap: '1rem', marginLeft: 'auto', flexWrap: 'wrap' },
    statBadge: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600' },
    tableCard: { background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' },
    tableWrapper: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '1200px' },
    tableHead: { background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '2px solid #e2e8f0' },
    th: { padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.813rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' },
    td: { padding: '1rem 1.25rem', fontSize: '0.938rem', color: '#334155', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9' },
    freelancerInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    avatar: { width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', flexShrink: 0 },
    nameLink: { color: '#1e293b', fontWeight: '600', textDecoration: 'none', transition: 'color 0.2s ease' },
    statusBadge: { display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.875rem', borderRadius: '8px', fontSize: '0.813rem', fontWeight: '600', whiteSpace: 'nowrap' },
    actionBtn: { width: '36px', height: '36px', border: 'none', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '0.875rem', marginLeft: '0.5rem' },
    viewBtn: { padding: '0.5rem 1rem', background: '#dbeafe', color: '#1e40af', border: 'none', borderRadius: '8px', fontSize: '0.813rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', textDecoration: 'none', display: 'inline-block' },
    loadingContainer: { textAlign: 'center', padding: '4rem 2rem' },
    spinner: { width: '48px', height: '48px', border: '4px solid #f1f5f9', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' },
    emptyState: { textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' },
    emptyIcon: { fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 },
  };

  const customCSS = `
    @keyframes spin { to { transform: rotate(360deg); } }
    *::-webkit-scrollbar { width: 8px; height: 8px; }
    *::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
    *::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    *::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':  return { background: '#fef3c7', color: '#92400e' };
      case 'approved': return { background: '#d1fae5', color: '#065f46' };
      case 'rejected': return { background: '#fee2e2', color: '#991b1b' };
      default:         return { background: '#f1f5f9', color: '#475569' };
    }
  };

  const statusCounts = {
    total:    freelancers.length,
    pending:  freelancers.filter((f) => f.isAdminApproved === 'pending').length,
    approved: freelancers.filter((f) => f.isAdminApproved === 'approved').length,
    rejected: freelancers.filter((f) => f.isAdminApproved === 'rejected').length,
  };

  return (
    <>
      <style>{customCSS}</style>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <i className="fa-solid fa-user-tie" />
            </div>
            <div>
              <h1 style={styles.pageTitle}>Freelancer Management</h1>
              <p style={styles.pageSubtitle}>Manage and approve freelancer applications</p>
            </div>
          </div>
        </div>

        {/* Filters and Stats */}
        <div style={styles.statsCard}>
          <div style={styles.filtersRow}>
            <div style={styles.searchContainer}>
              <i className="fa-solid fa-magnifying-glass" style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by name, email, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => { e.target.style.borderColor = '#f59e0b'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)'; }}
                onBlur={(e)  => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc';  e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.filterSelect}
              onFocus={(e) => (e.target.style.borderColor = '#f59e0b')}
              onBlur={(e)  => (e.target.style.borderColor = '#e2e8f0')}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <div style={styles.statsBadges}>
              <div style={{ ...styles.statBadge, background: '#e0f2fe', color: '#0369a1' }}>
                <i className="fa-solid fa-users" /><span>{statusCounts.total} Total</span>
              </div>
              <div style={{ ...styles.statBadge, background: '#fef3c7', color: '#92400e' }}>
                <i className="fa-solid fa-clock" /><span>{statusCounts.pending} Pending</span>
              </div>
              <div style={{ ...styles.statBadge, background: '#d1fae5', color: '#065f46' }}>
                <i className="fa-solid fa-check-circle" /><span>{statusCounts.approved} Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner} />
            <p style={{ color: '#94a3b8', fontSize: '0.938rem' }}>Loading freelancers...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '12px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredFreelancers.length === 0 && (
          <div style={styles.emptyState}>
            <i className="fa-solid fa-user-slash" style={styles.emptyIcon} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#64748b', margin: '0 0 0.5rem 0' }}>
              No Freelancers Found
            </h3>
            <p style={{ fontSize: '0.938rem', color: '#94a3b8', margin: 0 }}>
              {searchQuery || filterStatus !== 'all' ? 'Try adjusting your filters' : 'No freelancer applications yet'}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filteredFreelancers.length > 0 && (
          <div style={styles.tableCard}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    {['#', 'Freelancer', 'Email', 'Phone', 'Country', 'Experience', 'Role', 'Status', 'Portfolio', 'Profile', 'Actions'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredFreelancers.map((f, index) => (
                    <tr
                      key={getId(f)}   // ✅ FIX
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ ...styles.td, color: '#94a3b8', fontWeight: '600', width: '60px' }}>
                        {index + 1}
                      </td>

                      <td style={styles.td}>
                        <div style={styles.freelancerInfo}>
                          <div style={styles.avatar}>{f.firstName?.[0]}{f.lastName?.[0]}</div>
                          <Link
                            to={`/dashboard/view-Freelancer/${getId(f)}`}  // ✅ FIX
                            style={styles.nameLink}
                            onMouseEnter={(e) => { e.target.style.color = '#f59e0b'; e.target.style.textDecoration = 'underline'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#1e293b'; e.target.style.textDecoration = 'none'; }}
                          >
                            {f.firstName} {f.lastName}
                          </Link>
                        </div>
                      </td>

                      <td style={{ ...styles.td, color: '#64748b', fontSize: '0.875rem' }}>{f.email}</td>
                      <td style={styles.td}>{f.phone || '—'}</td>
                      <td style={styles.td}>{f.country || '—'}</td>
                      <td style={styles.td}>{f.experience || '—'}</td>

                      <td style={styles.td}>
                        <span style={{ padding: '0.375rem 0.875rem', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '0.813rem', fontWeight: '500', textTransform: 'capitalize' }}>
                          {f.role || 'N/A'}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ ...styles.statusBadge, ...getStatusColor(f.isAdminApproved) }}>
                            {f.isAdminApproved === 'pending'  && <i className="fa-solid fa-clock" />}
                            {f.isAdminApproved === 'approved' && <i className="fa-solid fa-check-circle" />}
                            {f.isAdminApproved === 'rejected' && <i className="fa-solid fa-times-circle" />}
                            {f.isAdminApproved}
                          </span>

                          {f.isAdminApproved === 'pending' && (
                            <>
                              <button
                                style={{ ...styles.actionBtn, background: '#d1fae5', color: '#065f46' }}
                                onClick={() => handleApprove(f)}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#d1fae5'; e.currentTarget.style.color = '#065f46'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                title="Approve"
                              >
                                <i className="fa-solid fa-check" />
                              </button>
                              <button
                                style={{ ...styles.actionBtn, background: '#fee2e2', color: '#991b1b' }}
                                onClick={() => handleReject(f)}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#991b1b'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                title="Reject"
                              >
                                <i className="fa-solid fa-xmark" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>

                      <td style={styles.td}>
                        {f.portfolio ? (
                          <a
                            href={f.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.viewBtn}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#60a5fa'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.color = '#1e40af'; e.currentTarget.style.transform = 'translateY(0)'; }}
                          >
                            <i className="fa-solid fa-file-pdf me-1" /> View
                          </a>
                        ) : (
                          <span style={{ color: '#cbd5e1', fontWeight: '500' }}>—</span>
                        )}
                      </td>

                      <td style={styles.td}>
                        <CircularProgress value={f.profileCompletion} />
                      </td>

                      <td style={styles.td}>
                        <button
                          style={{ ...styles.actionBtn, background: '#dbeafe', color: '#1e40af' }}
                          onClick={() => handleSendMail(f)}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#60a5fa'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.color = '#1e40af'; e.currentTarget.style.transform = 'translateY(0)'; }}
                          title="Send Email"
                        >
                          <i className="fa-regular fa-paper-plane" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Freelancers;

