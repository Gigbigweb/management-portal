// // imports same as before...
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Helmet } from 'react-helmet-async';
// import { Button, Container, Stack, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { Url } from '../url/url';
// import Swal from 'sweetalert2';

// const StaffPage = () => {
//   const [staffData, setStaffData] = useState([]);
//   const [totalStaff, setTotalStaff] = useState(0);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showModal, setShowModal] = useState(false);
// const [selectedStaff, setSelectedStaff] = useState(null);
// const [newPassword, setNewPassword] = useState('');
// const [confirmPassword, setConfirmPassword] = useState('');
// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// const [searchQuery, setSearchQuery] = useState("");

// const navigate = useNavigate();


//   const getStaffData = async (page = 1, limit = 10) => {
//     try {
//       const response = await axios.get(`${Url}/staff/all?page=${page}&limit=${limit}`);
    
      
//       const res = response.data;

//       setStaffData(res.data || []);
//       setTotalStaff(res.totalProjects || res.data?.length || 0);
//       setTotalPages(res.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching staff:", error.message);
//     }
//   };

//   const handleOpenModal = (staff) => {
//     setSelectedStaff(staff);
//     setNewPassword('');
//     setConfirmPassword('');
//     setShowModal(true);
//   };
  


//   // const handleUpdatePassword = async () => {
//   //   if (newPassword !== confirmPassword) {
//   //     alert("Passwords do not match!");
//   //     return;
//   //   }
  
//   //   try {
//   //     await axios.put(`${Url}/staff/update-password`, {
//   //       id: selectedStaff._id,
//   //       password: newPassword,
//   //     });
  
//   //     alert("Password updated successfully!");
//   //     setShowModal(false);
//   //     setNewPassword('');
//   //     setConfirmPassword('');
//   //   } catch (error) {
//   //     console.error("Password update failed:", error.message);
//   //     alert("Failed to update password.");
//   //   }
//   // };
  

//   // const handleUpdatePassword = () => {
//   //   if (newPassword !== confirmPassword) {
//   //     alert("Passwords do not match!");
//   //     return;
//   //   }
//   //   console.log("Update password for:", selectedStaff._id);
   
//   //   setShowModal(false);
//   // };
  



// const handleUpdatePassword = async () => {
//   if (newPassword !== confirmPassword) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Password Mismatch',
//       text: 'New Password and Confirm Password do not match!',
//     });
//     return;
//   }

//   try {
//     await axios.put(`${Url}/staff/update-password`, {
//       id: selectedStaff._id,
//       password: newPassword,
//     });

//     Swal.fire({
//       icon: 'success',
//       title: 'Password Updated',
//       text: 'Staff password has been updated successfully.',
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     setShowModal(false);
//     setNewPassword('');
//     setConfirmPassword('');
//   } catch (error) {
//     console.error("Password update failed:", error.message);
//     Swal.fire({
//       icon: 'error',
//       title: 'Update Failed',
//       text: 'Something went wrong while updating the password.',
//     });
//   }
// };

// const handleDeleteStaff = async (id) => {
//   const confirm = await Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//   });

//   if (confirm.isConfirmed) {
//     try {
//       await axios.delete(`${Url}/staff/delete/${id}`);
//       Swal.fire("Deleted!", "Staff has been deleted.", "success");
//       getStaffData(); 
//     } catch (error) {
//       console.error("Delete Error:", error.message);
//       Swal.fire("Error!", "Failed to delete staff.", "error");
//     }
//   }
// };

// const handleEditStaff = (id) => {
//   navigate(`/dashboard/update-staff/${id}`);
// };
// const handleViewStaff = (id) => {
//   navigate(`/dashboard/viewstaff/${id}`);

// };
// const searchStaff = async (query, page = 1, limit = 10) => {
//   try {
//     const response = await axios.get(`${Url}/staff/searchstaff?query=${query}&page=${page}&limit=${limit}`);
//     const res = response.data;

//     setStaffData(res.data || []);
//     setTotalStaff(res.total || res.data?.length || 0);
//     setTotalPages(res.totalPages || 1);
//   } catch (error) {
//     console.error("Error searching staff:", error.message);
//   }
// };



