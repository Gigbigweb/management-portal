// import React, {useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import { Url } from '../url/url';
// import { blogdata } from 'src/redux/slice/blog';

// const BlogPage = () => {

//     const serviceAllData = useSelector(store => store.service.data)  
//     const blogAllData = useSelector(store => store.blog.data)   
//     const [deleteLoading, setDeleteLoading] = useState(false)
//     const dispatch = useDispatch() 
// console.log("blogAllData",blogAllData)
//     const serviceDelete = async (id)=>{
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
//             await axios.delete(`${Url}/blog/${id}`) 
//             dispatch(blogdata()) 
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
//     <ToastContainer/>
//     <Helmet>
//         <title> Dashboard: Products | Minimal UI </title>
//     </Helmet> 
//     <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Blogs
//           </Typography> 
//           <Typography variant="h6" gutterBottom>
//             <Link className='btn btn-primary' to='/dashboard/add-blog'>Add New Blog</Link>
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
//                   <p className='mb-0 me-2 '>Blog : </p>
//                   <h4 className='text-primary fw-bold mb-0'>{serviceAllData.length}</h4>
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
//                         <th>title</th>
//                         <th>Image</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>  
//                     {blogAllData.map((cv, i)=>{
//                         return(
//                             <tr className='text-center' key={i}>
//                                 <td>{i + 1}</td> 
//                                 <td>{cv.title}</td> 
//                                 <td>
//                                   <img src={`${cv.image}`} alt={`${cv.imageAlt}`} className='m-auto' style={{width : '80px'}}/>
//                                 </td>  
//                                 <td  >
//                                     <div className='d-flex align-items-center justify-content-center gap-2 '> 
//                                     <button className='btn border-0 mb-1 pb-0 text-nowrap' onClick={()=>serviceDelete(cv._id)} disabled={deleteLoading}> 
//                                       <i className="fa-solid fa-trash fa-sm text-danger me-1 "></i> 
//                                       <small className='fw-bold text-danger'>{deleteLoading ? <>deleting</> : <>delete</>}</small>
//                                     </button>
//                                     <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-blog/${cv._id}`} > 
//                                       <i className="fa-solid fa-user-pen fa-sm text-success me-1 "></i> 
//                                       <small className='fw-bold text-success'>Edit</small>
//                                     </Link>
//                                     <Link className='btn border-0 mb-1 pb-0 text-nowrap' > 
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

// export default BlogPage




// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import { Url } from '../url/url';
// import { blogdata } from 'src/redux/slice/blog';

// const BlogPage = () => {
//   const dispatch = useDispatch();
//   const blogAllData = useSelector((store) => store.blog.data);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const serviceDelete = async (id) => {
//     setDeleteLoading(true);
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/blog/${id}`);
//           dispatch(blogdata());
//           toast.success('Blog deleted successfully');
//         } catch (error) {
//           toast.error('Something went wrong');
//         }
//       }
//       setDeleteLoading(false);
//     });
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Dashboard: Blogs</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" className="fw-bold text-dark">
//             📝 Blogs
//           </Typography>
//           <Link to="/dashboard/add-blog" className="btn btn-primary shadow-sm">
//             <i className="fa fa-plus me-2"></i>Add New Blog
//           </Link>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="card shadow-sm border-0 p-3 rounded-4 bg-light">
//           <div className="d-flex justify-content-between flex-wrap align-items-center">
//             <input type="text" placeholder="🔍 Search Blog..." className="form-control w-50 mb-2 mb-sm-0" />
//             <h5 className="text-dark mb-0 fw-semibold">
//               Total Blogs: <span className="badge bg-primary">{blogAllData.length}</span>
//             </h5>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <div className="card border-0 shadow-sm p-4 rounded-4">
//           <div className="table-responsive">
//             <table className="table table-hover table-bordered align-middle text-center mb-0">
//               <thead className="table-dark">
//                 <tr>
//                   <th style={{ width: '5%' }}>#</th>
//                   <th style={{ width: '30%' }}>Title</th>
//                   <th style={{ width: '20%' }}>Image</th>
//                   <th style={{ width: '20%' }}>Category</th>
//                   <th style={{ width: '45%' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {blogAllData.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-muted py-4">
//                       No blogs found.
//                     </td>
//                   </tr>
//                 ) : (
//                   blogAllData.map((cv, i) => (
//                     <tr key={i}>
//                       <td>{i + 1}</td>
//                       <td className="text-start text-capitalize">{cv.title}</td>
//                       <td className='text-center'>
//                         <img
//                           // src={cv.image}
//                     // src={`https://s3.ap-south-1.amazonaws.com/bucket.gigibig/${cv.image}`}
//             src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.image}`}




