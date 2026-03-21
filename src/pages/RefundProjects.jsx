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

// const RefundProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState(false);

//   const fetchProjects = async (currentPage = 1, currentLimit = 10) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${Url}/project/refunded`);
  
      
//       if (response.data.success) {
//         const allRefundedProjects = response.data.data;
        
//         // Client-side pagination
//         const startIndex = (currentPage - 1) * currentLimit;
//         const endIndex = startIndex + currentLimit;
//         const paginatedProjects = allRefundedProjects.slice(startIndex, endIndex);
        
//         setProjects(paginatedProjects);
//         setTotalPages(Math.ceil(allRefundedProjects.length / currentLimit));
//       }
//     } catch (error) {
//       console.error("Error fetching refunded projects:", error);
//       toast.error("Failed to load refunded projects");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProjects(page, limit);
//   }, [page, limit]);

//   const handleChange = (event, value) => {
//     setPage(value);
//   };


//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Refund Projects</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             💸 Refund Projects
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
//                 <th>Project Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8">
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
//                     <td>$ {cv.totalPrice}</td>
//                     <td>{cv.clientId}</td>
//                     <td className='text-capitalize'>{cv.clientName}</td>
//                     <td>
//                       <span className='badge bg-danger text-uppercase'>{cv.projectStatus}</span>
//                     </td>
//                     <td>
//                       <div className='d-flex flex-column align-items-center'>
//                         {/* <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}>
//                           <i className="fa-solid fa-user-pen fa-sm text-success me-1" />
//                           <small className='fw-bold text-success'>update</small>
//                         </Link> */}
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
//                   <td colSpan="8">
//                     <h6 className='text-center py-5 w-100'>No Refunded Projects</h6>
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

// export default RefundProjects;








import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Chip, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Url } from 'src/url/url';

// ─── Constants ───────────────────────────────────────────────────────────────
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const COLUMNS = ['S. No.', 'Project ID', 'Package / Service', 'Price ($)', 'Client ID', 'Client Name', 'Status', 'Action'];

// ─── Custom Hook ─────────────────────────────────────────────────────────────
const useRefundedProjects = (page, limit) => {
  const [projects, setProjects]       = useState([]);
  const [totalPages, setTotalPages]   = useState(1);
  const [loading, setLoading]         = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Url}/project/refunded`);
      if (data.success) {
        const all        = data.data;
        const start      = (page - 1) * limit;
        setProjects(all.slice(start, start + limit));
        setTotalPages(Math.ceil(all.length / limit));
      }
    } catch {
      toast.error('Failed to load refunded projects');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { projects, totalPages, loading };
};

// ─── Sub-components ──────────────────────────────────────────────────────────
const TableControls = ({ limit, onLimitChange }) => (
  <div className="d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3">
    <input type="text" placeholder="🔍 Search ..." className="form-control w-auto" />
    <div className="d-flex align-items-center gap-2">
      <label className="mb-0">Show</label>
      <select
        className="form-select"
        style={{ width: 'auto' }}
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        {PAGE_SIZE_OPTIONS.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <label className="mb-0">entries</label>
    </div>
  </div>
);

const TableRow = ({ cv, index, page, limit }) => (
  <tr className="text-center" key={cv._id}>
    <td>{(page - 1) * limit + index + 1}</td>
    <td>
      <small className="text-muted font-monospace">{cv._id}</small>
    </td>
    <td className="text-capitalize">
      {cv.projectType === 'package' ? cv.packageId : 'Custom Project'}
    </td>
    <td>$ {cv.totalPrice}</td>
    <td>
      <small className="text-muted font-monospace">{cv.clientId}</small>
    </td>
    <td className="text-capitalize">{cv.clientName}</td>
    <td>
      <Chip
        label={cv.projectStatus}
        color="error"
        size="small"
        sx={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.7rem' }}
      />
    </td>
    <td>
      <Link to={`/dashboard/project/${cv._id}`} className="btn border-0 text-nowrap">
        <i className="fa-solid fa-eye fa-sm text-primary me-1" />
        <small className="fw-bold text-primary">View</small>
      </Link>
    </td>
  </tr>
);

const TableBody = ({ loading, projects, page, limit }) => {
  if (loading) return (
    <tr>
      <td colSpan={COLUMNS.length}>
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress size={32} />
        </Box>
      </td>
    </tr>
  );

  if (!projects.length) return (
    <tr>
      <td colSpan={COLUMNS.length}>
        <h6 className="text-center py-5 text-muted">No Refunded Projects Found</h6>
      </td>
    </tr>
  );

  return projects.map((cv, i) => (
    <TableRow key={cv._id} cv={cv} index={i} page={page} limit={limit} />
  ));
};

// ─── Main Component ───────────────────────────────────────────────────────────
const RefundProjects = () => {
  const [page,  setPage]  = useState(1);
  const [limit, setLimit] = useState(10);

  const { projects, totalPages, loading } = useRefundedProjects(page, limit);

  const handleLimitChange = (newLimit) => { setPage(1); setLimit(newLimit); };

  return (
    <>
      <ToastContainer />
      <Helmet><title>Refund Projects</title></Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>💸 Refund Projects</Typography>
        </Stack>

        <TableControls limit={limit} onLimitChange={handleLimitChange} />

        <section className="table-responsive">
          <table className="table table-striped table-bordered text-center table-hover align-top data-sm">
            <thead className="table-dark">
              <tr className="align-top">
                {COLUMNS.map((col) => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              <TableBody loading={loading} projects={projects} page={page} limit={limit} />
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center py-3">
              <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" />
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default RefundProjects;