//   // useEffect(() => {
//   //   getStaffData(page, limit);
//   // }, [page, limit]);
//   useEffect(() => {
//     if (searchQuery.trim()) {
//       searchStaff(searchQuery.trim(), page, limit);
//     } else {
//       getStaffData(page, limit);
//     }
//   }, [page, limit, searchQuery]); 
  
  

//   return (
//     <>
//       <Helmet>
//         <title>Dashboard: Staff | Minimal UI</title>
//       </Helmet>

//       <Container>
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h3 className="fw-bold">👨‍💼 Staff Management</h3>
//           <Link className="btn btn-primary px-4" to="/dashboard/add-new-staff">
//             <i className="fa-solid fa-plus me-2"></i> Add New Staff
//           </Link>
//         </div>

//         <div className="bg-white p-3 rounded shadow-sm mb-4">
//           <div className="row g-3 align-items-center">
//             <div className="col-md-4">
//               {/* <input type="text" className="form-control" placeholder="🔍 Search Staff..." /> */}
//               <input
//   type="text"
//   className="form-control"
//   placeholder="🔍 Search Staff..."
//   value={searchQuery}
//   onChange={(e) => {
//     setSearchQuery(e.target.value);
//     setPage(1);
//   }}
//   onKeyDown={(e) => {
//     if (e.key === "Enter") {
//       if (searchQuery.trim()) {
//         searchStaff(searchQuery.trim(), 1, limit);
//       } else {
//         getStaffData(1, limit); // ✅ Ye function upar defined hai
//       }
//     }
//   }}
  
// />


//             </div>

//             <div className="col-md-4">
//               <div className="d-flex align-items-center">
//                 <label className="me-2 mb-0 fw-semibold">Show</label>
//                 <select
//                   className="form-select"
//                   style={{ width: '100px' }}
//                   value={limit}
//                   onChange={(e) => {
//                     setLimit(Number(e.target.value));
//                     setPage(1);
//                   }}
//                 >
//                   {[1, 10, 25, 50, 100].map(val => (
//                     <option key={val} value={val}>{val}</option>
//                   ))}
//                 </select>
//                 <span className="ms-2">entries</span>
//               </div>
//             </div>

//             <div className="col-md-4 text-md-end">
//               <strong className="text-muted">Total Staff: </strong>
//               <span className="text-primary fw-bold">{totalStaff}</span>
//             </div>
//           </div>
//         </div>

//         <div className="table-responsive bg-white rounded shadow-sm">
//           <table className="table table-hover align-middle text-center mb-0">
//             <thead className="table-dark">
//               <tr>
//                 <th>S. No.</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>source</th>
//                 <th>Skills</th>
//                 <th>Password</th>
//                 <th>Actions</th>
//                 <th>Banned</th>
//               </tr>
//             </thead>
//             <tbody>
//               {staffData.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-muted py-4">No staff found.</td>
//                 </tr>
//               ) : (
//                 staffData.map((cv, i) => (
//                   <tr key={cv._id}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td><button className='btn text-primary text-capitalize text-decoration-underline'  onClick={() => handleViewStaff(cv._id)}>{cv.firstName} {cv.lastName}</button></td>
//                     <td>{cv.email}</td>
//                     <td>{cv.role}</td>
//                     <td>{cv.source}</td>
//                     <td>
//                       {cv.skill?.length > 0 ? cv.skill.map((item, idx) => (
//                         <span key={idx} className="badge bg-secondary me-1">{item}</span>
//                       )) : "—"}
//                     </td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-2 flex-wrap">
   

//                         <Link className="btn btn-primary btn-sm d-flex align-item-center" title="Update Password"  onClick={() => handleOpenModal(cv)}>
//                           <i className="fa-solid fa-key me-1"></i> Reset
//                         </Link>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-2 flex-wrap">


//                         {/* <button className="btn btn-outline-primary btn-sm" title="View" onClick={() => handleViewStaff(cv._id)}>
//   <i className="fa-solid fa-eye"></i>
// </button> */}
//                       <button
//   className="btn btn-warning btn-sm"
//   title="Edit"
//   onClick={() => handleEditStaff(cv._id)}
// >
//   <i className="fa-solid fa-pen-to-square"></i>
// </button>

//                         <button
//   className="btn btn-danger btn-sm"
//   title="Delete"
//   onClick={() => handleDeleteStaff(cv._id)}
// >
//   <i className="fa-solid fa-trash"></i>
// </button>