//                           alt={cv.imageAlt || "blog-img"}
//                           className="rounded shadow-sm"
//                           style={{ width: '80px', height: 'auto', objectFit: 'cover',margin:'0 auto' }}
//                         />
//                       </td>
//                       <td className="text-center text-capitalize">{cv.category}</td>

//                       <td>
//                         <div className="d-flex justify-content-center gap-2 flex-wrap">
//                           <button
//                             className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
//                             onClick={() => serviceDelete(cv._id)}
//                             disabled={deleteLoading}
//                           >
//                             <i className="fa fa-trash"></i>
//                             {deleteLoading ? "Deleting..." : "Delete"}
//                           </button>

//                           <Link
//                             to={`/dashboard/update-blog/${cv._id}`}
//                             className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
//                           >
//                             <i className="fa fa-pen-to-square"></i>Edit
//                           </Link>

//                           <Link
//                             to="#"
//                             className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
//                           >
//                             <i className="fa fa-eye"></i>View
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default BlogPage;








import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Url } from '../url/url';
import { blogdata } from 'src/redux/slice/blog';

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogAllData = useSelector((store) => store.blog.data);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ✅ Permission setup
  const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}');
  const perm      = permissions?.blog || {};
  const enabled   = perm?.enable === true;
  const canView   = perm?.view   === true;   
  const canAdd    = perm?.add    === true;
  const canDelete = perm?.delete === true;
  const canEdit   = perm?.edit   === true;

 

  // ✅ Slug setup
  const staff = JSON.parse(sessionStorage.getItem('management_staff') || '{}');
  const slug  = staff?.slug || 'Management';

  const serviceDelete = async (id) => {
    setDeleteLoading(true);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Url}/blog/${id}`);
          dispatch(blogdata());
          toast.success('Blog deleted successfully');
        } catch (error) {
          toast.error('Something went wrong');
        }
      }
      setDeleteLoading(false);
    });
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

  // ✅ Koi bhi action available hai?
  const showActionsColumn = canView || canDelete || canEdit;

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Dashboard: Blogs</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" className="fw-bold text-dark">
             Blogs
          </Typography>
          {/* ✅ Add button - sirf canAdd pe */}
          {canAdd && (
            <Link to={`/${slug}/add-blog`} className="btn btn-primary shadow-sm">
              <i className="fa fa-plus me-2"></i>Add New Blog
            </Link>
          )}
        </Stack>
      </Container>

      <Container className="mb-4">
        <div className="card shadow-sm border-0 p-3 rounded-4 bg-light">
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <input type="text" placeholder="🔍 Search Blog..." className="form-control w-50 mb-2 mb-sm-0" />
            <h5 className="text-dark mb-0 fw-semibold">
              Total Blogs: <span className="badge bg-primary">{blogAllData.length}</span>
            </h5>
          </div>
        </div>  
      </Container>

      <Container>
        <div className="card border-0 shadow-sm p-4 rounded-4">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle text-center mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '30%' }}>Title</th>
                  <th style={{ width: '20%' }}>Image</th>
                  <th style={{ width: '20%' }}>Category</th>
                  {/* ✅ Actions column - view/delete/edit mein se koi bhi ho */}
                  {showActionsColumn && (
                    <th style={{ width: '25%' }}>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {blogAllData.length === 0 ? (
                  <tr>
                    <td colSpan={showActionsColumn ? 5 : 4} className="text-muted py-4">
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  blogAllData.map((cv, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="text-start text-capitalize">{cv.title}</td>
                      <td className='text-center'>
                        <img
                          src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.image}`}
                          alt={cv.imageAlt || "blog-img"}
                          className="rounded shadow-sm"
                          style={{ width: '80px', height: 'auto', objectFit: 'cover', margin: '0 auto' }}
                        />
                      </td>
                      <td className="text-center text-capitalize">{cv.category}</td>

                      {showActionsColumn && (
                        <td>
                          <div className="d-flex justify-content-center gap-2 flex-wrap">

                            {/* ✅ View - sirf canView pe */}
                            {canView && (
                              <Link
                                to={`/${slug}/blog-view`}
                                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                              >
                                <i className="fa fa-eye"></i>View
                              </Link>
                            )}

                            {/* ✅ Edit - sirf canEdit pe */}
                            {canEdit && (
                              <Link
                                to={`/${slug}/update-blog/${cv._id}`}
                                className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                              >
                                <i className="fa fa-pen-to-square"></i>Edit
                              </Link>
                            )}

                            {/* ✅ Delete - sirf canDelete pe */}
                            {canDelete && (
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                onClick={() => serviceDelete(cv._id)}
                                disabled={deleteLoading}
                              >
                                <i className="fa fa-trash"></i>
                                {deleteLoading ? "Deleting..." : "Delete"}
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
        </div>
      </Container>
    </>
  );
};

export default BlogPage;