// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {Button, Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';  
// import { servicedata } from 'src/redux/slice/service';


// import { Url } from '../url/url';

// const ServicePage = () => {

//     const serviceAllData = useSelector(store => store.service.data) 
//     const categoryAllData = useSelector(store => store.category.data) 
//     const packageAllData = useSelector(store => store.package.data) 
//     const [deleteLoading, setDeleteLoading] = useState(false)
//     const dispatch = useDispatch()
 


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
//             await axios.delete(`${Url}/service/delete/${id}`) 
//             dispatch(servicedata()) 
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
//             Service
//           </Typography> 
//           <Typography variant="h6" gutterBottom>
//             <Link className='btn btn-primary' to='/dashboard/add-new-service'>Add New Service</Link>
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
//                   <p className='mb-0 me-2 '>Service : </p>
//                   <h4 className='text-primary fw-bold mb-0'>{serviceAllData.length}</h4>
//               </div>
//             </div> 
//           </div>
//       </Container>
//       <Container>
//         {/* <section className='table-responsive'>
//             <table className='table table-striped table-bordered text-center table-hover align-top'>
//                 <thead className='table-primary'>
//                     <tr className='align-top'>
//                         <th>S. No.</th>
//                         <th>images</th>
//                         <th>service</th>
//                         <th>price</th> 
//                         <th>discountPrice</th> 
//                         <th>offer</th> 
//                         <th>category</th> 
//                         <th>package</th> 
//                         <th>Active</th> 
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>  
//                     {serviceAllData.map((cv, i)=>{
//                         return(
//                             <tr className='text-center' key={i}>
//                                 <td>{i + 1}</td>  
//                                 <td><div><img src={`${Url}/${cv.image}`} alt="" className='w-100px'/></div></td>
//                                 <td className=''>{cv.serviceName}</td>
//                                 <td  className=''>{cv.price}</td>
//                                 <td  className=''>{cv.discountPrice}</td> 
//                                 <td  className=''>{cv.offer}</td>
//                                 <td>{categoryAllData && categoryAllData.filter(val => val._id === cv.category).map((categoryVal)=>{
//                                   return (
//                                     <p className='text-nowrap' key={categoryVal._id}>{categoryVal.category}</p>
//                                   )
//                                 })}</td> 
//                                 <td className='text-nowrap'>
//                                   <ul className='list-style-none border-bottom-list p-0'>
//                                   {cv.package && (cv.package).map((item , i)=>{  
//                                     const packageFind = packageAllData.find(data => data._id === item)  
//                                   return( 
//                                     <li key={i} className='text-nowrap p-0'> 
//                                     {packageFind && packageFind.packageName}
//                                     </li>
//                                   ) 
//                                 })}
//                                   </ul>
//                                 </td>   
//                                 <td>{cv.isActive? <>True</> : <>False</>}</td>  
//                                 <td  >
//                                     <div className='d-flex align-items-center flex-wrap justify-content-center flex-column'> 
//                                     <button className='btn border-0 mb-1 pb-0 text-nowrap' onClick={()=>serviceDelete(cv._id)} disabled={deleteLoading}> 
//                                       <i className="fa-solid fa-trash fa-sm text-danger me-1 "></i> 
//                                       <small className='fw-bold text-danger'>{deleteLoading ? <>deleting</> : <>delete</>}</small>
//                                     </button>
//                                     <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-service/${cv._id}`} > 
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
//         </section> */}
//         <section className='table-responsive service-table-section'>
//   <table className='table table-striped table-hover text-center align-middle shadow-sm service-table'>
//     <thead className='table-dark'>
//       <tr>
//         <th>S. No.</th>
//         <th>Images</th>
//         <th>Service</th>
//         <th>Price</th>
//         <th>Discount Price</th>
//         <th>Offer</th>
//         <th>Category</th>
//         <th>Package</th>
//         <th>Status</th>
//         <th>Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       {serviceAllData.map((cv, i) => (
//         <tr key={i}>
//           <td>{i + 1}</td>
//           <td>
//             <div className='service-image-box mx-auto'>
//               <img src={`${Url}/${cv.image}`} alt="service" className='img-fluid rounded shadow-sm' />
//             </div>
//           </td>
//           <td className='text-capitalize fw-semibold'>{cv.serviceName}</td>
//           <td className='text-success fw-bold'>${cv.price}</td>
//           <td className='text-danger fw-bold'>${cv.discountPrice}</td>
//           <td>{cv.offer}</td>
//           <td>
//             {categoryAllData?.filter(val => val._id === cv.category).map((categoryVal) => (
//               <span className='badge bg-secondary text-wrap' key={categoryVal._id}>
//                 {categoryVal.category}
//               </span>
//             ))}
//           </td>
//           <td className='text-nowrap'>
//             <ul className='list-unstyled mb-0'>
//               {cv.package?.map((item, idx) => {
//                 const pkg = packageAllData.find(p => p._id === item);
//                 return (
//                   <li key={idx} className='text-muted small'>
//                     {pkg?.packageName}
//                   </li>
//                 );
//               })}
//             </ul>
//           </td>
//           <td>
//             <span className={`badge ${cv.isActive ? 'bg-success' : 'bg-danger'}`}>
//               {cv.isActive ? 'Active' : 'Inactive'}
//             </span>
//           </td>
//           <td>
//             <div className='d-flex flex-column align-items-center gap-1'>
//               <button
//                 className='btn btn-sm btn-outline-danger w-100 text-nowrap'
//                 onClick={() => serviceDelete(cv._id)}
//                 disabled={deleteLoading}
//               >
//                 <i className="fa-solid fa-trash me-1" />
//                 {deleteLoading ? 'Deleting' : 'Delete'}
//               </button>
//               <Link
//                 className='btn btn-sm btn-outline-success w-100 text-nowrap'
//                 to={`/dashboard/update-service/${cv._id}`}
//               >
//                 <i className="fa-solid fa-pen-to-square me-1" /> Edit
//               </Link>
//               <Link
//                 className='btn btn-sm btn-outline-primary w-100 text-nowrap'
//                 to="#"
//               >
//                 <i className="fa-solid fa-eye me-1" /> View
//               </Link>
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