//                       </div>
//                     </td>
//                     <td>
//                     {cv.isBanned && (
//   <button className="btn btn-outline-danger btn-sm" title="Blocked">
//     <i className="fa-solid fa-ban"></i>
//   </button>
// )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {totalPages > 1 && (
//           <div className="d-flex justify-content-center my-4">
//             <nav>
//               <ul className="pagination">
//                 <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
//                   <button className="page-link" onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
//                 </li>
//                 {Array.from({ length: totalPages }).map((_, i) => (
//                   <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
//                     <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
//                   </li>
//                 ))}
//                 <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
//                   <button className="page-link" onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </Container>


//       {selectedStaff && (
//   <div className={`custom-password-modal modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1">
//   <div className="modal-dialog modal-dialog-centered">
//     <div className="modal-content custom-password-modal-content p-4">
//       <div className="modal-header border-0 pb-2">
//         <h5 className="modal-title d-flex align-items-center gap-2 text-primary fw-semibold fs-5">
//           <i className="fa fa-lock text-warning"></i> Update Staff Password
//         </h5>
//         <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//       </div>

//       <div className="modal-body pt-0">
//         <p className="mb-1"><span className="text-muted">Name:</span> <strong>{selectedStaff.name}</strong></p>
//         <p><span className="text-muted">Role:</span> <strong>{selectedStaff.role}</strong></p>

//         {/* New Password */}
//         <div className="input-group custom-password-input mt-4">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="form-control"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <button
//             className="btn btn-icon"
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//           </button>
//         </div>

//         {/* Confirm Password */}
//         <div className="input-group custom-password-input mt-3">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             className="form-control"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button
//             className="btn btn-icon"
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//           </button>
//         </div>
//       </div>

//       <div className="modal-footer border-0 pt-3">
//         <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowModal(false)}>
//           Cancel
//         </button>
//         <button type="button" className="btn btn-primary px-4" onClick={handleUpdatePassword}>
//           <i className="fa fa-save me-2"></i>Update
//         </button>
//       </div>
//     </div>
//   </div>
// </div>



// )}

//     </>
//   );
// };

// export default StaffPage;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Helmet } from 'react-helmet-async';
// import { Container } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { Url } from '../url/url';
// import Swal from 'sweetalert2';
// import './StaffPage.css';

// const StaffPage = () => {
//   const [staffData, setStaffData] = useState([]);
//   const [totalStaff, setTotalStaff] = useState(0);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const getStaffData = async (page = 1, limit = 10) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/staff/all?page=${page}&limit=${limit}`);
//       const res = response.data;

//       setStaffData(res.data || []);
//       setTotalStaff(res.totalProjects || res.data?.length || 0);
//       setTotalPages(res.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching staff:", error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch staff data.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenModal = (staff) => {
//     setSelectedStaff(staff);
//     setNewPassword('');
//     setConfirmPassword('');
//     setShowModal(true);
//   };

//   const handleUpdatePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Mismatch',
//         text: 'New Password and Confirm Password do not match!',
//       });
//       return;
//     }

//     if (newPassword.length < 6) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Weak Password',
//         text: 'Password must be at least 6 characters long.',
//       });
//       return;
//     }

