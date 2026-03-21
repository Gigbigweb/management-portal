// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {  Container, Stack, Typography} from '@mui/material'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'; 
// import { ToastContainer  } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import { projectdata } from 'src/redux/slice/project'; 
// import Rating from 'react-rating-stars-component';

// const RatingPage = () => {
 
//     const packageAllData = useSelector(store => store.package.data) 
//     const runningProjectAllData = useSelector(store => store.project.data) 
//     const ratingAllData = useSelector(store => store.rating.data)   
//     const clientAllData = useSelector(store => store.client.data)   
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
//             Rating Page
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
//                         {/* <th>Package </th>  */}
//                         <th>Package Id</th> 
//                         <th>Client Name</th> 
//                         <th>Client Id</th> 
//                         <th>Rating</th>
//                         <th>Comment</th>

//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>   
//                 {ratingAllData &&  ratingAllData.map((cv, i)=>{ 
//                       return( 
//                         <tr className='text-center' key={i}>
//                               <td>{i + 1}</td>   
//                               {/* <td></td> */}
//                               <td>{cv.clientId}</td>  
//                               <td>{clientAllData.length > 0 && (clientAllData.find(data => data._id === cv.clientId)).name}</td>   
//                               <td>{cv.projectId}</td>
//                               <td><Rating
//                                   count={5}
//                                   value={cv.ratingStar }  
//                                   size={20} 
//                                   edit={false}
//                                   activeColor="#ff6c00"  
//                                   classNames="w-max m-auto"
//                                 />
//                               </td>
//                               <td>{cv.ratingComment}</td>
                              
//                               <td>
//                                   <div className='d-fle align-items-center flex-wrap justify-content-center flex-column'>   
//                                   <Link to={`/dashboard/project/${cv.projectId}`} className='btn border-0 mb-1 pb-0 text-nowrap' > 
//                                     <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
//                                     <small className='fw-bold text-primary'>view</small>
//                                   </Link> 
//                                   </div>
//                               </td>
//                           </tr> 
//                       )
//                   }) }

//                   {true ? 
//                   <> 
//                   { runningProjectAllData.filter(value => value.projectStatus === "complete" &&  value.rating).map((cv, i)=>{
//                       return( 
//                         <tr className='text-center' key={i}>
//                               <td>{i + 1}</td>   
//                               <td>{cv.projectType}</td>
//                               <td>{cv._id}</td>  
//                               <td className='text-capitalize'>{cv.clientName}</td>  
//                               <td>{cv.clientId}</td>
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
//                               <td className='text-capitalize'>{ratingAllData && ratingAllData.filter(data =>  data.projectId === cv._id ).map((ratingValue)=>{
//                                 return( 
//                                 <p key={ratingValue._id}>{ratingValue.ratingComment}</p>
//                                 )
//                               })}</td>
//                               <td>
//                                   <div className='d-fle align-items-center flex-wrap justify-content-center flex-column'>   
//                                   <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap' > 
//                                     <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
//                                     <small className='fw-bold text-primary'>view</small>
//                                   </Link> 
//                                   </div>
//                               </td>
//                           </tr> 
//                       )
//                   }) }
//                   </>
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

// export default RatingPage






import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import {  Container, Stack, Typography, Pagination, Box } from '@mui/material'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { projectdata } from 'src/redux/slice/project'; 
import Rating from 'react-rating-stars-component';