// export default ServicePage








// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Button, Container, Stack, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';

// import { Url } from '../url/url';

// const ServicePage = () => {
//   const categoryAllData = useSelector((store) => store.category.data);
//   const packageAllData = useSelector((store) => store.package.data);

//   const [serviceAllData, setServiceAllData] = useState([]);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchServiceData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${Url}/service`);
//       setServiceAllData(response.data);
//     } catch (error) {
//       console.error('Error fetching service data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchServiceData();
//   }, []);

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
//           await axios.delete(`${Url}/service/delete/${id}`);
//           await fetchServiceData();
//           toast.success('Service deleted successfully');
//         } catch (error) {
//           toast.error('Something went wrong');
//         }
//         setDeleteLoading(false);
//       } else {
//         setDeleteLoading(false);
//       }
//     });
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Dashboard: Services</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>
//             Services
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             <Link className="btn btn-primary" to="/dashboard/add-new-service">
//               Add New Service
//             </Link>
//           </Typography>
//         </Stack>
//       </Container>

//       <Container>
//         <div className="d-flex align-items-center justify-content-between bg-lightgray rounded-top p-3">
//           <div>
//             <input type="text" placeholder="Search" className="form-control" />
//           </div>
//           <div>
//             <div className="d-flex align-items-center">
//               <p className="mb-0 me-2">Service :</p>
//               <h4 className="text-primary fw-bold mb-0">{serviceAllData.length}</h4>
//             </div>
//           </div>
//         </div>
//       </Container>