//     try {
//       await axios.put(`${Url}/staff/update-password`, {
//         id: selectedStaff._id,
//         password: newPassword,
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Password Updated',
//         text: 'Staff password has been updated successfully.',
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setShowModal(false);
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (error) {
//       console.error("Password update failed:", error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Something went wrong while updating the password.',
//       });
//     }
//   };

//   const handleDeleteStaff = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axios.delete(`${Url}/staff/delete/${id}`);
//         Swal.fire("Deleted!", "Staff has been deleted.", "success");
//         getStaffData(page, limit);
//       } catch (error) {
//         console.error("Delete Error:", error.message);
//         Swal.fire("Error!", "Failed to delete staff.", "error");
//       }
//     }
//   };

//   const handleEditStaff = (id) => {
//     navigate(`/dashboard/update-staff/${id}`);
//   };

//   const handleViewStaff = (id) => {
//     navigate(`/dashboard/viewstaff/${id}`);
//   };

//   const searchStaff = async (query, page = 1, limit = 10) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/staff/searchstaff?query=${query}&page=${page}&limit=${limit}`);
//       const res = response.data;

//       setStaffData(res.data || []);
//       setTotalStaff(res.total || res.data?.length || 0);
//       setTotalPages(res.totalPages || 1);
//     } catch (error) {
//       console.error("Error searching staff:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     setPage(1);
//   };

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       searchStaff(searchQuery.trim(), page, limit);
//     } else {
//       getStaffData(page, limit);
//     }
//   }, [page, limit, searchQuery]);

//   return (
//     <>
//       <Helmet>
//         <title>Staff Management | Dashboard</title>
//       </Helmet>

//       <Container maxWidth="xl" className="staff-container">
//         {/* Header Section */}
//         <div className="staff-header">
//           <div className="header-left">
//             <div className="header-icon">
//               <i className="fa-solid fa-users"></i>
//             </div>
//             <div>
//               <h1 className="page-title">Staff Management</h1>
//               <p className="page-subtitle">Manage your team members and their permissions</p>
//             </div>
//           </div>
//           <Link className="btn-add-staff" to="/dashboard/add-new-staff">
//             <i className="fa-solid fa-plus"></i>
//             <span>Add New Staff</span>
//           </Link>
//         </div>

//         {/* Filters and Stats Card */}
//         <div className="filters-card">
//           <div className="filters-row">
//             {/* Search */}
//             <div className="search-container">
//               <i className="fa-solid fa-magnifying-glass search-icon"></i>
//               <input
//                 type="text"
//                 className="search-input"
//                 placeholder="Search by name, email, or role..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//               />
//               {searchQuery && (
//                 <button 
//                   className="clear-search"
//                   onClick={() => setSearchQuery('')}
//                 >
//                   <i className="fa-solid fa-xmark"></i>
//                 </button>
//               )}
//             </div>

//             {/* Show Entries */}
//             <div className="show-entries">
//               <label>Show</label>
//               <select
//                 className="entries-select"
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//               >
//                 {[10, 25, 50, 100].map(val => (
//                   <option key={val} value={val}>{val}</option>
//                 ))}
//               </select>
//               <span>entries</span>
//             </div>

//             {/* Total Count */}
//             <div className="total-count">
//               <div className="count-badge">
//                 <i className="fa-solid fa-users"></i>
//                 <span className="count-number">{totalStaff}</span>
//                 <span className="count-label">Total Staff</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table Card */}
//         <div className="table-card">
//           {loading ? (
//             <div className="loading-state">
//               <div className="spinner"></div>
//               <p>Loading staff data...</p>
//             </div>
//           ) : (
//             <div className="table-wrapper">
//               <table className="staff-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Staff Member</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Source</th>
//                     <th>Skills</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {staffData.length === 0 ? (
//                     <tr>
//                       <td colSpan="8" className="empty-state">
//                         <div className="empty-content">
//                           <i className="fa-solid fa-users-slash"></i>
//                           <h3>No Staff Found</h3>
//                           <p>There are no staff members matching your criteria.</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     staffData.map((staff, i) => (
//                       <tr key={staff._id}>
//                         <td className="td-index">{(page - 1) * limit + i + 1}</td>
//                         <td className="td-staff">
//                           <div className="staff-info">
//                             <div className="staff-avatar">
//                               {staff.firstName?.[0]}{staff.lastName?.[0]}
//                             </div>
//                             <div className="staff-details">
//                               <button 
//                                 className="staff-name"
//                                 onClick={() => handleViewStaff(staff._id)}
//                               >
//                                 {staff.firstName} {staff.lastName}
//                               </button>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="td-email">{staff.email}</td>
//                         <td>
//                           <span className="role-badge">{staff.role}</span>
//                         </td>
//                         <td>
//                           <span className="source-tag">{staff.source}</span>
//                         </td>
//                         <td className="td-skills">
//                           {staff.skill?.length > 0 ? (
//                             <div className="skills-container">
//                               {staff.skill.slice(0, 2).map((item, idx) => (
//                                 <span key={idx} className="skill-tag">{item}</span>
//                               ))}
//                               {staff.skill.length > 2 && (
//                                 <span className="skill-more">+{staff.skill.length - 2}</span>
//                               )}
//                             </div>
//                           ) : (
//                             <span className="no-data">—</span>
//                           )}
//                         </td>
//                         <td>
//                           {staff.isBanned ? (
//                             <span className="status-badge status-banned">
//                               <i className="fa-solid fa-ban"></i>
//                               Banned
//                             </span>
//                           ) : (
//                             <span className="status-badge status-active">
//                               <i className="fa-solid fa-circle-check"></i>
//                               Active
//                             </span>
//                           )}
//                         </td>
//                         <td className="td-actions">
//                           <div className="action-buttons">
//                             <button
//                               className="action-btn btn-reset"
//                               title="Reset Password"
//                               onClick={() => handleOpenModal(staff)}
//                             >
//                               <i className="fa-solid fa-key"></i>
//                             </button>
//                             <button
//                               className="action-btn btn-edit"
//                               title="Edit Staff"
//                               onClick={() => handleEditStaff(staff._id)}
//                             >
//                               <i className="fa-solid fa-pen-to-square"></i>
//                             </button>
//                             <button
//                               className="action-btn btn-delete"
//                               title="Delete Staff"
//                               onClick={() => handleDeleteStaff(staff._id)}
//                             >
//                               <i className="fa-solid fa-trash"></i>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination-container">
//               <button
//                 className="pagination-btn"
//                 onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//               >
//                 <i className="fa-solid fa-chevron-left"></i>
//                 Previous
//               </button>

//               <div className="pagination-numbers">
//                 {Array.from({ length: totalPages }).map((_, i) => {
//                   const pageNum = i + 1;
//                   if (
//                     pageNum === 1 ||
//                     pageNum === totalPages ||
//                     (pageNum >= page - 1 && pageNum <= page + 1)
//                   ) {
//                     return (
//                       <button
//                         key={i}
//                         className={`pagination-number ${page === pageNum ? 'active' : ''}`}
//                         onClick={() => setPage(pageNum)}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   } else if (pageNum === page - 2 || pageNum === page + 2) {
//                     return <span key={i} className="pagination-dots">...</span>;
//                   }
//                   return null;
//                 })}
//               </div>

//               <button
//                 className="pagination-btn"
//                 onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={page === totalPages}
//               >
//                 Next
//                 <i className="fa-solid fa-chevron-right"></i>
//               </button>
//             </div>
//           )}
//         </div>
//       </Container>

//       {/* Password Update Modal */}
//       {showModal && selectedStaff && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="password-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header-custom">
//               <div className="modal-title-wrapper">
//                 <div className="modal-icon">
//                   <i className="fa-solid fa-key"></i>
//                 </div>
//                 <div>
//                   <h2>Reset Password</h2>
//                   <p>Update password for {selectedStaff.firstName} {selectedStaff.lastName}</p>
//                 </div>
//               </div>
//               <button 
//                 className="modal-close"
//                 onClick={() => setShowModal(false)}
//               >
//                 <i className="fa-solid fa-xmark"></i>
//               </button>
//             </div>

//             <div className="modal-body-custom">
//               <div className="staff-info-card">
//                 <div className="info-item">
//                   <i className="fa-solid fa-user"></i>
//                   <div>
//                     <span className="info-label">Name</span>
//                     <span className="info-value">{selectedStaff.firstName} {selectedStaff.lastName}</span>
//                   </div>
//                 </div>
//                 <div className="info-item">
//                   <i className="fa-solid fa-briefcase"></i>
//                   <div>
//                     <span className="info-label">Role</span>
//                     <span className="info-value">{selectedStaff.role}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="password-inputs">
//                 <div className="input-group-custom">
//                   <label>New Password</label>
//                   <div className="password-input-wrapper">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter new password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                     />
//                     <button
//                       type="button"
//                       className="toggle-password"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="input-group-custom">
//                   <label>Confirm Password</label>
//                   <div className="password-input-wrapper">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm new password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                     <button
//                       type="button"
//                       className="toggle-password"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer-custom">
//               <button 
//                 className="btn-cancel"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="btn-update"
//                 onClick={handleUpdatePassword}
//               >
//                 <i className="fa-solid fa-check"></i>
//                 Update Password
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StaffPage;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Url } from '../url/url';
import Swal from 'sweetalert2';
import './StaffPage.css';
import { permissions, staff_session } from 'src/utils/SessionfileData';