const RatingPage = () => {
 
    const packageAllData = useSelector(store => store.package.data) 
    const runningProjectAllData = useSelector(store => store.project.data) 
    const ratingAllData = useSelector(store => store.rating.data)   
    const clientAllData = useSelector(store => store.client.data)   
    const dispatch = useDispatch() 

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(()=>{
      dispatch(projectdata())
    }, [])

    // Combine all ratings data
    const allRatingsData = [
      ...(ratingAllData || []),
      ...(runningProjectAllData || [])
        .filter(value => value.projectStatus === "complete" && value.rating)
    ];

    // Calculate pagination
    const totalPages = Math.ceil(allRatingsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = allRatingsData.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <>
    <ToastContainer/>
    <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
    </Helmet> 
     <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Rating Page
          </Typography>  
        </Stack> 
      </Container> 
      <Container className=''> 
          <div className='d-flex align-items-center justify-content-between felx-wrap bg-lightgray rounded-top p-3'> 
            <div> 
              <form> 
                <input type='text'  placeholder='Search' className='form-control' />
              </form>
            </div> 
            <div className='d-flex align-items-center'>
              <p className='mb-0 me-2'>Total Ratings:</p>
              <h5 className='text-primary fw-bold mb-0'>{allRatingsData.length}</h5>
            </div> 
          </div>
      </Container>
      <Container>
        <section className='table-responsive'>
            <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
                <thead className='table-primary'>
                    <tr className='align-top'>
                        <th>S. No.</th>
                        <th>Package Type</th> 
                        <th>Package Id</th> 
                        <th>Client Name</th> 
                        <th>Client Id</th> 
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>   
                {currentData.length > 0 ? currentData.map((cv, i) => {
                  // Check if it's from ratingAllData or runningProjectAllData
                  const isFromRatingData = ratingAllData?.some(rating => rating._id === cv._id);
                  
                  if (isFromRatingData) {
                    // Render rating data format
                    return (
                      <tr className='text-center' key={cv._id || i}>
                        <td>{startIndex + i + 1}</td>   
                        <td>-</td>
                        <td>{cv.clientId}</td>  
                        <td>
                          {clientAllData.find(data => data._id === cv.clientId)?.name || 'N/A'}
                        </td>   
                        <td>{cv.projectId}</td>
                        <td>
                          <Rating
                            count={5}
                            value={cv.ratingStar}  
                            size={20} 
                            edit={false}
                            activeColor="#ff6c00"  
                            classNames="w-max m-auto"
                          />
                        </td>
                        <td>{cv.ratingComment}</td>
                        <td>
                          <div className='d-flex align-items-center flex-wrap justify-content-center flex-column'>   
                            <Link to={`/dashboard/project/${cv.projectId}`} className='btn border-0 mb-1 pb-0 text-nowrap' > 
                              <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
                              <small className='fw-bold text-primary'>view</small>
                            </Link> 
                          </div>
                        </td>
                      </tr>
                    );
                  } else {
                    // Render running project format
                    const projectRatings = ratingAllData?.filter(data => data.projectId === cv._id) || [];
                    return (
                      <tr className='text-center' key={cv._id || i}>
                        <td>{startIndex + i + 1}</td>   
                        <td>{cv.projectType}</td>
                        <td>{cv._id}</td>  
                        <td className='text-capitalize'>{cv.clientName}</td>  
                        <td>{cv.clientId}</td>
                        <td className='text-capitalize'>
                          {projectRatings.map((ratingValue) => (
                            <Rating
                              count={5}
                              value={ratingValue.ratingStar}  
                              size={24} 
                              edit={false}
                              activeColor="#ff6c00" 
                              key={ratingValue._id}
                              classNames="w-max"
                            />
                          ))}
                        </td>
                        <td className='text-capitalize'>
                          {projectRatings.map((ratingValue) => (
                            <p key={ratingValue._id}>{ratingValue.ratingComment}</p>
                          ))}
                        </td>
                        <td>
                          <div className='d-fle align-items-center flex-wrap justify-content-center flex-column'>   
                            <Link to={`/dashboard/project/${cv._id}`} className='btn border-0 mb-1 pb-0 text-nowrap' > 
                              <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
                              <small className='fw-bold text-primary'>view</small>
                            </Link> 
                          </div>
                        </td>
                      </tr>
                    );
                  }
                }) : (
                  <tr>
                    <td colSpan="8" className='text-center py-5'>
                      <h6>No Ratings Available</h6>
                    </td>
                  </tr>
                )}
                </tbody>
            </table>
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Box className='d-flex justify-content-center align-items-center py-4'>
            <Stack spacing={2}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton 
                showLastButton
              />
              <Typography variant="body2" className='text-center text-muted'>
                Showing {startIndex + 1} - {Math.min(endIndex, allRatingsData.length)} of {allRatingsData.length} ratings
              </Typography>
            </Stack>
          </Box>
        )}
      </Container>
    </>
  )
}

export default RatingPage