//       <Container>
//         <section className="table-responsive service-table-section">
//           <table className="table table-striped table-hover text-center align-middle shadow-sm service-table">
//             <thead className="table-dark">
//               <tr>
//                 <th>S. No.</th>
//                 <th>Images</th>
//                 <th>Service</th>
//                 <th>Price</th>
//                 <th>Discount Price</th>
//                 <th>Offer</th>
//                 <th>Category</th>
//                 <th>Package</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!loading &&
//                 serviceAllData.map((cv, i) => (
//                   <tr key={i}>
//                     <td>{i + 1}</td>
//                     <td>
//                       <img
//                         src={`${Url}/${cv.image}`}
//                         alt="service"
//                         className="img-fluid rounded shadow-sm w-100px"
//                       />
//                     </td>
//                     <td>{cv.serviceName}</td>
//                     <td className="text-success fw-bold">${cv.price}</td>
//                     <td className="text-danger fw-bold">${cv.discountPrice}</td>
//                     <td>{cv.offer}</td>
//                     <td>
//                       {categoryAllData
//                         .filter((cat) => cat._id === cv.category)
//                         .map((cat) => (
//                           <span key={cat._id} className="badge bg-secondary">
//                             {cat.category}
//                           </span>
//                         ))}
//                     </td>
//                     <td>
//                       <ul className="list-unstyled mb-0">
//                         {cv.package?.map((item, idx) => {
//                           const pkg = packageAllData.find((p) => p._id === item);
//                           return <li key={idx}>{pkg?.packageName}</li>;
//                         })}
//                       </ul>
//                     </td>
//                     <td>
//                       <span className={`badge ${cv.isActive ? 'bg-success' : 'bg-danger'}`}>
//                         {cv.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="d-flex flex-column gap-1">
//                         <button
//                           className="btn btn-sm btn-outline-danger text-nowrap"
//                           onClick={() => serviceDelete(cv._id)}
//                           disabled={deleteLoading}
//                         >
//                           <i className="fa-solid fa-trash me-1" />
//                           {deleteLoading ? 'Deleting' : 'Delete'}
//                         </button>
//                         <Link
//                           to={`/dashboard/update-service/${cv._id}`}
//                           className="btn btn-sm btn-outline-success text-nowrap"
//                         >
//                           <i className="fa-solid fa-pen-to-square me-1" />
//                           Edit
//                         </Link>
//                         <Link to="#" className="btn btn-sm btn-outline-primary text-nowrap">
//                           <i className="fa-solid fa-eye me-1" />
//                           View
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               {loading && (
//                 <tr>
//                   <td colSpan="10">
//                     <div className="text-center py-5">
//                       <span className="spinner-border text-primary"></span>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default ServicePage;




import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import { Url } from '../url/url';
import { useSelector } from 'react-redux';

const ServicePage = () => {
  const categoryAllData = useSelector((store) => store.category.data);
  const packageAllData = useSelector((store) => store.package.data);
  const [serviceAllData, setServiceAllData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(''); 
  

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/service?page=${page}&limit=${limit}`);
      setServiceAllData(response.data.data);
      setTotal(response.data.totalCount); 

    } catch (error) {
      console.error('Error fetching service data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/service/service/search?keyword=${keyword}`);
      setServiceAllData(response.data.data);
      setTotal(response.data.data.length);
      setPage(1);
    } catch (error) {
      console.error('Error searching services:', error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchServiceData();
  }, [page, limit]);

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
          await axios.delete(`${Url}/service/delete/${id}`);
          toast.success('Service deleted successfully');
          fetchServiceData();
        } catch (error) {
          toast.error('Something went wrong');
        }
        setDeleteLoading(false);
      } else {
        setDeleteLoading(false);
      }
    });
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Dashboard: Services</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
          🧾 Services
          </Typography>
          
          <Link className="btn btn-primary" to="/dashboard/add-new-service">  
          <i className="fa-solid fa-plus"></i> Add New Service
          </Link>
        </Stack>
      </Container>
      {/* <div>
            <p className="mb-0 fw-bold text-primary">Total: {total}</p>
          </div> */}
      <Container>
        <div className="d-flex align-items-center flex-wrap justify-content-between bg-lightgray rounded-top p-3">
          <div className="d-flex align-items-center gap-2">
            <label>Show</label>
            <select
              className="form-select"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <label>entries</label>
          </div>
          <div>
            {/* <input type="text" placeholder="Search" className="form-control" disabled /> */}
            {/* <input
  type="text"
  placeholder="Search"
  className="form-control"
  value={searchKeyword}
  onChange={(e) => {
    setSearchKeyword(e.target.value);
    handleSearch(e.target.value);
  }}
/> */}
<div className="viewservice-searchbar mb-4">
  <i className="fa fa-search search-icon" />
  <input
    type="text"
    className="form-control search-input"
    placeholder="Search services..."
    value={searchKeyword}
    onChange={(e) => {
      setSearchKeyword(e.target.value);
      handleSearch(e.target.value);
    }}
  />