const StaffPage = () => {
  const [staffData, setStaffData] = useState([]);
  const [totalStaff, setTotalStaff] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ── Permissions ─────────────────────────────────────────────
  // const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}')
  const perm      = permissions?.team || {}
  const enabled   = perm?.enable === true
  const canView   = perm?.view   === true
  const canAdd    = perm?.add    === true
  const canEdit   = perm?.edit   === true
  const canDelete = perm?.delete === true
const slug = staff_session?.slug || 'Management';
  const getStaffData = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/staff/all?page=${page}&limit=${limit}`);
      const res = response.data;
      setStaffData(res.data || []);
      setTotalStaff(res.totalProjects || res.data?.length || 0);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch staff data.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (staff) => {
    setSelectedStaff(staff);
    setNewPassword('');
    setConfirmPassword('');
    setShowModal(true);
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Password Mismatch', text: 'Passwords do not match!' });
      return;
    }
    if (newPassword.length < 6) {
      Swal.fire({ icon: 'error', title: 'Weak Password', text: 'Password must be at least 6 characters.' });
      return;
    }
    try {
      await axios.put(`${Url}/staff/update-password`, { id: selectedStaff._id, password: newPassword });
      Swal.fire({ icon: 'success', title: 'Password Updated', timer: 2000, showConfirmButton: false });
      setShowModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: 'Something went wrong.' });
    }
  };

  const handleDeleteStaff = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?", text: "You won't be able to revert this!",
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#d33", cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${Url}/staff/delete/${id}`);
        Swal.fire("Deleted!", "Staff has been deleted.", "success");
        getStaffData(page, limit);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete staff.", "error");
      }
    }
  };

