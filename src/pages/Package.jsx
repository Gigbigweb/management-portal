// import React, { useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {Button, Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';


// import { Url } from '../url/url';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { packagedata } from 'src/redux/slice/package';

// const Package = () => {
//     const userAllData = useSelector(store => store.client.data) 
//     const PackageAllData = useSelector(store => store.package.data) 
//     const [deleteLoading, setDeleteLoading] = useState(false)

//     const dispatch = useDispatch()

//     const packageDelete = async (id)=>{
//       setDeleteLoading(true)
//       Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then(async(result) => {
//         if (result.isConfirmed) {
//           try {
//             await axios.delete(`${Url}/package/delete/${id}`) 
//             dispatch(packagedata()) 
//             toast.success('Package delete successfully', {
//               position: "top-right",
//               autoClose: 1500,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: false,
//               draggable: true,
//               progress: undefined,
//               theme: "light",
//             });
//             setDeleteLoading(false)
//           } catch (error) {
//             setDeleteLoading(false)
//             toast.error('Something went wrong', {
//               position: "top-right",
//               autoClose: 1500,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: false,
//               draggable: true,
//               progress: undefined,
//               theme: "light",
//               });
//           }  
//         }
//         setDeleteLoading(false)
//       })
//       setDeleteLoading(false)
//     }


//   return (
//     <>
//     <ToastContainer />
//     <Helmet>
//         <title> Teamlans | Package </title>
//     </Helmet> 
//     <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Users
//           </Typography> 
//           <Typography variant="h6" gutterBottom>
//             <Link className='btn btn-primary' to='/dashboard/add-new-package'><i className="fa-solid fa-plus"></i> Add New Package</Link>
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
//                   <p className='mb-0 me-2 '>Package : </p>
//                   <h4 className='text-primary fw-bold mb-0'>{PackageAllData.length}</h4>
//               </div>
//             </div> 
//           </div>
//       </Container>
//       <Container>
      
//         <section className="table-responsive packagepage-table">
//   <table className="table table-bordered text-center align-middle shadow-sm">
//     <thead className="table-header">
//       <tr>
//         <th>#</th>
//         <th>Package Name</th>
//         <th>Price ($)</th>
//         <th>Discount ($)</th>
//         <th>Offer (%)</th>
//         <th>Total Services</th>
//         <th>Service Days</th>
//         <th>Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {PackageAllData && PackageAllData.map((cv, i) => (
//         <tr key={i}>
//           <td>{i + 1}</td>
//           <td>{cv.packageName}</td>
//           <td>${cv.price}</td>
//           <td>${cv.discountPrice}</td>
//           <td>{cv.offer}%</td>
//           <td>{cv.totalService}</td>
//           <td>{cv.days}</td>
//           <td>
//             <div className="d-flex justify-content-center gap-2">
//               <button
//                 className="btn btn-sm btn-outline-danger rounded-circle"
//                 onClick={() => packageDelete(cv._id)}
//                 title="Delete"
//               >
//                 <i className="fa-solid fa-trash" />
//               </button>
//               <Link
//                 className="btn btn-sm btn-outline-warning rounded-circle"
//                 to={`/dashboard/update-package/${cv._id}`}
//                 title="Edit"
//               >
//                 <i className="fa-solid fa-pen-to-square" />
//               </Link>
//               {/* <Link
//                 className="btn btn-sm btn-outline-primary rounded-circle"
//                 title="View"
//               >
//                 <i className="fa-solid fa-eye" />
//               </Link> */}
//             </div>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </section>

//       </Container>
//     </>
//   )
// }


// export default Package




// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { Url } from '../url/url';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [search, setSearch] = useState('');
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const fetchPackages = async () => {
//     try {
//       setLoading(true);
//       // const res = await axios.get(`${Url}/package/get-all-package?page=${page}&limit=${limit}`);
//       const res = await axios.get(
//         `${Url}/package/get-all-package?page=${page}&limit=${limit}&search=${search}`
//       );
      
      
//       setPackages(res.data.packages);     
//       setTotalCount(res.data.totalCount); 
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       toast.error("Failed to fetch packages");
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, [search, page, limit]);