</div>



          </div>
    
        </div>
      </Container>

      <Container>
        <section className="table-responsive service-table-section">
          <table className="table table-striped table-hover text-center align-middle shadow-sm service-table">
            <thead className="table-dark">
              <tr>
                <th>S. No.</th>
                <th>Images</th>
                <th>Service</th>
                <th>Price</th>
                <th>Base Price</th>
                <th>discount</th>
                <th>Category</th>
                <th>Package</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                serviceAllData.map((cv, i) => (
                  <tr key={cv._id}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>
                      <img
                        src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${cv.image}`}
                        alt="service"
                        className="img-fluid rounded shadow-sm w-100px"
                      />
                    </td>
                    <td>{cv.serviceName}</td>
                    <td className="text-success fw-bold">${cv.price}</td>
                    <td className="text-danger fw-bold">${cv.basePrice}</td>
                    <td>{cv.discount}</td>
                    {/* <td>{cv.category}</td> */}
                    
                    <td>
                      {categoryAllData
                        .filter((cat) => cat._id === cv.category)
                        .map((cat) => (
                          <span key={cat._id} className="badge bg-secondary">
                            {cat.category}
                          </span>
                        ))}
                    </td>






                    {/* <td>
                      <ul className="list-unstyled mb-0">
                        {cv.package?.map((pkg, idx) => (
                          <li key={idx}>{pkg}</li>
                        ))}
                      </ul>
                    </td> */}
                        <td>
                      <ul className="list-unstyled mb-0">
                         {cv.package?.map((item, idx) => {
                          const pkg = packageAllData.find((p) => p._id === item);
                          return <li key={idx}>{pkg?.packageName}</li>;
                        })}
                      </ul>
                    </td>
                    <td>
                      <span className={`badge ${cv.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {cv.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <button
                          className="btn btn-sm btn-outline-danger text-nowrap"
                          onClick={() => serviceDelete(cv._id)}
                          disabled={deleteLoading}
                        >
                          <i className="fa-solid fa-trash me-1" />
                          {deleteLoading ? 'Deleting' : 'Delete'}
                        </button>
                        <Link
                          to={`/dashboard/update-service/${cv._id}`}
                          className="btn btn-sm btn-outline-success text-nowrap"
                        >
                          <i className="fa-solid fa-pen-to-square me-1" />
                          Edit
                        </Link>
                        <Link to={`/dashboard/view-service/${cv._id}`} className="btn btn-sm btn-outline-primary text-nowrap">
                          <i className="fa-solid fa-eye me-1" />
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              {loading && (
                <tr>
                  <td colSpan="10">
                    <div className="text-center py-5">
                      <span className="spinner-border text-primary"></span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Page {page} of {totalPages}</p>
            <div className="btn-group">
              <button className="btn btn-outline-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </button>
              <button className="btn btn-outline-secondary" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default ServicePage;