const handleEditStaff = (id) => navigate(`/${slug}/update-staff/${id}`);
const handleViewStaff = (id) => navigate(`/${slug}/viewstaff/${id}`);

  const searchStaff = async (query, page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/staff/searchstaff?query=${query}&page=${page}&limit=${limit}`);
      const res = response.data;
      setStaffData(res.data || []);
      setTotalStaff(res.total || res.data?.length || 0);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error("Error searching staff:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => { setSearchQuery(e.target.value); setPage(1); };

  useEffect(() => {
    if (searchQuery.trim()) {
      searchStaff(searchQuery.trim(), page, limit);
    } else {
      getStaffData(page, limit);
    }
  }, [page, limit, searchQuery]);

  // ── Access Denied ────────────────────────────────────────────
  if (!enabled) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
          <div style={{ fontSize: 50 }}>🔒</div>
          <h4 style={{ marginTop: 16, color: '#1e293b' }}>Access Denied</h4>
          <p>Aapke paas is page ka access nahi hai.</p>
        </div>
      </Container>
    )
  }

  return (
    <>
      <Helmet><title>Staff Management | Dashboard</title></Helmet>

      <Container maxWidth="xl" className="staff-container">
        {/* Header */}
        <div className="staff-header">
          <div className="header-left">
            <div className="header-icon">
              <i className="fa-solid fa-users"></i>
            </div>
            <div>
              <h1 className="page-title">Staff Management</h1>
              <p className="page-subtitle">Manage your team members and their permissions</p>
            </div>
          </div>
          {/* Add button — canAdd */}
          {canAdd && (
     <Link className="btn-add-staff" to={`/${slug}/add-new-staff`}>
              <i className="fa-solid fa-plus"></i>
              <span>Add New Staff</span>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="filters-card">
          <div className="filters-row">
            <div className="search-container">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" className="search-input"
                placeholder="Search by name, email, or role..."
                value={searchQuery} onChange={handleSearch} />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <div className="show-entries">
              <label>Show</label>
              <select className="entries-select" value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
                {[10, 25, 50, 100].map(val => <option key={val} value={val}>{val}</option>)}
              </select>
              <span>entries</span>
            </div>
            <div className="total-count">
              <div className="count-badge">
                <i className="fa-solid fa-users"></i>
                <span className="count-number">{totalStaff}</span>
                <span className="count-label">Total Staff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading staff data...</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Staff Member</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Source</th>
                    <th>Skills</th>
                    <th>Status</th>
                    {/* Actions column sirf tab dikhao */}
                    {(canView || canEdit || canDelete) && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {staffData.length === 0 ? (
                    <tr>
                      <td colSpan={canView || canEdit || canDelete ? 8 : 7} className="empty-state">
                        <div className="empty-content">
                          <i className="fa-solid fa-users-slash"></i>
                          <h3>No Staff Found</h3>
                          <p>There are no staff members matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    staffData.map((staff, i) => (
                      <tr key={staff._id}>
                        <td className="td-index">{(page - 1) * limit + i + 1}</td>
                        <td className="td-staff">
                          <div className="staff-info">
                            <div className="staff-avatar">
                              {staff.firstName?.[0]}{staff.lastName?.[0]}
                            </div>
                            <div className="staff-details">
                              <button className="staff-name" onClick={() => canView && handleViewStaff(staff._id)}>
                                {staff.firstName} {staff.lastName}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="td-email">{staff.email}</td>
                        <td><span className="role-badge">{staff.role}</span></td>
                        <td><span className="source-tag">{staff.source}</span></td>
                        <td className="td-skills">
                          {staff.skill?.length > 0 ? (
                            <div className="skills-container">
                              {staff.skill.slice(0, 2).map((item, idx) => (
                                <span key={idx} className="skill-tag">{item}</span>
                              ))}
                              {staff.skill.length > 2 && (
                                <span className="skill-more">+{staff.skill.length - 2}</span>
                              )}
                            </div>
                          ) : <span className="no-data">—</span>}
                        </td>
                        <td>
                          {staff.isBanned ? (
                            <span className="status-badge status-banned">
                              <i className="fa-solid fa-ban"></i> Banned
                            </span>
                          ) : (
                            <span className="status-badge status-active">
                              <i className="fa-solid fa-circle-check"></i> Active
                            </span>
                          )}
                        </td>

                        {/* Action buttons — permission ke hisab se */}
                        {(canView || canEdit || canDelete) && (
                          <td className="td-actions">
                            <div className="action-buttons">
                              {/* Reset Password — canEdit */}
                              {canEdit && (
                                <button className="action-btn btn-reset" title="Reset Password"
                                  onClick={() => handleOpenModal(staff)}>
                                  <i className="fa-solid fa-key"></i>
                                </button>
                              )}
                              {/* Edit — canEdit */}
                              {canEdit && (
                                <button className="action-btn btn-edit" title="Edit Staff"
                                  onClick={() => handleEditStaff(staff._id)}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              )}
                              {/* View — canView */}
                              {canView && (
                                <button className="action-btn btn-view" title="View Staff"
                                  onClick={() => handleViewStaff(staff._id)}>
                                  <i className="fa-solid fa-eye"></i>
                                </button>
                              )}
                              {/* Delete — canDelete */}
                              {canDelete && (
                                <button className="action-btn btn-delete" title="Delete Staff"
                                  onClick={() => handleDeleteStaff(staff._id)}>
                                  <i className="fa-solid fa-trash"></i>
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
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button className="pagination-btn"
                onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                <i className="fa-solid fa-chevron-left"></i> Previous
              </button>
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                    return (
                      <button key={i}
                        className={`pagination-number ${page === pageNum ? 'active' : ''}`}
                        onClick={() => setPage(pageNum)}>
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={i} className="pagination-dots">...</span>;
                  }
                  return null;
                })}
              </div>
              <button className="pagination-btn"
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                Next <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </Container>

      {/* Password Modal — canEdit */}
      {showModal && selectedStaff && canEdit && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="password-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div className="modal-title-wrapper">
                <div className="modal-icon"><i className="fa-solid fa-key"></i></div>
                <div>
                  <h2>Reset Password</h2>
                  <p>Update password for {selectedStaff.firstName} {selectedStaff.lastName}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body-custom">
              <div className="staff-info-card">
                <div className="info-item">
                  <i className="fa-solid fa-user"></i>
                  <div>
                    <span className="info-label">Name</span>
                    <span className="info-value">{selectedStaff.firstName} {selectedStaff.lastName}</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-briefcase"></i>
                  <div>
                    <span className="info-label">Role</span>
                    <span className="info-value">{selectedStaff.role}</span>
                  </div>
                </div>
              </div>
              <div className="password-inputs">
                <div className="input-group-custom">
                  <label>New Password</label>
                  <div className="password-input-wrapper">
                    <input type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button type="button" className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}>
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div className="input-group-custom">
                  <label>Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="button" className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-custom">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-update" onClick={handleUpdatePassword}>
                <i className="fa-solid fa-check"></i> Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffPage;