//   const handleDelete = async (id) => {
//     setDeleteLoading(true);
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This will delete the package permanently!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/package/delete/${id}`);
//           toast.success('Package deleted successfully');
//           fetchPackages(); // Refresh data
//         } catch (err) {
//           toast.error('Failed to delete package');
//         }
//       }
//       setDeleteLoading(false);
//     });
//   };

//   const totalPages = Math.ceil(totalCount / limit);

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Teamlans | Package</title></Helmet>

//       <Container>
//         <Stack direction="row" justifyContent="space-between" mb={3}>
//           <Typography variant="h4">Packages</Typography>
//           <Link className="btn btn-primary" to="/dashboard/add-new-package">
//             <i className="fa fa-plus"></i> Add New Package
//           </Link>
//         </Stack>
//       </Container>

//       <Container className="mb-3">
//         <div className="d-flex flex-wrap justify-content-between align-items-center bg-light p-3 rounded">
//           <div className="d-flex align-items-center gap-2">
//             <label>Show</label>
//             <select
//               className="form-select"
//               style={{ width: '80px' }}
//               value={limit}
//               onChange={(e) => setLimit(Number(e.target.value))}
//             >
//               <option value={1}>1</option>
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//             </select>
//             <label>entries</label>
//           </div>
//           <input
//             type="text"
//             className="form-control"
//             style={{ maxWidth: '300px' }}
//             placeholder="Search package"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </Container>

//       <Container>
//         <div className="table-responsive packagepage-table">
//           <table className="table table-bordered text-center align-middle shadow-sm">
//             <thead className="table-header">
//               <tr>
//                 <th>#</th>
//                 <th>Package Name</th>
//                 <th>Price ($)</th>
//                 <th>Discount ($)</th>
//                 <th>Offer (%)</th>
//                 <th>Total Services</th>
//                 <th>Service Days</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="8"><div className="spinner-border text-primary" /></td></tr>
//               ) : packages.length === 0 ? (
//                 <tr><td colSpan="8">No packages found</td></tr>
//               ) : (
//                 packages.map((pkg, i) => (
//                   <tr key={pkg._id}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td>{pkg.packageName}</td>
//                     <td>${pkg.price}</td>
//                     <td>${pkg.discountPrice}</td>
//                     <td>{pkg.offer}%</td>
//                     <td>{pkg.totalService}</td>
//                     <td>{pkg.days}</td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-2">
//                         <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(pkg._id)}>
//                           <i className="fa fa-trash" />
//                         </button>
//                         <Link to={`/dashboard/update-package/${pkg._id}`} className="btn btn-sm btn-outline-warning">
//                           <i className="fa fa-pen" />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <p className="mb-0">
//             Showing {(page - 1) * limit + 1}  of {totalCount} entries
//           </p>
//           <div className="btn-group">
//             <button disabled={page === 1} className="btn btn-outline-primary" onClick={() => setPage(page - 1)}>
//               Prev
//             </button>
//             <button disabled={page === totalPages} className="btn btn-outline-primary" onClick={() => setPage(page + 1)}>
//               Next
//             </button>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Package;







import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Url } from '../url/url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Package = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Url}/package/get-all-package?page=${page}&limit=${limit}&search=${search}`);
      setPackages(res.data.packages);
      setTotalCount(res.data.totalCount);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to fetch packages");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [search, page, limit]);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the package permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Url}/package/delete/${id}`);
          toast.success('Package deleted successfully');
          fetchPackages();
        } catch (err) {
          toast.error('Failed to delete package');
        }
      }
      setDeleteLoading(false);
    });
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <ToastContainer />
      <Helmet><title>Teamlans | Packages</title></Helmet>

      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center package-header mb-4">
          <h2 className="package-title">📦 Package List</h2>
          <Link className="btn btn-primary btn-lg rounded-pill" to="/dashboard/add-new-package">
            <i className="fa fa-plus me-2"></i> Add New Package
          </Link>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center package-filter p-3 rounded shadow-sm mb-4">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label fw-semibold mb-0">Show</label>
            <select
              className="form-select"
              style={{ width: '80px' }}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              {[1, 5, 10, 25].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            <label className="form-label fw-semibold mb-0">entries</label>
          </div>
          <input
            type="text"
            className="form-control shadow-sm"
            style={{ maxWidth: '300px' }}
            placeholder="🔍 Search package"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive package-table shadow-sm rounded">
          <table className="table table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Package Name</th>
                <th>Price ($)</th>
                <th>Discount ($)</th>
                <th>Offer (%)</th>
                <th>Total Services</th>
                <th>Service Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8"><div className="spinner-border text-primary" /></td></tr>
              ) : packages.length === 0 ? (
                <tr><td colSpan="8" className="text-muted">No packages found</td></tr>
              ) : (
                packages.map((pkg, i) => (
                  <tr key={pkg._id}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>{pkg.packageName}</td>
                    <td>${pkg.price}</td>
                    <td>${pkg.discountPrice}</td>
                    <td>{pkg.offer}%</td>
                    <td>{pkg.totalService}</td>
                    <td>{pkg.days}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pkg._id)}>
                          <i className="fa fa-trash" />
                        </button>
                        <Link to={`/dashboard/update-package/${pkg._id}`} className="btn btn-sm btn-warning">
                          <i className="fa fa-pen" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <p className="mb-0 text-muted">
            Showing {(page - 1) * limit + 1} of {totalCount} entries
          </p>
          <div className="btn-group">
            <button disabled={page === 1} className="btn btn-outline-secondary" onClick={() => setPage(page - 1)}>
              ◀ Prev
            </button>
            <button disabled={page === totalPages} className="btn btn-outline-secondary" onClick={() => setPage(page + 1)}>
              Next ▶
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Package;
