// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {  Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'; 
// import { ToastContainer  } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import { projectdata } from 'src/redux/slice/project'; 

// const RunningProjectPage = () => {
 
//     const packageAllData = useSelector(store => store.package.data) 
//     const runningProjectAllData = useSelector(store => store.project.data)    
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
//             Running Projects
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
//               {/* <div className='d-flex align-items-center '>
//                   <p className='mb-0 me-2 '>Running Project : </p>
//                   <h4 className='text-primary fw-bold mb-0'>{runningProjectAllData.length}</h4>
//               </div> */}
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

//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>   

//                   {runningProjectAllData.length > 0 ? <>{ runningProjectAllData.filter(value => value.projectStatus === "running" || "pending"  && value.team ).map((cv, i)=>{
//                       return( 
//                         <tr className='text-center' key={i}>
//                               <td>{i + 1}</td>  
//                               {cv.projectType === "package" ?
//                               <td className='text-capitalize'>{packageAllData.filter(data => data._id === cv.packageId).map((packageVal) => packageVal.packageName)}</td> : 
//                               <td className='text-capitalize'>"custom Project"</td> }
 
//                               <td>$ {cv.totalPrice}</td> 
//                               <td>{cv.clientId}</td>
//                               <td className='text-capitalize'>{cv.clientName}</td>  
//                               <td>
//                                   <div className='d-fle align-items-center flex-wrap justify-content-center flex-column'>  
//                                   <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`} > 
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
//                 <h6 className='text-center py-5 w-100'>No running Projects</h6>
//                 </>
//                 }
 
//                 </tbody>
//             </table>
//         </section>
//       </Container>
//     </>
//   )
// }

// export default RunningProjectPage





import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Url } from 'src/url/url';

const RunningProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = async (currentPage = 1, currentLimit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`${Url}/project/running?page=${currentPage}&limit=${currentLimit}`);
      const { data, totalPages } = response.data;
      setProjects(data || []);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.error("Error fetching running projects:", error);
      toast.error("Failed to load running projects");
    }
    setLoading(false);
  };



  const fetchSearchProjects = async (currentPage = 1, currentLimit = 10, query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${Url}/project/running/search?page=${currentPage}&limit=${currentLimit}&query=${query}`);
      const { data, totalPages } = response.data;
      setProjects(data || []);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.error("Error searching running projects:", error);
      toast.error("Search failed");
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchProjects(page, limit);
  // }, [page, limit]);

  const handleChange = (event, value) => {
    setPage(value);
  };
useEffect(() => {
  if (searchQuery.trim() === '') {
    fetchProjects(page, limit);
  } else {
    fetchSearchProjects(page, limit, searchQuery);
  }
}, [page, limit, searchQuery]);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Running Projects</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
          ⚙️Running Projects
          </Typography>
        </Stack>
      </Container>

      <Container>
        <div className='d-flex align-items-center justify-content-between flex-wrap bg-lightgray rounded-top p-3'>
          <div>
            <form>
              {/* <input type='text' placeholder='Search' className='form-control' /> */}
              <input
  type='text'
  placeholder='🔍 Search ..'
  className='form-control'
  value={searchQuery}
  onChange={(e) => {
    setPage(1); // reset page
    setSearchQuery(e.target.value);
  }}
/>

            </form>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label className="mb-0">Show</label>
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
            <label className="mb-0">entries</label>
          </div>
        </div>
      </Container>
      

      {/* <Container>
        <section className='table-responsive'>
          <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
            <thead className='table-primary'>
              <tr className='align-top'>
                <th>S. No.</th>
                <th>Package / Service</th>
                <th>Price ($)</th>
                <th>Client</th>
                <th>Client Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">
                    <div className="text-center py-5">Loading...</div>
                  </td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((cv, i) => (
                  <tr className='text-center' key={cv._id}>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td className='text-capitalize'>
                      {cv.projectType === 'package' ? cv.packageId : 'custom Project'}
                    </td>
                    <td>$ {cv.totalPrice}</td>
                    <td>{cv.clientId}</td>
                    <td className='text-capitalize'>{cv.clientName}</td>
                    <td>
                      <div className='d-flex flex-column align-items-center'>
                        <Link className='btn border-0 mb-1 pb-0 text-nowrap' to={`/dashboard/update-project/${cv._id}`}>
                          <i className="fa-solid fa-user-pen fa-sm text-success me-1" />
                          <small className='fw-bold text-success'>update</small>
                        </Link>
                        <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap'>
                          <i className="fa-solid fa-eye fa-sm text-primary me-1" />
                          <small className='fw-bold text-primary'>view</small>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h6 className='text-center py-5 w-100'>No running Projects</h6>
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
      </Container> */}

<Container>
  <section className='running-projects-section table-responsive'>
  <table className='table table-striped table-hover text-center running-projects-table enhanced-table shadow-sm rounded-3 overflow-hidden'>
  <thead className='table-dark'>
    <tr>
      <th>S. No.</th>
      <th>Project ID</th>
      <th>Package / Service</th>
      <th>Price ($)</th>
      <th>Client</th>
      <th>Client Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="6">
          <div className="loading-spinner py-5">Loading...</div>
        </td>
      </tr>
    ) : projects.length > 0 ? (
      projects.map((cv, i) => (
        <tr key={cv._id}>
          <td>{(page - 1) * limit + i + 1}</td>
          <td>{cv._id}</td>
          <td className='text-capitalize fw-semibold'>
            {cv.projectType === 'package' ? cv.packageId : 'Custom Project'}
          </td>
          <td className='text-success fw-bold'>$ {cv.totalPrice}</td>
          <td className='text-muted'>{cv.clientId}</td>
          <td className='text-capitalize'>{cv.clientName}</td>
          <td>
            <div className='d-flex justify-content-center gap-2'>
              <Link className='btn btn-sm btn-primary px-3 rounded-pill' to={`/dashboard/project/${cv._id}`}>
                <i className="fa-solid fa-eye me-1" /> View
              </Link>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6">
          <h6 className='text-center py-5 w-100 text-muted'>No running Projects</h6>
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

export default RunningProjectPage;
